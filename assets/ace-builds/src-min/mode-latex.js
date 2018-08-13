/// BareSpecifier=ace-builds/src-min/mode-latex
define("ace/mode/latex_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./text_highlight_rules").TextHighlightRules,
        s = function () {
        this.$rules = { start: [{ token: "comment", regex: "%.*$" }, { token: ["keyword", "lparen", "variable.parameter", "rparen", "lparen", "storage.type", "rparen"], regex: "(\\\\(?:documentclass|usepackage|input))(?:(\\[)([^\\]]*)(\\]))?({)([^}]*)(})" }, { token: ["keyword", "lparen", "variable.parameter", "rparen"], regex: "(\\\\(?:label|v?ref|cite(?:[^{]*)))(?:({)([^}]*)(}))?" }, { token: ["storage.type", "lparen", "variable.parameter", "rparen"], regex: "(\\\\begin)({)(verbatim)(})", next: "verbatim" }, { token: ["storage.type", "lparen", "variable.parameter", "rparen"], regex: "(\\\\begin)({)(lstlisting)(})", next: "lstlisting" }, { token: ["storage.type", "lparen", "variable.parameter", "rparen"], regex: "(\\\\(?:begin|end))({)([\\w*]*)(})" }, { token: "storage.type", regex: /\\verb\b\*?/, next: [{ token: ["keyword.operator", "string", "keyword.operator"], regex: "(.)(.*?)(\\1|$)|", next: "start" }] }, { token: "storage.type", regex: "\\\\[a-zA-Z]+" }, { token: "lparen", regex: "[[({]" }, { token: "rparen", regex: "[\\])}]" }, { token: "constant.character.escape", regex: "\\\\[^a-zA-Z]?" }, { token: "string", regex: "\\${1,2}", next: "equation" }], equation: [{ token: "comment", regex: "%.*$" }, { token: "string", regex: "\\${1,2}", next: "start" }, { token: "constant.character.escape", regex: "\\\\(?:[^a-zA-Z]|[a-zA-Z]+)" }, { token: "error", regex: "^\\s*$", next: "start" }, { defaultToken: "string" }], verbatim: [{ token: ["storage.type", "lparen", "variable.parameter", "rparen"], regex: "(\\\\end)({)(verbatim)(})", next: "start" }, { defaultToken: "text" }], lstlisting: [{ token: ["storage.type", "lparen", "variable.parameter", "rparen"], regex: "(\\\\end)({)(lstlisting)(})", next: "start" }, { defaultToken: "text" }] }, this.normalizeRules();
    };r.inherits(s, i), t.LatexHighlightRules = s;
}), define("ace/mode/folding/latex", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode", "ace/range", "ace/token_iterator"], function (e, t, n) {
    "use strict";
    var r = e("../../lib/oop"),
        i = e("./fold_mode").FoldMode,
        s = e("../../range").Range,
        o = e("../../token_iterator").TokenIterator,
        u = { "\\subparagraph": 1, "\\paragraph": 2, "\\subsubsubsection": 3, "\\subsubsection": 4, "\\subsection": 5, "\\section": 6, "\\chapter": 7, "\\part": 8, "\\begin": 9, "\\end": 10 },
        a = t.FoldMode = function () {};r.inherits(a, i), function () {
        this.foldingStartMarker = /^\s*\\(begin)|\s*\\(part|chapter|(?:sub)*(?:section|paragraph))\b|{\s*$/, this.foldingStopMarker = /^\s*\\(end)\b|^\s*}/, this.getFoldWidgetRange = function (e, t, n) {
            var r = e.doc.getLine(n),
                i = this.foldingStartMarker.exec(r);if (i) return i[1] ? this.latexBlock(e, n, i[0].length - 1) : i[2] ? this.latexSection(e, n, i[0].length - 1) : this.openingBracketBlock(e, "{", n, i.index);var i = this.foldingStopMarker.exec(r);if (i) return i[1] ? this.latexBlock(e, n, i[0].length - 1) : this.closingBracketBlock(e, "}", n, i.index + i[0].length);
        }, this.latexBlock = function (e, t, n, r) {
            var i = { "\\begin": 1, "\\end": -1 },
                u = new o(e, t, n),
                a = u.getCurrentToken();if (!a || a.type != "storage.type" && a.type != "constant.character.escape") return;var f = a.value,
                l = i[f],
                c = function () {
                var e = u.stepForward(),
                    t = e.type == "lparen" ? u.stepForward().value : "";return l === -1 && (u.stepBackward(), t && u.stepBackward()), t;
            },
                h = [c()],
                p = l === -1 ? u.getCurrentTokenColumn() : e.getLine(t).length,
                d = t;u.step = l === -1 ? u.stepBackward : u.stepForward;while (a = u.step()) {
                if (!a || a.type != "storage.type" && a.type != "constant.character.escape") continue;var v = i[a.value];if (!v) continue;var m = c();if (v === l) h.unshift(m);else if (h.shift() !== m || !h.length) break;
            }if (h.length) return;l == 1 && (u.stepBackward(), u.stepBackward());if (r) return u.getCurrentTokenRange();var t = u.getCurrentTokenRow();return l === -1 ? new s(t, e.getLine(t).length, d, p) : new s(d, p, t, u.getCurrentTokenColumn());
        }, this.latexSection = function (e, t, n) {
            var r = new o(e, t, n),
                i = r.getCurrentToken();if (!i || i.type != "storage.type") return;var a = u[i.value] || 0,
                f = 0,
                l = t;while (i = r.stepForward()) {
                if (i.type !== "storage.type") continue;var c = u[i.value] || 0;if (c >= 9) {
                    f || (l = r.getCurrentTokenRow() - 1), f += c == 9 ? 1 : -1;if (f < 0) break;
                } else if (c >= a) break;
            }f || (l = r.getCurrentTokenRow() - 1);while (l > t && !/\S/.test(e.getLine(l))) l--;return new s(t, e.getLine(t).length, l, e.getLine(l).length);
        };
    }.call(a.prototype);
}), define("ace/mode/latex", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/latex_highlight_rules", "ace/mode/behaviour/cstyle", "ace/mode/folding/latex"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("./latex_highlight_rules").LatexHighlightRules,
        o = e("./behaviour/cstyle").CstyleBehaviour,
        u = e("./folding/latex").FoldMode,
        a = function () {
        this.HighlightRules = s, this.foldingRules = new u(), this.$behaviour = new o({ braces: !0 });
    };r.inherits(a, i), function () {
        this.type = "text", this.lineCommentStart = "%", this.$id = "ace/mode/latex", this.getMatching = function (e, t, n) {
            t == undefined && (t = e.selection.lead), typeof t == "object" && (n = t.column, t = t.row);var r = e.getTokenAt(t, n);if (!r) return;if (r.value == "\\begin" || r.value == "\\end") return this.foldingRules.latexBlock(e, t, n, !0);
        };
    }.call(a.prototype), t.Mode = a;
});
(function () {
    window.require(["ace/mode/latex"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();