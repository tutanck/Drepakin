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
import { Switch, Route, useLocation } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppContextProvider } from './context/AppContext';
import { theme } from './utils/app-identity';
import { loadStoredUser, storeUser } from './utils/auth-service';
import { storePreferredLanguage } from './utils/preferred-language';
import supportedLanguages, {
  selectedLanguage,
} from './utils/supported-languages';
import langs from './static/resources/langs';
import SnackBar from './cpn/bar/SnackBar';
import Blog from './page/blog/Blog';
import BlogPost from './page/BlogPost';
import MainPage from './page/MainPage';
import NotFound from './page/NotFound';
import Footer from './cpn/common/Footer';
import { ID } from './utils/toolbox';
import * as Sentry from '@sentry/browser';
import 'jsoneditor-react/es/editor.min.css';
import './App.css';

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
  });
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
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
  const classes = useStyles();

  const [{ message, variant, triggerId }, setSnackBarContent] = useState({});

  const snack = {
    info: (message) =>
      setSnackBarContent({ message, variant: 'info', triggerId: ID() }),
    error: (message) =>
      setSnackBarContent({ message, variant: 'error', triggerId: ID() }),
    success: (message) =>
      setSnackBarContent({ message, variant: 'success', triggerId: ID() }),
    warning: (message) =>
      setSnackBarContent({ message, variant: 'warning', triggerId: ID() }),
  };

  const [loginDialogOpened, setLoginDialogOpened] = useState(false);

  const [user, setUser] = useState(loadStoredUser());

  const updateUser = (currentUser) => {
    storeUser(currentUser);
    setUser(currentUser);
  };

  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const urlLang = query.get('lang');

  const [language, setLanguage] = useState(selectedLanguage(urlLang));

  const updateLanguage = (currentLanguage) => {
    setLanguage(currentLanguage);
  };

  useEffect(() => {
    storePreferredLanguage(language);
  }, [language]);

  const lang = langs[language];

  return (
    <div>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <div className={classes.root}>
            <AppContextProvider
              value={{
                lang,
                user,
                snack,
                language,
                updateUser,
                updateLanguage,
                loginDialogOpened,
                setLoginDialogOpened,
              }}
            >
              <Switch>
                <Route exact path="/">
                  <Blog
                    lang={lang}
                    language={language}
                    updateLanguage={updateLanguage}
                  />
                </Route>

                <Route path="/blog/:row/:slug">
                  <BlogPost language={language} />
                </Route>

                <Route path="/blog">
                  <Blog
                    lang={lang}
                    language={language}
                    updateLanguage={updateLanguage}
                  />
                </Route>

                {/* MAITENANCE PAGE */}
                {/* Comment/uncomment to hide/show */}
                {/* <Route
                    path="/"
                    component={() => {
                      window.location.href = '/maintenance';
                      return null;
                    }}
                  /> */}

                <Route path="/app">
                  {window.navigator.onLine ? (
                    <MainPage
                      lang={lang}
                      user={user}
                      snack={snack}
                      language={language}
                      updateUser={updateUser}
                      updateLanguage={updateLanguage}
                      setLoginDialogOpened={setLoginDialogOpened}
                    />
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
                </Route>
                <Route path="/404">
                  <NotFound lang={lang} language={language} />
                </Route>
                <Route>
                  <NotFound lang={lang} language={language} />
                </Route>
              </Switch>
            </AppContextProvider>
          </div>

          <div className={classes.formControlContainer}>
            <FormControl>
              <Select
                value={language}
                onChange={(e) => updateLanguage(e.target.value)}
              >
                {Object.keys(supportedLanguages).map((key) => (
                  <MenuItem key={key} value={key}>
                    {supportedLanguages[key].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <SnackBar message={message} variant={variant} triggerId={triggerId} />
        </ThemeProvider>
      </div>

      <Footer lang={lang} language={language} />
    </div>
  );
}
