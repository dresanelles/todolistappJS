export default function homeView() {
    return `
    <div class="p-4 md:p-8 max-w-7xl mx-auto relative min-h-screen">
        <div class="mb-6 md:mb-8 text-center md:text-left">
            <h1 class="text-2xl md:text-4xl font-extrabold text-gray-950">
                ¡Hola, <span id="name" class="text-[#9FA1FF]"></span>!
            </h1>
            <p class="text-sm py-6 text-shadow-gray-800 mt-1">Notas del día.</p>
        </div>

        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            <div class="w-full lg:w-72 relative">
                <input 
                    type="text" 
                    id="inputSearch" 
                    class="w-full bg-gray-50 border border-gray-200 focus:border-[#9FA1FF] focus:bg-white focus:outline-none rounded-xl p-2.5 pl-9 text-xs md:text-sm text-gray-900 transition-all placeholder-gray-400" 
                    placeholder="🔍 Buscar tarea (ej: comer)..."
                >
            </div>

            <div class="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 justify-start sm:justify-center no-scrollbar">
                <button class="filter-btn shrink-0 bg-[#9FA1FF] text-white px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-colors" data-status="all">Todas</button>
                <button class="filter-btn shrink-0 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-colors" data-status="initial">Initial</button>
                <button class="filter-btn shrink-0 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-colors" data-status="process">Process</button>
                <button class="filter-btn shrink-0 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-colors" data-status="completed">Completed</button>
            </div>
            
            <button id="btnCreateTask" class="hidden w-full lg:w-auto bg-[#FAEE2F] hover:bg-[#ebd91c] text-gray-950 font-bold px-5 py-2.5 rounded-xl text-xs md:text-sm transition-transform active:scale-95 shadow-sm cursor-pointer text-center">
                + Nueva Tarea
            </button>
        </div>

        <div id="tasks-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <p class="text-gray-400 col-span-full text-center py-8 text-sm">Cargando tareas...</p>
        </div>

        <div id="taskModal" class="hidden fixed inset-0 bg-black/40 backdrop-blur-sm grid place-items-center p-4 z-50">
            <div class="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl transition-all transform scale-100 mx-auto">
                <h2 class="text-lg md:text-xl font-bold text-gray-950 mb-4">Crear Nueva Tarea</h2>
                <form id="taskForm" class="flex flex-col gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Título</label>
                        <input type="text" id="taskTitle" required class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#9FA1FF] transition-colors" placeholder="Ej: Estudiar JavaScript">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Descripción</label>
                        <textarea id="taskDescription" required rows="3" class="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#9FA1FF] transition-colors resize-none" placeholder="Ej: Repasar fetch y localStorage..."></textarea>
                    </div>
                    <div class="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-2">
                        <button type="button" id="btnCancelTask" class="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer text-center">Cancelar</button>
                        <button type="submit" class="w-full sm:w-auto bg-[#9FA1FF] hover:bg-[#8688ff] text-white px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer text-center">Guardar Tarea</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `
}