ready(function (){
	
	pageBody = document.getElementById("pageBody");
	pages = {}
	pages.homepage = function() { /*homepage template*/
		page = document.getElementsByClassName("homepage template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	pages.volunteer = function() { /*volunteer template*/
		page = document.getElementsByClassName("volunteer template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	pages.about = function() { /*about template*/
		page = document.getElementsByClassName("about template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	pages.videos = function() { /*videos template*/
		page = document.getElementsByClassName("videos template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	pages.teams = function() { /*teams template*/
		page = document.getElementsByClassName("teams template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	pages.donations = function() { /*donations template*/
		page = document.getElementsByClassName("donations template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	
	function drkmdtoggle(event) {
		document.body.classList.toggle("drkmd")
	}
	
	document.getElementById("drkmdbtn").addEventListener("click", drkmdtoggle );
		
	function onRedir () {
		if (location.hash === "#volunteer") pages.volunteer();
		else if (location.hash === "#about") pages.about();
		else if (location.hash === "#videos") pages.videos();
		else if (location.hash === "#teams") pages.teams();
		else if (location.hash === "#donations") pages.donations();
		else pages.homepage();
	}
	
	window.onhashchange = onRedir;
	
	window.onhashchange();
});
