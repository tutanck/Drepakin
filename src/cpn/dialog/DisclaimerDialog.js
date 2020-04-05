import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import {
  loadLocationDisclaimer,
  storeLocationDisclaimer,
} from '../../utils/location-disclaimer';

const useStyles = makeStyles(theme => ({
  agreeButton: {
    color: blue[400],
    fontWeight: 'bold',
  },
}));

export default function DisclaimerDialog({ lang }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(!loadLocationDisclaimer());

  const handleAgree = () => {
    storeLocationDisclaimer();
    setOpen(!loadLocationDisclaimer());
  };

  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleAgree}
    >
      <DialogTitle id="disclaimer-dialog-title">{lang.warning}</DialogTitle>
      <DialogContent>
        <DialogContentText id="disclaimer-dialog-description">
          {lang.location_errors_happen}
          <br />
          {lang.be_extra_careful_on_go}
          <br />
          <b>{lang.decline_responsibility}</b>
          <br />
          <small>
            <i>{lang.see_legal_notices}</i>
          </small>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgree} className={classes.agreeButton} autoFocus>
          {lang.i_understand}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DisclaimerDialog.propTypes = {
  lang: PropTypes.object.isRequired,
};
