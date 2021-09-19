import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import AuthManager from '../common/AuthManager';
import PlacesAutocomplete from '../common/PlacesAutocomplete';
import supportedLanguages from '../../utils/supported-languages';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titleWrapper: {
    flexGrow: 1,
    display: 'block',
  },
  title: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  select: {
    color: '#C8C8C8',
  },
}));

export default function MainAppBar({
  lang,
  language,
  name,
  updateLanguage,
  onPlaceChanged,
  onUnknownPlace,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.titleWrapper}>
            <Typography
              noWrap
              variant="h6"
              component="a"
              href="/"
              className={classes.title}
            >
              {name}/
            </Typography>
            <FormControl>
              <Select
                value={language}
                className={classes.select}
                onChange={(e) => updateLanguage(e.target.value)}
              >
                {Object.keys(supportedLanguages).map((key) => (
                  <MenuItem key={key} value={key}>
                    {supportedLanguages[key].display}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <PlacesAutocomplete
            lang={lang}
            id="app-bar-places-autocomplete"
            onUnknownPlace={onUnknownPlace}
            onPlaceChanged={(place) => onPlaceChanged(place)}
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
  language: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
  onPlaceChanged: PropTypes.func.isRequired,
};
