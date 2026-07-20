export const DesignTokens = {
  colors: {
    dark: {
      background: "#020202",
      surface: "#0a0a0c",
      border: "rgba(255, 255, 255, 0.06)",
      textPrimary: "#f4f4f5",
      textMuted: "#a1a1aa",
      accentGold: "#f59e0b",
      selectionBg: "rgba(245, 158, 11, 0.15)"
    },
    light: {
      background: "#ffffff",
      surface: "#f4f4f5",
      border: "rgba(0, 0, 0, 0.06)",
      textPrimary: "#09090b",
      textMuted: "#71717a",
      accentGold: "#f59e0b",
      selectionBg: "rgba(245, 158, 11, 0.15)"
    }
  },
  typography: {
    fontSans: "Satoshi, Inter, sans-serif",
    fontMono: "JetBrains Mono, monospace",
    sizes: {
      displayXl: "3.75rem", // 60px
      headingL: "2.25rem",  // 36px
      bodyM: "1rem",       // 16px
      caption: "0.75rem",   // 12px
      code: "0.875rem"      // 14px
    }
  },
  spacing: {
    grid: 8,
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px"
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    default: "16px",
    xl: "24px",
    full: "9999px"
  },
  blur: {
    glass: "18px"
  },
  transitions: {
    default: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
  }
};
