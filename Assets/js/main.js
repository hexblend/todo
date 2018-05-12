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

let list_counter = 0;
let done_list_counter = 0;

let list_counter_conatiner = document.querySelector('.todo-counter');
let done_list_counter_container = document.querySelector('.done-counter');

if (list.children.length == 0){
    list.style.display = 'none';
    document.querySelector('.todo_list_title').style.display = 'none';
    document.querySelector('.end-btn').style.display = 'none';
}

if (done_list.children.length == 0){
    done_list.style.display = 'none';
    document.querySelector('.done_list_title').style.display = 'none';
}


function delete_day(){
    list.innerHTML = '';
    done_list.innerHTML = '';

    // Hide everything
    done_list.style.display = 'none';
    document.querySelector('.done_list_title').style.display = 'none';
    list.style.display = 'none';
    document.querySelector('.todo_list_title').style.display = 'none';
    document.querySelector('.end-btn').style.display = 'none';

    // Set counter to 0
    list_counter = 0;
    list_counter_conatiner.innerHTML = list_counter;
    done_list_counter = 0;
    done_list_counter_container.innerHTML = done_list_counter; 
}
function delete_item(){
    let parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    let item = this.parentNode.parentNode.parentNode.parentNode;
    parent.removeChild(item);
    
    // Delete Collections if Empty
    if ((list.children.length == 0) && (done_list.children.length == 0)) {
        list.style.display = 'none';
        document.querySelector('.todo_list_title').style.display = 'none';
        document.querySelector('.end-btn').style.display = 'none';
    }

    // Delete Dropdown If List Empy
    if (list.children.length == 0){
        document.querySelector('.dropdown_btn_a').style.display = 'none';
    }

    if (done_list.children.length == 0) {
        done_list.style.display = 'none';
        document.querySelector('.done_list_title').style.display = 'none';
    }

    // delete 'all btn' if todo list is empty and done list is not
    if ((list.children.length == 0) && (done_list.children.length > 0)) {
        document.querySelector('.end-btn').style.display = 'inline-block';
    }

    // Check What Delete Button Was clicked and then set the counter
    if (parent.classList.contains('done-collection')){
        done_list_counter -= 1;
        done_list_counter_container.innerHTML = done_list_counter; 
    } else if (parent.classList.contains('todo-collection')){
        list_counter -= 1;
        list_counter_conatiner.innerHTML = list_counter;
    }
}
function uncheck_elem() {
    // Remove from Done Activities
    let parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    let item = this.parentNode.parentNode.parentNode.parentNode;
    parent.removeChild(item);

    // Hide Done Collection If Empty
    if (parent.children.length == 0){
        document.querySelector('.done_list_title').style.display = 'none';
        parent.style.display = 'none';
    }

    // Check If dropdown button is hidden to make it appear
    if (document.querySelector('.todo-collection').children.length == 0) {
        //document.querySelector('.todo_list_title').innerHTML = 'Activities To Do' + '<span class="todo-counter">' + ' (' + list_counter + ')' + '</span>' + '<a href="#!" class="waves-effect waves-red btn-flat dropdown_btn_a" onclick="hide_section_a();"><i class="material-icons">arrow_drop_up</i></a>';
        document.querySelector('.dropdown_btn_a').style.display = 'inline-block';
    }

    // Add to 'To Do' Activities
    list.insertBefore(item, list.childNodes[0]);

    // Remove Checked Link
    document.querySelector('.done_btn').style.display = 'none';

    // Add Unchecked Link
    document.querySelector('.todo_btn').style.display = 'block';

    // Counter
    done_list_counter -= 1;
    done_list_counter_container.innerHTML = done_list_counter;
    list_counter += 1;
    list_counter_conatiner.innerHTML = list_counter;
}

function todo_item(){
    // Remove from To Do Activities
    let parent = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    let item = this.parentNode.parentNode.parentNode.parentNode;
    parent.removeChild(item);

    // Hide Dropdown If Empty
    if (parent.children.length == 0) {
        document.querySelector('.dropdown_btn_a').style.display = 'none';
        //document.querySelector('.todo_list_title').innerHTML = "Good job! You've done all planned activities."
    }

    // Display Done section
    done_list.style.display = 'block';
    document.querySelector('.done_list_title').style.display = 'block';
    document.querySelector('.end-btn').style.display = 'inline-block';

    // Add to Done
    done_list.insertBefore(item, done_list.childNodes[0]);

    // Remove Unchecked Link
    this.style.display = 'none';

    // Add Checked Link
    document.querySelector('.done-collection .done_btn').style.display = 'block';

    // Counter
    done_list_counter += 1;
    done_list_counter_container.innerHTML = done_list_counter ; 
    list_counter -= 1;
    list_counter_conatiner.innerHTML = list_counter;
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

        // Display Todo Section
        list.style.display = 'block';
        document.querySelector('.todo_list_title').style.display = 'block';

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
        let done_btn = document.createElement('a');
        done_btn.setAttribute('class', 'secondary-content done_btn');
        let checked_icon = document.createElement('i');
        checked_icon.setAttribute('class', 'material-icons checked-box');
        checked_icon.innerHTML = 'check_box';

        // Event on Delete button
        delete_btn.addEventListener('click', delete_item);

        // Event on todo button
        todo_btn.addEventListener('click', todo_item);

        // Event on done button
        done_btn.addEventListener('click', uncheck_elem);

        // Appending Childs
        delete_btn.appendChild(delete_icon);
        todo_btn.appendChild(unchecked_icon);
        done_btn.appendChild(checked_icon);
        buttons_div.appendChild(todo_btn);
        buttons_div.appendChild(done_btn);
        buttons_div.appendChild(delete_btn);
        s_four_div.appendChild(buttons_div);
        s_eight_div.appendChild(item_text);
        row_div.appendChild(s_eight_div)
        row_div.appendChild(s_four_div);
        item.appendChild(row_div);

        // Hide checked btn
        done_btn.style.display = 'none';

        // Insert Item
        list.insertBefore(item, list.childNodes[0]);

        // Display Delete All Btn
        document.querySelector('.end-btn').style.display = 'inline-block';

        // Clear input
        main_input.value = '';

        // Counter
        list_counter += 1;
        list_counter_conatiner.innerHTML = list_counter;   
    }   
}