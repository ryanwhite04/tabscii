/// BareSpecifier=ace-builds/src-noconflict/snippets/groovy
ace.define("ace/snippets/groovy", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "groovy";
});
(function () {
    ace.require(["ace/snippets/groovy"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();