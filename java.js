const input = document.getElementById("input");
const btn = document.getElementById("btn");
const number = document.getElementById("num");
document.getElementById("error").style.color = "red";
const usersListEle = document.getElementById("list");
const resultsList = document.getElementById(`fullResults`);

  
  ///////////////////////////best getList function
  
  async function getList() {
    const res = await fetch(`http://localhost:5050/getFibonacciResults`);
    const data = await res.json();
    appendRows(data.results);

  }
  
  function appendRows(array) {
    const list = document.createElement(`div`);
    for(let i=0; i<array.length;i++) {
      const row = document.createElement(`div`);
      row.innerHTML = `The Fibonacci Of: <b>${array[i].number}</b> is <b>${array[i].result}</b>. Calculated at: ${new Date(array[i].createdDate)}`;
      list.append(row);
    }
    resultsList.append(list);
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
  } else {
    error.classList.remove("error");
    error.classList.remove("errMessage");
    number.style.color = "black";
    addLoader();
    fibServer(document.getElementById("num").value);
    removeLoader();
    getList();
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