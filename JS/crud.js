// Global var
var proName = document.getElementById("proName");
var proCategory = document.getElementById("proCategory");
var proPrice = document.getElementById("proPrice");
var proDescription = document.getElementById("proDescription");
var addbtn = document.getElementById("addbtn");
var updateBtn = document.getElementById('update');

// Get productList from localstorge and if it's null(empty) creat productList array 
//and if it's not empty get item and desplay product.  
var productList;
if(localStorage.getItem("productList")== null){
    productList = [];
}else{

    productList =JSON.parse(localStorage.getItem("productList"));
    desplayProduct();
}

function addProduct(){
    // check if the value in form is empty or not 
    if(
      proName.value != "" &&
      proCategory.value != "" &&
      proPrice.value != "" &&
      proDescription.value != ""
    ){
    var product = {
        Name: proName.value,
        Category: proCategory.value,
        Price: proPrice.value,
        Desc: proDescription.value,
    };
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));
    clearForm();
    desplayProduct()
    
    document.getElementById("isFoundAlert").classList.add("d-none");
    document.getElementById("isFoundAlert").classList.remove("d-block");
}else{

    document.getElementById("isFoundAlert").classList.remove("d-none");
    document.getElementById("isFoundAlert").classList.add("d-block");
}
}


// to clear values from the form , set the value by empty string.
function clearForm(){
    proName.value= "";
    proCategory.value= "";
    proPrice.value="";
    proDescription.value="";
}

function desplayProduct(){

    cartoona = ``;

    for(i=0; i< productList.length ; i++){
        cartoona += `<tr>
        <td>${i}</td>
        <td>${productList[i].Name}</td>
        <td>${productList[i].Category}</td>
        <td>${productList[i].Price}</td>
        <td>${productList[i].Desc}</td>
        <td><button onclick="retriveProduct(${i});" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}


function deleteProduct(productIndex){
    productList.splice(productIndex, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    desplayProduct();
    
}


function searchProduct(searchTerm){

    var cartoona = `` ;
    for (i=0; i< productList.length ; i++){
        if(productList[i].Name.toLowerCase().includes(searchTerm.toLowerCase())){
        cartoona += `<tr>
        <td>${i}</td>
        <td>${productList[i].Name.toLowerCase().replace(searchTerm,`<span style="background-color:pink">${searchTerm}</span>`)}</td>
        <td>${productList[i].Category}</td>
        <td>${productList[i].Price}</td>
        <td>${productList[i].Desc}</td>
        <td><button onclick="retriveProduct(${i});" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-danger">Delete</button></td>
        </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}


let updateInd ;
function retriveProduct(index){
    updateInd = index;

    addbtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    //set value -- get value
    proName.value = productList[index].Name; 
    proCategory.value = productList[index].Category;
    proPrice.value = productList[index].Price;
    proDescription.value = productList[index].Desc;

}


 function updateProduct(){

     productList[updateInd].Name = proName.value; 
     productList[updateInd].Category = proCategory.value;
     productList[updateInd].Price = proPrice.value;
    productList[updateInd].Desc =  proDescription.value;

    desplayProduct();
    localStorage.setItem("productList", JSON.stringify(productList));

   updateBtn.classList.add('d-none');
   addbtn.classList.remove('d-none');
   clearForm();
   

    
 }

  