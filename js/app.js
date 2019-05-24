var addPhone = document.querySelector('#phone-list')
const form = document.querySelector('#add-phone-form')
function createContact(doc) {
    addPhone.innerHTML = addPhone.innerHTML + `<li data-id="doc.id">
    <div class="right-align">
    <img src="https://img.icons8.com/metro/20/000000/delete-sign.png" >
    </div>
      <div class="collapsible-header">Name: ${doc.data().name}</div>
      <div class="collapsible-body">
      <span>Phone No.: ${doc.data().number}</span>
      <span>Address: ${doc.data().address}</span>
      
      </div>
    </li>`
}


//getting data

db.collection('contacts').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        createContact(doc)
    });
});
//saving data
form.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('contacts').add({
        name: form.name.value,
        number: form.number.value,
        address: form.address.value,
    });
});
