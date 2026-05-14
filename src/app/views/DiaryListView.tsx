import { useParams, Link, useNavigate } from "react-router";
import { 
  Plus, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Edit2, 
  AlertCircle, 
  Smile, 
  CloudRain, 
  Zzz,
  Flame,
  Coffee,
  School,
  BookOpen,
  User
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MOCK_STUDENTS = [
  { id: "1", name: "Julia", avatar: "https://images.unsplash.com/photo-1606386666595-d135abc1e3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvcnRyYWl0JTIwYXV0aXN0aWMlMjBzdHVkZW50fGVufDF8fHx8MTc3ODczOTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "2", name: "Pedro", avatar: "https://images.unsplash.com/photo-1727553957801-75bb27e98075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHN0dWRlbnQlMjBwb3J0cmFpdCUyMHNtaWxpbmclMjBib3l8ZW58MXx8fHwxNzc4NzQxNDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "3", name: "Bia", avatar: "https://images.unsplash.com/photo-1533582194091-85f9c250c96a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHN0dWRlbnQlMjBwb3J0cmFpdCUyMHNtaWxpbmclMjBnaXJsfGVufDF8fHx8MTc3ODc0MTQzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: "4", name: "Enzo", avatar: "https://images.unsplash.com/photo-1663229048101-c05a918cbd7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRpc3RpYyUyMGNoaWxkJTIwYm95JTIwZ2lybCUyMHBvcnRyYWl0JTIwc2Nob29sfGVufDF8fHx8MTc3ODc0MTQyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

const MOCK_DIARY_ENTRIES = [
  {
    id: "1",
    title: "Atividades em Sala",
    content: "Hoje a Julia participou ativamente da aula de artes. Ela demonstrou muito interesse nos gatinhos de papel que fizemos. Houve um pequeno momento de agitação na hora do recreio por conta do barulho excessivo, mas ela conseguiu se autorregular com o uso dos fones.",
    date: "14/05/2026",
    time: "10:00",
    location: "Sala de Aula",
    icon: School,
    color: "blue",
    mood: "Feliz",
    moodIcon: Smile,
    learning: "Coordenação motora fina com recorte.",
    crisis: "Agitação leve durante o recreio.",
    resolution: "Uso de fones e espaço silencioso."
  },
  {
    id: "2",
    title: "Momento de Alerta",
    content: "Julia ficou incomodada com a mudança repentina na rotina (troca de professor). Ela apresentou flapping e evitou contato visual por cerca de 20 minutos.",
    date: "13/05/2026",
    time: "14:30",
    location: "Pátio",
    icon: AlertCircle,
    color: "red",
    mood: "Ansiosa",
    moodIcon: CloudRain,
    learning: "Socialização com colegas.",
    crisis: "Crise sensorial leve.",
    resolution: "Acompanhamento individualizado e reforço positivo."
  }
];

export function DiaryListView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentStudent = MOCK_STUDENTS.find(s => s.id === id) || MOCK_STUDENTS[0];

  return (
    <div className="space-y-10 pb-20">
      <div className="bg-[#DBEAFE] -mx-4 md:-mx-8 px-4 md:px-8 py-6 mb-8 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-gray-100">
              <ArrowLeft className="size-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Diário Escolar - <span className="text-[#2963EB]">{currentStudent.name}</span>
              </h1>
              <p className="text-sm text-gray-600">Acompanhamento diário das atividades e comportamento.</p>
            </div>
          </div>
          <Link
            to={`/child/${id}/diary/new`}
            className="inline-flex items-center justify-center gap-2 bg-[#2963EB] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1d4ed8] transition-all shadow-md active:scale-95"
          >
            <Plus className="size-5" />
            Nova Anotação
          </Link>
        </div>
      </div>

      {/* Students Horizontal List */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {MOCK_STUDENTS.map((student) => (
            <button
              key={student.id}
              onClick={() => navigate(`/child/${student.id}/diary`)}
              className="group flex flex-col items-center gap-2 transition-all"
            >
              <div className={`size-16 rounded-full p-1 border-2 transition-all ${student.id === id ? 'border-[#2963EB] scale-110 shadow-lg' : 'border-transparent group-hover:border-gray-200'}`}>
                <div className="size-full rounded-full overflow-hidden">
                  <ImageWithFallback src={student.avatar} alt={student.name} className="size-full object-cover" />
                </div>
              </div>
              <span className={`text-xs font-bold text-[#2963EB]`}>
                {student.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
        {/* Calendar Sidebar (Simplified) */}
        <div className="md:col-span-2 space-y-4">
          <Link
            to={`/child/${id}`}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm group"
          >
            <User className="size-5 text-[#7b8bda] group-hover:scale-110 transition-transform" />
            Ver Perfil
          </Link>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="size-5 text-[#7b8bda]" />
              Maio 2026
            </h3>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 mb-2">
              <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  className={`size-8 rounded-full flex items-center justify-center text-sm transition-all ${
                    day === 14 
                      ? "bg-[#7b8bda] text-white font-bold" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#cbc2ff]/10 p-6 rounded-3xl border border-[#cbc2ff]/20">
            <h4 className="font-bold text-[#7b8bda] mb-2 text-sm uppercase">Resumo da Semana</h4>
            <div className="space-y-3">
              <StatRow label="Anotações" value="5" />
              <StatRow label="Crises" value="1" />
              <StatRow label="Humor Médio" value="Feliz" />
            </div>
          </div>
        </div>

        {/* Diary Entries List */}
        <div className="md:col-span-5 space-y-6">
          {MOCK_DIARY_ENTRIES.map((entry) => (
            <div key={entry.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${entry.color === 'red' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#7b8bda]'}`}>
                      <entry.icon className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{entry.title}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                          <Clock className="size-3.5" />
                          {entry.time}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                          <MapPin className="size-3.5" />
                          {entry.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/child/${id}/diary/${entry.id}/edit`}
                    className="p-2 text-gray-400 hover:text-[#7b8bda] hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <Edit2 className="size-5" />
                  </Link>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 bg-gray-50 p-4 rounded-2xl">
                  {entry.content}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailBox icon={Smile} label="Humor" value={entry.mood} color="green" />
                  <DetailBox icon={BookOpen} label="O que aprendeu" value={entry.learning} color="blue" />
                  <DetailBox icon={AlertCircle} label="Houve crise?" value={entry.crisis} color="red" />
                  <DetailBox icon={Edit2} label="Resolução" value={entry.resolution} color="orange" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}

function DetailBox({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  const colorClasses = {
    green: "bg-green-50 text-green-700 border-green-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    red: "bg-red-50 text-red-700 border-red-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
  };

  return (
    <div className={`p-4 rounded-2xl border ${colorClasses[color as keyof typeof colorClasses]} space-y-1`}>
      <div className="flex items-center gap-2">
        <Icon className="size-4 opacity-70" />
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">{label}</span>
      </div>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
