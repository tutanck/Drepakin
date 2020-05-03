import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from '../cpn/common/Markdown';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function BlogPost() {
  const classes = useStyles();

  const { title, content } = {};

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Markdown className={classes.markdown}>{content}</Markdown>
    </div>
  );
}
