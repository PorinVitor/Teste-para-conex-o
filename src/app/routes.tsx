import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { RootLayout } from "./layouts/RootLayout";
import { AllDiariesView } from "./views/AllDiariesView";
import { ChildProfileView } from "./views/ChildProfileView";
import { DashboardView } from "./views/DashboardView";
import { DiaryFormView } from "./views/DiaryFormView";
import { DiaryListView } from "./views/DiaryListView";
import { LinkChildView } from "./views/LinkChildView";
import { LoginView } from "./views/LoginView";
import { ProfessionalProfileView } from "./views/ProfessionalProfileView";
import { ProfessionalsListView } from "./views/ProfessionalsListView";
import { RegisterView } from "./views/RegisterView";
import { StudentsListView } from "./views/StudentsListView";
import { TeacherRegistrationView } from "./views/TeacherRegistrationView";

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
    Component: ProtectedRoute,
    children: [
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
    ],
  },
]);
