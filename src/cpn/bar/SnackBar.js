import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: theme.status.success,
  },
  error: {
    backgroundColor: theme.status.error,
  },
  info: {
    backgroundColor: theme.status.info,
  },
  warning: {
    backgroundColor: theme.status.warning,
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function StatusSnackbar({
  message,
  triggerId,
  variant = 'info',
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(!!message);

  useEffect(() => {
    setOpen(true);
  }, [triggerId]);

  console.log('StatusSnackbar', message, variant, open); //TODO REM

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <SnackbarContent
          className={classes[variant]}
          aria-describedby="message-id"
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  );
}

StatusSnackbar.propTypes = {
  message: PropTypes.string,
  triggerId: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
};
