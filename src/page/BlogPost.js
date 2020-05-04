import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Markdown from '../cpn/common/Markdown';
import posts from '../static/resources/blog-post';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  title: {
    ...theme.typography.body2,
    fontSize: 24,
    fontWeight: 'bold',
    color: grey[800],
    padding: theme.spacing(3, 0),
  },
  divider: {
    marginBottom: 50,
  },
  markdown: {
    ...theme.typography.body2,
    color: blueGrey[800],
    padding: theme.spacing(3, 0),
  },
}));

export default function BlogPost() {
  const classes = useStyles();

  const { row, slug } = useParams();

  const post = posts[row].find((p) => p.slug === slug);

  return post ? (
    <div className={classes.root}>
      <Typography className={classes.title}>{post.title}</Typography>

      <Divider className={classes.divider} />

      <Markdown className={classes.markdown}>{post.content}</Markdown>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
