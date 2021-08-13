const polynomialAdjustment = (n) => gauss(getA(n), getB(n));

const f_one_adjustment = (n) => {
  let aux = gauss(getA(n), getB(n));
  aux.push(getR(n));
  return aux;
}

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

const getR = (n) => {
  const data = getDataPolynomial(n);

  const sumy2 = data.sample.reduce((acc, curr) => acc + curr ** 2, 0);
  const sumy = data.sample.reduce((acc, curr) => acc + curr, 0);
  const ybar = data.polynomial;
  const sume2 = data.sample
    .map((y, i) => (y - ybar[i]) ** 2)
    .reduce((acc, curr) => acc + curr, 0);

  return 1 - (data.x.length * sume2) / (data.x.length * sumy2 - sumy ** 2);
};
