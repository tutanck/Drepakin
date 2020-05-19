import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { slugify } from '../../utils/toolbox';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeaturedPost({
  post: { id, date, title, description, content, image, imageText },
  lang: { continue_reading },
}) {
  const classes = useStyles();

  const slug = slugify(content, id);

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={`/blog/news/${slug}`}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {title}
              </Typography>

              <Typography variant="subtitle1" color="textSecondary">
                {date}
              </Typography>

              <Typography variant="subtitle1" paragraph>
                {description}
              </Typography>

              <Typography variant="subtitle1" color="primary">
                {continue_reading}
              </Typography>
            </CardContent>
          </div>

          {image && (
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={image}
                title={imageText}
              />
            </Hidden>
          )}
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object.isRequired,
  lang: PropTypes.object.isRequired,
};
