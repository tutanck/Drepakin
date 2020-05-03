import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Sidebar from './Sidebar';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';

import { head, news } from '../../static/resources/blog-post';

export default function Blog({ lang }) {
  return (
    <Container maxWidth="lg">
      <Header lang={lang} />

      <main>
        <MainFeaturedPost post={head} lang={lang} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {news.map((post) => (
                <FeaturedPost key={post.title} post={post} lang={lang} />
              ))}
            </Grid>
          </Grid>

          <Sidebar lang={lang} />
        </Grid>
      </main>
    </Container>
  );
}

Blog.propTypes = {
  lang: PropTypes.object.isRequired,
};
