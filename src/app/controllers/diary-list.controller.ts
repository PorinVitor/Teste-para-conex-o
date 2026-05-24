import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { dependentsService } from "../services/dependents.service";
import { diaryService, type DiaryRecord, type DiaryRecordType } from "../services/diary.service";
import { formatDateToDdMmYyyy } from "../utils/date";

export function useDiaryListController() {
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
        // non-blocking
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
        toast.error(error instanceof Error ? error.message : "Não foi possível carregar o diário.");
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
      toast.error(error instanceof Error ? error.message : "Não foi possível excluir o registro.");
    }
  }

  return {
    id,
    navigate,
    records,
    loading,
    typeFilter,
    setTypeFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    currentStudent,
    handleDelete,
  };
}
