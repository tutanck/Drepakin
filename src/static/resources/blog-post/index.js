import post1_fr from './le-projet-drepakin.md';
import post1_en from './the-drepakin-project.md';
import post2_fr from './a-propos-de-la-drepanocytose.md';
import post2_en from './about-sickle-cell-disease.md';
import scd from '../../assets/scd.jpg';
import { slug } from '../../../utils/toolbox';

export default {
  news: [
    {
      slug: slug(post1_fr),
      date: '19 Juin 2020',
      image: scd,
      imageText: 'Sickle Cells',
      title: 'Le projet Drepakin',
      description:
        "Le projet Drepakin a pour ambition d'aider les patients atteints de drépanocytose à accéder aux meilleurs soins possibles partout dans le monde.",
      content: post1_fr,
    },
    {
      slug: slug(post1_fr),
      date: '19 Juin 2020',
      title: 'Le projet Drepakin 🇫🇷',
      description:
        "Le projet Drepakin a pour ambition d'aider les patients atteints de drépanocytose à accéder aux meilleurs soins possibles partout dans le monde.",
      content: post1_fr,
    },
    {
      slug: slug(post1_en),
      date: 'June 19, 2020',
      title: 'The Drepakin project 🇬🇧',
      description:
        'The Drepakin project aims to help patients with sickle cell anemia to access the best possible care anywhere in the world.',
      content: post1_en,
    },
    {
      slug: slug(post2_fr),
      date: '11 Mai 2020',
      title:
        'La drépanocytose - La maladie génétique la plus répandue dans le monde 🇫🇷',
      description:
        "La drépanocytose également connue sous le nom d'anémie falciforme est une maladie génétique héréditaire qui affecte l'hémoglobine dans les globules rouges.",
      content: post2_fr,
    },
    {
      slug: slug(post2_en),
      date: 'May 11, 2020',
      title:
        'Sickle Cell Disease - The most common genetic disease in the world 🇬🇧',
      description:
        'Sickle Cell Disease also known as sickle cell anemia is an inherited genetic disorder that affects the hemoglobin in red blood cells.',
      content: post2_en,
    },
  ],

  archives: [
    /* Please move old posts HERE */
  ],
};
