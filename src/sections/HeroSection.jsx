import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../components/layout/Container'
import { Button } from '../components/ui/Button'

export default function HeroSection() {
  const { t } = useTranslation()
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }

  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-32 lg:pt-48 lg:pb-40">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-blue-50 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-brand-accent-500/5 blur-3xl" />
      
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl">
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center rounded-full bg-brand-blue-50 px-3 py-1 text-sm font-semibold text-brand-blue-700 shadow-[0_0_0_1px_rgba(59,130,246,0.1)]">
            <span className="flex h-2 w-2 rounded-full bg-brand-blue-500 mr-2" />
            {t('hero.badge')}
          </motion.div>
          <motion.h1 variants={itemVariants} className="mb-8 text-5xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-brand-slate-900 leading-tight">
            {t('hero.slogan1')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-500 to-brand-blue-700">{t('hero.slogan2')}</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mb-10 text-lg sm:text-xl md:text-2xl font-sans text-brand-slate-500 leading-relaxed max-w-3xl mx-auto">
            {t('hero.value_prop')}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="#contact" variant="primary" className="w-full sm:w-auto text-lg px-8 py-4">
              {t('hero.btn_quote')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button href="#services" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
              {t('hero.btn_services')}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-slate-300 pointer-events-none">
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  )
}
