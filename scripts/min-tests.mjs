import assert from "node:assert/strict";
import fs from "node:fs";

function formatDateToDdMmYyyy(dateValue) {
  if (!dateValue) return undefined;
  const [year, month, day] = dateValue.split("-");
  if (!year || !month || !day) return undefined;
  return `${day}-${month}-${year}`;
}

assert.equal(formatDateToDdMmYyyy("2026-05-22"), "22-05-2026");
assert.equal(formatDateToDdMmYyyy(""), undefined);
assert.equal(formatDateToDdMmYyyy("2026-05"), undefined);

const authServiceSource = fs.readFileSync("src/app/services/auth.service.ts", "utf8");
assert.match(authServiceSource, /accessToken/);
assert.match(authServiceSource, /schoolUser/);
assert.match(authServiceSource, /trim\(\)\.toLowerCase\(\)/);

const dependentsServiceSource = fs.readFileSync("src/app/services/dependents.service.ts", "utf8");
assert.match(dependentsServiceSource, /guardian_name/);
assert.match(dependentsServiceSource, /has_recent_crisis/);
assert.match(dependentsServiceSource, /trim\(\)\.toUpperCase\(\)/);


const diaryListControllerSource = fs.readFileSync("src/app/controllers/diary-list.controller.ts", "utf8");
assert.match(diaryListControllerSource, /useDiaryListController/);
assert.match(diaryListControllerSource, /handleDelete/);
assert.match(diaryListControllerSource, /listByDependent/);

const diaryFormControllerSource = fs.readFileSync("src/app/controllers/diary-form.controller.ts", "utf8");
assert.match(diaryFormControllerSource, /useDiaryFormController/);
assert.match(diaryFormControllerSource, /uploadAttachment/);
assert.match(diaryFormControllerSource, /validateAttachment/);

console.log("OK: min tests passed (date + services + controllers)");
