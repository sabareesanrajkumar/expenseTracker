
const apiEndpoint = 'https://crudcrud.com/api/6ff85afb94314295b5259be718b1232f/userExpenses';


function openForm(){
  addBtn.style.display='none';
  form.style.display='flex';
}

function closeForm(e){
  e.preventDefault();
  resetForm();
  addBtn.style.display='block';
  form.style.display='none';

}

function resetForm(){
  document.getElementById('recordId').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('description').value = '';
  document.getElementById('type').value = '';
}

const addBtn = document.getElementById('addExpense');
const form = document.getElementById('dataForm');

document.getElementById('closeBtn').addEventListener('click', (e)=>closeForm(e));
addBtn.addEventListener('click', ()=>openForm());

form.addEventListener('submit', function (e) {
  e.preventDefault();
  //reading form data
  const recordId = document.getElementById('recordId').value;
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const type  = document.getElementById('type').value;
  const formData = { description: description, amount: amount, type:type };
  //edit functionality using axios
  if (recordId) {
    axios.put(`${apiEndpoint}/${recordId}`, formData)
      .then(response => {
        console.log('Data updated:', response.data);
        resetForm(); 
        fetchData(); 
        closeForm(e);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  } else {
    //storing using axios
    axios.post(apiEndpoint, formData)
      .then(response => {
        console.log('Data submitted:', response.data);
        resetForm(); 
        fetchData();
        closeForm(e); 
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  }
});


function fetchData() {
  //reading data in crudcrud endpoint using axios
  axios.get(apiEndpoint)
    .then(response => {
      const dataDisplay = document.getElementById('dataDisplay');
      dataDisplay.innerHTML = ''; 

      response.data.forEach(item => {
        const dataItem = document.createElement('div');
        dataItem.id=`dataItems`;
        dataItem.innerHTML= `
          <p>Amount: ${item.amount}</p>
          <p>Description: ${item.description}</p>
          <p>Type: ${item.type}</p>
          <button onclick="editData('${item._id}', '${item.description}', '${item.amount}', '${item.type}')">Edit</button>
          <button onclick="deleteData('${item._id}')">Delete</button>
        `;
        dataDisplay.append(dataItem);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


function editData(id, description, amount, type) {
  openForm();
  document.getElementById('recordId').value = id; 
  document.getElementById('amount').value = amount;
  document.getElementById('description').value = description;
  document.getElementById('type').value = type;
}

function deleteData(id) {
  //delete functionality using axios
  axios.delete(`${apiEndpoint}/${id}`)
    .then(response => {
      console.log('Data deleted:', response.data);
      fetchData(); 
    })
    .catch(error => {
      console.error('Error deleting data:', error);
    });
}



window.onload = fetchData;
