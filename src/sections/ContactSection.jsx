import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import Container from '../components/layout/Container'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { contactConfig, servicesData } from '../data/siteData'

export default function ContactSection() {
  const { t } = useTranslation()
  const formRef = useRef()
  const [formData, setFormData] = useState({ user_name: '', user_email: '', service: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (status) setStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.user_name || !formData.user_email || !formData.service || !formData.message) {
      setStatus('error')
      return
    }

    setIsSubmitting(true)

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ user_name: '', user_email: '', service: '', message: '' })
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
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
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="relative rounded-3xl bg-white p-8 md:p-10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.08)] border border-brand-slate-100">
            <AnimatePresence>
              {status && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`absolute top-4 left-4 right-4 z-20 flex items-center gap-3 rounded-xl p-4 text-sm font-semibold shadow-lg ${
                    status === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                  }`}
                >
                  {status === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  {status === 'success' ? 'Message envoyé avec succès !' : 'Une erreur s’est produite. Veuillez réessayer.'}
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-2xl font-heading font-bold text-brand-slate-900 mb-6">{t('contact.form.title')}</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">{t('contact.form.name_label')}</label>
                <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} className="w-full rounded-lg border border-brand-slate-200 bg-brand-slate-50 px-4 py-3 text-brand-slate-900 transition-colors focus:border-brand-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20" placeholder={t('contact.form.name_placeholder')} required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">{t('contact.info.email')}</label>
                <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} className="w-full rounded-lg border border-brand-slate-200 bg-brand-slate-50 px-4 py-3 text-brand-slate-900 transition-colors focus:border-brand-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20" placeholder="votre@email.com" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">{t('contact.form.service_label')}</label>
                <select name="service" value={formData.service} onChange={handleChange} className="w-full rounded-lg border border-brand-slate-200 bg-brand-slate-50 px-4 py-3 text-brand-slate-900 transition-colors focus:border-brand-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20 appearance-none" required>
                  <option value="" disabled>{t('contact.form.service_placeholder')}</option>
                  {servicesData.map(s => (
                    <option key={s.id} value={t(`services.items.${s.id}.title`)}>{t(`services.items.${s.id}.title`)}</option>
                  ))}
                  <option value={t('contact.form.service_multiple')}>{t('contact.form.service_multiple')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-slate-700 mb-2">{t('contact.form.message_label')}</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full resize-none rounded-lg border border-brand-slate-200 bg-brand-slate-50 px-4 py-3 text-brand-slate-900 transition-colors focus:border-brand-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20" placeholder={t('contact.form.message_placeholder')} required />
              </div>
              
              <Button type="submit" disabled={isSubmitting} className="w-full py-4 text-base mt-2 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {t('contact.form.submit')}
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-brand-slate-400 mt-4">{t('contact.form.disclaimer')}</p>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
