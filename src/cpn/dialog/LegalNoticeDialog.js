import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { blue } from '@material-ui/core/colors';
import legal_notice_fr_FR from '../../static/resources/legal/legal-fr-FR.md';
import legal_notice_en_US from '../../static/resources/legal/legal-en-US.md';
import {
  loadLegalNoticeStatus,
  storeLegalNoticeStatus,
} from '../../utils/legal-notice';
const ReactMarkdown = require('react-markdown');

const useStyles = makeStyles(theme => ({
  closeButton: {
    color: blue[400],
    fontWeight: 'bold',
  },
}));

export default function LegalNoticeDialog({ lang, language, open, onClose }) {
  const classes = useStyles();

  const [noticeAccepted, setNoticeAccepted] = useState(loadLegalNoticeStatus());

  const [content, setContent] = useState();

  const [dialogTop, setDialogTop] = useState(null);

  if (dialogTop) {
    dialogTop.scrollIntoView();
  }

  const handleAgree = () => {
    storeLegalNoticeStatus();
    setNoticeAccepted(loadLegalNoticeStatus());
  };

  fetch(language === 'fr_FR' ? legal_notice_fr_FR : legal_notice_en_US)
    .then(response => response.text())
    .then(setContent);

  const shouldBeOpen = !noticeAccepted || (noticeAccepted && open);

  return (
    <Dialog open={shouldBeOpen} onClose={onClose} scroll={'body'}>
      <span id="legal-notice-dialog-top" ref={el => setDialogTop(el)}></span>
      <DialogContent dividers>
        <ReactMarkdown source={content} />
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
  language: PropTypes.string.isRequired,
};
