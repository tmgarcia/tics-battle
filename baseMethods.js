var playerID;
var gameID;

/*---------Create Game Methods----------*/
function createPVPGame(name)
{
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("POST","http://dickerson.neumont.edu:8080/Battleship/GameRequest/NewGame", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request><playerID>" + name + "</playerID></request>");
	
	if(xmlhttp.responseText.indexOf("request must include")!= -1){
			alert("You must input a Player ID");
	}
	else if(xmlhttp.responseText.indexOf("error")!= -1){
			alert("Something is wrong...");
	}
	else{
		displayInfo(getXMLValue(xmlhttp.responseXML, "gameID"), "myDiv") ;
		window.setTimeout(window.open('PlaceShips.html','_self','','true'), 3000);
		}
}
function displayInfo(info, id)
{
document.getElementById(id).innerHTML=info;
}
function sendXML(requesttxt, type)
{
xmlhttp=new XMLHttpRequest();
xmlhttp.open("POST","http://dickerson.neumont.edu:8080/Battleship/GameRequest/"+ type, false);
xmlhttp.send(requesttxt);
return xmlhttp.responseXML;
}
function getXMLValue(xmlDoc, valueName)
{
return xmlDoc.getElementsByTagName(valueName)[0].firstChild.nodeValue;

}

/*-----------Game Play Methods--------*/
function addShips(){
	displayShip2("Carrier", sessionStorage.getItem("Carrierd"), sessionStorage.getItem("Carrierc"));
	displayShip2("Battleship", sessionStorage.getItem("Battleshipd"), sessionStorage.getItem("Battleshipc"));
	displayShip2("Submarine", sessionStorage.getItem("Submarined"), sessionStorage.getItem("Submarinec"));
	displayShip2("Cruiser", sessionStorage.getItem("Cruiserd"), sessionStorage.getItem("Cruiserc"));
	displayShip2("PatrolBoat", sessionStorage.getItem("PatrolBoatd"), sessionStorage.getItem("PatrolBoatc"));
}
function displayShip2(ship, dir, cell){
	var numcells;
	var shipcolor;
	var coordNum = parseInt(cell.substring(1, cell.length), 10);
	
	switch(ship){
		case "Carrier":
			numcells=5;
			shipcolor= 'orange';
		break;
		case "Battleship":
			numcells=4;
			shipcolor= 'red';
		break;
		case "Submarine":
			numcells=3;
			shipcolor= 'purple';
		break;
		case "Cruiser":
			numcells=3;
			shipcolor= 'pink';
		break;
		case "PatrolBoat":
			numcells=2;
			shipcolor= 'green';
		break;
	}
	if(dir=="DOWN"){
		for(var i = coordNum; i<(coordNum +numcells); i++){
			document.getElementById("" + cell[0] + i).style.backgroundColor = shipcolor;
		}
	}
	if(dir=="UP"){
		for(var i = coordNum; i>(coordNum-numcells); i--){
			document.getElementById("" + cell[0] + i).style.backgroundColor = shipcolor;
		}
	}
	if(dir=="LEFT"){
		for(var i = cell[0]; i.charCodeAt()>(cell[0].charCodeAt() - numcells); i = String.fromCharCode(i.charCodeAt() - 1)){
			document.getElementById("" + i + coordNum).style.backgroundColor = shipcolor;
		}
	}
	if(dir=="RIGHT"){
		for(var i = cell[0]; i.charCodeAt()<(cell[0].charCodeAt() + numcells); i = String.fromCharCode(i.charCodeAt() + 1)){
			document.getElementById("" + i + coordNum).style.backgroundColor = shipcolor;
		}
	}
}
function fire(coordinates) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Fire", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request><coordinates>" + coordinates + "</coordinates></request>");
	return xmlhttp.responseXML;
}


/*---------Place ship methods---------*/

var s; //ship
var c; //coordinate
var d; //direction

