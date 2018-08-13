/// BareSpecifier=ace-builds/src-min/mode-text
;
(function () {
    window.require(["ace/mode/text"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();