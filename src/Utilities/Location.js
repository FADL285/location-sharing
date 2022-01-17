const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export async function getAddressFromCoords(coordinates) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_MAPS_API_KEY}`
  );

  if (!response.ok)
    throw new Error('Failed to fetch coordinates, Please try again.');

  const data = await response.json();

  if (data.status !== 'OK')
    throw new Error('Invalid Address, Please try again.');

  const address = data.results[0].formatted_address;

  return address;
}

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  const response =
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_MAPS_API_KEY}
  `);

  if (!response.ok)
    throw new Error('Failed to fetch coordinates, Please try again.');

  const data = await response.json();

  if (data.status !== 'OK')
    throw new Error('Invalid Address, Please try again.');

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}
