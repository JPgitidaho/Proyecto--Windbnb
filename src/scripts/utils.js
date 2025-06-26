/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */

export function renderStays(data, staysContainer) {
  staysContainer.innerHTML = "";
  data.forEach(stay => {
    const card = document.createElement("div");
    card.className = "bg-transparent rounded-sm pb-4";

    card.innerHTML = `
      <img src="${stay.photo}" alt="${stay.title}" class="w-full h-72 object-cover rounded-3xl" />
      <div class="flex justify-between text-sm text-gray-600 pt-2">
        <div class="flex gap-2">
          ${stay.superHost ? '<span class="border border-gray-800 rounded-full py-0.5 px-2 text-xs font-bold">SUPERHOST</span>' : ''}
          <p class="text-sm px-2 text-gray-500">${stay.type}${stay.beds ? ` · ${stay.beds} beds` : ''}</p>
        </div>
        <span class="flex items-center px-2 text-red-500 font-semibold">★ ${stay.rating}</span>
      </div>
      <h3 class="font-semibold text-lg px-2">${stay.title}</h3>
    `;
    staysContainer.appendChild(card);
  });
}
