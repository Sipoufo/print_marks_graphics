import { motion } from 'framer-motion'
import { forwardRef } from 'react'

export const Card = forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl bg-white p-8 shadow-sm border border-brand-slate-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
})

Card.displayName = 'Card'
