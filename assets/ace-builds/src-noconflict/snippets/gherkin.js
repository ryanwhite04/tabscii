/// BareSpecifier=ace-builds/src-noconflict/snippets/gherkin
ace.define("ace/snippets/gherkin", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "gherkin";
});
(function () {
    ace.require(["ace/snippets/gherkin"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();