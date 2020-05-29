import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Hidden, FormControl, Select, MenuItem } from '@material-ui/core';
/* import Link from '@material-ui/core/Link'; */
import supportedLanguages from '../../utils/supported-languages';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    color: 'black',
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  headerBtn: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

/* const sections = [{ title: 'Technology', url: '#' }]; */

export default function Header({ lang, language, updateLanguage }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Hidden xsDown>
          <Typography
            noWrap
            variant="h5"
            component="h2"
            align="left"
            color="inherit"
            className={classes.toolbarTitle}
          >
            Drepakin.com /{' '}
            <FormControl>
              <Select
                value={language}
                onChange={(e) => updateLanguage(e.target.value)}
              >
                {Object.keys(supportedLanguages).map((key) => (
                  <MenuItem key={key} value={key}>
                    {supportedLanguages[key].display}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>
        </Hidden>

        <Button
          size="small"
          color="secondary"
          className={classes.headerBtn}
          href="https://paypal.me/pools/c/8nXuBPoX1L"
        >
          {lang.support_us}
        </Button>

        <Button
          variant="outlined"
          href="/app"
          size="small"
          color="primary"
          className={classes.headerBtn}
        >
          {lang.go_to_app}
        </Button>
      </Toolbar>

      {/* <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar> */}
    </React.Fragment>
  );
}

Header.propTypes = {
  lang: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
};
