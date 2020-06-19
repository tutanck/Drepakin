import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import './style.css';
import { amber, blue, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100vh',
  },
  homeBtn: {
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  red: {
    color: red[400],
  },
  p: { fontWeight: 'bold', fontSize: 24, color: blue[600] },
}));

export default function NotFound({ lang }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="notfound">
        <div className="notfound-404">
          <h1>#WSCD</h1>
        </div>

        <h3 className={classes.red}>June 19</h3>

        <h3 className={classes.red}>World Sickle Cell Day</h3>

        <h6 className={classes.p}>Spread the word around you !</h6>

        <Button
          href="/"
          variant="outlined"
          color="secondary"
          className={classes.homeBtn}
        >
          @drepakin
        </Button>
      </div>
    </div>
  );
}
