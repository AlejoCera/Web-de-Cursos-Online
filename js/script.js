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
function agregarCursoAlDOM(curso, index) {
    const li = document.createElement('li');
    li.textContent = curso.nombre;

    // Crear botón para eliminar físicamente (ya lo tienes implementado)
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'X'; // Texto del botón de eliminar
    btnEliminar.classList.add('btn-eliminar'); // Añadir una clase para estilo
    li.appendChild(btnEliminar); 

    // Crear botón para tachar (borrado lógico)
    const btnTachar = document.createElement('button');
    btnTachar.textContent = curso.tachado ? 'Deshacer tachado' : 'Tachar';
    btnTachar.classList.add('btn-tachar');
    li.appendChild(btnTachar);

    // Crear botón para editar
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.classList.add('btn-editar');
    li.appendChild(btnEditar);

    // Aplicar tachado visual si el curso está marcado como "tachado"
    if (curso.tachado) {
        li.style.textDecoration = 'line-through';
    }

    // Añadir el <li> dentro del <ul>
    ul.appendChild(li);

    // Evento para eliminar curso físicamente (ya lo tienes implementado)
    btnEliminar.addEventListener('click', function() {
        const cursos = obtenerCursosDeLocalStorage();
        cursos.splice(index, 1); // Eliminar el curso completamente
        guardarCursosEnLocalStorage(cursos);
        location.reload(); // Recargar la página para ver los cambios
    });

    // Evento para tachar el curso (borrado lógico)
    btnTachar.addEventListener('click', function() {
        const cursos = obtenerCursosDeLocalStorage();
        cursos[index].tachado = !cursos[index].tachado; // Alternar entre tachado y no tachado
        guardarCursosEnLocalStorage(cursos);
        location.reload(); // Recargar la página para ver los cambios
    });

    // Evento para editar el curso
    btnEditar.addEventListener('click', function() {
        const cursos = obtenerCursosDeLocalStorage();
        
        // Crear un input de texto para editar el curso
        const inputEditar = document.createElement('input');
        inputEditar.type = 'text';
        inputEditar.value = curso.nombre;
        
        // Reemplazar el contenido del <li> con el campo de texto
        li.innerHTML = ''; // Vaciar el contenido del <li>
        li.appendChild(inputEditar);
        
        // Crear un botón para guardar los cambios
        const btnGuardar = document.createElement('button');
        btnGuardar.textContent = 'Guardar';
        li.appendChild(btnGuardar);

        // Guardar el nuevo nombre del curso
        btnGuardar.addEventListener('click', function() {
            const nuevoNombre = inputEditar.value.trim();
            if (nuevoNombre !== '') {
                cursos[index].nombre = nuevoNombre; // Actualizar el nombre del curso
                guardarCursosEnLocalStorage(cursos); // Guardar los cambios en Local Storage
                location.reload(); // Recargar la página para ver el cambio
            }
        });
    });
}

// Cargar los cursos del Local Storage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const cursos = obtenerCursosDeLocalStorage(); // Obtener cursos guardados
    if (cursos.length > 0) {
        cursos.forEach((curso, index) => agregarCursoAlDOM(curso, index)); // Agregar cada curso al DOM
    } else {
        mensajeVacio.style.display = 'block'; // Mostrar mensaje si no hay cursos
    }
});

// Agregar evento al formulario para agregar cursos
formAgregarCurso.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que se recargue la página al enviar el formulario
    
    const curso = inputCurso.value.trim(); // Obtener el valor del input
    if (curso !== "") {
        // Guardar el curso en Local Storage
        const cursos = obtenerCursosDeLocalStorage();
        cursos.push({ nombre: curso, tachado: false }); // Añadir el curso con el estado "tachado" en falso
        guardarCursosEnLocalStorage(cursos); // Guardar el array actualizado en Local Storage
        
        // Limpiar el campo de texto
        inputCurso.value = '';
        location.reload(); // Recargar la página para ver el nuevo curso
    }
});