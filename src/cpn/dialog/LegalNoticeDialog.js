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
const ReactMarkdown = require('react-markdown');

const useStyles = makeStyles(theme => ({
  closeButton: {
    color: blue[400],
    fontWeight: 'bold',
  },
}));

export default function LegalNoticeDialog({ lang, language, open, onClose }) {
  const classes = useStyles();

  const [content, setContent] = useState();

  const [dialogTop, setDialogTop] = useState(null);

  if (dialogTop) {
    dialogTop.scrollIntoView();
  }

  fetch(language === 'fr_FR' ? legal_notice_fr_FR : legal_notice_en_US)
    .then(response => response.text())
    .then(setContent);

  return (
    <Dialog open={open} onClose={onClose} scroll={'body'}>
      <DialogContent
        dividers
        ref={el => setDialogTop(el)}
        id="legal-notice-dialog-content-top"
      >
        <ReactMarkdown source={content} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} className={classes.closeButton}>
          {lang.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
LegalNoticeDialog.propTypes = {
  lang: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
