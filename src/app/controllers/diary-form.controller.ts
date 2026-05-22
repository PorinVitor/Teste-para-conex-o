import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { diaryService, type DiaryAttachment, type DiaryRecordType } from "../services/diary.service";

export function useDiaryFormController() {
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

  function validateAttachment(file: File) {
    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    const maxSizeMb = 10;
    if (!allowed.includes(file.type)) return "Formato inválido. Use JPG, PNG, WEBP ou PDF.";
    if (file.size > maxSizeMb * 1024 * 1024) return "Arquivo muito grande. Máximo de 10MB.";
    return null;
  }

  async function submit(e: React.FormEvent) {
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
  }

  return { id, isEdit, loading, uploadingAttachment, attachment, setAttachment, existingAttachments, formData, setFormData, validateAttachment, submit, navigate };
}
