/// BareSpecifier=ace-builds/src/snippets/logiql
define("ace/snippets/logiql", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "logiql";
});
(function () {
    window.require(["ace/snippets/logiql"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();