"use strict";

const selectTipBtn = document.querySelectorAll(".tip-percent-input");
const errorMsg = document.querySelector(".err-txt");

const numberOfPeopleInput = document.querySelector("#people");
const billInput = document.querySelector(".bill-price");
const customInput = document.querySelector(".btn-custom");
const numInput = document.querySelector(".num");

const tipamountPerPerson = document.querySelector(".tip-amount-value");
const totalamountPerPerson = document.querySelector(".total-amount-value");

const resetBtn = document.querySelector(".reset-btn");

resetBtn.addEventListener("click", function (e) {
  // reset inputs and values
  billInput.value = "";
  customInput.value = "";
  numberOfPeopleInput.value = "";
  tipamountPerPerson.innerHTML = "$0.00";
  totalamountPerPerson.innerHTML = "$0.00";
  numInput.classList.remove("error");
  errorMsg.classList.add("close");

  selectTipBtn.forEach((tipBtn) => {
    tipBtn.classList.remove("active");
  });
  resetBtn.classList.remove("active");

  //reset percentage btn
  selectTipBtn.forEach((tipBtn) => {
    tipBtn.classList.remove("active");
  });
});

selectTipBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    selectTipBtn.forEach((tipBtn) => {
      tipBtn.classList.remove("active");
      resetBtn.classList.add("active");
    });

    if (event.target.classList.contains("btn-custom")) {
      event.target.parentElement.classList.add("active");
    } else {
      event.target.classList.add("active");
    }

    calculateTip();
    isZero();
  });
});

const calculateTip = function () {
  const billValue = parseFloat(billInput.value);
  const numberOfPeople = parseFloat(numInput.value);
  const customTipActive = document.querySelector(".select-tip-custom.active");

  let tipPercentage = parseInt(
    document.querySelector(".tip-percent-input.active").dataset.percentage
  );

  if (customTipActive) {
    tipPercentage = parseFloat(document.querySelector(".btn-custom").value);
  }

  const tipAmount = parseFloat(
    ((tipPercentage / 100) * billValue) / numberOfPeople
  ).toFixed(2);
  const totalAmount = parseFloat(
    billValue / numberOfPeople +
      ((tipPercentage / 100) * billValue) / numberOfPeople
  ).toFixed(2);

  // const totalAmount = parseFloat((tipPercentage/100) * billValue).toFixed(2);
  console.log(tipAmount);
  console.log(totalAmount);

  tipamountPerPerson.innerHTML = `$${tipAmount}`;
  totalamountPerPerson.innerHTML = `$${totalAmount}`;
};

const isZero = function () {
  if (numberOfPeopleInput.value == 0) {
    numInput.classList.add("error");
    errorMsg.classList.remove("close");
  } else {
    errorMsg.classList.add("close");
    numInput.classList.remove("error");
  }
};

const isNumber = function () {
  if (
    value === "Backspace" ||
    value === "ArrowLeft" ||
    value === "ArrowRight" ||
    value === "."
  ) {
    return true;
  }

  const regex = /^[0-9]+$/;
  return regex.test(value);
};

billInput.addEventListener("keyup", function () {
  calculateTip();
  isZero();
});

customInput.addEventListener("keyup", function () {
  calculateTip();
  isZero();
});

numberOfPeopleInput.addEventListener("keyup", function () {
  calculateTip();
  isZero();
});

numberOfPeopleInput.addEventListener("keydown", function (event) {
  calculateTip();
  isZero();

  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
billInput.addEventListener("keydown", function (event) {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});

customInput.addEventListener("keydown", function (event) {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
