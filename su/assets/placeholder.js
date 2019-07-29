var placeHolderjQuery = (function(B, u) {
    function cc(a) { var b = Za[a] = {}; d.each(a.split(ea), function(c, e) { b[e] = true }); return b } function $a(a, b, c) { if (c === u && a.nodeType === 1) { c = "data-" + b.replace(dc, "-$1").toLowerCase(); c = a.getAttribute(c); if (typeof c === "string") { try { c = c === "true" ? true : c === "false" ? false : c === "null" ? null : +c + "" === c ? +c : ec.test(c) ? d.parseJSON(c) : c } catch (e) { } d.data(a, b, c) } else c = u } return c } function Ka(a) { var b; for (b in a) if (!(b === "data" && d.isEmptyObject(a[b]))) if (b !== "toJSON") return false; return true } function ka() { return false }
    function va() { return true } function sa(a) { return !a || !a.parentNode || a.parentNode.nodeType === 11 } function ab(a, b) { do a = a[b]; while (a && a.nodeType !== 1); return a } function bb(a, b, c) {
        b = b || 0; if (d.isFunction(b)) return d.grep(a, function(f, g) { return !!b.call(f, g, f) === c }); else if (b.nodeType) return d.grep(a, function(f) { return f === b === c }); else if (typeof b === "string") { var e = d.grep(a, function(f) { return f.nodeType === 1 }); if (fc.test(b)) return d.filter(b, e, !c); else b = d.filter(b, e) } return d.grep(a, function(f) {
            return d.inArray(f,
b) >= 0 === c
        })
    } function cb(a) { var b = db.split("|"); a = a.createDocumentFragment(); if (a.createElement) for (; b.length; ) a.createElement(b.pop()); return a } function gc(a, b) { return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b)) } function eb(a, b) { if (!(b.nodeType !== 1 || !d.hasData(a))) { var c, e, f; e = d._data(a); a = d._data(b, e); var g = e.events; if (g) { delete a.handle; a.events = {}; for (c in g) { e = 0; for (f = g[c].length; e < f; e++) d.event.add(b, c, g[c][e]) } } if (a.data) a.data = d.extend({}, a.data) } } function fb(a,
b) {
        var c; if (b.nodeType === 1) {
            b.clearAttributes && b.clearAttributes(); b.mergeAttributes && b.mergeAttributes(a); c = b.nodeName.toLowerCase(); if (c === "object") { if (b.parentNode) b.outerHTML = a.outerHTML; if (d.support.html5Clone && a.innerHTML && !d.trim(b.innerHTML)) b.innerHTML = a.innerHTML } else if (c === "input" && gb.test(a.type)) { b.defaultChecked = b.checked = a.checked; if (b.value !== a.value) b.value = a.value } else if (c === "option") b.selected = a.defaultSelected; else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue;
            else if (c === "script" && b.text !== a.text) b.text = a.text; b.removeAttribute(d.expando)
        } 
    } function wa(a) { return typeof a.getElementsByTagName !== "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll !== "undefined" ? a.querySelectorAll("*") : [] } function hb(a) { if (gb.test(a.type)) a.defaultChecked = a.checked } function ib(a, b) { if (b in a) return b; for (var c = b.charAt(0).toUpperCase() + b.slice(1), e = b, f = jb.length; f--; ) { b = jb[f] + c; if (b in a) return b } return e } function xa(a, b) {
        a = b || a; return d.css(a, "display") === "none" ||
!d.contains(a.ownerDocument, a)
    } function kb(a, b) { for (var c, e, f = [], g = 0, h = a.length; g < h; g++) { c = a[g]; if (c.style) { f[g] = d._data(c, "olddisplay"); if (b) { if (!f[g] && c.style.display === "none") c.style.display = ""; if (c.style.display === "" && xa(c)) f[g] = d._data(c, "olddisplay", lb(c.nodeName)) } else { e = Q(c, "display"); !f[g] && e !== "none" && d._data(c, "olddisplay", e) } } } for (g = 0; g < h; g++) { c = a[g]; if (c.style) if (!b || c.style.display === "none" || c.style.display === "") c.style.display = b ? f[g] || "" : "none" } return a } function mb(a, b, c) {
        return (a =
hc.exec(b)) ? Math.max(0, a[1] - (c || 0)) + (a[2] || "px") : b
    } function nb(a, b, c, e) { b = c === (e ? "border" : "content") ? 4 : b === "width" ? 1 : 0; for (var f = 0; b < 4; b += 2) { if (c === "margin") f += d.css(a, c + fa[b], true); if (e) { if (c === "content") f -= parseFloat(Q(a, "padding" + fa[b])) || 0; if (c !== "margin") f -= parseFloat(Q(a, "border" + fa[b] + "Width")) || 0 } else { f += parseFloat(Q(a, "padding" + fa[b])) || 0; if (c !== "padding") f += parseFloat(Q(a, "border" + fa[b] + "Width")) || 0 } } return f } function ob(a, b, c) {
        var e = b === "width" ? a.offsetWidth : a.offsetHeight, f = true, g = d.support.boxSizing &&
d.css(a, "boxSizing") === "border-box"; if (e <= 0 || e == null) { e = Q(a, b); if (e < 0 || e == null) e = a.style[b]; if (ya.test(e)) return e; f = g && (d.support.boxSizingReliable || e === a.style[b]); e = parseFloat(e) || 0 } return e + nb(a, b, c || (g ? "border" : "content"), f) + "px"
    } function lb(a) {
        if (La[a]) return La[a]; var b = d("<" + a + ">").appendTo(y.body), c = b.css("display"); b.remove(); if (c === "none" || c === "") {
            la = y.body.appendChild(la || d.extend(y.createElement("iframe"), { frameBorder: 0, width: 0, height: 0 })); if (!ma || !la.createElement) {
                ma = (la.contentWindow ||
la.contentDocument).document; ma.write("<!doctype html><html><body>"); ma.close()
            } b = ma.body.appendChild(ma.createElement(a)); c = Q(b, "display"); y.body.removeChild(la)
        } return La[a] = c
    } function Ma(a, b, c, e) { var f; if (d.isArray(b)) d.each(b, function(g, h) { c || ic.test(a) ? e(a, h) : Ma(a + "[" + (typeof h === "object" ? g : "") + "]", h, c, e) }); else if (!c && d.type(b) === "object") for (f in b) Ma(a + "[" + f + "]", b[f], c, e); else e(a, b) } function pb(a) {
        return function(b, c) {
            if (typeof b !== "string") { c = b; b = "*" } var e, f = b.toLowerCase().split(ea), g =
0, h = f.length; if (d.isFunction(c)) for (; g < h; g++) { e = f[g]; if (b = /^\+/.test(e)) e = e.substr(1) || "*"; e = a[e] = a[e] || []; e[b ? "unshift" : "push"](c) } 
        } 
    } function za(a, b, c, e, f, g) { f = f || b.dataTypes[0]; g = g || {}; g[f] = true; var h; f = a[f]; for (var j = 0, m = f ? f.length : 0, o = a === Na; j < m && (o || !h); j++) { h = f[j](b, c, e); if (typeof h === "string") if (!o || g[h]) h = u; else { b.dataTypes.unshift(h); h = za(a, b, c, e, h, g) } } if ((o || !h) && !g["*"]) h = za(a, b, c, e, "*", g); return h } function qb(a, b) {
        var c, e, f = d.ajaxSettings.flatOptions || {}; for (c in b) if (b[c] !== u) (f[c] ? a :
e || (e = {}))[c] = b[c]; e && d.extend(true, a, e)
    } function jc(a, b, c) { var e, f, g, h, j = a.contents, m = a.dataTypes, o = a.responseFields; for (f in o) if (f in c) b[o[f]] = c[f]; for (; m[0] === "*"; ) { m.shift(); if (e === u) e = a.mimeType || b.getResponseHeader("content-type") } if (e) for (f in j) if (j[f] && j[f].test(e)) { m.unshift(f); break } if (m[0] in c) g = m[0]; else { for (f in c) { if (!m[0] || a.converters[f + " " + m[0]]) { g = f; break } h || (h = f) } g = g || h } if (g) { g !== m[0] && m.unshift(g); return c[g] } } function kc(a, b) {
        var c, e, f, g, h = a.dataTypes.slice(), j = h[0], m = {}, o =
0; if (a.dataFilter) b = a.dataFilter(b, a.dataType); if (h[1]) for (c in a.converters) m[c.toLowerCase()] = a.converters[c]; for (; f = h[++o]; ) if (f !== "*") { if (j !== "*" && j !== f) { c = m[j + " " + f] || m["* " + f]; if (!c) for (e in m) { g = e.split(" "); if (g[1] === f) if (c = m[j + " " + g[0]] || m["* " + g[0]]) { if (c === true) c = m[e]; else if (m[e] !== true) { f = g[0]; h.splice(o--, 0, f) } break } } if (c !== true) if (c && a["throws"]) b = c(b); else try { b = c(b) } catch (l) { return { state: "parsererror", error: c ? l : "No conversion from " + j + " to " + f} } } j = f } return { state: "success", data: b}
    }
    function rb() { try { return new B.XMLHttpRequest } catch (a) { } } function lc() { try { return new B.ActiveXObject("Microsoft.XMLHTTP") } catch (a) { } } function sb() { setTimeout(function() { na = u }, 0); return na = d.now() } function mc(a, b) { d.each(b, function(c, e) { for (var f = (ta[c] || []).concat(ta["*"]), g = 0, h = f.length; g < h; g++) if (f[g].call(a, c, e)) return }) } function tb(a, b, c) {
        var e = 0, f = Aa.length, g = d.Deferred().always(function() { delete h.elem }), h = function() {
            var m = na || sb(); m = Math.max(0, j.startTime + j.duration - m); for (var o = 1 - (m / j.duration ||
0), l = 0, r = j.tweens.length; l < r; l++) j.tweens[l].run(o); g.notifyWith(a, [j, o, m]); if (o < 1 && r) return m; else { g.resolveWith(a, [j]); return false } 
        }, j = g.promise({ elem: a, props: d.extend({}, b), opts: d.extend(true, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: na || sb(), duration: c.duration, tweens: [], createTween: function(m, o) { m = d.Tween(a, j.opts, m, o, j.opts.specialEasing[m] || j.opts.easing); j.tweens.push(m); return m }, stop: function(m) {
            for (var o = 0, l = m ? j.tweens.length : 0; o < l; o++) j.tweens[o].run(1); m ?
g.resolveWith(a, [j, m]) : g.rejectWith(a, [j, m]); return this
        } 
        }); c = j.props; for (nc(c, j.opts.specialEasing); e < f; e++) if (b = Aa[e].call(j, a, c, j.opts)) return b; mc(j, c); d.isFunction(j.opts.start) && j.opts.start.call(a, j); d.fx.timer(d.extend(h, { anim: j, queue: j.opts.queue, elem: a })); return j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    } function nc(a, b) {
        var c, e, f, g, h; for (c in a) {
            e = d.camelCase(c); f = b[e]; g = a[c]; if (d.isArray(g)) { f = g[1]; g = a[c] = g[0] } if (c !== e) {
                a[e] = g;
                delete a[c]
            } if ((h = d.cssHooks[e]) && "expand" in h) { g = h.expand(g); delete a[e]; for (c in g) if (!(c in a)) { a[c] = g[c]; b[c] = f } } else b[e] = f
        } 
    } function oc(a, b, c) {
        var e, f, g, h, j, m, o = this, l = a.style, r = {}, x = [], z = a.nodeType && xa(a); if (!c.queue) { j = d._queueHooks(a, "fx"); if (j.unqueued == null) { j.unqueued = 0; m = j.empty.fire; j.empty.fire = function() { j.unqueued || m() } } j.unqueued++; o.always(function() { o.always(function() { j.unqueued--; d.queue(a, "fx").length || j.empty.fire() }) }) } if (a.nodeType === 1 && ("height" in b || "width" in b)) {
            c.overflow =
[l.overflow, l.overflowX, l.overflowY]; if (d.css(a, "display") === "inline" && d.css(a, "float") === "none") if (!d.support.inlineBlockNeedsLayout || lb(a.nodeName) === "inline") l.display = "inline-block"; else l.zoom = 1
        } if (c.overflow) { l.overflow = "hidden"; d.support.shrinkWrapBlocks || o.done(function() { l.overflow = c.overflow[0]; l.overflowX = c.overflow[1]; l.overflowY = c.overflow[2] }) } for (e in b) { g = b[e]; if (pc.exec(g)) { delete b[e]; f = f || g === "toggle"; if (g !== (z ? "hide" : "show")) x.push(e) } } if (b = x.length) {
            g = d._data(a, "fxshow") || d._data(a,
"fxshow", {}); if ("hidden" in g) z = g.hidden; if (f) g.hidden = !z; z ? d(a).show() : o.done(function() { d(a).hide() }); o.done(function() { var G; d.removeData(a, "fxshow", true); for (G in r) d.style(a, G, r[G]) }); for (e = 0; e < b; e++) { f = x[e]; h = o.createTween(f, z ? g[f] : 0); r[f] = g[f] || d.style(a, f); if (!(f in g)) { g[f] = h.start; if (z) { h.end = h.start; h.start = f === "width" || f === "height" ? 1 : 0 } } } 
        } 
    } function U(a, b, c, e, f) { return new U.prototype.init(a, b, c, e, f) } function Ba(a, b) {
        var c, e = { height: a }, f = 0; for (b = b ? 1 : 0; f < 4; f += 2 - b) {
            c = fa[f]; e["margin" + c] = e["padding" +
c] = a
        } if (b) e.opacity = e.width = a; return e
    } function ub(a) { return d.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false } var vb, Ca, y = B.document, qc = B.location, rc = B.navigator, sc = B.jQuery, tc = B.$, wb = Array.prototype.push, Z = Array.prototype.slice, xb = Array.prototype.indexOf, uc = Object.prototype.toString, Oa = Object.prototype.hasOwnProperty, Pa = String.prototype.trim, d = function(a, b) { return new d.fn.init(a, b, vb) }, Da = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, vc = /\S/, ea = /\s+/, wc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
xc = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, yb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, yc = /^[\],:{}\s]*$/, zc = /(?:^|:|,)(?:\s*\[)+/g, Ac = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, Bc = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, Cc = /^-ms-/, Dc = /-([\da-z])/gi, Ec = function(a, b) { return (b + "").toUpperCase() }, Ea = function() { if (y.addEventListener) { y.removeEventListener("DOMContentLoaded", Ea, false); d.ready() } else if (y.readyState === "complete") { y.detachEvent("onreadystatechange", Ea); d.ready() } }, zb = {}; d.fn =
d.prototype = { constructor: d, init: function(a, b, c) {
    var e; if (!a) return this; if (a.nodeType) { this.context = this[0] = a; this.length = 1; return this } if (typeof a === "string") if ((e = a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? [null, a, null] : xc.exec(a)) && (e[1] || !b)) if (e[1]) { a = (b = b instanceof d ? b[0] : b) && b.nodeType ? b.ownerDocument || b : y; a = d.parseHTML(e[1], a, true); yb.test(e[1]) && d.isPlainObject(b) && this.attr.call(a, b, true); return d.merge(this, a) } else {
        if ((b = y.getElementById(e[2])) && b.parentNode) {
            if (b.id !==
e[2]) return c.find(a); this.length = 1; this[0] = b
        } this.context = y; this.selector = a; return this
    } else return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a); else if (d.isFunction(a)) return c.ready(a); if (a.selector !== u) { this.selector = a.selector; this.context = a.context } return d.makeArray(a, this)
}, selector: "", jquery: "1.8.3", length: 0, size: function() { return this.length }, toArray: function() { return Z.call(this) }, get: function(a) { return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a] }, pushStack: function(a,
b, c) { a = d.merge(this.constructor(), a); a.prevObject = this; a.context = this.context; if (b === "find") a.selector = this.selector + (this.selector ? " " : "") + c; else if (b) a.selector = this.selector + "." + b + "(" + c + ")"; return a }, each: function(a, b) { return d.each(this, a, b) }, ready: function(a) { d.ready.promise().done(a); return this }, eq: function(a) { a = +a; return a === -1 ? this.slice(a) : this.slice(a, a + 1) }, first: function() { return this.eq(0) }, last: function() { return this.eq(-1) }, slice: function() {
    return this.pushStack(Z.apply(this, arguments),
"slice", Z.call(arguments).join(","))
}, map: function(a) { return this.pushStack(d.map(this, function(b, c) { return a.call(b, c, b) })) }, end: function() { return this.prevObject || this.constructor(null) }, push: wb, sort: [].sort, splice: [].splice
}; d.fn.init.prototype = d.fn; d.extend = d.fn.extend = function() {
    var a, b, c, e, f, g = arguments[0] || {}, h = 1, j = arguments.length, m = false; if (typeof g === "boolean") { m = g; g = arguments[1] || {}; h = 2 } if (typeof g !== "object" && !d.isFunction(g)) g = {}; if (j === h) { g = this; --h } for (; h < j; h++) if ((a = arguments[h]) !=
null) for (b in a) { c = g[b]; e = a[b]; if (g !== e) if (m && e && (d.isPlainObject(e) || (f = d.isArray(e)))) { if (f) { f = false; c = c && d.isArray(c) ? c : [] } else c = c && d.isPlainObject(c) ? c : {}; g[b] = d.extend(m, c, e) } else if (e !== u) g[b] = e } return g
}; d.extend({ noConflict: function(a) { if (B.$ === d) B.$ = tc; if (a && B.jQuery === d) B.jQuery = sc; return d }, isReady: false, readyWait: 1, holdReady: function(a) { if (a) d.readyWait++; else d.ready(true) }, ready: function(a) {
    if (!(a === true ? --d.readyWait : d.isReady)) {
        if (!y.body) return setTimeout(d.ready, 1); d.isReady = true;
        if (!(a !== true && --d.readyWait > 0)) { Ca.resolveWith(y, [d]); d.fn.trigger && d(y).trigger("ready").off("ready") } 
    } 
}, isFunction: function(a) { return d.type(a) === "function" }, isArray: Array.isArray || function(a) { return d.type(a) === "array" }, isWindow: function(a) { return a != null && a == a.window }, isNumeric: function(a) { return !isNaN(parseFloat(a)) && isFinite(a) }, type: function(a) { return a == null ? String(a) : zb[uc.call(a)] || "object" }, isPlainObject: function(a) {
    if (!a || d.type(a) !== "object" || a.nodeType || d.isWindow(a)) return false; try {
        if (a.constructor &&
!Oa.call(a, "constructor") && !Oa.call(a.constructor.prototype, "isPrototypeOf")) return false
    } catch (b) { return false } var c; for (c in a); return c === u || Oa.call(a, c)
}, isEmptyObject: function(a) { var b; for (b in a) return false; return true }, error: function(a) { throw new Error(a); }, parseHTML: function(a, b, c) {
    var e; if (!a || typeof a !== "string") return null; if (typeof b === "boolean") { c = b; b = 0 } b = b || y; if (e = yb.exec(a)) return [b.createElement(e[1])]; e = d.buildFragment([a], b, c ? null : []); return d.merge([], (e.cacheable ? d.clone(e.fragment) :
e.fragment).childNodes)
}, parseJSON: function(a) { if (!a || typeof a !== "string") return null; a = d.trim(a); if (B.JSON && B.JSON.parse) return B.JSON.parse(a); if (yc.test(a.replace(Ac, "@").replace(Bc, "]").replace(zc, ""))) return (new Function("return " + a))(); d.error("Invalid JSON: " + a) }, parseXML: function(a) {
    var b, c; if (!a || typeof a !== "string") return null; try { if (B.DOMParser) { c = new DOMParser; b = c.parseFromString(a, "text/xml") } else { b = new ActiveXObject("Microsoft.XMLDOM"); b.async = "false"; b.loadXML(a) } } catch (e) { b = u } if (!b ||
!b.documentElement || b.getElementsByTagName("parsererror").length) d.error("Invalid XML: " + a); return b
}, noop: function() { }, globalEval: function(a) { if (a && vc.test(a)) (B.execScript || function(b) { B.eval.call(B, b) })(a) }, camelCase: function(a) { return a.replace(Cc, "ms-").replace(Dc, Ec) }, nodeName: function(a, b) { return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase() }, each: function(a, b, c) {
    var e, f = 0, g = a.length, h = g === u || d.isFunction(a); if (c) if (h) for (e in a) { if (b.apply(a[e], c) === false) break } else for (; f < g; ) {
        if (b.apply(a[f++],
c) === false) break
    } else if (h) for (e in a) { if (b.call(a[e], e, a[e]) === false) break } else for (; f < g; ) if (b.call(a[f], f, a[f++]) === false) break; return a
}, trim: Pa && !Pa.call("\ufeff\u00a0") ? function(a) { return a == null ? "" : Pa.call(a) } : function(a) { return a == null ? "" : (a + "").replace(wc, "") }, makeArray: function(a, b) { var c = b || []; if (a != null) { b = d.type(a); a.length == null || b === "string" || b === "function" || b === "regexp" || d.isWindow(a) ? wb.call(c, a) : d.merge(c, a) } return c }, inArray: function(a, b, c) {
    var e; if (b) {
        if (xb) return xb.call(b, a, c);
        e = b.length; for (c = c ? c < 0 ? Math.max(0, e + c) : c : 0; c < e; c++) if (c in b && b[c] === a) return c
    } return -1
}, merge: function(a, b) { var c = b.length, e = a.length, f = 0; if (typeof c === "number") for (; f < c; f++) a[e++] = b[f]; else for (; b[f] !== u; ) a[e++] = b[f++]; a.length = e; return a }, grep: function(a, b, c) { var e, f = [], g = 0, h = a.length; for (c = !!c; g < h; g++) { e = !!b(a[g], g); c !== e && f.push(a[g]) } return f }, map: function(a, b, c) {
    var e, f, g = [], h = 0, j = a.length; if (a instanceof d || j !== u && typeof j === "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || d.isArray(a))) for (; h < j; h++) {
        e =
b(a[h], h, c); if (e != null) g[g.length] = e
    } else for (f in a) { e = b(a[f], f, c); if (e != null) g[g.length] = e } return g.concat.apply([], g)
}, guid: 1, proxy: function(a, b) { var c, e; if (typeof b === "string") { c = a[b]; b = a; a = c } if (d.isFunction(a)) { e = Z.call(arguments, 2); c = function() { return a.apply(b, e.concat(Z.call(arguments))) }; c.guid = a.guid = a.guid || d.guid++; return c } }, access: function(a, b, c, e, f, g, h) {
    var j, m = c == null, o = 0, l = a.length; if (c && typeof c === "object") { for (o in c) d.access(a, b, o, c[o], 1, g, e); f = 1 } else if (e !== u) {
        j = h === u && d.isFunction(e);
        if (m) if (j) { j = b; b = function(r, x, z) { return j.call(d(r), z) } } else { b.call(a, e); b = null } if (b) for (; o < l; o++) b(a[o], c, j ? e.call(a[o], o, b(a[o], c)) : e, h); f = 1
    } return f ? a : m ? b.call(a) : l ? b(a[0], c) : g
}, now: function() { return (new Date).getTime() } 
}); d.ready.promise = function(a) {
    if (!Ca) {
        Ca = d.Deferred(); if (y.readyState === "complete") setTimeout(d.ready, 1); else if (y.addEventListener) { y.addEventListener("DOMContentLoaded", Ea, false); B.addEventListener("load", d.ready, false) } else {
            y.attachEvent("onreadystatechange", Ea); B.attachEvent("onload",
d.ready); var b = false; try { b = B.frameElement == null && y.documentElement } catch (c) { } b && b.doScroll && function e() { if (!d.isReady) { try { b.doScroll("left") } catch (f) { return setTimeout(e, 50) } d.ready() } } ()
        } 
    } return Ca.promise(a)
}; d.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) { zb["[object " + b + "]"] = b.toLowerCase() }); vb = d(y); var Za = {}; d.Callbacks = function(a) {
    a = typeof a === "string" ? Za[a] || cc(a) : d.extend({}, a); var b, c, e, f, g, h, j = [], m = !a.once && [], o = function(r) {
        b = a.memory && r; c = true;
        h = f || 0; f = 0; g = j.length; for (e = true; j && h < g; h++) if (j[h].apply(r[0], r[1]) === false && a.stopOnFalse) { b = false; break } e = false; if (j) if (m) m.length && o(m.shift()); else if (b) j = []; else l.disable()
    }, l = { add: function() { if (j) { var r = j.length; (function x(z) { d.each(z, function(G, K) { var $ = d.type(K); if ($ === "function") { if (!a.unique || !l.has(K)) j.push(K) } else K && K.length && $ !== "string" && x(K) }) })(arguments); if (e) g = j.length; else if (b) { f = r; o(b) } } return this }, remove: function() {
        j && d.each(arguments, function(r, x) {
            for (var z; (z = d.inArray(x,
j, z)) > -1; ) { j.splice(z, 1); if (e) { z <= g && g--; z <= h && h-- } } 
        }); return this
    }, has: function(r) { return d.inArray(r, j) > -1 }, empty: function() { j = []; return this }, disable: function() { j = m = b = u; return this }, disabled: function() { return !j }, lock: function() { m = u; b || l.disable(); return this }, locked: function() { return !m }, fireWith: function(r, x) { x = x || []; x = [r, x.slice ? x.slice() : x]; if (j && (!c || m)) e ? m.push(x) : o(x); return this }, fire: function() { l.fireWith(this, arguments); return this }, fired: function() { return !!c } 
    }; return l
}; d.extend({ Deferred: function(a) {
    var b =
[["resolve", "done", d.Callbacks("once memory"), "resolved"], ["reject", "fail", d.Callbacks("once memory"), "rejected"], ["notify", "progress", d.Callbacks("memory")]], c = "pending", e = { state: function() { return c }, always: function() { f.done(arguments).fail(arguments); return this }, then: function() {
    var g = arguments; return d.Deferred(function(h) {
        d.each(b, function(j, m) {
            var o = m[0], l = g[j]; f[m[1]](d.isFunction(l) ? function() {
                var r = l.apply(this, arguments); r && d.isFunction(r.promise) ? r.promise().done(h.resolve).fail(h.reject).progress(h.notify) :
h[o + "With"](this === f ? h : this, [r])
            } : h[o])
        }); g = null
    }).promise()
}, promise: function(g) { return g != null ? d.extend(g, e) : e } 
}, f = {}; e.pipe = e.then; d.each(b, function(g, h) { var j = h[2], m = h[3]; e[h[1]] = j.add; m && j.add(function() { c = m }, b[g ^ 1][2].disable, b[2][2].lock); f[h[0]] = j.fire; f[h[0] + "With"] = j.fireWith }); e.promise(f); a && a.call(f, f); return f
}, when: function(a) {
    var b = 0, c = Z.call(arguments), e = c.length, f = e !== 1 || a && d.isFunction(a.promise) ? e : 0, g = f === 1 ? a : d.Deferred(), h = function(l, r, x) {
        return function(z) {
            r[l] = this; x[l] = arguments.length >
1 ? Z.call(arguments) : z; if (x === j) g.notifyWith(r, x); else --f || g.resolveWith(r, x)
        } 
    }, j, m, o; if (e > 1) { j = new Array(e); m = new Array(e); for (o = new Array(e); b < e; b++) if (c[b] && d.isFunction(c[b].promise)) c[b].promise().done(h(b, o, c)).fail(g.reject).progress(h(b, m, j)); else --f } f || g.resolveWith(o, c); return g.promise()
} 
}); d.support = function() {
    var a, b, c, e, f, g, h, j = y.createElement("div"); j.setAttribute("className", "t"); j.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"; b = j.getElementsByTagName("*");
    c = j.getElementsByTagName("a")[0]; if (!b || !c || !b.length) return {}; e = y.createElement("select"); f = e.appendChild(y.createElement("option")); b = j.getElementsByTagName("input")[0]; c.style.cssText = "top:1px;float:left;opacity:.5"; a = { leadingWhitespace: j.firstChild.nodeType === 3, tbody: !j.getElementsByTagName("tbody").length, htmlSerialize: !!j.getElementsByTagName("link").length, style: /top/.test(c.getAttribute("style")), hrefNormalized: c.getAttribute("href") === "/a", opacity: /^0.5/.test(c.style.opacity), cssFloat: !!c.style.cssFloat,
        checkOn: b.value === "on", optSelected: f.selected, getSetAttribute: j.className !== "t", enctype: !!y.createElement("form").enctype, html5Clone: y.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>", boxModel: y.compatMode === "CSS1Compat", submitBubbles: true, changeBubbles: true, focusinBubbles: false, deleteExpando: true, noCloneEvent: true, inlineBlockNeedsLayout: false, shrinkWrapBlocks: false, reliableMarginRight: true, boxSizingReliable: true, pixelPosition: false
    }; b.checked = true; a.noCloneChecked = b.cloneNode(true).checked;
    e.disabled = true; a.optDisabled = !f.disabled; try { delete j.test } catch (m) { a.deleteExpando = false } if (!j.addEventListener && j.attachEvent && j.fireEvent) { j.attachEvent("onclick", c = function() { a.noCloneEvent = false }); j.cloneNode(true).fireEvent("onclick"); j.detachEvent("onclick", c) } b = y.createElement("input"); b.value = "t"; b.setAttribute("type", "radio"); a.radioValue = b.value === "t"; b.setAttribute("checked", "checked"); b.setAttribute("name", "t"); j.appendChild(b); c = y.createDocumentFragment(); c.appendChild(j.lastChild);
    a.checkClone = c.cloneNode(true).cloneNode(true).lastChild.checked; a.appendChecked = b.checked; c.removeChild(b); c.appendChild(j); if (j.attachEvent) for (g in { submit: true, change: true, focusin: true }) { b = "on" + g; h = b in j; if (!h) { j.setAttribute(b, "return;"); h = typeof j[b] === "function" } a[g + "Bubbles"] = h } d(function() {
        var o, l, r, x = y.getElementsByTagName("body")[0]; if (x) {
            o = y.createElement("div"); o.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px"; x.insertBefore(o, x.firstChild);
            l = y.createElement("div"); o.appendChild(l); l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"; r = l.getElementsByTagName("td"); r[0].style.cssText = "padding:0;margin:0;border:0;display:none"; h = r[0].offsetHeight === 0; r[0].style.display = ""; r[1].style.display = "none"; a.reliableHiddenOffsets = h && r[0].offsetHeight === 0; l.innerHTML = ""; l.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
            a.boxSizing = l.offsetWidth === 4; a.doesNotIncludeMarginInBodyOffset = x.offsetTop !== 1; if (B.getComputedStyle) { a.pixelPosition = (B.getComputedStyle(l, null) || {}).top !== "1%"; a.boxSizingReliable = (B.getComputedStyle(l, null) || { width: "4px" }).width === "4px"; r = y.createElement("div"); r.style.cssText = l.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;"; r.style.marginRight = r.style.width = "0"; l.style.width = "1px"; l.appendChild(r); a.reliableMarginRight = !parseFloat((B.getComputedStyle(r, null) || {}).marginRight) } if (typeof l.style.zoom !==
"undefined") { l.innerHTML = ""; l.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1"; a.inlineBlockNeedsLayout = l.offsetWidth === 3; l.style.display = "block"; l.style.overflow = "visible"; l.innerHTML = "<div></div>"; l.firstChild.style.width = "5px"; a.shrinkWrapBlocks = l.offsetWidth !== 3; o.style.zoom = 1 } x.removeChild(o)
        } 
    }); c.removeChild(j); b = c = e = f = b = c = j = null; return a
} (); var ec = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, dc = /([A-Z])/g; d.extend({ cache: {}, deletedIds: [],
    uuid: 0, expando: "jQuery" + (d.fn.jquery + Math.random()).replace(/\D/g, ""), noData: { embed: true, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: true }, hasData: function(a) { a = a.nodeType ? d.cache[a[d.expando]] : a[d.expando]; return !!a && !Ka(a) }, data: function(a, b, c, e) {
        if (d.acceptData(a)) {
            var f = d.expando, g = typeof b === "string", h = a.nodeType, j = h ? d.cache : a, m = h ? a[f] : a[f] && f; if (!((!m || !j[m] || !e && !j[m].data) && g && c === u)) {
                if (!m) if (h) a[f] = m = d.deletedIds.pop() || d.guid++; else m = f; if (!j[m]) {
                    j[m] = {}; if (!h) j[m].toJSON =
d.noop
                } if (typeof b === "object" || typeof b === "function") if (e) j[m] = d.extend(j[m], b); else j[m].data = d.extend(j[m].data, b); a = j[m]; if (!e) { if (!a.data) a.data = {}; a = a.data } if (c !== u) a[d.camelCase(b)] = c; if (g) { c = a[b]; if (c == null) c = a[d.camelCase(b)] } else c = a; return c
            } 
        } 
    }, removeData: function(a, b, c) {
        if (d.acceptData(a)) {
            var e, f, g, h = a.nodeType, j = h ? d.cache : a, m = h ? a[d.expando] : d.expando; if (j[m]) {
                if (b) if (e = c ? j[m] : j[m].data) {
                    if (!d.isArray(b)) if (b in e) b = [b]; else { b = d.camelCase(b); b = b in e ? [b] : b.split(" ") } f = 0; for (g = b.length; f <
g; f++) delete e[b[f]]; if (!(c ? Ka : d.isEmptyObject)(e)) return
                } if (!c) { delete j[m].data; if (!Ka(j[m])) return } if (h) d.cleanData([a], true); else if (d.support.deleteExpando || j != j.window) delete j[m]; else j[m] = null
            } 
        } 
    }, _data: function(a, b, c) { return d.data(a, b, c, true) }, acceptData: function(a) { var b = a.nodeName && d.noData[a.nodeName.toLowerCase()]; return !b || b !== true && a.getAttribute("classid") === b } 
}); d.fn.extend({ data: function(a, b) {
    var c, e, f, g, h, j = this[0], m = 0, o = null; if (a === u) {
        if (this.length) {
            o = d.data(j); if (j.nodeType ===
1 && !d._data(j, "parsedAttrs")) { f = j.attributes; for (h = f.length; m < h; m++) { g = f[m].name; if (!g.indexOf("data-")) { g = d.camelCase(g.substring(5)); $a(j, g, o[g]) } } d._data(j, "parsedAttrs", true) } 
        } return o
    } if (typeof a === "object") return this.each(function() { d.data(this, a) }); c = a.split(".", 2); c[1] = c[1] ? "." + c[1] : ""; e = c[1] + "!"; return d.access(this, function(l) {
        if (l === u) { o = this.triggerHandler("getData" + e, [c[0]]); if (o === u && j) { o = d.data(j, a); o = $a(j, a, o) } return o === u && c[1] ? this.data(c[0]) : o } c[1] = l; this.each(function() {
            var r =
d(this); r.triggerHandler("setData" + e, c); d.data(this, a, l); r.triggerHandler("changeData" + e, c)
        })
    }, null, b, arguments.length > 1, null, false)
}, removeData: function(a) { return this.each(function() { d.removeData(this, a) }) } 
}); d.extend({ queue: function(a, b, c) { var e; if (a) { b = (b || "fx") + "queue"; e = d._data(a, b); if (c) if (!e || d.isArray(c)) e = d._data(a, b, d.makeArray(c)); else e.push(c); return e || [] } }, dequeue: function(a, b) {
    b = b || "fx"; var c = d.queue(a, b), e = c.length, f = c.shift(), g = d._queueHooks(a, b), h = function() { d.dequeue(a, b) }; if (f ===
"inprogress") { f = c.shift(); e-- } if (f) { b === "fx" && c.unshift("inprogress"); delete g.stop; f.call(a, h, g) } !e && g && g.empty.fire()
}, _queueHooks: function(a, b) { var c = b + "queueHooks"; return d._data(a, c) || d._data(a, c, { empty: d.Callbacks("once memory").add(function() { d.removeData(a, b + "queue", true); d.removeData(a, c, true) }) }) } 
}); d.fn.extend({ queue: function(a, b) {
    var c = 2; if (typeof a !== "string") { b = a; a = "fx"; c-- } if (arguments.length < c) return d.queue(this[0], a); return b === u ? this : this.each(function() {
        var e = d.queue(this, a, b);
        d._queueHooks(this, a); a === "fx" && e[0] !== "inprogress" && d.dequeue(this, a)
    })
}, dequeue: function(a) { return this.each(function() { d.dequeue(this, a) }) }, delay: function(a, b) { a = d.fx ? d.fx.speeds[a] || a : a; b = b || "fx"; return this.queue(b, function(c, e) { var f = setTimeout(c, a); e.stop = function() { clearTimeout(f) } }) }, clearQueue: function(a) { return this.queue(a || "fx", []) }, promise: function(a, b) {
    var c, e = 1, f = d.Deferred(), g = this, h = this.length, j = function() { --e || f.resolveWith(g, [g]) }; if (typeof a !== "string") { b = a; a = u } for (a = a || "fx"; h--; ) if ((c =
d._data(g[h], a + "queueHooks")) && c.empty) { e++; c.empty.add(j) } j(); return f.promise(b)
} 
}); var aa, Ab, Bb, Cb = /[\t\r\n]/g, Fc = /\r/g, Gc = /^(?:button|input)$/i, Hc = /^(?:button|input|object|select|textarea)$/i, Ic = /^a(?:rea|)$/i, Db = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Eb = d.support.getSetAttribute; d.fn.extend({ attr: function(a, b) { return d.access(this, d.attr, a, b, arguments.length > 1) }, removeAttr: function(a) {
    return this.each(function() {
        d.removeAttr(this,
a)
    })
}, prop: function(a, b) { return d.access(this, d.prop, a, b, arguments.length > 1) }, removeProp: function(a) { a = d.propFix[a] || a; return this.each(function() { try { this[a] = u; delete this[a] } catch (b) { } }) }, addClass: function(a) {
    var b, c, e, f, g, h, j; if (d.isFunction(a)) return this.each(function(m) { d(this).addClass(a.call(this, m, this.className)) }); if (a && typeof a === "string") {
        b = a.split(ea); c = 0; for (e = this.length; c < e; c++) {
            f = this[c]; if (f.nodeType === 1) if (!f.className && b.length === 1) f.className = a; else {
                g = " " + f.className + " "; h = 0;
                for (j = b.length; h < j; h++) if (g.indexOf(" " + b[h] + " ") < 0) g += b[h] + " "; f.className = d.trim(g)
            } 
        } 
    } return this
}, removeClass: function(a) {
    var b, c, e, f, g, h, j; if (d.isFunction(a)) return this.each(function(m) { d(this).removeClass(a.call(this, m, this.className)) }); if (a && typeof a === "string" || a === u) {
        b = (a || "").split(ea); h = 0; for (j = this.length; h < j; h++) {
            e = this[h]; if (e.nodeType === 1 && e.className) {
                c = (" " + e.className + " ").replace(Cb, " "); f = 0; for (g = b.length; f < g; f++) for (; c.indexOf(" " + b[f] + " ") >= 0; ) c = c.replace(" " + b[f] + " ", " ");
                e.className = a ? d.trim(c) : ""
            } 
        } 
    } return this
}, toggleClass: function(a, b) {
    var c = typeof a, e = typeof b === "boolean"; if (d.isFunction(a)) return this.each(function(f) { d(this).toggleClass(a.call(this, f, this.className, b), b) }); return this.each(function() {
        if (c === "string") for (var f, g = 0, h = d(this), j = b, m = a.split(ea); f = m[g++]; ) { j = e ? j : !h.hasClass(f); h[j ? "addClass" : "removeClass"](f) } else if (c === "undefined" || c === "boolean") {
            this.className && d._data(this, "__className__", this.className); this.className = this.className || a === false ?
"" : d._data(this, "__className__") || ""
        } 
    })
}, hasClass: function(a) { a = " " + a + " "; for (var b = 0, c = this.length; b < c; b++) if (this[b].nodeType === 1 && (" " + this[b].className + " ").replace(Cb, " ").indexOf(a) >= 0) return true; return false }, val: function(a) {
    var b, c, e, f = this[0]; if (arguments.length) {
        e = d.isFunction(a); return this.each(function(g) {
            var h = d(this); if (this.nodeType === 1) {
                g = e ? a.call(this, g, h.val()) : a; if (g == null) g = ""; else if (typeof g === "number") g += ""; else if (d.isArray(g)) g = d.map(g, function(j) { return j == null ? "" : j + "" });
                b = d.valHooks[this.type] || d.valHooks[this.nodeName.toLowerCase()]; if (!b || !("set" in b) || b.set(this, g, "value") === u) this.value = g
            } 
        })
    } else if (f) { if ((b = d.valHooks[f.type] || d.valHooks[f.nodeName.toLowerCase()]) && "get" in b && (c = b.get(f, "value")) !== u) return c; c = f.value; return typeof c === "string" ? c.replace(Fc, "") : c == null ? "" : c } 
} 
}); d.extend({ valHooks: { option: { get: function(a) { var b = a.attributes.value; return !b || b.specified ? a.value : a.text } }, select: { get: function(a) {
    for (var b, c = a.options, e = a.selectedIndex, f = (a = a.type ===
"select-one" || e < 0) ? null : [], g = a ? e + 1 : c.length, h = e < 0 ? g : a ? e : 0; h < g; h++) { b = c[h]; if ((b.selected || h === e) && (d.support.optDisabled ? !b.disabled : b.getAttribute("disabled") === null) && (!b.parentNode.disabled || !d.nodeName(b.parentNode, "optgroup"))) { b = d(b).val(); if (a) return b; f.push(b) } } return f
}, set: function(a, b) { var c = d.makeArray(b); d(a).find("option").each(function() { this.selected = d.inArray(d(this).val(), c) >= 0 }); if (!c.length) a.selectedIndex = -1; return c } }
}, attrFn: {}, attr: function(a, b, c, e) {
    var f, g, h = a.nodeType; if (!(!a ||
h === 3 || h === 8 || h === 2)) { if (e && d.isFunction(d.fn[b])) return d(a)[b](c); if (typeof a.getAttribute === "undefined") return d.prop(a, b, c); if (e = h !== 1 || !d.isXMLDoc(a)) { b = b.toLowerCase(); g = d.attrHooks[b] || (Db.test(b) ? Ab : aa) } if (c !== u) if (c === null) d.removeAttr(a, b); else if (g && "set" in g && e && (f = g.set(a, c, b)) !== u) return f; else { a.setAttribute(b, c + ""); return c } else if (g && "get" in g && e && (f = g.get(a, b)) !== null) return f; else { f = a.getAttribute(b); return f === null ? u : f } } 
}, removeAttr: function(a, b) {
    var c, e, f, g = 0; if (b && a.nodeType ===
1) for (c = b.split(ea); g < c.length; g++) if (e = c[g]) { b = d.propFix[e] || e; (f = Db.test(e)) || d.attr(a, e, ""); a.removeAttribute(Eb ? e : b); if (f && b in a) a[b] = false } 
}, attrHooks: { type: { set: function(a, b) { if (Gc.test(a.nodeName) && a.parentNode) d.error("type property can't be changed"); else if (!d.support.radioValue && b === "radio" && d.nodeName(a, "input")) { var c = a.value; a.setAttribute("type", b); if (c) a.value = c; return b } } }, value: { get: function(a, b) { if (aa && d.nodeName(a, "button")) return aa.get(a, b); return b in a ? a.value : null }, set: function(a,
b, c) { if (aa && d.nodeName(a, "button")) return aa.set(a, b, c); a.value = b } }
}, propFix: { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, prop: function(a, b, c) {
    var e, f, g = a.nodeType; if (!(!a || g === 3 || g === 8 || g === 2)) {
        if (g !== 1 || !d.isXMLDoc(a)) { b = d.propFix[b] || b; f = d.propHooks[b] } return c !== u ? f && "set" in f &&
(e = f.set(a, c, b)) !== u ? e : (a[b] = c) : f && "get" in f && (e = f.get(a, b)) !== null ? e : a[b]
    } 
}, propHooks: { tabIndex: { get: function(a) { var b = a.getAttributeNode("tabindex"); return b && b.specified ? parseInt(b.value, 10) : Hc.test(a.nodeName) || Ic.test(a.nodeName) && a.href ? 0 : u } }}
}); Ab = { get: function(a, b) { var c, e = d.prop(a, b); return e === true || typeof e !== "boolean" && (c = a.getAttributeNode(b)) && c.nodeValue !== false ? b.toLowerCase() : u }, set: function(a, b, c) {
    if (b === false) d.removeAttr(a, c); else {
        b = d.propFix[c] || c; if (b in a) a[b] = true; a.setAttribute(c,
c.toLowerCase())
    } return c
} 
}; if (!Eb) {
        Bb = { name: true, id: true, coords: true }; aa = d.valHooks.button = { get: function(a, b) { return (a = a.getAttributeNode(b)) && (Bb[b] ? a.value !== "" : a.specified) ? a.value : u }, set: function(a, b, c) { var e = a.getAttributeNode(c); if (!e) { e = y.createAttribute(c); a.setAttributeNode(e) } return e.value = b + "" } }; d.each(["width", "height"], function(a, b) { d.attrHooks[b] = d.extend(d.attrHooks[b], { set: function(c, e) { if (e === "") { c.setAttribute(b, "auto"); return e } } }) }); d.attrHooks.contenteditable = { get: aa.get, set: function(a,
b, c) { if (b === "") b = "false"; aa.set(a, b, c) } }
        } d.support.hrefNormalized || d.each(["href", "src", "width", "height"], function(a, b) { d.attrHooks[b] = d.extend(d.attrHooks[b], { get: function(c) { c = c.getAttribute(b, 2); return c === null ? u : c } }) }); if (!d.support.style) d.attrHooks.style = { get: function(a) { return a.style.cssText.toLowerCase() || u }, set: function(a, b) { return a.style.cssText = b + "" } }; if (!d.support.optSelected) d.propHooks.selected = d.extend(d.propHooks.selected, { get: function() { return null } }); if (!d.support.enctype) d.propFix.enctype =
"encoding"; d.support.checkOn || d.each(["radio", "checkbox"], function() { d.valHooks[this] = { get: function(a) { return a.getAttribute("value") === null ? "on" : a.value } } }); d.each(["radio", "checkbox"], function() { d.valHooks[this] = d.extend(d.valHooks[this], { set: function(a, b) { if (d.isArray(b)) return a.checked = d.inArray(d(a).val(), b) >= 0 } }) }); var Qa = /^(?:textarea|input|select)$/i, Fb = /^([^\.]*|)(?:\.(.+)|)$/, Jc = /(?:^|\s)hover(\.\S+|)\b/, Kc = /^key/, Lc = /^(?:mouse|contextmenu)|click/, Gb = /^(?:focusinfocus|focusoutblur)$/, Hb =
function(a) { return d.event.special.hover ? a : a.replace(Jc, "mouseenter$1 mouseleave$1") }; d.event = { add: function(a, b, c, e, f) {
    var g, h, j, m, o, l, r, x, z; if (!(a.nodeType === 3 || a.nodeType === 8 || !b || !c || !(g = d._data(a)))) {
        if (c.handler) { r = c; c = r.handler; f = r.selector } if (!c.guid) c.guid = d.guid++; j = g.events; if (!j) g.events = j = {}; h = g.handle; if (!h) { g.handle = h = function(G) { return typeof d !== "undefined" && (!G || d.event.triggered !== G.type) ? d.event.dispatch.apply(h.elem, arguments) : u }; h.elem = a } b = d.trim(Hb(b)).split(" "); for (g = 0; g < b.length; g++) {
            m =
Fb.exec(b[g]) || []; o = m[1]; l = (m[2] || "").split(".").sort(); z = d.event.special[o] || {}; o = (f ? z.delegateType : z.bindType) || o; z = d.event.special[o] || {}; m = d.extend({ type: o, origType: m[1], data: e, handler: c, guid: c.guid, selector: f, needsContext: f && d.expr.match.needsContext.test(f), namespace: l.join(".") }, r); x = j[o]; if (!x) { x = j[o] = []; x.delegateCount = 0; if (!z.setup || z.setup.call(a, e, l, h) === false) if (a.addEventListener) a.addEventListener(o, h, false); else a.attachEvent && a.attachEvent("on" + o, h) } if (z.add) {
                z.add.call(a, m); if (!m.handler.guid) m.handler.guid =
c.guid
            } f ? x.splice(x.delegateCount++, 0, m) : x.push(m); d.event.global[o] = true
        } a = null
    } 
}, global: {}, remove: function(a, b, c, e, f) {
    var g, h, j, m, o, l, r, x, z, G, K = d.hasData(a) && d._data(a); if (K && (r = K.events)) {
        b = d.trim(Hb(b || "")).split(" "); for (g = 0; g < b.length; g++) {
            h = Fb.exec(b[g]) || []; j = m = h[1]; h = h[2]; if (j) {
                x = d.event.special[j] || {}; j = (e ? x.delegateType : x.bindType) || j; z = r[j] || []; o = z.length; h = h ? new RegExp("(^|\\.)" + h.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null; for (l = 0; l < z.length; l++) {
                    G = z[l]; if ((f || m === G.origType) &&
(!c || c.guid === G.guid) && (!h || h.test(G.namespace)) && (!e || e === G.selector || e === "**" && G.selector)) { z.splice(l--, 1); G.selector && z.delegateCount--; x.remove && x.remove.call(a, G) } 
                } if (z.length === 0 && o !== z.length) { if (!x.teardown || x.teardown.call(a, h, K.handle) === false) d.removeEvent(a, j, K.handle); delete r[j] } 
            } else for (j in r) d.event.remove(a, j + b[g], c, e, true)
        } if (d.isEmptyObject(r)) { delete K.handle; d.removeData(a, "events", true) } 
    } 
}, customEvent: { getData: true, setData: true, changeData: true }, trigger: function(a, b, c, e) {
    if (!(c &&
(c.nodeType === 3 || c.nodeType === 8))) {
        var f, g, h, j, m, o, l = a.type || a; h = []; if (!Gb.test(l + d.event.triggered)) {
            if (l.indexOf("!") >= 0) { l = l.slice(0, -1); f = true } if (l.indexOf(".") >= 0) { h = l.split("."); l = h.shift(); h.sort() } if (!((!c || d.event.customEvent[l]) && !d.event.global[l])) {
                a = typeof a === "object" ? a[d.expando] ? a : new d.Event(l, a) : new d.Event(l); a.type = l; a.isTrigger = true; a.exclusive = f; a.namespace = h.join("."); a.namespace_re = a.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null; h = l.indexOf(":") < 0 ?
"on" + l : ""; if (c) {
                    a.result = u; if (!a.target) a.target = c; b = b != null ? d.makeArray(b) : []; b.unshift(a); j = d.event.special[l] || {}; if (!(j.trigger && j.trigger.apply(c, b) === false)) {
                        o = [[c, j.bindType || l]]; if (!e && !j.noBubble && !d.isWindow(c)) { m = j.delegateType || l; f = Gb.test(m + l) ? c : c.parentNode; for (g = c; f; f = f.parentNode) { o.push([f, m]); g = f } if (g === (c.ownerDocument || y)) o.push([g.defaultView || g.parentWindow || B, m]) } for (g = 0; g < o.length && !a.isPropagationStopped(); g++) {
                            f = o[g][0]; a.type = o[g][1]; (m = (d._data(f, "events") || {})[a.type] &&
d._data(f, "handle")) && m.apply(f, b); (m = h && f[h]) && d.acceptData(f) && m.apply && m.apply(f, b) === false && a.preventDefault()
                        } a.type = l; if (!e && !a.isDefaultPrevented()) if ((!j._default || j._default.apply(c.ownerDocument, b) === false) && !(l === "click" && d.nodeName(c, "a")) && d.acceptData(c)) if (h && c[l] && (l !== "focus" && l !== "blur" || a.target.offsetWidth !== 0) && !d.isWindow(c)) { if (g = c[h]) c[h] = null; d.event.triggered = l; c[l](); d.event.triggered = u; if (g) c[h] = g } return a.result
                    } 
                } else {
                    c = d.cache; for (g in c) c[g].events && c[g].events[l] &&
d.event.trigger(a, b, c[g].handle.elem, true)
                } 
            } 
        } 
    } 
}, dispatch: function(a) {
    a = d.event.fix(a || B.event); var b, c, e, f, g, h, j = (d._data(this, "events") || {})[a.type] || [], m = j.delegateCount, o = Z.call(arguments), l = !a.exclusive && !a.namespace, r = d.event.special[a.type] || {}, x = []; o[0] = a; a.delegateTarget = this; if (!(r.preDispatch && r.preDispatch.call(this, a) === false)) {
        if (m && !(a.button && a.type === "click")) for (c = a.target; c != this; c = c.parentNode || this) if (c.disabled !== true || a.type !== "click") {
            f = {}; g = []; for (b = 0; b < m; b++) {
                e = j[b]; h = e.selector;
                if (f[h] === u) f[h] = e.needsContext ? d(h, this).index(c) >= 0 : d.find(h, this, null, [c]).length; f[h] && g.push(e)
            } g.length && x.push({ elem: c, matches: g })
        } j.length > m && x.push({ elem: this, matches: j.slice(m) }); for (b = 0; b < x.length && !a.isPropagationStopped(); b++) {
            f = x[b]; a.currentTarget = f.elem; for (c = 0; c < f.matches.length && !a.isImmediatePropagationStopped(); c++) {
                e = f.matches[c]; if (l || !a.namespace && !e.namespace || a.namespace_re && a.namespace_re.test(e.namespace)) {
                    a.data = e.data; a.handleObj = e; e = ((d.event.special[e.origType] || {}).handle ||
e.handler).apply(f.elem, o); if (e !== u) { a.result = e; if (e === false) { a.preventDefault(); a.stopPropagation() } } 
                } 
            } 
        } r.postDispatch && r.postDispatch.call(this, a); return a.result
    } 
}, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function(a, b) { if (a.which == null) a.which = b.charCode != null ? b.charCode : b.keyCode; return a } },
    mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function(a, b) {
        var c, e, f = b.button, g = b.fromElement; if (a.pageX == null && b.clientX != null) { c = a.target.ownerDocument || y; e = c.documentElement; c = c.body; a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0); a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0) } if (!a.relatedTarget && g) a.relatedTarget = g ===
a.target ? b.toElement : g; if (!a.which && f !== u) a.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0; return a
    } 
    }, fix: function(a) { if (a[d.expando]) return a; var b, c, e = a, f = d.event.fixHooks[a.type] || {}, g = f.props ? this.props.concat(f.props) : this.props; a = d.Event(e); for (b = g.length; b; ) { c = g[--b]; a[c] = e[c] } if (!a.target) a.target = e.srcElement || y; if (a.target.nodeType === 3) a.target = a.target.parentNode; a.metaKey = !!a.metaKey; return f.filter ? f.filter(a, e) : a }, special: { load: { noBubble: true }, focus: { delegateType: "focusin" }, blur: { delegateType: "focusout" },
        beforeunload: { setup: function(a, b, c) { if (d.isWindow(this)) this.onbeforeunload = c }, teardown: function(a, b) { if (this.onbeforeunload === b) this.onbeforeunload = null } }
    }, simulate: function(a, b, c, e) { a = d.extend(new d.Event, c, { type: a, isSimulated: true, originalEvent: {} }); e ? d.event.trigger(a, null, b) : d.event.dispatch.call(b, a); a.isDefaultPrevented() && c.preventDefault() } 
}; d.event.handle = d.event.dispatch; d.removeEvent = y.removeEventListener ? function(a, b, c) { a.removeEventListener && a.removeEventListener(b, c, false) } : function(a,
b, c) { b = "on" + b; if (a.detachEvent) { if (typeof a[b] === "undefined") a[b] = null; a.detachEvent(b, c) } }; d.Event = function(a, b) { if (!(this instanceof d.Event)) return new d.Event(a, b); if (a && a.type) { this.originalEvent = a; this.type = a.type; this.isDefaultPrevented = a.defaultPrevented || a.returnValue === false || a.getPreventDefault && a.getPreventDefault() ? va : ka } else this.type = a; b && d.extend(this, b); this.timeStamp = a && a.timeStamp || d.now(); this[d.expando] = true }; d.Event.prototype = { preventDefault: function() {
    this.isDefaultPrevented =
va; var a = this.originalEvent; if (a) if (a.preventDefault) a.preventDefault(); else a.returnValue = false
}, stopPropagation: function() { this.isPropagationStopped = va; var a = this.originalEvent; if (a) { a.stopPropagation && a.stopPropagation(); a.cancelBubble = true } }, stopImmediatePropagation: function() { this.isImmediatePropagationStopped = va; this.stopPropagation() }, isDefaultPrevented: ka, isPropagationStopped: ka, isImmediatePropagationStopped: ka
}; d.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function(a, b) {
    d.event.special[a] =
{ delegateType: b, bindType: b, handle: function(c) { var e, f = c.relatedTarget, g = c.handleObj; if (!f || f !== this && !d.contains(this, f)) { c.type = g.origType; e = g.handler.apply(this, arguments); c.type = b } return e } }
}); if (!d.support.submitBubbles) d.event.special.submit = { setup: function() {
    if (d.nodeName(this, "form")) return false; d.event.add(this, "click._submit keypress._submit", function(a) {
        a = a.target; if ((a = d.nodeName(a, "input") || d.nodeName(a, "button") ? a.form : u) && !d._data(a, "_submit_attached")) {
            d.event.add(a, "submit._submit",
function(b) { b._submit_bubble = true }); d._data(a, "_submit_attached", true)
        } 
    })
}, postDispatch: function(a) { if (a._submit_bubble) { delete a._submit_bubble; this.parentNode && !a.isTrigger && d.event.simulate("submit", this.parentNode, a, true) } }, teardown: function() { if (d.nodeName(this, "form")) return false; d.event.remove(this, "._submit") } 
}; if (!d.support.changeBubbles) d.event.special.change = { setup: function() {
    if (Qa.test(this.nodeName)) {
        if (this.type === "checkbox" || this.type === "radio") {
            d.event.add(this, "propertychange._change",
function(a) { if (a.originalEvent.propertyName === "checked") this._just_changed = true }); d.event.add(this, "click._change", function(a) { if (this._just_changed && !a.isTrigger) this._just_changed = false; d.event.simulate("change", this, a, true) })
        } return false
    } d.event.add(this, "beforeactivate._change", function(a) {
        a = a.target; if (Qa.test(a.nodeName) && !d._data(a, "_change_attached")) {
            d.event.add(a, "change._change", function(b) { this.parentNode && !b.isSimulated && !b.isTrigger && d.event.simulate("change", this.parentNode, b, true) });
            d._data(a, "_change_attached", true)
        } 
    })
}, handle: function(a) { var b = a.target; if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments) }, teardown: function() { d.event.remove(this, "._change"); return !Qa.test(this.nodeName) } 
}; d.support.focusinBubbles || d.each({ focus: "focusin", blur: "focusout" }, function(a, b) {
    var c = 0, e = function(f) { d.event.simulate(b, f.target, d.event.fix(f), true) }; d.event.special[b] = { setup: function() {
        c++ === 0 && y.addEventListener(a,
e, true)
    }, teardown: function() { --c === 0 && y.removeEventListener(a, e, true) } }
    }); d.fn.extend({ on: function(a, b, c, e, f) {
        var g, h; if (typeof a === "object") { if (typeof b !== "string") { c = c || b; b = u } for (h in a) this.on(h, b, c, a[h], f); return this } if (c == null && e == null) { e = b; c = b = u } else if (e == null) if (typeof b === "string") { e = c; c = u } else { e = c; c = b; b = u } if (e === false) e = ka; else if (!e) return this; if (f === 1) { g = e; e = function(j) { d().off(j); return g.apply(this, arguments) }; e.guid = g.guid || (g.guid = d.guid++) } return this.each(function() {
            d.event.add(this,
a, e, c, b)
        })
    }, one: function(a, b, c, e) { return this.on(a, b, c, e, 1) }, off: function(a, b, c) { var e; if (a && a.preventDefault && a.handleObj) { e = a.handleObj; d(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler); return this } if (typeof a === "object") { for (e in a) this.off(e, b, a[e]); return this } if (b === false || typeof b === "function") { c = b; b = u } if (c === false) c = ka; return this.each(function() { d.event.remove(this, a, c, b) }) }, bind: function(a, b, c) { return this.on(a, null, b, c) }, unbind: function(a, b) {
        return this.off(a,
null, b)
    }, live: function(a, b, c) { d(this.context).on(a, this.selector, b, c); return this }, die: function(a, b) { d(this.context).off(a, this.selector || "**", b); return this }, delegate: function(a, b, c, e) { return this.on(b, a, c, e) }, undelegate: function(a, b, c) { return arguments.length === 1 ? this.off(a, "**") : this.off(b, a || "**", c) }, trigger: function(a, b) { return this.each(function() { d.event.trigger(a, b, this) }) }, triggerHandler: function(a, b) { if (this[0]) return d.event.trigger(a, b, this[0], true) }, toggle: function(a) {
        var b = arguments,
c = a.guid || d.guid++, e = 0, f = function(g) { var h = (d._data(this, "lastToggle" + a.guid) || 0) % e; d._data(this, "lastToggle" + a.guid, h + 1); g.preventDefault(); return b[h].apply(this, arguments) || false }; for (f.guid = c; e < b.length; ) b[e++].guid = c; return this.click(f)
    }, hover: function(a, b) { return this.mouseenter(a).mouseleave(b || a) } 
    }); d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
