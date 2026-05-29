export async function homeController() {
    const user = JSON.parse(localStorage.getItem("user"))
    
    // Mostrar el nombre del usuario
    const userInfo = document.getElementById("name")
    if (userInfo && user) {
        userInfo.innerText = user.full_name
    }

    // Configurar botón de Cerrar Sesión del layout del tutor
    const btnLogoutGlobal = document.getElementById("btnLogoutGlobal")
    if (btnLogoutGlobal) {
        btnLogoutGlobal.addEventListener("click", () => {
            localStorage.removeItem("user") 
            window.location.href = "#login" 
        })
    }

    // Mostrar botón de crear tareas solo a los usuarios comunes
    const btnCreateTask = document.getElementById("btnCreateTask")
    if (user && user.role === "user" && btnCreateTask) {
        btnCreateTask.classList.remove("hidden")
    }

    // Cargar las tareas al inicializar la vista
    await loadTasks(user)

    // LÓGICA DE BÚSQUEDA POR TEXTO (Requerimiento README)
    const inputSearch = document.getElementById("inputSearch")
    if (inputSearch) {
        // Mantener el valor del input si ya existe en la URL
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has("search")) {
            inputSearch.value = urlParams.get("search")
        }

        inputSearch.addEventListener("input", async (e) => {
            const value = e.target.value.trim().toLowerCase()
            const url = new URL(window.location.href)
            
            if (value === "") {
                url.searchParams.delete("search")
            } else {
                url.searchParams.set("search", value)
            }
            window.history.pushState({}, "", url)
            await loadTasks(user)
        })
    }

    // Lógica para los botones de filtros de estado
    const filterButtons = document.querySelectorAll(".filter-btn")
    filterButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            const status = e.target.getAttribute("data-status")
            
            filterButtons.forEach(btn => {
                btn.classList.remove("bg-[#9FA1FF]", "text-white")
                btn.classList.add("bg-gray-50", "text-gray-700")
            })
            e.target.classList.remove("bg-gray-50", "text-gray-700")
            e.target.classList.add("bg-[#9FA1FF]", "text-white")

            const url = new URL(window.location.href)
            if (status === "all") {
                url.searchParams.delete("status") 
            } else {
                url.searchParams.set("status", status)
            }
            window.history.pushState({}, "", url) 

            await loadTasks(user)
        })
    })

    // Control del modal para crear nueva tarea
    const taskModal = document.getElementById("taskModal")
    const btnCancelTask = document.getElementById("btnCancelTask")
    const taskForm = document.getElementById("taskForm")

    if (btnCreateTask && taskModal) {
        btnCreateTask.addEventListener("click", () => {
            taskModal.classList.remove("hidden")
        })
    }

    if (btnCancelTask && taskForm && taskModal) {
        btnCancelTask.addEventListener("click", () => {
            taskModal.classList.add("hidden")
            taskForm.reset()
        })
    }

    if (taskForm) {
        taskForm.addEventListener("submit", async (e) => {
            e.preventDefault()
            const title = document.getElementById("taskTitle").value
            const description = document.getElementById("taskDescription").value

            const newTask = {
                id: crypto.randomUUID(),
                id_user: String(user.id), 
                title: title,
                description: description,
                status: "initial"
            }

            try {
                const response = await fetch("http://localhost:3000/todo_list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newTask)
                })

                if (response.ok) {
                    taskModal.classList.add("hidden")
                    taskForm.reset()
                    await loadTasks(user) 
                }
            } catch (error) {
                alert("No se pudo guardar la tarea.")
                console.error(error)
            }
        })
    }

    // Delegación de eventos para las acciones de cada tarea (Corregido para cumplir el README)
    const container = document.getElementById("tasks-container")
    if (container) {
        container.addEventListener("click", async (e) => {
            // Eliminar tarea (Solo Admin)
            if (e.target.classList.contains("btn-delete")) {
                const taskId = e.target.getAttribute("data-id")
                if (!confirm("¿Estás seguro de que deseas eliminar esta tarea?")) return

                try {
                    const response = await fetch(`http://localhost:3000/todo_list/${taskId}`, { method: "DELETE" })
                    if (response.ok) await loadTasks(user)
                } catch (error) {
                    console.error("Error al eliminar:", error)
                }
            }

            // Editar estado de tarea (¡Permitido tanto para Admin como para User según el README!)
            if (e.target.classList.contains("btn-edit")) {
                const taskId = e.target.getAttribute("data-id")
                const nuevoEstado = prompt("Cambiar estado a: initial, process o completed")?.toLowerCase().trim()

                if (["initial", "process", "completed"].includes(nuevoEstado)) {
                    try {
                        const response = await fetch(`http://localhost:3000/todo_list/${taskId}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: nuevoEstado })
                        })
                        if (response.ok) await loadTasks(user)
                    } catch (error) {
                        console.error("Error al editar:", error)
                    }
                } else if (nuevoEstado) {
                    alert("Estado no válido. Usa: initial, process o completed")
                }
            }
        })
    }
}

// Cargar, filtrar y renderizar las tareas incluyendo el filtro por texto
async function loadTasks(user) {
    const container = document.getElementById("tasks-container")
    if (!container) return
    
    const urlParams = new URLSearchParams(window.location.search)
    const statusFilter = urlParams.get("status") 
    const searchFilter = urlParams.get("search") // Captura la búsqueda por texto

    try {
        const [usersResponse, tasksResponse] = await Promise.all([
            fetch("http://localhost:3000/users"),
            fetch("http://localhost:3000/todo_list")
        ])
        
        const usersList = await usersResponse.json()
        let tasks = await tasksResponse.json()

        // 1. Filtrar por rol operativo
        if (user && user.role === "user") {
            tasks = tasks.filter(task => String(task.id_user).trim() === String(user.id).trim())
        }

        // 2. Filtrar por estado (Query Param 'status')
        if (statusFilter) {
            tasks = tasks.filter(task => task.status === statusFilter)
        }

        // 3. Filtrar por texto (Query Param 'search' - Exigido en README)
        if (searchFilter) {
            tasks = tasks.filter(task => 
                task.title.toLowerCase().includes(searchFilter) || 
                task.description.toLowerCase().includes(searchFilter)
            )
        }

        if (tasks.length === 0) {
            container.innerHTML = `<p class="text-gray-400 col-span-full text-center py-8 text-sm">No hay tareas que coincidan con los filtros establecidos.</p>`
            return
        }

        // Paleta exacta basada en tu imagen de Color Hunt
        const userColors = {
            "2": "bg-[#9FA1FF] text-white",     
            "3": "bg-[#AEE2FF] text-gray-800", 
            "default": "bg-[#B5BAFF] text-gray-800"
        }

        container.innerHTML = tasks.map(task => {
            const statusColors = {
                initial: "bg-gray-100 text-gray-600 border border-gray-200",
                process: "bg-amber-50 text-amber-700 border border-amber-200",
                completed: "bg-[#D9F9DF] text-emerald-800 border border-emerald-300" 
            }

            const owner = usersList.find(u => String(u.id) === String(task.id_user))
            const ownerName = owner ? owner.full_name : "Desconocido"
            const userStyle = userColors[task.id_user] || userColors["default"]

            // Renderizar botones según las reglas del README (El admin ahora tiene los dos botones)
            const actionButtons = user.role === 'admin'
                ? `
                   <button class="bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium text-xs px-3 py-2 rounded-xl transition-colors border border-gray-200 cursor-pointer btn-edit" data-id="${task.id}">Estado</button>
                   <button class="bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer btn-delete" data-id="${task.id}">Eliminar</button>
                  `
                : `<button class="bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium text-xs px-3.5 py-2 rounded-xl transition-colors border border-gray-200 cursor-pointer btn-edit" data-id="${task.id}">Editar Estado</button>`

            return `
            <div class="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col justify-between gap-5 transition-shadow relative">
                <div>
                    <div class="flex flex-wrap gap-2 justify-between items-center mb-3">
                        <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${userStyle}">
                            👤 ${ownerName}
                        </span>
                        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${statusColors[task.status]}">
                            ${task.status}
                        </span>
                    </div>

                    <h3 class="font-bold text-gray-900 text-base md:text-lg mb-1.5">${task.title}</h3>
                    <p class="text-gray-500 text-xs md:text-sm leading-relaxed">${task.description}</p>
                </div>
                
                <div class="flex justify-end gap-2 border-t border-gray-50 pt-3 mt-auto">
                    ${actionButtons}
                </div>
            </div>
            `
        }).join("")

    } catch (error) {
        console.error("Error cargando tareas:", error)
        container.innerHTML = `<p class="text-red-500 col-span-full text-center py-8 text-sm">Error al conectar con el servidor.</p>`
    }
}