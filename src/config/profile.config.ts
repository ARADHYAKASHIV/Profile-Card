import { ProfileCardConfig } from '../types/profile.ts';

export const PROFILE_DATA: ProfileCardConfig = {
  person: {
    name: "ARADHYA KASHIV",
    nickname: "AK",
    badge: "Verified Developer",
    title: "FullStack Developer & AI Engineer",
    bio: "Building intelligent full-stack architectures & high-impact AI systems.",
    location: "Indore, India",
    avatar: "/avatar.jpg",
    status: {
      active: true,
      text: "Available for work"
    }
  },
  contact: {
    phone: {
      display: "+91 99818 06555",
      raw: "+919981806555",
      label: "Phone"
    },
    whatsapp: {
      display: "+91 99818 06555",
      number: "919981806555",
      label: "WhatsApp",
      defaultMessage: "Hi Aradhya, I tapped your NFC card and would love to connect!"
    },
    emails: [
      {
        address: "work.aradhyakashiv@gmail.com",
        label: "Work & Projects",
        primary: true
      }
    ]
  },
  socials: [
    {
      id: "linkedin",
      title: "LinkedIn",
      handle: "in/aradhyakashiv",
      url: "https://linkedin.com/in/aradhyakashiv",
      category: "Network"
    },
    {
      id: "github",
      title: "GitHub",
      handle: "aradhyakashiv",
      url: "https://github.com/aradhyakashiv",
      category: "Code"
    },
    {
      id: "instagram",
      title: "Instagram",
      handle: "@_aradhya_0509_",
      url: "https://instagram.com/_aradhya_0509_",
      category: "Visuals"
    },
    {
      id: "portfolio",
      title: "Portfolio",
      handle: "aradhyakashiv.in",
      url: "https://aradhyakashiv.in",
      category: "Live"
    }
  ],
  theme: {
    defaultTheme: "dark",
    accentColor: "#3B82F6",
    cardTilt: true
  }
};
