/// BareSpecifier=ace-builds/src-min-noconflict/snippets/prolog
ace.define("ace/snippets/prolog", ["require", "exports", "module"], function (e, t, n) {
    "use strict";
    t.snippetText = "", t.scope = "prolog";
});
(function () {
    ace.require(["ace/snippets/prolog"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();