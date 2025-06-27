export function renderStays(staysArray, container, showGuests = false) {
  container.innerHTML = "";

  staysArray.forEach(stay => {
    const card = document.createElement("div");
    card.className = "stay-card  ";

    card.innerHTML = `
      <img src="${stay.photo}" alt="${stay.title}" class="rounded-3xl w-full h-70 sm:h-60 md:h-70 lg:h-60 xl:h-80 2xl:h-90 object-cover">
      <div class="flex relative mt-2 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-200">
        ${stay.superHost ? `<span class="px-2 py-1 border rounded-full text-xs font-bold dark:bg-gray-900 dark:text-gray-100">SUPER HOST</span>` : ""}
        <span class="px-1">${stay.type}${stay.beds ? ` · ${stay.beds} beds` : ""}</span>
        <span class="flex absolute right-2 text-sm font-medium text-gray-600 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-600 " viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
          ${stay.rating}
        </span>
      </div>
      ${showGuests ? `<p class="text-gray-500 px-1 text-sm">Max guests: ${stay.maxGuests}</p>` : ""}
      <h3 class="font-semibold m-1 dark:text-gray-100">${stay.title}</h3>
    `;

    container.appendChild(card);
  });
}
