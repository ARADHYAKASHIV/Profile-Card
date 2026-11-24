import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { SpotlightCard } from './SpotlightCard.tsx';
import { DecryptedText } from './DecryptedText.tsx';
import { ClickSpark } from './ClickSpark.tsx';
import { TiltedCard } from './TiltedCard.tsx';

describe('ReactBits Component Suite', () => {
  it('mounts SpotlightCard with children', () => {
    render(
      <SpotlightCard className="test-card">
        <p>Spotlight Content</p>
      </SpotlightCard>
    );
    expect(screen.getByText('Spotlight Content')).toBeInTheDocument();
  });

  it('mounts TiltedCard with front and back content', () => {
    render(
      <TiltedCard backContent={<p>Back Content</p>}>
        <p>Front Content</p>
      </TiltedCard>
    );
    expect(screen.getByText('Front Content')).toBeInTheDocument();
    expect(screen.getByText('Back Content')).toBeInTheDocument();
  });

  it('mounts DecryptedText with target text', () => {
    render(<DecryptedText text="Alex Kumar" animateOn="view" />);
    // Screen reader accessible text is rendered
    expect(screen.getByText('Alex Kumar')).toBeInTheDocument();
  });

  it('mounts ClickSpark wrapper', () => {
    render(
      <ClickSpark>
        <button>Tap Me</button>
      </ClickSpark>
    );
    expect(screen.getByText('Tap Me')).toBeInTheDocument();
  });
});
