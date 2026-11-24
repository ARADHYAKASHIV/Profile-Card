import React, { useState, useEffect } from 'react';
import {
  Clock,
  Sparkles,
  ExternalLink,
  Github,
  Send,
  Volume2,
  VolumeX,
  Palette,
  Activity,
  CheckCircle2,
  Cpu,
  Layers,
} from 'lucide-react';
import { AiTerminal } from './AiTerminal.tsx';
import { triggerHaptic } from '../utils/haptics.ts';
import { playSoftClick, toggleSound, isSoundEnabled } from '../utils/audio.ts';
import { buildWhatsAppUrl } from '../utils/formatters.ts';

interface DesktopBentoWingProps {
  theme?: 'dark' | 'light';
  accentColor: string;
  onAccentChange: (color: string) => void;
  selectedSkill?: string | null;
}

const ACCENT_PRESETS = [
  { name: 'Electric Blue', hex: '#3B82F6' },
  { name: 'Cyber Emerald', hex: '#10B981' },
  { name: 'Neon Violet', hex: '#8B5CF6' },
  { name: 'Solar Amber', hex: '#F59E0B' },
];

export const DesktopBentoWing: React.FC<DesktopBentoWingProps> = ({
  theme = 'dark',
  accentColor,
  onAccentChange,
  selectedSkill,
}) => {
  const isLight = theme === 'light';

  // Live Indore, India Clock (IST UTC+5:30)
  const [timeStr, setTimeStr] = useState('');
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [quickMsg, setQuickMsg] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
    triggerHaptic('light');
    if (next) playSoftClick();
  };

  const handleSendQuickMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMsg.trim()) return;
    triggerHaptic('success');
    playSoftClick();
    const waUrl = buildWhatsAppUrl('919981806555', quickMsg.trim());
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setQuickMsg('');
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full justify-between">
      {/* Top Telemetry & Controls Bento Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {/* Live Indore Local Clock Widget */}
        <div
          className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
            isLight
              ? 'bg-white/90 border-slate-200/90 shadow-xs'
              : 'bg-[#0E1017]/85 border-white/[0.08] shadow-md backdrop-blur-md'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
            >
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className={`text-[11px] font-bold font-mono tracking-tight ${isLight ? 'text-slate-800' : 'text-white'}`}>
                  {timeStr || 'Indore IST'}
                </span>
              </div>
              <p className="text-[9.5px] font-mono text-slate-400">Indore, India (UTC+5:30)</p>
            </div>
          </div>
          <span className="text-[9px] font-mono font-medium text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            18ms
          </span>
        </div>

        {/* Accent Color Switcher Widget */}
        <div
          className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
            isLight
              ? 'bg-white/90 border-slate-200/90 shadow-xs'
              : 'bg-[#0E1017]/85 border-white/[0.08] shadow-md backdrop-blur-md'
          }`}
        >
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-slate-400" />
            <span className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              Card Accent
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {ACCENT_PRESETS.map((p) => {
              const isSelected = accentColor === p.hex;
              return (
                <button
                  key={p.hex}
                  onClick={() => {
                    triggerHaptic('light');
                    playSoftClick();
                    onAccentChange(p.hex);
                  }}
                  className={`w-5 h-5 rounded-full transition-transform active:scale-90 cursor-pointer ${
                    isSelected ? 'ring-2 ring-offset-2 ring-white scale-110 shadow-sm' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: p.hex }}
                  title={p.name}
                  aria-label={`Select ${p.name}`}
                />
              );
            })}
          </div>
        </div>

        {/* Tactile Audio Feedback Switcher */}
        <div
          className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
            isLight
              ? 'bg-white/90 border-slate-200/90 shadow-xs'
              : 'bg-[#0E1017]/85 border-white/[0.08] shadow-md backdrop-blur-md'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              Tactile Sound
            </span>
          </div>

          <button
            onClick={handleToggleSound}
            className={`px-3 py-1 rounded-full text-[11px] font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
              soundOn
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : isLight
                ? 'bg-slate-100 border-slate-300 text-slate-500'
                : 'bg-white/[0.04] border-white/10 text-slate-400'
            }`}
            title="Toggle Tactile Web Audio Pops"
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundOn ? 'Sound On' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* Centerpiece: Interactive AI Terminal */}
      <AiTerminal
        theme={theme}
        accentColor={accentColor}
        initialSkillFilter={selectedSkill}
      />

      {/* Bottom Bento: Featured Projects & Instant Message Dispatch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {/* Project 1: Multi-Agent AI System */}
        <a
          href="https://github.com/aradhyakashiv"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            triggerHaptic('light');
            playSoftClick();
          }}
          className={`p-3 rounded-2xl border flex flex-col justify-between transition-all group no-underline relative overflow-hidden cursor-pointer ${
            isLight
              ? 'bg-white/90 border-slate-200/90 hover:border-blue-400 shadow-xs'
              : 'bg-[#0E1017]/85 border-white/[0.08] hover:border-blue-500/40 shadow-md backdrop-blur-md'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono text-purple-400 flex items-center gap-1 font-semibold">
                <Cpu className="w-3 h-3" />
                <span>AI SYSTEM</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h4 className={`text-xs font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Autonomous Multi-Agent Swarm
            </h4>
            <p className="text-[10.5px] text-slate-400 mt-1 line-clamp-2">
              Coordinated LangGraph agent pipeline performing automated analysis and synthesis.
            </p>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {['LangGraph', 'FastAPI', 'PyTorch'].map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/[0.04] border border-white/10 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </a>

        {/* Project 2: High-Performance FullStack SaaS */}
        <a
          href="https://aradhyakashiv.in"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            triggerHaptic('light');
            playSoftClick();
          }}
          className={`p-3 rounded-2xl border flex flex-col justify-between transition-all group no-underline relative overflow-hidden cursor-pointer ${
            isLight
              ? 'bg-white/90 border-slate-200/90 hover:border-blue-400 shadow-xs'
              : 'bg-[#0E1017]/85 border-white/[0.08] hover:border-blue-500/40 shadow-md backdrop-blur-md'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono text-sky-400 flex items-center gap-1 font-semibold">
                <Layers className="w-3 h-3" />
                <span>FULLSTACK SAAS</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <h4 className={`text-xs font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
              FullStack Enterprise Platform
            </h4>
            <p className="text-[10.5px] text-slate-400 mt-1 line-clamp-2">
              Modern micro-frontend stack with serverless PostgreSQL and edge optimization.
            </p>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {['React 19', 'Next.js', 'Postgres'].map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/[0.04] border border-white/10 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </a>

        {/* Quick Instant Ping / WhatsApp Dispatch */}
        <form
          onSubmit={handleSendQuickMessage}
          className={`p-3 rounded-2xl border flex flex-col justify-between transition-all ${
            isLight
              ? 'bg-white/90 border-slate-200/90 shadow-xs'
              : 'bg-[#0E1017]/85 border-white/[0.08] shadow-md backdrop-blur-md'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <Send className="w-3 h-3" />
                <span>DIRECT DISPATCH</span>
              </span>
              <span className="text-[9px] text-slate-400">Direct to WA</span>
            </div>
            <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Leave a quick note
            </p>
            <input
              type="text"
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              placeholder="Hi Aradhya, loved your card..."
              className="w-full mt-2 px-2.5 py-1.5 rounded-lg text-[11px] font-sans bg-black/20 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-1.5 rounded-lg text-xs font-bold text-white transition-all transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, #10B981)`,
            }}
          >
            <span>Send Instant Ping</span>
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
