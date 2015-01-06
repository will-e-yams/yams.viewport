
/* ========================================================================
* yams.viewport.js
* version:	1.1
* author:	Brad Williams <brad.lee.williams@gmail.com>
* ======================================================================== */

if (!$.yams) { $.yams = new Object(); }

$.yams.viewport = (function () {
    //private

    var DEFAULTS = {
        // container sizes from Bootstratp 3.2.0
        sm: 768, // viewport-sm
        md: 992, // viewport-md
        lg: 1200, // viewport-lg
        enableResizeTracking: true,
    }
    var _callbacks = []
    var _lastViewport = {}

    var _getViewport = function () {
        var viewport = {}

        // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        if (typeof window.innerWidth != 'undefined') {
            viewport.width = window.innerWidth,
			viewport.height = window.innerHeight
        } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
            // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
            viewport.width = document.documentElement.clientWidth,
			viewport.height = document.documentElement.clientHeight
        } else {
            // older versions of IE
            viewport.width = document.getElementsByTagName('body')[0].clientWidth,
			viewport.height = document.getElementsByTagName('body')[0].clientHeight
        }

        // set name
        if (viewport.width >= DEFAULTS.lg)
            viewport.name = 'lg'
        else if (viewport.width >= DEFAULTS.md)
            viewport.name = 'md'
        else if (viewport.width >= DEFAULTS.sm)
            viewport.name = 'sm'
        else // default: container-xs
            viewport.name = 'xs'

        return viewport
    }
    var _update = function () {
        var viewport = _getViewport();

        if (viewport.name) {
            if (!_lastViewport
				|| _lastViewport.name != viewport.name) {

                // add class
                $('body')
                    .removeClass('viewport-xs viewport-sm viewport-md viewport-lg')
                    .addClass('viewport-' + viewport.name)

                // run callback
                if (DEFAULTS.enableResizeTracking) {
                    for (var i = 0; i < _callbacks.length; i++) {
                        _callbacks[i](viewport)
                    }
                }
            }

            // set this even if name doesn't change because width/height might
            _lastViewport = viewport
        }
    }

    //public
    return {
        addCallback: function (callback) {
            _callbacks.push(callback)
        },
        init: function (options) {
            $.extend(DEFAULTS, options)
            // initial update
            $(function () {
                _update()
            })
            // update on resize window
            if (DEFAULTS.enableResizeTracking) {
                $(window).on('resize.yams.viewport', function () {
                    _update()
                })
            }
        },
        getViewport: function () {
            return _lastViewport
        },
    };
})();

$(function () {
    $.yams.viewport.init()
})