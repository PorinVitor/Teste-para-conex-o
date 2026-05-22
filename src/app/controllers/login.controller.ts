import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

export function useLoginController() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Login realizado com sucesso!");
      navigate("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha no login";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    showPassword,
    setShowPassword,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    submit,
  };
}
