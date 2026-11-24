/**
 * Utility formatters for contact values and initials
 */

export function getInitials(name: string): string {
  if (!name || name.trim() === '') return 'AK';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function sanitizePhone(rawPhone: string): string {
  if (!rawPhone) return '';
  // Preserve leading '+' if present, strip out spaces, parentheses, dashes
  const hasPlus = rawPhone.trim().startsWith('+');
  const digits = rawPhone.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
}

export function buildWhatsAppUrl(number: string, defaultMessage?: string): string {
  const cleanNumber = number.replace(/\D/g, '');
  const msg = defaultMessage ? `?text=${encodeURIComponent(defaultMessage)}` : '';
  return `https://wa.me/${cleanNumber}${msg}`;
}
