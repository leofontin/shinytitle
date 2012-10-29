/*
*	SHINYTITLE
*	Plugin to display the title attribute of your links, buttons and other items.
*	Idel for user interface and administration (CMS, ...)
*/


(function($){


	
	$.fn.shinytitle = function(options){
	
	
		// option init
		var $settings = {};
		
		
		
		
		/**
		* main function
		**/
		return this.each(function(){
			
			// item to be traited
			$obj = $(this);
			
			init();

		});


		/**
		* init function
		**/
		function init(){
			
			var text = $obj.attr('title');
			$obj.removeAttr('title')
				.attr('data-shinytitle',text);
			
			
			// mouse enter on the item
			$obj.mouseenter(function(){
				
				// current item
				$item = $(this);
				
				// text of title of the item
				$text = $item.attr('data-shinytitle');
				
				// if $text is empty, return false and stop the script
				if($text == undefined){
					return;
				}
				
				
				// close windows
				close();
				
				// xreated windows
				create();	
				
			});
			
			
			
			
			// mouse out of the item
			$obj.mouseleave(function(){
				
				// close windows
				close();
				
			});
			
		}
		
		
		
		
		
		// create current windows
		function create(){
			
			
			// create windows html
			$('body').append('<span class="shinytitle"><span>'+ $text +'</span><span class="shinytitle_arrow"></span></span>');
			
			// sizes of windows with text of current title
			$width_title 	= $('.shinytitle').outerWidth();
			$height_title 	= $('.shinytitle').outerHeight();
			
			// sizes of item
			$width_item = $item.outerWidth();
			$height_item = $item.outerHeight();
			
			// get position of item
			getPosition();
			
			// get positions on windows of top
			if($position.top < 50){
				$top = $position.top + $height_item + 10 - scrollY(); // if top of item is lower 50px of top
				$('.shinytitle').addClass('shinytitle_bottom');
			}else{
				$top = $position.top - $height_title - 10 - scrollY();
			}
			
			
			// get positions on windows of left
			
			$left = $position.left - ($width_title - $width_item) / 2;
			$arrow = $width_title / 2 - 5;
			
			if($left < 10){
				$left = 10; // if top of item is lower 50px of left
				$arrow = ($position.left + $width_item / 2) - $left - 5;
			}
			
			else if($left + $width_title > windowW()){
				$left =  windowW() - $width_title - 10 ; // if windows out of browser on the right of browser
				$arrow = ($position.left + $width_item / 2) - $left - 5;
			}
			
			
			// display windows
			show();
			
		}
		
		
		
		/**
		* display windows
		**/
		function show(){
			$('.shinytitle .shinytitle_arrow').css({ left : $arrow });
			
			$('.shinytitle').css({ top : $top, left : $left })
							 .hide()
							 .fadeIn();
			
		}
		
		
		
		/**
		* close all windowws
		**/
		function close(){
			
			$('.shinytitle').remove();
			
		}
		
		
		
		
		/**
		* get position of item
		**/
		function getPosition(){
			$position = $item.offset();
		}
		
		
		/**
		* return browser height
		**/
		function windowH(){
			if (window.innerHeight) return window.innerHeight  ;
			else{return $(window).height();}
		}
		
		
		/**
		* return browser width
		**/
		function windowW(){
			if (window.innerWidth) return window.innerWidth  ;
			else{return $(window).width();}
		}
		
		
		/**
		* return the height of the scroll
		**/
		function scrollY() {
			scrOfY = 0;
			if( typeof( window.pageYOffset ) == 'number' ) {
				scrOfY = window.pageYOffset;
			} else if( document.body && ( document.body.scrollTop ) ) {
				scrOfY = document.body.scrollTop;
			} else if( document.documentElement && ( document.documentElement.scrollTop ) ) {
				scrOfY = document.documentElement.scrollTop;
			}
			return scrOfY;
		}
		
		
		/**
		* eturn the width of the scroll
		**/
		function scrollX(){
			scrOfX = 0;
			if( typeof( window.pageXOffset ) == 'number' ) {
				scrOfX = window.pageXOffset;
			} else if( document.body && ( document.body.scrollLeft ) ) {
				scrOfX = document.body.scrollLeft;
			} else if( document.documentElement && ( document.documentElement.scrollLeft ) ) {
				scrOfX = document.documentElement.scrollLeft;
			}
			return scrOfX;
		}


	};
		
})(jQuery);