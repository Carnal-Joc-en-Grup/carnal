function platform_game(){
	loadpage("./html/platform.html");
}

function load(){
	loadpage("./html/load.html");
}

function exit(){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}