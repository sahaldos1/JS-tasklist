//Define UI variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearButton = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//event listeners function
function loadEventListeners() {
  //DOM loadevent
  document.addEventListener("DOMContentLoaded", getTasks);

  //Add task event

  form.addEventListener("submit", addTask);

  //remove task event

  taskList.addEventListener("click", removeTask);

  //clear task event
  clearButton.addEventListener("click", clearTasks);

  //filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

//Get tasks function on page load

function getTasks() {
  //initialize task, check and see if there's anything there, if there isn't set it to an empty array, if there is set it to whatever is there
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //create list element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });
}

//Add Task functin
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task!");
  }

  //create list element
  const li = document.createElement("li");
  //add class
  li.className = "collection-item";
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //create new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link to li
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

  //store in local storage
  storeTask(taskInput.value);

  //clear input
  taskInput.value = "";

  e.preventDefault();
}

//store task in local storage
function storeTask(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

//clear tasks function
function clearTasks() {
  // taskList.innerHTML = "";

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//filter tasks function
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
