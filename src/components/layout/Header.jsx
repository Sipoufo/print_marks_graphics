import { useTranslation } from 'react-i18next'
import Container from './Container'

export default function Header() {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl transition-all duration-300">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue-500 to-brand-blue-700 text-white font-bold shadow-sm">
              PM
            </div>
            <span className="text-xl font-heading font-black tracking-tight text-brand-slate-900">
              Print Mark's <span className="text-brand-blue-500">graphics</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className="text-sm font-semibold text-brand-slate-500 hover:text-brand-blue-700 transition-colors"
            >
              {t('header.services')}
            </a>
            <a
              href="#method"
              className="text-sm font-semibold text-brand-slate-500 hover:text-brand-blue-700 transition-colors"
            >
              {t('header.method')}
            </a>
            <a
              href="#about"
              className="text-sm font-semibold text-brand-slate-500 hover:text-brand-blue-700 transition-colors"
            >
              {t('header.about')}
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-brand-slate-500 hover:text-brand-blue-700 transition-colors"
            >
              {t('header.contact')}
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-xs font-black uppercase tracking-widest text-brand-slate-400 hover:text-brand-blue-700 transition-colors focus:outline-none"
            >
              {i18n.language && i18n.language.startsWith('fr') ? 'EN' : 'FR'}
            </button>
            <a
              href="#contact"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-blue-700 px-6 text-sm font-semibold text-white transition-all hover:bg-brand-blue-900 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2"
            >
              {t('header.quote')}
            </a>
          </div>
        </div>
      </Container>
    </header>
  )
}
