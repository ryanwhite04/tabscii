/// BareSpecifier=ace-builds/src-noconflict/snippets/jack
ace.define("ace/snippets/jack", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "jack";
});
(function () {
    ace.require(["ace/snippets/jack"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();