//Pré-Tudo
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input")
const editDescribeInput = document.querySelector("#edit-describe-input")
const theEditBtn = document.querySelector("#edit-btn")
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const describeTodo = document.querySelector("#describe-todo")
const describeBtn = document.querySelector("#describe-btn")
let oldInputValue;
let todosValue = 0;
let oldDescribe;


//Criar Botões
const saveTodo = (text) => {
   //To Do
    const todo = document.createElement("div");
    todo.classList.add("todo");
  //Nome
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text ;
    todo.appendChild(todoTitle);
  //Descrição
    const todosValues = document.createElement("h5");
    todosValues.classList.add("describe-todo");
    todosValues.innerHTML = localStorage.getItem(describeStorage) ;
    todo.appendChild(todosValues);
  //Terminar
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);
  //Editar
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);
  //Remover
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);
   
    todoList.appendChild(todo)
    todoInput.value = "";
    todoInput.focus();
    todosValue = todoTitle.innerText

}
//Funcionalidades Especiais
   //Aparecer e Desaparecer
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}
  //Editar Nome e Descrição
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

   todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3")
    if(todoTitle.innerText === oldInputValue) {
        todoTitle.innerText = text;
    }
   })
}
const updateDescribeTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

   todos.forEach((todo) => {
    let describeTitle = todo.querySelector("h5")
    if(describeTitle.innerText === oldDescribe) {
        describeTitle.innerText = text;
    }
   })
}
//Funcionalidade dos Botões
   //+
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const inputValue = todoInput.value
    if(describeTodo.value === "") {
        localStorage.setItem(0, "")
    }
    if (inputValue) {
        saveTodo(inputValue)
        localStorage.setItem(0, "")
    }
   
})
document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("div");
    let todoTitle;
    //Nome
    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    //Descrição
    if(parentEl && parentEl.querySelector("h5")) {
        describeTitle = parentEl.querySelector("h5").innerText;
    }
    //Terminar
    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }
    //Remover
    if(targetEl.classList.contains("remove-todo")) {
      parentEl.remove();
    }
    //Editar
    if(targetEl.classList.contains("edit-todo")) {
     toggleForms("");
     editInput.value = todoTitle;
     oldInputValue = todoTitle;    

     editDescribeInput.value = describeTitle;
     oldDescribe = describeTitle;
}

})
//Editar
   //Cancelar
cancelEditBtn.addEventListener("click" ,(e) => {
  e.preventDefault();

  toggleForms();
})
  //Botão
theEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const editInputValue = editInput.value;
    const editDescribeInputValue = editDescribeInput.value;
    if(editInputValue) {
     updateTodo(editInputValue);
    };
    if(editDescribeInputValue) {
        updateDescribeTodo(editDescribeInputValue);
       };
    toggleForms();
})
//Descrever
let descricao = 0;
let describeStorage = 0;
  //Enviar
describeBtn.addEventListener("click", () => {
    const describeValue = describeTodo.value;
    saveDescribe(describeValue);
});
  //Salvar no LocalStorage
function saveDescribe(describeValue) {
    if (describeValue !== "") {
        localStorage.setItem(describeStorage, describeValue);
        alert("Descrição salva com sucesso!");
    } 
}
window.addEventListener( "load", () => {
    const savedDescribe = localStorage.getItem(describeStorage);
    if (savedDescribe) {
        describeTodo.value = savedDescribe;
    }
});