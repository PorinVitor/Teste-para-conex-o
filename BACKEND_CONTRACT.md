# Contrato Backend - Web Escolar (Passo 5)

Data de referência: **22 de maio de 2026**.

## 1) Login Escola
`POST /auth/login`

Request:
```json
{
  "email": "escola@dominio.com",
  "password": "senha"
}
```

Response (aceitos pelo front):
```json
{
  "token": "jwt",
  "user": {
    "id": "id",
    "name": "Nome",
    "email": "escola@dominio.com",
    "role": "teacher",
    "schoolName": "Escola"
  }
}
```

Também é aceito:
- `accessToken` no lugar de `token`
- `schoolUser` no lugar de `user`

## 2) Vincular dependente
`POST /school/dependents/link`

Request:
```json
{
  "code": "ABC123"
}
```

## 3) Listar dependentes
`GET /school/dependents`

Response aceita:
- `{ "dependents": [...] }` **ou**
- `[...]`

Cada dependente pode usar camelCase ou snake_case nos campos abaixo:
- `guardianName` / `guardian_name`
- `guardianPhone` / `guardian_phone`
- `teacherName` / `teacher_name`
- `avatarUrl` / `avatar_url`
- `hasRecentCrisis` / `has_recent_crisis`

## 4) Diário escolar CRUD
- `GET /school/dependents/:id/records`
- `GET /school/dependents/:id/records/:recordId`
- `POST /school/dependents/:id/records`
- `PUT /school/dependents/:id/records/:recordId`
- `DELETE /school/dependents/:id/records/:recordId`

Filtros suportados na listagem:
- `startDate` (formato enviado pelo front: `DD-MM-YYYY`, ex: `22-05-2026`)
- `endDate` (formato enviado pelo front: `DD-MM-YYYY`, ex: `31-05-2026`)
- `type` (`school | meal | activity | alert`)

## 5) Upload de anexo
`POST /school/dependents/:id/records/:recordId/attachments`

Request: `multipart/form-data` com campo `file`.

Response esperada:
```json
{
  "attachment": {
    "id": "att_1",
    "fileName": "arquivo.pdf",
    "contentType": "application/pdf",
    "size": 10240,
    "url": "https://...",
    "uploadedAt": "2026-05-22T12:00:00.000Z"
  }
}
```
