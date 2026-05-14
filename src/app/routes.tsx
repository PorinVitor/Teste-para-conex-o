import { createBrowserRouter } from "react-router";
import { DashboardView } from "./views/DashboardView";
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";
import { ChildProfileView } from "./views/ChildProfileView";
import { DiaryListView } from "./views/DiaryListView";
import { DiaryFormView } from "./views/DiaryFormView";
import { LinkChildView } from "./views/LinkChildView";
import { TeacherRegistrationView } from "./views/TeacherRegistrationView";
import { ProfessionalsListView } from "./views/ProfessionalsListView";
import { ProfessionalProfileView } from "./views/ProfessionalProfileView";
import { StudentsListView } from "./views/StudentsListView";
import { AllDiariesView } from "./views/AllDiariesView";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginView,
  },
  {
    path: "/register",
    Component: RegisterView,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: DashboardView,
      },
      {
        path: "link-child",
        Component: LinkChildView,
      },
      {
        path: "child/:id",
        Component: ChildProfileView,
      },
      {
        path: "child/:id/diary",
        Component: DiaryListView,
      },
      {
        path: "child/:id/diary/new",
        Component: DiaryFormView,
      },
      {
        path: "child/:id/diary/:diaryId/edit",
        Component: DiaryFormView,
      },
      {
        path: "school/professionals",
        Component: ProfessionalsListView,
      },
      {
        path: "school/professionals/:id",
        Component: ProfessionalProfileView,
      },
      {
        path: "school/students",
        Component: StudentsListView,
      },
      {
        path: "school/register-teacher",
        Component: TeacherRegistrationView,
      },
      {
        path: "diaries",
        Component: AllDiariesView,
      },
    ],
  },
]);
