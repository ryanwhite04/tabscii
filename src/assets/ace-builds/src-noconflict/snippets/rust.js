/// BareSpecifier=ace-builds/src-noconflict/snippets/rust
ace.define("ace/snippets/rust", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "rust";
});
(function () {
    ace.require(["ace/snippets/rust"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();