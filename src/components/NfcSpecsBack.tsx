import React from 'react';
import { Cpu, ShieldCheck, Wifi, RotateCcw, Activity, KeyRound, Radio } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics.ts';
import { playSoftClick } from '../utils/audio.ts';

interface NfcSpecsBackProps {
  theme?: 'dark' | 'light';
  accentColor?: string;
  onFlipBack: () => void;
}

export const NfcSpecsBack: React.FC<NfcSpecsBackProps> = ({
  theme = 'dark',
  accentColor = '#3B82F6',
  onFlipBack,
}) => {
  const isLight = theme === 'light';

  const handleReturn = () => {
    triggerHaptic('medium');
    playSoftClick();
    onFlipBack();
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full text-left py-1 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className={`text-xs font-bold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              NFC Security & Specs
            </h3>
            <p className="text-[10px] font-mono text-slate-400">NXP NTAG215 ISO14443-A</p>
          </div>
        </div>

        <button
          onClick={handleReturn}
          className={`px-2.5 py-1 rounded-full text-[10.5px] font-medium border flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
              : 'bg-white/[0.06] hover:bg-white/10 border-white/10 text-slate-300'
          }`}
          title="Return to Profile"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Flip Card</span>
        </button>
      </div>

      {/* Hardware Telemetry Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div
          className={`p-2.5 rounded-xl border flex flex-col gap-1 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/[0.06]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
            <Radio className="w-3 h-3 text-emerald-400" />
            <span>FREQUENCY</span>
          </div>
          <span className={`text-xs font-bold font-mono ${isLight ? 'text-slate-800' : 'text-white'}`}>
            13.56 MHz HF
          </span>
          <span className="text-[9px] text-slate-400">Near-field inductive</span>
        </div>

        <div
          className={`p-2.5 rounded-xl border flex flex-col gap-1 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/[0.06]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
            <KeyRound className="w-3 h-3 text-blue-400" />
            <span>EEPROM BYTES</span>
          </div>
          <span className={`text-xs font-bold font-mono ${isLight ? 'text-slate-800' : 'text-white'}`}>
            504 Bytes R/W
          </span>
          <span className="text-[9px] text-slate-400">Type 2 NFC Forum</span>
        </div>

        <div
          className={`p-2.5 rounded-xl border flex flex-col gap-1 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/[0.06]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>CRYPTOGRAPHIC PAYLOAD</span>
          </div>
          <span className={`text-[10px] font-mono truncate ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
            SHA256: 9b2d...4f18
          </span>
          <span className="text-[9px] text-emerald-400 font-medium">Valid Authenticated</span>
        </div>

        <div
          className={`p-2.5 rounded-xl border flex flex-col gap-1 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/[0.06]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
            <Activity className="w-3 h-3 text-amber-400" />
            <span>SERVER LATENCY</span>
          </div>
          <span className={`text-xs font-bold font-mono ${isLight ? 'text-slate-800' : 'text-white'}`}>
            18 ms • Indore
          </span>
          <span className="text-[9px] text-slate-400">Zero-Hop Edge</span>
        </div>
      </div>

      {/* Holographic Chip Visual */}
      <div
        className={`p-3 rounded-2xl border flex items-center justify-between ${
          isLight
            ? 'bg-gradient-to-r from-slate-100 to-blue-50/50 border-slate-200'
            : 'bg-gradient-to-r from-white/[0.04] to-blue-900/10 border-white/[0.08]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-7 rounded-md bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 shadow-inner p-1 flex items-center justify-center">
            <div className="w-full h-full border border-amber-700/40 rounded flex items-center justify-center text-[7px] font-bold text-amber-950 font-mono">
              SIM
            </div>
          </div>
          <div>
            <div className={`text-[11px] font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
              NFC Contactless Ant.
            </div>
            <div className="text-[9px] text-slate-400 font-mono">UID: 04:7B:3E:91:2A:55:80</div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
          <Wifi className="w-3 h-3 rotate-90" />
          <span>ARMED</span>
        </div>
      </div>

      {/* Flip back button */}
      <button
        onClick={handleReturn}
        className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all transform active:scale-98 shadow-md cursor-pointer flex items-center justify-center gap-1.5"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, #2563EB)`,
        }}
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Return to Aradhya's Profile</span>
      </button>
    </div>
  );
};
