import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import PersonIcon from '@material-ui/icons/ChildCare';
import ChildCareIcon from '@material-ui/icons/Person';
import ERN from '../../static/assets/ERN.png';
import RC from '../../static/assets/reference-center.gif';
import CS from '../../static/assets/CS.png';
import CG from '../../static/assets/CG.jpg';

const useStyles = makeStyles(() => ({
  legendContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  legend: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 'fit-content',
  },
  legendInfo: {
    color: grey[800],
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    fontWeight: 'bold',
    margin: 2,
  },
  legendInfoIcon: {
    marginRight: 5,
  },
  imgIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
}));

export default function LegendDialog({ lang, open, onClose }) {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Légende</DialogTitle>
      <DialogContent>
        <Grid item key={'legend'} xs={12} className={classes.legendContainer}>
          <div className={classes.legend}>
            <div className={classes.legendInfo}>
              <PersonIcon className={classes.legendInfoIcon} />{' '}
              {lang.for_children}
            </div>

            <div className={classes.legendInfo}>
              <ChildCareIcon className={classes.legendInfoIcon} />{' '}
              {lang.for_adults}
            </div>

            <div className={classes.legendInfo}>
              <img
                src={CG}
                className={classes.imgIcon}
                alt={lang.genetic_counseling}
              />
              {lang.genetic_counseling}
            </div>

            <div className={classes.legendInfo}>
              <img
                src={CS}
                className={classes.imgIcon}
                alt={lang.specialized_consultation}
              />
              {lang.specialized_consultation}
            </div>

            <div className={classes.legendInfo}>
              <img
                src={RC}
                className={classes.imgIcon}
                alt={lang.officially_designated_center}
              />
              {lang.officially_designated_center}
            </div>

            <div className={classes.legendInfo}>
              <img
                src={ERN}
                className={classes.imgIcon}
                alt={lang.ern_member}
              />
              {lang.ern_member}
            </div>
          </div>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

LegendDialog.propTypes = {
  lang: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
