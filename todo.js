// get all existing todo from localstorage
    function init(){
        //get the elements of my DOM
        const addBtn = document.getElementById('addTask');
        const taskInput = document.getElementById('taskInput');

        const todosJsonString = '[{"id":1731597966001,"text":"Vacuum the living room"},{"id":1731597966002,"text":"Wash the dishes"},{"id":1731597966003,"text":"Fold the laundry"},{"id":1731597966004,"text":"Dust the shelves"},{"id":1731597966005,"text":"Mop the kitchen floor"},{"id":1731597966006,"text":"Clean the bathroom mirror"},{"id":1731597966007,"text":"Water the plants"},{"id":1731597966008,"text":"Wipe the kitchen counters"},{"id":1731597966009,"text":"Change the bed sheets"},{"id":1731597966010,"text":"Empty the trash bins"},{"id":1731597966011,"text":"Clean the fridge"},{"id":1731597966012,"text":"Scrub the stove top"},{"id":1731597966013,"text":"Organize the pantry"},{"id":1731597966014,"text":"Wipe window sills"},{"id":1731597966015,"text":"Sweep the hallway"},{"id":1731597966016,"text":"Clean the microwave"},{"id":1731597966017,"text":"Rinse recycling and sort"},{"id":1731597966018,"text":"Tidy up the playroom"},{"id":1731597966019,"text":"Disinfect door handles"},{"id":1731597966020,"text":"Wipe the dining table"}]';

        localStorage.setItem('todos', todosJsonString);
        
        //setup my event listeners
        addBtn.addEventListener('click', addTodo);

        //keypress event bv: ENTER
        todoInput.addEventListener("keydown", function(event){
            if(event.key === "Enter"){
                addTodo();
            }
        });
        displayTodos();
    }

function addTodo() {
    console.log("yay");

    // 7. Werk de weergave op het scherm bij
    displayTodos();
}

// iterate the todo's in the dom structure
function displayTodos() {
    console.log("displaying todo");

    const todoList = document.getElementById("todoList");
    // Haal de taken op uit de opslag
    const todos = getTodosFromStorage();
    console.log(todos);

    // Maak de huidige lijst leeg
    todoList.innerHTML = '';

    // Correcte spelling: 'length'
    if (todos.length === 0) {
        // Toon een bericht als er geen taken zijn
        todoList.innerHTML = '<li class="text-gray-500 text-center">Nog geen taken toegevoegd.</li>';
    }
}

function getTodosFromStorage() {
    // Haal de 'todos' string uit localStorage
    const todosString = localStorage.getItem("todos");
    
    // Als er niets is, geef een lege array terug
    if (todosString === null) {
        return [];
    }
    
    // Parse de JSON string terug naar een array
    return JSON.parse(todosString);
}
// itiirate the todo's in the dom structure
// funtion to add todo's
    //get localstorage getten
    //parse
    //(new) --> add --> {existing}
    // string
    //set localstorage
    // refresh the date
//function to delete todo's
    //get localstorage
    //filter all items except {deleted} in new {obj}
    // set localstorage
    //refresh the data
// chilax an enjoy the weekdn

init();