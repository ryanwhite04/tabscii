/// BareSpecifier=ace-builds/src-noconflict/snippets/livescript
ace.define("ace/snippets/livescript", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "livescript";
});
(function () {
    ace.require(["ace/snippets/livescript"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();