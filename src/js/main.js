const polynomialAdjustment = (n) => gauss(getA(n), getB(n));

const curveAdjustment = (n) => {
  let aux = gauss(getA(n), getB(n));
  aux.push(getR(n));
  return aux;
}