import { Link } from "react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Edit2,
  AlertCircle,
  Smile,
  BookOpen,
  School,
  Filter,
  Search,
  ChevronRight,
  AlertTriangle,
  ChevronLeft as ChevronLeftIcon
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MOCK_STUDENTS = [
  {
    id: "1",
    name: "Julia da Silva",
    avatar: "https://images.unsplash.com/photo-1606386666595-d135abc1e3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvcnRyYWl0JTIwYXV0aXN0aWMlMjBzdHVkZW50fGVufDF8fHx8MTc3ODczOTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasRecentCrisis: true
  },
  {
    id: "2",
    name: "Lucas Oliveira",
    avatar: "https://images.unsplash.com/photo-1774482367573-6a32b664d1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwc2Nob29sJTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODczOTM1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasRecentCrisis: false
  },
  {
    id: "3",
    name: "Beatriz Santos",
    avatar: "https://images.unsplash.com/photo-1610533289180-9d90161eba40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBzY2hvb2wlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Nzg3MzkzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasRecentCrisis: false
  },
];

const ALL_DIARY_ENTRIES = [
  {
    id: "1",
    studentId: "1",
    studentName: "Julia da Silva",
    studentAvatar: "https://images.unsplash.com/photo-1606386666595-d135abc1e3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvcnRyYWl0JTIwYXV0aXN0aWMlMjBzdHVkZW50fGVufDF8fHx8MTc3ODczOTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Atividades em Sala",
    content: "Hoje a Julia participou ativamente da aula de artes. Ela demonstrou muito interesse nos gatinhos de papel que fizemos.",
    date: "14/05/2026",
    time: "10:00",
    location: "Sala de Aula",
    icon: School,
    color: "blue",
    mood: "Feliz",
    hasCrisis: false,
  },
  {
    id: "2",
    studentId: "1",
    studentName: "Julia da Silva",
    studentAvatar: "https://images.unsplash.com/photo-1606386666595-d135abc1e3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvcnRyYWl0JTIwYXV0aXN0aWMlMjBzdHVkZW50fGVufDF8fHx8MTc3ODczOTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Momento de Alerta - Crise Sensorial",
    content: "Julia ficou incomodada com a mudança repentina na rotina (troca de professor). Ela apresentou flapping e evitou contato visual por cerca de 20 minutos.",
    date: "13/05/2026",
    time: "14:30",
    location: "Pátio",
    icon: AlertCircle,
    color: "red",
    mood: "Ansiosa",
    hasCrisis: true,
  },
  {
    id: "3",
    studentId: "2",
    studentName: "Lucas Oliveira",
    studentAvatar: "https://images.unsplash.com/photo-1774482367573-6a32b664d1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwc2Nob29sJTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODczOTM1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Aula de Matemática",
    content: "Lucas demonstrou grande interesse na aula de matemática hoje. Resolveu todos os exercícios com atenção.",
    date: "14/05/2026",
    time: "09:30",
    location: "Sala de Aula",
    icon: School,
    color: "blue",
    mood: "Feliz",
    hasCrisis: false,
  },
  {
    id: "4",
    studentId: "3",
    studentName: "Beatriz Santos",
    studentAvatar: "https://images.unsplash.com/photo-1610533289180-9d90161eba40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHN0dWRlbnQlMjBzY2hvb2wlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Nzg3MzkzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Recreio",
    content: "Beatriz brincou com os colegas durante o recreio. Demonstrou boa socialização.",
    date: "14/05/2026",
    time: "11:00",
    location: "Pátio",
    icon: School,
    color: "blue",
    mood: "Feliz",
    hasCrisis: false,
  }
];

