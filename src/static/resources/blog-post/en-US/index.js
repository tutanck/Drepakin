import post1_en from './the-drepakin-project.md';
import post2_en from './about-sickle-cell-disease.md';
import post3_en from './drepakin-app-how-it-works.md';
import scd from '../../../assets/scd.jpg';

export default {
  /* Headlines */
  head: {
    id: 3689,
    date: 'June 01, 2020',
    title: 'The Drepakin project',
    description:
      'The Drepakin project aims to help patients with sickle cell anemia to access the best care anywhere in the world.',
    content: post1_en,
    image: scd,
    imageText: 'Sickle Cells',
  },

  /* NEWS */
  news: [
    {
      id: 3690,
      date: 'June 01, 2020',
      title: 'The Drepakin App: How it works ?',
      description:
        'The Drepakin app helps you find health centers that are experts in sickle cell disease.',
      content: post3_en,
    },
    {
      id: 3689,
      date: 'June 01, 2020',
      title: 'The Drepakin project',
      description:
        'The Drepakin project aims to help patients with sickle cell anemia to access the best care anywhere in the world.',
      content: post1_en,
    },
    {
      id: 3688,
      date: 'May 31, 2020',
      title:
        'Sickle Cell Disease - The most common genetic disease in the world',
      description:
        'Sickle Cell Disease also known as sickle cell anemia is an inherited genetic disorder that affects the hemoglobin in red blood cells.',
      content: post2_en,
    },
  ],

  /* OUTDATED INFORMATION */
  archives: [
    /* Please move old posts HERE */
  ],
};
