import post1_fr from './le-projet-drepakin.md';
import post2_fr from './a-propos-de-la-drepanocytose.md';
import scd from '../../../assets/scd.jpg';

export default {
  /* A L'AFFICHE */
  head: {
    id: 3689,
    date: '19 Juin 2020',
    title: 'Le projet Drepakin',
    description:
      "Le projet Drepakin a pour ambition d'aider les patients atteints de drépanocytose à accéder aux meilleurs soins possibles partout dans le monde.",
    content: post1_fr,
    image: scd,
    imageText: 'Sickle Cells',
  },

  /* LES NOUVELLES D'ACTUALITE */
  news: [
    {
      id: 3689,
      date: '19 Juin 2020',
      title: 'Le projet Drepakin',
      description:
        "Le projet Drepakin a pour ambition d'aider les patients atteints de drépanocytose à accéder aux meilleurs soins possibles partout dans le monde.",
      content: post1_fr,
    },
    {
      id: 3688,
      date: '11 Mai 2020',
      title:
        'La drépanocytose - La maladie génétique la plus répandue dans le monde',
      description:
        "La drépanocytose également connue sous le nom d'anémie falciforme est une maladie génétique héréditaire qui affecte l'hémoglobine dans les globules rouges.",
      content: post2_fr,
    },
  ],

  /* INFORMATIONS OBSOLETES */
  archives: [
    /* Please move old posts HERE */
  ],
};
