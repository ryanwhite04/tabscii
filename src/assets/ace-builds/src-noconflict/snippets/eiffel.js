/// BareSpecifier=ace-builds/src-noconflict/snippets/eiffel
ace.define("ace/snippets/eiffel", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "eiffel";
});
(function () {
    ace.require(["ace/snippets/eiffel"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();