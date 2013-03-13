var thename;
var x;

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
	xmlhttp.withCredtials = true;
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/GameList", false);
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
	xmlhttp.withCredtials = true;
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Join", false);
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
