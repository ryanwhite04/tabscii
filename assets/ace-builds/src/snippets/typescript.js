/// BareSpecifier=ace-builds/src/snippets/typescript
define("ace/snippets/typescript", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "typescript";
});
(function () {
    window.require(["ace/snippets/typescript"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();