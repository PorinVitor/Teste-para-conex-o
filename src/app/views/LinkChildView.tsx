import { useState } from "react";
import { useNavigate } from "react-router";
import { QrCode, ArrowRight, ShieldCheck, Info } from "lucide-react";
import { toast } from "sonner";

export function LinkChildView() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) {
      toast.error("Por favor, insira um código válido.");
      return;
    }
    toast.success("Aluno vinculado com sucesso!");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-[#7b8bda] p-8 text-white text-center">
          <div className="bg-white/20 p-4 rounded-2xl inline-block mb-4">
            <QrCode className="size-12" />
          </div>
          <h1 className="text-3xl font-bold">Vincular Novo Aluno</h1>
          <p className="mt-2 text-blue-100">
            Peça aos pais ou responsáveis o código de compartilhamento gerado no app deles.
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLink} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Código de Vinculação
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="EX: TEA123"
                className="w-full text-center text-3xl font-mono tracking-widest py-6 border-2 border-dashed border-gray-300 rounded-2xl focus:border-[#7b8bda] focus:ring-4 focus:ring-blue-50 outline-none transition-all uppercase"
                maxLength={6}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
              <Info className="size-6 text-[#7b8bda] shrink-0" />
              <p className="text-sm text-blue-800 leading-relaxed">
                Ao vincular um aluno via código, a escola terá acesso ao perfil, 
                histórico de crises e poderá registrar novas entradas no diário escolar. 
                Os pais serão notificados sobre este vínculo.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#7b8bda] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#6a79c9] transition-all shadow-lg active:scale-[0.98]"
              >
                Vincular Aluno Agora
                <ArrowRight className="size-6" />
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-4 text-gray-500 font-medium hover:text-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100">
            <div className="flex gap-4">
              <div className="bg-green-100 p-2 rounded-lg shrink-0">
                <ShieldCheck className="size-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Seguro</h3>
                <p className="text-sm text-gray-500">Dados protegidos e compartilhados apenas com a escola autorizada.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-100 p-2 rounded-lg shrink-0">
                <QrCode className="size-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Rápido</h3>
                <p className="text-sm text-gray-500">Vínculo instantâneo sem burocracia excessiva.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
