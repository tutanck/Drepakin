import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Markdown from '../cpn/common/Markdown';
import posts from '../static/resources/blog-post';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
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

  const [content, setContent] = useState('');

  const post = posts[row].find((p) => p.slug === slug);

  fetch(post.content)
    .then((response) => response.text())
    .then(setContent);

  return post ? (
    <div className={classes.root}>
      <Markdown className={classes.markdown}>{content}</Markdown>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
