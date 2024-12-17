const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("register-form").addEventListener("submit", async(e) => { // (e) es el evento
    e.preventDefault();
    // console.log(e.target.children.user.value);
    // console.log(e.target.children.email.value);
    // console.log(e.target.children.password.value);
    
    // Nos comunicamos con nuestro backend usando fetch
    const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: e.target.children.nombre.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value
        })        
    });

    if(!res.ok) return mensajeError.classList.toggle("invisible_visible", false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})