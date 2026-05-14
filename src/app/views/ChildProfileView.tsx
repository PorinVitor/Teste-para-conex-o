import { useParams, Link } from "react-router";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Layers, 
  Target, 
  Zap, 
  AlertTriangle, 
  Heart, 
  Video, 
  Play, 
  MessageCircle,
  Phone,
  BookOpen,
  GraduationCap
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MOCK_CHILD = {
  id: "1",
  name: "Julia da Silva",
  birthDate: "22/07/2016",
  gender: "Feminino",
  supportLevel: "Nível 1 - Suporte leve",
  hyperfocus: ["Desenho", "Gatos", "Histórias em quadrinhos"],
  atypias: ["Flapping (movimentar as mãos)", "Evitar contato visual"],
  difficulties: ["Lidar com imprevistos", "Expressar emoções"],
  triggers: ["Luzes muito fortes", "Toques inesperados"],
  intolerances: ["Glúten"],
  crisisResponse: "Permitir que ela fique sozinha no quarto, oferecer um objeto de conforto, validar seus sentimentos sem forçar a interação.",
  guardian: {
    name: "Maria da Silva",
    relation: "Mãe",
    phone: "(11) 98765-4321",
    email: "maria.silva@email.com"
  },
  avatar: "https://images.unsplash.com/photo-1606386666595-d135abc1e3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvcnRyYWl0JTIwYXV0aXN0aWMlMjBzdHVkZW50fGVufDF8fHx8MTc3ODczOTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  calmingVideos: [
    { id: 1, title: "Natureza Relaxante", thumbnail: "https://images.unsplash.com/photo-1582401818608-1cf80c1af532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb290aGluZyUyMG5hdHVyZSUyMGxhbmRzY2FwZSUyMGNhbG1pbmd8ZW58MXx8fHwxNzc4NzM5MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: 2, title: "Sons de Chuva", thumbnail: "https://images.unsplash.com/photo-1731030941434-10f7ff56398f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHJlbGF4aW5nJTIwY2FsbWluZyUyMHZpZGVvJTIwdGh1bWJuYWlsfGVufDF8fHx8MTc3ODczOTM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  ],
  teachers: [
    { id: "t1", name: "Ana Paula", role: "Professora Polivalente", avatar: "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwZmVtYWxlJTIwbWFsZSUyMHBvcnRyYWl0JTIwc21pbGluZyUyMHNjaG9vbHxlbnwxfHx8fDE3Nzg3NDE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: "t2", name: "Ricardo Santos", role: "Professor de Educação Especial", avatar: "https://images.unsplash.com/photo-1758685848404-5b2bf607b38d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwbWFsZSUyMHBvcnRyYWl0JTIwc21pbGluZyUyMHNjaG9vbHxlbnwxfHx8fDE3Nzg3NDE0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  ]
};

export function ChildProfileView() {
  const { id } = useParams();

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-gray-100">
          <ArrowLeft className="size-6 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Perfil do Aluno</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basic Info & Guardian */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8 text-center">
            <div className="size-32 mx-auto rounded-full overflow-hidden border-4 border-[#cbc2ff] shadow-inner mb-4">
              <ImageWithFallback src={MOCK_CHILD.avatar} alt={MOCK_CHILD.name} className="size-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{MOCK_CHILD.name}</h2>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to={`/child/${id}/diary`}
                className="flex items-center justify-center gap-2 bg-[#2963EB] text-white py-3 rounded-xl font-bold hover:bg-[#1d4ed8] transition-all"
              >
                <BookOpen className="size-5" />
                Ver Diário Escolar
              </Link>
              <Link
                to={`/child/${id}/diary/new`}
                className="flex items-center justify-center gap-2 border-2 border-[#2963EB] text-[#2963EB] py-3 rounded-xl font-bold hover:bg-blue-50 transition-all"
              >
                Nova Entrada
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="size-5 text-[#7b8bda]" />
              Responsável
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-blue-50 rounded-full flex items-center justify-center text-[#7b8bda]">
                  <User className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{MOCK_CHILD.guardian.name}</p>
                  <p className="text-xs text-gray-500">{MOCK_CHILD.guardian.relation}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{MOCK_CHILD.guardian.phone}</p>
                </div>
              </div>
              <button className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-50 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                <MessageCircle className="size-4" />
                Enviar Mensagem
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="size-5 text-[#7b8bda]" />
              Professores
            </h3>
            <div className="space-y-4">
              {MOCK_CHILD.teachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center gap-3">
                  <div className="size-10 rounded-full overflow-hidden border border-gray-100 shrink-0">
                    <ImageWithFallback src={teacher.avatar} alt={teacher.name} className="size-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{teacher.name}</p>
                    <p className="text-xs text-gray-500 truncate">{teacher.role}</p>
                  </div>
                </div>
              ))}
              <button className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-50 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                <MessageCircle className="size-4" />
                Conversar com Equipe
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info & Crisis Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#cbc2ff]/10 rounded-3xl border border-[#cbc2ff]/20 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Layers className="size-6 text-[#7b8bda]" />
              Informações Gerais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <InfoItem icon={Calendar} label="Data de Nascimento" value={MOCK_CHILD.birthDate} />
                <InfoItem icon={User} label="Sexo" value={MOCK_CHILD.gender} />
                <InfoItem icon={Layers} label="Nível de Suporte" value={MOCK_CHILD.supportLevel} />
                <InfoTags icon={Target} label="Hiperfocos" tags={MOCK_CHILD.hyperfocus} />
              </div>
              <div className="space-y-4">
                <InfoTags icon={Zap} label="Atipias" tags={MOCK_CHILD.atypias} />
                <InfoTags icon={AlertTriangle} label="Dificuldades" tags={MOCK_CHILD.difficulties} />
                <InfoTags icon={AlertTriangle} label="Gatilhos" tags={MOCK_CHILD.triggers} color="red" />
                <InfoTags icon={Heart} label="Intolerâncias" tags={MOCK_CHILD.intolerances} color="orange" />
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-3xl border border-red-100 p-8">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="size-6 text-red-500" />
              Sessão de Crise
            </h3>
            
            <div className="mb-8">
              <h4 className="font-bold text-red-800 mb-2">Como lidar com crises:</h4>
              <p className="text-red-900/80 leading-relaxed bg-white/50 p-4 rounded-2xl border border-red-200">
                {MOCK_CHILD.crisisResponse}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                <Video className="size-5" />
                Vídeos para acalmar:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_CHILD.calmingVideos.map((video) => (
                  <div key={video.id} className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-red-200">
                    <ImageWithFallback 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 p-3 rounded-full">
                        <Play className="size-6 text-red-500 fill-red-500" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm font-bold">{video.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex gap-3">
      <div className="size-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
        <Icon className="size-5 text-[#7b8bda]" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-gray-900 font-semibold">{value}</p>
      </div>
    </div>
  );
}

function InfoTags({ icon: Icon, label, tags, color = "blue" }: { icon: any, label: string, tags: string[], color?: "blue" | "red" | "orange" }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    red: "bg-red-50 text-red-700 border-red-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
  };

  return (
    <div className="flex gap-3">
      <div className="size-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
        <Icon className={`size-5 ${color === 'red' ? 'text-red-500' : color === 'orange' ? 'text-orange-500' : 'text-[#7b8bda]'}`} />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClasses[color]}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
