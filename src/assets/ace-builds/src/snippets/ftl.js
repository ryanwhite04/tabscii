/// BareSpecifier=ace-builds/src/snippets/ftl
define("ace/snippets/ftl", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "ftl";
});
(function () {
    window.require(["ace/snippets/ftl"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();