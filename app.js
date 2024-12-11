// Sección de contenido
  //Mostrar descripción de consejos al pasar el mouse
  document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('#tips-list li');
    const descriptionBox = document.getElementById('description-box');
  
    listItems.forEach(item => {
      item.addEventListener('mouseenter', event => {
        const description = item.getAttribute('data-description');
        if (description) {
          descriptionBox.textContent = description;
          descriptionBox.style.display = 'block';
          descriptionBox.style.left = `${event.pageX + 10}px`;
          descriptionBox.style.top = `${event.pageY + 10}px`;
        }
      });
  
      item.addEventListener('mousemove', event => {
        descriptionBox.style.left = `${event.pageX + 10}px`;
        descriptionBox.style.top = `${event.pageY + 10}px`;
      });
  
      item.addEventListener('mouseleave', () => {
        descriptionBox.style.display = 'none';
      });
    });
  });


// Sección API
document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const recetaContainer = document.getElementById('receta-container');
    const modal = document.getElementById('modal');
    const modalDetails = document.getElementById('modal-details');
    const closeModal = document.querySelector('.close');
  
    // Función para obtener múltiples recetas
    async function obtenerRecetas(cantidad) {
      recetaContainer.innerHTML = '';
      const promises = [];
      for (let i = 0; i < cantidad; i++) {
        promises.push(fetch(apiURL).then((res) => res.json()));
      }
  
      try {
        const results = await Promise.all(promises);
        const recetas = results.map((result) => result.meals[0]);
        mostrarRecetas(recetas);
      } catch (error) {
        recetaContainer.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    }
  
    // Función para mostrar recetas
    function mostrarRecetas(recetas) {
      recetaContainer.innerHTML = recetas
        .map((receta) => {
          const { idMeal, strMeal, strMealThumb } = receta;
          return `
            <div class="receta" data-id="${idMeal}">
              <img src="${strMealThumb}" alt="${strMeal}" />
              <h3>${strMeal}</h3>
            </div>
          `;
        })
        .join('');
      agregarEventosRecetas(recetas);
    }
  
    // Agregar eventos a cada receta
    function agregarEventosRecetas(recetas) {
      const recetaElements = document.querySelectorAll('.receta');
      recetaElements.forEach((recetaElement) => {
        recetaElement.addEventListener('click', () => {
          const id = recetaElement.dataset.id;
          const recetaSeleccionada = recetas.find((receta) => receta.idMeal === id);
          mostrarModal(recetaSeleccionada);
        });
      });
    }
  
    // Mostrar el modal con detalles
    function mostrarModal(receta) {
      const {
        strMeal,
        strInstructions,
        strMealThumb,
        strCategory,
        strArea,
      } = receta;
  
      modalDetails.innerHTML = `
        <h3>${strMeal}</h3>
        <img src="${strMealThumb}" alt="${strMeal}">
        <p><strong>Categoría:</strong> ${strCategory}</p>
        <p><strong>Origen:</strong> ${strArea}</p>
        <p>${strInstructions}</p>
        
      `;
      modal.style.display = 'flex'; // Mostrar el modal
    }
  
    // Cerrar el modal
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Obtenemos 3 recetas al cargar la página
    obtenerRecetas(3);
  });
  

// Validamos el formulario

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// Función para validar los campos
function validateInput(input, regex, errorElementId) {
  const errorElement = document.getElementById(errorElementId);

  if (regex.test(input.value.trim())) {
    input.style.border = "2px solid lightgreen"; // Cambia el borde a verde claro
    input.style.backgroundColor = "rgba(144, 238, 144, 0.5)"; // Fondo verde claro
    errorElement.textContent = ""; // Limpia los mensajes de error
  } else {
    input.style.border = "2px solid red"; // Cambia el borde a rojo
    input.style.backgroundColor = "rgba(255, 99, 71, 0.5)"; // Fondo rojo claro
    errorElement.textContent = "Datos incorrectos"; // Mensaje de error
  }
}

// Validaciones individuales
nameInput.addEventListener("input", () => {
  validateInput(nameInput, /^[a-zA-Z\s]+$/, "name-error"); // Solo letras y espacios
});

emailInput.addEventListener("input", () => {
  validateInput(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email-error"); // Formato de email
});

messageInput.addEventListener("input", () => {
  validateInput(messageInput, /.+/, "message-error"); // No vacío
});

// Validación al enviar el formulario
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el envío por defecto

  // Validar todos los campos
  validateInput(nameInput, /^[a-zA-Z\s]+$/, "name-error");
  validateInput(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email-error");
  validateInput(messageInput, /.+/, "message-error");

  // Verificar si todo es válido
  if (
    /^[a-zA-Z\s]+$/.test(nameInput.value.trim()) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()) &&
    /.+/.test(messageInput.value.trim())
  ) {
    alert("Formulario enviado correctamente");
    form.reset(); // Reinicia el formulario
    document.querySelectorAll("input, textarea").forEach((input) => {
      input.style.border = "2px solid #ccc"; 
      input.style.backgroundColor = "#fff"; 
    });
  } else {
    alert("Por favor, corrige los campos en rojo");
  }
});


