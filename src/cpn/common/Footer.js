import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, Button } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  /* faWhatsappSquare, */
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import Z from '../../static/assets/Z.png';
import AboutDialog from '../dialog/AboutDialog';
import LegalNoticeDialog from '../dialog/LegalNoticeDialog';
import googleForms from '../../utils/google-form-selector';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#0F121C',
  },
  footer: {
    width: '100%',
    padding: theme.spacing(2, 2),
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  block: {
    padding: '32px 0',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    borderBottom: 'none',
    [theme.breakpoints.down('md')]: {
      borderBottom: '1px solid white',
    },
  },
  callToActionBlock: {
    paddingRight: '12px',
    paddingLeft: '12px',
    backgroundColor: '#1D1E22',
  },
  callToActionContent: {
    textAlign: 'center',
    color: 'white',
  },
  sponsorsBlock: {
    backgroundColor: '#1D1E22',
  },
  sponsorsContent: {},
  blockTitle: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '25px',
    marginBottom: '16px',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  socialNetworkIcon: {
    margin: 5,
    color: 'white',
    textDecoration: 'none',
  },
  facebook: {
    '&:hover': {
      color: '#3b5998',
    },
  },
  instagram: {
    '&:hover': {
      color: '#fbad50',
    },
  },
  whatsapp: {
    '&:hover': {
      color: '#4fce5d',
    },
  },
  link: {
    cursor: 'pointer',
    lineHeight: '25px',
    color: 'white',
    textDecoration: 'underline',
    '&:hover': {
      color: lightBlue[600],
    },
  },
  importantLink: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: lightBlue[400],
    textTransform: 'uppercase',
    textDecoration: 'underline',
  },
  normalLink: {
    textTransform: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  muiButtonRoot: {
    padding: 0,
  },
  muiButtonText: {
    padding: 0,
  },
  spaceUp: {
    marginTop: 12,
  },
}));

export default function StickyFooter({ lang, language }) {
  const classes = useStyles();

  const [aboutDialogOpened, setAboutDialogOpened] = useState(false);
  const [legalNoticeDialogOpened, setLegalNoticeDialogOpened] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AboutDialog
        lang={lang}
        language={language}
        open={aboutDialogOpened}
        onClose={() => setAboutDialogOpened(false)}
      />

      <LegalNoticeDialog
        lang={lang}
        language={language}
        open={legalNoticeDialogOpened}
        onClose={() => setLegalNoticeDialogOpened(false)}
      />

      <Grid container className={classes.mainContainer}>
        <Grid
          item
          xs={12}
          md={3}
          className={clsx(classes.block, classes.callToActionBlock)}
        >
          <div className={classes.blockTitle}>{lang.help_us_help_you}</div>
          <div className={classes.callToActionContent}>
            <ul className={classes.list}>
              <li>
                <Typography variant="h6" component="p" gutterBottom>
                  {lang.you_know_more_centers}
                </Typography>
              </li>
              <li>
                <a
                  className={clsx(
                    classes.link,
                    classes.importantLink,
                    classes.spaceUp,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={googleForms[language]}
                >
                  {lang.help_us_reference}
                </a>
              </li>
              <li>
                <Button
                  className={clsx(classes.link, classes.spaceUp)}
                  onClick={() => setAboutDialogOpened(true)}
                >
                  {lang.about_drepakin}
                </Button>
              </li>
              <li>
                <a
                  className={classes.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://paypal.me/pools/c/8nXuBPoX1L"
                >
                  {lang.support_us}
                </a>
              </li>
              <li>
                <a
                  className={classes.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/tutanck/Drepakin"
                >
                  {lang.contribute_to_dev}{' '}
                  <FontAwesomeIcon size="1x" icon={faGithub} />
                </a>
              </li>
            </ul>
          </div>
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.block}>
          <div className={classes.blockTitle}>{lang.contact}</div>
          <ul className={classes.list}>
            <li>
              <a
                className={classes.link}
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:drepakin@gmail.com?subject=[Contact]"
              >
                drepakin@gmail.com
              </a>
            </li>
            <li>
              <a
                className={classes.link}
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:drepakin@gmail.com?subject=[Problem]`}
              >
                {lang.report_problem}
              </a>
            </li>
          </ul>
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.block}>
          <div className={classes.blockTitle}>{lang.legal}</div>
          <ul className={classes.list}>
            <li>
              <Button
                className={clsx(classes.link, classes.normalLink)}
                onClick={() => setLegalNoticeDialogOpened(true)}
                classes={{
                  root: classes.muiButtonRoot,
                  text: classes.muiButtonText,
                }}
              >
                {lang.legal_notice}
              </Button>
            </li>
            {/* <li>
              <Button
                className={clsx(classes.link, classes.normalLink)}
                onClick={noOp}
                classes={{
                  root: classes.muiButtonRoot,
                  text: classes.muiButtonText,
                }}
              >
                {lang.cookies_management}
              </Button>
            </li> */}
          </ul>
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.block}>
          <div className={classes.blockTitle}>{lang.stay_tuned}</div>
          <div>
            <a
              className={clsx(classes.socialNetworkIcon, classes.facebook)}
              href="https://www.facebook.com/hashtag/drepakin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon size="3x" icon={faFacebook} />
            </a>

            {/*  <a
              className={clsx(classes.socialNetworkIcon, classes.whatsapp)}
              href="https://web.whatsapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon size="3x" icon={faWhatsappSquare} />
            </a> */}

            <a
              className={clsx(classes.socialNetworkIcon, classes.instagram)}
              href="https://www.instagram.com/explore/tags/drepakin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon size="3x" icon={faInstagram} />
            </a>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          className={clsx(classes.block, classes.sponsorsBlock)}
        >
          <div className={classes.blockTitle}>{lang.special_thanks}</div>
          <div className={classes.sponsorsContent}>
            <img src={Z} className={classes.imgIcon} alt={'Z'} />
          </div>
        </Grid>
      </Grid>

      <footer className={classes.footer}>
        <Container className={classes.footerContainer}>
          <Typography variant="body2" color="textSecondary">
            Copyright © Drepakin 2020
          </Typography>
        </Container>
      </footer>
    </div>
  );
}

StickyFooter.propTypes = {
  lang: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
