    document.addEventListener("DOMContentLoaded", function() { 
    const form = document.getElementById("loginForm");
    const messageElement = document.getElementById("message");
    if (!form || !messageElement) {
        console.error("Form or message element not found!");  
        return;
    }
    form.addEventListener("submit", function(event) {
        
        let name = document.getElementById("name").value.trim();
        let mobile = document.getElementById("mobile").value.trim();

        
        messageElement.textContent = "";
        messageElement.style.color = "red";
        if (name === "" || mobile === "") {
             event.preventDefault(); 
            messageElement.textContent = "❌ Your details are not filled! Please enter both name and mobile number.";
            return;  
        }
      
        if (!/^\d{10}$/.test(mobile)) {
            messageElement.textContent = "❌ Please enter a valid 10-digit mobile number (e.g., 1234567890).";
            return;
        }
       
        messageElement.style.color = "green";
        messageElement.textContent = "✔ Friend added successfully!";

      
      
    });

     setTimeout(() => {
   
}, 1000);
});