function(a, b) { d.fn[b] = function(c, e) { if (e == null) { e = c; c = null } return arguments.length > 0 ? this.on(b, null, c, e) : this.trigger(b) }; if (Kc.test(b)) d.event.fixHooks[b] = d.event.keyHooks; if (Lc.test(b)) d.event.fixHooks[b] = d.event.mouseHooks }); (function(a, b) {
    function c(i, k, n, q) {
        n = n || []; k = k || V; var s, t, p, w, v = k.nodeType; if (!i || typeof i !== "string") return n; if (v !== 1 && v !== 9) return []; p = ga(k); if (!p && !q) if (s = Mc.exec(i)) if (w = s[1]) if (v === 9) if ((t = k.getElementById(w)) && t.parentNode) { if (t.id === w) { n.push(t); return n } } else return n;
        else { if (k.ownerDocument && (t = k.ownerDocument.getElementById(w)) && ua(k, t) && t.id === w) { n.push(t); return n } } else if (s[2]) { oa.apply(n, pa.call(k.getElementsByTagName(i), 0)); return n } else if ((w = s[3]) && Ib && k.getElementsByClassName) { oa.apply(n, pa.call(k.getElementsByClassName(w), 0)); return n } return K(i.replace(Fa, "$1"), k, n, q, p)
    } function e(i) { return function(k) { return k.nodeName.toLowerCase() === "input" && k.type === i } } function f(i) {
        return function(k) {
            var n = k.nodeName.toLowerCase(); return (n === "input" || n === "button") &&
k.type === i
        } 
    } function g(i) { return Y(function(k) { k = +k; return Y(function(n, q) { for (var s, t = i([], n.length, k), p = t.length; p--; ) if (n[s = t[p]]) n[s] = !(q[s] = n[s]) }) }) } function h(i, k, n) { if (i === k) return n; for (i = i.nextSibling; i; ) { if (i === k) return -1; i = i.nextSibling } return 1 } function j(i, k) {
        var n, q, s, t, p, w, v; if (p = Jb[J][i + " "]) return k ? 0 : p.slice(0); p = i; w = []; for (v = F.preFilter; p; ) {
            if (!n || (q = Nc.exec(p))) { if (q) p = p.slice(q[0].length) || p; w.push(s = []) } n = false; if (q = Oc.exec(p)) {
                s.push(n = new ba(q.shift())); p = p.slice(n.length);
                n.type = q[0].replace(Fa, " ")
            } for (t in F.filter) if ((q = Ga[t].exec(p)) && (!v[t] || (q = v[t](q)))) { s.push(n = new ba(q.shift())); p = p.slice(n.length); n.type = t; n.matches = q } if (!n) break
        } return k ? p.length : p ? c.error(i) : Jb(i, w).slice(0)
    } function m(i, k, n) {
        var q = k.dir, s = n && k.dir === "parentNode", t = Pc++; return k.first ? function(p, w, v) { for (; p = p[q]; ) if (s || p.nodeType === 1) return i(p, w, v) } : function(p, w, v) {
            if (v) for (; p = p[q]; ) { if (s || p.nodeType === 1) if (i(p, w, v)) return p } else for (var C, E = Ha + " " + t + " ", H = E + ca; p = p[q]; ) if (s || p.nodeType ===
1) if ((C = p[J]) === H) return p.sizset; else if (typeof C === "string" && C.indexOf(E) === 0) { if (p.sizset) return p } else { p[J] = H; if (i(p, w, v)) { p.sizset = true; return p } p.sizset = false } 
        } 
    } function o(i) { return i.length > 1 ? function(k, n, q) { for (var s = i.length; s--; ) if (!i[s](k, n, q)) return false; return true } : i[0] } function l(i, k, n, q, s) { for (var t, p = [], w = 0, v = i.length, C = k != null; w < v; w++) if (t = i[w]) if (!n || n(t, q, s)) { p.push(t); C && k.push(w) } return p } function r(i, k, n, q, s, t) {
        if (q && !q[J]) q = r(q); if (s && !s[J]) s = r(s, t); return Y(function(p, w,
v, C) { var E, H, I = [], P = [], R = w.length, O = p || G(k || "*", v.nodeType ? [v] : v, []); O = i && (p || !k) ? l(O, I, i, v, C) : O; var N = n ? s || (p ? i : R || q) ? [] : w : O; n && n(O, N, v, C); if (q) { E = l(N, P); q(E, [], v, C); for (v = E.length; v--; ) if (H = E[v]) N[P[v]] = !(O[P[v]] = H) } if (p) { if (s || i) { if (s) { E = []; for (v = N.length; v--; ) if (H = N[v]) E.push(O[v] = H); s(null, N = [], E, C) } for (v = N.length; v--; ) if ((H = N[v]) && (E = s ? Ra.call(p, H) : I[v]) > -1) p[E] = !(w[E] = H) } } else { N = l(N === w ? N.splice(R, N.length) : N); s ? s(null, w, N, C) : oa.apply(w, N) } })
    } function x(i) {
        var k, n, q, s = i.length, t = F.relative[i[0].type];
        n = t || F.relative[" "]; for (var p = t ? 1 : 0, w = m(function(E) { return E === k }, n, true), v = m(function(E) { return Ra.call(k, E) > -1 }, n, true), C = [function(E, H, I) { return !t && (I || H !== qa) || ((k = H).nodeType ? w(E, H, I) : v(E, H, I)) } ]; p < s; p++) if (n = F.relative[i[p].type]) C = [m(o(C), n)]; else { n = F.filter[i[p].type].apply(null, i[p].matches); if (n[J]) { for (q = ++p; q < s; q++) if (F.relative[i[q].type]) break; return r(p > 1 && o(C), p > 1 && i.slice(0, p - 1).join("").replace(Fa, "$1"), n, p < q && x(i.slice(p, q)), q < s && x(i = i.slice(q)), q < s && i.join("")) } C.push(n) } return o(C)
    }
    function z(i, k) {
        var n = k.length > 0, q = i.length > 0, s = function(t, p, w, v, C) {
            var E, H, I = [], P = 0, R = "0", O = t && [], N = C != null, Kb = qa, Qc = t || q && F.find.TAG("*", C && p.parentNode || p), Lb = Ha += Kb == null ? 1 : Math.E; if (N) { qa = p !== V && p; ca = s.el } for (; (C = Qc[R]) != null; R++) { if (q && C) { for (E = 0; H = i[E]; E++) if (H(C, p, w)) { v.push(C); break } if (N) { Ha = Lb; ca = ++s.el } } if (n) { if (C = !H && C) P--; t && O.push(C) } } P += R; if (n && R !== P) {
                for (E = 0; H = k[E]; E++) H(O, I, p, w); if (t) { if (P > 0) for (; R--; ) O[R] || I[R] || (I[R] = Rc.call(v)); I = l(I) } oa.apply(v, I); N && !t && I.length > 0 && P + k.length >
1 && c.uniqueSort(v)
            } if (N) { Ha = Lb; qa = Kb } return O
        }; s.el = 0; return n ? Y(s) : s
    } function G(i, k, n) { for (var q = 0, s = k.length; q < s; q++) c(i, k[q], n); return n } function K(i, k, n, q, s) {
        var t, p, w, v, C = j(i); if (!q) if (C.length === 1) {
            p = C[0] = C[0].slice(0); if (p.length > 2 && (w = p[0]).type === "ID" && k.nodeType === 9 && !s && F.relative[p[1].type]) { k = F.find.ID(w.matches[0].replace(ha, ""), k, s)[0]; if (!k) return n; i = i.slice(p.shift().length) } for (t = Ga.POS.test(i) ? -1 : p.length - 1; t >= 0; t--) {
                w = p[t]; if (F.relative[v = w.type]) break; if (v = F.find[v]) if (q = v(w.matches[0].replace(ha,
""), Sa.test(p[0].type) && k.parentNode || k, s)) { p.splice(t, 1); i = q.length && p.join(""); if (!i) { oa.apply(n, pa.call(q, 0)); return n } break } 
            } 
        } D(i, C)(q, k, s, n, Sa.test(i)); return n
    } function $() { } var ca, S, F, A, ga, ua, D, L, T, qa, X = true, J = ("sizcache" + Math.random()).replace(".", ""), ba = String, V = a.document, M = V.documentElement, Ha = 0, Pc = 0, Rc = [].pop, oa = [].push, pa = [].slice, Ra = [].indexOf || function(i) { for (var k = 0, n = this.length; k < n; k++) if (this[k] === i) return k; return -1 }, Y = function(i, k) { i[J] = k == null || k; return i }; a = function() {
        var i =
{}, k = []; return Y(function(n, q) { k.push(n) > F.cacheLength && delete i[k.shift()]; return i[n + " "] = q }, i)
    }; var Mb = a(), Jb = a(), Nb = a(); a = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]"; var Ta = ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + a + ")|[^:]|\\\\.)*|.*))\\)|)", Fa = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$",
