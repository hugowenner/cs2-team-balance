/**
 * ─────────────────────────────────────────────
 * API: MATCH BY ID
 * ─────────────────────────────────────────────
 * Endpoint para buscar partida específica.
 * 
 * GET /api/matches/[id]
 * - Retorna detalhes de uma partida
 * - Permite reexecutar visualmente
 * ─────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const match = await db.match.findUnique({
      where: { id }
    });
    
    if (!match) {
      return NextResponse.json(
        { success: false, error: 'Partida não encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        id: match.id,
        seed: match.seed,
        mode: match.mode,
        players: JSON.parse(match.players),
        result: JSON.parse(match.result),
        diff: match.diff,
        createdAt: match.createdAt.toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error fetching match:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar partida' },
      { status: 500 }
    );
  }
}

// Deletar partida
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.match.delete({
      where: { id }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Partida removida com sucesso'
    });
    
  } catch (error) {
    console.error('Error deleting match:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao remover partida' },
      { status: 500 }
    );
  }
}
