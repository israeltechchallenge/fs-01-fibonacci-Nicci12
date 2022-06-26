function removeLoader() {
  $("#loader").removeClass("hide-loader");
}

function addLoader() {
  $("#loader").addClass("hide-loader");
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

const input = document.getElementById("input");
const number = document.getElementById("num");
const btn = document.getElementById("btn");
document.getElementById("error").style.color = "red";

btn.addEventListener("click", function () {
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
    fibServer(document.getElementById("num").value);
    addLoader();
    getUsers(printUserToList);
    fibServer(document.getElementById("num").value);
    removeLoader();
  }
});

const url= `http://localhost:5050/getFibonacciResults`;



function getUsers(onSuccess) {
    console.log('on success callback', onSuccess);

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            onSuccess(data);

        })


}


    const usersListEle = document.getElementById('list');

    function printUserToList(data) {
    for (let i  of data.results 
       .sort((a,b) => b["createdDate"]- a["createdDate"])
       .slice(0,5))
       
       {
       let date = new Date(i["createdDate"]);
        document.createElement("li");
        usersListEle.innerHTML +=  `<li>The Fibonacci of <b>${i["number"]}</b> is <b>${i["result"]}</b> Caculated at ${date} <li/>`;
        usersListEle.appendChild("li");
    }
    document.getElementById("fullResults").appendChild(usersListEle)
}

