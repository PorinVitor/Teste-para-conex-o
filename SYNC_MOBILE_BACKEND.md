# Sincronização Web ↔ Mobile (MVC-like)

Este documento descreve um fluxo simples para sincronizar dados que vêm do backend/mobile sem alterar o layout do Figma.

## Arquitetura
- **Model/Service**: `src/app/services/sync.service.ts`
- **Controller**: `src/app/controllers/sync.controller.ts`
- **View**: pode chamar `useSyncController()` em qualquer tela administrativa (ex.: dashboard) sem mudar componentes principais.

## Endpoint sugerido
`POST /sync/mobile/pull`

Request:
```json
{
  "checkpoint": {
    "lastSyncAt": "2026-05-22T17:00:00.000Z"
  }
}
```

Response:
```json
{
  "serverTime": "2026-05-22T17:10:00.000Z",
  "checkpoint": {
    "lastSyncAt": "2026-05-22T17:10:00.000Z"
  },
  "dependents": [],
  "diaryRecords": []
}
```

## Como aplicar no fluxo atual
1. Usuário autenticado entra no módulo escolar.
2. Controller chama `syncService.pullFromMobile()` com o checkpoint salvo.
3. Backend retorna apenas deltas (novos/alterados).
4. Você aplica esses dados no estado das telas/queries.
5. Atualiza `lastSyncAt` para próxima sincronização incremental.

## Benefícios
- Fácil de entender (padrão MVC-like).
- Sem mexer no visual do Figma.
- Menor custo de sincronização com checkpoint incremental.
