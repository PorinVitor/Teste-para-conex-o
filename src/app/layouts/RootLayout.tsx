import { Outlet, Link, useNavigate, useLocation } from "react-router";
import {
  UserPlus,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Users,
  GraduationCap
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import appLogo from "../../imports/image.png";
import { useAuth } from "../contexts/AuthContext";

export function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Painel", path: "/" },
    { icon: GraduationCap, label: "Alunos", path: "/school/students" },
    { icon: BookOpen, label: "Diário Escolar", path: "/diaries" },
    { icon: UserPlus, label: "Vincular novo aluno", path: "/link-child" },
    { icon: Users, label: "Profissionais", path: "/school/professionals" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden md:flex flex-col bg-[#E6E4FE] border-r border-gray-200 relative transition-all duration-300 ease-in-out"
      >
        <div className={`p-6 flex items-center h-[88px] ${isSidebarOpen ? "gap-3 px-6" : "justify-center px-0"}`}>
          <div className="shrink-0">
            <img src={appLogo} alt="Conexão Autista" className="size-12 rounded-lg" />
          </div>
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-xl text-gray-900 truncate whitespace-nowrap overflow-hidden"
              >
                Conexão Autista
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50 text-gray-400 hover:text-[#7b8bda] transition-colors shadow-sm z-10"
        >
          {isSidebarOpen ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        </button>

        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center ${isSidebarOpen ? "gap-3 px-4" : "justify-center px-0"} py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? "bg-[#7b8bda] text-white shadow-md shadow-[#7b8bda]/20" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className={`size-5 shrink-0 ${isActive ? "text-white" : "group-hover:text-[#7b8bda]"}`} />
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`flex items-center ${isSidebarOpen ? "gap-3 px-4" : "justify-center px-0"} py-3 w-full text-left text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group relative`}
          >
            <LogOut className="size-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Sair</span>}
            {!isSidebarOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Sair
              </div>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src={appLogo} alt="Conexão Autista" className="size-9 rounded-lg" />
            <span className="font-bold text-lg text-gray-900">Conexão Autista</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
            />
          )}
        </AnimatePresence>

        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: isSidebarOpen ? 0 : "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="md:hidden fixed inset-y-0 left-0 w-64 bg-[#E6E4FE] z-50 flex flex-col"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <span className="font-bold text-xl">Menu</span>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X className="size-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? "bg-[#7b8bda] text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="size-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="size-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </motion.aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
