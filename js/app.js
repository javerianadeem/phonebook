var i = 0;
var addPhone = document.querySelector('#phone-list')
const form = document.querySelector('#add-phone-form')
const updateForm = document.querySelector('#update-phone-form')
// creating contact function
function createContact(doc) {
    i++;
    addPhone.innerHTML = addPhone.innerHTML + `<li data-id="${doc.id}">
      <div class="collapsible-header"><span><strong>Name:</strong> ${doc.data().name}</span></div>
      <div class="collapsible-body">
      <span><strong>Phone No.:</strong> ${doc.data().number}</span>
      <span><strong>Address:</strong> ${doc.data().address}</span>
      </div>
      <div class="right-align">
      <button class="btn waves waves-effect right-align cross" onclick="remove(${i})">Delete</button>
      </div>
    </li>`
}
//getting data
// db.collection('contacts').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         createContact(doc)
//     });
// });
//saving data
form.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('contacts').add({
        name: form.name.value,
        number: form.number.value,
        address: form.address.value,
    });
    form.reset()
});
// sorting by name
var sortByName = document.querySelector('#sort-btn-name')
sortByName.addEventListener('click', (e) => {
    addPhone.innerHTML = '';
    i = 0;
    db.collection('contacts').orderBy('name').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            createContact(doc)
        });
    });
});
// sorting by address
var sortByAddress = document.querySelector('#sort-btn-address')
sortByAddress.addEventListener('click', (e) => {
    addPhone.innerHTML = '';
    i = 0;
    db.collection('contacts').orderBy('address').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            createContact(doc)
        });
    });
});
// delete data
function remove(i) {
    var cross = document.querySelectorAll('.cross')
        let id = cross[i-1].parentElement.parentElement.getAttribute('data-id');
        db.collection('contacts').doc(id).delete()
}
// realtime listener
db.collection('contacts').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            createContact(change.doc)
        }
        else if(change.type == 'removed'){
            let li = addPhone.querySelector('[data-id='+ change.doc.id + ']');
            addPhone.removeChild(li);
        }
    })
});