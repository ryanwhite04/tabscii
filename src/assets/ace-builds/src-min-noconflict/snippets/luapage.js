/// BareSpecifier=ace-builds/src-min-noconflict/snippets/luapage
ace.define("ace/snippets/luapage", ["require", "exports", "module"], function (e, t, n) {
    "use strict";
    t.snippetText = "", t.scope = "luapage";
});
(function () {
    ace.require(["ace/snippets/luapage"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();