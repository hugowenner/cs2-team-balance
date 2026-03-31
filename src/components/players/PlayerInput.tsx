"use client";

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import type { Player } from '@/types/match';

interface PlayerInputProps {
  index: number;
  player: Player;
  onChange: (index: number, field: 'name' | 'level', value: string | number) => void;
  hasError: boolean[];
}

export function PlayerInput({ index, player, onChange, hasError }: PlayerInputProps) {
  const displayIndex = index + 1;
  const hasNameError = hasError[index];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="relative"
    >
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 w-7 h-7 rounded-md bg-white/5 border border-white/10 
          flex items-center justify-center text-xs font-bold text-white/40">
          {displayIndex}
        </div>
        
        <div className="flex-1 relative">
          <Input
            placeholder={`Jogador ${displayIndex}`}
            value={player.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
            className={`h-9 text-sm pr-8 bg-white/5 border-white/10 
              focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(0,242,255,0.1)]
              transition-all duration-200
              ${hasNameError ? 'border-red-500/50 bg-red-500/5' : ''}`}
          />
          {hasNameError && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <AlertCircle className="w-4 h-4 text-red-400" />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Label className="text-xs text-white/40 font-medium">Nível</Label>
          <select
            value={player.level}
            onChange={(e) => {
              const value = Number(e.target.value);
              // Validação para garantir que está entre 1 e 21
              const validValue = Math.min(21, Math.max(1, value));
              onChange(index, 'level', validValue);
            }}
            className="w-16 h-9 px-2 text-sm bg-white/5 border border-white/10 
              rounded-md focus:border-cyan-500/50 focus:outline-none
              transition-all duration-200"
          >
            {Array.from({ length: 21 }, (_, i) => i + 1).map(level => (
              <option key={level} value={level} className="bg-zinc-900">
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}