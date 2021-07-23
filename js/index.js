const amount = document.querySelector(".tip-amount-result");
const total = document.querySelector(".tip-total-result");

const pplInputGroup = document.querySelector(".people-input-group");
const billInputGroup = document.querySelector(".bill-input-group");

const billInput = document.querySelector(".bill-input");
const pplNbrInput = document.querySelector(".people-number-input");

// * Reset Button

const resetButton = document.querySelector(".btn-reset-lg");

resetButton.addEventListener("click", () => {
  billInput.value = "";
  customTipInput.value = "";
  pplNbrInput.value = "";
  amount.innerHTML = "0.00";
  total.innerHTML = "0.00";
  pplInputGroup.removeAttribute("id");
  billInputGroup.removeAttribute("id");
});

// * Tips Buttons

const nbrOfButton = document.querySelectorAll(".tip-btn").length;
const tipButtons = document.querySelectorAll(".tip-btn");

for (let i = 0; i < nbrOfButton; i++) {
  tipButtons[i].addEventListener("click", function () {
    let pressedButton = parseFloat(this.innerHTML);
    currentBill = billInput.value;
    currentNbrOfPeople = pplNbrInput.value;

    if (currentBill > 0 && currentNbrOfPeople > 0) {
      pplInputGroup.removeAttribute("id");
      billInputGroup.removeAttribute("id");
      let result = calcTipPercentage(
        currentBill,
        currentNbrOfPeople,
        pressedButton
      );
      amount.innerHTML = result[0];
      total.innerHTML = result[1];
      console.log("Result", result);
    } else {
      pplInputGroup.setAttribute("id", "not-zero-active");
      billInputGroup.setAttribute("id", "not-zero-active");
    }
  });
}

// * Tips Input

const customTipInput = document.querySelector(".custom-tip-input");
customTipInput.addEventListener("keydown", function (e) {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    let inputValue = parseFloat(this.value);
    currentBill = billInput.value;
    currentNbrOfPeople = pplNbrInput.value;

    if (currentBill > 0 && currentNbrOfPeople > 0) {
      pplInputGroup.removeAttribute("id");
      let result = calcTipPercentage(
        currentBill,
        currentNbrOfPeople,
        inputValue
      );
      amount.innerHTML = result[0];
      total.innerHTML = result[1];
      console.log("Result", result);
    } else {
      pplInputGroup.setAttribute("id", "not-zero-active");
      billInputGroup.setAttribute("id", "not-zero-active");
    }
  }
});

// * Tip calculation function

function calcTipPercentage(bill, nbrOfPpl, tipPercentage) {
  let billPerPerson = bill / nbrOfPpl;
  let tipAmountPerPerson = (billPerPerson * tipPercentage) / 100;
  let totalAmountPerPerson = billPerPerson + tipAmountPerPerson;
  return [tipAmountPerPerson.toFixed(2), totalAmountPerPerson.toFixed(2)];
}
