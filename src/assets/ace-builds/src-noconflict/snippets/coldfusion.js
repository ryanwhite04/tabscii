/// BareSpecifier=ace-builds/src-noconflict/snippets/coldfusion
ace.define("ace/snippets/coldfusion", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "coldfusion";
});
(function () {
    ace.require(["ace/snippets/coldfusion"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();