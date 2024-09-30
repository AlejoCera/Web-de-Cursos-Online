// Seleccionar los elementos del DOM
const inputCurso = document.querySelector('#inputCurso'); // Campo de texto para el curso
const formAgregarCurso = document.querySelector('#formAgregarCurso'); // Formulario de agregar curso
const ul = document.querySelector('#listaCursos'); // Lista de cursos
const mensajeVacio = document.querySelector('.vacio'); // Mensaje cuando no hay cursos

// Agregar evento al formulario para agregar cursos
formAgregarCurso.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que se recargue la página al enviar el formulario
    
    const curso = inputCurso.value.trim(); // Obtener el valor del input
    if (curso !== "") {
        // Crear nuevo elemento <li>
        const li = document.createElement('li');
        li.textContent = curso; // Establecer el texto del curso
        
        // Crear botón para eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'X'; // Texto del botón de eliminar
        btnEliminar.classList.add('btn-eliminar'); // Añadir una clase para estilo
        li.appendChild(btnEliminar); // Añadir el botón dentro del <li>
        
        // Añadir el <li> dentro del <ul>
        ul.appendChild(li);
        
        // Ocultar el mensaje de "lista vacía"
        mensajeVacio.style.display = 'none';
        
        // Limpiar el campo de texto
        inputCurso.value = '';
        
        // Evento para eliminar curso
        btnEliminar.addEventListener('click', function() {
            li.remove(); // Eliminar el <li> del DOM
            if (ul.children.length === 0) {
                mensajeVacio.style.display = 'block'; // Mostrar mensaje si la lista queda vacía
            }
        });
    }
});
