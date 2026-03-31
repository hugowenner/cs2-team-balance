import { useState, useCallback } from 'react';
import type { Player } from '@/types/match';

const INITIAL_PLAYERS = (): Player[] =>
  Array.from({ length: 10 }, () => ({ name: '', level: 5 }));

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [errors, setErrors] = useState(false);

  const handleChange = useCallback((index: number, field: string, value: string | number) => {
    setPlayers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    if (errors) setErrors(false);
  }, [errors]);

  const setPlayersData = useCallback((newPlayers: Player[]) => {
    setPlayers(newPlayers);
  }, []);

  const resetPlayers = useCallback(() => {
    setPlayers(INITIAL_PLAYERS());
    setErrors(false);
  }, []);

  const triggerErrors = useCallback(() => {
    setErrors(true);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors(false);
  }, []);

  const isValid = players.every((p) => p.name.trim().length > 0);
  const filledCount = players.filter((p) => p.name.trim()).length;
  const avgLevel = (players.reduce((s, p) => s + p.level, 0) / 10).toFixed(1);
  const totalPoints = players.reduce((s, p) => s + p.level, 0);

  return {
    players,
    errors,
    isValid,
    filledCount,
    avgLevel,
    totalPoints,
    handleChange,
    setPlayersData,
    resetPlayers,
    triggerErrors,
    clearErrors,
  };
}