export const env = {
  preview: {
    enabled: process.env.PREVIEW_MODE === 'true',
    launchDate: process.env.LAUNCH_DATE || '2025-01-15T03:00:00.000Z'
  },
  // Add other env configurations here
}; 