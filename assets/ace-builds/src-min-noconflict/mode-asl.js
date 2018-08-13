/// BareSpecifier=ace-builds/src-min-noconflict/mode-asl
ace.define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./text_highlight_rules").TextHighlightRules,
        s = function () {
        this.$rules = { start: [{ token: "comment.doc.tag", regex: "@[\\w\\d_]+" }, s.getTagRule(), { defaultToken: "comment.doc", caseInsensitive: !0 }] };
    };r.inherits(s, i), s.getTagRule = function (e) {
        return { token: "comment.doc.tag.storage.type", regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b" };
    }, s.getStartRule = function (e) {
        return { token: "comment.doc", regex: "\\/\\*(?=\\*)", next: e };
    }, s.getEndRule = function (e) {
        return { token: "comment.doc", regex: "\\*\\/", next: e };
    }, t.DocCommentHighlightRules = s;
}), ace.define("ace/mode/asl_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./doc_comment_highlight_rules").DocCommentHighlightRules,
        s = e("./text_highlight_rules").TextHighlightRules,
        o = function () {
        var e = "Default|DefinitionBlock|Device|Method|Else|ElseIf|For|Function|If|Include|Method|Return|Scope|Switch|Case|While|Break|BreakPoint|Continue|NoOp|Wait",
            t = "Add|And|Decrement|Divide|Increment|Index|LAnd|LEqual|LGreater|LGreaterEqual|LLess|LLessEqual|LNot|LNotEqual|LOr|Mod|Multiply|NAnd|NOr|Not|Or|RefOf|Revision|ShiftLeft|ShiftRight|Subtract|XOr|DerefOf",
            n = "AccessAs|Acquire|Alias|BankField|Buffer|Concatenate|ConcatenateResTemplate|CondRefOf|Connection|CopyObject|CreateBitField|CreateByteField|CreateDWordField|CreateField|CreateQWordField|CreateWordField|DataTableRegion|Debug|DMA|DWordIO|DWordMemory|DWordSpace|EisaId|EISAID|EndDependentFn|Event|ExtendedIO|ExtendedMemory|ExtendedSpace|External|Fatal|Field|FindSetLeftBit|FindSetRightBit|FixedDMA|FixedIO|Fprintf|FromBCD|GpioInt|GpioIo|I2CSerialBusV2|IndexField|Interrupt|IO|IRQ|IRQNoFlags|Load|LoadTable|Match|Memory32|Memory32Fixed|Mid|Mutex|Name|Notify|Offset|ObjectType|OperationRegion|Package|PowerResource|Printf|QWordIO|QWordMemory|QWordSpace|RawDataBuffer|Register|Release|Reset|ResourceTemplate|Signal|SizeOf|Sleep|SPISerialBusV2|Stall|StartDependentFn|StartDependentFnNoPri|Store|ThermalZone|Timer|ToBCD|ToBuffer|ToDecimalString|ToInteger|ToPLD|ToString|ToUUID|UARTSerialBusV2|Unicode|Unload|VendorLong|VendorShort|WordBusNumber|WordIO|WordSpace",
            r = "AttribQuick|AttribSendReceive|AttribByte|AttribBytes|AttribRawBytes|AttribRawProcessBytes|AttribWord|AttribBlock|AttribProcessCall|AttribBlockProcessCall|AnyAcc|ByteAcc|WordAcc|DWordAcc|QWordAcc|BufferAcc|AddressRangeMemory|AddressRangeReserved|AddressRangeNVS|AddressRangeACPI|RegionSpaceKeyword|FFixedHW|PCC|AddressingMode7Bit|AddressingMode10Bit|DataBitsFive|DataBitsSix|DataBitsSeven|DataBitsEight|DataBitsNine|BusMaster|NotBusMaster|ClockPhaseFirst|ClockPhaseSecond|ClockPolarityLow|ClockPolarityHigh|SubDecode|PosDecode|BigEndianing|LittleEndian|FlowControlNone|FlowControlXon|FlowControlHardware|Edge|Level|ActiveHigh|ActiveLow|ActiveBoth|Decode16|Decode10|IoRestrictionNone|IoRestrictionInputOnly|IoRestrictionOutputOnly|IoRestrictionNoneAndPreserve|Lock|NoLock|MTR|MEQ|MLE|MLT|MGE|MGT|MaxFixed|MaxNotFixed|Cacheable|WriteCombining|Prefetchable|NonCacheable|MinFixed|MinNotFixed|ParityTypeNone|ParityTypeSpace|ParityTypeMark|ParityTypeOdd|ParityTypeEven|PullDefault|PullUp|PullDown|PullNone|PolarityHigh|PolarityLow|ISAOnlyRanges|NonISAOnlyRanges|EntireRange|ReadWrite|ReadOnly|UserDefRegionSpace|SystemIO|SystemMemory|PCI_Config|EmbeddedControl|SMBus|SystemCMOS|PciBarTarget|IPMI|GeneralPurposeIO|GenericSerialBus|ResourceConsumer|ResourceProducer|Serialized|NotSerialized|Shared|Exclusive|SharedAndWake|ExclusiveAndWake|ControllerInitiated|DeviceInitiated|StopBitsZero|StopBitsOne|StopBitsOnePlusHalf|StopBitsTwo|Width8Bit|Width16Bit|Width32Bit|Width64Bit|Width128Bit|Width256Bit|SparseTranslation|DenseTranslation|TypeTranslation|TypeStatic|Preserve|WriteAsOnes|WriteAsZeros|Transfer8|Transfer16|Transfer8_16|ThreeWireMode|FourWireMode",
            s = "UnknownObj|IntObj|StrObj|BuffObj|PkgObj|FieldUnitObj|DeviceObj|EventObj|MethodObj|MutexObj|OpRegionObj|PowerResObj|ProcessorObj|ThermalZoneObj|BuffFieldObj|DDBHandleObj",
            o = "__FILE__|__PATH__|__LINE__|__DATE__|__IASL__",
            u = "Memory24|Processor",
            a = this.createKeywordMapper({ keyword: e, "keyword.operator": t, "function.buildin": n, "constant.language": o, "storage.type": s, "constant.character": r, "invalid.deprecated": u }, "identifier");this.$rules = { start: [{ token: "comment", regex: "\\/\\/.*$" }, i.getStartRule("doc-start"), { token: "comment", regex: "\\/\\*", next: "comment" }, i.getStartRule("doc-start"), { token: "comment", regex: "\\[", next: "ignoredfield" }, { token: "variable", regex: "\\Local[0-7]|\\Arg[0-6]" }, { token: "keyword", regex: "#\\s*(?:define|elif|else|endif|error|if|ifdef|ifndef|include|includebuffer|line|pragma|undef|warning)\\b", next: "directive" }, { token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]' }, { token: "constant.character", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']" }, { token: "constant.numeric", regex: /0[xX][0-9a-fA-F]+\b/ }, { token: "constant.numeric", regex: /(One(s)?|Zero|True|False|[0-9]+)\b/ }, { token: a, regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b" }, { token: "keyword.operator", regex: "/|!|\\$|%|&|\\||\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|\\^|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\|=" }, { token: "lparen", regex: "[[({]" }, { token: "rparen", regex: "[\\])}]" }, { token: "text", regex: "\\s+" }], comment: [{ token: "comment", regex: "\\*\\/", next: "start" }, { defaultToken: "comment" }], ignoredfield: [{ token: "comment", regex: "\\]", next: "start" }, { defaultToken: "comment" }], directive: [{ token: "constant.other.multiline", regex: /\\/ }, { token: "constant.other.multiline", regex: /.*\\/ }, { token: "constant.other", regex: "\\s*<.+?>*s", next: "start" }, { token: "constant.other", regex: '\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]*s', next: "start" }, { token: "constant.other", regex: "\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']", next: "start" }, { token: "constant.other", regex: /[^\\\/]+/, next: "start" }] }, this.embedRules(i, "doc-", [i.getEndRule("start")]);
    };r.inherits(o, s), t.ASLHighlightRules = o;
}), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (e, t, n) {
    "use strict";
    var r = e("../../lib/oop"),
        i = e("../../range").Range,
        s = e("./fold_mode").FoldMode,
        o = t.FoldMode = function (e) {
        e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)));
    };r.inherits(o, s), function () {
        this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function (e, t, n) {
            var r = e.getLine(n);if (this.singleLineBlockCommentRe.test(r) && !this.startRegionRe.test(r) && !this.tripleStarBlockCommentRe.test(r)) return "";var i = this._getFoldWidgetBase(e, t, n);return !i && this.startRegionRe.test(r) ? "start" : i;
        }, this.getFoldWidgetRange = function (e, t, n, r) {
            var i = e.getLine(n);if (this.startRegionRe.test(i)) return this.getCommentRegionBlock(e, i, n);var s = i.match(this.foldingStartMarker);if (s) {
                var o = s.index;if (s[1]) return this.openingBracketBlock(e, s[1], n, o);var u = e.getCommentFoldRange(n, o + s[0].length, 1);return u && !u.isMultiLine() && (r ? u = this.getSectionRange(e, n) : t != "all" && (u = null)), u;
            }if (t === "markbegin") return;var s = i.match(this.foldingStopMarker);if (s) {
                var o = s.index + s[0].length;return s[1] ? this.closingBracketBlock(e, s[1], n, o) : e.getCommentFoldRange(n, o, -1);
            }
        }, this.getSectionRange = function (e, t) {
            var n = e.getLine(t),
                r = n.search(/\S/),
                s = t,
                o = n.length;t += 1;var u = t,
                a = e.getLength();while (++t < a) {
                n = e.getLine(t);var f = n.search(/\S/);if (f === -1) continue;if (r > f) break;var l = this.getFoldWidgetRange(e, "all", t);if (l) {
                    if (l.start.row <= s) break;if (l.isMultiLine()) t = l.end.row;else if (r == f) break;
                }u = t;
            }return new i(s, o, u, e.getLine(u).length);
        }, this.getCommentRegionBlock = function (e, t, n) {
            var r = t.search(/\s*$/),
                s = e.getLength(),
                o = n,
                u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,
                a = 1;while (++n < s) {
                t = e.getLine(n);var f = u.exec(t);if (!f) continue;f[1] ? a-- : a++;if (!a) break;
            }var l = n;if (l > o) return new i(o, r, l, t.length);
        };
    }.call(o.prototype);
}), ace.define("ace/mode/asl", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/asl_highlight_rules", "ace/mode/folding/cstyle"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("./asl_highlight_rules").ASLHighlightRules,
        o = e("./folding/cstyle").FoldMode,
        u = function () {
        this.HighlightRules = s, this.foldingRules = new o(), this.$behaviour = this.$defaultBehaviour;
    };r.inherits(u, i), function () {
        this.$id = "ace/mode/asl";
    }.call(u.prototype), t.Mode = u;
});
(function () {
    ace.require(["ace/mode/asl"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();