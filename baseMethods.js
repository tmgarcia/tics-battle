var playerID;
var gameID;

function backToStart(){
	window.open('WelcomePage.html','_self','','true');
}

function resetWins(){
	localStorage.playerWins = 0;
	location.reload();
}

function resetLosses(){
	localStorage.playerLosses = 0;
	location.reload();
}

/*---------Create Game Methods----------*/
function createPVPGame(name)
{
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("POST","http://dickerson.neumont.edu:8080/Battleship/GameRequest/NewGame", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request><playerID>" + name + "</playerID></request>");
	sessionStorage.setItem("playersID", name);
	if(xmlhttp.responseText.indexOf("request must include")!= -1){
			alert("You must input a Player ID");
	}
	else if(xmlhttp.responseText.indexOf("error")!= -1){
			alert("Something is wrong...");
	}
	else{
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

function forfeit(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Forfeit", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request></request>");
	console.log(xmlhttp.responseText);
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Update", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request></request>");
	console.log(xmlhttp.responseText);
	
	var ID = getXMLValue(xmlhttp.responseXML, "gameID");
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Join", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request><request><playerID>Fake</playerID><gameID>"+ ID +"</gameID></request></request>");
	console.log(xmlhttp.responseText);
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Update", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request></request>");
	console.log(xmlhttp.responseText);
}

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
			shipcolor= 'yellow';
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
	if(xmlhttp.responseText.indexOf("Miss")!= -1){
		var tile = document.getElementById(coordinates + "e");
		tile.className = 'fireButtonMiss';
	}
	else if(xmlhttp.responseText.indexOf("Hit")!= -1){
		var tile = document.getElementById(coordinates + "e");
		tile.className = 'fireButtonHit';
	}
	else if(xmlhttp.responseText.indexOf("Sunk")!= -1){
		var tile = document.getElementById(coordinates + "e");
		tile.className = 'fireButtonDead';
	}
}

var checker;

function autorefresh(){
	checker = self.setInterval("update()", 2000);
}

