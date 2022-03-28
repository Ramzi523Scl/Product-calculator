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
  return td;
};

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
