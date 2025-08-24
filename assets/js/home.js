const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const transactionsList = document.getElementById("transactions");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let income = 0, expense = 0;


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const desc = text.value.trim();
  const amt = +amount.value;
  const type = document.querySelector('input[name="type"]:checked').value;

  if (!desc || !amt) return; 


  const li = document.createElement("li");
  li.textContent = `${desc}  ${type === "income" ? "+" : "-"}${amt}`;
  transactionsList.prepend(li);


  if (type === "income") {
    income += amt;
  } else {
    expense += amt;
  }

  const total = income - expense;

  balance.textContent = `${total}`;
  money_plus.textContent = `+${income}`;
  money_minus.textContent = `-${expense}`;


  text.value = "";
  amount.value = "";
});
