/// BareSpecifier=ace-builds/src/snippets/gcode
define("ace/snippets/gcode", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "gcode";
});
(function () {
    window.require(["ace/snippets/gcode"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();