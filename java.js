const input = document.getElementById("input");
const btn = document.getElementById("btn");
const number = document.getElementById("num");
document.getElementById("error").style.color = "red";
const resultsList = document.getElementById(`fullResults`);
const checkbox = document.getElementById("check");
const result = document.getElementById("result");
console.log(checkbox);
  ///////////////////////////best getList function
  
  async function getList() {
    const res = await fetch(`http://localhost:5050/getFibonacciResults`);
    const data = await res.json();
    const sortedArray = data.results.sort((a,b) =>  b.createdDate - a.createdDate);
    appendRows(sortedArray);

  }
  
  function appendRows(array) {
    resultsList.innerHTML = '';
    const list = document.createElement(`div`);
    for(let i=0; i<array.length;i++)
    {
      const row = document.createElement(`div`);
      row.innerHTML = `The Fibonacci Of: <b>${array[i].number}</b> is <b>${array[i].result}</b>. Calculated at: ${new Date(array[i].createdDate)}`;
      list.append(row);
      row.classList.add("fs-5", "border-bottom", "py-2", "border-secondary");
    }
    resultsList.append(list);
  
  }


// /////////////////////////////// checkbox check function
function fibonacci(){
  let x = document.getElementById("num").value;
  let m = 0;
  let y=1;
  let z;
  let i=0;

  for(let i=2; i<=x; i++){
    z=m+y;
    m=y;
    y=z;
  }
  result.innerHTML=`<strong><u>${y}</u></strong`;
}


/////////////////////////////////click events

function handleClick() {
  document.getElementById("result").innerHTML = " ";
  if (num.value > 50) {
    error.classList.add("errMessage");
    error.classList.remove("error");
    number.style.color = "red";
    errMessage.innerText = "Can't be larger than 50";
  } else if (num.value == 42) {
    error.classList.add("error");
    error.classList.remove("errMessage");
    number.style.color = "black";
    errMessage.innerText = "server error: 42 is the meaning of life";
    fibServer(document.getElementById("num").value);
    addLoader();
  } else if(check.checked === false){
      console.log("it worked")
      getList();
  }
  else {
    error.classList.remove("error");
    error.classList.remove("errMessage");
    number.style.color = "black";
    addLoader();
    fibServer(document.getElementById("num").value);
  
  }
}

function fibServer(num) {
  removeLoader();
  fetch(`http://localhost:5050/fibonacci/${num}`)
  .then((response) => {
    if (!response.ok) {
      response.text().then((errorT) => {
        console.log(errorT);
      });
    }
    return response.json();
  })
  
  .then((data) => {
    document.getElementById("result").innerHTML = data["result"];
    addLoader();
    getList();
  })
  
  .catch((err) => {
    document.getElementById("result").innerHTML = "";
  });
}

//////////////////spinner functions

function addLoader() {
  $("#loader").addClass("hide-loader");
}

function removeLoader() {
  $("#loader").removeClass("hide-loader");
}

///////////////////main scope






// getUsers(printUserToList);
getList();
btn.addEventListener("click", handleClick);
