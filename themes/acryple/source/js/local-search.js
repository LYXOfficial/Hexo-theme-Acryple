"use strict";

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}

function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
        return i
    };
    var i = {},
        t = Object.prototype,
        s = t.hasOwnProperty,
        e = "function" == typeof Symbol ? Symbol : {},
        n = e.iterator || "@@iterator",
        r = e.asyncIterator || "@@asyncIterator",
        o = e.toStringTag || "@@toStringTag";

    function a(t, e, r) {
        return Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), t[e]
    }
    try {
        a({}, "")
    } catch (t) {
        a = function (t, e, r) {
            return t[e] = r
        }
    }

    function c(t, e, r, n) {
        var o, a, i, c, e = e && e.prototype instanceof h ? e : h,
            e = Object.create(e.prototype),
            n = new b(n || []);
        return e._invoke = (o = t, a = r, i = n, c = "suspendedStart", function (t, e) {
            if ("executing" === c) throw new Error("Generator is already running");
            if ("completed" === c) {
                if ("throw" === t) throw e;
                return x()
            }
            for (i.method = t, i.arg = e;;) {
                var r = i.delegate;
                if (r) {
                    r = function t(e, r) {
                        var n = e.iterator[r.method];
                        if (void 0 === n) {
                            if (r.delegate = null, "throw" === r.method) {
                                if (e.iterator.return && (r.method = "return", r.arg = void 0, t(e, r), "throw" === r.method)) return l;
                                r.method = "throw", r.arg = new TypeError("The iterator does not provide a 'throw' method")
                            }
                            return l
                        }
                        n = u(n, e.iterator, r.arg);
                        if ("throw" === n.type) return r.method = "throw", r.arg = n.arg, r.delegate = null, l;
                        n = n.arg;
                        return n ? n.done ? (r[e.resultName] = n.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = void 0), r.delegate = null, l) : n : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, l)
                    }(r, i);
                    if (r) {
                        if (r === l) continue;
                        return r
                    }
                }
                if ("next" === i.method) i.sent = i._sent = i.arg;
                else if ("throw" === i.method) {
                    if ("suspendedStart" === c) throw c = "completed", i.arg;
                    i.dispatchException(i.arg)
                } else "return" === i.method && i.abrupt("return", i.arg);
                c = "executing";
                r = u(o, a, i);
                if ("normal" === r.type) {
                    if (c = i.done ? "completed" : "suspendedYield", r.arg === l) continue;
                    return {
                        value: r.arg,
                        done: i.done
                    }
                }
                "throw" === r.type && (c = "completed", i.method = "throw", i.arg = r.arg)
            }
        }), e
    }

    function u(t, e, r) {
        try {
            return {
                type: "normal",
                arg: t.call(e, r)
            }
        } catch (t) {
            return {
                type: "throw",
                arg: t
            }
        }
    }
    i.wrap = c;
    var l = {};

    function h() {}

    function f() {}

    function d() {}
    var e = {},
        y = (a(e, n, function () {
            return this
        }), Object.getPrototypeOf),
        y = y && y(y(L([]))),
        p = (y && y !== t && s.call(y, n) && (e = y), d.prototype = h.prototype = Object.create(e));

    function m(t) {
        ["next", "throw", "return"].forEach(function (e) {
            a(t, e, function (t) {
                return this._invoke(e, t)
            })
        })
    }

    function v(i, c) {
        var e;
        this._invoke = function (r, n) {
            function t() {
                return new c(function (t, e) {
                    ! function e(t, r, n, o) {
                        var a, t = u(i[t], i, r);
                        if ("throw" !== t.type) return (r = (a = t.arg).value) && "object" == _typeof(r) && s.call(r, "__await") ? c.resolve(r.__await).then(function (t) {
                            e("next", t, n, o)
                        }, function (t) {
                            e("throw", t, n, o)
                        }) : c.resolve(r).then(function (t) {
                            a.value = t, n(a)
                        }, function (t) {
                            return e("throw", t, n, o)
                        });
                        o(t.arg)
                    }(r, n, t, e)
                })
            }
            return e = e ? e.then(t, t) : t()
        }
    }

    function g(t) {
        var e = {
            tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
    }

    function w(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e
    }

    function b(t) {
        this.tryEntries = [{
            tryLoc: "root"
        }], t.forEach(g, this), this.reset(!0)
    }

    function L(e) {
        if (e) {
            var r, t = e[n];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) return r = -1, (t = function t() {
                for (; ++r < e.length;)
                    if (s.call(e, r)) return t.value = e[r], t.done = !1, t;
                return t.value = void 0, t.done = !0, t
            }).next = t
        }
        return {
            next: x
        }
    }

    function x() {
        return {
            value: void 0,
            done: !0
        }
    }
    return a(p, "constructor", f.prototype = d), a(d, "constructor", f), f.displayName = a(d, o, "GeneratorFunction"), i.isGeneratorFunction = function (t) {
        t = "function" == typeof t && t.constructor;
        return !!t && (t === f || "GeneratorFunction" === (t.displayName || t.name))
    }, i.mark = function (t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, d) : (t.__proto__ = d, a(t, o, "GeneratorFunction")), t.prototype = Object.create(p), t
    }, i.awrap = function (t) {
        return {
            __await: t
        }
    }, m(v.prototype), a(v.prototype, r, function () {
        return this
    }), i.AsyncIterator = v, i.async = function (t, e, r, n, o) {
        void 0 === o && (o = Promise);
        var a = new v(c(t, e, r, n), o);
        return i.isGeneratorFunction(e) ? a : a.next().then(function (t) {
            return t.done ? t.value : a.next()
        })
    }, m(p), a(p, o, "Generator"), a(p, n, function () {
        return this
    }), a(p, "toString", function () {
        return "[object Generator]"
    }), i.keys = function (r) {
        var t, n = [];
        for (t in r) n.push(t);
        return n.reverse(),
            function t() {
                for (; n.length;) {
                    var e = n.pop();
                    if (e in r) return t.value = e, t.done = !1, t
                }
                return t.done = !0, t
            }
    }, i.values = L, b.prototype = {
        constructor: b,
        reset: function (t) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(w), !t)
                for (var e in this) "t" === e.charAt(0) && s.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
        },
        stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval
        },
        dispatchException: function (r) {
            if (this.done) throw r;
            var n = this;

            function t(t, e) {
                return a.type = "throw", a.arg = r, n.next = t, e && (n.method = "next", n.arg = void 0), !!e
            }
            for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                var o = this.tryEntries[e],
                    a = o.completion;
                if ("root" === o.tryLoc) return t("end");
                if (o.tryLoc <= this.prev) {
                    var i = s.call(o, "catchLoc"),
                        c = s.call(o, "finallyLoc");
                    if (i && c) {
                        if (this.prev < o.catchLoc) return t(o.catchLoc, !0);
                        if (this.prev < o.finallyLoc) return t(o.finallyLoc)
                    } else if (i) {
                        if (this.prev < o.catchLoc) return t(o.catchLoc, !0)
                    } else {
                        if (!c) throw new Error("try statement without catch or finally");
                        if (this.prev < o.finallyLoc) return t(o.finallyLoc)
                    }
                }
            }
        },
        abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
                var n = this.tryEntries[r];
                if (n.tryLoc <= this.prev && s.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                    var o = n;
                    break
                }
            }
            var a = (o = o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc ? null : o) ? o.completion : {};
            return a.type = t, a.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, l) : this.complete(a)
        },
        complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), l
        },
        finish: function (t) {
            for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                var r = this.tryEntries[e];
                if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), w(r), l
            }
        },
        catch: function (t) {
            for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                var r, n, o = this.tryEntries[e];
                if (o.tryLoc === t) return "throw" === (r = o.completion).type && (n = r.arg, w(o)), n
            }
            throw new Error("illegal catch attempt")
        },
        delegateYield: function (t, e, r) {
            return this.delegate = {
                iterator: L(t),
                resultName: e,
                nextLoc: r
            }, "next" === this.method && (this.arg = void 0), l
        }
    }, i
}