"g"), Nc = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, Oc = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/, Sc = new RegExp(Ta), Mc = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, Sa = /[\x20\t\r\n\f]*[+~]/, Tc = /h\d/i, Uc = /input|select|textarea|button/i, ha = /\\(?!\\)/g, Ga = { ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/, CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/, NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/, TAG: new RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"), ATTR: new RegExp("^" + a), PSEUDO: new RegExp("^" +
Ta), POS: /:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i, CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"), needsContext: new RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
}, da = function(i) {
    var k = V.createElement("div");
    try { return i(k) } catch (n) { return false } finally { } 
}; a = da(function(i) { i.appendChild(V.createComment("")); return !i.getElementsByTagName("*").length }); var Vc = da(function(i) { i.innerHTML = "<a href='#'></a>"; return i.firstChild && typeof i.firstChild.getAttribute !== "undefined" && i.firstChild.getAttribute("href") === "#" }), Wc = da(function(i) { i.innerHTML = "<select></select>"; i = typeof i.lastChild.getAttribute("multiple"); return i !== "boolean" && i !== "string" }), Ib = da(function(i) {
    i.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
    if (!i.getElementsByClassName || !i.getElementsByClassName("e").length) return false; i.lastChild.className = "e"; return i.getElementsByClassName("e").length === 2
}), Xc = da(function(i) { i.id = J + 0; i.innerHTML = "<a name='" + J + "'></a><div name='" + J + "'></div>"; M.insertBefore(i, M.firstChild); var k = V.getElementsByName && V.getElementsByName(J).length === 2 + V.getElementsByName(J + 0).length; S = !V.getElementById(J); M.removeChild(i); return k }); try { pa.call(M.childNodes, 0) } catch (Bd) {
        pa = function(i) {
            for (var k, n = []; k = this[i]; i++) n.push(k);
            return n
        } 
    } c.matches = function(i, k) { return c(i, null, null, k) }; c.matchesSelector = function(i, k) { return c(k, null, null, [i]).length > 0 }; A = c.getText = function(i) { var k, n = "", q = 0; if (k = i.nodeType) if (k === 1 || k === 9 || k === 11) if (typeof i.textContent === "string") return i.textContent; else for (i = i.firstChild; i; i = i.nextSibling) n += A(i); else { if (k === 3 || k === 4) return i.nodeValue } else for (; k = i[q]; q++) n += A(k); return n }; ga = c.isXML = function(i) { return (i = i && (i.ownerDocument || i).documentElement) ? i.nodeName !== "HTML" : false }; ua = c.contains =
