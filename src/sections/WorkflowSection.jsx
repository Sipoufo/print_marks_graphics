import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Container from '../components/layout/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { workflowData } from '../data/siteData'

function StepItem({ data, index, t }) {
  const isLast = index === workflowData.length - 1

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="relative flex flex-col pt-12 md:pt-0">
      {!isLast && <div className="hidden lg:block absolute top-[52px] left-[50%] w-full h-[2px] bg-brand-blue-100/50" />}
      <div className="relative mb-8 self-start lg:self-center">
        <span className="absolute -top-12 -left-6 lg:-left-12 text-8xl font-heading font-black text-brand-blue-900/[0.03] select-none z-0">0{data.step}</span>
        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-brand-blue-50 text-brand-blue-700">
          <data.icon className="h-8 w-8" />
        </div>
      </div>
      <div className="lg:text-center px-2">
        <h3 className="mb-3 text-xl font-heading font-bold text-brand-slate-900 group-hover:text-brand-blue-700 transition-colors">
          <span className="text-brand-blue-500 mr-2 lg:hidden">0{data.step}.</span>
          {t(`workflow.items.${data.id}.title`)}
        </h3>
        <p className="text-brand-slate-500 leading-relaxed text-sm">
          {t(`workflow.items.${data.id}.description`)}
        </p>
      </div>
    </motion.div>
  )
}

export default function WorkflowSection() {
  const { t } = useTranslation()
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }

  return (
    <section id="method" className="py-24 bg-brand-blue-50/40 border-y border-brand-blue-50">
      <Container>
        <SectionHeader title={t('workflow.title')} subtitle={t('workflow.subtitle')} />
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mt-16">
          {workflowData.map((step, index) => (
            <StepItem key={step.id} data={step} index={index} t={t} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
