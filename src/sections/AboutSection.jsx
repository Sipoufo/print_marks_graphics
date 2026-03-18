import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Container from '../components/layout/Container'
import { coreValuesData } from '../data/siteData'

function ValueBadge({ data, t }) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-brand-blue-50/50 border border-brand-blue-50/80 hover:bg-brand-blue-50 transition-colors">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-blue-700 shadow-sm">
        <data.icon className="h-6 w-6" />
      </div>
      <div>
        <h4 className="mb-2 font-heading font-bold tracking-tight text-brand-slate-900">{t(`about.values.${data.id}.title`)}</h4>
        <p className="text-sm text-brand-slate-500 leading-relaxed">{t(`about.values.${data.id}.description`)}</p>
      </div>
    </div>
  )
}

export default function AboutSection() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-brand-blue-700">{t('about.subtitle')}</span>
            <h2 className="mb-8 text-4xl md:text-5xl font-heading font-black tracking-tight text-brand-slate-900">
              {t('about.title')}
            </h2>
            <div className="space-y-8 border-l-4 border-brand-blue-500 pl-6 md:pl-8">
              <div>
                <h3 className="mb-2 text-xl font-heading font-bold text-brand-slate-900">{t('about.mission_title')}</h3>
                <p className="text-lg text-brand-slate-500 leading-relaxed">{t('about.mission_desc')}</p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-heading font-bold text-brand-slate-900">{t('about.vision_title')}</h3>
                <p className="text-lg text-brand-slate-500 leading-relaxed">{t('about.vision_desc')}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {coreValuesData.map((value) => (
              <ValueBadge key={value.id} data={value} t={t} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
