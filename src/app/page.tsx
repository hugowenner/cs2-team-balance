"use client";

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  ChevronRight, 
  Copy, 
  Check 
} from 'lucide-react';

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────
type Player = { name: string; level: number };
type GameMode = 'BALANCED' | 'RANDOM';
type TeamResult = {
  ct: Player[];
  tr: Player[];
  ctSum: number;
  trSum: number;
  diff: number;
  total: number;
};
type Match = {
  id: string;
  players: Player[];
  result: TeamResult;
  mode: GameMode;
  seed: string;
  createdAt: string;
};

// ─────────────────────────────────────────────
// COMPONENTE DE INPUT DE JOGADOR
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="flex items-center gap-2"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/10 to-white/5 
        border border-white/20 flex items-center justify-center">
        <span className="text-xs font-bold text-white/60">
          {index + 1}
        </span>
      </div>
      <Input
        placeholder={`Jogador ${index + 1}`}
        value={player.name}
        onChange={(e) => onChange(index, 'name', e.target.value)}
        className={`flex-1 bg-[#0b1220] border-white/10 text-sm font-medium 
          focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(0,242,255,0.1)]
          transition-all duration-200 ${
          hasError && !player.name.trim() 
            ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' 
            : ''
        }`}
      />
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg 
        bg-gradient-to-r from-white/10 to-white/5 border border-white/20">
        <span className="text-xs font-bold text-white/60">Nível</span>
        <select
          value={player.level}
          onChange={(e) => onChange(index, 'level', Number(e.target.value))}
          className="bg-transparent text-sm font-bold text-white/80 
            focus:outline-none cursor-pointer"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
            <option key={n} value={n} className="bg-[#0b1220] text-white">
              {n}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE DE TIME
// ─────────────────────────────────────────────
function TeamCard({ 
  team, 
  side, 
  sum, 
  isStronger, 
  delay 
}: { 
  team: Player[]; 
  side: 'CT' | 'TR'; 
  sum: number; 
  isStronger: boolean; 
  delay: number; 
}) {
  const sideColors = side === 'CT' 
    ? 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30' 
    : 'from-red-500/20 to-orange-500/20 border-red-500/30';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`p-4 sm:p-5 rounded-2xl border bg-gradient-to-br ${sideColors} 
        ${isStronger ? 'ring-2 ring-white/10 ring-offset-2 ring-offset-[#080c14]' : ''}`}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div 
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black
              bg-gradient-to-br ${side === 'CT' 
                ? 'from-cyan-600 to-blue-600' 
                : 'from-red-600 to-orange-600'
              } shadow-lg`}
          >
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
        <div className="text-right">
          <div className="text-[10px] text-white/40 font-bold tracking-widest uppercase mb-0.5">
            Total
          </div>
          <div className={`text-2xl font-black ${isStronger ? 'text-white' : 'text-white/60'}`}>
            {sum}
          </div>
        </div>
      </div>

      <div className="space-y-2">
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
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-white/10 to-white/5 
                border border-white/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white/60">
                  {i + 1}
                </span>
              </div>
              <span className="text-sm font-medium text-white/90 truncate max-w-[140px]">
                {p.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-6 rounded-full bg-gradient-to-r from-white/10 to-white/5 
                border border-white/20 flex items-center justify-center">
                <span className="text-xs font-bold text-white/80">
                  {p.level}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE DE INDICADOR DE BALANCEAMENTO
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
  const ctPercent = (ctSum / total) * 100;
  const trPercent = (trSum / total) * 100;

  const getBalanceColor = () => {
    if (diff === 0) return 'text-green-400';
    if (diff <= 2) return 'text-amber-400';
    return 'text-red-400';
  };

  const getBalanceText = () => {
    if (diff === 0) return 'PERFEITAMENTE BALANCEADO';
    if (diff <= 2) return 'BEM BALANCEADO';
    return 'DESBALANCEADO';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-white/40" />
          <span className="text-xs text-white/40 font-bold tracking-widest uppercase">
            Qualidade do Balanceamento
          </span>
        </div>
        <span className={`text-xs font-bold ${getBalanceColor()}`}>
          {getBalanceText()}
        </span>
      </div>

      <div className="relative h-8 rounded-full overflow-hidden bg-[#0b1220] border border-white/10">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-600 to-blue-600 
            transition-all duration-1000 ease-out"
          style={{ width: `${ctPercent}%` }}
        />
        <div 
          className="absolute right-0 top-0 h-full bg-gradient-to-l from-red-600 to-orange-600 
            transition-all duration-1000 ease-out"
          style={{ width: `${trPercent}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-black text-white/80 bg-[#080c14] px-2 py-1 rounded-md">
            Diferença: {diff}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-white/60">CT: {ctPercent.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/60">TR: {trPercent.toFixed(1)}%</span>
          <div className="w-2 h-2 rounded-full bg-red-400" />
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE DE HISTÓRICO
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
            onClick={() => onSelect(match)}
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
                  <span className="text-xs font-medium">Ver</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
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
  const [showHistory, setShowHistory] = useState(false);
  
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
            {/* Configurações */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
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
                      className={`flex-1 font-medium transition-all duration-200 ${
                        mode === 'RANDOM' 
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-600/20' 
                          : 'bg-[#0b1220] border-white/20 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <Shuffle className="w-3 h-3 mr-1" />
                      Random
                    </Button>
                    <Button
                      variant={mode === 'BALANCED' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMode('BALANCED')}
                      className={`flex-1 font-medium transition-all duration-200 ${
                        mode === 'BALANCED' 
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-600/20' 
                          : 'bg-[#0b1220] border-white/20 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5'
                      }`}
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

                {/* Info */}
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

            {/* Grid de Jogadores - ANTES DO SORTEIO (INTERFACE NEUTRA) */}
            {!result && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {/* Lista 1 - Jogadores 1-5 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
                >
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black
                        bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
                    >
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

                {/* Lista 2 - Jogadores 6-10 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
                >
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black
                        bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
                    >
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

            {/* Grid de Times - APÓS O SORTEIO (COM CT/TR) */}
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

            {/* Empty State - Antes do sorteio */}
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

            {/* Botão Sortear - APENAS ANTES DO RESULTADO */}
            {!result && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  onClick={handleShuffle}
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

                  {/* Botões de Ação */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 flex gap-3"
                  >
                    <Button
                      onClick={handleShuffle}
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 
                        hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/20
                        transition-all duration-200"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Novo Sorteio
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setResult(null);
                        setCurrentMatch(null);
                      }}
                      className="border-white/20 text-white/60 hover:text-white 
                        hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                    >
                      Editar Jogadores
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
                onSelect={handleSelectMatch}
                onDelete={handleDeleteMatch}
                loading={historyLoading}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
          {/* 🔥 SEO CONTENT (IMPORTANTE PARA GOOGLE) */}
          <section className="mt-16 max-w-3xl mx-auto text-sm text-white/70 space-y-4 px-4">
            <h2 className="text-lg font-bold text-white">
              CS2 Team Balance Tool
            </h2>

            <p>
              This CS2 team balance tool automatically creates fair teams in Counter-Strike 2.
              It distributes players based on skill level to ensure competitive and balanced matches.
            </p>

            <h3 className="text-md font-semibold text-white">
              How to balance teams in CS2
            </h3>

            <p>
              Balancing teams manually in CS2 can be difficult. This tool uses a deterministic algorithm
              to generate fair teams instantly. Just enter player levels and generate teams.
            </p>

            <h3 className="text-md font-semibold text-white">
              Why use this CS2 team balancer?
            </h3>

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