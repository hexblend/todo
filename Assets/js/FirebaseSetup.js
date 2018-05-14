// Button IDs
// #LoginButton
// #LogOutButton

console.log("Starting Firebase...");
var GlobalData = {
    FirebaseConfig: {
        apiKey: "AIzaSyA8a6WnwAyOeq61gmtKwS6Oa0TNdY6M5Bo",
        authDomain: "vladb-todo.firebaseapp.com",
        databaseURL: "https://vladb-todo.firebaseio.com",
        projectId: "vladb-todo",
        storageBucket: "",
        messagingSenderId: "180513059705"
    },
    UserData: null
};
// Initialize Firebase
firebase.initializeApp(GlobalData.FirebaseConfig);
var Database = firebase.database();
var FB_DATA = {};
firebase.auth().useDeviceLanguage();
firebase
    .auth()
    .getRedirectResult()
    .then(function(result) {
        if (result.credential) {
            FB_DATA["Token"] = result.credential.accessToken;
        }
        FB_DATA["User"] = result.user;
        FB_DATA["CurrentUser"] = firebase.auth().currentUser;
        FB_DATA["UID"] = FB_DATA["CurrentUser"].uid;
        firebase
            .database()
            .ref("/Users/" + FB_DATA["UID"])
            .once("value")
            .then(function(snapshot) {
                if (!snapshot.val()) {
                    GlobalData.UserData = {
                        UID: FB_DATA["UID"],
                        Email: FB_DATA["CurrentUser"].email,
                        DisplayName: FB_DATA["CurrentUser"].displayName,
                        PhoneNumber: FB_DATA["CurrentUser"].phoneNumber,
                        ProfilePicture: FB_DATA["CurrentUser"].photoURL
                    };
                    firebase
                        .database()
                        .ref("/Users/" + FB_DATA["UID"])
                        .set(GlobalData.UserData);
                } else {
                    GlobalData.UserData = snapshot.val();
                }
            });
    })
    .catch(function(e) {
        FB_DATA["Error"] = {
            Code: e.code,
            MSG: e.message,
            Email: e.email,
            Credential: e.credential
        };
        console.error(FB_DATA);
    });
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("User Already Logged In.");
        if (location.pathname == "/todo/login.html") {
            location.pathname = "/todo/index.html";
        } else {
            var OUT = document.querySelector("#LogOutButton");
            if (OUT) {
                OUT.addEventListener("click", function() {
                    firebase
                        .auth()
                        .signOut()
                        .then(function() {
                            location.pathname = "/todo/login.html";
                        })
                        .catch(function(e) {
                            alert(e);
                            console.warn(e);
                        });
                });
            }
            // Do logged in firebase stuff
        }
    } else {
        console.log("User Log In Required.");
        if (location.pathname == "/todo/index.html") {
            location.pathname = "/todo/login.html";
        } else {
            var LB = document.querySelector("#LoginButton");
            if (LB) {
                LB.addEventListener("click", function() {
                    var provider = new firebase.auth.GoogleAuthProvider();
                    provider.addScope("profile");
                    provider.addScope("email");
                    firebase.auth().signInWithRedirect(provider);
                });
            }
        }
    }
});
