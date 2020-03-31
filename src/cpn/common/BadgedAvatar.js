import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  badge: {
    marginLeft: 8,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function BadgedAvatar({ avatarUrl, badgeIcon: BadgeIcon }) {
  const classes = useStyles();

  return (
    <Badge
      overlap="circle"
      className={classes.badge}
      badgeContent={
        BadgeIcon && (
          <Avatar className={classes.small}>
            <BadgeIcon />
          </Avatar>
        )
      }
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Avatar src={avatarUrl} />
    </Badge>
  );
}

BadgedAvatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  badgeIcon: PropTypes.object,
};
