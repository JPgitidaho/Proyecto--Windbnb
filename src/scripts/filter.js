// filter.js

import { stays } from './stays.js';
import { renderStays } from './render.js';
import { renderDropdownWithClick, setupCounter, updateGuestInput } from './utils.js';

export function setupFilters() {
  const staysContainer = document.getElementById("stays-container");
  const openSearch = document.getElementById("openSearch");
  const searchModal = document.getElementById("searchModal");
  const closeModal = document.getElementById("closeModal");
  const inputCity = document.getElementById("ciudades");
  const inputGuests = document.getElementById("guests");
  const dropdownCity = document.getElementById("dropdown-ciudades");
  const dropdownGuests = document.getElementById("dropdown-guests");

  const searchModalCelular = document.getElementById("searchModalCelular");
  const closeModalCelular = document.getElementById("closeModalCelular");
  const inputCityCelular = document.getElementById("ciudades-celular");
  const inputGuestsCelular = document.getElementById("guests-celular");
  const dropdownCityCelular = document.getElementById("dropdown-ciudades-celular");
  const dropdownGuestsCelular = document.getElementById("dropdown-guests-celular");
  const searchBtn = document.getElementById("searchBtn");
  const searchBtnCelular = document.getElementById("searchBtn-celular");

  // Estado interno de invitados
  const counts = { adult: 1, child: 0 };
  const uniqueCities = [...new Set(stays.map(stay => stay.city))];
  const guestOptions = Array.from({ length: 8 }, (_, i) => i + 1);

  // Render inicial
  renderStays(stays, staysContainer);
 

function updateCityCountText(array) {
  const cityCountSpan = document.getElementById("city-count");
  if (!cityCountSpan) return;

  if (!array) {
    cityCountSpan.textContent = "12+ stays";
    return;
  }

  const totalStays = array.length;
  cityCountSpan.textContent = totalStays === 0
    ? "No stays available"
    : `${totalStays} stay${totalStays !== 1 ? 's' : ''} available`;
}

  renderStays(stays, staysContainer);
  updateCityCountText(null, true);

  // Abrir/cerrar modales desktop/móvil
  openSearch.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      searchModalCelular.classList.replace("hidden", "flex");
    } else {
      searchModal.classList.replace("hidden", "flex");
    }
  });

  closeModal.addEventListener("click", () => {
    searchModal.classList.replace("flex", "hidden");
  });

  searchModal.addEventListener("click", e => {
    if (e.target === searchModal) {
      searchModal.classList.replace("flex", "hidden");
    }
  });

  closeModalCelular.addEventListener("click", () => {
    searchModalCelular.classList.replace("flex", "hidden");
  });

  searchModalCelular.addEventListener("click", e => {
    if (e.target === searchModalCelular) {
      searchModalCelular.classList.replace("flex", "hidden");
    }
  });

  // Setup autocomplete con renderDropdownWithClick (que actualiza conteo)
  function setupAutocomplete(inputElement, dropdownElement, options, formatFn, filterFn = (q, opt) => opt.toLowerCase().includes(q.toLowerCase())) {
    inputElement.addEventListener("input", () => {
      const query = inputElement.value;
      const filtered = options.filter(opt => filterFn(query, opt));
      renderDropdownWithClick(filtered, dropdownElement, inputElement, formatFn, counts, inputGuests, inputGuestsCelular);
    });

    inputElement.addEventListener("focus", () => {
      renderDropdownWithClick(options, dropdownElement, inputElement, formatFn, counts, inputGuests, inputGuestsCelular);
    });
  }

  // Llamadas setup autocomplete para inputs desktop y móvil
  setupAutocomplete(inputCity, dropdownCity, uniqueCities, city => `${city}, Finland`);
  setupAutocomplete(inputGuests, dropdownGuests, guestOptions, num => `${num} guest${num > 1 ? 's' : ''}`, (q, num) => num.toString().startsWith(q));
  setupAutocomplete(inputCityCelular, dropdownCityCelular, uniqueCities, city => `${city}, Finland`);
  setupAutocomplete(inputGuestsCelular, dropdownGuestsCelular, guestOptions, num => `${num} guest${num > 1 ? 's' : ''}`, (q, num) => num.toString().startsWith(q));

  // Ocultar dropdowns al hacer click afuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#ciudades")) dropdownCity.classList.add("hidden");
    if (!e.target.closest("#guests")) dropdownGuests.classList.add("hidden");
    if (!e.target.closest("#ciudades-celular")) dropdownCityCelular.classList.add("hidden");
    if (!e.target.closest("#guests-celular")) dropdownGuestsCelular.classList.add("hidden");
  });

  // Setup contadores botones + y - para adultos y niños
  setupCounter("adult-minus", "adult-plus", "adult", counts, "adult-count", () => updateGuestInput(inputGuests, inputGuestsCelular, counts));
  setupCounter("child-minus", "child-plus", "child", counts, "child-count", () => updateGuestInput(inputGuests, inputGuestsCelular, counts));
  setupCounter("adult-minus-escritorio", "adult-plus-escritorio", "adult", counts, "adult-count-escritorio", () => updateGuestInput(inputGuests, inputGuestsCelular, counts));
  setupCounter("child-minus-escritorio", "child-plus-escritorio", "child", counts, "child-count-escritorio", () => updateGuestInput(inputGuests, inputGuestsCelular, counts));

  // Inicializar contadores en UI
  document.getElementById("adult-count").textContent = counts.adult;
  document.getElementById("child-count").textContent = counts.child;
  document.getElementById("adult-count-escritorio").textContent = counts.adult;
  document.getElementById("child-count-escritorio").textContent = counts.child;
  updateGuestInput(inputGuests, inputGuestsCelular, counts);

  // Función que filtra stays según ciudad e invitados, luego renderiza y actualiza contador
function updateCityCountText(array, inicial = false) {
    const cityCountSpan = document.getElementById("city-count");
    if (!cityCountSpan) return;

    if (inicial) {
      cityCountSpan.textContent = "12+ stays";
      return;
    }

    if (!array || array.length === 0) {
      cityCountSpan.textContent = "No stays available";
      return;
    }

    const totalStays = array.length;
    cityCountSpan.textContent = `${totalStays} stay${totalStays !== 1 ? 's' : ''} available`;
  }

  function handleSearch(cityInput, guestInput, modal, isMobile = false) {
    const city = cityInput.value.trim().toLowerCase();

    let guestCount;
    if (isMobile) {
      guestCount = counts.adult + counts.child;
    } else {
      const match = guestInput.value.match(/\d+/);
      guestCount = match ? parseInt(match[0]) : 0;
    }

    const filtered = stays.filter(stay => {
      const matchesCity = city ? stay.city.toLowerCase() === city : true;
      const matchesGuests = guestCount ? stay.maxGuests >= guestCount : true;
      return matchesCity && matchesGuests;
    });

    renderStays(filtered, staysContainer, true);
updateCityCountText(filtered);

    modal.classList.replace("flex", "hidden");
  }

  // Eventos para botones de búsqueda (desktop y móvil)
  searchBtn.addEventListener("click", () => handleSearch(inputCity, inputGuests, searchModal, false));
  searchBtnCelular.addEventListener("click", () => handleSearch(inputCityCelular, inputGuestsCelular, searchModalCelular, true));
}
