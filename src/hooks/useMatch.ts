import { useState, useCallback } from 'react';
import type { Player, TeamResult, Match, GameMode } from '@/types/match';
import { matchesService } from '@/services/matchesService';

export function useMatch() {
  const [result, setResult] = useState<TeamResult | null>(null);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode] = useState<GameMode>('BALANCED');
  const [customSeed, setCustomSeed] = useState('');
  const [useCustomSeed, setUseCustomSeed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShuffle = useCallback(
    async (players: Player[], isValid: boolean, onInvalid: () => void) => {
      if (!isValid) {
        onInvalid();
        return null;
      }

      setLoading(true);
      setResult(null);
      setCurrentMatch(null);

      try {
        const data = await matchesService.createMatch({
          players: players.map((p) => ({ ...p, name: p.name.trim() })),
          mode,
          seed: useCustomSeed ? customSeed : undefined,
        });

        if (data.success && data.data) {
          setResult(data.data.result);
          setCurrentMatch(data.data);
          return data.data;
        } else {
          console.error('Error:', data.error);
          return null;
        }
      } catch (error) {
        console.error('Error creating match:', error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [mode, useCustomSeed, customSeed]
  );

  const loadMatch = useCallback((match: Match) => {
    setResult(match.result);
    setCurrentMatch(match);
    setCustomSeed(match.seed);
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
  }, []);

  const handleCopySeed = useCallback(() => {
    if (currentMatch?.seed) {
      navigator.clipboard.writeText(currentMatch.seed);
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