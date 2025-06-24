export function filterStays(stays, city, guests) {
  return stays.filter(stay =>
    (city ? stay.city.toLowerCase() === city.toLowerCase() : true) &&
    stay.maxGuests >= guests
  );
}
