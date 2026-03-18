import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Container from '../components/layout/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { teamData } from '../data/siteData'

function TeamMember({ data, t }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }} className="flex flex-col items-center text-center group">
      <div className="mb-6 flex h-32 w-32 md:h-40 md:w-40 items-center justify-center rounded-full bg-white text-brand-blue-700 shadow-sm transition-all group-hover:bg-brand-blue-50 group-hover:shadow-md overflow-hidden relative border-4 border-brand-blue-50">
        <data.icon className="h-10 w-10 md:h-12 md:w-12 text-brand-blue-500 opacity-50" />
      </div>
      <h4 className="text-xl font-heading font-bold text-brand-slate-900 group-hover:text-brand-blue-700 transition-colors">{t(`team.members.${data.id}.name`)}</h4>
      <p className="text-brand-slate-500 font-medium">{t(`team.members.${data.id}.role`)}</p>
    </motion.div>
  )
}

export default function TeamSection() {
  const { t } = useTranslation()

  return (
    <section id="team" className="py-24 bg-brand-blue-50/30">
      <Container>
        <SectionHeader title={t('team.title')} subtitle={t('team.subtitle')} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 max-w-5xl mx-auto">
          {teamData.map((member) => (
            <TeamMember key={member.id} data={member} t={t} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
