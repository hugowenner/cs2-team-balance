import { useState, useCallback } from 'react';
import type { Match } from '@/types/match';
import { matchesService } from '@/services/matchesService';

export function useMatchHistory() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await matchesService.getMatches(50);
      if (data.success && data.data) {
        setMatches(data.data);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMatch = useCallback(async (id: string) => {
    try {
      await matchesService.deleteMatch(id);
      setMatches((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  }, []);

  return {
    matches,
    loading,
    loadHistory,
    deleteMatch,
  };
}