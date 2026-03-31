"use client";

import { Input } from '@/components/ui/input';
import type { Player } from '@/types/match';

interface PlayerInputProps {
  index: number;
  player: Player;
  onChange: (index: number, field: string, value: string | number) => void;
  hasError: boolean;
}

export function PlayerInput({ index, player, onChange, hasError }: PlayerInputProps) {
  return (
    <div className="flex gap-2">
      <div className="w-8 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 
        border border-white/20 flex items-center justify-center text-[10px] font-black text-white/60">
        {index + 1}
      </div>
      <Input
        placeholder="Nome do jogador"
        value={player.name}
        onChange={(e) => onChange(index, 'name', e.target.value)}
        className={`flex-1 h-10 bg-[#0b1220] border-white/10 text-sm font-medium
          focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(0,242,255,0.1)]
          transition-all duration-200 ${
          hasError && !player.name.trim() 
            ? 'border-red-500/50 bg-red-500/5' 
            : ''
        }`}
      />
      <div className="relative">
        <select
          value={player.level}
          onChange={(e) => onChange(index, 'level', Number(e.target.value))}
          className="h-10 w-16 rounded-lg bg-[#0b1220] border border-white/10 
            text-sm font-medium text-white/80 appearance-none cursor-pointer
            focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(0,242,255,0.1)]
            transition-all duration-200 pl-3 pr-7"
        >
          {[1,2,3,4,5,6,7,8,9,10].map(lvl => (
            <option key={lvl} value={lvl} className="bg-[#0b1220] text-white">
              {lvl}
            </option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}