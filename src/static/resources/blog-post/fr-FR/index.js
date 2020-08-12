import post1_fr from './le-projet-drepakin.md';
import post2_fr from './a-propos-de-la-drepanocytose.md';
import post3_fr from './drepakin-app-comment-ca-marche.md';
import scd from '../../../assets/scd.jpg';

export default {
  /* A L'AFFICHE */
  head: {
    id: 3689,
    date: '19 Juin 2020',
    title: 'Le projet Drepakin',
    description:
      "Le projet Drepakin a pour ambition d'aider les patients atteints de drépanocytose à accéder aux meilleurs soins partout dans le monde.",
    content: post1_fr,
    image: scd,
    imageText: 'Sickle Cells',
  },

  /* LES NOUVELLES D'ACTUALITE */
  news: [
    {
      id: 3689,
      date: '01 Juin 2020',
      title: 'Le projet Drepakin',
      description:
        "Le projet Drepakin a pour ambition d'aider les patients atteints de drépanocytose à accéder aux meilleurs soins partout dans le monde.",
      content: post1_fr,
    },
    {
      id: 3688,
      date: '31 Mai 2020',
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
  trash: [
    {
      id: 3690,
      date: '01 Juin 2020',
      title: "L'application Drepakin: Comment ça marche ?",
      description:
        "L'application Drepakin vous aide à trouver des centres de santé experts de la drépanocytose.",
      content: post3_fr,
    },
  ],
};
