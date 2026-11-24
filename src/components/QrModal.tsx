import React from 'react';
import { X, Copy, QrCode } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics.ts';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  onCopyUrl: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({
  isOpen,
  onClose,
  url,
  onCopyUrl
}) => {
  if (!isOpen) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=090a0f&margin=0`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm rounded-[28px] bg-[#101219] border border-white/10 p-6 flex flex-col gap-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <QrCode className="w-5 h-5 text-blue-500" />
            <span>NFC & QR Share</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-52 h-52 p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center">
            <img
              src={qrImageUrl}
              alt="QR Code"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <p className="text-xs text-slate-400 max-w-[260px] leading-relaxed">
            Scan with any smartphone camera to open this digital profile card instantly.
          </p>
        </div>

        <button
          onClick={() => {
            triggerHaptic('medium');
            onCopyUrl();
          }}
          className="w-full h-11 rounded-xl bg-white text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-all cursor-pointer shadow-md"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy Profile URL</span>
        </button>
      </div>
    </div>
  );
};
