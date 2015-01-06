# yams.viewport.js
# a jQuery plugin that adds viewport classes to the body tag

## Summary

Add one of the following classes to the `<body>` element

* `viewport-xs`
* `viewport-sm`
* `viewport-md`
* `viewport-lg`

## Requires

* [jQuery](#http://jQuery.com)

## Usage

```
<script type="text/javascript" src="yams.viewport.js"></script>
<script type="text/javascript">
    // add callbacks before document ready
    $.yams.viewport.addCallback(funcion(viewport) {
		// viewport object schema
		// {
		//     name: name of currently set viewport
		//     width: current window width
		//     height: current window height
		// }
		console.log('viewport is now ', viewport)
    })
</script> 
```

## Notes

* By default, uses Bootstrap 3.2.x viewport sizes and nomenclature
 * `.viewport-xs` (default)
 * `.viewport-sm` (width >= 768)
 * `.viewport-md` (width >= 992)
 * `.viewport-lg` (width >= 1200)
