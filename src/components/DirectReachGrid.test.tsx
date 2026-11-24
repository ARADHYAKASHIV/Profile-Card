import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { DirectReachGrid } from './DirectReachGrid.tsx';
import { DirectContact } from '../types/profile.ts';

describe('DirectReachGrid Component', () => {
  const mockContact: DirectContact = {
    phone: {
      display: '+1 (555) 234-5678',
      raw: '+15552345678',
      label: 'Direct Phone'
    },
    whatsapp: {
      display: '+1 (555) 234-5678',
      number: '15552345678',
      label: 'WhatsApp'
    },
    emails: [
      { address: 'alex@agency.design', label: 'Primary Work', primary: true }
    ]
  };

  it('renders phone, whatsapp, and email communication targets', () => {
    render(<DirectReachGrid contact={mockContact} onCopy={vi.fn()} />);

    expect(screen.getByText('Direct Phone')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 234-5678')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Chat Now')).toBeInTheDocument();
    expect(screen.getByText('alex@agency.design')).toBeInTheDocument();
  });

  it('triggers onCopy handler when copy action is clicked', () => {
    const handleCopy = vi.fn();
    render(<DirectReachGrid contact={mockContact} onCopy={handleCopy} />);

    const copyButtons = screen.getAllByRole('button', { name: /copy/i });
    expect(copyButtons.length).toBeGreaterThan(0);
    fireEvent.click(copyButtons[0]);
    expect(handleCopy).toHaveBeenCalled();
  });
});
