/// BareSpecifier=ace-builds/src-noconflict/snippets/d
ace.define("ace/snippets/d", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "d";
});
(function () {
    ace.require(["ace/snippets/d"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();