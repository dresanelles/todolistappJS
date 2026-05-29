const views = [
  {
    name: "home",
    route: "#home",
    role: ["admin", "user"],
    icon: "🏠"
  },
  {
    name: "users",
    route: "#users",
    role: ["admin"],
    icon: "👥"
  }
]

function renderRoute() {
  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) return ""

  const routes = views
    .filter(view => view.role.includes(user.role))
    .map(view => {
      return `
        <a href="${view.route}" class="flex items-center gap-2 text-gray-600 hover:text-[#9FA1FF] md:text-white md:hover:bg-[#b5baff50] px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize">
          <span>${view.icon}</span>
          <span>${view.name}</span>
        </a>
      `
    })

  return routes.join("")
}

export default function layout() {
  const routes = renderRoute()
  
  return `
    <div class="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      <header class="bg-white border-b border-gray-100 flex flex-row justify-between items-center w-full px-4 md:px-8 py-4 sticky top-0 z-40 shadow-sm">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-[#9FA1FF]"></div>
          <span class="font-extrabold text-gray-900 tracking-tight text-lg">App Notas</span>
        </div>
        
        <div class="flex items-center gap-3">
          <button class="bg-[#D9F9DF] text-emerald-800 text-xs md:text-sm font-bold px-4 py-2 rounded-full cursor-pointer transition-transform active:scale-95">
            Perfil Usuario
          </button>
          <button id="btnLogoutGlobal" class="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 text-xs md:text-sm font-semibold px-4 py-2 rounded-full cursor-pointer transition-colors active:scale-95">
            Logout
          </button>
        </div>
      </header>

      <div class="flex-1 flex flex-col md:flex-row relative">
        
        <aside class="bg-white md:bg-[#9FA1FF] border-t md:border-t-0 border-gray-100 md:w-64 fixed bottom-0 left-0 w-full md:sticky md:top-[73px] md:h-[calc(100vh-73px)] z-40 shadow-lg md:shadow-none">
          <nav class="flex flex-row md:flex-col justify-around md:justify-start gap-2 p-3 md:p-4">
            ${routes}
          </nav>
        </aside>

        <main 
          id="principal_content" 
          class="flex-1 p-4 md:p-8 pb-24 md:pb-8 w-full max-w-full overflow-x-hidden">
          </main>

      </div>
    </div>
  `
}