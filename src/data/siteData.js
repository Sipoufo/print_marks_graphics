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
  Circle
} from 'lucide-react'

export const servicesData = [
  { id: "graphic-design", icon: PenTool },
  { id: "office-services", icon: Briefcase },
  { id: "printing-general", icon: Printer },
  { id: "digital-printing", icon: MonitorSmartphone },
  { id: "screen-printing", icon: Droplet },
  { id: "micro-publishing", icon: BookOpen },
  { id: "educational-materials", icon: GraduationCap },
  { id: "events", icon: Tent },
  { id: "miscellaneous-services", icon: Sparkles }
]

export const workflowData = [
  { id: "discovery", step: "1", icon: Search },
  { id: "design", step: "2", icon: PenTool },
  { id: "production", step: "3", icon: Printer },
  { id: "quality", step: "4", icon: CheckCircle }
]

export const coreValuesData = [
  { id: "precision", icon: Target },
  { id: "reliability", icon: Shield },
  { id: "innovation", icon: Lightbulb },
  { id: "partnership", icon: Users }
]

export const teamData = [
  { id: "alex", icon: Hexagon },
  { id: "sam", icon: Square },
  { id: "jordan", icon: Circle }
]

export const contactConfig = {
  phone: "+1 (555) 123-4567",
  whatsappNumber: "15551234567",
  email: "hello@printmarksgraphics.com",
  address: "123 Creative Studio Way, Printing District, NY 10001",
  hours: "Mon - Fri: 9:00 AM - 6:00 PM",
  socials: {
    instagram: "https://instagram.com/printmarks",
    linkedin: "https://linkedin.com/company/printmarks"
  }
}
