/// BareSpecifier=ace-builds/src-noconflict/snippets/mixal
ace.define("ace/snippets/mixal", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "mixal";
});
(function () {
    ace.require(["ace/snippets/mixal"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();