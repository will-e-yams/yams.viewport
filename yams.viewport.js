
if (!$.yams) { $.yams = new Object(); }
if (!$.yams.viewport) { $.yams.viewport = new Object(); }

(function ($, $vp) {

	$vp.init = function () {
        $vp.update();
		$(window).on('resize.yams.viewport', function () {
            $vp.update();
        });
    }

    $vp.update = function () {
    	var viewport = this._getViewport();
    	var viewportModifier = 'unknown';

    	// use container sizes from Bootstratp 3.1.1
    	if (viewport.width >= 1170) { // viewport-lg
    		viewportModifier = 'lg';
    	} else if (viewport.width >= 970) { // viewport-md
    		viewportModifier = 'md';
    	} else if (viewport.width >= 750) { // viewport-sm
    		viewportModifier = 'sm';
    	} else { // container-xs
    		viewportModifier = 'xs';
    	}

    	$('body').removeClass('viewport-xs viewport-sm viewport-md viewport-lg');
    	$('body').addClass('viewport-' + viewportModifier);
    };

    $vp._getViewport = function () {
    	var viewPortWidth;
    	var viewPortHeight;

    	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    	if (typeof window.innerWidth != 'undefined') {
    		viewPortWidth = window.innerWidth,
			viewPortHeight = window.innerHeight
    	} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
    		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    		viewPortWidth = document.documentElement.clientWidth,
			viewPortHeight = document.documentElement.clientHeight
    	} else {
    		// older versions of IE
    		viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
			viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    	}
    	return {
    		width: viewPortWidth,
    		height: viewPortHeight
    	};
    }

})(jQuery, $.yams.viewport);

$.yams.viewport.init();