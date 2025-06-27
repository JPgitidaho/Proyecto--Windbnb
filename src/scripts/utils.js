/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.*/
// utils.js

export function renderDropdown(items, dropdown, input, formatFn) {
  dropdown.innerHTML = "";
  dropdown.classList.remove("hidden");

  items.forEach(item => {
    const li = document.createElement("li");
    li.className = "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer bg-transparent";

    const icon = document.createElement("span");
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      input.dispatchEvent(new Event('change'));
    });

    dropdown.appendChild(li);
  });
}

export function setupCounter(minusId, plusId, countKey, counts, labelId, updateGuestInputFn) {
  document.getElementById(minusId)?.addEventListener("click", () => {
    if (counts[countKey] > (countKey === 'adult' ? 1 : 0)) {
      counts[countKey]--;
      document.getElementById(labelId).textContent = counts[countKey];
      updateGuestInputFn();
    }
  });

  document.getElementById(plusId)?.addEventListener("click", () => {
    counts[countKey]++;
    document.getElementById(labelId).textContent = counts[countKey];
    updateGuestInputFn();
  });
}

// Actualiza el texto de invitados en inputs (desktop y móvil)
export function updateGuestInput(inputGuests, inputGuestsCelular, counts) {
  const total = counts.adult + counts.child;
  const text = `${total} guest${total !== 1 ? 's' : ''}`;
  inputGuests.value = text;
  inputGuestsCelular.value = text;
}

// Renderiza dropdown pero además maneja el estado counts y actualiza contadores
// Esta función es específica para usarse en filter.js porque depende de estados y UI específicos
export function renderDropdownWithClick(items, dropdown, input, formatFn, counts, inputGuests, inputGuestsCelular) {
  dropdown.innerHTML = "";
  dropdown.classList.remove("hidden");

  items.forEach(item => {
    const li = document.createElement("li");
    li.className = "flex items-center gap-2 px-4 py-2 text-sm cursor bg-white dark:bg-gray-900 dark:text-gray-100";

    const icon = document.createElement("span");
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      input.dispatchEvent(new Event('change'));

      if (counts && input.id.includes("guests")) {
        const isMobile = input.id.includes("celular");
        const guestValue = parseInt(item);
        counts.adult = guestValue;
        counts.child = 0;
        updateGuestInput(inputGuests, inputGuestsCelular, counts);

        document.getElementById(isMobile ? "adult-count" : "adult-count-escritorio").textContent = counts.adult;
        document.getElementById(isMobile ? "child-count" : "child-count-escritorio").textContent = counts.child;
        document.getElementById(isMobile ? "guest-counter-celular" : "guest-counter")?.classList.remove("hidden");
      }
    });

    dropdown.appendChild(li);
  });
}
