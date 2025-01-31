// ... other code in script.js (burger menu, form validation, etc.)

async function getTodos() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const todos = await response.json();
      displayTodos(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      // Handle the error (e.g., display an error message to the user)
      const todosContainer = document.getElementById('todos-container'); // Get the container
      if (todosContainer) {
        todosContainer.innerHTML = "<p>Error loading data. Please try again later.</p>";
      }
  
    }
  }
  
  function displayTodos(todos) {
      const todosContainer = document.getElementById('todos-container'); // Get the container
  
      if (!todosContainer) {
          console.error("Todos container element not found!");
          return; // Exit early if container doesn't exist
      }
      todosContainer.innerHTML = ""; // Clear existing content
  
      todos.forEach(todo => {
          const todoElement = document.createElement('div');
          todoElement.innerHTML = `
              <h3>${todo.title}</h3>
              <p>Completed: ${todo.completed ? 'Yes' : 'No'}</p>
          `;
          todosContainer.appendChild(todoElement);
      });
  }
  
  
  // Call the function to get and display the todos when the page loads
  window.addEventListener('DOMContentLoaded', getTodos);
  // In your script.js
const cookieNotification = document.getElementById('cookie-notification');
const acceptCookiesButton = document.getElementById('accept-cookies');

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Strict"; // Added SameSite for security
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function showCookieNotification() {
  if (getCookie('cookie_accepted') === null) {
    cookieNotification.classList.remove('hidden');
  } else {
    cookieNotification.classList.add('hidden');
  }
}

acceptCookiesButton.addEventListener('click', () => {
  setCookie('cookie_accepted', 'true', 365);
  cookieNotification.classList.add('hidden');
});

// Show notification on page load
window.addEventListener('DOMContentLoaded', showCookieNotification);