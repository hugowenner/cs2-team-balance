import { useState, useCallback } from 'react';
import { Match, Player, MatchResult } from '@/types/match';
import { usePlayers } from './usePlayers';
import { useMatchHistory } from './useMatchHistory';

export function useMatch() {
  const { players, isValid, triggerErrors } = usePlayers();
  const { saveMatch } = useMatchHistory();
  
  const [result, setResult] = useState<MatchResult | null>(null);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode] = useState<'BALANCED' | 'RANDOM'>('BALANCED');
  const [customSeed, setCustomSeed] = useState('');
  const [useCustomSeed, setUseCustomSeed] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSeed = useCallback(() => {
    if (useCustomSeed && customSeed) {
      const seed = parseInt(customSeed);
      if (!isNaN(seed)) return seed;
    }
    return Math.floor(Math.random() * 1000000);
  }, [customSeed, useCustomSeed]);

  const seededRandom = useCallback((seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }, []);

  const shuffleArray = useCallback(<T,>(array: T[], seed: number): T[] => {
    const newArray = [...array];
    let currentSeed = seed;
    
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(currentSeed++) * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    
    return newArray;
  }, [seededRandom]);

  const calculateBalance = useCallback((team: Player[]) => {
    return team.reduce((sum, player) => sum + player.level, 0);
  }, []);

  const generateBalancedTeams = useCallback((playersList: Player[], seed: number): MatchResult | null => {
    const validPlayers = playersList.filter(p => p.name.trim());
    if (validPlayers.length !== 10) return null;

    let bestResult: MatchResult | null = null;
    let minDiff = Infinity;
    const maxAttempts = 800;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const shuffled = shuffleArray(validPlayers, seed + attempt);
      const ct = shuffled.slice(0, 5);
      const tr = shuffled.slice(5, 10);
      
      const ctSum = calculateBalance(ct);
      const trSum = calculateBalance(tr);
      const diff = Math.abs(ctSum - trSum);

      if (diff < minDiff) {
        minDiff = diff;
        bestResult = {
          ct,
          tr,
          ctSum,
          trSum,
          total: ctSum + trSum,
          diff,
        };

        if (diff === 0) break;
      }
    }

    return bestResult;
  }, [shuffleArray, calculateBalance]);

  const handleShuffle = useCallback(async (playersList: Player[], valid: boolean, triggerErrors: () => boolean[]) => {
    if (!valid) {
      triggerErrors();
      return;
    }

    setLoading(true);
    setResult(null);
    setCurrentMatch(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const seed = generateSeed();
      const matchResult = generateBalancedTeams(playersList, seed);
      
      if (matchResult) {
        setResult(matchResult);
        
        const match: Match = {
          id: Date.now().toString(),
          seed,
          mode,
          players: playersList,
          result: matchResult,
          createdAt: new Date().toISOString(),
        };
        
        setCurrentMatch(match);
        saveMatch(match);
      }
    } catch (error) {
      console.error('Error generating teams:', error);
    } finally {
      setLoading(false);
    }
  }, [generateSeed, generateBalancedTeams, mode, saveMatch]);

  const loadMatch = useCallback((match: Match) => {
    setResult(match.result);
    setCurrentMatch(match);
    setCustomSeed(match.seed.toString());
    setUseCustomSeed(true);
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setCurrentMatch(null);
  }, []);

  const resetAll = useCallback(() => {
    setResult(null);
    setCurrentMatch(null);
    setCustomSeed('');
    setUseCustomSeed(false);
    setCopied(false);
  }, []);

  const handleCopySeed = useCallback(() => {
    if (currentMatch) {
      navigator.clipboard.writeText(currentMatch.seed.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [currentMatch]);

  return {
    result,
    currentMatch,
    loading,
    mode,
    customSeed,
    useCustomSeed,
    copied,
    setCustomSeed,
    setUseCustomSeed,
    handleShuffle,
    loadMatch,
    clearResult,
    resetAll,
    handleCopySeed,
  };
}