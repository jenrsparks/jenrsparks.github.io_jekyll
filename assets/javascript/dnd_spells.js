/*eslint-disable no-unused-vars */
function showOrHide(className) {
  var x = document.querySelectorAll(".card");
  var checkBox = document.getElementById("wizardFlag");
  for (var i = 0; i < x.length; i++) {
    
    if(x[i].innerHTML.includes(className)) {
      x[i].style.display = checkBox.checked === true ? "block" : "none";
      
      console.log("Contents: " + x[i].getElementsByClassName("classes")[0].innerHTML);
    } else {
      console.log("no match");
    }
  }
}
