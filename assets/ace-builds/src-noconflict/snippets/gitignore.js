/// BareSpecifier=ace-builds/src-noconflict/snippets/gitignore
ace.define("ace/snippets/gitignore", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "gitignore";
});
(function () {
    ace.require(["ace/snippets/gitignore"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();