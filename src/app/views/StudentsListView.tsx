import { Search, UserPlus, MoreHorizontal, ChevronRight, Phone, Filter, AlertTriangle } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export const MOCK_CHILDREN = [
  {
    id: "1",
    name: "Julia da Silva",
    guardian: "Maria da Silva",
    phone: "(11) 98765-4321",
    teacher: "Prof. Ana Paula",
    status: "Ativo",
    avatar: "https://images.unsplash.com/photo-1606386666595-d135abc1e3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvcnRyYWl0JTIwYXV0aXN0aWMlMjBzdHVkZW50fGVufDF8fHx8MTc3ODczOTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasRecentCrisis: true,
  },
  {
    id: "2",
    name: "Lucas Oliveira",
    guardian: "Carlos Oliveira",
    phone: "(11) 98888-1111",
    teacher: "Prof. Ricardo",
    status: "Ativo",
    avatar: "https://images.unsplash.com/photo-1774482367573-6a32b664d1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwc2Nob29sJTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODczOTM1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasRecentCrisis: false,
  },
  {
    id: "3",
    name: "Beatriz Santos",
    guardian: "Fernanda Santos",
    phone: "(11) 97777-2222",
    teacher: "Prof. Ana Paula",
    status: "Pendente",
    avatar: "https://images.unsplash.com/photo-1610533289180-9d90161eba40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBzY2hvb2wlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Nzg3MzkzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasRecentCrisis: false,
  },
];

export function StudentsListView() {
  return (
    <div className="space-y-8 pb-12">
      <div className="bg-[#E5EAD7] -mx-4 md:-mx-8 px-4 md:px-8 py-6 mb-8 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alunos</h1>
            <p className="text-gray-600">Listagem completa de alunos vinculados à instituição.</p>
          </div>
          <Link
            to="/link-child"
            className="inline-flex items-center justify-center gap-2 bg-[#A3B878] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#8da366] transition-all shadow-md active:scale-95"
          >
            <UserPlus className="size-5" />
            Vincular novo aluno
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
          <input
            type="text"
            placeholder="Buscar aluno por nome ou responsável..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#7b8bda] outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="bg-gray-50 border border-transparent rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-[#7b8bda] flex-1 md:flex-none">
            <option>Todos os Professores</option>
            <option>Prof. Ana Paula</option>
            <option>Prof. Ricardo</option>
          </select>
          
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#E5EAD7] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Aluno</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Responsável</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Professor</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_CHILDREN.map((child) => (
                <tr key={child.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <Link to={`/child/${child.id}`} className="flex items-center gap-3">
                      <div className="size-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                        <ImageWithFallback
                          src={child.avatar}
                          alt={child.name}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 group-hover:text-[#7b8bda] transition-colors text-[20px]">
                          {child.name}
                        </span>
                        {child.hasRecentCrisis && (
                          <AlertTriangle className="size-5 text-red-500 animate-pulse" title="Alerta de crise recente" />
                        )}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-semibold">{child.guardian}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone className="size-3" />
                        {child.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium">{child.teacher}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      child.status === "Ativo" 
                        ? "bg-green-100 text-green-700 border border-green-200" 
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}>
                      {child.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/child/${child.id}`}
                        className="p-2 text-gray-400 hover:text-[#7b8bda] hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100"
                      >
                        <ChevronRight className="size-5" />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-xl transition-all">
                        <MoreHorizontal className="size-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
