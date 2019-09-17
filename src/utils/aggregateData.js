const aggregateFunc = {
  sum: data => data.reduce((a, b) => a + b.y, 0),
  max: data => data.reduce((a, b) => (a > b.y ? a : b.y), 0),
  min: data => data.reduce((a, b) => (a < b.y ? a : b.y), 0),
  avg: data => data.reduce((a, b) => a + b.y, 0) / data.length
};

export default function aggregateData(func, data) {
  const reduced = {};
  const uniqueX = [...new Set(data.map(d => d.x))];
  uniqueX.forEach(x => {
    reduced[x] = {
      x,
      y: aggregateFunc[func === 'percent' ? 'sum' : func](
        data.filter(d => d.x === x)
      )
    };
  });

  if (func === 'percent') {
    const total = Object.values(reduced).reduce((a, b) => a + b.y, 0);
    return Object.values(reduced).map(d => ({
      ...d,
      y: (100 * d.y) / total
    }));
  }

  return Object.values(reduced);
}
