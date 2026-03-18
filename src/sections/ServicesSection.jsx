import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Container from '../components/layout/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Card } from '../components/ui/Card'
import { servicesData } from '../data/siteData'

export default function ServicesSection() {
  const { t } = useTranslation()
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }

  return (
    <section id="services" className="py-24 bg-white">
      <Container>
        <SectionHeader title={t('services.title')} subtitle={t('services.subtitle')} />
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <Card key={service.id} variants={cardVariants} className="flex flex-col h-full group">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-700 transition-colors group-hover:bg-brand-blue-700 group-hover:text-white">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-heading font-bold text-brand-slate-900">
                {t(`services.items.${service.id}.title`)}
              </h3>
              <p className="text-brand-slate-500 leading-relaxed flex-grow">
                {t(`services.items.${service.id}.description`)}
              </p>
            </Card>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
