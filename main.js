document.body.style.cssText = "display:flex;justify-content:center;";
let myInp = document.querySelector("#inp");
let myTask = document.querySelector(".tasks");
let myForm = document.querySelector(".add");
let arrOfTask = [];
if (localStorage.getItem("tasks")) {
  arrOfTask = JSON.parse(localStorage.getItem("tasks"));
}
getData();
myForm.onclick = function () {
  if (myInp.value !== "") {
    addTasks(myInp.value);
    myInp.value = "";
  }
};
myTask.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleTask(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function addTasks(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    compeleted: false,
  };
  arrOfTask.push(task);
  addElement(arrOfTask)
  addToLocal(arrOfTask);
}
function addElement(arrOfTask) {
  myTask.innerHTML = "";
  arrOfTask.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    span.style.cssText=""
    div.appendChild(span);
    myTask.appendChild(div);
    div.style.cssText="display:flex;width:90%;justify-content:space-between;padding:3%;background-color:white;";
  });
}
function addToLocal(arrOfTask) {
  window.localStorage.setItem("tasks", JSON.stringify(arrOfTask));
}
function getData() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks=JSON.parse(data);
    addElement(tasks)
  }
}
function deleteTask(taskId){
  arrOfTask=arrOfTask.filter((task)=>task.id !=taskId)
  addToLocal(arrOfTask)
}
function toggleTask(taskId) {
  for (let i = 0; i < arrOfTask.length; i++) {
    if (arrOfTask[i].id == taskId) {
        arrOfTask[i].completed == false ? (arrOfTask[i].completed = true) : (arrOfTask[i].completed = false);
    }
  }
    addToLocal(arrOfTask)
}