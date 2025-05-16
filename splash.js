// splash.js

// Dynamically load Firebase libraries
(async function() {
  // Load Firebase App
  await import('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
  await import('https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js');

  // Your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDT9ydIZyM1hhUPvTfNsZSIL8fl1u5oqrw",
    authDomain: "zoopchat-2d76f.firebaseapp.com",
    projectId: "zoopchat-2d76f",
    storageBucket: "zoopchat-2d76f.firebasestorage.app",
    messagingSenderId: "725112976926",
    appId: "1:725112976926:web:0464fa3e7d8101dfb5e00f",
  
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // After 5 seconds, check login status
  setTimeout(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.location.href = "list.html";
      } else {
        window.location.href = "register.html";
      }
    });
  }, 5000);
})();
