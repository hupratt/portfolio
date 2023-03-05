$(document).ready(function() {
	$('.js-fh5co-nav-toggle').on('click', function(event) {
		event.preventDefault();
		if( $('body').hasClass('menu-show') ) {
			$('body').removeClass('menu-show');
			$('#fh5co-main-nav > .js-fh5co-nav-toggle').removeClass('show');
			document.getElementsByTagName("main")[0].pageable.events.wheel = true;
			$('.grid-item-wrapper a').unbind("click.myDisable");
			$('.grid-item-wrapper a').css('pointer-events','');
			$('.grid-item-wrapper a').show();

		} else {
			$('body').addClass('menu-show');
			setTimeout(function(){
				$('#fh5co-main-nav > .js-fh5co-nav-toggle').addClass('show');
			}, 900);
			document.getElementsByTagName("main")[0].pageable.events.wheel = false;
			$('.grid-item-wrapper a').bind("click.myDisable", function() { return false; });
			$('.grid-item-wrapper a').css('pointer-events','none');
			$('.grid-item-wrapper a').hide();
			$('#closeme').css('pointer-events','');
			$('#closeme').show();
			
		}
	});


});

	    
