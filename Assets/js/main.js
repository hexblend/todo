// Date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var day = weekday[today.getDay()];

if (dd < 10) {
    dd = "0" + dd;
}

if (mm < 10) {
    mm = "0" + mm;
}

today = day + ", " + dd + "/" + mm + "/" + yyyy;
var DateHolder = document.querySelector(".date_holder");
if (DateHolder) {
    DateHolder.innerHTML = today;
}

// // Hide / Show Activities Lists [Dropdowns]
// var list_a_show = true;
// var list_b_show = true;
// function hide_section_a() {
//     if (list_a_show == true) {
//         document.querySelector(".dropdown_btn_a i").style.transition =
//             ".3s all ease-in-out";
//         document.querySelector(".dropdown_btn_a i").innerHTML =
//             "arrow_drop_down";
//         document.querySelector(".todo-collection").style.display = "none";
//         list_a_show = false;
//     } else {
//         document.querySelector(".dropdown_btn_a i").innerHTML = "arrow_drop_up";
//         document.querySelector(".todo-collection").style.display = "block";
//         list_a_show = true;
//     }
// }
// function hide_section_b() {
//     if (list_b_show == true) {
//         document.querySelector(".dropdown_btn_b i").style.transition =
//             ".3s all ease-in-out";
//         document.querySelector(".dropdown_btn_b i").innerHTML =
//             "arrow_drop_down";
//         document.querySelector(".done-collection").style.display = "none";
//         list_b_show = false;
//     } else {
//         document.querySelector(".dropdown_btn_b i").innerHTML = "arrow_drop_up";
//         document.querySelector(".done-collection").style.display = "block";
//         list_b_show = true;
//     }
// }

// // Activities / Done Lists
// var list = document.querySelector(".todo-collection");
// var done_list = document.querySelector(".done-collection");

// var list_counter = 0;
// var done_list_counter = 0;

// var list_counter_conatiner = document.querySelector(".todo-counter");
// var done_list_counter_container = document.querySelector(".done-counter");

// if (list.children.length == 0) {
//     list.style.display = "none";
//     document.querySelector(".todo_list_title").style.display = "none";
//     document.querySelector(".end-btn").style.display = "none";
// }

// if (done_list.children.length == 0) {
//     done_list.style.display = "none";
//     document.querySelector(".done_list_title").style.display = "none";
// }

function delete_day() {
    DeleteAllElem();
    // list.innerHTML = "";
    // done_list.innerHTML = "";
    // GlobalData.CurrentList[CurrentDate] = {};

    // // Hide everything
    // done_list.style.display = "none";
    // document.querySelector(".done_list_title").style.display = "none";
    // list.style.display = "none";
    // document.querySelector(".todo_list_title").style.display = "none";
    // document.querySelector(".end-btn").style.display = "none";

    // // Set counter to 0
    // list_counter = 0;
    // list_counter_conatiner.innerHTML = list_counter;
    // done_list_counter = 0;
    // done_list_counter_container.innerHTML = done_list_counter;
}
function delete_item() {
    // var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    var item = this.parentNode.parentNode.parentNode.parentNode;
    DeleteListElem(item.querySelector(".item-text").innerText);
    // parent.removeChild(item);

    // // Delete Collections if Empty
    // if (list.children.length == 0 && done_list.children.length == 0) {
    //     list.style.display = "none";
    //     document.querySelector(".todo_list_title").style.display = "none";
    //     document.querySelector(".end-btn").style.display = "none";
    // }

    // // Delete Dropdown If List Empy
    // if (list.children.length == 0) {
    //     document.querySelector(".dropdown_btn_a").style.display = "none";
    // }

    // if (done_list.children.length == 0) {
    //     done_list.style.display = "none";
    //     document.querySelector(".done_list_title").style.display = "none";
    // }

    // // delete 'all btn' if todo list is empty and done list is not
    // if (list.children.length == 0 && done_list.children.length > 0) {
    //     document.querySelector(".end-btn").style.display = "inline-block";
    // }

    // // Check What Delete Button Was clicked and then set the counter
    // if (parent.classList.contains("done-collection")) {
    //     done_list_counter -= 1;
    //     done_list_counter_container.innerHTML = done_list_counter;
    // } else if (parent.classList.contains("todo-collection")) {
    //     list_counter -= 1;
    //     list_counter_conatiner.innerHTML = list_counter;
    // }
}
function uncheck_elem() {
    // Remove from Done Activities
    // var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    var item = this.parentNode.parentNode.parentNode.parentNode;
    UnCheckListElem(item.querySelector(".item-text").innerText);
    // parent.removeChild(item);

    // // Hide Done Collection If Empty
    // if (parent.children.length == 0) {
    //     document.querySelector(".done_list_title").style.display = "none";
    //     parent.style.display = "none";
    // }

    // // Check If dropdown button is hidden to make it appear
    // if (document.querySelector(".todo-collection").children.length == 0) {
    //     //document.querySelector('.todo_list_title').innerHTML = 'Activities To Do' + '<span class="todo-counter">' + ' (' + list_counter + ')' + '</span>' + '<a href="#!" class="waves-effect waves-red btn-flat dropdown_btn_a" onclick="hide_section_a();"><i class="material-icons">arrow_drop_up</i></a>';
    //     document.querySelector(".dropdown_btn_a").style.display = "inline-block";
    // }

    // // Add to 'To Do' Activities
    // list.insertBefore(item, list.childNodes[0]);

    // // Remove Checked Link
    // document.querySelector(".done_btn").style.display = "none";

    // // Add Unchecked Link
    // document.querySelector(".todo_btn").style.display = "block";

    // // Counter
    // done_list_counter -= 1;
    // done_list_counter_container.innerHTML = done_list_counter;
    // list_counter += 1;
    // list_counter_conatiner.innerHTML = list_counter;
}

