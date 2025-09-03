const form = document.getElementById("form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const transactionList = document.createElement("ul");
transactionList.id = "transaction-list";
document.querySelector(".container").appendChild(transactionList);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const description = textInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = document.querySelector('input[name="type"]:checked').value;

  if (description === "" || isNaN(amount)) {
    alert("Please enter valid details.");
    return;
  }

  const li = document.createElement("li");

  if (type === "income") {
    li.textContent = `${description} - You are owed $${amount.toFixed(2)}`;
    li.classList.add("owed");
  } else {
    li.textContent = `${description} - You owe $${amount.toFixed(2)}`;
    li.classList.add("owe");
  }

  transactionList.appendChild(li);

  // Reset form
  textInput.value = "";
  amountInput.value = "";
  document.getElementById("income").checked = true;
});
