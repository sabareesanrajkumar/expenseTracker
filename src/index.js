

document.getElementById('expense-form').onsubmit = function(event) {
    event.preventDefault();
    const expense = document.getElementById('expense').value;
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    addExpense(expense, description, type);
    document.getElementById('expense-form').reset();
}

function addExpense(expense, description, type) {
    const expensesList = document.getElementById('expenses-list');
    const expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';
    expenseItem.innerHTML = `
        <div>
            <strong>Expense:</strong> ${expense} 
            <strong>Description:</strong> ${description} 
            <strong>Type:</strong> ${type}
        
            <div class="buttons">
            <button onclick="editExpense(this)">Edit Expense</button>
            <button onclick="deleteExpense(this)">Delete Expense</button>
            </div>
        </div>
    `;
    expensesList.appendChild(expenseItem);
    const myObj = {amount: expense , des: description ,ty: type};
    localStorage.setItem('User Details',JSON.stringify(myObj));
}

function editExpense(button) {
    let expense = document.getElementById('expense').value
    let description = document.getElementById('description').value
    let type = document.getElementById('type').value
    expenseItem.innerHTML = `
        <div>
            <strong>Expense:</strong> ${expense} 
            <strong>Description:</strong> ${description} 
            <strong>Type:</strong> ${type}
        
            <div class="buttons">
            <button onclick="editExpense(this)">Edit</button>
            <button onclick="deleteExpense(this)">Delete</button>
            </div>
        </div>
    `;
    
    expenseItem.remove();
}

function deleteExpense(button) {
    button.parentElement.parentElement.remove();
}
