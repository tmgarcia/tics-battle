function makeBlue(){
  document.getElementById("testText").style.color="blue";
}
function fire(coordinates) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Fire", false);
	xmlhttp.send("<request><coordinates>" + coordinates + "</coordinates></request>");
	return xmlhttp.responseXML;
}