function resetShips(){
	if(document.getElementById("unsetSubmarine").disabled == false)
		document.getElementById("unsetSubmarine").style.backgroundColor = "";
	if(document.getElementById("unsetCarrier").disabled == false)
		document.getElementById("unsetCarrier").style.backgroundColor = "";
	if(document.getElementById("unsetCruiser").disabled == false)
		document.getElementById("unsetCruiser").style.backgroundColor = "";
	if(document.getElementById("unsetBattleship").disabled == false)
		document.getElementById("unsetBattleship").style.backgroundColor = "";
	if(document.getElementById("unsetPatrolBoat").disabled == false)
		document.getElementById("unsetPatrolBoat").style.backgroundColor = "";
}
function resetCells(){
	for(var i = 1; i<=10; i++){
		if(document.getElementById('A' + i).disabled == false)
			document.getElementById('A' + i).style.backgroundColor = "";
		if(document.getElementById('B' + i).disabled == false)
			document.getElementById('B' + i).style.backgroundColor = "";
		if(document.getElementById('C' + i).disabled == false)
			document.getElementById('C' + i).style.backgroundColor = "";
		if(document.getElementById('D' + i).disabled == false)
			document.getElementById('D' + i).style.backgroundColor = "";
		if(document.getElementById('E' + i).disabled == false)
			document.getElementById('E' + i).style.backgroundColor = "";
		if(document.getElementById('F' + i).disabled == false)
			document.getElementById('F' + i).style.backgroundColor = "";
		if(document.getElementById('G' + i).disabled == false)
			document.getElementById('G' + i).style.backgroundColor = "";
		if(document.getElementById('H' + i).disabled == false)
			document.getElementById('H' + i).style.backgroundColor = "";
		if(document.getElementById('I' + i).disabled == false)
			document.getElementById('I' + i).style.backgroundColor = "";
		if(document.getElementById('J' + i).disabled == false)
			document.getElementById('J' + i).style.backgroundColor = "";
	}
}
function resetDirections(){
	document.getElementById("left").style.backgroundImage = "";
	document.getElementById("up").style.backgroundImage = "";
	document.getElementById("right").style.backgroundImage = "";
	document.getElementById("down").style.backgroundImage = "";
}
function selectShip(shipName){
	resetShips();
	s = shipName;
	document.getElementById("unset" + shipName).style.backgroundColor = 'white';
	if (typeof (c) !== 'undefined' && typeof(d) !== 'undefined') {
		document.getElementById("confirmbutton").style.color= "red";
		document.getElementById("confirmbutton").disabled=false;
	}
}
function setStart(startCell){
	resetCells();
	c = startCell;
	document.getElementById(startCell).style.backgroundColor='white';
	if (typeof (d) !== 'undefined' && typeof(s) !== 'undefined') {
		document.getElementById("confirmbutton").style.color= "red";
		document.getElementById("confirmbutton").disabled=false;
	}
}
function setDir(direction){
	resetDirections();
	d = direction;
	document.getElementById(direction.toLowerCase()).style.backgroundImage="url('dir" + direction.toLowerCase() + "2.jpg')";
	if (typeof (c) !== 'undefined' && typeof(s) !== 'undefined') {
		document.getElementById("confirmbutton").style.color= "red";
		document.getElementById("confirmbutton").disabled=false;
	}
}

function checksOut(responseText){
	if(responseText.indexOf("error")== -1){
		document.getElementById("confirmbutton").style.color= "red";
		document.getElementById("confirmbutton").disabled=true;
		return true;
	}
	else{
		if(responseText.indexOf("is not fully on")!= -1){
			displayInfo("The ship is too big for that direction.", "displayConfirm");
		}
		else if(responseText.indexOf("overlaps with ship")!= -1){
			displayInfo("The ship would overlap with another ship.", "displayConfirm") ;
		}
		else if(responseText.indexOf("it already exists")!= -1){
			displayInfo("This ship has already been placed.", "displayConfirm") ;
		}
		else
			displayInfo("Something is wrong...", "displayConfirm") ;
		return false;
	}
}

function placeShip(){
	if(c[0] == "H" && d =="RIGHT"){
		displayInfo("The ship is too big for that direction.", "displayConfirm");
	}
	else{
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/PlaceShip", false);
		xmlhttp.withCredentials=true;
		xmlhttp.send("<request><coordinates>" + c + "</coordinates><direction>" + d + "</direction><ship>" + s + "</ship></request>");
		var xmlDoc = xmlhttp.responseXML;

		if(checksOut(xmlhttp.responseText)){
			displayInfo(getXMLValue(xmlhttp.responseXML, "result"), "displayConfirm") ;
			displayShip(s, d, c);
			storeCoordinates(s, c, d);
			document.getElementById("unset" + s).disabled = true;
			resetDirections()
			s = undefined;
			d = undefined;
			c = undefined;
		}
		if(everyShipSet()){
			window.open('gamePlay.html','_self','','true')
		}
	}
}

function everyShipSet(){
	if((document.getElementById("unsetSubmarine").disabled == true) && (document.getElementById("unsetCarrier").disabled == true) && (document.getElementById("unsetCruiser").disabled == true) && (document.getElementById("unsetBattleship").disabled == true) && (document.getElementById("unsetPatrolBoat").disabled == true))
		return true;
	else
		return false;
}

function storeCoordinates(ship_name, ship_coordinates, ship_direction){
	sessionStorage.setItem(ship_name + 'c', ship_coordinates);
	sessionStorage.setItem(ship_name + 'd', ship_direction);
}