M.contains ? function(i, k) { var n = i.nodeType === 9 ? i.documentElement : i; k = k && k.parentNode; return i === k || !!(k && k.nodeType === 1 && n.contains && n.contains(k)) } : M.compareDocumentPosition ? function(i, k) { return k && !!(i.compareDocumentPosition(k) & 16) } : function(i, k) { for (; k = k.parentNode; ) if (k === i) return true; return false }; c.attr = function(i, k) {
    var n, q = ga(i); q || (k = k.toLowerCase()); if (n = F.attrHandle[k]) return n(i); if (q || Wc) return i.getAttribute(k); return (n = i.getAttributeNode(k)) ? typeof i[k] === "boolean" ? i[k] ? k : null : n.specified ?
n.value : null : null
}; F = c.selectors = { cacheLength: 50, createPseudo: Y, match: Ga, attrHandle: Vc ? {} : { href: function(i) { return i.getAttribute("href", 2) }, type: function(i) { return i.getAttribute("type") } }, find: { ID: S ? function(i, k, n) { if (typeof k.getElementById !== "undefined" && !n) return (i = k.getElementById(i)) && i.parentNode ? [i] : [] } : function(i, k, n) { if (typeof k.getElementById !== "undefined" && !n) return (k = k.getElementById(i)) ? k.id === i || typeof k.getAttributeNode !== "undefined" && k.getAttributeNode("id").value === i ? [k] : b : [] },
    TAG: a ? function(i, k) { if (typeof k.getElementsByTagName !== "undefined") return k.getElementsByTagName(i) } : function(i, k) { k = k.getElementsByTagName(i); if (i === "*") { for (var n = [], q = 0; i = k[q]; q++) i.nodeType === 1 && n.push(i); return n } return k }, NAME: Xc && function(i, k) { if (typeof k.getElementsByName !== "undefined") return k.getElementsByName(name) }, CLASS: Ib && function(i, k, n) { if (typeof k.getElementsByClassName !== "undefined" && !n) return k.getElementsByClassName(i) } 
}, relative: { ">": { dir: "parentNode", first: true }, " ": { dir: "parentNode" },
    "+": { dir: "previousSibling", first: true }, "~": { dir: "previousSibling"}
}, preFilter: { ATTR: function(i) { i[1] = i[1].replace(ha, ""); i[3] = (i[4] || i[5] || "").replace(ha, ""); if (i[2] === "~=") i[3] = " " + i[3] + " "; return i.slice(0, 4) }, CHILD: function(i) { i[1] = i[1].toLowerCase(); if (i[1] === "nth") { i[2] || c.error(i[0]); i[3] = +(i[3] ? i[4] + (i[5] || 1) : 2 * (i[2] === "even" || i[2] === "odd")); i[4] = +(i[6] + i[7] || i[2] === "odd") } else i[2] && c.error(i[0]); return i }, PSEUDO: function(i) {
    var k, n; if (Ga.CHILD.test(i[0])) return null; if (i[3]) i[2] = i[3]; else if (k =
i[4]) { if (Sc.test(k) && (n = j(k, true)) && (n = k.indexOf(")", k.length - n) - k.length)) { k = k.slice(0, n); i[0] = i[0].slice(0, n) } i[2] = k } return i.slice(0, 3)
} 
}, filter: { ID: S ? function(i) { i = i.replace(ha, ""); return function(k) { return k.getAttribute("id") === i } } : function(i) { i = i.replace(ha, ""); return function(k) { return (k = typeof k.getAttributeNode !== "undefined" && k.getAttributeNode("id")) && k.value === i } }, TAG: function(i) {
    if (i === "*") return function() { return true }; i = i.replace(ha, "").toLowerCase(); return function(k) {
        return k.nodeName &&
k.nodeName.toLowerCase() === i
    } 
}, CLASS: function(i) { var k = Mb[J][i + " "]; return k || (k = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + i + "([\\x20\\t\\r\\n\\f]|$)")) && Mb(i, function(n) { return k.test(n.className || typeof n.getAttribute !== "undefined" && n.getAttribute("class") || "") }) }, ATTR: function(i, k, n) {
    return function(q) {
        q = c.attr(q, i); if (q == null) return k === "!="; if (!k) return true; q += ""; return k === "=" ? q === n : k === "!=" ? q !== n : k === "^=" ? n && q.indexOf(n) === 0 : k === "*=" ? n && q.indexOf(n) > -1 : k === "$=" ? n && q.substr(q.length - n.length) ===
n : k === "~=" ? (" " + q + " ").indexOf(n) > -1 : k === "|=" ? q === n || q.substr(0, n.length + 1) === n + "-" : false
    } 
}, CHILD: function(i, k, n, q) {
    if (i === "nth") return function(s) { var t, p; t = s.parentNode; if (n === 1 && q === 0) return true; if (t) { p = 0; for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType === 1) { p++; if (s === t) break } } p -= q; return p === n || p % n === 0 && p / n >= 0 }; return function(s) {
        var t = s; switch (i) {
            case "only": case "first": for (; t = t.previousSibling; ) if (t.nodeType === 1) return false; if (i === "first") return true; t = s; case "last": for (; t = t.nextSibling; ) if (t.nodeType ===
1) return false; return true
        } 
    } 
}, PSEUDO: function(i, k) { var n, q = F.pseudos[i] || F.setFilters[i.toLowerCase()] || c.error("unsupported pseudo: " + i); if (q[J]) return q(k); if (q.length > 1) { n = [i, i, "", k]; return F.setFilters.hasOwnProperty(i.toLowerCase()) ? Y(function(s, t) { for (var p, w = q(s, k), v = w.length; v--; ) { p = Ra.call(s, w[v]); s[p] = !(t[p] = w[v]) } }) : function(s) { return q(s, 0, n) } } return q } 
}, pseudos: { not: Y(function(i) {
    var k = [], n = [], q = D(i.replace(Fa, "$1")); return q[J] ? Y(function(s, t, p, w) {
        w = q(s, null, w, []); for (var v = s.length; v--; ) if (p =
w[v]) s[v] = !(t[v] = p)
    }) : function(s, t, p) { k[0] = s; q(k, null, p, n); return !n.pop() } 
}), has: Y(function(i) { return function(k) { return c(i, k).length > 0 } }), contains: Y(function(i) { return function(k) { return (k.textContent || k.innerText || A(k)).indexOf(i) > -1 } }), enabled: function(i) { return i.disabled === false }, disabled: function(i) { return i.disabled === true }, checked: function(i) { var k = i.nodeName.toLowerCase(); return k === "input" && !!i.checked || k === "option" && !!i.selected }, selected: function(i) { return i.selected === true }, parent: function(i) { return !F.pseudos.empty(i) },
    empty: function(i) { var k; for (i = i.firstChild; i; ) { if (i.nodeName > "@" || (k = i.nodeType) === 3 || k === 4) return false; i = i.nextSibling } return true }, header: function(i) { return Tc.test(i.nodeName) }, text: function(i) { var k, n; return i.nodeName.toLowerCase() === "input" && (k = i.type) === "text" && ((n = i.getAttribute("type")) == null || n.toLowerCase() === k) }, radio: e("radio"), checkbox: e("checkbox"), file: e("file"), password: e("password"), image: e("image"), submit: f("submit"), reset: f("reset"), button: function(i) {
        var k = i.nodeName.toLowerCase();
        return k === "input" && i.type === "button" || k === "button"
    }, input: function(i) { return Uc.test(i.nodeName) }, focus: function(i) { var k = i.ownerDocument; return i === k.activeElement && (!k.hasFocus || k.hasFocus()) && !!(i.type || i.href || ~i.tabIndex) }, active: function(i) { return i === i.ownerDocument.activeElement }, first: g(function() { return [0] }), last: g(function(i, k) { return [k - 1] }), eq: g(function(i, k, n) { return [n < 0 ? n + k : n] }), even: g(function(i, k) { for (var n = 0; n < k; n += 2) i.push(n); return i }), odd: g(function(i, k) {
        for (var n = 1; n < k; n += 2) i.push(n);
        return i
    }), lt: g(function(i, k, n) { for (k = n < 0 ? n + k : n; --k >= 0; ) i.push(k); return i }), gt: g(function(i, k, n) { for (n = n < 0 ? n + k : n; ++n < k; ) i.push(n); return i })}
}; L = M.compareDocumentPosition ? function(i, k) { if (i === k) { T = true; return 0 } return (!i.compareDocumentPosition || !k.compareDocumentPosition ? i.compareDocumentPosition : i.compareDocumentPosition(k) & 4) ? -1 : 1 } : function(i, k) {
    if (i === k) { T = true; return 0 } else if (i.sourceIndex && k.sourceIndex) return i.sourceIndex - k.sourceIndex; var n, q, s = [], t = []; n = i.parentNode; q = k.parentNode; var p =
n; if (n === q) return h(i, k); else if (n) { if (!q) return 1 } else return -1; for (; p; ) { s.unshift(p); p = p.parentNode } for (p = q; p; ) { t.unshift(p); p = p.parentNode } n = s.length; q = t.length; for (p = 0; p < n && p < q; p++) if (s[p] !== t[p]) return h(s[p], t[p]); return p === n ? h(i, t[p], -1) : h(s[p], k, 1)
}; [0, 0].sort(L); X = !T; c.uniqueSort = function(i) { var k, n = [], q = 1, s = 0; T = X; i.sort(L); if (T) { for (; k = i[q]; q++) if (k === i[q - 1]) s = n.push(q); for (; s--; ) i.splice(n[s], 1) } return i }; c.error = function(i) {
    throw new Error("Syntax error, unrecognized expression: " + i);
}; D = c.compile = function(i, k) { var n, q = [], s = [], t = Nb[J][i + " "]; if (!t) { k || (k = j(i)); for (n = k.length; n--; ) { t = x(k[n]); t[J] ? q.push(t) : s.push(t) } t = Nb(i, z(s, q)) } return t }; V.querySelectorAll && function() {
    var i, k = K, n = /'|\\/g, q = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, s = [":focus"], t = [":active"], p = M.matchesSelector || M.mozMatchesSelector || M.webkitMatchesSelector || M.oMatchesSelector || M.msMatchesSelector; da(function(w) {
        w.innerHTML = "<select><option selected=''></option></select>"; w.querySelectorAll("[selected]").length ||
s.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)"); w.querySelectorAll(":checked").length || s.push(":checked")
    }); da(function(w) { w.innerHTML = "<p test=''></p>"; w.querySelectorAll("[test^='']").length && s.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')"); w.innerHTML = "<input type='hidden'/>"; w.querySelectorAll(":enabled").length || s.push(":enabled", ":disabled") }); s = new RegExp(s.join("|")); K = function(w, v, C, E, H) {
        if (!E && !H && !s.test(w)) {
            var I, P, R = true, O = J; P = v; I = v.nodeType ===
9 && w; if (v.nodeType === 1 && v.nodeName.toLowerCase() !== "object") { I = j(w); if (R = v.getAttribute("id")) O = R.replace(n, "\\$&"); else v.setAttribute("id", O); O = "[id='" + O + "'] "; for (P = I.length; P--; ) I[P] = O + I[P].join(""); P = Sa.test(w) && v.parentNode || v; I = I.join(",") } if (I) try { oa.apply(C, pa.call(P.querySelectorAll(I), 0)); return C } catch (N) { } finally { R || v.removeAttribute("id") } 
        } return k(w, v, C, E, H)
    }; if (p) {
        da(function(w) { i = p.call(w, "div"); try { p.call(w, "[test!='']:sizzle"); t.push("!=", Ta) } catch (v) { } }); t = new RegExp(t.join("|"));
        c.matchesSelector = function(w, v) { v = v.replace(q, "='$1']"); if (!ga(w) && !t.test(v) && !s.test(v)) try { var C = p.call(w, v); if (C || i || w.document && w.document.nodeType !== 11) return C } catch (E) { } return c(v, null, null, [w]).length > 0 } 
    } 
} (); F.pseudos.nth = F.pseudos.eq; F.filters = $.prototype = F.pseudos; F.setFilters = new $; c.attr = d.attr; d.find = c; d.expr = c.selectors; d.expr[":"] = d.expr.pseudos; d.unique = c.uniqueSort; d.text = c.getText; d.isXMLDoc = c.isXML; d.contains = c.contains
})(B); var Yc = /Until$/, Zc = /^(?:parents|prev(?:Until|All))/,
fc = /^.[^:#\[\.,]*$/, Ob = d.expr.match.needsContext, $c = { children: true, contents: true, next: true, prev: true }; d.fn.extend({ find: function(a) { var b, c, e, f, g, h, j = this; if (typeof a !== "string") return d(a).filter(function() { b = 0; for (c = j.length; b < c; b++) if (d.contains(j[b], this)) return true }); h = this.pushStack("", "find", a); b = 0; for (c = this.length; b < c; b++) { e = h.length; d.find(a, this[b], h); if (b > 0) for (f = e; f < h.length; f++) for (g = 0; g < e; g++) if (h[g] === h[f]) { h.splice(f--, 1); break } } return h }, has: function(a) {
    var b, c = d(a, this), e = c.length;
    return this.filter(function() { for (b = 0; b < e; b++) if (d.contains(this, c[b])) return true })
}, not: function(a) { return this.pushStack(bb(this, a, false), "not", a) }, filter: function(a) { return this.pushStack(bb(this, a, true), "filter", a) }, is: function(a) { return !!a && (typeof a === "string" ? Ob.test(a) ? d(a, this.context).index(this[0]) >= 0 : d.filter(a, this).length > 0 : this.filter(a).length > 0) }, closest: function(a, b) {
    for (var c, e = 0, f = this.length, g = [], h = Ob.test(a) || typeof a !== "string" ? d(a, b || this.context) : 0; e < f; e++) for (c = this[e]; c &&
c.ownerDocument && c !== b && c.nodeType !== 11; ) { if (h ? h.index(c) > -1 : d.find.matchesSelector(c, a)) { g.push(c); break } c = c.parentNode } g = g.length > 1 ? d.unique(g) : g; return this.pushStack(g, "closest", a)
}, index: function(a) { if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1; if (typeof a === "string") return d.inArray(this[0], d(a)); return d.inArray(a.jquery ? a[0] : a, this) }, add: function(a, b) {
    a = typeof a === "string" ? d(a, b) : d.makeArray(a && a.nodeType ? [a] : a); b = d.merge(this.get(), a); return this.pushStack(sa(a[0]) || sa(b[0]) ?
b : d.unique(b))
}, addBack: function(a) { return this.add(a == null ? this.prevObject : this.prevObject.filter(a)) } 
}); d.fn.andSelf = d.fn.addBack; d.each({ parent: function(a) { return (a = a.parentNode) && a.nodeType !== 11 ? a : null }, parents: function(a) { return d.dir(a, "parentNode") }, parentsUntil: function(a, b, c) { return d.dir(a, "parentNode", c) }, next: function(a) { return ab(a, "nextSibling") }, prev: function(a) { return ab(a, "previousSibling") }, nextAll: function(a) { return d.dir(a, "nextSibling") }, prevAll: function(a) { return d.dir(a, "previousSibling") },
    nextUntil: function(a, b, c) { return d.dir(a, "nextSibling", c) }, prevUntil: function(a, b, c) { return d.dir(a, "previousSibling", c) }, siblings: function(a) { return d.sibling((a.parentNode || {}).firstChild, a) }, children: function(a) { return d.sibling(a.firstChild) }, contents: function(a) { return d.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : d.merge([], a.childNodes) } 
}, function(a, b) {
    d.fn[a] = function(c, e) {
        var f = d.map(this, b, c); Yc.test(a) || (e = c); if (e && typeof e === "string") f = d.filter(e, f); f = this.length >
1 && !$c[a] ? d.unique(f) : f; if (this.length > 1 && Zc.test(a)) f = f.reverse(); return this.pushStack(f, a, Z.call(arguments).join(","))
    } 
}); d.extend({ filter: function(a, b, c) { if (c) a = ":not(" + a + ")"; return b.length === 1 ? d.find.matchesSelector(b[0], a) ? [b[0]] : [] : d.find.matches(a, b) }, dir: function(a, b, c) { var e = []; for (a = a[b]; a && a.nodeType !== 9 && (c === u || a.nodeType !== 1 || !d(a).is(c)); ) { a.nodeType === 1 && e.push(a); a = a[b] } return e }, sibling: function(a, b) { for (var c = []; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a); return c } }); var db =
"abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", ad = / jQuery\d+="(?:null|\d+)"/g, Ua = /^\s+/, Pb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Qb = /<([\w:]+)/, bd = /<tbody/i, cd = /<|&#?\w+;/, dd = /<(?:script|style|link)/i, ed = /<(?:script|object|embed|option|style)/i, Va = new RegExp("<(?:" + db + ")[\\s/>]", "i"), gb = /^(?:checkbox|radio)$/, Rb = /checked\s*(?:[^=]|=\s*.checked.)/i, fd = /\/(java|ecma)script/i,
gd = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, W = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] }, Sb = cb(y), Wa = Sb.appendChild(y.createElement("div")); W.optgroup = W.option; W.tbody = W.tfoot = W.colgroup = W.caption = W.thead; W.th = W.td;
        if (!d.support.htmlSerialize) W._default = [1, "X<div>", "</div>"]; d.fn.extend({ text: function(a) { return d.access(this, function(b) { return b === u ? d.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(b)) }, null, a, arguments.length) }, wrapAll: function(a) {
            if (d.isFunction(a)) return this.each(function(c) { d(this).wrapAll(a.call(this, c)) }); if (this[0]) {
                var b = d(a, this[0].ownerDocument).eq(0).clone(true); this[0].parentNode && b.insertBefore(this[0]); b.map(function() {
                    for (var c = this; c.firstChild &&
c.firstChild.nodeType === 1; ) c = c.firstChild; return c
                }).append(this)
            } return this
        }, wrapInner: function(a) { if (d.isFunction(a)) return this.each(function(b) { d(this).wrapInner(a.call(this, b)) }); return this.each(function() { var b = d(this), c = b.contents(); c.length ? c.wrapAll(a) : b.append(a) }) }, wrap: function(a) { var b = d.isFunction(a); return this.each(function(c) { d(this).wrapAll(b ? a.call(this, c) : a) }) }, unwrap: function() { return this.parent().each(function() { d.nodeName(this, "body") || d(this).replaceWith(this.childNodes) }).end() },
            append: function() { return this.domManip(arguments, true, function(a) { if (this.nodeType === 1 || this.nodeType === 11) this.appendChild(a) }) }, prepend: function() { return this.domManip(arguments, true, function(a) { if (this.nodeType === 1 || this.nodeType === 11) this.insertBefore(a, this.firstChild) }) }, before: function() { if (!sa(this[0])) return this.domManip(arguments, false, function(b) { this.parentNode.insertBefore(b, this) }); if (arguments.length) { var a = d.clean(arguments); return this.pushStack(d.merge(a, this), "before", this.selector) } },
            after: function() { if (!sa(this[0])) return this.domManip(arguments, false, function(b) { this.parentNode.insertBefore(b, this.nextSibling) }); if (arguments.length) { var a = d.clean(arguments); return this.pushStack(d.merge(this, a), "after", this.selector) } }, remove: function(a, b) { for (var c, e = 0; (c = this[e]) != null; e++) if (!a || d.filter(a, [c]).length) { if (!b && c.nodeType === 1) { d.cleanData(c.getElementsByTagName("*")); d.cleanData([c]) } c.parentNode && c.parentNode.removeChild(c) } return this }, empty: function() {
                for (var a, b = 0; (a = this[b]) !=
null; b++) for (a.nodeType === 1 && d.cleanData(a.getElementsByTagName("*")); a.firstChild; ) a.removeChild(a.firstChild); return this
            }, clone: function(a, b) { a = a == null ? false : a; b = b == null ? a : b; return this.map(function() { return d.clone(this, a, b) }) }, html: function(a) {
                return d.access(this, function(b) {
                    var c = this[0] || {}, e = 0, f = this.length; if (b === u) return c.nodeType === 1 ? c.innerHTML.replace(ad, "") : u; if (typeof b === "string" && !dd.test(b) && (d.support.htmlSerialize || !Va.test(b)) && (d.support.leadingWhitespace || !Ua.test(b)) && !W[(Qb.exec(b) ||
["", ""])[1].toLowerCase()]) { b = b.replace(Pb, "<$1></$2>"); try { for (; e < f; e++) { c = this[e] || {}; if (c.nodeType === 1) { d.cleanData(c.getElementsByTagName("*")); c.innerHTML = b } } c = 0 } catch (g) { } } c && this.empty().append(b)
                }, null, a, arguments.length)
            }, replaceWith: function(a) {
                if (!sa(this[0])) {
                    if (d.isFunction(a)) return this.each(function(b) { var c = d(this), e = c.html(); c.replaceWith(a.call(this, b, e)) }); if (typeof a !== "string") a = d(a).detach(); return this.each(function() {
                        var b = this.nextSibling, c = this.parentNode; d(this).remove();
                        b ? d(b).before(a) : d(c).append(a)
                    })
                } return this.length ? this.pushStack(d(d.isFunction(a) ? a() : a), "replaceWith", a) : this
            }, detach: function(a) { return this.remove(a, true) }, domManip: function(a, b, c) {
                a = [].concat.apply([], a); var e, f, g, h = 0, j = a[0], m = [], o = this.length; if (!d.support.checkClone && o > 1 && typeof j === "string" && Rb.test(j)) return this.each(function() { d(this).domManip(a, b, c) }); if (d.isFunction(j)) return this.each(function(l) { var r = d(this); a[0] = j.call(this, l, b ? r.html() : u); r.domManip(a, b, c) }); if (this[0]) {
                    e = d.buildFragment(a,
this, m); g = e.fragment; f = g.firstChild; if (g.childNodes.length === 1) g = f; if (f) { b = b && d.nodeName(f, "tr"); for (e = e.cacheable || o - 1; h < o; h++) c.call(b && d.nodeName(this[h], "table") ? gc(this[h], "tbody") : this[h], h === e ? g : d.clone(g, true, true)) } g = f = null; m.length && d.each(m, function(l, r) { if (r.src) d.ajax ? d.ajax({ url: r.src, type: "GET", dataType: "script", async: false, global: false, "throws": true }) : d.error("no ajax"); else d.globalEval((r.text || r.textContent || r.innerHTML || "").replace(gd, "")); r.parentNode && r.parentNode.removeChild(r) })
                } return this
            } 
        });
        d.buildFragment = function(a, b, c) { var e, f, g, h = a[0]; b = b || y; b = !b.nodeType && b[0] || b; b = b.ownerDocument || b; if (a.length === 1 && typeof h === "string" && h.length < 512 && b === y && h.charAt(0) === "<" && !ed.test(h) && (d.support.checkClone || !Rb.test(h)) && (d.support.html5Clone || !Va.test(h))) { f = true; e = d.fragments[h]; g = e !== u } if (!e) { e = b.createDocumentFragment(); d.clean(a, b, e, c); if (f) d.fragments[h] = g && e } return { fragment: e, cacheable: f} }; d.fragments = {}; d.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(a, b) { d.fn[a] = function(c) { var e, f = 0, g = []; c = d(c); var h = c.length; e = this.length === 1 && this[0].parentNode; if ((e == null || e && e.nodeType === 11 && e.childNodes.length === 1) && h === 1) { c[b](this[0]); return this } else { for (; f < h; f++) { e = (f > 0 ? this.clone(true) : this).get(); d(c[f])[b](e); g = g.concat(e) } return this.pushStack(g, a, c.selector) } } }); d.extend({ clone: function(a, b, c) {
            var e, f, g, h; if (d.support.html5Clone || d.isXMLDoc(a) || !Va.test("<" + a.nodeName + ">")) h = a.cloneNode(true); else {
                Wa.innerHTML =
a.outerHTML; Wa.removeChild(h = Wa.firstChild)
            } if ((!d.support.noCloneEvent || !d.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !d.isXMLDoc(a)) { fb(a, h); e = wa(a); f = wa(h); for (g = 0; e[g]; ++g) f[g] && fb(e[g], f[g]) } if (b) { eb(a, h); if (c) { e = wa(a); f = wa(h); for (g = 0; e[g]; ++g) eb(e[g], f[g]) } } return h
        }, clean: function(a, b, c, e) {
            var f, g, h, j, m, o, l = b === y && Sb, r = []; if (!b || typeof b.createDocumentFragment === "undefined") b = y; for (f = 0; (h = a[f]) != null; f++) {
                if (typeof h === "number") h += ""; if (h) {
                    if (typeof h === "string") if (cd.test(h)) {
                        l =
l || cb(b); o = b.createElement("div"); l.appendChild(o); h = h.replace(Pb, "<$1></$2>"); g = (Qb.exec(h) || ["", ""])[1].toLowerCase(); j = W[g] || W._default; m = j[0]; for (o.innerHTML = j[1] + h + j[2]; m--; ) o = o.lastChild; if (!d.support.tbody) { m = bd.test(h); j = g === "table" && !m ? o.firstChild && o.firstChild.childNodes : j[1] === "<table>" && !m ? o.childNodes : []; for (g = j.length - 1; g >= 0; --g) d.nodeName(j[g], "tbody") && !j[g].childNodes.length && j[g].parentNode.removeChild(j[g]) } !d.support.leadingWhitespace && Ua.test(h) && o.insertBefore(b.createTextNode(Ua.exec(h)[0]),
o.firstChild); h = o.childNodes; o.parentNode.removeChild(o)
                    } else h = b.createTextNode(h); h.nodeType ? r.push(h) : d.merge(r, h)
                } 
            } if (o) h = o = l = null; if (!d.support.appendChecked) for (f = 0; (h = r[f]) != null; f++) if (d.nodeName(h, "input")) hb(h); else typeof h.getElementsByTagName !== "undefined" && d.grep(h.getElementsByTagName("input"), hb); if (c) {
                a = function(x) { if (!x.type || fd.test(x.type)) return e ? e.push(x.parentNode ? x.parentNode.removeChild(x) : x) : c.appendChild(x) }; for (f = 0; (h = r[f]) != null; f++) if (!(d.nodeName(h, "script") && a(h))) {
                    c.appendChild(h);
                    if (typeof h.getElementsByTagName !== "undefined") { h = d.grep(d.merge([], h.getElementsByTagName("script")), a); r.splice.apply(r, [f + 1, 0].concat(h)); f += h.length } 
                } 
            } return r
        }, cleanData: function(a, b) {
            for (var c, e, f, g, h = 0, j = d.expando, m = d.cache, o = d.support.deleteExpando, l = d.event.special; (f = a[h]) != null; h++) if (b || d.acceptData(f)) if (c = (e = f[j]) && m[e]) {
                if (c.events) for (g in c.events) l[g] ? d.event.remove(f, g) : d.removeEvent(f, g, c.handle); if (m[e]) {
                    delete m[e]; if (o) delete f[j]; else if (f.removeAttribute) f.removeAttribute(j);
                    else f[j] = null; d.deletedIds.push(e)
                } 
            } 
        } 
        }); (function() {
            var a, b; d.uaMatch = function(c) { c = c.toLowerCase(); c = /(chrome)[ \/]([\w.]+)/.exec(c) || /(webkit)[ \/]([\w.]+)/.exec(c) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(c) || /(msie) ([\w.]+)/.exec(c) || c.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(c) || []; return { browser: c[1] || "", version: c[2] || "0"} }; a = d.uaMatch(rc.userAgent); b = {}; if (a.browser) { b[a.browser] = true; b.version = a.version } if (b.chrome) b.webkit = true; else if (b.webkit) b.safari = true; d.browser =
b; d.sub = function() { function c(f, g) { return new c.fn.init(f, g) } d.extend(true, c, this); c.superclass = this; c.fn = c.prototype = this(); c.fn.constructor = c; c.sub = this.sub; c.fn.init = function(f, g) { if (g && g instanceof d && !(g instanceof c)) g = c(g); return d.fn.init.call(this, f, g, e) }; c.fn.init.prototype = c.fn; var e = c(y); return c } 
        })(); var Q, la, ma, Xa = /alpha\([^)]*\)/i, hd = /opacity=([^)]*)/, id = /^(top|right|bottom|left)$/, jd = /^(none|table(?!-c[ea]).+)/, Tb = /^margin/, hc = new RegExp("^(" + Da + ")(.*)$", "i"), ya = new RegExp("^(" + Da +
")(?!px)[a-z%]+$", "i"), kd = new RegExp("^([-+])=(" + Da + ")", "i"), La = { BODY: "block" }, ld = { position: "absolute", visibility: "hidden", display: "block" }, Ub = { letterSpacing: 0, fontWeight: 400 }, fa = ["Top", "Right", "Bottom", "Left"], jb = ["Webkit", "O", "Moz", "ms"], md = d.fn.toggle; d.fn.extend({ css: function(a, b) { return d.access(this, function(c, e, f) { return f !== u ? d.style(c, e, f) : d.css(c, e) }, a, b, arguments.length > 1) }, show: function() { return kb(this, true) }, hide: function() { return kb(this) }, toggle: function(a, b) {
    var c = typeof a === "boolean";
    if (d.isFunction(a) && d.isFunction(b)) return md.apply(this, arguments); return this.each(function() { (c ? a : xa(this)) ? d(this).show() : d(this).hide() })
} 
}); d.extend({ cssHooks: { opacity: { get: function(a, b) { if (b) { a = Q(a, "opacity"); return a === "" ? "1" : a } } } }, cssNumber: { fillOpacity: true, fontWeight: true, lineHeight: true, opacity: true, orphans: true, widows: true, zIndex: true, zoom: true }, cssProps: { "float": d.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function(a, b, c, e) {
    if (!(!a || a.nodeType === 3 || a.nodeType === 8 || !a.style)) {
        var f,
g, h, j = d.camelCase(b), m = a.style; b = d.cssProps[j] || (d.cssProps[j] = ib(m, j)); h = d.cssHooks[b] || d.cssHooks[j]; if (c !== u) { g = typeof c; if (g === "string" && (f = kd.exec(c))) { c = (f[1] + 1) * f[2] + parseFloat(d.css(a, b)); g = "number" } if (!(c == null || g === "number" && isNaN(c))) { if (g === "number" && !d.cssNumber[j]) c += "px"; if (!h || !("set" in h) || (c = h.set(a, c, e)) !== u) try { m[b] = c } catch (o) { } } } else { if (h && "get" in h && (f = h.get(a, false, e)) !== u) return f; return m[b] } 
    } 
}, css: function(a, b, c, e) {
    var f, g; g = d.camelCase(b); b = d.cssProps[g] || (d.cssProps[g] =
ib(a.style, g)); if ((g = d.cssHooks[b] || d.cssHooks[g]) && "get" in g) f = g.get(a, true, e); if (f === u) f = Q(a, b); if (f === "normal" && b in Ub) f = Ub[b]; if (c || e !== u) { a = parseFloat(f); return c || d.isNumeric(a) ? a || 0 : f } return f
}, swap: function(a, b, c) { var e, f = {}; for (e in b) { f[e] = a.style[e]; a.style[e] = b[e] } c = c.call(a); for (e in b) a.style[e] = f[e]; return c } 
}); if (B.getComputedStyle) Q = function(a, b) {
    var c, e, f = B.getComputedStyle(a, null), g = a.style; if (f) {
        c = f.getPropertyValue(b) || f[b]; if (c === "" && !d.contains(a.ownerDocument, a)) c = d.style(a,
b); if (ya.test(c) && Tb.test(b)) { a = g.width; b = g.minWidth; e = g.maxWidth; g.minWidth = g.maxWidth = g.width = c; c = f.width; g.width = a; g.minWidth = b; g.maxWidth = e } 
    } return c
}; else if (y.documentElement.currentStyle) Q = function(a, b) {
    var c, e, f = a.currentStyle && a.currentStyle[b], g = a.style; if (f == null && g && g[b]) f = g[b]; if (ya.test(f) && !id.test(b)) { c = g.left; if (e = a.runtimeStyle && a.runtimeStyle.left) a.runtimeStyle.left = a.currentStyle.left; g.left = b === "fontSize" ? "1em" : f; f = g.pixelLeft + "px"; g.left = c; if (e) a.runtimeStyle.left = e } return f ===
"" ? "auto" : f
}; d.each(["height", "width"], function(a, b) { d.cssHooks[b] = { get: function(c, e, f) { if (e) return c.offsetWidth === 0 && jd.test(Q(c, "display")) ? d.swap(c, ld, function() { return ob(c, b, f) }) : ob(c, b, f) }, set: function(c, e, f) { return mb(c, e, f ? nb(c, b, f, d.support.boxSizing && d.css(c, "boxSizing") === "border-box") : 0) } } }); if (!d.support.opacity) d.cssHooks.opacity = { get: function(a, b) { return hd.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : "" }, set: function(a, b) {
    var c =
a.style; a = a.currentStyle; var e = d.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", f = a && a.filter || c.filter || ""; c.zoom = 1; if (b >= 1 && d.trim(f.replace(Xa, "")) === "" && c.removeAttribute) { c.removeAttribute("filter"); if (a && !a.filter) return } c.filter = Xa.test(f) ? f.replace(Xa, e) : f + " " + e
} 
}; d(function() {
    if (!d.support.reliableMarginRight) d.cssHooks.marginRight = { get: function(a, b) { return d.swap(a, { display: "inline-block" }, function() { if (b) return Q(a, "marginRight") }) } }; !d.support.pixelPosition && d.fn.position && d.each(["top", "left"],
function(a, b) { d.cssHooks[b] = { get: function(c, e) { if (e) { e = Q(c, b); return ya.test(e) ? d(c).position()[b] + "px" : e } } } })
}); if (d.expr && d.expr.filters) { d.expr.filters.hidden = function(a) { return a.offsetWidth === 0 && a.offsetHeight === 0 || !d.support.reliableHiddenOffsets && (a.style && a.style.display || Q(a, "display")) === "none" }; d.expr.filters.visible = function(a) { return !d.expr.filters.hidden(a) } } d.each({ margin: "", padding: "", border: "Width" }, function(a, b) {
    d.cssHooks[a + b] = { expand: function(c) {
        var e = typeof c === "string" ? c.split(" ") :
[c], f = {}; for (c = 0; c < 4; c++) f[a + fa[c] + b] = e[c] || e[c - 2] || e[0]; return f
    } 
    }; if (!Tb.test(a)) d.cssHooks[a + b].set = mb
}); var nd = /%20/g, ic = /\[\]$/, Vb = /\r?\n/g, od = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, pd = /^(?:select|textarea)/i; d.fn.extend({ serialize: function() { return d.param(this.serializeArray()) }, serializeArray: function() {
    return this.map(function() { return this.elements ? d.makeArray(this.elements) : this }).filter(function() {
        return this.name &&
!this.disabled && (this.checked || pd.test(this.nodeName) || od.test(this.type))
    }).map(function(a, b) { a = d(this).val(); return a == null ? null : d.isArray(a) ? d.map(a, function(c) { return { name: b.name, value: c.replace(Vb, "\r\n")} }) : { name: b.name, value: a.replace(Vb, "\r\n")} }).get()
} 
}); d.param = function(a, b) {
    var c, e = [], f = function(g, h) { h = d.isFunction(h) ? h() : h == null ? "" : h; e[e.length] = encodeURIComponent(g) + "=" + encodeURIComponent(h) }; if (b === u) b = d.ajaxSettings && d.ajaxSettings.traditional; if (d.isArray(a) || a.jquery && !d.isPlainObject(a)) d.each(a,
function() { f(this.name, this.value) }); else for (c in a) Ma(c, a[c], b, f); return e.join("&").replace(nd, "+")
}; var ia, ja, qd = /#.*$/, rd = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, sd = /^(?:GET|HEAD)$/, td = /^\/\//, Wb = /\?/, ud = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, vd = /([?&])_=[^&]*/, Xb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Yb = d.fn.load, Na = {}, Zb = {}, $b = ["*/"] + ["*"]; try { ja = qc.href } catch (Cd) { ja = y.createElement("a"); ja.href = ""; ja = ja.href } ia = Xb.exec(ja.toLowerCase()) || []; d.fn.load = function(a, b, c) {
    if (typeof a !==
"string" && Yb) return Yb.apply(this, arguments); if (!this.length) return this; var e, f, g, h = this, j = a.indexOf(" "); if (j >= 0) { e = a.slice(j, a.length); a = a.slice(0, j) } if (d.isFunction(b)) { c = b; b = u } else if (b && typeof b === "object") f = "POST"; d.ajax({ url: a, type: f, dataType: "html", data: b, complete: function(m, o) { if (c) h.each(c, g || [m.responseText, o, m]) } }).done(function(m) { g = arguments; h.html(e ? d("<div>").append(m.replace(ud, "")).find(e) : m) }); return this
}; d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function(a, b) { d.fn[b] = function(c) { return this.on(b, c) } }); d.each(["get", "post"], function(a, b) { d[b] = function(c, e, f, g) { if (d.isFunction(e)) { g = g || f; f = e; e = u } return d.ajax({ type: b, url: c, data: e, success: f, dataType: g }) } }); d.extend({ getScript: function(a, b) { return d.get(a, u, b, "script") }, getJSON: function(a, b, c) { return d.get(a, b, c, "json") }, ajaxSetup: function(a, b) { if (b) qb(a, d.ajaxSettings); else { b = a; a = d.ajaxSettings } qb(a, b); return a }, ajaxSettings: { url: ja, isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(ia[1]),
    global: true, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: true, async: true, accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": $b }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": B.String, "text html": true, "text json": d.parseJSON, "text xml": d.parseXML }, flatOptions: { context: true, url: true}
}, ajaxPrefilter: pb(Na), ajaxTransport: pb(Zb),
    ajax: function(a, b) {
        function c(D, L, T, qa) {
            var X, J, ba, V, M = L; if (S !== 2) {
                S = 2; j && clearTimeout(j); h = u; f = qa || ""; A.readyState = D > 0 ? 4 : 0; if (T) V = jc(l, A, T); if (D >= 200 && D < 300 || D === 304) { if (l.ifModified) { if (T = A.getResponseHeader("Last-Modified")) d.lastModified[e] = T; if (T = A.getResponseHeader("Etag")) d.etag[e] = T } if (D === 304) { M = "notmodified"; X = true } else { X = kc(l, V); M = X.state; J = X.data; ba = X.error; X = !ba } } else { ba = M; if (!M || D) { M = "error"; if (D < 0) D = 0 } } A.status = D; A.statusText = (L || M) + ""; X ? z.resolveWith(r, [J, M, A]) : z.rejectWith(r, [A, M,
ba]); A.statusCode(K); K = u; if (m) x.trigger("ajax" + (X ? "Success" : "Error"), [A, l, X ? J : ba]); G.fireWith(r, [A, M]); if (m) { x.trigger("ajaxComplete", [A, l]); --d.active || d.event.trigger("ajaxStop") } 
            } 
        } if (typeof a === "object") { b = a; a = u } b = b || {}; var e, f, g, h, j, m, o, l = d.ajaxSetup({}, b), r = l.context || l, x = r !== l && (r.nodeType || r instanceof d) ? d(r) : d.event, z = d.Deferred(), G = d.Callbacks("once memory"), K = l.statusCode || {}, $ = {}, ca = {}, S = 0, F = "canceled", A = { readyState: 0, setRequestHeader: function(D, L) {
            if (!S) {
                var T = D.toLowerCase(); D = ca[T] =
ca[T] || D; $[D] = L
            } return this
        }, getAllResponseHeaders: function() { return S === 2 ? f : null }, getResponseHeader: function(D) { var L; if (S === 2) { if (!g) for (g = {}; L = rd.exec(f); ) g[L[1].toLowerCase()] = L[2]; L = g[D.toLowerCase()] } return L === u ? null : L }, overrideMimeType: function(D) { if (!S) l.mimeType = D; return this }, abort: function(D) { D = D || F; h && h.abort(D); c(0, D); return this } 
        }; z.promise(A); A.success = A.done; A.error = A.fail; A.complete = G.add; A.statusCode = function(D) {
            if (D) {
                var L; if (S < 2) for (L in D) K[L] = [K[L], D[L]]; else {
                    L = D[A.status];
                    A.always(L)
                } 
            } return this
        }; l.url = ((a || l.url) + "").replace(qd, "").replace(td, ia[1] + "//"); l.dataTypes = d.trim(l.dataType || "*").toLowerCase().split(ea); if (l.crossDomain == null) { a = Xb.exec(l.url.toLowerCase()); l.crossDomain = !!(a && (a[1] !== ia[1] || a[2] !== ia[2] || (a[3] || (a[1] === "http:" ? 80 : 443)) != (ia[3] || (ia[1] === "http:" ? 80 : 443)))) } if (l.data && l.processData && typeof l.data !== "string") l.data = d.param(l.data, l.traditional); za(Na, l, b, A); if (S === 2) return A; m = l.global; l.type = l.type.toUpperCase(); l.hasContent = !sd.test(l.type);
        m && d.active++ === 0 && d.event.trigger("ajaxStart"); if (!l.hasContent) { if (l.data) { l.url += (Wb.test(l.url) ? "&" : "?") + l.data; delete l.data } e = l.url; if (l.cache === false) { a = d.now(); var ga = l.url.replace(vd, "$1_=" + a); l.url = ga + (ga === l.url ? (Wb.test(l.url) ? "&" : "?") + "_=" + a : "") } } if (l.data && l.hasContent && l.contentType !== false || b.contentType) A.setRequestHeader("Content-Type", l.contentType); if (l.ifModified) {
            e = e || l.url; d.lastModified[e] && A.setRequestHeader("If-Modified-Since", d.lastModified[e]); d.etag[e] && A.setRequestHeader("If-None-Match",
d.etag[e])
        } A.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + $b + "; q=0.01" : "") : l.accepts["*"]); for (o in l.headers) A.setRequestHeader(o, l.headers[o]); if (l.beforeSend && (l.beforeSend.call(r, A, l) === false || S === 2)) return A.abort(); F = "abort"; for (o in { success: 1, error: 1, complete: 1 }) A[o](l[o]); if (h = za(Zb, l, b, A)) {
            A.readyState = 1; m && x.trigger("ajaxSend", [A, l]); if (l.async && l.timeout > 0) j = setTimeout(function() { A.abort("timeout") }, l.timeout);
            try { S = 1; h.send($, c) } catch (ua) { if (S < 2) c(-1, ua); else throw ua; } 
        } else c(-1, "No Transport"); return A
    }, active: 0, lastModified: {}, etag: {}
}); var ac = [], wd = /\?/, Ia = /(=)\?(?=&|$)|\?\?/, xd = d.now(); d.ajaxSetup({ jsonp: "callback", jsonpCallback: function() { var a = ac.pop() || d.expando + "_" + xd++; this[a] = true; return a } }); d.ajaxPrefilter("json jsonp", function(a, b, c) {
    var e, f, g, h = a.data, j = a.url, m = a.jsonp !== false, o = m && Ia.test(j), l = m && !o && typeof h === "string" && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") &&
Ia.test(h); if (a.dataTypes[0] === "jsonp" || o || l) {
        e = a.jsonpCallback = d.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback; f = B[e]; if (o) a.url = j.replace(Ia, "$1" + e); else if (l) a.data = h.replace(Ia, "$1" + e); else if (m) a.url += (wd.test(j) ? "&" : "?") + a.jsonp + "=" + e; a.converters["script json"] = function() { g || d.error(e + " was not called"); return g[0] }; a.dataTypes[0] = "json"; B[e] = function() { g = arguments }; c.always(function() {
            B[e] = f; if (a[e]) { a.jsonpCallback = b.jsonpCallback; ac.push(e) } g && d.isFunction(f) && f(g[0]); g =
f = u
        }); return "script"
    } 
}); d.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ }, converters: { "text script": function(a) { d.globalEval(a); return a } } }); d.ajaxPrefilter("script", function(a) { if (a.cache === u) a.cache = false; if (a.crossDomain) { a.type = "GET"; a.global = false } }); d.ajaxTransport("script", function(a) {
    if (a.crossDomain) {
        var b, c = y.head || y.getElementsByTagName("head")[0] || y.documentElement; return { send: function(e,
f) { b = y.createElement("script"); b.async = "async"; if (a.scriptCharset) b.charset = a.scriptCharset; b.src = a.url; b.onload = b.onreadystatechange = function(g, h) { if (h || !b.readyState || /loaded|complete/.test(b.readyState)) { b.onload = b.onreadystatechange = null; c && b.parentNode && c.removeChild(b); b = u; h || f(200, "success") } }; c.insertBefore(b, c.firstChild) }, abort: function() { b && b.onload(0, 1) } }
        } 
    }); var ra, Ya = B.ActiveXObject ? function() { for (var a in ra) ra[a](0, 1) } : false, yd = 0; d.ajaxSettings.xhr = B.ActiveXObject ? function() {
        return !this.isLocal &&
rb() || lc()
    } : rb; (function(a) { d.extend(d.support, { ajax: !!a, cors: !!a && "withCredentials" in a }) })(d.ajaxSettings.xhr()); d.support.ajax && d.ajaxTransport(function(a) {
        if (!a.crossDomain || d.support.cors) {
            var b; return { send: function(c, e) {
                var f, g, h = a.xhr(); a.username ? h.open(a.type, a.url, a.async, a.username, a.password) : h.open(a.type, a.url, a.async); if (a.xhrFields) for (g in a.xhrFields) h[g] = a.xhrFields[g]; a.mimeType && h.overrideMimeType && h.overrideMimeType(a.mimeType); if (!a.crossDomain && !c["X-Requested-With"]) c["X-Requested-With"] =
"XMLHttpRequest"; try { for (g in c) h.setRequestHeader(g, c[g]) } catch (j) { } h.send(a.hasContent && a.data || null); b = function(m, o) {
    var l, r, x, z, G; try { if (b && (o || h.readyState === 4)) { b = u; if (f) { h.onreadystatechange = d.noop; Ya && delete ra[f] } if (o) h.readyState !== 4 && h.abort(); else { l = h.status; x = h.getAllResponseHeaders(); z = {}; if ((G = h.responseXML) && G.documentElement) z.xml = G; try { z.text = h.responseText } catch (K) { } try { r = h.statusText } catch ($) { r = "" } if (!l && a.isLocal && !a.crossDomain) l = z.text ? 200 : 404; else if (l === 1223) l = 204 } } } catch (ca) {
        o ||
e(-1, ca)
    } z && e(l, r, z, x)
}; if (a.async) if (h.readyState === 4) setTimeout(b, 0); else { f = ++yd; if (Ya) { if (!ra) { ra = {}; d(B).unload(Ya) } ra[f] = b } h.onreadystatechange = b } else b()
            }, abort: function() { b && b(0, 1) } }
            } 
        }); var na, Ja, pc = /^(?:toggle|show|hide)$/, zd = new RegExp("^(?:([-+])=|)(" + Da + ")([a-z%]*)$", "i"), Ad = /queueHooks$/, Aa = [oc], ta = { "*": [function(a, b) {
            var c, e = this.createTween(a, b), f = zd.exec(b), g = e.cur(), h = +g || 0, j = 1, m = 20; if (f) {
                b = +f[2]; c = f[3] || (d.cssNumber[a] ? "" : "px"); if (c !== "px" && h) {
                    h = d.css(e.elem, a, true) || b || 1; do {
                        j = j ||
".5"; h /= j; d.style(e.elem, a, h + c)
                    } while (j !== (j = e.cur() / g) && j !== 1 && --m)
                } e.unit = c; e.start = h; e.end = f[1] ? h + (f[1] + 1) * b : b
            } return e
        } ]
        }; d.Animation = d.extend(tb, { tweener: function(a, b) { if (d.isFunction(a)) { b = a; a = ["*"] } else a = a.split(" "); for (var c, e = 0, f = a.length; e < f; e++) { c = a[e]; ta[c] = ta[c] || []; ta[c].unshift(b) } }, prefilter: function(a, b) { b ? Aa.unshift(a) : Aa.push(a) } }); d.Tween = U; U.prototype = { constructor: U, init: function(a, b, c, e, f, g) {
            this.elem = a; this.prop = c; this.easing = f || "swing"; this.options = b; this.start = this.now =
this.cur(); this.end = e; this.unit = g || (d.cssNumber[c] ? "" : "px")
        }, cur: function() { var a = U.propHooks[this.prop]; return a && a.get ? a.get(this) : U.propHooks._default.get(this) }, run: function(a) { var b, c = U.propHooks[this.prop]; this.pos = this.options.duration ? (b = d.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration)) : (b = a); this.now = (this.end - this.start) * b + this.start; this.options.step && this.options.step.call(this.elem, this.now, this); c && c.set ? c.set(this) : U.propHooks._default.set(this); return this } 
        };
        U.prototype.init.prototype = U.prototype; U.propHooks = { _default: { get: function(a) { if (a.elem[a.prop] != null && (!a.elem.style || a.elem.style[a.prop] == null)) return a.elem[a.prop]; a = d.css(a.elem, a.prop, false, ""); return !a || a === "auto" ? 0 : a }, set: function(a) { if (d.fx.step[a.prop]) d.fx.step[a.prop](a); else if (a.elem.style && (a.elem.style[d.cssProps[a.prop]] != null || d.cssHooks[a.prop])) d.style(a.elem, a.prop, a.now + a.unit); else a.elem[a.prop] = a.now } } }; U.propHooks.scrollTop = U.propHooks.scrollLeft = { set: function(a) {
            if (a.elem.nodeType &&
a.elem.parentNode) a.elem[a.prop] = a.now
        } 
        }; d.each(["toggle", "show", "hide"], function(a, b) { var c = d.fn[b]; d.fn[b] = function(e, f, g) { return e == null || typeof e === "boolean" || !a && d.isFunction(e) && d.isFunction(f) ? c.apply(this, arguments) : this.animate(Ba(b, true), e, f, g) } }); d.fn.extend({ fadeTo: function(a, b, c, e) { return this.filter(xa).css("opacity", 0).show().end().animate({ opacity: b }, a, c, e) }, animate: function(a, b, c, e) {
            var f = d.isEmptyObject(a), g = d.speed(b, c, e); b = function() { var h = tb(this, d.extend({}, a), g); f && h.stop(true) };
            return f || g.queue === false ? this.each(b) : this.queue(g.queue, b)
        }, stop: function(a, b, c) {
            var e = function(f) { var g = f.stop; delete f.stop; g(c) }; if (typeof a !== "string") { c = b; b = a; a = u } if (b && a !== false) this.queue(a || "fx", []); return this.each(function() {
                var f = true, g = a != null && a + "queueHooks", h = d.timers, j = d._data(this); if (g) j[g] && j[g].stop && e(j[g]); else for (g in j) j[g] && j[g].stop && Ad.test(g) && e(j[g]); for (g = h.length; g--; ) if (h[g].elem === this && (a == null || h[g].queue === a)) { h[g].anim.stop(c); f = false; h.splice(g, 1) } if (f || !c) d.dequeue(this,
a)
            })
        } 
        }); d.each({ slideDown: Ba("show"), slideUp: Ba("hide"), slideToggle: Ba("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle"} }, function(a, b) { d.fn[a] = function(c, e, f) { return this.animate(b, c, e, f) } }); d.speed = function(a, b, c) {
            var e = a && typeof a === "object" ? d.extend({}, a) : { complete: c || !c && b || d.isFunction(a) && a, duration: a, easing: c && b || b && !d.isFunction(b) && b }; e.duration = d.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in d.fx.speeds ? d.fx.speeds[e.duration] : d.fx.speeds._default;
            if (e.queue == null || e.queue === true) e.queue = "fx"; e.old = e.complete; e.complete = function() { d.isFunction(e.old) && e.old.call(this); e.queue && d.dequeue(this, e.queue) }; return e
        }; d.easing = { linear: function(a) { return a }, swing: function(a) { return 0.5 - Math.cos(a * Math.PI) / 2 } }; d.timers = []; d.fx = U.prototype.init; d.fx.tick = function() { var a, b = d.timers, c = 0; for (na = d.now(); c < b.length; c++) { a = b[c]; !a() && b[c] === a && b.splice(c--, 1) } b.length || d.fx.stop(); na = u }; d.fx.timer = function(a) {
            if (a() && d.timers.push(a) && !Ja) Ja = setInterval(d.fx.tick,
d.fx.interval)
        }; d.fx.interval = 13; d.fx.stop = function() { clearInterval(Ja); Ja = null }; d.fx.speeds = { slow: 600, fast: 200, _default: 400 }; d.fx.step = {}; if (d.expr && d.expr.filters) d.expr.filters.animated = function(a) { return d.grep(d.timers, function(b) { return a === b.elem }).length }; var bc = /^(?:body|html)$/i; d.fn.offset = function(a) {
            if (arguments.length) return a === u ? this : this.each(function(j) { d.offset.setOffset(this, a, j) }); var b, c, e, f, g, h = { top: 0, left: 0 }; if (f = (e = this[0]) && e.ownerDocument) {
                if ((c = f.body) === e) return d.offset.bodyOffset(e);
                b = f.documentElement; if (!d.contains(b, e)) return h; if (typeof e.getBoundingClientRect !== "undefined") h = e.getBoundingClientRect(); e = ub(f); f = b.clientTop || c.clientTop || 0; c = b.clientLeft || c.clientLeft || 0; g = e.pageYOffset || b.scrollTop; return { top: h.top + g - f, left: h.left + (e.pageXOffset || b.scrollLeft) - c}
            } 
        }; d.offset = { bodyOffset: function(a) { var b = a.offsetTop, c = a.offsetLeft; if (d.support.doesNotIncludeMarginInBodyOffset) { b += parseFloat(d.css(a, "marginTop")) || 0; c += parseFloat(d.css(a, "marginLeft")) || 0 } return { top: b, left: c} },
            setOffset: function(a, b, c) { var e = d.css(a, "position"); if (e === "static") a.style.position = "relative"; var f = d(a), g = f.offset(), h = d.css(a, "top"), j = d.css(a, "left"), m = {}, o = {}; if ((e === "absolute" || e === "fixed") && d.inArray("auto", [h, j]) > -1) { o = f.position(); e = o.top; j = o.left } else { e = parseFloat(h) || 0; j = parseFloat(j) || 0 } if (d.isFunction(b)) b = b.call(a, c, g); if (b.top != null) m.top = b.top - g.top + e; if (b.left != null) m.left = b.left - g.left + j; "using" in b ? b.using.call(a, m) : f.css(m) } 
        }; d.fn.extend({ position: function() {
            if (this[0]) {
                var a =
this[0], b = this.offsetParent(), c = this.offset(), e = bc.test(b[0].nodeName) ? { top: 0, left: 0} : b.offset(); c.top -= parseFloat(d.css(a, "marginTop")) || 0; c.left -= parseFloat(d.css(a, "marginLeft")) || 0; e.top += parseFloat(d.css(b[0], "borderTopWidth")) || 0; e.left += parseFloat(d.css(b[0], "borderLeftWidth")) || 0; return { top: c.top - e.top, left: c.left - e.left}
            } 
        }, offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || y.body; a && !bc.test(a.nodeName) && d.css(a, "position") === "static"; ) a = a.offsetParent; return a ||
y.body
            })
        } 
        }); d.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(a, b) { var c = /Y/.test(b); d.fn[a] = function(e) { return d.access(this, function(f, g, h) { var j = ub(f); if (h === u) return j ? b in j ? j[b] : j.document.documentElement[g] : f[g]; if (j) j.scrollTo(!c ? h : d(j).scrollLeft(), c ? h : d(j).scrollTop()); else f[g] = h }, a, e, arguments.length, null) } }); d.each({ Height: "height", Width: "width" }, function(a, b) {
            d.each({ padding: "inner" + a, content: b, "": "outer" + a }, function(c, e) {
                d.fn[e] = function(f, g) {
                    var h = arguments.length &&
(c || typeof f !== "boolean"), j = c || (f === true || g === true ? "margin" : "border"); return d.access(this, function(m, o, l) { if (d.isWindow(m)) return m.document.documentElement["client" + a]; if (m.nodeType === 9) { o = m.documentElement; return Math.max(m.body["scroll" + a], o["scroll" + a], m.body["offset" + a], o["offset" + a], o["client" + a]) } return l === u ? d.css(m, o, l, j) : d.style(m, o, l, j) }, b, h ? f : u, h, null)
                } 
            })
        }); return d;
    })(window);
