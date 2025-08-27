ready(function (){
	
	let main = document.getElementById("main");
	let pagesNames = ["home","sponsors","videos","teams","calendar","sponsorships","taxcredits","volunteer"];
  let pagesFuncs = {
    "sponsors": (page) => {
      let lis = [...page.getElementsByTagName("li")];
      lis.forEach( li => { li.setAttribute('order', Math.random()) } );
      lis.sort((lia, lib) => lia.getAttribute('order') - lib.getAttribute('order'));
      lis.forEach( li => { li.removeAttribute('order') } );
      page.getElementsByTagName("ul")[0].replaceChildren(...lis);
    },
  };
	let pages = {};
	
	function drkmdtoggle(event) {
		document.body.classList.toggle("drkmd");
	}
	
	document.getElementById("drkmdbtn").addEventListener("click", drkmdtoggle );
	
	function onRedir () {
		let hash = location.hash.slice(1), page;
		if (!pagesNames.includes(hash)) hash = "home";
		page = document.getElementsByClassName(hash + " template")[0].cloneNode(true);
    if (Object.keys(pagesFuncs).includes(hash)) pagesFuncs[hash](page);
		main.replaceChildren(...page.childNodes);
	}
	
	window.onhashchange = onRedir;
	
	window.onhashchange();
	
});
