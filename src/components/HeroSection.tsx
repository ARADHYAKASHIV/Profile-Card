import React, { useState } from 'react';
import { MapPin, CheckCircle2, BookmarkPlus, Share2, Sparkles, RefreshCw } from 'lucide-react';
import { PersonProfile } from '../types/profile.ts';
import { getInitials } from '../utils/formatters.ts';
import { triggerHaptic } from '../utils/haptics.ts';
import { playSoftClick, playKeyClick } from '../utils/audio.ts';
import { DecryptedText } from './react-bits/DecryptedText.tsx';

interface HeroSectionProps {
  person: PersonProfile;
  theme?: 'dark' | 'light';
  accentColor?: string;
  onSaveContact: () => void;
  onShare: () => void;
  onFlipCard?: () => void;
  onSelectSkill?: (skill: string) => void;
}

const TECH_PILLS = ['Next.js', 'React.js', 'Node.js', 'Python', 'PostgreSQL', 'RAG / AI'];

const STATUS_OPTIONS = [
  'Available for work',
  '⚡ Architecting AI Systems',
  '🚀 Building FullStack SaaS',
  '🎯 Open for High-Impact Roles',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  person,
  theme = 'dark',
  accentColor = '#3B82F6',
  onSaveContact,
  onShare,
  onFlipCard,
  onSelectSkill,
}) => {
  const monogram = person.nickname || getInitials(person.name);
  const isLight = theme === 'light';

  const [statusIndex, setStatusIndex] = useState(0);
  const [activePill, setActivePill] = useState<string | null>(null);

  const handleCycleStatus = () => {
    triggerHaptic('light');
    playSoftClick();
    setStatusIndex((prev) => (prev + 1) % STATUS_OPTIONS.length);
  };

  const handlePillTap = (pill: string) => {
    triggerHaptic('light');
    playKeyClick();
    const next = activePill === pill ? null : pill;
    setActivePill(next);
    if (onSelectSkill && next) {
      onSelectSkill(next);
    }
  };

  const handleAvatarClick = () => {
    if (onFlipCard) {
      triggerHaptic('medium');
      playSoftClick();
      onFlipCard();
    }
  };

  const currentStatusText = STATUS_OPTIONS[statusIndex] || person.status?.text || 'Available for work';

  return (
    <section className="flex flex-col items-center text-center gap-2.5 w-full">
      {/* Avatar Container with Face Crop & Breathing Glow Ring */}
      <div className="relative inline-block mt-0.5 group">
        <button
          onClick={handleAvatarClick}
          className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full p-[2.5px] shadow-xl transition-all transform active:scale-95 cursor-pointer block ${
            isLight
              ? 'bg-gradient-to-tr from-blue-500 via-indigo-500 to-emerald-400 shadow-blue-500/15'
              : 'bg-gradient-to-tr from-blue-500 via-sky-400 to-emerald-400 shadow-blue-500/25'
          }`}
          title="Click to view NFC hardware specs"
          aria-label="View NFC hardware specs"
        >
          <div
            className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center relative ${
              isLight ? 'bg-slate-100' : 'bg-[#12141D]'
            }`}
          >
            {person.avatar ? (
              <img
                src={person.avatar}
                alt={person.name}
                className="w-full h-full object-cover object-[50%_18%] scale-140 select-none pointer-events-none transition-transform duration-300 group-hover:scale-145"
              />
            ) : (
              <span
                className={`font-extrabold text-xl tracking-tighter ${
                  isLight ? 'text-slate-800' : 'text-white'
                }`}
              >
                {monogram}
              </span>
            )}

            {/* Quick Hover Flip Badge */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
              <span className="text-[9px] font-mono text-white font-bold bg-black/60 px-2 py-0.5 rounded-full border border-white/20">
                NFC Specs ↻
              </span>
            </div>
          </div>
        </button>

        {/* Interactive Status Pill - Clickable to cycle modes */}
        <button
          onClick={handleCycleStatus}
          className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border shadow-sm backdrop-blur-md whitespace-nowrap active:scale-95 transition-all cursor-pointer select-none ${
            isLight
              ? 'bg-white/95 border-slate-200/90 text-slate-700 hover:bg-slate-50'
              : 'bg-[#10141C]/95 border-white/10 text-slate-300 hover:border-white/25'
          }`}
          title="Click to toggle status mode"
          aria-label="Toggle status"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)] animate-pulse" />
          <span className="text-[9.5px] font-semibold tracking-tight">{currentStatusText}</span>
          <RefreshCw className="w-2.5 h-2.5 text-slate-400 opacity-60" />
        </button>
      </div>

      {/* Identity Info */}
      <div className="flex flex-col items-center gap-0.5 mt-0.5">
        <div className="inline-flex items-center justify-center gap-1.5">
          <h1
            className={`text-xl sm:text-2xl font-black tracking-tight leading-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            <DecryptedText text={person.name} animateOn="view" speed={30} />
          </h1>
          <span title={person.badge || 'Verified Pro'} className="inline-flex text-blue-500">
            <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-blue-500 text-white" />
          </span>
        </div>

        <p
          className={`text-xs sm:text-[13px] font-semibold ${
            isLight ? 'text-blue-600' : 'text-blue-400'
          }`}
        >
          {person.title}
        </p>

        <div
          className={`inline-flex items-center gap-1 text-[11px] font-medium ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          <MapPin className="w-3 h-3 text-red-500" />
          <span>{person.location}</span>
        </div>

        {/* Interactive Tech Stack Pills: Beautifully wrapped & centered */}
        <div className="flex flex-wrap items-center justify-center gap-1 mt-1.5 max-w-[340px]">
          {TECH_PILLS.map((pill) => {
            const isSelected = activePill === pill;
            return (
              <button
                key={pill}
                onClick={() => handlePillTap(pill)}
                className={`px-2 py-0.5 rounded-md font-mono text-[9.5px] font-medium border transition-all active:scale-95 cursor-pointer select-none ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/15 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                    : isLight
                    ? 'bg-slate-100/80 border-slate-200 text-slate-600 hover:bg-slate-200'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                }`}
                title={`Filter ${pill}`}
              >
                {pill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 gap-2 w-full mt-1">
        <button
          onClick={() => {
            triggerHaptic('success');
            playSoftClick();
            onSaveContact();
          }}
          className={`h-10 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-1.5 active:scale-[0.97] transition-all shadow-sm hover:shadow-md cursor-pointer ${
            isLight
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-white text-slate-950 hover:bg-slate-100'
          }`}
          aria-label="Save Contact"
        >
          <BookmarkPlus className="w-3.5 h-3.5" />
          <span>Save Contact</span>
        </button>

        <button
          onClick={() => {
            triggerHaptic('medium');
            playSoftClick();
            onShare();
          }}
          className={`h-10 rounded-xl border font-bold text-xs inline-flex items-center justify-center gap-1.5 active:scale-[0.97] transition-all cursor-pointer ${
            isLight
              ? 'bg-white/80 border-slate-200 text-slate-800 hover:bg-slate-100 shadow-xs'
              : 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]'
          }`}
          aria-label="Share Link"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Link</span>
        </button>
      </div>
    </section>
  );
};
