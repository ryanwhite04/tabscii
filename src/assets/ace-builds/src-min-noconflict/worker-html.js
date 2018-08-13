/// BareSpecifier=ace-builds/src-min-noconflict/worker-html
import { process } from '../../process.js';
"no use strict";!function (e) {
  function t(e, t) {
    var n = e,
        r = "";while (n) {
      var i = t[n];if (typeof i == "string") return i + r;if (i) return i.location.replace(/\/*$/, "/") + (r || i.main || i.name);if (i === !1) return "";var s = n.lastIndexOf("/");if (s === -1) break;r = n.substr(s) + r, n = n.slice(0, s);
    }return e;
  }if (typeof e.window != "undefined" && e.document) return;if (e.require && e.define) return;e.console || (e.console = function () {
    var e = Array.prototype.slice.call(arguments, 0);postMessage({ type: "log", data: e });
  }, e.console.error = e.console.warn = e.console.log = e.console.trace = e.console), e.window = e, e.ace = e, e.onerror = function (e, t, n, r, i) {
    postMessage({ type: "error", data: { message: e, data: i.data, file: t, line: n, col: r, stack: i.stack } });
  }, e.normalizeModule = function (t, n) {
    if (n.indexOf("!") !== -1) {
      var r = n.split("!");return e.normalizeModule(t, r[0]) + "!" + e.normalizeModule(t, r[1]);
    }if (n.charAt(0) == ".") {
      var i = t.split("/").slice(0, -1).join("/");n = (i ? i + "/" : "") + n;while (n.indexOf(".") !== -1 && s != n) {
        var s = n;n = n.replace(/^\.\//, "").replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
      }
    }return n;
  }, e.require = function (r, i) {
    i || (i = r, r = null);if (!i.charAt) throw new Error("worker.js require() accepts only (parentId, id) as arguments");i = e.normalizeModule(r, i);var s = e.require.modules[i];if (s) return s.initialized || (s.initialized = !0, s.exports = s.factory().exports), s.exports;if (!e.require.tlns) return console.log("unable to load " + i);var o = t(i, e.require.tlns);return o.slice(-3) != ".js" && (o += ".js"), e.require.id = i, e.require.modules[i] = {}, importScripts(o), e.require(r, i);
  }, e.require.modules = {}, e.require.tlns = {}, e.define = function (t, n, r) {
    arguments.length == 2 ? (r = n, typeof t != "string" && (n = t, t = e.require.id)) : arguments.length == 1 && (r = t, n = [], t = e.require.id);if (typeof r != "function") {
      e.require.modules[t] = { exports: r, initialized: !0 };return;
    }n.length || (n = ["require", "exports", "module"]);var i = function (n) {
      return e.require(t, n);
    };e.require.modules[t] = { exports: {}, factory: function () {
        var e = this,
            t = r.apply(this, n.slice(0, r.length).map(function (t) {
          switch (t) {case "require":
              return i;case "exports":
              return e.exports;case "module":
              return e;default:
              return i(t);}
        }));return t && (e.exports = t), e;
      } };
  }, e.define.amd = {}, require.tlns = {}, e.initBaseUrls = function (t) {
    for (var n in t) require.tlns[n] = t[n];
  }, e.initSender = function () {
    var n = e.require("ace/lib/event_emitter").EventEmitter,
        r = e.require("ace/lib/oop"),
        i = function () {};return function () {
      r.implement(this, n), this.callback = function (e, t) {
        postMessage({ type: "call", id: t, data: e });
      }, this.emit = function (e, t) {
        postMessage({ type: "event", name: e, data: t });
      };
    }.call(i.prototype), new i();
  };var n = e.main = null,
      r = e.sender = null;e.onmessage = function (t) {
    var i = t.data;if (i.event && r) r._signal(i.event, i.data);else if (i.command) {
      if (n[i.command]) n[i.command].apply(n, i.args);else {
        if (!e[i.command]) throw new Error("Unknown command:" + i.command);e[i.command].apply(e, i.args);
      }
    } else if (i.init) {
      e.initBaseUrls(i.tlns), require("ace/lib/es5-shim"), r = e.sender = e.initSender();var s = require(i.module)[i.classname];n = e.main = new s(r);
    }
  };
}(this), ace.define("ace/lib/oop", [], function (e, t, n) {
  "use strict";
  t.inherits = function (e, t) {
    e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } });
  }, t.mixin = function (e, t) {
    for (var n in t) e[n] = t[n];return e;
  }, t.implement = function (e, n) {
    t.mixin(e, n);
  };
}), ace.define("ace/lib/lang", [], function (e, t, n) {
  "use strict";
  t.last = function (e) {
    return e[e.length - 1];
  }, t.stringReverse = function (e) {
    return e.split("").reverse().join("");
  }, t.stringRepeat = function (e, t) {
    var n = "";while (t > 0) {
      t & 1 && (n += e);if (t >>= 1) e += e;
    }return n;
  };var r = /^\s\s*/,
      i = /\s\s*$/;t.stringTrimLeft = function (e) {
    return e.replace(r, "");
  }, t.stringTrimRight = function (e) {
    return e.replace(i, "");
  }, t.copyObject = function (e) {
    var t = {};for (var n in e) t[n] = e[n];return t;
  }, t.copyArray = function (e) {
    var t = [];for (var n = 0, r = e.length; n < r; n++) e[n] && typeof e[n] == "object" ? t[n] = this.copyObject(e[n]) : t[n] = e[n];return t;
  }, t.deepCopy = function s(e) {
    if (typeof e != "object" || !e) return e;var t;if (Array.isArray(e)) {
      t = [];for (var n = 0; n < e.length; n++) t[n] = s(e[n]);return t;
    }if (Object.prototype.toString.call(e) !== "[object Object]") return e;t = {};for (var n in e) t[n] = s(e[n]);return t;
  }, t.arrayToMap = function (e) {
    var t = {};for (var n = 0; n < e.length; n++) t[e[n]] = 1;return t;
  }, t.createMap = function (e) {
    var t = Object.create(null);for (var n in e) t[n] = e[n];return t;
  }, t.arrayRemove = function (e, t) {
    for (var n = 0; n <= e.length; n++) t === e[n] && e.splice(n, 1);
  }, t.escapeRegExp = function (e) {
    return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
  }, t.escapeHTML = function (e) {
    return ("" + e).replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;");
  }, t.getMatchOffsets = function (e, t) {
    var n = [];return e.replace(t, function (e) {
      n.push({ offset: arguments[arguments.length - 2], length: e.length });
    }), n;
  }, t.deferredCall = function (e) {
    var t = null,
        n = function () {
      t = null, e();
    },
        r = function (e) {
      return r.cancel(), t = setTimeout(n, e || 0), r;
    };return r.schedule = r, r.call = function () {
      return this.cancel(), e(), r;
    }, r.cancel = function () {
      return clearTimeout(t), t = null, r;
    }, r.isPending = function () {
      return t;
    }, r;
  }, t.delayedCall = function (e, t) {
    var n = null,
        r = function () {
      n = null, e();
    },
        i = function (e) {
      n == null && (n = setTimeout(r, e || t));
    };return i.delay = function (e) {
      n && clearTimeout(n), n = setTimeout(r, e || t);
    }, i.schedule = i, i.call = function () {
      this.cancel(), e();
    }, i.cancel = function () {
      n && clearTimeout(n), n = null;
    }, i.isPending = function () {
      return n;
    }, i;
  };
}), ace.define("ace/range", [], function (e, t, n) {
  "use strict";
  var r = function (e, t) {
    return e.row - t.row || e.column - t.column;
  },
      i = function (e, t, n, r) {
    this.start = { row: e, column: t }, this.end = { row: n, column: r };
  };(function () {
    this.isEqual = function (e) {
      return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column;
    }, this.toString = function () {
      return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]";
    }, this.contains = function (e, t) {
      return this.compare(e, t) == 0;
    }, this.compareRange = function (e) {
      var t,
          n = e.end,
          r = e.start;return t = this.compare(n.row, n.column), t == 1 ? (t = this.compare(r.row, r.column), t == 1 ? 2 : t == 0 ? 1 : 0) : t == -1 ? -2 : (t = this.compare(r.row, r.column), t == -1 ? -1 : t == 1 ? 42 : 0);
    }, this.comparePoint = function (e) {
      return this.compare(e.row, e.column);
    }, this.containsRange = function (e) {
      return this.comparePoint(e.start) == 0 && this.comparePoint(e.end) == 0;
    }, this.intersects = function (e) {
      var t = this.compareRange(e);return t == -1 || t == 0 || t == 1;
    }, this.isEnd = function (e, t) {
      return this.end.row == e && this.end.column == t;
    }, this.isStart = function (e, t) {
      return this.start.row == e && this.start.column == t;
    }, this.setStart = function (e, t) {
      typeof e == "object" ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = t);
    }, this.setEnd = function (e, t) {
      typeof e == "object" ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = t);
    }, this.inside = function (e, t) {
      return this.compare(e, t) == 0 ? this.isEnd(e, t) || this.isStart(e, t) ? !1 : !0 : !1;
    }, this.insideStart = function (e, t) {
      return this.compare(e, t) == 0 ? this.isEnd(e, t) ? !1 : !0 : !1;
    }, this.insideEnd = function (e, t) {
      return this.compare(e, t) == 0 ? this.isStart(e, t) ? !1 : !0 : !1;
    }, this.compare = function (e, t) {
      return !this.isMultiLine() && e === this.start.row ? t < this.start.column ? -1 : t > this.end.column ? 1 : 0 : e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? t >= this.start.column ? 0 : -1 : this.end.row === e ? t <= this.end.column ? 0 : 1 : 0;
    }, this.compareStart = function (e, t) {
      return this.start.row == e && this.start.column == t ? -1 : this.compare(e, t);
    }, this.compareEnd = function (e, t) {
      return this.end.row == e && this.end.column == t ? 1 : this.compare(e, t);
    }, this.compareInside = function (e, t) {
      return this.end.row == e && this.end.column == t ? 1 : this.start.row == e && this.start.column == t ? -1 : this.compare(e, t);
    }, this.clipRows = function (e, t) {
      if (this.end.row > t) var n = { row: t + 1, column: 0 };else if (this.end.row < e) var n = { row: e, column: 0 };if (this.start.row > t) var r = { row: t + 1, column: 0 };else if (this.start.row < e) var r = { row: e, column: 0 };return i.fromPoints(r || this.start, n || this.end);
    }, this.extend = function (e, t) {
      var n = this.compare(e, t);if (n == 0) return this;if (n == -1) var r = { row: e, column: t };else var s = { row: e, column: t };return i.fromPoints(r || this.start, s || this.end);
    }, this.isEmpty = function () {
      return this.start.row === this.end.row && this.start.column === this.end.column;
    }, this.isMultiLine = function () {
      return this.start.row !== this.end.row;
    }, this.clone = function () {
      return i.fromPoints(this.start, this.end);
    }, this.collapseRows = function () {
      return this.end.column == 0 ? new i(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new i(this.start.row, 0, this.end.row, 0);
    }, this.toScreenRange = function (e) {
      var t = e.documentToScreenPosition(this.start),
          n = e.documentToScreenPosition(this.end);return new i(t.row, t.column, n.row, n.column);
    }, this.moveBy = function (e, t) {
      this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t;
    };
  }).call(i.prototype), i.fromPoints = function (e, t) {
    return new i(e.row, e.column, t.row, t.column);
  }, i.comparePoints = r, i.comparePoints = function (e, t) {
    return e.row - t.row || e.column - t.column;
  }, t.Range = i;
}), ace.define("ace/apply_delta", [], function (e, t, n) {
  "use strict";
  function r(e, t) {
    throw console.log("Invalid Delta:", e), "Invalid Delta: " + t;
  }function i(e, t) {
    return t.row >= 0 && t.row < e.length && t.column >= 0 && t.column <= e[t.row].length;
  }function s(e, t) {
    t.action != "insert" && t.action != "remove" && r(t, "delta.action must be 'insert' or 'remove'"), t.lines instanceof Array || r(t, "delta.lines must be an Array"), (!t.start || !t.end) && r(t, "delta.start/end must be an present");var n = t.start;i(e, t.start) || r(t, "delta.start must be contained in document");var s = t.end;t.action == "remove" && !i(e, s) && r(t, "delta.end must contained in document for 'remove' actions");var o = s.row - n.row,
        u = s.column - (o == 0 ? n.column : 0);(o != t.lines.length - 1 || t.lines[o].length != u) && r(t, "delta.range must match delta lines");
  }t.applyDelta = function (e, t, n) {
    var r = t.start.row,
        i = t.start.column,
        s = e[r] || "";switch (t.action) {case "insert":
        var o = t.lines;if (o.length === 1) e[r] = s.substring(0, i) + t.lines[0] + s.substring(i);else {
          var u = [r, 1].concat(t.lines);e.splice.apply(e, u), e[r] = s.substring(0, i) + e[r], e[r + t.lines.length - 1] += s.substring(i);
        }break;case "remove":
        var a = t.end.column,
            f = t.end.row;r === f ? e[r] = s.substring(0, i) + s.substring(a) : e.splice(r, f - r + 1, s.substring(0, i) + e[f].substring(a));}
  };
}), ace.define("ace/lib/event_emitter", [], function (e, t, n) {
  "use strict";
  var r = {},
      i = function () {
    this.propagationStopped = !0;
  },
      s = function () {
    this.defaultPrevented = !0;
  };r._emit = r._dispatchEvent = function (e, t) {
    this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});var n = this._eventRegistry[e] || [],
        r = this._defaultHandlers[e];if (!n.length && !r) return;if (typeof t != "object" || !t) t = {};t.type || (t.type = e), t.stopPropagation || (t.stopPropagation = i), t.preventDefault || (t.preventDefault = s), n = n.slice();for (var o = 0; o < n.length; o++) {
      n[o](t, this);if (t.propagationStopped) break;
    }if (r && !t.defaultPrevented) return r(t, this);
  }, r._signal = function (e, t) {
    var n = (this._eventRegistry || {})[e];if (!n) return;n = n.slice();for (var r = 0; r < n.length; r++) n[r](t, this);
  }, r.once = function (e, t) {
    var n = this;t && this.addEventListener(e, function r() {
      n.removeEventListener(e, r), t.apply(null, arguments);
    });
  }, r.setDefaultHandler = function (e, t) {
    var n = this._defaultHandlers;n || (n = this._defaultHandlers = { _disabled_: {} });if (n[e]) {
      var r = n[e],
          i = n._disabled_[e];i || (n._disabled_[e] = i = []), i.push(r);var s = i.indexOf(t);s != -1 && i.splice(s, 1);
    }n[e] = t;
  }, r.removeDefaultHandler = function (e, t) {
    var n = this._defaultHandlers;if (!n) return;var r = n._disabled_[e];if (n[e] == t) r && this.setDefaultHandler(e, r.pop());else if (r) {
      var i = r.indexOf(t);i != -1 && r.splice(i, 1);
    }
  }, r.on = r.addEventListener = function (e, t, n) {
    this._eventRegistry = this._eventRegistry || {};var r = this._eventRegistry[e];return r || (r = this._eventRegistry[e] = []), r.indexOf(t) == -1 && r[n ? "unshift" : "push"](t), t;
  }, r.off = r.removeListener = r.removeEventListener = function (e, t) {
    this._eventRegistry = this._eventRegistry || {};var n = this._eventRegistry[e];if (!n) return;var r = n.indexOf(t);r !== -1 && n.splice(r, 1);
  }, r.removeAllListeners = function (e) {
    this._eventRegistry && (this._eventRegistry[e] = []);
  }, t.EventEmitter = r;
}), ace.define("ace/anchor", [], function (e, t, n) {
  "use strict";
  var r = e("./lib/oop"),
      i = e("./lib/event_emitter").EventEmitter,
      s = t.Anchor = function (e, t, n) {
    this.$onChange = this.onChange.bind(this), this.attach(e), typeof n == "undefined" ? this.setPosition(t.row, t.column) : this.setPosition(t, n);
  };(function () {
    function e(e, t, n) {
      var r = n ? e.column <= t.column : e.column < t.column;return e.row < t.row || e.row == t.row && r;
    }function t(t, n, r) {
      var i = t.action == "insert",
          s = (i ? 1 : -1) * (t.end.row - t.start.row),
          o = (i ? 1 : -1) * (t.end.column - t.start.column),
          u = t.start,
          a = i ? u : t.end;return e(n, u, r) ? { row: n.row, column: n.column } : e(a, n, !r) ? { row: n.row + s, column: n.column + (n.row == a.row ? o : 0) } : { row: u.row, column: u.column };
    }r.implement(this, i), this.getPosition = function () {
      return this.$clipPositionToDocument(this.row, this.column);
    }, this.getDocument = function () {
      return this.document;
    }, this.$insertRight = !1, this.onChange = function (e) {
      if (e.start.row == e.end.row && e.start.row != this.row) return;if (e.start.row > this.row) return;var n = t(e, { row: this.row, column: this.column }, this.$insertRight);this.setPosition(n.row, n.column, !0);
    }, this.setPosition = function (e, t, n) {
      var r;n ? r = { row: e, column: t } : r = this.$clipPositionToDocument(e, t);if (this.row == r.row && this.column == r.column) return;var i = { row: this.row, column: this.column };this.row = r.row, this.column = r.column, this._signal("change", { old: i, value: r });
    }, this.detach = function () {
      this.document.removeEventListener("change", this.$onChange);
    }, this.attach = function (e) {
      this.document = e || this.document, this.document.on("change", this.$onChange);
    }, this.$clipPositionToDocument = function (e, t) {
      var n = {};return e >= this.document.getLength() ? (n.row = Math.max(0, this.document.getLength() - 1), n.column = this.document.getLine(n.row).length) : e < 0 ? (n.row = 0, n.column = 0) : (n.row = e, n.column = Math.min(this.document.getLine(n.row).length, Math.max(0, t))), t < 0 && (n.column = 0), n;
    };
  }).call(s.prototype);
}), ace.define("ace/document", [], function (e, t, n) {
  "use strict";
  var r = e("./lib/oop"),
      i = e("./apply_delta").applyDelta,
      s = e("./lib/event_emitter").EventEmitter,
      o = e("./range").Range,
      u = e("./anchor").Anchor,
      a = function (e) {
    this.$lines = [""], e.length === 0 ? this.$lines = [""] : Array.isArray(e) ? this.insertMergedLines({ row: 0, column: 0 }, e) : this.insert({ row: 0, column: 0 }, e);
  };(function () {
    r.implement(this, s), this.setValue = function (e) {
      var t = this.getLength() - 1;this.remove(new o(0, 0, t, this.getLine(t).length)), this.insert({ row: 0, column: 0 }, e);
    }, this.getValue = function () {
      return this.getAllLines().join(this.getNewLineCharacter());
    }, this.createAnchor = function (e, t) {
      return new u(this, e, t);
    }, "aaa".split(/a/).length === 0 ? this.$split = function (e) {
      return e.replace(/\r\n|\r/g, "\n").split("\n");
    } : this.$split = function (e) {
      return e.split(/\r\n|\r|\n/);
    }, this.$detectNewLine = function (e) {
      var t = e.match(/^.*?(\r\n|\r|\n)/m);this.$autoNewLine = t ? t[1] : "\n", this._signal("changeNewLineMode");
    }, this.getNewLineCharacter = function () {
      switch (this.$newLineMode) {case "windows":
          return "\r\n";case "unix":
          return "\n";default:
          return this.$autoNewLine || "\n";}
    }, this.$autoNewLine = "", this.$newLineMode = "auto", this.setNewLineMode = function (e) {
      if (this.$newLineMode === e) return;this.$newLineMode = e, this._signal("changeNewLineMode");
    }, this.getNewLineMode = function () {
      return this.$newLineMode;
    }, this.isNewLine = function (e) {
      return e == "\r\n" || e == "\r" || e == "\n";
    }, this.getLine = function (e) {
      return this.$lines[e] || "";
    }, this.getLines = function (e, t) {
      return this.$lines.slice(e, t + 1);
    }, this.getAllLines = function () {
      return this.getLines(0, this.getLength());
    }, this.getLength = function () {
      return this.$lines.length;
    }, this.getTextRange = function (e) {
      return this.getLinesForRange(e).join(this.getNewLineCharacter());
    }, this.getLinesForRange = function (e) {
      var t;if (e.start.row === e.end.row) t = [this.getLine(e.start.row).substring(e.start.column, e.end.column)];else {
        t = this.getLines(e.start.row, e.end.row), t[0] = (t[0] || "").substring(e.start.column);var n = t.length - 1;e.end.row - e.start.row == n && (t[n] = t[n].substring(0, e.end.column));
      }return t;
    }, this.insertLines = function (e, t) {
      return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."), this.insertFullLines(e, t);
    }, this.removeLines = function (e, t) {
      return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."), this.removeFullLines(e, t);
    }, this.insertNewLine = function (e) {
      return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."), this.insertMergedLines(e, ["", ""]);
    }, this.insert = function (e, t) {
      return this.getLength() <= 1 && this.$detectNewLine(t), this.insertMergedLines(e, this.$split(t));
    }, this.insertInLine = function (e, t) {
      var n = this.clippedPos(e.row, e.column),
          r = this.pos(e.row, e.column + t.length);return this.applyDelta({ start: n, end: r, action: "insert", lines: [t] }, !0), this.clonePos(r);
    }, this.clippedPos = function (e, t) {
      var n = this.getLength();e === undefined ? e = n : e < 0 ? e = 0 : e >= n && (e = n - 1, t = undefined);var r = this.getLine(e);return t == undefined && (t = r.length), t = Math.min(Math.max(t, 0), r.length), { row: e, column: t };
    }, this.clonePos = function (e) {
      return { row: e.row, column: e.column };
    }, this.pos = function (e, t) {
      return { row: e, column: t };
    }, this.$clipPosition = function (e) {
      var t = this.getLength();return e.row >= t ? (e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length) : (e.row = Math.max(0, e.row), e.column = Math.min(Math.max(e.column, 0), this.getLine(e.row).length)), e;
    }, this.insertFullLines = function (e, t) {
      e = Math.min(Math.max(e, 0), this.getLength());var n = 0;e < this.getLength() ? (t = t.concat([""]), n = 0) : (t = [""].concat(t), e--, n = this.$lines[e].length), this.insertMergedLines({ row: e, column: n }, t);
    }, this.insertMergedLines = function (e, t) {
      var n = this.clippedPos(e.row, e.column),
          r = { row: n.row + t.length - 1, column: (t.length == 1 ? n.column : 0) + t[t.length - 1].length };return this.applyDelta({ start: n, end: r, action: "insert", lines: t }), this.clonePos(r);
    }, this.remove = function (e) {
      var t = this.clippedPos(e.start.row, e.start.column),
          n = this.clippedPos(e.end.row, e.end.column);return this.applyDelta({ start: t, end: n, action: "remove", lines: this.getLinesForRange({ start: t, end: n }) }), this.clonePos(t);
    }, this.removeInLine = function (e, t, n) {
      var r = this.clippedPos(e, t),
          i = this.clippedPos(e, n);return this.applyDelta({ start: r, end: i, action: "remove", lines: this.getLinesForRange({ start: r, end: i }) }, !0), this.clonePos(r);
    }, this.removeFullLines = function (e, t) {
      e = Math.min(Math.max(0, e), this.getLength() - 1), t = Math.min(Math.max(0, t), this.getLength() - 1);var n = t == this.getLength() - 1 && e > 0,
          r = t < this.getLength() - 1,
          i = n ? e - 1 : e,
          s = n ? this.getLine(i).length : 0,
          u = r ? t + 1 : t,
          a = r ? 0 : this.getLine(u).length,
          f = new o(i, s, u, a),
          l = this.$lines.slice(e, t + 1);return this.applyDelta({ start: f.start, end: f.end, action: "remove", lines: this.getLinesForRange(f) }), l;
    }, this.removeNewLine = function (e) {
      e < this.getLength() - 1 && e >= 0 && this.applyDelta({ start: this.pos(e, this.getLine(e).length), end: this.pos(e + 1, 0), action: "remove", lines: ["", ""] });
    }, this.replace = function (e, t) {
      e instanceof o || (e = o.fromPoints(e.start, e.end));if (t.length === 0 && e.isEmpty()) return e.start;if (t == this.getTextRange(e)) return e.end;this.remove(e);var n;return t ? n = this.insert(e.start, t) : n = e.start, n;
    }, this.applyDeltas = function (e) {
      for (var t = 0; t < e.length; t++) this.applyDelta(e[t]);
    }, this.revertDeltas = function (e) {
      for (var t = e.length - 1; t >= 0; t--) this.revertDelta(e[t]);
    }, this.applyDelta = function (e, t) {
      var n = e.action == "insert";if (n ? e.lines.length <= 1 && !e.lines[0] : !o.comparePoints(e.start, e.end)) return;n && e.lines.length > 2e4 ? this.$splitAndapplyLargeDelta(e, 2e4) : (i(this.$lines, e, t), this._signal("change", e));
    }, this.$splitAndapplyLargeDelta = function (e, t) {
      var n = e.lines,
          r = n.length - t + 1,
          i = e.start.row,
          s = e.start.column;for (var o = 0, u = 0; o < r; o = u) {
        u += t - 1;var a = n.slice(o, u);a.push(""), this.applyDelta({ start: this.pos(i + o, s), end: this.pos(i + u, s = 0), action: e.action, lines: a }, !0);
      }e.lines = n.slice(o), e.start.row = i + o, e.start.column = s, this.applyDelta(e, !0);
    }, this.revertDelta = function (e) {
      this.applyDelta({ start: this.clonePos(e.start), end: this.clonePos(e.end), action: e.action == "insert" ? "remove" : "insert", lines: e.lines.slice() });
    }, this.indexToPosition = function (e, t) {
      var n = this.$lines || this.getAllLines(),
          r = this.getNewLineCharacter().length;for (var i = t || 0, s = n.length; i < s; i++) {
        e -= n[i].length + r;if (e < 0) return { row: i, column: e + n[i].length + r };
      }return { row: s - 1, column: e + n[s - 1].length + r };
    }, this.positionToIndex = function (e, t) {
      var n = this.$lines || this.getAllLines(),
          r = this.getNewLineCharacter().length,
          i = 0,
          s = Math.min(e.row, n.length);for (var o = t || 0; o < s; ++o) i += n[o].length + r;return i + e.column;
    };
  }).call(a.prototype), t.Document = a;
}), ace.define("ace/worker/mirror", [], function (e, t, n) {
  "use strict";
  var r = e("../range").Range,
      i = e("../document").Document,
      s = e("../lib/lang"),
      o = t.Mirror = function (e) {
    this.sender = e;var t = this.doc = new i(""),
        n = this.deferredUpdate = s.delayedCall(this.onUpdate.bind(this)),
        r = this;e.on("change", function (e) {
      var i = e.data;if (i[0].start) t.applyDeltas(i);else for (var s = 0; s < i.length; s += 2) {
        if (Array.isArray(i[s + 1])) var o = { action: "insert", start: i[s], lines: i[s + 1] };else var o = { action: "remove", start: i[s], end: i[s + 1] };t.applyDelta(o, !0);
      }if (r.$timeout) return n.schedule(r.$timeout);r.onUpdate();
    });
  };(function () {
    this.$timeout = 500, this.setTimeout = function (e) {
      this.$timeout = e;
    }, this.setValue = function (e) {
      this.doc.setValue(e), this.deferredUpdate.schedule(this.$timeout);
    }, this.getValue = function (e) {
      this.sender.callback(this.doc.getValue(), e);
    }, this.onUpdate = function () {}, this.isPending = function () {
      return this.deferredUpdate.isPending();
    };
  }).call(o.prototype);
}), ace.define("ace/mode/html/saxparser", [], function (e, t, n) {
  n.exports = function r(t, n, i) {
    function s(u, a) {
      if (!n[u]) {
        if (!t[u]) {
          var f = typeof e == "function" && e;if (!a && f) return f(u, !0);if (o) return o(u, !0);throw new Error("Cannot find module '" + u + "'");
        }var l = n[u] = { exports: {} };t[u][0].call(l.exports, function (e) {
          var n = t[u][1][e];return s(n ? n : e);
        }, l, l.exports, r, t, n, i);
      }return n[u].exports;
    }var o = typeof e == "function" && e;for (var u = 0; u < i.length; u++) s(i[u]);return s;
  }({ 1: [function (e, t, n) {
      function r(e) {
        if (e.namespaceURI === "http://www.w3.org/1999/xhtml") return e.localName === "applet" || e.localName === "caption" || e.localName === "marquee" || e.localName === "object" || e.localName === "table" || e.localName === "td" || e.localName === "th";if (e.namespaceURI === "http://www.w3.org/1998/Math/MathML") return e.localName === "mi" || e.localName === "mo" || e.localName === "mn" || e.localName === "ms" || e.localName === "mtext" || e.localName === "annotation-xml";if (e.namespaceURI === "http://www.w3.org/2000/svg") return e.localName === "foreignObject" || e.localName === "desc" || e.localName === "title";
      }function i(e) {
        return r(e) || e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "ol" || e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "ul";
      }function s(e) {
        return e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "table" || e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "html";
      }function o(e) {
        return e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "tbody" || e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "tfoot" || e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "thead" || e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "html";
      }function u(e) {
        return e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "tr" || e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "html";
      }function a(e) {
        return r(e) || e.namespaceURI === "http://www.w3.org/1999/xhtml" && e.localName === "button";
      }function f(e) {
        return (e.namespaceURI !== "http://www.w3.org/1999/xhtml" || e.localName !== "optgroup") && (e.namespaceURI !== "http://www.w3.org/1999/xhtml" || e.localName !== "option");
      }function l() {
        this.elements = [], this.rootNode = null, this.headElement = null, this.bodyElement = null;
      }l.prototype._inScope = function (e, t) {
        for (var n = this.elements.length - 1; n >= 0; n--) {
          var r = this.elements[n];if (r.localName === e) return !0;if (t(r)) return !1;
        }
      }, l.prototype.push = function (e) {
        this.elements.push(e);
      }, l.prototype.pushHtmlElement = function (e) {
        this.rootNode = e.node, this.push(e);
      }, l.prototype.pushHeadElement = function (e) {
        this.headElement = e.node, this.push(e);
      }, l.prototype.pushBodyElement = function (e) {
        this.bodyElement = e.node, this.push(e);
      }, l.prototype.pop = function () {
        return this.elements.pop();
      }, l.prototype.remove = function (e) {
        this.elements.splice(this.elements.indexOf(e), 1);
      }, l.prototype.popUntilPopped = function (e) {
        var t;do t = this.pop(); while (t.localName != e);
      }, l.prototype.popUntilTableScopeMarker = function () {
        while (!s(this.top)) this.pop();
      }, l.prototype.popUntilTableBodyScopeMarker = function () {
        while (!o(this.top)) this.pop();
      }, l.prototype.popUntilTableRowScopeMarker = function () {
        while (!u(this.top)) this.pop();
      }, l.prototype.item = function (e) {
        return this.elements[e];
      }, l.prototype.contains = function (e) {
        return this.elements.indexOf(e) !== -1;
      }, l.prototype.inScope = function (e) {
        return this._inScope(e, r);
      }, l.prototype.inListItemScope = function (e) {
        return this._inScope(e, i);
      }, l.prototype.inTableScope = function (e) {
        return this._inScope(e, s);
      }, l.prototype.inButtonScope = function (e) {
        return this._inScope(e, a);
      }, l.prototype.inSelectScope = function (e) {
        return this._inScope(e, f);
      }, l.prototype.hasNumberedHeaderElementInScope = function () {
        for (var e = this.elements.length - 1; e >= 0; e--) {
          var t = this.elements[e];if (t.isNumberedHeader()) return !0;if (r(t)) return !1;
        }
      }, l.prototype.furthestBlockForFormattingElement = function (e) {
        var t = null;for (var n = this.elements.length - 1; n >= 0; n--) {
          var r = this.elements[n];if (r.node === e) break;r.isSpecial() && (t = r);
        }return t;
      }, l.prototype.findIndex = function (e) {
        for (var t = this.elements.length - 1; t >= 0; t--) if (this.elements[t].localName == e) return t;return -1;
      }, l.prototype.remove_openElements_until = function (e) {
        var t = !1,
            n;while (!t) n = this.elements.pop(), t = e(n);return n;
      }, Object.defineProperty(l.prototype, "top", { get: function () {
          return this.elements[this.elements.length - 1];
        } }), Object.defineProperty(l.prototype, "length", { get: function () {
          return this.elements.length;
        } }), n.ElementStack = l;
    }, {}], 2: [function (e, t, n) {
      function o(e) {
        return e >= "0" && e <= "9" || e >= "a" && e <= "z" || e >= "A" && e <= "Z";
      }function u(e) {
        return e >= "0" && e <= "9" || e >= "a" && e <= "f" || e >= "A" && e <= "F";
      }function a(e) {
        return e >= "0" && e <= "9";
      }var r = e("html5-entities"),
          i = e("./InputStream").InputStream,
          s = {};Object.keys(r).forEach(function (e) {
        for (var t = 0; t < e.length; t++) s[e.substring(0, t + 1)] = !0;
      });var f = {};f.consumeEntity = function (e, t, n) {
        var f = "",
            l = "",
            c = e.char();if (c === i.EOF) return !1;l += c;if (c == "	" || c == "\n" || c == "\x0b" || c == " " || c == "<" || c == "&") return e.unget(l), !1;if (n === c) return e.unget(l), !1;if (c == "#") {
          c = e.shift(1);if (c === i.EOF) return t._parseError("expected-numeric-entity-but-got-eof"), e.unget(l), !1;l += c;var h = 10,
              p = a;if (c == "x" || c == "X") {
            h = 16, p = u, c = e.shift(1);if (c === i.EOF) return t._parseError("expected-numeric-entity-but-got-eof"), e.unget(l), !1;l += c;
          }if (p(c)) {
            var d = "";while (c !== i.EOF && p(c)) d += c, c = e.char();d = parseInt(d, h);var v = this.replaceEntityNumbers(d);v && (t._parseError("invalid-numeric-entity-replaced"), d = v);if (d > 65535 && d <= 1114111) {
              d -= 65536;var m = ((1047552 & d) >> 10) + 55296,
                  g = (1023 & d) + 56320;f = String.fromCharCode(m, g);
            } else f = String.fromCharCode(d);return c !== ";" && (t._parseError("numeric-entity-without-semicolon"), e.unget(c)), f;
          }return e.unget(l), t._parseError("expected-numeric-entity"), !1;
        }if (c >= "a" && c <= "z" || c >= "A" && c <= "Z") {
          var y = "";while (s[l]) {
            r[l] && (y = l);if (c == ";") break;c = e.char();if (c === i.EOF) break;l += c;
          }return y ? (f = r[y], c === ";" || !n || !o(c) && c !== "=" ? (l.length > y.length && e.unget(l.substring(y.length)), c !== ";" && t._parseError("named-entity-without-semicolon"), f) : (e.unget(l), !1)) : (t._parseError("expected-named-entity"), e.unget(l), !1);
        }
      }, f.replaceEntityNumbers = function (e) {
        switch (e) {case 0:
            return 65533;case 19:
            return 16;case 128:
            return 8364;case 129:
            return 129;case 130:
            return 8218;case 131:
            return 402;case 132:
            return 8222;case 133:
            return 8230;case 134:
            return 8224;case 135:
            return 8225;case 136:
            return 710;case 137:
            return 8240;case 138:
            return 352;case 139:
            return 8249;case 140:
            return 338;case 141:
            return 141;case 142:
            return 381;case 143:
            return 143;case 144:
            return 144;case 145:
            return 8216;case 146:
            return 8217;case 147:
            return 8220;case 148:
            return 8221;case 149:
            return 8226;case 150:
            return 8211;case 151:
            return 8212;case 152:
            return 732;case 153:
            return 8482;case 154:
            return 353;case 155:
            return 8250;case 156:
            return 339;case 157:
            return 157;case 158:
            return 382;case 159:
            return 376;default:
            if (e >= 55296 && e <= 57343 || e > 1114111) return 65533;if (e >= 1 && e <= 8 || e >= 14 && e <= 31 || e >= 127 && e <= 159 || e >= 64976 && e <= 65007 || e == 11 || e == 65534 || e == 131070 || e == 3145726 || e == 196607 || e == 262142 || e == 262143 || e == 327678 || e == 327679 || e == 393214 || e == 393215 || e == 458750 || e == 458751 || e == 524286 || e == 524287 || e == 589822 || e == 589823 || e == 655358 || e == 655359 || e == 720894 || e == 720895 || e == 786430 || e == 786431 || e == 851966 || e == 851967 || e == 917502 || e == 917503 || e == 983038 || e == 983039 || e == 1048574 || e == 1048575 || e == 1114110 || e == 1114111) return e;}
      }, n.EntityParser = f;
    }, { "./InputStream": 3, "html5-entities": 12 }], 3: [function (e, t, n) {
      function r() {
        this.data = "", this.start = 0, this.committed = 0, this.eof = !1, this.lastLocation = { line: 0, column: 0 };
      }r.EOF = -1, r.DRAIN = -2, r.prototype = { slice: function () {
          if (this.start >= this.data.length) {
            if (!this.eof) throw r.DRAIN;return r.EOF;
          }return this.data.slice(this.start, this.data.length);
        }, "char": function () {
          if (!this.eof && this.start >= this.data.length - 1) throw r.DRAIN;if (this.start >= this.data.length) return r.EOF;var e = this.data[this.start++];return e === "\r" && (e = "\n"), e;
        }, advance: function (e) {
          this.start += e;if (this.start >= this.data.length) {
            if (!this.eof) throw r.DRAIN;return r.EOF;
          }this.committed > this.data.length / 2 && (this.lastLocation = this.location(), this.data = this.data.slice(this.committed), this.start = this.start - this.committed, this.committed = 0);
        }, matchWhile: function (e) {
          if (this.eof && this.start >= this.data.length) return "";var t = new RegExp("^" + e + "+"),
              n = t.exec(this.slice());if (n) {
            if (!this.eof && n[0].length == this.data.length - this.start) throw r.DRAIN;return this.advance(n[0].length), n[0];
          }return "";
        }, matchUntil: function (e) {
          var t, n;n = this.slice();if (n === r.EOF) return "";if (t = new RegExp(e + (this.eof ? "|$" : "")).exec(n)) {
            var i = this.data.slice(this.start, this.start + t.index);return this.advance(t.index), i.replace(/\r/g, "\n").replace(/\n{2,}/g, "\n");
          }throw r.DRAIN;
        }, append: function (e) {
          this.data += e;
        }, shift: function (e) {
          if (!this.eof && this.start + e >= this.data.length) throw r.DRAIN;if (this.eof && this.start >= this.data.length) return r.EOF;var t = this.data.slice(this.start, this.start + e).toString();return this.advance(Math.min(e, this.data.length - this.start)), t;
        }, peek: function (e) {
          if (!this.eof && this.start + e >= this.data.length) throw r.DRAIN;return this.eof && this.start >= this.data.length ? r.EOF : this.data.slice(this.start, Math.min(this.start + e, this.data.length)).toString();
        }, length: function () {
          return this.data.length - this.start - 1;
        }, unget: function (e) {
          if (e === r.EOF) return;this.start -= e.length;
        }, undo: function () {
          this.start = this.committed;
        }, commit: function () {
          this.committed = this.start;
        }, location: function () {
          var e = this.lastLocation.line,
              t = this.lastLocation.column,
              n = this.data.slice(0, this.committed),
              r = n.match(/\n/g),
              i = r ? e + r.length : e,
              s = r ? n.length - n.lastIndexOf("\n") - 1 : t + n.length;return { line: i, column: s };
        } }, n.InputStream = r;
    }, {}], 4: [function (e, t, n) {
      function i(e, t, n, r) {
        this.localName = t, this.namespaceURI = e, this.attributes = n, this.node = r;
      }function s(e, t) {
        for (var n = 0; n < e.attributes.length; n++) if (e.attributes[n].nodeName == t) return e.attributes[n].nodeValue;return null;
      }var r = { "http://www.w3.org/1999/xhtml": ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], "http://www.w3.org/1998/Math/MathML": ["mi", "mo", "mn", "ms", "mtext", "annotation-xml"], "http://www.w3.org/2000/svg": ["foreignObject", "desc", "title"] };i.prototype.isSpecial = function () {
        return this.namespaceURI in r && r[this.namespaceURI].indexOf(this.localName) > -1;
      }, i.prototype.isFosterParenting = function () {
        return this.namespaceURI === "http://www.w3.org/1999/xhtml" ? this.localName === "table" || this.localName === "tbody" || this.localName === "tfoot" || this.localName === "thead" || this.localName === "tr" : !1;
      }, i.prototype.isNumberedHeader = function () {
        return this.namespaceURI === "http://www.w3.org/1999/xhtml" ? this.localName === "h1" || this.localName === "h2" || this.localName === "h3" || this.localName === "h4" || this.localName === "h5" || this.localName === "h6" : !1;
      }, i.prototype.isForeign = function () {
        return this.namespaceURI != "http://www.w3.org/1999/xhtml";
      }, i.prototype.isHtmlIntegrationPoint = function () {
        if (this.namespaceURI === "http://www.w3.org/1998/Math/MathML") {
          if (this.localName !== "annotation-xml") return !1;var e = s(this, "encoding");return e ? (e = e.toLowerCase(), e === "text/html" || e === "application/xhtml+xml") : !1;
        }return this.namespaceURI === "http://www.w3.org/2000/svg" ? this.localName === "foreignObject" || this.localName === "desc" || this.localName === "title" : !1;
      }, i.prototype.isMathMLTextIntegrationPoint = function () {
        return this.namespaceURI === "http://www.w3.org/1998/Math/MathML" ? this.localName === "mi" || this.localName === "mo" || this.localName === "mn" || this.localName === "ms" || this.localName === "mtext" : !1;
      }, n.StackItem = i;
    }, {}], 5: [function (e, t, n) {
      function s(e) {
        return e === " " || e === "\n" || e === "	" || e === "\r" || e === "\f";
      }function o(e) {
        return e >= "A" && e <= "Z" || e >= "a" && e <= "z";
      }function u(e) {
        this._tokenHandler = e, this._state = u.DATA, this._inputStream = new r(), this._currentToken = null, this._temporaryBuffer = "", this._additionalAllowedCharacter = "";
      }var r = e("./InputStream").InputStream,
          i = e("./EntityParser").EntityParser;u.prototype._parseError = function (e, t) {
        this._tokenHandler.parseError(e, t);
      }, u.prototype._emitToken = function (e) {
        if (e.type === "StartTag") for (var t = 1; t < e.data.length; t++) e.data[t].nodeName || e.data.splice(t--, 1);else e.type === "EndTag" && (e.selfClosing && this._parseError("self-closing-flag-on-end-tag"), e.data.length !== 0 && this._parseError("attributes-in-end-tag"));this._tokenHandler.processToken(e), e.type === "StartTag" && e.selfClosing && !this._tokenHandler.isSelfClosingFlagAcknowledged() && this._parseError("non-void-element-with-trailing-solidus", { name: e.name });
      }, u.prototype._emitCurrentToken = function () {
        this._state = u.DATA, this._emitToken(this._currentToken);
      }, u.prototype._currentAttribute = function () {
        return this._currentToken.data[this._currentToken.data.length - 1];
      }, u.prototype.setState = function (e) {
        this._state = e;
      }, u.prototype.tokenize = function (e) {
        function n(e) {
          var n = e.char();if (n === r.EOF) return t._emitToken({ type: "EOF", data: null }), !1;if (n === "&") t.setState(a);else if (n === "<") t.setState(j);else if (n === "\0") t._emitToken({ type: "Characters", data: n }), e.commit();else {
            var i = e.matchUntil("&|<|\0");t._emitToken({ type: "Characters", data: n + i }), e.commit();
          }return !0;
        }function a(e) {
          var r = i.consumeEntity(e, t);return t.setState(n), t._emitToken({ type: "Characters", data: r || "&" }), !0;
        }function f(e) {
          var n = e.char();if (n === r.EOF) return t._emitToken({ type: "EOF", data: null }), !1;if (n === "&") t.setState(l);else if (n === "<") t.setState(d);else if (n === "\0") t._parseError("invalid-codepoint"), t._emitToken({ type: "Characters", data: "\ufffd" }), e.commit();else {
            var i = e.matchUntil("&|<|\0");t._emitToken({ type: "Characters", data: n + i }), e.commit();
          }return !0;
        }function l(e) {
          var n = i.consumeEntity(e, t);return t.setState(f), t._emitToken({ type: "Characters", data: n || "&" }), !0;
        }function c(e) {
          var n = e.char();if (n === r.EOF) return t._emitToken({ type: "EOF", data: null }), !1;if (n === "<") t.setState(g);else if (n === "\0") t._parseError("invalid-codepoint"), t._emitToken({ type: "Characters", data: "\ufffd" }), e.commit();else {
            var i = e.matchUntil("<|\0");t._emitToken({ type: "Characters", data: n + i });
          }return !0;
        }function h(e) {
          var n = e.char();if (n === r.EOF) return t._emitToken({ type: "EOF", data: null }), !1;if (n === "\0") t._parseError("invalid-codepoint"), t._emitToken({ type: "Characters", data: "\ufffd" }), e.commit();else {
            var i = e.matchUntil("\0");t._emitToken({ type: "Characters", data: n + i });
          }return !0;
        }function p(e) {
          var n = e.char();if (n === r.EOF) return t._emitToken({ type: "EOF", data: null }), !1;if (n === "<") t.setState(w);else if (n === "\0") t._parseError("invalid-codepoint"), t._emitToken({ type: "Characters", data: "\ufffd" }), e.commit();else {
            var i = e.matchUntil("<|\0");t._emitToken({ type: "Characters", data: n + i });
          }return !0;
        }function d(e) {
          var n = e.char();return n === "/" ? (this._temporaryBuffer = "", t.setState(v)) : (t._emitToken({ type: "Characters", data: "<" }), e.unget(n), t.setState(f)), !0;
        }function v(e) {
          var n = e.char();return o(n) ? (this._temporaryBuffer += n, t.setState(m)) : (t._emitToken({ type: "Characters", data: "</" }), e.unget(n), t.setState(f)), !0;
        }function m(e) {
          var r = t._currentToken && t._currentToken.name === this._temporaryBuffer.toLowerCase(),
              i = e.char();return s(i) && r ? (t._currentToken = { type: "EndTag", name: this._temporaryBuffer, data: [], selfClosing: !1 }, t.setState(q)) : i === "/" && r ? (t._currentToken = { type: "EndTag", name: this._temporaryBuffer, data: [], selfClosing: !1 }, t.setState(K)) : i === ">" && r ? (t._currentToken = { type: "EndTag", name: this._temporaryBuffer, data: [], selfClosing: !1 }, t._emitCurrentToken(), t.setState(n)) : o(i) ? (this._temporaryBuffer += i, e.commit()) : (t._emitToken({ type: "Characters", data: "</" + this._temporaryBuffer }), e.unget(i), t.setState(f)), !0;
        }function g(e) {
          var n = e.char();return n === "/" ? (this._temporaryBuffer = "", t.setState(y)) : (t._emitToken({ type: "Characters", data: "<" }), e.unget(n), t.setState(c)), !0;
        }function y(e) {
          var n = e.char();return o(n) ? (this._temporaryBuffer += n, t.setState(b)) : (t._emitToken({ type: "Characters", data: "</" }), e.unget(n), t.setState(c)), !0;
        }function b(e) {
          var r = t._currentToken && t._currentToken.name === this._temporaryBuffer.toLowerCase(),
              i = e.char();return s(i) && r ? (t._currentToken = { type: "EndTag", name: this._temporaryBuffer, data: [], selfClosing: !1 }, t.setState(q)) : i === "/" && r ? (t._currentToken = { type: "EndTag", name: this._temporaryBuffer, data: [], selfClosing: !1 }, t.setState(K)) : i === ">" && r ? (t._currentToken = { type: "EndTag", name: this._temporaryBuffer, data: [], selfClosing: !1 }, t._emitCurrentToken(), t.setState(n)) : o(i) ? (this._temporaryBuffer += i, e.commit()) : (t._emitToken({ type: "Characters", data: "</" + this._temporaryBuffer }), e.unget(i), t.setState(c)), !0;
        }function w(e) {
          var n = e.char();return n === "/" ? (this._temporaryBuffer = "", t.setState(E)) : n === "!" ? (t._emitToken({ type: "Characters", data: "<!" }), t.setState(x)) : (t._emitToken({ type: "Characters", data: "<" }), e.unget(n), t.setState(p)), !0;
        }function E(e) {
          var n = e.char();return o(n) ? (this._temporaryBuffer += n, t.setState(S)) : (t._emitToken({ type: "Characters", data: "</" }), e.unget(n), t.setState(p)), !0;
        }function S(e) {
          var n = t._currentToken && t._currentToken.name === this._temporaryBuffer.toLowerCase(),
              r = e.char();return s(r) && n ? (t._currentToken = { type: "EndTag", name: "script", data: [], selfClosing: !1 }, t.setState(q)) : r === "/" && n ? (t._currentToken = { type: "EndTag", name: "script", data: [], selfClosing: !1 }, t.setState(K)) : r === ">" && n ? (t._currentToken = { type: "EndTag", name: "script", data: [], selfClosing: !1 }, t._emitCurrentToken()) : o(r) ? (this._temporaryBuffer += r, e.commit()) : (t._emitToken({ type: "Characters", data: "</" + this._temporaryBuffer }), e.unget(r), t.setState(p)), !0;
        }function x(e) {
          var n = e.char();return n === "-" ? (t._emitToken({ type: "Characters", data: "-" }), t.setState(T)) : (e.unget(n), t.setState(p)), !0;
        }function T(e) {
          var n = e.char();return n === "-" ? (t._emitToken({ type: "Characters", data: "-" }), t.setState(k)) : (e.unget(n), t.setState(p)), !0;
        }function N(e) {
          var i = e.char();if (i === r.EOF) e.unget(i), t.setState(n);else if (i === "-") t._emitToken({ type: "Characters", data: "-" }), t.setState(C);else if (i === "<") t.setState(L);else if (i === "\0") t._parseError("invalid-codepoint"), t._emitToken({ type: "Characters", data: "\ufffd" }), e.commit();else {
            var s = e.matchUntil("<|-|\0");t._emitToken({ type: "Characters", data: i + s });
          }return !0;
        }function C(e) {
          var i = e.char();return i === r.EOF ? (e.unget(i), t.setState(n)) : i === "-" ? (t._emitToken({ type: "Characters", data: "-" }), t.setState(k)) : i === "<" ? t.setState(L) : i === "\0" ? (t._parseError("invalid-codepoint"), t._emitToken({ type: "Characters", data: "\ufffd" }), t.setState(N)) : (t._emitToken({ type: "Characters", data: i }), t.setState(N)), !0;
        }function k(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-script"), e.unget(i), t.setState(n)) : i === "<" ? t.setState(L) : i === ">" ? (t._emitToken({ type: "Characters", data: ">" }), t.setState(p)) : i === "\0" ? (t._parseError("invalid-codepoint"), t._emitToken({ type: "Characters", data: "\ufffd" }), t.setState(N)) : (t._emitToken({ type: "Characters", data: i }), t.setState(N)), !0;
        }function L(e) {
          var n = e.char();return n === "/" ? (this._temporaryBuffer = "", t.setState(A)) : o(n) ? (t._emitToken({ type: "Characters", data: "<" + n }), this._temporaryBuffer = n, t.setState(M)) : (t._emitToken({ type: "Characters", data: "<" }), e.unget(n), t.setState(N)), !0;
        }function A(e) {
          var n = e.char();return o(n) ? (this._temporaryBuffer = n, t.setState(O)) : (t._emitToken({ type: "Characters", data: "</" }), e.unget(n), t.setState(N)), !0;
        }function O(e) {
          var r = t._currentToken && t._currentToken.name === this._temporaryBuffer.toLowerCase(),
              i = e.char();return s(i) && r ? (t._currentToken = { type: "EndTag", name: "script", data: [], selfClosing: !1 }, t.setState(q)) : i === "/" && r ? (t._currentToken = { type: "EndTag", name: "script", data: [], selfClosing: !1 }, t.setState(K)) : i === ">" && r ? (t._currentToken = { type: "EndTag", name: "script", data: [], selfClosing: !1 }, t.setState(n), t._emitCurrentToken()) : o(i) ? (this._temporaryBuffer += i, e.commit()) : (t._emitToken({ type: "Characters", data: "</" + this._temporaryBuffer }), e.unget(i), t.setState(N)), !0;
        }function M(e) {
          var n = e.char();return s(n) || n === "/" || n === ">" ? (t._emitToken({ type: "Characters", data: n }), this._temporaryBuffer.toLowerCase() === "script" ? t.setState(_) : t.setState(N)) : o(n) ? (t._emitToken({ type: "Characters", data: n }), this._temporaryBuffer += n, e.commit()) : (e.unget(n), t.setState(N)), !0;
        }function _(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-script"), e.unget(i), t.setState(n)) : i === "-" ? (t._emitToken({ type: "Characters", data: "-" }), t.setState(D)) : i === "<" ? (t._emitToken({ type: "Characters", data: "<" }), t.setState(H)) : i === "\0" ? (t._parseError("invalid-codepoint"), t._emitToken({ type: "Characters", data: "\ufffd" }), e.commit()) : (t._emitToken({ type: "Characters", data: i }), e.commit()), !0;
        }function D(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-script"), e.unget(i), t.setState(n)) : i === "-" ? (t._emitToken({ type: "Characters", data: "-" }), t.setState(P)) : i === "<" ? (t._emitToken({ type: "Characters", data: "<" }), t.setState(H)) : i === "\0" ? (t._parseError("invalid-codepoint"), t._emitToken({ type: "Characters", data: "\ufffd" }), t.setState(_)) : (t._emitToken({ type: "Characters", data: i }), t.setState(_)), !0;
        }function P(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-script"), e.unget(i), t.setState(n)) : i === "-" ? (t._emitToken({ type: "Characters", data: "-" }), e.commit()) : i === "<" ? (t._emitToken({ type: "Characters", data: "<" }), t.setState(H)) : i === ">" ? (t._emitToken({ type: "Characters", data: ">" }), t.setState(p)) : i === "\0" ? (t._parseError("invalid-codepoint"), t._emitToken({ type: "Characters", data: "\ufffd" }), t.setState(_)) : (t._emitToken({ type: "Characters", data: i }), t.setState(_)), !0;
        }function H(e) {
          var n = e.char();return n === "/" ? (t._emitToken({ type: "Characters", data: "/" }), this._temporaryBuffer = "", t.setState(B)) : (e.unget(n), t.setState(_)), !0;
        }function B(e) {
          var n = e.char();return s(n) || n === "/" || n === ">" ? (t._emitToken({ type: "Characters", data: n }), this._temporaryBuffer.toLowerCase() === "script" ? t.setState(N) : t.setState(_)) : o(n) ? (t._emitToken({ type: "Characters", data: n }), this._temporaryBuffer += n, e.commit()) : (e.unget(n), t.setState(_)), !0;
        }function j(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("bare-less-than-sign-at-eof"), t._emitToken({ type: "Characters", data: "<" }), e.unget(i), t.setState(n)) : o(i) ? (t._currentToken = { type: "StartTag", name: i.toLowerCase(), data: [] }, t.setState(I)) : i === "!" ? t.setState(G) : i === "/" ? t.setState(F) : i === ">" ? (t._parseError("expected-tag-name-but-got-right-bracket"), t._emitToken({ type: "Characters", data: "<>" }), t.setState(n)) : i === "?" ? (t._parseError("expected-tag-name-but-got-question-mark"), e.unget(i), t.setState(Q)) : (t._parseError("expected-tag-name"), t._emitToken({ type: "Characters", data: "<" }), e.unget(i), t.setState(n)), !0;
        }function F(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("expected-closing-tag-but-got-eof"), t._emitToken({ type: "Characters", data: "</" }), e.unget(i), t.setState(n)) : o(i) ? (t._currentToken = { type: "EndTag", name: i.toLowerCase(), data: [] }, t.setState(I)) : i === ">" ? (t._parseError("expected-closing-tag-but-got-right-bracket"), t.setState(n)) : (t._parseError("expected-closing-tag-but-got-char", { data: i }), e.unget(i), t.setState(Q)), !0;
        }function I(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-tag-name"), e.unget(i), t.setState(n)) : s(i) ? t.setState(q) : o(i) ? t._currentToken.name += i.toLowerCase() : i === ">" ? t._emitCurrentToken() : i === "/" ? t.setState(K) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentToken.name += "\ufffd") : t._currentToken.name += i, e.commit(), !0;
        }function q(e) {
          var i = e.char();if (i === r.EOF) t._parseError("expected-attribute-name-but-got-eof"), e.unget(i), t.setState(n);else {
            if (s(i)) return !0;o(i) ? (t._currentToken.data.push({ nodeName: i.toLowerCase(), nodeValue: "" }), t.setState(R)) : i === ">" ? t._emitCurrentToken() : i === "/" ? t.setState(K) : i === "'" || i === '"' || i === "=" || i === "<" ? (t._parseError("invalid-character-in-attribute-name"), t._currentToken.data.push({ nodeName: i, nodeValue: "" }), t.setState(R)) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentToken.data.push({ nodeName: "\ufffd", nodeValue: "" })) : (t._currentToken.data.push({ nodeName: i, nodeValue: "" }), t.setState(R));
          }return !0;
        }function R(e) {
          var i = e.char(),
              u = !0,
              a = !1;i === r.EOF ? (t._parseError("eof-in-attribute-name"), e.unget(i), t.setState(n), a = !0) : i === "=" ? t.setState(z) : o(i) ? (t._currentAttribute().nodeName += i.toLowerCase(), u = !1) : i === ">" ? a = !0 : s(i) ? t.setState(U) : i === "/" ? t.setState(K) : i === "'" || i === '"' ? (t._parseError("invalid-character-in-attribute-name"), t._currentAttribute().nodeName += i, u = !1) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentAttribute().nodeName += "\ufffd") : (t._currentAttribute().nodeName += i, u = !1);if (u) {
            var f = t._currentToken.data,
                l = f[f.length - 1];for (var c = f.length - 2; c >= 0; c--) if (l.nodeName === f[c].nodeName) {
              t._parseError("duplicate-attribute", { name: l.nodeName }), l.nodeName = null;break;
            }a && t._emitCurrentToken();
          } else e.commit();return !0;
        }function U(e) {
          var i = e.char();if (i === r.EOF) t._parseError("expected-end-of-tag-but-got-eof"), e.unget(i), t.setState(n);else {
            if (s(i)) return !0;i === "=" ? t.setState(z) : i === ">" ? t._emitCurrentToken() : o(i) ? (t._currentToken.data.push({ nodeName: i, nodeValue: "" }), t.setState(R)) : i === "/" ? t.setState(K) : i === "'" || i === '"' || i === "<" ? (t._parseError("invalid-character-after-attribute-name"), t._currentToken.data.push({ nodeName: i, nodeValue: "" }), t.setState(R)) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentToken.data.push({ nodeName: "\ufffd", nodeValue: "" })) : (t._currentToken.data.push({ nodeName: i, nodeValue: "" }), t.setState(R));
          }return !0;
        }function z(e) {
          var i = e.char();if (i === r.EOF) t._parseError("expected-attribute-value-but-got-eof"), e.unget(i), t.setState(n);else {
            if (s(i)) return !0;i === '"' ? t.setState(W) : i === "&" ? (t.setState(V), e.unget(i)) : i === "'" ? t.setState(X) : i === ">" ? (t._parseError("expected-attribute-value-but-got-right-bracket"), t._emitCurrentToken()) : i === "=" || i === "<" || i === "`" ? (t._parseError("unexpected-character-in-unquoted-attribute-value"), t._currentAttribute().nodeValue += i, t.setState(V)) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentAttribute().nodeValue += "\ufffd") : (t._currentAttribute().nodeValue += i, t.setState(V));
          }return !0;
        }function W(e) {
          var i = e.char();if (i === r.EOF) t._parseError("eof-in-attribute-value-double-quote"), e.unget(i), t.setState(n);else if (i === '"') t.setState(J);else if (i === "&") this._additionalAllowedCharacter = '"', t.setState($);else if (i === "\0") t._parseError("invalid-codepoint"), t._currentAttribute().nodeValue += "\ufffd";else {
            var s = e.matchUntil('[\0"&]');i += s, t._currentAttribute().nodeValue += i;
          }return !0;
        }function X(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-attribute-value-single-quote"), e.unget(i), t.setState(n)) : i === "'" ? t.setState(J) : i === "&" ? (this._additionalAllowedCharacter = "'", t.setState($)) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentAttribute().nodeValue += "\ufffd") : t._currentAttribute().nodeValue += i + e.matchUntil("\0|['&]"), !0;
        }function V(e) {
          var i = e.char();if (i === r.EOF) t._parseError("eof-after-attribute-value"), e.unget(i), t.setState(n);else if (s(i)) t.setState(q);else if (i === "&") this._additionalAllowedCharacter = ">", t.setState($);else if (i === ">") t._emitCurrentToken();else if (i === '"' || i === "'" || i === "=" || i === "`" || i === "<") t._parseError("unexpected-character-in-unquoted-attribute-value"), t._currentAttribute().nodeValue += i, e.commit();else if (i === "\0") t._parseError("invalid-codepoint"), t._currentAttribute().nodeValue += "\ufffd";else {
            var o = e.matchUntil("\0|[	\n\x0b\f \r&<>\"'=`]");o === r.EOF && (t._parseError("eof-in-attribute-value-no-quotes"), t._emitCurrentToken()), e.commit(), t._currentAttribute().nodeValue += i + o;
          }return !0;
        }function $(e) {
          var n = i.consumeEntity(e, t, this._additionalAllowedCharacter);return this._currentAttribute().nodeValue += n || "&", this._additionalAllowedCharacter === '"' ? t.setState(W) : this._additionalAllowedCharacter === "'" ? t.setState(X) : this._additionalAllowedCharacter === ">" && t.setState(V), !0;
        }function J(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-after-attribute-value"), e.unget(i), t.setState(n)) : s(i) ? t.setState(q) : i === ">" ? (t.setState(n), t._emitCurrentToken()) : i === "/" ? t.setState(K) : (t._parseError("unexpected-character-after-attribute-value"), e.unget(i), t.setState(q)), !0;
        }function K(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("unexpected-eof-after-solidus-in-tag"), e.unget(i), t.setState(n)) : i === ">" ? (t._currentToken.selfClosing = !0, t.setState(n), t._emitCurrentToken()) : (t._parseError("unexpected-character-after-solidus-in-tag"), e.unget(i), t.setState(q)), !0;
        }function Q(e) {
          var r = e.matchUntil(">");return r = r.replace(/\u0000/g, "\ufffd"), e.char(), t._emitToken({ type: "Comment", data: r }), t.setState(n), !0;
        }function G(e) {
          var n = e.shift(2);if (n === "--") t._currentToken = { type: "Comment", data: "" }, t.setState(Z);else {
            var i = e.shift(5);if (i === r.EOF || n === r.EOF) return t._parseError("expected-dashes-or-doctype"), t.setState(Q), e.unget(n), !0;n += i, n.toUpperCase() === "DOCTYPE" ? (t._currentToken = { type: "Doctype", name: "", publicId: null, systemId: null, forceQuirks: !1 }, t.setState(st)) : t._tokenHandler.isCdataSectionAllowed() && n === "[CDATA[" ? t.setState(Y) : (t._parseError("expected-dashes-or-doctype"), e.unget(n), t.setState(Q));
          }return !0;
        }function Y(e) {
          var r = e.matchUntil("]]>");return e.shift(3), r && t._emitToken({ type: "Characters", data: r }), t.setState(n), !0;
        }function Z(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-comment"), t._emitToken(t._currentToken), e.unget(i), t.setState(n)) : i === "-" ? t.setState(et) : i === ">" ? (t._parseError("incorrect-comment"), t._emitToken(t._currentToken), t.setState(n)) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentToken.data += "\ufffd") : (t._currentToken.data += i, t.setState(tt)), !0;
        }function et(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-comment"), t._emitToken(t._currentToken), e.unget(i), t.setState(n)) : i === "-" ? t.setState(rt) : i === ">" ? (t._parseError("incorrect-comment"), t._emitToken(t._currentToken), t.setState(n)) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentToken.data += "\ufffd") : (t._currentToken.data += "-" + i, t.setState(tt)), !0;
        }function tt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-comment"), t._emitToken(t._currentToken), e.unget(i), t.setState(n)) : i === "-" ? t.setState(nt) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentToken.data += "\ufffd") : (t._currentToken.data += i, e.commit()), !0;
        }function nt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-comment-end-dash"), t._emitToken(t._currentToken), e.unget(i), t.setState(n)) : i === "-" ? t.setState(rt) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentToken.data += "-\ufffd", t.setState(tt)) : (t._currentToken.data += "-" + i + e.matchUntil("\0|-"), e.char()), !0;
        }function rt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-comment-double-dash"), t._emitToken(t._currentToken), e.unget(i), t.setState(n)) : i === ">" ? (t._emitToken(t._currentToken), t.setState(n)) : i === "!" ? (t._parseError("unexpected-bang-after-double-dash-in-comment"), t.setState(it)) : i === "-" ? (t._parseError("unexpected-dash-after-double-dash-in-comment"), t._currentToken.data += i) : i === "\0" ? (t._parseError("invalid-codepoint"), t._currentToken.data += "--\ufffd", t.setState(tt)) : (t._parseError("unexpected-char-in-comment"), t._currentToken.data += "--" + i, t.setState(tt)), !0;
        }function it(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-comment-end-bang-state"), t._emitToken(t._currentToken), e.unget(i), t.setState(n)) : i === ">" ? (t._emitToken(t._currentToken), t.setState(n)) : i === "-" ? (t._currentToken.data += "--!", t.setState(nt)) : (t._currentToken.data += "--!" + i, t.setState(tt)), !0;
        }function st(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("expected-doctype-name-but-got-eof"), t._currentToken.forceQuirks = !0, e.unget(i), t.setState(n), t._emitCurrentToken()) : s(i) ? t.setState(ot) : (t._parseError("need-space-after-doctype"), e.unget(i), t.setState(ot)), !0;
        }function ot(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("expected-doctype-name-but-got-eof"), t._currentToken.forceQuirks = !0, e.unget(i), t.setState(n), t._emitCurrentToken()) : s(i) || (i === ">" ? (t._parseError("expected-doctype-name-but-got-right-bracket"), t._currentToken.forceQuirks = !0, t.setState(n), t._emitCurrentToken()) : (o(i) && (i = i.toLowerCase()), t._currentToken.name = i, t.setState(ut))), !0;
        }function ut(e) {
          var i = e.char();return i === r.EOF ? (t._currentToken.forceQuirks = !0, e.unget(i), t._parseError("eof-in-doctype-name"), t.setState(n), t._emitCurrentToken()) : s(i) ? t.setState(at) : i === ">" ? (t.setState(n), t._emitCurrentToken()) : (o(i) && (i = i.toLowerCase()), t._currentToken.name += i, e.commit()), !0;
        }function at(e) {
          var i = e.char();if (i === r.EOF) t._currentToken.forceQuirks = !0, e.unget(i), t._parseError("eof-in-doctype"), t.setState(n), t._emitCurrentToken();else if (!s(i)) if (i === ">") t.setState(n), t._emitCurrentToken();else {
            if (["p", "P"].indexOf(i) > -1) {
              var o = [["u", "U"], ["b", "B"], ["l", "L"], ["i", "I"], ["c", "C"]],
                  u = o.every(function (t) {
                return i = e.char(), t.indexOf(i) > -1;
              });if (u) return t.setState(ft), !0;
            } else if (["s", "S"].indexOf(i) > -1) {
              var o = [["y", "Y"], ["s", "S"], ["t", "T"], ["e", "E"], ["m", "M"]],
                  u = o.every(function (t) {
                return i = e.char(), t.indexOf(i) > -1;
              });if (u) return t.setState(vt), !0;
            }e.unget(i), t._currentToken.forceQuirks = !0, i === r.EOF ? (t._parseError("eof-in-doctype"), e.unget(i), t.setState(n), t._emitCurrentToken()) : (t._parseError("expected-space-or-right-bracket-in-doctype", { data: i }), t.setState(wt));
          }return !0;
        }function ft(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, e.unget(i), t.setState(n), t._emitCurrentToken()) : s(i) ? t.setState(lt) : i === "'" || i === '"' ? (t._parseError("unexpected-char-in-doctype"), e.unget(i), t.setState(lt)) : (e.unget(i), t.setState(lt)), !0;
        }function lt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, e.unget(i), t.setState(n), t._emitCurrentToken()) : s(i) || (i === '"' ? (t._currentToken.publicId = "", t.setState(ct)) : i === "'" ? (t._currentToken.publicId = "", t.setState(ht)) : i === ">" ? (t._parseError("unexpected-end-of-doctype"), t._currentToken.forceQuirks = !0, t.setState(n), t._emitCurrentToken()) : (t._parseError("unexpected-char-in-doctype"), t._currentToken.forceQuirks = !0, t.setState(wt))), !0;
        }function ct(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, e.unget(i), t.setState(n), t._emitCurrentToken()) : i === '"' ? t.setState(pt) : i === ">" ? (t._parseError("unexpected-end-of-doctype"), t._currentToken.forceQuirks = !0, t.setState(n), t._emitCurrentToken()) : t._currentToken.publicId += i, !0;
        }function ht(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, e.unget(i), t.setState(n), t._emitCurrentToken()) : i === "'" ? t.setState(pt) : i === ">" ? (t._parseError("unexpected-end-of-doctype"), t._currentToken.forceQuirks = !0, t.setState(n), t._emitCurrentToken()) : t._currentToken.publicId += i, !0;
        }function pt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, t._emitCurrentToken(), e.unget(i), t.setState(n)) : s(i) ? t.setState(dt) : i === ">" ? (t.setState(n), t._emitCurrentToken()) : i === '"' ? (t._parseError("unexpected-char-in-doctype"), t._currentToken.systemId = "", t.setState(gt)) : i === "'" ? (t._parseError("unexpected-char-in-doctype"), t._currentToken.systemId = "", t.setState(yt)) : (t._parseError("unexpected-char-in-doctype"), t._currentToken.forceQuirks = !0, t.setState(wt)), !0;
        }function dt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, t._emitCurrentToken(), e.unget(i), t.setState(n)) : s(i) || (i === ">" ? (t._emitCurrentToken(), t.setState(n)) : i === '"' ? (t._currentToken.systemId = "", t.setState(gt)) : i === "'" ? (t._currentToken.systemId = "", t.setState(yt)) : (t._parseError("unexpected-char-in-doctype"), t._currentToken.forceQuirks = !0, t.setState(wt))), !0;
        }function vt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, t._emitCurrentToken(), e.unget(i), t.setState(n)) : s(i) ? t.setState(mt) : i === "'" || i === '"' ? (t._parseError("unexpected-char-in-doctype"), e.unget(i), t.setState(mt)) : (e.unget(i), t.setState(mt)), !0;
        }function mt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, t._emitCurrentToken(), e.unget(i), t.setState(n)) : s(i) || (i === '"' ? (t._currentToken.systemId = "", t.setState(gt)) : i === "'" ? (t._currentToken.systemId = "", t.setState(yt)) : i === ">" ? (t._parseError("unexpected-end-of-doctype"), t._currentToken.forceQuirks = !0, t._emitCurrentToken(), t.setState(n)) : (t._parseError("unexpected-char-in-doctype"), t._currentToken.forceQuirks = !0, t.setState(wt))), !0;
        }function gt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, t._emitCurrentToken(), e.unget(i), t.setState(n)) : i === '"' ? t.setState(bt) : i === ">" ? (t._parseError("unexpected-end-of-doctype"), t._currentToken.forceQuirks = !0, t._emitCurrentToken(), t.setState(n)) : t._currentToken.systemId += i, !0;
        }function yt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, t._emitCurrentToken(), e.unget(i), t.setState(n)) : i === "'" ? t.setState(bt) : i === ">" ? (t._parseError("unexpected-end-of-doctype"), t._currentToken.forceQuirks = !0, t._emitCurrentToken(), t.setState(n)) : t._currentToken.systemId += i, !0;
        }function bt(e) {
          var i = e.char();return i === r.EOF ? (t._parseError("eof-in-doctype"), t._currentToken.forceQuirks = !0, t._emitCurrentToken(), e.unget(i), t.setState(n)) : s(i) || (i === ">" ? (t._emitCurrentToken(), t.setState(n)) : (t._parseError("unexpected-char-in-doctype"), t.setState(wt))), !0;
        }function wt(e) {
          var i = e.char();return i === r.EOF ? (e.unget(i), t._emitCurrentToken(), t.setState(n)) : i === ">" && (t._emitCurrentToken(), t.setState(n)), !0;
        }u.DATA = n, u.RCDATA = f, u.RAWTEXT = c, u.SCRIPT_DATA = p, u.PLAINTEXT = h, this._state = u.DATA, this._inputStream.append(e), this._tokenHandler.startTokenization(this), this._inputStream.eof = !0;var t = this;while (this._state.call(this, this._inputStream));
      }, Object.defineProperty(u.prototype, "lineNumber", { get: function () {
          return this._inputStream.location().line;
        } }), Object.defineProperty(u.prototype, "columnNumber", { get: function () {
          return this._inputStream.location().column;
        } }), n.Tokenizer = u;
    }, { "./EntityParser": 2, "./InputStream": 3 }], 6: [function (e, t, n) {
      function c(e) {
        return e === " " || e === "\n" || e === "	" || e === "\r" || e === "\f";
      }function h(e) {
        return c(e) || e === "\ufffd";
      }function p(e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];if (!c(n)) return !1;
        }return !0;
      }function d(e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];if (!h(n)) return !1;
        }return !0;
      }function v(e, t) {
        for (var n = 0; n < e.attributes.length; n++) {
          var r = e.attributes[n];if (r.nodeName === t) return r;
        }return null;
      }function m(e) {
        this.characters = e, this.current = 0, this.end = this.characters.length;
      }function g() {
        this.tokenizer = null, this.errorHandler = null, this.scriptingEnabled = !1, this.document = null, this.head = null, this.form = null, this.openElements = new a(), this.activeFormattingElements = [], this.insertionMode = null, this.insertionModeName = "", this.originalInsertionMode = "", this.inQuirksMode = !1, this.compatMode = "no quirks", this.framesetOk = !0, this.redirectAttachToFosterParent = !1, this.selfClosingFlagAcknowledged = !1, this.context = "", this.pendingTableCharacters = [], this.shouldSkipLeadingNewline = !1;var e = this,
            t = this.insertionModes = {};t.base = { end_tag_handlers: { "-default": "endTagOther" }, start_tag_handlers: { "-default": "startTagOther" }, processEOF: function () {
            e.generateImpliedEndTags(), e.openElements.length > 2 ? e.parseError("expected-closing-tag-but-got-eof") : e.openElements.length == 2 && e.openElements.item(1).localName != "body" ? e.parseError("expected-closing-tag-but-got-eof") : e.context && e.openElements.length > 1;
          }, processComment: function (t) {
            e.insertComment(t, e.currentStackItem().node);
          }, processDoctype: function (t, n, r, i) {
            e.parseError("unexpected-doctype");
          }, processStartTag: function (e, t, n) {
            if (this[this.start_tag_handlers[e]]) this[this.start_tag_handlers[e]](e, t, n);else {
              if (!this[this.start_tag_handlers["-default"]]) throw new Error("No handler found for " + e);this[this.start_tag_handlers["-default"]](e, t, n);
            }
          }, processEndTag: function (e) {
            if (this[this.end_tag_handlers[e]]) this[this.end_tag_handlers[e]](e);else {
              if (!this[this.end_tag_handlers["-default"]]) throw new Error("No handler found for " + e);this[this.end_tag_handlers["-default"]](e);
            }
          }, startTagHtml: function (e, n) {
            t.inBody.startTagHtml(e, n);
          } }, t.initial = Object.create(t.base), t.initial.processEOF = function () {
          e.parseError("expected-doctype-but-got-eof"), this.anythingElse(), e.insertionMode.processEOF();
        }, t.initial.processComment = function (t) {
          e.insertComment(t, e.document);
        }, t.initial.processDoctype = function (t, n, r, i) {
          function s(e) {
            return n.toLowerCase().indexOf(e) === 0;
          }e.insertDoctype(t || "", n || "", r || ""), i || t != "html" || n != null && (["+//silmaril//dtd html pro v0r11 19970101//", "-//advasoft ltd//dtd html 3.0 aswedit + extensions//", "-//as//dtd html 3.0 aswedit + extensions//", "-//ietf//dtd html 2.0 level 1//", "-//ietf//dtd html 2.0 level 2//", "-//ietf//dtd html 2.0 strict level 1//", "-//ietf//dtd html 2.0 strict level 2//", "-//ietf//dtd html 2.0 strict//", "-//ietf//dtd html 2.0//", "-//ietf//dtd html 2.1e//", "-//ietf//dtd html 3.0//", "-//ietf//dtd html 3.0//", "-//ietf//dtd html 3.2 final//", "-//ietf//dtd html 3.2//", "-//ietf//dtd html 3//", "-//ietf//dtd html level 0//", "-//ietf//dtd html level 0//", "-//ietf//dtd html level 1//", "-//ietf//dtd html level 1//", "-//ietf//dtd html level 2//", "-//ietf//dtd html level 2//", "-//ietf//dtd html level 3//", "-//ietf//dtd html level 3//", "-//ietf//dtd html strict level 0//", "-//ietf//dtd html strict level 0//", "-//ietf//dtd html strict level 1//", "-//ietf//dtd html strict level 1//", "-//ietf//dtd html strict level 2//", "-//ietf//dtd html strict level 2//", "-//ietf//dtd html strict level 3//", "-//ietf//dtd html strict level 3//", "-//ietf//dtd html strict//", "-//ietf//dtd html strict//", "-//ietf//dtd html strict//", "-//ietf//dtd html//", "-//ietf//dtd html//", "-//ietf//dtd html//", "-//metrius//dtd metrius presentational//", "-//microsoft//dtd internet explorer 2.0 html strict//", "-//microsoft//dtd internet explorer 2.0 html//", "-//microsoft//dtd internet explorer 2.0 tables//", "-//microsoft//dtd internet explorer 3.0 html strict//", "-//microsoft//dtd internet explorer 3.0 html//", "-//microsoft//dtd internet explorer 3.0 tables//", "-//netscape comm. corp.//dtd html//", "-//netscape comm. corp.//dtd strict html//", "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//spyglass//dtd html 2.0 extended//", "-//sq//dtd html 2.0 hotmetal + extensions//", "-//sun microsystems corp.//dtd hotjava html//", "-//sun microsystems corp.//dtd hotjava strict html//", "-//w3c//dtd html 3 1995-03-24//", "-//w3c//dtd html 3.2 draft//", "-//w3c//dtd html 3.2 final//", "-//w3c//dtd html 3.2//", "-//w3c//dtd html 3.2s draft//", "-//w3c//dtd html 4.0 frameset//", "-//w3c//dtd html 4.0 transitional//", "-//w3c//dtd html experimental 19960712//", "-//w3c//dtd html experimental 970421//", "-//w3c//dtd w3 html//", "-//w3o//dtd w3 html 3.0//", "-//webtechs//dtd mozilla html 2.0//", "-//webtechs//dtd mozilla html//", "html"].some(s) || ["-//w3o//dtd w3 html strict 3.0//en//", "-/w3c/dtd html 4.0 transitional/en", "html"].indexOf(n.toLowerCase()) > -1 || r == null && ["-//w3c//dtd html 4.01 transitional//", "-//w3c//dtd html 4.01 frameset//"].some(s)) || r != null && r.toLowerCase() == "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd" ? (e.compatMode = "quirks", e.parseError("quirky-doctype")) : n != null && (["-//w3c//dtd xhtml 1.0 transitional//", "-//w3c//dtd xhtml 1.0 frameset//"].some(s) || r != null && ["-//w3c//dtd html 4.01 transitional//", "-//w3c//dtd html 4.01 frameset//"].indexOf(n.toLowerCase()) > -1) ? (e.compatMode = "limited quirks", e.parseError("almost-standards-doctype")) : n == "-//W3C//DTD HTML 4.0//EN" && (r == null || r == "http://www.w3.org/TR/REC-html40/strict.dtd") || n == "-//W3C//DTD HTML 4.01//EN" && (r == null || r == "http://www.w3.org/TR/html4/strict.dtd") || n == "-//W3C//DTD XHTML 1.0 Strict//EN" && r == "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" || n == "-//W3C//DTD XHTML 1.1//EN" && r == "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd" || (r != null && r != "about:legacy-compat" || n != null) && e.parseError("unknown-doctype"), e.setInsertionMode("beforeHTML");
        }, t.initial.processCharacters = function (t) {
          t.skipLeadingWhitespace();if (!t.length) return;e.parseError("expected-doctype-but-got-chars"), this.anythingElse(), e.insertionMode.processCharacters(t);
        }, t.initial.processStartTag = function (t, n, r) {
          e.parseError("expected-doctype-but-got-start-tag", { name: t }), this.anythingElse(), e.insertionMode.processStartTag(t, n, r);
        }, t.initial.processEndTag = function (t) {
          e.parseError("expected-doctype-but-got-end-tag", { name: t }), this.anythingElse(), e.insertionMode.processEndTag(t);
        }, t.initial.anythingElse = function () {
          e.compatMode = "quirks", e.setInsertionMode("beforeHTML");
        }, t.beforeHTML = Object.create(t.base), t.beforeHTML.start_tag_handlers = { html: "startTagHtml", "-default": "startTagOther" }, t.beforeHTML.processEOF = function () {
          this.anythingElse(), e.insertionMode.processEOF();
        }, t.beforeHTML.processComment = function (t) {
          e.insertComment(t, e.document);
        }, t.beforeHTML.processCharacters = function (t) {
          t.skipLeadingWhitespace();if (!t.length) return;this.anythingElse(), e.insertionMode.processCharacters(t);
        }, t.beforeHTML.startTagHtml = function (t, n, r) {
          e.insertHtmlElement(n), e.setInsertionMode("beforeHead");
        }, t.beforeHTML.startTagOther = function (t, n, r) {
          this.anythingElse(), e.insertionMode.processStartTag(t, n, r);
        }, t.beforeHTML.processEndTag = function (t) {
          this.anythingElse(), e.insertionMode.processEndTag(t);
        }, t.beforeHTML.anythingElse = function () {
          e.insertHtmlElement(), e.setInsertionMode("beforeHead");
        }, t.afterAfterBody = Object.create(t.base), t.afterAfterBody.start_tag_handlers = { html: "startTagHtml", "-default": "startTagOther" }, t.afterAfterBody.processComment = function (t) {
          e.insertComment(t, e.document);
        }, t.afterAfterBody.processDoctype = function (e) {
          t.inBody.processDoctype(e);
        }, t.afterAfterBody.startTagHtml = function (e, n) {
          t.inBody.startTagHtml(e, n);
        }, t.afterAfterBody.startTagOther = function (t, n, r) {
          e.parseError("unexpected-start-tag", { name: t }), e.setInsertionMode("inBody"), e.insertionMode.processStartTag(t, n, r);
        }, t.afterAfterBody.endTagOther = function (t) {
          e.parseError("unexpected-end-tag", { name: t }), e.setInsertionMode("inBody"), e.insertionMode.processEndTag(t);
        }, t.afterAfterBody.processCharacters = function (n) {
          if (!p(n.characters)) return e.parseError("unexpected-char-after-body"), e.setInsertionMode("inBody"), e.insertionMode.processCharacters(n);t.inBody.processCharacters(n);
        }, t.afterBody = Object.create(t.base), t.afterBody.end_tag_handlers = { html: "endTagHtml", "-default": "endTagOther" }, t.afterBody.processComment = function (t) {
          e.insertComment(t, e.openElements.rootNode);
        }, t.afterBody.processCharacters = function (n) {
          if (!p(n.characters)) return e.parseError("unexpected-char-after-body"), e.setInsertionMode("inBody"), e.insertionMode.processCharacters(n);t.inBody.processCharacters(n);
        }, t.afterBody.processStartTag = function (t, n, r) {
          e.parseError("unexpected-start-tag-after-body", { name: t }), e.setInsertionMode("inBody"), e.insertionMode.processStartTag(t, n, r);
        }, t.afterBody.endTagHtml = function (t) {
          e.context ? e.parseError("end-html-in-innerhtml") : e.setInsertionMode("afterAfterBody");
        }, t.afterBody.endTagOther = function (t) {
          e.parseError("unexpected-end-tag-after-body", { name: t }), e.setInsertionMode("inBody"), e.insertionMode.processEndTag(t);
        }, t.afterFrameset = Object.create(t.base), t.afterFrameset.start_tag_handlers = { html: "startTagHtml", noframes: "startTagNoframes", "-default": "startTagOther" }, t.afterFrameset.end_tag_handlers = { html: "endTagHtml", "-default": "endTagOther" }, t.afterFrameset.processCharacters = function (t) {
          var n = t.takeRemaining(),
              r = "";for (var i = 0; i < n.length; i++) {
            var s = n[i];c(s) && (r += s);
          }r && e.insertText(r), r.length < n.length && e.parseError("expected-eof-but-got-char");
        }, t.afterFrameset.startTagNoframes = function (e, n) {
          t.inHead.processStartTag(e, n);
        }, t.afterFrameset.startTagOther = function (t, n) {
          e.parseError("unexpected-start-tag-after-frameset", { name: t });
        }, t.afterFrameset.endTagHtml = function (t) {
          e.setInsertionMode("afterAfterFrameset");
        }, t.afterFrameset.endTagOther = function (t) {
          e.parseError("unexpected-end-tag-after-frameset", { name: t });
        }, t.beforeHead = Object.create(t.base), t.beforeHead.start_tag_handlers = { html: "startTagHtml", head: "startTagHead", "-default": "startTagOther" }, t.beforeHead.end_tag_handlers = { html: "endTagImplyHead", head: "endTagImplyHead", body: "endTagImplyHead", br: "endTagImplyHead", "-default": "endTagOther" }, t.beforeHead.processEOF = function () {
          this.startTagHead("head", []), e.insertionMode.processEOF();
        }, t.beforeHead.processCharacters = function (t) {
          t.skipLeadingWhitespace();if (!t.length) return;this.startTagHead("head", []), e.insertionMode.processCharacters(t);
        }, t.beforeHead.startTagHead = function (t, n) {
          e.insertHeadElement(n), e.setInsertionMode("inHead");
        }, t.beforeHead.startTagOther = function (t, n, r) {
          this.startTagHead("head", []), e.insertionMode.processStartTag(t, n, r);
        }, t.beforeHead.endTagImplyHead = function (t) {
          this.startTagHead("head", []), e.insertionMode.processEndTag(t);
        }, t.beforeHead.endTagOther = function (t) {
          e.parseError("end-tag-after-implied-root", { name: t });
        }, t.inHead = Object.create(t.base), t.inHead.start_tag_handlers = { html: "startTagHtml", head: "startTagHead", title: "startTagTitle", script: "startTagScript", style: "startTagNoFramesStyle", noscript: "startTagNoScript", noframes: "startTagNoFramesStyle", base: "startTagBaseBasefontBgsoundLink", basefont: "startTagBaseBasefontBgsoundLink", bgsound: "startTagBaseBasefontBgsoundLink", link: "startTagBaseBasefontBgsoundLink", meta: "startTagMeta", "-default": "startTagOther" }, t.inHead.end_tag_handlers = { head: "endTagHead", html: "endTagHtmlBodyBr", body: "endTagHtmlBodyBr", br: "endTagHtmlBodyBr", "-default": "endTagOther" }, t.inHead.processEOF = function () {
          var t = e.currentStackItem().localName;["title", "style", "script"].indexOf(t) != -1 && (e.parseError("expected-named-closing-tag-but-got-eof", { name: t }), e.popElement()), this.anythingElse(), e.insertionMode.processEOF();
        }, t.inHead.processCharacters = function (t) {
          var n = t.takeLeadingWhitespace();n && e.insertText(n);if (!t.length) return;this.anythingElse(), e.insertionMode.processCharacters(t);
        }, t.inHead.startTagHtml = function (e, n) {
          t.inBody.processStartTag(e, n);
        }, t.inHead.startTagHead = function (t, n) {
          e.parseError("two-heads-are-not-better-than-one");
        }, t.inHead.startTagTitle = function (t, n) {
          e.processGenericRCDATAStartTag(t, n);
        }, t.inHead.startTagNoScript = function (t, n) {
          if (e.scriptingEnabled) return e.processGenericRawTextStartTag(t, n);e.insertElement(t, n), e.setInsertionMode("inHeadNoscript");
        }, t.inHead.startTagNoFramesStyle = function (t, n) {
          e.processGenericRawTextStartTag(t, n);
        }, t.inHead.startTagScript = function (t, n) {
          e.insertElement(t, n), e.tokenizer.setState(u.SCRIPT_DATA), e.originalInsertionMode = e.insertionModeName, e.setInsertionMode("text");
        }, t.inHead.startTagBaseBasefontBgsoundLink = function (t, n) {
          e.insertSelfClosingElement(t, n);
        }, t.inHead.startTagMeta = function (t, n) {
          e.insertSelfClosingElement(t, n);
        }, t.inHead.startTagOther = function (t, n, r) {
          this.anythingElse(), e.insertionMode.processStartTag(t, n, r);
        }, t.inHead.endTagHead = function (t) {
          e.openElements.item(e.openElements.length - 1).localName == "head" ? e.openElements.pop() : e.parseError("unexpected-end-tag", { name: "head" }), e.setInsertionMode("afterHead");
        }, t.inHead.endTagHtmlBodyBr = function (t) {
          this.anythingElse(), e.insertionMode.processEndTag(t);
        }, t.inHead.endTagOther = function (t) {
          e.parseError("unexpected-end-tag", { name: t });
        }, t.inHead.anythingElse = function () {
          this.endTagHead("head");
        }, t.afterHead = Object.create(t.base), t.afterHead.start_tag_handlers = { html: "startTagHtml", head: "startTagHead", body: "startTagBody", frameset: "startTagFrameset", base: "startTagFromHead", link: "startTagFromHead", meta: "startTagFromHead", script: "startTagFromHead", style: "startTagFromHead", title: "startTagFromHead", "-default": "startTagOther" }, t.afterHead.end_tag_handlers = { body: "endTagBodyHtmlBr", html: "endTagBodyHtmlBr", br: "endTagBodyHtmlBr", "-default": "endTagOther" }, t.afterHead.processEOF = function () {
          this.anythingElse(), e.insertionMode.processEOF();
        }, t.afterHead.processCharacters = function (t) {
          var n = t.takeLeadingWhitespace();n && e.insertText(n);if (!t.length) return;this.anythingElse(), e.insertionMode.processCharacters(t);
        }, t.afterHead.startTagHtml = function (e, n) {
          t.inBody.processStartTag(e, n);
        }, t.afterHead.startTagBody = function (t, n) {
          e.framesetOk = !1, e.insertBodyElement(n), e.setInsertionMode("inBody");
        }, t.afterHead.startTagFrameset = function (t, n) {
          e.insertElement(t, n), e.setInsertionMode("inFrameset");
        }, t.afterHead.startTagFromHead = function (n, r, i) {
          e.parseError("unexpected-start-tag-out-of-my-head", { name: n }), e.openElements.push(e.head), t.inHead.processStartTag(n, r, i), e.openElements.remove(e.head);
        }, t.afterHead.startTagHead = function (t, n, r) {
          e.parseError("unexpected-start-tag", { name: t });
        }, t.afterHead.startTagOther = function (t, n, r) {
          this.anythingElse(), e.insertionMode.processStartTag(t, n, r);
        }, t.afterHead.endTagBodyHtmlBr = function (t) {
          this.anythingElse(), e.insertionMode.processEndTag(t);
        }, t.afterHead.endTagOther = function (t) {
          e.parseError("unexpected-end-tag", { name: t });
        }, t.afterHead.anythingElse = function () {
          e.insertBodyElement([]), e.setInsertionMode("inBody"), e.framesetOk = !0;
        }, t.inBody = Object.create(t.base), t.inBody.start_tag_handlers = { html: "startTagHtml", head: "startTagMisplaced", base: "startTagProcessInHead", basefont: "startTagProcessInHead", bgsound: "startTagProcessInHead", link: "startTagProcessInHead", meta: "startTagProcessInHead", noframes: "startTagProcessInHead", script: "startTagProcessInHead", style: "startTagProcessInHead", title: "startTagProcessInHead", body: "startTagBody", form: "startTagForm", plaintext: "startTagPlaintext", a: "startTagA", button: "startTagButton", xmp: "startTagXmp", table: "startTagTable", hr: "startTagHr", image: "startTagImage", input: "startTagInput", textarea: "startTagTextarea", select: "startTagSelect", isindex: "startTagIsindex", applet: "startTagAppletMarqueeObject", marquee: "startTagAppletMarqueeObject", object: "startTagAppletMarqueeObject", li: "startTagListItem", dd: "startTagListItem", dt: "startTagListItem", address: "startTagCloseP", article: "startTagCloseP", aside: "startTagCloseP", blockquote: "startTagCloseP", center: "startTagCloseP", details: "startTagCloseP", dir: "startTagCloseP", div: "startTagCloseP", dl: "startTagCloseP", fieldset: "startTagCloseP", figcaption: "startTagCloseP", figure: "startTagCloseP", footer: "startTagCloseP", header: "startTagCloseP", hgroup: "startTagCloseP", main: "startTagCloseP", menu: "startTagCloseP", nav: "startTagCloseP", ol: "startTagCloseP", p: "startTagCloseP", section: "startTagCloseP", summary: "startTagCloseP", ul: "startTagCloseP", listing: "startTagPreListing", pre: "startTagPreListing", b: "startTagFormatting", big: "startTagFormatting", code: "startTagFormatting", em: "startTagFormatting", font: "startTagFormatting", i: "startTagFormatting", s: "startTagFormatting", small: "startTagFormatting", strike: "startTagFormatting", strong: "startTagFormatting", tt: "startTagFormatting", u: "startTagFormatting", nobr: "startTagNobr", area: "startTagVoidFormatting", br: "startTagVoidFormatting", embed: "startTagVoidFormatting", img: "startTagVoidFormatting", keygen: "startTagVoidFormatting", wbr: "startTagVoidFormatting", param: "startTagParamSourceTrack", source: "startTagParamSourceTrack", track: "startTagParamSourceTrack", iframe: "startTagIFrame", noembed: "startTagRawText", noscript: "startTagRawText", h1: "startTagHeading", h2: "startTagHeading", h3: "startTagHeading", h4: "startTagHeading", h5: "startTagHeading", h6: "startTagHeading", caption: "startTagMisplaced", col: "startTagMisplaced", colgroup: "startTagMisplaced", frame: "startTagMisplaced", frameset: "startTagFrameset", tbody: "startTagMisplaced", td: "startTagMisplaced", tfoot: "startTagMisplaced", th: "startTagMisplaced", thead: "startTagMisplaced", tr: "startTagMisplaced", option: "startTagOptionOptgroup", optgroup: "startTagOptionOptgroup", math: "startTagMath", svg: "startTagSVG", rt: "startTagRpRt", rp: "startTagRpRt", "-default": "startTagOther" }, t.inBody.end_tag_handlers = { p: "endTagP", body: "endTagBody", html: "endTagHtml", address: "endTagBlock", article: "endTagBlock", aside: "endTagBlock", blockquote: "endTagBlock", button: "endTagBlock", center: "endTagBlock", details: "endTagBlock", dir: "endTagBlock", div: "endTagBlock", dl: "endTagBlock", fieldset: "endTagBlock", figcaption: "endTagBlock", figure: "endTagBlock", footer: "endTagBlock", header: "endTagBlock", hgroup: "endTagBlock", listing: "endTagBlock", main: "endTagBlock", menu: "endTagBlock", nav: "endTagBlock", ol: "endTagBlock", pre: "endTagBlock", section: "endTagBlock", summary: "endTagBlock", ul: "endTagBlock", form: "endTagForm", applet: "endTagAppletMarqueeObject", marquee: "endTagAppletMarqueeObject", object: "endTagAppletMarqueeObject", dd: "endTagListItem", dt: "endTagListItem", li: "endTagListItem", h1: "endTagHeading", h2: "endTagHeading", h3: "endTagHeading", h4: "endTagHeading", h5: "endTagHeading", h6: "endTagHeading", a: "endTagFormatting", b: "endTagFormatting", big: "endTagFormatting", code: "endTagFormatting", em: "endTagFormatting", font: "endTagFormatting", i: "endTagFormatting", nobr: "endTagFormatting", s: "endTagFormatting", small: "endTagFormatting", strike: "endTagFormatting", strong: "endTagFormatting", tt: "endTagFormatting", u: "endTagFormatting", br: "endTagBr", "-default": "endTagOther" }, t.inBody.processCharacters = function (t) {
          e.shouldSkipLeadingNewline && (e.shouldSkipLeadingNewline = !1, t.skipAtMostOneLeadingNewline()), e.reconstructActiveFormattingElements();var n = t.takeRemaining();n = n.replace(/\u0000/g, function (t, n) {
            return e.parseError("invalid-codepoint"), "";
          });if (!n) return;e.insertText(n), e.framesetOk && !d(n) && (e.framesetOk = !1);
        }, t.inBody.startTagHtml = function (t, n) {
          e.parseError("non-html-root"), e.addAttributesToElement(e.openElements.rootNode, n);
        }, t.inBody.startTagProcessInHead = function (e, n) {
          t.inHead.processStartTag(e, n);
        }, t.inBody.startTagBody = function (t, n) {
          e.parseError("unexpected-start-tag", { name: "body" }), e.openElements.length == 1 || e.openElements.item(1).localName != "body" ? r.ok(e.context) : (e.framesetOk = !1, e.addAttributesToElement(e.openElements.bodyElement, n));
        }, t.inBody.startTagFrameset = function (t, n) {
          e.parseError("unexpected-start-tag", { name: "frameset" });if (e.openElements.length == 1 || e.openElements.item(1).localName != "body") r.ok(e.context);else if (e.framesetOk) {
            e.detachFromParent(e.openElements.bodyElement);while (e.openElements.length > 1) e.openElements.pop();e.insertElement(t, n), e.setInsertionMode("inFrameset");
          }
        }, t.inBody.startTagCloseP = function (t, n) {
          e.openElements.inButtonScope("p") && this.endTagP("p"), e.insertElement(t, n);
        }, t.inBody.startTagPreListing = function (t, n) {
          e.openElements.inButtonScope("p") && this.endTagP("p"), e.insertElement(t, n), e.framesetOk = !1, e.shouldSkipLeadingNewline = !0;
        }, t.inBody.startTagForm = function (t, n) {
          e.form ? e.parseError("unexpected-start-tag", { name: t }) : (e.openElements.inButtonScope("p") && this.endTagP("p"), e.insertElement(t, n), e.form = e.currentStackItem());
        }, t.inBody.startTagRpRt = function (t, n) {
          e.openElements.inScope("ruby") && (e.generateImpliedEndTags(), e.currentStackItem().localName != "ruby" && e.parseError("unexpected-start-tag", { name: t })), e.insertElement(t, n);
        }, t.inBody.startTagListItem = function (t, n) {
          var r = { li: ["li"], dd: ["dd", "dt"], dt: ["dd", "dt"] },
              i = r[t],
              s = e.openElements;for (var o = s.length - 1; o >= 0; o--) {
            var u = s.item(o);if (i.indexOf(u.localName) != -1) {
              e.insertionMode.processEndTag(u.localName);break;
            }if (u.isSpecial() && u.localName !== "p" && u.localName !== "address" && u.localName !== "div") break;
          }e.openElements.inButtonScope("p") && this.endTagP("p"), e.insertElement(t, n), e.framesetOk = !1;
        }, t.inBody.startTagPlaintext = function (t, n) {
          e.openElements.inButtonScope("p") && this.endTagP("p"), e.insertElement(t, n), e.tokenizer.setState(u.PLAINTEXT);
        }, t.inBody.startTagHeading = function (t, n) {
          e.openElements.inButtonScope("p") && this.endTagP("p"), e.currentStackItem().isNumberedHeader() && (e.parseError("unexpected-start-tag", { name: t }), e.popElement()), e.insertElement(t, n);
        }, t.inBody.startTagA = function (t, n) {
          var r = e.elementInActiveFormattingElements("a");r && (e.parseError("unexpected-start-tag-implies-end-tag", { startName: "a", endName: "a" }), e.adoptionAgencyEndTag("a"), e.openElements.contains(r) && e.openElements.remove(r), e.removeElementFromActiveFormattingElements(r)), e.reconstructActiveFormattingElements(), e.insertFormattingElement(t, n);
        }, t.inBody.startTagFormatting = function (t, n) {
          e.reconstructActiveFormattingElements(), e.insertFormattingElement(t, n);
        }, t.inBody.startTagNobr = function (t, n) {
          e.reconstructActiveFormattingElements(), e.openElements.inScope("nobr") && (e.parseError("unexpected-start-tag-implies-end-tag", { startName: "nobr", endName: "nobr" }), this.processEndTag("nobr"), e.reconstructActiveFormattingElements()), e.insertFormattingElement(t, n);
        }, t.inBody.startTagButton = function (t, n) {
          e.openElements.inScope("button") ? (e.parseError("unexpected-start-tag-implies-end-tag", { startName: "button", endName: "button" }), this.processEndTag("button"), e.insertionMode.processStartTag(t, n)) : (e.framesetOk = !1, e.reconstructActiveFormattingElements(), e.insertElement(t, n));
        }, t.inBody.startTagAppletMarqueeObject = function (t, n) {
          e.reconstructActiveFormattingElements(), e.insertElement(t, n), e.activeFormattingElements.push(l), e.framesetOk = !1;
        }, t.inBody.endTagAppletMarqueeObject = function (t) {
          e.openElements.inScope(t) ? (e.generateImpliedEndTags(), e.currentStackItem().localName != t && e.parseError("end-tag-too-early", { name: t }), e.openElements.popUntilPopped(t), e.clearActiveFormattingElements()) : e.parseError("unexpected-end-tag", { name: t });
        }, t.inBody.startTagXmp = function (t, n) {
          e.openElements.inButtonScope("p") && this.processEndTag("p"), e.reconstructActiveFormattingElements(), e.processGenericRawTextStartTag(t, n), e.framesetOk = !1;
        }, t.inBody.startTagTable = function (t, n) {
          e.compatMode !== "quirks" && e.openElements.inButtonScope("p") && this.processEndTag("p"), e.insertElement(t, n), e.setInsertionMode("inTable"), e.framesetOk = !1;
        }, t.inBody.startTagVoidFormatting = function (t, n) {
          e.reconstructActiveFormattingElements(), e.insertSelfClosingElement(t, n), e.framesetOk = !1;
        }, t.inBody.startTagParamSourceTrack = function (t, n) {
          e.insertSelfClosingElement(t, n);
        }, t.inBody.startTagHr = function (t, n) {
          e.openElements.inButtonScope("p") && this.endTagP("p"), e.insertSelfClosingElement(t, n), e.framesetOk = !1;
        }, t.inBody.startTagImage = function (t, n) {
          e.parseError("unexpected-start-tag-treated-as", { originalName: "image", newName: "img" }), this.processStartTag("img", n);
        }, t.inBody.startTagInput = function (t, n) {
          var r = e.framesetOk;this.startTagVoidFormatting(t, n);for (var i in n) if (n[i].nodeName == "type") {
            n[i].nodeValue.toLowerCase() == "hidden" && (e.framesetOk = r);break;
          }
        }, t.inBody.startTagIsindex = function (t, n) {
          e.parseError("deprecated-tag", { name: "isindex" }), e.selfClosingFlagAcknowledged = !0;if (e.form) return;var r = [],
              i = [],
              s = "This is a searchable index. Enter search keywords: ";for (var o in n) switch (n[o].nodeName) {case "action":
              r.push({ nodeName: "action", nodeValue: n[o].nodeValue });break;case "prompt":
              s = n[o].nodeValue;break;case "name":
              break;default:
              i.push({ nodeName: n[o].nodeName, nodeValue: n[o].nodeValue });}i.push({ nodeName: "name", nodeValue: "isindex" }), this.processStartTag("form", r), this.processStartTag("hr"), this.processStartTag("label"), this.processCharacters(new m(s)), this.processStartTag("input", i), this.processEndTag("label"), this.processStartTag("hr"), this.processEndTag("form");
        }, t.inBody.startTagTextarea = function (t, n) {
          e.insertElement(t, n), e.tokenizer.setState(u.RCDATA), e.originalInsertionMode = e.insertionModeName, e.shouldSkipLeadingNewline = !0, e.framesetOk = !1, e.setInsertionMode("text");
        }, t.inBody.startTagIFrame = function (t, n) {
          e.framesetOk = !1, this.startTagRawText(t, n);
        }, t.inBody.startTagRawText = function (t, n) {
          e.processGenericRawTextStartTag(t, n);
        }, t.inBody.startTagSelect = function (t, n) {
          e.reconstructActiveFormattingElements(), e.insertElement(t, n), e.framesetOk = !1;var r = e.insertionModeName;r == "inTable" || r == "inCaption" || r == "inColumnGroup" || r == "inTableBody" || r == "inRow" || r == "inCell" ? e.setInsertionMode("inSelectInTable") : e.setInsertionMode("inSelect");
        }, t.inBody.startTagMisplaced = function (t, n) {
          e.parseError("unexpected-start-tag-ignored", { name: t });
        }, t.inBody.endTagMisplaced = function (t) {
          e.parseError("unexpected-end-tag", { name: t });
        }, t.inBody.endTagBr = function (t) {
          e.parseError("unexpected-end-tag-treated-as", { originalName: "br", newName: "br element" }), e.reconstructActiveFormattingElements(), e.insertElement(t, []), e.popElement();
        }, t.inBody.startTagOptionOptgroup = function (t, n) {
          e.currentStackItem().localName == "option" && e.popElement(), e.reconstructActiveFormattingElements(), e.insertElement(t, n);
        }, t.inBody.startTagOther = function (t, n) {
          e.reconstructActiveFormattingElements(), e.insertElement(t, n);
        }, t.inBody.endTagOther = function (t) {
          var n;for (var r = e.openElements.length - 1; r > 0; r--) {
            n = e.openElements.item(r);if (n.localName == t) {
              e.generateImpliedEndTags(t), e.currentStackItem().localName != t && e.parseError("unexpected-end-tag", { name: t }), e.openElements.remove_openElements_until(function (e) {
                return e === n;
              });break;
            }if (n.isSpecial()) {
              e.parseError("unexpected-end-tag", { name: t });break;
            }
          }
        }, t.inBody.startTagMath = function (t, n, r) {
          e.reconstructActiveFormattingElements(), n = e.adjustMathMLAttributes(n), n = e.adjustForeignAttributes(n), e.insertForeignElement(t, n, "http://www.w3.org/1998/Math/MathML", r);
        }, t.inBody.startTagSVG = function (t, n, r) {
          e.reconstructActiveFormattingElements(), n = e.adjustSVGAttributes(n), n = e.adjustForeignAttributes(n), e.insertForeignElement(t, n, "http://www.w3.org/2000/svg", r);
        }, t.inBody.endTagP = function (t) {
          e.openElements.inButtonScope("p") ? (e.generateImpliedEndTags("p"), e.currentStackItem().localName != "p" && e.parseError("unexpected-implied-end-tag", { name: "p" }), e.openElements.popUntilPopped(t)) : (e.parseError("unexpected-end-tag", { name: "p" }), this.startTagCloseP("p", []), this.endTagP("p"));
        }, t.inBody.endTagBody = function (t) {
          if (!e.openElements.inScope("body")) {
            e.parseError("unexpected-end-tag", { name: t });return;
          }e.currentStackItem().localName != "body" && e.parseError("expected-one-end-tag-but-got-another", { expectedName: e.currentStackItem().localName, gotName: t }), e.setInsertionMode("afterBody");
        }, t.inBody.endTagHtml = function (t) {
          if (!e.openElements.inScope("body")) {
            e.parseError("unexpected-end-tag", { name: t });return;
          }e.currentStackItem().localName != "body" && e.parseError("expected-one-end-tag-but-got-another", { expectedName: e.currentStackItem().localName, gotName: t }), e.setInsertionMode("afterBody"), e.insertionMode.processEndTag(t);
        }, t.inBody.endTagBlock = function (t) {
          e.openElements.inScope(t) ? (e.generateImpliedEndTags(), e.currentStackItem().localName != t && e.parseError("end-tag-too-early", { name: t }), e.openElements.popUntilPopped(t)) : e.parseError("unexpected-end-tag", { name: t });
        }, t.inBody.endTagForm = function (t) {
          var n = e.form;e.form = null, !n || !e.openElements.inScope(t) ? e.parseError("unexpected-end-tag", { name: t }) : (e.generateImpliedEndTags(), e.currentStackItem() != n && e.parseError("end-tag-too-early-ignored", { name: "form" }), e.openElements.remove(n));
        }, t.inBody.endTagListItem = function (t) {
          e.openElements.inListItemScope(t) ? (e.generateImpliedEndTags(t), e.currentStackItem().localName != t && e.parseError("end-tag-too-early", { name: t }), e.openElements.popUntilPopped(t)) : e.parseError("unexpected-end-tag", { name: t });
        }, t.inBody.endTagHeading = function (t) {
          if (!e.openElements.hasNumberedHeaderElementInScope()) {
            e.parseError("unexpected-end-tag", { name: t });return;
          }e.generateImpliedEndTags(), e.currentStackItem().localName != t && e.parseError("end-tag-too-early", { name: t }), e.openElements.remove_openElements_until(function (e) {
            return e.isNumberedHeader();
          });
        }, t.inBody.endTagFormatting = function (t, n) {
          e.adoptionAgencyEndTag(t) || this.endTagOther(t, n);
        }, t.inCaption = Object.create(t.base), t.inCaption.start_tag_handlers = { html: "startTagHtml", caption: "startTagTableElement", col: "startTagTableElement", colgroup: "startTagTableElement", tbody: "startTagTableElement", td: "startTagTableElement", tfoot: "startTagTableElement", thead: "startTagTableElement", tr: "startTagTableElement", "-default": "startTagOther" }, t.inCaption.end_tag_handlers = { caption: "endTagCaption", table: "endTagTable", body: "endTagIgnore", col: "endTagIgnore", colgroup: "endTagIgnore", html: "endTagIgnore", tbody: "endTagIgnore", td: "endTagIgnore", tfood: "endTagIgnore", thead: "endTagIgnore", tr: "endTagIgnore", "-default": "endTagOther" }, t.inCaption.processCharacters = function (e) {
          t.inBody.processCharacters(e);
        }, t.inCaption.startTagTableElement = function (t, n) {
          e.parseError("unexpected-end-tag", { name: t });var r = !e.openElements.inTableScope("caption");e.insertionMode.processEndTag("caption"), r || e.insertionMode.processStartTag(t, n);
        }, t.inCaption.startTagOther = function (e, n, r) {
          t.inBody.processStartTag(e, n, r);
        }, t.inCaption.endTagCaption = function (t) {
          e.openElements.inTableScope("caption") ? (e.generateImpliedEndTags(), e.currentStackItem().localName != "caption" && e.parseError("expected-one-end-tag-but-got-another", { gotName: "caption", expectedName: e.currentStackItem().localName }), e.openElements.popUntilPopped("caption"), e.clearActiveFormattingElements(), e.setInsertionMode("inTable")) : (r.ok(e.context), e.parseError("unexpected-end-tag", { name: t }));
        }, t.inCaption.endTagTable = function (t) {
          e.parseError("unexpected-end-table-in-caption");var n = !e.openElements.inTableScope("caption");e.insertionMode.processEndTag("caption"), n || e.insertionMode.processEndTag(t);
        }, t.inCaption.endTagIgnore = function (t) {
          e.parseError("unexpected-end-tag", { name: t });
        }, t.inCaption.endTagOther = function (e) {
          t.inBody.processEndTag(e);
        }, t.inCell = Object.create(t.base), t.inCell.start_tag_handlers = { html: "startTagHtml", caption: "startTagTableOther", col: "startTagTableOther", colgroup: "startTagTableOther", tbody: "startTagTableOther", td: "startTagTableOther", tfoot: "startTagTableOther", th: "startTagTableOther", thead: "startTagTableOther", tr: "startTagTableOther", "-default": "startTagOther" }, t.inCell.end_tag_handlers = { td: "endTagTableCell", th: "endTagTableCell", body: "endTagIgnore", caption: "endTagIgnore", col: "endTagIgnore", colgroup: "endTagIgnore", html: "endTagIgnore", table: "endTagImply", tbody: "endTagImply", tfoot: "endTagImply", thead: "endTagImply", tr: "endTagImply", "-default": "endTagOther" }, t.inCell.processCharacters = function (e) {
          t.inBody.processCharacters(e);
        }, t.inCell.startTagTableOther = function (t, n, r) {
          e.openElements.inTableScope("td") || e.openElements.inTableScope("th") ? (this.closeCell(), e.insertionMode.processStartTag(t, n, r)) : e.parseError("unexpected-start-tag", { name: t });
        }, t.inCell.startTagOther = function (e, n, r) {
          t.inBody.processStartTag(e, n, r);
        }, t.inCell.endTagTableCell = function (t) {
          e.openElements.inTableScope(t) ? (e.generateImpliedEndTags(t), e.currentStackItem().localName != t.toLowerCase() ? (e.parseError("unexpected-cell-end-tag", { name: t }), e.openElements.popUntilPopped(t)) : e.popElement(), e.clearActiveFormattingElements(), e.setInsertionMode("inRow")) : e.parseError("unexpected-end-tag", { name: t });
        }, t.inCell.endTagIgnore = function (t) {
          e.parseError("unexpected-end-tag", { name: t });
        }, t.inCell.endTagImply = function (t) {
          e.openElements.inTableScope(t) ? (this.closeCell(), e.insertionMode.processEndTag(t)) : e.parseError("unexpected-end-tag", { name: t });
        }, t.inCell.endTagOther = function (e) {
          t.inBody.processEndTag(e);
        }, t.inCell.closeCell = function () {
          e.openElements.inTableScope("td") ? this.endTagTableCell("td") : e.openElements.inTableScope("th") && this.endTagTableCell("th");
        }, t.inColumnGroup = Object.create(t.base), t.inColumnGroup.start_tag_handlers = { html: "startTagHtml", col: "startTagCol", "-default": "startTagOther" }, t.inColumnGroup.end_tag_handlers = { colgroup: "endTagColgroup", col: "endTagCol", "-default": "endTagOther" }, t.inColumnGroup.ignoreEndTagColgroup = function () {
          return e.currentStackItem().localName == "html";
        }, t.inColumnGroup.processCharacters = function (t) {
          var n = t.takeLeadingWhitespace();n && e.insertText(n);if (!t.length) return;var r = this.ignoreEndTagColgroup();this.endTagColgroup("colgroup"), r || e.insertionMode.processCharacters(t);
        }, t.inColumnGroup.startTagCol = function (t, n) {
          e.insertSelfClosingElement(t, n);
        }, t.inColumnGroup.startTagOther = function (t, n, r) {
          var i = this.ignoreEndTagColgroup();this.endTagColgroup("colgroup"), i || e.insertionMode.processStartTag(t, n, r);
        }, t.inColumnGroup.endTagColgroup = function (t) {
          this.ignoreEndTagColgroup() ? (r.ok(e.context), e.parseError("unexpected-end-tag", { name: t })) : (e.popElement(), e.setInsertionMode("inTable"));
        }, t.inColumnGroup.endTagCol = function (t) {
          e.parseError("no-end-tag", { name: "col" });
        }, t.inColumnGroup.endTagOther = function (t) {
          var n = this.ignoreEndTagColgroup();this.endTagColgroup("colgroup"), n || e.insertionMode.processEndTag(t);
        }, t.inForeignContent = Object.create(t.base), t.inForeignContent.processStartTag = function (t, n, r) {
          if (["b", "big", "blockquote", "body", "br", "center", "code", "dd", "div", "dl", "dt", "em", "embed", "h1", "h2", "h3", "h4", "h5", "h6", "head", "hr", "i", "img", "li", "listing", "menu", "meta", "nobr", "ol", "p", "pre", "ruby", "s", "small", "span", "strong", "strike", "sub", "sup", "table", "tt", "u", "ul", "var"].indexOf(t) != -1 || t == "font" && n.some(function (e) {
            return ["color", "face", "size"].indexOf(e.nodeName) >= 0;
          })) {
            e.parseError("unexpected-html-element-in-foreign-content", { name: t });while (e.currentStackItem().isForeign() && !e.currentStackItem().isHtmlIntegrationPoint() && !e.currentStackItem().isMathMLTextIntegrationPoint()) e.openElements.pop();e.insertionMode.processStartTag(t, n, r);return;
          }e.currentStackItem().namespaceURI == "http://www.w3.org/1998/Math/MathML" && (n = e.adjustMathMLAttributes(n)), e.currentStackItem().namespaceURI == "http://www.w3.org/2000/svg" && (t = e.adjustSVGTagNameCase(t), n = e.adjustSVGAttributes(n)), n = e.adjustForeignAttributes(n), e.insertForeignElement(t, n, e.currentStackItem().namespaceURI, r);
        }, t.inForeignContent.processEndTag = function (t) {
          var n = e.currentStackItem(),
              r = e.openElements.length - 1;n.localName.toLowerCase() != t && e.parseError("unexpected-end-tag", { name: t });for (;;) {
            if (r === 0) break;if (n.localName.toLowerCase() == t) {
              while (e.openElements.pop() != n);break;
            }r -= 1, n = e.openElements.item(r);if (n.isForeign()) continue;e.insertionMode.processEndTag(t);break;
          }
        }, t.inForeignContent.processCharacters = function (t) {
          var n = t.takeRemaining();n = n.replace(/\u0000/g, function (t, n) {
            return e.parseError("invalid-codepoint"), "\ufffd";
          }), e.framesetOk && !d(n) && (e.framesetOk = !1), e.insertText(n);
        }, t.inHeadNoscript = Object.create(t.base), t.inHeadNoscript.start_tag_handlers = { html: "startTagHtml", basefont: "startTagBasefontBgsoundLinkMetaNoframesStyle", bgsound: "startTagBasefontBgsoundLinkMetaNoframesStyle", link: "startTagBasefontBgsoundLinkMetaNoframesStyle", meta: "startTagBasefontBgsoundLinkMetaNoframesStyle", noframes: "startTagBasefontBgsoundLinkMetaNoframesStyle", style: "startTagBasefontBgsoundLinkMetaNoframesStyle", head: "startTagHeadNoscript", noscript: "startTagHeadNoscript", "-default": "startTagOther" }, t.inHeadNoscript.end_tag_handlers = { noscript: "endTagNoscript", br: "endTagBr", "-default": "endTagOther" }, t.inHeadNoscript.processCharacters = function (t) {
          var n = t.takeLeadingWhitespace();n && e.insertText(n);if (!t.length) return;e.parseError("unexpected-char-in-frameset"), this.anythingElse(), e.insertionMode.processCharacters(t);
        }, t.inHeadNoscript.processComment = function (e) {
          t.inHead.processComment(e);
        }, t.inHeadNoscript.startTagBasefontBgsoundLinkMetaNoframesStyle = function (e, n) {
          t.inHead.processStartTag(e, n);
        }, t.inHeadNoscript.startTagHeadNoscript = function (t, n) {
          e.parseError("unexpected-start-tag-in-frameset", { name: t });
        }, t.inHeadNoscript.startTagOther = function (t, n) {
          e.parseError("unexpected-start-tag-in-frameset", { name: t }), this.anythingElse(), e.insertionMode.processStartTag(t, n);
        }, t.inHeadNoscript.endTagBr = function (t, n) {
          e.parseError("unexpected-end-tag-in-frameset", { name: t }), this.anythingElse(), e.insertionMode.processEndTag(t, n);
        }, t.inHeadNoscript.endTagNoscript = function (t, n) {
          e.popElement(), e.setInsertionMode("inHead");
        }, t.inHeadNoscript.endTagOther = function (t, n) {
          e.parseError("unexpected-end-tag-in-frameset", { name: t });
        }, t.inHeadNoscript.anythingElse = function () {
          e.popElement(), e.setInsertionMode("inHead");
        }, t.inFrameset = Object.create(t.base), t.inFrameset.start_tag_handlers = { html: "startTagHtml", frameset: "startTagFrameset", frame: "startTagFrame", noframes: "startTagNoframes", "-default": "startTagOther" }, t.inFrameset.end_tag_handlers = { frameset: "endTagFrameset", noframes: "endTagNoframes", "-default": "endTagOther" }, t.inFrameset.processCharacters = function (t) {
          e.parseError("unexpected-char-in-frameset");
        }, t.inFrameset.startTagFrameset = function (t, n) {
          e.insertElement(t, n);
        }, t.inFrameset.startTagFrame = function (t, n) {
          e.insertSelfClosingElement(t, n);
        }, t.inFrameset.startTagNoframes = function (e, n) {
          t.inBody.processStartTag(e, n);
        }, t.inFrameset.startTagOther = function (t, n) {
          e.parseError("unexpected-start-tag-in-frameset", { name: t });
        }, t.inFrameset.endTagFrameset = function (t, n) {
          e.currentStackItem().localName == "html" ? e.parseError("unexpected-frameset-in-frameset-innerhtml") : e.popElement(), !e.context && e.currentStackItem().localName != "frameset" && e.setInsertionMode("afterFrameset");
        }, t.inFrameset.endTagNoframes = function (e) {
          t.inBody.processEndTag(e);
        }, t.inFrameset.endTagOther = function (t) {
          e.parseError("unexpected-end-tag-in-frameset", { name: t });
        }, t.inTable = Object.create(t.base), t.inTable.start_tag_handlers = { html: "startTagHtml", caption: "startTagCaption", colgroup: "startTagColgroup", col: "startTagCol", table: "startTagTable", tbody: "startTagRowGroup", tfoot: "startTagRowGroup", thead: "startTagRowGroup", td: "startTagImplyTbody", th: "startTagImplyTbody", tr: "startTagImplyTbody", style: "startTagStyleScript", script: "startTagStyleScript", input: "startTagInput", form: "startTagForm", "-default": "startTagOther" }, t.inTable.end_tag_handlers = { table: "endTagTable", body: "endTagIgnore", caption: "endTagIgnore", col: "endTagIgnore", colgroup: "endTagIgnore", html: "endTagIgnore", tbody: "endTagIgnore", td: "endTagIgnore", tfoot: "endTagIgnore", th: "endTagIgnore", thead: "endTagIgnore", tr: "endTagIgnore", "-default": "endTagOther" }, t.inTable.processCharacters = function (n) {
          if (e.currentStackItem().isFosterParenting()) {
            var r = e.insertionModeName;e.setInsertionMode("inTableText"), e.originalInsertionMode = r, e.insertionMode.processCharacters(n);
          } else e.redirectAttachToFosterParent = !0, t.inBody.processCharacters(n), e.redirectAttachToFosterParent = !1;
        }, t.inTable.startTagCaption = function (t, n) {
          e.openElements.popUntilTableScopeMarker(), e.activeFormattingElements.push(l), e.insertElement(t, n), e.setInsertionMode("inCaption");
        }, t.inTable.startTagColgroup = function (t, n) {
          e.openElements.popUntilTableScopeMarker(), e.insertElement(t, n), e.setInsertionMode("inColumnGroup");
        }, t.inTable.startTagCol = function (t, n) {
          this.startTagColgroup("colgroup", []), e.insertionMode.processStartTag(t, n);
        }, t.inTable.startTagRowGroup = function (t, n) {
          e.openElements.popUntilTableScopeMarker(), e.insertElement(t, n), e.setInsertionMode("inTableBody");
        }, t.inTable.startTagImplyTbody = function (t, n) {
          this.startTagRowGroup("tbody", []), e.insertionMode.processStartTag(t, n);
        }, t.inTable.startTagTable = function (t, n) {
          e.parseError("unexpected-start-tag-implies-end-tag", { startName: "table", endName: "table" }), e.insertionMode.processEndTag("table"), e.context || e.insertionMode.processStartTag(t, n);
        }, t.inTable.startTagStyleScript = function (e, n) {
          t.inHead.processStartTag(e, n);
        }, t.inTable.startTagInput = function (t, n) {
          for (var r in n) if (n[r].nodeName.toLowerCase() == "type") {
            if (n[r].nodeValue.toLowerCase() == "hidden") {
              e.parseError("unexpected-hidden-input-in-table"), e.insertElement(t, n), e.openElements.pop();return;
            }break;
          }this.startTagOther(t, n);
        }, t.inTable.startTagForm = function (t, n) {
          e.parseError("unexpected-form-in-table"), e.form || (e.insertElement(t, n), e.form = e.currentStackItem(), e.openElements.pop());
        }, t.inTable.startTagOther = function (n, r, i) {
          e.parseError("unexpected-start-tag-implies-table-voodoo", { name: n }), e.redirectAttachToFosterParent = !0, t.inBody.processStartTag(n, r, i), e.redirectAttachToFosterParent = !1;
        }, t.inTable.endTagTable = function (t) {
          e.openElements.inTableScope(t) ? (e.generateImpliedEndTags(), e.currentStackItem().localName != t && e.parseError("end-tag-too-early-named", { gotName: "table", expectedName: e.currentStackItem().localName }), e.openElements.popUntilPopped("table"), e.resetInsertionMode()) : (r.ok(e.context), e.parseError("unexpected-end-tag", { name: t }));
        }, t.inTable.endTagIgnore = function (t) {
          e.parseError("unexpected-end-tag", { name: t });
        }, t.inTable.endTagOther = function (n) {
          e.parseError("unexpected-end-tag-implies-table-voodoo", { name: n }), e.redirectAttachToFosterParent = !0, t.inBody.processEndTag(n), e.redirectAttachToFosterParent = !1;
        }, t.inTableText = Object.create(t.base), t.inTableText.flushCharacters = function () {
          var t = e.pendingTableCharacters.join("");p(t) ? e.insertText(t) : (e.redirectAttachToFosterParent = !0, e.reconstructActiveFormattingElements(), e.insertText(t), e.framesetOk = !1, e.redirectAttachToFosterParent = !1), e.pendingTableCharacters = [];
        }, t.inTableText.processComment = function (t) {
          this.flushCharacters(), e.setInsertionMode(e.originalInsertionMode), e.insertionMode.processComment(t);
        }, t.inTableText.processEOF = function (t) {
          this.flushCharacters(), e.setInsertionMode(e.originalInsertionMode), e.insertionMode.processEOF();
        }, t.inTableText.processCharacters = function (t) {
          var n = t.takeRemaining();n = n.replace(/\u0000/g, function (t, n) {
            return e.parseError("invalid-codepoint"), "";
          });if (!n) return;e.pendingTableCharacters.push(n);
        }, t.inTableText.processStartTag = function (t, n, r) {
          this.flushCharacters(), e.setInsertionMode(e.originalInsertionMode), e.insertionMode.processStartTag(t, n, r);
        }, t.inTableText.processEndTag = function (t, n) {
          this.flushCharacters(), e.setInsertionMode(e.originalInsertionMode), e.insertionMode.processEndTag(t, n);
        }, t.inTableBody = Object.create(t.base), t.inTableBody.start_tag_handlers = { html: "startTagHtml", tr: "startTagTr", td: "startTagTableCell", th: "startTagTableCell", caption: "startTagTableOther", col: "startTagTableOther", colgroup: "startTagTableOther", tbody: "startTagTableOther", tfoot: "startTagTableOther", thead: "startTagTableOther", "-default": "startTagOther" }, t.inTableBody.end_tag_handlers = { table: "endTagTable", tbody: "endTagTableRowGroup", tfoot: "endTagTableRowGroup", thead: "endTagTableRowGroup", body: "endTagIgnore", caption: "endTagIgnore", col: "endTagIgnore", colgroup: "endTagIgnore", html: "endTagIgnore", td: "endTagIgnore", th: "endTagIgnore", tr: "endTagIgnore", "-default": "endTagOther" }, t.inTableBody.processCharacters = function (e) {
          t.inTable.processCharacters(e);
        }, t.inTableBody.startTagTr = function (t, n) {
          e.openElements.popUntilTableBodyScopeMarker(), e.insertElement(t, n), e.setInsertionMode("inRow");
        }, t.inTableBody.startTagTableCell = function (t, n) {
          e.parseError("unexpected-cell-in-table-body", { name: t }), this.startTagTr("tr", []), e.insertionMode.processStartTag(t, n);
        }, t.inTableBody.startTagTableOther = function (t, n) {
          e.openElements.inTableScope("tbody") || e.openElements.inTableScope("thead") || e.openElements.inTableScope("tfoot") ? (e.openElements.popUntilTableBodyScopeMarker(), this.endTagTableRowGroup(e.currentStackItem().localName), e.insertionMode.processStartTag(t, n)) : e.parseError("unexpected-start-tag", { name: t });
        }, t.inTableBody.startTagOther = function (e, n) {
          t.inTable.processStartTag(e, n);
        }, t.inTableBody.endTagTableRowGroup = function (t) {
          e.openElements.inTableScope(t) ? (e.openElements.popUntilTableBodyScopeMarker(), e.popElement(), e.setInsertionMode("inTable")) : e.parseError("unexpected-end-tag-in-table-body", { name: t });
        }, t.inTableBody.endTagTable = function (t) {
          e.openElements.inTableScope("tbody") || e.openElements.inTableScope("thead") || e.openElements.inTableScope("tfoot") ? (e.openElements.popUntilTableBodyScopeMarker(), this.endTagTableRowGroup(e.currentStackItem().localName), e.insertionMode.processEndTag(t)) : e.parseError("unexpected-end-tag", { name: t });
        }, t.inTableBody.endTagIgnore = function (t) {
          e.parseError("unexpected-end-tag-in-table-body", { name: t });
        }, t.inTableBody.endTagOther = function (e) {
          t.inTable.processEndTag(e);
        }, t.inSelect = Object.create(t.base), t.inSelect.start_tag_handlers = { html: "startTagHtml", option: "startTagOption", optgroup: "startTagOptgroup", select: "startTagSelect", input: "startTagInput", keygen: "startTagInput", textarea: "startTagInput", script: "startTagScript", "-default": "startTagOther" }, t.inSelect.end_tag_handlers = { option: "endTagOption", optgroup: "endTagOptgroup", select: "endTagSelect", caption: "endTagTableElements", table: "endTagTableElements", tbody: "endTagTableElements", tfoot: "endTagTableElements", thead: "endTagTableElements", tr: "endTagTableElements", td: "endTagTableElements", th: "endTagTableElements", "-default": "endTagOther" }, t.inSelect.processCharacters = function (t) {
          var n = t.takeRemaining();n = n.replace(/\u0000/g, function (t, n) {
            return e.parseError("invalid-codepoint"), "";
          });if (!n) return;e.insertText(n);
        }, t.inSelect.startTagOption = function (t, n) {
          e.currentStackItem().localName == "option" && e.popElement(), e.insertElement(t, n);
        }, t.inSelect.startTagOptgroup = function (t, n) {
          e.currentStackItem().localName == "option" && e.popElement(), e.currentStackItem().localName == "optgroup" && e.popElement(), e.insertElement(t, n);
        }, t.inSelect.endTagOption = function (t) {
          if (e.currentStackItem().localName !== "option") {
            e.parseError("unexpected-end-tag-in-select", { name: t });return;
          }e.popElement();
        }, t.inSelect.endTagOptgroup = function (t) {
          e.currentStackItem().localName == "option" && e.openElements.item(e.openElements.length - 2).localName == "optgroup" && e.popElement(), e.currentStackItem().localName == "optgroup" ? e.popElement() : e.parseError("unexpected-end-tag-in-select", { name: "optgroup" });
        }, t.inSelect.startTagSelect = function (t) {
          e.parseError("unexpected-select-in-select"), this.endTagSelect("select");
        }, t.inSelect.endTagSelect = function (t) {
          e.openElements.inTableScope("select") ? (e.openElements.popUntilPopped("select"), e.resetInsertionMode()) : e.parseError("unexpected-end-tag", { name: t });
        }, t.inSelect.startTagInput = function (t, n) {
          e.parseError("unexpected-input-in-select"), e.openElements.inSelectScope("select") && (this.endTagSelect("select"), e.insertionMode.processStartTag(t, n));
        }, t.inSelect.startTagScript = function (e, n) {
          t.inHead.processStartTag(e, n);
        }, t.inSelect.endTagTableElements = function (t) {
          e.parseError("unexpected-end-tag-in-select", { name: t }), e.openElements.inTableScope(t) && (this.endTagSelect("select"), e.insertionMode.processEndTag(t));
        }, t.inSelect.startTagOther = function (t, n) {
          e.parseError("unexpected-start-tag-in-select", { name: t });
        }, t.inSelect.endTagOther = function (t) {
          e.parseError("unexpected-end-tag-in-select", { name: t });
        }, t.inSelectInTable = Object.create(t.base), t.inSelectInTable.start_tag_handlers = { caption: "startTagTable", table: "startTagTable", tbody: "startTagTable", tfoot: "startTagTable", thead: "startTagTable", tr: "startTagTable", td: "startTagTable", th: "startTagTable", "-default": "startTagOther" }, t.inSelectInTable.end_tag_handlers = { caption: "endTagTable", table: "endTagTable", tbody: "endTagTable", tfoot: "endTagTable", thead: "endTagTable", tr: "endTagTable", td: "endTagTable", th: "endTagTable", "-default": "endTagOther" }, t.inSelectInTable.processCharacters = function (e) {
          t.inSelect.processCharacters(e);
        }, t.inSelectInTable.startTagTable = function (t, n) {
          e.parseError("unexpected-table-element-start-tag-in-select-in-table", { name: t }), this.endTagOther("select"), e.insertionMode.processStartTag(t, n);
        }, t.inSelectInTable.startTagOther = function (e, n, r) {
          t.inSelect.processStartTag(e, n, r);
        }, t.inSelectInTable.endTagTable = function (t) {
          e.parseError("unexpected-table-element-end-tag-in-select-in-table", { name: t }), e.openElements.inTableScope(t) && (this.endTagOther("select"), e.insertionMode.processEndTag(t));
        }, t.inSelectInTable.endTagOther = function (e) {
          t.inSelect.processEndTag(e);
        }, t.inRow = Object.create(t.base), t.inRow.start_tag_handlers = { html: "startTagHtml", td: "startTagTableCell", th: "startTagTableCell", caption: "startTagTableOther", col: "startTagTableOther", colgroup: "startTagTableOther", tbody: "startTagTableOther", tfoot: "startTagTableOther", thead: "startTagTableOther", tr: "startTagTableOther", "-default": "startTagOther" }, t.inRow.end_tag_handlers = { tr: "endTagTr", table: "endTagTable", tbody: "endTagTableRowGroup", tfoot: "endTagTableRowGroup", thead: "endTagTableRowGroup", body: "endTagIgnore", caption: "endTagIgnore", col: "endTagIgnore", colgroup: "endTagIgnore", html: "endTagIgnore", td: "endTagIgnore", th: "endTagIgnore", "-default": "endTagOther" }, t.inRow.processCharacters = function (e) {
          t.inTable.processCharacters(e);
        }, t.inRow.startTagTableCell = function (t, n) {
          e.openElements.popUntilTableRowScopeMarker(), e.insertElement(t, n), e.setInsertionMode("inCell"), e.activeFormattingElements.push(l);
        }, t.inRow.startTagTableOther = function (t, n) {
          var r = this.ignoreEndTagTr();this.endTagTr("tr"), r || e.insertionMode.processStartTag(t, n);
        }, t.inRow.startTagOther = function (e, n, r) {
          t.inTable.processStartTag(e, n, r);
        }, t.inRow.endTagTr = function (t) {
          this.ignoreEndTagTr() ? (r.ok(e.context), e.parseError("unexpected-end-tag", { name: t })) : (e.openElements.popUntilTableRowScopeMarker(), e.popElement(), e.setInsertionMode("inTableBody"));
        }, t.inRow.endTagTable = function (t) {
          var n = this.ignoreEndTagTr();this.endTagTr("tr"), n || e.insertionMode.processEndTag(t);
        }, t.inRow.endTagTableRowGroup = function (t) {
          e.openElements.inTableScope(t) ? (this.endTagTr("tr"), e.insertionMode.processEndTag(t)) : e.parseError("unexpected-end-tag", { name: t });
        }, t.inRow.endTagIgnore = function (t) {
          e.parseError("unexpected-end-tag-in-table-row", { name: t });
        }, t.inRow.endTagOther = function (e) {
          t.inTable.processEndTag(e);
        }, t.inRow.ignoreEndTagTr = function () {
          return !e.openElements.inTableScope("tr");
        }, t.afterAfterFrameset = Object.create(t.base), t.afterAfterFrameset.start_tag_handlers = { html: "startTagHtml", noframes: "startTagNoFrames", "-default": "startTagOther" }, t.afterAfterFrameset.processEOF = function () {}, t.afterAfterFrameset.processComment = function (t) {
          e.insertComment(t, e.document);
        }, t.afterAfterFrameset.processCharacters = function (t) {
          var n = t.takeRemaining(),
              r = "";for (var i = 0; i < n.length; i++) {
            var s = n[i];c(s) && (r += s);
          }r && (e.reconstructActiveFormattingElements(), e.insertText(r)), r.length < n.length && e.parseError("expected-eof-but-got-char");
        }, t.afterAfterFrameset.startTagNoFrames = function (e, n) {
          t.inHead.processStartTag(e, n);
        }, t.afterAfterFrameset.startTagOther = function (t, n, r) {
          e.parseError("expected-eof-but-got-start-tag", { name: t });
        }, t.afterAfterFrameset.processEndTag = function (t, n) {
          e.parseError("expected-eof-but-got-end-tag", { name: t });
        }, t.text = Object.create(t.base), t.text.start_tag_handlers = { "-default": "startTagOther" }, t.text.end_tag_handlers = { script: "endTagScript", "-default": "endTagOther" }, t.text.processCharacters = function (t) {
          e.shouldSkipLeadingNewline && (e.shouldSkipLeadingNewline = !1, t.skipAtMostOneLeadingNewline());var n = t.takeRemaining();if (!n) return;e.insertText(n);
        }, t.text.processEOF = function () {
          e.parseError("expected-named-closing-tag-but-got-eof", { name: e.currentStackItem().localName }), e.openElements.pop(), e.setInsertionMode(e.originalInsertionMode), e.insertionMode.processEOF();
        }, t.text.startTagOther = function (e) {
          throw "Tried to process start tag " + e + " in RCDATA/RAWTEXT mode";
        }, t.text.endTagScript = function (t) {
          var n = e.openElements.pop();r.ok(n.localName == "script"), e.setInsertionMode(e.originalInsertionMode);
        }, t.text.endTagOther = function (t) {
          e.openElements.pop(), e.setInsertionMode(e.originalInsertionMode);
        };
      }function y(e, t) {
        return e.replace(new RegExp("{[0-9a-z-]+}", "gi"), function (e) {
          return t[e.slice(1, -1)] || e;
        });
      }var r = e("assert"),
          i = e("./messages.json"),
          s = e("./constants"),
          o = e("events").EventEmitter,
          u = e("./Tokenizer").Tokenizer,
          a = e("./ElementStack").ElementStack,
          f = e("./StackItem").StackItem,
          l = {};m.prototype.skipAtMostOneLeadingNewline = function () {
        this.characters[this.current] === "\n" && this.current++;
      }, m.prototype.skipLeadingWhitespace = function () {
        while (c(this.characters[this.current])) if (++this.current == this.end) return;
      }, m.prototype.skipLeadingNonWhitespace = function () {
        while (!c(this.characters[this.current])) if (++this.current == this.end) return;
      }, m.prototype.takeRemaining = function () {
        return this.characters.substring(this.current);
      }, m.prototype.takeLeadingWhitespace = function () {
        var e = this.current;return this.skipLeadingWhitespace(), e === this.current ? "" : this.characters.substring(e, this.current - e);
      }, Object.defineProperty(m.prototype, "length", { get: function () {
          return this.end - this.current;
        } }), g.prototype.setInsertionMode = function (e) {
        this.insertionMode = this.insertionModes[e], this.insertionModeName = e;
      }, g.prototype.adoptionAgencyEndTag = function (e) {
        function i(e) {
          return e === r;
        }var t = 8,
            n = 3,
            r,
            s = 0;while (s++ < t) {
          r = this.elementInActiveFormattingElements(e);if (!r || this.openElements.contains(r) && !this.openElements.inScope(r.localName)) return this.parseError("adoption-agency-1.1", { name: e }), !1;if (!this.openElements.contains(r)) return this.parseError("adoption-agency-1.2", { name: e }), this.removeElementFromActiveFormattingElements(r), !0;this.openElements.inScope(r.localName) || this.parseError("adoption-agency-4.4", { name: e }), r != this.currentStackItem() && this.parseError("adoption-agency-1.3", { name: e });var o = this.openElements.furthestBlockForFormattingElement(r.node);if (!o) return this.openElements.remove_openElements_until(i), this.removeElementFromActiveFormattingElements(r), !0;var u = this.openElements.elements.indexOf(r),
              a = this.openElements.item(u - 1),
              l = this.activeFormattingElements.indexOf(r),
              c = o,
              h = o,
              p = this.openElements.elements.indexOf(c),
              d = 0;while (d++ < n) {
            p -= 1, c = this.openElements.item(p);if (this.activeFormattingElements.indexOf(c) < 0) {
              this.openElements.elements.splice(p, 1);continue;
            }if (c == r) break;h == o && (l = this.activeFormattingElements.indexOf(c) + 1);var v = this.createElement(c.namespaceURI, c.localName, c.attributes),
                m = new f(c.namespaceURI, c.localName, c.attributes, v);this.activeFormattingElements[this.activeFormattingElements.indexOf(c)] = m, this.openElements.elements[this.openElements.elements.indexOf(c)] = m, c = m, this.detachFromParent(h.node), this.attachNode(h.node, c.node), h = c;
          }this.detachFromParent(h.node), a.isFosterParenting() ? this.insertIntoFosterParent(h.node) : this.attachNode(h.node, a.node);var v = this.createElement("http://www.w3.org/1999/xhtml", r.localName, r.attributes),
              g = new f(r.namespaceURI, r.localName, r.attributes, v);this.reparentChildren(o.node, v), this.attachNode(v, o.node), this.removeElementFromActiveFormattingElements(r), this.activeFormattingElements.splice(Math.min(l, this.activeFormattingElements.length), 0, g), this.openElements.remove(r), this.openElements.elements.splice(this.openElements.elements.indexOf(o) + 1, 0, g);
        }return !0;
      }, g.prototype.start = function () {
        throw "Not mplemented";
      }, g.prototype.startTokenization = function (e) {
        this.tokenizer = e, this.compatMode = "no quirks", this.originalInsertionMode = "initial", this.framesetOk = !0, this.openElements = new a(), this.activeFormattingElements = [], this.start();if (this.context) {
          switch (this.context) {case "title":case "textarea":
              this.tokenizer.setState(u.RCDATA);break;case "style":case "xmp":case "iframe":case "noembed":case "noframes":
              this.tokenizer.setState(u.RAWTEXT);break;case "script":
              this.tokenizer.setState(u.SCRIPT_DATA);break;case "noscript":
              this.scriptingEnabled && this.tokenizer.setState(u.RAWTEXT);break;case "plaintext":
              this.tokenizer.setState(u.PLAINTEXT);}this.insertHtmlElement(), this.resetInsertionMode();
        } else this.setInsertionMode("initial");
      }, g.prototype.processToken = function (e) {
        this.selfClosingFlagAcknowledged = !1;var t = this.openElements.top || null,
            n;!t || !t.isForeign() || t.isMathMLTextIntegrationPoint() && (e.type == "StartTag" && !(e.name in { mglyph: 0, malignmark: 0 }) || e.type === "Characters") || t.namespaceURI == "http://www.w3.org/1998/Math/MathML" && t.localName == "annotation-xml" && e.type == "StartTag" && e.name == "svg" || t.isHtmlIntegrationPoint() && e.type in { StartTag: 0, Characters: 0 } || e.type == "EOF" ? n = this.insertionMode : n = this.insertionModes.inForeignContent;switch (e.type) {case "Characters":
            var r = new m(e.data);n.processCharacters(r);break;case "Comment":
            n.processComment(e.data);break;case "StartTag":
            n.processStartTag(e.name, e.data, e.selfClosing);break;case "EndTag":
            n.processEndTag(e.name);break;case "Doctype":
            n.processDoctype(e.name, e.publicId, e.systemId, e.forceQuirks);break;case "EOF":
            n.processEOF();}
      }, g.prototype.isCdataSectionAllowed = function () {
        return this.openElements.length > 0 && this.currentStackItem().isForeign();
      }, g.prototype.isSelfClosingFlagAcknowledged = function () {
        return this.selfClosingFlagAcknowledged;
      }, g.prototype.createElement = function (e, t, n) {
        throw new Error("Not implemented");
      }, g.prototype.attachNode = function (e, t) {
        throw new Error("Not implemented");
      }, g.prototype.attachNodeToFosterParent = function (e, t, n) {
        throw new Error("Not implemented");
      }, g.prototype.detachFromParent = function (e) {
        throw new Error("Not implemented");
      }, g.prototype.addAttributesToElement = function (e, t) {
        throw new Error("Not implemented");
      }, g.prototype.insertHtmlElement = function (e) {
        var t = this.createElement("http://www.w3.org/1999/xhtml", "html", e);return this.attachNode(t, this.document), this.openElements.pushHtmlElement(new f("http://www.w3.org/1999/xhtml", "html", e, t)), t;
      }, g.prototype.insertHeadElement = function (e) {
        var t = this.createElement("http://www.w3.org/1999/xhtml", "head", e);return this.head = new f("http://www.w3.org/1999/xhtml", "head", e, t), this.attachNode(t, this.openElements.top.node), this.openElements.pushHeadElement(this.head), t;
      }, g.prototype.insertBodyElement = function (e) {
        var t = this.createElement("http://www.w3.org/1999/xhtml", "body", e);return this.attachNode(t, this.openElements.top.node), this.openElements.pushBodyElement(new f("http://www.w3.org/1999/xhtml", "body", e, t)), t;
      }, g.prototype.insertIntoFosterParent = function (e) {
        var t = this.openElements.findIndex("table"),
            n = this.openElements.item(t).node;if (t === 0) return this.attachNode(e, n);this.attachNodeToFosterParent(e, n, this.openElements.item(t - 1).node);
      }, g.prototype.insertElement = function (e, t, n, r) {
        n || (n = "http://www.w3.org/1999/xhtml");var i = this.createElement(n, e, t);this.shouldFosterParent() ? this.insertIntoFosterParent(i) : this.attachNode(i, this.openElements.top.node), r || this.openElements.push(new f(n, e, t, i));
      }, g.prototype.insertFormattingElement = function (e, t) {
        this.insertElement(e, t, "http://www.w3.org/1999/xhtml"), this.appendElementToActiveFormattingElements(this.currentStackItem());
      }, g.prototype.insertSelfClosingElement = function (e, t) {
        this.selfClosingFlagAcknowledged = !0, this.insertElement(e, t, "http://www.w3.org/1999/xhtml", !0);
      }, g.prototype.insertForeignElement = function (e, t, n, r) {
        r && (this.selfClosingFlagAcknowledged = !0), this.insertElement(e, t, n, r);
      }, g.prototype.insertComment = function (e, t) {
        throw new Error("Not implemented");
      }, g.prototype.insertDoctype = function (e, t, n) {
        throw new Error("Not implemented");
      }, g.prototype.insertText = function (e) {
        throw new Error("Not implemented");
      }, g.prototype.currentStackItem = function () {
        return this.openElements.top;
      }, g.prototype.popElement = function () {
        return this.openElements.pop();
      }, g.prototype.shouldFosterParent = function () {
        return this.redirectAttachToFosterParent && this.currentStackItem().isFosterParenting();
      }, g.prototype.generateImpliedEndTags = function (e) {
        var t = this.openElements.top.localName;["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"].indexOf(t) != -1 && t != e && (this.popElement(), this.generateImpliedEndTags(e));
      }, g.prototype.reconstructActiveFormattingElements = function () {
        if (this.activeFormattingElements.length === 0) return;var e = this.activeFormattingElements.length - 1,
            t = this.activeFormattingElements[e];if (t == l || this.openElements.contains(t)) return;while (t != l && !this.openElements.contains(t)) {
          e -= 1, t = this.activeFormattingElements[e];if (!t) break;
        }for (;;) {
          e += 1, t = this.activeFormattingElements[e], this.insertElement(t.localName, t.attributes);var n = this.currentStackItem();this.activeFormattingElements[e] = n;if (n == this.activeFormattingElements[this.activeFormattingElements.length - 1]) break;
        }
      }, g.prototype.ensureNoahsArkCondition = function (e) {
        var t = 3;if (this.activeFormattingElements.length < t) return;var n = [],
            r = e.attributes.length;for (var i = this.activeFormattingElements.length - 1; i >= 0; i--) {
          var s = this.activeFormattingElements[i];if (s === l) break;if (e.localName !== s.localName || e.namespaceURI !== s.namespaceURI) continue;if (s.attributes.length != r) continue;n.push(s);
        }if (n.length < t) return;var o = [],
            u = e.attributes;for (var i = 0; i < u.length; i++) {
          var a = u[i];for (var f = 0; f < n.length; f++) {
            var s = n[f],
                c = v(s, a.nodeName);c && c.nodeValue === a.nodeValue && o.push(s);
          }if (o.length < t) return;n = o, o = [];
        }for (var i = t - 1; i < n.length; i++) this.removeElementFromActiveFormattingElements(n[i]);
      }, g.prototype.appendElementToActiveFormattingElements = function (e) {
        this.ensureNoahsArkCondition(e), this.activeFormattingElements.push(e);
      }, g.prototype.removeElementFromActiveFormattingElements = function (e) {
        var t = this.activeFormattingElements.indexOf(e);t >= 0 && this.activeFormattingElements.splice(t, 1);
      }, g.prototype.elementInActiveFormattingElements = function (e) {
        var t = this.activeFormattingElements;for (var n = t.length - 1; n >= 0; n--) {
          if (t[n] == l) break;if (t[n].localName == e) return t[n];
        }return !1;
      }, g.prototype.clearActiveFormattingElements = function () {
        while (this.activeFormattingElements.length !== 0 && this.activeFormattingElements.pop() != l);
      }, g.prototype.reparentChildren = function (e, t) {
        throw new Error("Not implemented");
      }, g.prototype.setFragmentContext = function (e) {
        this.context = e;
      }, g.prototype.parseError = function (e, t) {
        if (!this.errorHandler) return;var n = y(i[e], t);this.errorHandler.error(n, this.tokenizer._inputStream.location(), e);
      }, g.prototype.resetInsertionMode = function () {
        var e = !1,
            t = null;for (var n = this.openElements.length - 1; n >= 0; n--) {
          t = this.openElements.item(n), n === 0 && (r.ok(this.context), e = !0, t = new f("http://www.w3.org/1999/xhtml", this.context, [], null));if (t.namespaceURI === "http://www.w3.org/1999/xhtml") {
            if (t.localName === "select") return this.setInsertionMode("inSelect");if (t.localName === "td" || t.localName === "th") return this.setInsertionMode("inCell");if (t.localName === "tr") return this.setInsertionMode("inRow");if (t.localName === "tbody" || t.localName === "thead" || t.localName === "tfoot") return this.setInsertionMode("inTableBody");if (t.localName === "caption") return this.setInsertionMode("inCaption");if (t.localName === "colgroup") return this.setInsertionMode("inColumnGroup");if (t.localName === "table") return this.setInsertionMode("inTable");if (t.localName === "head" && !e) return this.setInsertionMode("inHead");if (t.localName === "body") return this.setInsertionMode("inBody");if (t.localName === "frameset") return this.setInsertionMode("inFrameset");if (t.localName === "html") return this.openElements.headElement ? this.setInsertionMode("afterHead") : this.setInsertionMode("beforeHead");
          }if (e) return this.setInsertionMode("inBody");
        }
      }, g.prototype.processGenericRCDATAStartTag = function (e, t) {
        this.insertElement(e, t), this.tokenizer.setState(u.RCDATA), this.originalInsertionMode = this.insertionModeName, this.setInsertionMode("text");
      }, g.prototype.processGenericRawTextStartTag = function (e, t) {
        this.insertElement(e, t), this.tokenizer.setState(u.RAWTEXT), this.originalInsertionMode = this.insertionModeName, this.setInsertionMode("text");
      }, g.prototype.adjustMathMLAttributes = function (e) {
        return e.forEach(function (e) {
          e.namespaceURI = "http://www.w3.org/1998/Math/MathML", s.MATHMLAttributeMap[e.nodeName] && (e.nodeName = s.MATHMLAttributeMap[e.nodeName]);
        }), e;
      }, g.prototype.adjustSVGTagNameCase = function (e) {
        return s.SVGTagMap[e] || e;
      }, g.prototype.adjustSVGAttributes = function (e) {
        return e.forEach(function (e) {
          e.namespaceURI = "http://www.w3.org/2000/svg", s.SVGAttributeMap[e.nodeName] && (e.nodeName = s.SVGAttributeMap[e.nodeName]);
        }), e;
      }, g.prototype.adjustForeignAttributes = function (e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t],
              r = s.ForeignAttributeMap[n.nodeName];r && (n.nodeName = r.localName, n.prefix = r.prefix, n.namespaceURI = r.namespaceURI);
        }return e;
      }, n.TreeBuilder = g;
    }, { "./ElementStack": 1, "./StackItem": 4, "./Tokenizer": 5, "./constants": 7, "./messages.json": 8, assert: 13, events: 16 }], 7: [function (e, t, n) {
      n.SVGTagMap = { altglyph: "altGlyph", altglyphdef: "altGlyphDef", altglyphitem: "altGlyphItem", animatecolor: "animateColor", animatemotion: "animateMotion", animatetransform: "animateTransform", clippath: "clipPath", feblend: "feBlend", fecolormatrix: "feColorMatrix", fecomponenttransfer: "feComponentTransfer", fecomposite: "feComposite", feconvolvematrix: "feConvolveMatrix", fediffuselighting: "feDiffuseLighting", fedisplacementmap: "feDisplacementMap", fedistantlight: "feDistantLight", feflood: "feFlood", fefunca: "feFuncA", fefuncb: "feFuncB", fefuncg: "feFuncG", fefuncr: "feFuncR", fegaussianblur: "feGaussianBlur", feimage: "feImage", femerge: "feMerge", femergenode: "feMergeNode", femorphology: "feMorphology", feoffset: "feOffset", fepointlight: "fePointLight", fespecularlighting: "feSpecularLighting", fespotlight: "feSpotLight", fetile: "feTile", feturbulence: "feTurbulence", foreignobject: "foreignObject", glyphref: "glyphRef", lineargradient: "linearGradient", radialgradient: "radialGradient", textpath: "textPath" }, n.MATHMLAttributeMap = { definitionurl: "definitionURL" }, n.SVGAttributeMap = { attributename: "attributeName", attributetype: "attributeType", basefrequency: "baseFrequency", baseprofile: "baseProfile", calcmode: "calcMode", clippathunits: "clipPathUnits", contentscripttype: "contentScriptType", contentstyletype: "contentStyleType", diffuseconstant: "diffuseConstant", edgemode: "edgeMode", externalresourcesrequired: "externalResourcesRequired", filterres: "filterRes", filterunits: "filterUnits", glyphref: "glyphRef", gradienttransform: "gradientTransform", gradientunits: "gradientUnits", kernelmatrix: "kernelMatrix", kernelunitlength: "kernelUnitLength", keypoints: "keyPoints", keysplines: "keySplines", keytimes: "keyTimes", lengthadjust: "lengthAdjust", limitingconeangle: "limitingConeAngle", markerheight: "markerHeight", markerunits: "markerUnits", markerwidth: "markerWidth", maskcontentunits: "maskContentUnits", maskunits: "maskUnits", numoctaves: "numOctaves", pathlength: "pathLength", patterncontentunits: "patternContentUnits", patterntransform: "patternTransform", patternunits: "patternUnits", pointsatx: "pointsAtX", pointsaty: "pointsAtY", pointsatz: "pointsAtZ", preservealpha: "preserveAlpha", preserveaspectratio: "preserveAspectRatio", primitiveunits: "primitiveUnits", refx: "refX", refy: "refY", repeatcount: "repeatCount", repeatdur: "repeatDur", requiredextensions: "requiredExtensions", requiredfeatures: "requiredFeatures", specularconstant: "specularConstant", specularexponent: "specularExponent", spreadmethod: "spreadMethod", startoffset: "startOffset", stddeviation: "stdDeviation", stitchtiles: "stitchTiles", surfacescale: "surfaceScale", systemlanguage: "systemLanguage", tablevalues: "tableValues", targetx: "targetX", targety: "targetY", textlength: "textLength", viewbox: "viewBox", viewtarget: "viewTarget", xchannelselector: "xChannelSelector", ychannelselector: "yChannelSelector", zoomandpan: "zoomAndPan" }, n.ForeignAttributeMap = { "xlink:actuate": { prefix: "xlink", localName: "actuate", namespaceURI: "http://www.w3.org/1999/xlink" }, "xlink:arcrole": { prefix: "xlink", localName: "arcrole", namespaceURI: "http://www.w3.org/1999/xlink" }, "xlink:href": { prefix: "xlink", localName: "href", namespaceURI: "http://www.w3.org/1999/xlink" }, "xlink:role": { prefix: "xlink", localName: "role", namespaceURI: "http://www.w3.org/1999/xlink" }, "xlink:show": { prefix: "xlink", localName: "show", namespaceURI: "http://www.w3.org/1999/xlink" }, "xlink:title": { prefix: "xlink", localName: "title", namespaceURI: "http://www.w3.org/1999/xlink" }, "xlink:type": { prefix: "xlink", localName: "title", namespaceURI: "http://www.w3.org/1999/xlink" }, "xml:base": { prefix: "xml", localName: "base", namespaceURI: "http://www.w3.org/XML/1998/namespace" }, "xml:lang": { prefix: "xml", localName: "lang", namespaceURI: "http://www.w3.org/XML/1998/namespace" }, "xml:space": { prefix: "xml", localName: "space", namespaceURI: "http://www.w3.org/XML/1998/namespace" }, xmlns: { prefix: null, localName: "xmlns", namespaceURI: "http://www.w3.org/2000/xmlns/" }, "xmlns:xlink": { prefix: "xmlns", localName: "xlink", namespaceURI: "http://www.w3.org/2000/xmlns/" } };
    }, {}], 8: [function (e, t, n) {
      t.exports = { "null-character": "Null character in input stream, replaced with U+FFFD.", "invalid-codepoint": "Invalid codepoint in stream", "incorrectly-placed-solidus": "Solidus (/) incorrectly placed in tag.", "incorrect-cr-newline-entity": "Incorrect CR newline entity, replaced with LF.", "illegal-windows-1252-entity": "Entity used with illegal number (windows-1252 reference).", "cant-convert-numeric-entity": "Numeric entity couldn't be converted to character (codepoint U+{charAsInt}).", "invalid-numeric-entity-replaced": "Numeric entity represents an illegal codepoint. Expanded to the C1 controls range.", "numeric-entity-without-semicolon": "Numeric entity didn't end with ';'.", "expected-numeric-entity-but-got-eof": "Numeric entity expected. Got end of file instead.", "expected-numeric-entity": "Numeric entity expected but none found.", "named-entity-without-semicolon": "Named entity didn't end with ';'.", "expected-named-entity": "Named entity expected. Got none.", "attributes-in-end-tag": "End tag contains unexpected attributes.", "self-closing-flag-on-end-tag": "End tag contains unexpected self-closing flag.", "bare-less-than-sign-at-eof": "End of file after <.", "expected-tag-name-but-got-right-bracket": "Expected tag name. Got '>' instead.", "expected-tag-name-but-got-question-mark": "Expected tag name. Got '?' instead. (HTML doesn't support processing instructions.)", "expected-tag-name": "Expected tag name. Got something else instead.", "expected-closing-tag-but-got-right-bracket": "Expected closing tag. Got '>' instead. Ignoring '</>'.", "expected-closing-tag-but-got-eof": "Expected closing tag. Unexpected end of file.", "expected-closing-tag-but-got-char": "Expected closing tag. Unexpected character '{data}' found.", "eof-in-tag-name": "Unexpected end of file in the tag name.", "expected-attribute-name-but-got-eof": "Unexpected end of file. Expected attribute name instead.", "eof-in-attribute-name": "Unexpected end of file in attribute name.", "invalid-character-in-attribute-name": "Invalid character in attribute name.", "duplicate-attribute": "Dropped duplicate attribute '{name}' on tag.", "expected-end-of-tag-but-got-eof": "Unexpected end of file. Expected = or end of tag.", "expected-attribute-value-but-got-eof": "Unexpected end of file. Expected attribute value.", "expected-attribute-value-but-got-right-bracket": "Expected attribute value. Got '>' instead.", "unexpected-character-in-unquoted-attribute-value": "Unexpected character in unquoted attribute", "invalid-character-after-attribute-name": "Unexpected character after attribute name.", "unexpected-character-after-attribute-value": "Unexpected character after attribute value.", "eof-in-attribute-value-double-quote": 'Unexpected end of file in attribute value (").', "eof-in-attribute-value-single-quote": "Unexpected end of file in attribute value (').", "eof-in-attribute-value-no-quotes": "Unexpected end of file in attribute value.", "eof-after-attribute-value": "Unexpected end of file after attribute value.", "unexpected-eof-after-solidus-in-tag": "Unexpected end of file in tag. Expected >.", "unexpected-character-after-solidus-in-tag": "Unexpected character after / in tag. Expected >.", "expected-dashes-or-doctype": "Expected '--' or 'DOCTYPE'. Not found.", "unexpected-bang-after-double-dash-in-comment": "Unexpected ! after -- in comment.", "incorrect-comment": "Incorrect comment.", "eof-in-comment": "Unexpected end of file in comment.", "eof-in-comment-end-dash": "Unexpected end of file in comment (-).", "unexpected-dash-after-double-dash-in-comment": "Unexpected '-' after '--' found in comment.", "eof-in-comment-double-dash": "Unexpected end of file in comment (--).", "eof-in-comment-end-bang-state": "Unexpected end of file in comment.", "unexpected-char-in-comment": "Unexpected character in comment found.", "need-space-after-doctype": "No space after literal string 'DOCTYPE'.", "expected-doctype-name-but-got-right-bracket": "Unexpected > character. Expected DOCTYPE name.", "expected-doctype-name-but-got-eof": "Unexpected end of file. Expected DOCTYPE name.", "eof-in-doctype-name": "Unexpected end of file in DOCTYPE name.", "eof-in-doctype": "Unexpected end of file in DOCTYPE.", "expected-space-or-right-bracket-in-doctype": "Expected space or '>'. Got '{data}'.", "unexpected-end-of-doctype": "Unexpected end of DOCTYPE.", "unexpected-char-in-doctype": "Unexpected character in DOCTYPE.", "eof-in-bogus-doctype": "Unexpected end of file in bogus doctype.", "eof-in-innerhtml": "Unexpected EOF in inner html mode.", "unexpected-doctype": "Unexpected DOCTYPE. Ignored.", "non-html-root": "html needs to be the first start tag.", "expected-doctype-but-got-eof": "Unexpected End of file. Expected DOCTYPE.", "unknown-doctype": "Erroneous DOCTYPE. Expected <!DOCTYPE html>.", "quirky-doctype": "Quirky doctype. Expected <!DOCTYPE html>.", "almost-standards-doctype": "Almost standards mode doctype. Expected <!DOCTYPE html>.", "obsolete-doctype": "Obsolete doctype. Expected <!DOCTYPE html>.", "expected-doctype-but-got-chars": "Non-space characters found without seeing a doctype first. Expected e.g. <!DOCTYPE html>.", "expected-doctype-but-got-start-tag": "Start tag seen without seeing a doctype first. Expected e.g. <!DOCTYPE html>.", "expected-doctype-but-got-end-tag": "End tag seen without seeing a doctype first. Expected e.g. <!DOCTYPE html>.", "end-tag-after-implied-root": "Unexpected end tag ({name}) after the (implied) root element.", "expected-named-closing-tag-but-got-eof": "Unexpected end of file. Expected end tag ({name}).", "two-heads-are-not-better-than-one": "Unexpected start tag head in existing head. Ignored.", "unexpected-end-tag": "Unexpected end tag ({name}). Ignored.", "unexpected-implied-end-tag": "End tag {name} implied, but there were open elements.", "unexpected-start-tag-out-of-my-head": "Unexpected start tag ({name}) that can be in head. Moved.", "unexpected-start-tag": "Unexpected start tag ({name}).", "missing-end-tag": "Missing end tag ({name}).", "missing-end-tags": "Missing end tags ({name}).", "unexpected-start-tag-implies-end-tag": "Unexpected start tag ({startName}) implies end tag ({endName}).", "unexpected-start-tag-treated-as": "Unexpected start tag ({originalName}). Treated as {newName}.", "deprecated-tag": "Unexpected start tag {name}. Don't use it!", "unexpected-start-tag-ignored": "Unexpected start tag {name}. Ignored.", "expected-one-end-tag-but-got-another": "Unexpected end tag ({gotName}). Missing end tag ({expectedName}).", "end-tag-too-early": "End tag ({name}) seen too early. Expected other end tag.", "end-tag-too-early-named": "Unexpected end tag ({gotName}). Expected end tag ({expectedName}.", "end-tag-too-early-ignored": "End tag ({name}) seen too early. Ignored.", "adoption-agency-1.1": "End tag ({name}) violates step 1, paragraph 1 of the adoption agency algorithm.", "adoption-agency-1.2": "End tag ({name}) violates step 1, paragraph 2 of the adoption agency algorithm.", "adoption-agency-1.3": "End tag ({name}) violates step 1, paragraph 3 of the adoption agency algorithm.", "adoption-agency-4.4": "End tag ({name}) violates step 4, paragraph 4 of the adoption agency algorithm.", "unexpected-end-tag-treated-as": "Unexpected end tag ({originalName}). Treated as {newName}.", "no-end-tag": "This element ({name}) has no end tag.", "unexpected-implied-end-tag-in-table": "Unexpected implied end tag ({name}) in the table phase.", "unexpected-implied-end-tag-in-table-body": "Unexpected implied end tag ({name}) in the table body phase.", "unexpected-char-implies-table-voodoo": "Unexpected non-space characters in table context caused voodoo mode.", "unexpected-hidden-input-in-table": "Unexpected input with type hidden in table context.", "unexpected-form-in-table": "Unexpected form in table context.", "unexpected-start-tag-implies-table-voodoo": "Unexpected start tag ({name}) in table context caused voodoo mode.", "unexpected-end-tag-implies-table-voodoo": "Unexpected end tag ({name}) in table context caused voodoo mode.", "unexpected-cell-in-table-body": "Unexpected table cell start tag ({name}) in the table body phase.", "unexpected-cell-end-tag": "Got table cell end tag ({name}) while required end tags are missing.", "unexpected-end-tag-in-table-body": "Unexpected end tag ({name}) in the table body phase. Ignored.", "unexpected-implied-end-tag-in-table-row": "Unexpected implied end tag ({name}) in the table row phase.", "unexpected-end-tag-in-table-row": "Unexpected end tag ({name}) in the table row phase. Ignored.", "unexpected-select-in-select": "Unexpected select start tag in the select phase treated as select end tag.", "unexpected-input-in-select": "Unexpected input start tag in the select phase.", "unexpected-start-tag-in-select": "Unexpected start tag token ({name}) in the select phase. Ignored.", "unexpected-end-tag-in-select": "Unexpected end tag ({name}) in the select phase. Ignored.", "unexpected-table-element-start-tag-in-select-in-table": "Unexpected table element start tag ({name}) in the select in table phase.", "unexpected-table-element-end-tag-in-select-in-table": "Unexpected table element end tag ({name}) in the select in table phase.", "unexpected-char-after-body": "Unexpected non-space characters in the after body phase.", "unexpected-start-tag-after-body": "Unexpected start tag token ({name}) in the after body phase.", "unexpected-end-tag-after-body": "Unexpected end tag token ({name}) in the after body phase.", "unexpected-char-in-frameset": "Unepxected characters in the frameset phase. Characters ignored.", "unexpected-start-tag-in-frameset": "Unexpected start tag token ({name}) in the frameset phase. Ignored.", "unexpected-frameset-in-frameset-innerhtml": "Unexpected end tag token (frameset in the frameset phase (innerHTML).", "unexpected-end-tag-in-frameset": "Unexpected end tag token ({name}) in the frameset phase. Ignored.", "unexpected-char-after-frameset": "Unexpected non-space characters in the after frameset phase. Ignored.", "unexpected-start-tag-after-frameset": "Unexpected start tag ({name}) in the after frameset phase. Ignored.", "unexpected-end-tag-after-frameset": "Unexpected end tag ({name}) in the after frameset phase. Ignored.", "expected-eof-but-got-char": "Unexpected non-space characters. Expected end of file.", "expected-eof-but-got-start-tag": "Unexpected start tag ({name}). Expected end of file.", "expected-eof-but-got-end-tag": "Unexpected end tag ({name}). Expected end of file.", "unexpected-end-table-in-caption": "Unexpected end table tag in caption. Generates implied end caption.", "end-html-in-innerhtml": "Unexpected html end tag in inner html mode.", "eof-in-table": "Unexpected end of file. Expected table content.", "eof-in-script": "Unexpected end of file. Expected script content.", "non-void-element-with-trailing-solidus": "Trailing solidus not allowed on element {name}.", "unexpected-html-element-in-foreign-content": 'HTML start tag "{name}" in a foreign namespace context.', "unexpected-start-tag-in-table": "Unexpected {name}. Expected table content." };
    }, {}], 9: [function (e, t, n) {
      function o() {
        this.contentHandler = null, this._errorHandler = null, this._treeBuilder = new r(), this._tokenizer = new i(this._treeBuilder), this._scriptingEnabled = !1;
      }var r = e("./SAXTreeBuilder").SAXTreeBuilder,
          i = e("../Tokenizer").Tokenizer,
          s = e("./TreeParser").TreeParser;o.prototype.parse = function (e) {
        this._tokenizer.tokenize(e);var t = this._treeBuilder.document;t && new s(this.contentHandler).parse(t);
      }, o.prototype.parseFragment = function (e, t) {
        this._treeBuilder.setFragmentContext(t), this._tokenizer.tokenize(e);var n = this._treeBuilder.getFragment();n && new s(this.contentHandler).parse(n);
      }, Object.defineProperty(o.prototype, "scriptingEnabled", { get: function () {
          return this._scriptingEnabled;
        }, set: function (e) {
          this._scriptingEnabled = e, this._treeBuilder.scriptingEnabled = e;
        } }), Object.defineProperty(o.prototype, "errorHandler", { get: function () {
          return this._errorHandler;
        }, set: function (e) {
          this._errorHandler = e, this._treeBuilder.errorHandler = e;
        } }), n.SAXParser = o;
    }, { "../Tokenizer": 5, "./SAXTreeBuilder": 10, "./TreeParser": 11 }], 10: [function (e, t, n) {
      function s() {
        i.call(this);
      }function o(e, t) {
        for (var n = 0; n < e.attributes.length; n++) {
          var r = e.attributes[n];if (r.nodeName === t) return r.nodeValue;
        }
      }function a(e) {
        e ? (this.columnNumber = e.columnNumber, this.lineNumber = e.lineNumber) : (this.columnNumber = -1, this.lineNumber = -1), this.parentNode = null, this.nextSibling = null, this.firstChild = null;
      }function f(e) {
        a.call(this, e), this.lastChild = null, this._endLocator = null;
      }function l(e) {
        f.call(this, e), this.nodeType = u.DOCUMENT;
      }function c() {
        f.call(this, new Locator()), this.nodeType = u.DOCUMENT_FRAGMENT;
      }function h(e, t, n, r, i, s) {
        f.call(this, e), this.uri = t, this.localName = n, this.qName = r, this.attributes = i, this.prefixMappings = s, this.nodeType = u.ELEMENT;
      }function p(e, t) {
        a.call(this, e), this.data = t, this.nodeType = u.CHARACTERS;
      }function d(e, t) {
        a.call(this, e), this.data = t, this.nodeType = u.IGNORABLE_WHITESPACE;
      }function v(e, t) {
        a.call(this, e), this.data = t, this.nodeType = u.COMMENT;
      }function m(e) {
        f.call(this, e), this.nodeType = u.CDATA;
      }function g(e) {
        f.call(this), this.name = e, this.nodeType = u.ENTITY;
      }function y(e) {
        a.call(this), this.name = e, this.nodeType = u.SKIPPED_ENTITY;
      }function b(e, t) {
        a.call(this), this.target = e, this.data = t;
      }function w(e, t, n) {
        f.call(this), this.name = e, this.publicIdentifier = t, this.systemIdentifier = n, this.nodeType = u.DTD;
      }var r = e("util"),
          i = e("../TreeBuilder").TreeBuilder;r.inherits(s, i), s.prototype.start = function (e) {
        this.document = new l(this.tokenizer);
      }, s.prototype.end = function () {
        this.document.endLocator = this.tokenizer;
      }, s.prototype.insertDoctype = function (e, t, n) {
        var r = new w(this.tokenizer, e, t, n);r.endLocator = this.tokenizer, this.document.appendChild(r);
      }, s.prototype.createElement = function (e, t, n) {
        var r = new h(this.tokenizer, e, t, t, n || []);return r;
      }, s.prototype.insertComment = function (e, t) {
        t || (t = this.currentStackItem());var n = new v(this.tokenizer, e);t.appendChild(n);
      }, s.prototype.appendCharacters = function (e, t) {
        var n = new p(this.tokenizer, t);e.appendChild(n);
      }, s.prototype.insertText = function (e) {
        if (this.redirectAttachToFosterParent && this.openElements.top.isFosterParenting()) {
          var t = this.openElements.findIndex("table"),
              n = this.openElements.item(t),
              r = n.node;if (t === 0) return this.appendCharacters(r, e);var i = new p(this.tokenizer, e),
              s = r.parentNode;if (s) {
            s.insertBetween(i, r.previousSibling, r);return;
          }var o = this.openElements.item(t - 1).node;o.appendChild(i);return;
        }this.appendCharacters(this.currentStackItem().node, e);
      }, s.prototype.attachNode = function (e, t) {
        t.appendChild(e);
      }, s.prototype.attachNodeToFosterParent = function (e, t, n) {
        var r = t.parentNode;r ? r.insertBetween(e, t.previousSibling, t) : n.appendChild(e);
      }, s.prototype.detachFromParent = function (e) {
        e.detach();
      }, s.prototype.reparentChildren = function (e, t) {
        t.appendChildren(e.firstChild);
      }, s.prototype.getFragment = function () {
        var e = new c();return this.reparentChildren(this.openElements.rootNode, e), e;
      }, s.prototype.addAttributesToElement = function (e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];o(e, r.nodeName) || e.attributes.push(r);
        }
      };var u = { CDATA: 1, CHARACTERS: 2, COMMENT: 3, DOCUMENT: 4, DOCUMENT_FRAGMENT: 5, DTD: 6, ELEMENT: 7, ENTITY: 8, IGNORABLE_WHITESPACE: 9, PROCESSING_INSTRUCTION: 10, SKIPPED_ENTITY: 11 };a.prototype.visit = function (e) {
        throw new Error("Not Implemented");
      }, a.prototype.revisit = function (e) {
        return;
      }, a.prototype.detach = function () {
        this.parentNode !== null && (this.parentNode.removeChild(this), this.parentNode = null);
      }, Object.defineProperty(a.prototype, "previousSibling", { get: function () {
          var e = null,
              t = this.parentNode.firstChild;for (;;) {
            if (this == t) return e;e = t, t = t.nextSibling;
          }
        } }), f.prototype = Object.create(a.prototype), f.prototype.insertBefore = function (e, t) {
        if (!t) return this.appendChild(e);e.detach(), e.parentNode = this;if (this.firstChild == t) e.nextSibling = t, this.firstChild = e;else {
          var n = this.firstChild,
              r = this.firstChild.nextSibling;while (r != t) n = r, r = r.nextSibling;n.nextSibling = e, e.nextSibling = r;
        }return e;
      }, f.prototype.insertBetween = function (e, t, n) {
        return n ? (e.detach(), e.parentNode = this, e.nextSibling = n, t ? t.nextSibling = e : firstChild = e, e) : this.appendChild(e);
      }, f.prototype.appendChild = function (e) {
        return e.detach(), e.parentNode = this, this.firstChild ? this.lastChild.nextSibling = e : this.firstChild = e, this.lastChild = e, e;
      }, f.prototype.appendChildren = function (e) {
        var t = e.firstChild;if (!t) return;var n = e;this.firstChild ? this.lastChild.nextSibling = t : this.firstChild = t, this.lastChild = n.lastChild;do t.parentNode = this; while (t = t.nextSibling);n.firstChild = null, n.lastChild = null;
      }, f.prototype.removeChild = function (e) {
        if (this.firstChild == e) this.firstChild = e.nextSibling, this.lastChild == e && (this.lastChild = null);else {
          var t = this.firstChild,
              n = this.firstChild.nextSibling;while (n != e) t = n, n = n.nextSibling;t.nextSibling = e.nextSibling, this.lastChild == e && (this.lastChild = t);
        }return e.parentNode = null, e;
      }, Object.defineProperty(f.prototype, "endLocator", { get: function () {
          return this._endLocator;
        }, set: function (e) {
          this._endLocator = { lineNumber: e.lineNumber, columnNumber: e.columnNumber };
        } }), l.prototype = Object.create(f.prototype), l.prototype.visit = function (e) {
        e.startDocument(this);
      }, l.prototype.revisit = function (e) {
        e.endDocument(this.endLocator);
      }, c.prototype = Object.create(f.prototype), c.prototype.visit = function (e) {}, h.prototype = Object.create(f.prototype), h.prototype.visit = function (e) {
        if (this.prefixMappings) for (var t in prefixMappings) {
          var n = prefixMappings[t];e.startPrefixMapping(n.getPrefix(), n.getUri(), this);
        }e.startElement(this.uri, this.localName, this.qName, this.attributes, this);
      }, h.prototype.revisit = function (e) {
        e.endElement(this.uri, this.localName, this.qName, this.endLocator);if (this.prefixMappings) for (var t in prefixMappings) {
          var n = prefixMappings[t];e.endPrefixMapping(n.getPrefix(), this.endLocator);
        }
      }, p.prototype = Object.create(a.prototype), p.prototype.visit = function (e) {
        e.characters(this.data, 0, this.data.length, this);
      }, d.prototype = Object.create(a.prototype), d.prototype.visit = function (e) {
        e.ignorableWhitespace(this.data, 0, this.data.length, this);
      }, v.prototype = Object.create(a.prototype), v.prototype.visit = function (e) {
        e.comment(this.data, 0, this.data.length, this);
      }, m.prototype = Object.create(f.prototype), m.prototype.visit = function (e) {
        e.startCDATA(this);
      }, m.prototype.revisit = function (e) {
        e.endCDATA(this.endLocator);
      }, g.prototype = Object.create(f.prototype), g.prototype.visit = function (e) {
        e.startEntity(this.name, this);
      }, g.prototype.revisit = function (e) {
        e.endEntity(this.name);
      }, y.prototype = Object.create(a.prototype), y.prototype.visit = function (e) {
        e.skippedEntity(this.name, this);
      }, b.prototype = Object.create(a.prototype), b.prototype.visit = function (e) {
        e.processingInstruction(this.target, this.data, this);
      }, b.prototype.getNodeType = function () {
        return u.PROCESSING_INSTRUCTION;
      }, w.prototype = Object.create(f.prototype), w.prototype.visit = function (e) {
        e.startDTD(this.name, this.publicIdentifier, this.systemIdentifier, this);
      }, w.prototype.revisit = function (e) {
        e.endDTD();
      }, n.SAXTreeBuilder = s;
    }, { "../TreeBuilder": 6, util: 20 }], 11: [function (e, t, n) {
      function r(e, t) {
        this.contentHandler, this.lexicalHandler, this.locatorDelegate;if (!e) throw new IllegalArgumentException("contentHandler was null.");this.contentHandler = e, t ? this.lexicalHandler = t : this.lexicalHandler = new i();
      }function i() {}r.prototype.parse = function (e) {
        this.contentHandler.documentLocator = this;var t = e,
            n;for (;;) {
          t.visit(this);if (n = t.firstChild) {
            t = n;continue;
          }for (;;) {
            t.revisit(this);if (t == e) return;if (n = t.nextSibling) {
              t = n;break;
            }t = t.parentNode;
          }
        }
      }, r.prototype.characters = function (e, t, n, r) {
        this.locatorDelegate = r, this.contentHandler.characters(e, t, n);
      }, r.prototype.endDocument = function (e) {
        this.locatorDelegate = e, this.contentHandler.endDocument();
      }, r.prototype.endElement = function (e, t, n, r) {
        this.locatorDelegate = r, this.contentHandler.endElement(e, t, n);
      }, r.prototype.endPrefixMapping = function (e, t) {
        this.locatorDelegate = t, this.contentHandler.endPrefixMapping(e);
      }, r.prototype.ignorableWhitespace = function (e, t, n, r) {
        this.locatorDelegate = r, this.contentHandler.ignorableWhitespace(e, t, n);
      }, r.prototype.processingInstruction = function (e, t, n) {
        this.locatorDelegate = n, this.contentHandler.processingInstruction(e, t);
      }, r.prototype.skippedEntity = function (e, t) {
        this.locatorDelegate = t, this.contentHandler.skippedEntity(e);
      }, r.prototype.startDocument = function (e) {
        this.locatorDelegate = e, this.contentHandler.startDocument();
      }, r.prototype.startElement = function (e, t, n, r, i) {
        this.locatorDelegate = i, this.contentHandler.startElement(e, t, n, r);
      }, r.prototype.startPrefixMapping = function (e, t, n) {
        this.locatorDelegate = n, this.contentHandler.startPrefixMapping(e, t);
      }, r.prototype.comment = function (e, t, n, r) {
        this.locatorDelegate = r, this.lexicalHandler.comment(e, t, n);
      }, r.prototype.endCDATA = function (e) {
        this.locatorDelegate = e, this.lexicalHandler.endCDATA();
      }, r.prototype.endDTD = function (e) {
        this.locatorDelegate = e, this.lexicalHandler.endDTD();
      }, r.prototype.endEntity = function (e, t) {
        this.locatorDelegate = t, this.lexicalHandler.endEntity(e);
      }, r.prototype.startCDATA = function (e) {
        this.locatorDelegate = e, this.lexicalHandler.startCDATA();
      }, r.prototype.startDTD = function (e, t, n, r) {
        this.locatorDelegate = r, this.lexicalHandler.startDTD(e, t, n);
      }, r.prototype.startEntity = function (e, t) {
        this.locatorDelegate = t, this.lexicalHandler.startEntity(e);
      }, Object.defineProperty(r.prototype, "columnNumber", { get: function () {
          return this.locatorDelegate ? this.locatorDelegate.columnNumber : -1;
        } }), Object.defineProperty(r.prototype, "lineNumber", { get: function () {
          return this.locatorDelegate ? this.locatorDelegate.lineNumber : -1;
        } }), i.prototype.comment = function () {}, i.prototype.endCDATA = function () {}, i.prototype.endDTD = function () {}, i.prototype.endEntity = function () {}, i.prototype.startCDATA = function () {}, i.prototype.startDTD = function () {}, i.prototype.startEntity = function () {}, n.TreeParser = r;
    }, {}], 12: [function (e, t, n) {
      t.exports = { "Aacute;": "\u00c1", Aacute: "\u00c1", "aacute;": "\u00e1", aacute: "\u00e1", "Abreve;": "\u0102", "abreve;": "\u0103", "ac;": "\u223e", "acd;": "\u223f", "acE;": "\u223e\u0333", "Acirc;": "\u00c2", Acirc: "\u00c2", "acirc;": "\u00e2", acirc: "\u00e2", "acute;": "\u00b4", acute: "\u00b4", "Acy;": "\u0410", "acy;": "\u0430", "AElig;": "\u00c6", AElig: "\u00c6", "aelig;": "\u00e6", aelig: "\u00e6", "af;": "\u2061", "Afr;": "\ud835\udd04", "afr;": "\ud835\udd1e", "Agrave;": "\u00c0", Agrave: "\u00c0", "agrave;": "\u00e0", agrave: "\u00e0", "alefsym;": "\u2135", "aleph;": "\u2135", "Alpha;": "\u0391", "alpha;": "\u03b1", "Amacr;": "\u0100", "amacr;": "\u0101", "amalg;": "\u2a3f", "amp;": "&", amp: "&", "AMP;": "&", AMP: "&", "andand;": "\u2a55", "And;": "\u2a53", "and;": "\u2227", "andd;": "\u2a5c", "andslope;": "\u2a58", "andv;": "\u2a5a", "ang;": "\u2220", "ange;": "\u29a4", "angle;": "\u2220", "angmsdaa;": "\u29a8", "angmsdab;": "\u29a9", "angmsdac;": "\u29aa", "angmsdad;": "\u29ab", "angmsdae;": "\u29ac", "angmsdaf;": "\u29ad", "angmsdag;": "\u29ae", "angmsdah;": "\u29af", "angmsd;": "\u2221", "angrt;": "\u221f", "angrtvb;": "\u22be", "angrtvbd;": "\u299d", "angsph;": "\u2222", "angst;": "\u00c5", "angzarr;": "\u237c", "Aogon;": "\u0104", "aogon;": "\u0105", "Aopf;": "\ud835\udd38", "aopf;": "\ud835\udd52", "apacir;": "\u2a6f", "ap;": "\u2248", "apE;": "\u2a70", "ape;": "\u224a", "apid;": "\u224b", "apos;": "'", "ApplyFunction;": "\u2061", "approx;": "\u2248", "approxeq;": "\u224a", "Aring;": "\u00c5", Aring: "\u00c5", "aring;": "\u00e5", aring: "\u00e5", "Ascr;": "\ud835\udc9c", "ascr;": "\ud835\udcb6", "Assign;": "\u2254", "ast;": "*", "asymp;": "\u2248", "asympeq;": "\u224d", "Atilde;": "\u00c3", Atilde: "\u00c3", "atilde;": "\u00e3", atilde: "\u00e3", "Auml;": "\u00c4", Auml: "\u00c4", "auml;": "\u00e4", auml: "\u00e4", "awconint;": "\u2233", "awint;": "\u2a11", "backcong;": "\u224c", "backepsilon;": "\u03f6", "backprime;": "\u2035", "backsim;": "\u223d", "backsimeq;": "\u22cd", "Backslash;": "\u2216", "Barv;": "\u2ae7", "barvee;": "\u22bd", "barwed;": "\u2305", "Barwed;": "\u2306", "barwedge;": "\u2305", "bbrk;": "\u23b5", "bbrktbrk;": "\u23b6", "bcong;": "\u224c", "Bcy;": "\u0411", "bcy;": "\u0431", "bdquo;": "\u201e", "becaus;": "\u2235", "because;": "\u2235", "Because;": "\u2235", "bemptyv;": "\u29b0", "bepsi;": "\u03f6", "bernou;": "\u212c", "Bernoullis;": "\u212c", "Beta;": "\u0392", "beta;": "\u03b2", "beth;": "\u2136", "between;": "\u226c", "Bfr;": "\ud835\udd05", "bfr;": "\ud835\udd1f", "bigcap;": "\u22c2", "bigcirc;": "\u25ef", "bigcup;": "\u22c3", "bigodot;": "\u2a00", "bigoplus;": "\u2a01", "bigotimes;": "\u2a02", "bigsqcup;": "\u2a06", "bigstar;": "\u2605", "bigtriangledown;": "\u25bd", "bigtriangleup;": "\u25b3", "biguplus;": "\u2a04", "bigvee;": "\u22c1", "bigwedge;": "\u22c0", "bkarow;": "\u290d", "blacklozenge;": "\u29eb", "blacksquare;": "\u25aa", "blacktriangle;": "\u25b4", "blacktriangledown;": "\u25be", "blacktriangleleft;": "\u25c2", "blacktriangleright;": "\u25b8", "blank;": "\u2423", "blk12;": "\u2592", "blk14;": "\u2591", "blk34;": "\u2593", "block;": "\u2588", "bne;": "=\u20e5", "bnequiv;": "\u2261\u20e5", "bNot;": "\u2aed", "bnot;": "\u2310", "Bopf;": "\ud835\udd39", "bopf;": "\ud835\udd53", "bot;": "\u22a5", "bottom;": "\u22a5", "bowtie;": "\u22c8", "boxbox;": "\u29c9", "boxdl;": "\u2510", "boxdL;": "\u2555", "boxDl;": "\u2556", "boxDL;": "\u2557", "boxdr;": "\u250c", "boxdR;": "\u2552", "boxDr;": "\u2553", "boxDR;": "\u2554", "boxh;": "\u2500", "boxH;": "\u2550", "boxhd;": "\u252c", "boxHd;": "\u2564", "boxhD;": "\u2565", "boxHD;": "\u2566", "boxhu;": "\u2534", "boxHu;": "\u2567", "boxhU;": "\u2568", "boxHU;": "\u2569", "boxminus;": "\u229f", "boxplus;": "\u229e", "boxtimes;": "\u22a0", "boxul;": "\u2518", "boxuL;": "\u255b", "boxUl;": "\u255c", "boxUL;": "\u255d", "boxur;": "\u2514", "boxuR;": "\u2558", "boxUr;": "\u2559", "boxUR;": "\u255a", "boxv;": "\u2502", "boxV;": "\u2551", "boxvh;": "\u253c", "boxvH;": "\u256a", "boxVh;": "\u256b", "boxVH;": "\u256c", "boxvl;": "\u2524", "boxvL;": "\u2561", "boxVl;": "\u2562", "boxVL;": "\u2563", "boxvr;": "\u251c", "boxvR;": "\u255e", "boxVr;": "\u255f", "boxVR;": "\u2560", "bprime;": "\u2035", "breve;": "\u02d8", "Breve;": "\u02d8", "brvbar;": "\u00a6", brvbar: "\u00a6", "bscr;": "\ud835\udcb7", "Bscr;": "\u212c", "bsemi;": "\u204f", "bsim;": "\u223d", "bsime;": "\u22cd", "bsolb;": "\u29c5", "bsol;": "\\", "bsolhsub;": "\u27c8", "bull;": "\u2022", "bullet;": "\u2022", "bump;": "\u224e", "bumpE;": "\u2aae", "bumpe;": "\u224f", "Bumpeq;": "\u224e", "bumpeq;": "\u224f", "Cacute;": "\u0106", "cacute;": "\u0107", "capand;": "\u2a44", "capbrcup;": "\u2a49", "capcap;": "\u2a4b", "cap;": "\u2229", "Cap;": "\u22d2", "capcup;": "\u2a47", "capdot;": "\u2a40", "CapitalDifferentialD;": "\u2145", "caps;": "\u2229\ufe00", "caret;": "\u2041", "caron;": "\u02c7", "Cayleys;": "\u212d", "ccaps;": "\u2a4d", "Ccaron;": "\u010c", "ccaron;": "\u010d", "Ccedil;": "\u00c7", Ccedil: "\u00c7", "ccedil;": "\u00e7", ccedil: "\u00e7", "Ccirc;": "\u0108", "ccirc;": "\u0109", "Cconint;": "\u2230", "ccups;": "\u2a4c", "ccupssm;": "\u2a50", "Cdot;": "\u010a", "cdot;": "\u010b", "cedil;": "\u00b8", cedil: "\u00b8", "Cedilla;": "\u00b8", "cemptyv;": "\u29b2", "cent;": "\u00a2", cent: "\u00a2", "centerdot;": "\u00b7", "CenterDot;": "\u00b7", "cfr;": "\ud835\udd20", "Cfr;": "\u212d", "CHcy;": "\u0427", "chcy;": "\u0447", "check;": "\u2713", "checkmark;": "\u2713", "Chi;": "\u03a7", "chi;": "\u03c7", "circ;": "\u02c6", "circeq;": "\u2257", "circlearrowleft;": "\u21ba", "circlearrowright;": "\u21bb", "circledast;": "\u229b", "circledcirc;": "\u229a", "circleddash;": "\u229d", "CircleDot;": "\u2299", "circledR;": "\u00ae", "circledS;": "\u24c8", "CircleMinus;": "\u2296", "CirclePlus;": "\u2295", "CircleTimes;": "\u2297", "cir;": "\u25cb", "cirE;": "\u29c3", "cire;": "\u2257", "cirfnint;": "\u2a10", "cirmid;": "\u2aef", "cirscir;": "\u29c2", "ClockwiseContourIntegral;": "\u2232", "CloseCurlyDoubleQuote;": "\u201d", "CloseCurlyQuote;": "\u2019", "clubs;": "\u2663", "clubsuit;": "\u2663", "colon;": ":", "Colon;": "\u2237", "Colone;": "\u2a74", "colone;": "\u2254", "coloneq;": "\u2254", "comma;": ",", "commat;": "@", "comp;": "\u2201", "compfn;": "\u2218", "complement;": "\u2201", "complexes;": "\u2102", "cong;": "\u2245", "congdot;": "\u2a6d", "Congruent;": "\u2261", "conint;": "\u222e", "Conint;": "\u222f", "ContourIntegral;": "\u222e", "copf;": "\ud835\udd54", "Copf;": "\u2102", "coprod;": "\u2210", "Coproduct;": "\u2210", "copy;": "\u00a9", copy: "\u00a9", "COPY;": "\u00a9", COPY: "\u00a9", "copysr;": "\u2117", "CounterClockwiseContourIntegral;": "\u2233", "crarr;": "\u21b5", "cross;": "\u2717", "Cross;": "\u2a2f", "Cscr;": "\ud835\udc9e", "cscr;": "\ud835\udcb8", "csub;": "\u2acf", "csube;": "\u2ad1", "csup;": "\u2ad0", "csupe;": "\u2ad2", "ctdot;": "\u22ef", "cudarrl;": "\u2938", "cudarrr;": "\u2935", "cuepr;": "\u22de", "cuesc;": "\u22df", "cularr;": "\u21b6", "cularrp;": "\u293d", "cupbrcap;": "\u2a48", "cupcap;": "\u2a46", "CupCap;": "\u224d", "cup;": "\u222a", "Cup;": "\u22d3", "cupcup;": "\u2a4a", "cupdot;": "\u228d", "cupor;": "\u2a45", "cups;": "\u222a\ufe00", "curarr;": "\u21b7", "curarrm;": "\u293c", "curlyeqprec;": "\u22de", "curlyeqsucc;": "\u22df", "curlyvee;": "\u22ce", "curlywedge;": "\u22cf", "curren;": "\u00a4", curren: "\u00a4", "curvearrowleft;": "\u21b6", "curvearrowright;": "\u21b7", "cuvee;": "\u22ce", "cuwed;": "\u22cf", "cwconint;": "\u2232", "cwint;": "\u2231", "cylcty;": "\u232d", "dagger;": "\u2020", "Dagger;": "\u2021", "daleth;": "\u2138", "darr;": "\u2193", "Darr;": "\u21a1", "dArr;": "\u21d3", "dash;": "\u2010", "Dashv;": "\u2ae4", "dashv;": "\u22a3", "dbkarow;": "\u290f", "dblac;": "\u02dd", "Dcaron;": "\u010e", "dcaron;": "\u010f", "Dcy;": "\u0414", "dcy;": "\u0434", "ddagger;": "\u2021", "ddarr;": "\u21ca", "DD;": "\u2145", "dd;": "\u2146", "DDotrahd;": "\u2911", "ddotseq;": "\u2a77", "deg;": "\u00b0", deg: "\u00b0", "Del;": "\u2207", "Delta;": "\u0394", "delta;": "\u03b4", "demptyv;": "\u29b1", "dfisht;": "\u297f", "Dfr;": "\ud835\udd07", "dfr;": "\ud835\udd21", "dHar;": "\u2965", "dharl;": "\u21c3", "dharr;": "\u21c2", "DiacriticalAcute;": "\u00b4", "DiacriticalDot;": "\u02d9", "DiacriticalDoubleAcute;": "\u02dd", "DiacriticalGrave;": "`", "DiacriticalTilde;": "\u02dc", "diam;": "\u22c4", "diamond;": "\u22c4", "Diamond;": "\u22c4", "diamondsuit;": "\u2666", "diams;": "\u2666", "die;": "\u00a8", "DifferentialD;": "\u2146", "digamma;": "\u03dd", "disin;": "\u22f2", "div;": "\u00f7", "divide;": "\u00f7", divide: "\u00f7", "divideontimes;": "\u22c7", "divonx;": "\u22c7", "DJcy;": "\u0402", "djcy;": "\u0452", "dlcorn;": "\u231e", "dlcrop;": "\u230d", "dollar;": "$", "Dopf;": "\ud835\udd3b", "dopf;": "\ud835\udd55", "Dot;": "\u00a8", "dot;": "\u02d9", "DotDot;": "\u20dc", "doteq;": "\u2250", "doteqdot;": "\u2251", "DotEqual;": "\u2250", "dotminus;": "\u2238", "dotplus;": "\u2214", "dotsquare;": "\u22a1", "doublebarwedge;": "\u2306", "DoubleContourIntegral;": "\u222f", "DoubleDot;": "\u00a8", "DoubleDownArrow;": "\u21d3", "DoubleLeftArrow;": "\u21d0", "DoubleLeftRightArrow;": "\u21d4", "DoubleLeftTee;": "\u2ae4", "DoubleLongLeftArrow;": "\u27f8", "DoubleLongLeftRightArrow;": "\u27fa", "DoubleLongRightArrow;": "\u27f9", "DoubleRightArrow;": "\u21d2", "DoubleRightTee;": "\u22a8", "DoubleUpArrow;": "\u21d1", "DoubleUpDownArrow;": "\u21d5", "DoubleVerticalBar;": "\u2225", "DownArrowBar;": "\u2913", "downarrow;": "\u2193", "DownArrow;": "\u2193", "Downarrow;": "\u21d3", "DownArrowUpArrow;": "\u21f5", "DownBreve;": "\u0311", "downdownarrows;": "\u21ca", "downharpoonleft;": "\u21c3", "downharpoonright;": "\u21c2", "DownLeftRightVector;": "\u2950", "DownLeftTeeVector;": "\u295e", "DownLeftVectorBar;": "\u2956", "DownLeftVector;": "\u21bd", "DownRightTeeVector;": "\u295f", "DownRightVectorBar;": "\u2957", "DownRightVector;": "\u21c1", "DownTeeArrow;": "\u21a7", "DownTee;": "\u22a4", "drbkarow;": "\u2910", "drcorn;": "\u231f", "drcrop;": "\u230c", "Dscr;": "\ud835\udc9f", "dscr;": "\ud835\udcb9", "DScy;": "\u0405", "dscy;": "\u0455", "dsol;": "\u29f6", "Dstrok;": "\u0110", "dstrok;": "\u0111", "dtdot;": "\u22f1", "dtri;": "\u25bf", "dtrif;": "\u25be", "duarr;": "\u21f5", "duhar;": "\u296f", "dwangle;": "\u29a6", "DZcy;": "\u040f", "dzcy;": "\u045f", "dzigrarr;": "\u27ff", "Eacute;": "\u00c9", Eacute: "\u00c9", "eacute;": "\u00e9", eacute: "\u00e9", "easter;": "\u2a6e", "Ecaron;": "\u011a", "ecaron;": "\u011b", "Ecirc;": "\u00ca", Ecirc: "\u00ca", "ecirc;": "\u00ea", ecirc: "\u00ea", "ecir;": "\u2256", "ecolon;": "\u2255", "Ecy;": "\u042d", "ecy;": "\u044d", "eDDot;": "\u2a77", "Edot;": "\u0116", "edot;": "\u0117", "eDot;": "\u2251", "ee;": "\u2147", "efDot;": "\u2252", "Efr;": "\ud835\udd08", "efr;": "\ud835\udd22", "eg;": "\u2a9a", "Egrave;": "\u00c8", Egrave: "\u00c8", "egrave;": "\u00e8", egrave: "\u00e8", "egs;": "\u2a96", "egsdot;": "\u2a98", "el;": "\u2a99", "Element;": "\u2208", "elinters;": "\u23e7", "ell;": "\u2113", "els;": "\u2a95", "elsdot;": "\u2a97", "Emacr;": "\u0112", "emacr;": "\u0113", "empty;": "\u2205", "emptyset;": "\u2205", "EmptySmallSquare;": "\u25fb", "emptyv;": "\u2205", "EmptyVerySmallSquare;": "\u25ab", "emsp13;": "\u2004", "emsp14;": "\u2005", "emsp;": "\u2003", "ENG;": "\u014a", "eng;": "\u014b", "ensp;": "\u2002", "Eogon;": "\u0118", "eogon;": "\u0119", "Eopf;": "\ud835\udd3c", "eopf;": "\ud835\udd56", "epar;": "\u22d5", "eparsl;": "\u29e3", "eplus;": "\u2a71", "epsi;": "\u03b5", "Epsilon;": "\u0395", "epsilon;": "\u03b5", "epsiv;": "\u03f5", "eqcirc;": "\u2256", "eqcolon;": "\u2255", "eqsim;": "\u2242", "eqslantgtr;": "\u2a96", "eqslantless;": "\u2a95", "Equal;": "\u2a75", "equals;": "=", "EqualTilde;": "\u2242", "equest;": "\u225f", "Equilibrium;": "\u21cc", "equiv;": "\u2261", "equivDD;": "\u2a78", "eqvparsl;": "\u29e5", "erarr;": "\u2971", "erDot;": "\u2253", "escr;": "\u212f", "Escr;": "\u2130", "esdot;": "\u2250", "Esim;": "\u2a73", "esim;": "\u2242", "Eta;": "\u0397", "eta;": "\u03b7", "ETH;": "\u00d0", ETH: "\u00d0", "eth;": "\u00f0", eth: "\u00f0", "Euml;": "\u00cb", Euml: "\u00cb", "euml;": "\u00eb", euml: "\u00eb", "euro;": "\u20ac", "excl;": "!", "exist;": "\u2203", "Exists;": "\u2203", "expectation;": "\u2130", "exponentiale;": "\u2147", "ExponentialE;": "\u2147", "fallingdotseq;": "\u2252", "Fcy;": "\u0424", "fcy;": "\u0444", "female;": "\u2640", "ffilig;": "\ufb03", "fflig;": "\ufb00", "ffllig;": "\ufb04", "Ffr;": "\ud835\udd09", "ffr;": "\ud835\udd23", "filig;": "\ufb01", "FilledSmallSquare;": "\u25fc", "FilledVerySmallSquare;": "\u25aa", "fjlig;": "fj", "flat;": "\u266d", "fllig;": "\ufb02", "fltns;": "\u25b1", "fnof;": "\u0192", "Fopf;": "\ud835\udd3d", "fopf;": "\ud835\udd57", "forall;": "\u2200", "ForAll;": "\u2200", "fork;": "\u22d4", "forkv;": "\u2ad9", "Fouriertrf;": "\u2131", "fpartint;": "\u2a0d", "frac12;": "\u00bd", frac12: "\u00bd", "frac13;": "\u2153", "frac14;": "\u00bc", frac14: "\u00bc", "frac15;": "\u2155", "frac16;": "\u2159", "frac18;": "\u215b", "frac23;": "\u2154", "frac25;": "\u2156", "frac34;": "\u00be", frac34: "\u00be", "frac35;": "\u2157", "frac38;": "\u215c", "frac45;": "\u2158", "frac56;": "\u215a", "frac58;": "\u215d", "frac78;": "\u215e", "frasl;": "\u2044", "frown;": "\u2322", "fscr;": "\ud835\udcbb", "Fscr;": "\u2131", "gacute;": "\u01f5", "Gamma;": "\u0393", "gamma;": "\u03b3", "Gammad;": "\u03dc", "gammad;": "\u03dd", "gap;": "\u2a86", "Gbreve;": "\u011e", "gbreve;": "\u011f", "Gcedil;": "\u0122", "Gcirc;": "\u011c", "gcirc;": "\u011d", "Gcy;": "\u0413", "gcy;": "\u0433", "Gdot;": "\u0120", "gdot;": "\u0121", "ge;": "\u2265", "gE;": "\u2267", "gEl;": "\u2a8c", "gel;": "\u22db", "geq;": "\u2265", "geqq;": "\u2267", "geqslant;": "\u2a7e", "gescc;": "\u2aa9", "ges;": "\u2a7e", "gesdot;": "\u2a80", "gesdoto;": "\u2a82", "gesdotol;": "\u2a84", "gesl;": "\u22db\ufe00", "gesles;": "\u2a94", "Gfr;": "\ud835\udd0a", "gfr;": "\ud835\udd24", "gg;": "\u226b", "Gg;": "\u22d9", "ggg;": "\u22d9", "gimel;": "\u2137", "GJcy;": "\u0403", "gjcy;": "\u0453", "gla;": "\u2aa5", "gl;": "\u2277", "glE;": "\u2a92", "glj;": "\u2aa4", "gnap;": "\u2a8a", "gnapprox;": "\u2a8a", "gne;": "\u2a88", "gnE;": "\u2269", "gneq;": "\u2a88", "gneqq;": "\u2269", "gnsim;": "\u22e7", "Gopf;": "\ud835\udd3e", "gopf;": "\ud835\udd58", "grave;": "`", "GreaterEqual;": "\u2265", "GreaterEqualLess;": "\u22db", "GreaterFullEqual;": "\u2267", "GreaterGreater;": "\u2aa2", "GreaterLess;": "\u2277", "GreaterSlantEqual;": "\u2a7e", "GreaterTilde;": "\u2273", "Gscr;": "\ud835\udca2", "gscr;": "\u210a", "gsim;": "\u2273", "gsime;": "\u2a8e", "gsiml;": "\u2a90", "gtcc;": "\u2aa7", "gtcir;": "\u2a7a", "gt;": ">", gt: ">", "GT;": ">", GT: ">", "Gt;": "\u226b", "gtdot;": "\u22d7", "gtlPar;": "\u2995", "gtquest;": "\u2a7c", "gtrapprox;": "\u2a86", "gtrarr;": "\u2978", "gtrdot;": "\u22d7", "gtreqless;": "\u22db", "gtreqqless;": "\u2a8c", "gtrless;": "\u2277", "gtrsim;": "\u2273", "gvertneqq;": "\u2269\ufe00", "gvnE;": "\u2269\ufe00", "Hacek;": "\u02c7", "hairsp;": "\u200a", "half;": "\u00bd", "hamilt;": "\u210b", "HARDcy;": "\u042a", "hardcy;": "\u044a", "harrcir;": "\u2948", "harr;": "\u2194", "hArr;": "\u21d4", "harrw;": "\u21ad", "Hat;": "^", "hbar;": "\u210f", "Hcirc;": "\u0124", "hcirc;": "\u0125", "hearts;": "\u2665", "heartsuit;": "\u2665", "hellip;": "\u2026", "hercon;": "\u22b9", "hfr;": "\ud835\udd25", "Hfr;": "\u210c", "HilbertSpace;": "\u210b", "hksearow;": "\u2925", "hkswarow;": "\u2926", "hoarr;": "\u21ff", "homtht;": "\u223b", "hookleftarrow;": "\u21a9", "hookrightarrow;": "\u21aa", "hopf;": "\ud835\udd59", "Hopf;": "\u210d", "horbar;": "\u2015", "HorizontalLine;": "\u2500", "hscr;": "\ud835\udcbd", "Hscr;": "\u210b", "hslash;": "\u210f", "Hstrok;": "\u0126", "hstrok;": "\u0127", "HumpDownHump;": "\u224e", "HumpEqual;": "\u224f", "hybull;": "\u2043", "hyphen;": "\u2010", "Iacute;": "\u00cd", Iacute: "\u00cd", "iacute;": "\u00ed", iacute: "\u00ed", "ic;": "\u2063", "Icirc;": "\u00ce", Icirc: "\u00ce", "icirc;": "\u00ee", icirc: "\u00ee", "Icy;": "\u0418", "icy;": "\u0438", "Idot;": "\u0130", "IEcy;": "\u0415", "iecy;": "\u0435", "iexcl;": "\u00a1", iexcl: "\u00a1", "iff;": "\u21d4", "ifr;": "\ud835\udd26", "Ifr;": "\u2111", "Igrave;": "\u00cc", Igrave: "\u00cc", "igrave;": "\u00ec", igrave: "\u00ec", "ii;": "\u2148", "iiiint;": "\u2a0c", "iiint;": "\u222d", "iinfin;": "\u29dc", "iiota;": "\u2129", "IJlig;": "\u0132", "ijlig;": "\u0133", "Imacr;": "\u012a", "imacr;": "\u012b", "image;": "\u2111", "ImaginaryI;": "\u2148", "imagline;": "\u2110", "imagpart;": "\u2111", "imath;": "\u0131", "Im;": "\u2111", "imof;": "\u22b7", "imped;": "\u01b5", "Implies;": "\u21d2", "incare;": "\u2105", "in;": "\u2208", "infin;": "\u221e", "infintie;": "\u29dd", "inodot;": "\u0131", "intcal;": "\u22ba", "int;": "\u222b", "Int;": "\u222c", "integers;": "\u2124", "Integral;": "\u222b", "intercal;": "\u22ba", "Intersection;": "\u22c2", "intlarhk;": "\u2a17", "intprod;": "\u2a3c", "InvisibleComma;": "\u2063", "InvisibleTimes;": "\u2062", "IOcy;": "\u0401", "iocy;": "\u0451", "Iogon;": "\u012e", "iogon;": "\u012f", "Iopf;": "\ud835\udd40", "iopf;": "\ud835\udd5a", "Iota;": "\u0399", "iota;": "\u03b9", "iprod;": "\u2a3c", "iquest;": "\u00bf", iquest: "\u00bf", "iscr;": "\ud835\udcbe", "Iscr;": "\u2110", "isin;": "\u2208", "isindot;": "\u22f5", "isinE;": "\u22f9", "isins;": "\u22f4", "isinsv;": "\u22f3", "isinv;": "\u2208", "it;": "\u2062", "Itilde;": "\u0128", "itilde;": "\u0129", "Iukcy;": "\u0406", "iukcy;": "\u0456", "Iuml;": "\u00cf", Iuml: "\u00cf", "iuml;": "\u00ef", iuml: "\u00ef", "Jcirc;": "\u0134", "jcirc;": "\u0135", "Jcy;": "\u0419", "jcy;": "\u0439", "Jfr;": "\ud835\udd0d", "jfr;": "\ud835\udd27", "jmath;": "\u0237", "Jopf;": "\ud835\udd41", "jopf;": "\ud835\udd5b", "Jscr;": "\ud835\udca5", "jscr;": "\ud835\udcbf", "Jsercy;": "\u0408", "jsercy;": "\u0458", "Jukcy;": "\u0404", "jukcy;": "\u0454", "Kappa;": "\u039a", "kappa;": "\u03ba", "kappav;": "\u03f0", "Kcedil;": "\u0136", "kcedil;": "\u0137", "Kcy;": "\u041a", "kcy;": "\u043a", "Kfr;": "\ud835\udd0e", "kfr;": "\ud835\udd28", "kgreen;": "\u0138", "KHcy;": "\u0425", "khcy;": "\u0445", "KJcy;": "\u040c", "kjcy;": "\u045c", "Kopf;": "\ud835\udd42", "kopf;": "\ud835\udd5c", "Kscr;": "\ud835\udca6", "kscr;": "\ud835\udcc0", "lAarr;": "\u21da", "Lacute;": "\u0139", "lacute;": "\u013a", "laemptyv;": "\u29b4", "lagran;": "\u2112", "Lambda;": "\u039b", "lambda;": "\u03bb", "lang;": "\u27e8", "Lang;": "\u27ea", "langd;": "\u2991", "langle;": "\u27e8", "lap;": "\u2a85", "Laplacetrf;": "\u2112", "laquo;": "\u00ab", laquo: "\u00ab", "larrb;": "\u21e4", "larrbfs;": "\u291f", "larr;": "\u2190", "Larr;": "\u219e", "lArr;": "\u21d0", "larrfs;": "\u291d", "larrhk;": "\u21a9", "larrlp;": "\u21ab", "larrpl;": "\u2939", "larrsim;": "\u2973", "larrtl;": "\u21a2", "latail;": "\u2919", "lAtail;": "\u291b", "lat;": "\u2aab", "late;": "\u2aad", "lates;": "\u2aad\ufe00", "lbarr;": "\u290c", "lBarr;": "\u290e", "lbbrk;": "\u2772", "lbrace;": "{", "lbrack;": "[", "lbrke;": "\u298b", "lbrksld;": "\u298f", "lbrkslu;": "\u298d", "Lcaron;": "\u013d", "lcaron;": "\u013e", "Lcedil;": "\u013b", "lcedil;": "\u013c", "lceil;": "\u2308", "lcub;": "{", "Lcy;": "\u041b", "lcy;": "\u043b", "ldca;": "\u2936", "ldquo;": "\u201c", "ldquor;": "\u201e", "ldrdhar;": "\u2967", "ldrushar;": "\u294b", "ldsh;": "\u21b2", "le;": "\u2264", "lE;": "\u2266", "LeftAngleBracket;": "\u27e8", "LeftArrowBar;": "\u21e4", "leftarrow;": "\u2190", "LeftArrow;": "\u2190", "Leftarrow;": "\u21d0", "LeftArrowRightArrow;": "\u21c6", "leftarrowtail;": "\u21a2", "LeftCeiling;": "\u2308", "LeftDoubleBracket;": "\u27e6", "LeftDownTeeVector;": "\u2961", "LeftDownVectorBar;": "\u2959", "LeftDownVector;": "\u21c3", "LeftFloor;": "\u230a", "leftharpoondown;": "\u21bd", "leftharpoonup;": "\u21bc", "leftleftarrows;": "\u21c7", "leftrightarrow;": "\u2194", "LeftRightArrow;": "\u2194", "Leftrightarrow;": "\u21d4", "leftrightarrows;": "\u21c6", "leftrightharpoons;": "\u21cb", "leftrightsquigarrow;": "\u21ad", "LeftRightVector;": "\u294e", "LeftTeeArrow;": "\u21a4", "LeftTee;": "\u22a3", "LeftTeeVector;": "\u295a", "leftthreetimes;": "\u22cb", "LeftTriangleBar;": "\u29cf", "LeftTriangle;": "\u22b2", "LeftTriangleEqual;": "\u22b4", "LeftUpDownVector;": "\u2951", "LeftUpTeeVector;": "\u2960", "LeftUpVectorBar;": "\u2958", "LeftUpVector;": "\u21bf", "LeftVectorBar;": "\u2952", "LeftVector;": "\u21bc", "lEg;": "\u2a8b", "leg;": "\u22da", "leq;": "\u2264", "leqq;": "\u2266", "leqslant;": "\u2a7d", "lescc;": "\u2aa8", "les;": "\u2a7d", "lesdot;": "\u2a7f", "lesdoto;": "\u2a81", "lesdotor;": "\u2a83", "lesg;": "\u22da\ufe00", "lesges;": "\u2a93", "lessapprox;": "\u2a85", "lessdot;": "\u22d6", "lesseqgtr;": "\u22da", "lesseqqgtr;": "\u2a8b", "LessEqualGreater;": "\u22da", "LessFullEqual;": "\u2266", "LessGreater;": "\u2276", "lessgtr;": "\u2276", "LessLess;": "\u2aa1", "lesssim;": "\u2272", "LessSlantEqual;": "\u2a7d", "LessTilde;": "\u2272", "lfisht;": "\u297c", "lfloor;": "\u230a", "Lfr;": "\ud835\udd0f", "lfr;": "\ud835\udd29", "lg;": "\u2276", "lgE;": "\u2a91", "lHar;": "\u2962", "lhard;": "\u21bd", "lharu;": "\u21bc", "lharul;": "\u296a", "lhblk;": "\u2584", "LJcy;": "\u0409", "ljcy;": "\u0459", "llarr;": "\u21c7", "ll;": "\u226a", "Ll;": "\u22d8", "llcorner;": "\u231e", "Lleftarrow;": "\u21da", "llhard;": "\u296b", "lltri;": "\u25fa", "Lmidot;": "\u013f", "lmidot;": "\u0140", "lmoustache;": "\u23b0", "lmoust;": "\u23b0", "lnap;": "\u2a89", "lnapprox;": "\u2a89", "lne;": "\u2a87", "lnE;": "\u2268", "lneq;": "\u2a87", "lneqq;": "\u2268", "lnsim;": "\u22e6", "loang;": "\u27ec", "loarr;": "\u21fd", "lobrk;": "\u27e6", "longleftarrow;": "\u27f5", "LongLeftArrow;": "\u27f5", "Longleftarrow;": "\u27f8", "longleftrightarrow;": "\u27f7", "LongLeftRightArrow;": "\u27f7", "Longleftrightarrow;": "\u27fa", "longmapsto;": "\u27fc", "longrightarrow;": "\u27f6", "LongRightArrow;": "\u27f6", "Longrightarrow;": "\u27f9", "looparrowleft;": "\u21ab", "looparrowright;": "\u21ac", "lopar;": "\u2985", "Lopf;": "\ud835\udd43", "lopf;": "\ud835\udd5d", "loplus;": "\u2a2d", "lotimes;": "\u2a34", "lowast;": "\u2217", "lowbar;": "_", "LowerLeftArrow;": "\u2199", "LowerRightArrow;": "\u2198", "loz;": "\u25ca", "lozenge;": "\u25ca", "lozf;": "\u29eb", "lpar;": "(", "lparlt;": "\u2993", "lrarr;": "\u21c6", "lrcorner;": "\u231f", "lrhar;": "\u21cb", "lrhard;": "\u296d", "lrm;": "\u200e", "lrtri;": "\u22bf", "lsaquo;": "\u2039", "lscr;": "\ud835\udcc1", "Lscr;": "\u2112", "lsh;": "\u21b0", "Lsh;": "\u21b0", "lsim;": "\u2272", "lsime;": "\u2a8d", "lsimg;": "\u2a8f", "lsqb;": "[", "lsquo;": "\u2018", "lsquor;": "\u201a", "Lstrok;": "\u0141", "lstrok;": "\u0142", "ltcc;": "\u2aa6", "ltcir;": "\u2a79", "lt;": "<", lt: "<", "LT;": "<", LT: "<", "Lt;": "\u226a", "ltdot;": "\u22d6", "lthree;": "\u22cb", "ltimes;": "\u22c9", "ltlarr;": "\u2976", "ltquest;": "\u2a7b", "ltri;": "\u25c3", "ltrie;": "\u22b4", "ltrif;": "\u25c2", "ltrPar;": "\u2996", "lurdshar;": "\u294a", "luruhar;": "\u2966", "lvertneqq;": "\u2268\ufe00", "lvnE;": "\u2268\ufe00", "macr;": "\u00af", macr: "\u00af", "male;": "\u2642", "malt;": "\u2720", "maltese;": "\u2720", "Map;": "\u2905", "map;": "\u21a6", "mapsto;": "\u21a6", "mapstodown;": "\u21a7", "mapstoleft;": "\u21a4", "mapstoup;": "\u21a5", "marker;": "\u25ae", "mcomma;": "\u2a29", "Mcy;": "\u041c", "mcy;": "\u043c", "mdash;": "\u2014", "mDDot;": "\u223a", "measuredangle;": "\u2221", "MediumSpace;": "\u205f", "Mellintrf;": "\u2133", "Mfr;": "\ud835\udd10", "mfr;": "\ud835\udd2a", "mho;": "\u2127", "micro;": "\u00b5", micro: "\u00b5", "midast;": "*", "midcir;": "\u2af0", "mid;": "\u2223", "middot;": "\u00b7", middot: "\u00b7", "minusb;": "\u229f", "minus;": "\u2212", "minusd;": "\u2238", "minusdu;": "\u2a2a", "MinusPlus;": "\u2213", "mlcp;": "\u2adb", "mldr;": "\u2026", "mnplus;": "\u2213", "models;": "\u22a7", "Mopf;": "\ud835\udd44", "mopf;": "\ud835\udd5e", "mp;": "\u2213", "mscr;": "\ud835\udcc2", "Mscr;": "\u2133", "mstpos;": "\u223e", "Mu;": "\u039c", "mu;": "\u03bc", "multimap;": "\u22b8", "mumap;": "\u22b8", "nabla;": "\u2207", "Nacute;": "\u0143", "nacute;": "\u0144", "nang;": "\u2220\u20d2", "nap;": "\u2249", "napE;": "\u2a70\u0338", "napid;": "\u224b\u0338", "napos;": "\u0149", "napprox;": "\u2249", "natural;": "\u266e", "naturals;": "\u2115", "natur;": "\u266e", "nbsp;": "\u00a0", nbsp: "\u00a0", "nbump;": "\u224e\u0338", "nbumpe;": "\u224f\u0338", "ncap;": "\u2a43", "Ncaron;": "\u0147", "ncaron;": "\u0148", "Ncedil;": "\u0145", "ncedil;": "\u0146", "ncong;": "\u2247", "ncongdot;": "\u2a6d\u0338", "ncup;": "\u2a42", "Ncy;": "\u041d", "ncy;": "\u043d", "ndash;": "\u2013", "nearhk;": "\u2924", "nearr;": "\u2197", "neArr;": "\u21d7", "nearrow;": "\u2197", "ne;": "\u2260", "nedot;": "\u2250\u0338", "NegativeMediumSpace;": "\u200b", "NegativeThickSpace;": "\u200b", "NegativeThinSpace;": "\u200b", "NegativeVeryThinSpace;": "\u200b", "nequiv;": "\u2262", "nesear;": "\u2928", "nesim;": "\u2242\u0338", "NestedGreaterGreater;": "\u226b", "NestedLessLess;": "\u226a", "NewLine;": "\n", "nexist;": "\u2204", "nexists;": "\u2204", "Nfr;": "\ud835\udd11", "nfr;": "\ud835\udd2b", "ngE;": "\u2267\u0338", "nge;": "\u2271", "ngeq;": "\u2271", "ngeqq;": "\u2267\u0338", "ngeqslant;": "\u2a7e\u0338", "nges;": "\u2a7e\u0338", "nGg;": "\u22d9\u0338", "ngsim;": "\u2275", "nGt;": "\u226b\u20d2", "ngt;": "\u226f", "ngtr;": "\u226f", "nGtv;": "\u226b\u0338", "nharr;": "\u21ae", "nhArr;": "\u21ce", "nhpar;": "\u2af2", "ni;": "\u220b", "nis;": "\u22fc", "nisd;": "\u22fa", "niv;": "\u220b", "NJcy;": "\u040a", "njcy;": "\u045a", "nlarr;": "\u219a", "nlArr;": "\u21cd", "nldr;": "\u2025", "nlE;": "\u2266\u0338", "nle;": "\u2270", "nleftarrow;": "\u219a", "nLeftarrow;": "\u21cd", "nleftrightarrow;": "\u21ae", "nLeftrightarrow;": "\u21ce", "nleq;": "\u2270", "nleqq;": "\u2266\u0338", "nleqslant;": "\u2a7d\u0338", "nles;": "\u2a7d\u0338", "nless;": "\u226e", "nLl;": "\u22d8\u0338", "nlsim;": "\u2274", "nLt;": "\u226a\u20d2", "nlt;": "\u226e", "nltri;": "\u22ea", "nltrie;": "\u22ec", "nLtv;": "\u226a\u0338", "nmid;": "\u2224", "NoBreak;": "\u2060", "NonBreakingSpace;": "\u00a0", "nopf;": "\ud835\udd5f", "Nopf;": "\u2115", "Not;": "\u2aec", "not;": "\u00ac", not: "\u00ac", "NotCongruent;": "\u2262", "NotCupCap;": "\u226d", "NotDoubleVerticalBar;": "\u2226", "NotElement;": "\u2209", "NotEqual;": "\u2260", "NotEqualTilde;": "\u2242\u0338", "NotExists;": "\u2204", "NotGreater;": "\u226f", "NotGreaterEqual;": "\u2271", "NotGreaterFullEqual;": "\u2267\u0338", "NotGreaterGreater;": "\u226b\u0338", "NotGreaterLess;": "\u2279", "NotGreaterSlantEqual;": "\u2a7e\u0338", "NotGreaterTilde;": "\u2275", "NotHumpDownHump;": "\u224e\u0338", "NotHumpEqual;": "\u224f\u0338", "notin;": "\u2209", "notindot;": "\u22f5\u0338", "notinE;": "\u22f9\u0338", "notinva;": "\u2209", "notinvb;": "\u22f7", "notinvc;": "\u22f6", "NotLeftTriangleBar;": "\u29cf\u0338", "NotLeftTriangle;": "\u22ea", "NotLeftTriangleEqual;": "\u22ec", "NotLess;": "\u226e", "NotLessEqual;": "\u2270", "NotLessGreater;": "\u2278", "NotLessLess;": "\u226a\u0338", "NotLessSlantEqual;": "\u2a7d\u0338", "NotLessTilde;": "\u2274", "NotNestedGreaterGreater;": "\u2aa2\u0338", "NotNestedLessLess;": "\u2aa1\u0338", "notni;": "\u220c", "notniva;": "\u220c", "notnivb;": "\u22fe", "notnivc;": "\u22fd", "NotPrecedes;": "\u2280", "NotPrecedesEqual;": "\u2aaf\u0338", "NotPrecedesSlantEqual;": "\u22e0", "NotReverseElement;": "\u220c", "NotRightTriangleBar;": "\u29d0\u0338", "NotRightTriangle;": "\u22eb", "NotRightTriangleEqual;": "\u22ed", "NotSquareSubset;": "\u228f\u0338", "NotSquareSubsetEqual;": "\u22e2", "NotSquareSuperset;": "\u2290\u0338", "NotSquareSupersetEqual;": "\u22e3", "NotSubset;": "\u2282\u20d2", "NotSubsetEqual;": "\u2288", "NotSucceeds;": "\u2281", "NotSucceedsEqual;": "\u2ab0\u0338", "NotSucceedsSlantEqual;": "\u22e1", "NotSucceedsTilde;": "\u227f\u0338", "NotSuperset;": "\u2283\u20d2", "NotSupersetEqual;": "\u2289", "NotTilde;": "\u2241", "NotTildeEqual;": "\u2244", "NotTildeFullEqual;": "\u2247", "NotTildeTilde;": "\u2249", "NotVerticalBar;": "\u2224", "nparallel;": "\u2226", "npar;": "\u2226", "nparsl;": "\u2afd\u20e5", "npart;": "\u2202\u0338", "npolint;": "\u2a14", "npr;": "\u2280", "nprcue;": "\u22e0", "nprec;": "\u2280", "npreceq;": "\u2aaf\u0338", "npre;": "\u2aaf\u0338", "nrarrc;": "\u2933\u0338", "nrarr;": "\u219b", "nrArr;": "\u21cf", "nrarrw;": "\u219d\u0338", "nrightarrow;": "\u219b", "nRightarrow;": "\u21cf", "nrtri;": "\u22eb", "nrtrie;": "\u22ed", "nsc;": "\u2281", "nsccue;": "\u22e1", "nsce;": "\u2ab0\u0338", "Nscr;": "\ud835\udca9", "nscr;": "\ud835\udcc3", "nshortmid;": "\u2224", "nshortparallel;": "\u2226", "nsim;": "\u2241", "nsime;": "\u2244", "nsimeq;": "\u2244", "nsmid;": "\u2224", "nspar;": "\u2226", "nsqsube;": "\u22e2", "nsqsupe;": "\u22e3", "nsub;": "\u2284", "nsubE;": "\u2ac5\u0338", "nsube;": "\u2288", "nsubset;": "\u2282\u20d2", "nsubseteq;": "\u2288", "nsubseteqq;": "\u2ac5\u0338", "nsucc;": "\u2281", "nsucceq;": "\u2ab0\u0338", "nsup;": "\u2285", "nsupE;": "\u2ac6\u0338", "nsupe;": "\u2289", "nsupset;": "\u2283\u20d2", "nsupseteq;": "\u2289", "nsupseteqq;": "\u2ac6\u0338", "ntgl;": "\u2279", "Ntilde;": "\u00d1", Ntilde: "\u00d1", "ntilde;": "\u00f1", ntilde: "\u00f1", "ntlg;": "\u2278", "ntriangleleft;": "\u22ea", "ntrianglelefteq;": "\u22ec", "ntriangleright;": "\u22eb", "ntrianglerighteq;": "\u22ed", "Nu;": "\u039d", "nu;": "\u03bd", "num;": "#", "numero;": "\u2116", "numsp;": "\u2007", "nvap;": "\u224d\u20d2", "nvdash;": "\u22ac", "nvDash;": "\u22ad", "nVdash;": "\u22ae", "nVDash;": "\u22af", "nvge;": "\u2265\u20d2", "nvgt;": ">\u20d2", "nvHarr;": "\u2904", "nvinfin;": "\u29de", "nvlArr;": "\u2902", "nvle;": "\u2264\u20d2", "nvlt;": "<\u20d2", "nvltrie;": "\u22b4\u20d2", "nvrArr;": "\u2903", "nvrtrie;": "\u22b5\u20d2", "nvsim;": "\u223c\u20d2", "nwarhk;": "\u2923", "nwarr;": "\u2196", "nwArr;": "\u21d6", "nwarrow;": "\u2196", "nwnear;": "\u2927", "Oacute;": "\u00d3", Oacute: "\u00d3", "oacute;": "\u00f3", oacute: "\u00f3", "oast;": "\u229b", "Ocirc;": "\u00d4", Ocirc: "\u00d4", "ocirc;": "\u00f4", ocirc: "\u00f4", "ocir;": "\u229a", "Ocy;": "\u041e", "ocy;": "\u043e", "odash;": "\u229d", "Odblac;": "\u0150", "odblac;": "\u0151", "odiv;": "\u2a38", "odot;": "\u2299", "odsold;": "\u29bc", "OElig;": "\u0152", "oelig;": "\u0153", "ofcir;": "\u29bf", "Ofr;": "\ud835\udd12", "ofr;": "\ud835\udd2c", "ogon;": "\u02db", "Ograve;": "\u00d2", Ograve: "\u00d2", "ograve;": "\u00f2", ograve: "\u00f2", "ogt;": "\u29c1", "ohbar;": "\u29b5", "ohm;": "\u03a9", "oint;": "\u222e", "olarr;": "\u21ba", "olcir;": "\u29be", "olcross;": "\u29bb", "oline;": "\u203e", "olt;": "\u29c0", "Omacr;": "\u014c", "omacr;": "\u014d", "Omega;": "\u03a9", "omega;": "\u03c9", "Omicron;": "\u039f", "omicron;": "\u03bf", "omid;": "\u29b6", "ominus;": "\u2296", "Oopf;": "\ud835\udd46", "oopf;": "\ud835\udd60", "opar;": "\u29b7", "OpenCurlyDoubleQuote;": "\u201c", "OpenCurlyQuote;": "\u2018", "operp;": "\u29b9", "oplus;": "\u2295", "orarr;": "\u21bb", "Or;": "\u2a54", "or;": "\u2228", "ord;": "\u2a5d", "order;": "\u2134", "orderof;": "\u2134", "ordf;": "\u00aa", ordf: "\u00aa", "ordm;": "\u00ba", ordm: "\u00ba", "origof;": "\u22b6", "oror;": "\u2a56", "orslope;": "\u2a57", "orv;": "\u2a5b", "oS;": "\u24c8", "Oscr;": "\ud835\udcaa", "oscr;": "\u2134", "Oslash;": "\u00d8", Oslash: "\u00d8", "oslash;": "\u00f8", oslash: "\u00f8", "osol;": "\u2298", "Otilde;": "\u00d5", Otilde: "\u00d5", "otilde;": "\u00f5", otilde: "\u00f5", "otimesas;": "\u2a36", "Otimes;": "\u2a37", "otimes;": "\u2297", "Ouml;": "\u00d6", Ouml: "\u00d6", "ouml;": "\u00f6", ouml: "\u00f6", "ovbar;": "\u233d", "OverBar;": "\u203e", "OverBrace;": "\u23de", "OverBracket;": "\u23b4", "OverParenthesis;": "\u23dc", "para;": "\u00b6", para: "\u00b6", "parallel;": "\u2225", "par;": "\u2225", "parsim;": "\u2af3", "parsl;": "\u2afd", "part;": "\u2202", "PartialD;": "\u2202", "Pcy;": "\u041f", "pcy;": "\u043f", "percnt;": "%", "period;": ".", "permil;": "\u2030", "perp;": "\u22a5", "pertenk;": "\u2031", "Pfr;": "\ud835\udd13", "pfr;": "\ud835\udd2d", "Phi;": "\u03a6", "phi;": "\u03c6", "phiv;": "\u03d5", "phmmat;": "\u2133", "phone;": "\u260e", "Pi;": "\u03a0", "pi;": "\u03c0", "pitchfork;": "\u22d4", "piv;": "\u03d6", "planck;": "\u210f", "planckh;": "\u210e", "plankv;": "\u210f", "plusacir;": "\u2a23", "plusb;": "\u229e", "pluscir;": "\u2a22", "plus;": "+", "plusdo;": "\u2214", "plusdu;": "\u2a25", "pluse;": "\u2a72", "PlusMinus;": "\u00b1", "plusmn;": "\u00b1", plusmn: "\u00b1", "plussim;": "\u2a26", "plustwo;": "\u2a27", "pm;": "\u00b1", "Poincareplane;": "\u210c", "pointint;": "\u2a15", "popf;": "\ud835\udd61", "Popf;": "\u2119", "pound;": "\u00a3", pound: "\u00a3", "prap;": "\u2ab7", "Pr;": "\u2abb", "pr;": "\u227a", "prcue;": "\u227c", "precapprox;": "\u2ab7", "prec;": "\u227a", "preccurlyeq;": "\u227c", "Precedes;": "\u227a", "PrecedesEqual;": "\u2aaf", "PrecedesSlantEqual;": "\u227c", "PrecedesTilde;": "\u227e", "preceq;": "\u2aaf", "precnapprox;": "\u2ab9", "precneqq;": "\u2ab5", "precnsim;": "\u22e8", "pre;": "\u2aaf", "prE;": "\u2ab3", "precsim;": "\u227e", "prime;": "\u2032", "Prime;": "\u2033", "primes;": "\u2119", "prnap;": "\u2ab9", "prnE;": "\u2ab5", "prnsim;": "\u22e8", "prod;": "\u220f", "Product;": "\u220f", "profalar;": "\u232e", "profline;": "\u2312", "profsurf;": "\u2313", "prop;": "\u221d", "Proportional;": "\u221d", "Proportion;": "\u2237", "propto;": "\u221d", "prsim;": "\u227e", "prurel;": "\u22b0", "Pscr;": "\ud835\udcab", "pscr;": "\ud835\udcc5", "Psi;": "\u03a8", "psi;": "\u03c8", "puncsp;": "\u2008", "Qfr;": "\ud835\udd14", "qfr;": "\ud835\udd2e", "qint;": "\u2a0c", "qopf;": "\ud835\udd62", "Qopf;": "\u211a", "qprime;": "\u2057", "Qscr;": "\ud835\udcac", "qscr;": "\ud835\udcc6", "quaternions;": "\u210d", "quatint;": "\u2a16", "quest;": "?", "questeq;": "\u225f", "quot;": '"', quot: '"', "QUOT;": '"', QUOT: '"', "rAarr;": "\u21db", "race;": "\u223d\u0331", "Racute;": "\u0154", "racute;": "\u0155", "radic;": "\u221a", "raemptyv;": "\u29b3", "rang;": "\u27e9", "Rang;": "\u27eb", "rangd;": "\u2992", "range;": "\u29a5", "rangle;": "\u27e9", "raquo;": "\u00bb", raquo: "\u00bb", "rarrap;": "\u2975", "rarrb;": "\u21e5", "rarrbfs;": "\u2920", "rarrc;": "\u2933", "rarr;": "\u2192", "Rarr;": "\u21a0", "rArr;": "\u21d2", "rarrfs;": "\u291e", "rarrhk;": "\u21aa", "rarrlp;": "\u21ac", "rarrpl;": "\u2945", "rarrsim;": "\u2974", "Rarrtl;": "\u2916", "rarrtl;": "\u21a3", "rarrw;": "\u219d", "ratail;": "\u291a", "rAtail;": "\u291c", "ratio;": "\u2236", "rationals;": "\u211a", "rbarr;": "\u290d", "rBarr;": "\u290f", "RBarr;": "\u2910", "rbbrk;": "\u2773", "rbrace;": "}", "rbrack;": "]", "rbrke;": "\u298c", "rbrksld;": "\u298e", "rbrkslu;": "\u2990", "Rcaron;": "\u0158", "rcaron;": "\u0159", "Rcedil;": "\u0156", "rcedil;": "\u0157", "rceil;": "\u2309", "rcub;": "}", "Rcy;": "\u0420", "rcy;": "\u0440", "rdca;": "\u2937", "rdldhar;": "\u2969", "rdquo;": "\u201d", "rdquor;": "\u201d", "rdsh;": "\u21b3", "real;": "\u211c", "realine;": "\u211b", "realpart;": "\u211c", "reals;": "\u211d", "Re;": "\u211c", "rect;": "\u25ad", "reg;": "\u00ae", reg: "\u00ae", "REG;": "\u00ae", REG: "\u00ae", "ReverseElement;": "\u220b", "ReverseEquilibrium;": "\u21cb", "ReverseUpEquilibrium;": "\u296f", "rfisht;": "\u297d", "rfloor;": "\u230b", "rfr;": "\ud835\udd2f", "Rfr;": "\u211c", "rHar;": "\u2964", "rhard;": "\u21c1", "rharu;": "\u21c0", "rharul;": "\u296c", "Rho;": "\u03a1", "rho;": "\u03c1", "rhov;": "\u03f1", "RightAngleBracket;": "\u27e9", "RightArrowBar;": "\u21e5", "rightarrow;": "\u2192", "RightArrow;": "\u2192", "Rightarrow;": "\u21d2", "RightArrowLeftArrow;": "\u21c4", "rightarrowtail;": "\u21a3", "RightCeiling;": "\u2309", "RightDoubleBracket;": "\u27e7", "RightDownTeeVector;": "\u295d", "RightDownVectorBar;": "\u2955", "RightDownVector;": "\u21c2", "RightFloor;": "\u230b", "rightharpoondown;": "\u21c1", "rightharpoonup;": "\u21c0", "rightleftarrows;": "\u21c4", "rightleftharpoons;": "\u21cc", "rightrightarrows;": "\u21c9", "rightsquigarrow;": "\u219d", "RightTeeArrow;": "\u21a6", "RightTee;": "\u22a2", "RightTeeVector;": "\u295b", "rightthreetimes;": "\u22cc", "RightTriangleBar;": "\u29d0", "RightTriangle;": "\u22b3", "RightTriangleEqual;": "\u22b5", "RightUpDownVector;": "\u294f", "RightUpTeeVector;": "\u295c", "RightUpVectorBar;": "\u2954", "RightUpVector;": "\u21be", "RightVectorBar;": "\u2953", "RightVector;": "\u21c0", "ring;": "\u02da", "risingdotseq;": "\u2253", "rlarr;": "\u21c4", "rlhar;": "\u21cc", "rlm;": "\u200f", "rmoustache;": "\u23b1", "rmoust;": "\u23b1", "rnmid;": "\u2aee", "roang;": "\u27ed", "roarr;": "\u21fe", "robrk;": "\u27e7", "ropar;": "\u2986", "ropf;": "\ud835\udd63", "Ropf;": "\u211d", "roplus;": "\u2a2e", "rotimes;": "\u2a35", "RoundImplies;": "\u2970", "rpar;": ")", "rpargt;": "\u2994", "rppolint;": "\u2a12", "rrarr;": "\u21c9", "Rrightarrow;": "\u21db", "rsaquo;": "\u203a", "rscr;": "\ud835\udcc7", "Rscr;": "\u211b", "rsh;": "\u21b1", "Rsh;": "\u21b1", "rsqb;": "]", "rsquo;": "\u2019", "rsquor;": "\u2019", "rthree;": "\u22cc", "rtimes;": "\u22ca", "rtri;": "\u25b9", "rtrie;": "\u22b5", "rtrif;": "\u25b8", "rtriltri;": "\u29ce", "RuleDelayed;": "\u29f4", "ruluhar;": "\u2968", "rx;": "\u211e", "Sacute;": "\u015a", "sacute;": "\u015b", "sbquo;": "\u201a", "scap;": "\u2ab8", "Scaron;": "\u0160", "scaron;": "\u0161", "Sc;": "\u2abc", "sc;": "\u227b", "sccue;": "\u227d", "sce;": "\u2ab0", "scE;": "\u2ab4", "Scedil;": "\u015e", "scedil;": "\u015f", "Scirc;": "\u015c", "scirc;": "\u015d", "scnap;": "\u2aba", "scnE;": "\u2ab6", "scnsim;": "\u22e9", "scpolint;": "\u2a13", "scsim;": "\u227f", "Scy;": "\u0421", "scy;": "\u0441", "sdotb;": "\u22a1", "sdot;": "\u22c5", "sdote;": "\u2a66", "searhk;": "\u2925", "searr;": "\u2198", "seArr;": "\u21d8", "searrow;": "\u2198", "sect;": "\u00a7", sect: "\u00a7", "semi;": ";", "seswar;": "\u2929", "setminus;": "\u2216", "setmn;": "\u2216", "sext;": "\u2736", "Sfr;": "\ud835\udd16", "sfr;": "\ud835\udd30", "sfrown;": "\u2322", "sharp;": "\u266f", "SHCHcy;": "\u0429", "shchcy;": "\u0449", "SHcy;": "\u0428", "shcy;": "\u0448", "ShortDownArrow;": "\u2193", "ShortLeftArrow;": "\u2190", "shortmid;": "\u2223", "shortparallel;": "\u2225", "ShortRightArrow;": "\u2192", "ShortUpArrow;": "\u2191", "shy;": "\u00ad", shy: "\u00ad", "Sigma;": "\u03a3", "sigma;": "\u03c3", "sigmaf;": "\u03c2", "sigmav;": "\u03c2", "sim;": "\u223c", "simdot;": "\u2a6a", "sime;": "\u2243", "simeq;": "\u2243", "simg;": "\u2a9e", "simgE;": "\u2aa0", "siml;": "\u2a9d", "simlE;": "\u2a9f", "simne;": "\u2246", "simplus;": "\u2a24", "simrarr;": "\u2972", "slarr;": "\u2190", "SmallCircle;": "\u2218", "smallsetminus;": "\u2216", "smashp;": "\u2a33", "smeparsl;": "\u29e4", "smid;": "\u2223", "smile;": "\u2323", "smt;": "\u2aaa", "smte;": "\u2aac", "smtes;": "\u2aac\ufe00", "SOFTcy;": "\u042c", "softcy;": "\u044c", "solbar;": "\u233f", "solb;": "\u29c4", "sol;": "/", "Sopf;": "\ud835\udd4a", "sopf;": "\ud835\udd64", "spades;": "\u2660", "spadesuit;": "\u2660", "spar;": "\u2225", "sqcap;": "\u2293", "sqcaps;": "\u2293\ufe00", "sqcup;": "\u2294", "sqcups;": "\u2294\ufe00", "Sqrt;": "\u221a", "sqsub;": "\u228f", "sqsube;": "\u2291", "sqsubset;": "\u228f", "sqsubseteq;": "\u2291", "sqsup;": "\u2290", "sqsupe;": "\u2292", "sqsupset;": "\u2290", "sqsupseteq;": "\u2292", "square;": "\u25a1", "Square;": "\u25a1", "SquareIntersection;": "\u2293", "SquareSubset;": "\u228f", "SquareSubsetEqual;": "\u2291", "SquareSuperset;": "\u2290", "SquareSupersetEqual;": "\u2292", "SquareUnion;": "\u2294", "squarf;": "\u25aa", "squ;": "\u25a1", "squf;": "\u25aa", "srarr;": "\u2192", "Sscr;": "\ud835\udcae", "sscr;": "\ud835\udcc8", "ssetmn;": "\u2216", "ssmile;": "\u2323", "sstarf;": "\u22c6", "Star;": "\u22c6", "star;": "\u2606", "starf;": "\u2605", "straightepsilon;": "\u03f5", "straightphi;": "\u03d5", "strns;": "\u00af", "sub;": "\u2282", "Sub;": "\u22d0", "subdot;": "\u2abd", "subE;": "\u2ac5", "sube;": "\u2286", "subedot;": "\u2ac3", "submult;": "\u2ac1", "subnE;": "\u2acb", "subne;": "\u228a", "subplus;": "\u2abf", "subrarr;": "\u2979", "subset;": "\u2282", "Subset;": "\u22d0", "subseteq;": "\u2286", "subseteqq;": "\u2ac5", "SubsetEqual;": "\u2286", "subsetneq;": "\u228a", "subsetneqq;": "\u2acb", "subsim;": "\u2ac7", "subsub;": "\u2ad5", "subsup;": "\u2ad3", "succapprox;": "\u2ab8", "succ;": "\u227b", "succcurlyeq;": "\u227d", "Succeeds;": "\u227b", "SucceedsEqual;": "\u2ab0", "SucceedsSlantEqual;": "\u227d", "SucceedsTilde;": "\u227f", "succeq;": "\u2ab0", "succnapprox;": "\u2aba", "succneqq;": "\u2ab6", "succnsim;": "\u22e9", "succsim;": "\u227f", "SuchThat;": "\u220b", "sum;": "\u2211", "Sum;": "\u2211", "sung;": "\u266a", "sup1;": "\u00b9", sup1: "\u00b9", "sup2;": "\u00b2", sup2: "\u00b2", "sup3;": "\u00b3", sup3: "\u00b3", "sup;": "\u2283", "Sup;": "\u22d1", "supdot;": "\u2abe", "supdsub;": "\u2ad8", "supE;": "\u2ac6", "supe;": "\u2287", "supedot;": "\u2ac4", "Superset;": "\u2283", "SupersetEqual;": "\u2287", "suphsol;": "\u27c9", "suphsub;": "\u2ad7", "suplarr;": "\u297b", "supmult;": "\u2ac2", "supnE;": "\u2acc", "supne;": "\u228b", "supplus;": "\u2ac0", "supset;": "\u2283", "Supset;": "\u22d1", "supseteq;": "\u2287", "supseteqq;": "\u2ac6", "supsetneq;": "\u228b", "supsetneqq;": "\u2acc", "supsim;": "\u2ac8", "supsub;": "\u2ad4", "supsup;": "\u2ad6", "swarhk;": "\u2926", "swarr;": "\u2199", "swArr;": "\u21d9", "swarrow;": "\u2199", "swnwar;": "\u292a", "szlig;": "\u00df", szlig: "\u00df", "Tab;": "	", "target;": "\u2316", "Tau;": "\u03a4", "tau;": "\u03c4", "tbrk;": "\u23b4", "Tcaron;": "\u0164", "tcaron;": "\u0165", "Tcedil;": "\u0162", "tcedil;": "\u0163", "Tcy;": "\u0422", "tcy;": "\u0442", "tdot;": "\u20db", "telrec;": "\u2315", "Tfr;": "\ud835\udd17", "tfr;": "\ud835\udd31", "there4;": "\u2234", "therefore;": "\u2234", "Therefore;": "\u2234", "Theta;": "\u0398", "theta;": "\u03b8", "thetasym;": "\u03d1", "thetav;": "\u03d1", "thickapprox;": "\u2248", "thicksim;": "\u223c", "ThickSpace;": "\u205f\u200a", "ThinSpace;": "\u2009", "thinsp;": "\u2009", "thkap;": "\u2248", "thksim;": "\u223c", "THORN;": "\u00de", THORN: "\u00de", "thorn;": "\u00fe", thorn: "\u00fe", "tilde;": "\u02dc", "Tilde;": "\u223c", "TildeEqual;": "\u2243", "TildeFullEqual;": "\u2245", "TildeTilde;": "\u2248", "timesbar;": "\u2a31", "timesb;": "\u22a0", "times;": "\u00d7", times: "\u00d7", "timesd;": "\u2a30", "tint;": "\u222d", "toea;": "\u2928", "topbot;": "\u2336", "topcir;": "\u2af1", "top;": "\u22a4", "Topf;": "\ud835\udd4b", "topf;": "\ud835\udd65", "topfork;": "\u2ada", "tosa;": "\u2929", "tprime;": "\u2034", "trade;": "\u2122", "TRADE;": "\u2122", "triangle;": "\u25b5", "triangledown;": "\u25bf", "triangleleft;": "\u25c3", "trianglelefteq;": "\u22b4", "triangleq;": "\u225c", "triangleright;": "\u25b9", "trianglerighteq;": "\u22b5", "tridot;": "\u25ec", "trie;": "\u225c", "triminus;": "\u2a3a", "TripleDot;": "\u20db", "triplus;": "\u2a39", "trisb;": "\u29cd", "tritime;": "\u2a3b", "trpezium;": "\u23e2", "Tscr;": "\ud835\udcaf", "tscr;": "\ud835\udcc9", "TScy;": "\u0426", "tscy;": "\u0446", "TSHcy;": "\u040b", "tshcy;": "\u045b", "Tstrok;": "\u0166", "tstrok;": "\u0167", "twixt;": "\u226c", "twoheadleftarrow;": "\u219e", "twoheadrightarrow;": "\u21a0", "Uacute;": "\u00da", Uacute: "\u00da", "uacute;": "\u00fa", uacute: "\u00fa", "uarr;": "\u2191", "Uarr;": "\u219f", "uArr;": "\u21d1", "Uarrocir;": "\u2949", "Ubrcy;": "\u040e", "ubrcy;": "\u045e", "Ubreve;": "\u016c", "ubreve;": "\u016d", "Ucirc;": "\u00db", Ucirc: "\u00db", "ucirc;": "\u00fb", ucirc: "\u00fb", "Ucy;": "\u0423", "ucy;": "\u0443", "udarr;": "\u21c5", "Udblac;": "\u0170", "udblac;": "\u0171", "udhar;": "\u296e", "ufisht;": "\u297e", "Ufr;": "\ud835\udd18", "ufr;": "\ud835\udd32", "Ugrave;": "\u00d9", Ugrave: "\u00d9", "ugrave;": "\u00f9", ugrave: "\u00f9", "uHar;": "\u2963", "uharl;": "\u21bf", "uharr;": "\u21be", "uhblk;": "\u2580", "ulcorn;": "\u231c", "ulcorner;": "\u231c", "ulcrop;": "\u230f", "ultri;": "\u25f8", "Umacr;": "\u016a", "umacr;": "\u016b", "uml;": "\u00a8", uml: "\u00a8", "UnderBar;": "_", "UnderBrace;": "\u23df", "UnderBracket;": "\u23b5", "UnderParenthesis;": "\u23dd", "Union;": "\u22c3", "UnionPlus;": "\u228e", "Uogon;": "\u0172", "uogon;": "\u0173", "Uopf;": "\ud835\udd4c", "uopf;": "\ud835\udd66", "UpArrowBar;": "\u2912", "uparrow;": "\u2191", "UpArrow;": "\u2191", "Uparrow;": "\u21d1", "UpArrowDownArrow;": "\u21c5", "updownarrow;": "\u2195", "UpDownArrow;": "\u2195", "Updownarrow;": "\u21d5", "UpEquilibrium;": "\u296e", "upharpoonleft;": "\u21bf", "upharpoonright;": "\u21be", "uplus;": "\u228e", "UpperLeftArrow;": "\u2196", "UpperRightArrow;": "\u2197", "upsi;": "\u03c5", "Upsi;": "\u03d2", "upsih;": "\u03d2", "Upsilon;": "\u03a5", "upsilon;": "\u03c5", "UpTeeArrow;": "\u21a5", "UpTee;": "\u22a5", "upuparrows;": "\u21c8", "urcorn;": "\u231d", "urcorner;": "\u231d", "urcrop;": "\u230e", "Uring;": "\u016e", "uring;": "\u016f", "urtri;": "\u25f9", "Uscr;": "\ud835\udcb0", "uscr;": "\ud835\udcca", "utdot;": "\u22f0", "Utilde;": "\u0168", "utilde;": "\u0169", "utri;": "\u25b5", "utrif;": "\u25b4", "uuarr;": "\u21c8", "Uuml;": "\u00dc", Uuml: "\u00dc", "uuml;": "\u00fc", uuml: "\u00fc", "uwangle;": "\u29a7", "vangrt;": "\u299c", "varepsilon;": "\u03f5", "varkappa;": "\u03f0", "varnothing;": "\u2205", "varphi;": "\u03d5", "varpi;": "\u03d6", "varpropto;": "\u221d", "varr;": "\u2195", "vArr;": "\u21d5", "varrho;": "\u03f1", "varsigma;": "\u03c2", "varsubsetneq;": "\u228a\ufe00", "varsubsetneqq;": "\u2acb\ufe00", "varsupsetneq;": "\u228b\ufe00", "varsupsetneqq;": "\u2acc\ufe00", "vartheta;": "\u03d1", "vartriangleleft;": "\u22b2", "vartriangleright;": "\u22b3", "vBar;": "\u2ae8", "Vbar;": "\u2aeb", "vBarv;": "\u2ae9", "Vcy;": "\u0412", "vcy;": "\u0432", "vdash;": "\u22a2", "vDash;": "\u22a8", "Vdash;": "\u22a9", "VDash;": "\u22ab", "Vdashl;": "\u2ae6", "veebar;": "\u22bb", "vee;": "\u2228", "Vee;": "\u22c1", "veeeq;": "\u225a", "vellip;": "\u22ee", "verbar;": "|", "Verbar;": "\u2016", "vert;": "|", "Vert;": "\u2016", "VerticalBar;": "\u2223", "VerticalLine;": "|", "VerticalSeparator;": "\u2758", "VerticalTilde;": "\u2240", "VeryThinSpace;": "\u200a", "Vfr;": "\ud835\udd19", "vfr;": "\ud835\udd33", "vltri;": "\u22b2", "vnsub;": "\u2282\u20d2", "vnsup;": "\u2283\u20d2", "Vopf;": "\ud835\udd4d", "vopf;": "\ud835\udd67", "vprop;": "\u221d", "vrtri;": "\u22b3", "Vscr;": "\ud835\udcb1", "vscr;": "\ud835\udccb", "vsubnE;": "\u2acb\ufe00", "vsubne;": "\u228a\ufe00", "vsupnE;": "\u2acc\ufe00", "vsupne;": "\u228b\ufe00", "Vvdash;": "\u22aa", "vzigzag;": "\u299a", "Wcirc;": "\u0174", "wcirc;": "\u0175", "wedbar;": "\u2a5f", "wedge;": "\u2227", "Wedge;": "\u22c0", "wedgeq;": "\u2259", "weierp;": "\u2118", "Wfr;": "\ud835\udd1a", "wfr;": "\ud835\udd34", "Wopf;": "\ud835\udd4e", "wopf;": "\ud835\udd68", "wp;": "\u2118", "wr;": "\u2240", "wreath;": "\u2240", "Wscr;": "\ud835\udcb2", "wscr;": "\ud835\udccc", "xcap;": "\u22c2", "xcirc;": "\u25ef", "xcup;": "\u22c3", "xdtri;": "\u25bd", "Xfr;": "\ud835\udd1b", "xfr;": "\ud835\udd35", "xharr;": "\u27f7", "xhArr;": "\u27fa", "Xi;": "\u039e", "xi;": "\u03be", "xlarr;": "\u27f5", "xlArr;": "\u27f8", "xmap;": "\u27fc", "xnis;": "\u22fb", "xodot;": "\u2a00", "Xopf;": "\ud835\udd4f", "xopf;": "\ud835\udd69", "xoplus;": "\u2a01", "xotime;": "\u2a02", "xrarr;": "\u27f6", "xrArr;": "\u27f9", "Xscr;": "\ud835\udcb3", "xscr;": "\ud835\udccd", "xsqcup;": "\u2a06", "xuplus;": "\u2a04", "xutri;": "\u25b3", "xvee;": "\u22c1", "xwedge;": "\u22c0", "Yacute;": "\u00dd", Yacute: "\u00dd", "yacute;": "\u00fd", yacute: "\u00fd", "YAcy;": "\u042f", "yacy;": "\u044f", "Ycirc;": "\u0176", "ycirc;": "\u0177", "Ycy;": "\u042b", "ycy;": "\u044b", "yen;": "\u00a5", yen: "\u00a5", "Yfr;": "\ud835\udd1c", "yfr;": "\ud835\udd36", "YIcy;": "\u0407", "yicy;": "\u0457", "Yopf;": "\ud835\udd50", "yopf;": "\ud835\udd6a", "Yscr;": "\ud835\udcb4", "yscr;": "\ud835\udcce", "YUcy;": "\u042e", "yucy;": "\u044e", "yuml;": "\u00ff", yuml: "\u00ff", "Yuml;": "\u0178", "Zacute;": "\u0179", "zacute;": "\u017a", "Zcaron;": "\u017d", "zcaron;": "\u017e", "Zcy;": "\u0417", "zcy;": "\u0437", "Zdot;": "\u017b", "zdot;": "\u017c", "zeetrf;": "\u2128", "ZeroWidthSpace;": "\u200b", "Zeta;": "\u0396", "zeta;": "\u03b6", "zfr;": "\ud835\udd37", "Zfr;": "\u2128", "ZHcy;": "\u0416", "zhcy;": "\u0436", "zigrarr;": "\u21dd", "zopf;": "\ud835\udd6b", "Zopf;": "\u2124", "Zscr;": "\ud835\udcb5", "zscr;": "\ud835\udccf", "zwj;": "\u200d", "zwnj;": "\u200c" };
    }, {}], 13: [function (e, t, n) {
      function u(e, t) {
        return r.isUndefined(t) ? "" + t : r.isNumber(t) && (isNaN(t) || !isFinite(t)) ? t.toString() : r.isFunction(t) || r.isRegExp(t) ? t.toString() : t;
      }function a(e, t) {
        return r.isString(e) ? e.length < t ? e : e.slice(0, t) : e;
      }function f(e) {
        return a(JSON.stringify(e.actual, u), 128) + " " + e.operator + " " + a(JSON.stringify(e.expected, u), 128);
      }function l(e, t, n, r, i) {
        throw new o.AssertionError({ message: n, actual: e, expected: t, operator: r, stackStartFunction: i });
      }function c(e, t) {
        e || l(e, !0, t, "==", o.ok);
      }function h(e, t) {
        if (e === t) return !0;if (r.isBuffer(e) && r.isBuffer(t)) {
          if (e.length != t.length) return !1;for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;return !0;
        }return r.isDate(e) && r.isDate(t) ? e.getTime() === t.getTime() : r.isRegExp(e) && r.isRegExp(t) ? e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.lastIndex === t.lastIndex && e.ignoreCase === t.ignoreCase : !r.isObject(e) && !r.isObject(t) ? e == t : d(e, t);
      }function p(e) {
        return Object.prototype.toString.call(e) == "[object Arguments]";
      }function d(e, t) {
        if (r.isNullOrUndefined(e) || r.isNullOrUndefined(t)) return !1;if (e.prototype !== t.prototype) return !1;if (p(e)) return p(t) ? (e = i.call(e), t = i.call(t), h(e, t)) : !1;try {
          var n = g(e),
              s = g(t),
              o,
              u;
        } catch (a) {
          return !1;
        }if (n.length != s.length) return !1;n.sort(), s.sort();for (u = n.length - 1; u >= 0; u--) if (n[u] != s[u]) return !1;for (u = n.length - 1; u >= 0; u--) {
          o = n[u];if (!h(e[o], t[o])) return !1;
        }return !0;
      }function v(e, t) {
        return !e || !t ? !1 : Object.prototype.toString.call(t) == "[object RegExp]" ? t.test(e) : e instanceof t ? !0 : t.call({}, e) === !0 ? !0 : !1;
      }function m(e, t, n, i) {
        var s;r.isString(n) && (i = n, n = null);try {
          t();
        } catch (o) {
          s = o;
        }i = (n && n.name ? " (" + n.name + ")." : ".") + (i ? " " + i : "."), e && !s && l(s, n, "Missing expected exception" + i), !e && v(s, n) && l(s, n, "Got unwanted exception" + i);if (e && s && n && !v(s, n) || !e && s) throw s;
      }var r = e("util/"),
          i = Array.prototype.slice,
          s = Object.prototype.hasOwnProperty,
          o = t.exports = c;o.AssertionError = function (t) {
        this.name = "AssertionError", this.actual = t.actual, this.expected = t.expected, this.operator = t.operator, t.message ? (this.message = t.message, this.generatedMessage = !1) : (this.message = f(this), this.generatedMessage = !0);var n = t.stackStartFunction || l;if (Error.captureStackTrace) Error.captureStackTrace(this, n);else {
          var r = new Error();if (r.stack) {
            var i = r.stack,
                s = n.name,
                o = i.indexOf("\n" + s);if (o >= 0) {
              var u = i.indexOf("\n", o + 1);i = i.substring(u + 1);
            }this.stack = i;
          }
        }
      }, r.inherits(o.AssertionError, Error), o.fail = l, o.ok = c, o.equal = function (t, n, r) {
        t != n && l(t, n, r, "==", o.equal);
      }, o.notEqual = function (t, n, r) {
        t == n && l(t, n, r, "!=", o.notEqual);
      }, o.deepEqual = function (t, n, r) {
        h(t, n) || l(t, n, r, "deepEqual", o.deepEqual);
      }, o.notDeepEqual = function (t, n, r) {
        h(t, n) && l(t, n, r, "notDeepEqual", o.notDeepEqual);
      }, o.strictEqual = function (t, n, r) {
        t !== n && l(t, n, r, "===", o.strictEqual);
      }, o.notStrictEqual = function (t, n, r) {
        t === n && l(t, n, r, "!==", o.notStrictEqual);
      }, o.throws = function (e, t, n) {
        m.apply(this, [!0].concat(i.call(arguments)));
      }, o.doesNotThrow = function (e, t) {
        m.apply(this, [!1].concat(i.call(arguments)));
      }, o.ifError = function (e) {
        if (e) throw e;
      };var g = Object.keys || function (e) {
        var t = [];for (var n in e) s.call(e, n) && t.push(n);return t;
      };
    }, { "util/": 15 }], 14: [function (e, t, n) {
      t.exports = function (t) {
        return t && typeof t == "object" && typeof t.copy == "function" && typeof t.fill == "function" && typeof t.readUInt8 == "function";
      };
    }, {}], 15: [function (e, t, n) {
      (function (t, r) {
        function u(e, t) {
          var r = { seen: [], stylize: f };return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), y(t) ? r.showHidden = t : t && n._extend(r, t), T(r.showHidden) && (r.showHidden = !1), T(r.depth) && (r.depth = 2), T(r.colors) && (r.colors = !1), T(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = a), c(r, e, r.depth);
        }function a(e, t) {
          var n = u.styles[t];return n ? "[" + u.colors[n][0] + "m" + e + "[" + u.colors[n][1] + "m" : e;
        }function f(e, t) {
          return e;
        }function l(e) {
          var t = {};return e.forEach(function (e, n) {
            t[e] = !0;
          }), t;
        }function c(e, t, r) {
          if (e.customInspect && t && A(t.inspect) && t.inspect !== n.inspect && (!t.constructor || t.constructor.prototype !== t)) {
            var i = t.inspect(r, e);return S(i) || (i = c(e, i, r)), i;
          }var s = h(e, t);if (s) return s;var o = Object.keys(t),
              u = l(o);e.showHidden && (o = Object.getOwnPropertyNames(t));if (L(t) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0)) return p(t);if (o.length === 0) {
            if (A(t)) {
              var a = t.name ? ": " + t.name : "";return e.stylize("[Function" + a + "]", "special");
            }if (N(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");if (k(t)) return e.stylize(Date.prototype.toString.call(t), "date");if (L(t)) return p(t);
          }var f = "",
              y = !1,
              b = ["{", "}"];g(t) && (y = !0, b = ["[", "]"]);if (A(t)) {
            var w = t.name ? ": " + t.name : "";f = " [Function" + w + "]";
          }N(t) && (f = " " + RegExp.prototype.toString.call(t)), k(t) && (f = " " + Date.prototype.toUTCString.call(t)), L(t) && (f = " " + p(t));if (o.length !== 0 || !!y && t.length != 0) {
            if (r < 0) return N(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");e.seen.push(t);var E;return y ? E = d(e, t, r, u, o) : E = o.map(function (n) {
              return v(e, t, r, u, n, y);
            }), e.seen.pop(), m(E, f, b);
          }return b[0] + f + b[1];
        }function h(e, t) {
          if (T(t)) return e.stylize("undefined", "undefined");if (S(t)) {
            var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";return e.stylize(n, "string");
          }if (E(t)) return e.stylize("" + t, "number");if (y(t)) return e.stylize("" + t, "boolean");if (b(t)) return e.stylize("null", "null");
        }function p(e) {
          return "[" + Error.prototype.toString.call(e) + "]";
        }function d(e, t, n, r, i) {
          var s = [];for (var o = 0, u = t.length; o < u; ++o) H(t, String(o)) ? s.push(v(e, t, n, r, String(o), !0)) : s.push("");return i.forEach(function (i) {
            i.match(/^\d+$/) || s.push(v(e, t, n, r, i, !0));
          }), s;
        }function v(e, t, n, r, i, s) {
          var o, u, a;a = Object.getOwnPropertyDescriptor(t, i) || { value: t[i] }, a.get ? a.set ? u = e.stylize("[Getter/Setter]", "special") : u = e.stylize("[Getter]", "special") : a.set && (u = e.stylize("[Setter]", "special")), H(r, i) || (o = "[" + i + "]"), u || (e.seen.indexOf(a.value) < 0 ? (b(n) ? u = c(e, a.value, null) : u = c(e, a.value, n - 1), u.indexOf("\n") > -1 && (s ? u = u.split("\n").map(function (e) {
            return "  " + e;
          }).join("\n").substr(2) : u = "\n" + u.split("\n").map(function (e) {
            return "   " + e;
          }).join("\n"))) : u = e.stylize("[Circular]", "special"));if (T(o)) {
            if (s && i.match(/^\d+$/)) return u;o = JSON.stringify("" + i), o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (o = o.substr(1, o.length - 2), o = e.stylize(o, "name")) : (o = o.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), o = e.stylize(o, "string"));
          }return o + ": " + u;
        }function m(e, t, n) {
          var r = 0,
              i = e.reduce(function (e, t) {
            return r++, t.indexOf("\n") >= 0 && r++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1;
          }, 0);return i > 60 ? n[0] + (t === "" ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1];
        }function g(e) {
          return Array.isArray(e);
        }function y(e) {
          return typeof e == "boolean";
        }function b(e) {
          return e === null;
        }function w(e) {
          return e == null;
        }function E(e) {
          return typeof e == "number";
        }function S(e) {
          return typeof e == "string";
        }function x(e) {
          return typeof e == "symbol";
        }function T(e) {
          return e === void 0;
        }function N(e) {
          return C(e) && M(e) === "[object RegExp]";
        }function C(e) {
          return typeof e == "object" && e !== null;
        }function k(e) {
          return C(e) && M(e) === "[object Date]";
        }function L(e) {
          return C(e) && (M(e) === "[object Error]" || e instanceof Error);
        }function A(e) {
          return typeof e == "function";
        }function O(e) {
          return e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string" || typeof e == "symbol" || typeof e == "undefined";
        }function M(e) {
          return Object.prototype.toString.call(e);
        }function _(e) {
          return e < 10 ? "0" + e.toString(10) : e.toString(10);
        }function P() {
          var e = new Date(),
              t = [_(e.getHours()), _(e.getMinutes()), _(e.getSeconds())].join(":");return [e.getDate(), D[e.getMonth()], t].join(" ");
        }function H(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }var i = /%[sdj%]/g;n.format = function (e) {
          if (!S(e)) {
            var t = [];for (var n = 0; n < arguments.length; n++) t.push(u(arguments[n]));return t.join(" ");
          }var n = 1,
              r = arguments,
              s = r.length,
              o = String(e).replace(i, function (e) {
            if (e === "%%") return "%";if (n >= s) return e;switch (e) {case "%s":
                return String(r[n++]);case "%d":
                return Number(r[n++]);case "%j":
                try {
                  return JSON.stringify(r[n++]);
                } catch (t) {
                  return "[Circular]";
                };default:
                return e;}
          });for (var a = r[n]; n < s; a = r[++n]) b(a) || !C(a) ? o += " " + a : o += " " + u(a);return o;
        }, n.deprecate = function (e, i) {
          function o() {
            if (!s) {
              if (t.throwDeprecation) throw new Error(i);t.traceDeprecation ? console.trace(i) : console.error(i), s = !0;
            }return e.apply(this, arguments);
          }if (T(r.process)) return function () {
            return n.deprecate(e, i).apply(this, arguments);
          };if (t.noDeprecation === !0) return e;var s = !1;return o;
        };var s = {},
            o;n.debuglog = function (e) {
          T(o) && (o = t.env.NODE_DEBUG || ""), e = e.toUpperCase();if (!s[e]) if (new RegExp("\\b" + e + "\\b", "i").test(o)) {
            var r = t.pid;s[e] = function () {
              var t = n.format.apply(n, arguments);console.error("%s %d: %s", e, r, t);
            };
          } else s[e] = function () {};return s[e];
        }, n.inspect = u, u.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }, u.styles = { special: "cyan", number: "yellow", "boolean": "yellow", "undefined": "grey", "null": "bold", string: "green", date: "magenta", regexp: "red" }, n.isArray = g, n.isBoolean = y, n.isNull = b, n.isNullOrUndefined = w, n.isNumber = E, n.isString = S, n.isSymbol = x, n.isUndefined = T, n.isRegExp = N, n.isObject = C, n.isDate = k, n.isError = L, n.isFunction = A, n.isPrimitive = O, n.isBuffer = e("./support/isBuffer");var D = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];n.log = function () {
          console.log("%s - %s", P(), n.format.apply(n, arguments));
        }, n.inherits = e("inherits"), n._extend = function (e, t) {
          if (!t || !C(t)) return e;var n = Object.keys(t),
              r = n.length;while (r--) e[n[r]] = t[n[r]];return e;
        };
      }).call(this, e("/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"), typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
    }, { "./support/isBuffer": 14, "/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 18, inherits: 17 }], 16: [function (e, t, n) {
      function r() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || undefined;
      }function i(e) {
        return typeof e == "function";
      }function s(e) {
        return typeof e == "number";
      }function o(e) {
        return typeof e == "object" && e !== null;
      }function u(e) {
        return e === void 0;
      }t.exports = r, r.EventEmitter = r, r.prototype._events = undefined, r.prototype._maxListeners = undefined, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function (e) {
        if (!s(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");return this._maxListeners = e, this;
      }, r.prototype.emit = function (e) {
        var t, n, r, s, a, f;this._events || (this._events = {});if (e === "error") if (!this._events.error || o(this._events.error) && !this._events.error.length) throw t = arguments[1], t instanceof Error ? t : TypeError('Uncaught, unspecified "error" event.');n = this._events[e];if (u(n)) return !1;if (i(n)) switch (arguments.length) {case 1:
            n.call(this);break;case 2:
            n.call(this, arguments[1]);break;case 3:
            n.call(this, arguments[1], arguments[2]);break;default:
            r = arguments.length, s = new Array(r - 1);for (a = 1; a < r; a++) s[a - 1] = arguments[a];n.apply(this, s);} else if (o(n)) {
          r = arguments.length, s = new Array(r - 1);for (a = 1; a < r; a++) s[a - 1] = arguments[a];f = n.slice(), r = f.length;for (a = 0; a < r; a++) f[a].apply(this, s);
        }return !0;
      }, r.prototype.addListener = function (e, t) {
        var n;if (!i(t)) throw TypeError("listener must be a function");this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t;if (o(this._events[e]) && !this._events[e].warned) {
          var n;u(this._maxListeners) ? n = r.defaultMaxListeners : n = this._maxListeners, n && n > 0 && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), console.trace());
        }return this;
      }, r.prototype.on = r.prototype.addListener, r.prototype.once = function (e, t) {
        function r() {
          this.removeListener(e, r), n || (n = !0, t.apply(this, arguments));
        }if (!i(t)) throw TypeError("listener must be a function");var n = !1;return r.listener = t, this.on(e, r), this;
      }, r.prototype.removeListener = function (e, t) {
        var n, r, s, u;if (!i(t)) throw TypeError("listener must be a function");if (!this._events || !this._events[e]) return this;n = this._events[e], s = n.length, r = -1;if (n === t || i(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);else if (o(n)) {
          for (u = s; u-- > 0;) if (n[u] === t || n[u].listener && n[u].listener === t) {
            r = u;break;
          }if (r < 0) return this;n.length === 1 ? (n.length = 0, delete this._events[e]) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", e, t);
        }return this;
      }, r.prototype.removeAllListeners = function (e) {
        var t, n;if (!this._events) return this;if (!this._events.removeListener) return arguments.length === 0 ? this._events = {} : this._events[e] && delete this._events[e], this;if (arguments.length === 0) {
          for (t in this._events) {
            if (t === "removeListener") continue;this.removeAllListeners(t);
          }return this.removeAllListeners("removeListener"), this._events = {}, this;
        }n = this._events[e];if (i(n)) this.removeListener(e, n);else while (n.length) this.removeListener(e, n[n.length - 1]);return delete this._events[e], this;
      }, r.prototype.listeners = function (e) {
        var t;return !this._events || !this._events[e] ? t = [] : i(this._events[e]) ? t = [this._events[e]] : t = this._events[e].slice(), t;
      }, r.listenerCount = function (e, t) {
        var n;return !e._events || !e._events[t] ? n = 0 : i(e._events[t]) ? n = 1 : n = e._events[t].length, n;
      };
    }, {}], 17: [function (e, t, n) {
      typeof Object.create == "function" ? t.exports = function (t, n) {
        t.super_ = n, t.prototype = Object.create(n.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } });
      } : t.exports = function (t, n) {
        t.super_ = n;var r = function () {};r.prototype = n.prototype, t.prototype = new r(), t.prototype.constructor = t;
      };
    }, {}], 18: [function (e, t, n) {
      function i() {}var r = t.exports = {};r.nextTick = function () {
        var e = typeof window != "undefined" && window.setImmediate,
            t = typeof window != "undefined" && window.postMessage && window.addEventListener;if (e) return function (e) {
          return window.setImmediate(e);
        };if (t) {
          var n = [];return window.addEventListener("message", function (e) {
            var t = e.source;if ((t === window || t === null) && e.data === "process-tick") {
              e.stopPropagation();if (n.length > 0) {
                var r = n.shift();r();
              }
            }
          }, !0), function (t) {
            n.push(t), window.postMessage("process-tick", "*");
          };
        }return function (t) {
          setTimeout(t, 0);
        };
      }(), r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.on = i, r.once = i, r.off = i, r.emit = i, r.binding = function (e) {
        throw new Error("process.binding is not supported");
      }, r.cwd = function () {
        return "/";
      }, r.chdir = function (e) {
        throw new Error("process.chdir is not supported");
      };
    }, {}], 19: [function (e, t, n) {
      t.exports = e(14);
    }, {}], 20: [function (e, t, n) {
      t.exports = e(15);
    }, { "./support/isBuffer": 19, "/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js": 18, inherits: 17 }] }, {}, [9])(9);
}), ace.define("ace/mode/html_worker", [], function (e, t, n) {
  "use strict";
  var r = e("../lib/oop"),
      i = e("../lib/lang"),
      s = e("../worker/mirror").Mirror,
      o = e("./html/saxparser").SAXParser,
      u = { "expected-doctype-but-got-start-tag": "info", "expected-doctype-but-got-chars": "info", "non-html-root": "info" },
      a = t.Worker = function (e) {
    s.call(this, e), this.setTimeout(400), this.context = null;
  };r.inherits(a, s), function () {
    this.setOptions = function (e) {
      this.context = e.context;
    }, this.onUpdate = function () {
      var e = this.doc.getValue();if (!e) return;var t = new o(),
          n = [],
          r = function () {};t.contentHandler = { startDocument: r, endDocument: r, startElement: r, endElement: r, characters: r }, t.errorHandler = { error: function (e, t, r) {
          n.push({ row: t.line, column: t.column, text: e, type: u[r] || "error" });
        } }, this.context ? t.parseFragment(e, this.context) : t.parse(e), this.sender.emit("error", n);
    };
  }.call(a.prototype);
}), ace.define("ace/lib/es5-shim", [], function (e, t, n) {
  function r() {}function w(e) {
    try {
      return Object.defineProperty(e, "sentinel", {}), "sentinel" in e;
    } catch (t) {}
  }function H(e) {
    return e = +e, e !== e ? e = 0 : e !== 0 && e !== 1 / 0 && e !== -1 / 0 && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e;
  }function B(e) {
    var t = typeof e;return e === null || t === "undefined" || t === "boolean" || t === "number" || t === "string";
  }function j(e) {
    var t, n, r;if (B(e)) return e;n = e.valueOf;if (typeof n == "function") {
      t = n.call(e);if (B(t)) return t;
    }r = e.toString;if (typeof r == "function") {
      t = r.call(e);if (B(t)) return t;
    }throw new TypeError();
  }Function.prototype.bind || (Function.prototype.bind = function (t) {
    var n = this;if (typeof n != "function") throw new TypeError("Function.prototype.bind called on incompatible " + n);var i = u.call(arguments, 1),
        s = function () {
      if (this instanceof s) {
        var e = n.apply(this, i.concat(u.call(arguments)));return Object(e) === e ? e : this;
      }return n.apply(t, i.concat(u.call(arguments)));
    };return n.prototype && (r.prototype = n.prototype, s.prototype = new r(), r.prototype = null), s;
  });var i = Function.prototype.call,
      s = Array.prototype,
      o = Object.prototype,
      u = s.slice,
      a = i.bind(o.toString),
      f = i.bind(o.hasOwnProperty),
      l,
      c,
      h,
      p,
      d;if (d = f(o, "__defineGetter__")) l = i.bind(o.__defineGetter__), c = i.bind(o.__defineSetter__), h = i.bind(o.__lookupGetter__), p = i.bind(o.__lookupSetter__);if ([1, 2].splice(0).length != 2) if (!function () {
    function e(e) {
      var t = new Array(e + 2);return t[0] = t[1] = 0, t;
    }var t = [],
        n;t.splice.apply(t, e(20)), t.splice.apply(t, e(26)), n = t.length, t.splice(5, 0, "XXX"), n + 1 == t.length;if (n + 1 == t.length) return !0;
  }()) Array.prototype.splice = function (e, t) {
    var n = this.length;e > 0 ? e > n && (e = n) : e == void 0 ? e = 0 : e < 0 && (e = Math.max(n + e, 0)), e + t < n || (t = n - e);var r = this.slice(e, e + t),
        i = u.call(arguments, 2),
        s = i.length;if (e === n) s && this.push.apply(this, i);else {
      var o = Math.min(t, n - e),
          a = e + o,
          f = a + s - o,
          l = n - a,
          c = n - o;if (f < a) for (var h = 0; h < l; ++h) this[f + h] = this[a + h];else if (f > a) for (h = l; h--;) this[f + h] = this[a + h];if (s && e === c) this.length = c, this.push.apply(this, i);else {
        this.length = c + s;for (h = 0; h < s; ++h) this[e + h] = i[h];
      }
    }return r;
  };else {
    var v = Array.prototype.splice;Array.prototype.splice = function (e, t) {
      return arguments.length ? v.apply(this, [e === void 0 ? 0 : e, t === void 0 ? this.length - e : t].concat(u.call(arguments, 2))) : [];
    };
  }Array.isArray || (Array.isArray = function (t) {
    return a(t) == "[object Array]";
  });var m = Object("a"),
      g = m[0] != "a" || !(0 in m);Array.prototype.forEach || (Array.prototype.forEach = function (t) {
    var n = F(this),
        r = g && a(this) == "[object String]" ? this.split("") : n,
        i = arguments[1],
        s = -1,
        o = r.length >>> 0;if (a(t) != "[object Function]") throw new TypeError();while (++s < o) s in r && t.call(i, r[s], s, n);
  }), Array.prototype.map || (Array.prototype.map = function (t) {
    var n = F(this),
        r = g && a(this) == "[object String]" ? this.split("") : n,
        i = r.length >>> 0,
        s = Array(i),
        o = arguments[1];if (a(t) != "[object Function]") throw new TypeError(t + " is not a function");for (var u = 0; u < i; u++) u in r && (s[u] = t.call(o, r[u], u, n));return s;
  }), Array.prototype.filter || (Array.prototype.filter = function (t) {
    var n = F(this),
        r = g && a(this) == "[object String]" ? this.split("") : n,
        i = r.length >>> 0,
        s = [],
        o,
        u = arguments[1];if (a(t) != "[object Function]") throw new TypeError(t + " is not a function");for (var f = 0; f < i; f++) f in r && (o = r[f], t.call(u, o, f, n) && s.push(o));return s;
  }), Array.prototype.every || (Array.prototype.every = function (t) {
    var n = F(this),
        r = g && a(this) == "[object String]" ? this.split("") : n,
        i = r.length >>> 0,
        s = arguments[1];if (a(t) != "[object Function]") throw new TypeError(t + " is not a function");for (var o = 0; o < i; o++) if (o in r && !t.call(s, r[o], o, n)) return !1;return !0;
  }), Array.prototype.some || (Array.prototype.some = function (t) {
    var n = F(this),
        r = g && a(this) == "[object String]" ? this.split("") : n,
        i = r.length >>> 0,
        s = arguments[1];if (a(t) != "[object Function]") throw new TypeError(t + " is not a function");for (var o = 0; o < i; o++) if (o in r && t.call(s, r[o], o, n)) return !0;return !1;
  }), Array.prototype.reduce || (Array.prototype.reduce = function (t) {
    var n = F(this),
        r = g && a(this) == "[object String]" ? this.split("") : n,
        i = r.length >>> 0;if (a(t) != "[object Function]") throw new TypeError(t + " is not a function");if (!i && arguments.length == 1) throw new TypeError("reduce of empty array with no initial value");var s = 0,
        o;if (arguments.length >= 2) o = arguments[1];else do {
      if (s in r) {
        o = r[s++];break;
      }if (++s >= i) throw new TypeError("reduce of empty array with no initial value");
    } while (!0);for (; s < i; s++) s in r && (o = t.call(void 0, o, r[s], s, n));return o;
  }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function (t) {
    var n = F(this),
        r = g && a(this) == "[object String]" ? this.split("") : n,
        i = r.length >>> 0;if (a(t) != "[object Function]") throw new TypeError(t + " is not a function");if (!i && arguments.length == 1) throw new TypeError("reduceRight of empty array with no initial value");var s,
        o = i - 1;if (arguments.length >= 2) s = arguments[1];else do {
      if (o in r) {
        s = r[o--];break;
      }if (--o < 0) throw new TypeError("reduceRight of empty array with no initial value");
    } while (!0);do o in this && (s = t.call(void 0, s, r[o], o, n)); while (o--);return s;
  });if (!Array.prototype.indexOf || [0, 1].indexOf(1, 2) != -1) Array.prototype.indexOf = function (t) {
    var n = g && a(this) == "[object String]" ? this.split("") : F(this),
        r = n.length >>> 0;if (!r) return -1;var i = 0;arguments.length > 1 && (i = H(arguments[1])), i = i >= 0 ? i : Math.max(0, r + i);for (; i < r; i++) if (i in n && n[i] === t) return i;return -1;
  };if (!Array.prototype.lastIndexOf || [0, 1].lastIndexOf(0, -3) != -1) Array.prototype.lastIndexOf = function (t) {
    var n = g && a(this) == "[object String]" ? this.split("") : F(this),
        r = n.length >>> 0;if (!r) return -1;var i = r - 1;arguments.length > 1 && (i = Math.min(i, H(arguments[1]))), i = i >= 0 ? i : r - Math.abs(i);for (; i >= 0; i--) if (i in n && t === n[i]) return i;return -1;
  };Object.getPrototypeOf || (Object.getPrototypeOf = function (t) {
    return t.__proto__ || (t.constructor ? t.constructor.prototype : o);
  });if (!Object.getOwnPropertyDescriptor) {
    var y = "Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor = function (t, n) {
      if (typeof t != "object" && typeof t != "function" || t === null) throw new TypeError(y + t);if (!f(t, n)) return;var r, i, s;r = { enumerable: !0, configurable: !0 };if (d) {
        var u = t.__proto__;t.__proto__ = o;var i = h(t, n),
            s = p(t, n);t.__proto__ = u;if (i || s) return i && (r.get = i), s && (r.set = s), r;
      }return r.value = t[n], r;
    };
  }Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (t) {
    return Object.keys(t);
  });if (!Object.create) {
    var b;Object.prototype.__proto__ === null ? b = function () {
      return { __proto__: null };
    } : b = function () {
      var e = {};for (var t in e) e[t] = null;return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, e;
    }, Object.create = function (t, n) {
      var r;if (t === null) r = b();else {
        if (typeof t != "object") throw new TypeError("typeof prototype[" + typeof t + "] != 'object'");var i = function () {};i.prototype = t, r = new i(), r.__proto__ = t;
      }return n !== void 0 && Object.defineProperties(r, n), r;
    };
  }if (Object.defineProperty) {
    var E = w({}),
        S = typeof document == "undefined" || w(document.createElement("div"));if (!E || !S) var x = Object.defineProperty;
  }if (!Object.defineProperty || x) {
    var T = "Property description must be an object: ",
        N = "Object.defineProperty called on non-object: ",
        C = "getters & setters can not be defined on this javascript engine";Object.defineProperty = function (t, n, r) {
      if (typeof t != "object" && typeof t != "function" || t === null) throw new TypeError(N + t);if (typeof r != "object" && typeof r != "function" || r === null) throw new TypeError(T + r);if (x) try {
        return x.call(Object, t, n, r);
      } catch (i) {}if (f(r, "value")) {
        if (d && (h(t, n) || p(t, n))) {
          var s = t.__proto__;t.__proto__ = o, delete t[n], t[n] = r.value, t.__proto__ = s;
        } else t[n] = r.value;
      } else {
        if (!d) throw new TypeError(C);f(r, "get") && l(t, n, r.get), f(r, "set") && c(t, n, r.set);
      }return t;
    };
  }Object.defineProperties || (Object.defineProperties = function (t, n) {
    for (var r in n) f(n, r) && Object.defineProperty(t, r, n[r]);return t;
  }), Object.seal || (Object.seal = function (t) {
    return t;
  }), Object.freeze || (Object.freeze = function (t) {
    return t;
  });try {
    Object.freeze(function () {});
  } catch (k) {
    Object.freeze = function (t) {
      return function (n) {
        return typeof n == "function" ? n : t(n);
      };
    }(Object.freeze);
  }Object.preventExtensions || (Object.preventExtensions = function (t) {
    return t;
  }), Object.isSealed || (Object.isSealed = function (t) {
    return !1;
  }), Object.isFrozen || (Object.isFrozen = function (t) {
    return !1;
  }), Object.isExtensible || (Object.isExtensible = function (t) {
    if (Object(t) === t) throw new TypeError();var n = "";while (f(t, n)) n += "?";t[n] = !0;var r = f(t, n);return delete t[n], r;
  });if (!Object.keys) {
    var L = !0,
        A = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        O = A.length;for (var M in { toString: null }) L = !1;Object.keys = function I(e) {
      if (typeof e != "object" && typeof e != "function" || e === null) throw new TypeError("Object.keys called on a non-object");var I = [];for (var t in e) f(e, t) && I.push(t);if (L) for (var n = 0, r = O; n < r; n++) {
        var i = A[n];f(e, i) && I.push(i);
      }return I;
    };
  }Date.now || (Date.now = function () {
    return new Date().getTime();
  });var _ = "	\n\x0b\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff";if (!String.prototype.trim || _.trim()) {
    _ = "[" + _ + "]";var D = new RegExp("^" + _ + _ + "*"),
        P = new RegExp(_ + _ + "*$");String.prototype.trim = function () {
      return String(this).replace(D, "").replace(P, "");
    };
  }var F = function (e) {
    if (e == null) throw new TypeError("can't convert " + e + " to object");return Object(e);
  };
});