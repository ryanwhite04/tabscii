/// BareSpecifier=ace-builds/src-min-noconflict/snippets/less
ace.define("ace/snippets/less", ["require", "exports", "module"], function (e, t, n) {
    "use strict";
    t.snippetText = "", t.scope = "less";
});
(function () {
    ace.require(["ace/snippets/less"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();