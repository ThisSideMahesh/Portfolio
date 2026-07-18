export const AnalyticsConfig = {
  enabled: process.env.NODE_ENV === "production",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
  telemetryEnabled: false
};
