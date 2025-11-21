const addList = document.querySelector('#addList')
var inputField = document.querySelector('#todoField')
const lists = document.querySelector("#lists")
let listsData=[]
let taskCompleted=false;
const msg = document.querySelector('.msg')
let num = 0;
function saveToLocal() {
  localStorage.setItem('listOfTodo', JSON.stringify(listsData));
}


function loadFromLocal() {
  const raw = JSON.parse(localStorage.getItem('listOfTodo'));
  return raw;
  
  
}
addList.addEventListener('click',()=>{
    num++;
    const todo = inputField.value.trim();
    if(!todo){
        msg.innerHTML="Input Field should not be empty"
        msg.style.color="#F44336"
    }else{
    const li = document.createElement('li');
    const checkbox = document.createElement('img')
    checkbox.src="./materials/icons8-checkbox-50.png"
    const delImg = document.createElement('img')
    delImg.src="./materials/icons8-delete.svg"
    delImg.className="delImg"
    
    checkbox.className="markComplete"
    li.innerText=todo
    li.appendChild(checkbox)
    li.appendChild(delImg)
    
     listsData.push({
        sattus:taskCompleted,
        liElement:li,
        checkbox:checkbox,
        delIcon: delImg,
        text:todo
     });
  
   saveToLocal(listsData)
   appendList(listsData,li)
    msg.innerHTML="Task listed successsfully"
        msg.style.color="green"
    inputField.value=""
    }

})





function appendList(listsData, li) {
  
  lists.appendChild(li);


    listsData.forEach((item, index) => {
      
        item.delIcon.addEventListener('click', () => {
            console.log("Delete clicked index:", index);
         
            listsData.splice(index, 1);
            item.liElement.remove();
            msg.innerHTML="Task Deleted"
        });
        item.checkbox.addEventListener('click',()=>{
            toggleTodoStatus(item)
            console.log(listsData)
        })
    });
}

function toggleTodoStatus(todoObj) {
    todoObj.sattus = !todoObj.sattus; 
    todoObj.checkbox.src = todoObj.sattus
        ? "./materials/icons8-checkbox-50 (1).png" 
        : "./materials/icons8-checkbox-50.png"; 

       saveToLocal();

}

window.addEventListener('load',()=>{
    const tasks = loadFromLocal()
    console.log(tasks)
})




