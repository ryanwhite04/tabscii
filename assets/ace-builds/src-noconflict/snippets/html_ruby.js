/// BareSpecifier=ace-builds/src-noconflict/snippets/html_ruby
ace.define("ace/snippets/html_ruby", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "html_ruby";
});
(function () {
    ace.require(["ace/snippets/html_ruby"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();