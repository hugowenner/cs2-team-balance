export interface Player {
  name: string;
  level: number;
}

export interface TeamResult {
  ct: Player[];
  tr: Player[];
  ctSum: number;
  trSum: number;
  diff: number;
  total: number;
}

export interface Match {
  id: string;
  players: Player[];
  result: TeamResult;
  mode: GameMode;
  seed: string;
  createdAt: string;
  diff: number;
}

export type GameMode = 'BALANCED' | 'RANDOM';

export interface CreateMatchParams {
  players: Player[];
  mode: GameMode;
  seed?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}