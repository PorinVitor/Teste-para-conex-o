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
      toast.error("Sua sessão é inválida. Entre novamente.");
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
      toast.error(error instanceof Error ? error.message : "Não foi possível sincronizar os dados.");
      return null;
    } finally {
      setSyncing(false);
    }
  }

  return { syncing, lastSyncAt, syncWithMobile };
}
