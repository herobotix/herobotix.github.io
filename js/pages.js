ready(function (){
	
	main = document.getElementById("main");
	pagesNames = ["home","about","videos","teams","calendar","sponsorships","taxcredits","volunteer"];
	pages = {}
	
	function drkmdtoggle(event) {
		document.body.classList.toggle("drkmd")
	}
	
	document.getElementById("drkmdbtn").addEventListener("click", drkmdtoggle );
		
	function onRedir () {
		let hash = location.hash.slice(1), page;
		if (!pagesNames.includes(hash)) hash = "home";
		page = document.getElementsByClassName(hash + " template")[0].cloneNode(true);
		main.replaceChildren(...page.childNodes);
	}
	
	window.onhashchange = onRedir;
	
	window.onhashchange();
	
});
