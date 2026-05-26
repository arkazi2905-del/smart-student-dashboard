// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// TYPED JS

new Typed(".typing", {
  strings: [
    "Manage Tasks",
    "Save Notes",
    "Stay Focused",
    "Be Productive"
  ],
  typeSpeed: 70,
  backSpeed: 40,
  loop: true
});

// TASK SYSTEM

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach((task, index) => {

    const li = document.createElement("li");

    li.classList.add("task-item");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <div>
        <h4>${task.text}</h4>
        <small>${task.date || "No Date"}</small>
      </div>

      <div class="task-buttons">

        <button class="complete-btn">
          ${task.completed ? "Undo" : "Done"}
        </button>

        <button class="delete-btn">
          Delete
        </button>

      </div>
    `;

    const completeBtn = li.querySelector(".complete-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    completeBtn.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks(filter);
    });

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(filter);
    });

    taskList.appendChild(li);

  });
}

addTaskBtn.addEventListener("click", () => {

  if (taskInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    text: taskInput.value,
    date: taskDate.value,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskDate.value = "";

});

renderTasks();

// FILTER BUTTONS

const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    document
      .querySelector(".active-filter")
      .classList.remove("active-filter");

    btn.classList.add("active-filter");

    renderTasks(btn.dataset.filter);

  });

});

// NOTES

const notes = document.getElementById("notes");
const saveNotes = document.getElementById("saveNotes");

notes.value = localStorage.getItem("notes") || "";

saveNotes.addEventListener("click", () => {

  localStorage.setItem("notes", notes.value);

  alert("Notes Saved Successfully!");

});

// PRODUCT FILTERS

const productFilters = document.querySelectorAll(".product-filter");
const productCards = document.querySelectorAll(".product-card");

productFilters.forEach(button => {

  button.addEventListener("click", () => {

    document
      .querySelector(".active-product")
      .classList.remove("active-product");

    button.classList.add("active-product");

    const category = button.dataset.category;

    productCards.forEach(card => {

      if (
        category === "all" ||
        card.classList.contains(category)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  });

});

// CONTACT FORM

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {

  e.preventDefault();

  alert("Message Sent Successfully!");

  contactForm.reset();

});