const createAutomplete = (inputId, options) => {
  // eslint-disable-next-line no-undef
  return new google.maps.places.Autocomplete(
    document.getElementById(inputId),
    options,
  );
};

const getPlaceFromGoogle = googlePlace => {
  if (!(googlePlace && googlePlace.place_id)) {
    return null;
  }

  const {
    geometry: {
      location: { lat, lng },
    },
    formatted_address,
  } = googlePlace;

  const place = {
    latLng: { lat: lat(), lng: lng() },
    address: formatted_address,
  };

  return place;
};

export { createAutomplete, getPlaceFromGoogle };
