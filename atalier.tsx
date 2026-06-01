import React, { useState, useMemo } from 'react';
import { 
  Search, 
  User, 
  Home, 
  Upload, 
  Printer, 
  Palette, 
  Layers, 
  Heart, 
  Download, 
  LogOut, 
  Lock, 
  Mail, 
  Plus, 
  FileText, 
  X, 
  Sliders, 
  Sparkles,
  Check
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
    patternUrl: "#",
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
    patternUrl: "#",
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
    patternUrl: "#",
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
    patternUrl: "#",
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
    patternUrl: "#",
    likes: 76,
    tags: ["Algodón", "Básico", "Unisex"],
    colors: ["#ECEFF1", "#263238", "#FFF59D"],
    baseColor: "#ECEFF1"
  }
];

// Opciones de texturas predeterminadas para simular la IA
const TEXTURES = [
  { id: 'solid', name: 'Color Sólido', color: 'transparent' },
  { id: 'dots', name: 'Lunares Chic', url: 'radial-gradient(circle, #000 10%, transparent 11%)' },
  { id: 'stripes', name: 'Rayas Marineras', url: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)' },
  { id: 'floral-pattern', name: 'Flores IA', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80' },
  { id: 'animal-print', name: 'Leopardo Pop', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=150&q=80' }
];

export default function App() {
  // Estados de la Aplicación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTab, setCurrentTab] = useState('inicio'); // inicio, subir, perfil
  const [searchQuery, setSearchQuery] = useState('');
  const [designs, setDesigns] = useState(INITIAL_DESIGNS);
  
  // Estado para el visor interactivo de diseño (IA / Edición)
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [customColor, setCustomColor] = useState('#FFFFFF');
  const [customTexture, setCustomTexture] = useState('solid');

  // Sistema de Inicio de Sesión y Registro
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

  // Si no está autenticado, mostramos la pantalla de login/registro
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* HEADER DE LA APLICACIÓN */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        currentUser={currentUser}
        onLogout={handleLogout}
        setCurrentTab={setCurrentTab}
      />

      <div className="flex flex-1 relative">
        {/* SIDEBAR DE NAVEGACIÓN */}
        <Sidebar 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          onLogout={handleLogout}
        />

        {/* CONTENEDOR PRINCIPAL DE CONTENIDO */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
          {currentTab === 'inicio' && (
            <HeroSection />
          )}

          {currentTab === 'inicio' && (
            <FeaturesSection 
              designs={filteredDesigns} 
              onSelectDesign={(design) => {
                setSelectedDesign(design);
                setCustomColor(design.baseColor);
                setCustomTexture('solid');
              }}
            />
          )}

          {currentTab === 'subir' && (
            <UploadSection onAddDesign={handleAddDesign} />
          )}

          {currentTab === 'perfil' && (
            <ProfileSection currentUser={currentUser} designs={designs} />
          )}
        </main>
      </div>

      {/* FOOTER */}
      <Footer />

      {/* VISOR DE DISEÑOS CON IA (MODAL) */}
      {selectedDesign && (
        <IAVisualizerModal 
          design={selectedDesign} 
          onClose={() => setSelectedDesign(null)} 
          customColor={customColor}
          setCustomColor={setCustomColor}
          customTexture={customTexture}
          setCustomTexture={setCustomTexture}
        />
      )}
    </div>
  );
}

// ==========================================
// COMPONENTE: PANTALLA DE AUTENTICACIÓN
// ==========================================
function AuthScreen({ onLogin }) {
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
    <div className="min-h-screen bg-gradient-to-tr from-rose-100 via-indigo-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.2),transparent)]"></div>
          <h1 className="text-2xl md:text-3xl font-serif tracking-wide relative z-10">Atelier IA</h1>
          <p className="text-slate-300 text-sm mt-1 relative z-10">Tu estudio interactivo de diseño y patrones de costura</p>
        </div>

        <div className="p-6 md:p-8">
          {/* Selector de Pestaña */}
          <div className="flex border-b border-slate-200 mb-6">
            <button 
              type="button"
              className={`flex-1 pb-3 text-center font-medium text-sm transition-all ${isLogin ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Iniciar Sesión
            </button>
            <button 
              type="button"
              className={`flex-1 pb-3 text-center font-medium text-sm transition-all ${!isLogin ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Registrarse
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-rose-50 text-rose-600 p-3 rounded-lg text-xs font-medium border border-rose-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nombre Completo</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <User size={16} />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Ej. Sofía Herrera" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Correo Electrónico</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail size={16} />
                </span>
                <input 
                  type="email" 
                  placeholder="tu@correo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Contraseña</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock size={16} />
                </span>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white rounded-lg py-2.5 font-medium text-sm hover:bg-slate-800 transition-colors mt-6 shadow-sm flex items-center justify-center gap-2"
            >
              {isLogin ? 'Entrar al Atelier' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
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
function Header({ searchQuery, setSearchQuery, currentUser, onLogout, setCurrentTab }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 py-3 flex items-center justify-between gap-4">
      {/* Logo */}
      <div 
        onClick={() => setCurrentTab('inicio')}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-sm">
          <Palette size={20} className="transform rotate-12" />
        </div>
        <span className="font-serif font-bold text-lg md:text-xl tracking-tight text-slate-900 hidden sm:inline-block">Atelier IA</span>
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
          className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-sm transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
          >
            Clear
          </button>
        )}
      </div>

      {/* Acciones de Perfil */}
      <div className="flex items-center gap-3">
        <div 
          onClick={() => setCurrentTab('perfil')}
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1.5 rounded-full md:rounded-lg transition-colors"
        >
          <img 
            src={currentUser?.avatar} 
            alt={currentUser?.name} 
            className="w-8 h-8 rounded-full object-cover border border-indigo-200"
          />
          <span className="text-sm font-medium text-slate-700 hidden md:inline-block capitalize">{currentUser?.name}</span>
        </div>
        
        <button 
          onClick={onLogout}
          title="Cerrar sesión"
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}

// ==========================================
// COMPONENTE: SIDEBAR (Barra lateral)
// ==========================================
function Sidebar({ currentTab, setCurrentTab, onLogout }) {
  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'subir', label: 'Subir Diseños', icon: Upload },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
  ];

  return (
    <>
      {/* Sidebar para Escritorio */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-4 justify-between shrink-0">
        <div className="space-y-6">
          <div className="px-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Navegación</h3>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Barra de Navegación Móvil (Bottom Bar) */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex justify-around p-2 md:hidden z-30 shadow-lg">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-xs font-medium transition-colors ${
                isActive ? 'text-indigo-600' : 'text-slate-500'
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
function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white rounded-2xl p-6 md:p-10 mb-8 shadow-md relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.15),transparent_50%)]"></div>
      <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
      
      <div className="max-w-xl relative z-10 space-y-4">
        <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1.5">
          <Sparkles size={12} /> Inteligencia Artificial Integrada
        </span>
        <h1 className="text-3xl md:text-4xl font-serif leading-tight">
          Diseña, Modifica y Materializa tus Ideas
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Haz clic en cualquier diseño para entrar al laboratorio de IA. Podrás modificar instantáneamente colores, patrones y texturas, además de imprimir directamente los patrones de costura listos para confeccionar.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: SECCIÓN DE CARACTERÍSTICAS (PINTEREST GRID)
// ==========================================
function FeaturesSection({ designs, onSelectDesign }) {
  if (designs.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-lg mx-auto">
        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Search size={28} />
        </div>
        <h3 className="text-slate-800 font-semibold text-lg">No encontramos resultados</h3>
        <p className="text-slate-500 text-sm mt-1">Prueba con otras palabras clave o explora diferentes estilos.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-slate-900 font-bold">Ideas & Patrones de Costura</h2>
        <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-medium">
          {designs.length} {designs.length === 1 ? 'diseño' : 'diseños'}
        </span>
      </div>

      {/* Grid fluido estilo Pinterest */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {designs.map((design) => (
          <FeatureCard 
            key={design.id} 
            design={design} 
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
function FeatureCard({ design, onSelectDesign }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(design.likes);

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
    // Simular preparación de impresión
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Patrón de Costura - ${design.title}</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 40px; color: #333; }
            .border-box { border: 5px dashed #6366f1; padding: 50px; border-radius: 15px; max-width: 600px; margin: 0 auto; }
            h1 { font-family: Georgia, serif; color: #1e1b4b; margin-bottom: 5px; }
            p { margin-top: 0; color: #666; }
            .grid-sim { width: 100%; height: 300px; border: 1px solid #ddd; margin: 20px 0; background: linear-gradient(90deg, #f0f0f0 1px, transparent 1px), linear-gradient(#f0f0f0 1px, transparent 1px); background-size: 20px 20px; position: relative; }
            .grid-sim::after { content: "LÍNEAS DE CORTE - TALLA M"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: bold; color: #94a3b8; font-size: 14px; letter-spacing: 2px; }
            .badge { display: inline-block; background: #e0e7ff; color: #4338ca; padding: 6px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="border-box">
            <h1>Atelier IA</h1>
            <p>Patrón imprimible para: <strong>${design.title}</strong></p>
            <span class="badge">Categoría: ${design.category}</span>
            <div class="grid-sim"></div>
            <p style="font-size: 12px; color: #888;">Imprime al 100% de escala en papel A4. Unir las páginas por las guías numéricas.</p>
            <button onclick="window.print()" style="background: #1e1b4b; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 5px; cursor: pointer; margin-top: 15px;">Imprimir Ahora</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div 
      onClick={() => onSelectDesign(design)}
      className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer relative"
    >
      {/* Imagen del Diseño */}
      <div className="relative overflow-hidden bg-slate-100">
        <img 
          src={design.image} 
          alt={design.title} 
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Degradado sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-2 w-full justify-between">
            <button 
              onClick={handlePrintPattern}
              className="bg-white/95 text-slate-900 p-2 rounded-lg hover:bg-white flex items-center gap-1.5 text-xs font-bold shadow-sm transition-colors"
              title="Descargar patrón imprimible"
            >
              <Printer size={14} className="text-indigo-600" />
              Patrón PDF
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onSelectDesign(design); }}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 flex items-center gap-1.5 text-xs font-bold shadow-sm transition-colors"
            >
              <Sparkles size={14} />
              IA Modificar
            </button>
          </div>
        </div>
        
        {/* Badge de Categoría */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
          {design.category}
        </span>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-4 space-y-2">
        <h3 className="font-serif font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
          {design.title}
        </h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {design.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>

        {/* Acciones Rápidas del Footer de la Tarjeta */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span 
              style={{ backgroundColor: design.baseColor }} 
              className="w-3.5 h-3.5 rounded-full inline-block border border-slate-200"
            />
            <span>Customizable</span>
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
function UploadSection({ onAddDesign }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Vestidos');
  const [tagsInput, setTagsInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [baseColor, setBaseColor] = useState('#4F46E5');
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
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
        <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
          <Upload size={24} />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-slate-900">Sube tu Propio Diseño</h2>
          <p className="text-xs text-slate-500">Crea una plantilla interactiva y genera su patrón de costura con IA.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título de la prenda */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Nombre del Diseño</label>
          <input 
            type="text" 
            required
            placeholder="Ej. Blusa de Verano Boho"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* Categoría y Color Base */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Categoría</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
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
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Color Base Inicial</label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-11 h-11 p-1 rounded-lg border border-slate-200 bg-white cursor-pointer"
              />
              <span className="text-xs font-mono uppercase text-slate-500">{baseColor}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Etiquetas / Estilos</label>
          <input 
            type="text" 
            placeholder="Separadas por comas. Ej. seda, vintage, playa"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* Carga de Imagen */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Imagen de la Prenda o Boceto</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-indigo-400 transition-colors bg-slate-50 cursor-pointer relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Plus size={24} className="mx-auto text-slate-400 mb-1" />
              <span className="block text-xs font-semibold text-slate-600">Subir Archivo Local</span>
              <span className="block text-[10px] text-slate-400 mt-1">PNG, JPG hasta 5MB</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-center text-xs text-slate-400 font-medium">— O una URL externa —</div>
              <input 
                type="url" 
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Preview Visual */}
        {previewFile && (
          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
            <img src={previewFile} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
            <div>
              <span className="text-xs font-bold text-teal-600 flex items-center gap-1"><Check size={14} /> ¡Imagen Lista!</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">El simulador de IA adaptará este diseño automáticamente.</span>
            </div>
          </div>
        )}

        <button 
          type="submit"
          className="w-full bg-slate-900 text-white rounded-xl py-3 font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2"
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
function ProfileSection({ currentUser, designs }) {
  // Simular estadísticas
  const savedCount = 4;
  const userDesigns = useMemo(() => {
    // Tomamos algunos diseños de prueba
    return designs.slice(0, 3);
  }, [designs]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Cabecera del Perfil */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full border border-teal-100">
          Diseñador Verificado
        </div>
        <img 
          src={currentUser?.avatar} 
          alt={currentUser?.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-md"
        />
        <div className="text-center md:text-left space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 capitalize">{currentUser?.name}</h2>
          <p className="text-sm text-slate-500">{currentUser?.email}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <div className="text-center md:text-left bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <span className="block text-lg font-bold text-slate-900">{userDesigns.length}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Diseños Creados</span>
            </div>
            <div className="text-center md:text-left bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <span className="block text-lg font-bold text-slate-900">{savedCount}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Patrones Descargados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Galería de Diseños del Usuario */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-slate-900">Mis Diseños Activos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userDesigns.map((design) => (
            <div key={design.id} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
              <img src={design.image} alt={design.title} className="w-full h-48 object-cover" />
              <div className="p-4 space-y-1">
                <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">{design.category}</span>
                <h4 className="font-bold text-slate-900 text-sm truncate">{design.title}</h4>
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Printer size={12} /> Patrón listo</span>
                  <span className="flex items-center gap-1"><Heart size={12} /> {design.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: VISOR INTERACTIVO IA (MODAL)
// ==========================================
function IAVisualizerModal({ design, onClose, customColor, setCustomColor, customTexture, setCustomTexture }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Simulación de renderizado por IA
  const triggerIARendering = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1500);
  };

  // Obtener estilo de textura para la capa simulada
  const textureStyle = useMemo(() => {
    const selected = TEXTURES.find(t => t.id === customTexture);
    if (!selected || selected.id === 'solid') return {};
    
    if (selected.url.startsWith('radial-gradient') || selected.url.startsWith('linear-gradient')) {
      return { backgroundImage: selected.url, backgroundSize: '15px 15px' };
    }
    return { backgroundImage: `url(${selected.url})`, backgroundSize: 'cover', backgroundBlendMode: 'overlay' };
  }, [customTexture]);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]">
        
        {/* Lado Izquierdo: Visualizador de Imagen / Canvas */}
        <div className="flex-1 bg-slate-900 relative flex items-center justify-center p-6 min-h-[300px] md:min-h-0">
          
          {/* Capa Principal: Prenda de Vestir con Filtros de Color y Textura Inteligentes */}
          <div className="relative w-full max-w-xs aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-slate-700/50">
            <img 
              src={design.image} 
              alt={design.title} 
              className="w-full h-full object-cover transition-all"
              style={{ filter: `hue-rotate(25deg) saturate(1.1)` }}
            />
            {/* Capa de Color Inteligente (Superposición Multiply/Overlay) */}
            <div 
              className="absolute inset-0 mix-blend-multiply opacity-50 pointer-events-none transition-colors duration-300"
              style={{ backgroundColor: customColor }}
            />
            {/* Capa de Textura IA */}
            {customTexture !== 'solid' && (
              <div 
                className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none"
                style={textureStyle}
              />
            )}
            
            {/* Loader de IA */}
            {loading && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-serif italic text-indigo-300">Inteligencia Artificial computando diseño...</p>
                <p className="text-[10px] text-slate-400 mt-1">Ajustando costuras y caídas de tela</p>
              </div>
            )}

            {/* Alerta Éxito */}
            {success && (
              <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-3">
                  <Check size={24} />
                </div>
                <p className="text-sm font-bold">¡Diseño IA Actualizado!</p>
                <p className="text-xs text-emerald-200">Patrón optimizado guardado</p>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono text-indigo-300 flex items-center gap-1">
            <Sparkles size={10} /> Visualizador Interactivo IA v2.5
          </div>
        </div>

        {/* Lado Derecho: Panel de Personalización de Prenda */}
        <div className="w-full md:w-96 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                  {design.category}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">{design.title}</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modificador 1: Selector de Color IA */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                <Palette size={14} className="text-indigo-600" />
                Color de Tela Personalizado
              </label>
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <input 
                  type="color" 
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-10 h-10 p-0.5 rounded-lg border border-slate-200 bg-white cursor-pointer shrink-0"
                />
                <div className="flex-1">
                  <span className="block text-xs font-mono font-bold uppercase text-slate-800">{customColor}</span>
                  <span className="block text-[10px] text-slate-400">Modificación tonal interactiva</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                {design.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCustomColor(color)}
                    style={{ backgroundColor: color }}
                    className="w-7 h-7 rounded-full border border-slate-300 shadow-sm hover:scale-110 transition-transform"
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Modificador 2: Estampado / Textura IA */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                <Layers size={14} className="text-indigo-600" />
                Textura & Estampado Inteligente
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TEXTURES.map((tex) => (
                  <button
                    key={tex.id}
                    onClick={() => setCustomTexture(tex.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs font-medium transition-all ${
                      customTexture === tex.id 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-5 h-5 rounded border border-slate-200 bg-slate-300 shrink-0 overflow-hidden" style={{
                      backgroundImage: tex.id === 'solid' ? 'none' : (tex.url.startsWith('http') ? `url(${tex.url})` : tex.url),
                      backgroundSize: 'cover',
                      backgroundColor: tex.id === 'solid' ? '#ccc' : 'transparent'
                    }} />
                    <span className="truncate">{tex.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de Re-generación por IA */}
            <button 
              onClick={triggerIARendering}
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded-xl py-3 font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles size={16} className="text-yellow-400 animate-pulse" />
              Renderizar Nuevo Diseño con IA
            </button>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 flex gap-2">
            <button 
              onClick={() => {
                alert("Preparando descarga del patrón en alta definición...");
              }}
              className="flex-1 border border-slate-200 text-slate-700 rounded-lg py-2 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Download size={14} />
              Descargar Patrón
            </button>
            <button 
              onClick={() => {
                window.print();
              }}
              className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Printer size={14} />
              Imprimir Guía
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: FOOTER (Pie de Página)
// ==========================================
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 px-4 md:px-8 mt-auto z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
              <Palette size={16} />
            </div>
            <span className="font-serif font-bold text-lg tracking-tight">Atelier IA</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fusionamos la artesanía tradicional de la costura y el patronaje con el poder de la inteligencia artificial generativa. Diseña sin límites.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Recursos & Guías</h4>
          <ul className="space-y-1.5 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Cómo unir patrones de papel</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Guía de tallas universales</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Prompting de moda para IA</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Telas recomendadas</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Atelier IA</h4>
          <p className="text-xs leading-relaxed text-slate-400">
            ¿Tienes alguna sugerencia o quieres integrar tus propios modelos de costura? Contáctanos en: <span className="text-indigo-400 block mt-1">soporte@atelieria.demo</span>
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto border-t border-slate-800/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© 2026 Atelier IA. Diseñado para mentes creativas.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Condiciones de Uso</a>
        </div>
      </div>
    </footer>
  );
}