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
    const li = document.createElement('li');

    //checkbox for completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change',()=>{
        todo.completed = checkbox.checked;

        //visually put line cutting checkbox when completed
        textSpan.style.textDecoration = todo.completed?'line-through':'';
    saveTodos();
    })
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }
        //add double click event listener to edit todo;
        textSpan.addEventListener("dblclick", ()=>{
            const newText = prompt("Edit todo", todo.text);
            if(newText!==null){
                todo.text = newText.trim();
                textSpan.textContent = todo.text;
                saveTodos();
            }
        })

        //delete todo button
        const delBtn = document.createElement('button')
        delBtn.textContent = "Delete"
        delBtn.addEventListener('click',()=>{
            todos.splice(index,1);
            render();
            saveTodos();
        })

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        
        return li;

}

//Render the whole todo list from todo arrays
function render(){
    list.innerHTML= '';
    // recreate each item
    todos.forEach((todo,index) => {
        const node = createTodoNode(todo,index);
        list.appendChild(node)
    });
}

function addTodo(){
    const text = input.value.trim();
    if(!text){
        return;
    }
    //push new todo object
    todos.push({text,completed: false})
    input.value = '';
    render();
    saveTodos();
}

addBtn.addEventListener("click",addTodo);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});
render();