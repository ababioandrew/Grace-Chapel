// File: src/components/Icons.jsx

import React from 'react';

/* =========================
   SHARED SVG DEFAULTS
========================= */

const defaultProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/* =========================
   CHURCH / BRAND ICONS
========================= */

export const IconChurch = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <path d="M24 4L24 12" />
    <path d="M20 8L28 8" />
    <path d="M12 44L12 20L24 12L36 20L36 44" />
    <path d="M12 44L36 44" />
    <path d="M20 44L20 32L28 32L28 44" />
    <path d="M8 44L40 44" />
  </svg>
);

export const IconCross = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <line x1="24" y1="8" x2="24" y2="42" />
    <line x1="14" y1="20" x2="34" y2="20" />
  </svg>
);

export const IconBible = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <rect x="10" y="6" width="28" height="36" rx="2" />
    <line x1="10" y1="14" x2="38" y2="14" />
    <line x1="24" y1="18" x2="24" y2="34" />
    <line x1="18" y1="26" x2="30" y2="26" />
  </svg>
);

export const IconPray = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <path d="M16 40L16 24C16 20 18 16 24 16C30 16 32 20 32 24L32 40" />
    <path d="M16 40L32 40" />
    <path d="M24 8L24 16" />
    <path d="M20 12L28 12" />
  </svg>
);

/* =========================
   CALENDAR / EVENTS
========================= */

export const IconCalendar = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <rect x="8" y="10" width="32" height="32" rx="2" />
    <line x1="8" y1="20" x2="40" y2="20" />
    <line x1="16" y1="6" x2="16" y2="14" />
    <line x1="32" y1="6" x2="32" y2="14" />
    <circle cx="16" cy="28" r="2" fill="currentColor" />
    <circle cx="24" cy="28" r="2" fill="currentColor" />
    <circle cx="32" cy="28" r="2" fill="currentColor" />
    <circle cx="16" cy="36" r="2" fill="currentColor" />
    <circle cx="24" cy="36" r="2" fill="currentColor" />
  </svg>
);

/* =========================
   PLAY / MEDIA
========================= */

export const IconPlay = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <circle cx="24" cy="24" r="20" />
    <polygon points="20,16 36,24 20,32" fill="currentColor" />
  </svg>
);

/* =========================
   LOCATION
========================= */

export const IconLocation = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <path d="M24 44C24 44 40 30 40 20C40 11.16 32.84 4 24 4C15.16 4 8 11.16 8 20C8 30 24 44 24 44Z" />
    <circle cx="24" cy="20" r="6" />
  </svg>
);

export const IconMapPin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

/* =========================
   COMMUNICATION
========================= */

export const IconPhone = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.12-6.12A19.86 19.86 0 0 1 2 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.89.7 2.77a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.31-1.31a2 2 0 0 1 2.11-.45c.88.34 1.81.58 2.77.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const IconMail = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
);

export const IconChat = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 5V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

/* =========================
   PEOPLE
========================= */

export const IconUsers = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const IconUser = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* =========================
   HEART / STAR / BELL
========================= */

export const IconHeart = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const IconStar = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const IconBell = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/* =========================
   UI / ACTIONS
========================= */

export const IconCheck = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const IconClose = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const IconMenu = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const IconSearch = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const IconArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const IconArrowLeft = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const IconSettings = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const IconLogOut = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const IconMicrophone = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

export const IconSend = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/* =========================
   SOCIAL MEDIA
========================= */

export const IconFacebook = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const IconYouTube = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#fff" />
  </svg>
);

export const IconInstagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const IconWhatsApp = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const IconTikTok = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

/* =========================
   LEGACY / ORIGINAL ICONS
   (still used by About.jsx & Services.jsx)
========================= */

export const IconBalance = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <line x1="24" y1="8" x2="24" y2="42" />
    <line x1="10" y1="12" x2="38" y2="12" />
    <line x1="14" y1="12" x2="8" y2="22" />
    <line x1="14" y1="12" x2="20" y2="22" />
    <path d="M8 22h12c0 4-3 7-6 7s-6-3-6-7z" />
    <line x1="34" y1="12" x2="28" y2="22" />
    <line x1="34" y1="12" x2="40" y2="22" />
    <path d="M28 22h12c0 4-3 7-6 7s-6-3-6-7z" />
    <line x1="18" y1="42" x2="30" y2="42" />
  </svg>
);

export const IconBuilding = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <path d="M8 18L24 6l16 12v24H8z" />
    <rect x="20" y="30" width="8" height="12" />
    <rect x="14" y="20" width="4" height="4" />
    <rect x="22" y="20" width="4" height="4" />
    <rect x="30" y="20" width="4" height="4" />
    <rect x="14" y="27" width="4" height="4" />
    <rect x="30" y="27" width="4" height="4" />
  </svg>
);

export const IconDocument = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <path d="M12 4h18l8 8v32H12z" />
    <polyline points="30 4 30 12 38 12" />
    <line x1="18" y1="20" x2="32" y2="20" />
    <line x1="18" y1="27" x2="32" y2="27" />
    <line x1="18" y1="34" x2="26" y2="34" />
  </svg>
);

export const IconCompliance = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <circle cx="24" cy="24" r="18" />
    <polyline points="16 24 22 30 33 18" />
  </svg>
);

export const IconContract = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <path d="M10 6h24v36H10z" />
    <line x1="16" y1="16" x2="28" y2="16" />
    <line x1="16" y1="23" x2="28" y2="23" />
    <line x1="16" y1="30" x2="24" y2="30" />
    <path d="M34 28l4-4 4 4-4 14z" />
  </svg>
);

export const IconDueDiligence = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <circle cx="20" cy="20" r="11" />
    <line x1="28" y1="28" x2="40" y2="40" />
    <polyline points="16 20 20 24 27 16" />
  </svg>
);

export const IconFlowerPot = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <path d="M24 8C20 12 20 18 24 22C28 18 28 12 24 8Z" />
    <path d="M24 22C18 18 12 18 10 24C16 26 21 26 24 22Z" />
    <path d="M24 22C30 18 36 18 38 24C32 26 27 26 24 22Z" />
    <line x1="24" y1="22" x2="24" y2="30" />
    <path d="M16 30H32L29 40H19L16 30Z" />
  </svg>
);

export const IconStone = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <path d="M14 30L18 18L30 14L38 22L34 34L22 38L14 30Z" />
    <path d="M18 18L28 22L34 34" />
    <path d="M22 38L28 22L38 22" />
  </svg>
);

export const IconFlower = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" {...defaultProps}>
    <circle cx="24" cy="14" r="6" />
    <circle cx="34" cy="24" r="6" />
    <circle cx="24" cy="34" r="6" />
    <circle cx="14" cy="24" r="6" />
    <circle cx="24" cy="24" r="4" />
    <line x1="24" y1="38" x2="24" y2="46" />
  </svg>
);