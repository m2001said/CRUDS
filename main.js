let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
/////////
let mode = "create";
let tem;
/////////
// ----------get total------------------
function getTotal() {
  // if there is no price don't calculate any thing
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
// -------------create product----------------------
//create an array to store data in it
let dataPro;
//if there are data in localStorage => get them
//if there are not data in localStorage => create new array
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  //create an object to have all properties
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //////////////////////////
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mode === "create") {
      // add number of product depend on the count
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tem] = newPro;
      mood = "create";
      ///return to create mood
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    //clear inputs after submit
    clearData();
  }
  // add data from array to localStorage
  //don't forget that local storage take string so you should turn array to string
  localStorage.setItem("product", JSON.stringify(dataPro));
  console.log(dataPro);

  //show data
  showData();
};
// -------------clear inputs------------------
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// -------------read------------------
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  /////////delete all
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">delete All (${dataPro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

showData();
// -------------delete item ------------------
function deleteData(i) {
  //delete item from array
  dataPro.splice(i, 1);
  //add the new array to lacalStorage to delete the item
  localStorage.product = JSON.stringify(dataPro);
  //show data after deleting
  showData();
}
//////////delete all
function deleteAll() {
  // deleta all data in localStorage
  localStorage.clear();
  //delete all data in array
  dataPro.splice(0);
  //show the new array which is empty
  showData();
}
// -------------count------------------
// -------------update------------------
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  //remove count
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mode = "update";
  tem = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// -------------search------------------
let searchMood = "title";
//focus in which kind you want
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
    // search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    // search.placeholder = "Search By Category";
  }
  search.placeholder = "Search By " + searchMood;

  search.focus();
  // return every thing to the original state
  search.value = "";
  showData();
}
///
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
// -------------clean data------------------