function todo_item() {
    // Remove from To Do Activities
    // var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    var item = this.parentNode.parentNode.parentNode.parentNode;
    CheckListElem(item.querySelector(".item-text").innerText);
    // parent.removeChild(item);

    // // Hide Dropdown If Empty
    // if (parent.children.length == 0) {
    //     document.querySelector(".dropdown_btn_a").style.display = "none";
    //     //document.querySelector('.todo_list_title').innerHTML = "Good job! You've done all planned activities."
    // }

    // // Display Done section
    // done_list.style.display = "block";
    // document.querySelector(".done_list_title").style.display = "block";
    // document.querySelector(".end-btn").style.display = "inline-block";

    // // Add to Done
    // done_list.insertBefore(item, done_list.childNodes[0]);

    // // Remove Unchecked Link
    // this.style.display = "none";

    // // Add Checked Link
    // document.querySelector(".done-collection .done_btn").style.display = "block";

    // // Counter
    // done_list_counter += 1;
    // done_list_counter_container.innerHTML = done_list_counter;
    // list_counter -= 1;
    // list_counter_conatiner.innerHTML = list_counter;
}
function add_input_activity() {
    // Prevent Submision
    event.preventDefault();

    // Main Input Var
    var main_input = document.querySelector("#add_activity");
    // Validation
    if (main_input.value == "") {
        alert("You can't insert an empty activity!");
    } else {
        // // Inserted Value
        var input_value = main_input.value;
        AddToList(input_value);

        // // Display Todo Section
        // list.style.display = "block";
        // document.querySelector(".todo_list_title").style.display = "block";

        // // Creating HTML Tags & Classes
        // var item = document.createElement("li");
        // item.setAttribute("class", "collection-item");
        // var row_div = document.createElement("div");
        // row_div.setAttribute("class", "row");
        // var s_eight_div = document.createElement("div");
        // s_eight_div.setAttribute("class", "col s8");
        // var s_four_div = document.createElement("div");
        // s_four_div.setAttribute("class", "col s4");
        // var item_text = document.createElement("p");
        // item_text.setAttribute("class", "item-text");
        // item_text.innerHTML = input_value;
        // var buttons_div = document.createElement("div");
        // buttons_div.setAttribute("class", "buttons");
        // var todo_btn = document.createElement("a");
        // todo_btn.setAttribute("class", "secondary-content todo_btn");
        // var unchecked_icon = document.createElement("i");
        // unchecked_icon.setAttribute("class", "material-icons unchecked-box");
        // unchecked_icon.innerHTML = "check_box_outline_blank";
        // var delete_btn = document.createElement("a");
        // delete_btn.setAttribute("class", "secondary-content delete_btn");
        // var delete_icon = document.createElement("i");
        // delete_icon.setAttribute("class", "material-icons delete-icon");
        // delete_icon.innerHTML = "delete";
        // var done_btn = document.createElement("a");
        // done_btn.setAttribute("class", "secondary-content done_btn");
        // var checked_icon = document.createElement("i");
        // checked_icon.setAttribute("class", "material-icons checked-box");
        // checked_icon.innerHTML = "check_box";

        // // Event on Delete button
        // delete_btn.addEventListener("click", delete_item);

        // // Event on todo button
        // todo_btn.addEventListener("click", todo_item);

        // // Event on done button
        // done_btn.addEventListener("click", uncheck_elem);

        // // Appending Childs
        // delete_btn.appendChild(delete_icon);
        // todo_btn.appendChild(unchecked_icon);
        // done_btn.appendChild(checked_icon);
        // buttons_div.appendChild(todo_btn);
        // buttons_div.appendChild(done_btn);
        // buttons_div.appendChild(delete_btn);
        // s_four_div.appendChild(buttons_div);
        // s_eight_div.appendChild(item_text);
        // row_div.appendChild(s_eight_div);
        // row_div.appendChild(s_four_div);
        // item.appendChild(row_div);

        // // Hide checked btn
        // done_btn.style.display = "none";

        // // Insert Item
        // list.insertBefore(item, list.childNodes[0]);

        // // Display Delete All Btn
        // document.querySelector(".end-btn").style.display = "inline-block";

        // // Clear input
        // main_input.value = "";

        // // Check if the dropdown is hidden
        // if ((document.querySelector(".dropdown_btn_a").style.display = "none")) {
        //     document.querySelector(".dropdown_btn_a").style.display = "inline-block";
        // }

        // // Counter
        // list_counter += 1;
        // list_counter_conatiner.innerHTML = list_counter;
    }
}
