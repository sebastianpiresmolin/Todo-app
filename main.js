
// I only have one <form> in my html so i can use it as my selector
//add eventlistener to look for click on check and/or delete button
document.querySelector('form').addEventListener("submit", handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);
//Here I store every string.
const todoArray = [];
let completedTodos = 0;



/*
Calling preventDefault() because I don't want the page to
reload at every submisson. Here i add alert if user tries passing null.
*/
function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('#input');
    let errorText = document.querySelector('#errorText');

    if (input.value !== '') {
        addTodo(input.value);
        todoArray.push(input.value);
        input.value = ''; // Clear the input field
        errorText.textContent = ''; // Clear the error message
    } else {
        errorText.textContent = 'Input must not be empty'; // Display the error message
        errorText.classList.add('flash-three-times'); // Add the flashing animation class
        setTimeout(() => {
            errorText.classList.remove('flash-three-times'); 
        }, 900);
    }
}



// I use .name since I have already declared button names
function handleClickDeleteOrCheck(e) {
    const listItem = e.target.closest('li');
    
    if (listItem) {
        //parent 'li' element
        const spanElement = listItem.querySelector('span');
        if (e.target === spanElement) {
            // Handle the click on the 'span' element
        }
        else if (e.target.name === 'deleteButton') {
            deleteTodo(e);
        }
    }
}

function addTodo(todo) {

    let ul = document.querySelector('ul'); //my complete list
    let li = document.createElement('li'); //item on the list

//Add span check and delete icon buttons to every todo-item
//Add class todo-list-item to every item and append to li

    li.innerHTML = `
        <span class="todo-item">${todo}</span>
        <button name="deleteButton"><i class="fas fa-trash"></i></button>
    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);
}

/*
Here i need to check if the item im targeting is already checked by checking for
the 'line-through' property. If 'line-through' is found I set text-decoration to
'none' which will effectively uncheck it and if 'line-through' is not found it
will be added and become checked. 

I also piggyback on this function and use it to increase or decrease my
completedTodos variable. I call the updateCompletedTodosCount function to update
the display of the counter.
*/

document.querySelector('#todoList').addEventListener('click', function (e) {
    if (e.target.tagName === 'SPAN') {
        const listItem = e.target.closest('li');
        if (listItem) {
            if (listItem.classList.contains('completed')) {
                listItem.classList.remove('completed');
                completedTodos--;
            } else {
                listItem.classList.add('completed');
                completedTodos++;
            }
            updateCompletedTodosCount();
        }
    }
});


// Function to update and display completed todos count
function updateCompletedTodosCount() {
    let completedTodosCount = document.getElementById('completedTodosCount');
    completedTodosCount.innerHTML = `${completedTodos} completed`;
}

// Call this function to initialize the display
updateCompletedTodosCount();


/*
The logic on this funtion is very similar to checkTodo(), but i just pass
item.remove() instead to remove the todo item.

I get the text content of the todo item and then find the index based on the
text content and finally remove the item from the todoArray
*/

function deleteTodo(e) {
    let item = e.target.parentNode;
    let todoText = item.querySelector('.todo-item').textContent;
    var index = todoArray.indexOf(todoText); 
    if (index !== -1) {
        todoArray.splice(index, 1);
    }
    item.remove();
}

