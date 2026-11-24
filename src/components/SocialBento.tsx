import React from 'react';
import { ArrowUpRight, Globe, Github, Linkedin, Instagram, Sparkles } from 'lucide-react';
import { SocialLink } from '../types/profile.ts';
import { triggerHaptic } from '../utils/haptics.ts';
import { playSoftClick } from '../utils/audio.ts';

interface SocialBentoProps {
  socials: SocialLink[];
  theme?: 'dark' | 'light';
}

export const SocialBento: React.FC<SocialBentoProps> = ({ socials, theme = 'dark' }) => {
  const isLight = theme === 'light';

  const portfolio = socials.find(s => s.id === 'portfolio');
  const otherSocials = socials.filter(s => s.id !== 'portfolio');

  const getIcon = (id: string) => {
    switch (id) {
      case 'github':
        return <Github className="w-3.5 h-3.5" />;
      case 'linkedin':
        return <Linkedin className="w-3.5 h-3.5 text-blue-500" />;
      case 'instagram':
        return <Instagram className="w-3.5 h-3.5 text-pink-500" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Featured Bento Box: Live Portfolio Showcase */}
      {portfolio && (
        <a
          href={portfolio.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            triggerHaptic('medium');
            playSoftClick();
          }}
          className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all group no-underline relative overflow-hidden cursor-pointer ${
            isLight
              ? 'bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-white border-blue-200/90 hover:border-blue-400 shadow-xs hover:shadow-sm'
              : 'bg-gradient-to-r from-blue-950/40 via-indigo-950/20 to-[#0E1017] border-blue-500/30 hover:border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.08)]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-xs ${
              isLight ? 'bg-blue-600 text-white' : 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
            }`}>
              <Globe className="w-4 h-4" />
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold leading-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {portfolio.title}
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[8.5px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  LIVE
                </span>
              </div>
              <span className={`text-[10px] font-mono font-medium truncate ${
                isLight ? 'text-blue-600' : 'text-blue-300'
              }`}>
                {portfolio.handle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity" />
            <ArrowUpRight className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              isLight ? 'text-slate-500 group-hover:text-blue-600' : 'text-slate-400 group-hover:text-blue-300'
            }`} />
          </div>
        </a>
      )}

      {/* 3-Column Social Bento Grid */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {otherSocials.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              triggerHaptic('light');
              playSoftClick();
            }}
            className={`flex flex-col justify-between p-2 rounded-2xl border transition-all group no-underline text-center items-center cursor-pointer ${
              isLight
                ? 'bg-slate-50/80 border-slate-200/90 hover:border-slate-300 hover:bg-slate-100 shadow-xs'
                : 'bg-white/[0.035] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]'
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 mb-1 ${
              isLight ? 'bg-white shadow-xs text-slate-800' : 'bg-white/5 text-slate-200'
            }`}>
              {getIcon(item.id)}
            </div>

            <span className={`text-[11px] font-bold leading-tight truncate w-full ${
              isLight ? 'text-slate-900' : 'text-slate-200'
            }`}>
              {item.title}
            </span>

            <span className={`text-[9px] font-medium truncate w-full opacity-60 ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {item.handle.replace(/^(https?:\/\/)?(www\.)?/, '')}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
