import type { Match, CreateMatchParams, ApiResponse } from '@/types/match';

const API_BASE = '/api/matches';

export const matchesService = {
  async getMatches(limit: number = 50): Promise<ApiResponse<Match[]>> {
    const res = await fetch(`${API_BASE}?limit=${limit}`);
    return res.json();
  },

  async createMatch(params: CreateMatchParams): Promise<ApiResponse<Match>> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  async deleteMatch(id: string): Promise<void> {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  },
};