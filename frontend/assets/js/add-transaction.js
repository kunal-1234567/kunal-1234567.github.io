const ownerId = "123"; // same value that works in backend

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");
  fetchFriends();
});

async function fetchFriends() {
  console.log("Fetching friends for ownerId:", ownerId);

  try {
    const response = await fetch(
      `http://localhost:5000/api/friends/${ownerId}`
    );

    console.log("Response status:", response.status);

    const result = await response.json();
    console.log("API response:", result);

    displayFriends(result.data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function displayFriends(friends) {
  console.log("Friends received in frontend:", friends);

  const paidBySelect = document.getElementById("paidBy");
  const membersDiv = document.querySelector(".members");

  paidBySelect.innerHTML = "";
  membersDiv.innerHTML = "";

  const youOption = document.createElement("option");
  youOption.value = ownerId;
  youOption.textContent = "You";
  paidBySelect.appendChild(youOption);

  if (!friends || friends.length === 0) {
    console.warn("No friends to display");
    return;
  }

  friends.forEach(friend => {
    const option = document.createElement("option");
    option.value = friend.friend_id;
    option.textContent = friend.name;
    paidBySelect.appendChild(option);

    const label = document.createElement("label");
    label.style.display = "block";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = friend.friend_id;

    label.appendChild(checkbox);
    label.append(" " + friend.name);

    membersDiv.appendChild(label);
  });
}
