/**
 * CSSS javascript code
 * @author Lea Verou (http://leaverou.me)
 * @version 1.0
 */

(function(){
// Cache <title> element, we may need it for slides that don't have titles
var documentTitle = document.getElementsByTagName('title')[0].textContent;

window.SlideShow = function(container, slide) {
	var me = this;

	container = container || document.body;

	// Current slide
	this.slide = slide || 0;

	// Current .delayed item in the slide
	this.item = 0;

	// Get the slide elements into an array
	this.slides = Array.prototype.slice.apply(container.querySelectorAll('.slide'));

	for(var i=0; i<this.slides.length; i++) {
		var slide = this.slides[i]; // to speed up references

		// Asign ids to slides that don't have one
		if(!slide.id) {
			slide.id = 'slide' + (i+1);
		}

		// Set data-title attribute to the title of the slide
		if(!slide.title) {
			// no title attribute, fetch title from heading(s)
			var heading = slide.querySelector('hgroup') || slide.querySelector('h1,h2,h3,h4,h5,h6');

			if(heading && heading.textContent.trim()) {
				slide.setAttribute('data-title', heading.textContent);
			}
		}
		else {
			// The title attribute is set, use that
			slide.setAttribute('data-title', slide.title);
			slide.removeAttribute('title');
		}

		var minislides = Array.prototype.slice.apply(slide.querySelectorAll('ul > li'));
		for(var j = 0, k = minislides.length; j < k; j++) {
		  if(!minislides[j].querySelector('div.content')) {
		    minislides[j].innerHTML = '<div class="content">' + minislides[j].innerHTML + '</div>';
		  }
		}
	}

	// If there's already a hash, update current slide number...
	this.goto(location.hash.substr(1) || 0);

	// ...and keep doing so every time the hash changes
	this.onhashchange = function() {
		me.goto(location.hash.substr(1) || 0);
	};
	window.addEventListener('hashchange', this.onhashchange, false);

	// In some browsers DOMContentLoaded is too early, so try again onload
	window.addEventListener('load', function() {
		//me.adjustFontSize();
	}, false);

	/**
		Keyboard navigation
		Home : First slide
		End : Last slide
		Up/Right arrow : Next item/slide
		Ctrl + Up/Right arrow : Next slide
		Down/Left arrow : Previous item/slide
		Ctrl + Down/Left arrow : Previous slide
		Ctrl+G : Go to slide...
		Ctrl+H : Show thumbnails and go to slide
		(Shift instead of Ctrl works too)
	*/
	document.addEventListener('keyup', function(evt) {
		if(evt.ctrlKey || evt.shiftKey) {
			switch(evt.keyCode) {
				case 71: // G
					var slide = prompt('Which slide?');
					me.goto(+slide? slide - 1 : slide);
					break;
				case 72: // H

						document.body.addEventListener('click', function(evt) {
							var slide = evt.target;

							while(slide && !slide.classList.contains('slide')) {
								slide = slide.parentNode;
							}

							if(slide) {
								me.goto(slide.id);
							}
						}, false);
					break;
				case 74: // J
					if(document.body.classList.contains('hide-elements')) {
						document.body.classList.remove('hide-elements');
					}
					else {
						document.body.classList.add('hide-elements');
					}
			}
		}

		if(evt.target === document.body || evt.target === document.body.parentNode) {
			if(evt.keyCode >= 35 && evt.keyCode <= 40) {
				evt.preventDefault();
			}

			switch(evt.keyCode) {
				case 35: // end
					me.end();
					break;
				case 36: // home
					me.start();
					break;
				case 37: // <-
				case 38: // up arrow
				case 33:
					me.previous(evt.ctrlKey || evt.shiftKey);
					break;
				case 39: // ->
				case 40: // down arrow
				case 34:
					me.next(evt.ctrlKey || evt.shiftKey);
					break;
			}
		}
	}, false);
}

SlideShow.prototype = {
	start: function() {
		this.goto(0);
	},

	end: function() {
		this.goto(this.slides.length - 1);
	},

	/**
		@param hard {Boolean} Whether to advance to the next slide (true) or
			just the next step (which could very well be showing a list item)
	 */
	next: function(hard) {
		if(!hard && this.items.length) {
			// If there's no current, then just mark the first one as such
			if(!this.item) {
				this.items[this.item++].classList.add('current');
			}
			// Add .current to current item if it exists, otherwise advance to next slide
			else if(this.item < this.items.length) {
				classes = this.items[this.item - 1].classList; // to speed up lookups

				classes.remove('current');
				classes.add('displayed');

				this.items[this.item++].classList.add('current');
			}
			else {
				this.item = 0;
				this.next(true);
			}
		}
		else {
			this.goto(this.slide + 1);

			this.item = 0;

			// Mark all items as not displayed, if there are any
			if(this.items.length) {
				for (var i=0; i<this.items.length; i++) {
					if(this.items[i].classList) {
						this.items[i].classList.remove('displayed');
						this.items[i].classList.remove('current');
					}
				}
			}
		}
	},

	previous: function(hard) {
		if(!hard && this.item > 0) {
			var classes = this.items[this.item - 1].classList; // to speed up lookups

			classes.remove('current');

			if(this.item > 1) {
				classes = this.items[--this.item - 1].classList;

				classes.remove('displayed');
				classes.add('current');
			}
			else {
				this.item = 0;
			}
		}
		else {

			this.goto(this.slide - 1);

			this.item = this.items.length;

			// Mark all items as displayed, if there are any
			if(this.items.length) {
				for (var i=0; i<this.items.length; i++) {
					if(this.items[i].classList) {
						this.items[i].classList.add('displayed');
					}
				}

				// Mark the last one as current
				var lastItem = this.items[this.items.length - 1];

				lastItem.classList.remove('displayed');
				lastItem.classList.add('current');
			}
		}
	},

	/**
		Go to an aribtary slide
		@param which {String|Integer} Which slide (identifier or slide number)
	*/
	goto: function(which) {
		var slide;

		// We have to remove it to prevent multiple calls to goto messing up
		// our current item (and there's no point either, so we save on performance)
		window.removeEventListener('hashchange', this.onhashchange, false);

		if(which + 0 === which && which in this.slides) { // Argument is a valid slide number
			this.slide = which;

			slide = this.slides[this.slide];
			location.hash = '#' + slide.id;
		}
		else if(which + '' === which) { // Argument is a slide id
			slide = document.getElementById(which);

			if(slide) {
				this.slide = this.slides.indexOf(slide);
				location.hash = '#' + which;
			}
		}

		if(slide) { // Slide actually changed, perform any other tasks needed
			document.title = slide.getAttribute('data-title') || documentTitle;

			//this.adjustFontSize();

			// Update items collection
			this.items = this.slides[this.slide].querySelectorAll('ul.delayed > li');
			this.item = 0;
		}

		// If you attach the listener immediately again then it will catch the event
		// We have to do it asynchronously
		var me = this;
		setTimeout(function() {
			window.addEventListener('hashchange', me.onhashchange, false);
		}, 1000);
	}
};

})();
