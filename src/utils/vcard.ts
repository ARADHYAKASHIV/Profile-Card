import { ProfileCardConfig } from '../types/profile.ts';
import { sanitizePhone } from './formatters.ts';

/**
 * Compiles RFC 2426 vCard 3.0 specification text
 */
export function generateVCardContent(config: ProfileCardConfig): string {
  const person = config.person;
  const contact = config.contact;

  const parts = (person.name || 'Alex Kumar').trim().split(/\s+/);
  const firstName = parts[0] || 'Alex';
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';

  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${person.name}`,
    `N:${lastName};${firstName};;;`,
  ];

  if (person.title) {
    lines.push(`TITLE:${person.title}`);
  }

  if (person.bio) {
    lines.push(`NOTE:${person.bio.replace(/\r?\n/g, ' ')}`);
  }

  if (contact.phone?.raw) {
    lines.push(`TEL;TYPE=CELL,VOICE:${sanitizePhone(contact.phone.raw)}`);
  }

  if (contact.whatsapp?.number) {
    lines.push(`TEL;TYPE=WORK,MSG:+${contact.whatsapp.number.replace(/\D/g, '')}`);
  }

  if (contact.emails && Array.isArray(contact.emails)) {
    contact.emails.forEach((em, idx) => {
      const type = idx === 0 ? 'WORK' : 'HOME';
      lines.push(`EMAIL;TYPE=INTERNET,${type}:${em.address}`);
    });
  }

  const portfolio = config.socials.find(s => s.id === 'portfolio');
  if (portfolio?.url) {
    lines.push(`URL:${portfolio.url}`);
  }

  lines.push('END:VCARD');

  return lines.join('\r\n');
}

/**
 * Triggers native download or contact import
 */
export function downloadVCard(config: ProfileCardConfig): void {
  const vcf = generateVCardContent(config);
  const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  const filename = `${(config.person.nickname || config.person.name).replace(/\s+/g, '_')}.vcf`;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
