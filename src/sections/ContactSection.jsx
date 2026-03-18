import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from '../components/layout/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { contactConfig, servicesData } from '../data/siteData'

export default function ContactSection() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', service: '', message: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.service || !formData.message) {
      setError(t('contact.form.error'))
      return
    }
    const text = `Hi, I am ${formData.name}. I am looking for ${formData.service}. ${formData.message}`
    const encodedText = encodeURIComponent(text)
    const whatsappUrl = `https://wa.me/${contactConfig.whatsappNumber}?text=${encodedText}`
    window.open(whatsappUrl, '_blank')
  }

  const contactInfo = [
    { icon: Phone, title: t('contact.info.phone'), details: contactConfig.phone },
    { icon: Mail, title: t('contact.info.email'), details: contactConfig.email },
    { icon: MapPin, title: t('contact.info.location'), details: contactConfig.address },
    { icon: Clock, title: t('contact.info.hours'), details: contactConfig.hours },
  ]

  return (
    <section id="contact" className="py-24 bg-white">
      <Container>
        <SectionHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="mb-8 text-2xl font-heading font-black tracking-tight text-brand-slate-900">{t('contact.heading')}</h3>
            <p className="text-brand-slate-500 mb-10 leading-relaxed text-lg">{t('contact.desc')}</p>
            <div className="space-y-8">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-700">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-brand-slate-900 mb-1">{info.title}</h4>
                    <p className="text-brand-slate-600 leading-relaxed max-w-xs">{info.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-3xl bg-white p-8 md:p-10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.08)] border border-brand-slate-100">
            <h3 className="text-2xl font-heading font-bold text-brand-slate-900 mb-6">{t('contact.form.title')}</h3>
            <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">{t('contact.form.name_label')}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-brand-slate-200 bg-brand-slate-50 px-4 py-3 text-brand-slate-900 transition-colors focus:border-brand-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20" placeholder={t('contact.form.name_placeholder')} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">{t('contact.form.service_label')}</label>
                <select name="service" value={formData.service} onChange={handleChange} className="w-full rounded-lg border border-brand-slate-200 bg-brand-slate-50 px-4 py-3 text-brand-slate-900 transition-colors focus:border-brand-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20 appearance-none">
                  <option value="" disabled>{t('contact.form.service_placeholder')}</option>
                  {servicesData.map(s => (
                    <option key={s.id} value={t(`services.items.${s.id}.title`)}>{t(`services.items.${s.id}.title`)}</option>
                  ))}
                  <option value={t('contact.form.service_multiple')}>{t('contact.form.service_multiple')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">{t('contact.form.message_label')}</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full resize-none rounded-lg border border-brand-slate-200 bg-brand-slate-50 px-4 py-3 text-brand-slate-900 transition-colors focus:border-brand-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20" placeholder={t('contact.form.message_placeholder')} />
              </div>
              {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
              <Button type="submit" className="w-full py-4 text-base mt-2">{t('contact.form.submit')}</Button>
              <p className="text-center text-xs text-brand-slate-400 mt-4">{t('contact.form.disclaimer')}</p>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
