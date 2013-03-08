function makeBlue(){
  document.getElementById("testText").style.color="blue";
}
function fire() {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Fire", false);
	xmlhttp.send("<request><coordinates>" + document.getElementById("coords").value + "</coordinates></request>");
	document.getElementById("fireResults").innerHTML = xmlhttp.responsetext;
	var response = xmlhttp.responseXML;
	
}
function fireResults(id) {
	var results = document.getElementById(id).value;
	return results;
}