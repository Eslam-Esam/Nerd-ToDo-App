let keyCounter = 0;
let task;
let taskName, taskPriority;

keyCounter = localStorage.getItem("k0"); // slot for keys number
loadTasks();


function addTask() {
    taskName = document.querySelector(".create-task .task-name").value;
    if (taskName === "") {
        document.querySelector(".create-task .task-name").placeholder = "Please Enter a Task";
        return -1;
    }
    taskName = taskName.trim().toLowerCase().slice(0, 25);

    taskPriority = document.querySelector(".create-task > select").value;
    if (taskPriority === '0') {
        document.querySelector(".create-task > select ").style.borderColor = "red";
        document.querySelector(".create-task > select ").style.outline = "none";
        return -1;
    }



    task = [taskName, taskPriority, createTaskDateNow(), false /* is checked*/];
    keyCounter++;
    localStorage.setItem(`k${keyCounter}`, task);
    localStorage.setItem(`k0`, keyCounter);
    console.log(constructTask(task, `k${keyCounter}`));
    document.querySelector(".create-task > .task-name").placeholder = "Task Name";
    document.querySelector(".create-task > .task-name").value = "";
    document.querySelector(".create-task > select ").style.borderColor = "var(--idColor)";
    document.querySelector(".create-task > select ").style.outline = "initial";
    document.querySelector(".create-task > select ").value = 0;


    sortTasks();


}

function constructTask(givenTask, givenTaskLocalStorageKey) {


    let template = `
        <div class='task ${givenTask[3] === "true" ? "checked" : ""}' id='${givenTaskLocalStorageKey}'>
        <div class="task-text">
        <span class='priority-letter' style='background-color:${givenTask[1]};'>${givenTask[0].split(' ')[0]}</span>
        ${givenTask[0].split(' ').slice(1).join(' ')}
        </div>
        <span class="date">${givenTask[2]}</span>
        <span class='remove' onclick='removeTask(this.parentElement)'>
        <i class=" fa-solid fa-trash"></i>
        </span>
            <span class='check' onclick="checkTask(this.parentElement)">
            <i class=" fa-regular fa-circle-check"></i>
            </span>
        </div>
    `;
    document.body.querySelector("section.tasks").innerHTML += template;

    return true;
}

function removeTask(givenTask) {
    let name = localStorage.getItem(givenTask.id).split(",")[0];
    localStorage.removeItem(givenTask.id);
    givenTask.remove();
    keyCounter--;
    localStorage.setItem("k0", keyCounter);
    console.log("Task: \"" + name + "\" is removed");

    sortTasks();

}

function checkTask(caller) {
    caller.classList.toggle("checked");
    if (caller.classList.contains("checked")) {

        let T = localStorage.getItem(caller.id).split(",");
        T[3] = true;
        localStorage.setItem(caller.id, T);
    } else {
        let T = localStorage.getItem(caller.id).split(",");
        T[3] = false;
        localStorage.setItem(caller.id, T);
    }
    setTimeout(sortTasks, 1500);


}


function loadTasks() {
    let M = 0, N;
    for (let x = 0; x < keyCounter; x++) {
        N = M; // 0  /  2
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).startsWith("k") && localStorage.key(i) !== "k0") {
                if (N > 0) {
                    N--;
                    continue;
                } else if (N === 0) {
                    constructTask(localStorage.getItem(localStorage.key(i)).split(","), localStorage.key(i));
                    M++;
                    break;
                }
            }
            if (i === localStorage.length - 1) {
                console.log("Task Number " + (x + 1) + " is not found!!");
            }

        }

    }


    sortTasks();


}

function createTaskDateNow() {
    let D = Date().split(" ").slice(1, 5);
    D.splice(2, 1);
    let tmp = D[1];
    D[1] = D[0];
    D[0] = tmp;
    D[2] = D[2].slice(0, 5);
    D = D.join(" ");
    return D;
}

// function extractTaskData(t) {
//     let head = t.childNodes[3];
//     let tail = t.childNodes[4];
//     let taskName = head.innerText + tail.nodeValue.trim().slice(0, length - 1);
//     taskName = taskName.toLowerCase();
//     console.log(taskName);
//     let taskPriority = head.style.backgroundColor;
//     let desiredTask = [taskName, taskPriority];
//     console.log(desiredTask);
//     return desiredTask;
// }

// function loadingControl(str) {
//     let arr1 = str.split(",");
//     let arrOut = [], arrIn = [];
//     let innerSwitch = 0;
//     for (let o = 0; o < arr1.length; o++) {
//         if (innerSwitch === 0) innerSwitch = 1;
//         if (innerSwitch === 1) innerSwitch = 0;

//         arrOut[length][innerSwitch] = arr1[o];
//     }

//     return arrOut;
// }

function sortTasks() {
    let sec = document.querySelector("section.tasks");
    let prioLength = document.querySelectorAll("span[style='background-color:#F00;']").length;
    let E;
    for (let i = 0; i < prioLength; i++) {
        E = document.querySelectorAll("span[style='background-color:#F00;']")[0].parentElement.parentElement;
        sec.append(E);
    }
    prioLength = document.querySelectorAll("span[style='background-color:#FF0;']").length;
    for (let i = 0; i < prioLength; i++) {
        E = document.querySelectorAll("span[style='background-color:#FF0;']")[0].parentElement.parentElement;
        sec.append(E);
    }
    prioLength = document.querySelectorAll("span[style='background-color:#00F;']").length;
    for (let i = 0; i < prioLength; i++) {
        E = document.querySelectorAll("span[style='background-color:#00F;']")[0].parentElement.parentElement;

        sec.append(E);

    }
    prioLength = document.querySelectorAll("span[style='background-color:#0F0;']").length;
    for (let i = 0; i < prioLength; i++) {
        E = document.querySelectorAll("span[style='background-color:#0F0;']")[0].parentElement.parentElement;
        sec.append(E);
    }
    prioLength = document.querySelectorAll(".task.checked").length;
    for (let i = 0; i < prioLength; i++) {
        E = document.querySelectorAll(".task.checked")[0];
        sec.append(E);
    }


}


// handle bottom controls 

let themeSelect = document.getElementById('theme');
themeSelect.onchange = handleThemeChange;
let directionSelect = document.getElementById('dir');
directionSelect.onchange = handleDirectionChange;


function handleThemeChange() {
    document.getElementsByTagName('html')[0].style.setProperty('--idColor', this.value);
    if (this.value === 'rgb(20, 22, 20)') {
        document.body.style.setProperty('background-color', this.value);
        document.body.style.setProperty('color', '#FFF',);
    } else {

        document.body.style.setProperty('background-color', '#FFF');
        document.body.style.setProperty('color', '#000',);
    }
}


function handleDirectionChange() {
    document.styleSheets[1].cssRules[16].style.setProperty('direction', this.value)
    document.styleSheets[1].cssRules[21].style.setProperty('float', this.value === 'rtl' ? 'left' : "right");
    document.styleSheets[1].cssRules[16].style.setProperty('flex-direction', this.value === 'rtl' ? 'row-reverse' : "row");

}
