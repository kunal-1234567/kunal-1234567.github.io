 document.getElementById("loginForm").addEventListener("submit", function(event) {
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();
            let message = document.getElementById("message");

            if (email === "" || password === "") {
                event.preventDefault(); 
                message.textContent = "❌ You must enter both e-mail and password!";
            } else {
                message.textContent = ""; 
            }
        });
    