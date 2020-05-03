import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { archives } from '../../static/resources/blog-post';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
    color: 'black',
  },
}));

export default function Sidebar({ lang }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          {lang.about_drepakin}
        </Typography>

        <Typography>
          {lang.ambition_1p} {lang.scd} {lang.ambition_2p}
        </Typography>
      </Paper>

      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        {lang.archives}
      </Typography>

      {archives.map(({ title, url }) => (
        <Link display="block" variant="body1" href={url} key={title}>
          {title}
        </Link>
      ))}
    </Grid>
  );
}
Sidebar.propTypes = {
  lang: PropTypes.object.isRequired,
};