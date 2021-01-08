const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

loadItems();

eventListeners();

// Olay dinleyicelerini çağır
function eventListeners() {

    form.addEventListener("submit", addNewItem);

    taskList.addEventListener("click", deleteItem);

    btnDeleteAll.addEventListener("click", deleteAllItems);

}

// Öğeleri Yükle
function loadItems() {
    
    items = getItemsFromLS();

    items.forEach(function(item){
        createItem(item);
    })

}

// Yerel depodan öğeler al
function getItemsFromLS() {
    
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    return items;
}

// Öğeyi yerel depolamaya ayarla
function setItemToLS(text) {
    
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));

}

// LS'den öğe silme
function deleteItemFromLS(text) {
    
    items = getItemsFromLS();
    items.forEach(function(item,index) {
        if(item === text){
            items.splice(index,1);
        }
    });

    localStorage.setItem('items',JSON.stringify(items));

}

// Öğe oluştur
function createItem(text) {
    
    // create li (Oluşturmak)
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));

    // create a (Oluşturmak)
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href","#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    // li'ye ekle
    li.appendChild(a);

    // ul'e ekle
    taskList.appendChild(li);

}

// Yeni öğe ekle
function addNewItem(e) {
    
    if (input.value === "") {
        alert("Yeni öğe ekle");
    }

    // Öğe oluştur
    createItem(input.value);

    // LS ye kaydet
    setItemToLS(input.value);

    // Girişi temizle
    input.value = "";

    e.preventDefault();

}

// Bir öğeyi silin
function deleteItem(e) {
    
    if (e.target.className === "fas fa-times") {
        if(confirm('Emin misiniz?')){
            e.target.parentElement.parentElement.remove();
        }
    }

}