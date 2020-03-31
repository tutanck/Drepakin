/* eslint-disable no-template-curly-in-string */
import { object, array, boolean, string, number } from 'yup';

const metaPlaceRelatedErrorMessage =
  'Please fill the address field and locate the center to continue.';

export default object({
  country: string()
    .min(1)
    .required(),

  region: string()
    .min(1)
    .required(),

  city: string()
    .min(1)
    .required(),

  hospital: string()
    .min(1)
    .required(),

  name: string()
    .min(1)
    .required(),

  name_en: string()
    .min(1)
    .required(),

  address: string()
    .min(1)
    .required(),

  consultation_managers: array().of(string().min(1)),

  phones: array().of(string().min(1)),

  for_children: boolean().optional(),

  for_adults: boolean().optional(),

  genetic_advice: boolean().optional(),

  specialized_consultation: boolean().optional(),

  officially_designated_center: boolean().optional(),

  ern_member: boolean().optional(),

  website: string()
    .url()
    .nullable()
    .default(null)
    .optional(),

  location: object({
    type: string()
      .test(
        'location-type',
        "The value of the field '${path}' should be: 'Point'",
        value => value === 'Point',
      )
      .required(),

    coordinates: array()
      .test(
        'location-coordinates',
        '${path} should contain exactly 2 coordinates in the following format: [longitude, latitude]',
        value => value.length === 2,
      )
      .test(
        // lng
        'location-coordinates-lng',
        "${path}'s longitude should be a floating number between -180 and 180",
        value => value[0] >= -180 && value[0] <= 180,
      )
      .test(
        // lat
        'location-coordinates-lat',
        "${path}'s latitude should be a floating number between -90 and 90",
        value => value[1] >= -90 && value[1] <= 90,
      )
      .required(),
  }),

  meta: object({
    place: object({
      formattedAddress: string()
        .min(1)
        .required(metaPlaceRelatedErrorMessage),

      latitude: number()
        .min(-90)
        .max(90)
        .required(metaPlaceRelatedErrorMessage),

      longitude: number()
        .min(-180)
        .max(180)
        .required(metaPlaceRelatedErrorMessage),

      extra: object({
        googlePlaceId: string()
          .min(1)
          .required(),

        confidence: number()
          .min(0)
          .max(1)
          .required(
            'Please complete the confidence field ${path} to assess the level of confidence in the location of the center',
          ),

        types: array()
          .of(string().min(1))
          .default([]),
      }),

      streetNumber: string()
        .min(1)
        .nullable()
        .default(null)
        .optional(),

      streetName: string()
        .min(1)
        .nullable()
        .default(null)
        .optional(),

      city: string()
        .min(1)
        .required(),

      country: string()
        .min(1)
        .required(),

      countryCode: string()
        .min(1)
        .required(),

      zipcode: string()
        .min(1)
        .nullable()
        .default(null)
        .optional(),

      provider: string()
        .min(1)
        .required(metaPlaceRelatedErrorMessage),
    }),
  }),
});
