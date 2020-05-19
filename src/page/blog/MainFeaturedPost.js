import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { slugify } from '../../utils/toolbox';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainFeaturedPostLink: {
    color: '#61dafb',
  },
}));

export default function MainFeaturedPost({
  post: { id, title, description, content, image, imageText },
  lang: { continue_reading },
}) {
  const classes = useStyles();

  const slug = slugify(content, id);

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={image} alt={imageText} />}
      <div className={classes.overlay} />

      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              gutterBottom
              variant="h3"
              component="h1"
              color="inherit"
            >
              {title}
            </Typography>

            <Typography variant="h5" color="inherit" paragraph>
              {description}
            </Typography>

            <Link
              variant="subtitle1"
              href={`/blog/news/${slug}`}
              className={classes.mainFeaturedPostLink}
            >
              {continue_reading}
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object.isRequired,
  lang: PropTypes.object.isRequired,
};
