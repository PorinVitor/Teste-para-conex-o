import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { syncService } from "../services/sync.service";

export function useSyncController() {
  const { token } = useAuth();
  const [syncing, setSyncing] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(null);

  async function syncWithMobile() {
    if (!token) {
      toast.error("Sessão inválida. Faça login novamente.");
      return null;
    }

    setSyncing(true);
    try {
      const response = await syncService.pullFromMobile(token, {
        checkpoint: lastSyncAt ? { lastSyncAt } : undefined,
      });

      setLastSyncAt(response.checkpoint.lastSyncAt ?? response.serverTime);
      toast.success("Sincronização concluída com sucesso.");
      return response;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha ao sincronizar dados do mobile");
      return null;
    } finally {
      setSyncing(false);
    }
  }

  return { syncing, lastSyncAt, syncWithMobile };
}
