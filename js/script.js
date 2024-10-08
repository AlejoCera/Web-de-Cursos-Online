// Seleccionar los elementos del DOM
const inputCurso = document.querySelector('#inputCurso'); // Campo de texto para el curso
const formAgregarCurso = document.querySelector('#formAgregarCurso'); // Formulario de agregar curso
const ul = document.querySelector('#listaCursos'); // Lista de cursos
const mensajeVacio = document.querySelector('.vacio'); // Mensaje cuando no hay cursos

// Función para guardar cursos en el Local Storage
function guardarCursosEnLocalStorage(cursos) {
    localStorage.setItem('cursos', JSON.stringify(cursos)); // Convertir el array de cursos a string y guardarlo
}

// Función para obtener los cursos del Local Storage
function obtenerCursosDeLocalStorage() {
    const cursosGuardados = localStorage.getItem('cursos'); // Obtener los cursos
    return cursosGuardados ? JSON.parse(cursosGuardados) : []; // Convertir el string a array o retornar un array vacío si no hay nada
}

// Función para agregar un curso al DOM
function agregarCursoAlDOM(curso) {
    const li = document.createElement('li');
    li.textContent = curso;

    // Crear botón para eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'X'; // Texto del botón de eliminar
    btnEliminar.classList.add('btn-eliminar'); // Añadir una clase para estilo
    li.appendChild(btnEliminar); // Añadir el botón dentro del <li>
    
    // Añadir el <li> dentro del <ul>
    ul.appendChild(li);
    
    // Ocultar el mensaje de "lista vacía"
    mensajeVacio.style.display = 'none';

    // Evento para eliminar curso
    btnEliminar.addEventListener('click', function() {
        li.remove(); // Eliminar el <li> del DOM

        // Eliminar curso del Local Storage
        const cursos = obtenerCursosDeLocalStorage();
        const nuevosCursos = cursos.filter(c => c !== curso);
        guardarCursosEnLocalStorage(nuevosCursos);

        if (ul.children.length === 0) {
            mensajeVacio.style.display = 'block'; // Mostrar mensaje si la lista queda vacía
        }
    });
}

// Cargar los cursos del Local Storage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const cursos = obtenerCursosDeLocalStorage(); // Obtener cursos guardados
    if (cursos.length > 0) {
        cursos.forEach(curso => agregarCursoAlDOM(curso)); // Agregar cada curso al DOM
    } else {
        mensajeVacio.style.display = 'block'; // Mostrar mensaje si no hay cursos
    }
});

// Agregar evento al formulario para agregar cursos
formAgregarCurso.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que se recargue la página al enviar el formulario
    
    const curso = inputCurso.value.trim(); // Obtener el valor del input
    if (curso !== "") {
        // Agregar el curso al DOM
        agregarCursoAlDOM(curso);
        
        // Guardar el curso en Local Storage
        const cursos = obtenerCursosDeLocalStorage();
        cursos.push(curso); // Añadir el nuevo curso al array
        guardarCursosEnLocalStorage(cursos); // Guardar el array actualizado en Local Storage
        
        // Limpiar el campo de texto
        inputCurso.value = '';
    }
});