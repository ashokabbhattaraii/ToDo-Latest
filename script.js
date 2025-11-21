


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
    const editImg = document.createElement('img')
    editImg.src="./materials/icons8-edit-50.png"
    editImg.className="editIcon"
    const delImg = document.createElement('img')
    delImg.src="./materials/icons8-delete.svg"
    delImg.className="delImg"
    
    checkbox.className="markComplete"
    li.innerText=todo
    
    li.appendChild(checkbox)
    li.appendChild(editImg)
    li.appendChild(delImg)
    
     listsData.push({
        sattus:taskCompleted,
        liElement:li,
        checkbox:checkbox,
        editImg:editImg,
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
inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addList.click(); // triggers the addList click handler
    }
});





function appendList(listsData, li) {
  
  lists.appendChild(li);

    console.log(listsData)

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
        item.editImg.addEventListener('click',()=>{
            editTask(item,index)
        })
    });
}

function toggleTodoStatus(todoObj) {
    todoObj.sattus = !todoObj.sattus; 
    todoObj.checkbox.src = todoObj.sattus
        ? "./materials/icons8-checkbox-50 (1).png" 
        : "./materials/icons8-checkbox-50.png"; 



  todoObj.text = todoObj.text; 
  saveToLocal();

}
function editTask(item, index) {
    const li = item.liElement;


    let currentText = item.text;

   
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';

    li.innerText = ''; 
    li.appendChild(input);
    li.appendChild(item.checkbox);
    li.appendChild(item.editImg);
    li.appendChild(item.delIcon);

    input.focus();
    input.select();

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const newText = input.value.trim();
            if (newText) {
                item.text = newText;
                li.innerText = newText;
                li.appendChild(item.checkbox);
                li.appendChild(item.editImg);
                li.appendChild(item.delIcon);
                saveToLocal();
            }
        } else if (e.key === 'Escape') {
            li.innerText = currentText;
            li.appendChild(item.checkbox);
            li.appendChild(item.editImg);
            li.appendChild(item.delIcon);
        }
    });

}


