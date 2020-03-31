import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY);
Geocode.setLanguage('en');

if (process.env.NODE_ENV === 'development') {
  Geocode.enableDebug(); // Enable or disable logs.
}

const getBy = (type, result, short = false) => {
  if (result) {
    const { address_components } = result;

    const component = address_components.find(
      ({ types }) => types && types.includes(type),
    );

    if (component) {
      const { long_name, short_name } = component;
      return short ? short_name : long_name;
    }

    return null;
  }
};

const formatResult = result => {
  if (result) {
    const {
      place_id,
      formatted_address,
      geometry: {
        location: { lat, lng },
      },
      types,
    } = result;

    const formatedResult = {
      location: {
        type: 'Point',
        coordinates: [lng, lat],
      },

      meta: {
        place: {
          formattedAddress: formatted_address,
          latitude: lat,
          longitude: lng,

          extra: {
            googlePlaceId: place_id,
            confidence: null,
            types: types,
          },

          streetNumber: getBy('street_number', result),
          streetName: getBy('route', result),
          city: getBy('locality', result),
          country: getBy('country', result),
          countryCode: getBy('country', result, true),
          zipcode: getBy('postal_code', result),
          provider: 'google',
        },
      },
    };

    return formatedResult;
  }
};

export { Geocode, formatResult };
