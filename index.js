let count = 0;

function openForm(){
    let form = document.querySelector('form');
    form.style.display = 'flex';
    let addExpenseButton = document.querySelector('#add-btn');
    addExpenseButton.style.display = 'none';
};

function closeForm(){
    let addExpenseButton = document.querySelector('#add-btn');
    addExpenseButton.style.display = 'flex';
    let form = document.querySelector('form');
    form.reset();
    form.style.display = 'none';
}

function formSubmit(){
    event.preventDefault();
    let newItem = readFormData();
    let addExpenseButton = document.querySelector('#add-btn');
    addExpenseButton.style.display = 'flex';
    let form = document.querySelector('form');
    form.reset();
    form.style.display = 'none';
    addExpenseToList(newItem);
}

function readFormData(){
    let formData = {};
    formData['amount']=document.querySelector('#amount').value;
    formData['description']=document.querySelector('#description').value;
    formData['type']=document.querySelector('#type').value;
    return formData;
}

function addExpenseToList(formData){
    count +=1;
    localStorage.setItem(`expense:${count}`, JSON.stringify(formData));
    showExpense();
}


function showExpense(){
    
    let retrievedData = JSON.parse(localStorage.getItem(`expense:${count}`));
    
    let newData = document.createElement('ul');
    newData.innerHTML = `
    <li>${retrievedData.amount}</li>
    <li>${retrievedData.description}</li>
    <li>${retrievedData.type}</li>
    `

    let editBtn = document.createElement('button');
    editBtn.innerHTML=`edit`;

    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML=`delete`

    newData.append(editBtn,deleteBtn);
    
    let newExpense = document.querySelector('.expenserecord');
    newExpense.prepend(newData);  

    deleteBtn.addEventListener('click', ()=>deleteExpense(retrievedData,newData));
    editBtn.addEventListener('click', ()=>editExpense(retrievedData, newData));
}


function deleteExpense(retrievedData,newData){
    localStorage.removeItem(retrievedData);
    let newExpense = document.querySelector('.expenserecord');
    newExpense.removeChild(newData);  
};

function editExpense(retrievedData,newData){
    openForm();
    let form = document.querySelector('form');
    form.amount.value=retrievedData.amount;
    form.description.value = retrievedData.description;
    form.type.value = retrievedData.type;

    deleteExpense(retrievedData,newData);  
}
