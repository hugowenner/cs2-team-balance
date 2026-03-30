'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, 
  History, 
  Settings, 
  Shuffle, 
  Scale, 
  X,
  Copy,
  Check,
  Play,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Player, 
  TeamResult, 
  GameMode, 
  Match, 
  LEVEL_COLORS, 
  LEVEL_LABELS 
} from '@/types';

// ─────────────────────────────────────────────
// COMPONENTE: PlayerInput
// ─────────────────────────────────────────────
function PlayerInput({ 
  index, 
  player, 
  onChange, 
  hasError 
}: { 
  index: number; 
  player: Player; 
  onChange: (index: number, field: string, value: string | number) => void;
  hasError: boolean;
}) {
  const [focused, setFocused] = useState<string | null>(null);
  const levelColor = LEVEL_COLORS[player.level] || '#6b7280';
  const isCT = index < 5;

  return (
    <motion.div
      initial={{ opacity: 0, x: isCT ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl backdrop-blur-sm border transition-all duration-200"
      style={{
        background: isCT 
          ? 'linear-gradient(90deg, rgba(0, 242, 255, 0.08), rgba(0, 242, 255, 0.02))'
          : 'linear-gradient(90deg, rgba(255, 42, 42, 0.08), rgba(255, 42, 42, 0.02))',
        borderColor: isCT 
          ? 'rgba(0, 242, 255, 0.15)' 
          : 'rgba(255, 42, 42, 0.15)',
      }}
    >
      {/* Badge */}
      <div 
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold shrink-0"
        style={{
          background: isCT ? 'rgba(0, 242, 255, 0.15)' : 'rgba(255, 42, 42, 0.15)',
          color: isCT ? '#00f2ff' : '#ff2a2a',
          border: `1px solid ${isCT ? 'rgba(0, 242, 255, 0.3)' : 'rgba(255, 42, 42, 0.3)'}`,
        }}
      >
        {index + 1}
      </div>

      {/* Input Nome */}
      <div className="flex-1 min-w-0">
        <motion.div
          animate={{
            boxShadow:
              focused === 'name'
                ? `0 0 0 2px ${levelColor}60`
                : hasError && !player.name
                ? '0 0 0 2px rgba(239, 68, 68, 0.5)'
                : '0 0 0 1px rgba(255, 255, 255, 0.08)',
          }}
          className="rounded-lg overflow-hidden"
        >
          <input
            type="text"
            placeholder={`Jogador ${index + 1}`}
            value={player.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            maxLength={20}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-black/40 border-0 outline-none text-white text-xs sm:text-sm font-medium placeholder:text-white/30"
          />
        </motion.div>
      </div>

      {/* Select Nível */}
      <div className="w-16 sm:w-20 shrink-0">
        <motion.div
          animate={{
            boxShadow:
              focused === 'level'
                ? `0 0 0 2px ${levelColor}60`
                : '0 0 0 1px rgba(255, 255, 255, 0.08)',
          }}
          className="rounded-lg overflow-hidden"
        >
          <select
            value={player.level}
            onChange={(e) => onChange(index, 'level', parseInt(e.target.value))}
            onFocus={() => setFocused('level')}
            onBlur={() => setFocused(null)}
            className="w-full px-1 sm:px-2 py-1.5 sm:py-2 bg-black/40 border-0 outline-none text-xs sm:text-sm font-bold cursor-pointer appearance-none text-center"
            style={{ color: levelColor }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n} className="bg-gray-900">
                {n} – {LEVEL_LABELS[n]}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      {/* Badge Nível */}
      <div
        className="hidden sm:block px-2 py-1 rounded-md text-[10px] font-bold tracking-wider min-w-[70px] text-center shrink-0"
        style={{
          background: `${levelColor}20`,
          border: `1px solid ${levelColor}40`,
          color: levelColor,
        }}
      >
        {LEVEL_LABELS[player.level]}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE: TeamCard
// ─────────────────────────────────────────────
function TeamCard({ 
  team, 
  side, 
  sum, 
  isStronger, 
  delay = 0 
}: { 
  team: Player[]; 
  side: 'CT' | 'TR'; 
  sum: number; 
  isStronger: boolean;
  delay?: number;
}) {
  const isCT = side === 'CT';
  const accent = isCT ? '#00f2ff' : '#ff2a2a';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-1 flex flex-col rounded-2xl overflow-hidden border"
      style={{
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
        borderColor: `${accent}25`,
        boxShadow: `0 10px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 ${accent}15`,
      }}
    >
      {/* Linha decorativa */}
      <div 
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* Header */}
      <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-sm sm:text-base font-black"
            style={{
              background: `linear-gradient(135deg, ${accent}25, transparent)`,
              border: `1px solid ${accent}40`,
              color: accent,
              boxShadow: `0 0 20px ${accent}20`,
            }}
          >
            {side}
          </div>
          <div>
            <div 
              className="text-[10px] sm:text-xs font-bold tracking-widest uppercase"
              style={{ color: `${accent}80` }}
            >
              {isCT ? 'COUNTER-TERRORISTS' : 'TERRORISTS'}
            </div>
            <div className="text-base sm:text-xl font-black text-white tracking-tight">
              SQUAD {side}
            </div>
          </div>
        </div>

        <div className="text-right flex flex-col items-end gap-1">
          {isStronger && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.3 }}
              className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase"
              style={{
                background: `${accent}15`,
                border: `1px solid ${accent}40`,
                color: accent,
              }}
            >
              ⚡ FAVORITO
            </motion.div>
          )}
          <div className="flex items-baseline gap-1">
            <span 
              className="text-2xl sm:text-4xl font-black text-white"
              style={{ textShadow: `0 0 30px ${accent}60` }}
            >
              {sum}
            </span>
            <span 
              className="text-xs sm:text-sm font-semibold uppercase"
              style={{ color: `${accent}70` }}
            >
              PTS
            </span>
          </div>
        </div>
      </div>

      {/* Players list */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        {team.map((player, i) => {
          const pColor = LEVEL_COLORS[player.level] || '#fff';
          return (
            <motion.div
              key={player.name + i}
              initial={{ opacity: 0, x: isCT ? -15 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 + i * 0.04, duration: 0.3 }}
              className="flex items-center justify-between p-2 sm:p-3 rounded-lg group transition-all duration-200 hover:bg-white/5"
              style={{
                borderLeft: `3px solid ${pColor}60`,
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div 
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs sm:text-sm font-bold"
                  style={{
                    background: `${pColor}15`,
                    border: `1px solid ${pColor}40`,
                    color: pColor,
                  }}
                >
                  {player.level}
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-gray-200 truncate">
                    {player.name}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase font-medium hidden sm:block">
                    {LEVEL_LABELS[player.level]}
                  </div>
                </div>
              </div>

              {/* Level Bar */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(player.level / 10) * 100}%` }}
                    transition={{ delay: delay + 0.2 + i * 0.04, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ background: pColor, boxShadow: `0 0 10px ${pColor}` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE: BalanceIndicator
// ─────────────────────────────────────────────
function BalanceIndicator({ 
  diff, 
  ctSum, 
  trSum, 
  total 
}: { 
  diff: number; 
  ctSum: number; 
  trSum: number; 
  total: number;
}) {
  const ctPct = total > 0 ? (ctSum / total) * 100 : 50;
  const quality = diff === 0 ? 'Perfeito' : diff === 1 ? 'Ótimo' : diff <= 3 ? 'Bom' : diff <= 5 ? 'Regular' : 'Desigual';
  const qualityColor = diff === 0 ? '#22c55e' : diff === 1 ? '#84cc16' : diff <= 3 ? '#eab308' : diff <= 5 ? '#f97316' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] sm:text-xs font-bold text-white/40 tracking-widest uppercase">
          Equilíbrio do Match
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
          style={{
            background: `${qualityColor}18`,
            border: `1px solid ${qualityColor}40`,
            color: qualityColor,
          }}
        >
          {diff === 0 ? '✦' : diff <= 2 ? '◆' : '◇'} {quality}
          {diff > 0 && <span className="opacity-70 font-medium">· Δ{diff}</span>}
        </motion.div>
      </div>

      {/* Barra split */}
      <div className="h-2 rounded-full overflow-hidden bg-white/5 relative">
        <motion.div
          initial={{ width: '50%' }}
          animate={{ width: `${ctPct}%` }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 h-full rounded-l-full"
          style={{ background: 'linear-gradient(90deg, #0ea5e9, #22d3ee)' }}
        />
        <motion.div
          initial={{ width: '50%' }}
          animate={{ width: `${100 - ctPct}%` }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 right-0 h-full rounded-r-full"
          style={{ background: 'linear-gradient(90deg, #f87171, #ef4444)' }}
        />
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-[10px] sm:text-xs font-semibold text-cyan-400">
          CT · {ctSum}pts · {ctPct.toFixed(1)}%
        </span>
        <span className="text-[10px] sm:text-xs font-semibold text-red-400">
          TR · {trSum}pts · {(100 - ctPct).toFixed(1)}%
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE: MatchHistory
// ─────────────────────────────────────────────
function MatchHistory({ 
  matches, 
  onSelect, 
  onDelete,
  loading 
}: { 
  matches: Match[]; 
  onSelect: (match: Match) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent"
        />
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12 text-white/40">
        <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Nenhuma partida no histórico</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-2">
      <div className="space-y-3">
        {matches.map((match, idx) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
            onClick={() => onSelect(match)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div 
                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                  style={{
                    background: match.mode === 'BALANCED' ? '#22c55e20' : '#eab30820',
                    color: match.mode === 'BALANCED' ? '#22c55e' : '#eab308',
                  }}
                >
                  {match.mode === 'BALANCED' ? '⚖️ Balanceado' : '🎲 Random'}
                </div>
                <span className="text-[10px] text-white/30 font-mono">
                  {match.seed}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">
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
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(match.id);
                  }}
                >
                  <Trash2 className="w-3 h-3 text-red-400" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="text-xs font-semibold text-cyan-400 mb-1">CT: {match.result.ctSum}</div>
                <div className="text-[10px] text-white/40 truncate">
                  {match.result.ct.map(p => p.name).join(', ')}
                </div>
              </div>
              <div className="text-lg font-bold text-white/30">VS</div>
              <div className="flex-1 text-right">
                <div className="text-xs font-semibold text-red-400 mb-1">TR: {match.result.trSum}</div>
                <div className="text-[10px] text-white/40 truncate">
                  {match.result.tr.map(p => p.name).join(', ')}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div 
                className="text-[10px] font-semibold"
                style={{
                  color: match.diff === 0 ? '#22c55e' : match.diff <= 3 ? '#eab308' : '#ef4444'
                }}
              >
                Diff: {match.diff}
              </div>
              <Play className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export default function NoFearCommunityGames() {
  // Estados
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: 10 }, () => ({ name: '', level: 5 }))
  );
  const [result, setResult] = useState<TeamResult | null>(null);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [mode, setMode] = useState<GameMode>('BALANCED');
  const [customSeed, setCustomSeed] = useState('');
  const [useCustomSeed, setUseCustomSeed] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Histórico
  const [historyMatches, setHistoryMatches] = useState<Match[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Handlers
  const handleChange = useCallback((index: number, field: string, value: string | number) => {
    setPlayers(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    if (errors) setErrors(false);
  }, [errors]);

  const isValid = players.every(p => p.name.trim().length > 0);

  // Carregar histórico
  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch('/api/matches?limit=50');
      const data = await res.json();
      if (data.success) {
        setHistoryMatches(data.data);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
    setHistoryLoading(false);
  }, []);

  // Carregar histórico quando a tab é selecionada
  const handleTabChange = useCallback((tab: string) => {
    if (tab === 'history') {
      loadHistory();
    }
  }, [loadHistory]);

  // Gerar times
  const handleShuffle = useCallback(async () => {
    if (!isValid) {
      setErrors(true);
      return;
    }

    setLoading(true);
    setResult(null);
    setCurrentMatch(null);

    try {
      const res = await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          players: players.map(p => ({ ...p, name: p.name.trim() })),
          mode,
          seed: useCustomSeed ? customSeed : undefined
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setResult(data.data.result);
        setCurrentMatch(data.data);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error creating match:', error);
    }

    setLoading(false);
  }, [players, mode, isValid, useCustomSeed, customSeed]);

  // Reexecutar partida do histórico
  const handleSelectMatch = useCallback((match: Match) => {
    setResult(match.result);
    setCurrentMatch(match);
    setPlayers(match.players);
    setMode(match.mode);
    setCustomSeed(match.seed);
    setUseCustomSeed(true);
    setShowHistory(false);
  }, []);

  // Deletar partida
  const handleDeleteMatch = useCallback(async (id: string) => {
    try {
      await fetch(`/api/matches/${id}`, { method: 'DELETE' });
      setHistoryMatches(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  }, []);

  // Copiar seed
  const handleCopySeed = useCallback(() => {
    if (currentMatch?.seed) {
      navigator.clipboard.writeText(currentMatch.seed);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [currentMatch]);

  // Estatísticas
  const avgLevel = (players.reduce((s, p) => s + p.level, 0) / 10).toFixed(1);
  const totalPoints = players.reduce((s, p) => s + p.level, 0);
  const filledCount = players.filter(p => p.name.trim()).length;

  return (
    <div className="min-h-screen bg-[#080c14] text-white font-sans relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grid */}
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
        {/* Glows */}
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0, 242, 255, 0.08) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255, 42, 42, 0.06) 0%, transparent 70%)' }}
        />
      </div>

      {/* Conteúdo */}
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
            <span 
              className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 bg-clip-text text-transparent"
            >
              No Fear
            </span>
            <span className="text-white"> CS2</span>
          </h1>

          <p className="text-xs sm:text-sm text-white/35 font-medium tracking-wide">
            Balanceamento determinístico · Seed reproduzível · Auditoria completa
          </p>
        </motion.div>

        {/* Tabs: Sortear / Histórico */}
        <Tabs defaultValue="play" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="w-full grid grid-cols-2 mb-6 bg-white/5 rounded-xl p-1 h-auto">
            <TabsTrigger 
              value="play" 
              className="rounded-lg py-2.5 text-xs sm:text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Sortear
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="rounded-lg py-2.5 text-xs sm:text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600"
            >
              <History className="w-4 h-4 mr-2" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="play">
            {/* Configurações */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Modo */}
                <div>
                  <Label className="text-xs text-white/50 mb-2 block">Modo de Geração</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={mode === 'RANDOM' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMode('RANDOM')}
                      className={`flex-1 ${mode === 'RANDOM' ? 'bg-amber-600 hover:bg-amber-700' : 'border-white/20'}`}
                    >
                      <Shuffle className="w-3 h-3 mr-1" />
                      Random
                    </Button>
                    <Button
                      variant={mode === 'BALANCED' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMode('BALANCED')}
                      className={`flex-1 ${mode === 'BALANCED' ? 'bg-green-600 hover:bg-green-700' : 'border-white/20'}`}
                    >
                      <Scale className="w-3 h-3 mr-1" />
                      Balanceado
                    </Button>
                  </div>
                </div>

                {/* Seed */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-white/50">Seed Manual</Label>
                    <Switch
                      checked={useCustomSeed}
                      onCheckedChange={setUseCustomSeed}
                      className="scale-75"
                    />
                  </div>
                  <Input
                    placeholder="Seed numérica..."
                    value={customSeed}
                    onChange={(e) => setCustomSeed(e.target.value)}
                    disabled={!useCustomSeed}
                    className="bg-black/40 border-white/10 text-sm font-mono disabled:opacity-40"
                  />
                </div>

                {/* Info */}
                <div className="flex items-center justify-center">
                  <div className="text-center">
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

            {/* Grid de Jogadores */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {/* CT Side */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 sm:p-5 rounded-2xl border"
                style={{
                  background: 'rgba(0, 242, 255, 0.03)',
                  borderColor: 'rgba(0, 242, 255, 0.15)',
                }}
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cyan-500/20">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                    style={{ 
                      background: 'rgba(0, 242, 255, 0.15)',
                      color: '#00f2ff'
                    }}
                  >
                    CT
                  </div>
                  <div>
                    <div className="text-[10px] text-cyan-400/60 font-bold tracking-widest uppercase">Lado Azul</div>
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

              {/* TR Side */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="p-4 sm:p-5 rounded-2xl border"
                style={{
                  background: 'rgba(255, 42, 42, 0.03)',
                  borderColor: 'rgba(255, 42, 42, 0.15)',
                }}
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-red-500/20">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                    style={{ 
                      background: 'rgba(255, 42, 42, 0.15)',
                      color: '#ff2a2a'
                    }}
                  >
                    TR
                  </div>
                  <div>
                    <div className="text-[10px] text-red-400/60 font-bold tracking-widest uppercase">Lado Vermelho</div>
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

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 mb-4"
            >
              {[
                { label: 'Jogadores', val: `${filledCount}/10`, color: '#22c55e' },
                { label: 'Nível Médio', val: avgLevel, color: '#fbbf24' },
                { label: 'Total', val: totalPoints, color: '#a78bfa' },
                { label: 'Modo', val: mode === 'BALANCED' ? '⚖️' : '🎲', color: '#94a3b8' },
              ].map((stat) => (
                <div key={stat.label} className="flex-1 min-w-[80px] text-center px-2">
                  <div className="text-[10px] text-white/30 font-semibold tracking-wider uppercase mb-0.5">
                    {stat.label}
                  </div>
                  <div className="text-sm sm:text-base font-bold" style={{ color: stat.color }}>
                    {stat.val}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {errors && !isValid && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium flex items-center gap-2"
                >
                  <span>⚠</span>
                  Preencha o nome de todos os 10 jogadores antes de sortear.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botão Sortear */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                onClick={handleShuffle}
                disabled={loading}
                className="w-full py-6 sm:py-8 rounded-xl text-sm sm:text-base font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/20 disabled:opacity-50"
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

            {/* Resultado */}
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

                  {/* Header Resultado */}
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
                    className="flex items-center justify-center gap-3 mb-6 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <span className="text-xs text-white/40">Seed:</span>
                    <code className="text-sm font-mono text-cyan-400">{currentMatch.seed}</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={handleCopySeed}
                    >
                      {copied ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-white/50" />
                      )}
                    </Button>
                  </motion.div>

                  {/* Times */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4">
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

                  {/* Balance Indicator */}
                  <BalanceIndicator 
                    diff={result.diff} 
                    ctSum={result.ctSum} 
                    trSum={result.trSum} 
                    total={result.total} 
                  />

                  {/* Botão Novo Sorteio */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 text-center"
                  >
                    <Button
                      variant="outline"
                      onClick={handleShuffle}
                      className="border-white/10 text-white/50 hover:text-white hover:border-white/30"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Novo Sorteio
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
                <h2 className="text-lg font-bold text-white/80">Partidas Anteriores</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadHistory}
                  className="border-white/10"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Atualizar
                </Button>
              </div>
              <MatchHistory
                matches={historyMatches}
                onSelect={handleSelectMatch}
                onDelete={handleDeleteMatch}
                loading={historyLoading}
              />
            </motion.div>
          </TabsContent>
        </Tabs>

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
