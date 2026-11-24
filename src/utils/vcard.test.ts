import { describe, it, expect } from 'vitest';
import { generateVCardContent } from './vcard.ts';
import { ProfileCardConfig } from '../types/profile.ts';

describe('vCard 3.0 Generation', () => {
  const sampleConfig: ProfileCardConfig = {
    person: {
      name: 'Alex Kumar',
      nickname: 'AK',
      title: 'Senior Product Designer',
      bio: 'Crafting minimal digital experiences.',
      location: 'San Francisco, CA'
    },
    contact: {
      phone: {
        display: '+1 (555) 234-5678',
        raw: '+15552345678'
      },
      whatsapp: {
        display: '+1 (555) 234-5678',
        number: '15552345678'
      },
      emails: [
        { address: 'alex@agency.design', primary: true },
        { address: 'ak.personal@gmail.com', primary: false }
      ]
    },
    socials: [
      { id: 'portfolio', title: 'Portfolio', handle: 'alex.design', url: 'https://alex.design' }
    ],
    theme: { defaultTheme: 'dark' }
  };

  it('generates standard RFC-compliant vCard 3.0 string', () => {
    const vcard = generateVCardContent(sampleConfig);

    expect(vcard).toContain('BEGIN:VCARD');
    expect(vcard).toContain('VERSION:3.0');
    expect(vcard).toContain('FN:Alex Kumar');
    expect(vcard).toContain('N:Kumar;Alex;;;');
    expect(vcard).toContain('TITLE:Senior Product Designer');
    expect(vcard).toContain('TEL;TYPE=CELL,VOICE:+15552345678');
    expect(vcard).toContain('EMAIL;TYPE=INTERNET,WORK:alex@agency.design');
    expect(vcard).toContain('EMAIL;TYPE=INTERNET,HOME:ak.personal@gmail.com');
    expect(vcard).toContain('URL:https://alex.design');
    expect(vcard).toContain('END:VCARD');
  });
});
