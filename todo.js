/**
 * ====================================================================
 * Applicatie Initialisatie (De "Baas")
 * ====================================================================
 * Deze functie start de hele applicatie.
 * Het wordt één keer aangeroepen, helemaal aan het einde van dit bestand.
 */
function init() {
    // 1. DOM-elementen 'vastpakken'
    // We zoeken de HTML-elementen op die we later nodig hebben.
    const addBtn = document.getElementById('addTask');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList'); // De <ul>-lijst

    // 2. Event Listeners opzetten (De "Helpers")
    // We vertellen de elementen waar ze op moeten luisteren.

    // Helper voor de 'Toevoegen'-knop
    addBtn.addEventListener('click', addTodo);

    // Helper voor de 'Enter'-toets in het invoerveld
    todoInput.addEventListener("keydown", function(event) {
        // We controleren of de ingedrukte toets 'Enter' was
        if (event.key === "Enter") {
            addTodo(); // Zo ja, roep dezelfde functie aan als de klik
        }
    });

    // 3. Event Delegation voor Verwijderen (De "Slimme Helper")
    // We plaatsen één *enkele* listener op de HELE lijst (`<ul>`).
    // Dit is efficiënter dan een listener op elke individuele knop plakken.
    todoList.addEventListener('click', function(event) {
        
        // 'event.target' is het specifieke ding waarop is geklikt (bv. de knop, de tekst, de li).
        // We controleren of dat ding een <button> was.
        if (event.target.tagName === 'BUTTON') {
            
            // Haal de ID op die we in displayTodos op de knop hebben 'verstopt'.
            const idString = event.target.getAttribute('data-id');
            
            // HTML-attributen zijn *altijd* strings. We zetten het terug om naar een getal
            // zodat we het betrouwbaar kunnen vergelijken in deleteTodo.
            const id = Number(idString);
            
            // Roep de verwijder-functie aan en geef de ID mee
            deleteTodo(id);
        }
    });

    // 4. De app voor de eerste keer 'tekenen'
    // Toon de lijst (die leeg is of al taken bevat uit localStorage)
    displayTodos();
}

/**
 * ====================================================================
 * Functie: Toevoegen (De "Schrijver")
 * ====================================================================
 * Wordt aangeroepen door de 'click' en 'keydown' listeners.
 * Leest het invoerveld, voegt de taak toe aan de lijst en slaat op.
 */
function addTodo() {
    // We moeten 'todoInput' HIER opnieuw opzoeken, omdat deze functie
    // de 'const' variabelen uit init() niet kan 'zien' (andere "scope").
    const todoInput = document.getElementById('todoInput');
    
    // .trim() verwijdert spaties aan het begin en einde
    const taskText = todoInput.value.trim(); 
    const alertText = document.getElementById('alertText')

    // Validatie: stop als het veld leeg is
    if (taskText === '') {
        alertText.classList.remove('invisible');
        // alertText.innerHTML = `Vul een taak in`;
        // alert('Vul een taak in.');
        return; // Stopt de functie hier
    }

    alertText.classList.add('invisible');

    // Haal de HUIDIGE lijst met taken op (stap 1 & 2 uit je plan)
    const todos = getTodosFromStorage();

    // Maak een nieuw taak-object aan (stap 3 uit je plan)
    // We gebruiken Date.now() voor een simpele, unieke ID.
    const newTodo = {
        id: Date.now(),
        text: taskText
    };

    // Voeg de nieuwe taak toe aan de array in het geheugen
    todos.push(newTodo);

    // Sla de HELE bijgewerkte array op in localStorage (stap 4 & 5)
    // We moeten 'stringify' gebruiken om van de array weer tekst te maken.
    localStorage.setItem("todos", JSON.stringify(todos)); 

    // Roep de 'Tekenaar' aan om de lijst op het scherm te vernieuwen (stap 6)
    displayTodos();

    // Maak het invoerveld leeg voor de gebruiker
    todoInput.value = '';
}

