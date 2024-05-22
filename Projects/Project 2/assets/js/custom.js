$(document).ready(function(){
	"use strict";

	$("main#spapp > section").height($(document).height() - 60);
	var app = $.spapp({ pageNotFound: "error_404" });

	app.route({
		view: "home",
		load: "home.html",
	});
	app.route({
		view: "explore",
		load: "explore.html",
	});
	app.route({
		view: "blog",
		load: "blog.html",
	});
	app.route({
		view: "account",
		load: "account.html",
	});
	app.run();

	
	// dark theme
	var darkThemeIcon = document.getElementById("dark-mode");
	darkThemeIcon.addEventListener("click", function(){
		document.body.classList.toggle("dark-theme");
		if(document.body.classList.contains("dark-theme")){
			darkThemeIcon.innerHTML = '<i class="fa-regular fa-sun"></i>';
		}else{
			darkThemeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
		}
	})
});