const jugement = { BAD: 'bad', MEDIUM: 'medium', GOOD: 'good' };
const { BAD, MEDIUM, GOOD } = jugement;

function evaluate(rate) {
  if (rate < 1 || rate > 5) {
    return null;
  }

  if (rate < 3) return BAD;
  if (rate >= 3 && rate < 4) return MEDIUM;
  if (rate >= 4) return GOOD;
}

export { evaluate };