export function AllDiariesView() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 14)); // May 14, 2026
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1)); // May 2026

  const selectedDateStr = `${String(selectedDate.getDate()).padStart(2, '0')}/${String(selectedDate.getMonth() + 1).padStart(2, '0')}/${selectedDate.getFullYear()}`;
  const filteredEntries = ALL_DIARY_ENTRIES.filter(entry => entry.date === selectedDateStr);
  const crisisEntries = ALL_DIARY_ENTRIES.filter(entry => entry.hasCrisis);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const selectDate = (day: number) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-[#DBEAFE] -mx-4 md:-mx-8 px-4 md:px-8 py-6 mb-8 rounded-2xl">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <Link to="/" className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-gray-100">
            <ArrowLeft className="size-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Diários Escolares</h1>
            <p className="text-sm text-gray-600">Visualização geral de todas as anotações e registros.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeftIcon className="size-5 text-gray-600" />
              </button>
              <h3 className="font-bold text-gray-900">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="size-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 mb-2">
              <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const isSelected = selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentMonth.getMonth() &&
                  selectedDate.getFullYear() === currentMonth.getFullYear();
                const dateStr = `${String(day).padStart(2, '0')}/${String(currentMonth.getMonth() + 1).padStart(2, '0')}/${currentMonth.getFullYear()}`;
                const hasEntries = ALL_DIARY_ENTRIES.some(entry => entry.date === dateStr);
                const hasCrisis = ALL_DIARY_ENTRIES.some(entry => entry.date === dateStr && entry.hasCrisis);

                return (
                  <button
                    key={day}
                    onClick={() => selectDate(day)}
                    className={`size-9 rounded-full flex items-center justify-center text-sm transition-all relative ${
                      isSelected
                        ? "bg-[#7b8bda] text-white font-bold shadow-md"
                        : hasEntries
                        ? "bg-blue-50 text-[#7b8bda] font-medium hover:bg-blue-100"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {day}
                    {hasCrisis && (
                      <div className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full border border-white" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="size-3 rounded-full bg-[#7b8bda]" />
                <span>Data selecionada</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="size-3 rounded-full bg-blue-50 border border-blue-200" />
                <span>Com anotações</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="size-3 rounded-full bg-red-500" />
                <span>Com crise</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-red-50 p-6 rounded-3xl border border-red-100">
            <h4 className="font-bold text-red-800 mb-2 text-sm uppercase flex items-center gap-2">
              <AlertTriangle className="size-4" />
              Alertas de Crise
            </h4>
            <p className="text-2xl font-bold text-red-500">{crisisEntries.length}</p>
          </div>
        </div>

        {/* Entries List */}
        <div className="lg:col-span-3 space-y-6">

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <input
                type="text"
                placeholder="Buscar por aluno, título ou conteúdo..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#7b8bda] outline-none transition-all"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <select className="bg-gray-50 border border-transparent rounded-xl px-4 py-2 outline-none focus:bg-white focus:border-[#7b8bda] flex-1 md:flex-none">
                <option>Todos os Alunos</option>
                {MOCK_STUDENTS.map((student) => (
                  <option key={student.id}>{student.name}</option>
                ))}
              </select>
              
            </div>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
              <Calendar className="size-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma anotação nesta data</h3>
              <p className="text-gray-500">Selecione outra data no calendário para ver as anotações.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-[#7b8bda]" />
                <h2 className="text-lg font-bold text-gray-900">
                  Anotações de {selectedDateStr} ({filteredEntries.length})
                </h2>
              </div>
              {filteredEntries.map((entry) => (
          <div key={entry.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <Link to={`/child/${entry.studentId}`} className="shrink-0">
                    <div className="size-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <ImageWithFallback
                        src={entry.studentAvatar}
                        alt={entry.studentName}
                        className="size-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link
                        to={`/child/${entry.studentId}`}
                        className="font-bold hover:underline text-[20px] text-[#000000]"
                      >
                        {entry.studentName}
                      </Link>
                      {entry.hasCrisis && (
                        <AlertTriangle className="size-4 text-red-500" title="Alerta de crise" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className={`flex items-center gap-2 ${entry.color === 'red' ? 'text-red-500' : 'text-[#7b8bda]'}`}>
                        <entry.icon className="size-5" />
                        <h3 className="text-lg font-bold text-gray-900">{entry.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <Calendar className="size-3.5" />
                        {entry.date}
                      </span>
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
                  to={`/child/${entry.studentId}/diary/${entry.id}/edit`}
                  className="p-2 text-gray-400 hover:text-[#7b8bda] hover:bg-blue-50 rounded-xl transition-all"
                >
                  <Edit2 className="size-5" />
                </Link>
              </div>

              <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl mb-4">
                {entry.content}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Smile className="size-4 text-green-600" />
                  <span className="font-medium text-gray-600">Humor: <span className="text-gray-900 font-bold">{entry.mood}</span></span>
                </div>
                <Link
                  to={`/child/${entry.studentId}/diary`}
                  className="ml-auto flex items-center gap-2 text-sm text-[#7b8bda] hover:underline font-medium"
                >
                  Ver diário completo
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
