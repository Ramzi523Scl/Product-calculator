let name = document.querySelector("#name");
let price = document.querySelector("#price");
let amount = document.querySelector("#amount");
let add = document.querySelector("#add");
let table = document.querySelector("#table");
let total = document.querySelector("#total");

add.addEventListener("click", addProductInTable);

function addProductInTable(event) {
  let valuesFromFields = name.value + price.value + amount.value;
  let areFieldsEmpty = checkEmptyFiends(valuesFromFields);
  if (!areFieldsEmpty) {
    let cost = getFinalProductPrice(price.value, amount.value);
    let fieldsArr = [name.value, price.value, amount.value, cost, "удалить"];

    let emptyTr = createRowForTable();
    let stuffedTr = addValueInTableRow(emptyTr, fieldsArr);
    table.append(stuffedTr);
    clearFields(fieldsArr);

    getTotalCostOfProducts();
  }
}
const checkEmptyFiends = (text) => {
  let symbolsArr = text.split("");
  for (let symbol of symbolsArr) {
    if (symbol !== " ") return false;
  }
  return true;
};
const getFinalProductPrice = (price, amount) => price * amount;

const createRowForTable = () => {
  let tr = document.createElement("tr");
  let nameCell = createCell("name");
  let priceCell = createCell("price");
  let amountCell = createCell("amount");
  let costCell = createCell("cost");
  let removeCell = createCell("remove");

  tr.append(nameCell, priceCell, amountCell, costCell, removeCell);
  return tr;
};

const createCell = (className) => {
  let td = document.createElement("td");
  td.classList.add(className);
  let isRemoveAndCost = className === "remove" || className === "cost";
  if (!isRemoveAndCost) td.addEventListener("dblclick", editValueCell);
  else if (className === "remove")
    td.addEventListener("click", removeRowInTable);
  return td;
};

function editValueCell(event) {
  let cell = this;
  let valueCell = cell.innerHTML;

  cell.innerHTML = `<input value = "${valueCell}"/>`;
  let input = cell.querySelector("input");
  input.addEventListener("keypress", saveValueCell);
}

function saveValueCell(event) {
  let enter = event.key === "Enter";
  if (enter) {
    let cell = this.parentElement;
    let tr = cell.parentElement;
    let newValueCell = this.value;
    cell.innerHTML = newValueCell;

    let costCell = tr.querySelector(".cost");
    costCell.innerHTML = getNewValueCost(tr);
    getTotalCostOfProducts();
  }
}
const getNewValueCost = (tr) => {
  let priceCell = tr.querySelector(".price");
  let amountCell = tr.querySelector(".amount");
  return priceCell.innerHTML * amountCell.innerHTML;
};
function removeRowInTable(event) {
  let tr = this.parentElement;
  tr.remove();
  getTotalCostOfProducts();
}
const addValueInTableRow = (tr, values) => {
  let tds = tr.querySelectorAll("td");
  for (let i = 0; i < tds.length; i++) {
    tds[i].innerHTML = values[i];
  }
  return tr;
};
const clearFields = (fields) => {
  name.value = null;
  price.value = null;
  amount.value = null;
};

const getTotalCostOfProducts = () => {
  let totalCost = 0;
  let costCells = table.querySelectorAll("tr .cost");
  for (let cell of costCells) {
    totalCost += Number(cell.innerHTML);
  }
  total.innerHTML = totalCost;
};
