// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDT9ydIZyM1hhUPvTfNsZSIL8fl1u5oqrw",
  authDomain: "zoopchat-2d76f.firebaseapp.com",
  projectId: "zoopchat-2d76f",
  storageBucket: "zoopchat-2d76f.appspot.com",
  messagingSenderId: "725112976926",
  appId: "1:725112976926:web:0464fa3e7d8101dfb5e00f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM loaded
document.addEventListener("DOMContentLoaded", async () => {
  const chatWithUID = localStorage.getItem("chatWithUID");

  if (!chatWithUID) {
    alert("No friend selected!");
    window.location.href = "list.html";
    return;
  }

  try {
    const friendDocRef = doc(db, "users", chatWithUID);
    const friendSnap = await getDoc(friendDocRef);

    if (!friendSnap.exists()) {
      throw new Error("Friend not found in database.");
    }

    const friend = friendSnap.data();

    // Set friend's name and profile picture in the chat header
    document.querySelector(".chat-header img.avatar").src = friend.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(friend.name);
    document.querySelector(".chat-header img.avatar").alt = friend.name;
    document.querySelector(".chat-header h4").textContent = friend.name;
    document.querySelector(".chat-header small").textContent = "online"; // You can update this dynamically if needed

  } catch (err) {
    console.error("Failed to load friend's data:", err.message);
    alert("Failed to load friend's info. Please try again.");
  }
});
