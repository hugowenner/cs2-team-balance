"use client";

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Zap, 
  RefreshCw, 
  AlertCircle, 
  Scale, 
  Shuffle, 
  History, 
  Trash2,
  Copy,
  Check
} from 'lucide-react';

// Components
import { PlayerInput } from '@/components/players/PlayerInput';
import { TeamCard } from '@/components/teams/TeamCard';
import { BalanceIndicator } from '@/components/teams/BalanceIndicator';
import { MatchHistory } from '@/components/history/MatchHistory';
import { MatchPreviewModal } from '@/components/history/MatchPreviewModal';

// Hooks
import { usePlayers } from '@/hooks/usePlayers';
import { useMatch } from '@/hooks/useMatch';
import { useMatchHistory } from '@/hooks/useMatchHistory';

// Types
import type { Match } from '@/types/match';

export default function NoFearCommunityGames() {
  // Estado para o modal de visualização
  const [selectedMatchForView, setSelectedMatchForView] = useState<Match | null>(null);
  const [isRecreating, setIsRecreating] = useState(false);

  // Players Hook
  const {
    players,
    errors,
    isValid,
    filledCount,
    avgLevel,
    totalPoints,
    handleChange,
    setPlayersData,
    resetPlayers,
    triggerErrors,
  } = usePlayers();

  // Match Hook
  const {
    result,
    currentMatch,
    loading,
    mode,
    customSeed,
    useCustomSeed,
    copied,
    setCustomSeed,
    setUseCustomSeed,
    handleShuffle,
    loadMatch,
    clearResult,
    resetAll,
    handleCopySeed,
  } = useMatch();

  // History Hook
  const {
    matches: historyMatches,
    loading: historyLoading,
    loadHistory,
    deleteMatch,
  } = useMatchHistory();

  // Handlers
  const onShuffle = useCallback(() => {
    handleShuffle(players, isValid, triggerErrors);
  }, [handleShuffle, players, isValid, triggerErrors]);

  // Handler para ABRIR o modal de visualização
  const handleViewMatch = useCallback((match: Match) => {
    setSelectedMatchForView(match);
  }, []);

  // Handler para RECRIAR a partida (vindo do modal)
  const handleRecreateMatch = useCallback(() => {
    if (!selectedMatchForView) return;
    
    setIsRecreating(true);
    // Simula um pequeno atraso para dar feedback visual
    setTimeout(() => {
      loadMatch(selectedMatchForView);
      setPlayersData(selectedMatchForView.players);
      setSelectedMatchForView(null); // Fecha o modal
      setIsRecreating(false);
      toast.success('Partida recriada com sucesso! Você pode editar os jogadores ou sortear novamente.');
    }, 500);
  }, [selectedMatchForView, loadMatch, setPlayersData]);

  // Handler para fechar o modal
  const handleCloseModal = useCallback(() => {
    setSelectedMatchForView(null);
  }, []);

  const onReset = useCallback(() => {
    if (window.confirm('Tem certeza que deseja limpar tudo?')) {
      resetPlayers();
      resetAll();
    }
  }, [resetPlayers, resetAll]);

  const handleTabChange = useCallback(
    (tab: string) => {
      if (tab === 'history') {
        loadHistory();
      }
    },
    [loadHistory]
  );

  return (
    <div className="min-h-screen bg-[#080c14] text-white font-sans relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 242, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 242, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0, 242, 255, 0.08) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255, 42, 42, 0.06) 0%, transparent 70%)' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 sm:py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-[10px] sm:text-xs font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(0, 242, 255, 0.08)',
              border: '1px solid rgba(0, 242, 255, 0.2)',
              color: '#00f2ff',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Counter-Strike 2 · 5v5
          </motion.div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-2">
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
              No Fear
            </span>
            <span className="text-white"> CS2</span>
          </h1>

          <p className="text-xs sm:text-sm text-white/35 font-medium tracking-wide">
            Balanceamento determinístico · Seed reproduzível · Auditoria completa
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="play" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="w-full grid grid-cols-2 mb-6 bg-[#0b1220] rounded-xl p-1 h-auto border border-white/10">
            <TabsTrigger 
              value="play" 
              className="rounded-lg py-2.5 text-xs sm:text-sm font-semibold 
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 
                data-[state=active]:to-blue-600 data-[state=active]:text-white
                data-[state=inactive]:text-white/50 hover:text-white/80
                transition-all duration-200"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Sortear
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="rounded-lg py-2.5 text-xs sm:text-sm font-semibold 
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 
                data-[state=active]:to-blue-600 data-[state=active]:text-white
                data-[state=inactive]:text-white/50 hover:text-white/80
                transition-all duration-200"
            >
              <History className="w-4 h-4 mr-2" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="play">
            {/* Settings */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-white/50 mb-2 block">Modo de Geração</Label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 font-medium bg-gradient-to-r from-green-600 to-emerald-600 
                        text-white shadow-lg shadow-green-600/20 cursor-default"
                      disabled
                    >
                      <Scale className="w-3 h-3 mr-1" />
                      Balanceado
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-white/50">Seed Manual</Label>
                    <Switch
                      checked={useCustomSeed}
                      onCheckedChange={setUseCustomSeed}
                      className="scale-75 data-[state=checked]:bg-cyan-600"
                    />
                  </div>
                  <Input
                    placeholder="Seed numérica..."
                    value={customSeed}
                    onChange={(e) => setCustomSeed(e.target.value)}
                    disabled={!useCustomSeed}
                    className="bg-[#0b1220] border-white/10 text-sm font-mono 
                      disabled:opacity-40 disabled:cursor-not-allowed
                      focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(0,242,255,0.1)]
                      transition-all duration-200"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                      Algoritmo
                    </div>
                    <div className="text-sm font-semibold text-white/70">
                      {mode === 'BALANCED' ? '800 tentativas' : 'Fisher-Yates'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Players Grid - Before Shuffle */}
            {!result && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {/* List 1 - Players 1-5 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
                >
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black
                      bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                      <Users className="w-4 h-4 text-white/60" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40 font-bold tracking-widest uppercase">
                        Lista de Jogadores
                      </div>
                      <div className="text-sm font-bold text-white/80">Jogadores 1–5</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {players.slice(0, 5).map((p, i) => (
                      <PlayerInput
                        key={i}
                        index={i}
                        player={p}
                        onChange={handleChange}
                        hasError={errors}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* List 2 - Players 6-10 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
                >
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black
                      bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                      <Users className="w-4 h-4 text-white/60" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40 font-bold tracking-widest uppercase">
                        Lista de Jogadores
                      </div>
                      <div className="text-sm font-bold text-white/80">Jogadores 6–10</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {players.slice(5, 10).map((p, i) => (
                      <PlayerInput
                        key={i + 5}
                        index={i + 5}
                        player={p}
                        onChange={handleChange}
                        hasError={errors}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Teams Grid - After Shuffle */}
            {result && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <TeamCard
                  team={result.ct}
                  side="CT"
                  sum={result.ctSum}
                  isStronger={result.ctSum > result.trSum}
                  delay={0.1}
                />
                <TeamCard
                  team={result.tr}
                  side="TR"
                  sum={result.trSum}
                  isStronger={result.trSum > result.ctSum}
                  delay={0.2}
                />
              </div>
            )}

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl 
                bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 mb-4"
            >
              {[
                { label: 'Jogadores', val: `${filledCount}/10`, icon: Users, color: '#22c55e' },
                { label: 'Nível Médio', val: avgLevel, icon: TrendingUp, color: '#fbbf24' },
                { label: 'Total', val: totalPoints, icon: Target, color: '#a78bfa' },
                { label: 'Modo', val: mode === 'BALANCED' ? '⚖️' : '🎲', icon: Zap, color: '#94a3b8' },
              ].map((stat) => (
                <div key={stat.label} className="flex-1 min-w-[80px] text-center px-2">
                  <div className="text-[10px] text-white/30 font-semibold tracking-wider uppercase mb-0.5 flex items-center justify-center gap-1">
                    <stat.icon className="w-3 h-3" />
                    {stat.label}
                  </div>
                  <div className="text-sm sm:text-base font-bold" style={{ color: stat.color }}>
                    {stat.val}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Empty State */}
            {!result && filledCount === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-6 rounded-xl border border-dashed border-white/20 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 
                  flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white/30" />
                </div>
                <p className="text-sm text-white/40 font-medium mb-1">
                  Preencha os jogadores para gerar os times
                </p>
                <p className="text-xs text-white/20">
                  Adicione o nome e nível de habilidade de cada jogador
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            <AnimatePresence>
              {errors && !isValid && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30"
                >
                  <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                    <AlertCircle className="w-4 h-4" />
                    <span>Preencha o nome de todos os 10 jogadores antes de sortear.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Shuffle Button */}
            {!result && (
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  onClick={onShuffle}
                  disabled={loading}
                  className="w-full py-6 sm:py-8 rounded-xl text-sm sm:text-base font-bold 
                    tracking-wider uppercase bg-gradient-to-r from-cyan-600 to-blue-600 
                    hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/20 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                      />
                      <span>Balanceando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5" />
                      <span>Sortear Times</span>
                    </div>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Result */}
            <AnimatePresence>
              {result && currentMatch && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-8"
                >
                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="h-px mb-6"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.3), rgba(255, 42, 42, 0.3), transparent)',
                    }}
                  />

                  {/* Result Header */}
                  <div className="text-center mb-6">
                    <div className="text-[10px] text-white/30 font-bold tracking-widest uppercase mb-1">
                      Resultado do Balanceamento
                    </div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight flex items-center justify-center gap-2">
                      <span>Times Gerados</span>
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-green-400 text-sm"
                      >
                        ●
                      </motion.span>
                    </div>
                  </div>

                  {/* Seed Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-center gap-3 mb-6 p-3 rounded-xl 
                      bg-gradient-to-r from-white/5 to-transparent border border-white/10"
                  >
                    <span className="text-xs text-white/40 font-mono">Seed:</span>
                    <code className="text-sm font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-md">
                      {currentMatch.seed}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-200"
                      onClick={handleCopySeed}
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-white/50" />
                      )}
                    </Button>
                  </motion.div>

                  {/* Balance Indicator */}
                  <BalanceIndicator
                    diff={result.diff}
                    ctSum={result.ctSum}
                    trSum={result.trSum}
                    total={result.total}
                  />

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 flex gap-3"
                  >
                    <Button
                      onClick={onShuffle}
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 
                        hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/20
                        transition-all duration-200"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Novo Sorteio
                    </Button>
                    <Button
                      onClick={clearResult}
                      className="flex-1 py-4 text-base font-bold 
                        bg-gradient-to-r from-amber-500 to-orange-500
                        hover:from-amber-400 hover:to-orange-400
                        text-white shadow-lg shadow-amber-500/20
                        transition-all duration-200 rounded-xl"
                    >
                      Editar Jogadores
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onReset}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300
                        hover:border-red-500/50 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Resetar Tudo
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="history">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white/80 flex items-center gap-2">
                  <History className="w-5 h-5 text-cyan-400" />
                  Partidas Anteriores
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadHistory}
                  className="border-white/20 text-white/60 hover:text-white 
                    hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Atualizar
                </Button>
              </div>
              <MatchHistory
                matches={historyMatches}
                onSelect={handleViewMatch}
                onDelete={deleteMatch}
                loading={historyLoading}
                isRecreating={isRecreating}
              />
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Modal de Visualização de Partida */}
        <MatchPreviewModal
          match={selectedMatchForView}
          isOpen={!!selectedMatchForView}
          onClose={handleCloseModal}
          onRecreate={handleRecreateMatch}
          isRecreating={isRecreating}
        />

        {/* SEO Content */}
        <section className="mt-16 max-w-3xl mx-auto text-sm text-white/70 space-y-4 px-4">
          <h2 className="text-lg font-bold text-white">CS2 Team Balance Tool</h2>
          <p>
            This CS2 team balance tool automatically creates fair teams in Counter-Strike 2.
            It distributes players based on skill level to ensure competitive and balanced matches.
          </p>
          <h3 className="text-md font-semibold text-white">How to balance teams in CS2</h3>
          <p>
            Balancing teams manually in CS2 can be difficult. This tool uses a deterministic algorithm
            to generate fair teams instantly. Just enter player levels and generate teams.
          </p>
          <h3 className="text-md font-semibold text-white">Why use this CS2 team balancer?</h3>
          <ul className="list-disc ml-4">
            <li>Fair matches</li>
            <li>Fast team generation</li>
            <li>Perfect for 5v5 lobbies</li>
            <li>Ideal for friends and competitive games</li>
          </ul>
        </section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-[10px] text-white/15 font-medium tracking-wider"
        >
          CS2 NO FEAR · RNG Determinístico · Sistema Auditável
        </motion.div>
      </div>
    </div>
  );
}