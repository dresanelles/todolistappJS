export default function notFoundView() {
    return `
    <div class="min-h-[70vh] w-full flex flex-col items-center justify-center text-center p-4 md:p-8 font-sans select-none">
        
        <div class="max-w-md flex flex-col items-center">
            
            <h1 class="text-8xl md:text-9xl font-extrabold text-[#9FA1FF] tracking-tighter drop-shadow-sm animate-pulse">
                404
            </h1>
            
            <h2 class="text-xl md:text-2xl font-extrabold text-gray-950 mt-4 tracking-tight">
                Recurso no encontrado
            </h2>
            
            <p class="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">
                La ruta a la que intentas acceder no existe, no está disponible o se escribió de forma incorrecta.
            </p>
            
            <a 
                href="#home" 
                class="mt-8 inline-flex items-center justify-center bg-[#9FA1FF] hover:bg-[#8688ff] text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-indigo-100 cursor-pointer"
            >
                Volver al inicio
            </a>
            
        </div>
        
    </div>
    `
}