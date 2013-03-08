var playerID;
var gameID;

//Takes in player-input name, formats it as required xml and sends it to the server as the PlayerID
//Returns the server's response, the gameID, as an XML
//Currently displays this response in the div with id "myDiv" - what is done with this will change when
//Actual Create Game html page is created
function createPVPGame(name)
{
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("POST","http://dickerson.neumont.edu:8080/Battleship/GameRequest/NewGame", false);
	xmlhttp.send("<request><playerID>" + name + "</playerID></request>");
 	var x = xmlhttp.responseXML;

	displayInfo(getXMLValue(xmlhttp.responseXML, "gameID"), "myDiv") ;
}

//Display !!String!! info at !!String!! id
function displayInfo(info, id)
{
	document.getElementById(id).innerHTML=info;
}

//Sends specific !!String!! [requesttxt] to the server using request keywords !!String!! [type]
//ie the [playerid] as a string to [NewGame]
//Returns the server's response as an XML document
function sendXML(requesttxt, type)
{
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("POST","http://dickerson.neumont.edu:8080/Battleship/GameRequest/"+ type, false);
	xmlhttp.send(requesttxt);
	return xmlhttp.responseXML;
}

//Returns an XML document [xmlDoc]'s value at String [valueName]
function getXMLValue(xmlDoc, valueName)
{
	return xmlDoc.getElementsByTagName(valueName)[0].childNodes[0].nodeValue;
	
}

//Fires at the specified coordinates at method call
function fire(coordinates) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://dickerson.neumont.edu:8080/Battleship/GameRequest/Fire", false);
	xmlhttp.send("<request><coordinates>" + coordinates + "</coordinates></request>");
	return xmlhttp.responseXML;
}
