function calculate(x){
  if (x < 2){
    return 1;
  } else {
    return calculate(x - 2) + calculate(x - 1);
  }
}

function myFunction(){
document.getElementById('userAnswer').value=calculate(document.getElementById('userInput').value);
}