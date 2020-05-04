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

function Content({ url }) {
  const classes = useStyles();

  const [content, setContent] = useState('');

  fetch(url)
    .then((response) => response.text())
    .then(setContent)
    .catch((err) => alert('E404-2: Mising content'));

  return (
    <div className={classes.root}>
      <Button href="/" color="primary" className={classes.welcomeBtn}>
        {'<<<'}
      </Button>

      <Markdown className={classes.markdown}>{content}</Markdown>
    </div>
  );
}

export default function BlogPost() {
  const { row, slug } = useParams();

  let post;

  const drawer = posts[row];

  if (drawer) {
    post = drawer.find((p) => p.slug === slug);
  }

  return post ? <Content url={post.content} /> : <Redirect to="/" />;
}
