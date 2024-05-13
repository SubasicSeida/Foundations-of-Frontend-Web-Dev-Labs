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
9. photo gallery
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
	/*

        $(window).load(function(){
        	$(".welcome-hero-txt h2,.welcome-hero-txt p").removeClass("animated fadeInUp").css({'opacity':'0'});
            $(".welcome-hero-serch-box").removeClass("animated fadeInDown").css({'opacity':'0'});
        });

        $(window).load(function(){
        	$(".welcome-hero-txt h2,.welcome-hero-txt p").addClass("animated fadeInUp").css({'opacity':'0'});
            $(".welcome-hero-serch-box").addClass("animated fadeInDown").css({'opacity':'0'});
        }); */

		$(window).on('load', function() {
			$(".welcome-hero-txt h2,.welcome-hero-txt p").removeClass("animated fadeInUp").css({'opacity':'0'});
			$(".welcome-hero-serch-box").removeClass("animated fadeInDown").css({'opacity':'0'});
		});
		
		$(window).on('load', function() {
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
		event.stopPropagation();
	}

	// 7. toggle content
	// DOES NOT WORK HERE BUT IN HTML SCRIPT

	// 8. form validation
	$.validator.addMethod("strongPassword", function(value) {
		// Password must contain at least one lowercase letter, one uppercase letter
		// and be at least 8 characters long
		return /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
	  }, "Password must contain at least one lowercase letter, one uppercase letter, and be at least 8 characters long");
  
	$("#register-form").validate({
		rules: {
			email: {
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
		},
		submitHandler: function (form) {
			try {
				$.blockUI({ message: '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>' });
				$(form)[0].reset();
	
				setTimeout(function(){
					console.log('time out')
					$.unblockUI();
				}, 3000)
				
			} catch (error) {
				console.error('Error in submitHandler:', error);
				alert('An error occurred. Please try again later.');
				$.unblockUI();
			}
		}
	});
	$("#sign-in-form").validate({
		rules: {
			email: {
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
		},
		submitHandler: function (form) {
			try {
				$.blockUI({ message: '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>' });
				$(form)[0].reset();
	
				setTimeout(function(){
					console.log('time out')
					$.unblockUI();
				}, 3000)
				
			} catch (error) {
				console.error('Error in submitHandler:', error);
				alert('An error occurred. Please try again later.');
				$.unblockUI();
			}
		}
	});

	// 9. photo gallery 
	let currentIndex = 0;
    const images = document.querySelectorAll('.gallery img');
    const totalImages = images.length;

    // Open the lightbox
    function openLightbox(event) {
        if (event.target.tagName === 'IMG') {
            const clickedIndex = Array.from(images).indexOf(event.target);
            currentIndex = clickedIndex;
            updateLightboxImage();
            document.getElementById('lightbox').style.display = 'flex';
        }
    }

    // Close the lightbox
    function closeLightbox() {
        document.getElementById('lightbox').style.display = 'none';
    }

    // Change the lightbox image based on direction (1 for next, -1 for prev)
    function changeImage(direction) {
        currentIndex += direction;
        if (currentIndex >= totalImages) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = totalImages - 1;
        }
        updateLightboxImage();
    }

    // Update the lightbox image and thumbnails
    function updateLightboxImage() {
        const lightboxImg = document.getElementById('lightbox-img');
        const thumbnailContainer = document.getElementById('thumbnail-container');

        // Update the main lightbox image
        lightboxImg.src = images[currentIndex].src;

        // Clear existing thumbnails
        thumbnailContainer.innerHTML = '';

        // Add new thumbnails
        images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image.src;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.classList.add('thumbnail');
            thumbnail.addEventListener('click', () => updateMainImage(index));
            thumbnailContainer.appendChild(thumbnail);
        });

        // Highlight the current thumbnail
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails[currentIndex].classList.add('active-thumbnail');
    }

    // Update the main lightbox image when a thumbnail is clicked
    function updateMainImage(index) {
        currentIndex = index;
        updateLightboxImage();
    }

    // Add initial thumbnails
    updateLightboxImage();


    // To add keyboard navigation (left/right arrow keys)
    document.addEventListener('keydown', function (e) {
        if (document.getElementById('lightbox').style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
});