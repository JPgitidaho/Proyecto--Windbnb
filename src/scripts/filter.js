import { stays } from './stays.js';
import { renderStays } from './utils.js';

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

  renderStays(stays, staysContainer);
  searchBtn
  openSearch.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      searchModalCelular.classList.remove("hidden");
      searchModalCelular.classList.add("flex");
    } else {
      searchModal.classList.remove("hidden");
      searchModal.classList.add("flex");
    }
  });

  closeModal.addEventListener("click", () => {
    searchModal.classList.add("hidden");
    searchModal.classList.remove("flex");
  });

  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.classList.add("hidden");
      searchModal.classList.remove("flex");
    }
  });

  closeModalCelular.addEventListener("click", () => {
    searchModalCelular.classList.add("hidden");
    searchModalCelular.classList.remove("flex");
  });

  searchModalCelular.addEventListener("click", (e) => {
    if (e.target === searchModalCelular) {
      searchModalCelular.classList.add("hidden");
      searchModalCelular.classList.remove("flex");
    }
  });

  const uniqueCities = [...new Set(stays.map(stay => stay.city))];
  const guestOptions = Array.from({ length: 8 }, (_, i) => i + 1);

  function setupAutocomplete(inputElement, dropdownElement, options, formatFn, filterFn = (q, opt) => opt.toLowerCase().includes(q.toLowerCase())) {
    inputElement.addEventListener("input", () => {
      const query = inputElement.value;
      const filtered = options.filter(opt => filterFn(query, opt));
      renderDropdown(filtered, dropdownElement, inputElement, formatFn);
    });

    inputElement.addEventListener("focus", () => {
      renderDropdown(options, dropdownElement, inputElement, formatFn);
    });
  }

  function renderDropdown(items, dropdown, input, formatFn) {
    dropdown.innerHTML = "";
    dropdown.classList.remove("hidden");

    items.forEach(item => {
      const li = document.createElement("li");
      li.className = "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer";

      const icon = document.createElement("span");
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 10c4.418-4.418 7-7.373 7-10a7 7 0 10-14 0c0 2.627 2.582 5.582 7 10z" />
    </svg>`;
      const text = document.createElement("span");
      text.textContent = formatFn(item);

      li.appendChild(icon);
      li.appendChild(text);

      li.addEventListener("click", () => {
        input.value = item;
        dropdown.classList.add("hidden");

        // Actualiza los contadores si es un input de invitados
        if (input.id === "guests" && window.innerWidth >= 768) {
          counts.adult = parseInt(item); 
          counts.child = 0;
          updateGuestInput();
          document.getElementById("adult-count-escritorio").textContent = counts.adult;
          document.getElementById("child-count-escritorio").textContent = counts.child;
          document.getElementById("guest-counter")?.classList.remove("hidden");
        }

        if (input.id === "guests-celular" && window.innerWidth < 768) {
          counts.adult = parseInt(item); 
          counts.child = 0;
          updateGuestInput();
          document.getElementById("adult-count").textContent = counts.adult;
          document.getElementById("child-count").textContent = counts.child;
          document.getElementById("guest-counter-celular")?.classList.remove("hidden");
        }
      });

      dropdown.appendChild(li);
    });
  }


  setupAutocomplete(inputCity, dropdownCity, uniqueCities, city => `${city}, Finland`);
  setupAutocomplete(inputGuests, dropdownGuests, guestOptions, num => `${num} guest${num > 1 ? 's' : ''}`, (q, num) => num.toString().startsWith(q));
  setupAutocomplete(inputCityCelular, dropdownCityCelular, uniqueCities, city => `${city}, Finland`);
  setupAutocomplete(inputGuestsCelular, dropdownGuestsCelular, guestOptions, num => `${num} guest${num > 1 ? 's' : ''}`, (q, num) => num.toString().startsWith(q));

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#ciudades")) dropdownCity.classList.add("hidden");
    if (!e.target.closest("#guests")) dropdownGuests.classList.add("hidden");
    if (!e.target.closest("#ciudades-celular")) dropdownCityCelular.classList.add("hidden");
    if (!e.target.closest("#guests-celular")) dropdownGuestsCelular.classList.add("hidden");
  });

  const counts = { adult: 1, child: 0 };

  function updateGuestInput() {
    const total = counts.adult + counts.child;
    inputGuestsCelular.value = `${total} guest${total !== 1 ? 's' : ''}`;
    inputGuests.value = `${total} guest${total !== 1 ? 's' : ''}`;
  }

  function setupCounter(minusId, plusId, countKey, labelId) {
    document.getElementById(minusId)?.addEventListener("click", () => {
      if (counts[countKey] > (countKey === 'adult' ? 1 : 0)) {
        counts[countKey]--;
        document.getElementById(labelId).textContent = counts[countKey];
        updateGuestInput();
      }
    });

    document.getElementById(plusId)?.addEventListener("click", () => {
      counts[countKey]++;
      document.getElementById(labelId).textContent = counts[countKey];
      updateGuestInput();
    });
  }

  setupCounter("adult-minus", "adult-plus", "adult", "adult-count");
  setupCounter("child-minus", "child-plus", "child", "child-count");
  setupCounter("adult-minus-escritorio", "adult-plus-escritorio", "adult", "adult-count-escritorio");
  setupCounter("child-minus-escritorio", "child-plus-escritorio", "child", "child-count-escritorio");

  document.getElementById("adult-count").textContent = counts.adult;
  document.getElementById("child-count").textContent = counts.child;
  document.getElementById("adult-count-escritorio").textContent = counts.adult;
  document.getElementById("child-count-escritorio").textContent = counts.child;
  updateGuestInput();

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

  renderStays(filtered, staysContainer); 
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

searchBtn.addEventListener("click", () => {
  console.log("Botón escritorio clickeado");
  handleSearch(inputCity, inputGuests, searchModal, false);
});

searchBtnCelular.addEventListener("click", () => {
  console.log("Botón celular clickeado");
  handleSearch(inputCityCelular, inputGuestsCelular, searchModalCelular, true);
});

}