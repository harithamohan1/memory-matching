  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  let needChange = false;
  var firebaseConfig = {
    apiKey: "AIzaSyDDmmzzYj_aZ2OYGTzMurDkhQnWgAcaDeE",
    authDomain: "memory-matching-88f9f.firebaseapp.com",
    projectId: "memory-matching-88f9f",
    storageBucket: "memory-matching-88f9f.appspot.com",
    messagingSenderId: "1019749602013",
    appId: "1:1019749602013:web:25d5f89d11c2be28cf8134",
    measurementId: "G-F5ZJ3958G3"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  function signUp() {
      needChange = true;
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
      promise.catch(e=> alert(e.message));

      alert("Signed up.");
      
  }

  function signIn() {
    needChange = true;
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e=> alert(e.message));

    alert("Signed in " + email);
  }

  function signOut() {
      needChange = true;
      auth.signOut();
      alert("Signed out");
  }

  auth.onAuthStateChanged(function(user) {
      if(needChange){
        if(user) {
            let email = user.email;
            // alert("Active User " + email);
            window.location = 'entry.html';
        } else {
            //   alert("No Active User");
            window.location = 'index.html';
        }
    }
    needChange = false;
  });