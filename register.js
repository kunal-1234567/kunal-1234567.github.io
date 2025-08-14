function checkAge() {
  let age = document.getElementById("ageInput").value;

  if (age >= 16) {
    window.location.href = "login.html"; 
  } else {
    message.textContent = "Sorry, you must be at least 16 years old to create account."; 
  }
}
