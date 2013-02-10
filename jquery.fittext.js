/*global jQuery */
/*!	
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Date: Sat February 09 23:25:00 2013 -0600
*/
(function( $ ){

	$.fn.fitText = function( kompressor, options ) {

		// Setup options
		var compressor = kompressor || 1,
		settings = $.extend({
			'minFontSize' : Number.NEGATIVE_INFINITY,
			'maxFontSize' : Number.POSITIVE_INFINITY,
			'transitionduration': '75ms'
			}, options);

		return this.each(function(){

			// Store the object
			var $this = $(this),
			letterspacing = parseInt( $this.css('letter-spacing' ), 10 ),
			ratio = letterspacing ? letterspacing / parseInt( $this.css('font-size'), 10 ) : letterspacing;
			
			$this.css({
				'transition-property': 'font-size, line-height, letter-spacing', 
				'-moz-transition-property': 'font-size, line-height, letter-spacing',
				'-webkit-transition-property': 'font-size, line-height, letter-spacing',
				'-o-transition-property': 'font-size, line-height, letter-spacing',
				'transition-duration': settings.transitionduration,
				'-moz-transition-duration': settings.transitionduration,
				'-webkit-transition-duration': settings.transitionduration,
				'-o-transition-duration': settings.transitionduration,
				'line-height': parseInt( $this.css('line-height'), 10 ) / parseInt( $this.css('font-size'), 10 ) + 'em'
			});

			// Resizer() resizes items based on the object width divided by the compressor * 10
			var resizer = function () {
				var fontsize = Math.max( Math.min( $this.width() / ( compressor * 10 ), parseFloat( settings.maxFontSize ) ), parseFloat( settings.minFontSize ) );
				$this.css({
					'font-size': fontsize,
					'letter-spacing': ( fontsize * ratio ) + 'px'
				});
			};

			// resize loop at 60fps to remove window event listener
			setTimeout(function(){
				resizer();
				setTimeout(arguments.callee, 16);
			}, 16);

		});

	};

})( jQuery );