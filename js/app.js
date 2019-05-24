var i = 0;
var addPhone = document.querySelector('#phone-list')
const form = document.querySelector('#add-phone-form')
function createContact(doc) {
    i++;
    addPhone.innerHTML = addPhone.innerHTML + `<li data-id="${doc.id}">
    <div class="right-align">
    <img src="https://img.icons8.com/metro/20/000000/delete-sign.png" class="cross" onclick="remove(${i})">
    </div>
      <div class="collapsible-header">Name: ${doc.data().name}</div>
      <div class="collapsible-body">
      <span>Phone No.: ${doc.data().number}</span>
      <span>Address: ${doc.data().address}</span>
      
      </div>
    </li>`
    form.reset();
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