"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, User, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const action = isRegister ? "register" : "login"
      const body: Record<string, string> = { email, password, action }
      if (isRegister) {
        body.nombre = nombre
        body.apellidos = apellidos
      }

      const res = await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const json = await res.json()

      if (json.ok) {
        setMessage({
          type: "success",
          text: isRegister
            ? `✅ Cuenta creada. Bienvenido, ${json.data.cliente.nombre}.`
            : `✅ Inicio de sesión exitoso. Bienvenido, ${json.data.cliente.nombre}.`,
        })
      } else {
        setMessage({ type: "error", text: json.error || "Error en la operación" })
      }
    } catch {
      setMessage({ type: "error", text: "Error de conexión." })
    } finally {
      setLoading(false)
    }
  }

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

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${
              message.type === "success" 
                ? "bg-green-50 border border-green-200 text-green-700" 
                : "bg-red-50 border border-red-200 text-red-700"
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Nombre
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Apellidos
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                    <input
                      type="text"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      placeholder="Tus apellidos"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  required
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffad00] text-[#05164d] py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors disabled:opacity-50"
            >
              {loading ? "Procesando..." : isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#666666]">
              {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
              <button
                onClick={() => { setIsRegister(!isRegister); setMessage(null) }}
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
