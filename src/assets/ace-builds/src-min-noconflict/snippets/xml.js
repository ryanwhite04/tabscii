/// BareSpecifier=ace-builds/src-min-noconflict/snippets/xml
ace.define("ace/snippets/xml", ["require", "exports", "module"], function (e, t, n) {
    "use strict";
    t.snippetText = "", t.scope = "xml";
});
(function () {
    ace.require(["ace/snippets/xml"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();