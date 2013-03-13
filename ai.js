var playerName;
var botName;
var w;

function sendID(name)
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
		w = "<h2><a onclick='startBotGame(&#39;Edison&#39;)'>Play Edison (Hard)</a></h2>";
		w = w + "<h2><a onclick='startBotGame(&#39;Geeves&#39;)'>Play Geeves (Medium)</a></h2>";
		w = w + "<h2><a onclick='startBotGame(&#39;Robby&#39;)'>Play Robby (Easy)</a></h2>";
		document.getElementById("bots").innerHTML = w;
}

function startBotGame(botName)
{
	xmlhttp = new XMLHttpRequest();
	xmlhttp.withCredtials = true;
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/NewGame", false);
	xmlhttp.send("<request><playerID>" + playerName + "</playerID><robot>" + botName + "</robot></request>");
	xmlDoc = xmlhttp.responseXML;
	
	var a = xmlDoc.getElementsByTagName("response");
	var b = "<ul><li>";
	b = b + a[0].getElementsByTagName("gameID")[0].childNodes[0].nodeValue;
	b = b + "</li></ul>";
	
	document.getElementById("bots").innerHTML = b;
}
