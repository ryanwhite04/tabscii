/// BareSpecifier=ace-builds/src/snippets/kotlin
define("ace/snippets/kotlin", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = undefined;
    exports.scope = "";
});
(function () {
    window.require(["ace/snippets/kotlin"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();