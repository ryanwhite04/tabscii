/// BareSpecifier=ace-builds/src-noconflict/snippets/pgsql
ace.define("ace/snippets/pgsql", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "pgsql";
});
(function () {
    ace.require(["ace/snippets/pgsql"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();