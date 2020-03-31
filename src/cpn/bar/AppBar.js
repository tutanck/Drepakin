import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import AuthManager from '../common/AuthManager';
import PlacesAutocomplete from '../common/PlacesAutocomplete';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'block',
  },
}));

export default function MainAppBar({ lang, name, onPlaceChanged }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {name}
          </Typography>

          <PlacesAutocomplete
            lang={lang}
            id="app-bar-places-autocomplete"
            onPlaceChanged={place => onPlaceChanged(place)}
            inputProps={{ 'aria-label': 'search places' }}
            inputBaseProps={{
              placeholder: lang.place_types,
            }}
          />
          <AuthManager />
        </Toolbar>
      </AppBar>
    </div>
  );
}

MainAppBar.propTypes = {
  lang: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onPlaceChanged: PropTypes.func.isRequired,
};
