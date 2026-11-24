# ReactBits NFC Profile Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

---

## Architecture & Goals

Build a high-performance, minimalist luxury web profile card using **React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and ReactBits components** (`SpotlightCard`, `DecryptedText`, `ClickSpark`, `FadeContent`).
The application is tested with **Vitest & React Testing Library** following strict **Test-Driven Development (TDD)** and complies with **Web Interface Guidelines**.

---

## File Structure

```
e:\code\Agency\Profile Card AK/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── config/
│   │   └── profile.config.ts
│   ├── types/
│   │   └── profile.ts
│   ├── utils/
│   │   ├── vcard.ts
│   │   ├── vcard.test.ts
│   │   ├── formatters.ts
│   │   └── formatters.test.ts
│   ├── components/
│   │   ├── react-bits/
│   │   │   ├── SpotlightCard.tsx
│   │   │   ├── DecryptedText.tsx
│   │   │   ├── ClickSpark.tsx
│   │   │   └── FadeContent.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HeroSection.test.tsx
│   │   ├── DirectReachGrid.tsx
│   │   ├── DirectReachGrid.test.tsx
│   │   ├── SocialBento.tsx
│   │   ├── QrModal.tsx
│   │   └── Toast.tsx
```

---

## Tasks

### Task 1: Scaffolding, Tooling & Test Harness
- [ ] Initialize `package.json` with React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, Vitest, and jsdom.
- [ ] Configure `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, and `postcss.config.js`.
- [ ] Create smoke test (`src/smoke.test.ts`) to verify Vitest test harness runs and passes.
- [ ] Run `npm run test` to verify green test baseline.

### Task 2: Data Models & TDD for vCard 3.0 & Formatters
- [ ] Write failing test in `src/utils/formatters.test.ts` for phone formatting, WhatsApp link generator, and initials extraction.
- [ ] Implement `src/utils/formatters.ts` to pass tests.
- [ ] Write failing test in `src/utils/vcard.test.ts` for RFC-compliant vCard 3.0 generation (FN, TEL, EMAIL, URL, NOTE).
- [ ] Implement `src/utils/vcard.ts` to pass tests.
- [ ] Run test suite to verify all unit tests pass.

### Task 3: ReactBits Animated Components Integration
- [ ] Place `SpotlightCard.tsx` in `src/components/react-bits/` (interactive radial spotlight and metallic border glow).
- [ ] Place `DecryptedText.tsx` in `src/components/react-bits/` (matrix text decode animation for hero name).
- [ ] Place `ClickSpark.tsx` in `src/components/react-bits/` (tactile spark particles on touch/click).
- [ ] Place `FadeContent.tsx` in `src/components/react-bits/` (smooth staggered entry).
- [ ] Write a test in `src/components/react-bits/reactbits.test.tsx` verifying components render without crashing.

### Task 4: Profile Card UI & Component Tests
- [ ] Write failing tests for `HeroSection.test.tsx` (renders DecryptedText name, status indicator, bio, avatar).
- [ ] Implement `HeroSection.tsx` with Plus Jakarta Sans & JetBrains Mono typography.
- [ ] Write failing tests for `DirectReachGrid.test.tsx` (renders phone dial, WhatsApp with prefilled message, emails with copy buttons).
- [ ] Implement `DirectReachGrid.tsx` with 48px touch targets and haptic feedback.
- [ ] Implement `SocialBento.tsx`, `QrModal.tsx`, and `Toast.tsx` with clipboard copy integration.
- [ ] Implement `App.tsx` wiring theme switcher (dark/light mode with persistence).
- [ ] Run full test suite (`npm run test:run`) to ensure 100% green tests.

### Task 5: Production Build & Web Interface Guidelines Verification
- [ ] Run `npm run build` to compile optimized static bundle into `dist/`.
- [ ] Verify bundle size is under 200KB for sub-150ms mobile NFC tap speed.
- [ ] Verify Web Interface Guidelines: keyboard navigability, 4.5:1 color contrast, 48px touch targets, reduced motion support.
