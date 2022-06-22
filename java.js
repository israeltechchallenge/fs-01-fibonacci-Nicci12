function fibServer(num) {
  fetch(`http://localhost:5050/fibonacci/${num}`)
  .then((response) => response.json())
    .then(data => {
      document.getElementById("result").innerHTML = data["result"]
    });
  }
  function fib() {
  fibServer(document.getElementById("num").value)
  }