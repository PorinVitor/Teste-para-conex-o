import { Link } from "react-router";
import { User, Mail, Lock, Building, UserCheck } from "lucide-react";
import appLogo from "../../imports/image.png";
import { useRegisterController } from "../controllers/register.controller";

export function RegisterView() {
  const { loading, formData, setFormData, submit } = useRegisterController();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src={appLogo} alt="Conexão Autista" className="size-24 rounded-2xl shadow-lg" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Criar Conta Escola</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-4" onSubmit={submit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                <input type="text" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl" placeholder="Nome do usuário" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                <input type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl" placeholder="seu@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cargo</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserCheck className="h-5 w-5 text-gray-400" /></div>
                <select value={formData.role} onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white">
                  <option value="">Selecione seu cargo</option>
                  <option value="director">Diretor(a)</option>
                  <option value="coordinator">Coordenador(a)</option>
                  <option value="teacher">Professor(a)</option>
                  <option value="teacher_tea">Professor(a) TEA</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Escola</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Building className="h-5 w-5 text-gray-400" /></div>
                <input type="text" value={formData.schoolName} onChange={(e) => setFormData((prev) => ({ ...prev, schoolName: e.target.value }))} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl" placeholder="Nome da Instituição" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                <input type="password" value={formData.password} onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl" placeholder="••••••••" />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#7b8bda] disabled:opacity-60">{loading ? "Cadastrando..." : "Cadastrar"}</button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-medium text-[#7b8bda] hover:text-[#6a79c9]">Já tem uma conta? Faça login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
