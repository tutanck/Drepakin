import path from 'path';

const ID = () => {
  const timestamp = new Date().getUTCMilliseconds();
  const id = timestamp.toString();
  return id;
};

const pick = (array, position) => {
  if (array && position !== undefined && position !== null) {
    const elem = array[position];
    return elem;
  }
};

const pop = (array) => pick(array, 0);

const noOp = () => {};

const slugSeparator = '-';

const slugify = (fileName, id) => {
  if (!(id && Number.isInteger(id))) {
    throw new Error('UNABLE_TO_SLUGIFY_WITHOUT_VALID_ID');
  }

  const tmp = path.basename(fileName, path.extname(fileName)).split('.')[0];

  const slug = tmp + slugSeparator + id;

  return slug;
};

const getIdFromSlug = (slug) => {
  const id = slug.split(slugSeparator).pop();
  return id;
};

export { ID, pick, pop, noOp, slugify, getIdFromSlug };
