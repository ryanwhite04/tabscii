/// BareSpecifier=ace-builds/src-noconflict/snippets/swift
ace.define("ace/snippets/swift", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "swift";
});
(function () {
    ace.require(["ace/snippets/swift"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();