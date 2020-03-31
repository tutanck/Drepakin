import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import { evaluate } from '../../utils/rate-evaluation';
import { grey } from '@material-ui/core/colors';
import moment from 'moment';
import 'moment/locale/fr';
import { Typography } from '@material-ui/core';

moment.locale('fr');

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
  },
  cardHeader: {
    padding: 8,
  },
  avatar: {
    backgroundColor: grey[200],
  },
  cardContent: {
    color: grey[800],
    paddingLeft: 64,
    overflowWrap: 'break-word',
  },
  cardContentRoot: {
    paddingTop: 0,
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: 12,
    },
  },
  bad: {
    color: theme.rate.bad,
  },
  medium: {
    color: theme.rate.medium,
  },
  good: {
    color: theme.rate.good,
  },
  authorRateContainer: {
    display: 'flex',
  },
  authorRateValue: {
    marginLeft: 8,
  },
}));

export default function CommentCard({
  text,
  updated_at,
  author: { name, picture },
  author_center_rate,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            src={picture}
            aria-label="recipe"
            className={classes.avatar}
          />
        }
        title={
          <div className={classes.authorRateContainer}>
            {name}
            {author_center_rate && (
              <Typography
                className={classes[evaluate(author_center_rate.value)]}
                variant="body2"
                color="textSecondary"
              >
                <span className={classes.authorRateValue}>
                  <StarIcon style={{ fontSize: 14 }} />
                  {author_center_rate.value}
                </span>
              </Typography>
            )}
          </div>
        }
        subheader={moment(updated_at).format('LLL')}
      />
      <CardContent
        className={classes.cardContent}
        classes={{
          root: classes.cardContentRoot,
        }}
      >
        {text}
      </CardContent>
    </Card>
  );
}
CommentCard.propTypes = {
  text: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  author_center_rate: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }),
};
