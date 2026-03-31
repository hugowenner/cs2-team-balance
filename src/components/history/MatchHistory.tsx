// src/components/history/MatchHistory.tsx
"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Trash2, Scale, Shuffle, Eye } from 'lucide-react';
import type { Match } from '@/types/match';
import { useState } from 'react';
import { MatchPreviewModal } from './MatchPreviewModal';

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
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleRecreate = (match: Match) => {
    onSelect(match);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Pequeno atraso para permitir que a animação do modal termine
    setTimeout(() => setSelectedMatch(null), 300);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-500"
        />
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 
          flex items-center justify-center mx-auto mb-4">
          <History className="w-8 h-8 text-white/30" />
        </div>
        <p className="text-sm text-white/40 font-medium">Nenhuma partida no histórico</p>
        <p className="text-xs text-white/20 mt-1">As partidas aparecem aqui após o sorteio</p>
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-[450px] pr-2">
        <div className="space-y-3">
          {matches.map((match, idx) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative p-4 rounded-xl border border-white/10 
                bg-gradient-to-br from-white/5 to-transparent 
                hover:from-white/10 hover:border-white/20 
                transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleMatchClick(match)}
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase 
                        flex items-center gap-1 ${
                        match.mode === 'BALANCED' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {match.mode === 'BALANCED' ? <Scale className="w-3 h-3" /> : <Shuffle className="w-3 h-3" />}
                      {match.mode === 'BALANCED' ? 'Balanceado' : 'Random'}
                    </div>
                    <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                      <span className="text-[10px] font-mono text-white/40">{match.seed}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/30">
                      {new Date(match.createdAt).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-all duration-200 
                        hover:bg-red-500/10 hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(match.id);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Teams */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400">CT</span>
                      <span className="text-xs font-bold text-white/60">{match.result.ctSum}</span>
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
                  
                  <div className="space-y-1.5 text-right">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white/60">{match.result.trSum}</span>
                      <span className="text-xs font-bold text-red-400">TR</span>
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
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      
      <MatchPreviewModal
        match={selectedMatch}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRecreate={handleRecreate}
        isRecreating={isRecreating}
      />
    </>
  );
}