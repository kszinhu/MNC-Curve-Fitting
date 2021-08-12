const polynomialAdjustment = () =>
  compactGauss(getA(), getB(), parseInt(document.querySelector("#grau").value));

const getA = () => {
  const { x, y } = orderedPoints();
  const n = parseInt(document.querySelector("#grau").value);
  let a = [];

  for (let i = 0; i < n; i++) {
    a.push([]);
    for (let j = 0; j < n; j++) {
      if (i == 0 && j == 0) {
        a[0][0] = n;
      } else if (i == 0) {
        a[i][j] = x.reduce((acc, curr) => acc + Math.pow(curr, j), 0);
      } else {
        a[i][j] = x.reduce((acc, curr) => acc + Math.pow(curr, i + j), 0);
      }
    }
  }

  return a;
};

const getB = () => {
  const { x, y } = orderedPoints();
  const n = parseInt(document.querySelector("#grau").value);
  let b = [];

  for (let i = 0; i < n; i++) {
    if (i == 0) b[0] = y.reduce((acc, curr) => acc + curr, 0);
    else
      b[i] =
        x.reduce((acc, curr) => acc + Math.pow(curr, i), 0) *
        y.reduce((acc, curr) => acc + curr, 0);
  }
  return b;
};