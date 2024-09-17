document.addEventListener("DOMContentLoaded", function () {
  console.log("Página cargada y lista.");

  const enlaces = document.querySelectorAll("nav ul li a");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      const seccion = document.querySelector(this.getAttribute("href"));
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
});

let currentIndex = 0;
let characters = [];
var idP;

function mostrarPersonaje() {
  idP = 1;
  $.ajax({
    type: "GET",
    url: "https://dragonball-api.com/api/characters?page=1&limit=35",
    success: function (data) {
      characters = data.items;
      createCarousel();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error fetching data: ", textStatus, errorThrown);
      $("#personajesDB").html(
        "<p>Error al cargar los personajes. Por favor, intenta más tarde.</p>"
      );
    },
  });
}
// crear el carrusel de imagenes
function createCarousel() {
  const carouselContainer = document.getElementById("personajesDB");
  carouselContainer.innerHTML = ""; // Limpiar el contenedor
  console.log(characters);
  characters.forEach((character, index) => {
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    var img = document.createElement("img");
    img.src = character.image;
    img.alt = character.name;
    item.appendChild(img);
    var info = document.createElement("input");
    info.type = "hidden";
    info.value = character.id;
    item.appendChild(info);
    if (index === 0) item.classList.add("active");
    var nombre = document.createElement("h2");
    nombre.textContent = character.name;
    item.appendChild(nombre);

    // Ki: ${character.ki}<br>
    // MaxKi: ${character.maxKi}<br>
    // Raza: ${character.race}<br>
    // Género: ${character.gender}
    const button = document.createElement("button");
    button.textContent = "Ver más";
    button.onclick = () => verMas(idP);
    item.appendChild(button);
    // item.onclick = () => id(character.id);
    carouselContainer.appendChild(item);
  });

  // Agregar botones de navegación
  const prevButton = document.createElement("button");
  prevButton.innerHTML = "&#10094;";
  prevButton.classList.add("carousel-button", "prev");
  prevButton.onclick = () => changeSlide(-1);

  const nextButton = document.createElement("button");
  nextButton.innerHTML = "&#10095;";
  nextButton.classList.add("carousel-button", "next");
  nextButton.onclick = () => changeSlide(1);

  carouselContainer.appendChild(prevButton);
  carouselContainer.appendChild(nextButton);
}

function changeSlide(direction) {
  const items = document.querySelectorAll(".carousel-item");
  items[currentIndex].classList.remove("active");


  idP += direction;

  currentIndex += direction;
  if (currentIndex >= items.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = items.length - 1;
  if (idP >= items.length) idP = 1;
  if (idP < 1) idP = items.length;

  items[currentIndex].classList.add("active");
}

$(document).ready(mostrarPersonaje);

function verMas(id) {
  $.ajax({
    type: "GET",
    url: "https://dragonball-api.com/api/characters/" + id,
    success: function (data) {
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
      var characterImage = document.getElementById("characterImage");
      document.getElementById("modalImage").src = data["image"];

      // genero
      var g = "";
      if (data["gender"] == "Female") {
        g = "Femenino";
      } else {
        g = "Masculino";
      }
      document.getElementById("modalDescription").innerHTML = `
<h2> ${data["name"]} </h2>
<p><strong>Nombre:</strong> ${data["name"]}</p>
<p><strong>Ki:</strong> ${data["ki"]}</p>
<p><strong>Max Ki:</strong> ${data["maxKi"]}</p>
<p><strong>Raza:</strong> ${data["race"]}</p>
<p><strong>Género:</strong> ${g}</p>
<p><strong>Afiliación:</strong> ${data["affiliation"]}</p>
<p><strong>Descripción:</strong> ${data["description"]}</p>
<p><strong>Planeta de origen:</strong> ${data.originPlanet["name"]}</p>
<img src="${data.originPlanet["image"]}" alt="Planeta de origen" style="width:100%; max-width:300px;" />
<p><strong>Descripción del planeta:</strong> ${data.originPlanet["description"]}</p>
`;

      modal.style.display = "block";

      span.onclick = function () {
        modal.style.display = "none";
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    },
  });
}
