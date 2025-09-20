const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const transactionsList = document.getElementById("transactions");

function updateUI() {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  // Reset UI
  transactionsList.innerHTML = "";

  let income = 0, expense = 0;

  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = `${tx.description} ${tx.type === "income" ? "+" : "-"}${tx.amount}`;
    li.classList.add(tx.type === "income" ? "owed" : "owe");

    transactionsList.prepend(li);

    if (tx.type === "income") {
      income += tx.amount;
    } else {
      expense += tx.amount;
    }
  });

  const total = income - expense;

  balance.textContent = total.toFixed(2);
  money_plus.textContent = `+${income.toFixed(2)}`;
  money_minus.textContent = `-${expense.toFixed(2)}`;
}

// Load when page opens
updateUI();
