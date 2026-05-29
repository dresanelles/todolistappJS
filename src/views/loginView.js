export default function loginView() {
    return `
    <div id="login_container" class="min-h-screen w-full flex items-center justify-center bg-[#D9F9DF] p-4 md:p-8 font-sans select-none">
        
        <div class="bg-white w-full max-w-md p-6 md:p-10 rounded-3xl shadow-xl shadow-emerald-950/10 relative z-10">
            
            <div class="mb-8 text-center">
                <div class="flex items-center gap-2 justify-center mb-3">
                    <div class="w-3 h-3 rounded-full bg-[#9FA1FF]"></div>
                    <span class="font-extrabold text-gray-900 tracking-tight text-lg">App Notas</span>
                </div>
                <h1 class="text-2xl font-extrabold text-gray-950 tracking-tight">¡Te damos la bienvenida!</h1>
                <p class="text-sm text-gray-400 mt-2">Ingresa tus credenciales para acceder.</p>
            </div>

            <form id="loginForm" class="flex flex-col gap-5 w-full">
                <div>
                    <label for="username" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        required
                        class="w-full bg-gray-50 border border-gray-200 focus:border-[#9FA1FF] focus:bg-white focus:outline-none rounded-2xl p-3.5 text-sm text-gray-900 transition-all placeholder-gray-300" 
                        placeholder="luisita.rose"
                    >
                </div>
                
                <div>
                    <label for="password" class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        required
                        class="w-full bg-gray-50 border border-gray-200 focus:border-[#9FA1FF] focus:bg-white focus:outline-none rounded-2xl p-3.5 text-sm text-gray-900 transition-all placeholder-gray-300" 
                        placeholder="•••••••••"
                    >
                </div>
                
                <button 
                    id="btnLogin" 
                    type="submit"
                    class="w-full bg-[#9FA1FF] hover:bg-[#8688ff] text-white font-bold py-3.5 rounded-2xl text-sm transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-100 cursor-pointer text-center mt-2"
                >
                    Iniciar Sesión
                </button>
            </form>

        </div>
    </div>
    `
}