function platform_game(){
	localStorage.setItem("carregar",0);
	loadpage("https://carnal-joc-en-grup.github.io/carnal/html/platform.html");

}

function load(){
	localStorage.setItem("carregar",1);
	loadpage("https://carnal-joc-en-grup.github.io/carnal/html/platform.html");
	
}

function exit(){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}