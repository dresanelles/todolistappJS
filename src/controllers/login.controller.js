export async function loginController(){
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (event)=>{
        event.preventDefault()

        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        if (!username || !password){
            alert("The fields are required!!")
            return
        }

        const userData = await loginFunction(username, password)
        console.log("data", userData);
        
        // CORRECCIÓN: Se Valida que el arreglo contenga al menos un usuario válido
        if(userData && userData.length > 0){
            localStorage.setItem("user", JSON.stringify(userData[0]))
            window.location.href = "#home"
        }else{
            alert("User or password are wrong!!!")
        }

        // ANTES
        //  if(userData){
        //     localStorage.setItem("user", JSON.stringify(userData[0]))
        //     window.location.href = "#home"
        // }else{
        //     alert("User or password are wrong!!!")
        // }
    })
}

async function loginFunction(username, password){
    // Hacemos la consulta usando los parámetros de búsqueda en la URL
    const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`)
    const data = await response.json()
    return data
}