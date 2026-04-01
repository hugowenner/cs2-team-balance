"use client";

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Zap, 
  RefreshCw, 
  AlertCircle, 
  Scale, 
  Shuffle, 
  Trash2,
  Copy,
  Check
} from 'lucide-react';

import { Header } from "@/components/layout/Header";
import FooterAccordion from '@/components/layout/FooterAccordion';

// Components
import { PlayerInput } from '@/components/players/PlayerInput';
import { TeamCard } from '@/components/teams/TeamCard';
import { BalanceIndicator } from '@/components/teams/BalanceIndicator';

// Hooks
import { usePlayers } from '@/hooks/usePlayers';
import { useMatch } from '@/hooks/useMatch';

export default function NoFearCommunityGames() {
  const [activeTab, setActiveTab] = useState("play");

  // Players Hook
  const {
    players,
    errors,
    isValid,
    filledCount,
    avgLevel,
    totalPoints,
    handleChange,
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
    clearResult,
    resetAll,
    handleCopySeed,
  } = useMatch();

  // Handlers
  const onShuffle = useCallback(() => {
    handleShuffle(players, isValid, triggerErrors);
  }, [handleShuffle, players, isValid, triggerErrors]);

  const onReset = useCallback(() => {
    if (window.confirm('Tem certeza que deseja limpar tudo?')) {
      resetPlayers();
      resetAll();
    }
  }, [resetPlayers, resetAll]);

  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab);
    },
    []
  );

  return (
    <div className="min-h-screen bg-[#080c14] text-white font-sans relative overflow-x-hidden">
      {/* Header - ÚNICO HEADER */}
      <Header 
        activeTab={activeTab} 
        onChangeTab={handleTabChange} 
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
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

          <p
            className="
              mt-3
              text-base sm:text-lg lg:text-xl
              font-semibold
              tracking-wide
              leading-relaxed
              bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400
              bg-clip-text text-transparent
            "
          >
            Monte partidas equilibradas com precisão e jogue em nível competitivo de verdade.
          </p>
        </motion.div>

        {/* Tabs - CORRIGIDO PARA USAR value={activeTab} */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full grid grid-cols-1 mb-6 bg-[#0b1220] rounded-xl p-1 h-auto border border-white/10">
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

        </Tabs>

        <FooterAccordion />
      </div>
    </div>
  );
}