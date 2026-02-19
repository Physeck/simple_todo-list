const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const deleteTaskBtn = document.getElementById("deleteTaskBtn");

const typed = new Typed("#mainHeader", {
    strings: ["Physeck"],
    typeSpeed: 77,
});

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (!taskText) {
        alert("This input field must have characters before added!");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("task-item");
    li.dataset.id = Date.now();

    const span = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text")

    const div = document.createElement("div");
    div.classList.add("todo-container");

    const markBtn = document.createElement("button");
    markBtn.textContent = "✓"
    markBtn.classList.add("mark-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");

    div.append(markBtn, deleteBtn)
    li.append(span, div);
    taskList.append(li);

    taskInput.value = "";
};

taskList.addEventListener("click", (event) => {
    const item = event.target;

    const li = item.closest(".task-item");
    if (!li) return;

    if (item.classList.contains("mark-btn")) {
        li.classList.toggle("completed");
    }

    if (item.classList.contains("delete-btn")) {
        li.remove();
    }
});