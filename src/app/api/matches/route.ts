/**
 * ─────────────────────────────────────────────
 * API: MATCHES
 * ─────────────────────────────────────────────
 * Endpoints para gerenciamento de partidas:
 * 
 * POST /api/matches
 * - Gera nova partida (random ou balanceado)
 * - Salva no banco para auditoria
 * - Retorna times gerados
 * 
 * GET /api/matches
 * - Lista histórico de partidas
 * - Suporta paginação
 * ─────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { 
  generateTeams, 
  Player, 
  Team 
} from '@/lib/team-balancer';
import { 
  mulberry32, 
  generateSeed, 
  parseSeed 
} from '@/lib/rng';

// ─────────────────────────────────────────────
// GET /api/matches - Listar histórico
// ─────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    
    const matches = await db.match.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' }
    });
    
    const total = await db.match.count();
    
    return NextResponse.json({
      success: true,
      data: matches.map(m => ({
        id: m.id,
        seed: m.seed,
        mode: m.mode,
        players: JSON.parse(m.players),
        result: JSON.parse(m.result),
        diff: m.diff,
        createdAt: m.createdAt.toISOString()
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar partidas' },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// POST /api/matches - Criar nova partida
// ─────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar entrada
    const { players, mode, seed: inputSeed } = body;
    
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
    
    // Validar cada jogador
    const validatedPlayers: Player[] = players.map((p, i) => {
      if (!p.name || typeof p.name !== 'string' || !p.name.trim()) {
        throw new Error(`Jogador ${i + 1} deve ter um nome válido`);
      }
      
      const level = parseInt(p.level, 10);
      if (isNaN(level) || level < 1 || level > 10) {
        throw new Error(`Jogador ${i + 1} deve ter nível entre 1 e 10`);
      }
      
      return {
        name: p.name.trim(),
        level
      };
    });
    
    // Gerar ou usar seed fornecida
    const seed = inputSeed || generateSeed();
    const seedNum = parseSeed(String(seed));
    
    // Criar RNG determinístico
    const rng = mulberry32(seedNum);
    
    // Gerar times
    const result: Team = generateTeams(validatedPlayers, mode, rng);
    console.log('RNG TYPE:', typeof rng);
    
    // Salvar no banco para auditoria
    const match = await db.match.create({
      data: {
        seed: String(seed),
        mode,
        players: JSON.stringify(validatedPlayers),
        result: JSON.stringify(result),
        diff: result.diff
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        id: match.id,
        seed: match.seed,
        mode: match.mode,
        players: validatedPlayers,
        result,
        createdAt: match.createdAt.toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error creating match:', error);
    const message = error instanceof Error ? error.message : 'Erro ao criar partida';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
