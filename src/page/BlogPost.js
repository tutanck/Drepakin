import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Markdown from '../cpn/common/Markdown';
import blogPosts from '../static/resources/blog-post';
import { Button } from '@material-ui/core';
import { getIdFromSlug } from '../utils/toolbox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
  homeBtn: {
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
      <Button href="/blog" color="primary" className={classes.homeBtn}>
        <ArrowBackIcon fontSize="large" />
      </Button>

      <Markdown className={classes.markdown}>{content}</Markdown>
    </div>
  );
}

export default function BlogPost({ language }) {
  const langBlogPosts = blogPosts[language];

  const { row, slug } = useParams();

  const id = getIdFromSlug(slug);

  const parsedId = parseInt(id);

  let post;

  const drawer = langBlogPosts[row];

  console.log('===============sid=====================');
  console.log(slug, id, '=?', parsedId, drawer); //TODO rem
  console.log('====================================');

  if (drawer) {
    post = drawer.find((p) => p.id === parsedId);
  }

  return post ? <Content url={post.content} /> : <Redirect to="/" />;
}
