/// BareSpecifier=ace-builds/src-noconflict/snippets/batchfile
ace.define("ace/snippets/batchfile", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "batchfile";
});
(function () {
    ace.require(["ace/snippets/batchfile"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();