function update(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Update", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request></request>");
	if(xmlhttp.responseText.indexOf("<status>Hit</status>")!=-1 && xmlhttp.responseText.indexOf("<playerID>" + sessionStorage.getItem("playersID"))==-1){
		var hitCell = getXMLValue(xmlhttp.responseXML, "coordinate");
		document.getElementById(hitCell).style.backgroundColor= 'red';
	}
	else if(xmlhttp.responseText.indexOf("<status>Miss</status>")!=-1 && xmlhttp.responseText.indexOf("<playerID>" + sessionStorage.getItem("playersID"))==-1){
		var missCell = getXMLValue(xmlhttp.responseXML, "coordinate");
		document.getElementById(missCell).style.backgroundColor= 'white';
	}
	else if(xmlhttp.responseText.indexOf("<status>Sunk</status>")!=-1 && xmlhttp.responseText.indexOf("<playerID>" + sessionStorage.getItem("playersID"))==-1){
		var hitCell = getXMLValue(xmlhttp.responseXML, "coordinate");
		document.getElementById(hitCell).style.backgroundImage="url('dead.jpg')";
	}
	
	if(xmlhttp.responseText.indexOf("<state>WaitingFor2nd</state>")!=-1){
		displayInfo("Waiting for another player to join your game.", "turnIndicator");
		disableFireButtons(true);
	}
	else if(xmlhttp.responseText.indexOf("<state>WaitingForShips</state>")!=-1){
		displayInfo("Waiting for other player to place ships.", "turnIndicator");
		disableFireButtons(true);
	}
	else if(xmlhttp.responseText.indexOf("<turn>" + sessionStorage.getItem("playersID") +"</turn>")!=-1){
		displayInfo("Your Turn", "turnIndicator");
		disableFireButtons(false);
	}
	else{
		displayInfo("Their Turn", "turnIndicator");
		disableFireButtons(true);
	}
	
	if(xmlhttp.responseText.indexOf("<state>TimedOut</state>")!=-1){
		checker = window.clearInterval(checker);
		window.onbeforeunload = function(){};
		window.onunload = function(){};
		if(xmlhttp.responseText.indexOf("<winner>" + sessionStorage.getItem("playersID") +"</winner>")!=-1){
			document.body.innerHTML = "<div id = 'forfeitwinscreen' ><button id='playAgain' type='button' onclick='backToStart()'>Play again?</button><embed src='themeforfwin.mp3' hidden='true' autostart='true' /></div>";
		}
		else{
			document.body.innerHTML = "<div id = 'forfeitscreen' ><button id='playAgain' type='button' onclick='backToStart()'>Play again?</button><embed src='themeforf.mp3' hidden='true' autostart='true' /></div>";
		}
	}
	if(xmlhttp.responseText.indexOf("<state>Finished</state>")!=-1){
		checker = window.clearInterval(checker);
		window.onbeforeunload = function(){};
		window.onunload = function(){};
		if(xmlhttp.responseText.indexOf("<winner>" + sessionStorage.getItem("playersID") +"</winner>")!=-1){
			if(localStorage.playerWins){
				localStorage.playerWins = Number(localStorage.playerWins)+1;
			}
			else{
				localStorage.playerWins = 1;
			}
			document.body.innerHTML = "<div id = 'winscreen' ><button id='playAgain' type='button' onclick='backToStart()'>Play again?</button></div><embed src='themewin.mp3' hidden='true' autostart='true' />";
		}
		else{
			if(localStorage.playerLosses){
				localStorage.playerLosses = Number(localStorage.playerWins)+1;
			}
			else{
				localStorage.playerLosses = 1;
			}
			document.body.innerHTML = "<div id = 'losescreen' ><embed src='themelose.mp3' hidden='true' autostart='true' /><button id='playAgain' type='button' onclick='backToStart()'>Play again?</button></div>";
		}
	}
	if(xmlhttp.responseText.indexOf("<state>Forfeited</state>")!=-1){
		checker = window.clearInterval(checker);
		window.onbeforeunload = function(){};
		window.onunload = function(){};
		if(xmlhttp.responseText.indexOf("<winner>" + sessionStorage.getItem("playersID") +"</winner>")!=-1){
			document.body.innerHTML = "<div id = 'forfeitwinscreen' ><embed src='themeforfwin.mp3' hidden='true' autostart='true' /><button id='playAgain' type='button' onclick='backToStart()'>Play again?</button></div>";
			if(localStorage.playerWins){
				localStorage.playerWins = Number(localStorage.playerWins)+1;
			}
			else{
				localStorage.playerWins = 1;
			}
		}
		else{
			document.body.innerHTML = "<div id = 'forfeitscreen' ><embed src='themeforf.mp3' hidden='true' autostart='true' /><button id='playAgain' type='button' onclick='backToStart()'>Play again?</button></div>";
			if(localStorage.playerLosses){
				localStorage.playerLosses = Number(localStorage.playerWins)+1;
			}
			else{
				localStorage.playerLosses = 1;
			}
		}
	}
}


function disableFireButtons(condition){
	for(var i = 1; i<=10; i++){
		document.getElementById('A' + i + 'e').disabled = condition;
		document.getElementById('B' + i + 'e').disabled = condition;
		document.getElementById('C' + i + 'e').disabled = condition;
		document.getElementById('D' + i + 'e').disabled = condition;
		document.getElementById('E' + i + 'e').disabled = condition;
		document.getElementById('F' + i + 'e').disabled = condition;
		document.getElementById('G' + i + 'e').disabled = condition;
		document.getElementById('H' + i + 'e').disabled = condition;
		document.getElementById('I' + i + 'e').disabled = condition;
		document.getElementById('J' + i + 'e').disabled = condition;
	}
}

/*---------Place ship methods---------*/

var s; //ship
var c; //coordinate
var d; //direction

