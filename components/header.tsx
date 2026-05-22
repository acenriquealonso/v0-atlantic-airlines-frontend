"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User, Globe, ChevronDown } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#05164d] text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b border-[#414e63]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/ayuda" className="hover:text-[#ffad00] transition-colors">
                Ayuda
              </Link>
              <Link href="/contacto" className="hover:text-[#ffad00] transition-colors">
                Contacto
              </Link>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <button className="flex items-center gap-1 hover:text-[#ffad00] transition-colors">
                <Globe className="w-4 h-4" />
                <span>ES</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <Link 
                href="/login" 
                className="flex items-center gap-2 hover:text-[#ffad00] transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Mi cuenta</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/reservar" 
              className="font-medium hover:text-[#ffad00] transition-colors"
            >
              Reservar
            </Link>
            <Link 
              href="/destinos" 
              className="font-medium hover:text-[#ffad00] transition-colors"
            >
              Destinos
            </Link>
            <Link 
              href="/experiencia" 
              className="font-medium hover:text-[#ffad00] transition-colors"
            >
              Tu experiencia
            </Link>
            <Link 
              href="/ofertas" 
              className="font-medium hover:text-[#ffad00] transition-colors"
            >
              Ofertas
            </Link>
            <Link 
              href="/atlantic-plus" 
              className="font-medium hover:text-[#ffad00] transition-colors"
            >
              Atlantic Plus
            </Link>
          </nav>

          {/* Check-in button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/check-in"
              className="bg-[#ffad00] text-[#05164d] px-6 py-2 rounded font-semibold hover:bg-[#ffbd32] transition-colors"
            >
              Check-in online
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[#414e63]">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              href="/reservar" 
              className="py-2 font-medium hover:text-[#ffad00] transition-colors"
            >
              Reservar
            </Link>
            <Link 
              href="/destinos" 
              className="py-2 font-medium hover:text-[#ffad00] transition-colors"
            >
              Destinos
            </Link>
            <Link 
              href="/experiencia" 
              className="py-2 font-medium hover:text-[#ffad00] transition-colors"
            >
              Tu experiencia
            </Link>
            <Link 
              href="/ofertas" 
              className="py-2 font-medium hover:text-[#ffad00] transition-colors"
            >
              Ofertas
            </Link>
            <Link 
              href="/atlantic-plus" 
              className="py-2 font-medium hover:text-[#ffad00] transition-colors"
            >
              Atlantic Plus
            </Link>
            <div className="pt-4 border-t border-[#414e63] flex flex-col gap-3">
              <Link href="/ayuda" className="text-sm hover:text-[#ffad00] transition-colors">
                Ayuda
              </Link>
              <Link href="/contacto" className="text-sm hover:text-[#ffad00] transition-colors">
                Contacto
              </Link>
            </div>
            <Link 
              href="/check-in"
              className="mt-2 bg-[#ffad00] text-[#05164d] px-6 py-3 rounded font-semibold text-center hover:bg-[#ffbd32] transition-colors"
            >
              Check-in online
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
