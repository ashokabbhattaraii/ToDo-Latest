const addList = document.querySelector('#addList')
var inputField = document.querySelector('#todoField')
const lists = document.querySelector("#lists")
let listsData=[]
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
        alert('Empty')
    }else{
    const li = document.createElement('li');
    const checkbox = document.createElement('input')
    const delImg = document.createElement('img')
    delImg.src="./materials/icons8-delete.svg"
    delImg.className="delImg"
    checkbox.type="checkbox"
    checkbox.className="markComplete"
    li.innerText=todo
    li.appendChild(checkbox)
    li.appendChild(delImg)
    
     listsData.push({
      
        liElement:li,
        checkbox:checkbox,
        delIcon: delImg,
        text:todo
     });

   saveToLocal(listsData)
   appendList(listsData,li)
    inputField.value=""
    }


})

function saveToLocal(listsData){
    localStorage.setItem('listOfTodo',JSON.stringify(listsData))
}


const logo = document.querySelector('#logo')

logo.addEventListener('click',()=>{
   const data = loadFromLocal()
   console.log(data)
})

function appendList(listsData, li) {
  
  lists.appendChild(li);
  
   
    listsData.forEach((item, index) => {
      
        item.delIcon.addEventListener('click', () => {
            console.log("Delete clicked index:", index);
         
            listsData.splice(index, 1);
            item.liElement.remove();
        });
    });
}







