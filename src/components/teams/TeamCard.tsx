"use client";

import { motion } from 'framer-motion';
import type { Player } from '@/types/match';

interface TeamCardProps {
  team: Player[];
  side: 'CT' | 'TR';
  sum: number;
  isStronger: boolean;
  delay: number;
}

export function TeamCard({ team, side, sum, isStronger, delay }: TeamCardProps) {
  const sideColors = {
    CT: 'from-cyan-600 to-blue-600',
    TR: 'from-red-600 to-orange-600'
  };

  const sideBg = {
    CT: 'from-cyan-500/5 to-blue-500/5',
    TR: 'from-red-500/5 to-orange-500/5'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`p-5 rounded-2xl border border-white/10 bg-gradient-to-br ${sideBg[side]} 
        relative overflow-hidden group`}
    >
      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
          bg-gradient-to-br ${sideColors[side]} opacity-10`}
      />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative">
        <div className="flex items-center gap-3">
          <div 
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sideColors[side]} 
              flex items-center justify-center text-lg font-black text-white shadow-lg`}
          >
            {side}
          </div>
          <div>
            <div className="text-[10px] text-white/40 font-bold tracking-widest uppercase">
              Time {side}
            </div>
            <div className="text-2xl font-black text-white">
              {sum}
              <span className="text-xs text-white/40 ml-1">pontos</span>
            </div>
          </div>
        </div>
        {isStronger && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/30"
          >
            <span className="text-[10px] font-bold text-green-400">Forte</span>
          </motion.div>
        )}
      </div>

      {/* Players List */}
      <div className="space-y-2 relative">
        {team.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.05 + i * 0.03 }}
            className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10
              hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-white/20 to-white/5 
                border border-white/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white/60">{i + 1}</span>
              </div>
              <span className="text-sm font-medium text-white/90">{p.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className={`w-1.5 h-1.5 rounded-full ${
                      j < Math.floor(p.level / 2) 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-400' 
                        : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-white/60 w-4 text-right">{p.level}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}