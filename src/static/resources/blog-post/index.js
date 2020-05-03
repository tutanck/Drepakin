import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import scd from '../../assets/scd.jpg';

const head = {
  title: 'Title of a longer featured blog post',
  date: 'Nov 12',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: scd,
  imgText: 'main image description',
  url: '#',
  content: post1,
};

const news = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: undefined,
    imageText: 'Image Text',
    url: '#',
    content: post1,
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: undefined,
    imageText: 'Image Text',
    url: '#',
    content: post2,
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: undefined,
    imageText: 'Image Text',
    url: '#',
    content: post3,
  },
];

const archives = [
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: undefined,
    imageText: 'Image Text',
    url: '#',
    content: post3,
  },
];

export { head, news, archives };
