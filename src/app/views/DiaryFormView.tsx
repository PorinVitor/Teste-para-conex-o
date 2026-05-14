import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { 
  ArrowLeft, 
  Save, 
  Clock, 
  MapPin, 
  Type, 
  Smile, 
  Frown, 
  Meh, 
  AlertTriangle, 
  Camera,
  School,
  Coffee,
  Heart,
  Target,
  Zap,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";

export function DiaryFormView() {
  const { id, diaryId } = useParams();
  const navigate = useNavigate();
  const isEdit = !!diaryId;

  const [formData, setFormData] = useState({
    title: "",
    time: "",
    location: "Sala de Aula",
    content: "",
    mood: "Feliz",
    learning: "",
    hasCrisis: false,
    crisisDetails: "",
    resolution: "",
    icon: "Escola"
  });

  useEffect(() => {
    if (isEdit) {
      // Mock loading data
      setFormData({
        title: "Atividades em Sala",
        time: "10:00",
        location: "Sala de Aula",
        content: "Hoje a Julia participou ativamente da aula de artes. Ela demonstrou muito interesse nos gatinhos de papel que fizemos.",
        mood: "Feliz",
        learning: "Coordenação motora fina com recorte.",
        hasCrisis: false,
        crisisDetails: "",
        resolution: "",
        icon: "Escola"
      });
    }
  }, [isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isEdit ? "Anotação atualizada!" : "Anotação salva com sucesso!");
    navigate(`/child/${id}/diary`);
  };

  const moods = [
    { label: "Feliz", icon: Smile, color: "bg-green-100 text-green-600 border-green-200" },
    { label: "Calmo", icon: Meh, color: "bg-blue-100 text-blue-600 border-blue-200" },
    { label: "Ansioso", icon: Frown, color: "bg-orange-100 text-orange-600 border-orange-200" },
    { label: "Irritado", icon: AlertTriangle, color: "bg-red-100 text-red-600 border-red-200" },
  ];

  const categories = [
    { label: "Escola", icon: School },
    { label: "Refeição", icon: Coffee },
    { label: "Atividade", icon: Target },
    { label: "Alerta", icon: Zap },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to={`/child/${id}/diary`} className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-gray-100">
            <ArrowLeft className="size-6 text-gray-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? "Editar Anotação" : "Nova Anotação no Diário"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Type className="size-4 text-[#7b8bda]" />
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Aula de Artes"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#7b8bda] outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Clock className="size-4 text-[#7b8bda]" />
                Horário
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#7b8bda] outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <MapPin className="size-4 text-[#7b8bda]" />
                Local
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#7b8bda] outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Icons/Category */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">Ícone</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: cat.label })}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    formData.icon === cat.label 
                      ? "bg-[#7b8bda] text-white border-[#7b8bda] shadow-md scale-105" 
                      : "bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100"
                  }`}
                >
                  <cat.icon className="size-5" />
                  <span className="font-bold">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <BookOpen className="size-4 text-[#7b8bda]" />
              Anotações
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Escreva suas observações sobre este momento..."
              rows={5}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#7b8bda] outline-none transition-all resize-none"
              required
            />
          </div>

          {/* Mood Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700">Como o aluno estava se sentindo?</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: mood.label })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    formData.mood === mood.label 
                      ? mood.color + " shadow-md scale-105" 
                      : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
                  }`}
                >
                  <mood.icon className="size-8" />
                  <span className="font-bold text-sm">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Crisis Section */}
        <div className="bg-red-50 rounded-3xl border border-red-100 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-6 text-red-500" />
              <h3 className="text-xl font-bold text-red-900">Houve alguma crise?</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasCrisis}
                onChange={(e) => setFormData({ ...formData, hasCrisis: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>

          {formData.hasCrisis && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-bold text-red-800">O que aconteceu?</label>
                <textarea
                  value={formData.crisisDetails}
                  onChange={(e) => setFormData({ ...formData, crisisDetails: e.target.value })}
                  placeholder="Descreva a crise, gatilhos observados, etc..."
                  className="w-full px-4 py-3 bg-white border-2 border-red-100 rounded-2xl focus:border-red-500 outline-none transition-all resize-none"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-red-800">Como a crise foi contornada?</label>
                <textarea
                  value={formData.resolution}
                  onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                  placeholder="Quais estratégias foram usadas?"
                  className="w-full px-4 py-3 bg-white border-2 border-red-100 rounded-2xl focus:border-red-500 outline-none transition-all resize-none"
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        {/* Learning section */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-4">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Heart className="size-4 text-[#7b8bda]" />
            O que o aluno aprendeu hoje?
          </label>
          <textarea
            value={formData.learning}
            onChange={(e) => setFormData({ ...formData, learning: e.target.value })}
            placeholder="Relate os avanços pedagógicos e sociais..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#7b8bda] outline-none transition-all resize-none"
          />
        </div>

        {/* Attachment */}
        <div className="bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 p-8 text-center cursor-pointer hover:bg-gray-100 transition-colors group">
          <div className="bg-white p-4 rounded-full inline-block mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <Camera className="size-8 text-gray-400" />
          </div>
          <p className="font-bold text-gray-600">Anexar foto do dia</p>
          <p className="text-sm text-gray-400">Clique para selecionar ou arraste uma imagem</p>
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-[#7b8bda] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#6a79c9] transition-all shadow-lg active:scale-[0.98]"
          >
            <Save className="size-6" />
            {isEdit ? "Salvar Alterações" : "Salvar no Diário"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/child/${id}/diary`)}
            className="px-8 py-4 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
