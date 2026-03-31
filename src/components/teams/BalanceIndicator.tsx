"use client";

import { motion } from 'framer-motion';

interface BalanceIndicatorProps {
  diff: number;
  ctSum: number;
  trSum: number;
  total: number;
}

export function BalanceIndicator({ diff, ctSum, trSum, total }: BalanceIndicatorProps) {
  const ctPercent = (ctSum / total) * 100;
  const trPercent = (trSum / total) * 100;

  // Ajustado para escala 1-21 (total máximo: 105)
  // 0 = perfeito, <=5 = bom (≈5% do total), >5 = precisa melhorar
  const getDiffColor = () => {
    if (diff === 0) return 'text-green-400';
    if (diff <= 5) return 'text-amber-400';
    return 'text-red-400';
  };

  const getDiffLabel = () => {
    if (diff === 0) return 'Perfeito';
    if (diff <= 5) return 'Bom';
    return 'Precisa Melhorar';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
    >
      <div className="text-center mb-3">
        <div className="text-[10px] text-white/40 font-bold tracking-widest uppercase mb-1">
          Qualidade do Balanceamento
        </div>
        <div className={`text-2xl font-black ${getDiffColor()}`}>
          {diff}
        </div>
        <div className={`text-xs font-medium mt-1 ${getDiffColor()}`}>
          {getDiffLabel()}
        </div>
      </div>
      
      <div className="relative h-8 rounded-full bg-[#0b1220] border border-white/10">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-600 to-blue-600 
            transition-all duration-1000 ease-out"
          style={{ width: `${ctPercent}%` }}
        />
        <div 
          className="absolute right-0 top-0 h-full bg-gradient-to-l from-red-600 to-orange-600 
            transition-all duration-1000 ease-out"
          style={{ width: `${trPercent}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-black text-white/80 bg-[#080c14] px-2 py-1 rounded-md">
            Diferença: {diff}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-white/60">CT: {ctPercent.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/60">TR: {trPercent.toFixed(1)}%</span>
          <div className="w-2 h-2 rounded-full bg-red-400" />
        </div>
      </div>
    </motion.div>
  );
}