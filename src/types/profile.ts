export interface PersonProfile {
  name: string;
  nickname?: string;
  badge?: string;
  title: string;
  bio: string;
  location: string;
  avatar?: string;
  status?: {
    active: boolean;
    text: string;
  };
}

export interface DirectContact {
  phone?: {
    display: string;
    raw: string;
    label?: string;
  };
  whatsapp?: {
    display: string;
    number: string;
    label?: string;
    defaultMessage?: string;
  };
  emails: Array<{
    address: string;
    label?: string;
    primary?: boolean;
  }>;
}

export interface SocialLink {
  id: string;
  title: string;
  handle: string;
  url: string;
  category?: string;
}

export interface ProfileCardConfig {
  person: PersonProfile;
  contact: DirectContact;
  socials: SocialLink[];
  theme: {
    defaultTheme: 'dark' | 'light';
    accentColor?: string;
    cardTilt?: boolean;
  };
}
