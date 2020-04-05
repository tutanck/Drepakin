import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { grey, lightBlue, red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SlideUp from '../motion/SlideUp';
import { Container } from '@material-ui/core';
import googleForms from '../../utils/google-form-selector';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    cursor: 'pointer',
    width: 'fit-content',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: grey[200],
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
  },
  footerLink: {
    color: lightBlue[600],
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  importantLink: {
    color: red[600],
    textDecoration: 'underline',
    fontWeight: 'bold',
    fontSize: 18,
    cursor: 'pointer',
  },
  secondaryLink: {
    color: lightBlue[600],
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 16,
  },
}));

export default function AboutDialog({ lang, language, open, onClose }) {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={SlideUp}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography onClick={onClose} variant="h6" className={classes.title}>
            {lang.close}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h2" gutterBottom>
            Drepakin
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            {lang.ambition_1p}{' '}
            <a
              className={classes.footerLink}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.inserm.fr/information-en-sante/dossiers-information/drepanocytose"
            >
              {lang.scd}
            </a>{' '}
            {lang.ambition_2p}
          </Typography>
          <br />
          <Divider />
          <br />
          <Typography variant="h6" component="h3">
            {lang.help_us_help_you}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            {lang.involvement_1p}{' '}
            <b>
              <i>{lang.involvement_2p}</i>
            </b>
            <br />
            <br />
            {lang.you_know_more_centers}{' '}
            <a
              className={classes.importantLink}
              target="_blank"
              rel="noopener noreferrer"
              href={googleForms[language]}
            >
              {lang.help_us_reference}
            </a>
            <br />
            <br />
            {lang.you_can_also}{' '}
            <a
              className={classes.secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
              href="https://paypal.me/pools/c/8nXuBPoX1L"
            >
              {lang.support}.
            </a>
            <br />
            <br />
            {lang.encountered_problem}{' '}
            <a
              className={classes.secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:drepakin@gmail.com&subject=[${lang.problem} | Bug | Incohérence]`}
            >
              {lang.let_us_know}
            </a>
            <br />
            <br />
            {lang.have_suggestions}{' '}
            <a
              className={classes.secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:drepakin@gmail.com&subject=[Suggestions / ${lang.ideas}]`}
            >
              {lang.write_us}
            </a>
          </Typography>
        </Container>
      </div>
    </Dialog>
  );
}

AboutDialog.propTypes = {
  lang: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
