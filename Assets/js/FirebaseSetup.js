console.log("Starting Firebase...");
var _GlobalData = {
    FirebaseConfig: {
        apiKey: "AIzaSyA8a6WnwAyOeq61gmtKwS6Oa0TNdY6M5Bo",
        authDomain: "vladb-todo.firebaseapp.com",
        databaseURL: "https://vladb-todo.firebaseio.com",
        projectId: "vladb-todo",
        storageBucket: "",
        messagingSenderId: "180513059705"
    }
};
// Initialize Firebase
firebase.initializeApp(_GlobalData.FirebaseConfig);
firebase.auth().useDeviceLanguage();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("User Already Logged In.");
        if (location.pathname == "/todo/login.html") {
            location.pathname = "/todo/index.html";
        } else {
        }
    } else {
        console.log("User Log In Required.");
        if (location.pathname == "/todo/index.html") {
            location.pathname = "/todo/login.html";
        } else {
        }
    }
});
