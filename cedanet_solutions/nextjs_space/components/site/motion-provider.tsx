'use client'

import { MotionConfig } from 'framer-motion'

// Respeta la preferencia del sistema "reducir movimiento"
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
