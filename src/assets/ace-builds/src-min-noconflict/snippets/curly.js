/// BareSpecifier=ace-builds/src-min-noconflict/snippets/curly
ace.define("ace/snippets/curly", ["require", "exports", "module"], function (e, t, n) {
    "use strict";
    t.snippetText = "", t.scope = "curly";
});
(function () {
    ace.require(["ace/snippets/curly"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();