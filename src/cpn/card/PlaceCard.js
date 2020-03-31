import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PlaceCard({
  place: {
    latitude,
    longitude,
    extra: { googlePlaceId, types },
    city,
    country,
    countryCode,
    zipcode,
    provider,
  },
}) {
  const classes = useStyles();

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.root}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Place ID: {provider}-{googlePlaceId}
      </Typography>

      <Typography>longitude: {longitude}</Typography>
      <Typography gutterBottom>latitude: {latitude}</Typography>

      <Typography className={classes.pos}>
        {zipcode}
        {bull}
        {city}
        {bull}
        {country}({countryCode})
      </Typography>
      <Typography variant="body2" component="p" color="textSecondary">
        Place type: {types && types.join(' • ')}
      </Typography>
    </div>
  );
}

PlaceCard.propTypes = {
  place: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    extra: PropTypes.shape({
      googlePlaceId: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(PropTypes.string),
    }),
    city: PropTypes.string,
    country: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    zipcode: PropTypes.string,
    provider: PropTypes.string.isRequired,
  }),
};
