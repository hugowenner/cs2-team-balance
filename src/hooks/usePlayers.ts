import { useState, useCallback, useMemo } from 'react';

const INITIAL_PLAYERS = Array.from({ length: 10 }, () => ({
  name: '',
  level: 1,
}));

export function usePlayers() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [errors, setErrors] = useState<boolean[]>(new Array(10).fill(false));

  const handleChange = useCallback((index: number, field: 'name' | 'level', value: string | number) => {
    setPlayers(prev => {
      const newPlayers = [...prev];
      if (field === 'name') {
        newPlayers[index] = { ...newPlayers[index], name: value as string };
      } else if (field === 'level') {
        // Validação para garantir que o nível esteja entre 1 e 21
        const numValue = Number(value);
        const validLevel = Math.min(21, Math.max(1, isNaN(numValue) ? 1 : numValue));
        newPlayers[index] = { ...newPlayers[index], level: validLevel };
      }
      return newPlayers;
    });
    
    // Limpa erro ao digitar
    if (errors[index] && field === 'name' && value) {
      setErrors(prev => {
        const newErrors = [...prev];
        newErrors[index] = false;
        return newErrors;
      });
    }
  }, [errors]);

  const triggerErrors = useCallback(() => {
    const newErrors = players.map(p => !p.name.trim());
    setErrors(newErrors);
    return newErrors;
  }, [players]);

  const resetPlayers = useCallback(() => {
    setPlayers(INITIAL_PLAYERS);
    setErrors(new Array(10).fill(false));
  }, []);

  const setPlayersData = useCallback((newPlayers: typeof INITIAL_PLAYERS) => {
    // Valida todos os níveis ao definir os jogadores
    const validatedPlayers = newPlayers.map(p => ({
      ...p,
      level: Math.min(21, Math.max(1, p.level))
    }));
    setPlayers(validatedPlayers);
    setErrors(new Array(10).fill(false));
  }, []);

  const filledCount = useMemo(() => 
    players.filter(p => p.name.trim()).length, 
    [players]
  );

  const avgLevel = useMemo(() => {
    const validPlayers = players.filter(p => p.name.trim());
    if (validPlayers.length === 0) return '0.0';
    const sum = validPlayers.reduce((acc, p) => acc + p.level, 0);
    return (sum / validPlayers.length).toFixed(1);
  }, [players]);

  const totalPoints = useMemo(() => 
    players.reduce((acc, p) => acc + (p.name.trim() ? p.level : 0), 0),
    [players]
  );

  const isValid = useMemo(() => 
    players.every(p => p.name.trim()),
    [players]
  );

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
  };
}