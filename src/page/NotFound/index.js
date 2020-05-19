import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100vh',
  },
  homeBtn: {
    fontWeight: 'bold',
  },
}));

export default function NotFound({ lang }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>

        <h2>404 - Page not found</h2>

        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>

        <Button
          href="/"
          variant="outlined"
          color="secondary"
          className={classes.homeBtn}
        >
          Go To Homepage
        </Button>
      </div>
    </div>
  );
}
