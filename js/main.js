//  General Variables


var formInputs = document.querySelector("#form")
var nameInput = document.querySelector("#name")
var cateogoryInput = document.querySelector("#category")
var priceInput = document.querySelector("#price")
var descriptionInput = document.querySelector("#description")
var imageInput = document.querySelector("#imageInput")
var addedBtn = document.querySelector("#addBtn")
var searchInput = document.querySelector("#inputSearch")
var rowContainer = document.querySelector("#my-row")
var updatBtn = document.querySelector("#updatBtn")
var updatedIndex;

//  validation Regx
var nameInputRegx = /^[A-Z]\w{3,}$/
var cateogoryInputRegx = /^[A-Z]\w{3,}$/
var priceInputRegx = /^[1-9]\d{1,}/
var descriptionInputRegx = /^[A-Z].{5,}/





formInputs.onsubmit = function(e){
    e.preventDefault()
}





var productContainer = []

if (localStorage.getItem("products")) {
     productContainer = JSON.parse(localStorage.getItem("products"))
displayAllProducts()

}else{
productContainer = []
}




//  Collect data from Admin
function getData(){
if (validationOfInputs(nameInputRegx , nameInput) && validationOfInputs(cateogoryInputRegx , cateogoryInput) &&
validationOfInputs(priceInputRegx , priceInput) && validationOfInputs(descriptionInputRegx , descriptionInput) &&
validationInputFile(imageInput)

) {

  var product = {
    name:nameInput.value,
    category:cateogoryInput.value,
    price:priceInput.value,
    description:descriptionInput.value,
    imgPath:"./imgs/" + imageInput.files[0].name
    

}
productContainer.push(product)
localStorage.setItem("products", JSON.stringify(productContainer))

resetInput ()

displayProducts(productContainer.length -1)




  
}else{
  alert("Please fill all fields correctly")
}



}

//  Delet input value after collect data
function resetInput (){
    nameInput.value = null 
    nameInput.classList.remove("is-valid")
    cateogoryInput.value = null 
    cateogoryInput.classList.remove("is-valid")
    priceInput.value = null
    priceInput.classList.remove("is-valid")
    descriptionInput.value = null
    descriptionInput.classList.remove("is-valid")
    imageInput.value = null
    imageInput.classList.remove("is-valid")

}




//  display products at HTML 
function displayProducts(index){



    var productBox = `<div class="col-md-3">
  <div class="inner-card p-4 rounded-2">
    <div class="img mb-3 overflow-hidden">
      <img class="w-100" src="${productContainer[index].imgPath}" alt="">
    </div>
    <div class="inner-box d-flex justify-content-between">
      <h3 class="text-capitalize fw-bold text-black">${productContainer[index].name}</h3>
      <h3 class="text-capitalize h6">${productContainer[index].price} $</h3>
    </div>
    <p class="text-white text-capitalize">${productContainer[index].description}</p>
    <div class="inner-btn">
      <button onclick="getProductDataBeforeUpdate(${index})" class="btn btn-primary px-4">Update</button>
      <button onclick="deletProduct(${index})" class="btn btn-warning ms-4 px-4">Delete</button>
    </div>
  </div>
</div>
`
rowContainer.innerHTML += productBox







}


function displayAllProducts(){

    for (var i = 0; i < productContainer.length; i++) {
    displayProducts(i);
}
}


function serchProducts(){

rowContainer.innerHTML = ""
    for(var i = 0 ; i < productContainer.length; i++){
        if (productContainer[i].name.toUpperCase().includes(searchInput.value.toUpperCase())) {
            displayProducts(i)
        }
    }

}




function deletProduct(i){
  rowContainer.innerHTML = ""
  productContainer.splice( i ,1)
  localStorage.setItem("products", JSON.stringify(productContainer))
 displayProducts(i)
  
}


function getProductDataBeforeUpdate(i){
nameInput.value = productContainer[i].name
priceInput.value = productContainer[i].price
descriptionInput.value = productContainer[i].description
cateogoryInput.value = productContainer[i].category



updatedIndex = i

addedBtn.classList.add("d-none")
updatBtn.classList.remove("d-none")

}


function updatData(updateIndex){
  if (validationOfInputs(nameInputRegx , nameInput) && validationOfInputs(cateogoryInputRegx , cateogoryInput) &&
validationOfInputs(priceInputRegx , priceInput) && validationOfInputs(descriptionInputRegx , descriptionInput) 


){

  rowContainer.innerHTML = ""
  productContainer[updateIndex].name = nameInput.value
  productContainer[updateIndex].price = priceInput.value
  productContainer[updateIndex].category = cateogoryInput.value
  productContainer[updateIndex].description = descriptionInput.value
  
  if (imageInput.files.length > 0) {
    productContainer[updateIndex].imgPath = "./imgs/" + imageInput.files[0].name
  }
  
  localStorage.setItem("products",JSON.stringify(productContainer))
  displayAllProducts()
  
    resetInput ()
    addedBtn.classList.remove("d-none")
    updatBtn.classList.add("d-none")

}else{
  alert("please fill in all input fields")
}

}


function validationOfInputs(regex , element){
if (regex.test(element.value)) {
  element.nextElementSibling.nextElementSibling.classList.add("d-none")
  element.classList.add("is-valid")
  element.classList.remove("is-invalid")

  return true
} else {
  element.nextElementSibling.nextElementSibling.classList.remove("d-none")
  element.classList.add("is-invalid")
  element.classList.remove("is-valid")

  

  return false
}


}


function validationInputFile(element){
var permitedImgs = ["image/jpeg","image/png"]

if (permitedImgs[0] === element.files[0].type || permitedImgs[1] === element.files[0].type) {
  element.classList.add("is-valid")
element.classList.remove("is-invalid")
return true
}else{
  
  element.classList.remove("is-valid")
  element.classList.add("is-invalid")
  alert("please insert image type jpeg or png")
}






    
}

