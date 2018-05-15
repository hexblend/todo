var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
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
function delete_day() {
    DeleteAllElem();
}
function delete_item() {
    var item = this.parentNode.parentNode.parentNode.parentNode;
    DeleteListElem(item.querySelector(".item-text").innerText);
}
function uncheck_elem() {
    var item = this.parentNode.parentNode.parentNode.parentNode;
    UnCheckListElem(item.querySelector(".item-text").innerText);
}
function todo_item() {
    var item = this.parentNode.parentNode.parentNode.parentNode;
    CheckListElem(item.querySelector(".item-text").innerText);
}
function add_input_activity() {
    event.preventDefault();
    var main_input = document.querySelector("#add_activity");
    if (main_input.value == "") {
        alert("You can't insert an empty activity!");
    } else {
        var input_value = main_input.value;
        AddToList(input_value);
    }
}
