/**
 * Creates table to insert the X points and their respective Y.
 */
const resize = () => {
  let table = document.querySelector("#table");
  let n = parseInt(document.querySelector("#n").value);
  table.innerHTML = "";
  if (isNaN(n) || n < 1) {
    return;
  }

  let row = new Array(3);
  let cells = new Array(3);

  Array.from({ length: 3 }, (v, k) => k).forEach((i) => {
    row[i] = document.createElement("tr");
    cells[i] = document.createElement("th");
  });

  // Labels
  cells[0].innerHTML = "i";
  cells[1].innerHTML = "x";
  cells[2].innerHTML = "y";

  row.map((element, index) => {
    element.appendChild(cells[index]);
  });

  for (let index = 0; index < n; index++) {
    cells[0] = document.createElement("th");
    cells[0].innerHTML = index + 1;
    for (let j = 1; j < 3; j++) {
      cells[j] = document.createElement("td");
      cells[j].innerHTML = `<input type="text" id="point${index}${j}">`;
    }
    for (let j = 0; j < 3; j++) row[j].appendChild(cells[j]);
  }
  for (let index = 0; index < 3; index++) table.appendChild(row[index]);
};

/**
 * Function to create popup for the information button.
 */
const infoButton = () => {
  const body = document.querySelector("body");
  const elem = document.createElement("details");
  body.appendChild(elem);
  elem.outerHTML = `
    <div id="modal-info" open>
      <div class="details-modal-overlay"></div>
      <div class='details-modal'>
        <div class='details-modal-close' onclick='document.querySelector("#modal-info").remove()' style="cursor: pointer">
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z'
              fill='black'
            />
          </svg>
        </div>
        <div class='details-modal-title'>
          <h1>Criado por:</h1>
        </div>
        <div class='details-modal-content'>
          <p>
            Matheus Ribeiro e Cassiano Rodrigues
          </p>
        </div>
      </div>
    </div>
    `;
};

/**
 * Function that calculates a mathematical function.
 * @param { Input } string mathematics.
 * @param { x } array of x points.
 */
const mathFunction = (input, x) => {
  return x.map((el) => math.evaluate(input, { x: el }));
};

// Fills array from i to n with v
function array_fill(i, n, v) {
  var a = [];
  for (; i < n; i++) {
    a.push(v);
  }
  return a;
}

/**
 * Function to get Points from Table.
 * @returns { Object } { xy: [x, y], matrix: [[x], [y]] }
 */
const getPoints = () => {
  let auxX = [],
    auxY = [],
    xy = [];

  // "row[0].cells.length - 1" , equals the number of columns from 1
  let row = document.getElementsByTagName("table")[0].rows;
  for (let i = 1; i <= row[0].cells.length - 1; i++) {
    auxX.push(row[1].cells[i].firstChild.value);
    auxY.push(row[2].cells[i].firstChild.value);
  }

  // pairs x and y -> P(x,y)
  auxX.forEach((element, index) => {
    xy.push([element, auxY[index]]);
  });

  return { xy, matrix: [auxX, auxY] };
};

/**
 * Function to sort the X and Y points, according to X.
 * @returns { Object } { x: [x], y: [y] }
 */
const orderedPoints = () => {
  let { xy } = getPoints();

  xy.sort((a, b) => a[0] - b[0]); // Sorting by x
  let x = xy.map((element) => Number(element[0]));
  let y = xy.map((element) => Number(element[1]));

  return { x, y };
};

/**
 * Function to clear all point inputs of the points table.
 */
const clearInputs = () => {
  [...document.querySelectorAll("table input")].map((el) => (el.value = ""));
};

/**
 * Function to select all Toggle from curved lists.
 */
const selectAll = () =>
  [...document.querySelectorAll(".toggles li .toggle-control input")].map(
    (el) => (el.checked = !el.checked)
  );

/**
 * Função da preguiça
 * Function that fills the points table fields sequentially.
 */
const laziness = () => {
  const inputs = [...document.querySelectorAll("table input")];
  document.querySelector("#grau").value = inputs.length / 2;
  inputs.slice(0, inputs.length).map((elem, idx) => (elem.value = idx + 1));
  inputs
    .slice(inputs.length)
    .map((elem, idx) => (elem.value = inputs.length / 2 + idx));
};

/**
 * Function that generates graphs.
 * @param { info } object of the chart data.
 */
const genChart = (info) => {
  const chartDiv = document.querySelector("#chart-div");
  const chartCanvas = document.createElement("canvas");
  chartCanvas.id = "chart";
  chartDiv.innerHTML = '';
  chartDiv.appendChild(chartCanvas);
  chartDiv.style.display = "block";

  const data = {
    labels: info.x,
    datasets: [
      {
        type: "scatter",
        label: "Pontos da Amostra",
        backgroundColor: "#D12A2A",
        borderColor: "#B01717",
        borderWidth: 3,
        data: info.sample,
      },
      {
        type: "line",
        label: `P${info.degree}(x)`,
        borderColor: "#2196F3",
        backgroundColor: "#2196F3",
        borderWidth: 2,
        cubicInterpolationMode: "monotone",
        data: info.polynomial,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      legend: {
        position: "top",
      },
      plugins: {
        title: {
          display: true,
          text: "Adjustment chart",
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scale: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  new Chart(chartCanvas, config);
};

/**
 * Function that gets the data array.
 * @returns array
 */
const getDataPolynomial = (n) => {
  const { x, y } = orderedPoints();

  const coefficients = polynomialAdjustment(n);
  let fx = "";
  coefficients.forEach((el, index, array) => {
    index != array.length - 1
      ? (fx += `${el}x^${index} + `)
      : (fx += `${el}x^${index}`);
  });
  const data = {
    degree: Number(n),
    x,
    sample: y,
    fx,
    polynomial: mathFunction(fx, x),
  };

  return data;
};

/**
 * Function to show the result obtained
 * @param { arrayResult } array data.
 * @param { type } string type.
 */
const showResult = (arrayResult, type) => {
  document.querySelector(`#result-div`).innerHTML = `
    <div class="sub-title">
      <div class="line"></div>
      <span>Resultados</span>
      <div class="line"></div>
    </div>
    <div class="result-content"></div>
  `;
  let result = document.querySelector(`.result-content`);

  if (type == "polynomial") {
    arrayResult.forEach((el, index) => {
      let newSpan = document.createElement("div");
      newSpan.className = "result-span";
      newSpan.innerHTML = `<span class="result-label">a[${index}] =</span><span>${el}</span>`;
      result.appendChild(newSpan);
    });
  } else if (type == "curve") {
    arrayResult.forEach((el, index) => {
      if (index == arrayResult.length) label = "R";
      else index == 0 ? (label = "a") : (label = "b");

      let newSpan = document.createElement("div");
      newSpan.className = "result-span";
      newSpan.innerHTML = `<span class="result-label">${label}</span><span>${el}</span>`;
      result.appendChild(newSpan);
    });
  }

  document.querySelector("#result-div").style.display = "block";
};
