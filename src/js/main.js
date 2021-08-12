const f_one_adjustment = (n) => gauss(getA(n), getB(n));

const polynomialAdjustment = (n) => gauss(getA(n + 1), getB(n + 1));

const getA = (n) => {
  const { x, y } = orderedPoints();
  let a = [];

  for (let i = 0; i < n; i++) {
    a.push([]);
    for (let j = 0; j < n; j++) {
      if (i == 0 && j == 0) {
        a[0][0] = x.length;
      } else if (i == 0) {
        a[i][j] = x.reduce((acc, curr) => acc + Math.pow(curr, j), 0);
      } else {
        a[i][j] = x.reduce((acc, curr) => acc + Math.pow(curr, i + j), 0);
      }
    }
  }

  return a;
};

const getB = (n) => {
  const { x, y } = orderedPoints();
  let b = [];

  for (let i = 0; i < n; i++) {
    b[i] = 0;
    for (let j = 0; j < y.length; j++) {
      b[i] += x[j] ** i * y[j];
    }
  }
  return b;
};
