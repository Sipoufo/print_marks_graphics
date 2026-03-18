import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const variants = {
  primary: "bg-brand-blue-700 text-white hover:bg-brand-blue-900 shadow-sm border border-transparent",
  secondary: "bg-white text-brand-blue-700 hover:bg-brand-blue-50 shadow-sm border border-brand-blue-100",
  outline: "bg-transparent text-brand-slate-800 hover:bg-brand-slate-50 border border-brand-slate-200"
}

export const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  href, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2"
  const classes = `${baseClasses} ${variants[variant]} ${className}`

  const MotionComponent = href ? motion.a : motion.button

  return (
    <MotionComponent
      ref={ref}
      href={href}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </MotionComponent>
  )
})

Button.displayName = 'Button'
