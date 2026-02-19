const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const deleteTaskBtn = document.getElementById("deleteTaskBtn");
let tasks = [];

const typed = new Typed("#mainHeader", {
    strings: ["Physeck"],
    startDelay: 500,
    typeSpeed: 77,
    backSpeed:60,
    loop:true
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

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    tasks.push(newTask);
    saveTask();
    renderTasks();

    taskInput.value = "";
};

function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.dataset.id = task.id;

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;
        span.classList.add("task-text");

        const div = document.createElement("div");

        const markBtn = document.createElement("button");
        markBtn.textContent = "✓";
        markBtn.classList.add("mark-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.classList.add("delete-btn");

        div.append(markBtn, deleteBtn);
        li.append(span, div);
        taskList.append(li);
    });
}

taskList.addEventListener("click", (event) => {
    const item = event.target;

    const li = item.closest(".task-item");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (event.target.classList.contains("mark-btn")) {
        tasks = tasks.map(task =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        );
    }

    if (event.target.classList.contains("delete-btn")) {
        tasks = tasks.filter(task => task.id !== id);
    }

    saveTask();
    renderTasks();
});

loadTask();