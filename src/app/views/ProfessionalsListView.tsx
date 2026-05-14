import { Search, UserPlus, Filter, MoreHorizontal, Mail, Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MOCK_PROFESSIONALS = [
  {
    id: "p1",
    name: "Ana Paula Silva",
    role: "Professora Polivalente",
    email: "ana.paula@escola.com",
    phone: "(11) 98888-7777",
    studentsCount: 5,
    status: "Ativo",
    avatar: "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwZmVtYWxlJTIwbWFsZSUyMHBvcnRyYWl0JTIwc21pbGluZyUyMHNjaG9vbHxlbnwxfHx8fDE3Nzg3NDE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "p2",
    name: "Ricardo Santos",
    role: "Professor de Educação Especial",
    email: "ricardo.santos@escola.com",
    phone: "(11) 97777-6666",
    studentsCount: 3,
    status: "Ativo",
    avatar: "https://images.unsplash.com/photo-1758685848404-5b2bf607b38d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwbWFsZSUyMHBvcnRyYWl0JTIwc21pbGluZyUyMHNjaG9vbHxlbnwxfHx8fDE3Nzg3NDE0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "p3",
    name: "Mariana Oliveira",
    role: "Coordenadora Pedagógica",
    email: "mariana.o@escola.com",
    phone: "(11) 96666-5555",
    studentsCount: 12,
    status: "Ativo",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODc0MTQwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "p4",
    name: "Dr. Roberto Lima",
    role: "Psicopedagogo",
    email: "roberto.lima@escola.com",
    phone: "(11) 95555-4444",
    studentsCount: 4,
    status: "Ativo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Nzg3NDE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function ProfessionalsListView() {
  return (
    <div className="space-y-8 pb-12">
      <div className="bg-[#FFEDDF] -mx-4 md:-mx-8 px-4 md:px-8 py-6 mb-8 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profissionais</h1>
            <p className="text-gray-600">Equipe de profissionais da instituição.</p>
          </div>
          <Link
            to="/school/register-teacher"
            className="inline-flex items-center justify-center gap-2 bg-[#F97316] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e66a14] transition-all shadow-md active:scale-95"
          >
            <UserPlus className="size-5" />
            Cadastrar Profissional
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
          <input
            type="text"
            placeholder="Buscar por nome, cargo ou e-mail..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#7b8bda] outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
          <Filter className="size-5" />
          Filtrar por Cargo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {MOCK_PROFESSIONALS.map((pro) => (
          <Link 
            key={pro.id} 
            to={`/school/professionals/${pro.id}`}
            className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-[#7b8bda]/30 transition-all flex flex-col md:flex-row"
          >
            <div className="md:w-40 h-40 md:h-auto overflow-hidden shrink-0">
              <ImageWithFallback 
                src={pro.avatar} 
                alt={pro.name} 
                className="size-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#7b8bda] transition-colors">{pro.name}</h3>
                    <p className="text-[#7b8bda] font-medium text-sm">{pro.role}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-100">
                    {pro.status}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail className="size-4" />
                    {pro.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="size-4" />
                    {pro.phone}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-bold uppercase">Alunos Vinculados</span>
                  <span className="text-lg font-bold text-gray-900">{pro.studentsCount}</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-[#7b8bda] group-hover:text-white transition-all">
                  <ChevronRight className="size-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