/**
 * ====================================================================
 * Functie: Verwijderen (De "Verwijderaar")
 * ====================================================================
 * Wordt aangeroepen door de 'click' listener op de todoList.
 * Krijgt een ID binnen en filtert de lijst.
 */
function deleteTodo(idToDelete) {
    // 1. Haal de volledige lijst op
    const todos = getTodosFromStorage();

    // 2. Maak een NIEUWE array met .filter()
    // .filter() loopt door de 'todos' array en houdt alleen de items
    // over waarvoor de functie 'true' teruggeeft.
    const newTodos = todos.filter(function(todo) {
        
        // De test: "Is het ID van deze taak NIET gelijk aan de ID die we willen verwijderen?"
        // - Zo ja (het is een andere taak): return true (hou 'm in de 'newTodos' lijst)
        // - Zo nee (het is de taak die weg moet): return false (gooi 'm weg)
        return todo.id !== idToDelete;
    });

    // 3. Sla de nieuwe, kortere lijst op in localStorage
    localStorage.setItem("todos", JSON.stringify(newTodos));

    // 4. Roep de 'Tekenaar' aan om de lijst te vernieuwen
    displayTodos();
}

/**
 * ====================================================================
 * Functie: Weergeven (De "Tekenaar")
 * ====================================================================
 * Tekent de volledige lijst met taken opnieuw op het scherm.
 * Wordt aangeroepen door init(), addTodo() en deleteTodo().
 */
function displayTodos() {
    console.log("displaying todo");

    const todoList = document.getElementById("todoList");
    // Haal de meest actuele data op bij de 'Archiefmedewerker'
    const todos = getTodosFromStorage();
    console.log(todos); // Handig om te debuggen

    // CRUCIAAL: Maak de lijst (het whiteboard) eerst helemaal leeg!
    // Als we dit niet doen, worden taken gedupliceerd bij elke her-tekening.
    todoList.innerHTML = '';

    // Controleer de "lege" staat
    if (todos.length === 0) {
        // Toon een net bericht
        todoList.innerHTML = '<li class="text-gray-500 text-left">Nog geen taken toegevoegd.</li>';
    } else {
        // Als er wél taken zijn, loop er doorheen
        todos.forEach(function(todo) {
            
            // 1. Maak de HTML-elementen in het geheugen
            const li = document.createElement('li');
            li.className = 'border-b border-blue-200 p-2 flex justify-between items-center';

            // 2. Maak de tekst-span
            const span = document.createElement('span');
            span.textContent = todo.text;

            // 3. Maak de verwijder-knop
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Verwijder';
            deleteBtn.className = 'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 text-sm cursor-pointer';
            
            // 4. DE BELANGRIJKSTE STAP: Koppel de data aan de knop
            // We 'verstoppen' de unieke ID van de taak in een 'data-' attribuut.
            // De 'click' listener in init() kan dit later lezen.
            deleteBtn.setAttribute('data-id', todo.id);

            // 5. Assembleer de <li> (Stop de span en knop in de li)
            li.appendChild(span);
            li.appendChild(deleteBtn);

            // 6. Voeg de complete <li> toe aan de <ul> op de pagina
            todoList.appendChild(li);
        });
    }
}

/**
 * ====================================================================
 * Functie: Data Ophalen (De "Archiefmedewerker")
 * ====================================================================
 * Een "helper" functie die data uit localStorage haalt en omzet.
 */
function getTodosFromStorage() {
    // Haal de 'todos' string (tekst) op uit de 'lade' (localStorage)
    const todosString = localStorage.getItem("todos");
    
    // Als de 'lade' leeg was (null), geef dan een lege array
    // zodat onze code (bv. .length) niet crasht.
    if (todosString === null) {
        return [];
    }
    
    // Tover de tekst (string) terug om naar een echte JavaScript array.
    return JSON.parse(todosString);
}

// ====================================================================
// START DE APPLICATIE
// ====================================================================
// Dit is de 'startknop' die de 'Baas' (init) functie aanroept.
init();