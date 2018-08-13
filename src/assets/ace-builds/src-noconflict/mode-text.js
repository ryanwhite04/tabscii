/// BareSpecifier=ace-builds/src-noconflict/mode-text

;
(function () {
    ace.require(["ace/mode/text"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();