/*!
* The MIT License
*
* Copyright (c) 2012 James Allardice
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to
* deal in the Software without restriction, including without limitation the
* rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
* sell copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/

(function(global, $) {
    'use strict';

    function getInternetExplorerVersion() {
        var rv = -1;
        var ua = navigator.userAgent;
        var re = ua.indexOf("MSIE") > -1 ? new RegExp("MSIE\\s([0-9]{1,}[\\.0-9]{0,})") : new RegExp("Trident/.*?rv:([0-9]{1,}[\\.0-9]{0,})");
        var result = re.exec(ua);
        if (result != null && result[1] != null) {
            rv = parseFloat(result[1]);
        }
        return rv;
    }

    var test = document.createElement('input');
    var nativeSupport = test.placeholder !== void 0;
    var IE_Version = getInternetExplorerVersion();
    if (IE_Version === 10 || IE_Version === 11 || (window.navigator.userAgent.indexOf('Chrome') == -1 && window.navigator.userAgent.indexOf('Safari') != -1))
        nativeSupport = false;

    global.Placeholders = {
        nativeSupport: nativeSupport,
        disable: nativeSupport ? noop : disablePlaceholders,
        enable: nativeSupport ? noop : enablePlaceholders
    };

    if (nativeSupport) {
        return;
    }

    var validTypes = [
        'text',
        'search',
        'url',
        'tel',
        'email',
        'password',
        'number',
        'textarea'
    ];

    // Styling variables.
    var placeholderStyleColor = '#ccc';
    var placeholderClassName = 'placeholdersjs';
    var classNameRegExp = new RegExp('(?:^|\\s)' + placeholderClassName + '(?!\\S)');

    // The various data-* attributes used by the polyfill.
    var ATTR_PLACEHOLDER_VAL = 'data-placeholder-value';
    var ATTR_FORM_HANDLED = 'data-placeholder-submit';
    var ATTR_EVENTS_BOUND = 'data-placeholder-bound';
    var ATTR_OPTION_LIVE = 'data-placeholder-live';

    // Various other variables used throughout the rest of the script.
    var Placeholders = global.Placeholders;
    var hideOnInput = true;

    // Set up the placeholders.
    var placeholder;
    var elem;

    function handleEelements(container, callback) {
        var inputs = container ? $('input', container) : $('input', container);
        var textareas = container ? $('textarea', container) : $('textarea', container);

        for (var i = 0, len = inputs.length + textareas.length; i < len; i++) {

            // Find the next element. If we've already done all the inputs we move on to the textareas.
            elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

            // Get the value of the placeholder attribute, if any. IE10 emulating IE7
            // fails with getAttribute, hence the use of the attributes node.
            placeholder = elem.attributes.placeholder;

            // If the element has a placeholder attribute we need to modify it.
            if (placeholder) {

                // IE returns an empty object instead of undefined if the attribute is
                // not present.
                placeholder = placeholder.nodeValue;

                // Only apply the polyfill if this element is of a type that supports
                // placeholders and has a placeholder attribute with a non-empty value.
                if (placeholder && inArray(validTypes, elem.type)) {
                    callback(elem);
                }
            }
        }
    };

    // Disabling placeholders before unloading the page prevents flash of
    // unstyled placeholders on load if the page was refreshed.
    addEventListener(global, 'beforeunload', function() {
        Placeholders.disable();
    });

    //
    // Utility functions
    //

    // No-op (used in place of public methods when native support is detected).
    function noop() { }

    // Avoid IE9 activeElement of death when an iframe is used.
    //
    // More info:
    //  - http://bugs.jquery.com/ticket/13393
    //  - https://github.com/jquery/jquery/commit/85fc5878b3c6af73f42d61eedf73013e7faae408
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) { }
    }

    // Check whether an item is in an array. We don't use Array.prototype.indexOf
    // so we don't clobber any existing polyfills. This is a really simple
    // alternative.
    function inArray(arr, item) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return true;
            }
        }
        return false;
    }

    // Cross-browser DOM event binding
    function addEventListener(elem, event, fn) {
        if (elem.addEventListener) {
            return elem.addEventListener(event, fn, false);
        }
        if (elem.attachEvent) {
            return elem.attachEvent('on' + event, fn);
        }
    }

    function createPlaceHolder(elem) {
        if (!$ || !$(elem).is(':visible'))
            return false;

        if (!elem.getAttribute('addedPolyfill') || elem.getAttribute('addedPolyfill') !== 'true') {

            var $elem = $(elem);

            $elem.wrap("<div style='clear: both; display:inline-block; position:relative; background-color:white;border-radius:4px' id='_placeholder_container'></div>");
            var $parent = $(elem.parentElement);

            var label = document.createElement('span');
            var id = elem.id ? 'placeholder_' + elem.id : 'placeholder_label';
            label.setAttribute('id', id);
            var ph = $elem.attr('placeholder');
            label.innerHTML = ph;
            $elem.attr('placeholder', '');
            $elem.attr(ATTR_PLACEHOLDER_VAL, ph);

            addEventListener(label, 'click', function() { elem.focus(); return false; });

            elem.parentElement.insertBefore(label, elem);
            elem.value = '';

            var height = $elem.height() - 2;
            var width = $elem.width() - 2;

            $parent.css({
                marginTop: $elem.css('marginTop'),
                marginLeft: $elem.css('marginLeft')
            });

            $elem.removeClass('lw-marginLeft20');

            $elem.css({
                marginTop: '0px',
                marginLeft: '0px',
                backgroundColor: 'transparent'
            });

            $(label).css({
                position: 'absolute',
                top: 2,
                left: 2,
                height: height,
                width: width,
                color: 'gray',
                paddingTop: $elem.css('paddingTop'),
                paddingRight: $elem.css('paddingRight'),
                paddingBottom: $elem.css('paddingBottom'),
                paddingLeft: $elem.css('paddingLeft'),
                fontWdight: '400',
                lineHeight: height + 'px',
                pointerEvents: 'none',
                cursor: 'text',
                '-webkit-user-select': 'none',
                '-moz-user-select': 'none',
                userSelect: 'none'
            });

            elem.setAttribute("addedPolyfill", "true");
            return true;
        }
        else {
            elem.value = '';
            $(elem).css({
                marginTop: '0px',
                marginLeft: '0px',
                backgroundColor: 'transparent'
            });
            var $parent = $(elem.parentElement);
            $("span[id^='placeholder_']", $parent).css('display', 'block');
            return false;
        }
    }

    function handleElem(node, callback) {

        // Check if the passed in node is an input/textarea (in which case it can't
        // have any affected descendants).
        if (node && node.getAttribute(ATTR_PLACEHOLDER_VAL)) {
            callback(node);
        } else {

            // If an element was passed in, get all affected descendants. Otherwise,
            // get all affected elements in document.
            var handleInputs = node ? $('input', node) : $('input');
            var handleTextareas = node ? $('textarea', node) : $('textarea', node);

            var handleInputsLength = handleInputs ? handleInputs.length : 0;
            var handleTextareasLength = handleTextareas ? handleTextareas.length : 0;

            // Run the callback for each element.
            var len = handleInputsLength + handleTextareasLength;
            var elem;
            for (var i = 0; i < len; i++) {
                elem = i < handleInputsLength ? handleInputs[i] : handleTextareas[i - handleInputsLength];
                callback(elem);
            }
        }
    }

    // Return all affected elements to their normal state (remove placeholder
    // value if present).
    function disablePlaceholders(node) {
        handleElem(node, hidePlaceholder);
    }

    // Show the placeholder value on all appropriate elements.
    function enablePlaceholders(node) {
        handleEelements($(node), newElement);
    }

    // Hide the placeholder value on a single element. Returns true if the
    // placeholder was hidden and false if it was not (because it wasn't visible
    // in the first place).
    function hidePlaceholder(elem, keydownValue) {

        var valueChanged = elem.value !== '' || keydownValue;

        if (valueChanged) {

            elem.style.backgroundColor = "white";
            var $parent = $(elem.parentElement);
            $("span[id^='placeholder_']", $parent).css('display', 'none');
            return true;
        }

        return false;
    }

    // Show the placeholder value on a single element. Returns true if the
    // placeholder was shown and false if it was not (because it was already
    // visible).
    function showPlaceholder(elem) {
        var val = elem.getAttribute('placeholder') || elem.getAttribute(ATTR_PLACEHOLDER_VAL);

        if (val && (elem.value === '' || elem.value === val)) {
            return createPlaceHolder(elem);
        }
        return true;
    }

    // Returns a function that is used as a focus event handler.
    function makeFocusHandler(elem) {
        return function() {
            if (!elem.value || elem.value === '') {
                showPlaceholder(elem);
                return;
            }

            // Only hide the placeholder value if the (default) hide-on-focus
            // behaviour is enabled.
            if (!hideOnInput) {
                hidePlaceholder(elem);
            }
        };
    }

    // Returns a function that is used as a blur event handler.
    function makeBlurHandler(elem) {
        return function() {
            showPlaceholder(elem);
        };
    }

    // Returns a function that is used as a submit event handler on form elements
    // that have children affected by this polyfill.
    function makeSubmitHandler(form) {
        return function() {

            // Turn off placeholders on all appropriate descendant elements.
            disablePlaceholders(form);
        };
    }

    // Functions that are used as a event handlers when the hide-on-input
    // behaviour has been activated - very basic implementation of the 'input'
    // event.
    function makeKeydownHandler(elem) {
        return function(e) {
            try {
                setTimeout(function() {
                    if (elem.value !== '')
                        hidePlaceholder(elem, String.fromCharCode(e.keyCode));
                    else
                        showPlaceholder(elem);
                }, 2);
            } catch (err) { }
        }
    }

    // Bind event handlers to an element that we need to affect with the
    // polyfill.
    function newElement(elem) {

        if (elem.getAttribute(ATTR_EVENTS_BOUND) === 'true') return;

        // If the element is part of a form, make sure the placeholder string is
        // not submitted as a value.
        var form = elem.form;
        if (form && typeof form === 'string') {

            // Get the real form.
            form = document.getElementById(form);

            // Set a flag on the form so we know it's been handled (forms can contain
            // multiple inputs).
            if (!form.getAttribute(ATTR_FORM_HANDLED)) {
                addEventListener(form, 'submit', makeSubmitHandler(form));
                form.setAttribute(ATTR_FORM_HANDLED, 'true');
            }
        }

        // Bind event handlers to the element so we can hide/show the placeholder as appropriate.
        addEventListener(elem, 'focus', makeFocusHandler(elem));
        addEventListener(elem, 'blur', makeBlurHandler(elem));
        addEventListener(elem, 'keydown', makeKeydownHandler(elem));
        addEventListener(elem, 'paste', makeKeydownHandler(elem));

        if (hideOnInput || elem !== safeActiveElement()) {
            if (showPlaceholder(elem)) {
                elem.setAttribute(ATTR_EVENTS_BOUND, 'true');
            }
        }
    }
} (this, placeHolderjQuery));