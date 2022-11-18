ready(function (){
	
	pageBody = document.getElementById("pageBody");
	pages = {}
	pages.homepage = function() {
		page = document.getElementsByClassName("homepage template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	pages.volunteer = function() {
		page = document.getElementsByClassName("volunteer template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	pages.about = function() {
		page = document.getElementsByClassName("about template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	pages.videos = function() {
		page = document.getElementsByClassName("videos template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	pages.teams = function() {
		page = document.getElementsByClassName("teams template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	pages.donations = function() {
		page = document.getElementsByClassName("donations template")[0].cloneNode(true);
		page.classList.remove("template");
		pageBody.textContent = "";
		pageBody.appendChild(page);
	}
	
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
