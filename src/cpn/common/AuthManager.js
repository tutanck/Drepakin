import React, { useState, useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fingerprint from '@material-ui/icons/Fingerprint';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { isLocalStorageAvailable } from '../../utils/local-storage';
import { AppContext } from '../../context/AppContext';
import { post } from '../../utils/api-client';
import { getBearedToken } from '../../utils/auth-service';
import {
  Grow,
  Paper,
  Popper,
  Dialog,
  Button,
  Avatar,
  ClickAwayListener,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  googleLoginBtn: {
    width: '100%',
  },
  googleLogoutBtn: {
    width: '100%',
    minWidth: 150,
    marginRight: 10,
  },
  loginBtn: {
    marginLeft: theme.spacing(1),
    color: '#FFF',
  },
}));

const googleClientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

export default function AuthManager() {
  const classes = useStyles();

  const {
    lang,
    user,
    updateUser,
    snack,
    loginDialogOpened,
    setLoginDialogOpened,
  } = useContext(AppContext);

  const anchorRef = useRef(null);

  const [popperOpened, setPopperOpened] = useState(false);

  const handleMenuClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setPopperOpened(false);
  };

  const proposeLogin = () => {
    if (!isLocalStorageAvailable('localStorage')) {
      return snack.warning(lang.allow_local_storage);
    }
    setLoginDialogOpened(true);
  };

  const onGoogleLoginSuccess = async response => {
    const idToken = response.getAuthResponse().id_token;
    try {
      const loggedInUser = await post(`/users/login`, {
        headers: { Authorization: getBearedToken(idToken) },
      });

      updateUser({ ...loggedInUser, authToken: idToken /* !Important */ });
    } catch (err) {
      updateUser(null);
      snack.error(lang.connexion_error);
    } finally {
      setLoginDialogOpened(false);
    }
  };

  const onGoogleLoginFailure = async response => {
    updateUser(null);
    setLoginDialogOpened(false);
  };

  const onGoogleLogoutResponse = () => {
    updateUser(null);
    setPopperOpened(false);
  };

  return (
    <div>
      {!!user ? (
        <Button
          className={classes.loginBtn}
          ref={anchorRef}
          aria-label="select login button"
          aria-haspopup="menu"
          onClick={() => setPopperOpened(prevOpen => !prevOpen)}
        >
          <Avatar aria-label="profile picture" src={user.picture} />
        </Button>
      ) : (
        <Button className={classes.loginBtn} onClick={proposeLogin}>
          <Fingerprint />
        </Button>
      )}
      <Popper
        open={popperOpened}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleMenuClose}>
                <div>
                  <GoogleLogout
                    className={classes.googleLogoutBtn}
                    clientId={googleClientId}
                    buttonText="Déconnexion"
                    onLogoutSuccess={onGoogleLogoutResponse}
                    onFailure={onGoogleLogoutResponse}
                  />
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Dialog
        open={loginDialogOpened}
        onClose={() => setLoginDialogOpened(false)}
      >
        <GoogleLogin
          buttonText={lang.sign_with_google}
          className={classes.googleLoginBtn}
          clientId={googleClientId}
          onSuccess={onGoogleLoginSuccess}
          onFailure={onGoogleLoginFailure}
        />
      </Dialog>
    </div>
  );
}
