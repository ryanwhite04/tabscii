/// BareSpecifier=ace-builds/src/snippets/bro
define("ace/snippets/bro", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = undefined;
    exports.scope = "";
});
(function () {
    window.require(["ace/snippets/bro"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();