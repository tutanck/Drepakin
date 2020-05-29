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
  title: {
    flexGrow: 1,
    display: 'block',
  },
  select: {
    color: 'black',
    fontSize: '16px',
    
  },
}));

export default function MainAppBar({
  lang,
  language,
  name,
  updateLanguage,
  onPlaceChanged,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {name} /{' '}
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
          </Typography>

          <PlacesAutocomplete
            lang={lang}
            id="app-bar-places-autocomplete"
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
