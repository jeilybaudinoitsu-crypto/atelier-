import React, { useState, useMemo } from 'react';
import { 
  Search, User, Home, Upload, Printer, Palette, Layers, Heart, 
  Download, LogOut, Lock, Mail, Plus, FileText, X, Sliders, 
  Sparkles, Check, Sun, Moon, Menu, ChevronLeft, ChevronRight,
  Scissors, BookOpen
} from 'lucide-react';

// ==========================================
// MOCK DATA (Datos de prueba para la app)
// ==========================================
const INITIAL_DESIGNS = [
  {
    id: 1,
    title: "Vestido de Verano Floral",
    category: "Vestidos",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    patternUrl: "#",
    likes: 124,
    tags: ["Verano", "Casual", "Flores"],
    colors: ["#FFB6C1", "#FFFACD", "#E0F7FA"],
    baseColor: "#FFB6C1"
  },
  {
    id: 2,
    title: "Chaqueta Denim Estilo Sastre",
    category: "Chaquetas",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=600&q=80",
    patternUrl: "#",
    likes: 98,
    tags: ["Jeans", "Casual", "Otoño"],
    colors: ["#1A237E", "#424242", "#E0E0E0"],
    baseColor: "#1A237E"
  },
  {
    id: 3,
    title: "Pantalón Palazzo Elegante",
    category: "Pantalones",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
    patternUrl: "#",
    likes: 215,
    tags: ["Elegante", "Oficina", "Lino"],
    colors: ["#3E2723", "#F5F5DC", "#006064"],
    baseColor: "#F5F5DC"
  },
  {
    id: 4,
    title: "Blusa con Volantes Romántica",
    category: "Blusas",
    image: "https://images.unsplash.com/photo-1548624149-f7b3160321b1?auto=format&fit=crop&w=600&q=80",
    likes: 83,
    tags: ["Romántico", "Encaje", "Primavera"],
    colors: ["#FFFFFF", "#F8BBD0", "#D1C4E9"],
    baseColor: "#FFFFFF"
  },
  {
    id: 5,
    title: "Abrigo Minimalista de Lana",
    category: "Abrigos",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    likes: 312,
    tags: ["Invierno", "Elegante", "Lana"],
    colors: ["#4E342E", "#37474F", "#CFD8DC"],
    baseColor: "#4E342E"
  },
  {
    id: 6,
    title: "Falda Plisada Midi",
    category: "Faldas",
    image: "https://images.unsplash.com/photo-1583496661160-fb48812c7511?auto=format&fit=crop&w=600&q=80",
    likes: 145,
    tags: ["Midi", "Moderno", "Casual"],
    colors: ["#004D40", "#AD1457", "#E65100"],
    baseColor: "#004D40"
  },
  {
    id: 7,
    title: "Kimono de Seda Boho",
    category: "Kimonos",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    likes: 189,
    tags: ["Boho", "Seda", "Playa"],
    colors: ["#FF6D00", "#AA00FF", "#00B8D4"],
    baseColor: "#FF6D00"
  },
  {
    id: 8,
    title: "Camisa Oversize de Algodón",
    category: "Camisas",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
    likes: 76,
    tags: ["Algodón", "Básico", "Unisex"],
    colors: ["#ECEFF1", "#263238", "#FFF59D"],
    baseColor: "#ECEFF1"
  }
];

// Listado de patrones básicos fundamentales agregados (CON COMA CORREGIDA)
const BASIC_PATTERNS = [
  {
    id: "patron-vestido",
    title: "Vestido Básico",
    category: "Vestidos",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    tags: ["Molde Base", "Esencial", "Ajustable"],
    colors: ["#9333EA", "#FFFFFF", "#3B82F6"],
    baseColor: "#9333EA"
  },
  {
    id: "patron-pantalon",
    title: "Pantalón Recto Base",
    category: "Pantalones",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
    tags: ["Molde Base", "Recto", "Sastrería"],
    colors: ["#1E293B", "#FFFFFF", "#10B981"], // CORREGIDO: Coma agregada aquí para evitar error de compilación
    baseColor: "#1E293B"
  },
  {
    id: "patron-camisa",
    title: "Camisa Clásica",
    category: "Camisas",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
    tags: ["Molde Base", "Camisería", "Formal"],
    colors: ["#6366F1", "#FFFFFF", "#F59E0B"],
    baseColor: "#6366F1"
  },
  {
    id: "patron-manga",
    title: "Manga Base",
    category: "Mangas",
    image: "https://images.unsplash.com/photo-1548624149-f7b3160321b1?auto=format&fit=crop&w=600&q=80",
    tags: ["Molde Base", "Manga Larga", "Manga Corta"],
    colors: ["#475569", "#FFFFFF", "#EC4899"],
    baseColor: "#475569"
  }
];

