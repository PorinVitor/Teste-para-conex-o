import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import type { Dependent } from "../services/dependents.service";
import { dependentsService } from "../services/dependents.service";

export function useStudentsListController() {
  const [children, setChildren] = useState<Dependent[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDependents() {
      if (!token) {
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const response = await dependentsService.list(token);
        setChildren(response.dependents);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Falha ao carregar alunos";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }

    loadDependents();
  }, [token, navigate]);

  const filteredChildren = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return children;

    return children.filter((child) => {
      const searchable = `${child.name} ${child.guardianName}`.toLowerCase();
      return searchable.includes(term);
    });
  }, [children, search]);

  return { loading, search, setSearch, filteredChildren };
}
