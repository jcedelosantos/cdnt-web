'use client'

import { motion } from 'framer-motion'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  inView: boolean
  tone?: 'light' | 'dark'
}

export function SectionHeader({ eyebrow, title, description, inView, tone = 'light' }: SectionHeaderProps) {
  const dark = tone === 'dark'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center mb-14 md:mb-16"
    >
      <span
        className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider ${
          dark ? 'text-brand-light' : 'text-brand-dark'
        }`}
      >
        <span className={`h-px w-6 ${dark ? 'bg-brand-light' : 'bg-brand'}`} aria-hidden="true" />
        {eyebrow}
        <span className={`h-px w-6 ${dark ? 'bg-brand-light' : 'bg-brand'}`} aria-hidden="true" />
      </span>
      <h2
        className={`font-display text-3xl md:text-4xl font-bold tracking-tight mt-3 ${
          dark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
      )}
    </motion.div>
  )
}
