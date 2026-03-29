// Select DOM elements 
const input = document.getElementById("todo-input")
const addBtn = document.getElementById("add-btn")
const list = document.getElementById("todo-list")

//try to load saved todos from local storage
const saved = localStorage.getItem('todos');
const todos = saved? JSON.parse(saved) : [];

function saveTodos(){
    //save todos to local storage
    localStorage.setItem('todos',JSON.stringify(todos));
}

//create a DOM node for todo object and append it to list
function createTodoNode(todo, index){

}

//Render the whole todo list from todo arrays
function render(){

}