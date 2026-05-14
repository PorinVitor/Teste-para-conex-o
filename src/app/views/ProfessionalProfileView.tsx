import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  Calendar,
  MessageCircle,
  Clock,
  ChevronRight,
  AlertTriangle
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MOCK_PROFESSIONALS = {
  "p1": {
    id: "p1",
    name: "Ana Paula Silva",
    role: "Professora Polivalente",
    email: "ana.paula@escola.com",
    phone: "(11) 98888-7777",
    bio: "Especialista em alfabetização e séries iniciais. Atua na rede de ensino há 10 anos com foco em inclusão escolar.",
    since: "Janeiro de 2020",
    workHours: "Seg - Sex, 07:00 - 13:00",
    avatar: "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwZmVtYWxlJTIwbWFsZSUyMHBvcnRyYWl0JTIwc21pbGluZyUyMHNjaG9vbHxlbnwxfHx8fDE3Nzg3NDE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    linkedStudents: [
      { id: "1", name: "Julia da Silva", avatar: "https://images.unsplash.com/photo-1606386666595-d135abc1e3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvcnRyYWl0JTIwYXV0aXN0aWMlMjBzdHVkZW50fGVufDF8fHx8MTc3ODczOTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", guardian: "Maria da Silva", phone: "(11) 98765-4321", status: "Ativo", hasRecentCrisis: true },
      { id: "3", name: "Beatriz Santos", avatar: "https://images.unsplash.com/photo-1610533289180-9d90161eba40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBzY2hvb2wlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Nzg3MzkzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", guardian: "Fernanda Santos", phone: "(11) 97777-2222", status: "Pendente", hasRecentCrisis: false },
      { id: "5", name: "Gustavo Rocha", avatar: "https://images.unsplash.com/photo-1774482367573-6a32b664d1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwc2Nob29sJTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODczOTM1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", guardian: "Roberto Rocha", phone: "(11) 96666-3333", status: "Ativo", hasRecentCrisis: false }
    ]
  }
};

export function ProfessionalProfileView() {
  const { id } = useParams();
  const pro = MOCK_PROFESSIONALS[id as keyof typeof MOCK_PROFESSIONALS] || MOCK_PROFESSIONALS["p1"];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link to="/school/professionals" className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-gray-100">
          <ArrowLeft className="size-6 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Perfil do Profissional</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="size-32 mx-auto rounded-full overflow-hidden border-4 border-[#cbc2ff] shadow-inner mb-4">
              <ImageWithFallback src={pro.avatar} alt={pro.name} className="size-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{pro.name}</h2>
            <p className="text-[#7b8bda] font-bold">{pro.role}</p>
            
            <div className="mt-8 space-y-3">
              <ContactBox icon={Mail} value={pro.email} />
              <ContactBox icon={Phone} value={pro.phone} />
              <ContactBox icon={Calendar} value={`Desde ${pro.since}`} />
              <ContactBox icon={Clock} value={pro.workHours} />
            </div>

            <button className="w-full mt-8 flex items-center justify-center gap-2 bg-[#7b8bda] text-white py-4 rounded-2xl font-bold hover:bg-[#6a79c9] transition-all shadow-md">
              <MessageCircle className="size-5" />
              Enviar Mensagem
            </button>
          </div>

          <div className="bg-blue-50/50 rounded-3xl border border-blue-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <GraduationCap className="size-4 text-[#7b8bda]" />
              Especialidades
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-[#7b8bda] border border-blue-100 shadow-sm">Alfabetização</span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-[#7b8bda] border border-blue-100 shadow-sm">Psicopedagogia</span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-[#7b8bda] border border-blue-100 shadow-sm">Inclusão TEA</span>
            </div>
          </div>
        </div>

        {/* Right: Bio & Linked Students */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="size-6 text-[#7b8bda]" />
              Sobre o Profissional
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {pro.bio}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="size-6 text-[#7b8bda]" />
                Alunos Vinculados ({pro.linkedStudents.length})
              </h3>
              <Link to="/link-child" className="text-[#7b8bda] font-bold text-sm hover:underline">
                Vincular Novo Aluno
              </Link>
            </div>

            <div className="space-y-4">
              {pro.linkedStudents.map((student) => (
                <Link 
                  key={student.id} 
                  to={`/child/${student.id}`}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#7b8bda] hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="size-14 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                      <ImageWithFallback src={student.avatar} alt={student.name} className="size-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900 truncate group-hover:text-[#7b8bda] transition-colors">{student.name}</p>
                        {student.hasRecentCrisis && (
                          <AlertTriangle className="size-5 text-red-500 animate-pulse shrink-0" title="Alerta de crise recente" />
                        )}
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mt-1 ${
                        student.status === "Ativo"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 md:text-right">
                    <p className="text-sm font-semibold text-gray-900">{student.guardian}</p>
                    <div className="flex items-center md:justify-end gap-1 text-xs text-gray-500">
                      <Phone className="size-3" />
                      {student.phone}
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <ChevronRight className="size-5 text-gray-300 group-hover:text-[#7b8bda]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactBox({ icon: Icon, value }: { icon: any, value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-left">
      <div className="size-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
        <Icon className="size-4 text-[#7b8bda]" />
      </div>
      <span className="text-sm font-medium text-gray-600 truncate">{value}</span>
    </div>
  );
}

import { Users } from "lucide-react";
