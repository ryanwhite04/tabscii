/// BareSpecifier=ace-builds/src-noconflict/snippets/plain_text
ace.define("ace/snippets/plain_text", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "plain_text";
});
(function () {
    ace.require(["ace/snippets/plain_text"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();