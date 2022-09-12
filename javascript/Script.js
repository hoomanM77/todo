////////////////////Variables//////////////////////////////////////
const $=document
const todoContainer=_q('.todo_container')
const addTodoBtn=_id('addTodoBtn')
const todoInput=_id('todoInput')
const inputContainer=_q('.input_container')
const clearTodoBtn=_id('clearTodoBtn')
let dataBase=[]
let newDivision;
let newSpan;
let buttonConatiner;
let statusButton;
let deleteButton;
/////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)
}
////////////////////// creating new todo  and database /////////////////
if(JSON.parse(localStorage.getItem('todolist'))===null){
    localStorage.setItem('todolist',JSON.stringify([]))
}
function createTodo(value,status) {
    inputContainer.classList.remove('error_message')
    newDivision=document.createElement('div')
    newDivision.className='card d-flex justify-content-between align-items-center flex-row p-3 mt-2'
    newSpan=document.createElement('span')
    newSpan.className='todo_name'
    newSpan.innerHTML=value
    buttonConatiner=document.createElement('div')
    statusButton=document.createElement('button')
    statusButton.setAttribute('onclick','statusHandler(event)')
    statusButton.className='btn btn-success me-1'
    statusButton.innerHTML=status
    deleteButton=document.createElement('button')
    deleteButton.setAttribute('onclick','clearSingleTodoHandler(event)')
    deleteButton.className='btn btn-danger'
    deleteButton.innerHTML='Delete'
    buttonConatiner.append(statusButton,deleteButton)
    newDivision.append(newSpan,buttonConatiner)
    todoContainer.append(newDivision)
    todoInput.value=''
    todoInput.focus()
}
function createDB() {
    dataBase=JSON.parse(localStorage.getItem('todolist'))
    if(dataBase!==null){
        dataBase.push({value:todoInput.value,status:"Complete"})
        localStorage.setItem('todolist',JSON.stringify(dataBase))
    }
}
function addTodo() {
    if(isNaN(todoInput.value)){
        createDB()
        createTodo(todoInput.value,'Complete')
    }else{
        inputContainer.classList.add('error_message')
    }

}
function clearTodoHandler() {
    let cards=document.querySelectorAll('.card')
    cards.forEach(function (card) {
        card.remove()
    })
    localStorage.setItem('todolist',JSON.stringify([]))


}
function clearSingleTodoHandler(event) {
    event.target.parentElement.parentElement.remove()
    let todoInfo=JSON.parse(localStorage.getItem('todolist'))
    if(todoInfo!==null){
        let indexOfremoveItem=todoInfo.findIndex(function (item) {
            return item.value===event.target.parentElement.parentElement.children[0].innerHTML
        })
        todoInfo.splice(indexOfremoveItem,1)
        localStorage.setItem('todolist',JSON.stringify(todoInfo))
    }
}
function statusHandler(event) {
    if(event.target.innerHTML==='Complete'){
        event.target.innerHTML='Incomplete'
        event.target.parentElement.parentElement.children[0].className='text-decoration-line-through text-muted'
        let todolistDB=JSON.parse(localStorage.getItem('todolist'))
        todolistDB.forEach(function (item) {
            if(item.value===event.target.parentElement.parentElement.children[0].innerHTML){
                item.status='Incomplete'
                localStorage.setItem('todolist',JSON.stringify(todolistDB))
            }
        })

    }else{
        event.target.innerHTML='Complete'
        event.target.parentElement.parentElement.children[0].className=''
        let todolistDB=JSON.parse(localStorage.getItem('todolist'))
        todolistDB.forEach(function (item) {
            if(item.value===event.target.parentElement.parentElement.children[0].innerHTML){
                item.status='Complete'
                localStorage.setItem('todolist',JSON.stringify(todolistDB))
            }
        })
    }

}
function todoLoader() {
    let todoInfo=JSON.parse(localStorage.getItem('todolist'))
    if(todoInfo!==null){
        todoInfo.forEach(function (item) {
            let todoValue=item.value
            let todoStatus=item.status
            createTodo(todoValue,todoStatus)
            let todoNameTag=document.querySelectorAll('.todo_name')
            todoNameTag.forEach(function (item) {
                if(todoStatus==='Incomplete' && item.innerHTML===todoValue){
                    item.className='text-decoration-line-through text-muted'
                }
            })

        })
    }
}
//////////////////////////// events ////////////////////////
clearTodoBtn.addEventListener('click',clearTodoHandler)
addTodoBtn.addEventListener('click',addTodo)
todoInput.addEventListener('keydown',function (event) {
    if(event.key==='Enter'){
        createDB()
        createTodo(todoInput.value,'Complete')
    }
})
window.addEventListener('load',todoLoader)