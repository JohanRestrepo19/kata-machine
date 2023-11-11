const two_crystal_balls = (breaks: boolean[]): number => {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));
  let i = jumpAmount;

  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) break;
  }

  i -= jumpAmount;

  for (let j = i; j < breaks.length; j++) {
    if (breaks[j]) return j;
  }

  return -1;
};

export default two_crystal_balls;
