/// BareSpecifier=ace-builds/src-min/mode-yaml
define("ace/mode/yaml_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./text_highlight_rules").TextHighlightRules,
        s = function () {
        this.$rules = { start: [{ token: "comment", regex: "#.*$" }, { token: "list.markup", regex: /^(?:-{3}|\.{3})\s*(?=#|$)/ }, { token: "list.markup", regex: /^\s*[\-?](?:$|\s)/ }, { token: "constant", regex: "!![\\w//]+" }, { token: "constant.language", regex: "[&\\*][a-zA-Z0-9-_]+" }, { token: ["meta.tag", "keyword"], regex: /^(\s*\w.*?)(:(?=\s|$))/ }, { token: ["meta.tag", "keyword"], regex: /(\w+?)(\s*:(?=\s|$))/ }, { token: "keyword.operator", regex: "<<\\w*:\\w*" }, { token: "keyword.operator", regex: "-\\s*(?=[{])" }, { token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]' }, { token: "string", regex: /[|>][-+\d\s]*$/, onMatch: function (e, t, n, r) {
                    var i = /^\s*/.exec(r)[0];return n.length < 1 ? n.push(this.next) : n[0] = "mlString", n.length < 2 ? n.push(i.length) : n[1] = i.length, this.token;
                }, next: "mlString" }, { token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']" }, { token: "constant.numeric", regex: /(\b|[+\-\.])[\d_]+(?:(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)(?=[^\d-\w]|$)/ }, { token: "constant.numeric", regex: /[+\-]?\.inf\b|NaN\b|0x[\dA-Fa-f_]+|0b[10_]+/ }, { token: "constant.language.boolean", regex: "\\b(?:true|false|TRUE|FALSE|True|False|yes|no)\\b" }, { token: "paren.lparen", regex: "[[({]" }, { token: "paren.rparen", regex: "[\\])}]" }, { token: "text", regex: /[^\s,:\[\]\{\}]+/ }], mlString: [{ token: "indent", regex: /^\s*$/ }, { token: "indent", regex: /^\s*/, onMatch: function (e, t, n) {
                    var r = n[1];return r >= e.length ? (this.next = "start", n.splice(0)) : this.next = "mlString", this.token;
                }, next: "mlString" }, { token: "string", regex: ".+" }] }, this.normalizeRules();
    };r.inherits(s, i), t.YamlHighlightRules = s;
}), define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    "use strict";
    var r = e("../range").Range,
        i = function () {};(function () {
        this.checkOutdent = function (e, t) {
            return (/^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
            );
        }, this.autoOutdent = function (e, t) {
            var n = e.getLine(t),
                i = n.match(/^(\s*\})/);if (!i) return 0;var s = i[1].length,
                o = e.findMatchingBracket({ row: t, column: s });if (!o || o.row == t) return 0;var u = this.$getIndent(e.getLine(o.row));e.replace(new r(t, 0, t, s - 1), u);
        }, this.$getIndent = function (e) {
            return e.match(/^\s*/)[0];
        };
    }).call(i.prototype), t.MatchingBraceOutdent = i;
}), define("ace/mode/folding/coffee", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode", "ace/range"], function (e, t, n) {
    "use strict";
    var r = e("../../lib/oop"),
        i = e("./fold_mode").FoldMode,
        s = e("../../range").Range,
        o = t.FoldMode = function () {};r.inherits(o, i), function () {
        this.getFoldWidgetRange = function (e, t, n) {
            var r = this.indentationBlock(e, n);if (r) return r;var i = /\S/,
                o = e.getLine(n),
                u = o.search(i);if (u == -1 || o[u] != "#") return;var a = o.length,
                f = e.getLength(),
                l = n,
                c = n;while (++n < f) {
                o = e.getLine(n);var h = o.search(i);if (h == -1) continue;if (o[h] != "#") break;c = n;
            }if (c > l) {
                var p = e.getLine(c).length;return new s(l, a, c, p);
            }
        }, this.getFoldWidget = function (e, t, n) {
            var r = e.getLine(n),
                i = r.search(/\S/),
                s = e.getLine(n + 1),
                o = e.getLine(n - 1),
                u = o.search(/\S/),
                a = s.search(/\S/);if (i == -1) return e.foldWidgets[n - 1] = u != -1 && u < a ? "start" : "", "";if (u == -1) {
                if (i == a && r[i] == "#" && s[i] == "#") return e.foldWidgets[n - 1] = "", e.foldWidgets[n + 1] = "", "start";
            } else if (u == i && r[i] == "#" && o[i] == "#" && e.getLine(n - 2).search(/\S/) == -1) return e.foldWidgets[n - 1] = "start", e.foldWidgets[n + 1] = "", "";return u != -1 && u < i ? e.foldWidgets[n - 1] = "start" : e.foldWidgets[n - 1] = "", i < a ? "start" : "";
        };
    }.call(o.prototype);
}), define("ace/mode/yaml", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/yaml_highlight_rules", "ace/mode/matching_brace_outdent", "ace/mode/folding/coffee"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("./yaml_highlight_rules").YamlHighlightRules,
        o = e("./matching_brace_outdent").MatchingBraceOutdent,
        u = e("./folding/coffee").FoldMode,
        a = function () {
        this.HighlightRules = s, this.$outdent = new o(), this.foldingRules = new u(), this.$behaviour = this.$defaultBehaviour;
    };r.inherits(a, i), function () {
        this.lineCommentStart = ["#"], this.getNextLineIndent = function (e, t, n) {
            var r = this.$getIndent(t);if (e == "start") {
                var i = t.match(/^.*[\{\(\[]\s*$/);i && (r += n);
            }return r;
        }, this.checkOutdent = function (e, t, n) {
            return this.$outdent.checkOutdent(t, n);
        }, this.autoOutdent = function (e, t, n) {
            this.$outdent.autoOutdent(t, n);
        }, this.$id = "ace/mode/yaml";
    }.call(a.prototype), t.Mode = a;
});
(function () {
    window.require(["ace/mode/yaml"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();