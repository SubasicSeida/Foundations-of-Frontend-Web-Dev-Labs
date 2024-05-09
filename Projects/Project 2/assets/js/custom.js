$(document).ready(function(){
	"use strict";


/*=========== TABLE OF CONTENTS ===========
1. Scroll To Top 
2. slick carousel
3. welcome animation support
4. feather icon
5. counter
6. modal forms
7. toggle content
8. form validation
======================================*/

    // 1. Scroll To Top 
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
	
	
	// 2. slick carousel

	    $(".testimonial-carousel").slick({
	        infinite: true,
	        centerMode: true,
	        autoplay:true,
	        slidesToShow: 5,
	        slidesToScroll: 3,
	        autoplaySpeed:1500,
	        // the magic
			responsive: [
				{

					breakpoint:1440,
					settings: {
					slidesToShow:3
					}

				},
				{

					breakpoint: 1024,
					settings: {
					slidesToShow:2,
					
					}

				}, 
				{

					breakpoint:991,
					settings: {
					slidesToShow:2,
					centerMode:false,
					}

				},
				{

					breakpoint:767,
					settings: {
					slidesToShow:1,
					}

				}
			]
	    });



    // 3. welcome animation support

        $(window).load(function(){
        	$(".welcome-hero-txt h2,.welcome-hero-txt p").removeClass("animated fadeInUp").css({'opacity':'0'});
            $(".welcome-hero-serch-box").removeClass("animated fadeInDown").css({'opacity':'0'});
        });

        $(window).load(function(){
        	$(".welcome-hero-txt h2,.welcome-hero-txt p").addClass("animated fadeInUp").css({'opacity':'0'});
            $(".welcome-hero-serch-box").addClass("animated fadeInDown").css({'opacity':'0'});
        });

	// 6. modal forms
	var signIn = document.getElementById('signInModal'); // get the sign in modal
	var register = document.getElementById('registerModal');
	
	window.onclick = function(event) {
		// Check if the clicked element is the sign in modal
		if (event.target == signIn) {
			signIn.style.display = "none";
		}
		// Check if the clicked element is the register modal
		if (event.target == register) {
			register.style.display = "none";
		}
	}

	// 7. toggle content
	function toggleContent(){
		var dots = document.getElementById("dots");
		var moreText = document.getElementById("more");
		var btnText = document.getElementById("single-blog-item-btn");

		if (dots.style.display === "none") {
			dots.style.display = "inline";
			btnText.innerHTML = "Show more <i class='fa-solid fa-chevron-up'></i>";
			moreText.style.display = "none";
		} else {
			dots.style.display = "none";
			btnText.innerHTML = "Show less <i class='fa-solid fa-chevron-up'></i>";
			moreText.style.display = "inline";
		}
	}

	// 8. form validation
	$.validator.addMethod("strongPassword", function(value) {
		// Password must contain at least one lowercase letter, one uppercase letter
		// and be at least 8 characters long
		return /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
	  }, "Password must contain at least one lowercase letter, one uppercase letter, and be at least 8 characters long");
  
	  $("#register-form").validate({
		rules: {
		  username: {
			required: true
		  },
		  password: {
			required: true,
			strongPassword: true
		  }
		},
		messages: {
		  username: {
			required: "Please enter your username"
		  },
		  password: {
			required: "Please enter your password"
		  }
		}
});
});