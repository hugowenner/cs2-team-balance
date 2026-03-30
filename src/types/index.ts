/**
 * ─────────────────────────────────────────────
 * TIPOS COMPARTILHADOS
 * ─────────────────────────────────────────────
 * Definições de tipos usadas em todo o sistema.
 * ─────────────────────────────────────────────
 */

// Jogador com nome e nível
export interface Player {
  name: string;
  level: number;
}

// Resultado do balanceamento
export interface TeamResult {
  ct: Player[];
  tr: Player[];
  ctSum: number;
  trSum: number;
  diff: number;
  total: number;
}

// Modo de geração
export type GameMode = 'RANDOM' | 'BALANCED';

// Partida salva no banco
export interface Match {
  id: string;
  seed: string;
  mode: GameMode;
  players: Player[];
  result: TeamResult;
  diff: number;
  createdAt: string;
}

// Resposta da API de partidas
export interface MatchesResponse {
  success: boolean;
  data: Match[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// Resposta da API de criação de partida
export interface CreateMatchResponse {
  success: boolean;
  data?: Match;
  error?: string;
}

// Cores e labels por nível
export const LEVEL_COLORS: Record<number, string> = {
  1: '#6b7280',
  2: '#6b7280',
  3: '#22c55e',
  4: '#22c55e',
  5: '#eab308',
  6: '#eab308',
  7: '#f97316',
  8: '#f97316',
  9: '#ef4444',
  10: '#a855f7',
};

export const LEVEL_LABELS: Record<number, string> = {
  1: 'Iron',
  2: 'Bronze',
  3: 'Silver',
  4: 'Gold',
  5: 'Platinum',
  6: 'Diamond',
  7: 'Master',
  8: 'Elite',
  9: 'Supreme',
  10: 'Global',
};
