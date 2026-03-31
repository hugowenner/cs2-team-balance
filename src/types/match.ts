/**
 * ─────────────────────────────────────────────
 * TIPOS COMPARTILHADOS
 * ─────────────────────────────────────────────
 * Definições de tipos usadas em todo o sistema.
 * ─────────────────────────────────────────────
 */

// Jogador com nome e nível (agora 1-21)
export interface Player {
  name: string;
  level: number; // 1-21
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

// Cores e labels por nível (atualizado para 1-21)
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
  11: '#a855f7',
  12: '#ec4899',
  13: '#ec4899',
  14: '#8b5cf6',
  15: '#8b5cf6',
  16: '#3b82f6',
  17: '#3b82f6',
  18: '#06b6d4',
  19: '#06b6d4',
  20: '#10b981',
  21: '#fbbf24',
};

export const LEVEL_LABELS: Record<number, string> = {
  1: 'Iron I',
  2: 'Iron II',
  3: 'Bronze I',
  4: 'Bronze II',
  5: 'Silver I',
  6: 'Silver II',
  7: 'Gold I',
  8: 'Gold II',
  9: 'Platinum I',
  10: 'Platinum II',
  11: 'Diamond I',
  12: 'Diamond II',
  13: 'Master I',
  14: 'Master II',
  15: 'Elite I',
  16: 'Elite II',
  17: 'Supreme I',
  18: 'Supreme II',
  19: 'Global I',
  20: 'Global II',
  21: 'Global Elite',
};