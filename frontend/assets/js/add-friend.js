    const addfriendMsg = document.getElementById("message");
    document.getElementById("addFriendForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();

        
        addfriendMsg.textContent = "";
        addfriendMsg.style.color = "red";
        if (name === "" || email === "") {
             event.preventDefault(); 
            addfriendMsg.textContent = "Please enter both name and email.";
            return;  
        }
        callAddFriendApi(name, email);
    });

    function callAddFriendApi(name, email) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/friend", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      "email": email,
      "name": name      
    })
  })
     .then(async (response) => {
      const data = await response.json();
      console.log(data);
      console.log(response.ok);
      if (response.ok) {
        addfriendMsg.style.color = "green";
        addfriendMsg.textContent = " Friend added successfully";         
        window.location.href= "../pages/home.html";
         } else if (response.status === 401) {
            addfriendMsg.style.color = "red";
        addfriendMsg.textContent = "Unauthorized. Please log in again.";
        window.location.href= "../../../index.html";
      } else {
        addfriendMsg.style.color = "red";
        addfriendMsg.textContent = "Failed to add friend. Try again.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      addfriendMsg.style.color = "red";
      addfriendMsg.textContent = "Server error. Try again later.";
    });
}