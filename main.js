const list = [];
const STATUS = ['Done', 'To Do'];
// export const PRIORITY = ['High', 'Low'];

const navigation = {
    highForm: document.querySelector('.main-form__high'),
    highInput: document.querySelector('.task-high__text'),
    lowForm: document.querySelector('.main-form__low'),
    lowInput: document.querySelector('.task-low__text'),
    highContainer: document.querySelector('.main-high'),
    lowContainer: document.querySelector('.main-low'),
    container: document.querySelector('.container'),
}

function addTask(task, status, priority){
    list.push({name: task, status: status,priority: priority});
}
function deleteTask(task){
    let indexTask = list.findIndex(person => person.name === task);
    list.splice(indexTask, 1);
}
function changeStatus(task){
    let indexTask = list.findIndex(person => person.name === task);
    if (STATUS[0] === list[indexTask].status)   list[indexTask].status = STATUS[1];
    else    list[indexTask].status = STATUS[0];
}

function outerTasks(task){
    let form = document.createElement('form');
    form.className = 'main-task';
    let btnDelete = document.createElement('button');
    btnDelete.className = 'main-task__btn';
    form.prepend(btnDelete);
    let div = document.createElement('div');
    div.innerHTML = task.name;
    div.className = 'main-task__text';
    form.prepend(div);
    let btnCheck = document.createElement('div');
    btnCheck.className = 'main-task__checkbox';
    form.prepend(btnCheck);
    if (task.status === 'Done'){
        form.classList.toggle('main-task--done');
        btnCheck.classList.toggle('main-task--done');
    }
    if (task.priority === 'High')   navigation.highContainer.prepend(form);
    else    navigation.lowContainer.prepend(form);
}

function inputHigh(){
    if (navigation.highInput.value !== '') {
        addTask(navigation.highInput.value, 'To Do', 'High');
        navigation.highInput.value = '';
        showTasks();
    }
}
function inputLow(){
    if (navigation.lowInput.value !== ''){
        addTask(navigation.lowInput.value, 'To Do', 'Low');
        navigation.lowInput.value = '';
        showTasks();
    }
}

function cleaning() {
    while (navigation.highContainer.hasChildNodes())    navigation.highContainer.lastChild.remove();
    while (navigation.lowContainer.hasChildNodes())     navigation.lowContainer.lastChild.remove();
}

function deleteAll(target){
    deleteTask(target.closest('.main-task').textContent);
    showTasks();
}

function checkBox(target){
    changeStatus(target.closest('.main-task').textContent);
    target.closest('.main-task').classList.toggle('main-task--done');
    target.closest('.main-task__checkbox').classList.toggle('main-task--done');
    showTasks();
}

function showTasks(){
    cleaning();
    for (let key of STATUS){
        const item = list.filter(item => item.status === key);
        for (let key of item)   outerTasks(key);
    }
}

navigation.highForm.addEventListener('submit', inputHigh);
navigation.lowForm.addEventListener('submit', inputLow);
navigation.container.addEventListener('click', function (event){
    if (event.target.matches('.main-task__btn'))    deleteAll(event.target);
    else if (event.target.matches('.main-task__checkbox'))  checkBox(event.target);
});










