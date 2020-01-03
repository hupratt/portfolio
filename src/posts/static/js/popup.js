$(document).ready(function() {


		$('.js-fh5co-nav-toggle').on('click', function(event) {
			event.preventDefault();
			if( $('body').hasClass('menu-show') ) {
				$('body').removeClass('menu-show');
				$('#fh5co-main-nav > .js-fh5co-nav-toggle').removeClass('show');
			} else {
				$('body').addClass('menu-show');
				setTimeout(function(){
					$('#fh5co-main-nav > .js-fh5co-nav-toggle').addClass('show');
				}, 900);
            }
        });
    });

	    