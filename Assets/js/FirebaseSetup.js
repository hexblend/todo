// Create Buttons With These IDs
// #LoginButton
// #LogOutButton

// GlobalData.CurrentList Contains the current working list
// GlobalData.AllLists[CurrentDate] also contains the current working list
// CurrentDate variable format as YYYY-MM-DD
// GlobalData.AllLists contains all lists
// GlobalData.UserData contains user data (Display Name, Profile Picture, Email, UID)

console.log("Starting Firebase...");
function GetDate() {
    var t = new Date();
    var dd = t.getDate();
    var mm = t.getMonth() + 1; //January is 0!
    var yyyy = t.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
}
var CurrentDate = GetDate();
var GlobalData = {
    FirebaseConfig: {
        apiKey: "AIzaSyA8a6WnwAyOeq61gmtKwS6Oa0TNdY6M5Bo",
        authDomain: "vladb-todo.firebaseapp.com",
        databaseURL: "https://vladb-todo.firebaseio.com",
        projectId: "vladb-todo",
        storageBucket: "",
        messagingSenderId: "180513059705"
    },
    UserData: null,
    AllLists: {},
    CurrentList: {}
};
GlobalData.CurrentList = {};
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
                var UserImage = document.querySelector("#user_image");
                var UserName = document.querySelector("#user_name");
                if (UserImage) {
                    UserImage.src = GlobalData.UserData.ProfilePicture;
                }
                if (UserName) {
                    UserName.innerText = GlobalData.UserData.DisplayName; //.split(" ")[0];
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
        console.error(FB_DATA.Error);
    });
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("User Already Logged In.");
        if (location.pathname == "/todo/index.html" || location.pathname == "/todo/index" || location.pathname == "/") {
            location.pathname = "/app.html"; // /todo/app.html
        } else {
            var OUT = document.querySelector("#LogOutButton");
            if (OUT) {
                OUT.addEventListener("click", function() {
                    firebase
                        .auth()
                        .signOut()
                        .then(function() {
                            location.pathname = "/"; // /todo
                        })
                        .catch(function(e) {
                            console.warn(e);
                        });
                });
            }
            // Add code here to do whilst logged in only
            firebase
                .database()
                .ref("/UserLists/" + FB_DATA["UID"])
                .on("value", function(snapshot) {
                    if (snapshot.val()) {
                        console.log(snapshot.val());
                        GlobalData.AllLists = snapshot.val();
                        if (GlobalData.AllLists[CurrentDate]) {
                            GlobalData.CurrentList = GlobalData.AllLists[CurrentDate];
                        }
                    }
                });
        }
    } else {
        console.log("User Log In Required.");
        if (location.pathname == "/todo/app.html" || location.pathname == "/todo/app" || location.pathname == "/app.html") {
            location.pathname = "/"; // /todo
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

// Activities / Done Lists
var list = document.querySelector(".todo-collection");
var done_list = document.querySelector(".done-collection");

var list_counter = 0;
var done_list_counter = 0;

var list_counter_conatiner = document.querySelector(".todo-counter");
var done_list_counter_container = document.querySelector(".done-counter");

if (list.children.length == 0) {
    list.style.display = "none";
    document.querySelector(".todo_list_title").style.display = "none";
    document.querySelector(".end-btn").style.display = "none";
}

if (done_list.children.length == 0) {
    done_list.style.display = "none";
    document.querySelector(".done_list_title").style.display = "none";
}

function AddToList(v) {
    GlobalData.CurrentList[v] = {
        Checked: false
    };
    SetFireBaseList();
    AddToPage();
}

function CheckListElem(Elem) {
    GlobalData.CurrentList[Elem].Checked = true;
    SetFireBaseList();
    AddToPage();
}

function UnCheckListElem(Elem) {
    GlobalData.CurrentList[Elem].Checked = false;
    SetFireBaseList();
    AddToPage();
}

function DeleteListElem(Elem) {
    delete GlobalData.CurrentList[Elem];
    SetFireBaseList();
    AddToPage();
}

function DeleteAllElem() {
    GlobalData.CurrentList = {};
    SetFireBaseList();
    AddToPage();
}

function AddToPage() {
    list.innerHTML = "";
    done_list.innerHTML = "";
    GlobalData.CurrentList[CurrentDate] = {};

    // Hide everything
    done_list.style.display = "none";
    document.querySelector(".done_list_title").style.display = "none";
    list.style.display = "none";
    document.querySelector(".todo_list_title").style.display = "none";
    document.querySelector(".end-btn").style.display = "none";

    // Set counter to 0
    list_counter = 0;
    list_counter_conatiner.innerHTML = list_counter;
    done_list_counter = 0;
    done_list_counter_container.innerHTML = done_list_counter;
    for (k in GlobalData.CurrentList) {
        console.log(k);
        if (GlobalData.CurrentList[k].Checked) {
        } else {
            // Inserted Value
            var input_value = GlobalData.CurrentList[k];

            // Display Todo Section
            list.style.display = "block";
            document.querySelector(".todo_list_title").style.display = "block";

            // Creating HTML Tags & Classes
            var item = document.createElement("li");
            item.setAttribute("class", "collection-item");
            var row_div = document.createElement("div");
            row_div.setAttribute("class", "row");
            var s_eight_div = document.createElement("div");
            s_eight_div.setAttribute("class", "col s8");
            var s_four_div = document.createElement("div");
            s_four_div.setAttribute("class", "col s4");
            var item_text = document.createElement("p");
            item_text.setAttribute("class", "item-text");
            item_text.innerHTML = input_value;
            var buttons_div = document.createElement("div");
            buttons_div.setAttribute("class", "buttons");
            var todo_btn = document.createElement("a");
            todo_btn.setAttribute("class", "secondary-content todo_btn");
            var unchecked_icon = document.createElement("i");
            unchecked_icon.setAttribute("class", "material-icons unchecked-box");
            unchecked_icon.innerHTML = "check_box_outline_blank";
            var delete_btn = document.createElement("a");
            delete_btn.setAttribute("class", "secondary-content delete_btn");
            var delete_icon = document.createElement("i");
            delete_icon.setAttribute("class", "material-icons delete-icon");
            delete_icon.innerHTML = "delete";
            var done_btn = document.createElement("a");
            done_btn.setAttribute("class", "secondary-content done_btn");
            var checked_icon = document.createElement("i");
            checked_icon.setAttribute("class", "material-icons checked-box");
            checked_icon.innerHTML = "check_box";

            // Event on Delete button
            delete_btn.addEventListener("click", delete_item);

            // Event on todo button
            todo_btn.addEventListener("click", todo_item);

            // Event on done button
            done_btn.addEventListener("click", uncheck_elem);

            // Appending Childs
            delete_btn.appendChild(delete_icon);
            todo_btn.appendChild(unchecked_icon);
            done_btn.appendChild(checked_icon);
            buttons_div.appendChild(todo_btn);
            buttons_div.appendChild(done_btn);
            buttons_div.appendChild(delete_btn);
            s_four_div.appendChild(buttons_div);
            s_eight_div.appendChild(item_text);
            row_div.appendChild(s_eight_div);
            row_div.appendChild(s_four_div);
            item.appendChild(row_div);

            // Hide checked btn
            done_btn.style.display = "none";

            // Insert Item
            list.insertBefore(item, list.childNodes[0]);

            // Display Delete All Btn
            document.querySelector(".end-btn").style.display = "inline-block";

            // Clear input
            main_input.value = "";

            // Check if the dropdown is hidden
            if ((document.querySelector(".dropdown_btn_a").style.display = "none")) {
                document.querySelector(".dropdown_btn_a").style.display = "inline-block";
            }

            // Counter
            list_counter += 1;
            list_counter_conatiner.innerHTML = list_counter;
        }
    }
}

function SetFireBaseList() {
    firebase
        .database()
        .ref("/UserLists/" + FB_DATA["UID"] + "/" + CurrentDate)
        .set(GlobalData.CurrentList);
}
