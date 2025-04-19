console.log("Script loaded successfully");
window.onload = function() {
  console.log("Window loaded");
  var button = document.getElementById("myButton");
  console.log("Button element:", button);
  if (button) {
    button.addEventListener("click", function() {
      alert("Button clicked!");
    });
    console.log("Event listener added");
  }
};