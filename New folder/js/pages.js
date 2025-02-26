ready(function (){
	
	pageBody = document.getElementById("pageBody");
	pages = {blank:"blank",test:"test",homepage:"homepage"}
  currentPage = {};
  posState = "pos0";
  posStateNext = "pos1";
  
  function switchPage(pageName) { //Templates
    page = document.getElementsByClassName(pageName+" template")[0].cloneNode(true);
    page.classList.remove("template");
    pageBody.textContent = "";
    pageBody.appendChild(page);
    switch(pageName) {
      case "test":
        testPage();
      break;
      
    }
	}
		
	function onRedir() {
    for (pageName in pages) {
      if (location.hash === "#"+pageName){
        switchPage(pageName);
        break;
      }
    }
	}
	
  btn1 = document.getElementsByClassName("btn1")[0];
  function testPage() {
    btn1 = document.getElementsByClassName("btn1")[0];
    btn1.addEventListener("click", btn1toggle );
  }
  function btn1toggle(event) {
    btn1.classList.toggle(posStateNext)
    btn1.classList.toggle(posState)
    switch(posState) {
      case "pos0":
      posState = "pos1";
      posStateNext = "pos2";
      break; case "pos1":
      posState = "pos2"
      posStateNext = "pos0";
      break; case "pos2":
      posState = "pos0"
      posStateNext = "pos1";
    };
  }
  
	window.onhashchange = onRedir;
	
	window.onhashchange();
});