function _toConsumableArray(t) {
    return _arrayWithoutHoles(t) || _iterableToArray(t) || _unsupportedIterableToArray(t) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(t, e) {
    var r;
    if (t) return "string" == typeof t ? _arrayLikeToArray(t, e) : "Map" === (r = "Object" === (r = Object.prototype.toString.call(t).slice(8, -1)) && t.constructor ? t.constructor.name : r) || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(t, e) : void 0
}

function _iterableToArray(t) {
    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
}

function _arrayWithoutHoles(t) {
    if (Array.isArray(t)) return _arrayLikeToArray(t)
}

function _arrayLikeToArray(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n
}

function asyncGeneratorStep(t, e, r, n, o, a, i) {
    try {
        var c = t[a](i),
            s = c.value
    } catch (t) {
        return void r(t)
    }
    c.done ? e(s) : Promise.resolve(s).then(n, o)
}

function _asyncToGenerator(c) {
    return function () {
        var t = this,
            i = arguments;
        return new Promise(function (e, r) {
            var n = c.apply(t, i);

            function o(t) {
                asyncGeneratorStep(n, e, r, o, a, "next", t)
            }

            function a(t) {
                asyncGeneratorStep(n, e, r, o, a, "throw", t)
            }
            o(void 0)
        })
    }
}
window.addEventListener("load", function () {
    function t() {
        var t = document.body.style;
        t.width = "100%", t.overflow = "hidden", btf.animateIn(n, "to_show 0.5s"), btf.animateIn(document.querySelector("#local-search .search-dialog"), "titleScale 0.5s"), setTimeout(function () {
            document.querySelector("#local-search-input input").focus()
        }, 100), r || (c(), r = !0), document.addEventListener("keydown", function t(e) {
            "Escape" === e.code && (a(), document.removeEventListener("keydown", t))
        })
    }

    function e() {
        document.querySelector("#search-button > .search").addEventListener("click", t);
    }
    var r = !1,
        o = [],
        n = document.getElementById("search-mask"),
        a = function () {
            var t = document.body.style;
            t.width = "", t.overflow = "", btf.animateOut(document.querySelector("#local-search .search-dialog"), "search_close .5s"), btf.animateOut(n, "to_hide 0.5s")
        },
        i = function () {
            var e = _asyncToGenerator(_regeneratorRuntime().mark(function t(e) {
                var r, n, o, a;
                return _regeneratorRuntime().wrap(function (t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            return r = [], t.next = 3, fetch(e);
                        case 3:
                            if (n = t.sent, /\.json$/.test(e)) return t.next = 7, n.json();
                            t.next = 10;
                            break;
                        case 7:
                            r = t.sent, t.next = 20;
                            break;
                        case 10:
                            return t.next = 12, n.text();
                        case 12:
                            return o = t.sent, t.next = 15, (new window.DOMParser).parseFromString(o, "text/xml");
                        case 15:
                            return o = t.sent, t.next = 18, o;
                        case 18:
                            a = t.sent, r = _toConsumableArray(a.querySelectorAll("entry")).map(function (t) {
                                var r = [],
                                    e = (t.querySelector("tags") && t.querySelector("tags").getElementsByTagName("tag") && Array.prototype.forEach.call(t.querySelector("tags").getElementsByTagName("tag"), function (t, e) {
                                        r.push(t.textContent)
                                    }), t.querySelector("content") && t.querySelector("content").textContent),
                                    n = /src=[\'\"]?([^\'\"]*)[\'\"]?/i,
                                    o = e.match(/<img.*?(?:>|\/>)/gi),
                                    a = [];
                                if (o)
                                    for (var i = 0; i < o.length; i++) {
                                        var c = o[i].match(n);
                                        c[1].indexOf("http") || a.push(c[1])
                                    }
                                return {
                                    title: t.querySelector("title").textContent,
                                    content: e,
                                    url: t.querySelector("url").textContent,
                                    tags: r,
                                    oneImage: a && a[0]
                                }
                            });
                        case 20:
                            return n.ok && ((a = document.getElementById("loading-database")).nextElementSibling.style.display = "block", a.remove()), t.abrupt("return", r);
                        case 22:
                        case "end":
                            return t.stop()
                    }
                }, t)
            }));
            return function (t) {
                return e.apply(this, arguments)
            }
        }(),
        c = function () {
            GLOBAL_CONFIG.localSearch.preload || (o = i(GLOBAL_CONFIG.localSearch.path));
            var t = document.querySelector("#local-search-input input"),
                r = document.getElementById("local-search-results"),
                n = document.getElementById("loading-status");
            t.addEventListener("input", function () {
                var m, e = this,
                    v = this.value.trim().toLowerCase().split(/[\s]+/),
                    g = ("" !== v[0] && (n.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>'), r.innerHTML = "", '<div class="search-result-list">');
                v.length <= 0 || (m = 0, o.then(function (t) {
                    t.forEach(function (t) {
                        var r, n = !0,
                            o = t.title ? t.title.trim().toLowerCase() : "",
                            e = t.tags,
                            a = null != (a = t.oneImage) ? a : "",
                            i = t.content ? t.content.trim().replace(/<[^>]+>/g, "").toLowerCase() : "",
                            t = t.url.startsWith("/") ? t.url : GLOBAL_CONFIG.root + t.url,
                            c = -1,
                            s = -1;
                        if ("" !== o || "" !== i ? v.forEach(function (t, e) {
                                r = o.indexOf(t), c = i.indexOf(t), r < 0 && c < 0 ? n = !1 : (c < 0 && (c = 0), 0 === e && (s = c))
                            }) : n = !1, n) {
                            if (0 <= s) {
                                var u = s - 30,
                                    l = s + 100,
                                    h = "",
                                    f = "",
                                    d = (0 === (u = u < 0 ? 0 : u) ? l = 100 : h = "...", l > i.length ? l = i.length : f = "...", i.substring(u, l));
                                if (v.forEach(function (t) {
                                        var e = new RegExp(t, "gi");
                                        d = d.replace(e, '<span class="search-keyword">' + t + "</span>"), o = o.replace(e, '<span class="search-keyword">' + t + "</span>")
                                    }), g = (g = (g += '<div class="local-search__hit-item">') + (a ? '<div class="search-left"><img src='.concat(a, " alt=").concat(a, " data-fancybox='gallery'>") : '<div class="search-left" style="width:0">')) + "</div>" + (a ? '<div class="search-right"><a href="' + t + '" class="search-result-title">' + o + "</a>" : '<div class="search-right" style="width: 100%"><a href="' + t + '" class="search-result-title">' + o + "</a>"), m += 1, "" !== i && (g += '<p class="search-result" onclick="pjax.loadUrl(`' + t + '`)">' + h + d + f + "</p>"), e.length) {
                                    g += '<div class="search-result-tags">';
                                    for (var y = 0; y < e.length; y++) {
                                        var p = e[y].trim();
                                        g += '<a class="tag-list" href="/tags/' + p + '/" data-pjax-state="" one-link-mark="yes">#' + p + "</a>"
                                    }
                                    g += "</div>"
                                }
                            }
                            g += "</div></div>"
                        }
                    }), 0 === m && (g += '<div id="local-search__hits-empty">' + GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/, e.value.trim()) + "</div>"), g += "</div>", r.innerHTML = g, "" !== v[0] && (n.innerHTML = ""), window.pjax && window.pjax.refresh(r)
                }))
            })
        };
    e(), document.querySelector("#local-search .search-close-button").addEventListener("click", a), n.addEventListener("click", a), GLOBAL_CONFIG.localSearch.preload && (o = i(GLOBAL_CONFIG.localSearch.path)), window.addEventListener("pjax:complete", function () {
        btf.isHidden(n) || a(), e()
    })
});