import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { dependentsService } from "../services/dependents.service";

export function useLinkChildController() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!token) {
      toast.error("Sessão inválida. Faça login novamente.");
      navigate("/login");
      return;
    }

    if (code.length < 6) {
      toast.error("Por favor, insira um código válido.");
      return;
    }

    setLoading(true);
    try {
      await dependentsService.link({ code }, token);
      toast.success("Aluno vinculado com sucesso!");
      navigate("/school/students");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao vincular aluno";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return { code, setCode, loading, submit, navigate };
}
