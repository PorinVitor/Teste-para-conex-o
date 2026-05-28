import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { dependentsService } from "../services/dependents.service";
import { isLocalMockEnabled } from "../services/local-db.service";

export function useLinkChildController() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!token) {
      toast.error("Sua sessão é inválida. Entre novamente.");
      navigate("/login");
      return;
    }

    if (!isLocalMockEnabled() && code.length < 6) {
      toast.error("Digite um código válido.");
      return;
    }

    setLoading(true);
    try {
      await dependentsService.link({ code: code || "DEMO123" }, token);
      toast.success(isLocalMockEnabled() ? "Aluno simbólico vinculado!" : "Aluno vinculado com sucesso!");
      navigate("/school/students");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível vincular o aluno.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return { code, setCode, loading, submit, navigate };
}
