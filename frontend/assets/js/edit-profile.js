// Get form and inputs
const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile-number");
const nameInput = document.getElementById("name");
const password = document.getElementById("password");
const message = document.getElementById("message");


form.addEventListener("submit", function(event) {
  event.preventDefault(); 

  
  if (!email.value && !mobile.value && !nameInput.value && !password.value) {
    message.textContent = "Please fill at least one field!";
    message.style.color = "red";
    return;
  }

  
  let profileData = {
    email: email.value,
    mobile: mobile.value,
    name: nameInput.value,
    password: password.value
  };


  

  message.textContent = "Changes saved successfully!";
  message.style.color = "green";

  
  setTimeout(() => {
    window.location.href = "../profile.html";
  }, 1500);
});
