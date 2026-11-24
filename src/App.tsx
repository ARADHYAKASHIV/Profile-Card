import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, QrCode, Wifi, RotateCcw, Terminal, CreditCard, Sparkles } from 'lucide-react';
import { PROFILE_DATA } from './config/profile.config.ts';
import { downloadVCard } from './utils/vcard.ts';
import { SpotlightCard } from './components/react-bits/SpotlightCard.tsx';
import { TiltedCard, TiltedCardLayer } from './components/react-bits/TiltedCard.tsx';
import { ClickSpark } from './components/react-bits/ClickSpark.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { DirectReachGrid } from './components/DirectReachGrid.tsx';
import { SocialBento } from './components/SocialBento.tsx';
import { NfcSpecsBack } from './components/NfcSpecsBack.tsx';
import { DesktopBentoWing } from './components/DesktopBentoWing.tsx';
import { QrModal } from './components/QrModal.tsx';
import { Toast } from './components/Toast.tsx';
import { triggerHaptic } from './utils/haptics.ts';
import { playSoftClick } from './utils/audio.ts';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('ak_theme') as 'dark' | 'light') || PROFILE_DATA.theme.defaultTheme || 'dark';
  });
  const [accentColor, setAccentColor] = useState<string>('#3B82F6');
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [mobileTab, setMobileTab] = useState<'card' | 'studio'>('card');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 3D Card Tilt State for desktop
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Phone-exclusive Touch Swipe Detection
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Phone-exclusive: only active on mobile / tablet screens (<1024px)
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return;
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe with minimum 40px displacement
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      triggerHaptic('medium');
      playSoftClick();
      setIsCardFlipped((prev) => !prev);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('ak_theme', theme);
  }, [theme]);

  const isLight = theme === 'light';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      showToast(`${label} copied!`);
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast(`${label} copied!`);
    }
  };

  const handleSaveContact = () => {
    downloadVCard(PROFILE_DATA);
    showToast('Contact ready to save!');
  };

  const handleShare = () => {
    setIsQrOpen(true);
  };

  const handleCopyProfileUrl = () => {
    handleCopy(window.location.href, 'Card URL');
  };

  const handleFlipCard = () => {
    triggerHaptic('medium');
    playSoftClick();
    setIsCardFlipped((prev) => !prev);
  };

  // 3D card tilt calculation on desktop mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 5; // max 5 deg
    const rotateX = -(y / (rect.height / 2)) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <>
      {/* Interactive Ethereal Cursor (desktop only) */}
      <CustomCursor theme={theme} />

      <ClickSpark
        sparkColor={isLight ? [accentColor, '#10B981', '#0F172A'] : [accentColor, '#38BDF8', '#ffffff']}
        sparkCount={8}
        sparkSize={12}
        duration={400}
        className={`min-h-screen sm:min-h-dvh flex flex-col items-center justify-center p-2.5 sm:p-5 lg:p-8 relative overflow-x-hidden font-sans transition-colors duration-300 ${
          isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#07080B] text-white'
        }`}
      >
        {/* Dynamic atmospheric ambient glows matching active accent color */}
        <div
          className={`fixed -top-24 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
            isLight ? 'opacity-35' : 'opacity-45'
          }`}
          style={{ backgroundColor: accentColor }}
        />
        <div
          className={`fixed -bottom-20 right-1/4 w-96 h-96 rounded-full blur-[130px] pointer-events-none transition-all duration-700 ${
            isLight ? 'bg-emerald-400/20 opacity-30' : 'bg-emerald-600/15 opacity-40'
          }`}
        />

        {/* Studio Bento Container: Expands from 390px on phone to max-w-6xl on PC / Laptops */}
        <main className="w-full max-w-[390px] lg:max-w-6xl flex flex-col gap-3 z-10 my-auto">
          {/* Universal Header Utility Bar */}
          <header className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border backdrop-blur-md ${
                  isLight
                    ? 'bg-white/80 border-slate-200/90 text-slate-700 shadow-xs'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-400'
                }`}
              >
                <Wifi className="w-3 h-3 text-emerald-500 rotate-90" />
                <span className="font-mono text-[9px] font-bold tracking-wider">
                  NFC CONNECT
                </span>
              </div>

              {/* Mobile View Toggle Switch (Card vs AI Studio) */}
              <div className="flex lg:hidden items-center bg-black/20 p-0.5 rounded-full border border-white/10">
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    playSoftClick();
                    setMobileTab('card');
                  }}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${
                    mobileTab === 'card'
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Card
                </button>
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    playSoftClick();
                    setMobileTab('studio');
                  }}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all flex items-center gap-1 ${
                    mobileTab === 'studio'
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-2.5 h-2.5" />
                  <span>Terminal</span>
                </button>
              </div>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleFlipCard}
                className={`px-2 py-1 rounded-full border flex items-center gap-1 text-[10px] font-mono transition-all cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                }`}
                title="Flip to NFC Specs"
                aria-label="Flip card view"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Flip Specs</span>
              </button>

              <button
                onClick={() => setIsQrOpen(true)}
                className={`w-7.5 h-7.5 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                }`}
                title="Share & QR Code"
                aria-label="Open QR modal"
              >
                <QrCode className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setTheme(isLight ? 'dark' : 'light')}
                className={`w-7.5 h-7.5 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                }`}
                title="Toggle Theme"
                aria-label="Toggle dark/light theme"
              >
                {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </button>
            </div>
          </header>

          {/* Responsive Studio Grid: 1 Col on Mobile, 2 Cols on PC / Laptops */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            {/* Left Column: Interactive NFC Profile Card with React Bits TiltedCard on PC */}
            <div
              className={`w-full lg:col-span-5 touch-pan-y ${
                mobileTab === 'studio' ? 'hidden lg:block' : 'block'
              }`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <TiltedCard
                flipped={isCardFlipped}
                onFlip={(flipped) => setIsCardFlipped(flipped)}
                flipOnClick={false}
                rotateAmplitude={13}
                scaleOnHover={1.04}
                smoothness={0.65}
                parallax={1.5}
                glare={isLight ? 0.24 : 0.45}
                glareColor={accentColor}
                shadow={isLight ? 0.38 : 0.65}
                radius={26}
                containerWidth="100%"
                imageWidth="100%"
                containerHeight="auto"
                imageHeight="auto"
                showTooltip={false}
                className="w-full"
                backContent={
                  <SpotlightCard
                    theme={theme}
                    intensity={isLight ? 0.25 : 0.2}
                    spotlightSize={260}
                    className={`flex flex-col justify-between h-full p-3.5 sm:p-5 rounded-[26px] border transition-all duration-300 relative ${
                      isLight
                        ? 'bg-white/95 border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.06)]'
                        : 'bg-[#0E1017]/90 border-white/[0.09] shadow-[0_25px_60px_rgba(0,0,0,0.75)]'
                    }`}
                  >
                    <TiltedCardLayer depth={28}>
                      <NfcSpecsBack
                        theme={theme}
                        accentColor={accentColor}
                        onFlipBack={handleFlipCard}
                      />
                    </TiltedCardLayer>
                  </SpotlightCard>
                }
              >
                <SpotlightCard
                  theme={theme}
                  intensity={isLight ? 0.25 : 0.2}
                  spotlightSize={260}
                  className={`flex flex-col gap-3 p-3.5 sm:p-5 rounded-[26px] border transition-all duration-300 relative ${
                    isLight
                      ? 'bg-white/95 border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.06)]'
                      : 'bg-[#0E1017]/90 border-white/[0.09] shadow-[0_25px_60px_rgba(0,0,0,0.75)]'
                  }`}
                >
                  {/* Layer 1: Bento Hero Identity Tile with highest 3D pop up */}
                  <TiltedCardLayer depth={36}>
                    <HeroSection
                      person={PROFILE_DATA.person}
                      theme={theme}
                      accentColor={accentColor}
                      onSaveContact={handleSaveContact}
                      onShare={handleShare}
                      onFlipCard={handleFlipCard}
                      onSelectSkill={(skill) => setSelectedSkill(skill)}
                    />
                  </TiltedCardLayer>

                  {/* Layer 2: Bento Direct Reach Grid floating in 3D */}
                  <TiltedCardLayer depth={24}>
                    <DirectReachGrid
                      contact={PROFILE_DATA.contact}
                      theme={theme}
                      onCopy={handleCopy}
                    />
                  </TiltedCardLayer>

                  {/* Layer 3: Bento Social & Portfolio Grid floating in 3D */}
                  <TiltedCardLayer depth={20}>
                    <SocialBento
                      socials={PROFILE_DATA.socials}
                      theme={theme}
                    />
                  </TiltedCardLayer>

                  {/* Minimalist Footer Hint */}
                  <footer
                    className={`pt-2 border-t flex flex-col items-center text-center gap-1 ${
                      isLight ? 'border-slate-100' : 'border-white/[0.06]'
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 text-[10px] font-medium ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      <Wifi className="w-3 h-3 rotate-90" style={{ color: accentColor }} />
                      <span>Swipe card ⇄ or tap to flip specs</span>
                    </div>
                  </footer>
                </SpotlightCard>
              </TiltedCard>
            </div>

            {/* Right Column: Desktop Studio Bento Wing (col-span-7 on desktop, toggleable on mobile) */}
            <div
              className={`w-full lg:col-span-7 ${
                mobileTab === 'card' ? 'hidden lg:block' : 'block'
              }`}
            >
              <DesktopBentoWing
                theme={theme}
                accentColor={accentColor}
                onAccentChange={(col) => setAccentColor(col)}
                selectedSkill={selectedSkill}
              />
            </div>
          </div>
        </main>

        {/* QR Code Sharing Modal */}
        <QrModal
          isOpen={isQrOpen}
          onClose={() => setIsQrOpen(false)}
          url={typeof window !== 'undefined' ? window.location.href : 'https://aradhyakashiv.in'}
          onCopyUrl={handleCopyProfileUrl}
        />

        {/* Action Toast Feedback */}
        <Toast message={toastMessage} />
      </ClickSpark>
    </>
  );
}

export default App;
