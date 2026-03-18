import { motion } from 'framer-motion'

export function SectionHeader({ title, subtitle, className = '' }) {
  return (
    <div className={`mx-auto max-w-2xl text-center mb-16 ${className}`}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 block text-sm font-semibold uppercase tracking-wider text-brand-blue-700"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight text-brand-slate-900"
      >
        {title}
      </motion.h2>
    </div>
  )
}
