import { useState, useCallback, useEffect } from 'react';
import { Match } from '@/types/match';

const STORAGE_KEY = 'cs2-match-history';

export function useMatchHistory() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = useCallback(() => {
    setLoading(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMatches(parsed.sort((a: Match, b: Match) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveMatch = useCallback((match: Match) => {
    setMatches(prev => {
      const newMatches = [match, ...prev].slice(0, 50); // Limita a 50 partidas
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      } catch (error) {
        console.error('Error saving match:', error);
      }
      return newMatches;
    });
  }, []);

  const deleteMatch = useCallback((id: string) => {
    setMatches(prev => {
      const newMatches = prev.filter(m => m.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newMatches));
      } catch (error) {
        console.error('Error deleting match:', error);
      }
      return newMatches;
    });
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    matches,
    loading,
    loadHistory,
    saveMatch,
    deleteMatch,
  };
}