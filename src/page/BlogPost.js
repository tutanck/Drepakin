import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Markdown from '../cpn/common/Markdown';
import posts from '../static/resources/blog-post';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  markdown: {
    ...theme.typography.body2,
    color: blueGrey[800],
    padding: theme.spacing(3, 3),
  },
  welcomeBtn: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
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
      <Button href="/" color="primary" className={classes.welcomeBtn}>
        {'<<<'}
      </Button>

      <Markdown className={classes.markdown}>{content}</Markdown>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
