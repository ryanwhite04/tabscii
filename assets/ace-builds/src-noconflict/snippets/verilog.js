/// BareSpecifier=ace-builds/src-noconflict/snippets/verilog
ace.define("ace/snippets/verilog", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";

    exports.snippetText = "";
    exports.scope = "verilog";
});
(function () {
    ace.require(["ace/snippets/verilog"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();