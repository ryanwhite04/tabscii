/// BareSpecifier=ace-builds/src-min/ext-error_marker
;
(function () {
    window.require(["ace/ext/error_marker"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();