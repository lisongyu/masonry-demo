/*!
 * Masonry PACKAGED v3.2.2
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

/*!
 * imagesLoaded v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

require(["./common"], function (e) {
    require(["web/masonry1"])
}), define("../demo1", function () {
}), !function (e) {
    function t() {
    }

    function n(e) {
        function n(t) {
            t.prototype.option || (t.prototype.option = function (t) {
                e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t))
            })
        }

        function i(t, n) {
            e.fn[t] = function (i) {
                if ("string" == typeof i) {
                    for (var o = r.call(arguments, 1), u = 0, l = this.length; l > u; u++) {
                        var h = this[u], p = e.data(h, t);
                        if (p)if (e.isFunction(p[i]) && "_" !== i.charAt(0)) {
                            var v = p[i].apply(p, o);
                            if (void 0 !== v)return v
                        } else s("no such method '" + i + "' for " + t + " instance"); else s("cannot call methods on " + t + " prior to initialization; attempted to call '" + i + "'")
                    }
                    return this
                }
                return this.each(function () {
                    var r = e.data(this, t);
                    r ? (r.option(i), r._init()) : (r = new n(this, i), e.data(this, t, r))
                })
            }
        }

        if (e) {
            var s = "undefined" == typeof console ? t : function (e) {
                console.error(e)
            };
            return e.bridget = function (e, t) {
                n(t), i(e, t)
            }, e.bridget
        }
    }

    var r = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], n) : n("object" == typeof exports ? require("jquery") : e.jQuery)
}(window), function (e) {
    function t(t) {
        var n = e.event;
        return n.target = n.target || n.srcElement || t, n
    }

    var n = document.documentElement, r = function () {
    };
    n.addEventListener ? r = function (e, t, n) {
        e.addEventListener(t, n, !1)
    } : n.attachEvent && (r = function (e, n, r) {
        e[n + r] = r.handleEvent ? function () {
            var n = t(e);
            r.handleEvent.call(r, n)
        } : function () {
            var n = t(e);
            r.call(e, n)
        }, e.attachEvent("on" + n, e[n + r])
    });
    var i = function () {
    };
    n.removeEventListener ? i = function (e, t, n) {
        e.removeEventListener(t, n, !1)
    } : n.detachEvent && (i = function (e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n]
        } catch (r) {
            e[t + n] = void 0
        }
    });
    var s = {bind: r, unbind: i};
    "function" == typeof define && define.amd ? define("eventie/eventie", s) : "object" == typeof exports ? module.exports = s : e.eventie = s
}(this), function (e) {
    function t(e) {
        "function" == typeof e && (t.isReady ? e() : o.push(e))
    }

    function n(e) {
        var n = "readystatechange" === e.type && "complete" !== s.readyState;
        t.isReady || n || r()
    }

    function r() {
        t.isReady = !0;
        for (var e = 0, n = o.length; n > e; e++) {
            var r = o[e];
            r()
        }
    }

    function i(i) {
        return"complete" === s.readyState ? r() : (i.bind(s, "DOMContentLoaded", n), i.bind(s, "readystatechange", n), i.bind(e, "load", n)), t
    }

    var s = e.document, o = [];
    t.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], i) : "object" == typeof exports ? module.exports = i(require("eventie")) : e.docReady = i(e.eventie)
}(window), function () {
    function e() {
    }

    function t(e, t) {
        for (var n = e.length; n--;)if (e[n].listener === t)return n;
        return-1
    }

    function n(e) {
        return function () {
            return this[e].apply(this, arguments)
        }
    }

    var r = e.prototype, i = this, s = i.EventEmitter;
    r.getListeners = function (e) {
        var t, n, r = this._getEvents();
        if (e instanceof RegExp) {
            t = {};
            for (n in r)r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
        } else t = r[e] || (r[e] = []);
        return t
    }, r.flattenListeners = function (e) {
        var t, n = [];
        for (t = 0; t < e.length; t += 1)n.push(e[t].listener);
        return n
    }, r.getListenersAsObject = function (e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, r.addListener = function (e, n) {
        var r, i = this.getListenersAsObject(e), s = "object" == typeof n;
        for (r in i)i.hasOwnProperty(r) && -1 === t(i[r], n) && i[r].push(s ? n : {listener: n, once: !1});
        return this
    }, r.on = n("addListener"), r.addOnceListener = function (e, t) {
        return this.addListener(e, {listener: t, once: !0})
    }, r.once = n("addOnceListener"), r.defineEvent = function (e) {
        return this.getListeners(e), this
    }, r.defineEvents = function (e) {
        for (var t = 0; t < e.length; t += 1)this.defineEvent(e[t]);
        return this
    }, r.removeListener = function (e, n) {
        var r, i, s = this.getListenersAsObject(e);
        for (i in s)s.hasOwnProperty(i) && (r = t(s[i], n), -1 !== r && s[i].splice(r, 1));
        return this
    }, r.off = n("removeListener"), r.addListeners = function (e, t) {
        return this.manipulateListeners(!1, e, t)
    }, r.removeListeners = function (e, t) {
        return this.manipulateListeners(!0, e, t)
    }, r.manipulateListeners = function (e, t, n) {
        var r, i, s = e ? this.removeListener : this.addListener, o = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)for (r = n.length; r--;)s.call(this, t, n[r]); else for (r in t)t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));
        return this
    }, r.removeEvent = function (e) {
        var t, n = typeof e, r = this._getEvents();
        if ("string" === n)delete r[e]; else if (e instanceof RegExp)for (t in r)r.hasOwnProperty(t) && e.test(t) && delete r[t]; else delete this._events;
        return this
    }, r.removeAllListeners = n("removeEvent"), r.emitEvent = function (e, t) {
        var n, r, i, s, o = this.getListenersAsObject(e);
        for (i in o)if (o.hasOwnProperty(i))for (r = o[i].length; r--;)n = o[i][r], n.once === !0 && this.removeListener(e, n.listener), s = n.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, r.trigger = n("emitEvent"), r.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, r.setOnceReturnValue = function (e) {
        return this._onceReturnValue = e, this
    }, r._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, r._getEvents = function () {
        return this._events || (this._events = {})
    }, e.noConflict = function () {
        return i.EventEmitter = s, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : i.EventEmitter = e
}.call(this), function (e) {
    function t(e) {
        if (e) {
            if ("string" == typeof r[e])return e;
            e = e.charAt(0).toUpperCase() + e.slice(1);
            for (var t, i = 0, s = n.length; s > i; i++)if (t = n[i] + e, "string" == typeof r[t])return t
        }
    }

    var n = "Webkit Moz ms Ms O".split(" "), r = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
        return t
    }) : "object" == typeof exports ? module.exports = t : e.getStyleProperty = t
}(window), function (e) {
    function t(e) {
        var t = parseFloat(e), n = -1 === e.indexOf("%") && !isNaN(t);
        return n && t
    }

    function n() {
    }

    function r() {
        for (var e = {width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0}, t = 0, n = o.length; n > t; t++) {
            var r = o[t];
            e[r] = 0
        }
        return e
    }

    function i(n) {
        function i() {
            if (!v) {
                v = !0;
                var r = e.getComputedStyle;
                if (c = function () {
                    var e = r ? function (e) {
                        return r(e, null)
                    } : function (e) {
                        return e.currentStyle
                    };
                    return function (t) {
                        var n = e(t);
                        return n || s("Style returned " + n + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), n
                    }
                }(), h = n("boxSizing")) {
                    var i = document.createElement("div");
                    i.style.width = "200px", i.style.padding = "1px 2px 3px 4px", i.style.borderStyle = "solid", i.style.borderWidth = "1px 2px 3px 4px", i.style[h] = "border-box";
                    var o = document.body || document.documentElement;
                    o.appendChild(i);
                    var u = c(i);
                    p = 200 === t(u.width), o.removeChild(i)
                }
            }
        }

        function u(e) {
            if (i(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                var n = c(e);
                if ("none" === n.display)return r();
                var s = {};
                s.width = e.offsetWidth, s.height = e.offsetHeight;
                for (var u = s.isBorderBox = !!h && !!n[h] && "border-box" === n[h], a = 0, f = o.length; f > a; a++) {
                    var v = o[a], m = n[v];
                    m = l(e, m);
                    var y = parseFloat(m);
                    s[v] = isNaN(y) ? 0 : y
                }
                var w = s.paddingLeft + s.paddingRight, E = s.paddingTop + s.paddingBottom, S = s.marginLeft + s.marginRight, x = s.marginTop + s.marginBottom, T = s.borderLeftWidth + s.borderRightWidth, N = s.borderTopWidth + s.borderBottomWidth, C = u && p, L = t(n.width);
                L !== !1 && (s.width = L + (C ? 0 : w + T));
                var A = t(n.height);
                return A !== !1 && (s.height = A + (C ? 0 : E + N)), s.innerWidth = s.width - (w + T), s.innerHeight = s.height - (E + N), s.outerWidth = s.width + S, s.outerHeight = s.height + x, s
            }
        }

        function l(t, n) {
            if (e.getComputedStyle || -1 === n.indexOf("%"))return n;
            var r = t.style, i = r.left, s = t.runtimeStyle, o = s && s.left;
            return o && (s.left = t.currentStyle.left), r.left = n, n = r.pixelLeft, r.left = i, o && (s.left = o), n
        }

        var c, h, p, v = !1;
        return u
    }

    var s = "undefined" == typeof console ? n : function (e) {
        console.error(e)
    }, o = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], i) : "object" == typeof exports ? module.exports = i(require("desandro-get-style-property")) : e.getSize = i(e.getStyleProperty)
}(window), function (e) {
    function t(e, t) {
        return e[o](t)
    }

    function n(e) {
        if (!e.parentNode) {
            var t = document.createDocumentFragment();
            t.appendChild(e)
        }
    }

    function r(e, t) {
        n(e);
        for (var r = e.parentNode.querySelectorAll(t), i = 0, s = r.length; s > i; i++)if (r[i] === e)return!0;
        return!1
    }

    function i(e, r) {
        return n(e), t(e, r)
    }

    var s, o = function () {
        if (e.matchesSelector)return"matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], n = 0, r = t.length; r > n; n++) {
            var i = t[n], s = i + "MatchesSelector";
            if (e[s])return s
        }
    }();
    if (o) {
        var u = document.createElement("div"), a = t(u, "div");
        s = a ? t : i
    } else s = r;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () {
        return s
    }) : "object" == typeof exports ? module.exports = s : window.matchesSelector = s
}(Element.prototype), function (e) {
    function t(e, t) {
        for (var n in t)e[n] = t[n];
        return e
    }

    function n(e) {
        for (var t in e)return!1;
        return t = null, !0
    }

    function r(e) {
        return e.replace(/([A-Z])/g, function (e) {
            return"-" + e.toLowerCase()
        })
    }

    function i(e, i, s) {
        function u(e, t) {
            e && (this.element = e, this.layout = t, this.position = {x: 0, y: 0}, this._create())
        }

        var a = s("transition"), f = s("transform"), l = a && f, h = !!s("perspective"), p = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "otransitionend", transition: "transitionend"}[a], v = ["transform", "transition", "transitionDuration", "transitionProperty"], m = function () {
            for (var e = {}, t = 0, n = v.length; n > t; t++) {
                var r = v[t], i = s(r);
                i && i !== r && (e[r] = i)
            }
            return e
        }();
        t(u.prototype, e.prototype), u.prototype._create = function () {
            this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
        }, u.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, u.prototype.getSize = function () {
            this.size = i(this.element)
        }, u.prototype.css = function (e) {
            var t = this.element.style;
            for (var n in e) {
                var r = m[n] || n;
                t[r] = e[n]
            }
        }, u.prototype.getPosition = function () {
            var e = o(this.element), t = this.layout.options, n = t.isOriginLeft, r = t.isOriginTop, i = parseInt(e[n ? "left" : "right"], 10), s = parseInt(e[r ? "top" : "bottom"], 10);
            i = isNaN(i) ? 0 : i, s = isNaN(s) ? 0 : s;
            var u = this.layout.size;
            i -= n ? u.paddingLeft : u.paddingRight, s -= r ? u.paddingTop : u.paddingBottom, this.position.x = i, this.position.y = s
        }, u.prototype.layoutPosition = function () {
            var e = this.layout.size, t = this.layout.options, n = {};
            t.isOriginLeft ? (n.left = this.position.x + e.paddingLeft + "px", n.right = "") : (n.right = this.position.x + e.paddingRight + "px", n.left = ""), t.isOriginTop ? (n.top = this.position.y + e.paddingTop + "px", n.bottom = "") : (n.bottom = this.position.y + e.paddingBottom + "px", n.top = ""), this.css(n), this.emitEvent("layout", [this])
        };
        var y = h ? function (e, t) {
            return"translate3d(" + e + "px, " + t + "px, 0)"
        } : function (e, t) {
            return"translate(" + e + "px, " + t + "px)"
        };
        u.prototype._transitionTo = function (e, t) {
            this.getPosition();
            var n = this.position.x, r = this.position.y, i = parseInt(e, 10), s = parseInt(t, 10), o = i === this.position.x && s === this.position.y;
            if (this.setPosition(e, t), o && !this.isTransitioning)return void this.layoutPosition();
            var u = e - n, a = t - r, f = {}, l = this.layout.options;
            u = l.isOriginLeft ? u : -u, a = l.isOriginTop ? a : -a, f.transform = y(u, a), this.transition({to: f, onTransitionEnd: {transform: this.layoutPosition}, isCleaning: !0})
        }, u.prototype.goTo = function (e, t) {
            this.setPosition(e, t), this.layoutPosition()
        }, u.prototype.moveTo = l ? u.prototype._transitionTo : u.prototype.goTo, u.prototype.setPosition = function (e, t) {
            this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
        }, u.prototype._nonTransition = function (e) {
            this.css(e.to), e.isCleaning && this._removeStyles(e.to);
            for (var t in e.onTransitionEnd)e.onTransitionEnd[t].call(this)
        }, u.prototype._transition = function (e) {
            if (!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(e);
            var t = this._transn;
            for (var n in e.onTransitionEnd)t.onEnd[n] = e.onTransitionEnd[n];
            for (n in e.to)t.ingProperties[n] = !0, e.isCleaning && (t.clean[n] = !0);
            if (e.from) {
                this.css(e.from);
                var r = this.element.offsetHeight;
                r = null
            }
            this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
        };
        var w = f && r(f) + ",opacity";
        u.prototype.enableTransition = function () {
            this.isTransitioning || (this.css({transitionProperty: w, transitionDuration: this.layout.options.transitionDuration}), this.element.addEventListener(p, this, !1))
        }, u.prototype.transition = u.prototype[a ? "_transition" : "_nonTransition"], u.prototype.onwebkitTransitionEnd = function (e) {
            this.ontransitionend(e)
        }, u.prototype.onotransitionend = function (e) {
            this.ontransitionend(e)
        };
        var E = {"-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform"};
        u.prototype.ontransitionend = function (e) {
            if (e.target === this.element) {
                var t = this._transn, r = E[e.propertyName] || e.propertyName;
                if (delete t.ingProperties[r], n(t.ingProperties) && this.disableTransition(), r in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[r]), r in t.onEnd) {
                    var i = t.onEnd[r];
                    i.call(this), delete t.onEnd[r]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, u.prototype.disableTransition = function () {
            this.removeTransitionStyles(), this.element.removeEventListener(p, this, !1), this.isTransitioning = !1
        }, u.prototype._removeStyles = function (e) {
            var t = {};
            for (var n in e)t[n] = "";
            this.css(t)
        };
        var S = {transitionProperty: "", transitionDuration: ""};
        return u.prototype.removeTransitionStyles = function () {
            this.css(S)
        }, u.prototype.removeElem = function () {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
        }, u.prototype.remove = function () {
            if (!a || !parseFloat(this.layout.options.transitionDuration))return void this.removeElem();
            var e = this;
            this.on("transitionEnd", function () {
                return e.removeElem(), !0
            }), this.hide()
        }, u.prototype.reveal = function () {
            delete this.isHidden, this.css({display: ""});
            var e = this.layout.options;
            this.transition({from: e.hiddenStyle, to: e.visibleStyle, isCleaning: !0})
        }, u.prototype.hide = function () {
            this.isHidden = !0, this.css({display: ""});
            var e = this.layout.options;
            this.transition({from: e.visibleStyle, to: e.hiddenStyle, isCleaning: !0, onTransitionEnd: {opacity: function () {
                this.isHidden && this.css({display: "none"})
            }}})
        }, u.prototype.destroy = function () {
            this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
        }, u
    }

    var s = e.getComputedStyle, o = s ? function (e) {
        return s(e, null)
    } : function (e) {
        return e.currentStyle
    };
    "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], i) : "object" == typeof exports ? module.exports = i(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (e.Outlayer = {}, e.Outlayer.Item = i(e.EventEmitter, e.getSize, e.getStyleProperty))
}(window), function (e) {
    function t(e, t) {
        for (var n in t)e[n] = t[n];
        return e
    }

    function n(e) {
        return"[object Array]" === c.call(e)
    }

    function r(e) {
        var t = [];
        if (n(e))t = e; else if (e && "number" == typeof e.length)for (var r = 0, i = e.length; i > r; r++)t.push(e[r]); else t.push(e);
        return t
    }

    function i(e, t) {
        var n = p(t, e);
        -1 !== n && t.splice(n, 1)
    }

    function s(e) {
        return e.replace(/(.)([A-Z])/g, function (e, t, n) {
            return t + "-" + n
        }).toLowerCase()
    }

    function o(n, o, c, p, v, g) {
        function y(e, n) {
            if ("string" == typeof e && (e = u.querySelector(e)), !e || !h(e))return void (a && a.error("Bad " + this.constructor.namespace + " element: " + e));
            this.element = e, this.options = t({}, this.constructor.defaults), this.option(n);
            var r = ++w;
            this.element.outlayerGUID = r, E[r] = this, this._create(), this.options.isInitLayout && this.layout()
        }

        var w = 0, E = {};
        return y.namespace = "outlayer", y.Item = g, y.defaults = {containerStyle: {position: "relative"}, isInitLayout: !0, isOriginLeft: !0, isOriginTop: !0, isResizeBound: !0, isResizingContainer: !0, transitionDuration: "0.4s", hiddenStyle: {opacity: 0, transform: "scale(0.001)"}, visibleStyle: {opacity: 1, transform: "scale(1)"}}, t(y.prototype, c.prototype), y.prototype.option = function (e) {
            t(this.options, e)
        }, y.prototype._create = function () {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), t(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, y.prototype.reloadItems = function () {
            this.items = this._itemize(this.element.children)
        }, y.prototype._itemize = function (e) {
            for (var t = this._filterFindItemElements(e), n = this.constructor.Item, r = [], i = 0, s = t.length; s > i; i++) {
                var o = t[i], u = new n(o, this);
                r.push(u)
            }
            return r
        }, y.prototype._filterFindItemElements = function (e) {
            e = r(e);
            for (var t = this.options.itemSelector, n = [], i = 0, s = e.length; s > i; i++) {
                var o = e[i];
                if (h(o))if (t) {
                    v(o, t) && n.push(o);
                    for (var u = o.querySelectorAll(t), a = 0, f = u.length; f > a; a++)n.push(u[a])
                } else n.push(o)
            }
            return n
        }, y.prototype.getItemElements = function () {
            for (var e = [], t = 0, n = this.items.length; n > t; t++)e.push(this.items[t].element);
            return e
        }, y.prototype.layout = function () {
            this._resetLayout(), this._manageStamps();
            var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, e), this._isLayoutInited = !0
        }, y.prototype._init = y.prototype.layout, y.prototype._resetLayout = function () {
            this.getSize()
        }, y.prototype.getSize = function () {
            this.size = p(this.element)
        }, y.prototype._getMeasurement = function (e, t) {
            var n, r = this.options[e];
            r ? ("string" == typeof r ? n = this.element.querySelector(r) : h(r) && (n = r), this[e] = n ? p(n)[t] : r) : this[e] = 0
        }, y.prototype.layoutItems = function (e, t) {
            e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
        }, y.prototype._getItemsForLayout = function (e) {
            for (var t = [], n = 0, r = e.length; r > n; n++) {
                var i = e[n];
                i.isIgnored || t.push(i)
            }
            return t
        }, y.prototype._layoutItems = function (e, t) {
            function n() {
                r.emitEvent("layoutComplete", [r, e])
            }

            var r = this;
            if (!e || !e.length)return void n();
            this._itemsOn(e, "layout", n);
            for (var i = [], s = 0, o = e.length; o > s; s++) {
                var u = e[s], a = this._getItemLayoutPosition(u);
                a.item = u, a.isInstant = t || u.isLayoutInstant, i.push(a)
            }
            this._processLayoutQueue(i)
        }, y.prototype._getItemLayoutPosition = function () {
            return{x: 0, y: 0}
        }, y.prototype._processLayoutQueue = function (e) {
            for (var t = 0, n = e.length; n > t; t++) {
                var r = e[t];
                this._positionItem(r.item, r.x, r.y, r.isInstant)
            }
        }, y.prototype._positionItem = function (e, t, n, r) {
            r ? e.goTo(t, n) : e.moveTo(t, n)
        }, y.prototype._postLayout = function () {
            this.resizeContainer()
        }, y.prototype.resizeContainer = function () {
            if (this.options.isResizingContainer) {
                var e = this._getContainerSize();
                e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
            }
        }, y.prototype._getContainerSize = l, y.prototype._setContainerMeasure = function (e, t) {
            if (void 0 !== e) {
                var n = this.size;
                n.isBorderBox && (e += t ? n.paddingLeft + n.paddingRight + n.borderLeftWidth + n.borderRightWidth : n.paddingBottom + n.paddingTop + n.borderTopWidth + n.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
            }
        }, y.prototype._itemsOn = function (e, t, n) {
            function r() {
                return i++, i === s && n.call(o), !0
            }

            for (var i = 0, s = e.length, o = this, u = 0, a = e.length; a > u; u++) {
                var f = e[u];
                f.on(t, r)
            }
        }, y.prototype.ignore = function (e) {
            var t = this.getItem(e);
            t && (t.isIgnored = !0)
        }, y.prototype.unignore = function (e) {
            var t = this.getItem(e);
            t && delete t.isIgnored
        }, y.prototype.stamp = function (e) {
            if (e = this._find(e)) {
                this.stamps = this.stamps.concat(e);
                for (var t = 0, n = e.length; n > t; t++) {
                    var r = e[t];
                    this.ignore(r)
                }
            }
        }, y.prototype.unstamp = function (e) {
            if (e = this._find(e))for (var t = 0, n = e.length; n > t; t++) {
                var r = e[t];
                i(r, this.stamps), this.unignore(r)
            }
        }, y.prototype._find = function (e) {
            return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = r(e)) : void 0
        }, y.prototype._manageStamps = function () {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var e = 0, t = this.stamps.length; t > e; e++) {
                    var n = this.stamps[e];
                    this._manageStamp(n)
                }
            }
        }, y.prototype._getBoundingRect = function () {
            var e = this.element.getBoundingClientRect(), t = this.size;
            this._boundingRect = {left: e.left + t.paddingLeft + t.borderLeftWidth, top: e.top + t.paddingTop + t.borderTopWidth, right: e.right - (t.paddingRight + t.borderRightWidth), bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)}
        }, y.prototype._manageStamp = l, y.prototype._getElementOffset = function (e) {
            var t = e.getBoundingClientRect(), n = this._boundingRect, r = p(e), i = {left: t.left - n.left - r.marginLeft, top: t.top - n.top - r.marginTop, right: n.right - t.right - r.marginRight, bottom: n.bottom - t.bottom - r.marginBottom};
            return i
        }, y.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, y.prototype.bindResize = function () {
            this.isResizeBound || (n.bind(e, "resize", this), this.isResizeBound = !0)
        }, y.prototype.unbindResize = function () {
            this.isResizeBound && n.unbind(e, "resize", this), this.isResizeBound = !1
        }, y.prototype.onresize = function () {
            function e() {
                t.resize(), delete t.resizeTimeout
            }

            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var t = this;
            this.resizeTimeout = setTimeout(e, 100)
        }, y.prototype.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, y.prototype.needsResizeLayout = function () {
            var e = p(this.element), t = this.size && e;
            return t && e.innerWidth !== this.size.innerWidth
        }, y.prototype.addItems = function (e) {
            var t = this._itemize(e);
            return t.length && (this.items = this.items.concat(t)), t
        }, y.prototype.appended = function (e) {
            var t = this.addItems(e);
            t.length && (this.layoutItems(t, !0), this.reveal(t))
        }, y.prototype.prepended = function (e) {
            var t = this._itemize(e);
            if (t.length) {
                var n = this.items.slice(0);
                this.items = t.concat(n), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(n)
            }
        }, y.prototype.reveal = function (e) {
            var t = e && e.length;
            if (t)for (var n = 0; t > n; n++) {
                var r = e[n];
                r.reveal()
            }
        }, y.prototype.hide = function (e) {
            var t = e && e.length;
            if (t)for (var n = 0; t > n; n++) {
                var r = e[n];
                r.hide()
            }
        }, y.prototype.getItem = function (e) {
            for (var t = 0, n = this.items.length; n > t; t++) {
                var r = this.items[t];
                if (r.element === e)return r
            }
        }, y.prototype.getItems = function (e) {
            if (e && e.length) {
                for (var t = [], n = 0, r = e.length; r > n; n++) {
                    var i = e[n], s = this.getItem(i);
                    s && t.push(s)
                }
                return t
            }
        }, y.prototype.remove = function (e) {
            e = r(e);
            var t = this.getItems(e);
            if (t && t.length) {
                this._itemsOn(t, "remove", function () {
                    this.emitEvent("removeComplete", [this, t])
                });
                for (var n = 0, s = t.length; s > n; n++) {
                    var o = t[n];
                    o.remove(), i(o, this.items)
                }
            }
        }, y.prototype.destroy = function () {
            var e = this.element.style;
            e.height = "", e.position = "", e.width = "";
            for (var t = 0, n = this.items.length; n > t; t++) {
                var r = this.items[t];
                r.destroy()
            }
            this.unbindResize();
            var i = this.element.outlayerGUID;
            delete E[i], delete this.element.outlayerGUID, f && f.removeData(this.element, this.constructor.namespace)
        }, y.data = function (e) {
            var t = e && e.outlayerGUID;
            return t && E[t]
        }, y.create = function (e, n) {
            function r() {
                y.apply(this, arguments)
            }

            return Object.create ? r.prototype = Object.create(y.prototype) : t(r.prototype, y.prototype), r.prototype.constructor = r, r.defaults = t({}, y.defaults), t(r.defaults, n), r.prototype.settings = {}, r.namespace = e, r.data = y.data, r.Item = function () {
                g.apply(this, arguments)
            }, r.Item.prototype = new g, o(function () {
                for (var t = s(e), n = u.querySelectorAll(".js-" + t), i = "data-" + t + "-options", o = 0, l = n.length; l > o; o++) {
                    var c, h = n[o], p = h.getAttribute(i);
                    try {
                        c = p && JSON.parse(p)
                    } catch (v) {
                        a && a.error("Error parsing " + i + " on " + h.nodeName.toLowerCase() + (h.id ? "#" + h.id : "") + ": " + v);
                        continue
                    }
                    var m = new r(h, c);
                    f && f.data(h, e, m)
                }
            }), f && f.bridget && f.bridget(e, r), r
        }, y.Item = g, y
    }

    var u = e.document, a = e.console, f = e.jQuery, l = function () {
    }, c = Object.prototype.toString, h = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function (e) {
        return e instanceof HTMLElement
    } : function (e) {
        return e && "object" == typeof e && 1 === e.nodeType && "string" == typeof e.nodeName
    }, p = Array.prototype.indexOf ? function (e, t) {
        return e.indexOf(t)
    } : function (e, t) {
        for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return n;
        return-1
    };
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], o) : "object" == typeof exports ? module.exports = o(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : e.Outlayer = o(e.eventie, e.docReady, e.EventEmitter, e.getSize, e.matchesSelector, e.Outlayer.Item)
}(window), function (e) {
    function t(e, t) {
        var r = e.create("masonry");
        return r.prototype._resetLayout = function () {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var e = this.cols;
            for (this.colYs = []; e--;)this.colYs.push(0);
            this.maxY = 0
        }, r.prototype.measureColumns = function () {
            if (this.getContainerWidth(), !this.columnWidth) {
                var e = this.items[0], n = e && e.element;
                this.columnWidth = n && t(n).outerWidth || this.containerWidth
            }
            this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        }, r.prototype.getContainerWidth = function () {
            var e = this.options.isFitWidth ? this.element.parentNode : this.element, n = t(e);
            this.containerWidth = n && n.innerWidth
        }, r.prototype._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = e.size.outerWidth % this.columnWidth, r = t && 1 > t ? "round" : "ceil", i = Math[r](e.size.outerWidth / this.columnWidth);
            i = Math.min(i, this.cols);
            for (var s = this._getColGroup(i), o = Math.min.apply(Math, s), u = n(s, o), a = {x: this.columnWidth * u, y: o}, f = o + e.size.outerHeight, l = this.cols + 1 - s.length, h = 0; l > h; h++)this.colYs[u + h] = f;
            return a
        }, r.prototype._getColGroup = function (e) {
            if (2 > e)return this.colYs;
            for (var t = [], n = this.cols + 1 - e, r = 0; n > r; r++) {
                var i = this.colYs.slice(r, r + e);
                t[r] = Math.max.apply(Math, i)
            }
            return t
        }, r.prototype._manageStamp = function (e) {
            var n = t(e), r = this._getElementOffset(e), i = this.options.isOriginLeft ? r.left : r.right, s = i + n.outerWidth, o = Math.floor(i / this.columnWidth);
            o = Math.max(0, o);
            var u = Math.floor(s / this.columnWidth);
            u -= s % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
            for (var a = (this.options.isOriginTop ? r.top : r.bottom) + n.outerHeight, f = o; u >= f; f++)this.colYs[f] = Math.max(a, this.colYs[f])
        }, r.prototype._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var e = {height: this.maxY};
            return this.options.isFitWidth && (e.width = this._getContainerFitWidth()), e
        }, r.prototype._getContainerFitWidth = function () {
            for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];)e++;
            return(this.cols - e) * this.columnWidth - this.gutter
        }, r.prototype.needsResizeLayout = function () {
            var e = this.containerWidth;
            return this.getContainerWidth(), e !== this.containerWidth
        }, r
    }

    var n = Array.prototype.indexOf ? function (e, t) {
        return e.indexOf(t)
    } : function (e, t) {
        for (var n = 0, r = e.length; r > n; n++) {
            var i = e[n];
            if (i === t)return n
        }
        return-1
    };
    "function" == typeof define && define.amd ? define("web/masonry/masonry.pkgd.min", ["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
}(window), function (e, t) {
    typeof define == "function" && define.amd ? define("web/imagesloaded/imagesloaded", ["eventEmitter/EventEmitter", "eventie/eventie"], function (n, r) {
        return t(e, n, r)
    }) : typeof exports == "object" ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
}(window, function (t, n, r) {
    function u(e, t) {
        for (var n in t)e[n] = t[n];
        return e
    }

    function f(e) {
        return a.call(e) === "[object Array]"
    }

    function l(e) {
        var t = [];
        if (f(e))t = e; else if (typeof e.length == "number")for (var n = 0, r = e.length; n < r; n++)t.push(e[n]); else t.push(e);
        return t
    }

    function c(e, t, n) {
        if (!(this instanceof c))return new c(e, t);
        typeof e == "string" && (e = document.querySelectorAll(e)), this.elements = l(e), this.options = u({}, this.options), typeof t == "function" ? n = t : u(this.options, t), n && this.on("always", n), this.getImages(), i && (this.jqDeferred = new i.Deferred);
        var r = this;
        setTimeout(function () {
            r.check()
        })
    }

    function h(e) {
        this.img = e
    }

    function d(e) {
        this.src = e, p[e] = this
    }

    var i = t.jQuery, s = t.console, o = typeof s != "undefined", a = Object.prototype.toString;
    c.prototype = new n, c.prototype.options = {}, c.prototype.getImages = function () {
        this.images = [];
        for (var e = 0, t = this.elements.length; e < t; e++) {
            var n = this.elements[e];
            n.nodeName === "IMG" && this.addImage(n);
            var r = n.nodeType;
            if (!r || r !== 1 && r !== 9 && r !== 11)continue;
            var i = n.querySelectorAll("img");
            for (var s = 0, o = i.length; s < o; s++) {
                var u = i[s];
                this.addImage(u)
            }
        }
    }, c.prototype.addImage = function (e) {
        var t = new h(e);
        this.images.push(t)
    }, c.prototype.check = function () {
        function r(r, i) {
            return e.options.debug && o && s.log("confirm", r, i), e.progress(r), t++, t === n && e.complete(), !0
        }

        var e = this, t = 0, n = this.images.length;
        this.hasAnyBroken = !1;
        if (!n) {
            this.complete();
            return
        }
        for (var i = 0; i < n; i++) {
            var u = this.images[i];
            u.on("confirm", r), u.check()
        }
    }, c.prototype.progress = function (e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function () {
            t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
        })
    }, c.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var t = this;
        setTimeout(function () {
            t.emit(e, t), t.emit("always", t);
            if (t.jqDeferred) {
                var n = t.hasAnyBroken ? "reject" : "resolve";
                t.jqDeferred[n](t)
            }
        })
    }, i && (i.fn.imagesLoaded = function (e, t) {
        var n = new c(this, e, t);
        return n.jqDeferred.promise(i(this))
    }), h.prototype = new n, h.prototype.check = function () {
        var e = p[this.img.src] || new d(this.img.src);
        if (e.isConfirmed) {
            this.confirm(e.isLoaded, "cached was confirmed");
            return
        }
        if (this.img.complete && this.img.naturalWidth !== undefined) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            return
        }
        var t = this;
        e.on("confirm", function (e, n) {
            return t.confirm(e.isLoaded, n), !0
        }), e.check()
    }, h.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emit("confirm", this, t)
    };
    var p = {};
    return d.prototype = new n, d.prototype.check = function () {
        if (this.isChecked)return;
        var e = new Image;
        r.bind(e, "load", this), r.bind(e, "error", this), e.src = this.src, this.isChecked = !0
    }, d.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, d.prototype.onload = function (e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e)
    }, d.prototype.onerror = function (e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
    }, d.prototype.confirm = function (e, t) {
        this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
    }, d.prototype.unbindProxyEvents = function (e) {
        r.unbind(e.target, "load", this), r.unbind(e.target, "error", this)
    }, c
}), define("web/masonry1", ["jquery", "./masonry/masonry.pkgd.min", "./imagesloaded/imagesloaded"], function (e, t, n) {
    function o() {
        var t = e('<div class="item">新添加</div><div class="item">新添加</div>');
        e(r).append(t), s.appended(t)
    }

    var r = document.getElementById("container"), i = document.getElementById("more"), s = new t(r);
    n(r, function () {
        s.layout()
    }), e(i).on("click", o)
});