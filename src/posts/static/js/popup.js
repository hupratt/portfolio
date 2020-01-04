$(document).ready(function() {
	$('.js-fh5co-nav-toggle').on('click', function(event) {
		event.preventDefault();
		if( $('body').hasClass('menu-show') ) {
			$('body').removeClass('menu-show');
			$('#fh5co-main-nav > .js-fh5co-nav-toggle').removeClass('show');
			document.getElementsByTagName("main")[0].pageable.events.wheel = true;
			$('a').unbind("click.myDisable");
			$('a').css('pointer-events','');
			$('a').show();
			$('#dark-mode-toggle').show();

		} else {
			$('body').addClass('menu-show');
			setTimeout(function(){
				$('#fh5co-main-nav > .js-fh5co-nav-toggle').addClass('show');
			}, 900);
			document.getElementsByTagName("main")[0].pageable.events.wheel = false;
			$('a').bind("click.myDisable", function() { return false; });
			$('a').css('pointer-events','none');
			$('a').hide();
			$('#dark-mode-toggle').hide();
			$('#closeme').css('pointer-events','');
			$('#closeme').show();
			
		}
	});
	// [].forEach.call(document.getElementById("showNightToggle"),function(el){
	// 	el.addEventListener("click",function(e){
	// 		if( $('#dark-mode-toggle').hasClass('hidden') ) {
	// 			$('#dark-mode-toggle').show();
	// 			$('#dark-mode-toggle').removeClass('hidden');
	// 		} else {
	// 			$('#dark-mode-toggle').hide();
	// 			$('#dark-mode-toggle').addClass('hidden');	
	// 		}		});
	//   });
	$('#showNightToggle').bind('click', function() {
		if( $('#dark-mode-toggle').hasClass('hidden') ) {
		$('#dark-mode-toggle').show();
		$('#dark-mode-toggle').removeClass('hidden');
		$('#showNightToggle').text("Hide Theme")
	} else {
		$('#dark-mode-toggle').hide();
		$('#dark-mode-toggle').addClass('hidden');	
		$('#showNightToggle').text("Show Theme")
	}
	});
});

	    