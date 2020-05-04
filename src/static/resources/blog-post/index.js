import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import scd from '../../assets/scd.jpg';

export default {
  news: [
    {
      slug: 'a',
      date: 'Nov 12',
      image: scd,
      imageText: 'Sickle Cells',
      title: 'Title of a longer featured blog post',
      description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
      content: post1,
    },
    {
      slug: 'b',
      date: 'Nov 12',
      title: 'Featured post',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      content: post1,
    },
    {
      slug: 'c',
      date: 'Nov 11',
      title: 'Post title',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      content: post2,
    },
    {
      slug: 'd',
      date: 'Nov 11',
      title: 'Post title',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      content: post3,
    },
  ],

  archives: [
    {
      slug: 'a',
      date: 'Nov 11',
      title: 'Post title',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      content: post3,
    },
  ],
};
