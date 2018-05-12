// Hide / Show Activities Lists
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

function delete_item(){
    var list = document.querySelectorAll('.todo-collection li');
    for (var i = 0; i<list.length; i++) {
        if (list[i].classList.contains('selected')){
            console.log(list[i]);
            list[i].parentNode.removeChild(list[i]);
        }
    }
}

function add_input_activity(){
    // Prevent Submision
    event.preventDefault();
    // Main Input Var
    let main_input = document.querySelector('#add_activity');
    // Validation
    if (main_input.value == ""){
        alert("You must enter an activity!");
    } else {
        let input_value = main_input.value;
        // Recreate HTML items
        let li = document.createElement('li');
        li.setAttribute('class', 'collection-item');
        li.innerHTML = '<div>'+ input_value +
        "<a href='#!' class='secondary-content'><i class='material-icons unchecked-box'>check_box_outline_blank</i></a>" +
        "<a href='#!' class='secondary-content'><i class='material-icons delete-icon' onclick='delete_item(this);'>delete</i></a></div>";
        document.querySelector('.todo-collection').appendChild(li);
        main_input.value = '';
    }
}
