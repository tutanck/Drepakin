export default function getLocation() {
  return new Promise((resolve, reject) => {
    const { geolocation } = navigator;

    if (!geolocation) {
      return reject('Geolocation unavailable');
    }

    return geolocation.getCurrentPosition(resolve, reject);
  });
}

const getPlaceFromPosition = position => {
  if (!(position && position.coords)) {
    return null;
  }

  const { latitude, longitude } = position.coords;

  const place = {
    latLng: { lat: latitude, lng: longitude },
    address: undefined,
  };

  return place;
};

export { getPlaceFromPosition };
