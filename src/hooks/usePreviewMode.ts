'use client';

export const usePreviewMode = () => {
  return process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true'
} 