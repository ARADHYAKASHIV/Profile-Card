import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AiTerminal } from './AiTerminal.tsx';
import { NfcSpecsBack } from './NfcSpecsBack.tsx';

describe('AiTerminal', () => {
  it('renders terminal window and default prompt chips', () => {
    render(<AiTerminal theme="dark" />);
    expect(screen.getByText(/aradhya@dev-studio/i)).toBeInTheDocument();
    expect(screen.getByText(/🤖 JuriSight \(RAG\)/i)).toBeInTheDocument();
    expect(screen.getByText(/🧠 AI Stack/i)).toBeInTheDocument();
  });

  it('runs command when preset chip is clicked', () => {
    render(<AiTerminal theme="dark" />);
    const aiChip = screen.getByText(/🧠 AI Stack/i);
    fireEvent.click(aiChip);
    expect(screen.getByText(/AI & Intelligent Systems/i)).toBeInTheDocument();
  });
});

describe('NfcSpecsBack', () => {
  it('renders NFC chip specs and triggers flip back', () => {
    const handleFlip = vi.fn();
    render(<NfcSpecsBack theme="dark" onFlipBack={handleFlip} />);
    expect(screen.getByText(/NFC Security & Specs/i)).toBeInTheDocument();
    expect(screen.getByText(/13.56 MHz HF/i)).toBeInTheDocument();

    const returnBtn = screen.getByText(/Return to Aradhya's Profile/i);
    fireEvent.click(returnBtn);
    expect(handleFlip).toHaveBeenCalledTimes(1);
  });
});
