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
		view: "profile",
		load: "profile.html",
	});
	app.run();

	function attachHomeEventListeners() {
        $(window).on('scroll',function () {
			if ($(this).scrollTop() > 600) {
				$('.return-to-top').fadeIn();
			} else {
				$('.return-to-top').fadeOut();
			}
		});
		$('.return-to-top').on('click',function(){
				$('html, body').animate({
				scrollTop: 0
			}, 1500);
			return false;
		});

		
    }

    // Function to attach event listeners for the explore section
    function attachExploreEventListeners() {
        // Example of event listener for explore page
        alert("explore activated");

        // Add more event listeners for explore page here
    }

    // Similarly, you can create functions for blog and profile sections

    // Attach event listeners after the content is loaded
    function attachEventListeners(view) {
        switch(view) {
            case 'home':
                attachHomeEventListeners();
                break;
            case 'explore':
                attachExploreEventListeners();
                break;
            case 'blog':
                // attachBlogEventListeners();
                break;
            case 'profile':
                // attachProfileEventListeners();
                break;
        }
    }

    // Listen for the route change event and attach event listeners accordingly
    $(window).on('hashchange', function() {
        const hash = window.location.hash.substring(1); // Get the current hash without the #
        attachEventListeners(hash);
    });

    // Attach event listeners for the initial view
    const initialHash = window.location.hash.substring(1) || 'home'; // Default to 'home' if no hash
    attachEventListeners(initialHash);

/*=========== TABLE OF CONTENTS ===========
1. Scroll To Top 
2. slick carousel
3. welcome animation support
4. feather icon
5. counter
6. modal forms
7. toggle content
8. form validation
9. photo gallery
10. dark theme
======================================*/

    

	// 10. dark theme
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