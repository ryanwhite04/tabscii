/// BareSpecifier=ace-builds/src-noconflict/snippets/jade
ace.define("ace/snippets/jade", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "jade";
});
(function () {
    ace.require(["ace/snippets/jade"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();