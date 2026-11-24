import { describe, it, expect } from 'vitest';
import { getInitials, buildWhatsAppUrl, sanitizePhone } from './formatters.ts';

describe('Formatters & Utility Functions', () => {
  it('extracts initials correctly from full name', () => {
    expect(getInitials('Alex Kumar')).toBe('AK');
    expect(getInitials('Alex')).toBe('AL');
    expect(getInitials('John Ronald Reuel Tolkien')).toBe('JT');
  });

  it('sanitizes raw phone numbers for tel protocol', () => {
    expect(sanitizePhone('+1 (555) 234-5678')).toBe('+15552345678');
    expect(sanitizePhone('0123-456-789')).toBe('0123456789');
  });

  it('builds RFC-compliant WhatsApp direct chat URL with encoded message', () => {
    const url = buildWhatsAppUrl('15552345678', 'Hello AK, nice to connect!');
    expect(url).toBe('https://wa.me/15552345678?text=Hello%20AK%2C%20nice%20to%20connect!');
  });
});
