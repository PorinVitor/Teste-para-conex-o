import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Save, Clock, MapPin, Type, Smile, Frown, Meh, AlertTriangle, Camera, School, Coffee, Heart, Target, Zap, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { diaryService, type DiaryRecordType, type DiaryAttachment } from "../services/diary.service";

export function DiaryFormView() {
  const { id, diaryId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!diaryId;
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [existingAttachments, setExistingAttachments] = useState<DiaryAttachment[]>([]);

  const [formData, setFormData] = useState({
    title: "", time: "", location: "Sala de Aula", content: "", mood: "Feliz", learning: "", hasCrisis: false, crisisDetails: "", resolution: "", icon: "Escola"
  });

  useEffect(() => {
    async function loadRecord() {
      if (!isEdit || !id || !diaryId || !token) return;
      setLoading(true);
      try {
        const response = await diaryService.getById(id, diaryId, token);
        const record = response.record;
        setExistingAttachments(record.attachments ?? []);
        setFormData({
          title: record.title,
          time: record.time,
          location: record.location,
          content: record.content,
          mood: record.mood,
          learning: record.learning ?? "",
          hasCrisis: record.hasCrisis,
          crisisDetails: record.crisisDetails ?? "",
          resolution: record.resolution ?? "",
          icon: record.type === "meal" ? "Refeição" : record.type === "activity" ? "Atividade" : record.type === "alert" ? "Alerta" : "Escola",
        });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erro ao carregar anotação");
      } finally { setLoading(false); }
    }
    loadRecord();
  }, [isEdit, id, diaryId, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !token) return;

    const typeMap: Record<string, DiaryRecordType> = { Escola: "school", Refeição: "meal", Atividade: "activity", Alerta: "alert" };
    const payload = { ...formData, type: typeMap[formData.icon] ?? "school" };

    setLoading(true);
    try {
      let savedRecordId = diaryId;
      if (isEdit && diaryId) {
        const updated = await diaryService.update(id, diaryId, payload, token);
        savedRecordId = updated.record.id;
        toast.success("Anotação atualizada!");
      } else {
        const created = await diaryService.create(id, payload, token);
        savedRecordId = created.record.id;
        toast.success("Anotação salva com sucesso!");
      }

      if (attachment && savedRecordId) {
        setUploadingAttachment(true);
        const uploaded = await diaryService.uploadAttachment(id, savedRecordId, attachment, token);
        setExistingAttachments((prev) => [...prev, uploaded.attachment]);
        toast.success("Anexo enviado com sucesso!");
      }

      navigate(`/child/${id}/diary`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao salvar anotação");
    } finally {
      setLoading(false);
      setUploadingAttachment(false);
    }
  };
  function validateAttachment(file: File) {
    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    const maxSizeMb = 10;
    if (!allowed.includes(file.type)) return "Formato inválido. Use JPG, PNG, WEBP ou PDF.";
    if (file.size > maxSizeMb * 1024 * 1024) return "Arquivo muito grande. Máximo de 10MB.";
    return null;
  }

  const moods = [
    { label: "Feliz", icon: Smile, color: "bg-green-100 text-green-600 border-green-200" }, { label: "Calmo", icon: Meh, color: "bg-blue-100 text-blue-600 border-blue-200" }, { label: "Ansioso", icon: Frown, color: "bg-orange-100 text-orange-600 border-orange-200" }, { label: "Irritado", icon: AlertTriangle, color: "bg-red-100 text-red-600 border-red-200" },
  ];
  const categories = [{ label: "Escola", icon: School }, { label: "Refeição", icon: Coffee }, { label: "Atividade", icon: Target }, { label: "Alerta", icon: Zap }];

  return <div className="max-w-4xl mx-auto py-8 px-4"><div className="flex items-center justify-between mb-8"><div className="flex items-center gap-4"><Link to={`/child/${id}/diary`} className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-gray-100"><ArrowLeft className="size-6 text-gray-600" /></Link><h1 className="text-3xl font-bold text-gray-900">{isEdit ? "Editar Anotação" : "Nova Anotação no Diário"}</h1></div></div><form onSubmit={handleSubmit} className="space-y-8"><div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
<div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="space-y-2"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Type className="size-4 text-[#7b8bda]" />Título</label><input type="text" value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl" required/></div><div className="space-y-2"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock className="size-4 text-[#7b8bda]" />Horário</label><input type="time" value={formData.time} onChange={(e)=>setFormData({...formData,time:e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl" required/></div><div className="space-y-2"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><MapPin className="size-4 text-[#7b8bda]" />Local</label><input type="text" value={formData.location} onChange={(e)=>setFormData({...formData,location:e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl" required/></div></div>
<div className="space-y-3"><label className="text-sm font-bold text-gray-700">Ícone</label><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{categories.map((cat)=><button key={cat.label} type="button" onClick={()=>setFormData({...formData,icon:cat.label})} className={`flex items-center gap-3 p-4 rounded-2xl border-2 ${formData.icon===cat.label?"bg-[#7b8bda] text-white border-[#7b8bda]":"bg-gray-50"}`}><cat.icon className="size-5" /><span className="font-bold">{cat.label}</span></button>)}</div></div>
<div className="space-y-2"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><BookOpen className="size-4 text-[#7b8bda]" />Anotações</label><textarea value={formData.content} onChange={(e)=>setFormData({...formData,content:e.target.value})} rows={5} className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl" required/></div>
<div className="space-y-3"><label className="text-sm font-bold text-gray-700">Como o aluno estava se sentindo?</label><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{moods.map((mood)=><button key={mood.label} type="button" onClick={()=>setFormData({...formData,mood:mood.label})} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 ${formData.mood===mood.label?mood.color:"bg-gray-50"}`}><mood.icon className="size-8" /><span className="font-bold text-sm">{mood.label}</span></button>)}</div></div></div>
<div className="bg-red-50 rounded-3xl border border-red-100 p-8 space-y-6"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><AlertTriangle className="size-6 text-red-500" /><h3 className="text-xl font-bold text-red-900">Houve alguma crise?</h3></div><input type="checkbox" checked={formData.hasCrisis} onChange={(e)=>setFormData({...formData,hasCrisis:e.target.checked})}/></div>{formData.hasCrisis && <><textarea value={formData.crisisDetails} onChange={(e)=>setFormData({...formData,crisisDetails:e.target.value})} rows={3} className="w-full px-4 py-3 bg-white border-2 border-red-100 rounded-2xl"/><textarea value={formData.resolution} onChange={(e)=>setFormData({...formData,resolution:e.target.value})} rows={3} className="w-full px-4 py-3 bg-white border-2 border-red-100 rounded-2xl"/></>}</div>
<div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-4"><label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Heart className="size-4 text-[#7b8bda]" />O que o aluno aprendeu hoje?</label><textarea value={formData.learning} onChange={(e)=>setFormData({...formData,learning:e.target.value})} rows={3} className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl"/></div>
<label className="bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 p-8 text-center cursor-pointer block"><Camera className="size-8 text-gray-400 mx-auto" /><p className="font-bold text-gray-600">Anexar foto/documento</p><p className="text-sm text-gray-400">{attachment ? attachment.name : "Clique para selecionar um arquivo"}</p><input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => { const file = e.target.files?.[0] ?? null; if (!file) return setAttachment(null); const err = validateAttachment(file); if (err) { toast.error(err); e.currentTarget.value = ""; return; } setAttachment(file); }} /></label>{existingAttachments.length > 0 && <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2"><p className="text-sm font-bold text-gray-700">Anexos do registro</p>{existingAttachments.map((a)=><a key={a.id} href={a.url} target="_blank" rel="noreferrer" className="block text-sm text-[#2963EB] hover:underline">{a.fileName} ({Math.round(a.size/1024)} KB)</a>)}</div>}
<div className="flex gap-4 pt-4"><button disabled={loading} type="submit" className="flex-1 flex items-center justify-center gap-2 bg-[#7b8bda] text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-60"><Save className="size-6" />{loading ? (uploadingAttachment ? "Enviando anexo..." : "Salvando...") : isEdit?"Salvar Alterações":"Salvar no Diário"}</button><button type="button" onClick={()=>navigate(`/child/${id}/diary`)} className="px-8 py-4 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold">Cancelar</button></div></form></div>;
}
