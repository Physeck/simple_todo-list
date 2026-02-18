const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (!taskText) return;

    const li = document.createElement("li");
    li.textContent = taskText;
    taskList.append(li);

    taskInput.value = "";
}