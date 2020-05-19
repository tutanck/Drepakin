import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Sidebar from './Sidebar';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import blogPosts from '../../static/resources/blog-post';
import { slugify } from '../../utils/toolbox';

export default function Blog({ lang, language }) {
  const langBlogPosts = blogPosts[language];

  const headPost = langBlogPosts.news[0];

  return (
    <Container maxWidth="lg">
      <Header lang={lang} />

      <main>
        <MainFeaturedPost post={headPost} lang={lang} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {langBlogPosts.news.map((post) => (
                <FeaturedPost
                  key={slugify(post.content, post.id)}
                  post={post}
                  lang={lang}
                />
              ))}
            </Grid>
          </Grid>

          <Sidebar lang={lang} language={language} />
        </Grid>
      </main>
    </Container>
  );
}

Blog.propTypes = {
  lang: PropTypes.object.isRequired,
};
