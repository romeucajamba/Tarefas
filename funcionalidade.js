// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
let oldInputValue;

//As funções
    const saveTodo = (text) => {
        const todo = document.createElement("div");
        todo.classList.add("todo");

        const todoTitle = document.createElement("h3");
        todoTitle.InnerText = text;
        todo.appendChild(todoTitle);

        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-todo");
        doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        todo.appendChild(doneBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-todo");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        todo.appendChild(editBtn);
        
        const deletbtn = document.createElement("button");
        deletbtn.classList.add("remove-todo");
        deletbtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        todo.appendChild(deletbtn);

        todoList.appendChild(todo);

        todoInput.value = "";
        todoInput.focus();
        console.log(todoTitle,todo,todoList)
    }

    const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");
        
        if(todoTitle.innerText === oldInputValue){
           todoTitle.innerText = text; 
        }
    });
}


//Os eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue){
        saveTodo(inputValue);
        //salvar o todoInput
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").InnerText;
    }
    if(targetEl.classList.contains("finish-todo")){
        console.log("Clicou para finalizar");
        parentEl.classList.add("done");
    }

    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDeafault();
    toggleForms()
});

editForm.addEventListener("submit", (e) => {
    e.preventDeafault();

    const editInputValue = editInput.value;

    if(editInput){
        updateTodo(editInput)
    }
    toggleForms();
});