function forfeit2(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Forfeit", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request></request>");
	console.log(xmlhttp.responseText);
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Update", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request></request>");
	console.log(xmlhttp.responseText);
	
	var ID = getXMLValue(xmlhttp.responseXML, "gameID");
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Join", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request><request><playerID>Fake</playerID><gameID>"+ ID +"</gameID></request></request>");
	console.log(xmlhttp.responseText);
	
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Update", false);
	xmlhttp.withCredentials=true;
	xmlhttp.send("<request></request>");
	console.log(xmlhttp.responseText);
	
	window.onbeforeunload = function(){};
	window.onunload = function(){};
	document.body.innerHTML = "<div id = 'forfeitscreen' ><button id='playAgain' type='button' onclick='backToStart()'>Play again?</button><embed src='themeforf.mp3' hidden='true' autostart='true' /></div>";
}

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
		else if(responseText.indexOf("is already over")!= -1){
			window.onbeforeunload = function(){};
			window.onunload = function(){};
			displayInfo("The game has already been forfeited. <br /> <button id='playAgain' type='button' onclick='backToStart()'>Play again?</button>", "displayConfirm") ;
		}
		else if(responseText.indexOf("has forfeited")!= -1){
			window.onbeforeunload = function(){};
			window.onunload = function(){};
			displayInfo("You've already forfeited by refreshing the page. Nice. <br /> <button id='playAgain' type='button' onclick='backToStart()'>Play again?</button>", "displayConfirm") ;
		}
		else if(responseText.indexOf("Fake is not a member")!= -1){
			window.onbeforeunload = function(){};
			window.onunload = function(){};
			displayInfo("You've already forfeited by refreshing the page once. You should just. Stop. <br /> <button id='playAgain' type='button' onclick='backToStart()'>Play again?</button>", "displayConfirm") ;
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
			window.onbeforeunload = function(){};
			window.onunload = function(){};
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
			shipcolor= 'yellow';
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
		sessionStorage.setItem("playersID", name);
		document.getElementById("playerForm").innerHTML = "<h2 id='welcome'>Welcome " + thename + "! And good luck.</h2>";
		tableLoop();
	}
}

var askNumber = 0;
function tableLoop()
{
	if(askNumber == 0)
	{
		makeTable();
		askNumber = askNumber + 1;
	}
	window.setInterval("makeTable()", 3000);
}

function makeTable()
{
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/GameList", false);
	xmlhttp.withCredentials = true;
	xmlhttp.send("<request></request>");
	xmlDoc = xmlhttp.responseXML; 
	
	var w = "<div id='allthegames'><h1>Here is a list of available games:</h1>";
	
	x = xmlDoc.getElementsByTagName("game");
	
	if(x.length < 1)
	{
		w = w + "<h3>There are currently no active games. Please wait as this list refreshes automatically.</h3>";
	}
	
	else
	{
		w =  w + "<table border='1'>";
	
		w = w + "<th>Game ID</th><th>Player's Name</th><th>Join Game</th>";
	
	
		for (i = 0; i < x.length; i++)
		{
			w = w + "<tr><td>";
			w = w + x[i].getElementsByTagName("gameID")[0].childNodes[0].nodeValue;
			w = w + "</td><td id = 'gameslist'>";
			w = w + x[i].getElementsByTagName("turn")[0].childNodes[0].nodeValue;
			w = w + "</td><td>";
			w = w + "<button id =" + i + " onclick='joinGame(this.id)'>Join</button>";
			w = w + "</td></tr>";
		}
		w = w + "</table></div>";
	}
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
	
	
	
	if(xmlhttp.responseText.indexOf("error")!= -1)
	{
		var b = ("<h5>Someone else has already joined that game! Please pick a different one.</h5>");
		document.getElementById("errorText").innerHTML = b;
	}
	
	else
	{
	var a = xmlDoc.getElementsByTagName("response");
	var b = "<ul><li>";
	b = b + a[0].getElementsByTagName("gameID")[0].childNodes[0].nodeValue;
	b = b + "</li><li>";
	b = b + a[0].getElementsByTagName("result")[0].childNodes[0].nodeValue;
	b = b + "</li></ul>";
	
	document.getElementById("table").innerHTML = b;
	window.setTimeout(window.open('PlaceShips.html','_self','','true'), 10000);
	}
}

/*---------Create An AI Game Methods---------*/
var playerName;
var botName;
var z;

function sendID_AI(name)
{  
  if(name === "" || name === " ")
	{
		document.getElementById("bots").innerHTML = "You must enter a name with at least one character.";
	}
	else
	{
		playerName = name;
		sessionStorage.setItem("playersID", name);
		document.getElementById("playerForm").innerHTML = "<h2 id='welcome'>Welcome " + playerName + "! And good luck.</h2>";
		showBots();
	}
}

function showBots()
{
		z = "<div id='ais'><h1>Choose an Oponent:</h1><button type='button' id='edison' onclick='startBotGame(&#39;Edison&#39;)'></button>";
		z = z + "<button id='geeves' type='button' onclick='startBotGame(&#39;Geeves&#39;)'></button>";
		z = z + "<button id='robby' type='button' onclick='startBotGame(&#39;Robby&#39;)'></button></div>";
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