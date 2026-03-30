/**
 * ─────────────────────────────────────────────
 * RNG DETERMINÍSTICO - Mulberry32
 * ─────────────────────────────────────────────
 * Implementação do algoritmo Mulberry32 para geração
 * de números pseudo-aleatórios determinísticos.
 * 
 * CARACTERÍSTICAS:
 * - Mesma seed = mesmo resultado
 * - Reproduzível e auditável
 * - Rápido e eficiente
 * - Período de 2^32
 * ─────────────────────────────────────────────
 */

export type RNG = () => number;

/**
 * Cria um gerador de números aleatórios determinístico
 * usando o algoritmo Mulberry32.
 * 
 * @param seed - Número inteiro para inicialização (0 a 4294967295)
 * @returns Função que retorna números entre 0 e 1
 */
export function mulberry32(seed: number): RNG {
  return function(): number {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/**
 * Gera uma seed aleatória baseada no timestamp atual.
 * Usado quando o usuário não fornece uma seed manual.
 * 
 * @returns String representando a seed numérica
 */
export function generateSeed(): string {
  // Combina timestamp com Math.random para unicidade
  // Math.random é usado APENAS aqui para gerar seeds únicas
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return String((timestamp * 1000 + random) % 4294967296);
}

/**
 * Converte uma string de seed para número válido.
 * Garante que a seed esteja no range válido (0 a 4294967295).
 * 
 * @param seedStr - String representando a seed
 * @returns Número de seed válido
 */
export function parseSeed(seedStr: string): number {
  let hash = 0;
  
  if (seedStr.length === 0) return hash;
  
  // Se for um número puro, usar diretamente
  if (/^\d+$/.test(seedStr)) {
    const num = parseInt(seedStr, 10);
    return Math.abs(num) % 4294967296;
  }
  
  // Caso contrário, gerar hash da string
  for (let i = 0; i < seedStr.length; i++) {
    const char = seedStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash);
}

/**
 * Gera um número inteiro aleatório entre min e max (inclusive)
 * usando o RNG fornecido.
 * 
 * @param rng - Gerador de números aleatórios
 * @param min - Valor mínimo (inclusive)
 * @param max - Valor máximo (inclusive)
 * @returns Número inteiro aleatório
 */
export function randomInt(rng: RNG, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}