// Opciones de texturas predeterminadas para simular telas interactivas
const TEXTURES = [
  { id: 'solid', name: 'Color Sólido', color: 'transparent' },
  { id: 'dots', name: 'Lunares Chic', url: 'radial-gradient(circle, #000 10%, transparent 11%)' },
  { id: 'stripes', name: 'Rayas Marineras', url: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)' },
  { id: 'floral-pattern', name: 'Flores Atelier', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80' },
  { id: 'animal-print', name: 'Leopardo Pop', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=150&q=80' }
];

export default function App() {
  // Estados de la Aplicación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTab, setCurrentTab] = useState('inicio'); // inicio, subir, perfil
  const [searchQuery, setSearchQuery] = useState('');
  const [designs, setDesigns] = useState([...BASIC_PATTERNS, ...INITIAL_DESIGNS]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Estado para el visor interactivo de diseño
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [customColor, setCustomColor] = useState('#FFFFFF');
  const [customTexture, setCustomTexture] = useState('solid');

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentTab('inicio');
  };

  const handleAddDesign = (newDesign) => {
    setDesigns([newDesign, ...designs]);
    setCurrentTab('inicio');
  };

  // Filtrado de búsquedas
  const filteredDesigns = useMemo(() => {
    if (!searchQuery.trim()) return designs;
    return designs.filter(design => 
      design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      design.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [designs, searchQuery]);

  // Manejador del Tema (Modo Oscuro)
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* HEADER DE LA APLICACIÓN */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        currentUser={currentUser}
        onLogout={handleLogout}
        setCurrentTab={setCurrentTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex flex-1 relative overflow-hidden">
        {/* SIDEBAR DE NAVEGACIÓN */}
        <Sidebar 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          isCollapsed={isSidebarCollapsed}
        />

        {/* CONTENEDOR PRINCIPAL */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8 transition-all duration-300">
          {currentTab === 'inicio' && (
            <HeroSection isDarkMode={isDarkMode} />
          )}

          {currentTab === 'inicio' && (
            <>
              {/* Sección especial destacada de moldes básicos */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-purple-900/50 text-purple-400 border border-purple-800' : 'bg-purple-600 text-white'}`}>
                    <FileText size={18} />
                  </div>
                  <h2 className={`font-serif text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Moldes Base Fundamentales</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {BASIC_PATTERNS.map((pattern) => (
                    <div 
                      key={pattern.id}
                      onClick={() => {
                        setSelectedDesign(pattern);
                        setCustomColor(pattern.baseColor);
                        setCustomTexture('solid');
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-800 hover:border-purple-500 hover:bg-slate-900/80' 
                          : 'bg-white border-purple-100 hover:border-purple-300'
                      }`}
                    >
                      <div>
                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase inline-block mb-2 ${
                          isDarkMode ? 'bg-purple-950 text-purple-300' : 'bg-purple-50 text-purple-600'
                        }`}>
                          Patrón Base de {pattern.category}
                        </div>
                        <h3 className={`font-serif font-bold text-base ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{pattern.title}</h3>
                        <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Personaliza color, texturas e imprime a escala real.</p>
                      </div>
                      <div className={`flex items-center justify-between mt-4 pt-3 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-50'}`}>
                        <span className={`text-[10px] px-2 py-1 rounded ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>Alta Precisión</span>
                        <span className={`text-xs font-semibold flex items-center gap-1 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                          <Printer size={12} /> Abrir Molde
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pinterest Feed general */}
              <FeaturesSection 
                designs={filteredDesigns} 
                isDarkMode={isDarkMode}
                onSelectDesign={(design) => {
                  setSelectedDesign(design);
                  setCustomColor(design.baseColor);
                  setCustomTexture('solid');
                }}
              />
            </>
          )}

          {currentTab === 'subir' && (
            <UploadSection onAddDesign={handleAddDesign} isDarkMode={isDarkMode} />
          )}

          {currentTab === 'perfil' && (
            <ProfileSection currentUser={currentUser} designs={designs} isDarkMode={isDarkMode} />
          )}
        </main>
      </div>

      <Footer isDarkMode={isDarkMode} />

      {/* VISOR DE DISEÑOS E ILUSTRACIÓN TÉCNICA (MODAL) */}
      {selectedDesign && (
        <InteractiveVisualizerModal 
          design={selectedDesign} 
          onClose={() => setSelectedDesign(null)} 
          customColor={customColor}
          setCustomColor={setCustomColor}
          customTexture={customTexture}
          setCustomTexture={setCustomTexture}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

// ==========================================
// COMPONENTE: PANTALLA DE AUTENTICACIÓN
// ==========================================
function AuthScreen({ onLogin, isDarkMode, toggleDarkMode }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setError('Por favor, rellena todos los campos.');
      return;
    }
    setError('');
    onLogin({
      name: isLogin ? email.split('@')[0] : name,
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-tr from-slate-950 via-slate-900 to-purple-950' 
        : 'bg-gradient-to-tr from-purple-100 via-indigo-50 to-teal-50'
    }`}>
      
      {/* Botón Flotante para cambiar de Modo en Login */}
      <button 
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 p-2.5 rounded-full shadow-md transition-all ${
          isDarkMode ? 'bg-slate-900 text-yellow-400 border border-slate-800' : 'bg-white text-slate-800 border border-slate-200'
        }`}
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className={`w-full max-w-md rounded-2xl shadow-xl overflow-hidden border transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-100 text-slate-800'
      }`}>
        <div className="bg-slate-950 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.2),transparent)]"></div>
          <h1 className="text-2xl md:text-3xl font-serif tracking-wide relative z-10">Atelier</h1>
          <p className="text-slate-300 text-sm mt-1 relative z-10 font-sans">Tu estudio interactivo de diseño y patrones de costura</p>
        </div>

        <div className="p-6 md:p-8">
          <div className={`flex border-b mb-6 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <button 
              type="button"
              className={`flex-1 pb-3 text-center font-medium text-sm transition-all ${
                isLogin 
                  ? 'border-b-2 border-purple-500 text-purple-500 font-semibold' 
                  : `${isDarkMode ? 'text-slate-400' : 'text-slate-500'} hover:text-purple-400`
              }`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Iniciar Sesión
            </button>
            <button 
              type="button"
              className={`flex-1 pb-3 text-center font-medium text-sm transition-all ${
                !isLogin 
                  ? 'border-b-2 border-purple-500 text-purple-500 font-semibold' 
                  : `${isDarkMode ? 'text-slate-400' : 'text-slate-500'} hover:text-purple-400`
              }`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Registrarse
            </button>
          </div>

          {error && (
            <div className={`mb-4 p-3 rounded-lg text-xs font-medium border ${
              isDarkMode ? 'bg-red-950/40 text-red-400 border-red-900' : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className={`block text-xs font-semibold uppercase mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Nombre Completo</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <User size={16} />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Ej. Sofía Herrera" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 transition-colors ${
                      isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-xs font-semibold uppercase mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Correo Electrónico</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail size={16} />
                </span>
                <input 
                  type="email" 
                  placeholder="tu@correo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 transition-colors ${
                    isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Contraseña</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock size={16} />
                </span>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 transition-colors ${
                    isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-purple-600 text-white rounded-lg py-2.5 font-medium text-sm hover:bg-purple-700 transition-colors mt-6 shadow-md flex items-center justify-center gap-2"
            >
              {isLogin ? 'Entrar al Atelier' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Demo libre: Puedes usar cualquier dato de prueba para explorar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: HEADER (Cabecera)
// ==========================================
function Header({ searchQuery, setSearchQuery, currentUser, onLogout, setCurrentTab, isDarkMode, toggleDarkMode, toggleSidebar }) {
  return (
    <header className={`border-b sticky top-0 z-40 px-4 md:px-8 py-3 flex items-center justify-between gap-4 transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      
      {/* Logo & Hamburguesa */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          title="Colapsar/Mostrar menú"
          className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <Menu size={20} />
        </button>
        <div 
          onClick={() => setCurrentTab('inicio')}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="bg-purple-600 text-white p-2 rounded-lg shadow-sm">
            <Palette size={20} className="transform rotate-12" />
          </div>
          <span className={`font-serif font-bold text-lg md:text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Atelier</span>
        </div>
      </div>

      {/* Barra de Búsqueda Interactiva */}
      <div className="flex-1 max-w-md relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
          <Search size={18} />
        </span>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Busca tus patrones e ideas..." 
          className={`w-full border rounded-full py-2 pl-10 pr-10 text-sm focus:outline-none focus:border-purple-500 transition-all ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700 text-slate-100 focus:bg-slate-800' 
              : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:shadow-sm'
          }`}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Acciones de Perfil & Modo Oscuro */}
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div 
          onClick={() => setCurrentTab('perfil')}
          className={`flex items-center gap-2 cursor-pointer p-1.5 rounded-full md:rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
          }`}
        >
          <img 
            src={currentUser?.avatar} 
            alt={currentUser?.name} 
            className="w-8 h-8 rounded-full object-cover border border-purple-300"
          />
          <span className={`text-sm font-medium hidden md:inline-block capitalize ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{currentUser?.name}</span>
        </div>
        
        <button 
          onClick={onLogout}
          title="Cerrar sesión"
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode ? 'text-slate-400 hover:text-red-400 hover:bg-red-950/20' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
          }`}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}

// ==========================================
// COMPONENTE: SIDEBAR (Barra lateral guardable/colapsable)
// ==========================================
function Sidebar({ currentTab, setCurrentTab, onLogout, isDarkMode, isCollapsed }) {
  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'subir', label: 'Subir Diseños', icon: Upload },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
  ];

  return (
    <>
      <aside className={`border-r transition-all duration-300 hidden md:flex flex-col p-4 justify-between shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'} ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="space-y-6">
          {!isCollapsed && (
            <div className="px-2">
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Navegación</h3>
            </div>
          )}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  title={isCollapsed ? item.label : ""}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive 
                      ? (isDarkMode ? 'bg-purple-950/50 text-purple-400' : 'bg-purple-50 text-purple-700') 
                      : (isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-purple-500' : 'text-slate-400'} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className={`border-t pt-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <button 
            onClick={onLogout}
            title={isCollapsed ? "Cerrar Sesión" : ""}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
              isDarkMode ? 'text-red-400 hover:bg-red-950/20' : 'text-red-600 hover:bg-red-50'
            }`}
          >
            <LogOut size={18} />
            {!isCollapsed && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Navegación Móvil */}
      <nav className={`fixed bottom-0 inset-x-0 border-t flex justify-around p-2 md:hidden z-30 shadow-lg transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
                isActive ? 'text-purple-500' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

// ==========================================
// COMPONENTE: HERO SECTION (Banner Informativo)
// ==========================================
function HeroSection({ isDarkMode }) {
  return (
    <div className={`rounded-2xl p-6 md:p-10 mb-8 shadow-md relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-slate-100' 
        : 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white'
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_50%)]"></div>
      
      <div className="max-w-xl relative z-10 space-y-4">
        <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1.5">
          <Sparkles size={12} /> Moldes Personalizables Interactivamente
        </span>
        <h1 className="text-3xl md:text-4xl font-serif leading-tight">
          Diseña, Modifica y Confecciona a tu Estilo
        </h1>
        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-200'} text-sm md:text-base leading-relaxed`}>
          Haz clic en cualquier patrón o diseño para abrir el taller interactivo. Modifica y aplica colores o texturas directamente sobre las prendas del molde técnico sin alterar las fotografías originales.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: SECCIÓN DE CARACTERÍSTICAS (PINTEREST GRID)
// ==========================================
function FeaturesSection({ designs, onSelectDesign, isDarkMode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`font-serif text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Inspiración de Diseños & Patrones</h2>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
          {designs.length} elementos
        </span>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {designs.map((design) => (
          <FeatureCard 
            key={design.id} 
            design={design} 
            isDarkMode={isDarkMode}
            onSelectDesign={onSelectDesign} 
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: TARJETA DE DISEÑO (ESTILO PINTEREST)
// ==========================================
function FeatureCard({ design, onSelectDesign, isDarkMode }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(design.likes || 0);

  const toggleLike = (e) => {
    e.stopPropagation();
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handlePrintPattern = (e) => {
    e.stopPropagation();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Patrón Técnico de Costura - ${design.title}</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 40px; color: #333; }
            .border-box { border: 5px dashed #a855f7; padding: 50px; border-radius: 15px; max-width: 600px; margin: 0 auto; }
            h1 { font-family: Georgia, serif; color: #1e1b4b; margin-bottom: 5px; }
            p { margin-top: 0; color: #666; }
            .grid-sim { width: 100%; height: 320px; border: 1px solid #ddd; margin: 20px 0; background: linear-gradient(90deg, #f0f0f0 1px, transparent 1px), linear-gradient(#f0f0f0 1px, transparent 1px); background-size: 20px 20px; position: relative; }
            .grid-sim::after { content: "LÍNEAS DE CORTE Y UNIÓN - TALLA UNIVERSAL M"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: bold; color: #94a3b8; font-size: 13px; letter-spacing: 2px; }
            .badge { display: inline-block; background: #faf5ff; color: #7e22ce; padding: 6px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="border-box">
            <h1>Atelier</h1>
            <p>Patrón técnico listo para corte: <strong>${design.title}</strong></p>
            <span class="badge">Categoría: ${design.category}</span>
            <div class="grid-sim"></div>
            <p style="font-size: 12px; color: #888;">Imprime al 100% de escala en papel A4. Unir las páginas por las líneas de referencia.</p>
            <button onclick="window.print()" style="background: #a855f7; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 5px; cursor: pointer; margin-top: 15px;">Imprimir en PDF / Papel</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div 
      onClick={() => onSelectDesign(design)}
      className={`break-inside-avoid rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer relative ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
      }`}
    >
      <div className="relative overflow-hidden bg-slate-100">
        <img 
          src={design.image} 
          alt={design.title} 
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-2 w-full justify-between">
            <button 
              onClick={handlePrintPattern}
              className="bg-white/95 text-slate-900 p-2 rounded-lg hover:bg-white flex items-center gap-1.5 text-xs font-bold shadow-sm transition-colors"
            >
              <Printer size={14} className="text-purple-600" />
              Ver Patrón
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onSelectDesign(design); }}
              className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 flex items-center gap-1.5 text-xs font-bold shadow-sm transition-colors"
            >
              <Palette size={14} />
              Personalizar
            </button>
          </div>
        </div>
        
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
          {design.category}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <h3 className={`font-serif font-bold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {design.title}
        </h3>
        
        <div className="flex flex-wrap gap-1">
          {design.tags.map((tag, idx) => (
            <span key={idx} className={`text-[10px] px-2 py-0.5 rounded ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800 mt-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span 
              style={{ backgroundColor: design.baseColor }} 
              className="w-3.5 h-3.5 rounded-full inline-block border border-slate-200"
            />
            <span>Editable</span>
          </div>
          <button 
            onClick={toggleLike}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-500 transition-colors"
          >
            <Heart size={14} className={liked ? "fill-rose-500 text-rose-500" : ""} />
            <span>{likesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: SECCIÓN SUBIR DISEÑO
// ==========================================
function UploadSection({ onAddDesign, isDarkMode }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Vestidos');
  const [tagsInput, setTagsInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [baseColor, setBaseColor] = useState('#9333EA');
  const [previewFile, setPreviewFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const fallbackImages = {
      'Vestidos': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
      'Chaquetas': 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=600&q=80',
      'Pantalones': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80',
      'Blusas': 'https://images.unsplash.com/photo-1548624149-f7b3160321b1?auto=format&fit=crop&w=600&q=80'
    };

    const parsedTags = tagsInput.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const finalImage = previewFile || imageUrl || fallbackImages[category] || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80';

    onAddDesign({
      id: Date.now(),
      title,
      category,
      image: finalImage,
      patternUrl: "#",
      likes: 0,
      tags: parsedTags.length > 0 ? parsedTags : ["Diseño", "Custom"],
      colors: [baseColor, "#FFFFFF", "#333333"],
      baseColor
    });
  };

  return (
    <div className={`max-w-2xl mx-auto rounded-2xl border p-6 md:p-8 shadow-sm transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-purple-950 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
          <Upload size={24} />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold">Sube un Diseño Propio</h2>
          <p className="text-xs text-slate-500">Crea una ficha de corte interactiva y almacénala en tu biblioteca.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase mb-2">Nombre del Diseño</label>
          <input 
            type="text" 
            required
            placeholder="Ej. Blusa de Verano Boho"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:border-purple-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-2">Categoría</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:border-purple-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
            >
              <option value="Vestidos">Vestidos</option>
              <option value="Chaquetas">Chaquetas</option>
              <option value="Pantalones">Pantalones</option>
              <option value="Blusas">Blusas</option>
              <option value="Faldas">Faldas</option>
              <option value="Kimonos">Kimonos</option>
              <option value="Camisas">Camisas</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-2">Color Base</label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-11 h-11 p-1 rounded-lg border border-slate-200 bg-white cursor-pointer"
              />
              <span className="text-xs font-mono uppercase">{baseColor}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-2">Estilos (Separados por comas)</label>
          <input 
            type="text" 
            placeholder="seda, vintage, playa"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className={`w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:border-purple-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-2">Imagen / Boceto</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className={`border-2 border-dashed rounded-xl p-4 text-center hover:border-purple-500 transition-colors cursor-pointer relative ${isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-slate-200 bg-slate-50'}`}>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Plus size={24} className="mx-auto text-slate-400 mb-1" />
              <span className="block text-xs font-semibold">Subir Archivo Local</span>
            </div>
            
            <div className="space-y-2">
              <input 
                type="url" 
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={`w-full border rounded-lg p-2.5 text-xs focus:outline-none focus:border-purple-500 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
              />
            </div>
          </div>
        </div>

        {previewFile && (
          <div className={`p-3 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <img src={previewFile} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
            <div>
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-1"><Check size={14} /> ¡Imagen Lista!</span>
            </div>
          </div>
        )}

        <button 
          type="submit"
          className="w-full bg-purple-600 text-white rounded-xl py-3 font-semibold text-sm hover:bg-purple-700 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <Sparkles size={16} />
          Generar Patrón e Interactivo
        </button>
      </form>
    </div>
  );
}

// ==========================================
// COMPONENTE: SECCIÓN MI PERFIL
// ==========================================
function ProfileSection({ currentUser, designs, isDarkMode }) {
  const userDesigns = useMemo(() => designs.slice(0, 3), [designs]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className={`rounded-2xl border p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <img 
          src={currentUser?.avatar} 
          alt={currentUser?.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-100 dark:border-purple-950 shadow-md"
        />
        <div className="text-center md:text-left space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl font-bold capitalize">{currentUser?.name}</h2>
          <p className="text-sm text-slate-500">{currentUser?.email}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <div className={`px-4 py-2 rounded-xl border ${isDarkMode ? 'bg-slate-850 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <span className="block text-lg font-bold">{userDesigns.length}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Diseños Guardados</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold">Mis Diseños Activos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userDesigns.map((design) => (
            <div key={design.id} className={`rounded-xl overflow-hidden border shadow-sm transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
            }`}>
              <img src={design.image} alt={design.title} className="w-full h-48 object-cover" />
              <div className="p-4 space-y-1">
                <span className="text-[10px] text-purple-500 font-bold uppercase tracking-wider">{design.category}</span>
                <h4 className="font-bold text-sm truncate">{design.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VISOR INTERACTIVO Y GUÍA PROFESIONAL (MODAL)
// ==========================================
function InteractiveVisualizerModal({ design, onClose, customColor, setCustomColor, customTexture, setCustomTexture, isDarkMode }) {
  const [activeTab, setActiveTab] = useState('patron'); // 'patron' o 'guia'

  const getGuideSteps = (category) => {
    const steps = {
      'Vestidos': [
        "Corte: Cortar 1 pieza delantera y 1 espalda al doblez del hilo con un margen de costura de 1.5 cm.",
        "Entalle: Hilvanar y coser las pinzas del busto y de la cintura partiendo desde el vértice hacia afuera.",
        "Hombros: Unir hombros con costura francesa de alta calidad (0.5 cm hacia el revés, voltear y fijar a 1 cm).",
        "Cierre: Aplicar cremallera invisible de 50 cm en el centro de la espalda utilizando prensatelas adecuado.",
        "Acabado: Realizar un refinado dobladillo invisible de 1 cm o dobladillo de pañuelo a máquina."
      ],
      'Pantalones': [
        "Corte: Cortar 2 piezas delanteras y 2 traseras, prestando atención absoluta a la dirección del hilo.",
        "Bolsillos: Unir fondos de bolsillo internos a las aberturas laterales delanteras antes de cerrar costados.",
        "Tiro: Coser curva de tiro, planchar costura abierta y añadir un pespunte de refuerzo doble en la entrepierna.",
        "Pretina: Entretelar la pieza de la pretina para dar estructura antes de fijar a la cintura del pantalón.",
        "Bastilla: Terminar las botamangas con un dobladillo clásico a mano o puntada invisible."
      ],
      'Camisas': [
        "Corte: Cortar delantero (x2), espalda (al doblez, con canesú x2), cuello y pie de cuello (x2).",
        "Canesú: Montar el canesú de la espalda usando el método 'burrito' para ocultar las costuras internas.",
        "Cuello: Entretelar un pie de cuello y una pieza de cuello. Coser ambas, voltear, planchar y unir al escote.",
        "Manga: Cortar y pulir la cartera de la manga (abertura de puño) antes de unir la copa al sisa.",
        "Ojales: Marcar la tapeta delantera y confeccionar ojales verticales con espacio uniforme de 7 cm."
      ],
      'Mangas': [
        "Corte: Cortar 2 piezas de manga simétricas (una derecha y una izquierda) sobre tela doblada al bies.",
        "Fruncido: Pasar dos hileras de pespuntes flojos en la copa de la manga para embeber el exceso de tela.",
        "Montado: Coincidir el piquete central del hombro con la costura del canesú antes de alfilerear la sisa.",
        "Cerrado: Coser la costura del bajo manga desde la axila hasta el puño en una sola pasada.",
        "Puños: Colocar puño estructurado con entretela fina o terminar con dobladillo simple de 1.5 cm."
      ]
    };
    return steps[category] || [
      "Cortar según líneas de trazo marcadas en el patrón técnico.",
      "Unir los costados utilizando costuras limpias y sobrehiladas.",
      "Planchar cada costura abierta para dar caída y asentamiento profesional a la prenda.",
      "Pespuntar bordes exteriores y realizar terminación de dobladillos finos."
    ];
  };

  const renderProfessionalSVG = () => {
    const strokeColor = isDarkMode ? "#E2E8F0" : "#1E293B";
    const dashColor = "#A855F7";
    const cat = design.category.toLowerCase();

    return (
      <svg viewBox="0 0 100 120" className="w-full h-full max-h-80 drop-shadow-xl" id="main-svg-pattern">
        <defs>
          <pattern id="tex-modal" width="20" height="20" patternUnits="userSpaceOnUse">
             {customTexture === 'dots' && <circle cx="10" cy="10" r="2" fill="#6b21a8" />}
             {customTexture === 'stripes' && <line x1="0" y1="0" x2="20" y2="20" stroke="#6b21a8" strokeWidth="2" />}
          </pattern>
        </defs>
        
        {/* Trazo Principal con Relleno */}
        <path d={cat.includes('vestido') ? "M 35,15 Q 50,22 65,15 L 72,30 Q 58,35 60,50 L 80,110 L 20,110 L 40,50 Q 42,35 28,30 Z" : 
                cat.includes('pantalon') ? "M 25,15 L 75,15 L 78,40 Q 72,55 70,110 L 52,110 L 50,55 L 48,110 L 30,110 Q 28,55 22,40 Z" :
                cat.includes('camisa') ? "M 32,15 L 42,22 L 58,22 L 68,15 L 85,32 L 75,50 L 70,45 L 72,110 L 28,110 L 30,45 L 25,50 L 15,32 Z" :
                "M 50,10 Q 15,10 20,40 L 30,110 L 70,110 L 80,40 Q 85,10 50,10 Z"} 
              fill={customTexture !== 'solid' ? "url(#tex-modal)" : customColor} 
              stroke={strokeColor} strokeWidth="1.5" />

        {/* Líneas de Costura (Pespuntes Técnicos) */}
        <path d={cat.includes('vestido') ? "M 38,20 Q 50,25 62,20 M 23,107 L 77,107" : 
                cat.includes('pantalon') ? "M 28,107 L 46,107 M 54,107 L 72,107" :
                cat.includes('camisa') ? "M 30,107 L 70,107 M 40,25 L 60,25" :
                "M 32,107 L 68,107"} 
              stroke={dashColor} strokeWidth="0.8" strokeDasharray="2,2" fill="none" />
        
        {/* Marcas de Patronaje */}
        <circle cx="50" cy="18" r="1.5" fill="none" stroke={strokeColor} strokeWidth="0.5" />
        <line x1="50" y1="25" x2="50" y2="105" stroke={strokeColor} strokeWidth="0.3" strokeDasharray="5,2" />
        <text x="52" y="60" fontSize="3" fill={strokeColor} className="italic">SENTIDO DEL HILO</text>
        <text x="25" y="117" fontSize="2.5" fill={isDarkMode ? "#94A3B8" : "#64748B"}>© Atelier Professional Pattern v.2024</text>
      </svg>
    );
  };

  const handleExportHD = () => {
    const printWindow = window.open('', '_blank');
    const texture = TEXTURES.find(t => t.id === customTexture);
    const svgHTML = document.getElementById('main-svg-pattern').outerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>ATELIER PRO - ${design.title}</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; margin: 0; padding: 0; background: #fff; text-align: center; }
            .page { width: 210mm; min-height: 297mm; padding: 10mm; margin: 10mm auto; border: 1px solid #ddd; position: relative; background: white; box-sizing: border-box; }
            .grid { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(#ddd 1px, transparent 1px); background-size: 10mm 10mm; z-index: 0; pointer-events: none; }
            .content { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
            .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px; text-align: left; }
            .pattern-container { width: 100%; height: 620px; display: flex; justify-content: center; align-items: center; }
            .pattern-container svg { width: 95%; height: 95%; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.1)); }
            .tech-specs { text-align: left; margin-top: 40px; display: grid; grid-template-cols: 1fr 1fr; gap: 20px; font-size: 12px; text-transform: uppercase; }
            .spec-item { border: 1px solid #000; padding: 10px; }
            @media print { .page { border: none; margin: 0; } button { display: none; } }
            button { background: #9333EA; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin: 20px; }
          </style>
        </head>
        <body>
          <button onclick="window.print()">CONFIRMAR IMPRESIÓN A ESCALA REAL</button>
          <div class="page">
            <div class="grid"></div>
            <div class="content">
              <div class="header">
                <h1 style="margin:0; font-size: 24px;">ATELIER / FICHA TÉCNICA DE CORTE</h1>
                <p style="margin:5px 0;">MODELO: ${design.title} | CATEGORÍA: ${design.category}</p>
              </div>
              
              <div class="pattern-container">
                ${svgHTML}
              </div>

              <div class="tech-specs">
                <div class="spec-item">
                  <strong>Color de Referencia:</strong><br/> ${customColor}<br/><br/>
                  <strong>Textura Seleccionada:</strong><br/> ${texture?.name || 'Sólido'}
                </div>
                <div class="spec-item">
                  <strong>Escala:</strong> 1:1 (Ajustar a 100% en impresora)<br/><br/>
                  <strong>Talla:</strong> M (Universal)<br/>
                  <strong>Márgenes:</strong> Incluye 1.5cm para costura
                </div>
              </div>

              <div style="margin-top: 50px; font-size: 10px; color: #666; text-align: left;">
                * Documento de confección generado digitalmente por Atelier Systems. Las líneas discontinuas indican áreas de dobladillo o costura interior.
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className={`bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl shadow-2xl flex flex-col md:flex-row overflow-hidden border ${isDarkMode ? 'border-slate-800' : 'border-slate-100'} max-h-[90vh]`}>
        
        {/* Panel Izquierdo: Visualizador */}
        <div className="flex-1 bg-slate-950 relative flex flex-col p-6 min-h-[400px]">
          <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
            <button 
              onClick={() => setActiveTab('patron')} 
              className={`flex items-center gap-2 text-sm font-bold transition-all ${activeTab === 'patron' ? 'text-purple-400 border-b-2 border-purple-500 pb-2' : 'text-slate-500'}`}
            >
              <Scissors size={16}/> Plano Técnico
            </button>
            <button 
              onClick={() => setActiveTab('guia')} 
              className={`flex items-center gap-2 text-sm font-bold transition-all ${activeTab === 'guia' ? 'text-purple-400 border-b-2 border-purple-500 pb-2' : 'text-slate-500'}`}
            >
              <BookOpen size={16}/> Guía de Confección
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            {activeTab === 'patron' ? (
              <div className="w-full flex justify-center items-center gap-10">
                <img src={design.image} className="w-40 h-60 object-cover rounded-xl border border-white/20 shadow-2xl hidden lg:block" />
                <div className="flex-1 max-w-sm">{renderProfessionalSVG()}</div>
              </div>
            ) : (
              <div className="w-full max-w-lg space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                <h4 className="text-purple-400 font-bold flex items-center gap-2 mb-6">
                  {/* Icono de aguja vectorizado manual */}
                  <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="20" x2="20" y2="4" />
                    <circle cx="20" cy="4" r="2" />
                  </svg>
                  Manual de Confección Pro - {design.category}
                </h4>
                {getGuideSteps(design.category).map((step, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</span>
                    <p className="text-sm text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-6 text-[10px] font-mono text-purple-400">ESCALA 1:1 DISPONIBLE AL IMPRIMIR</div>
        </div>

        {/* Panel Derecho: Controles */}
        <div className="w-full md:w-80 p-8 overflow-y-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-full uppercase">{design.category}</span>
              <h3 className="text-xl font-serif font-bold mt-1">{design.title}</h3>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
          </div>

          <div className="space-y-8">
            <section>
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 mb-4"><Palette size={14} /> Color de Tela</label>
              <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="w-full h-12 p-1 rounded-xl bg-white border-2 border-slate-100 cursor-pointer" />
            </section>

            <section>
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 mb-4"><Layers size={14} /> Textura / Estampado</label>
              <div className="grid grid-cols-2 gap-2">
                {TEXTURES.map((tex) => (
                  <button key={tex.id} onClick={() => setCustomTexture(tex.id)} className={`p-2 rounded-lg border text-[10px] font-medium transition-all ${customTexture === tex.id ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-100 hover:border-slate-300 text-slate-500'}`}>
                    {tex.name}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-12 space-y-3">
            <button onClick={handleExportHD} className="w-full bg-slate-900 text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
              <Download size={16} /> Descargar Patrón Grande
            </button>
            <p className="text-[9px] text-center text-slate-400">Archivo de corte para Plotter, corte láser e impresoras A4.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: PÁGINA INFERIOR (Footer)
// ==========================================
function Footer({ isDarkMode }) {
  return <footer className={`p-10 text-center text-xs tracking-widest ${isDarkMode ? 'text-slate-600 border-slate-900' : 'text-slate-400 border-slate-100'} border-t uppercase`}>Atelier Professional Systems © 2026</footer>;
}