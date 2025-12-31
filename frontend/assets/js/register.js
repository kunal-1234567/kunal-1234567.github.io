 const message = document.getElementById("message");
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const dob = document.getElementById("ageInput");
 
  const mobile = document.getElementById("mo-number");


  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop form from submitting immediately
    message.textContent = ""; // clear old messages
    message.style.color = "red";

    // saari details check karne ke liye ki fill ki h ya nhi 
    if (
      nameField.value.trim() === "" ||
      emailField.value.trim() === "" ||
      password.value.trim() === "" ||
      confirmPassword.value.trim() === "" ||
      dob.value.trim() === "" ||
      mobile.value.trim() ===""
      
    ) {
      message.textContent = " Please complete all fields.";
      return;
    }

   
    if (password.value.trim() !== confirmPassword.value.trim()) {
      message.textContent = " Passwords do not match.";
      return;
    }

   
   
    const birthDate = new Date(dob.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

   
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 16) {
      message.textContent = " You must be at least 16 years old to register.";
      return;
    }

    callRegisterApi( nameField.value.trim(),
       emailField.value.trim(),
       password.value.trim(),
      dob.value.trim(),
       mobile.value.trim()
    );

  });

});



  function callRegisterApi(name,email,password,dob,mobile) {
     fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password,
      "dob": dob,
      "mobile": mobile
    })
  })
     .then(async (response) => {
      const data = await response.json();
      console.log(data);
      console.log(response.ok);
      if (response.ok) {
        message.style.color = "green";
        message.textContent = "Registration successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "../../../index.html";
        }, 2000);
      } else {
        message.textContent = data.message || "Registration failed.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      message.textContent = "Server error. Try again later.";
    });
}
