 
 const loginMsg = document.getElementById("loginmessage");
 document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();
            let message = document.getElementById("message");

            if (email === "" || password === "") {
                message.textContent = " You must enter both e-mail and password!";
            } else {
                callLoginApi(email, password);
                }
        });


    function callLoginApi(email,password) {
    console.log(password)
     fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": email,
      "password": password      
    })
  })
     .then(async (response) => {
      const data = await response.json();
      console.log(data);
      console.log(response.ok);
      if (response.ok) {
        //save token to local storage
        localStorage.setItem("token", data.token);
        loginMsg.style.color = "green";
        loginMsg.textContent = " Login successful! Redirecting...";         
        window.location.href= "../Frontend/frontend/pages/home.html";
         } else if (response.status === 401) {
            loginMsg.style.color = "red";
        loginMsg.textContent = data.message || "Loginfailed.";
      } else {
        loginMsg.style.color = "red";
        loginMsg.textContent = "Login failed. Try again.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      loginMsg.style.color = "red";
      loginMsg.textContent = "Server error. Try again later.";
    });
}



    