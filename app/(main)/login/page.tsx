"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, User, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  return (
    <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <img 
              src="/img/logo-white.svg" 
              alt="Atlantic Airlines" 
              className="h-16 w-auto mx-auto bg-[#05164d] p-3 rounded-lg"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-[#05164d] text-center mb-2">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h1>
          <p className="text-[#666666] text-center mb-8">
            {isRegister 
              ? "Únete a Atlantic Plus y empieza a acumular millas" 
              : "Accede a tu cuenta de Atlantic Airlines"
            }
          </p>

          <form className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                  <input
                    type="text"
                    placeholder="Tu nombre y apellidos"
                    className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  className="w-full pl-10 pr-12 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#333333]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-[#dcdcdc]" />
                  <span className="text-[#666666]">Recordarme</span>
                </label>
                <Link href="/recuperar-contrasena" className="text-[#05164d] hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            )}

            {isRegister && (
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="rounded border-[#dcdcdc] mt-1" />
                <span className="text-[#666666]">
                  Acepto los{" "}
                  <Link href="/terminos" className="text-[#05164d] hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacidad" className="text-[#05164d] hover:underline">
                    política de privacidad
                  </Link>
                </span>
              </label>
            )}

            <button
              type="submit"
              className="w-full bg-[#ffad00] text-[#05164d] py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors"
            >
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#666666]">
              {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-[#05164d] font-medium hover:underline"
              >
                {isRegister ? "Iniciar sesión" : "Regístrate gratis"}
              </button>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6">
          <Link href="/" className="text-[#666666] hover:text-[#05164d] transition-colors">
            ← Volver a la página principal
          </Link>
        </p>
      </div>
    </main>
  )
}
