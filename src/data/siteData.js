import {
  PenTool,
  Briefcase,
  Printer,
  MonitorSmartphone,
  Droplet,
  BookOpen,
  GraduationCap,
  Tent,
  Sparkles,
  Search,
  CheckCircle,
  Target,
  Shield,
  Lightbulb,
  Users,
  Hexagon,
  Square,
  Circle,
} from 'lucide-react'

export const servicesData = [
  { id: 'office-training', icon: GraduationCap },
  { id: 'printing', icon: Printer },
  { id: 'admin-management', icon: Briefcase },
  { id: 'office-supplies', icon: BookOpen },
  { id: 'service-provision', icon: Sparkles },
]

export const workflowData = [
  { id: 'analysis', step: '1', icon: Search },
  { id: 'strategy', step: '2', icon: Lightbulb },
  { id: 'execution', step: '3', icon: PenTool },
  { id: 'delivery', step: '4', icon: CheckCircle },
]

export const coreValuesData = [
  { id: 'precision', icon: Target },
  { id: 'reliability', icon: Shield },
  { id: 'innovation', icon: Lightbulb },
  { id: 'partnership', icon: Users },
]

export const teamData = [
  { id: 'alex', icon: Hexagon },
  { id: 'sam', icon: Square },
  { id: 'jordan', icon: Circle },
]

export const contactConfig = {
  phone: '675 66 51 19 / 6 99 53 65 72',
  email: 'hello@printmarksgraphics.com',
  address:
    'Direction Générale : carrefour Biyem Assi, (face collège EBANDA)  Yaoundé, Cameroun',
  hours: 'Mon-Fri: 08h-18h, Sat: 08h-13h',
  socials: {
    instagram: 'https://instagram.com/printmarks',
    linkedin: 'https://linkedin.com/company/printmarks',
  },
}
