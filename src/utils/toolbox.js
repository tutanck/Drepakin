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

const slug = (fileName, id) => {
  const rawSlug = path.basename(fileName, path.extname(fileName)).split('.')[0];

  if (id) {
    return rawSlug + '-' + id;
  }

  return rawSlug;
};

export { ID, pick, pop, noOp, slug };
