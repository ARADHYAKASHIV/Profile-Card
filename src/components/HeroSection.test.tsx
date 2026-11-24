import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { HeroSection } from './HeroSection.tsx';
import { PersonProfile } from '../types/profile.ts';

describe('HeroSection Component', () => {
  const mockPerson: PersonProfile = {
    name: 'Alex Kumar',
    nickname: 'AK',
    badge: 'Verified Pro',
    title: 'Senior Product Designer',
    bio: 'Crafting minimal digital experiences.',
    location: 'San Francisco, CA / Remote',
    status: {
      active: true,
      text: 'Available for work'
    }
  };

  it('renders person details, title, and availability status', () => {
    render(
      <HeroSection
        person={mockPerson}
        onSaveContact={vi.fn()}
        onShare={vi.fn()}
      />
    );

    expect(screen.getByText('Alex Kumar')).toBeInTheDocument();
    expect(screen.getByText('Senior Product Designer')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA / Remote')).toBeInTheDocument();
    expect(screen.getByText('Available for work')).toBeInTheDocument();
  });

  it('triggers onSaveContact and onShare callbacks on button click', () => {
    const handleSave = vi.fn();
    const handleShare = vi.fn();

    render(
      <HeroSection
        person={mockPerson}
        onSaveContact={handleSave}
        onShare={handleShare}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /save contact/i }));
    expect(handleSave).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /share link/i }));
    expect(handleShare).toHaveBeenCalledTimes(1);
  });
});
