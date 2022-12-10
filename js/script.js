let addMessage = document.querySelector('.textinput'); 
let addButton = document.querySelector('.textbutton'); 
let todo = document.querySelector('.todo');


let todoList = [];

let curentDate = new Date();

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo')); 
    displayMessages();
};

addButton.addEventListener('click', function() {  
  if (!addMessage.value) return; 
  
  let newTodo = {
    id: Date.now(),
    todo: addMessage.value, 
    checked: false, 
    important: false,
    date: curentDate.toLocaleString(),
  };

  todoList.push(newTodo); 
  
  displayMessages(); 
  
  localStorage.setItem('todo', JSON.stringify(todoList)); 

  addMessage.value = ''; 

});

function displayMessages() {
  let displayMessages = '';
  
  if (todoList.length === 0) {
    todo.innerHTML = '';
  }

  todoList.forEach(function(item, index) {
    displayMessages += `
    <li id="${item.id}">
      <input type="checkbox" id ="item_${index}" ${item.checked ? 'checked' : ''}>
      <label for="item_${index}" class="${item.important ? 'important' : ''}">${item.todo}</label>
      <span class="date">${item.date}</span>
      <button class="del_todo" id="del" data-action="delete">
      <img src="/img/delBasket_small.png" alt="" width="16px" height="16px">
      </button>
    </li>
    `; 

    todo.innerHTML = displayMessages;
   });

}

todo.addEventListener('change', function(event) {
  let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML; 

  todoList.forEach(function(item) {
    if (item.todo === valueLabel) { 
      item.checked = !item.checked; 
      localStorage.setItem('todo', JSON.stringify(todoList)); 
    }
  });

});

todo.addEventListener('contextmenu', function(event){
  event.preventDefault(); 

  todoList.forEach(function(item, index){  
    if (item.todo === event.target.innerHTML) {
      if (event.ctrlKey || event.metaKey) {
        todoList.splice(index, 1);
      } else {
        item.important = !item.important;
      }
      displayMessages(); 
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });

});

todo.addEventListener('click', function(event){

  if (event.target.dataset.action === 'delete') {

    const parenNode = event.target.closest('li'); 
    
    const id = Number(parenNode.id);

    todoList = todoList.filter(item => item.id !== id);
      
    parenNode.remove();
    
    localStorage.setItem('todo', JSON.stringify(todoList));
     
  }

});



