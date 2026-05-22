import Link from "next/link"
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Phone,
  Mail,
  MapPin
} from "lucide-react"

const footerLinks = {
  reservas: [
    { label: "Buscar vuelos", href: "/reservar" },
    { label: "Gestionar reserva", href: "/mis-reservas" },
    { label: "Check-in online", href: "/check-in" },
    { label: "Estado del vuelo", href: "/estado-vuelo" },
    { label: "Horarios", href: "/horarios" }
  ],
  experiencia: [
    { label: "Economy", href: "/experiencia/economy" },
    { label: "Premium Economy", href: "/experiencia/premium-economy" },
    { label: "Business Class", href: "/experiencia/business" },
    { label: "First Class", href: "/experiencia/first" },
    { label: "Servicios a bordo", href: "/experiencia/servicios" }
  ],
  atlanticPlus: [
    { label: "Unirse al programa", href: "/atlantic-plus/registro" },
    { label: "Iniciar sesión", href: "/login" },
    { label: "Niveles de membresía", href: "/atlantic-plus/niveles" },
    { label: "Canjear millas", href: "/atlantic-plus/canjear" },
    { label: "Partners", href: "/atlantic-plus/partners" }
  ],
  empresa: [
    { label: "Sobre nosotros", href: "/sobre-nosotros" },
    { label: "Sostenibilidad", href: "/sostenibilidad" },
    { label: "Sala de prensa", href: "/prensa" },
    { label: "Carreras", href: "/carreras" },
    { label: "Inversores", href: "/inversores" }
  ]
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" }
]

export function Footer() {
  return (
    <footer className="bg-[#05164d] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Logo and contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#ffad00] rounded-full flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-6 h-6 text-[#05164d]"
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M22 16.5L12 21L2 16.5" />
                  <path d="M12 12L22 7.5L12 3L2 7.5L12 12Z" />
                  <path d="M12 12V21" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">Atlantic</span>
                <span className="text-xs text-[#ffad00] -mt-1 tracking-widest">AIRLINES</span>
              </div>
            </Link>
            
            <p className="text-white/70 mb-6 max-w-xs">
              Conectando el mundo con seguridad, confort y la mejor experiencia de vuelo desde 1974.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-[#ffad00]" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-[#ffad00]" />
                <span>info@atlanticairlines.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-[#ffad00]" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-bold mb-4 text-[#ffad00]">Reservas</h4>
            <ul className="space-y-3">
              {footerLinks.reservas.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#ffad00]">Tu experiencia</h4>
            <ul className="space-y-3">
              {footerLinks.experiencia.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#ffad00]">Atlantic Plus</h4>
            <ul className="space-y-3">
              {footerLinks.atlanticPlus.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#ffad00]">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-12 pt-8 border-t border-[#414e63]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-white/70">Síguenos:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-[#414e63] flex items-center justify-center hover:bg-[#ffad00] hover:text-[#05164d] transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <Link href="/app" className="hover:text-white transition-colors">
                App móvil
              </Link>
              <span>|</span>
              <Link href="/accesibilidad" className="hover:text-white transition-colors">
                Accesibilidad
              </Link>
              <span>|</span>
              <Link href="/mapa-sitio" className="hover:text-white transition-colors">
                Mapa del sitio
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#414e63]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-white/60">
            <p>© 2026 Atlantic Airlines. Todos los derechos reservados.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacidad" className="hover:text-white transition-colors">
                Política de privacidad
              </Link>
              <Link href="/terminos" className="hover:text-white transition-colors">
                Términos y condiciones
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Política de cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
