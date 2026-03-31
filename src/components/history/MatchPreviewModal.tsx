// src/components/history/MatchPreviewModal.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Scale, Shuffle, Users, RefreshCw } from 'lucide-react';
import type { Match } from '@/types/match';
import { toast } from 'sonner';

interface MatchPreviewModalProps {
  match: Match | null;
  isOpen: boolean;
  onClose: () => void;
  onRecreate: (match: Match) => void;
  isRecreating?: boolean;
}

export function MatchPreviewModal({ 
  match, 
  isOpen, 
  onClose, 
  onRecreate, 
  isRecreating = false 
}: MatchPreviewModalProps) {
  const handleRecreate = () => {
    if (!match) return;
    
    onRecreate(match);
    toast.success("Partida carregada com sucesso!");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && match && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-2xl bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  {match.mode === 'BALANCED' ? (
                    <Scale className="w-5 h-5 text-green-400" />
                  ) : (
                    <Shuffle className="w-5 h-5 text-amber-400" />
                  )}
                  Detalhes da Partida
                </DialogTitle>
                
              </div>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={`${
                      match.mode === 'BALANCED' 
                        ? 'border-green-500/30 text-green-400 bg-green-500/10' 
                        : 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                    }`}
                  >
                    {match.mode === 'BALANCED' ? 'Balanceado' : 'Random'}
                  </Badge>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400 bg-zinc-800/50">
                    Seed: {match.seed}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`${
                      match.diff === 0 
                        ? 'border-green-500/30 text-green-400 bg-green-500/10' 
                        : match.diff <= 2 
                          ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' 
                          : 'border-red-500/30 text-red-400 bg-red-500/10'
                    }`}
                  >
                    Diferença: {match.diff}
                  </Badge>
                </div>
                <div className="text-zinc-400 text-sm">
                  {new Date(match.createdAt).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              {/* Teams */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CT Team */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-cyan-400 font-bold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Time CT
                    </h3>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      {match.result.ctSum} pontos
                    </Badge>
                  </div>
                  <ScrollArea className="h-64 rounded-lg border border-zinc-800 bg-zinc-800/30 p-3">
                    <div className="space-y-2">
                      {match.result.ct.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded bg-zinc-800/50">
                          <span className="text-sm font-medium">{player.name}</span>
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            Nível {player.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                {/* TR Team */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-red-400 font-bold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Time TR
                    </h3>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      {match.result.trSum} pontos
                    </Badge>
                  </div>
                  <ScrollArea className="h-64 rounded-lg border border-zinc-800 bg-zinc-800/30 p-3">
                    <div className="space-y-2">
                      {match.result.tr.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded bg-zinc-800/50">
                          <span className="text-sm font-medium">{player.name}</span>
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            Nível {player.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <Button variant="outline" onClick={onClose} className="border-zinc-700 text-zinc-300">
                  Fechar
                </Button>
                <Button 
                  onClick={handleRecreate} 
                  disabled={isRecreating}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                >
                  {isRecreating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white mr-2"
                      />
                      Carregando...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Recriar Partida
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}