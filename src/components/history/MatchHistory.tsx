import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2, Scale, Shuffle } from 'lucide-react';
import type { Match } from '@/types/match';

interface MatchHistoryProps {
  matches: Match[];
  onSelect: (match: Match) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  isRecreating?: boolean;
}

export function MatchHistory({ 
  matches, 
  onSelect, 
  onDelete, 
  loading,
  isRecreating = false 
}: MatchHistoryProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white"
        />
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 
          flex items-center justify-center mx-auto mb-4">
          <Scale className="w-8 h-8 text-white/20" />
        </div>
        <p className="text-sm text-white/40 font-medium">
          Nenhuma partida encontrada
        </p>
        <p className="text-xs text-white/20 mt-1">
          As partidas sorteadas aparecerão aqui
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-3">
          {matches.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="group relative p-4 rounded-xl border border-white/10 
                bg-gradient-to-br from-white/5 to-transparent
                hover:border-white/20 hover:shadow-[0_0_20px_rgba(0,242,255,0.05)]
                transition-all duration-200 cursor-pointer"
              onClick={() => !isRecreating && onSelect(match)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/5">
                    {match.mode === 'BALANCED' ? (
                      <Scale className="w-4 h-4 text-green-400" />
                    ) : (
                      <Shuffle className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-white/40">
                      {new Date(match.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}
                    </div>
                    <div className="text-sm font-mono text-cyan-400">
                      Seed: {match.seed}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 hover:bg-cyan-500/10 hover:text-cyan-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(match);
                    }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 hover:bg-red-500/10 hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Tem certeza que deseja excluir esta partida?')) {
                        onDelete(match.id);
                      }
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Teams Preview */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-cyan-400">CT</span>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                      {match.result.ctSum}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {match.result.ct.slice(0, 3).map((p, i) => (
                      <div key={i} className="text-[10px] text-white/40 truncate">
                        {p.name}
                      </div>
                    ))}
                    {match.result.ct.length > 3 && (
                      <div className="text-[10px] text-white/20">
                        +{match.result.ct.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-red-400">TR</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                      {match.result.trSum}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {match.result.tr.slice(0, 3).map((p, i) => (
                      <div key={i} className="text-[10px] text-white/40 truncate">
                        {p.name}
                      </div>
                    ))}
                    {match.result.tr.length > 3 && (
                      <div className="text-[10px] text-white/20">
                        +{match.result.tr.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                <div 
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    match.diff === 0 
                      ? 'bg-green-500/10 text-green-400' 
                      : match.diff <= 2 
                        ? 'bg-amber-500/10 text-amber-400' 
                        : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  Diff: {match.diff}
                </div>
                <div className="flex items-center gap-1 text-cyan-400 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-200">
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Visualizar</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}