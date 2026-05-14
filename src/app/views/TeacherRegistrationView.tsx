import { useState } from "react";
import { ArrowLeft, UserPlus, Mail, Shield, User, GraduationCap, Save } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export function TeacherRegistrationView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    // Simulating registration
    toast.success("Profissional cadastrado com sucesso!");
    setFormData({
      name: "",
      email: "",
      specialty: "",
      password: "",
      confirmPassword: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link to="/school/professionals" className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-gray-100">
          <ArrowLeft className="size-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar Profissional</h1>
          <p className="text-sm text-gray-500">Adicione novos membros à equipe pedagógica e de especialistas.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <User className="size-4 text-[#7b8bda]" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Prof. Roberto Almeida"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7b8bda]/20 focus:border-[#7b8bda] transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Mail className="size-4 text-[#7b8bda]" />
                  E-mail Institucional
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="roberto.almeida@escola.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7b8bda]/20 focus:border-[#7b8bda] transition-all"
                />
              </div>

              {/* Specialty */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <GraduationCap className="size-4 text-[#7b8bda]" />
                  Especialidade / Matéria
                </label>
                <select
                  name="specialty"
                  required
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7b8bda]/20 focus:border-[#7b8bda] transition-all bg-white"
                >
                  <option value="">Selecione um cargo / especialidade</option>
                  <option value="Diretora">Diretora</option>
                  <option value="Coordenadora Pedagógica">Coordenadora Pedagógica</option>
                  <option value="Professora Polivalente">Professora Polivalente</option>
                  <option value="Professor de Educação Especial">Professor de Educação Especial / TEA</option>
                  <option value="Psicopedagoga">Psicopedagoga / Psicólogo</option>
                  <option value="Auxiliar de Vida Escolar">Auxiliar de Vida Escolar (AVE)</option>
                  <option value="Outro">Outro especialista</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Shield className="size-4 text-[#7b8bda]" />
                    Senha Temporária
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7b8bda]/20 focus:border-[#7b8bda] transition-all"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Shield className="size-4 text-[#7b8bda]" />
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7b8bda]/20 focus:border-[#7b8bda] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#7b8bda] text-white py-4 rounded-xl font-bold hover:bg-[#6a79c9] transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <UserPlus className="size-5" />
                Finalizar Cadastro
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4">
        <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center text-[#7b8bda] shrink-0">
          <Shield className="size-5" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 text-sm">Informação de Segurança</h4>
          <p className="text-blue-800/70 text-sm mt-1">
            O professor receberá um e-mail para ativar sua conta e definir uma senha definitiva no primeiro acesso.
          </p>
        </div>
      </div>
    </div>
  );
}
