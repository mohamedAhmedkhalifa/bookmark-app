var bookmarkNameInput = document.getElementById("bookmarkNameInput");
var bookmarkWebsiteInput = document.getElementById("bookmarkWebsiteInput");
var item;
var visitItemInput = 0;



var closeBtn = document.querySelector("#closeBtn");
var box = document.querySelector("#box");




itemList = []

if(localStorage.getItem("myItem") !=null){
    itemList = JSON.parse(localStorage.getItem("myItem"))

    displayItem(itemList)
}
else{
    itemList=[];
}

function addItem() {
    if(nameValidation()==true && urlValidation()==true){
        item = {
            name : bookmarkNameInput.value,
            websiteURL: bookmarkWebsiteInput.value
        }
    
        itemList.push(item)
        localStorage.setItem("myItem",JSON.stringify(itemList))
        //clearItem();
        displayItem(itemList);
    
    
        // console.log(itemList)
    }
    else{
        box.classList.remove("d-none")
    }
    
}

function clearItem() {
    bookmarkNameInput.value = "";
    bookmarkWebsiteInput.value = "";
}


function displayItem() {
    cartona = " ";
    for(var i = 0 ; i < itemList.length ; i++){
        cartona +=`
        <tr>
            <td>${i+1}</td>
            <td>${itemList[i].name}</td>
            <td><a href="${itemList[i].websiteURL}" target="_blank"><button onclick="visitItem(${i})" class="btn btn-warning button1 px-3"><i class="fa-solid fa-eye fa-sm pe-2 icon1"></i>Visit</button></a></td>
            <td><button onclick="deleteItem(${i})" class="btn btn-danger button2 px-3"><i class="fa-solid fa-trash-can fa-sm pe-2 icon2"></i>Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tablebody").innerHTML = cartona;
}



function deleteItem(index) {
    itemList.splice(index , 1)

    localStorage.setItem("myItem",JSON.stringify(itemList))

    displayItem();
}

function visitItem(index) {

    visitItemInput = index;
    bookmarkWebsiteInput.value
    // console.log(visitItemInput)
}





// validation
function nameValidation(){
    var nameOfRegex = /^\w{3,}(\s+\w+)*$/ ;
    var text = bookmarkNameInput.value;
    if(nameOfRegex.test(text) == true){
        bookmarkNameInput.classList.add("is-valid")
        bookmarkNameInput.classList.remove("is-invalid")
        return true;
    }
    else{
        bookmarkNameInput.classList.remove("is-valid")
        bookmarkNameInput.classList.add("is-invalid")
        return false;
    }
}

function urlValidation(){
    var urlOfRegex = /^(https?:\/\/).*\.com$/ ;
    var textUrl = bookmarkWebsiteInput.value;
    if(urlOfRegex.test(textUrl) == true){
        bookmarkWebsiteInput.classList.add("is-valid")
        bookmarkWebsiteInput.classList.remove("is-invalid")
        return true;
    }
    else{
        bookmarkWebsiteInput.classList.remove("is-valid")
        bookmarkWebsiteInput.classList.add("is-invalid")
        return false;
    }
}





closeBtn.addEventListener('click' , function(eventInfo) {
    box.style.display = 'none'
})

box.addEventListener('click' , function(eventInfo){
    box.style.display = 'none'
})

box.firstElementChild.addEventListener('click', function(eventInfo){
    eventInfo.stopPropagation()
})



