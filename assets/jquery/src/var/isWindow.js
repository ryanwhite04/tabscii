/// BareSpecifier=jquery/src/var/isWindow
define(function () {
	"use strict";

	return function isWindow(obj) {
		return obj != null && obj === obj.window;
	};
});