/// BareSpecifier=ace-builds/src-noconflict/snippets/powershell
ace.define("ace/snippets/powershell", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "powershell";
});
(function () {
    ace.require(["ace/snippets/powershell"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();