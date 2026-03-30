/**
 * ─────────────────────────────────────────────
 * TEAM BALANCER - Algoritmo de Balanceamento
 * ─────────────────────────────────────────────
 * Sistema de geração de times 5v5 com dois modos:
 * 
 * 1. RANDOM PURO (🎲): Distribuição 100% aleatória
 * 2. BALANCEADO (⚖️): Múltiplas tentativas para minimizar diff
 * 
 * CARACTERÍSTICAS:
 * - Fisher-Yates shuffle com RNG determinístico
 * - Reproduzível via seed
 * - Auditável e transparente
 * ─────────────────────────────────────────────
 */

import { RNG, randomInt } from './rng';

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────

export interface Player {
  name: string;
  level: number;
}

export interface Team {
  ct: Player[];
  tr: Player[];
  ctSum: number;
  trSum: number;
  diff: number;
  total: number;
}

// ─────────────────────────────────────────────
// ALGORITMOS
// ─────────────────────────────────────────────

/**
 * Fisher-Yates Shuffle com RNG determinístico.
 * Embaralha um array de forma reproduzível.
 * 
 * @param arr - Array a ser embaralhado
 * @param rng - Gerador de números aleatórios
 * @returns Novo array embaralhado
 */
export function fisherYatesShuffle<T>(arr: T[], rng: RNG): T[] {
  const result = [...arr];
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(rng, 0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
}

/**
 * Calcula a soma dos níveis de um time.
 */
function calculateSum(players: Player[]): number {
  return players.reduce((sum, p) => sum + p.level, 0);
}

/**
 * Modo RANDOM PURO - Distribuição 100% aleatória.
 * Uma única tentativa com shuffle simples.
 * 
 * @param players - Lista de 10 jogadores
 * @param rng - Gerador de números aleatórios
 * @returns Times gerados
 */
export function randomBalance(players: Player[], rng: RNG): Team {
  const shuffled = fisherYatesShuffle(players, rng);
  
  const ct = shuffled.slice(0, 5);
  const tr = shuffled.slice(5);
  
  const ctSum = calculateSum(ct);
  const trSum = calculateSum(tr);
  const total = ctSum + trSum;
  
  return {
    ct,
    tr,
    ctSum,
    trSum,
    diff: Math.abs(ctSum - trSum),
    total
  };
}

/**
 * Modo BALANCEADO - Múltiplas tentativas para minimizar diff.
 * Implementa brute-force inteligente com early exit.
 * 
 * ALGORITMO:
 * 1. Embaralha jogadores (Fisher-Yates)
 * 2. Divide em dois times de 5
 * 3. Calcula diferença de força
 * 4. Mantém melhor resultado encontrado
 * 5. Repete até 800 tentativas ou diff = 0
 * 
 * @param players - Lista de 10 jogadores
 * @param rng - Gerador de números aleatórios
 * @param maxTries - Máximo de tentativas (padrão: 800)
 * @returns Times com menor diferença encontrada
 */
export function balancedTeams(
  players: Player[], 
  rng: RNG, 
  maxTries: number = 800
): Team {
  let best: Team | null = null;
  let bestDiff = Infinity;
  
  const total = players.reduce((sum, p) => sum + p.level, 0);
  
  for (let attempt = 0; attempt < maxTries; attempt++) {
    const shuffled = fisherYatesShuffle(players, rng);
    
    const ct = shuffled.slice(0, 5);
    const tr = shuffled.slice(5);
    
    const ctSum = calculateSum(ct);
    const trSum = calculateSum(tr);
    const diff = Math.abs(ctSum - trSum);
    
    if (diff < bestDiff) {
      bestDiff = diff;
      best = { ct, tr, ctSum, trSum, diff, total };
      
      // Early exit: diferença perfeita encontrada
      if (diff === 0) break;
    }
  }
  
  return best!;
}

/**
 * Função principal de geração de times.
 * Seleciona o modo apropriado e executa.
 * 
 * @param players - Lista de 10 jogadores
 * @param mode - "RANDOM" ou "BALANCED"
 * @param rng - Gerador de números aleatórios
 * @returns Times gerados com estatísticas
 */
export function generateTeams(
  players: Player[],
  mode: 'RANDOM' | 'BALANCED',
  rng: RNG
): Team {
  // Validar entrada
  if (players.length !== 10) {
    throw new Error('É necessário exatamente 10 jogadores');
  }
  
  for (const player of players) {
    if (!player.name.trim()) {
      throw new Error('Todos os jogadores devem ter um nome');
    }
    if (player.level < 1 || player.level > 10) {
      throw new Error('Níveis devem estar entre 1 e 10');
    }
  }
  
  // Executar modo selecionado
  if (mode === 'RANDOM') {
    return randomBalance(players, rng);
  }
  
  return balancedTeams(players, rng);
}
