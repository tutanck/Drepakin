import post1_en from './the-drepakin-project.md';
import post2_en from './about-sickle-cell-disease.md';
import scd from '../../../assets/scd.jpg';

export default {
  news: [
    {
      id: 3689,
      date: 'June 19, 2020',
      title: 'The Drepakin project',
      description:
        'The Drepakin project aims to help patients with sickle cell anemia to access the best possible care anywhere in the world.',
      content: post1_en,
      image: scd,
      imageText: 'Sickle Cells',
    },
    {
      id: 3688,
      date: 'May 11, 2020',
      title:
        'Sickle Cell Disease - The most common genetic disease in the world',
      description:
        'Sickle Cell Disease also known as sickle cell anemia is an inherited genetic disorder that affects the hemoglobin in red blood cells.',
      content: post2_en,
      image: null,
      imageText: null,
    },
  ],

  archives: [
    /* Please move old posts HERE */
    {
      id: 3688,
      date: 'May 11, 2020',
      title:
        'Sickle Cell Disease - The most common genetic disease in the world',
      description:
        'Sickle Cell Disease also known as sickle cell anemia is an inherited genetic disorder that affects the hemoglobin in red blood cells.',
      content: post2_en,
      image: null,
      imageText: null,
    },
  ],
};
