var playerID;
var gameID;


function createGame(name)
{
  var x = sendXML(sendPlayerID(name), "NewGame");

	displayInfo(getXMLValue(x, "gameID"), "myDiv") ;
}

//Constructs the proper xml structure for the Create Game request
//around !!String!! ["name"] as one long string [txt] which is returned.
//This is used as request text to send to server
function sendPlayerID(name)
{
	txt="<request>";
	txt=txt+"<playerID>"+ name + "</playerID>";
	txt=txt+"</request>";
	return txt;
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