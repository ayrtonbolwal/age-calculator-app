let btnSend = document.getElementById("btnSend");

btnSend.addEventListener("click", () => {
  const inputs = {
    day: {
      inputDay: document.getElementById("dayField"),
      userDay: Number(document.getElementById("dayField").value),
      label: document.getElementById("labelDay")
    },
    month: {
      inputMonth: document.getElementById("monthField"),
      userMonth: Number(document.getElementById("monthField").value),
      label: document.getElementById("labelMonth")
    },
    year: {
      inputYear: document.getElementById("yearField"),
      userYear: Number(document.getElementById("yearField").value),
      label: document.getElementById("labelYear")
    }
  };
  const resultSpaces = {
    day: document.getElementById("daysResult"),
    month: document.getElementById("monthsResult"),
    year: document.getElementById("yearsResult"),
  };
  const errorSpaces = {
    day: document.getElementById("errorMessageDay"),
    month: document.getElementById("errorMessageMonth"),
    year: document.getElementById("errorMessageYear"),
  };

  if (
    verifyEmpty(inputs, errorSpaces) == false ||
    verifyIconrrectData(inputs, errorSpaces) == false ||
    verifyDayMonth(inputs, errorSpaces) == false
  ) {
    console.log("Error en datos");
    resultSpaces.day.innerText = "--";
    resultSpaces.month.innerText = "--";
    resultSpaces.year.innerText = "--";
  } else {
    calcResult(inputs, errorSpaces, resultSpaces);
  }
});

const verifyEmpty = (inputs, errorSpaces) => {
  let state = true;

  if (inputs.day.inputDay == "") {
    state = false;
    inputs.day.inputDay.style.borderColor = "#ff5757";
    inputs.day.label.color = "#ff5757";
    errorSpaces.day.innerText = "The field is required";
  }
  if (inputs.month.inputMonth == "") {
    state = false;
    inputs.month.inputDay.style.borderColor = "#ff5757";
    inputs.day.label.color = "#ff5757";
    errorSpaces.month.innerText = "The field is required";
  }
  if (inputs.year.inputYear == "") {
    state = false;
    inputs.year.inputDay.style.borderColor = "#ff5757";
    inputs.day.label.color = "#ff5757";
    errorSpaces.year.innerText = "The field is required";
  }

  return state;
};

const verifyIconrrectData = (inputs, errorSpaces) => {
  let state = true;
  let actualYear = new Date().getFullYear();

  if (inputs.day.userDay > 31 || inputs.day.userDay < 1) {
    inputs.day.inputDay.style.borderColor = "#ff5757";
    inputs.day.label.style.color = "#ff5757";

    state = false;
  }
  if (inputs.month.userMonth > 12 || inputs.month.userMonth < 1) {
    inputs.month.inputMonth.style.borderColor = "#ff5757";
    inputs.month.label.style.color = "#ff5757";

    state = false;
  }
  if (inputs.year.userYear > actualYear || inputs.year.userYear < 1) {
    inputs.year.inputYear.style.borderColor = "#ff5757";
    inputs.year.label.style.color = "#ff5757";

    state = false;
  }

  if (state == false) {
    errorSpaces.day.innerText = "Most be a valid date";
  }

  return state;
};

const verifyDayMonth = (inputs, errorSpaces) => {
  let state = true;

  if (
    (inputs.month.userMonth == 1 ||
      inputs.month.userMonth == 3 ||
      inputs.month.userMonth == 5 ||
      inputs.month.userMonth == 7 ||
      inputs.month.userMonth == 8 ||
      inputs.month.userMonth == 10 ||
      inputs.month.userMonth == 12) &&
    inputs.month.userDay > 31
  ) {
    state = false;
  }

  if (
    (inputs.month.userMonth == 4 ||
      inputs.month.userMonth == 6 ||
      inputs.month.userMonth == 9 ||
      inputs.month.userMonth == 11) &&
    inputs.month.userDay > 30
  ) {
    state = false;
  }

  if (inputs.month.userMonth == 2 && inputs.day.userDay > 29) {
    state = false;
  }

  if (state == false) {
    inputs.day.inputDay.style.borderColor = "#ff5757";
    errorSpaces.day.innerText = "Most be a valid day";
    inputs.day.label.style.color = "#ff5757";
  }

  return state;
};

const calcResult = (inputs, errorSpaces, resultSpaces) => {
  errorSpaces.day.innterText = "";
  errorSpaces.month.innterText = "";
  errorSpaces.year.innerText = "";

  inputs.day.inputDay.style.borderColor = "#dbdbdb";
  inputs.month.inputMonth.style.borderColor = "#dbdbdb";
  inputs.year.inputYear.style.borderColor = "#dbdbdb";

  let userDate = new Date(
    inputs.year.userYear,
    inputs.month.userMonth,
    inputs.day.userDay
  );
  let actualDate = new Date();

  let diff = actualDate - userDate;

  let milForDay = 24 * 60 * 60 * 1000;
  let milForMonth = milForDay * 30.44;
  let milForYear = milForDay * 365.25;

  //Calc complete years
  let years = Math.floor(diff / milForYear);
  //Remaning
  let remaning = diff % milForYear;

  //Calc complete months
  let months = Math.floor(remaning / milForMonth);
  //Remaning
  remaning = remaning % milForMonth;

  //Calc complete days
  let days = Math.floor(remaning / milForDay);

  resultSpaces.day.innerText = `${days}`;
  resultSpaces.month.innerText = `${months}`;
  resultSpaces.year.innerText = `${years}`;
};