function displayShip(ship, dir, cell){
	var numcells;
	var shipcolor;
	var coordNum = parseInt(cell.substring(1, cell.length), 10);
	
	switch(ship){
		case "Carrier":
			numcells=5;
			shipcolor= 'orange';
		break;
		case "Battleship":
			numcells=4;
			shipcolor= 'red';
		break;
		case "Submarine":
			numcells=3;
			shipcolor= 'purple';
		break;
		case "Cruiser":
			numcells=3;
			shipcolor= 'pink';
		break;
		case "PatrolBoat":
			numcells=2;
			shipcolor= 'green';
		break;
	}
	if(dir=="DOWN"){
		for(var i = coordNum; i<(coordNum + numcells); i++){
			document.getElementById("" + cell[0] + i).style.backgroundColor = shipcolor;
			document.getElementById("" + cell[0] + i).disabled = true;
		}
	}
	if(dir=="UP"){
		for(var i = coordNum; i>(coordNum - numcells); i--){
			document.getElementById("" + cell[0] + i).style.backgroundColor = shipcolor;
			document.getElementById("" + cell[0] + i).disabled = true;
		}
	}
	if(dir=="LEFT"){
		for(var i = cell[0]; i.charCodeAt()>(cell[0].charCodeAt() - numcells); i = String.fromCharCode(i.charCodeAt() - 1)){
			document.getElementById("" + i + coordNum).style.backgroundColor = shipcolor;
			document.getElementById("" + i + coordNum).disabled = true;
		}
	}
	if(dir=="RIGHT"){
		for(var i = cell[0]; i.charCodeAt()<(cell[0].charCodeAt() + numcells); i = String.fromCharCode(i.charCodeAt() + 1)){
			document.getElementById("" + i + coordNum).style.backgroundColor = shipcolor;
			document.getElementById("" + i + coordNum).disabled = true;
		}
	}
}

/*---------Join A Game Methods---------*/
var thename; //This is the joining players name
var x; // Holds the all <game> response xml

function sendID(name)
{  
	if(name === "")
	{
		document.getElementById("table").innerHTML = "You must enter a name with at least one character.";
	}
	else
	{
		thename = name;
		document.getElementById("playerForm").innerHTML = "<h2 id='welcome'>Welcome " + thename + ".</h2>";
		makeTable();
	}
}

function makeTable()
{
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/GameList", false);
	xmlhttp.withCredentials = true;
	xmlhttp.send("<request></request>");
	xmlDoc = xmlhttp.responseXML; 
	
	var w = "<h1>Here is a list of available games:</h1>";
	w =  w + "<table border='1'>";
	
	w = w + "<th>Game ID</th><th>Player's Name</th><th>Join Game</th>";
	
	x = xmlDoc.getElementsByTagName("game");
	for (i = 0; i < x.length; i++)
	{
		w = w + "<tr><td>";
		w = w + x[i].getElementsByTagName("gameID")[0].childNodes[0].nodeValue;
		w = w + "</td><td>";
		w = w + x[i].getElementsByTagName("turn")[0].childNodes[0].nodeValue;
		w = w + "</td><td>";
		w = w + "<button id =" + i + " onclick='joinGame(this.id)'>Join</button>";
		w = w + "</td></tr>";
	}
	w = w + "</table>";
	document.getElementById("table").innerHTML= w;
}

function joinGame(clicked_ID)
{

	var selectedGame = x[clicked_ID].getElementsByTagName("gameID")[0].childNodes[0].nodeValue;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Join", false);
	xmlhttp.withCredentials = true;
	xmlhttp.send("<request><playerID>" + thename + "</playerID><gameID>" + selectedGame + "</gameID></request>");
	xmlDoc = xmlhttp.responseXML;
	
	var a = xmlDoc.getElementsByTagName("response");
	var b = "<ul><li>";
	b = b + a[0].getElementsByTagName("gameID")[0].childNodes[0].nodeValue;
	b = b + "</li><li>";
	b = b + a[0].getElementsByTagName("result")[0].childNodes[0].nodeValue;
	b = b + "</li></ul>";
	
	document.getElementById("table").innerHTML = b;
	window.setTimeout(window.open('PlaceShips.html','_self','','true'), 10000);
}

/*---------Create An AI Game Methods---------*/
var playerName;
var botName;
var z;

function sendID_AI(name)
{  
  if(name === "")
	{
		document.getElementById("bots").innerHTML = "You must enter a name with at least one character.";
	}
	else
	{
		playerName = name;
		document.getElementById("playerForm").innerHTML = "<h2 id='welcome'>Welcome " + playerName + ".</h2>";
		showBots();
	}
}

function showBots()
{
		z = "<h2><a onclick='startBotGame(&#39;Edison&#39;)'>Play Edison (Hard)</a></h2>";
		z = z + "<h2><a onclick='startBotGame(&#39;Geeves&#39;)'>Play Geeves (Medium)</a></h2>";
		z = z + "<h2><a onclick='startBotGame(&#39;Robby&#39;)'>Play Robby (Easy)</a></h2>";
		document.getElementById("bots").innerHTML = z;
}

function startBotGame(botName)
{
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/NewGame", false);
	xmlhttp.withCredentials = true;
	xmlhttp.send("<request><playerID>" + playerName + "</playerID><robot>" + botName + "</robot></request>");
	xmlDoc = xmlhttp.responseXML;
	
	var a = xmlDoc.getElementsByTagName("response");
	var b = "<ul><li>";
	b = b + a[0].getElementsByTagName("gameID")[0].childNodes[0].nodeValue;
	b = b + "</li></ul>";
	
	document.getElementById("bots").innerHTML = b;
	window.setTimeout(window.open('PlaceShips.html','_self','','true'), 10000);
}