import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { isLocalMockEnabled } from "../services/local-db.service";

export function useRegisterController() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    schoolName: "",
    password: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        name: formData.name || "Escola Demonstração",
        email: formData.email || "escola@demo.com",
        role: formData.role || "teacher",
        schoolName: formData.schoolName || "Escola Demonstração",
        password: formData.password || "demo",
      });
      toast.success(isLocalMockEnabled() ? "Cadastro simbólico liberado!" : "Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível criar a conta. Tente de novo.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, formData, setFormData, submit };
}
