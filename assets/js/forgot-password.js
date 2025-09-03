function validatePassword() {
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const message = document.getElementById("message");

   
    message.textContent = "";

    
    if (password === "" || confirmPassword === "") {
        message.textContent = "Password fields cannot be empty!";
        return false; 
    }

  
    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        return false; 
    }

   
    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters long!";
        return false;
    }

    
    return true; 
}
