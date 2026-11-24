import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, Copy, ArrowUpRight, Check } from 'lucide-react';
import { DirectContact } from '../types/profile.ts';
import { buildWhatsAppUrl, sanitizePhone } from '../utils/formatters.ts';
import { triggerHaptic } from '../utils/haptics.ts';
import { playSoftClick, playSuccessChime } from '../utils/audio.ts';

interface DirectReachGridProps {
  contact: DirectContact;
  theme?: 'dark' | 'light';
  onCopy: (text: string, label: string) => void;
}

export const DirectReachGrid: React.FC<DirectReachGridProps> = ({
  contact,
  theme = 'dark',
  onCopy
}) => {
  const isLight = theme === 'light';
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyAction = (text: string, label: string, key: string) => {
    triggerHaptic('success');
    playSuccessChime();
    setCopiedKey(key);
    onCopy(text, label);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* 2-Column Bento: WhatsApp & Direct Call */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {/* WhatsApp Bento Box */}
        {contact.whatsapp && (
          <div className={`flex flex-col justify-between p-2.5 rounded-2xl border transition-all relative overflow-hidden group ${
            isLight
              ? 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border-emerald-200/90 hover:border-emerald-300 shadow-xs hover:shadow-sm'
              : 'bg-gradient-to-br from-emerald-950/25 via-[#101F18]/50 to-[#0E1017] border-emerald-500/25 hover:border-emerald-500/50'
          }`}>
            <div className="flex items-center justify-between w-full">
              <a
                href={buildWhatsAppUrl(contact.whatsapp.number, contact.whatsapp.defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  triggerHaptic('medium');
                  playSoftClick();
                }}
                className="w-7 h-7 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                title="Open WhatsApp"
                aria-label="Open WhatsApp chat"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-500/20 text-emerald-500" />
              </a>

              <button
                onClick={() => handleCopyAction(contact.whatsapp!.number, 'WhatsApp number', 'wa')}
                title="Copy WhatsApp Number"
                aria-label="Copy phone number"
                className={`p-1 rounded-lg transition-colors cursor-pointer active:scale-90 ${
                  copiedKey === 'wa'
                    ? 'text-emerald-500 bg-emerald-500/15'
                    : isLight
                    ? 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-100/60'
                    : 'text-slate-400 hover:text-emerald-500 hover:bg-white/10'
                }`}
              >
                {copiedKey === 'wa' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            <a
              href={buildWhatsAppUrl(contact.whatsapp.number, contact.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                triggerHaptic('medium');
                playSoftClick();
              }}
              className="mt-1.5 flex flex-col text-left no-underline cursor-pointer"
            >
              <span className={`text-[9.5px] font-bold uppercase tracking-wider ${
                isLight ? 'text-emerald-700' : 'text-emerald-400'
              }`}>
                WhatsApp
              </span>
              <span className={`text-xs font-bold truncate flex items-center justify-between ${
                isLight ? 'text-slate-900' : 'text-slate-100'
              }`}>
                <span>Chat Now</span>
                <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>
        )}

        {/* Call Phone Bento Box */}
        {contact.phone && (
          <div className={`flex flex-col justify-between p-2.5 rounded-2xl border transition-all relative overflow-hidden group ${
            isLight
              ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border-blue-200/90 hover:border-blue-300 shadow-xs hover:shadow-sm'
              : 'bg-gradient-to-br from-blue-950/25 via-[#101827]/50 to-[#0E1017] border-blue-500/25 hover:border-blue-500/50'
          }`}>
            <div className="flex items-center justify-between w-full">
              <a
                href={`tel:${sanitizePhone(contact.phone.raw)}`}
                onClick={() => {
                  triggerHaptic('medium');
                  playSoftClick();
                }}
                className="w-7 h-7 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                title="Call Directly"
                aria-label="Call directly"
              >
                <Phone className="w-3.5 h-3.5 fill-blue-500/20 text-blue-500" />
              </a>

              <button
                onClick={() => handleCopyAction(contact.phone!.raw, 'Phone number', 'phone')}
                title="Copy Phone Number"
                aria-label="Copy phone number"
                className={`p-1 rounded-lg transition-colors cursor-pointer active:scale-90 ${
                  copiedKey === 'phone'
                    ? 'text-blue-500 bg-blue-500/15'
                    : isLight
                    ? 'text-slate-400 hover:text-blue-500 hover:bg-blue-100/60'
                    : 'text-slate-400 hover:text-blue-500 hover:bg-white/10'
                }`}
              >
                {copiedKey === 'phone' ? <Check className="w-3 h-3 text-blue-500" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            <a
              href={`tel:${sanitizePhone(contact.phone.raw)}`}
              onClick={() => {
                triggerHaptic('medium');
                playSoftClick();
              }}
              className="mt-1.5 flex flex-col text-left no-underline cursor-pointer"
            >
              <span className={`text-[9.5px] font-bold uppercase tracking-wider ${
                isLight ? 'text-blue-700' : 'text-blue-400'
              }`}>
                Direct Phone
              </span>
              <span className={`text-xs font-bold truncate flex items-center justify-between ${
                isLight ? 'text-slate-900' : 'text-slate-100'
              }`}>
                <span>{contact.phone.display}</span>
                <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>
        )}
      </div>

      {/* Email Bento Bar (Full Width Compact) */}
      {contact.emails && contact.emails.length > 0 && (
        <div className={`flex items-center justify-between px-3 py-2 rounded-2xl border transition-all ${
          isLight
            ? 'bg-slate-50/90 border-slate-200 hover:border-slate-300 hover:bg-slate-100 shadow-xs'
            : 'bg-white/[0.035] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]'
        }`}>
          <a
            href={`mailto:${contact.emails[0].address}`}
            onClick={() => {
              triggerHaptic('light');
              playSoftClick();
            }}
            className="flex items-center gap-2.5 min-w-0 no-underline"
            title="Send Email"
            aria-label="Send email"
          >
            <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`text-[9px] font-bold uppercase tracking-wider leading-none ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Email
              </span>
              <span className={`text-xs font-bold truncate ${
                isLight ? 'text-slate-900' : 'text-slate-200'
              }`}>
                {contact.emails[0].address}
              </span>
            </div>
          </a>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => handleCopyAction(contact.emails[0].address, 'Email address', 'mail')}
              title="Copy Email"
              aria-label="Copy email address"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer active:scale-90 ${
                copiedKey === 'mail'
                  ? 'text-amber-500 bg-amber-500/15'
                  : isLight
                  ? 'text-slate-400 hover:text-amber-500 hover:bg-slate-200/60'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-white/10'
              }`}
            >
              {copiedKey === 'mail' ? <Check className="w-3 h-3 text-amber-500" /> : <Copy className="w-3 h-3" />}
            </button>
            <a
              href={`mailto:${contact.emails[0].address}`}
              onClick={() => {
                triggerHaptic('light');
                playSoftClick();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Send Email"
              aria-label="Send email"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
