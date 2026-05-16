const myfriendmessage = document.getElementById("message");

document.addEventListener("DOMContentLoaded", function () {
  fetchMyFriends();
});

function fetchMyFriends() {

  const token = localStorage.getItem("token");
  
  fetch(`http://localhost:5000/api/friends/:`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    }
  })
    .then(async (response) => {
      const result = await response.text();


      console.log("API response:", result);

     if (response.ok) {
        // Double check if 'result.data' is the array
        if (result.data && result.data.length > 0) {
          displayMyFriends(result.data); 
        } else {
          myfriendmessage.textContent = "No friends found.";
        }
      } else if (response.status === 401) {
        window.location.href = "../../../index.html";
      } else {
        myfriendmessage.textContent = "Failed to fetch friends.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      myfriendmessage.style.color = "red";
      myfriendmessage.textContent = "Server error. Try again later.";
    });
}

function displayMyFriends(friends) {
  const friendsList = document.getElementById("friendsList");
  friendsList.innerHTML = "  ";

  friends.forEach(friend => {
    const listItem = document.createElement("li");
    listItem.textContent = `${friend.name} (${friend.email})`;
    friendsList.appendChild(listItem);
  });
}
