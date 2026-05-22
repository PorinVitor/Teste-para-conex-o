import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Plus, ArrowLeft, Calendar, Clock, MapPin, Edit2, AlertCircle, Smile, BookOpen, User, Trash2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";
import { dependentsService } from "../services/dependents.service";
import { diaryService, type DiaryRecord, type DiaryRecordType } from "../services/diary.service";
import { toast } from "sonner";
import { formatDateToDdMmYyyy } from "../utils/date";

function formatDate(dateIso: string) {
  const d = new Date(dateIso);
  return d.toLocaleDateString("pt-BR");
}


function mapTypeLabel(type: DiaryRecordType) {
  if (type === "meal") return "Refeição";
  if (type === "activity") return "Atividade";
  if (type === "alert") return "Alerta";
  return "Escola";
}

export function DiaryListView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [records, setRecords] = useState<DiaryRecord[]>([]);
  const [students, setStudents] = useState<Array<{ id: string; name: string; avatarUrl?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const currentStudent = useMemo(() => students.find((s) => s.id === id), [students, id]);

  useEffect(() => {
    async function loadStudents() {
      if (!token) return;
      try {
        const response = await dependentsService.list(token);
        setStudents(response.dependents.map((d) => ({ id: d.id, name: d.name, avatarUrl: d.avatarUrl })));
      } catch {
        // non-blocking for diary screen
      }
    }
    loadStudents();
  }, [token]);

  useEffect(() => {
    async function loadRecords() {
      if (!id || !token) return;
      setLoading(true);
      try {
        const response = await diaryService.listByDependent(id, token, {
          type: (typeFilter || undefined) as DiaryRecordType | undefined,
          startDate: formatDateToDdMmYyyy(startDate),
          endDate: formatDateToDdMmYyyy(endDate),
        });
        setRecords(response.records);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erro ao carregar diário");
      } finally {
        setLoading(false);
      }
    }
    loadRecords();
  }, [id, token, typeFilter, startDate, endDate]);

  async function handleDelete(recordId: string) {
    if (!id || !token) return;
    const confirmed = window.confirm("Tem certeza que deseja excluir este registro?");
    if (!confirmed) return;

    try {
      await diaryService.remove(id, recordId, token);
      setRecords((prev) => prev.filter((r) => r.id !== recordId));
      toast.success("Registro excluído com sucesso.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir registro");
    }
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="bg-[#DBEAFE] -mx-4 md:-mx-8 px-4 md:px-8 py-6 mb-8 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-gray-100">
              <ArrowLeft className="size-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Diário Escolar - <span className="text-[#2963EB]">{currentStudent?.name ?? "Aluno"}</span></h1>
              <p className="text-sm text-gray-600">Acompanhamento diário das atividades e comportamento.</p>
            </div>
          </div>
          <Link to={`/child/${id}/diary/new`} className="inline-flex items-center justify-center gap-2 bg-[#2963EB] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1d4ed8] transition-all shadow-md active:scale-95">
            <Plus className="size-5" /> Nova Anotação
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div><label className="text-xs font-bold text-gray-500">Tipo</label><select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full mt-1 bg-gray-50 rounded-xl px-3 py-2"><option value="">Todos</option><option value="school">Escola</option><option value="meal">Refeição</option><option value="activity">Atividade</option><option value="alert">Alerta</option></select></div>
        <div><label className="text-xs font-bold text-gray-500">Data inicial</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full mt-1 bg-gray-50 rounded-xl px-3 py-2" /></div>
        <div><label className="text-xs font-bold text-gray-500">Data final</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full mt-1 bg-gray-50 rounded-xl px-3 py-2" /></div>
        <button type="button" onClick={() => { setTypeFilter(""); setStartDate(""); setEndDate(""); }} className="bg-gray-100 rounded-xl px-3 py-2 font-semibold">Limpar filtros</button>
      </div>

      <div className="space-y-6">
        {loading && <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-gray-500">Carregando anotações...</div>}
        {!loading && records.length === 0 && <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-gray-500">Nenhuma anotação encontrada para os filtros selecionados.</div>}
        {!loading && records.map((entry) => (
          <div key={entry.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${entry.hasCrisis ? "bg-red-50 text-red-500" : "bg-blue-50 text-[#7b8bda]"}`}> <AlertCircle className="size-6" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{entry.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500"><Calendar className="size-3.5" />{formatDate(entry.createdAt)}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500"><Clock className="size-3.5" />{entry.time}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500"><MapPin className="size-3.5" />{entry.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/child/${id}/diary/${entry.id}/edit`} className="p-2 text-gray-400 hover:text-[#7b8bda] hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="size-5" /></Link>
                  <button onClick={() => handleDelete(entry.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="size-5" /></button>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 bg-gray-50 p-4 rounded-2xl">{entry.content}</p>{entry.attachments && entry.attachments.length > 0 && <div className="mb-4 bg-blue-50 p-3 rounded-xl"><p className="text-xs font-bold text-blue-800 mb-1">Anexos</p>{entry.attachments.map((a) => (<a key={a.id} href={a.url} target="_blank" rel="noreferrer" className="block text-sm text-[#2963EB] hover:underline">{a.fileName} ({Math.round(a.size / 1024)} KB)</a>))}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <DetailBox icon={Smile} label="Humor" value={entry.mood} color="green" />
                <DetailBox icon={BookOpen} label="Tipo" value={mapTypeLabel(entry.type)} color="blue" />
                <DetailBox icon={User} label="Crise" value={entry.hasCrisis ? "Sim" : "Não"} color={entry.hasCrisis ? "red" : "blue"} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailBox({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
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
