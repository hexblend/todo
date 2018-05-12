// Date
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();

let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var day = weekday[today.getDay()];

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

today = day + ', ' + dd + '/' + mm + '/' + yyyy;
document.querySelector('.date_holder').innerHTML = today;

// Hide / Show Activities Lists [Dropdowns]
let list_a_show = true;
let list_b_show = true;
function hide_section_a() {
    if (list_a_show == true){
        document.querySelector('.dropdown_btn_a i').style.transition = '.3s all ease-in-out';
        document.querySelector('.dropdown_btn_a i').innerHTML = "arrow_drop_down";
        document.querySelector('.todo-collection').style.display = 'none';
        list_a_show = false;
    } else {
        document.querySelector('.dropdown_btn_a i').innerHTML = "arrow_drop_up";
        document.querySelector('.todo-collection').style.display = 'block';
        list_a_show = true;
    }
}
function hide_section_b(){
    if (list_b_show == true) {
        document.querySelector('.dropdown_btn_b i').style.transition = '.3s all ease-in-out';
        document.querySelector('.dropdown_btn_b i').innerHTML = "arrow_drop_down";
        document.querySelector('.done-collection').style.display = 'none';
        list_b_show = false;
    } else {
        document.querySelector('.dropdown_btn_b i').innerHTML = "arrow_drop_up";
        document.querySelector('.done-collection').style.display = 'block';
        list_b_show = true;
    }
}

// Activities / Done Lists
let list = document.querySelector('.todo-collection');
let done_list = document.querySelector('.done-collection');

function delete_day(){
    list.innerHTML = '';
    done_list.innerHTML = '';
}

function delete_item(){
    let parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    let item = this.parentNode.parentNode.parentNode.parentNode;
    parent.removeChild(item);
}
function todo_item(){
    // Remove from Activities
    let parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    let item = this.parentNode.parentNode.parentNode.parentNode;
    parent.removeChild(item);
    // Add to Done
    done_list.insertBefore(item, done_list.childNodes[0]);
    var check_box = this.children;
    check_box[0].classList.remove('unchecked-box');
    check_box[0].classList.add('checked-box')
    check_box[0].innerHTML = 'check_box';
    // need to recreate do/undo button
}

function undo_item(){
    // Remove from Done
    let parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    let item = this.parentNode.parentNode.parentNode.parentNode;
    parent.removeChild(item);
    // Add to Activities
    list.insertBefore(item, list.childNodes[0]);
    var uncheck = this.children;
    uncheck[0].classList.remove('checked-box');
    uncheck[0].classList.add('unchecked-box');
    uncheck[0].innerHTML = 'check_box_outline_blank';
}

function add_input_activity(){
    // Prevent Submision
    event.preventDefault();
    // Main Input Var
    let main_input = document.querySelector('#add_activity');
    // Validation
    if (main_input.value == ""){
        alert("You can't insert an empty activity!");
    } else {
        // Inserted Value
        let input_value = main_input.value;

        // Creating HTML Tags & Classes
        let item = document.createElement('li');
        item.setAttribute('class', 'collection-item');
        let row_div = document.createElement('div');
        row_div.setAttribute('class', 'row');
        let s_eight_div = document.createElement('div');
        s_eight_div.setAttribute('class', 'col s8');
        let s_four_div = document.createElement('div');
        s_four_div.setAttribute('class', 'col s4');
        let item_text = document.createElement('p');
        item_text.setAttribute('class', 'item-text');
        item_text.innerHTML = input_value;
        let buttons_div = document.createElement('div');
        buttons_div.setAttribute('class', 'buttons');
        let todo_btn = document.createElement('a');
        todo_btn.setAttribute('class', 'secondary-content todo_btn');
        let unchecked_icon = document.createElement('i');
        unchecked_icon.setAttribute('class', 'material-icons unchecked-box');
        unchecked_icon.innerHTML = 'check_box_outline_blank';
        let delete_btn = document.createElement('a');
        delete_btn.setAttribute('class', 'secondary-content delete_btn');
        let delete_icon = document.createElement('i');
        delete_icon.setAttribute('class', 'material-icons delete-icon');
        delete_icon.innerHTML = 'delete';

        // Event on Delete button
        delete_btn.addEventListener('click', delete_item);

        // Event on todo button
        todo_btn.addEventListener('click', todo_item);

        // Event on undo button

        // Appending Childs
        delete_btn.appendChild(delete_icon);
        todo_btn.appendChild(unchecked_icon);
        buttons_div.appendChild(todo_btn)
        buttons_div.appendChild(delete_btn);
        s_four_div.appendChild(buttons_div);
        s_eight_div.appendChild(item_text);
        row_div.appendChild(s_eight_div)
        row_div.appendChild(s_four_div);
        item.appendChild(row_div);

        // Insert Item
        list.insertBefore(item, list.childNodes[0]);

        // Clear input
        main_input.value = '';
    }
}
