import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppContextProvider } from './context/AppContext';
import { theme } from './utils/app-identity';
import { loadStoredUser, storeUser } from './utils/auth-service';
import {
  loadPreferredLanguage,
  storePreferredLanguage,
} from './utils/preferred-language';
import supportedLanguages, {
  defaultLanguage,
} from './utils/supported-languages';
import langs from './static/resources/langs';
import AppBar from './cpn/bar/AppBar';
import SnackBar from './cpn/bar/SnackBar';
import MainPage from './page/MainPage';
import Footer from './cpn/common/Footer';
import getLocation, { getPlaceFromPosition } from './utils/geolocation';
import { getPlaceFromGoogle } from './utils/google-places';
import { ID } from './utils/toolbox';
import * as Sentry from '@sentry/browser';

import 'jsoneditor-react/es/editor.min.css';
import './App.css';

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
  });

}

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: 32,
    color: grey[600],
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px 1%',
  },
  button: {
    width: 'fit-content',
    paddingRight: 50,
    paddingLeft: 50,
  },
  formControlContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    margin: theme.spacing(1),
    marginTop: theme.spacing(8),
  },
}));

export default function App() {
  // - App

  const classes = useStyles();

  const [{ message, variant, triggerId }, setSnackBarContent] = useState({});

  const snack = {
    info: message =>
      setSnackBarContent({ message, variant: 'info', triggerId: ID() }),
    error: message =>
      setSnackBarContent({ message, variant: 'error', triggerId: ID() }),
    success: message =>
      setSnackBarContent({ message, variant: 'success', triggerId: ID() }),
    warning: message =>
      setSnackBarContent({ message, variant: 'warning', triggerId: ID() }),
  };

  const [loginDialogOpened, setLoginDialogOpened] = useState(false);

  const [user, setUser] = useState(loadStoredUser());

  const updateUser = currentUser => {
    storeUser(currentUser);
    setUser(currentUser);
  };

  const [language, setLanguage] = useState(
    loadPreferredLanguage() || defaultLanguage,
  );

  const updateLanguage = currentLanguage => {
    storePreferredLanguage(currentLanguage);
    setLanguage(currentLanguage);
  };

  const lang = langs[language];

  const [{ latLng, address }, setPlace] = useState({});

  const askForCurrentPlace = async () => {
    try {
      const position = await getLocation();

      const place = getPlaceFromPosition(position);
      if (place) return setPlace(place);

      return snack.error(lang.impossible_geolocation);
    } catch (err) {
      console.error('getLocation err', err);
      return snack.warning(lang.allow_geolocation);
    }
  };

  useEffect(
    () => {
      askForCurrentPlace();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] /* Only once : set initial position */,
  );

  useEffect(() => {
    if (latLng) {
      snack.info(lang.position_update + (address ? ` : ${address}` : '...'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latLng]);

  const handlePlaceChanged = async (rawPlace) => {
    setPlace({}); /* trigger the loader dialog while updating position */

    if (rawPlace) {
      const place = getPlaceFromGoogle(rawPlace);
      if (place) return setPlace(place);
    }

    await askForCurrentPlace();
  };

  return (
    <div>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AppContextProvider
            value={{
              lang,
              user,
              snack,
              language,
              updateUser,
              loginDialogOpened,
              setLoginDialogOpened,
            }}
          >
            {window.navigator.onLine ? (
              <div>
                <AppBar
                  lang={lang}
                  name="Drepakin"
                  onPlaceChanged={handlePlaceChanged}
                />

                <MainPage
                  lang={lang}
                  user={user}
                  snack={snack}
                  latLng={latLng}
                  language={language}
                  updateUser={updateUser}
                  setLoginDialogOpened={setLoginDialogOpened}
                />
              </div>
            ) : (
              <Container maxWidth="sm" className={classes.container}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.text}
                >
                  {lang.no_network}
                </Typography>

                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.button}
                  onClick={() => document.location.reload(true)}
                >
                  {lang.retry}
                </Button>
              </Container>
            )}
          </AppContextProvider>

          <SnackBar message={message} variant={variant} triggerId={triggerId} />
        </ThemeProvider>

        <div className={classes.formControlContainer}>
          <FormControl>
            <Select
              value={language}
              onChange={e => updateLanguage(e.target.value)}
            >
              {Object.keys(supportedLanguages).map(key => (
                <MenuItem key={key} value={key}>
                  {supportedLanguages[key].name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <Footer lang={lang} language={language} />
    </div>
  );
}
