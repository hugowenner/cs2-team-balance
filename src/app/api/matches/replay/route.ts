/**
 * ─────────────────────────────────────────────
 * API: MATCHES REPLAY
 * ─────────────────────────────────────────────
 * Endpoint para reexecutar partida via seed.
 * 
 * POST /api/matches/replay
 * - Reexecuta partida usando seed existente
 * - Garante reprodutibilidade total
 * - Mesma seed = mesmo resultado
 * ─────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateTeams, Player, Team } from '@/lib/team-balancer';
import { mulberry32, parseSeed } from '@/lib/rng';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { seed, players, mode } = body;
    
    if (!seed) {
      return NextResponse.json(
        { success: false, error: 'Seed é obrigatória' },
        { status: 400 }
      );
    }
    
    if (!Array.isArray(players) || players.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'É necessário exatamente 10 jogadores' },
        { status: 400 }
      );
    }
    
    if (mode !== 'RANDOM' && mode !== 'BALANCED') {
      return NextResponse.json(
        { success: false, error: 'Modo deve ser RANDOM ou BALANCED' },
        { status: 400 }
      );
    }
    
    // Validar jogadores
    const validatedPlayers: Player[] = players.map((p, i) => ({
      name: String(p.name).trim(),
      level: Math.max(1, Math.min(10, parseInt(p.level, 10) || 5))
    }));
    
    // Recriar RNG com a seed
    const seedNum = parseSeed(String(seed));
    const rng = mulberry32(seedNum);
    
    // Regenerar times (será idêntico ao original)
    const result: Team = generateTeams(validatedPlayers, mode as 'RANDOM' | 'BALANCED', rng);
    
    return NextResponse.json({
      success: true,
      data: {
        seed,
        mode,
        players: validatedPlayers,
        result,
        isReplay: true
      }
    });
    
  } catch (error) {
    console.error('Error replaying match:', error);
    const message = error instanceof Error ? error.message : 'Erro ao reexecutar partida';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
