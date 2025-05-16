(async function () {
    // Load Firebase SDKs
    await import('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
    await import('https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js');
    await import('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js');
  
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDT9ydIZyM1hhUPvTfNsZSIL8fl1u5oqrw",
    authDomain: "zoopchat-2d76f.firebaseapp.com",
    projectId: "zoopchat-2d76f",
    storageBucket: "zoopchat-2d76f.firebasestorage.app",
    messagingSenderId: "725112976926",
    appId: "1:725112976926:web:0464fa3e7d8101dfb5e00f",
    
  };
  
    firebase.initializeApp(firebaseConfig);
  
    const auth = firebase.auth();
    const db = firebase.firestore();
  
    // Converts file to base64
    function toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  
    document.getElementById("googleSignIn").addEventListener("click", async () => {
      const name = document.getElementById("name").value.trim();
      const thought = document.getElementById("thought").value.trim();
      const profilePic = document.getElementById("profilePic").files[0];
  
      if (!name || !thought || !profilePic) {
        alert("Please fill all fields and upload a profile picture.");
        return;
      }
  
      const provider = new firebase.auth.GoogleAuthProvider();
  
      try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
  
        const docRef = db.collection("users").doc(user.uid);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
          window.location.href = "chat.html";
          return;
        }
  
        const profileBase64 = await toBase64(profilePic);
  
        await docRef.set({
          uid: user.uid,
          name,
          email: user.email,
          thought,
          profilePic: profileBase64,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
  
        alert("Account created!");
        window.location.href = "list.html";
      } catch (error) {
        console.error("Registration error:", error.message);
        alert("Registration failed. Try again.");
      }
    });
  })();
  