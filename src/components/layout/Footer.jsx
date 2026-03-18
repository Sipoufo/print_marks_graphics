import { Twitter, Linkedin, Instagram } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Container from './Container'
import { contactConfig } from '../../data/siteData'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-slate-900 py-16 text-blue-50 border-t border-brand-slate-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue-500 to-brand-blue-700 text-white font-bold text-sm shadow-sm">PM</div>
              <span className="text-xl font-heading font-black tracking-tight text-white">Print Marks <span className="text-brand-blue-400">graphics</span></span>
            </div>
            <p className="text-brand-slate-400 max-w-md text-sm leading-relaxed">{t('footer.desc')}</p>
            <div className="flex gap-4 pt-2">
              <a href={contactConfig.socials.instagram} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-slate-800 text-brand-slate-400 hover:bg-brand-blue-700 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href={contactConfig.socials.linkedin} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-slate-800 text-brand-slate-400 hover:bg-brand-blue-700 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-slate-800 text-brand-slate-400 hover:bg-brand-blue-700 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="font-heading font-bold tracking-tight text-white mb-6 uppercase text-sm">{t('footer.sitemap')}</h3>
            <ul className="space-y-3 text-sm text-brand-slate-400 font-medium tracking-wide">
              <li><a href="#services" className="hover:text-brand-blue-400 transition-colors">{t('header.services')}</a></li>
              <li><a href="#method" className="hover:text-brand-blue-400 transition-colors">{t('header.method')}</a></li>
              <li><a href="#about" className="hover:text-brand-blue-400 transition-colors">{t('header.about')}</a></li>
              <li><a href="#team" className="hover:text-brand-blue-400 transition-colors">{t('header.team')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-bold tracking-tight text-white mb-6 uppercase text-sm">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm text-brand-slate-400">
              <li>{contactConfig.address}</li>
              <li className="pt-2"><a href={`mailto:${contactConfig.email}`} className="hover:text-brand-blue-400 transition-colors">{contactConfig.email}</a></li>
              <li><a href={`tel:${contactConfig.whatsappNumber}`} className="font-bold text-white hover:text-brand-blue-400 transition-colors">{contactConfig.phone}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-brand-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-wider text-brand-slate-500">
          <p>&copy; {currentYear} {t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
