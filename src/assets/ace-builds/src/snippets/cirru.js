/// BareSpecifier=ace-builds/src/snippets/cirru
define("ace/snippets/cirru", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "cirru";
});
(function () {
    window.require(["ace/snippets/cirru"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();