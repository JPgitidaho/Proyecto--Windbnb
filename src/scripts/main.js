import { stays } from './stays.js';

const staysContainer = document.getElementById("stays-container");

function renderStays(stays) {
    staysContainer.innerHTML = "";
    stays.forEach(stay => {
        const card = document.createElement("div");
        card.className = "bg-red-500 rounded-3xl overflow-hidden pb-4 hover:shadow-lg transition ";

        card.innerHTML = `
        <img src="${stay.photo}" alt="${stay.title}" class="w-full h-[300px] object-cover rounded-3xl" />
        <div class="flex justify-between text-sm text-gray-600">
            <div class="flex gap-2 ">
                <span class="mt-2">${stay.superHost? '<span class="border border-gray-800 rounded-full ml-0.5 py-0.5 px-2 text-xs font-bold">SUPER HOST</span>': ''}</span>
                <p class="text-sm pt-2 text-gray-500">${stay.type}${stay.beds ? ` · ${stay.beds} beds` : ''}</p>
            </div>
            <span class="flex items-center p-2 text-red-500 font-semibold">★ ${stay.rating}</span>
        </div>
      <h3 class="font-semibold text-lg ml-2">${stay.title}</h3>
        `;

        staysContainer.appendChild(card);
    });
}

renderStays(stays);




