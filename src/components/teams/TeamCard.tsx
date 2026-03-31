import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp } from 'lucide-react';
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
    CT: 'from-cyan-600/20 to-blue-600/20 border-cyan-500/30',
    TR: 'from-red-600/20 to-orange-600/20 border-red-500/30',
  };

  const sideTextColors = {
    CT: 'text-cyan-400',
    TR: 'text-red-400',
  };

  const avgLevel = (sum / team.length).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative p-5 rounded-2xl border bg-gradient-to-br ${sideColors[side]}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black
            bg-white/5 border border-white/20 ${sideTextColors[side]}`}>
            {side}
          </div>
          <div>
            <div className="text-[10px] text-white/40 font-bold tracking-widest uppercase">
              Time
            </div>
            <div className="text-sm font-bold text-white/80">
              {side === 'CT' ? 'Contra-Terroristas' : 'Terroristas'}
            </div>
          </div>
        </div>
        
        {isStronger && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30"
          >
            <span className="text-xs font-bold text-green-400">Forte</span>
          </motion.div>
        )}
      </div>

      {/* Players List */}
      <div className="space-y-2 mb-4">
        {team.map((player, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.05 + idx * 0.03 }}
            className="flex items-center justify-between p-2 rounded-lg bg-white/5"
          >
            <span className="text-sm font-medium text-white/90">{player.name}</span>
            <Badge variant="outline" className="border-white/20 text-white/60 bg-white/5">
              Nível {player.level}
            </Badge>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-white/40" />
            <span className="text-xs text-white/40">5 jogadores</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-white/40" />
            <span className="text-xs text-white/40">Média {avgLevel}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/40">Total</div>
          <div className={`text-lg font-bold ${sideTextColors[side]}`}>
            {sum} pts
          </div>
        </div>
      </div>
    </motion.div>
  );
}