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
      const todosContainer = document.getElementById('todos-container');
      if (todosContainer) {
          todosContainer.innerHTML = "<p>Error loading data. Please try again later.</p>";
      }
  }
}

function displayTodos(todos) {
  const todosContainer = document.getElementById('todos-container');
  if (!todosContainer) {
      console.error("Todos container element not found!");
      return;
  }
  todosContainer.innerHTML = "";
  todos.forEach(todo => {
      const todoElement = document.createElement('div');
      todoElement.innerHTML = `
          <h3>${todo.title}</h3>
          <p>Completed: ${todo.completed ? 'Yes' : 'No'}</p>
      `;
      todosContainer.appendChild(todoElement);
  });
}

const cookieNotification = document.getElementById('cookie-notification');
const acceptCookiesButton = document.getElementById('accept-cookies');

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Strict";
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

window.addEventListener('DOMContentLoaded', showCookieNotification);

document.addEventListener("DOMContentLoaded", function () {
  const reviewForm = document.getElementById("review-form");
  const reviewsContainer = document.getElementById("reviews-container");

  const savedReviews = JSON.parse(localStorage.getItem("customerReviews")) || [];
  savedReviews.forEach(review => displayReview(review));

  reviewForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("review-name").value;
      const message = document.getElementById("review-message").value;
      const rating = document.getElementById("review-rating").value;

      if (name && message && rating) {
          const review = { name, message, rating };

          savedReviews.push(review);
          localStorage.setItem("customerReviews", JSON.stringify(savedReviews));

          displayReview(review);

      
          reviewForm.reset();
      }
  });

  function displayReview(review) {
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("review");
      reviewElement.innerHTML = `
          <p><strong>${review.name}</strong> - ⭐ ${review.rating}</p>
          <p>${review.message}</p>
          <hr>
      `;
      reviewsContainer.appendChild(reviewElement);
  }
});

