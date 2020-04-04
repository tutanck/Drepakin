import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

import {
  loadLegalNoticeStatus,
  storeLegalNoticeStatus,
} from '../../utils/legal-notice';

const useStyles = makeStyles(theme => ({
  closeButton: {
    color: blue[400],
    fontWeight: 'bold',
  },
}));

export default function LegalNoticeDialog({ lang, open, onClose }) {
  const classes = useStyles();

  const [noticeAccepted, setNoticeAccepted] = useState(loadLegalNoticeStatus());

  const [centersGrid, setCentersGrid] = useState(null);

  if (centersGrid) {
    centersGrid.scrollIntoView();
  }

  const handleAgree = () => {
    storeLegalNoticeStatus();
    setNoticeAccepted(loadLegalNoticeStatus());
  };

  const shouldBeOpen = !noticeAccepted || (noticeAccepted && open);

  return (
    <Dialog open={shouldBeOpen} onClose={onClose} scroll={'body'}>
      <DialogTitle
        id="customized-dialog-title"
        onClose={onClose}
        ref={el => setCentersGrid(el)}
      >
        {lang.legal_notice}
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          TODO
          {[...new Array(50)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Typography>
      </DialogContent>
      <DialogActions>
        {noticeAccepted ? (
          <Button autoFocus onClick={onClose} className={classes.closeButton}>
            {lang.close}
          </Button>
        ) : (
          <Button
            autoFocus
            onClick={handleAgree}
            className={classes.closeButton}
          >
            {lang.i_accept_notice}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
LegalNoticeDialog.propTypes = {
  lang: PropTypes.object.isRequired,
};
