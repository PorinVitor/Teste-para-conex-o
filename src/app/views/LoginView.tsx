import { Link } from "react-router";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import appLogo from "../../imports/image.png";
import { useLoginController } from "../controllers/login.controller";

export function LoginView() {
  const {
    showPassword,
    setShowPassword,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    submit,
  } = useLoginController();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src={appLogo} alt="Conexão Autista" className="size-24 rounded-2xl shadow-lg" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Conexão Autista</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Módulo Escolar</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#7b8bda] focus:border-[#7b8bda] sm:text-sm" placeholder="seu@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#7b8bda] focus:border-[#7b8bda] sm:text-sm" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <button disabled={loading} type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#7b8bda] hover:bg-[#6a79c9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7b8bda] transition-all disabled:opacity-60">
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/register" className="text-sm font-medium text-[#7b8bda] hover:text-[#6a79c9]">Criar conta da escola</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
