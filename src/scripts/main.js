import { stays } from './stays.js';

document.addEventListener("DOMContentLoaded", () => {
  const staysContainer = document.getElementById("stays-container");
  const openSearch = document.getElementById("openSearch");
  const searchModal = document.getElementById("searchModal");
  const closeModal = document.getElementById("closeModal");

  const inputCity = document.getElementById("ciudades");
  const inputGuests = document.getElementById("guests");
  const dropdownCity = document.getElementById("dropdown-ciudades");
  const dropdownGuests = document.getElementById("dropdown-guests");

  // Render inicial
  renderStays(stays);

  function renderStays(data) {
    staysContainer.innerHTML = "";
    data.forEach(stay => {
      const card = document.createElement("div");
      card.className = "bg-transparent rounded-sm  pb-4 hover:shadow-lg transition";

      card.innerHTML = `
        <img src="${stay.photo}" alt="${stay.title}" class="w-full  object-cover rounded-3xl" />
        <div class="flex justify-between text-sm text-gray-600 px-2 pt-2">
          <div class="flex gap-2">
            ${stay.superHost ? '<span class="border border-gray-800 rounded-full py-0.5 px-2 text-xs font-bold">SUPER HOST</span>' : ''}
            <p class="text-sm text-gray-500">${stay.type}${stay.beds ? ` · ${stay.beds} beds` : ''}</p>
          </div>
          <span class="flex items-center text-red-500 font-semibold">★ ${stay.rating}</span>
        </div>
        <h3 class="font-semibold text-lg px-2">${stay.title}</h3>
      `;
      staysContainer.appendChild(card);
    });
  }

  // Abrir modal
  openSearch.addEventListener("click", () => {
    searchModal.classList.remove("hidden");
    searchModal.classList.add("flex");
  });

  // Cerrar modal
  closeModal.addEventListener("click", () => {
    searchModal.classList.add("hidden");
    searchModal.classList.remove("flex");
  });

  // Cerrar modal al hacer clic fuera
  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.classList.add("hidden");
      searchModal.classList.remove("flex");
    }
  });

  // ------------------------------
  // AUTOCOMPLETE DE CIUDADES
  // ------------------------------
  const uniqueCities = [...new Set(stays.map(stay => stay.city))];

  inputCity.addEventListener("input", () => {
    const query = inputCity.value.toLowerCase();
    const filtered = uniqueCities.filter(city => city.toLowerCase().includes(query));
    renderCityDropdown(filtered);
  });

  inputCity.addEventListener("focus", () => {
    renderCityDropdown(uniqueCities);
  });

  function renderCityDropdown(cities) {
    dropdownCity.innerHTML = "";
    dropdownCity.classList.remove("hidden");

    cities.forEach(city => {
      const li = document.createElement("li");
      li.className = "px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer";
      li.textContent = `${city}, Finland`;
      li.addEventListener("click", () => {
        inputCity.value = city;
        dropdownCity.classList.add("hidden");
      });
      dropdownCity.appendChild(li);
    });
  }

  // ------------------------------
  // SELECT DE HUÉSPEDES
  // ------------------------------
  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  inputGuests.addEventListener("focus", () => {
    renderGuestsDropdown(guestOptions);
  });

  inputGuests.addEventListener("input", () => {
    const query = inputGuests.value;
    const filtered = guestOptions.filter(num => num.toString().startsWith(query));
    renderGuestsDropdown(filtered);
  });

  function renderGuestsDropdown(guests) {
    dropdownGuests.innerHTML = "";
    dropdownGuests.classList.remove("hidden");

    guests.forEach(num => {
      const li = document.createElement("li");
      li.className = "px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer";
      li.textContent = `${num} guest${num > 1 ? "s" : ""}`;
      li.addEventListener("click", () => {
        inputGuests.value = num;
        dropdownGuests.classList.add("hidden");
      });
      dropdownGuests.appendChild(li);
    });
  }

  // ------------------------------
  // Ocultar dropdowns al hacer clic fuera
  // ------------------------------
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#ciudades") && !e.target.closest("#dropdown-ciudades")) {
      dropdownCity.classList.add("hidden");
    }
    if (!e.target.closest("#guests") && !e.target.closest("#dropdown-guests")) {
      dropdownGuests.classList.add("hidden");
    }
  });
});
