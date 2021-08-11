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

const selectAll = () =>
  Array.from(
    document.querySelectorAll(".toggles li .toggle-control input")
  ).map((el) => (el.checked = true));
