// ####### AMiT

function wizardButtonDirective(e) {
    angular.module("mgo-angular-wizard").directive(e, function() {
        return {
            restrict: "A",
            replace: !1,
            require: "^wizard",
            link: function(t, n, r, i) {
                n.on("click", function(n) {
                    n.preventDefault(), t.$apply(function() {
                        t.$eval(r[e]), i[e.replace("wz", "").toLowerCase()]()
                    })
                })
            }
        }
    })
}
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdownToggle", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/popup.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope", function(e, t, n) {
    function r(e) {
        for (var t in e)
            if (void 0 !== s.style[t]) return e[t]
    }
    var i = function(r, s, o) {
            o = o || {};
            var u = e.defer(),
                f = i[o.animation ? "animationEndEventName" : "transitionEndEventName"],
                l = function() {
                    n.$apply(function() {
                        r.unbind(f, l), u.resolve(r)
                    })
                };
            return f && r.bind(f, l), t(function() {
                angular.isString(s) ? r.addClass(s) : angular.isFunction(s) ? s(r) : angular.isObject(s) && r.css(s), f || u.resolve(r)
            }), u.promise.cancel = function() {
                f && r.unbind(f, l), u.reject("Transition cancelled")
            }, u.promise
        },
        s = document.createElement("trans"),
        o = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend"
        },
        u = {
            WebkitTransition: "webkitAnimationEnd",
            MozTransition: "animationend",
            OTransition: "oAnimationEnd",
            transition: "animationend"
        };
    return i.transitionEndEventName = r(o), i.animationEndEventName = r(u), i
}]), angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition", function(e) {
    return {
        link: function(t, n, r) {
            function i(t) {
                function r() {
                    l === i && (l = void 0)
                }
                var i = e(n, t);
                return l && l.cancel(), l = i, i.then(r, r), i
            }

            function s() {
                c ? (c = !1, o()) : (n.removeClass("collapse").addClass("collapsing"), i({
                    height: n[0].scrollHeight + "px"
                }).then(o))
            }

            function o() {
                n.removeClass("collapsing"), n.addClass("collapse in"), n.css({
                    height: "auto"
                })
            }

            function u() {
                if (c) c = !1, f(), n.css({
                    height: 0
                });
                else {
                    n.css({
                        height: n[0].scrollHeight + "px"
                    }); {
                        n[0].offsetWidth
                    }
                    n.removeClass("collapse in").addClass("collapsing"), i({
                        height: 0
                    }).then(f)
                }
            }

            function f() {
                n.removeClass("collapsing"), n.addClass("collapse")
            }
            var l, c = !0;
            t.$watch(r.collapse, function(e) {
                e ? u() : s()
            })
        }
    }
}]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {
    closeOthers: !0
}).controller("AccordionController", ["$scope", "$attrs", "accordionConfig", function(e, t, n) {
    this.groups = [], this.closeOthers = function(r) {
        var i = angular.isDefined(t.closeOthers) ? e.$eval(t.closeOthers) : n.closeOthers;
        i && angular.forEach(this.groups, function(e) {
            e !== r && (e.isOpen = !1)
        })
    }, this.addGroup = function(e) {
        var t = this;
        this.groups.push(e), e.$on("$destroy", function() {
            t.removeGroup(e)
        })
    }, this.removeGroup = function(e) {
        var t = this.groups.indexOf(e); - 1 !== t && this.groups.splice(this.groups.indexOf(e), 1)
    }
}]).directive("accordion", function() {
    return {
        restrict: "EA",
        controller: "AccordionController",
        transclude: !0,
        replace: !1,
        templateUrl: "template/accordion/accordion.html"
    }
}).directive("accordionGroup", ["$parse", function(e) {
    return {
        require: "^accordion",
        restrict: "EA",
        transclude: !0,
        replace: !0,
        templateUrl: "template/accordion/accordion-group.html",
        scope: {
            heading: "@"
        },
        controller: function() {
            this.setHeading = function(e) {
                this.heading = e
            }
        },
        link: function(t, n, r, i) {
            var s, o;
            i.addGroup(t), t.isOpen = !1, r.isOpen && (s = e(r.isOpen), o = s.assign, t.$parent.$watch(s, function(e) {
                t.isOpen = !!e
            })), t.$watch("isOpen", function(e) {
                e && i.closeOthers(t), o && o(t.$parent, e)
            })
        }
    }
}]).directive("accordionHeading", function() {
    return {
        restrict: "EA",
        transclude: !0,
        template: "",
        replace: !0,
        require: "^accordionGroup",
        compile: function(e, t, n) {
            return function(e, t, r, i) {
                i.setHeading(n(e, function() {}))
            }
        }
    }
}).directive("accordionTransclude", function() {
    return {
        require: "^accordionGroup",
        link: function(e, t, n, r) {
            e.$watch(function() {
                return r[n.accordionTransclude]
            }, function(e) {
                e && (t.html(""), t.append(e))
            })
        }
    }
}), angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs", function(e, t) {
    e.closeable = "close" in t
}]).directive("alert", function() {
    return {
        restrict: "EA",
        controller: "AlertController",
        templateUrl: "template/alert/alert.html",
        transclude: !0,
        replace: !0,
        scope: {
            type: "=",
            close: "&"
        }
    }
}), angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function() {
    return function(e, t, n) {
        t.addClass("ng-binding").data("$binding", n.bindHtmlUnsafe), e.$watch(n.bindHtmlUnsafe, function(e) {
            t.html(e || "")
        })
    }
}), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
    activeClass: "active",
    toggleEvent: "click"
}).controller("ButtonsController", ["buttonConfig", function(e) {
    this.activeClass = e.activeClass || "active", this.toggleEvent = e.toggleEvent || "click"
}]).directive("btnRadio", function() {
    return {
        require: ["btnRadio", "ngModel"],
        controller: "ButtonsController",
        link: function(e, t, n, r) {
            var i = r[0],
                s = r[1];
            s.$render = function() {
                t.toggleClass(i.activeClass, angular.equals(s.$modelValue, e.$eval(n.btnRadio)))
            }, t.bind(i.toggleEvent, function() {
                t.hasClass(i.activeClass) || e.$apply(function() {
                    s.$setViewValue(e.$eval(n.btnRadio)), s.$render()
                })
            })
        }
    }
}).directive("btnCheckbox", function() {
    return {
        require: ["btnCheckbox", "ngModel"],
        controller: "ButtonsController",
        link: function(e, t, n, r) {
            function i() {
                return o(n.btnCheckboxTrue, !0)
            }

            function s() {
                return o(n.btnCheckboxFalse, !1)
            }

            function o(t, n) {
                var r = e.$eval(t);
                return angular.isDefined(r) ? r : n
            }
            var u = r[0],
                a = r[1];
            a.$render = function() {
                t.toggleClass(u.activeClass, angular.equals(a.$modelValue, i()))
            }, t.bind(u.toggleEvent, function() {
                e.$apply(function() {
                    a.$setViewValue(t.hasClass(u.activeClass) ? s() : i()), a.$render()
                })
            })
        }
    }
}), angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$transition", "$q", function(e, t, n) {
    function r() {
        i();
        var n = +e.interval;
        !isNaN(n) && n >= 0 && (o = t(s, n))
    }

    function i() {
        o && (t.cancel(o), o = null)
    }

    function s() {
        u ? (e.next(), r()) : e.pause()
    }
    var o, u, a = this,
        f = a.slides = [],
        l = -1;
    a.currentSlide = null;
    var c = !1;
    a.select = function(i, s) {
        function o() {
            if (!c) {
                if (a.currentSlide && angular.isString(s) && !e.noTransition && i.$element) {
                    i.$element.addClass(s); {
                        i.$element[0].offsetWidth
                    }
                    angular.forEach(f, function(e) {
                            angular.extend(e, {
                                direction: "",
                                entering: !1,
                                leaving: !1,
                                active: !1
                            })
                        }), angular.extend(i, {
                            direction: s,
                            active: !0,
                            entering: !0
                        }), angular.extend(a.currentSlide || {}, {
                            direction: s,
                            leaving: !0
                        }), e.$currentTransition = n(i.$element, {}),
                        function(t, n) {
                            e.$currentTransition.then(function() {
                                u(t, n)
                            }, function() {
                                u(t, n)
                            })
                        }(i, a.currentSlide)
                } else u(i, a.currentSlide);
                a.currentSlide = i, l = h, r()
            }
        }

        function u(t, n) {
            angular.extend(t, {
                direction: "",
                active: !0,
                leaving: !1,
                entering: !1
            }), angular.extend(n || {}, {
                direction: "",
                active: !1,
                leaving: !1,
                entering: !1
            }), e.$currentTransition = null
        }
        var h = f.indexOf(i);
        void 0 === s && (s = h > l ? "next" : "prev"), i && i !== a.currentSlide && (e.$currentTransition ? (e.$currentTransition.cancel(), t(o)) : o())
    }, e.$on("$destroy", function() {
        c = !0
    }), a.indexOfSlide = function(e) {
        return f.indexOf(e)
    }, e.next = function() {
        var t = (l + 1) % f.length;
        return e.$currentTransition ? void 0 : a.select(f[t], "next")
    }, e.prev = function() {
        var t = 0 > l - 1 ? f.length - 1 : l - 1;
        return e.$currentTransition ? void 0 : a.select(f[t], "prev")
    }, e.select = function(e) {
        a.select(e)
    }, e.isActive = function(e) {
        return a.currentSlide === e
    }, e.slides = function() {
        return f
    }, e.$watch("interval", r), e.$on("$destroy", i), e.play = function() {
        u || (u = !0, r())
    }, e.pause = function() {
        e.noPause || (u = !1, i())
    }, a.addSlide = function(t, n) {
        t.$element = n, f.push(t), 1 === f.length || t.active ? (a.select(f[f.length - 1]), 1 == f.length && e.play()) : t.active = !1
    }, a.removeSlide = function(e) {
        var t = f.indexOf(e);
        f.splice(t, 1), f.length > 0 && e.active ? t >= f.length ? a.select(f[t - 1]) : a.select(f[t]) : l > t && l--
    }
}]).directive("carousel", [function() {
    return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        controller: "CarouselController",
        require: "carousel",
        templateUrl: "template/carousel/carousel.html",
        scope: {
            interval: "=",
            noTransition: "=",
            noPause: "="
        }
    }
}]).directive("slide", ["$parse", function(e) {
    return {
        require: "^carousel",
        restrict: "EA",
        transclude: !0,
        replace: !0,
        templateUrl: "template/carousel/slide.html",
        scope: {},
        link: function(t, n, r, i) {
            if (r.active) {
                var s = e(r.active),
                    o = s.assign,
                    u = t.active = s(t.$parent);
                t.$watch(function() {
                    var e = s(t.$parent);
                    return e !== t.active && (e !== u ? u = t.active = e : o(t.$parent, e = u = t.active)), e
                })
            }
            i.addSlide(t, n), t.$on("$destroy", function() {
                i.removeSlide(t)
            }), t.$watch("active", function(e) {
                e && i.select(t)
            })
        }
    }
}]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window", function(e, t) {
    function n(e, n) {
        return e.currentStyle ? e.currentStyle[n] : t.getComputedStyle ? t.getComputedStyle(e)[n] : e.style[n]
    }

    function r(e) {
        return "static" === (n(e, "position") || "static")
    }
    var i = function(t) {
        for (var n = e[0], i = t.offsetParent || n; i && i !== n && r(i);) i = i.offsetParent;
        return i || n
    };
    return {
        position: function(t) {
            var n = this.offset(t),
                r = {
                    top: 0,
                    left: 0
                },
                s = i(t[0]);
            s != e[0] && (r = this.offset(angular.element(s)), r.top += s.clientTop - s.scrollTop, r.left += s.clientLeft - s.scrollLeft);
            var o = t[0].getBoundingClientRect();
            return {
                width: o.width || t.prop("offsetWidth"),
                height: o.height || t.prop("offsetHeight"),
                top: n.top - r.top,
                left: n.left - r.left
            }
        },
        offset: function(n) {
            var r = n[0].getBoundingClientRect();
            return {
                width: r.width || n.prop("offsetWidth"),
                height: r.height || n.prop("offsetHeight"),
                top: r.top + (t.pageYOffset || e[0].body.scrollTop || e[0].documentElement.scrollTop),
                left: r.left + (t.pageXOffset || e[0].body.scrollLeft || e[0].documentElement.scrollLeft)
            }
        }
    }
}]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.position"]).constant("datepickerConfig", {
    dayFormat: "dd",
    monthFormat: "MMMM",
    yearFormat: "yyyy",
    dayHeaderFormat: "EEE",
    dayTitleFormat: "MMMM yyyy",
    monthTitleFormat: "yyyy",
    showWeeks: !0,
    startingDay: 0,
    yearRange: 20,
    minDate: null,
    maxDate: null
}).controller("DatepickerController", ["$scope", "$attrs", "dateFilter", "datepickerConfig", function(e, t, n, r) {
    function i(t, n) {
        return angular.isDefined(t) ? e.$parent.$eval(t) : n
    }

    function s(e, t) {
        return (new Date(e, t, 0)).getDate()
    }

    function o(e, t) {
        for (var n = new Array(t), r = e, i = 0; t > i;) n[i++] = new Date(r), r.setDate(r.getDate() + 1);
        return n
    }

    function u(e, t, r, i) {
        return {
            date: e,
            label: n(e, t),
            selected: !!r,
            secondary: !!i
        }
    }
    var a = {
            day: i(t.dayFormat, r.dayFormat),
            month: i(t.monthFormat, r.monthFormat),
            year: i(t.yearFormat, r.yearFormat),
            dayHeader: i(t.dayHeaderFormat, r.dayHeaderFormat),
            dayTitle: i(t.dayTitleFormat, r.dayTitleFormat),
            monthTitle: i(t.monthTitleFormat, r.monthTitleFormat)
        },
        f = i(t.startingDay, r.startingDay),
        l = i(t.yearRange, r.yearRange);
    this.minDate = r.minDate ? new Date(r.minDate) : null, this.maxDate = r.maxDate ? new Date(r.maxDate) : null, this.modes = [{
        name: "day",
        getVisibleDates: function(e, t) {
            var r = e.getFullYear(),
                i = e.getMonth(),
                l = new Date(r, i, 1),
                p = f - l.getDay(),
                d = p > 0 ? 7 - p : -p,
                v = new Date(l),
                m = 0;
            d > 0 && (v.setDate(-d + 1), m += d), m += s(r, i + 1), m += (7 - m % 7) % 7;
            for (var y = o(v, m), b = new Array(7), w = 0; m > w; w++) {
                var E = new Date(y[w]);
                y[w] = u(E, a.day, t && t.getDate() === E.getDate() && t.getMonth() === E.getMonth() && t.getFullYear() === E.getFullYear(), E.getMonth() !== i)
            }
            for (var S = 0; 7 > S; S++) b[S] = n(y[S].date, a.dayHeader);
            return {
                objects: y,
                title: n(e, a.dayTitle),
                labels: b
            }
        },
        compare: function(e, t) {
            return new Date(e.getFullYear(), e.getMonth(), e.getDate()) - new Date(t.getFullYear(), t.getMonth(), t.getDate())
        },
        split: 7,
        step: {
            months: 1
        }
    }, {
        name: "month",
        getVisibleDates: function(e, t) {
            for (var r = new Array(12), i = e.getFullYear(), s = 0; 12 > s; s++) {
                var o = new Date(i, s, 1);
                r[s] = u(o, a.month, t && t.getMonth() === s && t.getFullYear() === i)
            }
            return {
                objects: r,
                title: n(e, a.monthTitle)
            }
        },
        compare: function(e, t) {
            return new Date(e.getFullYear(), e.getMonth()) - new Date(t.getFullYear(), t.getMonth())
        },
        split: 3,
        step: {
            years: 1
        }
    }, {
        name: "year",
        getVisibleDates: function(e, t) {
            for (var n = new Array(l), r = e.getFullYear(), i = parseInt((r - 1) / l, 10) * l + 1, s = 0; l > s; s++) {
                var o = new Date(i + s, 0, 1);
                n[s] = u(o, a.year, t && t.getFullYear() === o.getFullYear())
            }
            return {
                objects: n,
                title: [n[0].label, n[l - 1].label].join(" - ")
            }
        },
        compare: function(e, t) {
            return e.getFullYear() - t.getFullYear()
        },
        split: 5,
        step: {
            years: l
        }
    }], this.isDisabled = function(t, n) {
        var r = this.modes[n || 0];
        return this.minDate && r.compare(t, this.minDate) < 0 || this.maxDate && r.compare(t, this.maxDate) > 0 || e.dateDisabled && e.dateDisabled({
            date: t,
            mode: r.name
        })
    }
}]).directive("datepicker", ["dateFilter", "$parse", "datepickerConfig", "$log", function(e, t, n, r) {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/datepicker/datepicker.html",
        scope: {
            dateDisabled: "&"
        },
        require: ["datepicker", "?^ngModel"],
        controller: "DatepickerController",
        link: function(e, i, s, o) {
            function u() {
                e.showWeekNumbers = 0 === m && y
            }

            function a(e, t) {
                for (var n = []; e.length > 0;) n.push(e.splice(0, t));
                return n
            }

            function f(t) {
                var n = null,
                    i = !0;
                v.$modelValue && (n = new Date(v.$modelValue), isNaN(n) ? (i = !1, r.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : t && (g = n)), v.$setValidity("date", i);
                var s = p.modes[m],
                    o = s.getVisibleDates(g, n);
                angular.forEach(o.objects, function(e) {
                    e.disabled = p.isDisabled(e.date, m)
                }), v.$setValidity("date-disabled", !n || !p.isDisabled(n)), e.rows = a(o.objects, s.split), e.labels = o.labels || [], e.title = o.title
            }

            function l(e) {
                m = e, u(), f()
            }

            function h(e) {
                var t = new Date(e);
                t.setDate(t.getDate() + 4 - (t.getDay() || 7));
                var n = t.getTime();
                return t.setMonth(0), t.setDate(1), Math.floor(Math.round((n - t) / 864e5) / 7) + 1
            }
            var p = o[0],
                v = o[1];
            if (v) {
                var m = 0,
                    g = new Date,
                    y = n.showWeeks;
                s.showWeeks ? e.$parent.$watch(t(s.showWeeks), function(e) {
                    y = !!e, u()
                }) : u(), s.min && e.$parent.$watch(t(s.min), function(e) {
                    p.minDate = e ? new Date(e) : null, f()
                }), s.max && e.$parent.$watch(t(s.max), function(e) {
                    p.maxDate = e ? new Date(e) : null, f()
                }), v.$render = function() {
                    f(!0)
                }, e.select = function(e) {
                    if (0 === m) {
                        var t = v.$modelValue ? new Date(v.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
                        t.setFullYear(e.getFullYear(), e.getMonth(), e.getDate()), v.$setViewValue(t), f(!0)
                    } else g = e, l(m - 1)
                }, e.move = function(e) {
                    var t = p.modes[m].step;
                    g.setMonth(g.getMonth() + e * (t.months || 0)), g.setFullYear(g.getFullYear() + e * (t.years || 0)), f()
                }, e.toggleMode = function() {
                    l((m + 1) % p.modes.length)
                }, e.getWeekNumber = function(t) {
                    return 0 === m && e.showWeekNumbers && 7 === t.length ? h(t[0].date) : null
                }
            }
        }
    }
}]).constant("datepickerPopupConfig", {
    dateFormat: "yyyy-MM-dd",
    currentText: "Today",
    toggleWeeksText: "Weeks",
    clearText: "Clear",
    closeText: "Done",
    closeOnDateSelection: !0,
    appendToBody: !1,
    showButtonBar: !0
}).directive("datepickerPopup", ["$compile", "$parse", "$document", "$position", "dateFilter", "datepickerPopupConfig", "datepickerConfig", function(e, t, n, r, i, s, o) {
    return {
        restrict: "EA",
        require: "ngModel",
        link: function(u, l, h, p) {
            function v(e) {
                C ? C(u, !!e) : S.isOpen = !!e
            }

            function m(e) {
                if (e) {
                    if (angular.isDate(e)) return p.$setValidity("date", !0), e;
                    if (angular.isString(e)) {
                        var t = new Date(e);
                        return isNaN(t) ? (p.$setValidity("date", !1), void 0) : (p.$setValidity("date", !0), t)
                    }
                    return p.$setValidity("date", !1), void 0
                }
                return p.$setValidity("date", !0), null
            }

            function y(e, n, r) {
                e && (u.$watch(t(e), function(e) {
                    S[n] = e
                }), O.attr(r || n, n))
            }

            function w() {
                S.position = T ? r.offset(l) : r.position(l), S.position.top = S.position.top + l.prop("offsetHeight")
            }
            var E, S = u.$new(),
                x = angular.isDefined(h.closeOnDateSelection) ? u.$eval(h.closeOnDateSelection) : s.closeOnDateSelection,
                T = angular.isDefined(h.datepickerAppendToBody) ? u.$eval(h.datepickerAppendToBody) : s.appendToBody;
            h.$observe("datepickerPopup", function(e) {
                E = e || s.dateFormat, p.$render()
            }), S.showButtonBar = angular.isDefined(h.showButtonBar) ? u.$eval(h.showButtonBar) : s.showButtonBar, u.$on("$destroy", function() {
                P.remove(), S.$destroy()
            }), h.$observe("currentText", function(e) {
                S.currentText = angular.isDefined(e) ? e : s.currentText
            }), h.$observe("toggleWeeksText", function(e) {
                S.toggleWeeksText = angular.isDefined(e) ? e : s.toggleWeeksText
            }), h.$observe("clearText", function(e) {
                S.clearText = angular.isDefined(e) ? e : s.clearText
            }), h.$observe("closeText", function(e) {
                S.closeText = angular.isDefined(e) ? e : s.closeText
            });
            var N, C;
            h.isOpen && (N = t(h.isOpen), C = N.assign, u.$watch(N, function(e) {
                S.isOpen = !!e
            })), S.isOpen = N ? N(u) : !1;
            var k = function(e) {
                    S.isOpen && e.target !== l[0] && S.$apply(function() {
                        v(!1)
                    })
                },
                L = function() {
                    S.$apply(function() {
                        v(!0)
                    })
                },
                A = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
            A.attr({
                "ng-model": "date",
                "ng-change": "dateSelection()"
            });
            var O = angular.element(A.children()[0]),
                M = {};
            h.datepickerOptions && (M = u.$eval(h.datepickerOptions), O.attr(angular.extend({}, M))), p.$parsers.unshift(m), S.dateSelection = function(e) {
                angular.isDefined(e) && (S.date = e), p.$setViewValue(S.date), p.$render(), x && v(!1)
            }, l.bind("input change keyup", function() {
                S.$apply(function() {
                    S.date = p.$modelValue
                })
            }), p.$render = function() {
                var e = p.$viewValue ? i(p.$viewValue, E) : "";
                l.val(e), S.date = p.$modelValue
            }, y(h.min, "min"), y(h.max, "max"), h.showWeeks ? y(h.showWeeks, "showWeeks", "show-weeks") : (S.showWeeks = "show-weeks" in M ? M["show-weeks"] : o.showWeeks, O.attr("show-weeks", "showWeeks")), h.dateDisabled && O.attr("date-disabled", h.dateDisabled);
            var _ = !1,
                D = !1;
            S.$watch("isOpen", function(e) {
                e ? (w(), n.bind("click", k), D && l.unbind("focus", L), l[0].focus(), _ = !0) : (_ && n.unbind("click", k), l.bind("focus", L), D = !0), C && C(u, e)
            }), S.today = function() {
                S.dateSelection(new Date)
            }, S.clear = function() {
                S.dateSelection(null)
            };
            var P = e(A)(S);
            T ? n.find("body").append(P) : l.after(P)
        }
    }
}]).directive("datepickerPopupWrap", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        templateUrl: "template/datepicker/popup.html",
        link: function(e, t) {
            t.bind("click", function(e) {
                e.preventDefault(), e.stopPropagation()
            })
        }
    }
}), angular.module("ui.bootstrap.dropdownToggle", []).directive("dropdownToggle", ["$document", "$location", function(e) {
    var t = null,
        n = angular.noop;
    return {
        restrict: "CA",
        link: function(r, i) {
            r.$watch("$location.path", function() {
                n()
            }), i.parent().bind("click", function() {
                n()
            }), i.bind("click", function(r) {
                var s = i === t;
                r.preventDefault(), r.stopPropagation(), t && n(), s || i.hasClass("disabled") || i.prop("disabled") || (i.parent().addClass("open"), t = i, n = function(r) {
                    r && (r.preventDefault(), r.stopPropagation()), e.unbind("click", n), i.parent().removeClass("open"), n = angular.noop, t = null
                }, e.bind("click", n))
            })
        }
    }
}]), angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function() {
    return {
        createNew: function() {
            var e = [];
            return {
                add: function(t, n) {
                    e.push({
                        key: t,
                        value: n
                    })
                },
                get: function(t) {
                    for (var n = 0; n < e.length; n++)
                        if (t == e[n].key) return e[n]
                },
                keys: function() {
                    for (var t = [], n = 0; n < e.length; n++) t.push(e[n].key);
                    return t
                },
                top: function() {
                    return e[e.length - 1]
                },
                remove: function(t) {
                    for (var n = -1, r = 0; r < e.length; r++)
                        if (t == e[r].key) {
                            n = r;
                            break
                        }
                    return e.splice(n, 1)[0]
                },
                removeTop: function() {
                    return e.splice(e.length - 1, 1)[0]
                },
                length: function() {
                    return e.length
                }
            }
        }
    }
}).directive("modalBackdrop", ["$timeout", function(e) {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/modal/backdrop.html",
        link: function(t) {
            t.animate = !1, e(function() {
                t.animate = !0
            })
        }
    }
}]).directive("modalWindow", ["$modalStack", "$timeout", function(e, t) {
    return {
        restrict: "EA",
        scope: {
            index: "@",
            animate: "="
        },
        replace: !0,
        transclude: !0,
        templateUrl: "template/modal/window.html",
        link: function(n, r, i) {
            n.windowClass = i.windowClass || "", t(function() {
                n.animate = !0, r[0].focus()
            }), n.close = function(t) {
                var n = e.getTop();
                n && n.value.backdrop && "static" != n.value.backdrop && t.target === t.currentTarget && (t.preventDefault(), t.stopPropagation(), e.dismiss(n.key, "backdrop click"))
            }
        }
    }
}]).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap", function(e, t, n, r, i, s) {
    function o() {
        for (var e = -1, t = p.keys(), n = 0; n < t.length; n++) p.get(t[n]).value.backdrop && (e = n);
        return e
    }

    function u(e) {
        var t = n.find("body").eq(0),
            r = p.get(e).value;
        p.remove(e), f(r.modalDomEl, r.modalScope, 300, a), t.toggleClass(h, p.length() > 0)
    }

    function a() {
        if (l && -1 == o()) {
            var e = c;
            f(l, c, 150, function() {
                e.$destroy(), e = null
            }), l = void 0, c = void 0
        }
    }

    function f(n, r, i, s) {
        function o() {
            o.done || (o.done = !0, n.remove(), s && s())
        }
        r.animate = !1;
        var u = e.transitionEndEventName;
        if (u) {
            var a = t(o, i);
            n.bind(u, function() {
                t.cancel(a), o(), r.$apply()
            })
        } else t(o, 0)
    }
    var l, c, h = "modal-open",
        p = s.createNew(),
        d = {};
    return i.$watch(o, function(e) {
        c && (c.index = e)
    }), n.bind("keydown", function(e) {
        var t;
        27 === e.which && (t = p.top(), t && t.value.keyboard && i.$apply(function() {
            d.dismiss(t.key)
        }))
    }), d.open = function(e, t) {
        p.add(e, {
            deferred: t.deferred,
            modalScope: t.scope,
            backdrop: t.backdrop,
            keyboard: t.keyboard
        });
        var s = n.find("body").eq(0),
            u = o();
        u >= 0 && !l && (c = i.$new(!0), c.index = u, l = r("<div modal-backdrop></div>")(c), s.append(l));
        var a = angular.element("<div modal-window></div>");
        a.attr("window-class", t.windowClass), a.attr("index", p.length() - 1), a.attr("animate", "animate"), a.html(t.content);
        var f = r(a)(t.scope);
        p.top().value.modalDomEl = f, s.append(f), s.addClass(h)
    }, d.close = function(e, t) {
        var n = p.get(e).value;
        n && (n.deferred.resolve(t), u(e))
    }, d.dismiss = function(e, t) {
        var n = p.get(e).value;
        n && (n.deferred.reject(t), u(e))
    }, d.dismissAll = function(e) {
        for (var t = this.getTop(); t;) this.dismiss(t.key, e), t = this.getTop()
    }, d.getTop = function() {
        return p.top()
    }, d
}]).provider("$modal", function() {
    var e = {
        options: {
            backdrop: !0,
            keyboard: !0
        },
        $get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function(t, n, r, i, s, o, u) {
            function f(e) {
                return e.template ? r.when(e.template) : i.get(e.templateUrl, {
                    cache: s
                }).then(function(e) {
                    return e.data
                })
            }

            function l(e) {
                var n = [];
                return angular.forEach(e, function(e) {
                    (angular.isFunction(e) || angular.isArray(e)) && n.push(r.when(t.invoke(e)))
                }), n
            }
            var c = {};
            return c.open = function(t) {
                var i = r.defer(),
                    s = r.defer(),
                    c = {
                        result: i.promise,
                        opened: s.promise,
                        close: function(e) {
                            u.close(c, e)
                        },
                        dismiss: function(e) {
                            u.dismiss(c, e)
                        }
                    };
                if (t = angular.extend({}, e.options, t), t.resolve = t.resolve || {}, !t.template && !t.templateUrl) throw new Error("One of template or templateUrl options is required.");
                var p = r.all([f(t)].concat(l(t.resolve)));
                return p.then(function(e) {
                    var r = (t.scope || n).$new();
                    r.$close = c.close, r.$dismiss = c.dismiss;
                    var s, a = {},
                        f = 1;
                    t.controller && (a.$scope = r, a.$modalInstance = c, angular.forEach(t.resolve, function(t, n) {
                        a[n] = e[f++]
                    }), s = o(t.controller, a)), u.open(c, {
                        scope: r,
                        deferred: i,
                        content: e[0],
                        backdrop: t.backdrop,
                        keyboard: t.keyboard,
                        windowClass: t.windowClass
                    })
                }, function(e) {
                    i.reject(e)
                }), p.then(function() {
                    s.resolve(!0)
                }, function() {
                    s.reject(!1)
                }), c
            }, c
        }]
    };
    return e
	})
	.provider("$dialog", function() {
    var e = {
            backdrop: !0,
            dialogClass: "modal",
            backdropClass: "modal-backdrop",
            transitionClass: "fade",
            triggerClass: "in",
            resolve: {},
            backdropFade: !1,
            dialogFade: !1,
            keyboard: !0,
            backdropClick: !0
        },
        t = {},
        n = {
            value: 0
        };
    this.options = function(e) {
        t = e
    }, this.$get = ["$http", "$document", "$compile", "$rootScope", "$controller", "$templateCache", "$q", "$transition", "$injector", function(a, o, i, r, l, s, c, u, p) {
        function d(e) {
            var t = angular.element("<div>");
            return t.addClass(e), t
        }

        function m(n) {
            var a = this,
                o = this.options = angular.extend({}, e, t, n);
            this._open = !1, this.backdropEl = d(o.backdropClass), o.backdropFade && (this.backdropEl.addClass(o.transitionClass), this.backdropEl.removeClass(o.triggerClass)), this.modalEl = d(o.dialogClass), o.dialogFade && (this.modalEl.addClass(o.transitionClass), this.modalEl.removeClass(o.triggerClass)), this.handledEscapeKey = function(e) {
                27 === e.which && (a.close(), e.preventDefault(), a.$scope.$apply())
            }, this.handleBackDropClick = function(e) {
                a.close(), e.preventDefault(), a.$scope.$apply()
            }, this.handleLocationChange = function() {
                a.close()
            }
        }
        var h = o.find("body");
        return m.prototype.isOpen = function() {
            return this._open
        }, m.prototype.open = function(e, t) {
            var n = this,
                a = this.options;
            if (e && (a.templateUrl = e), t && (a.controller = t), !a.template && !a.templateUrl) throw Error("Dialog.open expected template or templateUrl, neither found. Use options or open method to specify them.");
            return this._loadResolves().then(function(e) {
                var t = e.$scope = n.$scope = e.$scope ? e.$scope : r.$new();
                if (n.modalEl.html(e.$template), n.options.controller) {
                    var a = l(n.options.controller, e);
                    n.modalEl.children().data("ngControllerController", a)
                }
                i(n.modalEl)(t), n._addElementsToDom(), setTimeout(function() {
                    n.options.dialogFade && n.modalEl.addClass(n.options.triggerClass), n.options.backdropFade && n.backdropEl.addClass(n.options.triggerClass)
                }), n._bindEvents()
            }), this.deferred = c.defer(), this.deferred.promise
        }, m.prototype.close = function(e) {
            function t(e) {
                e.removeClass(a.options.triggerClass)
            }

            function n() {
                a._open && a._onCloseComplete(e)
            }
            var a = this,
                o = this._getFadingElements();
            if (o.length > 0)
                for (var i = o.length - 1; i >= 0; i--) u(o[i], t).then(n);
            else this._onCloseComplete(e)
        }, m.prototype._getFadingElements = function() {
            var e = [];
            return this.options.dialogFade && e.push(this.modalEl), this.options.backdropFade && e.push(this.backdropEl), e
        }, m.prototype._bindEvents = function() {
            this.options.keyboard && h.bind("keydown", this.handledEscapeKey), this.options.backdrop && this.options.backdropClick && this.backdropEl.bind("click", this.handleBackDropClick)
        }, m.prototype._unbindEvents = function() {
            this.options.keyboard && h.unbind("keydown", this.handledEscapeKey), this.options.backdrop && this.options.backdropClick && this.backdropEl.unbind("click", this.handleBackDropClick)
        }, m.prototype._onCloseComplete = function(e) {
            this._removeElementsFromDom(), this._unbindEvents(), this.deferred.resolve(e)
        }, m.prototype._addElementsToDom = function() {
            h.append(this.modalEl), this.options.backdrop && (0 === n.value && h.append(this.backdropEl), n.value++), this._open = !0
        }, m.prototype._removeElementsFromDom = function() {
            this.modalEl.remove(), this.options.backdrop && (n.value--, 0 === n.value && this.backdropEl.remove()), this._open = !1
        }, m.prototype._loadResolves = function() {
            var e, t = [],
                n = [],
                o = this;
            return this.options.template ? e = c.when(this.options.template) : this.options.templateUrl && (e = a.get(this.options.templateUrl, {
                cache: s
            }).then(function(e) {
                return e.data
            })), angular.forEach(this.options.resolve || [], function(e, a) {
                n.push(a), t.push(angular.isString(e) ? p.get(e) : p.invoke(e))
            }), n.push("$template"), t.push(e), c.all(t).then(function(e) {
                var t = {};
                return angular.forEach(e, function(e, a) {
                    t[n[a]] = e
                }), t.dialog = o, t
            })
        }, {
            dialog: function(e) {
                return new m(e)
            },
            messageBox: function(e, t, n) {
                return new m({
                    templateUrl: "template/dialog/message.html",
                    controller: "MessageBoxController",
                    resolve: {
                        model: function() {
                            return {
                                title: e,
                                message: t,
                                buttons: n
                            }
                        }
                    }
                })
            }
        }
    }]
}), 
 angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse", "$interpolate", function(e, t, n, r) {
    var i = this,
        s = t.numPages ? n(t.numPages).assign : angular.noop;
    this.init = function(r) {
        t.itemsPerPage ? e.$parent.$watch(n(t.itemsPerPage), function(t) {
            i.itemsPerPage = parseInt(t, 10), e.totalPages = i.calculateTotalPages()
        }) : this.itemsPerPage = r
    }, this.noPrevious = function() {
        return 1 === this.page
    }, this.noNext = function() {
        return this.page === e.totalPages
    }, this.isActive = function(e) {
        return this.page === e
    }, this.calculateTotalPages = function() {
        var t = this.itemsPerPage < 1 ? 1 : Math.ceil(e.totalItems / this.itemsPerPage);
        return Math.max(t || 0, 1)
    }, this.getAttributeValue = function(t, n, i) {
        return angular.isDefined(t) ? i ? r(t)(e.$parent) : e.$parent.$eval(t) : n
    }, this.render = function() {
        this.page = parseInt(e.page, 10) || 1, this.page > 0 && this.page <= e.totalPages && (e.pages = this.getPages(this.page, e.totalPages))
    }, e.selectPage = function(t) {
        !i.isActive(t) && t > 0 && t <= e.totalPages && (e.page = t, e.onSelectPage({
            page: t
        }))
    }, e.$watch("page", function() {
        i.render()
    }), e.$watch("totalItems", function() {
        e.totalPages = i.calculateTotalPages()
    }), e.$watch("totalPages", function(t) {
        s(e.$parent, t), i.page > t ? e.selectPage(t) : i.render()
    })
}]).constant("paginationConfig", {
    itemsPerPage: 10,
    boundaryLinks: !1,
    directionLinks: !0,
    firstText: "First",
    previousText: "Previous",
    nextText: "Next",
    lastText: "Last",
    rotate: !0
}).directive("pagination", ["$parse", "paginationConfig", function(e, t) {
    return {
        restrict: "EA",
        scope: {
            page: "=",
            totalItems: "=",
            onSelectPage: " &"
        },
        controller: "PaginationController",
        templateUrl: "template/pagination/pagination.html",
        replace: !0,
        link: function(n, r, i, s) {
            function o(e, t, n, r) {
                return {
                    number: e,
                    text: t,
                    active: n,
                    disabled: r
                }
            }
            var u, f = s.getAttributeValue(i.boundaryLinks, t.boundaryLinks),
                l = s.getAttributeValue(i.directionLinks, t.directionLinks),
                c = s.getAttributeValue(i.firstText, t.firstText, !0),
                h = s.getAttributeValue(i.previousText, t.previousText, !0),
                p = s.getAttributeValue(i.nextText, t.nextText, !0),
                d = s.getAttributeValue(i.lastText, t.lastText, !0),
                v = s.getAttributeValue(i.rotate, t.rotate);
            s.init(t.itemsPerPage), i.maxSize && n.$parent.$watch(e(i.maxSize), function(e) {
                u = parseInt(e, 10), s.render()
            }), s.getPages = function(e, t) {
                var n = [],
                    r = 1,
                    i = t,
                    a = angular.isDefined(u) && t > u;
                a && (v ? (r = Math.max(e - Math.floor(u / 2), 1), i = r + u - 1, i > t && (i = t, r = i - u + 1)) : (r = (Math.ceil(e / u) - 1) * u + 1, i = Math.min(r + u - 1, t)));
                for (var y = r; i >= y; y++) {
                    var b = o(y, y, s.isActive(y), !1);
                    n.push(b)
                }
                if (a && !v) {
                    if (r > 1) {
                        var w = o(r - 1, "...", !1, !1);
                        n.unshift(w)
                    }
                    if (t > i) {
                        var E = o(i + 1, "...", !1, !1);
                        n.push(E)
                    }
                }
                if (l) {
                    var S = o(e - 1, h, !1, s.noPrevious());
                    n.unshift(S);
                    var x = o(e + 1, p, !1, s.noNext());
                    n.push(x)
                }
                if (f) {
                    var T = o(1, c, !1, s.noPrevious());
                    n.unshift(T);
                    var N = o(t, d, !1, s.noNext());
                    n.push(N)
                }
                return n
            }
        }
    }
}]).constant("pagerConfig", {
    itemsPerPage: 10,
    previousText: "« Previous",
    nextText: "Next »",
    align: !0
}).directive("pager", ["pagerConfig", function(e) {
    return {
        restrict: "EA",
        scope: {
            page: "=",
            totalItems: "=",
            onSelectPage: " &"
        },
        controller: "PaginationController",
        templateUrl: "template/pagination/pager.html",
        replace: !0,
        link: function(t, n, r, i) {
            function s(e, t, n, r, i) {
                return {
                    number: e,
                    text: t,
                    disabled: n,
                    previous: f && r,
                    next: f && i
                }
            }
            var o = i.getAttributeValue(r.previousText, e.previousText, !0),
                u = i.getAttributeValue(r.nextText, e.nextText, !0),
                f = i.getAttributeValue(r.align, e.align);
            i.init(e.itemsPerPage), i.getPages = function(e) {
                return [s(e - 1, o, i.noPrevious(), !0, !1), s(e + 1, u, i.noNext(), !1, !0)]
            }
        }
    }
}]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function() {
    function e(e) {
        var t = /[A-Z]/g,
            n = "-";
        return e.replace(t, function(e, t) {
            return (t ? n : "") + e.toLowerCase()
        })
    }
    var t = {
            placement: "top",
            animation: !0,
            popupDelay: 0
        },
        n = {
            mouseenter: "mouseleave",
            click: "click",
            focus: "blur"
        },
        r = {};
    this.options = function(e) {
        angular.extend(r, e)
    }, this.setTriggers = function(e) {
        angular.extend(n, e)
    }, this.$get = ["$window", "$compile", "$timeout", "$parse", "$document", "$position", "$interpolate", function(i, s, o, u, f, l, h) {
        return function(i, p, v) {
            function m(e) {
                var t = e || y.trigger || v,
                    r = n[t] || t;
                return {
                    show: t,
                    hide: r
                }
            }
            var y = angular.extend({}, t, r),
                w = e(i),
                E = h.startSymbol(),
                S = h.endSymbol(),
                x = "<div " + w + '-popup title="' + E + "tt_title" + S + '" content="' + E + "tt_content" + S + '" placement="' + E + "tt_placement" + S + '" animation="tt_animation" is-open="tt_isOpen"></div>';
            return {
                restrict: "EA",
                scope: !0,
                compile: function() {
                    var e = s(x);
                    return function(t, n, r) {
                        function s() {
                            t.tt_isOpen ? h() : c()
                        }

                        function c() {
                            (!k || t.$eval(r[p + "Enable"])) && (t.tt_popupDelay ? (x = o(d, t.tt_popupDelay, !1), x.then(function(e) {
                                e()
                            })) : d()())
                        }

                        function h() {
                            t.$apply(function() {
                                v()
                            })
                        }

                        function d() {
                            return t.tt_content ? (b(), S && o.cancel(S), E.css({
                                top: 0,
                                left: 0,
                                display: "block"
                            }), T ? f.find("body").append(E) : n.after(E), L(), t.tt_isOpen = !0, t.$digest(), L) : angular.noop
                        }

                        function v() {
                            t.tt_isOpen = !1, o.cancel(x), t.tt_animation ? S = o(w, 500) : w()
                        }

                        function b() {
                            E && w(), E = e(t, function() {}), t.$digest()
                        }

                        function w() {
                            E && (E.remove(), E = null)
                        }
                        var E, S, x, T = angular.isDefined(y.appendToBody) ? y.appendToBody : !1,
                            N = m(void 0),
                            C = !1,
                            k = angular.isDefined(r[p + "Enable"]),
                            L = function() {
                                var e, r, i, s;
                                switch (e = T ? l.offset(n) : l.position(n), r = E.prop("offsetWidth"), i = E.prop("offsetHeight"), t.tt_placement) {
                                    case "right":
                                        s = {
                                            top: e.top + e.height / 2 - i / 2,
                                            left: e.left + e.width
                                        };
                                        break;
                                    case "bottom":
                                        s = {
                                            top: e.top + e.height,
                                            left: e.left + e.width / 2 - r / 2
                                        };
                                        break;
                                    case "left":
                                        s = {
                                            top: e.top + e.height / 2 - i / 2,
                                            left: e.left - r
                                        };
                                        break;
                                    default:
                                        s = {
                                            top: e.top - i,
                                            left: e.left + e.width / 2 - r / 2
                                        }
                                }
                                s.top += "px", s.left += "px", E.css(s)
                            };
                        t.tt_isOpen = !1, r.$observe(i, function(e) {
                            t.tt_content = e, !e && t.tt_isOpen && v()
                        }), r.$observe(p + "Title", function(e) {
                            t.tt_title = e
                        }), r.$observe(p + "Placement", function(e) {
                            t.tt_placement = angular.isDefined(e) ? e : y.placement
                        }), r.$observe(p + "PopupDelay", function(e) {
                            var n = parseInt(e, 10);
                            t.tt_popupDelay = isNaN(n) ? y.popupDelay : n
                        });
                        var A = function() {
                            C && (n.unbind(N.show, c), n.unbind(N.hide, h))
                        };
                        r.$observe(p + "Trigger", function(e) {
                            A(), N = m(e), N.show === N.hide ? n.bind(N.show, s) : (n.bind(N.show, c), n.bind(N.hide, h)), C = !0
                        });
                        var O = t.$eval(r[p + "Animation"]);
                        t.tt_animation = angular.isDefined(O) ? !!O : y.animation, r.$observe(p + "AppendToBody", function(e) {
                            T = angular.isDefined(e) ? u(e)(t) : T
                        }), T && t.$on("$locationChangeSuccess", function() {
                            t.tt_isOpen && v()
                        }), t.$on("$destroy", function() {
                            o.cancel(S), o.cancel(x), A(), w()
                        })
                    }
                }
            }
        }
    }]
}).directive("tooltipPopup", function() {
    return {
        restrict: "EA",
        replace: !0,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-popup.html"
    }
}).directive("tooltip", ["$tooltip", function(e) {
    return e("tooltip", "tooltip", "mouseenter")
}]).directive("tooltipHtmlUnsafePopup", function() {
    return {
        restrict: "EA",
        replace: !0,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
    }
}).directive("tooltipHtmlUnsafe", ["$tooltip", function(e) {
    return e("tooltipHtmlUnsafe", "tooltip", "mouseenter")
}]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function() {
    return {
        restrict: "EA",
        replace: !0,
        scope: {
            title: "@",
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/popover/popover.html"
    }
}).directive("popover", ["$tooltip", function(e) {
    return e("popover", "popover", "click")
}]), angular.module("ui.bootstrap.progressbar", ["ui.bootstrap.transition"]).constant("progressConfig", {
    animate: !0,
    max: 100
}).controller("ProgressController", ["$scope", "$attrs", "progressConfig", "$transition", function(e, t, n, r) {
    var i = this,
        s = [],
        o = angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max,
        u = angular.isDefined(t.animate) ? e.$parent.$eval(t.animate) : n.animate;
    this.addBar = function(e, t) {
        var n = 0,
            r = e.$parent.$index;
        angular.isDefined(r) && s[r] && (n = s[r].value), s.push(e), this.update(t, e.value, n), e.$watch("value", function(e, n) {
            e !== n && i.update(t, e, n)
        }), e.$on("$destroy", function() {
            i.removeBar(e)
        })
    }, this.update = function(e, t, n) {
        var i = this.getPercentage(t);
        u ? (e.css("width", this.getPercentage(n) + "%"), r(e, {
            width: i + "%"
        })) : e.css({
            transition: "none",
            width: i + "%"
        })
    }, this.removeBar = function(e) {
        s.splice(s.indexOf(e), 1)
    }, this.getPercentage = function(e) {
        return Math.round(100 * e / o)
    }
}]).directive("progress", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        controller: "ProgressController",
        require: "progress",
        scope: {},
        template: '<div class="progress" ng-transclude></div>'
    }
}).directive("bar", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        require: "^progress",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/bar.html",
        link: function(e, t, n, r) {
            r.addBar(e, t)
        }
    }
}).directive("progressbar", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        controller: "ProgressController",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/progressbar.html",
        link: function(e, t, n, r) {
            r.addBar(e, angular.element(t.children()[0]))
        }
    }
}), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
    max: 5,
    stateOn: null,
    stateOff: null
}).controller("RatingController", ["$scope", "$attrs", "$parse", "ratingConfig", function(e, t, n, r) {
    this.maxRange = angular.isDefined(t.max) ? e.$parent.$eval(t.max) : r.max, this.stateOn = angular.isDefined(t.stateOn) ? e.$parent.$eval(t.stateOn) : r.stateOn, this.stateOff = angular.isDefined(t.stateOff) ? e.$parent.$eval(t.stateOff) : r.stateOff, this.createRateObjects = function(e) {
        for (var t = {
                stateOn: this.stateOn,
                stateOff: this.stateOff
            }, n = 0, r = e.length; r > n; n++) e[n] = angular.extend({
            index: n
        }, t, e[n]);
        return e
    }, e.range = angular.isDefined(t.ratingStates) ? this.createRateObjects(angular.copy(e.$parent.$eval(t.ratingStates))) : this.createRateObjects(new Array(this.maxRange)), e.rate = function(t) {
        e.value === t || e.readonly || (e.value = t)
    }, e.enter = function(t) {
        e.readonly || (e.val = t), e.onHover({
            value: t
        })
    }, e.reset = function() {
        e.val = angular.copy(e.value), e.onLeave()
    }, e.$watch("value", function(t) {
        e.val = t
    }), e.readonly = !1, t.readonly && e.$parent.$watch(n(t.readonly), function(t) {
        e.readonly = !!t
    })
}]).directive("rating", function() {
    return {
        restrict: "EA",
        scope: {
            value: "=",
            onHover: "&",
            onLeave: "&"
        },
        controller: "RatingController",
        templateUrl: "template/rating/rating.html",
        replace: !0
    }
}), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope", function(e) {
    var t = this,
        n = t.tabs = e.tabs = [];
    t.select = function(e) {
        angular.forEach(n, function(e) {
            e.active = !1
        }), e.active = !0
    }, t.addTab = function(e) {
        n.push(e), (1 === n.length || e.active) && t.select(e)
    }, t.removeTab = function(e) {
        var r = n.indexOf(e);
        if (e.active && n.length > 1) {
            var i = r == n.length - 1 ? r - 1 : r + 1;
            t.select(n[i])
        }
        n.splice(r, 1)
    }
}]).directive("tabset", function() {
    return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        scope: {},
        controller: "TabsetController",
        templateUrl: "template/tabs/tabset.html",
        link: function(e, t, n) {
            e.vertical = angular.isDefined(n.vertical) ? e.$parent.$eval(n.vertical) : !1, e.justified = angular.isDefined(n.justified) ? e.$parent.$eval(n.justified) : !1, e.type = angular.isDefined(n.type) ? e.$parent.$eval(n.type) : "tabs"
        }
    }
}).directive("tab", ["$parse", function(e) {
    return {
        require: "^tabset",
        restrict: "EA",
        replace: !0,
        templateUrl: "template/tabs/tab.html",
        transclude: !0,
        scope: {
            heading: "@",
            onSelect: "&select",
            onDeselect: "&deselect"
        },
        controller: function() {},
        compile: function(t, n, r) {
            return function(t, n, i, s) {
                var o, u;
                i.active ? (o = e(i.active), u = o.assign, t.$parent.$watch(o, function(e, n) {
                    e !== n && (t.active = !!e)
                }), t.active = o(t.$parent)) : u = o = angular.noop, t.$watch("active", function(e) {
                    u(t.$parent, e), e ? (s.select(t), t.onSelect()) : t.onDeselect()
                }), t.disabled = !1, i.disabled && t.$parent.$watch(e(i.disabled), function(e) {
                    t.disabled = !!e
                }), t.select = function() {
                    t.disabled || (t.active = !0)
                }, s.addTab(t), t.$on("$destroy", function() {
                    s.removeTab(t)
                }), t.$transcludeFn = r
            }
        }
    }
}]).directive("tabHeadingTransclude", [function() {
    return {
        restrict: "A",
        require: "^tab",
        link: function(e, t) {
            e.$watch("headingElement", function(e) {
                e && (t.html(""), t.append(e))
            })
        }
    }
}]).directive("tabContentTransclude", function() {
    function e(e) {
        return e.tagName && (e.hasAttribute("tab-heading") || e.hasAttribute("data-tab-heading") || "tab-heading" === e.tagName.toLowerCase() || "data-tab-heading" === e.tagName.toLowerCase())
    }
    return {
        restrict: "A",
        require: "^tabset",
        link: function(t, n, r) {
            var i = t.$eval(r.tabContentTransclude);
            i.$transcludeFn(i.$parent, function(t) {
                angular.forEach(t, function(t) {
                    e(t) ? i.headingElement = t : n.append(t)
                })
            })
        }
    }
}), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: !0,
    meridians: null,
    readonlyInput: !1,
    mousewheel: !0
}).directive("timepicker", ["$parse", "$log", "timepickerConfig", "$locale", function(e, t, n, r) {
    return {
        restrict: "EA",
        require: "?^ngModel",
        replace: !0,
        scope: {},
        templateUrl: "template/timepicker/timepicker.html",
        link: function(i, s, o, u) {
            function f() {
                var e = parseInt(i.hours, 10),
                    t = i.showMeridian ? e > 0 && 13 > e : e >= 0 && 24 > e;
                return t ? (i.showMeridian && (12 === e && (e = 0), i.meridian === w[1] && (e += 12)), e) : void 0
            }

            function l() {
                var e = parseInt(i.minutes, 10);
                return e >= 0 && 60 > e ? e : void 0
            }

            function h(e) {
                return angular.isDefined(e) && e.toString().length < 2 ? "0" + e : e
            }

            function p(e) {
                v(), u.$setViewValue(new Date(y)), m(e)
            }

            function v() {
                u.$setValidity("time", !0), i.invalidHours = !1, i.invalidMinutes = !1
            }

            function m(e) {
                var t = y.getHours(),
                    n = y.getMinutes();
                i.showMeridian && (t = 0 === t || 12 === t ? 12 : t % 12), i.hours = "h" === e ? t : h(t), i.minutes = "m" === e ? n : h(n), i.meridian = y.getHours() < 12 ? w[0] : w[1]
            }

            function g(e) {
                var t = new Date(y.getTime() + 6e4 * e);
                y.setHours(t.getHours(), t.getMinutes()), p()
            }
            if (u) {
                var y = new Date,
                    w = angular.isDefined(o.meridians) ? i.$parent.$eval(o.meridians) : n.meridians || r.DATETIME_FORMATS.AMPMS,
                    E = n.hourStep;
                o.hourStep && i.$parent.$watch(e(o.hourStep), function(e) {
                    E = parseInt(e, 10)
                });
                var S = n.minuteStep;
                o.minuteStep && i.$parent.$watch(e(o.minuteStep), function(e) {
                    S = parseInt(e, 10)
                }), i.showMeridian = n.showMeridian, o.showMeridian && i.$parent.$watch(e(o.showMeridian), function(e) {
                    if (i.showMeridian = !!e, u.$error.time) {
                        var t = f(),
                            n = l();
                        angular.isDefined(t) && angular.isDefined(n) && (y.setHours(t), p())
                    } else m()
                });
                var x = s.find("input"),
                    T = x.eq(0),
                    N = x.eq(1),
                    C = angular.isDefined(o.mousewheel) ? i.$eval(o.mousewheel) : n.mousewheel;
                if (C) {
                    var k = function(e) {
                        e.originalEvent && (e = e.originalEvent);
                        var t = e.wheelDelta ? e.wheelDelta : -e.deltaY;
                        return e.detail || t > 0
                    };
                    T.bind("mousewheel wheel", function(e) {
                        i.$apply(k(e) ? i.incrementHours() : i.decrementHours()), e.preventDefault()
                    }), N.bind("mousewheel wheel", function(e) {
                        i.$apply(k(e) ? i.incrementMinutes() : i.decrementMinutes()), e.preventDefault()
                    })
                }
                if (i.readonlyInput = angular.isDefined(o.readonlyInput) ? i.$eval(o.readonlyInput) : n.readonlyInput, i.readonlyInput) i.updateHours = angular.noop, i.updateMinutes = angular.noop;
                else {
                    var L = function(e, t) {
                        u.$setViewValue(null), u.$setValidity("time", !1), angular.isDefined(e) && (i.invalidHours = e), angular.isDefined(t) && (i.invalidMinutes = t)
                    };
                    i.updateHours = function() {
                        var e = f();
                        angular.isDefined(e) ? (y.setHours(e), p("h")) : L(!0)
                    }, T.bind("blur", function() {
                        !i.validHours && i.hours < 10 && i.$apply(function() {
                            i.hours = h(i.hours)
                        })
                    }), i.updateMinutes = function() {
                        var e = l();
                        angular.isDefined(e) ? (y.setMinutes(e), p("m")) : L(void 0, !0)
                    }, N.bind("blur", function() {
                        !i.invalidMinutes && i.minutes < 10 && i.$apply(function() {
                            i.minutes = h(i.minutes)
                        })
                    })
                }
                u.$render = function() {
                    var e = u.$modelValue ? new Date(u.$modelValue) : null;
                    isNaN(e) ? (u.$setValidity("time", !1), t.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (e && (y = e), v(), m())
                }, i.incrementHours = function() {
                    g(60 * E)
                }, i.decrementHours = function() {
                    g(60 * -E)
                }, i.incrementMinutes = function() {
                    g(S)
                }, i.decrementMinutes = function() {
                    g(-S)
                }, i.toggleMeridian = function() {
                    g(720 * (y.getHours() < 12 ? 1 : -1))
                }
            }
        }
    }
}]), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse", function(e) {
    var t = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
    return {
        parse: function(n) {
            var r = n.match(t);
            if (!r) throw new Error("Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_' but got '" + n + "'.");
            return {
                itemName: r[3],
                source: e(r[4]),
                viewMapper: e(r[2] || r[1]),
                modelMapper: e(r[1])
            }
        }
    }
}]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser", function(e, t, n, r, i, s, o) {
    var u = [9, 13, 27, 38, 40];
    return {
        require: "ngModel",
        link: function(l, p, v, m) {
            var y, w = l.$eval(v.typeaheadMinLength) || 1,
                E = l.$eval(v.typeaheadWaitMs) || 0,
                S = l.$eval(v.typeaheadEditable) !== !1,
                x = t(v.typeaheadLoading).assign || angular.noop,
                T = t(v.typeaheadOnSelect),
                N = v.typeaheadInputFormatter ? t(v.typeaheadInputFormatter) : void 0,
                C = v.typeaheadAppendToBody ? t(v.typeaheadAppendToBody) : !1,
                k = t(v.ngModel).assign,
                L = o.parse(v.typeahead),
                A = angular.element("<div typeahead-popup></div>");
            A.attr({
                matches: "matches",
                active: "activeIdx",
                select: "select(activeIdx)",
                query: "query",
                position: "position"
            }), angular.isDefined(v.typeaheadTemplateUrl) && A.attr("template-url", v.typeaheadTemplateUrl);
            var O = l.$new();
            l.$on("$destroy", function() {
                O.$destroy()
            });
            var M = function() {
                    O.matches = [], O.activeIdx = -1
                },
                _ = function(e) {
                    var t = {
                        $viewValue: e
                    };
                    x(l, !0), n.when(L.source(l, t)).then(function(n) {
                        if (e === m.$viewValue && y) {
                            if (n.length > 0) {
                                O.activeIdx = 0, O.matches.length = 0;
                                for (var r = 0; r < n.length; r++) t[L.itemName] = n[r], O.matches.push({
                                    label: L.viewMapper(O, t),
                                    model: n[r]
                                });
                                O.query = e, O.position = C ? s.offset(p) : s.position(p), O.position.top = O.position.top + p.prop("offsetHeight")
                            } else M();
                            x(l, !1)
                        }
                    }, function() {
                        M(), x(l, !1)
                    })
                };
            M(), O.query = void 0;
            var D;
            m.$parsers.unshift(function(e) {
                return y = !0, e && e.length >= w ? E > 0 ? (D && r.cancel(D), D = r(function() {
                    _(e)
                }, E)) : _(e) : (x(l, !1), M()), S ? e : e ? (m.$setValidity("editable", !1), void 0) : (m.$setValidity("editable", !0), e)
            }), m.$formatters.push(function(e) {
                var t, n, r = {};
                return N ? (r.$model = e, N(l, r)) : (r[L.itemName] = e, t = L.viewMapper(l, r), r[L.itemName] = void 0, n = L.viewMapper(l, r), t !== n ? t : e)
            }), O.select = function(e) {
                var t, n, r = {};
                r[L.itemName] = n = O.matches[e].model, t = L.modelMapper(l, r), k(l, t), m.$setValidity("editable", !0), T(l, {
                    $item: n,
                    $model: t,
                    $label: L.viewMapper(l, r)
                }), M(), p[0].focus()
            }, p.bind("keydown", function(e) {
                0 !== O.matches.length && -1 !== u.indexOf(e.which) && (e.preventDefault(), 40 === e.which ? (O.activeIdx = (O.activeIdx + 1) % O.matches.length, O.$digest()) : 38 === e.which ? (O.activeIdx = (O.activeIdx ? O.activeIdx : O.matches.length) - 1, O.$digest()) : 13 === e.which || 9 === e.which ? O.$apply(function() {
                    O.select(O.activeIdx)
                }) : 27 === e.which && (e.stopPropagation(), M(), O.$digest()))
            }), p.bind("blur", function() {
                y = !1
            });
            var P = function(e) {
                p[0] !== e.target && (M(), O.$digest())
            };
            i.bind("click", P), l.$on("$destroy", function() {
                i.unbind("click", P)
            });
            var H = e(A)(O);
            C ? i.find("body").append(H) : p.after(H)
        }
    }
}]).directive("typeaheadPopup", function() {
    return {
        restrict: "EA",
        scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "=",
            select: "&"
        },
        replace: !0,
        templateUrl: "template/typeahead/typeahead-popup.html",
        link: function(e, t, n) {
            e.templateUrl = n.templateUrl, e.isOpen = function() {
                return e.matches.length > 0
            }, e.isActive = function(t) {
                return e.active == t
            }, e.selectActive = function(t) {
                e.active = t
            }, e.selectMatch = function(t) {
                e.select({
                    activeIdx: t
                })
            }
        }
    }
}).directive("typeaheadMatch", ["$http", "$templateCache", "$compile", "$parse", function(e, t, n, r) {
    return {
        restrict: "EA",
        scope: {
            index: "=",
            match: "=",
            query: "="
        },
        link: function(i, s, o) {
            var u = r(o.templateUrl)(i.$parent) || "template/typeahead/typeahead-match.html";
            e.get(u, {
                cache: t
            }).success(function(e) {
                s.replaceWith(n(e.trim())(i))
            })
        }
    }
}]).filter("typeaheadHighlight", function() {
    function e(e) {
        return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }
    return function(t, n) {
        return n ? t.replace(new RegExp(e(n), "gi"), "<strong>$&</strong>") : t
    }
}), angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function(e) {
    e.put("template/accordion/accordion-group.html", '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a class="accordion-toggle" ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n     <div class="panel-body" ng-transclude></div>\n  </div>\n</div>')
}]), angular.module("template/accordion/accordion.html", []).run(["$templateCache", function(e) {
    e.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>')
}]), angular.module("template/alert/alert.html", []).run(["$templateCache", function(e) {
    e.put("template/alert/alert.html", "<div class='alert' ng-class='\"alert-\" + (type || \"warning\")'>\n    <button ng-show='closeable' type='button' class='close' ng-click='close()'>&times;</button>\n    <div ng-transclude></div>\n</div>\n")
}]), angular.module("template/carousel/carousel.html", []).run(["$templateCache", function(e) {
    e.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">\n    <ol class="carousel-indicators" ng-show="slides().length > 1">\n        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides().length > 1"><span class="icon-prev"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides().length > 1"><span class="icon-next"></span></a>\n</div>\n')
}]), angular.module("template/carousel/slide.html", []).run(["$templateCache", function(e) {
    e.put("template/carousel/slide.html", "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")
}]), angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function(e) {
    e.put("template/datepicker/datepicker.html", '<table>\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{rows[0].length - 2 + showWeekNumbers}}"><button type="button" class="btn btn-default btn-sm btn-block" ng-click="toggleMode()"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr ng-show="labels.length > 0" class="h6">\n      <th ng-show="showWeekNumbers" class="text-center">#</th>\n      <th ng-repeat="label in labels" class="text-center">{{label}}</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows">\n      <td ng-show="showWeekNumbers" class="text-center"><em>{{ getWeekNumber(row) }}</em></td>\n      <td ng-repeat="dt in row" class="text-center">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected}" ng-click="select(dt.date)" ng-disabled="dt.disabled"><span ng-class="{\'text-muted\': dt.secondary}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
}]), angular.module("template/datepicker/popup.html", []).run(["$templateCache", function(e) {
    e.put("template/datepicker/popup.html", "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\">\n   <li ng-transclude></li>\n" + '    <li ng-show="showButtonBar" style="padding:10px 9px 2px">\n     <span class="btn-group">\n          <button type="button" class="btn btn-sm btn-info" ng-click="today()">{{currentText}}</button>\n         <button type="button" class="btn btn-sm btn-default" ng-click="showWeeks = ! showWeeks" ng-class="{active: showWeeks}">{{toggleWeeksText}}</button>\n           <button type="button" class="btn btn-sm btn-danger" ng-click="clear()">{{clearText}}</button>\n     </span>\n       <button type="button" class="btn btn-sm btn-success pull-right" ng-click="isOpen = false">{{closeText}}</button>\n  </li>\n</ul>\n')
}]), angular.module("template/modal/backdrop.html", []).run(["$templateCache", function(e) {
    e.put("template/modal/backdrop.html", '<div class="modal-backdrop fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1040 + index*10}"></div>')
}]), angular.module("template/modal/window.html", []).run(["$templateCache", function(e) {
    e.put("template/modal/window.html", '<div tabindex="-1" class="modal fade {{ windowClass }}" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog"><div class="modal-content" ng-transclude></div></div>\n</div>')
}]), angular.module("template/pagination/pager.html", []).run(["$templateCache", function(e) {
    e.put("template/pagination/pager.html", '<ul class="pager">\n  <li ng-repeat="page in pages" ng-class="{disabled: page.disabled, previous: page.previous, next: page.next}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n</ul>')
}]), angular.module("template/pagination/pagination.html", []).run(["$templateCache", function(e) {
    e.put("template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n</ul>')
}]), angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function(e) {
    e.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')
}]), angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function(e) {
    e.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
}]), angular.module("template/popover/popover.html", []).run(["$templateCache", function(e) {
    e.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')
}]), angular.module("template/progressbar/bar.html", []).run(["$templateCache", function(e) {
    e.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" ng-transclude></div>')
}]), angular.module("template/progressbar/progress.html", []).run(["$templateCache", function(e) {
    e.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>')
}]), angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function(e) {
    e.put("template/progressbar/progressbar.html", '<div class="progress"><div class="progress-bar" ng-class="type && \'progress-bar-\' + type" ng-transclude></div></div>')
}]), angular.module("template/rating/rating.html", []).run(["$templateCache", function(e) {
    e.put("template/rating/rating.html", '<span ng-mouseleave="reset()">\n    <i ng-repeat="r in range" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < val && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')"></i>\n</span>')
}]), angular.module("template/tabs/tab.html", []).run(["$templateCache", function(e) {
    e.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n  <a ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')
}]), angular.module("template/tabs/tabset-titles.html", []).run(["$templateCache", function(e) {
    e.put("template/tabs/tabset-titles.html", "<ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical}\">\n</ul>\n")
}]), angular.module("template/tabs/tabset.html", []).run(["$templateCache", function(e) {
    e.put("template/tabs/tabset.html", '\n<div class="tabbable">\n  <ul class="nav {{type && \'nav-\' + type}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
}]), angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function(e) {
    e.put("template/timepicker/timepicker.html", '<table>\n <tbody>\n       <tr class="text-center">\n          <td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n         <td>&nbsp;</td>\n           <td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n           <td ng-show="showMeridian"></td>\n      </tr>\n     <tr>\n          <td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n              <input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n            </td>\n         <td>:</td>\n            <td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n                <input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n         </td>\n         <td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n       </tr>\n     <tr class="text-center">\n          <td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n           <td>&nbsp;</td>\n           <td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n         <td ng-show="showMeridian"></td>\n      </tr>\n </tbody>\n</table>\n')
}]), angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function(e) {
    e.put("template/typeahead/typeahead-match.html", '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')
}]), angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function(e) {
    e.put("template/typeahead/typeahead-popup.html", "<ul class=\"dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\">\n" + '    <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>')
}]);
! function(e) {
    "use strict";
    var t, n = function(t, r) {
        return this.$el = t, this.options = e.extend({}, n.rules.defaults, n.rules[r.rule] || {}, r || {}), this.min = parseFloat(this.options.min) || 0, this.max = parseFloat(this.options.max) || 0, this.$el.on("focus.spinner", e.proxy(function(t) {
            t.preventDefault(), e(document).trigger("mouseup.spinner"), this.oldValue = this.value()
        }, this)).on("change.spinner", e.proxy(function(e) {
            e.preventDefault(), this.value(this.$el.val())
        }, this)).on("keydown.spinner", e.proxy(function(e) {
            var t = {
                38: "up",
                40: "down"
            }[e.which];
            t && (e.preventDefault(), this.spin(t))
        }, this)), this.oldValue = this.value(), this.value(this.$el.val()), this
    };
    n.rules = {
        defaults: {
            min: null,
            max: null,
            step: 1,
            precision: 0
        },
        currency: {
            min: 0,
            max: null,
            step: .01,
            precision: 2
        },
        quantity: {
            min: 1,
            max: 999,
            step: 1,
            precision: 0
        },
        percent: {
            min: 1,
            max: 100,
            step: 1,
            precision: 0
        },
        month: {
            min: 1,
            max: 12,
            step: 1,
            precision: 0
        },
        day: {
            min: 1,
            max: 31,
            step: 1,
            precision: 0
        },
        hour: {
            min: 0,
            max: 23,
            step: 1,
            precision: 0
        },
        minute: {
            min: 1,
            max: 59,
            step: 1,
            precision: 0
        },
        second: {
            min: 1,
            max: 59,
            step: 1,
            precision: 0
        }
    }, n.prototype = {
        spin: function(e) {
            switch (this.oldValue = this.value(), e) {
                case "up":
                    this.value(this.oldValue + Number(this.options.step, 10));
                    break;
                case "down":
                    this.value(this.oldValue - Number(this.options.step, 10))
            }
        },
        value: function(n) {
            if (null === n || void 0 === n) return this.numeric(this.$el.val());
            n = this.numeric(n);
            var i = this.validate(n);
            0 !== i && (n = -1 === i ? this.min : this.max), this.$el.val(n.toFixed(this.options.precision)), this.oldValue !== this.value() && (this.$el.trigger("changing.spinner", [this.value(), this.oldValue]), clearTimeout(t), t = setTimeout(e.proxy(function() {
                this.$el.trigger("changed.spinner", [this.value(), this.oldValue])
            }, this), r.delay))
        },
        numeric: function(e) {
            return e = this.options.precision > 0 ? parseFloat(e, 10) : parseInt(e, 10), e || this.options.min || 0
        },
        validate: function(e) {
            return null !== this.options.min && e < this.min ? -1 : null !== this.options.max && e > this.max ? 1 : 0
        }
    };
    var r = function(t, r) {
        this.$el = t, this.$spinning = e("[data-spin='spinner']", this.$el), 0 === this.$spinning.length && (this.$spinning = e(":input[type='text']", this.$el)), this.spinning = new n(this.$spinning, this.$spinning.data()), this.$el.on("click.spinner", "[data-spin='up'],[data-spin='down']", e.proxy(this.spin, this)).on("mousedown.spinner", "[data-spin='up'],[data-spin='down']", e.proxy(this.spin, this)), e(document).on("mouseup.spinner", e.proxy(function() {
            clearTimeout(this.spinTimeout), clearInterval(this.spinInterval)
        }, this)), r = e.extend({}, r), r.delay && this.delay(r.delay), r.changed && this.changed(r.changed), r.changing && this.changing(r.changing)
    };
    r.delay = 500, r.prototype = {
        constructor: r,
        spin: function(t) {
            var n = e(t.currentTarget).data("spin");
            switch (t.type) {
                case "click":
                    t.preventDefault(), this.spinning.spin(n);
                    break;
                case "mousedown":
                    1 === t.which && (this.spinTimeout = setTimeout(e.proxy(this.beginSpin, this, n), 300))
            }
        },
        delay: function(e) {
            var t = parseInt(e, 10);
            t > 0 && (this.constructor.delay = t + 100)
        },
        value: function() {
            return this.spinning.value()
        },
        changed: function(e) {
            this.bindHandler("changed.spinner", e)
        },
        changing: function(e) {
            this.bindHandler("changing.spinner", e)
        },
        bindHandler: function(t, n) {
            e.isFunction(n) ? this.$spinning.on(t, n) : this.$spinning.off(t)
        },
        beginSpin: function(t) {
            this.spinInterval = setInterval(e.proxy(this.spinning.spin, this.spinning, t), 100)
        }
    }, e.fn.spinner = function(t, n) {
        return this.each(function() {
            var i = e(this),
                s = i.data("spinner");
            s || i.data("spinner", s = new r(i, e.extend({}, i.data(), t))), ("delay" === t || "changed" === t || "changing" === t) && s[t](n), "spin" === t && n && s.spinning.spin(n)
        })
    }, e(function() {
        e('[data-trigger="spinner"]').spinner()
    })
}(jQuery);
! function(e) {
    function t(e, t) {
        if (o[e]) {
            var r = n(this);
            return o[e].apply(r, t)
        }
        throw new Error("method '" + e + "()' does not exist for slider.")
    }

    function n(t) {
        var n = e(t).data("slider");
        if (n && n instanceof s) return n;
        throw new Error(i.callingContextNotSliderInstance)
    }

    function r(t) {
        var n = e(this),
            r = n.data("slider"),
            i = "object" == typeof t && t;
        return r || n.data("slider", r = new s(this, e.extend({}, e.fn.slider.defaults, i))), n
    }
    var i = {
            formatInvalidInputErrorMsg: function(e) {
                return "Invalid input value '" + e + "' passed in"
            },
            callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
        },
        s = function(t, n) {
            var r = this.element = e(t).hide(),
                i = r.outerWidth(),
                s = !1,
                o = this.element.parent();
            o.hasClass("slider") === !0 ? (s = !0, this.picker = o) : this.picker = e('<div class="slider"><div class="slider-track"><div class="slider-selection"></div><div class="slider-handle"></div><div class="slider-handle"></div></div><div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div></div>').insertBefore(this.element).append(this.element), this.id = this.element.data("slider-id") || n.id, this.id && (this.picker[0].id = this.id), "undefined" != typeof Modernizr && Modernizr.touch && (this.touchCapable = !0);
            var u = this.element.data("slider-tooltip") || n.tooltip;
            switch (this.tooltip = this.picker.find(".tooltip"), this.tooltipInner = this.tooltip.find("div.tooltip-inner"), this.orientation = this.element.data("slider-orientation") || n.orientation, this.orientation) {
                case "vertical":
                    this.picker.addClass("slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight", this.tooltip.addClass("right")[0].style.left = "100%";
                    break;
                default:
                    this.picker.addClass("slider-horizontal").css("width", i), this.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth", this.tooltip.addClass("top")[0].style.top = -this.tooltip.outerHeight() - 14 + "px"
            }["min", "max", "step", "value"].forEach(function(e) {
                this[e] = "undefined" != typeof r.data("slider-" + e) ? r.data("slider-" + e) : "undefined" != typeof n[e] ? n[e] : "undefined" != typeof r.prop(e) ? r.prop(e) : 0
            }, this), this.value instanceof Array && (this.range = !0), this.selection = this.element.data("slider-selection") || n.selection, this.selectionEl = this.picker.find(".slider-selection"), "none" === this.selection && this.selectionEl.addClass("hide"), this.selectionElStyle = this.selectionEl[0].style, this.handle1 = this.picker.find(".slider-handle:first"), this.handle1Stype = this.handle1[0].style, this.handle2 = this.picker.find(".slider-handle:last"), this.handle2Stype = this.handle2[0].style;
            var f = this.element.data("slider-handle") || n.handle;
            switch (f) {
                case "round":
                    this.handle1.addClass("round"), this.handle2.addClass("round");
                    break;
                case "triangle":
                    this.handle1.addClass("triangle"), this.handle2.addClass("triangle")
            }
            if (this.range ? (this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = [Math.max(this.min, Math.min(this.max, this.value))], this.handle2.addClass("hide"), this.value[1] = "after" === this.selection ? this.max : this.min), this.diff = this.max - this.min, this.percentage = [100 * (this.value[0] - this.min) / this.diff, 100 * (this.value[1] - this.min) / this.diff, 100 * this.step / this.diff], this.offset = this.picker.offset(), this.size = this.picker[0][this.sizePos], this.formater = n.formater, this.reversed = this.element.data("slider-reversed") || n.reversed, this.layout(), this.touchCapable ? this.picker.on({
                    touchstart: e.proxy(this.mousedown, this)
                }) : this.picker.on({
                    mousedown: e.proxy(this.mousedown, this)
                }), "hide" === u ? this.tooltip.addClass("hide") : "always" === u ? (this.showTooltip(), this.alwaysShowTooltip = !0) : this.picker.on({
                    mouseenter: e.proxy(this.showTooltip, this),
                    mouseleave: e.proxy(this.hideTooltip, this)
                }), s === !0) {
                var l = this.getValue(),
                    c = this.calculateValue();
                this.element.trigger({
                    type: "slide",
                    value: c
                }).data("value", c).prop("value", c), l !== c && this.element.trigger({
                    type: "slideChange",
                    "new": c,
                    old: l
                }).data("value", c).prop("value", c)
            }
            this.enabled = n.enabled && (void 0 === this.element.data("slider-enabled") || this.element.data("slider-enabled") === !0), this.enabled || this.disable()
        };
    s.prototype = {
        constructor: s,
        over: !1,
        inDrag: !1,
        showTooltip: function() {
            this.tooltip.addClass("in"), this.over = !0
        },
        hideTooltip: function() {
            this.inDrag === !1 && this.alwaysShowTooltip !== !0 && this.tooltip.removeClass("in"), this.over = !1
        },
        layout: function() {
            var e;
            e = this.reversed ? [100 - this.percentage[0], this.percentage[1]] : [this.percentage[0], this.percentage[1]], this.handle1Stype[this.stylePos] = e[0] + "%", this.handle2Stype[this.stylePos] = e[1] + "%", "vertical" === this.orientation ? (this.selectionElStyle.top = Math.min(e[0], e[1]) + "%", this.selectionElStyle.height = Math.abs(e[0] - e[1]) + "%") : (this.selectionElStyle.left = Math.min(e[0], e[1]) + "%", this.selectionElStyle.width = Math.abs(e[0] - e[1]) + "%"), this.range ? (this.tooltipInner.text(this.formater(this.value[0]) + " : " + this.formater(this.value[1])), this.tooltip[0].style[this.stylePos] = this.size * (e[0] + (e[1] - e[0]) / 2) / 100 - ("vertical" === this.orientation ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px") : (this.tooltipInner.text(this.formater(this.value[0])), this.tooltip[0].style[this.stylePos] = this.size * e[0] / 100 - ("vertical" === this.orientation ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px")
        },
        mousedown: function(t) {
            if (!this.isEnabled()) return !1;
            this.touchCapable && "touchstart" === t.type && (t = t.originalEvent), this.offset = this.picker.offset(), this.size = this.picker[0][this.sizePos];
            var n = this.getPercentage(t);
            if (this.range) {
                var r = Math.abs(this.percentage[0] - n),
                    i = Math.abs(this.percentage[1] - n);
                this.dragged = i > r ? 0 : 1
            } else this.dragged = 0;
            this.percentage[this.dragged] = this.reversed ? 100 - n : n, this.layout(), this.touchCapable ? e(document).on({
                touchmove: e.proxy(this.mousemove, this),
                touchend: e.proxy(this.mouseup, this)
            }) : e(document).on({
                mousemove: e.proxy(this.mousemove, this),
                mouseup: e.proxy(this.mouseup, this)
            }), this.inDrag = !0;
            var s = this.calculateValue();
            return this.setValue(s), this.element.trigger({
                type: "slideStart",
                value: s
            }).trigger({
                type: "slide",
                value: s
            }), !1
        },
        mousemove: function(e) {
            if (!this.isEnabled()) return !1;
            this.touchCapable && "touchmove" === e.type && (e = e.originalEvent);
            var t = this.getPercentage(e);
            this.range && (0 === this.dragged && this.percentage[1] < t ? (this.percentage[0] = this.percentage[1], this.dragged = 1) : 1 === this.dragged && this.percentage[0] > t && (this.percentage[1] = this.percentage[0], this.dragged = 0)), this.percentage[this.dragged] = this.reversed ? 100 - t : t, this.layout();
            var n = this.calculateValue();
            return this.setValue(n), this.element.trigger({
                type: "slide",
                value: n
            }).data("value", n).prop("value", n), !1
        },
        mouseup: function() {
            if (!this.isEnabled()) return !1;
            this.touchCapable ? e(document).off({
                touchmove: this.mousemove,
                touchend: this.mouseup
            }) : e(document).off({
                mousemove: this.mousemove,
                mouseup: this.mouseup
            }), this.inDrag = !1, this.over === !1 && this.hideTooltip();
            var t = this.calculateValue();
            return this.layout(), this.element.data("value", t).prop("value", t).trigger({
                type: "slideStop",
                value: t
            }), !1
        },
        calculateValue: function() {
            var e;
            return this.range ? (e = [Math.max(this.min, this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step), Math.min(this.max, this.min + Math.round(this.diff * this.percentage[1] / 100 / this.step) * this.step)], this.value = e) : (e = this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step, e < this.min ? e = this.min : e > this.max && (e = this.max), e = parseFloat(e), this.value = [e, this.value[1]]), e
        },
        getPercentage: function(e) {
            this.touchCapable && (e = e.touches[0]);
            var t = 100 * (e[this.mousePos] - this.offset[this.stylePos]) / this.size;
            return t = Math.round(t / this.percentage[2]) * this.percentage[2], Math.max(0, Math.min(100, t))
        },
        getValue: function() {
            return this.range ? this.value : this.value[0]
        },
        setValue: function(e) {
            this.value = this.validateInputValue(e), this.range ? (this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = [Math.max(this.min, Math.min(this.max, this.value))], this.handle2.addClass("hide"), this.value[1] = "after" === this.selection ? this.max : this.min), this.diff = this.max - this.min, this.percentage = [100 * (this.value[0] - this.min) / this.diff, 100 * (this.value[1] - this.min) / this.diff, 100 * this.step / this.diff], this.layout()
        },
        validateInputValue: function(e) {
            if ("number" == typeof e) return e;
            if (e instanceof Array) return e.forEach(function(e) {
                if ("number" != typeof e) throw new Error(i.formatInvalidInputErrorMsg(e))
            }), e;
            throw new Error(i.formatInvalidInputErrorMsg(e))
        },
        destroy: function() {
            this.element.show().insertBefore(this.picker), this.picker.remove(), e(this.element).removeData("slider"), e(this.element).off()
        },
        disable: function() {
            this.enabled = !1, this.picker.addClass("slider-disabled"), this.element.trigger("slideDisabled")
        },
        enable: function() {
            this.enabled = !0, this.picker.removeClass("slider-disabled"), this.element.trigger("slideEnabled")
        },
        toggle: function() {
            this.enabled ? this.disable() : this.enable()
        },
        isEnabled: function() {
            return this.enabled
        }
    };
    var o = {
        getValue: s.prototype.getValue,
        setValue: s.prototype.setValue,
        destroy: s.prototype.destroy,
        disable: s.prototype.disable,
        enable: s.prototype.enable,
        toggle: s.prototype.toggle,
        isEnabled: s.prototype.isEnabled
    };
    e.fn.slider = function(e) {
        if ("string" == typeof e) {
            var n = Array.prototype.slice.call(arguments, 1);
            return t.call(this, e, n)
        }
        return r.call(this, e)
    }, e.fn.slider.defaults = {
        min: 0,
        max: 10,
        step: 1,
        orientation: "horizontal",
        value: 5,
        selection: "before",
        tooltip: "show",
        handle: "round",
        reversed: !1,
        enabled: !0,
        formater: function(e) {
            return e
        }
    }, e.fn.slider.Constructor = s
}(window.jQuery);
! function(e, t) {
    function n(e, t) {
        d(e).push(t)
    }

    function r(r, i, s) {
        var o = r.children(i.headerTag),
            u = r.children(i.bodyTag);
        o.length > u.length ? z(G, "contents") : o.length < u.length && z(G, "titles");
        var a = i.startIndex;
        if (s.stepCount = o.length, i.saveState && e.cookie) {
            var f = e.cookie(V + m(r)),
                l = parseInt(f, 0);
            !isNaN(l) && l < s.stepCount && (a = l)
        }
        s.currentIndex = a, o.each(function(i) {
            var s = e(this),
                o = u.eq(i),
                a = o.data("mode"),
                f = null == a ? Y.html : g(Y, /^\s*$/.test(a) || isNaN(a) ? a : parseInt(a, 0)),
                l = f === Y.html || o.data("url") === t ? "" : o.data("url"),
                c = f !== Y.html && "1" === o.data("loaded"),
                h = e.extend({}, tt, {
                    title: s.html(),
                    content: f === Y.html ? o.html() : "",
                    contentUrl: l,
                    contentMode: f,
                    contentLoaded: c
                });
            n(r, h)
        })
    }

    function i(e) {
        e.triggerHandler("canceled")
    }

    function s(e, t) {
        return e.currentIndex - t
    }

    function o(t, n) {
        var r = a(t);
        t.unbind(r).removeData("uid").removeData("options").removeData("state").removeData("steps").removeData("eventNamespace").find(".actions a").unbind(r), t.removeClass(n.clearFixCssClass + " vertical");
        var i = t.find(".content > *");
        i.removeData("loaded").removeData("mode").removeData("url"), i.removeAttr("id").removeAttr("role").removeAttr("tabindex").removeAttr("class").removeAttr("style")._removeAria("labelledby")._removeAria("hidden"), t.find(".content > [data-mode='async'],.content > [data-mode='iframe']").empty();
        var s = e('<{0} class="{1}"></{0}>'.format(t.get(0).tagName, t.attr("class"))),
            o = t._id();
        return null != o && "" !== o && s._id(o), s.html(t.find(".content").html()), t.after(s), t.remove(), s
    }

    function u(e, t) {
        var n = e.find(".steps li").eq(t.currentIndex);
        e.triggerHandler("finishing", [t.currentIndex]) ? (n.addClass("done").removeClass("error"), e.triggerHandler("finished", [t.currentIndex])) : n.addClass("error")
    }

    function a(e) {
        var t = e.data("eventNamespace");
        return null == t && (t = "." + m(e), e.data("eventNamespace", t)), t
    }

    function f(e, t) {
        var n = m(e);
        return e.find("#" + n + $ + t)
    }

    function l(e, t) {
        var n = m(e);
        return e.find("#" + n + J + t)
    }

    function c(e, t) {
        var n = m(e);
        return e.find("#" + n + K + t)
    }

    function h(e) {
        return e.data("options")
    }

    function p(e) {
        return e.data("state")
    }

    function d(e) {
        return e.data("steps")
    }

    function v(e, t) {
        var n = d(e);
        return (0 > t || t >= n.length) && z(Q), n[t]
    }

    function m(e) {
        var t = e.data("uid");
        return null == t && (t = e._id(), null == t && (t = "steps-uid-".concat(X), e._id(t)), X++, e.data("uid", t)), t
    }

    function g(e, n) {
        if (W("enumType", e), W("keyOrValue", n), "string" == typeof n) {
            var r = e[n];
            return r === t && z("The enum key '{0}' does not exist.", n), r
        }
        if ("number" == typeof n) {
            for (var i in e)
                if (e[i] === n) return n;
            z("Invalid enum value '{0}'.", n)
        } else z("Invalid key or value type.")
    }

    function y(e, t, n) {
        return k(e, t, n, E(n, 1))
    }

    function b(e, t, n) {
        return k(e, t, n, s(n, 1))
    }

    function w(e, t, n, r) {
        if ((0 > r || r >= n.stepCount) && z(Q), !(t.forceMoveForward && r < n.currentIndex)) {
            var i = n.currentIndex;
            return e.triggerHandler("stepChanging", [n.currentIndex, r]) ? (n.currentIndex = r, q(e, t, n), O(e, t, n, i), A(e, t, n), C(e, t, n), R(e, t, n, r, i), e.triggerHandler("stepChanged", [r, i])) : e.find(".steps li").eq(i).addClass("error"), !0
        }
    }

    function E(e, t) {
        return e.currentIndex + t
    }

    function S(t) {
        var n = e.extend(!0, {}, nt, t);
        return this.each(function() {
            var t = e(this),
                i = {
                    currentIndex: n.startIndex,
                    currentStep: null,
                    stepCount: 0,
                    transitionElement: null
                };
            t.data("options", n), t.data("state", i), t.data("steps", []), r(t, n, i), H(t, n, i), _(t, n), n.autoFocus && 0 === X && f(t, n.startIndex).focus()
        })
    }

    function x(t, n, r, i, s) {
        (0 > i || i > r.stepCount) && z(Q), s = e.extend({}, tt, s), T(t, i, s), r.currentIndex !== r.stepCount && r.currentIndex >= i && (r.currentIndex++, q(t, n, r)), r.stepCount++;
        var o = t.find(".content"),
            u = e("<{0}>{1}</{0}>".format(n.headerTag, s.title)),
            a = e("<{0}></{0}>".format(n.bodyTag));
        return (null == s.contentMode || s.contentMode === Y.html) && a.html(s.content), 0 === i ? o.prepend(a).prepend(u) : l(t, i - 1).after(a).after(u), B(t, r, a, i), I(t, n, r, u, i), M(t, n, r, i), i === r.currentIndex && O(t, n, r), A(t, n, r), t
    }

    function T(e, t, n) {
        d(e).splice(t, 0, n)
    }

    function N(t) {
        var n = e(this),
            r = h(n),
            i = p(n);
        if (r.suppressPaginationOnFocus && n.find(":focus").is(":input")) return t.preventDefault(), !1;
        var s = {
            left: 37,
            right: 39
        };
        t.keyCode === s.left ? (t.preventDefault(), b(n, r, i)) : t.keyCode === s.right && (t.preventDefault(), y(n, r, i))
    }

    function C(t, n, r) {
        if (r.stepCount > 0) {
            var i = v(t, r.currentIndex);
            if (!n.enableContentCache || !i.contentLoaded) switch (g(Y, i.contentMode)) {
                case Y.iframe:
                    t.find(".content > .body").eq(r.currentIndex).empty().html('<iframe src="' + i.contentUrl + '" frameborder="0" scrolling="no" />').data("loaded", "1");
                    break;
                case Y.async:
                    var s = l(t, r.currentIndex)._aria("busy", "true").empty().append(F(n.loadingTemplate, {
                        text: n.labels.loading
                    }));
                    e.ajax({
                        url: i.contentUrl,
                        cache: !1
                    }).done(function(e) {
                        s.empty().html(e)._aria("busy", "false").data("loaded", "1")
                    })
            }
        }
    }

    function k(e, t, n, r) {
        var i = n.currentIndex;
        if (r >= 0 && r < n.stepCount && !(t.forceMoveForward && r < n.currentIndex)) {
            var s = f(e, r),
                o = s.parent(),
                u = o.hasClass("disabled");
            return o._enableAria(), s.click(), i === n.currentIndex && u ? (o._enableAria(!1), !1) : !0
        }
        return !1
    }

    function L(t) {
        t.preventDefault();
        var n = e(this),
            r = n.parent().parent().parent().parent(),
            s = h(r),
            o = p(r),
            a = n.attr("href");
        switch (a.substring(a.lastIndexOf("#") + 1)) {
            case "cancel":
                i(r);
                break;
            case "finish":
                u(r, o);
                break;
            case "next":
                y(r, s, o);
                break;
            case "previous":
                b(r, s, o)
        }
    }

    function A(e, t, n) {
        if (t.enablePagination) {
            var r = e.find(".actions a[href$='#finish']").parent(),
                i = e.find(".actions a[href$='#next']").parent();
            if (!t.forceMoveForward) {
                var s = e.find(".actions a[href$='#previous']").parent();
                s._enableAria(n.currentIndex > 0)
            }
            t.enableFinishButton && t.showFinishButtonAlways ? (r._enableAria(n.stepCount > 0), i._enableAria(n.stepCount > 1 && n.stepCount > n.currentIndex + 1)) : (r._showAria(t.enableFinishButton && n.stepCount === n.currentIndex + 1), i._showAria(0 === n.stepCount || n.stepCount > n.currentIndex + 1)._enableAria(n.stepCount > n.currentIndex + 1 || !t.enableFinishButton))
        }
    }

    function O(t, n, r, i) {
        var s = f(t, r.currentIndex),
            o = e('<span class="current-info audible">' + n.labels.current + " </span>"),
            u = t.find(".content > .title");
        if (null != i) {
            var a = f(t, i);
            a.parent().addClass("done").removeClass("error")._selectAria(!1), u.eq(i).removeClass("current").next(".body").removeClass("current"), o = a.find(".current-info"), s.focus()
        }
        s.prepend(o).parent()._selectAria().removeClass("done")._enableAria(), u.eq(r.currentIndex).addClass("current").next(".body").addClass("current")
    }

    function M(e, t, n, r) {
        for (var i = m(e), s = r; s < n.stepCount; s++) {
            var o = i + $ + s,
                u = i + J + s,
                a = i + K + s,
                f = e.find(".title").eq(s)._id(a);
            e.find(".steps a").eq(s)._id(o)._aria("controls", u).attr("href", "#" + a).html(F(t.titleTemplate, {
                index: s + 1,
                title: f.html()
            })), e.find(".body").eq(s)._id(u)._aria("labelledby", a)
        }
    }

    function _(e, t) {
        var n = a(e);
        e.bind("canceled" + n, t.onCanceled), e.bind("finishing" + n, t.onFinishing), e.bind("finished" + n, t.onFinished), e.bind("stepChanging" + n, t.onStepChanging), e.bind("stepChanged" + n, t.onStepChanged), t.enableKeyNavigation && e.bind("keyup" + n, N), e.find(".actions a").bind("click" + n, L)
    }

    function D(e, t, n, r) {
        return 0 > r || r >= n.stepCount || n.currentIndex === r ? !1 : (P(e, r), n.currentIndex > r && (n.currentIndex--, q(e, t, n)), n.stepCount--, c(e, r).remove(), l(e, r).remove(), f(e, r).parent().remove(), 0 === r && e.find(".steps li").first().addClass("first"), r === n.stepCount && e.find(".steps li").eq(r).addClass("last"), M(e, t, n, r), A(e, t, n), !0)
    }

    function P(e, t) {
        d(e).splice(t, 1)
    }

    function H(t, n, r) {
        var i = '<{0} class="{1}">{2}</{0}>',
            s = g(Z, n.stepsOrientation),
            o = s === Z.vertical ? " vertical" : "",
            u = e(i.format(n.contentContainerTag, "content " + n.clearFixCssClass, t.html())),
            a = e(i.format(n.stepsContainerTag, "steps " + n.clearFixCssClass, '<ul role="tablist"></ul>')),
            f = u.children(n.headerTag),
            l = u.children(n.bodyTag);
        t.attr("role", "application").empty().append(a).append(u).addClass(n.cssClass + " " + n.clearFixCssClass + o), l.each(function(n) {
            B(t, r, e(this), n)
        }), f.each(function(i) {
            I(t, n, r, e(this), i)
        }), O(t, n, r), j(t, n, r)
    }

    function B(e, t, n, r) {
        var i = m(e),
            s = i + J + r,
            o = i + K + r;
        n._id(s).attr("role", "tabpanel")._aria("labelledby", o).addClass("body")._showAria(t.currentIndex === r)
    }

    function j(e, t, n) {
        if (t.enablePagination) {
            var r = '<{0} class="actions {1}"><ul role="menu" aria-label="{2}">{3}</ul></{0}>',
                i = '<li><a href="#{0}" role="menuitem">{1}</a></li>',
                s = "";
            t.forceMoveForward || (s += i.format("previous", t.labels.previous)), s += i.format("next", t.labels.next), t.enableFinishButton && (s += i.format("finish", t.labels.finish)), t.enableCancelButton && (s += i.format("cancel", t.labels.cancel)), e.append(r.format(t.actionContainerTag, t.clearFixCssClass, t.labels.pagination, s)), A(e, t, n), C(e, t, n)
        }
    }

    function F(e, n) {
        for (var r = e.match(/#([a-z]*)#/gi), i = 0; i < r.length; i++) {
            var s = r[i],
                o = s.substring(1, s.length - 1);
            n[o] === t && z("The key '{0}' does not exist in the substitute collection!", o), e = e.replace(s, n[o])
        }
        return e
    }

    function I(t, n, r, i, s) {
        var o = m(t),
            u = o + $ + s,
            f = o + J + s,
            l = o + K + s,
            c = t.find(".steps > ul"),
            h = F(n.titleTemplate, {
                index: s + 1,
                title: i.html()
            }),
            p = e('<li role="tab"><a id="' + u + '" href="#' + l + '" aria-controls="' + f + '">' + h + "</a></li>");
        p._enableAria(n.enableAllSteps || r.currentIndex > s), r.currentIndex > s && p.addClass("done"), i._id(l).attr("tabindex", "-1").addClass("title"), 0 === s ? c.prepend(p) : c.find("li").eq(s - 1).after(p), 0 === s && c.find("li").removeClass("first").eq(s).addClass("first"), s === r.stepCount - 1 && c.find("li").removeClass("last").eq(s).addClass("last"), p.children("a").bind("click" + a(t), U)
    }

    function q(t, n, r) {
        n.saveState && e.cookie && e.cookie(V + m(t), r.currentIndex)
    }

    function R(t, n, r, i, s) {
        var o = t.find(".content > .body"),
            u = g(et, n.transitionEffect),
            a = n.transitionEffectSpeed,
            f = o.eq(i),
            l = o.eq(s);
        switch (u) {
            case et.fade:
            case et.slide:
                var c = u === et.fade ? "fadeOut" : "slideUp",
                    h = u === et.fade ? "fadeIn" : "slideDown";
                r.transitionElement = f, l[c](a, function() {
                    var t = e(this)._showAria(!1).parent().parent(),
                        n = p(t);
                    n.transitionElement && (n.transitionElement[h](a, function() {
                        e(this)._showAria()
                    }), n.transitionElement = null)
                }).promise();
                break;
            case et.slideLeft:
                var d = l.outerWidth(!0),
                    v = i > s ? -d : d,
                    m = i > s ? d : -d;
                l.animate({
                    left: v
                }, a, function() {
                    e(this)._showAria(!1)
                }).promise(), f.css("left", m + "px")._showAria().animate({
                    left: 0
                }, a).promise();
                break;
            default:
                l._showAria(!1), f._showAria()
        }
    }

    function U(t) {
        t.preventDefault();
        var n = e(this),
            r = n.parent().parent().parent().parent(),
            i = h(r),
            s = p(r),
            o = s.currentIndex;
        if (n.parent().is(":not(.disabled):not(.current)")) {
            var u = n.attr("href"),
                a = parseInt(u.substring(u.lastIndexOf("-") + 1), 0);
            w(r, i, s, a)
        }
        return o === s.currentIndex ? (f(r, o).focus(), !1) : void 0
    }

    function z(e) {
        throw arguments.length > 1 && (e = e.format(Array.prototype.slice.call(arguments, 1))), new Error(e)
    }

    function W(e, t) {
        null == t && z("The argument '{0}' is null or undefined.", e)
    }
    e.fn.extend({
        _aria: function(e, t) {
            return this.attr("aria-" + e, t)
        },
        _removeAria: function(e) {
            return this.removeAttr("aria-" + e)
        },
        _enableAria: function(e) {
            return null == e || e ? this.removeClass("disabled")._aria("disabled", "false") : this.addClass("disabled")._aria("disabled", "true")
        },
        _showAria: function(e) {
            return null == e || e ? this.show()._aria("hidden", "false") : this.hide()._aria("hidden", "true")
        },
        _selectAria: function(e) {
            return null == e || e ? this.addClass("current")._aria("selected", "true") : this.removeClass("current")._aria("selected", "false")
        },
        _id: function(e) {
            return e ? this.attr("id", e) : this.attr("id")
        }
    }), String.prototype.format || (String.prototype.format = function() {
        for (var t = 1 === arguments.length && e.isArray(arguments[0]) ? arguments[0] : arguments, n = this, r = 0; r < t.length; r++) {
            var i = new RegExp("\\{" + r + "\\}", "gm");
            n = n.replace(i, t[r])
        }
        return n
    });
    var X = 0,
        V = "jQu3ry_5teps_St@te_",
        $ = "-t-",
        J = "-p-",
        K = "-h-",
        Q = "Index out of range.",
        G = "One or more corresponding step {0} are missing.";
    e.fn.steps = function(t) {
        return e.fn.steps[t] ? e.fn.steps[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist on jQuery.steps") : S.apply(this, arguments)
    }, e.fn.steps.add = function(e) {
        var t = p(this);
        return x(this, h(this), t, t.stepCount, e)
    }, e.fn.steps.destroy = function() {
        return o(this, h(this))
    }, e.fn.steps.finish = function() {
        u(this, p(this))
    }, e.fn.steps.getCurrentIndex = function() {
        return p(this).currentIndex
    }, e.fn.steps.getCurrentStep = function() {
        return v(this, p(this).currentIndex)
    }, e.fn.steps.getStep = function(e) {
        return v(this, e)
    }, e.fn.steps.insert = function(e, t) {
        return x(this, h(this), p(this), e, t)
    }, e.fn.steps.next = function() {
        return y(this, h(this), p(this))
    }, e.fn.steps.previous = function() {
        return b(this, h(this), p(this))
    }, e.fn.steps.remove = function(e) {
        return D(this, h(this), p(this), e)
    }, e.fn.steps.setStep = function() {
        throw new Error("Not yet implemented!")
    }, e.fn.steps.skip = function() {
        throw new Error("Not yet implemented!")
    };
    var Y = e.fn.steps.contentMode = {
            html: 0,
            iframe: 1,
            async: 2
        },
        Z = e.fn.steps.stepsOrientation = {
            horizontal: 0,
            vertical: 1
        },
        et = e.fn.steps.transitionEffect = {
            none: 0,
            fade: 1,
            slide: 2,
            slideLeft: 3
        },
        tt = e.fn.steps.stepModel = {
            title: "",
            content: "",
            contentUrl: "",
            contentMode: Y.html,
            contentLoaded: !1
        },
        nt = e.fn.steps.defaults = {
            headerTag: "h1",
            bodyTag: "div",
            contentContainerTag: "div",
            actionContainerTag: "div",
            stepsContainerTag: "div",
            cssClass: "wizard",
            clearFixCssClass: "clearfix",
            stepsOrientation: Z.horizontal,
            titleTemplate: '<span class="number">#index#.</span> #title#',
            loadingTemplate: '<span class="spinner"></span> #text#',
            autoFocus: !1,
            enableAllSteps: !1,
            enableKeyNavigation: !0,
            enablePagination: !0,
            suppressPaginationOnFocus: !0,
            enableContentCache: !0,
            enableCancelButton: !1,
            enableFinishButton: !0,
            preloadContent: !1,
            showFinishButtonAlways: !1,
            forceMoveForward: !1,
            saveState: !1,
            startIndex: 0,
            transitionEffect: et.none,
            transitionEffectSpeed: 200,
            onStepChanging: function() {
                return !0
            },
            onStepChanged: function() {},
            onCanceled: function() {},
            onFinishing: function() {
                return !0
            },
            onFinished: function() {},
            labels: {
                cancel: "Cancel",
                current: "current step:",
                pagination: "Pagination",
                finish: "Finish",
                next: "Next",
                previous: "Previous",
                loading: "Loading ..."
            }
        }
}(jQuery);
! function(e) {
    e(["jquery"], function(e) {
        return function() {
            function t(e, t, n) {
                return v({
                    type: E.error,
                    iconClass: m().iconClasses.error,
                    message: e,
                    optionsOverride: n,
                    title: t
                })
            }

            function n(t, n) {
                return t || (t = m()), y = e("#" + t.containerId), y.length ? y : (n && (y = h(t)), y)
            }

            function r(e, t, n) {
                return v({
                    type: E.info,
                    iconClass: m().iconClasses.info,
                    message: e,
                    optionsOverride: n,
                    title: t
                })
            }

            function i(e) {
                b = e
            }

            function s(e, t, n) {
                return v({
                    type: E.success,
                    iconClass: m().iconClasses.success,
                    message: e,
                    optionsOverride: n,
                    title: t
                })
            }

            function o(e, t, n) {
                return v({
                    type: E.warning,
                    iconClass: m().iconClasses.warning,
                    message: e,
                    optionsOverride: n,
                    title: t
                })
            }

            function u(e) {
                var t = m();
                y || n(t), c(e, t) || l(t)
            }

            function f(t) {
                var r = m();
                return y || n(r), t && 0 === e(":focus", t).length ? void g(t) : void(y.children().length && y.remove())
            }

            function l(t) {
                for (var n = y.children(), r = n.length - 1; r >= 0; r--) c(e(n[r]), t)
            }

            function c(t, n) {
                return t && 0 === e(":focus", t).length ? (t[n.hideMethod]({
                    duration: n.hideDuration,
                    easing: n.hideEasing,
                    complete: function() {
                        g(t)
                    }
                }), !0) : !1
            }

            function h(t) {
                return y = e("<div/>").attr("id", t.containerId).addClass(t.positionClass).attr("aria-live", "polite").attr("role", "alert"), y.appendTo(e(t.target)), y
            }

            function p() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: void 0,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: void 0,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    },
                    iconClass: "toast-info",
                    positionClass: "toast-top-right",
                    timeOut: 5e3,
                    titleClass: "toast-title",
                    messageClass: "toast-message",
                    target: "body",
                    closeHtml: "<button>&times;</button>",
                    newestOnTop: !0
                }
            }

            function d(e) {
                b && b(e)
            }

            function v(t) {
                function r(t) {
                    return !e(":focus", l).length || t ? l[o.hideMethod]({
                        duration: o.hideDuration,
                        easing: o.hideEasing,
                        complete: function() {
                            g(l), o.onHidden && "hidden" !== v.state && o.onHidden(), v.state = "hidden", v.endTime = new Date, d(v)
                        }
                    }) : void 0
                }

                function i() {
                    (o.timeOut > 0 || o.extendedTimeOut > 0) && (f = setTimeout(r, o.extendedTimeOut))
                }

                function s() {
                    clearTimeout(f), l.stop(!0, !0)[o.showMethod]({
                        duration: o.showDuration,
                        easing: o.showEasing
                    })
                }
                var o = m(),
                    u = t.iconClass || o.iconClass;
                "undefined" != typeof t.optionsOverride && (o = e.extend(o, t.optionsOverride), u = t.optionsOverride.iconClass || u), w++, y = n(o, !0);
                var f = null,
                    l = e("<div/>"),
                    c = e("<div/>"),
                    h = e("<div/>"),
                    p = e(o.closeHtml),
                    v = {
                        toastId: w,
                        state: "visible",
                        startTime: new Date,
                        options: o,
                        map: t
                    };
                return t.iconClass && l.addClass(o.toastClass).addClass(u), t.title && (c.append(t.title).addClass(o.titleClass), l.append(c)), t.message && (h.append(t.message).addClass(o.messageClass), l.append(h)), o.closeButton && (p.addClass("toast-close-button").attr("role", "button"), l.prepend(p)), l.hide(), o.newestOnTop ? y.prepend(l) : y.append(l), l[o.showMethod]({
                    duration: o.showDuration,
                    easing: o.showEasing,
                    complete: o.onShown
                }), o.timeOut > 0 && (f = setTimeout(r, o.timeOut)), l.hover(s, i), !o.onclick && o.tapToDismiss && l.click(r), o.closeButton && p && p.click(function(e) {
                    e.stopPropagation ? e.stopPropagation() : void 0 !== e.cancelBubble && e.cancelBubble !== !0 && (e.cancelBubble = !0), r(!0)
                }), o.onclick && l.click(function() {
                    o.onclick(), r()
                }), d(v), o.debug && console && console.log(v), l
            }

            function m() {
                return e.extend({}, p(), S.options)
            }

            function g(e) {
                y || (y = n()), e.is(":visible") || (e.remove(), e = null, 0 === y.children().length && y.remove())
            }
            var y, b, w = 0,
                E = {
                    error: "error",
                    info: "info",
                    success: "success",
                    warning: "warning"
                },
                S = {
                    clear: u,
                    remove: f,
                    error: t,
                    getContainer: n,
                    info: r,
                    options: {},
                    subscribe: i,
                    success: s,
                    version: "2.0.3",
                    warning: o
                };
            return S
        }()
    })
}("function" == typeof define && define.amd ? define : function(e, t) {
    "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : window.toastr = t(window.jQuery)
});
(function(e) {
    e.fn.bootstrapFileInput = function() {
        this.each(function(t, n) {
            var r = e(n);
            if (typeof r.attr("data-bfi-disabled") != "undefined") {
                return
            }
            var i = "Browse";
            if (typeof r.attr("title") != "undefined") {
                i = r.attr("title")
            }
            var s = "";
            if (!!r.attr("class")) {
                s = " " + r.attr("class")
            }
            r.wrap('<a class="file-input-wrapper btn btn-default ' + s + '"></a>').parent().prepend(e("<span></span>").html(i))
        }).promise().done(function() {
            e(".file-input-wrapper").mousemove(function(t) {
                var n, r, i, s, o, u, a, f;
                r = e(this);
                n = r.find("input");
                i = r.offset().left;
                s = r.offset().top;
                o = n.width();
                u = n.height();
                a = t.pageX;
                f = t.pageY;
                moveInputX = a - i - o + 20;
                moveInputY = f - s - u / 2;
                n.css({
                    left: moveInputX,
                    top: moveInputY
                })
            });
            e("body").on("change", ".file-input-wrapper input[type=file]", function() {
                var t;
                t = e(this).val();
                e(this).parent().next(".file-input-name").remove();
                if (!!e(this).prop("files") && e(this).prop("files").length > 1) {
                    t = e(this)[0].files.length + " files"
                } else {
                    t = t.substring(t.lastIndexOf("\\") + 1, t.length)
                }
                var n = e(this).data("filename-placement") || "outside";
                if (n === "inside") {
                    e(this).siblings("span").html(t);
                    e(this).attr("title", t)
                } else if (n === "outside") {
                    e(this).parent().after('<span class="file-input-name">' + t + "</span>")
                } else {
                    console.log("Error in bootstrap-file-input plugin : unknown placement [" + n + "] for selected filename")
                }
            })
        })
    };
    var t = "<style>" + ".file-input-wrapper { overflow: hidden; position: relative; cursor: pointer; z-index: 1; }" + ".file-input-wrapper input[type=file], .file-input-wrapper input[type=file]:focus, .file-input-wrapper input[type=file]:hover { position: absolute; top: 0; left: 0; cursor: pointer; opacity: 0; filter: alpha(opacity=0); z-index: 99; outline: 0; }" + ".file-input-name { margin-left: 8px; }" + "</style>";
    e("link[rel=stylesheet]").eq(0).before(t)
})(jQuery);
(function(e) {
    jQuery.fn.extend({
        slimScroll: function(n) {
            var r = e.extend({
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: .4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: .2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            }, n);
            this.each(function() {
                function i(t) {
                    if (p) {
                        t = t || window.event;
                        var n = 0;
                        t.wheelDelta && (n = -t.wheelDelta / 120);
                        t.detail && (n = t.detail / 3);
                        e(t.target || t.srcTarget || t.srcElement).closest("." + r.wrapperClass).is(x.parent()) && s(n, !0);
                        t.preventDefault && !S && t.preventDefault();
                        S || (t.returnValue = !1)
                    }
                }

                function s(e, t, n) {
                    S = !1;
                    var i = e,
                        s = x.outerHeight() - N.outerHeight();
                    t && (i = parseInt(N.css("top")) + e * parseInt(r.wheelStep) / 100 * N.outerHeight(), i = Math.min(Math.max(i, 0), s), i = 0 < e ? Math.ceil(i) : Math.floor(i), N.css({
                        top: i + "px"
                    }));
                    b = parseInt(N.css("top")) / (x.outerHeight() - N.outerHeight());
                    i = b * (x[0].scrollHeight - x.outerHeight());
                    n && (i = e, e = i / x[0].scrollHeight * x.outerHeight(), e = Math.min(Math.max(e, 0), s), N.css({
                        top: e + "px"
                    }));
                    x.scrollTop(i);
                    x.trigger("slimscrolling", ~~i);
                    l();
                    c()
                }

                function o() {
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", i, !1), this.addEventListener("mousewheel", i, !1), this.addEventListener("MozMousePixelScroll", i, !1)) : document.attachEvent("onmousewheel", i)
                }

                function u() {
                    y = Math.max(x.outerHeight() / x[0].scrollHeight * x.outerHeight(), E);
                    N.css({
                        height: y + "px"
                    });
                    var e = y == x.outerHeight() ? "none" : "block";
                    N.css({
                        display: e
                    })
                }

                function l() {
                    u();
                    clearTimeout(m);
                    b == ~~b ? (S = r.allowPageScroll, w != b && x.trigger("slimscroll", 0 == ~~b ? "top" : "bottom")) : S = !1;
                    w = b;
                    y >= x.outerHeight() ? S = !0 : (N.stop(!0, !0).fadeIn("fast"), r.railVisible && C.stop(!0, !0).fadeIn("fast"))
                }

                function c() {
                    r.alwaysVisible || (m = setTimeout(function() {
                        r.disableFadeOut && p || d || v || (N.fadeOut("slow"), C.fadeOut("slow"))
                    }, 1e3))
                }
                var p, d, v, m, g, y, b, w, E = 30,
                    S = !1,
                    x = e(this);
                if (x.parent().hasClass(r.wrapperClass)) {
                    var T = x.scrollTop(),
                        N = x.parent().find("." + r.barClass),
                        C = x.parent().find("." + r.railClass);
                    u();
                    if (e.isPlainObject(n)) {
                        if ("height" in n && "auto" == n.height) {
                            x.parent().css("height", "auto");
                            x.css("height", "auto");
                            var k = x.parent().parent().height();
                            x.parent().css("height", k);
                            x.css("height", k)
                        }
                        if ("scrollTo" in n) T = parseInt(r.scrollTo);
                        else if ("scrollBy" in n) T += parseInt(r.scrollBy);
                        else if ("destroy" in n) {
                            N.remove();
                            C.remove();
                            x.unwrap();
                            return
                        }
                        s(T, !1, !0)
                    }
                } else {
                    r.height = "auto" == r.height ? x.parent().height() : r.height;
                    T = e("<div></div>").addClass(r.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: r.width,
                        height: r.height
                    });
                    x.css({
                        overflow: "hidden",
                        width: r.width,
                        height: r.height
                    });
                    var C = e("<div></div>").addClass(r.railClass).css({
                            width: r.size,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            display: r.alwaysVisible && r.railVisible ? "block" : "none",
                            "border-radius": r.railBorderRadius,
                            background: r.railColor,
                            opacity: r.railOpacity,
                            zIndex: 90
                        }),
                        N = e("<div></div>").addClass(r.barClass).css({
                            background: r.color,
                            width: r.size,
                            position: "absolute",
                            top: 0,
                            opacity: r.opacity,
                            display: r.alwaysVisible ? "block" : "none",
                            "border-radius": r.borderRadius,
                            BorderRadius: r.borderRadius,
                            MozBorderRadius: r.borderRadius,
                            WebkitBorderRadius: r.borderRadius,
                            zIndex: 99
                        }),
                        k = "right" == r.position ? {
                            right: r.distance
                        } : {
                            left: r.distance
                        };
                    C.css(k);
                    N.css(k);
                    x.wrap(T);
                    x.parent().append(N);
                    x.parent().append(C);
                    r.railDraggable && N.bind("mousedown", function(n) {
                        var r = e(document);
                        v = !0;
                        t = parseFloat(N.css("top"));
                        pageY = n.pageY;
                        r.bind("mousemove.slimscroll", function(e) {
                            currTop = t + e.pageY - pageY;
                            N.css("top", currTop);
                            s(0, N.position().top, !1)
                        });
                        r.bind("mouseup.slimscroll", function(e) {
                            v = !1;
                            c();
                            r.unbind(".slimscroll")
                        });
                        return !1
                    }).bind("selectstart.slimscroll", function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        return !1
                    });
                    C.hover(function() {
                        l()
                    }, function() {
                        c()
                    });
                    N.hover(function() {
                        d = !0
                    }, function() {
                        d = !1
                    });
                    x.hover(function() {
                        p = !0;
                        l();
                        c()
                    }, function() {
                        p = !1;
                        c()
                    });
                    x.bind("touchstart", function(e, t) {
                        e.originalEvent.touches.length && (g = e.originalEvent.touches[0].pageY)
                    });
                    x.bind("touchmove", function(e) {
                        S || e.originalEvent.preventDefault();
                        e.originalEvent.touches.length && (s((g - e.originalEvent.touches[0].pageY) / r.touchScrollStep, !0), g = e.originalEvent.touches[0].pageY)
                    });
                    u();
                    "bottom" === r.start ? (N.css({
                        top: x.outerHeight() - N.outerHeight()
                    }), s(0, !0)) : "top" !== r.start && (s(e(r.start).position().top, null, !0), r.alwaysVisible || N.hide());
                    o()
                }
            });
            return this
        }
    });
    jQuery.fn.extend({
        slimscroll: jQuery.fn.slimScroll
    })
})(jQuery);
var Holder = Holder || {};
(function(e, t) {
    function c(e, t, n) {
        t = parseInt(t, 10);
        e = parseInt(e, 10);
        var r = Math.max(t, e);
        var i = Math.min(t, e);
        var s = 1 / 12;
        var o = Math.min(i * .75, .75 * r * s);
        return {
            height: Math.round(Math.max(n.size, o))
        }
    }

    function d(e) {
        var t = [];
        for (p in e) {
            if (e.hasOwnProperty(p)) {
                t.push(p + ":" + e[p])
            }
        }
        return t.join(";")
    }

    function v(e) {
        var t = e.ctx,
            n = e.dimensions,
            r = e.template,
            i = e.ratio,
            s = e.holder,
            o = s.textmode == "literal",
            u = s.textmode == "exact";
        var a = c(n.width, n.height, r);
        var f = a.height;
        var l = n.width * i,
            h = n.height * i;
        var p = r.font ? r.font : "Arial,Helvetica,sans-serif";
        canvas.width = l;
        canvas.height = h;
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.fillStyle = r.background;
        t.fillRect(0, 0, l, h);
        t.fillStyle = r.foreground;
        t.font = "bold " + f + "px " + p;
        var d = r.text ? r.text : Math.floor(n.width) + "x" + Math.floor(n.height);
        if (o) {
            var n = s.dimensions;
            d = n.width + "x" + n.height
        } else if (u && s.exact_dimensions) {
            var n = s.exact_dimensions;
            d = Math.floor(n.width) + "x" + Math.floor(n.height)
        }
        var v = t.measureText(d).width;
        if (v / l >= .75) {
            f = Math.floor(f * .75 * (l / v))
        }
        t.font = "bold " + f * i + "px " + p;
        t.fillText(d, l / 2, h / 2, l);
        return canvas.toDataURL("image/png")
    }

    function m(e) {
        var t = e.dimensions,
            n = e.template,
            r = e.holder,
            i = r.textmode == "literal",
            s = r.textmode == "exact";
        var o = c(t.width, t.height, n);
        var u = o.height;
        var a = t.width,
            f = t.height;
        var l = n.font ? n.font : "Arial,Helvetica,sans-serif";
        var p = n.text ? n.text : Math.floor(t.width) + "x" + Math.floor(t.height);
        if (i) {
            var t = r.dimensions;
            p = t.width + "x" + t.height
        } else if (s && r.exact_dimensions) {
            var t = r.exact_dimensions;
            p = Math.floor(t.width) + "x" + Math.floor(t.height)
        }
        var d = h({
            text: p,
            width: a,
            height: f,
            text_height: u,
            font: l,
            template: n
        });
        return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(d)))
    }

    function g(e) {
        if (r.use_canvas && !r.use_svg) {
            return v(e)
        } else {
            return m(e)
        }
    }

    function y(e, t, n, i) {
        var s = n.dimensions,
            o = n.theme,
            l = n.text ? decodeURIComponent(n.text) : n.text;
        var c = s.width + "x" + s.height;
        o = l ? C(o, {
            text: l
        }) : o;
        o = n.font ? C(o, {
            font: n.font
        }) : o;
        t.setAttribute("data-src", i);
        n.theme = o;
        t.holder_data = n;
        if (e == "image") {
            t.setAttribute("alt", l ? l : o.text ? o.text + " [" + c + "]" : c);
            if (r.use_fallback || !n.auto) {
                t.style.width = s.width + "px";
                t.style.height = s.height + "px"
            }
            if (r.use_fallback) {
                t.style.backgroundColor = o.background
            } else {
                t.setAttribute("src", g({
                    ctx: a,
                    dimensions: s,
                    template: o,
                    ratio: f,
                    holder: n
                }));
                if (n.textmode && n.textmode == "exact") {
                    u.push(t);
                    E(t)
                }
            }
        } else if (e == "background") {
            if (!r.use_fallback) {
                t.style.backgroundImage = "url(" + g({
                    ctx: a,
                    dimensions: s,
                    template: o,
                    ratio: f,
                    holder: n
                }) + ")";
                t.style.backgroundSize = s.width + "px " + s.height + "px"
            }
        } else if (e == "fluid") {
            t.setAttribute("alt", l ? l : o.text ? o.text + " [" + c + "]" : c);
            if (s.height.slice(-1) == "%") {
                t.style.height = s.height
            } else if (n.auto == null || !n.auto) {
                t.style.height = s.height + "px"
            }
            if (s.width.slice(-1) == "%") {
                t.style.width = s.width
            } else if (n.auto == null || !n.auto) {
                t.style.width = s.width + "px"
            }
            if (t.style.display == "inline" || t.style.display === "" || t.style.display == "none") {
                t.style.display = "block"
            }
            w(t);
            if (r.use_fallback) {
                t.style.backgroundColor = o.background
            } else {
                u.push(t);
                E(t)
            }
        }
    }

    function b(e, t) {
        var n = {
            height: e.clientHeight,
            width: e.clientWidth
        };
        if (!n.height && !n.width) {
            e.setAttribute("data-holder-invisible", true);
            t.call(this, e)
        } else {
            e.removeAttribute("data-holder-invisible");
            return n
        }
    }

    function w(t) {
        if (t.holder_data) {
            var n = b(t, e.invisible_error_fn(w));
            if (n) {
                var r = t.holder_data;
                r.initial_dimensions = n;
                r.fluid_data = {
                    fluid_height: r.dimensions.height.slice(-1) == "%",
                    fluid_width: r.dimensions.width.slice(-1) == "%",
                    mode: null
                };
                if (r.fluid_data.fluid_width && !r.fluid_data.fluid_height) {
                    r.fluid_data.mode = "width";
                    r.fluid_data.ratio = r.initial_dimensions.width / parseFloat(r.dimensions.height)
                } else if (!r.fluid_data.fluid_width && r.fluid_data.fluid_height) {
                    r.fluid_data.mode = "height";
                    r.fluid_data.ratio = parseFloat(r.dimensions.width) / r.initial_dimensions.height
                }
            }
        }
    }

    function E(t) {
        var n;
        if (t.nodeType == null) {
            n = u
        } else {
            n = [t]
        }
        for (var r in n) {
            if (!n.hasOwnProperty(r)) {
                continue
            }
            var i = n[r];
            if (i.holder_data) {
                var s = i.holder_data;
                var o = b(i, e.invisible_error_fn(E));
                if (o) {
                    if (s.fluid) {
                        if (s.auto) {
                            switch (s.fluid_data.mode) {
                                case "width":
                                    o.height = o.width / s.fluid_data.ratio;
                                    break;
                                case "height":
                                    o.width = o.height * s.fluid_data.ratio;
                                    break
                            }
                        }
                        i.setAttribute("src", g({
                            ctx: a,
                            dimensions: o,
                            template: s.theme,
                            ratio: f,
                            holder: s
                        }))
                    }
                    if (s.textmode && s.textmode == "exact") {
                        s.exact_dimensions = o;
                        i.setAttribute("src", g({
                            ctx: a,
                            dimensions: s.dimensions,
                            template: s.theme,
                            ratio: f,
                            holder: s
                        }))
                    }
                }
            }
        }
    }

    function S(t, n) {
        var r = {
            theme: C(l.themes.gray, {})
        };
        var i = false;
        for (var s = t.length, o = 0; o < s; o++) {
            var u = t[o];
            if (e.flags.dimensions.match(u)) {
                i = true;
                r.dimensions = e.flags.dimensions.output(u)
            } else if (e.flags.fluid.match(u)) {
                i = true;
                r.dimensions = e.flags.fluid.output(u);
                r.fluid = true
            } else if (e.flags.textmode.match(u)) {
                r.textmode = e.flags.textmode.output(u)
            } else if (e.flags.colors.match(u)) {
                r.theme = e.flags.colors.output(u)
            } else if (n.themes[u]) {
                if (n.themes.hasOwnProperty(u)) {
                    r.theme = C(n.themes[u], {})
                }
            } else if (e.flags.font.match(u)) {
                r.font = e.flags.font.output(u)
            } else if (e.flags.auto.match(u)) {
                r.auto = true
            } else if (e.flags.text.match(u)) {
                r.text = e.flags.text.output(u)
            }
        }
        return i ? r : false
    }

    function T(e, t) {
        var n = "complete",
            r = "readystatechange",
            i = !1,
            s = i,
            o = !0,
            u = e.document,
            a = u.documentElement,
            f = u.addEventListener ? "addEventListener" : "attachEvent",
            l = u.addEventListener ? "removeEventListener" : "detachEvent",
            c = u.addEventListener ? "" : "on",
            h = function(o) {
                (o.type != r || u.readyState == n) && ((o.type == "load" ? e : u)[l](c + o.type, h, i), !s && (s = !0) && t.call(e, null))
            },
            p = function() {
                try {
                    a.doScroll("left")
                } catch (e) {
                    setTimeout(p, 50);
                    return
                }
                h("poll")
            };
        if (u.readyState == n) t.call(e, "lazy");
        else {
            if (u.createEventObject && a.doScroll) {
                try {
                    o = !e.frameElement
                } catch (d) {}
                o && p()
            }
            u[f](c + "DOMContentLoaded", h, i), u[f](c + r, h, i), e[f](c + "load", h, i)
        }
    }

    function N(e, t) {
        var e = e.match(/^(\W)?(.*)/),
            t = t || document,
            n = t["getElement" + (e[1] ? "#" == e[1] ? "ById" : "sByClassName" : "sByTagName")],
            r = n.call(t, e[2]),
            i = [];
        return null !== r && (i = r.length || 0 === r.length ? r : [r]), i
    }

    function C(e, t) {
        var n = {};
        for (var r in e) {
            if (e.hasOwnProperty(r)) {
                n[r] = e[r]
            }
        }
        for (var r in t) {
            if (t.hasOwnProperty(r)) {
                n[r] = t[r]
            }
        }
        return n
    }
    var n = {
        use_svg: false,
        use_canvas: false,
        use_fallback: false
    };
    var r = {};
    var i = false;
    canvas = document.createElement("canvas");
    var s = 1,
        o = 1;
    var u = [];
    if (!canvas.getContext) {
        n.use_fallback = true
    } else {
        if (canvas.toDataURL("image/png").indexOf("data:image/png") < 0) {
            n.use_fallback = true
        } else {
            var a = canvas.getContext("2d")
        }
    }
    if (!!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) {
        n.use_svg = true;
        n.use_canvas = false
    }
    if (!n.use_fallback) {
        s = window.devicePixelRatio || 1, o = a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || a.backingStorePixelRatio || 1
    }
    var f = s / o;
    var l = {
        domain: "holder.js",
        images: "img",
        bgnodes: ".holderjs",
        themes: {
            gray: {
                background: "#eee",
                foreground: "#aaa",
                size: 12
            },
            social: {
                background: "#3a5a97",
                foreground: "#fff",
                size: 12
            },
            industrial: {
                background: "#434A52",
                foreground: "#C2F200",
                size: 12
            },
            sky: {
                background: "#0D8FDB",
                foreground: "#fff",
                size: 12
            },
            vine: {
                background: "#39DBAC",
                foreground: "#1E292C",
                size: 12
            },
            lava: {
                background: "#F8591A",
                foreground: "#1C2846",
                size: 12
            }
        },
        stylesheet: ""
    };
    e.flags = {
        dimensions: {
            regex: /^(\d+)x(\d+)$/,
            output: function(e) {
                var t = this.regex.exec(e);
                return {
                    width: +t[1],
                    height: +t[2]
                }
            }
        },
        fluid: {
            regex: /^([0-9%]+)x([0-9%]+)$/,
            output: function(e) {
                var t = this.regex.exec(e);
                return {
                    width: t[1],
                    height: t[2]
                }
            }
        },
        colors: {
            regex: /#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,
            output: function(e) {
                var t = this.regex.exec(e);
                return {
                    size: l.themes.gray.size,
                    foreground: "#" + t[2],
                    background: "#" + t[1]
                }
            }
        },
        text: {
            regex: /text\:(.*)/,
            output: function(e) {
                return this.regex.exec(e)[1]
            }
        },
        font: {
            regex: /font\:(.*)/,
            output: function(e) {
                return this.regex.exec(e)[1]
            }
        },
        auto: {
            regex: /^auto$/
        },
        textmode: {
            regex: /textmode\:(.*)/,
            output: function(e) {
                return this.regex.exec(e)[1]
            }
        }
    };
    var h = function() {
        if (!window.XMLSerializer) return;
        var e = new XMLSerializer;
        var t = "http://www.w3.org/2000/svg";
        var n = document.createElementNS(t, "svg");
        if (n.webkitMatchesSelector) {
            n.setAttribute("xmlns", "http://www.w3.org/2000/svg")
        }
        var r = document.createElementNS(t, "rect");
        var i = document.createElementNS(t, "text");
        var s = document.createTextNode(null);
        i.setAttribute("text-anchor", "middle");
        i.appendChild(s);
        n.appendChild(r);
        n.appendChild(i);
        return function(t) {
            n.setAttribute("width", t.width);
            n.setAttribute("height", t.height);
            r.setAttribute("width", t.width);
            r.setAttribute("height", t.height);
            r.setAttribute("fill", t.template.background);
            i.setAttribute("x", t.width / 2);
            i.setAttribute("y", t.height / 2);
            s.nodeValue = t.text;
            i.setAttribute("style", d({
                fill: t.template.foreground,
                "font-weight": "bold",
                "font-size": t.text_height + "px",
                "font-family": t.font,
                "dominant-baseline": "central"
            }));
            return e.serializeToString(n)
        }
    }();
    for (var x in e.flags) {
        if (!e.flags.hasOwnProperty(x)) continue;
        e.flags[x].match = function(e) {
            return e.match(this.regex)
        }
    }
    e.invisible_error_fn = function(e) {
        return function(e) {
            if (e.hasAttribute("data-holder-invisible")) {
                throw new Error("Holder: invisible placeholder")
            }
        }
    };
    e.add_theme = function(t, n) {
        t != null && n != null && (l.themes[t] = n);
        return e
    };
    e.add_image = function(t, n) {
        var r = N(n);
        if (r.length) {
            for (var i = 0, s = r.length; i < s; i++) {
                var o = document.createElement("img");
                o.setAttribute("data-src", t);
                r[i].appendChild(o)
            }
        }
        return e
    };
    e.run = function(t) {
        r = C({}, n);
        i = true;
        var s = C(l, t),
            o = [],
            u = [],
            a = [];
        if (s.use_canvas != null && s.use_canvas) {
            r.use_canvas = true;
            r.use_svg = false
        }
        if (typeof s.images == "string") {
            u = N(s.images)
        } else if (window.NodeList && s.images instanceof window.NodeList) {
            u = s.images
        } else if (window.Node && s.images instanceof window.Node) {
            u = [s.images]
        } else if (window.HTMLCollection && s.images instanceof window.HTMLCollection) {
            u = s.images
        }
        if (typeof s.bgnodes == "string") {
            a = N(s.bgnodes)
        } else if (window.NodeList && s.elements instanceof window.NodeList) {
            a = s.bgnodes
        } else if (window.Node && s.bgnodes instanceof window.Node) {
            a = [s.bgnodes]
        }
        for (p = 0, h = u.length; p < h; p++) o.push(u[p]);
        var f = document.getElementById("holderjs-style");
        if (!f) {
            f = document.createElement("style");
            f.setAttribute("id", "holderjs-style");
            f.type = "text/css";
            document.getElementsByTagName("head")[0].appendChild(f)
        }
        if (!s.nocss) {
            if (f.styleSheet) {
                f.styleSheet.cssText += s.stylesheet
            } else {
                if (s.stylesheet.length) {
                    f.appendChild(document.createTextNode(s.stylesheet))
                }
            }
        }
        var c = new RegExp(s.domain + '/(.*?)"?\\)');
        for (var h = a.length, p = 0; p < h; p++) {
            var d = window.getComputedStyle(a[p], null).getPropertyValue("background-image");
            var v = d.match(c);
            var m = a[p].getAttribute("data-background-src");
            if (v) {
                var g = S(v[1].split("/"), s);
                if (g) {
                    y("background", a[p], g, d)
                }
            } else if (m != null) {
                var g = S(m.substr(m.lastIndexOf(s.domain) + s.domain.length + 1).split("/"), s);
                if (g) {
                    y("background", a[p], g, d)
                }
            }
        }
        for (h = o.length, p = 0; p < h; p++) {
            var b, w;
            w = b = d = null;
            try {
                w = o[p].getAttribute("src");
                attr_datasrc = o[p].getAttribute("data-src")
            } catch (E) {}
            if (attr_datasrc == null && !!w && w.indexOf(s.domain) >= 0) {
                d = w
            } else if (!!attr_datasrc && attr_datasrc.indexOf(s.domain) >= 0) {
                d = attr_datasrc
            }
            if (d) {
                var g = S(d.substr(d.lastIndexOf(s.domain) + s.domain.length + 1).split("/"), s);
                if (g) {
                    if (g.fluid) {
                        y("fluid", o[p], g, d)
                    } else {
                        y("image", o[p], g, d)
                    }
                }
            }
        }
        return e
    };
    T(t, function() {
        if (window.addEventListener) {
            window.addEventListener("resize", E, false);
            window.addEventListener("orientationchange", E, false)
        } else {
            window.attachEvent("onresize", E)
        }
        i || e.run({});
        if (typeof window.Turbolinks === "object") {
            document.addEventListener("page:change", function() {
                e.run({})
            })
        }
    });
    if (typeof define === "function" && define.amd) {
        define([], function() {
            return e
        })
    }(function() {
        function e(e) {
            this.message = e
        }
        var t = "undefined" != typeof exports ? exports : this,
            n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        e.prototype = Error(), e.prototype.name = "InvalidCharacterError", t.btoa || (t.btoa = function(t) {
            for (var r, i, s = 0, o = n, u = ""; t.charAt(0 | s) || (o = "=", s % 1); u += o.charAt(63 & r >> 8 - 8 * (s % 1))) {
                if (i = t.charCodeAt(s += .75), i > 255) throw new e("'btoa' failed");
                r = r << 8 | i
            }
            return u
        }), t.atob || (t.atob = function(t) {
            if (t = t.replace(/=+$/, ""), 1 == t.length % 4) throw new e("'atob' failed");
            for (var r, i, s = 0, o = 0, u = ""; i = t.charAt(o++); ~i && (r = s % 4 ? 64 * r + i : i, s++ % 4) ? u += String.fromCharCode(255 & r >> (6 & -2 * s)) : 0) i = n.indexOf(i);
            return u
        })
    })();
    document.getElementsByClassName || (document.getElementsByClassName = function(e) {
        var t = document,
            n, r, i, s = [];
        if (t.querySelectorAll) return t.querySelectorAll("." + e);
        if (t.evaluate) {
            r = ".//*[contains(concat(' ', @class, ' '), ' " + e + " ')]", n = t.evaluate(r, t, null, 0, null);
            while (i = n.iterateNext()) s.push(i)
        } else {
            n = t.getElementsByTagName("*"), r = new RegExp("(^|\\s)" + e + "(\\s|$)");
            for (i = 0; i < n.length; i++) r.test(n[i].className) && s.push(n[i])
        }
        return s
    });
    window.getComputedStyle || (window.getComputedStyle = function(e) {
        return this.el = e, this.getPropertyValue = function(t) {
            var n = /(\-([a-z]){1})/g;
            return t == "float" && (t = "styleFloat"), n.test(t) && (t = t.replace(n, function() {
                return arguments[2].toUpperCase()
            })), e.currentStyle[t] ? e.currentStyle[t] : null
        }, this
    });
    if (!Object.prototype.hasOwnProperty) Object.prototype.hasOwnProperty = function(e) {
        var t = this.__proto__ || this.constructor.prototype;
        return e in this && (!(e in t) || t[e] !== this[e])
    }
})(Holder, window);
! function(e) {
    var t, n, r = "0.4.2",
        i = "hasOwnProperty",
        s = /[\.\/]/,
        o = "*",
        u = function() {},
        a = function(e, t) {
            return e - t
        },
        f = {
            n: {}
        },
        l = function(e, r) {
            e = String(e);
            var i, s = n,
                o = Array.prototype.slice.call(arguments, 2),
                u = l.listeners(e),
                f = 0,
                h = [],
                p = {},
                d = [],
                v = t;
            t = e, n = 0;
            for (var m = 0, g = u.length; g > m; m++) "zIndex" in u[m] && (h.push(u[m].zIndex), u[m].zIndex < 0 && (p[u[m].zIndex] = u[m]));
            for (h.sort(a); h[f] < 0;)
                if (i = p[h[f++]], d.push(i.apply(r, o)), n) return n = s, d;
            for (m = 0; g > m; m++)
                if (i = u[m], "zIndex" in i)
                    if (i.zIndex == h[f]) {
                        if (d.push(i.apply(r, o)), n) break;
                        do
                            if (f++, i = p[h[f]], i && d.push(i.apply(r, o)), n) break;
                        while (i)
                    } else p[i.zIndex] = i;
            else if (d.push(i.apply(r, o)), n) break;
            return n = s, t = v, d.length ? d : null
        };
    l._events = f, l.listeners = function(e) {
        var t, n, r, i, u, a, l, c, h = e.split(s),
            p = f,
            d = [p],
            v = [];
        for (i = 0, u = h.length; u > i; i++) {
            for (c = [], a = 0, l = d.length; l > a; a++)
                for (p = d[a].n, n = [p[h[i]], p[o]], r = 2; r--;) t = n[r], t && (c.push(t), v = v.concat(t.f || []));
            d = c
        }
        return v
    }, l.on = function(e, t) {
        if (e = String(e), "function" != typeof t) return function() {};
        for (var n = e.split(s), r = f, i = 0, o = n.length; o > i; i++) r = r.n, r = r.hasOwnProperty(n[i]) && r[n[i]] || (r[n[i]] = {
            n: {}
        });
        for (r.f = r.f || [], i = 0, o = r.f.length; o > i; i++)
            if (r.f[i] == t) return u;
        return r.f.push(t),
            function(e) {
                +e == +e && (t.zIndex = +e)
            }
    }, l.f = function(e) {
        var t = [].slice.call(arguments, 1);
        return function() {
            l.apply(null, [e, null].concat(t).concat([].slice.call(arguments, 0)))
        }
    }, l.stop = function() {
        n = 1
    }, l.nt = function(e) {
        return e ? (new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)")).test(t) : t
    }, l.nts = function() {
        return t.split(s)
    }, l.off = l.unbind = function(e, t) {
        if (!e) return l._events = f = {
            n: {}
        }, void 0;
        var n, r, u, a, c, h, p, d = e.split(s),
            v = [f];
        for (a = 0, c = d.length; c > a; a++)
            for (h = 0; h < v.length; h += u.length - 2) {
                if (u = [h, 1], n = v[h].n, d[a] != o) n[d[a]] && u.push(n[d[a]]);
                else
                    for (r in n) n[i](r) && u.push(n[r]);
                v.splice.apply(v, u)
            }
        for (a = 0, c = v.length; c > a; a++)
            for (n = v[a]; n.n;) {
                if (t) {
                    if (n.f) {
                        for (h = 0, p = n.f.length; p > h; h++)
                            if (n.f[h] == t) {
                                n.f.splice(h, 1);
                                break
                            }!n.f.length && delete n.f
                    }
                    for (r in n.n)
                        if (n.n[i](r) && n.n[r].f) {
                            var m = n.n[r].f;
                            for (h = 0, p = m.length; p > h; h++)
                                if (m[h] == t) {
                                    m.splice(h, 1);
                                    break
                                }!m.length && delete n.n[r].f
                        }
                } else {
                    delete n.f;
                    for (r in n.n) n.n[i](r) && n.n[r].f && delete n.n[r].f
                }
                n = n.n
            }
    }, l.once = function(e, t) {
        var n = function() {
            return l.unbind(e, n), t.apply(this, arguments)
        };
        return l.on(e, n)
    }, l.version = r, l.toString = function() {
        return "You are running Eve " + r
    }, "undefined" != typeof module && module.exports ? module.exports = l : "undefined" != typeof define ? define("eve", [], function() {
        return l
    }) : e.eve = l
}(this),
function(e, t) {
    "function" == typeof define && define.amd ? define(["eve"], function(n) {
        return t(e, n)
    }) : t(e, e.eve)
}(this, function(e, t) {
    function n(e) {
        if (n.is(e, "function")) return w ? e() : t.on("raphael.DOMload", e);
        if (n.is(e, $)) return n._engine.create[A](n, e.splice(0, 3 + n.is(e[0], X))).add(e);
        var r = Array.prototype.slice.call(arguments, 0);
        if (n.is(r[r.length - 1], "function")) {
            var i = r.pop();
            return w ? i.call(n._engine.create[A](n, r)) : t.on("raphael.DOMload", function() {
                i.call(n._engine.create[A](n, r))
            })
        }
        return n._engine.create[A](n, arguments)
    }

    function r(e) {
        if ("function" == typeof e || Object(e) !== e) return e;
        var t = new e.constructor;
        for (var n in e) e[N](n) && (t[n] = r(e[n]));
        return t
    }

    function i(e, t) {
        for (var n = 0, r = e.length; r > n; n++)
            if (e[n] === t) return e.push(e.splice(n, 1)[0])
    }

    function s(e, t, n) {
        function r() {
            var s = Array.prototype.slice.call(arguments, 0),
                o = s.join("␀"),
                u = r.cache = r.cache || {},
                a = r.count = r.count || [];
            return u[N](o) ? (i(a, o), n ? n(u[o]) : u[o]) : (a.length >= 1e3 && delete u[a.shift()], a.push(o), u[o] = e[A](t, s), n ? n(u[o]) : u[o])
        }
        return r
    }

    function o() {
        return this.hex
    }

    function u(e, t) {
        for (var n = [], r = 0, i = e.length; i - 2 * !t > r; r += 2) {
            var s = [{
                x: +e[r - 2],
                y: +e[r - 1]
            }, {
                x: +e[r],
                y: +e[r + 1]
            }, {
                x: +e[r + 2],
                y: +e[r + 3]
            }, {
                x: +e[r + 4],
                y: +e[r + 5]
            }];
            t ? r ? i - 4 == r ? s[3] = {
                x: +e[0],
                y: +e[1]
            } : i - 2 == r && (s[2] = {
                x: +e[0],
                y: +e[1]
            }, s[3] = {
                x: +e[2],
                y: +e[3]
            }) : s[0] = {
                x: +e[i - 2],
                y: +e[i - 1]
            } : i - 4 == r ? s[3] = s[2] : r || (s[0] = {
                x: +e[r],
                y: +e[r + 1]
            }), n.push(["C", (-s[0].x + 6 * s[1].x + s[2].x) / 6, (-s[0].y + 6 * s[1].y + s[2].y) / 6, (s[1].x + 6 * s[2].x - s[3].x) / 6, (s[1].y + 6 * s[2].y - s[3].y) / 6, s[2].x, s[2].y])
        }
        return n
    }

    function a(e, t, n, r, i) {
        var s = -3 * t + 9 * n - 9 * r + 3 * i,
            o = e * s + 6 * t - 12 * n + 6 * r;
        return e * o - 3 * t + 3 * n
    }

    function f(e, t, n, r, i, s, o, u, f) {
        null == f && (f = 1), f = f > 1 ? 1 : 0 > f ? 0 : f;
        for (var l = f / 2, c = 12, h = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], p = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], d = 0, v = 0; c > v; v++) {
            var m = l * h[v] + l,
                g = a(m, e, n, i, o),
                y = a(m, t, r, s, u),
                b = g * g + y * y;
            d += p[v] * I.sqrt(b)
        }
        return l * d
    }

    function l(e, t, n, r, i, s, o, u, a) {
        if (!(0 > a || f(e, t, n, r, i, s, o, u) < a)) {
            var l, c = 1,
                h = c / 2,
                p = c - h,
                d = .01;
            for (l = f(e, t, n, r, i, s, o, u, p); U(l - a) > d;) h /= 2, p += (a > l ? 1 : -1) * h, l = f(e, t, n, r, i, s, o, u, p);
            return p
        }
    }

    function c(e, t, n, r, i, s, o, u) {
        if (!(q(e, n) < R(i, o) || R(e, n) > q(i, o) || q(t, r) < R(s, u) || R(t, r) > q(s, u))) {
            var a = (e * r - t * n) * (i - o) - (e - n) * (i * u - s * o),
                f = (e * r - t * n) * (s - u) - (t - r) * (i * u - s * o),
                l = (e - n) * (s - u) - (t - r) * (i - o);
            if (l) {
                var c = a / l,
                    h = f / l,
                    p = +c.toFixed(2),
                    d = +h.toFixed(2);
                if (!(p < +R(e, n).toFixed(2) || p > +q(e, n).toFixed(2) || p < +R(i, o).toFixed(2) || p > +q(i, o).toFixed(2) || d < +R(t, r).toFixed(2) || d > +q(t, r).toFixed(2) || d < +R(s, u).toFixed(2) || d > +q(s, u).toFixed(2))) return {
                    x: c,
                    y: h
                }
            }
        }
    }

    function h(e, t, r) {
        var i = n.bezierBBox(e),
            s = n.bezierBBox(t);
        if (!n.isBBoxIntersect(i, s)) return r ? 0 : [];
        for (var o = f.apply(0, e), u = f.apply(0, t), a = q(~~(o / 5), 1), l = q(~~(u / 5), 1), h = [], p = [], d = {}, v = r ? 0 : [], m = 0; a + 1 > m; m++) {
            var g = n.findDotsAtSegment.apply(n, e.concat(m / a));
            h.push({
                x: g.x,
                y: g.y,
                t: m / a
            })
        }
        for (m = 0; l + 1 > m; m++) g = n.findDotsAtSegment.apply(n, t.concat(m / l)), p.push({
            x: g.x,
            y: g.y,
            t: m / l
        });
        for (m = 0; a > m; m++)
            for (var y = 0; l > y; y++) {
                var b = h[m],
                    w = h[m + 1],
                    E = p[y],
                    S = p[y + 1],
                    x = U(w.x - b.x) < .001 ? "y" : "x",
                    T = U(S.x - E.x) < .001 ? "y" : "x",
                    N = c(b.x, b.y, w.x, w.y, E.x, E.y, S.x, S.y);
                if (N) {
                    if (d[N.x.toFixed(4)] == N.y.toFixed(4)) continue;
                    d[N.x.toFixed(4)] = N.y.toFixed(4);
                    var C = b.t + U((N[x] - b[x]) / (w[x] - b[x])) * (w.t - b.t),
                        k = E.t + U((N[T] - E[T]) / (S[T] - E[T])) * (S.t - E.t);
                    C >= 0 && 1.001 >= C && k >= 0 && 1.001 >= k && (r ? v++ : v.push({
                        x: N.x,
                        y: N.y,
                        t1: R(C, 1),
                        t2: R(k, 1)
                    }))
                }
            }
        return v
    }

    function p(e, t, r) {
        e = n._path2curve(e), t = n._path2curve(t);
        for (var i, s, o, u, a, f, l, c, p, d, v = r ? 0 : [], m = 0, g = e.length; g > m; m++) {
            var y = e[m];
            if ("M" == y[0]) i = a = y[1], s = f = y[2];
            else {
                "C" == y[0] ? (p = [i, s].concat(y.slice(1)), i = p[6], s = p[7]) : (p = [i, s, i, s, a, f, a, f], i = a, s = f);
                for (var b = 0, w = t.length; w > b; b++) {
                    var E = t[b];
                    if ("M" == E[0]) o = l = E[1], u = c = E[2];
                    else {
                        "C" == E[0] ? (d = [o, u].concat(E.slice(1)), o = d[6], u = d[7]) : (d = [o, u, o, u, l, c, l, c], o = l, u = c);
                        var S = h(p, d, r);
                        if (r) v += S;
                        else {
                            for (var x = 0, T = S.length; T > x; x++) S[x].segment1 = m, S[x].segment2 = b, S[x].bez1 = p, S[x].bez2 = d;
                            v = v.concat(S)
                        }
                    }
                }
            }
        }
        return v
    }

    function d(e, t, n, r, i, s) {
        null != e ? (this.a = +e, this.b = +t, this.c = +n, this.d = +r, this.e = +i, this.f = +s) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
    }

    function v() {
        return this.x + D + this.y + D + this.width + " × " + this.height
    }

    function m(e, t, n, r, i, s) {
        function o(e) {
            return ((c * e + l) * e + f) * e
        }

        function u(e, t) {
            var n = a(e, t);
            return ((d * n + p) * n + h) * n
        }

        function a(e, t) {
            var n, r, i, s, u, a;
            for (i = e, a = 0; 8 > a; a++) {
                if (s = o(i) - e, U(s) < t) return i;
                if (u = (3 * c * i + 2 * l) * i + f, U(u) < 1e-6) break;
                i -= s / u
            }
            if (n = 0, r = 1, i = e, n > i) return n;
            if (i > r) return r;
            for (; r > n;) {
                if (s = o(i), U(s - e) < t) return i;
                e > s ? n = i : r = i, i = (r - n) / 2 + n
            }
            return i
        }
        var f = 3 * t,
            l = 3 * (r - t) - f,
            c = 1 - f - l,
            h = 3 * n,
            p = 3 * (i - n) - h,
            d = 1 - h - p;
        return u(e, 1 / (200 * s))
    }

    function g(e, t) {
        var n = [],
            r = {};
        if (this.ms = t, this.times = 1, e) {
            for (var i in e) e[N](i) && (r[Z(i)] = e[i], n.push(Z(i)));
            n.sort(ct)
        }
        this.anim = r, this.top = n[n.length - 1], this.percents = n
    }

    function y(e, r, i, s, o, u) {
        i = Z(i);
        var a, f, l, c, h, p, v = e.ms,
            g = {},
            y = {},
            b = {};
        if (s)
            for (E = 0, x = fn.length; x > E; E++) {
                var w = fn[E];
                if (w.el.id == r.id && w.anim == e) {
                    w.percent != i ? (fn.splice(E, 1), l = 1) : f = w, r.attr(w.totalOrigin);
                    break
                }
            } else s = +y;
        for (var E = 0, x = e.percents.length; x > E; E++) {
            if (e.percents[E] == i || e.percents[E] > s * e.top) {
                i = e.percents[E], h = e.percents[E - 1] || 0, v = v / e.top * (i - h), c = e.percents[E + 1], a = e.anim[i];
                break
            }
            s && r.attr(e.anim[e.percents[E]])
        }
        if (a) {
            if (f) f.initstatus = s, f.start = new Date - f.ms * s;
            else {
                for (var T in a)
                    if (a[N](T) && (rt[N](T) || r.paper.customAttributes[N](T))) switch (g[T] = r.attr(T), null == g[T] && (g[T] = nt[T]), y[T] = a[T], rt[T]) {
                        case X:
                            b[T] = (y[T] - g[T]) / v;
                            break;
                        case "colour":
                            g[T] = n.getRGB(g[T]);
                            var C = n.getRGB(y[T]);
                            b[T] = {
                                r: (C.r - g[T].r) / v,
                                g: (C.g - g[T].g) / v,
                                b: (C.b - g[T].b) / v
                            };
                            break;
                        case "path":
                            var k = Bt(g[T], y[T]),
                                L = k[1];
                            for (g[T] = k[0], b[T] = [], E = 0, x = g[T].length; x > E; E++) {
                                b[T][E] = [0];
                                for (var A = 1, M = g[T][E].length; M > A; A++) b[T][E][A] = (L[E][A] - g[T][E][A]) / v
                            }
                            break;
                        case "transform":
                            var _ = r._,
                                D = Rt(_[T], y[T]);
                            if (D)
                                for (g[T] = D.from, y[T] = D.to, b[T] = [], b[T].real = !0, E = 0, x = g[T].length; x > E; E++)
                                    for (b[T][E] = [g[T][E][0]], A = 1, M = g[T][E].length; M > A; A++) b[T][E][A] = (y[T][E][A] - g[T][E][A]) / v;
                            else {
                                var B = r.matrix || new d,
                                    j = {
                                        _: {
                                            transform: _.transform
                                        },
                                        getBBox: function() {
                                            return r.getBBox(1)
                                        }
                                    };
                                g[T] = [B.a, B.b, B.c, B.d, B.e, B.f], It(j, y[T]), y[T] = j._.transform, b[T] = [(j.matrix.a - B.a) / v, (j.matrix.b - B.b) / v, (j.matrix.c - B.c) / v, (j.matrix.d - B.d) / v, (j.matrix.e - B.e) / v, (j.matrix.f - B.f) / v]
                            }
                            break;
                        case "csv":
                            var F = P(a[T])[H](S),
                                I = P(g[T])[H](S);
                            if ("clip-rect" == T)
                                for (g[T] = I, b[T] = [], E = I.length; E--;) b[T][E] = (F[E] - g[T][E]) / v;
                            y[T] = F;
                            break;
                        default:
                            for (F = [][O](a[T]), I = [][O](g[T]), b[T] = [], E = r.paper.customAttributes[T].length; E--;) b[T][E] = ((F[E] || 0) - (I[E] || 0)) / v
                    }
                    var q = a.easing,
                        R = n.easing_formulas[q];
                if (!R)
                    if (R = P(q).match(G), R && 5 == R.length) {
                        var U = R;
                        R = function(e) {
                            return m(e, +U[1], +U[2], +U[3], +U[4], v)
                        }
                    } else R = pt;
                if (p = a.start || e.start || +(new Date), w = {
                        anim: e,
                        percent: i,
                        timestamp: p,
                        start: p + (e.del || 0),
                        status: 0,
                        initstatus: s || 0,
                        stop: !1,
                        ms: v,
                        easing: R,
                        from: g,
                        diff: b,
                        to: y,
                        el: r,
                        callback: a.callback,
                        prev: h,
                        next: c,
                        repeat: u || e.times,
                        origin: r.attr(),
                        totalOrigin: o
                    }, fn.push(w), s && !f && !l && (w.stop = !0, w.start = new Date - v * s, 1 == fn.length)) return cn();
                l && (w.start = new Date - w.ms * s), 1 == fn.length && ln(cn)
            }
            t("raphael.anim.start." + r.id, r, e)
        }
    }

    function b(e) {
        for (var t = 0; t < fn.length; t++) fn[t].el.paper == e && fn.splice(t--, 1)
    }
    n.version = "2.1.0", n.eve = t;
    var w, E, S = /[, ]+/,
        x = {
            circle: 1,
            rect: 1,
            path: 1,
            ellipse: 1,
            text: 1,
            image: 1
        },
        T = /\{(\d+)\}/g,
        N = "hasOwnProperty",
        C = {
            doc: document,
            win: e
        },
        k = {
            was: Object.prototype[N].call(C.win, "Raphael"),
            is: C.win.Raphael
        },
        L = function() {
            this.ca = this.customAttributes = {}
        },
        A = "apply",
        O = "concat",
        M = "ontouchstart" in C.win || C.win.DocumentTouch && C.doc instanceof DocumentTouch,
        _ = "",
        D = " ",
        P = String,
        H = "split",
        B = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [H](D),
        j = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        F = P.prototype.toLowerCase,
        I = Math,
        q = I.max,
        R = I.min,
        U = I.abs,
        z = I.pow,
        W = I.PI,
        X = "number",
        V = "string",
        $ = "array",
        J = Object.prototype.toString,
        K = (n._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
        Q = {
            NaN: 1,
            Infinity: 1,
            "-Infinity": 1
        },
        G = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        Y = I.round,
        Z = parseFloat,
        et = parseInt,
        tt = P.prototype.toUpperCase,
        nt = n._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        rt = n._availableAnimAttrs = {
            blur: X,
            "clip-rect": "csv",
            cx: X,
            cy: X,
            fill: "colour",
            "fill-opacity": X,
            "font-size": X,
            height: X,
            opacity: X,
            path: "path",
            r: X,
            rx: X,
            ry: X,
            stroke: "colour",
            "stroke-opacity": X,
            "stroke-width": X,
            transform: "transform",
            width: X,
            x: X,
            y: X
        },
        it = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        st = {
            hs: 1,
            rg: 1
        },
        ot = /,?([achlmqrstvxz]),?/gi,
        ut = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
        at = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
        ft = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
        lt = (n._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}),
        ct = function(e, t) {
            return Z(e) - Z(t)
        },
        ht = function() {},
        pt = function(e) {
            return e
        },
        dt = n._rectPath = function(e, t, n, r, i) {
            return i ? [
                ["M", e + i, t],
                ["l", n - 2 * i, 0],
                ["a", i, i, 0, 0, 1, i, i],
                ["l", 0, r - 2 * i],
                ["a", i, i, 0, 0, 1, -i, i],
                ["l", 2 * i - n, 0],
                ["a", i, i, 0, 0, 1, -i, -i],
                ["l", 0, 2 * i - r],
                ["a", i, i, 0, 0, 1, i, -i],
                ["z"]
            ] : [
                ["M", e, t],
                ["l", n, 0],
                ["l", 0, r],
                ["l", -n, 0],
                ["z"]
            ]
        },
        vt = function(e, t, n, r) {
            return null == r && (r = n), [
                ["M", e, t],
                ["m", 0, -r],
                ["a", n, r, 0, 1, 1, 0, 2 * r],
                ["a", n, r, 0, 1, 1, 0, -2 * r],
                ["z"]
            ]
        },
        mt = n._getPath = {
            path: function(e) {
                return e.attr("path")
            },
            circle: function(e) {
                var t = e.attrs;
                return vt(t.cx, t.cy, t.r)
            },
            ellipse: function(e) {
                var t = e.attrs;
                return vt(t.cx, t.cy, t.rx, t.ry)
            },
            rect: function(e) {
                var t = e.attrs;
                return dt(t.x, t.y, t.width, t.height, t.r)
            },
            image: function(e) {
                var t = e.attrs;
                return dt(t.x, t.y, t.width, t.height)
            },
            text: function(e) {
                var t = e._getBBox();
                return dt(t.x, t.y, t.width, t.height)
            },
            set: function(e) {
                var t = e._getBBox();
                return dt(t.x, t.y, t.width, t.height)
            }
        },
        gt = n.mapPath = function(e, t) {
            if (!t) return e;
            var n, r, i, s, o, u, a;
            for (e = Bt(e), i = 0, o = e.length; o > i; i++)
                for (a = e[i], s = 1, u = a.length; u > s; s += 2) n = t.x(a[s], a[s + 1]), r = t.y(a[s], a[s + 1]), a[s] = n, a[s + 1] = r;
            return e
        };
    if (n._g = C, n.type = C.win.SVGAngle || C.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == n.type) {
        var yt, bt = C.doc.createElement("div");
        if (bt.innerHTML = '<v:shape adj="1"/>', yt = bt.firstChild, yt.style.behavior = "url(#default#VML)", !yt || "object" != typeof yt.adj) return n.type = _;
        bt = null
    }
    n.svg = !(n.vml = "VML" == n.type), n._Paper = L, n.fn = E = L.prototype = n.prototype, n._id = 0, n._oid = 0, n.is = function(e, t) {
        return t = F.call(t), "finite" == t ? !Q[N](+e) : "array" == t ? e instanceof Array : "null" == t && null === e || t == typeof e && null !== e || "object" == t && e === Object(e) || "array" == t && Array.isArray && Array.isArray(e) || J.call(e).slice(8, -1).toLowerCase() == t
    }, n.angle = function(e, t, r, i, s, o) {
        if (null == s) {
            var u = e - r,
                a = t - i;
            return u || a ? (180 + 180 * I.atan2(-a, -u) / W + 360) % 360 : 0
        }
        return n.angle(e, t, s, o) - n.angle(r, i, s, o)
    }, n.rad = function(e) {
        return e % 360 * W / 180
    }, n.deg = function(e) {
        return 180 * e / W % 360
    }, n.snapTo = function(e, t, r) {
        if (r = n.is(r, "finite") ? r : 10, n.is(e, $)) {
            for (var i = e.length; i--;)
                if (U(e[i] - t) <= r) return e[i]
        } else {
            e = +e;
            var s = t % e;
            if (r > s) return t - s;
            if (s > e - r) return t - s + e
        }
        return t
    }, n.createUUID = function(e, t) {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(e, t).toUpperCase()
        }
    }(/[xy]/g, function(e) {
        var t = 0 | 16 * I.random(),
            n = "x" == e ? t : 8 | 3 & t;
        return n.toString(16)
    }), n.setWindow = function(e) {
        t("raphael.setWindow", n, C.win, e), C.win = e, C.doc = C.win.document, n._engine.initWin && n._engine.initWin(C.win)
    };
    var wt = function(e) {
            if (n.vml) {
                var t, r = /^\s+|\s+$/g;
                try {
                    var i = new ActiveXObject("htmlfile");
                    i.write("<body>"), i.close(), t = i.body
                } catch (o) {
                    t = createPopup().document.body
                }
                var u = t.createTextRange();
                wt = s(function(e) {
                    try {
                        t.style.color = P(e).replace(r, _);
                        var n = u.queryCommandValue("ForeColor");
                        return n = (255 & n) << 16 | 65280 & n | (16711680 & n) >>> 16, "#" + ("000000" + n.toString(16)).slice(-6)
                    } catch (i) {
                        return "none"
                    }
                })
            } else {
                var a = C.doc.createElement("i");
                a.title = "Raphaël Colour Picker", a.style.display = "none", C.doc.body.appendChild(a), wt = s(function(e) {
                    return a.style.color = e, C.doc.defaultView.getComputedStyle(a, _).getPropertyValue("color")
                })
            }
            return wt(e)
        },
        Et = function() {
            return "hsb(" + [this.h, this.s, this.b] + ")"
        },
        St = function() {
            return "hsl(" + [this.h, this.s, this.l] + ")"
        },
        xt = function() {
            return this.hex
        },
        Tt = function(e, t, r) {
            if (null == t && n.is(e, "object") && "r" in e && "g" in e && "b" in e && (r = e.b, t = e.g, e = e.r), null == t && n.is(e, V)) {
                var i = n.getRGB(e);
                e = i.r, t = i.g, r = i.b
            }
            return (e > 1 || t > 1 || r > 1) && (e /= 255, t /= 255, r /= 255), [e, t, r]
        },
        Nt = function(e, t, r, i) {
            e *= 255, t *= 255, r *= 255;
            var s = {
                r: e,
                g: t,
                b: r,
                hex: n.rgb(e, t, r),
                toString: xt
            };
            return n.is(i, "finite") && (s.opacity = i), s
        };
    n.color = function(e) {
        var t;
        return n.is(e, "object") && "h" in e && "s" in e && "b" in e ? (t = n.hsb2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.hex = t.hex) : n.is(e, "object") && "h" in e && "s" in e && "l" in e ? (t = n.hsl2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.hex = t.hex) : (n.is(e, "string") && (e = n.getRGB(e)), n.is(e, "object") && "r" in e && "g" in e && "b" in e ? (t = n.rgb2hsl(e), e.h = t.h, e.s = t.s, e.l = t.l, t = n.rgb2hsb(e), e.v = t.b) : (e = {
            hex: "none"
        }, e.r = e.g = e.b = e.h = e.s = e.v = e.l = -1)), e.toString = xt, e
    }, n.hsb2rgb = function(e, t, n, r) {
        this.is(e, "object") && "h" in e && "s" in e && "b" in e && (n = e.b, t = e.s, e = e.h, r = e.o), e *= 360;
        var i, s, o, u, a;
        return e = e % 360 / 60, a = n * t, u = a * (1 - U(e % 2 - 1)), i = s = o = n - a, e = ~~e, i += [a, u, 0, 0, u, a][e], s += [u, a, a, u, 0, 0][e], o += [0, 0, u, a, a, u][e], Nt(i, s, o, r)
    }, n.hsl2rgb = function(e, t, n, r) {
        this.is(e, "object") && "h" in e && "s" in e && "l" in e && (n = e.l, t = e.s, e = e.h), (e > 1 || t > 1 || n > 1) && (e /= 360, t /= 100, n /= 100), e *= 360;
        var i, s, o, u, a;
        return e = e % 360 / 60, a = 2 * t * (.5 > n ? n : 1 - n), u = a * (1 - U(e % 2 - 1)), i = s = o = n - a / 2, e = ~~e, i += [a, u, 0, 0, u, a][e], s += [u, a, a, u, 0, 0][e], o += [0, 0, u, a, a, u][e], Nt(i, s, o, r)
    }, n.rgb2hsb = function(e, t, n) {
        n = Tt(e, t, n), e = n[0], t = n[1], n = n[2];
        var r, i, s, o;
        return s = q(e, t, n), o = s - R(e, t, n), r = 0 == o ? null : s == e ? (t - n) / o : s == t ? (n - e) / o + 2 : (e - t) / o + 4, r = 60 * ((r + 360) % 6) / 360, i = 0 == o ? 0 : o / s, {
            h: r,
            s: i,
            b: s,
            toString: Et
        }
    }, n.rgb2hsl = function(e, t, n) {
        n = Tt(e, t, n), e = n[0], t = n[1], n = n[2];
        var r, i, s, o, u, a;
        return o = q(e, t, n), u = R(e, t, n), a = o - u, r = 0 == a ? null : o == e ? (t - n) / a : o == t ? (n - e) / a + 2 : (e - t) / a + 4, r = 60 * ((r + 360) % 6) / 360, s = (o + u) / 2, i = 0 == a ? 0 : .5 > s ? a / (2 * s) : a / (2 - 2 * s), {
            h: r,
            s: i,
            l: s,
            toString: St
        }
    }, n._path2string = function() {
        return this.join(",").replace(ot, "$1")
    }, n._preload = function(e, t) {
        var n = C.doc.createElement("img");
        n.style.cssText = "position:absolute;left:-9999em;top:-9999em", n.onload = function() {
            t.call(this), this.onload = null, C.doc.body.removeChild(this)
        }, n.onerror = function() {
            C.doc.body.removeChild(this)
        }, C.doc.body.appendChild(n), n.src = e
    }, n.getRGB = s(function(e) {
        if (!e || (e = P(e)).indexOf("-") + 1) return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: o
        };
        if ("none" == e) return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            toString: o
        };
        !(st[N](e.toLowerCase().substring(0, 2)) || "#" == e.charAt()) && (e = wt(e));
        var t, r, i, s, u, a, f = e.match(K);
        return f ? (f[2] && (i = et(f[2].substring(5), 16), r = et(f[2].substring(3, 5), 16), t = et(f[2].substring(1, 3), 16)), f[3] && (i = et((u = f[3].charAt(3)) + u, 16), r = et((u = f[3].charAt(2)) + u, 16), t = et((u = f[3].charAt(1)) + u, 16)), f[4] && (a = f[4][H](it), t = Z(a[0]), "%" == a[0].slice(-1) && (t *= 2.55), r = Z(a[1]), "%" == a[1].slice(-1) && (r *= 2.55), i = Z(a[2]), "%" == a[2].slice(-1) && (i *= 2.55), "rgba" == f[1].toLowerCase().slice(0, 4) && (s = Z(a[3])), a[3] && "%" == a[3].slice(-1) && (s /= 100)), f[5] ? (a = f[5][H](it), t = Z(a[0]), "%" == a[0].slice(-1) && (t *= 2.55), r = Z(a[1]), "%" == a[1].slice(-1) && (r *= 2.55), i = Z(a[2]), "%" == a[2].slice(-1) && (i *= 2.55), ("deg" == a[0].slice(-3) || "°" == a[0].slice(-1)) && (t /= 360), "hsba" == f[1].toLowerCase().slice(0, 4) && (s = Z(a[3])), a[3] && "%" == a[3].slice(-1) && (s /= 100), n.hsb2rgb(t, r, i, s)) : f[6] ? (a = f[6][H](it), t = Z(a[0]), "%" == a[0].slice(-1) && (t *= 2.55), r = Z(a[1]), "%" == a[1].slice(-1) && (r *= 2.55), i = Z(a[2]), "%" == a[2].slice(-1) && (i *= 2.55), ("deg" == a[0].slice(-3) || "°" == a[0].slice(-1)) && (t /= 360), "hsla" == f[1].toLowerCase().slice(0, 4) && (s = Z(a[3])), a[3] && "%" == a[3].slice(-1) && (s /= 100), n.hsl2rgb(t, r, i, s)) : (f = {
            r: t,
            g: r,
            b: i,
            toString: o
        }, f.hex = "#" + (16777216 | i | r << 8 | t << 16).toString(16).slice(1), n.is(s, "finite") && (f.opacity = s), f)) : {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: o
        }
    }, n), n.hsb = s(function(e, t, r) {
        return n.hsb2rgb(e, t, r).hex
    }), n.hsl = s(function(e, t, r) {
        return n.hsl2rgb(e, t, r).hex
    }), n.rgb = s(function(e, t, n) {
        return "#" + (16777216 | n | t << 8 | e << 16).toString(16).slice(1)
    }), n.getColor = function(e) {
        var t = this.getColor.start = this.getColor.start || {
                h: 0,
                s: 1,
                b: e || .75
            },
            n = this.hsb2rgb(t.h, t.s, t.b);
        return t.h += .075, t.h > 1 && (t.h = 0, t.s -= .2, t.s <= 0 && (this.getColor.start = {
            h: 0,
            s: 1,
            b: t.b
        })), n.hex
    }, n.getColor.reset = function() {
        delete this.start
    }, n.parsePathString = function(e) {
        if (!e) return null;
        var t = Ct(e);
        if (t.arr) return Lt(t.arr);
        var r = {
                a: 7,
                c: 6,
                h: 1,
                l: 2,
                m: 2,
                r: 4,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                z: 0
            },
            i = [];
        return n.is(e, $) && n.is(e[0], $) && (i = Lt(e)), i.length || P(e).replace(ut, function(e, t, n) {
            var s = [],
                o = t.toLowerCase();
            if (n.replace(ft, function(e, t) {
                    t && s.push(+t)
                }), "m" == o && s.length > 2 && (i.push([t][O](s.splice(0, 2))), o = "l", t = "m" == t ? "l" : "L"), "r" == o) i.push([t][O](s));
            else
                for (; s.length >= r[o] && (i.push([t][O](s.splice(0, r[o]))), r[o]););
        }), i.toString = n._path2string, t.arr = Lt(i), i
    }, n.parseTransformString = s(function(e) {
        if (!e) return null;
        var t = [];
        return n.is(e, $) && n.is(e[0], $) && (t = Lt(e)), t.length || P(e).replace(at, function(e, n, r) {
            var i = [];
            F.call(n), r.replace(ft, function(e, t) {
                t && i.push(+t)
            }), t.push([n][O](i))
        }), t.toString = n._path2string, t
    });
    var Ct = function(e) {
        var t = Ct.ps = Ct.ps || {};
        return t[e] ? t[e].sleep = 100 : t[e] = {
            sleep: 100
        }, setTimeout(function() {
            for (var n in t) t[N](n) && n != e && (t[n].sleep--, !t[n].sleep && delete t[n])
        }), t[e]
    };
    n.findDotsAtSegment = function(e, t, n, r, i, s, o, u, a) {
        var f = 1 - a,
            l = z(f, 3),
            c = z(f, 2),
            h = a * a,
            p = h * a,
            d = l * e + 3 * c * a * n + 3 * f * a * a * i + p * o,
            v = l * t + 3 * c * a * r + 3 * f * a * a * s + p * u,
            m = e + 2 * a * (n - e) + h * (i - 2 * n + e),
            g = t + 2 * a * (r - t) + h * (s - 2 * r + t),
            y = n + 2 * a * (i - n) + h * (o - 2 * i + n),
            b = r + 2 * a * (s - r) + h * (u - 2 * s + r),
            w = f * e + a * n,
            E = f * t + a * r,
            S = f * i + a * o,
            x = f * s + a * u,
            T = 90 - 180 * I.atan2(m - y, g - b) / W;
        return (m > y || b > g) && (T += 180), {
            x: d,
            y: v,
            m: {
                x: m,
                y: g
            },
            n: {
                x: y,
                y: b
            },
            start: {
                x: w,
                y: E
            },
            end: {
                x: S,
                y: x
            },
            alpha: T
        }
    }, n.bezierBBox = function(e, t, r, i, s, o, u, a) {
        n.is(e, "array") || (e = [e, t, r, i, s, o, u, a]);
        var f = Ht.apply(null, e);
        return {
            x: f.min.x,
            y: f.min.y,
            x2: f.max.x,
            y2: f.max.y,
            width: f.max.x - f.min.x,
            height: f.max.y - f.min.y
        }
    }, n.isPointInsideBBox = function(e, t, n) {
        return t >= e.x && t <= e.x2 && n >= e.y && n <= e.y2
    }, n.isBBoxIntersect = function(e, t) {
        var r = n.isPointInsideBBox;
        return r(t, e.x, e.y) || r(t, e.x2, e.y) || r(t, e.x, e.y2) || r(t, e.x2, e.y2) || r(e, t.x, t.y) || r(e, t.x2, t.y) || r(e, t.x, t.y2) || r(e, t.x2, t.y2) || (e.x < t.x2 && e.x > t.x || t.x < e.x2 && t.x > e.x) && (e.y < t.y2 && e.y > t.y || t.y < e.y2 && t.y > e.y)
    }, n.pathIntersection = function(e, t) {
        return p(e, t)
    }, n.pathIntersectionNumber = function(e, t) {
        return p(e, t, 1)
    }, n.isPointInsidePath = function(e, t, r) {
        var i = n.pathBBox(e);
        return n.isPointInsideBBox(i, t, r) && 1 == p(e, [
            ["M", t, r],
            ["H", i.x2 + 10]
        ], 1) % 2
    }, n._removedFactory = function(e) {
        return function() {
            t("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e)
        }
    };
    var kt = n.pathBBox = function(e) {
            var t = Ct(e);
            if (t.bbox) return r(t.bbox);
            if (!e) return {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                x2: 0,
                y2: 0
            };
            e = Bt(e);
            for (var n, i = 0, s = 0, o = [], u = [], a = 0, f = e.length; f > a; a++)
                if (n = e[a], "M" == n[0]) i = n[1], s = n[2], o.push(i), u.push(s);
                else {
                    var l = Ht(i, s, n[1], n[2], n[3], n[4], n[5], n[6]);
                    o = o[O](l.min.x, l.max.x), u = u[O](l.min.y, l.max.y), i = n[5], s = n[6]
                }
            var c = R[A](0, o),
                h = R[A](0, u),
                p = q[A](0, o),
                d = q[A](0, u),
                v = p - c,
                m = d - h,
                g = {
                    x: c,
                    y: h,
                    x2: p,
                    y2: d,
                    width: v,
                    height: m,
                    cx: c + v / 2,
                    cy: h + m / 2
                };
            return t.bbox = r(g), g
        },
        Lt = function(e) {
            var t = r(e);
            return t.toString = n._path2string, t
        },
        At = n._pathToRelative = function(e) {
            var t = Ct(e);
            if (t.rel) return Lt(t.rel);
            n.is(e, $) && n.is(e && e[0], $) || (e = n.parsePathString(e));
            var r = [],
                i = 0,
                s = 0,
                o = 0,
                u = 0,
                a = 0;
            "M" == e[0][0] && (i = e[0][1], s = e[0][2], o = i, u = s, a++, r.push(["M", i, s]));
            for (var f = a, l = e.length; l > f; f++) {
                var c = r[f] = [],
                    h = e[f];
                if (h[0] != F.call(h[0])) switch (c[0] = F.call(h[0]), c[0]) {
                    case "a":
                        c[1] = h[1], c[2] = h[2], c[3] = h[3], c[4] = h[4], c[5] = h[5], c[6] = +(h[6] - i).toFixed(3), c[7] = +(h[7] - s).toFixed(3);
                        break;
                    case "v":
                        c[1] = +(h[1] - s).toFixed(3);
                        break;
                    case "m":
                        o = h[1], u = h[2];
                    default:
                        for (var p = 1, d = h.length; d > p; p++) c[p] = +(h[p] - (p % 2 ? i : s)).toFixed(3)
                } else {
                    c = r[f] = [], "m" == h[0] && (o = h[1] + i, u = h[2] + s);
                    for (var v = 0, m = h.length; m > v; v++) r[f][v] = h[v]
                }
                var g = r[f].length;
                switch (r[f][0]) {
                    case "z":
                        i = o, s = u;
                        break;
                    case "h":
                        i += +r[f][g - 1];
                        break;
                    case "v":
                        s += +r[f][g - 1];
                        break;
                    default:
                        i += +r[f][g - 2], s += +r[f][g - 1]
                }
            }
            return r.toString = n._path2string, t.rel = Lt(r), r
        },
        Ot = n._pathToAbsolute = function(e) {
            var t = Ct(e);
            if (t.abs) return Lt(t.abs);
            if (n.is(e, $) && n.is(e && e[0], $) || (e = n.parsePathString(e)), !e || !e.length) return [
                ["M", 0, 0]
            ];
            var r = [],
                i = 0,
                s = 0,
                o = 0,
                a = 0,
                f = 0;
            "M" == e[0][0] && (i = +e[0][1], s = +e[0][2], o = i, a = s, f++, r[0] = ["M", i, s]);
            for (var l, c, h = 3 == e.length && "M" == e[0][0] && "R" == e[1][0].toUpperCase() && "Z" == e[2][0].toUpperCase(), p = f, d = e.length; d > p; p++) {
                if (r.push(l = []), c = e[p], c[0] != tt.call(c[0])) switch (l[0] = tt.call(c[0]), l[0]) {
                        case "A":
                            l[1] = c[1], l[2] = c[2], l[3] = c[3], l[4] = c[4], l[5] = c[5], l[6] = +(c[6] + i), l[7] = +(c[7] + s);
                            break;
                        case "V":
                            l[1] = +c[1] + s;
                            break;
                        case "H":
                            l[1] = +c[1] + i;
                            break;
                        case "R":
                            for (var v = [i, s][O](c.slice(1)), m = 2, g = v.length; g > m; m++) v[m] = +v[m] + i, v[++m] = +v[m] + s;
                            r.pop(), r = r[O](u(v, h));
                            break;
                        case "M":
                            o = +c[1] + i, a = +c[2] + s;
                        default:
                            for (m = 1, g = c.length; g > m; m++) l[m] = +c[m] + (m % 2 ? i : s)
                    } else if ("R" == c[0]) v = [i, s][O](c.slice(1)), r.pop(), r = r[O](u(v, h)), l = ["R"][O](c.slice(-2));
                    else
                        for (var y = 0, b = c.length; b > y; y++) l[y] = c[y];
                switch (l[0]) {
                    case "Z":
                        i = o, s = a;
                        break;
                    case "H":
                        i = l[1];
                        break;
                    case "V":
                        s = l[1];
                        break;
                    case "M":
                        o = l[l.length - 2], a = l[l.length - 1];
                    default:
                        i = l[l.length - 2], s = l[l.length - 1]
                }
            }
            return r.toString = n._path2string, t.abs = Lt(r), r
        },
        Mt = function(e, t, n, r) {
            return [e, t, n, r, n, r]
        },
        _t = function(e, t, n, r, i, s) {
            var o = 1 / 3,
                u = 2 / 3;
            return [o * e + u * n, o * t + u * r, o * i + u * n, o * s + u * r, i, s]
        },
        Dt = function(e, t, n, r, i, o, u, a, f, l) {
            var c, h = 120 * W / 180,
                p = W / 180 * (+i || 0),
                d = [],
                v = s(function(e, t, n) {
                    var r = e * I.cos(n) - t * I.sin(n),
                        i = e * I.sin(n) + t * I.cos(n);
                    return {
                        x: r,
                        y: i
                    }
                });
            if (l) T = l[0], N = l[1], S = l[2], x = l[3];
            else {
                c = v(e, t, -p), e = c.x, t = c.y, c = v(a, f, -p), a = c.x, f = c.y;
                var m = (I.cos(W / 180 * i), I.sin(W / 180 * i), (e - a) / 2),
                    g = (t - f) / 2,
                    y = m * m / (n * n) + g * g / (r * r);
                y > 1 && (y = I.sqrt(y), n = y * n, r = y * r);
                var b = n * n,
                    w = r * r,
                    E = (o == u ? -1 : 1) * I.sqrt(U((b * w - b * g * g - w * m * m) / (b * g * g + w * m * m))),
                    S = E * n * g / r + (e + a) / 2,
                    x = E * -r * m / n + (t + f) / 2,
                    T = I.asin(((t - x) / r).toFixed(9)),
                    N = I.asin(((f - x) / r).toFixed(9));
                T = S > e ? W - T : T, N = S > a ? W - N : N, 0 > T && (T = 2 * W + T), 0 > N && (N = 2 * W + N), u && T > N && (T -= 2 * W), !u && N > T && (N -= 2 * W)
            }
            var C = N - T;
            if (U(C) > h) {
                var k = N,
                    L = a,
                    A = f;
                N = T + h * (u && N > T ? 1 : -1), a = S + n * I.cos(N), f = x + r * I.sin(N), d = Dt(a, f, n, r, i, 0, u, L, A, [N, k, S, x])
            }
            C = N - T;
            var M = I.cos(T),
                _ = I.sin(T),
                D = I.cos(N),
                P = I.sin(N),
                B = I.tan(C / 4),
                j = 4 / 3 * n * B,
                F = 4 / 3 * r * B,
                q = [e, t],
                R = [e + j * _, t - F * M],
                z = [a + j * P, f - F * D],
                X = [a, f];
            if (R[0] = 2 * q[0] - R[0], R[1] = 2 * q[1] - R[1], l) return [R, z, X][O](d);
            d = [R, z, X][O](d).join()[H](",");
            for (var V = [], $ = 0, J = d.length; J > $; $++) V[$] = $ % 2 ? v(d[$ - 1], d[$], p).y : v(d[$], d[$ + 1], p).x;
            return V
        },
        Pt = function(e, t, n, r, i, s, o, u, a) {
            var f = 1 - a;
            return {
                x: z(f, 3) * e + 3 * z(f, 2) * a * n + 3 * f * a * a * i + z(a, 3) * o,
                y: z(f, 3) * t + 3 * z(f, 2) * a * r + 3 * f * a * a * s + z(a, 3) * u
            }
        },
        Ht = s(function(e, t, n, r, i, s, o, u) {
            var a, f = i - 2 * n + e - (o - 2 * i + n),
                l = 2 * (n - e) - 2 * (i - n),
                c = e - n,
                h = (-l + I.sqrt(l * l - 4 * f * c)) / 2 / f,
                p = (-l - I.sqrt(l * l - 4 * f * c)) / 2 / f,
                d = [t, u],
                v = [e, o];
            return U(h) > "1e12" && (h = .5), U(p) > "1e12" && (p = .5), h > 0 && 1 > h && (a = Pt(e, t, n, r, i, s, o, u, h), v.push(a.x), d.push(a.y)), p > 0 && 1 > p && (a = Pt(e, t, n, r, i, s, o, u, p), v.push(a.x), d.push(a.y)), f = s - 2 * r + t - (u - 2 * s + r), l = 2 * (r - t) - 2 * (s - r), c = t - r, h = (-l + I.sqrt(l * l - 4 * f * c)) / 2 / f, p = (-l - I.sqrt(l * l - 4 * f * c)) / 2 / f, U(h) > "1e12" && (h = .5), U(p) > "1e12" && (p = .5), h > 0 && 1 > h && (a = Pt(e, t, n, r, i, s, o, u, h), v.push(a.x), d.push(a.y)), p > 0 && 1 > p && (a = Pt(e, t, n, r, i, s, o, u, p), v.push(a.x), d.push(a.y)), {
                min: {
                    x: R[A](0, v),
                    y: R[A](0, d)
                },
                max: {
                    x: q[A](0, v),
                    y: q[A](0, d)
                }
            }
        }),
        Bt = n._path2curve = s(function(e, t) {
            var n = !t && Ct(e);
            if (!t && n.curve) return Lt(n.curve);
            for (var r = Ot(e), i = t && Ot(t), s = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                }, o = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                }, u = function(e, t, n) {
                    var r, i;
                    if (!e) return ["C", t.x, t.y, t.x, t.y, t.x, t.y];
                    switch (!(e[0] in {
                        T: 1,
                        Q: 1
                    }) && (t.qx = t.qy = null), e[0]) {
                        case "M":
                            t.X = e[1], t.Y = e[2];
                            break;
                        case "A":
                            e = ["C"][O](Dt[A](0, [t.x, t.y][O](e.slice(1))));
                            break;
                        case "S":
                            "C" == n || "S" == n ? (r = 2 * t.x - t.bx, i = 2 * t.y - t.by) : (r = t.x, i = t.y), e = ["C", r, i][O](e.slice(1));
                            break;
                        case "T":
                            "Q" == n || "T" == n ? (t.qx = 2 * t.x - t.qx, t.qy = 2 * t.y - t.qy) : (t.qx = t.x, t.qy = t.y), e = ["C"][O](_t(t.x, t.y, t.qx, t.qy, e[1], e[2]));
                            break;
                        case "Q":
                            t.qx = e[1], t.qy = e[2], e = ["C"][O](_t(t.x, t.y, e[1], e[2], e[3], e[4]));
                            break;
                        case "L":
                            e = ["C"][O](Mt(t.x, t.y, e[1], e[2]));
                            break;
                        case "H":
                            e = ["C"][O](Mt(t.x, t.y, e[1], t.y));
                            break;
                        case "V":
                            e = ["C"][O](Mt(t.x, t.y, t.x, e[1]));
                            break;
                        case "Z":
                            e = ["C"][O](Mt(t.x, t.y, t.X, t.Y))
                    }
                    return e
                }, a = function(e, t) {
                    if (e[t].length > 7) {
                        e[t].shift();
                        for (var n = e[t]; n.length;) e.splice(t++, 0, ["C"][O](n.splice(0, 6)));
                        e.splice(t, 1), c = q(r.length, i && i.length || 0)
                    }
                }, f = function(e, t, n, s, o) {
                    e && t && "M" == e[o][0] && "M" != t[o][0] && (t.splice(o, 0, ["M", s.x, s.y]), n.bx = 0, n.by = 0, n.x = e[o][1], n.y = e[o][2], c = q(r.length, i && i.length || 0))
                }, l = 0, c = q(r.length, i && i.length || 0); c > l; l++) {
                r[l] = u(r[l], s), a(r, l), i && (i[l] = u(i[l], o)), i && a(i, l), f(r, i, s, o, l), f(i, r, o, s, l);
                var h = r[l],
                    p = i && i[l],
                    d = h.length,
                    v = i && p.length;
                s.x = h[d - 2], s.y = h[d - 1], s.bx = Z(h[d - 4]) || s.x, s.by = Z(h[d - 3]) || s.y, o.bx = i && (Z(p[v - 4]) || o.x), o.by = i && (Z(p[v - 3]) || o.y), o.x = i && p[v - 2], o.y = i && p[v - 1]
            }
            return i || (n.curve = Lt(r)), i ? [r, i] : r
        }, null, Lt),
        jt = (n._parseDots = s(function(e) {
            for (var t = [], r = 0, i = e.length; i > r; r++) {
                var s = {},
                    o = e[r].match(/^([^:]*):?([\d\.]*)/);
                if (s.color = n.getRGB(o[1]), s.color.error) return null;
                s.color = s.color.hex, o[2] && (s.offset = o[2] + "%"), t.push(s)
            }
            for (r = 1, i = t.length - 1; i > r; r++)
                if (!t[r].offset) {
                    for (var u = Z(t[r - 1].offset || 0), a = 0, f = r + 1; i > f; f++)
                        if (t[f].offset) {
                            a = t[f].offset;
                            break
                        }
                    a || (a = 100, f = i), a = Z(a);
                    for (var l = (a - u) / (f - r + 1); f > r; r++) u += l, t[r].offset = u + "%"
                }
            return t
        }), n._tear = function(e, t) {
            e == t.top && (t.top = e.prev), e == t.bottom && (t.bottom = e.next), e.next && (e.next.prev = e.prev), e.prev && (e.prev.next = e.next)
        }),
        Ft = (n._tofront = function(e, t) {
            t.top !== e && (jt(e, t), e.next = null, e.prev = t.top, t.top.next = e, t.top = e)
        }, n._toback = function(e, t) {
            t.bottom !== e && (jt(e, t), e.next = t.bottom, e.prev = null, t.bottom.prev = e, t.bottom = e)
        }, n._insertafter = function(e, t, n) {
            jt(e, n), t == n.top && (n.top = e), t.next && (t.next.prev = e), e.next = t.next, e.prev = t, t.next = e
        }, n._insertbefore = function(e, t, n) {
            jt(e, n), t == n.bottom && (n.bottom = e), t.prev && (t.prev.next = e), e.prev = t.prev, t.prev = e, e.next = t
        }, n.toMatrix = function(e, t) {
            var n = kt(e),
                r = {
                    _: {
                        transform: _
                    },
                    getBBox: function() {
                        return n
                    }
                };
            return It(r, t), r.matrix
        }),
        It = (n.transformPath = function(e, t) {
            return gt(e, Ft(e, t))
        }, n._extractTransform = function(e, t) {
            if (null == t) return e._.transform;
            t = P(t).replace(/\.{3}|\u2026/g, e._.transform || _);
            var r = n.parseTransformString(t),
                i = 0,
                s = 0,
                o = 0,
                u = 1,
                a = 1,
                f = e._,
                l = new d;
            if (f.transform = r || [], r)
                for (var c = 0, h = r.length; h > c; c++) {
                    var p, v, m, g, y, b = r[c],
                        w = b.length,
                        E = P(b[0]).toLowerCase(),
                        S = b[0] != E,
                        x = S ? l.invert() : 0;
                    "t" == E && 3 == w ? S ? (p = x.x(0, 0), v = x.y(0, 0), m = x.x(b[1], b[2]), g = x.y(b[1], b[2]), l.translate(m - p, g - v)) : l.translate(b[1], b[2]) : "r" == E ? 2 == w ? (y = y || e.getBBox(1), l.rotate(b[1], y.x + y.width / 2, y.y + y.height / 2), i += b[1]) : 4 == w && (S ? (m = x.x(b[2], b[3]), g = x.y(b[2], b[3]), l.rotate(b[1], m, g)) : l.rotate(b[1], b[2], b[3]), i += b[1]) : "s" == E ? 2 == w || 3 == w ? (y = y || e.getBBox(1), l.scale(b[1], b[w - 1], y.x + y.width / 2, y.y + y.height / 2), u *= b[1], a *= b[w - 1]) : 5 == w && (S ? (m = x.x(b[3], b[4]), g = x.y(b[3], b[4]), l.scale(b[1], b[2], m, g)) : l.scale(b[1], b[2], b[3], b[4]), u *= b[1], a *= b[2]) : "m" == E && 7 == w && l.add(b[1], b[2], b[3], b[4], b[5], b[6]), f.dirtyT = 1, e.matrix = l
                }
            e.matrix = l, f.sx = u, f.sy = a, f.deg = i, f.dx = s = l.e, f.dy = o = l.f, 1 == u && 1 == a && !i && f.bbox ? (f.bbox.x += +s, f.bbox.y += +o) : f.dirtyT = 1
        }),
        qt = function(e) {
            var t = e[0];
            switch (t.toLowerCase()) {
                case "t":
                    return [t, 0, 0];
                case "m":
                    return [t, 1, 0, 0, 1, 0, 0];
                case "r":
                    return 4 == e.length ? [t, 0, e[2], e[3]] : [t, 0];
                case "s":
                    return 5 == e.length ? [t, 1, 1, e[3], e[4]] : 3 == e.length ? [t, 1, 1] : [t, 1]
            }
        },
        Rt = n._equaliseTransform = function(e, t) {
            t = P(t).replace(/\.{3}|\u2026/g, e), e = n.parseTransformString(e) || [], t = n.parseTransformString(t) || [];
            for (var r, i, s, o, u = q(e.length, t.length), a = [], f = [], l = 0; u > l; l++) {
                if (s = e[l] || qt(t[l]), o = t[l] || qt(s), s[0] != o[0] || "r" == s[0].toLowerCase() && (s[2] != o[2] || s[3] != o[3]) || "s" == s[0].toLowerCase() && (s[3] != o[3] || s[4] != o[4])) return;
                for (a[l] = [], f[l] = [], r = 0, i = q(s.length, o.length); i > r; r++) r in s && (a[l][r] = s[r]), r in o && (f[l][r] = o[r])
            }
            return {
                from: a,
                to: f
            }
        };
    n._getContainer = function(e, t, r, i) {
            var s;
            return s = null != i || n.is(e, "object") ? e : C.doc.getElementById(e), null != s ? s.tagName ? null == t ? {
                container: s,
                width: s.style.pixelWidth || s.offsetWidth,
                height: s.style.pixelHeight || s.offsetHeight
            } : {
                container: s,
                width: t,
                height: r
            } : {
                container: 1,
                x: e,
                y: t,
                width: r,
                height: i
            } : void 0
        }, n.pathToRelative = At, n._engine = {}, n.path2curve = Bt, n.matrix = function(e, t, n, r, i, s) {
            return new d(e, t, n, r, i, s)
        },
        function(e) {
            function t(e) {
                return e[0] * e[0] + e[1] * e[1]
            }

            function r(e) {
                var n = I.sqrt(t(e));
                e[0] && (e[0] /= n), e[1] && (e[1] /= n)
            }
            e.add = function(e, t, n, r, i, s) {
                var o, u, a, f, l = [
                        [],
                        [],
                        []
                    ],
                    c = [
                        [this.a, this.c, this.e],
                        [this.b, this.d, this.f],
                        [0, 0, 1]
                    ],
                    h = [
                        [e, n, i],
                        [t, r, s],
                        [0, 0, 1]
                    ];
                for (e && e instanceof d && (h = [
                        [e.a, e.c, e.e],
                        [e.b, e.d, e.f],
                        [0, 0, 1]
                    ]), o = 0; 3 > o; o++)
                    for (u = 0; 3 > u; u++) {
                        for (f = 0, a = 0; 3 > a; a++) f += c[o][a] * h[a][u];
                        l[o][u] = f
                    }
                this.a = l[0][0], this.b = l[1][0], this.c = l[0][1], this.d = l[1][1], this.e = l[0][2], this.f = l[1][2]
            }, e.invert = function() {
                var e = this,
                    t = e.a * e.d - e.b * e.c;
                return new d(e.d / t, -e.b / t, -e.c / t, e.a / t, (e.c * e.f - e.d * e.e) / t, (e.b * e.e - e.a * e.f) / t)
            }, e.clone = function() {
                return new d(this.a, this.b, this.c, this.d, this.e, this.f)
            }, e.translate = function(e, t) {
                this.add(1, 0, 0, 1, e, t)
            }, e.scale = function(e, t, n, r) {
                null == t && (t = e), (n || r) && this.add(1, 0, 0, 1, n, r), this.add(e, 0, 0, t, 0, 0), (n || r) && this.add(1, 0, 0, 1, -n, -r)
            }, e.rotate = function(e, t, r) {
                e = n.rad(e), t = t || 0, r = r || 0;
                var i = +I.cos(e).toFixed(9),
                    s = +I.sin(e).toFixed(9);
                this.add(i, s, -s, i, t, r), this.add(1, 0, 0, 1, -t, -r)
            }, e.x = function(e, t) {
                return e * this.a + t * this.c + this.e
            }, e.y = function(e, t) {
                return e * this.b + t * this.d + this.f
            }, e.get = function(e) {
                return +this[P.fromCharCode(97 + e)].toFixed(4)
            }, e.toString = function() {
                return n.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
            }, e.toFilter = function() {
                return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
            }, e.offset = function() {
                return [this.e.toFixed(4), this.f.toFixed(4)]
            }, e.split = function() {
                var e = {};
                e.dx = this.e, e.dy = this.f;
                var i = [
                    [this.a, this.c],
                    [this.b, this.d]
                ];
                e.scalex = I.sqrt(t(i[0])), r(i[0]), e.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1], i[1] = [i[1][0] - i[0][0] * e.shear, i[1][1] - i[0][1] * e.shear], e.scaley = I.sqrt(t(i[1])), r(i[1]), e.shear /= e.scaley;
                var s = -i[0][1],
                    o = i[1][1];
                return 0 > o ? (e.rotate = n.deg(I.acos(o)), 0 > s && (e.rotate = 360 - e.rotate)) : e.rotate = n.deg(I.asin(s)), e.isSimple = !(+e.shear.toFixed(9) || e.scalex.toFixed(9) != e.scaley.toFixed(9) && e.rotate), e.isSuperSimple = !+e.shear.toFixed(9) && e.scalex.toFixed(9) == e.scaley.toFixed(9) && !e.rotate, e.noRotation = !+e.shear.toFixed(9) && !e.rotate, e
            }, e.toTransformString = function(e) {
                var t = e || this[H]();
                return t.isSimple ? (t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), t.rotate = +t.rotate.toFixed(4), (t.dx || t.dy ? "t" + [t.dx, t.dy] : _) + (1 != t.scalex || 1 != t.scaley ? "s" + [t.scalex, t.scaley, 0, 0] : _) + (t.rotate ? "r" + [t.rotate, 0, 0] : _)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
            }
        }(d.prototype);
    var Ut = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    E.safari = "Apple Computer, Inc." == navigator.vendor && (Ut && Ut[1] < 4 || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && Ut && Ut[1] < 8 ? function() {
        var e = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
            stroke: "none"
        });
        setTimeout(function() {
            e.remove()
        })
    } : ht;
    for (var zt = function() {
            this.returnValue = !1
        }, Wt = function() {
            return this.originalEvent.preventDefault()
        }, Xt = function() {
            this.cancelBubble = !0
        }, Vt = function() {
            return this.originalEvent.stopPropagation()
        }, $t = function(e) {
            var t = C.doc.documentElement.scrollTop || C.doc.body.scrollTop,
                n = C.doc.documentElement.scrollLeft || C.doc.body.scrollLeft;
            return {
                x: e.clientX + n,
                y: e.clientY + t
            }
        }, Jt = function() {
            return C.doc.addEventListener ? function(e, t, n, r) {
                var i = function(e) {
                    var t = $t(e);
                    return n.call(r, e, t.x, t.y)
                };
                if (e.addEventListener(t, i, !1), M && j[t]) {
                    var s = function(t) {
                        for (var i = $t(t), s = t, o = 0, u = t.targetTouches && t.targetTouches.length; u > o; o++)
                            if (t.targetTouches[o].target == e) {
                                t = t.targetTouches[o], t.originalEvent = s, t.preventDefault = Wt, t.stopPropagation = Vt;
                                break
                            }
                        return n.call(r, t, i.x, i.y)
                    };
                    e.addEventListener(j[t], s, !1)
                }
                return function() {
                    return e.removeEventListener(t, i, !1), M && j[t] && e.removeEventListener(j[t], i, !1), !0
                }
            } : C.doc.attachEvent ? function(e, t, n, r) {
                var i = function(e) {
                    e = e || C.win.event;
                    var t = C.doc.documentElement.scrollTop || C.doc.body.scrollTop,
                        i = C.doc.documentElement.scrollLeft || C.doc.body.scrollLeft,
                        s = e.clientX + i,
                        o = e.clientY + t;
                    return e.preventDefault = e.preventDefault || zt, e.stopPropagation = e.stopPropagation || Xt, n.call(r, e, s, o)
                };
                e.attachEvent("on" + t, i);
                var s = function() {
                    return e.detachEvent("on" + t, i), !0
                };
                return s
            } : void 0
        }(), Kt = [], Qt = function(e) {
            for (var n, r = e.clientX, i = e.clientY, s = C.doc.documentElement.scrollTop || C.doc.body.scrollTop, o = C.doc.documentElement.scrollLeft || C.doc.body.scrollLeft, u = Kt.length; u--;) {
                if (n = Kt[u], M && e.touches) {
                    for (var a, f = e.touches.length; f--;)
                        if (a = e.touches[f], a.identifier == n.el._drag.id) {
                            r = a.clientX, i = a.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
                            break
                        }
                } else e.preventDefault();
                var l, c = n.el.node,
                    h = c.nextSibling,
                    p = c.parentNode,
                    d = c.style.display;
                C.win.opera && p.removeChild(c), c.style.display = "none", l = n.el.paper.getElementByPoint(r, i), c.style.display = d, C.win.opera && (h ? p.insertBefore(c, h) : p.appendChild(c)), l && t("raphael.drag.over." + n.el.id, n.el, l), r += o, i += s, t("raphael.drag.move." + n.el.id, n.move_scope || n.el, r - n.el._drag.x, i - n.el._drag.y, r, i, e)
            }
        }, Gt = function(e) {
            n.unmousemove(Qt).unmouseup(Gt);
            for (var r, i = Kt.length; i--;) r = Kt[i], r.el._drag = {}, t("raphael.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, e);
            Kt = []
        }, Yt = n.el = {}, Zt = B.length; Zt--;) ! function(e) {
        n[e] = Yt[e] = function(t, r) {
            return n.is(t, "function") && (this.events = this.events || [], this.events.push({
                name: e,
                f: t,
                unbind: Jt(this.shape || this.node || C.doc, e, t, r || this)
            })), this
        }, n["un" + e] = Yt["un" + e] = function(t) {
            for (var r = this.events || [], i = r.length; i--;) r[i].name != e || !n.is(t, "undefined") && r[i].f != t || (r[i].unbind(), r.splice(i, 1), !r.length && delete this.events);
            return this
        }
    }(B[Zt]);
    Yt.data = function(e, r) {
        var i = lt[this.id] = lt[this.id] || {};
        if (0 == arguments.length) return i;
        if (1 == arguments.length) {
            if (n.is(e, "object")) {
                for (var s in e) e[N](s) && this.data(s, e[s]);
                return this
            }
            return t("raphael.data.get." + this.id, this, i[e], e), i[e]
        }
        return i[e] = r, t("raphael.data.set." + this.id, this, r, e), this
    }, Yt.removeData = function(e) {
        return null == e ? lt[this.id] = {} : lt[this.id] && delete lt[this.id][e], this
    }, Yt.getData = function() {
        return r(lt[this.id] || {})
    }, Yt.hover = function(e, t, n, r) {
        return this.mouseover(e, n).mouseout(t, r || n)
    }, Yt.unhover = function(e, t) {
        return this.unmouseover(e).unmouseout(t)
    };
    var en = [];
    Yt.drag = function(e, r, i, s, o, u) {
        function a(a) {
            (a.originalEvent || a).preventDefault();
            var f = a.clientX,
                l = a.clientY,
                c = C.doc.documentElement.scrollTop || C.doc.body.scrollTop,
                h = C.doc.documentElement.scrollLeft || C.doc.body.scrollLeft;
            if (this._drag.id = a.identifier, M && a.touches)
                for (var p, d = a.touches.length; d--;)
                    if (p = a.touches[d], this._drag.id = p.identifier, p.identifier == this._drag.id) {
                        f = p.clientX, l = p.clientY;
                        break
                    }
            this._drag.x = f + h, this._drag.y = l + c, !Kt.length && n.mousemove(Qt).mouseup(Gt), Kt.push({
                el: this,
                move_scope: s,
                start_scope: o,
                end_scope: u
            }), r && t.on("raphael.drag.start." + this.id, r), e && t.on("raphael.drag.move." + this.id, e), i && t.on("raphael.drag.end." + this.id, i), t("raphael.drag.start." + this.id, o || s || this, a.clientX + h, a.clientY + c, a)
        }
        return this._drag = {}, en.push({
            el: this,
            start: a
        }), this.mousedown(a), this
    }, Yt.onDragOver = function(e) {
        e ? t.on("raphael.drag.over." + this.id, e) : t.unbind("raphael.drag.over." + this.id)
    }, Yt.undrag = function() {
        for (var e = en.length; e--;) en[e].el == this && (this.unmousedown(en[e].start), en.splice(e, 1), t.unbind("raphael.drag.*." + this.id));
        !en.length && n.unmousemove(Qt).unmouseup(Gt), Kt = []
    }, E.circle = function(e, t, r) {
        var i = n._engine.circle(this, e || 0, t || 0, r || 0);
        return this.__set__ && this.__set__.push(i), i
    }, E.rect = function(e, t, r, i, s) {
        var o = n._engine.rect(this, e || 0, t || 0, r || 0, i || 0, s || 0);
        return this.__set__ && this.__set__.push(o), o
    }, E.ellipse = function(e, t, r, i) {
        var s = n._engine.ellipse(this, e || 0, t || 0, r || 0, i || 0);
        return this.__set__ && this.__set__.push(s), s
    }, E.path = function(e) {
        e && !n.is(e, V) && !n.is(e[0], $) && (e += _);
        var t = n._engine.path(n.format[A](n, arguments), this);
        return this.__set__ && this.__set__.push(t), t
    }, E.image = function(e, t, r, i, s) {
        var o = n._engine.image(this, e || "about:blank", t || 0, r || 0, i || 0, s || 0);
        return this.__set__ && this.__set__.push(o), o
    }, E.text = function(e, t, r) {
        var i = n._engine.text(this, e || 0, t || 0, P(r));
        return this.__set__ && this.__set__.push(i), i
    }, E.set = function(e) {
        !n.is(e, "array") && (e = Array.prototype.splice.call(arguments, 0, arguments.length));
        var t = new pn(e);
        return this.__set__ && this.__set__.push(t), t.paper = this, t.type = "set", t
    }, E.setStart = function(e) {
        this.__set__ = e || this.set()
    }, E.setFinish = function() {
        var e = this.__set__;
        return delete this.__set__, e
    }, E.setSize = function(e, t) {
        return n._engine.setSize.call(this, e, t)
    }, E.setViewBox = function(e, t, r, i, s) {
        return n._engine.setViewBox.call(this, e, t, r, i, s)
    }, E.top = E.bottom = null, E.raphael = n;
    var tn = function(e) {
        var t = e.getBoundingClientRect(),
            n = e.ownerDocument,
            r = n.body,
            i = n.documentElement,
            s = i.clientTop || r.clientTop || 0,
            o = i.clientLeft || r.clientLeft || 0,
            u = t.top + (C.win.pageYOffset || i.scrollTop || r.scrollTop) - s,
            a = t.left + (C.win.pageXOffset || i.scrollLeft || r.scrollLeft) - o;
        return {
            y: u,
            x: a
        }
    };
    E.getElementByPoint = function(e, t) {
        var n = this,
            r = n.canvas,
            i = C.doc.elementFromPoint(e, t);
        if (C.win.opera && "svg" == i.tagName) {
            var s = tn(r),
                o = r.createSVGRect();
            o.x = e - s.x, o.y = t - s.y, o.width = o.height = 1;
            var u = r.getIntersectionList(o, null);
            u.length && (i = u[u.length - 1])
        }
        if (!i) return null;
        for (; i.parentNode && i != r.parentNode && !i.raphael;) i = i.parentNode;
        return i == n.canvas.parentNode && (i = r), i = i && i.raphael ? n.getById(i.raphaelid) : null
    }, E.getElementsByBBox = function(e) {
        var t = this.set();
        return this.forEach(function(r) {
            n.isBBoxIntersect(r.getBBox(), e) && t.push(r)
        }), t
    }, E.getById = function(e) {
        for (var t = this.bottom; t;) {
            if (t.id == e) return t;
            t = t.next
        }
        return null
    }, E.forEach = function(e, t) {
        for (var n = this.bottom; n;) {
            if (e.call(t, n) === !1) return this;
            n = n.next
        }
        return this
    }, E.getElementsByPoint = function(e, t) {
        var n = this.set();
        return this.forEach(function(r) {
            r.isPointInside(e, t) && n.push(r)
        }), n
    }, Yt.isPointInside = function(e, t) {
        var r = this.realPath = mt[this.type](this);
        return this.attr("transform") && this.attr("transform").length && (r = n.transformPath(r, this.attr("transform"))), n.isPointInsidePath(r, e, t)
    }, Yt.getBBox = function(e) {
        if (this.removed) return {};
        var t = this._;
        return e ? ((t.dirty || !t.bboxwt) && (this.realPath = mt[this.type](this), t.bboxwt = kt(this.realPath), t.bboxwt.toString = v, t.dirty = 0), t.bboxwt) : ((t.dirty || t.dirtyT || !t.bbox) && ((t.dirty || !this.realPath) && (t.bboxwt = 0, this.realPath = mt[this.type](this)), t.bbox = kt(gt(this.realPath, this.matrix)), t.bbox.toString = v, t.dirty = t.dirtyT = 0), t.bbox)
    }, Yt.clone = function() {
        if (this.removed) return null;
        var e = this.paper[this.type]().attr(this.attr());
        return this.__set__ && this.__set__.push(e), e
    }, Yt.glow = function(e) {
        if ("text" == this.type) return null;
        e = e || {};
        var t = {
                width: (e.width || 10) + (+this.attr("stroke-width") || 1),
                fill: e.fill || !1,
                opacity: e.opacity || .5,
                offsetx: e.offsetx || 0,
                offsety: e.offsety || 0,
                color: e.color || "#000"
            },
            n = t.width / 2,
            r = this.paper,
            i = r.set(),
            s = this.realPath || mt[this.type](this);
        s = this.matrix ? gt(s, this.matrix) : s;
        for (var o = 1; n + 1 > o; o++) i.push(r.path(s).attr({
            stroke: t.color,
            fill: t.fill ? t.color : "none",
            "stroke-linejoin": "round",
            "stroke-linecap": "round",
            "stroke-width": +(t.width / n * o).toFixed(3),
            opacity: +(t.opacity / n).toFixed(3)
        }));
        return i.insertBefore(this).translate(t.offsetx, t.offsety)
    };
    var nn = function(e, t, r, i, s, o, u, a, c) {
            return null == c ? f(e, t, r, i, s, o, u, a) : n.findDotsAtSegment(e, t, r, i, s, o, u, a, l(e, t, r, i, s, o, u, a, c))
        },
        rn = function(e, t) {
            return function(r, i, s) {
                r = Bt(r);
                for (var o, u, a, f, l, c = "", h = {}, p = 0, d = 0, v = r.length; v > d; d++) {
                    if (a = r[d], "M" == a[0]) o = +a[1], u = +a[2];
                    else {
                        if (f = nn(o, u, a[1], a[2], a[3], a[4], a[5], a[6]), p + f > i) {
                            if (t && !h.start) {
                                if (l = nn(o, u, a[1], a[2], a[3], a[4], a[5], a[6], i - p), c += ["C" + l.start.x, l.start.y, l.m.x, l.m.y, l.x, l.y], s) return c;
                                h.start = c, c = ["M" + l.x, l.y + "C" + l.n.x, l.n.y, l.end.x, l.end.y, a[5], a[6]].join(), p += f, o = +a[5], u = +a[6];
                                continue
                            }
                            if (!e && !t) return l = nn(o, u, a[1], a[2], a[3], a[4], a[5], a[6], i - p), {
                                x: l.x,
                                y: l.y,
                                alpha: l.alpha
                            }
                        }
                        p += f, o = +a[5], u = +a[6]
                    }
                    c += a.shift() + a
                }
                return h.end = c, l = e ? p : t ? h : n.findDotsAtSegment(o, u, a[0], a[1], a[2], a[3], a[4], a[5], 1), l.alpha && (l = {
                    x: l.x,
                    y: l.y,
                    alpha: l.alpha
                }), l
            }
        },
        sn = rn(1),
        on = rn(),
        un = rn(0, 1);
    n.getTotalLength = sn, n.getPointAtLength = on, n.getSubpath = function(e, t, n) {
        if (this.getTotalLength(e) - n < 1e-6) return un(e, t).end;
        var r = un(e, n, 1);
        return t ? un(r, t).end : r
    }, Yt.getTotalLength = function() {
        var e = this.getPath();
        if (e) return this.node.getTotalLength ? this.node.getTotalLength() : sn(e)
    }, Yt.getPointAtLength = function(e) {
        var t = this.getPath();
        if (t) return on(t, e)
    }, Yt.getPath = function() {
        var e, t = n._getPath[this.type];
        if ("text" != this.type && "set" != this.type) return t && (e = t(this)), e
    }, Yt.getSubpath = function(e, t) {
        var r = this.getPath();
        if (r) return n.getSubpath(r, e, t)
    };
    var an = n.easing_formulas = {
        linear: function(e) {
            return e
        },
        "<": function(e) {
            return z(e, 1.7)
        },
        ">": function(e) {
            return z(e, .48)
        },
        "<>": function(e) {
            var t = .48 - e / 1.04,
                n = I.sqrt(.1734 + t * t),
                r = n - t,
                i = z(U(r), 1 / 3) * (0 > r ? -1 : 1),
                s = -n - t,
                o = z(U(s), 1 / 3) * (0 > s ? -1 : 1),
                u = i + o + .5;
            return 3 * (1 - u) * u * u + u * u * u
        },
        backIn: function(e) {
            var t = 1.70158;
            return e * e * ((t + 1) * e - t)
        },
        backOut: function(e) {
            e -= 1;
            var t = 1.70158;
            return e * e * ((t + 1) * e + t) + 1
        },
        elastic: function(e) {
            return e == !!e ? e : z(2, -10 * e) * I.sin((e - .075) * 2 * W / .3) + 1
        },
        bounce: function(e) {
            var t, n = 7.5625,
                r = 2.75;
            return 1 / r > e ? t = n * e * e : 2 / r > e ? (e -= 1.5 / r, t = n * e * e + .75) : 2.5 / r > e ? (e -= 2.25 / r, t = n * e * e + .9375) : (e -= 2.625 / r, t = n * e * e + .984375), t
        }
    };
    an.easeIn = an["ease-in"] = an["<"], an.easeOut = an["ease-out"] = an[">"], an.easeInOut = an["ease-in-out"] = an["<>"], an["back-in"] = an.backIn, an["back-out"] = an.backOut;
    var fn = [],
        ln = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
            setTimeout(e, 16)
        },
        cn = function() {
            for (var e = +(new Date), r = 0; r < fn.length; r++) {
                var i = fn[r];
                if (!i.el.removed && !i.paused) {
                    var s, o, u = e - i.start,
                        a = i.ms,
                        f = i.easing,
                        l = i.from,
                        c = i.diff,
                        h = i.to,
                        p = (i.t, i.el),
                        d = {},
                        v = {};
                    if (i.initstatus ? (u = (i.initstatus * i.anim.top - i.prev) / (i.percent - i.prev) * a, i.status = i.initstatus, delete i.initstatus, i.stop && fn.splice(r--, 1)) : i.status = (i.prev + (i.percent - i.prev) * (u / a)) / i.anim.top, !(0 > u))
                        if (a > u) {
                            var m = f(u / a);
                            for (var g in l)
                                if (l[N](g)) {
                                    switch (rt[g]) {
                                        case X:
                                            s = +l[g] + m * a * c[g];
                                            break;
                                        case "colour":
                                            s = "rgb(" + [hn(Y(l[g].r + m * a * c[g].r)), hn(Y(l[g].g + m * a * c[g].g)), hn(Y(l[g].b + m * a * c[g].b))].join(",") + ")";
                                            break;
                                        case "path":
                                            s = [];
                                            for (var b = 0, w = l[g].length; w > b; b++) {
                                                s[b] = [l[g][b][0]];
                                                for (var E = 1, S = l[g][b].length; S > E; E++) s[b][E] = +l[g][b][E] + m * a * c[g][b][E];
                                                s[b] = s[b].join(D)
                                            }
                                            s = s.join(D);
                                            break;
                                        case "transform":
                                            if (c[g].real)
                                                for (s = [], b = 0, w = l[g].length; w > b; b++)
                                                    for (s[b] = [l[g][b][0]], E = 1, S = l[g][b].length; S > E; E++) s[b][E] = l[g][b][E] + m * a * c[g][b][E];
                                            else {
                                                var x = function(e) {
                                                    return +l[g][e] + m * a * c[g][e]
                                                };
                                                s = [
                                                    ["m", x(0), x(1), x(2), x(3), x(4), x(5)]
                                                ]
                                            }
                                            break;
                                        case "csv":
                                            if ("clip-rect" == g)
                                                for (s = [], b = 4; b--;) s[b] = +l[g][b] + m * a * c[g][b];
                                            break;
                                        default:
                                            var T = [][O](l[g]);
                                            for (s = [], b = p.paper.customAttributes[g].length; b--;) s[b] = +T[b] + m * a * c[g][b]
                                    }
                                    d[g] = s
                                }
                            p.attr(d),
                                function(e, n, r) {
                                    setTimeout(function() {
                                        t("raphael.anim.frame." + e, n, r)
                                    })
                                }(p.id, p, i.anim)
                        } else {
                            if (function(e, r, i) {
                                    setTimeout(function() {
                                        t("raphael.anim.frame." + r.id, r, i), t("raphael.anim.finish." + r.id, r, i), n.is(e, "function") && e.call(r)
                                    })
                                }(i.callback, p, i.anim), p.attr(h), fn.splice(r--, 1), i.repeat > 1 && !i.next) {
                                for (o in h) h[N](o) && (v[o] = i.totalOrigin[o]);
                                i.el.attr(v), y(i.anim, i.el, i.anim.percents[0], null, i.totalOrigin, i.repeat - 1)
                            }
                            i.next && !i.stop && y(i.anim, i.el, i.next, null, i.totalOrigin, i.repeat)
                        }
                }
            }
            n.svg && p && p.paper && p.paper.safari(), fn.length && ln(cn)
        },
        hn = function(e) {
            return e > 255 ? 255 : 0 > e ? 0 : e
        };
    Yt.animateWith = function(e, t, r, i, s, o) {
        var u = this;
        if (u.removed) return o && o.call(u), u;
        var a = r instanceof g ? r : n.animation(r, i, s, o);
        y(a, u, a.percents[0], null, u.attr());
        for (var f = 0, l = fn.length; l > f; f++)
            if (fn[f].anim == t && fn[f].el == e) {
                fn[l - 1].start = fn[f].start;
                break
            }
        return u
    }, Yt.onAnimation = function(e) {
        return e ? t.on("raphael.anim.frame." + this.id, e) : t.unbind("raphael.anim.frame." + this.id), this
    }, g.prototype.delay = function(e) {
        var t = new g(this.anim, this.ms);
        return t.times = this.times, t.del = +e || 0, t
    }, g.prototype.repeat = function(e) {
        var t = new g(this.anim, this.ms);
        return t.del = this.del, t.times = I.floor(q(e, 0)) || 1, t
    }, n.animation = function(e, t, r, i) {
        if (e instanceof g) return e;
        (n.is(r, "function") || !r) && (i = i || r || null, r = null), e = Object(e), t = +t || 0;
        var s, o, u = {};
        for (o in e) e[N](o) && Z(o) != o && Z(o) + "%" != o && (s = !0, u[o] = e[o]);
        return s ? (r && (u.easing = r), i && (u.callback = i), new g({
            100: u
        }, t)) : new g(e, t)
    }, Yt.animate = function(e, t, r, i) {
        var s = this;
        if (s.removed) return i && i.call(s), s;
        var o = e instanceof g ? e : n.animation(e, t, r, i);
        return y(o, s, o.percents[0], null, s.attr()), s
    }, Yt.setTime = function(e, t) {
        return e && null != t && this.status(e, R(t, e.ms) / e.ms), this
    }, Yt.status = function(e, t) {
        var n, r, i = [],
            s = 0;
        if (null != t) return y(e, this, -1, R(t, 1)), this;
        for (n = fn.length; n > s; s++)
            if (r = fn[s], r.el.id == this.id && (!e || r.anim == e)) {
                if (e) return r.status;
                i.push({
                    anim: r.anim,
                    status: r.status
                })
            }
        return e ? 0 : i
    }, Yt.pause = function(e) {
        for (var n = 0; n < fn.length; n++) fn[n].el.id != this.id || e && fn[n].anim != e || t("raphael.anim.pause." + this.id, this, fn[n].anim) !== !1 && (fn[n].paused = !0);
        return this
    }, Yt.resume = function(e) {
        for (var n = 0; n < fn.length; n++)
            if (fn[n].el.id == this.id && (!e || fn[n].anim == e)) {
                var r = fn[n];
                t("raphael.anim.resume." + this.id, this, r.anim) !== !1 && (delete r.paused, this.status(r.anim, r.status))
            }
        return this
    }, Yt.stop = function(e) {
        for (var n = 0; n < fn.length; n++) fn[n].el.id != this.id || e && fn[n].anim != e || t("raphael.anim.stop." + this.id, this, fn[n].anim) !== !1 && fn.splice(n--, 1);
        return this
    }, t.on("raphael.remove", b), t.on("raphael.clear", b), Yt.toString = function() {
        return "Raphaël’s object"
    };
    var pn = function(e) {
            if (this.items = [], this.length = 0, this.type = "set", e)
                for (var t = 0, n = e.length; n > t; t++) !e[t] || e[t].constructor != Yt.constructor && e[t].constructor != pn || (this[this.items.length] = this.items[this.items.length] = e[t], this.length++)
        },
        dn = pn.prototype;
    dn.push = function() {
        for (var e, t, n = 0, r = arguments.length; r > n; n++) e = arguments[n], !e || e.constructor != Yt.constructor && e.constructor != pn || (t = this.items.length, this[t] = this.items[t] = e, this.length++);
        return this
    }, dn.pop = function() {
        return this.length && delete this[this.length--], this.items.pop()
    }, dn.forEach = function(e, t) {
        for (var n = 0, r = this.items.length; r > n; n++)
            if (e.call(t, this.items[n], n) === !1) return this;
        return this
    };
    for (var vn in Yt) Yt[N](vn) && (dn[vn] = function(e) {
        return function() {
            var t = arguments;
            return this.forEach(function(n) {
                n[e][A](n, t)
            })
        }
    }(vn));
    return dn.attr = function(e, t) {
            if (e && n.is(e, $) && n.is(e[0], "object"))
                for (var r = 0, i = e.length; i > r; r++) this.items[r].attr(e[r]);
            else
                for (var s = 0, o = this.items.length; o > s; s++) this.items[s].attr(e, t);
            return this
        }, dn.clear = function() {
            for (; this.length;) this.pop()
        }, dn.splice = function(e, t) {
            e = 0 > e ? q(this.length + e, 0) : e, t = q(0, R(this.length - e, t));
            var n, r = [],
                i = [],
                s = [];
            for (n = 2; n < arguments.length; n++) s.push(arguments[n]);
            for (n = 0; t > n; n++) i.push(this[e + n]);
            for (; n < this.length - e; n++) r.push(this[e + n]);
            var o = s.length;
            for (n = 0; n < o + r.length; n++) this.items[e + n] = this[e + n] = o > n ? s[n] : r[n - o];
            for (n = this.items.length = this.length -= t - o; this[n];) delete this[n++];
            return new pn(i)
        }, dn.exclude = function(e) {
            for (var t = 0, n = this.length; n > t; t++)
                if (this[t] == e) return this.splice(t, 1), !0
        }, dn.animate = function(e, t, r, i) {
            (n.is(r, "function") || !r) && (i = r || null);
            var s, o, u = this.items.length,
                a = u,
                f = this;
            if (!u) return this;
            i && (o = function() {
                !--u && i.call(f)
            }), r = n.is(r, V) ? r : o;
            var l = n.animation(e, t, r, o);
            for (s = this.items[--a].animate(l); a--;) this.items[a] && !this.items[a].removed && this.items[a].animateWith(s, l, l), this.items[a] && !this.items[a].removed || u--;
            return this
        }, dn.insertAfter = function(e) {
            for (var t = this.items.length; t--;) this.items[t].insertAfter(e);
            return this
        }, dn.getBBox = function() {
            for (var e = [], t = [], n = [], r = [], i = this.items.length; i--;)
                if (!this.items[i].removed) {
                    var s = this.items[i].getBBox();
                    e.push(s.x), t.push(s.y), n.push(s.x + s.width), r.push(s.y + s.height)
                }
            return e = R[A](0, e), t = R[A](0, t), n = q[A](0, n), r = q[A](0, r), {
                x: e,
                y: t,
                x2: n,
                y2: r,
                width: n - e,
                height: r - t
            }
        }, dn.clone = function(e) {
            e = this.paper.set();
            for (var t = 0, n = this.items.length; n > t; t++) e.push(this.items[t].clone());
            return e
        }, dn.toString = function() {
            return "Raphaël‘s set"
        }, dn.glow = function(e) {
            var t = this.paper.set();
            return this.forEach(function(n) {
                var r = n.glow(e);
                null != r && r.forEach(function(e) {
                    t.push(e)
                })
            }), t
        }, dn.isPointInside = function(e, t) {
            var n = !1;
            return this.forEach(function(r) {
                return r.isPointInside(e, t) ? (console.log("runned"), n = !0, !1) : void 0
            }), n
        }, n.registerFont = function(e) {
            if (!e.face) return e;
            this.fonts = this.fonts || {};
            var t = {
                    w: e.w,
                    face: {},
                    glyphs: {}
                },
                n = e.face["font-family"];
            for (var r in e.face) e.face[N](r) && (t.face[r] = e.face[r]);
            if (this.fonts[n] ? this.fonts[n].push(t) : this.fonts[n] = [t], !e.svg) {
                t.face["units-per-em"] = et(e.face["units-per-em"], 10);
                for (var i in e.glyphs)
                    if (e.glyphs[N](i)) {
                        var s = e.glyphs[i];
                        if (t.glyphs[i] = {
                                w: s.w,
                                k: {},
                                d: s.d && "M" + s.d.replace(/[mlcxtrv]/g, function(e) {
                                    return {
                                        l: "L",
                                        c: "C",
                                        x: "z",
                                        t: "m",
                                        r: "l",
                                        v: "c"
                                    }[e] || "M"
                                }) + "z"
                            }, s.k)
                            for (var o in s.k) s[N](o) && (t.glyphs[i].k[o] = s.k[o])
                    }
            }
            return e
        }, E.getFont = function(e, t, r, i) {
            if (i = i || "normal", r = r || "normal", t = +t || {
                    normal: 400,
                    bold: 700,
                    lighter: 300,
                    bolder: 800
                }[t] || 400, n.fonts) {
                var s = n.fonts[e];
                if (!s) {
                    var o = new RegExp("(^|\\s)" + e.replace(/[^\w\d\s+!~.:_-]/g, _) + "(\\s|$)", "i");
                    for (var u in n.fonts)
                        if (n.fonts[N](u) && o.test(u)) {
                            s = n.fonts[u];
                            break
                        }
                }
                var a;
                if (s)
                    for (var f = 0, l = s.length; l > f && (a = s[f], a.face["font-weight"] != t || a.face["font-style"] != r && a.face["font-style"] || a.face["font-stretch"] != i); f++);
                return a
            }
        }, E.print = function(e, t, r, i, s, o, u, a) {
            o = o || "middle", u = q(R(u || 0, 1), -1), a = q(R(a || 1, 3), 1);
            var f, l = P(r)[H](_),
                c = 0,
                h = 0,
                p = _;
            if (n.is(i, "string") && (i = this.getFont(i)), i) {
                f = (s || 16) / i.face["units-per-em"];
                for (var d = i.face.bbox[H](S), v = +d[0], m = d[3] - d[1], g = 0, y = +d[1] + ("baseline" == o ? m + +i.face.descent : m / 2), b = 0, w = l.length; w > b; b++) {
                    if ("\n" == l[b]) c = 0, x = 0, h = 0, g += m * a;
                    else {
                        var E = h && i.glyphs[l[b - 1]] || {},
                            x = i.glyphs[l[b]];
                        c += h ? (E.w || i.w) + (E.k && E.k[l[b]] || 0) + i.w * u : 0, h = 1
                    }
                    x && x.d && (p += n.transformPath(x.d, ["t", c * f, g * f, "s", f, f, v, y, "t", (e - v) / f, (t - y) / f]))
                }
            }
            return this.path(p).attr({
                fill: "#000",
                stroke: "none"
            })
        }, E.add = function(e) {
            if (n.is(e, "array"))
                for (var t, r = this.set(), i = 0, s = e.length; s > i; i++) t = e[i] || {}, x[N](t.type) && r.push(this[t.type]().attr(t));
            return r
        }, n.format = function(e, t) {
            var r = n.is(t, $) ? [0][O](t) : arguments;
            return e && n.is(e, V) && r.length - 1 && (e = e.replace(T, function(e, t) {
                return null == r[++t] ? _ : r[t]
            })), e || _
        }, n.fullfill = function() {
            var e = /\{([^\}]+)\}/g,
                t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                n = function(e, n, r) {
                    var i = r;
                    return n.replace(t, function(e, t, n, r, s) {
                        t = t || r, i && (t in i && (i = i[t]), "function" == typeof i && s && (i = i()))
                    }), i = (null == i || i == r ? e : i) + ""
                };
            return function(t, r) {
                return String(t).replace(e, function(e, t) {
                    return n(e, t, r)
                })
            }
        }(), n.ninja = function() {
            return k.was ? C.win.Raphael = k.is : delete Raphael, n
        }, n.st = dn,
        function(e, t, r) {
            function i() {
                /in/.test(e.readyState) ? setTimeout(i, 9) : n.eve("raphael.DOMload")
            }
            null == e.readyState && e.addEventListener && (e.addEventListener(t, r = function() {
                e.removeEventListener(t, r, !1), e.readyState = "complete"
            }, !1), e.readyState = "loading"), i()
        }(document, "DOMContentLoaded"), t.on("raphael.DOMload", function() {
            w = !0
        }),
        function() {
            if (n.svg) {
                var e = "hasOwnProperty",
                    t = String,
                    r = parseFloat,
                    i = parseInt,
                    s = Math,
                    o = s.max,
                    u = s.abs,
                    a = s.pow,
                    f = /[, ]+/,
                    l = n.eve,
                    c = "",
                    h = " ",
                    p = "http://www.w3.org/1999/xlink",
                    d = {
                        block: "M5,0 0,2.5 5,5z",
                        classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                        diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                        open: "M6,1 1,3.5 6,6",
                        oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                    },
                    v = {};
                n.toString = function() {
                    return "Your browser supports SVG.\nYou are running Raphaël " + this.version
                };
                var m = function(r, i) {
                        if (i) {
                            "string" == typeof r && (r = m(r));
                            for (var s in i) i[e](s) && ("xlink:" == s.substring(0, 6) ? r.setAttributeNS(p, s.substring(6), t(i[s])) : r.setAttribute(s, t(i[s])))
                        } else r = n._g.doc.createElementNS("http://www.w3.org/2000/svg", r), r.style && (r.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                        return r
                    },
                    g = function(e, i) {
                        var f = "linear",
                            l = e.id + i,
                            h = .5,
                            p = .5,
                            d = e.node,
                            v = e.paper,
                            g = d.style,
                            y = n._g.doc.getElementById(l);
                        if (!y) {
                            if (i = t(i).replace(n._radial_gradient, function(e, t, n) {
                                    if (f = "radial", t && n) {
                                        h = r(t), p = r(n);
                                        var i = 2 * (p > .5) - 1;
                                        a(h - .5, 2) + a(p - .5, 2) > .25 && (p = s.sqrt(.25 - a(h - .5, 2)) * i + .5) && .5 != p && (p = p.toFixed(5) - 1e-5 * i)
                                    }
                                    return c
                                }), i = i.split(/\s*\-\s*/), "linear" == f) {
                                var b = i.shift();
                                if (b = -r(b), isNaN(b)) return null;
                                var w = [0, 0, s.cos(n.rad(b)), s.sin(n.rad(b))],
                                    E = 1 / (o(u(w[2]), u(w[3])) || 1);
                                w[2] *= E, w[3] *= E, w[2] < 0 && (w[0] = -w[2], w[2] = 0), w[3] < 0 && (w[1] = -w[3], w[3] = 0)
                            }
                            var S = n._parseDots(i);
                            if (!S) return null;
                            if (l = l.replace(/[\(\)\s,\xb0#]/g, "_"), e.gradient && l != e.gradient.id && (v.defs.removeChild(e.gradient), delete e.gradient), !e.gradient) {
                                y = m(f + "Gradient", {
                                    id: l
                                }), e.gradient = y, m(y, "radial" == f ? {
                                    fx: h,
                                    fy: p
                                } : {
                                    x1: w[0],
                                    y1: w[1],
                                    x2: w[2],
                                    y2: w[3],
                                    gradientTransform: e.matrix.invert()
                                }), v.defs.appendChild(y);
                                for (var x = 0, T = S.length; T > x; x++) y.appendChild(m("stop", {
                                    offset: S[x].offset ? S[x].offset : x ? "100%" : "0%",
                                    "stop-color": S[x].color || "#fff"
                                }))
                            }
                        }
                        return m(d, {
                            fill: "url(#" + l + ")",
                            opacity: 1,
                            "fill-opacity": 1
                        }), g.fill = c, g.opacity = 1, g.fillOpacity = 1, 1
                    },
                    y = function(e) {
                        var t = e.getBBox(1);
                        m(e.pattern, {
                            patternTransform: e.matrix.invert() + " translate(" + t.x + "," + t.y + ")"
                        })
                    },
                    b = function(r, i, s) {
                        if ("path" == r.type) {
                            for (var o, u, a, f, l, h = t(i).toLowerCase().split("-"), p = r.paper, g = s ? "end" : "start", y = r.node, b = r.attrs, w = b["stroke-width"], E = h.length, S = "classic", x = 3, T = 3, N = 5; E--;) switch (h[E]) {
                                case "block":
                                case "classic":
                                case "oval":
                                case "diamond":
                                case "open":
                                case "none":
                                    S = h[E];
                                    break;
                                case "wide":
                                    T = 5;
                                    break;
                                case "narrow":
                                    T = 2;
                                    break;
                                case "long":
                                    x = 5;
                                    break;
                                case "short":
                                    x = 2
                            }
                            if ("open" == S ? (x += 2, T += 2, N += 2, a = 1, f = s ? 4 : 1, l = {
                                    fill: "none",
                                    stroke: b.stroke
                                }) : (f = a = x / 2, l = {
                                    fill: b.stroke,
                                    stroke: "none"
                                }), r._.arrows ? s ? (r._.arrows.endPath && v[r._.arrows.endPath] --, r._.arrows.endMarker && v[r._.arrows.endMarker] --) : (r._.arrows.startPath && v[r._.arrows.startPath] --, r._.arrows.startMarker && v[r._.arrows.startMarker] --) : r._.arrows = {}, "none" != S) {
                                var C = "raphael-marker-" + S,
                                    k = "raphael-marker-" + g + S + x + T;
                                n._g.doc.getElementById(C) ? v[C] ++ : (p.defs.appendChild(m(m("path"), {
                                    "stroke-linecap": "round",
                                    d: d[S],
                                    id: C
                                })), v[C] = 1);
                                var L, A = n._g.doc.getElementById(k);
                                A ? (v[k] ++, L = A.getElementsByTagName("use")[0]) : (A = m(m("marker"), {
                                    id: k,
                                    markerHeight: T,
                                    markerWidth: x,
                                    orient: "auto",
                                    refX: f,
                                    refY: T / 2
                                }), L = m(m("use"), {
                                    "xlink:href": "#" + C,
                                    transform: (s ? "rotate(180 " + x / 2 + " " + T / 2 + ") " : c) + "scale(" + x / N + "," + T / N + ")",
                                    "stroke-width": (1 / ((x / N + T / N) / 2)).toFixed(4)
                                }), A.appendChild(L), p.defs.appendChild(A), v[k] = 1), m(L, l);
                                var O = a * ("diamond" != S && "oval" != S);
                                s ? (o = r._.arrows.startdx * w || 0, u = n.getTotalLength(b.path) - O * w) : (o = O * w, u = n.getTotalLength(b.path) - (r._.arrows.enddx * w || 0)), l = {}, l["marker-" + g] = "url(#" + k + ")", (u || o) && (l.d = n.getSubpath(b.path, o, u)), m(y, l), r._.arrows[g + "Path"] = C, r._.arrows[g + "Marker"] = k, r._.arrows[g + "dx"] = O, r._.arrows[g + "Type"] = S, r._.arrows[g + "String"] = i
                            } else s ? (o = r._.arrows.startdx * w || 0, u = n.getTotalLength(b.path) - o) : (o = 0, u = n.getTotalLength(b.path) - (r._.arrows.enddx * w || 0)), r._.arrows[g + "Path"] && m(y, {
                                d: n.getSubpath(b.path, o, u)
                            }), delete r._.arrows[g + "Path"], delete r._.arrows[g + "Marker"], delete r._.arrows[g + "dx"], delete r._.arrows[g + "Type"], delete r._.arrows[g + "String"];
                            for (l in v)
                                if (v[e](l) && !v[l]) {
                                    var M = n._g.doc.getElementById(l);
                                    M && M.parentNode.removeChild(M)
                                }
                        }
                    },
                    w = {
                        "": [0],
                        none: [0],
                        "-": [3, 1],
                        ".": [1, 1],
                        "-.": [3, 1, 1, 1],
                        "-..": [3, 1, 1, 1, 1, 1],
                        ". ": [1, 3],
                        "- ": [4, 3],
                        "--": [8, 3],
                        "- .": [4, 3, 1, 3],
                        "--.": [8, 3, 1, 3],
                        "--..": [8, 3, 1, 3, 1, 3]
                    },
                    E = function(e, n, r) {
                        if (n = w[t(n).toLowerCase()]) {
                            for (var i = e.attrs["stroke-width"] || "1", s = {
                                    round: i,
                                    square: i,
                                    butt: 0
                                }[e.attrs["stroke-linecap"] || r["stroke-linecap"]] || 0, o = [], u = n.length; u--;) o[u] = n[u] * i + (u % 2 ? 1 : -1) * s;
                            m(e.node, {
                                "stroke-dasharray": o.join(",")
                            })
                        }
                    },
                    S = function(r, s) {
                        var a = r.node,
                            l = r.attrs,
                            h = a.style.visibility;
                        a.style.visibility = "hidden";
                        for (var d in s)
                            if (s[e](d)) {
                                if (!n._availableAttrs[e](d)) continue;
                                var v = s[d];
                                switch (l[d] = v, d) {
                                    case "blur":
                                        r.blur(v);
                                        break;
                                    case "href":
                                    case "title":
                                        var w = m("title"),
                                            S = n._g.doc.createTextNode(v);
                                        w.appendChild(S), a.appendChild(w);
                                        break;
                                    case "target":
                                        var x = a.parentNode;
                                        if ("a" != x.tagName.toLowerCase()) {
                                            var w = m("a");
                                            x.insertBefore(w, a), w.appendChild(a), x = w
                                        }
                                        "target" == d ? x.setAttributeNS(p, "show", "blank" == v ? "new" : v) : x.setAttributeNS(p, d, v);
                                        break;
                                    case "cursor":
                                        a.style.cursor = v;
                                        break;
                                    case "transform":
                                        r.transform(v);
                                        break;
                                    case "arrow-start":
                                        b(r, v);
                                        break;
                                    case "arrow-end":
                                        b(r, v, 1);
                                        break;
                                    case "clip-rect":
                                        var N = t(v).split(f);
                                        if (4 == N.length) {
                                            r.clip && r.clip.parentNode.parentNode.removeChild(r.clip.parentNode);
                                            var C = m("clipPath"),
                                                k = m("rect");
                                            C.id = n.createUUID(), m(k, {
                                                x: N[0],
                                                y: N[1],
                                                width: N[2],
                                                height: N[3]
                                            }), C.appendChild(k), r.paper.defs.appendChild(C), m(a, {
                                                "clip-path": "url(#" + C.id + ")"
                                            }), r.clip = k
                                        }
                                        if (!v) {
                                            var L = a.getAttribute("clip-path");
                                            if (L) {
                                                var A = n._g.doc.getElementById(L.replace(/(^url\(#|\)$)/g, c));
                                                A && A.parentNode.removeChild(A), m(a, {
                                                    "clip-path": c
                                                }), delete r.clip
                                            }
                                        }
                                        break;
                                    case "path":
                                        "path" == r.type && (m(a, {
                                            d: v ? l.path = n._pathToAbsolute(v) : "M0,0"
                                        }), r._.dirty = 1, r._.arrows && ("startString" in r._.arrows && b(r, r._.arrows.startString), "endString" in r._.arrows && b(r, r._.arrows.endString, 1)));
                                        break;
                                    case "width":
                                        if (a.setAttribute(d, v), r._.dirty = 1, !l.fx) break;
                                        d = "x", v = l.x;
                                    case "x":
                                        l.fx && (v = -l.x - (l.width || 0));
                                    case "rx":
                                        if ("rx" == d && "rect" == r.type) break;
                                    case "cx":
                                        a.setAttribute(d, v), r.pattern && y(r), r._.dirty = 1;
                                        break;
                                    case "height":
                                        if (a.setAttribute(d, v), r._.dirty = 1, !l.fy) break;
                                        d = "y", v = l.y;
                                    case "y":
                                        l.fy && (v = -l.y - (l.height || 0));
                                    case "ry":
                                        if ("ry" == d && "rect" == r.type) break;
                                    case "cy":
                                        a.setAttribute(d, v), r.pattern && y(r), r._.dirty = 1;
                                        break;
                                    case "r":
                                        "rect" == r.type ? m(a, {
                                            rx: v,
                                            ry: v
                                        }) : a.setAttribute(d, v), r._.dirty = 1;
                                        break;
                                    case "src":
                                        "image" == r.type && a.setAttributeNS(p, "href", v);
                                        break;
                                    case "stroke-width":
                                        (1 != r._.sx || 1 != r._.sy) && (v /= o(u(r._.sx), u(r._.sy)) || 1), r.paper._vbSize && (v *= r.paper._vbSize), a.setAttribute(d, v), l["stroke-dasharray"] && E(r, l["stroke-dasharray"], s), r._.arrows && ("startString" in r._.arrows && b(r, r._.arrows.startString), "endString" in r._.arrows && b(r, r._.arrows.endString, 1));
                                        break;
                                    case "stroke-dasharray":
                                        E(r, v, s);
                                        break;
                                    case "fill":
                                        var O = t(v).match(n._ISURL);
                                        if (O) {
                                            C = m("pattern");
                                            var M = m("image");
                                            C.id = n.createUUID(), m(C, {
                                                    x: 0,
                                                    y: 0,
                                                    patternUnits: "userSpaceOnUse",
                                                    height: 1,
                                                    width: 1
                                                }), m(M, {
                                                    x: 0,
                                                    y: 0,
                                                    "xlink:href": O[1]
                                                }), C.appendChild(M),
                                                function(e) {
                                                    n._preload(O[1], function() {
                                                        var t = this.offsetWidth,
                                                            n = this.offsetHeight;
                                                        m(e, {
                                                            width: t,
                                                            height: n
                                                        }), m(M, {
                                                            width: t,
                                                            height: n
                                                        }), r.paper.safari()
                                                    })
                                                }(C), r.paper.defs.appendChild(C), m(a, {
                                                    fill: "url(#" + C.id + ")"
                                                }), r.pattern = C, r.pattern && y(r);
                                            break
                                        }
                                        var _ = n.getRGB(v);
                                        if (_.error) {
                                            if (("circle" == r.type || "ellipse" == r.type || "r" != t(v).charAt()) && g(r, v)) {
                                                if ("opacity" in l || "fill-opacity" in l) {
                                                    var D = n._g.doc.getElementById(a.getAttribute("fill").replace(/^url\(#|\)$/g, c));
                                                    if (D) {
                                                        var P = D.getElementsByTagName("stop");
                                                        m(P[P.length - 1], {
                                                            "stop-opacity": ("opacity" in l ? l.opacity : 1) * ("fill-opacity" in l ? l["fill-opacity"] : 1)
                                                        })
                                                    }
                                                }
                                                l.gradient = v, l.fill = "none";
                                                break
                                            }
                                        } else delete s.gradient, delete l.gradient, !n.is(l.opacity, "undefined") && n.is(s.opacity, "undefined") && m(a, {
                                            opacity: l.opacity
                                        }), !n.is(l["fill-opacity"], "undefined") && n.is(s["fill-opacity"], "undefined") && m(a, {
                                            "fill-opacity": l["fill-opacity"]
                                        });
                                        _[e]("opacity") && m(a, {
                                            "fill-opacity": _.opacity > 1 ? _.opacity / 100 : _.opacity
                                        });
                                    case "stroke":
                                        _ = n.getRGB(v), a.setAttribute(d, _.hex), "stroke" == d && _[e]("opacity") && m(a, {
                                            "stroke-opacity": _.opacity > 1 ? _.opacity / 100 : _.opacity
                                        }), "stroke" == d && r._.arrows && ("startString" in r._.arrows && b(r, r._.arrows.startString), "endString" in r._.arrows && b(r, r._.arrows.endString, 1));
                                        break;
                                    case "gradient":
                                        ("circle" == r.type || "ellipse" == r.type || "r" != t(v).charAt()) && g(r, v);
                                        break;
                                    case "opacity":
                                        l.gradient && !l[e]("stroke-opacity") && m(a, {
                                            "stroke-opacity": v > 1 ? v / 100 : v
                                        });
                                    case "fill-opacity":
                                        if (l.gradient) {
                                            D = n._g.doc.getElementById(a.getAttribute("fill").replace(/^url\(#|\)$/g, c)), D && (P = D.getElementsByTagName("stop"), m(P[P.length - 1], {
                                                "stop-opacity": v
                                            }));
                                            break
                                        };
                                    default:
                                        "font-size" == d && (v = i(v, 10) + "px");
                                        var H = d.replace(/(\-.)/g, function(e) {
                                            return e.substring(1).toUpperCase()
                                        });
                                        a.style[H] = v, r._.dirty = 1, a.setAttribute(d, v)
                                }
                            }
                        T(r, s), a.style.visibility = h
                    },
                    x = 1.2,
                    T = function(r, s) {
                        if ("text" == r.type && (s[e]("text") || s[e]("font") || s[e]("font-size") || s[e]("x") || s[e]("y"))) {
                            var o = r.attrs,
                                u = r.node,
                                a = u.firstChild ? i(n._g.doc.defaultView.getComputedStyle(u.firstChild, c).getPropertyValue("font-size"), 10) : 10;
                            if (s[e]("text")) {
                                for (o.text = s.text; u.firstChild;) u.removeChild(u.firstChild);
                                for (var f, l = t(s.text).split("\n"), h = [], p = 0, d = l.length; d > p; p++) f = m("tspan"), p && m(f, {
                                    dy: a * x,
                                    x: o.x
                                }), f.appendChild(n._g.doc.createTextNode(l[p])), u.appendChild(f), h[p] = f
                            } else
                                for (h = u.getElementsByTagName("tspan"), p = 0, d = h.length; d > p; p++) p ? m(h[p], {
                                    dy: a * x,
                                    x: o.x
                                }) : m(h[0], {
                                    dy: 0
                                });
                            m(u, {
                                x: o.x,
                                y: o.y
                            }), r._.dirty = 1;
                            var v = r._getBBox(),
                                g = o.y - (v.y + v.height / 2);
                            g && n.is(g, "finite") && m(h[0], {
                                dy: g
                            })
                        }
                    },
                    N = function(e, t) {
                        this[0] = this.node = e, e.raphael = !0, this.id = n._oid++, e.raphaelid = this.id, this.matrix = n.matrix(), this.realPath = null, this.paper = t, this.attrs = this.attrs || {}, this._ = {
                            transform: [],
                            sx: 1,
                            sy: 1,
                            deg: 0,
                            dx: 0,
                            dy: 0,
                            dirty: 1
                        }, !t.bottom && (t.bottom = this), this.prev = t.top, t.top && (t.top.next = this), t.top = this, this.next = null
                    },
                    C = n.el;
                N.prototype = C, C.constructor = N, n._engine.path = function(e, t) {
                    var n = m("path");
                    t.canvas && t.canvas.appendChild(n);
                    var r = new N(n, t);
                    return r.type = "path", S(r, {
                        fill: "none",
                        stroke: "#000",
                        path: e
                    }), r
                }, C.rotate = function(e, n, i) {
                    if (this.removed) return this;
                    if (e = t(e).split(f), e.length - 1 && (n = r(e[1]), i = r(e[2])), e = r(e[0]), null == i && (n = i), null == n || null == i) {
                        var s = this.getBBox(1);
                        n = s.x + s.width / 2, i = s.y + s.height / 2
                    }
                    return this.transform(this._.transform.concat([
                        ["r", e, n, i]
                    ])), this
                }, C.scale = function(e, n, i, s) {
                    if (this.removed) return this;
                    if (e = t(e).split(f), e.length - 1 && (n = r(e[1]), i = r(e[2]), s = r(e[3])), e = r(e[0]), null == n && (n = e), null == s && (i = s), null == i || null == s) var o = this.getBBox(1);
                    return i = null == i ? o.x + o.width / 2 : i, s = null == s ? o.y + o.height / 2 : s, this.transform(this._.transform.concat([
                        ["s", e, n, i, s]
                    ])), this
                }, C.translate = function(e, n) {
                    return this.removed ? this : (e = t(e).split(f), e.length - 1 && (n = r(e[1])), e = r(e[0]) || 0, n = +n || 0, this.transform(this._.transform.concat([
                        ["t", e, n]
                    ])), this)
                }, C.transform = function(t) {
                    var r = this._;
                    if (null == t) return r.transform;
                    if (n._extractTransform(this, t), this.clip && m(this.clip, {
                            transform: this.matrix.invert()
                        }), this.pattern && y(this), this.node && m(this.node, {
                            transform: this.matrix
                        }), 1 != r.sx || 1 != r.sy) {
                        var i = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;
                        this.attr({
                            "stroke-width": i
                        })
                    }
                    return this
                }, C.hide = function() {
                    return !this.removed && this.paper.safari(this.node.style.display = "none"), this
                }, C.show = function() {
                    return !this.removed && this.paper.safari(this.node.style.display = ""), this
                }, C.remove = function() {
                    if (!this.removed && this.node.parentNode) {
                        var e = this.paper;
                        e.__set__ && e.__set__.exclude(this), l.unbind("raphael.*.*." + this.id), this.gradient && e.defs.removeChild(this.gradient), n._tear(this, e), "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
                        for (var t in this) this[t] = "function" == typeof this[t] ? n._removedFactory(t) : null;
                        this.removed = !0
                    }
                }, C._getBBox = function() {
                    if ("none" == this.node.style.display) {
                        this.show();
                        var e = !0
                    }
                    var t = {};
                    try {
                        t = this.node.getBBox()
                    } catch (n) {} finally {
                        t = t || {}
                    }
                    return e && this.hide(), t
                }, C.attr = function(t, r) {
                    if (this.removed) return this;
                    if (null == t) {
                        var i = {};
                        for (var s in this.attrs) this.attrs[e](s) && (i[s] = this.attrs[s]);
                        return i.gradient && "none" == i.fill && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i
                    }
                    if (null == r && n.is(t, "string")) {
                        if ("fill" == t && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                        if ("transform" == t) return this._.transform;
                        for (var o = t.split(f), u = {}, a = 0, c = o.length; c > a; a++) t = o[a], u[t] = t in this.attrs ? this.attrs[t] : n.is(this.paper.customAttributes[t], "function") ? this.paper.customAttributes[t].def : n._availableAttrs[t];
                        return c - 1 ? u : u[o[0]]
                    }
                    if (null == r && n.is(t, "array")) {
                        for (u = {}, a = 0, c = t.length; c > a; a++) u[t[a]] = this.attr(t[a]);
                        return u
                    }
                    if (null != r) {
                        var h = {};
                        h[t] = r
                    } else null != t && n.is(t, "object") && (h = t);
                    for (var p in h) l("raphael.attr." + p + "." + this.id, this, h[p]);
                    for (p in this.paper.customAttributes)
                        if (this.paper.customAttributes[e](p) && h[e](p) && n.is(this.paper.customAttributes[p], "function")) {
                            var d = this.paper.customAttributes[p].apply(this, [].concat(h[p]));
                            this.attrs[p] = h[p];
                            for (var v in d) d[e](v) && (h[v] = d[v])
                        }
                    return S(this, h), this
                }, C.toFront = function() {
                    if (this.removed) return this;
                    "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
                    var e = this.paper;
                    return e.top != this && n._tofront(this, e), this
                }, C.toBack = function() {
                    if (this.removed) return this;
                    var e = this.node.parentNode;
                    return "a" == e.tagName.toLowerCase() ? e.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : e.firstChild != this.node && e.insertBefore(this.node, this.node.parentNode.firstChild), n._toback(this, this.paper), this.paper, this
                }, C.insertAfter = function(e) {
                    if (this.removed) return this;
                    var t = e.node || e[e.length - 1].node;
                    return t.nextSibling ? t.parentNode.insertBefore(this.node, t.nextSibling) : t.parentNode.appendChild(this.node), n._insertafter(this, e, this.paper), this
                }, C.insertBefore = function(e) {
                    if (this.removed) return this;
                    var t = e.node || e[0].node;
                    return t.parentNode.insertBefore(this.node, t), n._insertbefore(this, e, this.paper), this
                }, C.blur = function(e) {
                    var t = this;
                    if (0 !== +e) {
                        var r = m("filter"),
                            i = m("feGaussianBlur");
                        t.attrs.blur = e, r.id = n.createUUID(), m(i, {
                            stdDeviation: +e || 1.5
                        }), r.appendChild(i), t.paper.defs.appendChild(r), t._blur = r, m(t.node, {
                            filter: "url(#" + r.id + ")"
                        })
                    } else t._blur && (t._blur.parentNode.removeChild(t._blur), delete t._blur, delete t.attrs.blur), t.node.removeAttribute("filter");
                    return t
                }, n._engine.circle = function(e, t, n, r) {
                    var i = m("circle");
                    e.canvas && e.canvas.appendChild(i);
                    var s = new N(i, e);
                    return s.attrs = {
                        cx: t,
                        cy: n,
                        r: r,
                        fill: "none",
                        stroke: "#000"
                    }, s.type = "circle", m(i, s.attrs), s
                }, n._engine.rect = function(e, t, n, r, i, s) {
                    var o = m("rect");
                    e.canvas && e.canvas.appendChild(o);
                    var u = new N(o, e);
                    return u.attrs = {
                        x: t,
                        y: n,
                        width: r,
                        height: i,
                        r: s || 0,
                        rx: s || 0,
                        ry: s || 0,
                        fill: "none",
                        stroke: "#000"
                    }, u.type = "rect", m(o, u.attrs), u
                }, n._engine.ellipse = function(e, t, n, r, i) {
                    var s = m("ellipse");
                    e.canvas && e.canvas.appendChild(s);
                    var o = new N(s, e);
                    return o.attrs = {
                        cx: t,
                        cy: n,
                        rx: r,
                        ry: i,
                        fill: "none",
                        stroke: "#000"
                    }, o.type = "ellipse", m(s, o.attrs), o
                }, n._engine.image = function(e, t, n, r, i, s) {
                    var o = m("image");
                    m(o, {
                        x: n,
                        y: r,
                        width: i,
                        height: s,
                        preserveAspectRatio: "none"
                    }), o.setAttributeNS(p, "href", t), e.canvas && e.canvas.appendChild(o);
                    var u = new N(o, e);
                    return u.attrs = {
                        x: n,
                        y: r,
                        width: i,
                        height: s,
                        src: t
                    }, u.type = "image", u
                }, n._engine.text = function(e, t, r, i) {
                    var s = m("text");
                    e.canvas && e.canvas.appendChild(s);
                    var o = new N(s, e);
                    return o.attrs = {
                        x: t,
                        y: r,
                        "text-anchor": "middle",
                        text: i,
                        font: n._availableAttrs.font,
                        stroke: "none",
                        fill: "#000"
                    }, o.type = "text", S(o, o.attrs), o
                }, n._engine.setSize = function(e, t) {
                    return this.width = e || this.width, this.height = t || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
                }, n._engine.create = function() {
                    var e = n._getContainer.apply(0, arguments),
                        t = e && e.container,
                        r = e.x,
                        i = e.y,
                        s = e.width,
                        o = e.height;
                    if (!t) throw new Error("SVG container not found.");
                    var u, a = m("svg"),
                        f = "overflow:hidden;";
                    return r = r || 0, i = i || 0, s = s || 512, o = o || 342, m(a, {
                        height: o,
                        version: 1.1,
                        width: s,
                        xmlns: "http://www.w3.org/2000/svg"
                    }), 1 == t ? (a.style.cssText = f + "position:absolute;left:" + r + "px;top:" + i + "px", n._g.doc.body.appendChild(a), u = 1) : (a.style.cssText = f + "position:relative", t.firstChild ? t.insertBefore(a, t.firstChild) : t.appendChild(a)), t = new n._Paper, t.width = s, t.height = o, t.canvas = a, t.clear(), t._left = t._top = 0, u && (t.renderfix = function() {}), t.renderfix(), t
                }, n._engine.setViewBox = function(e, t, n, r, i) {
                    l("raphael.setViewBox", this, this._viewBox, [e, t, n, r, i]);
                    var s, u, a = o(n / this.width, r / this.height),
                        f = this.top,
                        c = i ? "meet" : "xMinYMin";
                    for (null == e ? (this._vbSize && (a = 1), delete this._vbSize, s = "0 0 " + this.width + h + this.height) : (this._vbSize = a, s = e + h + t + h + n + h + r), m(this.canvas, {
                            viewBox: s,
                            preserveAspectRatio: c
                        }); a && f;) u = "stroke-width" in f.attrs ? f.attrs["stroke-width"] : 1, f.attr({
                        "stroke-width": u
                    }), f._.dirty = 1, f._.dirtyT = 1, f = f.prev;
                    return this._viewBox = [e, t, n, r, !!i], this
                }, n.prototype.renderfix = function() {
                    var e, t = this.canvas,
                        n = t.style;
                    try {
                        e = t.getScreenCTM() || t.createSVGMatrix()
                    } catch (r) {
                        e = t.createSVGMatrix()
                    }
                    var i = -e.e % 1,
                        s = -e.f % 1;
                    (i || s) && (i && (this._left = (this._left + i) % 1, n.left = this._left + "px"), s && (this._top = (this._top + s) % 1, n.top = this._top + "px"))
                }, n.prototype.clear = function() {
                    n.eve("raphael.clear", this);
                    for (var e = this.canvas; e.firstChild;) e.removeChild(e.firstChild);
                    this.bottom = this.top = null, (this.desc = m("desc")).appendChild(n._g.doc.createTextNode("Created with Raphaël " + n.version)), e.appendChild(this.desc), e.appendChild(this.defs = m("defs"))
                }, n.prototype.remove = function() {
                    l("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                    for (var e in this) this[e] = "function" == typeof this[e] ? n._removedFactory(e) : null
                };
                var k = n.st;
                for (var L in C) C[e](L) && !k[e](L) && (k[L] = function(e) {
                    return function() {
                        var t = arguments;
                        return this.forEach(function(n) {
                            n[e].apply(n, t)
                        })
                    }
                }(L))
            }
        }(),
        function() {
            if (n.vml) {
                var e = "hasOwnProperty",
                    t = String,
                    r = parseFloat,
                    i = Math,
                    s = i.round,
                    o = i.max,
                    u = i.min,
                    a = i.abs,
                    f = "fill",
                    l = /[, ]+/,
                    c = n.eve,
                    h = " progid:DXImageTransform.Microsoft",
                    p = " ",
                    d = "",
                    v = {
                        M: "m",
                        L: "l",
                        C: "c",
                        Z: "x",
                        m: "t",
                        l: "r",
                        c: "v",
                        z: "x"
                    },
                    m = /([clmz]),?([^clmz]*)/gi,
                    g = / progid:\S+Blur\([^\)]+\)/g,
                    y = /-?[^,\s-]+/g,
                    b = "position:absolute;left:0;top:0;width:1px;height:1px",
                    w = 21600,
                    E = {
                        path: 1,
                        rect: 1,
                        image: 1
                    },
                    S = {
                        circle: 1,
                        ellipse: 1
                    },
                    x = function(e) {
                        var r = /[ahqstv]/gi,
                            i = n._pathToAbsolute;
                        if (t(e).match(r) && (i = n._path2curve), r = /[clmz]/g, i == n._pathToAbsolute && !t(e).match(r)) {
                            var o = t(e).replace(m, function(e, t, n) {
                                var r = [],
                                    i = "m" == t.toLowerCase(),
                                    o = v[t];
                                return n.replace(y, function(e) {
                                    i && 2 == r.length && (o += r + v["m" == t ? "l" : "L"], r = []), r.push(s(e * w))
                                }), o + r
                            });
                            return o
                        }
                        var u, a, f = i(e);
                        o = [];
                        for (var l = 0, c = f.length; c > l; l++) {
                            u = f[l], a = f[l][0].toLowerCase(), "z" == a && (a = "x");
                            for (var h = 1, g = u.length; g > h; h++) a += s(u[h] * w) + (h != g - 1 ? "," : d);
                            o.push(a)
                        }
                        return o.join(p)
                    },
                    T = function(e, t, r) {
                        var i = n.matrix();
                        return i.rotate(-e, .5, .5), {
                            dx: i.x(t, r),
                            dy: i.y(t, r)
                        }
                    },
                    N = function(e, t, n, r, i, s) {
                        var o = e._,
                            u = e.matrix,
                            l = o.fillpos,
                            c = e.node,
                            h = c.style,
                            d = 1,
                            v = "",
                            m = w / t,
                            g = w / n;
                        if (h.visibility = "hidden", t && n) {
                            if (c.coordsize = a(m) + p + a(g), h.rotation = s * (0 > t * n ? -1 : 1), s) {
                                var y = T(s, r, i);
                                r = y.dx, i = y.dy
                            }
                            if (0 > t && (v += "x"), 0 > n && (v += " y") && (d = -1), h.flip = v, c.coordorigin = r * -m + p + i * -g, l || o.fillsize) {
                                var b = c.getElementsByTagName(f);
                                b = b && b[0], c.removeChild(b), l && (y = T(s, u.x(l[0], l[1]), u.y(l[0], l[1])), b.position = y.dx * d + p + y.dy * d), o.fillsize && (b.size = o.fillsize[0] * a(t) + p + o.fillsize[1] * a(n)), c.appendChild(b)
                            }
                            h.visibility = "visible"
                        }
                    };
                n.toString = function() {
                    return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
                };
                var C = function(e, n, r) {
                        for (var i = t(n).toLowerCase().split("-"), s = r ? "end" : "start", o = i.length, u = "classic", a = "medium", f = "medium"; o--;) switch (i[o]) {
                            case "block":
                            case "classic":
                            case "oval":
                            case "diamond":
                            case "open":
                            case "none":
                                u = i[o];
                                break;
                            case "wide":
                            case "narrow":
                                f = i[o];
                                break;
                            case "long":
                            case "short":
                                a = i[o]
                        }
                        var l = e.node.getElementsByTagName("stroke")[0];
                        l[s + "arrow"] = u, l[s + "arrowlength"] = a, l[s + "arrowwidth"] = f
                    },
                    k = function(i, a) {
                        i.attrs = i.attrs || {};
                        var c = i.node,
                            h = i.attrs,
                            v = c.style,
                            m = E[i.type] && (a.x != h.x || a.y != h.y || a.width != h.width || a.height != h.height || a.cx != h.cx || a.cy != h.cy || a.rx != h.rx || a.ry != h.ry || a.r != h.r),
                            g = S[i.type] && (h.cx != a.cx || h.cy != a.cy || h.r != a.r || h.rx != a.rx || h.ry != a.ry),
                            y = i;
                        for (var b in a) a[e](b) && (h[b] = a[b]);
                        if (m && (h.path = n._getPath[i.type](i), i._.dirty = 1), a.href && (c.href = a.href), a.title && (c.title = a.title), a.target && (c.target = a.target), a.cursor && (v.cursor = a.cursor), "blur" in a && i.blur(a.blur), (a.path && "path" == i.type || m) && (c.path = x(~t(h.path).toLowerCase().indexOf("r") ? n._pathToAbsolute(h.path) : h.path), "image" == i.type && (i._.fillpos = [h.x, h.y], i._.fillsize = [h.width, h.height], N(i, 1, 1, 0, 0, 0))), "transform" in a && i.transform(a.transform), g) {
                            var T = +h.cx,
                                k = +h.cy,
                                A = +h.rx || +h.r || 0,
                                O = +h.ry || +h.r || 0;
                            c.path = n.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", s((T - A) * w), s((k - O) * w), s((T + A) * w), s((k + O) * w), s(T * w)), i._.dirty = 1
                        }
                        if ("clip-rect" in a) {
                            var _ = t(a["clip-rect"]).split(l);
                            if (4 == _.length) {
                                _[2] = +_[2] + +_[0], _[3] = +_[3] + +_[1];
                                var D = c.clipRect || n._g.doc.createElement("div"),
                                    P = D.style;
                                P.clip = n.format("rect({1}px {2}px {3}px {0}px)", _), c.clipRect || (P.position = "absolute", P.top = 0, P.left = 0, P.width = i.paper.width + "px", P.height = i.paper.height + "px", c.parentNode.insertBefore(D, c), D.appendChild(c), c.clipRect = D)
                            }
                            a["clip-rect"] || c.clipRect && (c.clipRect.style.clip = "auto")
                        }
                        if (i.textpath) {
                            var H = i.textpath.style;
                            a.font && (H.font = a.font), a["font-family"] && (H.fontFamily = '"' + a["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, d) + '"'), a["font-size"] && (H.fontSize = a["font-size"]), a["font-weight"] && (H.fontWeight = a["font-weight"]), a["font-style"] && (H.fontStyle = a["font-style"])
                        }
                        if ("arrow-start" in a && C(y, a["arrow-start"]), "arrow-end" in a && C(y, a["arrow-end"], 1), null != a.opacity || null != a["stroke-width"] || null != a.fill || null != a.src || null != a.stroke || null != a["stroke-width"] || null != a["stroke-opacity"] || null != a["fill-opacity"] || null != a["stroke-dasharray"] || null != a["stroke-miterlimit"] || null != a["stroke-linejoin"] || null != a["stroke-linecap"]) {
                            var B = c.getElementsByTagName(f),
                                j = !1;
                            if (B = B && B[0], !B && (j = B = M(f)), "image" == i.type && a.src && (B.src = a.src), a.fill && (B.on = !0), (null == B.on || "none" == a.fill || null === a.fill) && (B.on = !1), B.on && a.fill) {
                                var F = t(a.fill).match(n._ISURL);
                                if (F) {
                                    B.parentNode == c && c.removeChild(B), B.rotate = !0, B.src = F[1], B.type = "tile";
                                    var I = i.getBBox(1);
                                    B.position = I.x + p + I.y, i._.fillpos = [I.x, I.y], n._preload(F[1], function() {
                                        i._.fillsize = [this.offsetWidth, this.offsetHeight]
                                    })
                                } else B.color = n.getRGB(a.fill).hex, B.src = d, B.type = "solid", n.getRGB(a.fill).error && (y.type in {
                                    circle: 1,
                                    ellipse: 1
                                } || "r" != t(a.fill).charAt()) && L(y, a.fill, B) && (h.fill = "none", h.gradient = a.fill, B.rotate = !1)
                            }
                            if ("fill-opacity" in a || "opacity" in a) {
                                var q = ((+h["fill-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+n.getRGB(a.fill).o + 1 || 2) - 1);
                                q = u(o(q, 0), 1), B.opacity = q, B.src && (B.color = "none")
                            }
                            c.appendChild(B);
                            var R = c.getElementsByTagName("stroke") && c.getElementsByTagName("stroke")[0],
                                U = !1;
                            !R && (U = R = M("stroke")), (a.stroke && "none" != a.stroke || a["stroke-width"] || null != a["stroke-opacity"] || a["stroke-dasharray"] || a["stroke-miterlimit"] || a["stroke-linejoin"] || a["stroke-linecap"]) && (R.on = !0), ("none" == a.stroke || null === a.stroke || null == R.on || 0 == a.stroke || 0 == a["stroke-width"]) && (R.on = !1);
                            var z = n.getRGB(a.stroke);
                            R.on && a.stroke && (R.color = z.hex), q = ((+h["stroke-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+z.o + 1 || 2) - 1);
                            var W = .75 * (r(a["stroke-width"]) || 1);
                            if (q = u(o(q, 0), 1), null == a["stroke-width"] && (W = h["stroke-width"]), a["stroke-width"] && (R.weight = W), W && 1 > W && (q *= W) && (R.weight = 1), R.opacity = q, a["stroke-linejoin"] && (R.joinstyle = a["stroke-linejoin"] || "miter"), R.miterlimit = a["stroke-miterlimit"] || 8, a["stroke-linecap"] && (R.endcap = "butt" == a["stroke-linecap"] ? "flat" : "square" == a["stroke-linecap"] ? "square" : "round"), a["stroke-dasharray"]) {
                                var X = {
                                    "-": "shortdash",
                                    ".": "shortdot",
                                    "-.": "shortdashdot",
                                    "-..": "shortdashdotdot",
                                    ". ": "dot",
                                    "- ": "dash",
                                    "--": "longdash",
                                    "- .": "dashdot",
                                    "--.": "longdashdot",
                                    "--..": "longdashdotdot"
                                };
                                R.dashstyle = X[e](a["stroke-dasharray"]) ? X[a["stroke-dasharray"]] : d
                            }
                            U && c.appendChild(R)
                        }
                        if ("text" == y.type) {
                            y.paper.canvas.style.display = d;
                            var V = y.paper.span,
                                $ = 100,
                                J = h.font && h.font.match(/\d+(?:\.\d*)?(?=px)/);
                            v = V.style, h.font && (v.font = h.font), h["font-family"] && (v.fontFamily = h["font-family"]), h["font-weight"] && (v.fontWeight = h["font-weight"]), h["font-style"] && (v.fontStyle = h["font-style"]), J = r(h["font-size"] || J && J[0]) || 10, v.fontSize = J * $ + "px", y.textpath.string && (V.innerHTML = t(y.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                            var K = V.getBoundingClientRect();
                            y.W = h.w = (K.right - K.left) / $, y.H = h.h = (K.bottom - K.top) / $, y.X = h.x, y.Y = h.y + y.H / 2, ("x" in a || "y" in a) && (y.path.v = n.format("m{0},{1}l{2},{1}", s(h.x * w), s(h.y * w), s(h.x * w) + 1));
                            for (var Q = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], G = 0, Y = Q.length; Y > G; G++)
                                if (Q[G] in a) {
                                    y._.dirty = 1;
                                    break
                                }
                            switch (h["text-anchor"]) {
                                case "start":
                                    y.textpath.style["v-text-align"] = "left", y.bbx = y.W / 2;
                                    break;
                                case "end":
                                    y.textpath.style["v-text-align"] = "right", y.bbx = -y.W / 2;
                                    break;
                                default:
                                    y.textpath.style["v-text-align"] = "center", y.bbx = 0
                            }
                            y.textpath.style["v-text-kern"] = !0
                        }
                    },
                    L = function(e, s, o) {
                        e.attrs = e.attrs || {};
                        var u = (e.attrs, Math.pow),
                            a = "linear",
                            f = ".5 .5";
                        if (e.attrs.gradient = s, s = t(s).replace(n._radial_gradient, function(e, t, n) {
                                return a = "radial", t && n && (t = r(t), n = r(n), u(t - .5, 2) + u(n - .5, 2) > .25 && (n = i.sqrt(.25 - u(t - .5, 2)) * (2 * (n > .5) - 1) + .5), f = t + p + n), d
                            }), s = s.split(/\s*\-\s*/), "linear" == a) {
                            var l = s.shift();
                            if (l = -r(l), isNaN(l)) return null
                        }
                        var c = n._parseDots(s);
                        if (!c) return null;
                        if (e = e.shape || e.node, c.length) {
                            e.removeChild(o), o.on = !0, o.method = "none", o.color = c[0].color, o.color2 = c[c.length - 1].color;
                            for (var h = [], v = 0, m = c.length; m > v; v++) c[v].offset && h.push(c[v].offset + p + c[v].color);
                            o.colors = h.length ? h.join() : "0% " + o.color, "radial" == a ? (o.type = "gradientTitle", o.focus = "100%", o.focussize = "0 0", o.focusposition = f, o.angle = 0) : (o.type = "gradient", o.angle = (270 - l) % 360), e.appendChild(o)
                        }
                        return 1
                    },
                    A = function(e, t) {
                        this[0] = this.node = e, e.raphael = !0, this.id = n._oid++, e.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = t, this.matrix = n.matrix(), this._ = {
                            transform: [],
                            sx: 1,
                            sy: 1,
                            dx: 0,
                            dy: 0,
                            deg: 0,
                            dirty: 1,
                            dirtyT: 1
                        }, !t.bottom && (t.bottom = this), this.prev = t.top, t.top && (t.top.next = this), t.top = this, this.next = null
                    },
                    O = n.el;
                A.prototype = O, O.constructor = A, O.transform = function(e) {
                    if (null == e) return this._.transform;
                    var r, i = this.paper._viewBoxShift,
                        s = i ? "s" + [i.scale, i.scale] + "-1-1t" + [i.dx, i.dy] : d;
                    i && (r = e = t(e).replace(/\.{3}|\u2026/g, this._.transform || d)), n._extractTransform(this, s + e);
                    var o, u = this.matrix.clone(),
                        a = this.skew,
                        f = this.node,
                        l = ~t(this.attrs.fill).indexOf("-"),
                        c = !t(this.attrs.fill).indexOf("url(");
                    if (u.translate(1, 1), c || l || "image" == this.type)
                        if (a.matrix = "1 0 0 1", a.offset = "0 0", o = u.split(), l && o.noRotation || !o.isSimple) {
                            f.style.filter = u.toFilter();
                            var h = this.getBBox(),
                                v = this.getBBox(1),
                                m = h.x - v.x,
                                g = h.y - v.y;
                            f.coordorigin = m * -w + p + g * -w, N(this, 1, 1, m, g, 0)
                        } else f.style.filter = d, N(this, o.scalex, o.scaley, o.dx, o.dy, o.rotate);
                    else f.style.filter = d, a.matrix = t(u), a.offset = u.offset();
                    return r && (this._.transform = r), this
                }, O.rotate = function(e, n, i) {
                    if (this.removed) return this;
                    if (null != e) {
                        if (e = t(e).split(l), e.length - 1 && (n = r(e[1]), i = r(e[2])), e = r(e[0]), null == i && (n = i), null == n || null == i) {
                            var s = this.getBBox(1);
                            n = s.x + s.width / 2, i = s.y + s.height / 2
                        }
                        return this._.dirtyT = 1, this.transform(this._.transform.concat([
                            ["r", e, n, i]
                        ])), this
                    }
                }, O.translate = function(e, n) {
                    return this.removed ? this : (e = t(e).split(l), e.length - 1 && (n = r(e[1])), e = r(e[0]) || 0, n = +n || 0, this._.bbox && (this._.bbox.x += e, this._.bbox.y += n), this.transform(this._.transform.concat([
                        ["t", e, n]
                    ])), this)
                }, O.scale = function(e, n, i, s) {
                    if (this.removed) return this;
                    if (e = t(e).split(l), e.length - 1 && (n = r(e[1]), i = r(e[2]), s = r(e[3]), isNaN(i) && (i = null), isNaN(s) && (s = null)), e = r(e[0]), null == n && (n = e), null == s && (i = s), null == i || null == s) var o = this.getBBox(1);
                    return i = null == i ? o.x + o.width / 2 : i, s = null == s ? o.y + o.height / 2 : s, this.transform(this._.transform.concat([
                        ["s", e, n, i, s]
                    ])), this._.dirtyT = 1, this
                }, O.hide = function() {
                    return !this.removed && (this.node.style.display = "none"), this
                }, O.show = function() {
                    return !this.removed && (this.node.style.display = d), this
                }, O._getBBox = function() {
                    return this.removed ? {} : {
                        x: this.X + (this.bbx || 0) - this.W / 2,
                        y: this.Y - this.H,
                        width: this.W,
                        height: this.H
                    }
                }, O.remove = function() {
                    if (!this.removed && this.node.parentNode) {
                        this.paper.__set__ && this.paper.__set__.exclude(this), n.eve.unbind("raphael.*.*." + this.id), n._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
                        for (var e in this) this[e] = "function" == typeof this[e] ? n._removedFactory(e) : null;
                        this.removed = !0
                    }
                }, O.attr = function(t, r) {
                    if (this.removed) return this;
                    if (null == t) {
                        var i = {};
                        for (var s in this.attrs) this.attrs[e](s) && (i[s] = this.attrs[s]);
                        return i.gradient && "none" == i.fill && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i
                    }
                    if (null == r && n.is(t, "string")) {
                        if (t == f && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                        for (var o = t.split(l), u = {}, a = 0, h = o.length; h > a; a++) t = o[a], u[t] = t in this.attrs ? this.attrs[t] : n.is(this.paper.customAttributes[t], "function") ? this.paper.customAttributes[t].def : n._availableAttrs[t];
                        return h - 1 ? u : u[o[0]]
                    }
                    if (this.attrs && null == r && n.is(t, "array")) {
                        for (u = {}, a = 0, h = t.length; h > a; a++) u[t[a]] = this.attr(t[a]);
                        return u
                    }
                    var p;
                    null != r && (p = {}, p[t] = r), null == r && n.is(t, "object") && (p = t);
                    for (var d in p) c("raphael.attr." + d + "." + this.id, this, p[d]);
                    if (p) {
                        for (d in this.paper.customAttributes)
                            if (this.paper.customAttributes[e](d) && p[e](d) && n.is(this.paper.customAttributes[d], "function")) {
                                var v = this.paper.customAttributes[d].apply(this, [].concat(p[d]));
                                this.attrs[d] = p[d];
                                for (var m in v) v[e](m) && (p[m] = v[m])
                            }
                        p.text && "text" == this.type && (this.textpath.string = p.text), k(this, p)
                    }
                    return this
                }, O.toFront = function() {
                    return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && n._tofront(this, this.paper), this
                }, O.toBack = function() {
                    return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), n._toback(this, this.paper)), this)
                }, O.insertAfter = function(e) {
                    return this.removed ? this : (e.constructor == n.st.constructor && (e = e[e.length - 1]), e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node), n._insertafter(this, e, this.paper), this)
                }, O.insertBefore = function(e) {
                    return this.removed ? this : (e.constructor == n.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), n._insertbefore(this, e, this.paper), this)
                }, O.blur = function(e) {
                    var t = this.node.runtimeStyle,
                        r = t.filter;
                    return r = r.replace(g, d), 0 !== +e ? (this.attrs.blur = e, t.filter = r + p + h + ".Blur(pixelradius=" + (+e || 1.5) + ")", t.margin = n.format("-{0}px 0 0 -{0}px", s(+e || 1.5))) : (t.filter = r, t.margin = 0, delete this.attrs.blur), this
                }, n._engine.path = function(e, t) {
                    var n = M("shape");
                    n.style.cssText = b, n.coordsize = w + p + w, n.coordorigin = t.coordorigin;
                    var r = new A(n, t),
                        i = {
                            fill: "none",
                            stroke: "#000"
                        };
                    e && (i.path = e), r.type = "path", r.path = [], r.Path = d, k(r, i), t.canvas.appendChild(n);
                    var s = M("skew");
                    return s.on = !0, n.appendChild(s), r.skew = s, r.transform(d), r
                }, n._engine.rect = function(e, t, r, i, s, o) {
                    var u = n._rectPath(t, r, i, s, o),
                        a = e.path(u),
                        f = a.attrs;
                    return a.X = f.x = t, a.Y = f.y = r, a.W = f.width = i, a.H = f.height = s, f.r = o, f.path = u, a.type = "rect", a
                }, n._engine.ellipse = function(e, t, n, r, i) {
                    var s = e.path();
                    return s.attrs, s.X = t - r, s.Y = n - i, s.W = 2 * r, s.H = 2 * i, s.type = "ellipse", k(s, {
                        cx: t,
                        cy: n,
                        rx: r,
                        ry: i
                    }), s
                }, n._engine.circle = function(e, t, n, r) {
                    var i = e.path();
                    return i.attrs, i.X = t - r, i.Y = n - r, i.W = i.H = 2 * r, i.type = "circle", k(i, {
                        cx: t,
                        cy: n,
                        r: r
                    }), i
                }, n._engine.image = function(e, t, r, i, s, o) {
                    var u = n._rectPath(r, i, s, o),
                        a = e.path(u).attr({
                            stroke: "none"
                        }),
                        l = a.attrs,
                        c = a.node,
                        h = c.getElementsByTagName(f)[0];
                    return l.src = t, a.X = l.x = r, a.Y = l.y = i, a.W = l.width = s, a.H = l.height = o, l.path = u, a.type = "image", h.parentNode == c && c.removeChild(h), h.rotate = !0, h.src = t, h.type = "tile", a._.fillpos = [r, i], a._.fillsize = [s, o], c.appendChild(h), N(a, 1, 1, 0, 0, 0), a
                }, n._engine.text = function(e, r, i, o) {
                    var u = M("shape"),
                        a = M("path"),
                        f = M("textpath");
                    r = r || 0, i = i || 0, o = o || "", a.v = n.format("m{0},{1}l{2},{1}", s(r * w), s(i * w), s(r * w) + 1), a.textpathok = !0, f.string = t(o), f.on = !0, u.style.cssText = b, u.coordsize = w + p + w, u.coordorigin = "0 0";
                    var l = new A(u, e),
                        c = {
                            fill: "#000",
                            stroke: "none",
                            font: n._availableAttrs.font,
                            text: o
                        };
                    l.shape = u, l.path = a, l.textpath = f, l.type = "text", l.attrs.text = t(o), l.attrs.x = r, l.attrs.y = i, l.attrs.w = 1, l.attrs.h = 1, k(l, c), u.appendChild(f), u.appendChild(a), e.canvas.appendChild(u);
                    var h = M("skew");
                    return h.on = !0, u.appendChild(h), l.skew = h, l.transform(d), l
                }, n._engine.setSize = function(e, t) {
                    var r = this.canvas.style;
                    return this.width = e, this.height = t, e == +e && (e += "px"), t == +t && (t += "px"), r.width = e, r.height = t, r.clip = "rect(0 " + e + " " + t + " 0)", this._viewBox && n._engine.setViewBox.apply(this, this._viewBox), this
                }, n._engine.setViewBox = function(e, t, r, i, s) {
                    n.eve("raphael.setViewBox", this, this._viewBox, [e, t, r, i, s]);
                    var u, a, f = this.width,
                        l = this.height,
                        c = 1 / o(r / f, i / l);
                    return s && (u = l / i, a = f / r, f > r * u && (e -= (f - r * u) / 2 / u), l > i * a && (t -= (l - i * a) / 2 / a)), this._viewBox = [e, t, r, i, !!s], this._viewBoxShift = {
                        dx: -e,
                        dy: -t,
                        scale: c
                    }, this.forEach(function(e) {
                        e.transform("...")
                    }), this
                };
                var M;
                n._engine.initWin = function(e) {
                    var t = e.document;
                    t.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                    try {
                        !t.namespaces.rvml && t.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), M = function(e) {
                            return t.createElement("<rvml:" + e + ' class="rvml">')
                        }
                    } catch (n) {
                        M = function(e) {
                            return t.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                        }
                    }
                }, n._engine.initWin(n._g.win), n._engine.create = function() {
                    var e = n._getContainer.apply(0, arguments),
                        t = e.container,
                        r = e.height,
                        i = e.width,
                        s = e.x,
                        o = e.y;
                    if (!t) throw new Error("VML container not found.");
                    var u = new n._Paper,
                        a = u.canvas = n._g.doc.createElement("div"),
                        f = a.style;
                    return s = s || 0, o = o || 0, i = i || 512, r = r || 342, u.width = i, u.height = r, i == +i && (i += "px"), r == +r && (r += "px"), u.coordsize = 1e3 * w + p + 1e3 * w, u.coordorigin = "0 0", u.span = n._g.doc.createElement("span"), u.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", a.appendChild(u.span), f.cssText = n.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", i, r), 1 == t ? (n._g.doc.body.appendChild(a), f.left = s + "px", f.top = o + "px", f.position = "absolute") : t.firstChild ? t.insertBefore(a, t.firstChild) : t.appendChild(a), u.renderfix = function() {}, u
                }, n.prototype.clear = function() {
                    n.eve("raphael.clear", this), this.canvas.innerHTML = d, this.span = n._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
                }, n.prototype.remove = function() {
                    n.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
                    for (var e in this) this[e] = "function" == typeof this[e] ? n._removedFactory(e) : null;
                    return !0
                };
                var _ = n.st;
                for (var D in O) O[e](D) && !_[e](D) && (_[D] = function(e) {
                    return function() {
                        var t = arguments;
                        return this.forEach(function(n) {
                            n[e].apply(n, t)
                        })
                    }
                }(D))
            }
        }(), k.was ? C.win.Raphael = n : Raphael = n, n
});
(function() {
    var e, t, n, r, i = [].slice,
        s = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        },
        o = {}.hasOwnProperty,
        u = function(e, t) {
            function r() {
                this.constructor = e
            }
            for (var n in t) {
                if (o.call(t, n)) e[n] = t[n]
            }
            r.prototype = t.prototype;
            e.prototype = new r;
            e.__super__ = t.prototype;
            return e
        },
        a = [].indexOf || function(e) {
            for (var t = 0, n = this.length; t < n; t++) {
                if (t in this && this[t] === e) return t
            }
            return -1
        };
    t = window.Morris = {};
    e = jQuery;
    t.EventEmitter = function() {
        function e() {}
        e.prototype.on = function(e, t) {
            if (this.handlers == null) {
                this.handlers = {}
            }
            if (this.handlers[e] == null) {
                this.handlers[e] = []
            }
            this.handlers[e].push(t);
            return this
        };
        e.prototype.fire = function() {
            var e, t, n, r, s, o, u;
            n = arguments[0], e = 2 <= arguments.length ? i.call(arguments, 1) : [];
            if (this.handlers != null && this.handlers[n] != null) {
                o = this.handlers[n];
                u = [];
                for (r = 0, s = o.length; r < s; r++) {
                    t = o[r];
                    u.push(t.apply(null, e))
                }
                return u
            }
        };
        return e
    }();
    t.commas = function(e) {
        var t, n, r, i;
        if (e != null) {
            r = e < 0 ? "-" : "";
            t = Math.abs(e);
            n = Math.floor(t).toFixed(0);
            r += n.replace(/(?=(?:\d{3})+$)(?!^)/g, ",");
            i = t.toString();
            if (i.length > n.length) {
                r += i.slice(n.length)
            }
            return r
        } else {
            return "-"
        }
    };
    t.pad2 = function(e) {
        return (e < 10 ? "0" : "") + e
    };
    t.Grid = function(n) {
        function r(t) {
            this.resizeHandler = s(this.resizeHandler, this);
            var n = this;
            if (typeof t.element === "string") {
                this.el = e(document.getElementById(t.element))
            } else {
                this.el = e(t.element)
            }
            if (this.el == null || this.el.length === 0) {
                throw new Error("Graph container element not found")
            }
            if (this.el.css("position") === "static") {
                this.el.css("position", "relative")
            }
            this.options = e.extend({}, this.gridDefaults, this.defaults || {}, t);
            if (typeof this.options.units === "string") {
                this.options.postUnits = t.units
            }
            this.raphael = new Raphael(this.el[0]);
            this.elementWidth = null;
            this.elementHeight = null;
            this.dirty = false;
            this.selectFrom = null;
            if (this.init) {
                this.init()
            }
            this.setData(this.options.data);
            this.el.bind("mousemove", function(e) {
                var t, r, i, s, o;
                r = n.el.offset();
                o = e.pageX - r.left;
                if (n.selectFrom) {
                    t = n.data[n.hitTest(Math.min(o, n.selectFrom))]._x;
                    i = n.data[n.hitTest(Math.max(o, n.selectFrom))]._x;
                    s = i - t;
                    return n.selectionRect.attr({
                        x: t,
                        width: s
                    })
                } else {
                    return n.fire("hovermove", o, e.pageY - r.top)
                }
            });
            this.el.bind("mouseleave", function(e) {
                if (n.selectFrom) {
                    n.selectionRect.hide();
                    n.selectFrom = null
                }
                return n.fire("hoverout")
            });
            this.el.bind("touchstart touchmove touchend", function(e) {
                var t, r;
                r = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                t = n.el.offset();
                n.fire("hover", r.pageX - t.left, r.pageY - t.top);
                return r
            });
            this.el.bind("click", function(e) {
                var t;
                t = n.el.offset();
                return n.fire("gridclick", e.pageX - t.left, e.pageY - t.top)
            });
            if (this.options.rangeSelect) {
                this.selectionRect = this.raphael.rect(0, 0, 0, this.el.innerHeight()).attr({
                    fill: this.options.rangeSelectColor,
                    stroke: false
                }).toBack().hide();
                this.el.bind("mousedown", function(e) {
                    var t;
                    t = n.el.offset();
                    return n.startRange(e.pageX - t.left)
                });
                this.el.bind("mouseup", function(e) {
                    var t;
                    t = n.el.offset();
                    n.endRange(e.pageX - t.left);
                    return n.fire("hovermove", e.pageX - t.left, e.pageY - t.top)
                })
            }
            if (this.options.resize) {
                e(window).bind("resize", function(e) {
                    if (n.timeoutId != null) {
                        window.clearTimeout(n.timeoutId)
                    }
                    return n.timeoutId = window.setTimeout(n.resizeHandler, 100)
                })
            }
            if (this.postInit) {
                this.postInit()
            }
        }
        u(r, n);
        r.prototype.gridDefaults = {
            dateFormat: null,
            axes: true,
            grid: true,
            gridLineColor: "#aaa",
            gridStrokeWidth: .5,
            gridTextColor: "#888",
            gridTextSize: 12,
            gridTextFamily: "sans-serif",
            gridTextWeight: "normal",
            hideHover: false,
            yLabelFormat: null,
            xLabelAngle: 0,
            numLines: 5,
            padding: 25,
            parseTime: true,
            postUnits: "",
            preUnits: "",
            ymax: "auto",
            ymin: "auto 0",
            goals: [],
            goalStrokeWidth: 1,
            goalLineColors: ["#666633", "#999966", "#cc6666", "#663333"],
            events: [],
            eventStrokeWidth: 1,
            eventLineColors: ["#005a04", "#ccffbb", "#3a5f0b", "#005502"],
            rangeSelect: null,
            rangeSelectColor: "#eef",
            resize: false
        };
        r.prototype.setData = function(e, n) {
            var r, i, s, o, u, a, f, l, c, h, p, d, v, m, g;
            if (n == null) {
                n = true
            }
            this.options.data = e;
            if (e == null || e.length === 0) {
                this.data = [];
                this.raphael.clear();
                if (this.hover != null) {
                    this.hover.hide()
                }
                return
            }
            d = this.cumulative ? 0 : null;
            v = this.cumulative ? 0 : null;
            if (this.options.goals.length > 0) {
                u = Math.min.apply(Math, this.options.goals);
                o = Math.max.apply(Math, this.options.goals);
                v = v != null ? Math.min(v, u) : u;
                d = d != null ? Math.max(d, o) : o
            }
            this.data = function() {
                var n, r, o;
                o = [];
                for (s = n = 0, r = e.length; n < r; s = ++n) {
                    f = e[s];
                    a = {
                        src: f
                    };
                    a.label = f[this.options.xkey];
                    if (this.options.parseTime) {
                        a.x = t.parseDate(a.label);
                        if (this.options.dateFormat) {
                            a.label = this.options.dateFormat(a.x)
                        } else if (typeof a.label === "number") {
                            a.label = (new Date(a.label)).toString()
                        }
                    } else {
                        a.x = s;
                        if (this.options.xLabelFormat) {
                            a.label = this.options.xLabelFormat(a)
                        }
                    }
                    c = 0;
                    a.y = function() {
                        var e, t, n, r;
                        n = this.options.ykeys;
                        r = [];
                        for (i = e = 0, t = n.length; e < t; i = ++e) {
                            p = n[i];
                            m = f[p];
                            if (typeof m === "string") {
                                m = parseFloat(m)
                            }
                            if (m != null && typeof m !== "number") {
                                m = null
                            }
                            if (m != null) {
                                if (this.cumulative) {
                                    c += m
                                } else {
                                    if (d != null) {
                                        d = Math.max(m, d);
                                        v = Math.min(m, v)
                                    } else {
                                        d = v = m
                                    }
                                }
                            }
                            if (this.cumulative && c != null) {
                                d = Math.max(c, d);
                                v = Math.min(c, v)
                            }
                            r.push(m)
                        }
                        return r
                    }.call(this);
                    o.push(a)
                }
                return o
            }.call(this);
            if (this.options.parseTime) {
                this.data = this.data.sort(function(e, t) {
                    return (e.x > t.x) - (t.x > e.x)
                })
            }
            this.xmin = this.data[0].x;
            this.xmax = this.data[this.data.length - 1].x;
            this.events = [];
            if (this.options.events.length > 0) {
                if (this.options.parseTime) {
                    this.events = function() {
                        var e, n, i, s;
                        i = this.options.events;
                        s = [];
                        for (e = 0, n = i.length; e < n; e++) {
                            r = i[e];
                            s.push(t.parseDate(r))
                        }
                        return s
                    }.call(this)
                } else {
                    this.events = this.options.events
                }
                this.xmax = Math.max(this.xmax, Math.max.apply(Math, this.events));
                this.xmin = Math.min(this.xmin, Math.min.apply(Math, this.events))
            }
            if (this.xmin === this.xmax) {
                this.xmin -= 1;
                this.xmax += 1
            }
            this.ymin = this.yboundary("min", v);
            this.ymax = this.yboundary("max", d);
            if (this.ymin === this.ymax) {
                if (v) {
                    this.ymin -= 1
                }
                this.ymax += 1
            }
            if ((g = this.options.axes) === true || g === "both" || g === "y" || this.options.grid === true) {
                if (this.options.ymax === this.gridDefaults.ymax && this.options.ymin === this.gridDefaults.ymin) {
                    this.grid = this.autoGridLines(this.ymin, this.ymax, this.options.numLines);
                    this.ymin = Math.min(this.ymin, this.grid[0]);
                    this.ymax = Math.max(this.ymax, this.grid[this.grid.length - 1])
                } else {
                    l = (this.ymax - this.ymin) / (this.options.numLines - 1);
                    this.grid = function() {
                        var e, t, n, r;
                        r = [];
                        for (h = e = t = this.ymin, n = this.ymax; l > 0 ? e <= n : e >= n; h = e += l) {
                            r.push(h)
                        }
                        return r
                    }.call(this)
                }
            }
            this.dirty = true;
            if (n) {
                return this.redraw()
            }
        };
        r.prototype.yboundary = function(e, t) {
            var n, r;
            n = this.options["y" + e];
            if (typeof n === "string") {
                if (n.slice(0, 4) === "auto") {
                    if (n.length > 5) {
                        r = parseInt(n.slice(5), 10);
                        if (t == null) {
                            return r
                        }
                        return Math[e](t, r)
                    } else {
                        if (t != null) {
                            return t
                        } else {
                            return 0
                        }
                    }
                } else {
                    return parseInt(n, 10)
                }
            } else {
                return n
            }
        };
        r.prototype.autoGridLines = function(e, t, n) {
            var r, i, s, o, u, a, f, l, c;
            u = t - e;
            c = Math.floor(Math.log(u) / Math.log(10));
            f = Math.pow(10, c);
            i = Math.floor(e / f) * f;
            r = Math.ceil(t / f) * f;
            a = (r - i) / (n - 1);
            if (f === 1 && a > 1 && Math.ceil(a) !== a) {
                a = Math.ceil(a);
                r = i + a * (n - 1)
            }
            if (i < 0 && r > 0) {
                i = Math.floor(e / a) * a;
                r = Math.ceil(t / a) * a
            }
            if (a < 1) {
                o = Math.floor(Math.log(a) / Math.log(10));
                s = function() {
                    var e, t;
                    t = [];
                    for (l = e = i; a > 0 ? e <= r : e >= r; l = e += a) {
                        t.push(parseFloat(l.toFixed(1 - o)))
                    }
                    return t
                }()
            } else {
                s = function() {
                    var e, t;
                    t = [];
                    for (l = e = i; a > 0 ? e <= r : e >= r; l = e += a) {
                        t.push(l)
                    }
                    return t
                }()
            }
            return s
        };
        r.prototype._calc = function() {
            var e, t, n, r, i, s, o, u;
            i = this.el.width();
            n = this.el.height();
            if (this.elementWidth !== i || this.elementHeight !== n || this.dirty) {
                this.elementWidth = i;
                this.elementHeight = n;
                this.dirty = false;
                this.left = this.options.padding;
                this.right = this.elementWidth - this.options.padding;
                this.top = this.options.padding;
                this.bottom = this.elementHeight - this.options.padding;
                if ((o = this.options.axes) === true || o === "both" || o === "y") {
                    s = function() {
                        var e, n, r, i;
                        r = this.grid;
                        i = [];
                        for (e = 0, n = r.length; e < n; e++) {
                            t = r[e];
                            i.push(this.measureText(this.yAxisFormat(t)).width)
                        }
                        return i
                    }.call(this);
                    this.left += Math.max.apply(Math, s)
                }
                if ((u = this.options.axes) === true || u === "both" || u === "x") {
                    e = function() {
                        var e, t, n;
                        n = [];
                        for (r = e = 0, t = this.data.length; 0 <= t ? e < t : e > t; r = 0 <= t ? ++e : --e) {
                            n.push(this.measureText(this.data[r].text, -this.options.xLabelAngle).height)
                        }
                        return n
                    }.call(this);
                    this.bottom -= Math.max.apply(Math, e)
                }
                this.width = Math.max(1, this.right - this.left);
                this.height = Math.max(1, this.bottom - this.top);
                this.dx = this.width / (this.xmax - this.xmin);
                this.dy = this.height / (this.ymax - this.ymin);
                if (this.calc) {
                    return this.calc()
                }
            }
        };
        r.prototype.transY = function(e) {
            return this.bottom - (e - this.ymin) * this.dy
        };
        r.prototype.transX = function(e) {
            if (this.data.length === 1) {
                return (this.left + this.right) / 2
            } else {
                return this.left + (e - this.xmin) * this.dx
            }
        };
        r.prototype.redraw = function() {
            this.raphael.clear();
            this._calc();
            this.drawGrid();
            this.drawGoals();
            this.drawEvents();
            if (this.draw) {
                return this.draw()
            }
        };
        r.prototype.measureText = function(e, t) {
            var n, r;
            if (t == null) {
                t = 0
            }
            r = this.raphael.text(100, 100, e).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).rotate(t);
            n = r.getBBox();
            r.remove();
            return n
        };
        r.prototype.yAxisFormat = function(e) {
            return this.yLabelFormat(e)
        };
        r.prototype.yLabelFormat = function(e) {
            if (typeof this.options.yLabelFormat === "function") {
                return this.options.yLabelFormat(e)
            } else {
                return "" + this.options.preUnits + t.commas(e) + this.options.postUnits
            }
        };
        r.prototype.drawGrid = function() {
            var e, t, n, r, i, s, o, u;
            if (this.options.grid === false && (i = this.options.axes) !== true && i !== "both" && i !== "y") {
                return
            }
            s = this.grid;
            u = [];
            for (n = 0, r = s.length; n < r; n++) {
                e = s[n];
                t = this.transY(e);
                if ((o = this.options.axes) === true || o === "both" || o === "y") {
                    this.drawYAxisLabel(this.left - this.options.padding / 2, t, this.yAxisFormat(e))
                }
                if (this.options.grid) {
                    u.push(this.drawGridLine("M" + this.left + "," + t + "H" + (this.left + this.width)))
                } else {
                    u.push(void 0)
                }
            }
            return u
        };
        r.prototype.drawGoals = function() {
            var e, t, n, r, i, s, o;
            s = this.options.goals;
            o = [];
            for (n = r = 0, i = s.length; r < i; n = ++r) {
                t = s[n];
                e = this.options.goalLineColors[n % this.options.goalLineColors.length];
                o.push(this.drawGoal(t, e))
            }
            return o
        };
        r.prototype.drawEvents = function() {
            var e, t, n, r, i, s, o;
            s = this.events;
            o = [];
            for (n = r = 0, i = s.length; r < i; n = ++r) {
                t = s[n];
                e = this.options.eventLineColors[n % this.options.eventLineColors.length];
                o.push(this.drawEvent(t, e))
            }
            return o
        };
        r.prototype.drawGoal = function(e, t) {
            return this.raphael.path("M" + this.left + "," + this.transY(e) + "H" + this.right).attr("stroke", t).attr("stroke-width", this.options.goalStrokeWidth)
        };
        r.prototype.drawEvent = function(e, t) {
            return this.raphael.path("M" + this.transX(e) + "," + this.bottom + "V" + this.top).attr("stroke", t).attr("stroke-width", this.options.eventStrokeWidth)
        };
        r.prototype.drawYAxisLabel = function(e, t, n) {
            return this.raphael.text(e, t, n).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).attr("fill", this.options.gridTextColor).attr("text-anchor", "end")
        };
        r.prototype.drawGridLine = function(e) {
            return this.raphael.path(e).attr("stroke", this.options.gridLineColor).attr("stroke-width", this.options.gridStrokeWidth)
        };
        r.prototype.startRange = function(e) {
            this.hover.hide();
            this.selectFrom = e;
            return this.selectionRect.attr({
                x: e,
                width: 0
            }).show()
        };
        r.prototype.endRange = function(e) {
            var t, n;
            if (this.selectFrom) {
                n = Math.min(this.selectFrom, e);
                t = Math.max(this.selectFrom, e);
                this.options.rangeSelect.call(this.el, {
                    start: this.data[this.hitTest(n)].x,
                    end: this.data[this.hitTest(t)].x
                });
                return this.selectFrom = null
            }
        };
        r.prototype.resizeHandler = function() {
            this.timeoutId = null;
            this.raphael.setSize(this.el.width(), this.el.height());
            return this.redraw()
        };
        return r
    }(t.EventEmitter);
    t.parseDate = function(e) {
        var t, n, r, i, s, o, u, a, f, l, c;
        if (typeof e === "number") {
            return e
        }
        n = e.match(/^(\d+) Q(\d)$/);
        i = e.match(/^(\d+)-(\d+)$/);
        s = e.match(/^(\d+)-(\d+)-(\d+)$/);
        u = e.match(/^(\d+) W(\d+)$/);
        a = e.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/);
        f = e.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/);
        if (n) {
            return (new Date(parseInt(n[1], 10), parseInt(n[2], 10) * 3 - 1, 1)).getTime()
        } else if (i) {
            return (new Date(parseInt(i[1], 10), parseInt(i[2], 10) - 1, 1)).getTime()
        } else if (s) {
            return (new Date(parseInt(s[1], 10), parseInt(s[2], 10) - 1, parseInt(s[3], 10))).getTime()
        } else if (u) {
            l = new Date(parseInt(u[1], 10), 0, 1);
            if (l.getDay() !== 4) {
                l.setMonth(0, 1 + (4 - l.getDay() + 7) % 7)
            }
            return l.getTime() + parseInt(u[2], 10) * 6048e5
        } else if (a) {
            if (!a[6]) {
                return (new Date(parseInt(a[1], 10), parseInt(a[2], 10) - 1, parseInt(a[3], 10), parseInt(a[4], 10), parseInt(a[5], 10))).getTime()
            } else {
                o = 0;
                if (a[6] !== "Z") {
                    o = parseInt(a[8], 10) * 60 + parseInt(a[9], 10);
                    if (a[7] === "+") {
                        o = 0 - o
                    }
                }
                return Date.UTC(parseInt(a[1], 10), parseInt(a[2], 10) - 1, parseInt(a[3], 10), parseInt(a[4], 10), parseInt(a[5], 10) + o)
            }
        } else if (f) {
            c = parseFloat(f[6]);
            t = Math.floor(c);
            r = Math.round((c - t) * 1e3);
            if (!f[8]) {
                return (new Date(parseInt(f[1], 10), parseInt(f[2], 10) - 1, parseInt(f[3], 10), parseInt(f[4], 10), parseInt(f[5], 10), t, r)).getTime()
            } else {
                o = 0;
                if (f[8] !== "Z") {
                    o = parseInt(f[10], 10) * 60 + parseInt(f[11], 10);
                    if (f[9] === "+") {
                        o = 0 - o
                    }
                }
                return Date.UTC(parseInt(f[1], 10), parseInt(f[2], 10) - 1, parseInt(f[3], 10), parseInt(f[4], 10), parseInt(f[5], 10) + o, t, r)
            }
        } else {
            return (new Date(parseInt(e, 10), 0, 1)).getTime()
        }
    };
    t.Hover = function() {
        function n(n) {
            if (n == null) {
                n = {}
            }
            this.options = e.extend({}, t.Hover.defaults, n);
            this.el = e("<div class='" + this.options["class"] + "'></div>");
            this.el.hide();
            this.options.parent.append(this.el)
        }
        n.defaults = {
            "class": "morris-hover morris-default-style"
        };
        n.prototype.update = function(e, t, n) {
            this.html(e);
            this.show();
            return this.moveTo(t, n)
        };
        n.prototype.html = function(e) {
            return this.el.html(e)
        };
        n.prototype.moveTo = function(e, t) {
            var n, r, i, s, o, u;
            o = this.options.parent.innerWidth();
            s = this.options.parent.innerHeight();
            r = this.el.outerWidth();
            n = this.el.outerHeight();
            i = Math.min(Math.max(0, e - r / 2), o - r);
            if (t != null) {
                u = t - n - 10;
                if (u < 0) {
                    u = t + 10;
                    if (u + n > s) {
                        u = s / 2 - n / 2
                    }
                }
            } else {
                u = s / 2 - n / 2
            }
            return this.el.css({
                left: i + "px",
                top: parseInt(u) + "px"
            })
        };
        n.prototype.show = function() {
            return this.el.show()
        };
        n.prototype.hide = function() {
            return this.el.hide()
        };
        return n
    }();
    t.Line = function(e) {
        function n(e) {
            this.hilight = s(this.hilight, this);
            this.onHoverOut = s(this.onHoverOut, this);
            this.onHoverMove = s(this.onHoverMove, this);
            this.onGridClick = s(this.onGridClick, this);
            if (!(this instanceof t.Line)) {
                return new t.Line(e)
            }
            n.__super__.constructor.call(this, e)
        }
        u(n, e);
        n.prototype.init = function() {
            if (this.options.hideHover !== "always") {
                this.hover = new t.Hover({
                    parent: this.el
                });
                this.on("hovermove", this.onHoverMove);
                this.on("hoverout", this.onHoverOut);
                return this.on("gridclick", this.onGridClick)
            }
        };
        n.prototype.defaults = {
            lineWidth: 3,
            pointSize: 4,
            lineColors: ["#0b62a4", "#7A92A3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
            pointStrokeWidths: [1],
            pointStrokeColors: ["#ffffff"],
            pointFillColors: [],
            smooth: true,
            xLabels: "auto",
            xLabelFormat: null,
            xLabelMargin: 24,
            continuousLine: true,
            hideHover: false
        };
        n.prototype.calc = function() {
            this.calcPoints();
            return this.generatePaths()
        };
        n.prototype.calcPoints = function() {
            var e, t, n, r, i, s;
            i = this.data;
            s = [];
            for (n = 0, r = i.length; n < r; n++) {
                e = i[n];
                e._x = this.transX(e.x);
                e._y = function() {
                    var n, r, i, s;
                    i = e.y;
                    s = [];
                    for (n = 0, r = i.length; n < r; n++) {
                        t = i[n];
                        if (t != null) {
                            s.push(this.transY(t))
                        } else {
                            s.push(t)
                        }
                    }
                    return s
                }.call(this);
                s.push(e._ymax = Math.min.apply(Math, [this.bottom].concat(function() {
                    var n, r, i, s;
                    i = e._y;
                    s = [];
                    for (n = 0, r = i.length; n < r; n++) {
                        t = i[n];
                        if (t != null) {
                            s.push(t)
                        }
                    }
                    return s
                }())))
            }
            return s
        };
        n.prototype.hitTest = function(e) {
            var t, n, r, i, s;
            if (this.data.length === 0) {
                return null
            }
            s = this.data.slice(1);
            for (t = r = 0, i = s.length; r < i; t = ++r) {
                n = s[t];
                if (e < (n._x + this.data[t]._x) / 2) {
                    break
                }
            }
            return t
        };
        n.prototype.onGridClick = function(e, t) {
            var n;
            n = this.hitTest(e);
            return this.fire("click", n, this.data[n].src, e, t)
        };
        n.prototype.onHoverMove = function(e, t) {
            var n;
            n = this.hitTest(e);
            return this.displayHoverForRow(n)
        };
        n.prototype.onHoverOut = function() {
            if (this.options.hideHover !== false) {
                return this.displayHoverForRow(null)
            }
        };
        n.prototype.displayHoverForRow = function(e) {
            var t;
            if (e != null) {
                (t = this.hover).update.apply(t, this.hoverContentForRow(e));
                return this.hilight(e)
            } else {
                this.hover.hide();
                return this.hilight()
            }
        };
        n.prototype.hoverContentForRow = function(e) {
            var t, n, r, i, s, o, u;
            r = this.data[e];
            t = "<div class='morris-hover-row-label'>" + r.label + "</div>";
            u = r.y;
            for (n = s = 0, o = u.length; s < o; n = ++s) {
                i = u[n];
                t += "<div class='morris-hover-point' style='color: " + this.colorFor(r, n, "label") + "'>\n  " + this.options.labels[n] + ":\n  " + this.yLabelFormat(i) + "\n</div>"
            }
            if (typeof this.options.hoverCallback === "function") {
                t = this.options.hoverCallback(e, this.options, t, r.src)
            }
            return [t, r._x, r._ymax]
        };
        n.prototype.generatePaths = function() {
            var e, n, r, i, s;
            return this.paths = function() {
                var o, u, f, l;
                l = [];
                for (r = o = 0, u = this.options.ykeys.length; 0 <= u ? o < u : o > u; r = 0 <= u ? ++o : --o) {
                    s = typeof this.options.smooth === "boolean" ? this.options.smooth : (f = this.options.ykeys[r], a.call(this.options.smooth, f) >= 0);
                    n = function() {
                        var e, t, n, s;
                        n = this.data;
                        s = [];
                        for (e = 0, t = n.length; e < t; e++) {
                            i = n[e];
                            if (i._y[r] !== void 0) {
                                s.push({
                                    x: i._x,
                                    y: i._y[r]
                                })
                            }
                        }
                        return s
                    }.call(this);
                    if (this.options.continuousLine) {
                        n = function() {
                            var t, r, i;
                            i = [];
                            for (t = 0, r = n.length; t < r; t++) {
                                e = n[t];
                                if (e.y !== null) {
                                    i.push(e)
                                }
                            }
                            return i
                        }()
                    }
                    if (n.length > 1) {
                        l.push(t.Line.createPath(n, s, this.bottom))
                    } else {
                        l.push(null)
                    }
                }
                return l
            }.call(this)
        };
        n.prototype.draw = function() {
            var e;
            if ((e = this.options.axes) === true || e === "both" || e === "x") {
                this.drawXAxis()
            }
            this.drawSeries();
            if (this.options.hideHover === false) {
                return this.displayHoverForRow(this.data.length - 1)
            }
        };
        n.prototype.drawXAxis = function() {
            var e, n, r, i, s, o, u, a, f, l, c = this;
            u = this.bottom + this.options.padding / 2;
            s = null;
            i = null;
            e = function(e, t) {
                var n, r, o, a, f;
                n = c.drawXAxisLabel(c.transX(t), u, e);
                f = n.getBBox();
                n.transform("r" + -c.options.xLabelAngle);
                r = n.getBBox();
                n.transform("t0," + r.height / 2 + "...");
                if (c.options.xLabelAngle !== 0) {
                    a = -.5 * f.width * Math.cos(c.options.xLabelAngle * Math.PI / 180);
                    n.transform("t" + a + ",0...")
                }
                r = n.getBBox();
                if ((s == null || s >= r.x + r.width || i != null && i >= r.x) && r.x >= 0 && r.x + r.width < c.el.width()) {
                    if (c.options.xLabelAngle !== 0) {
                        o = 1.25 * c.options.gridTextSize / Math.sin(c.options.xLabelAngle * Math.PI / 180);
                        i = r.x - o
                    }
                    return s = r.x - c.options.xLabelMargin
                } else {
                    return n.remove()
                }
            };
            if (this.options.parseTime) {
                if (this.data.length === 1 && this.options.xLabels === "auto") {
                    r = [
                        [this.data[0].label, this.data[0].x]
                    ]
                } else {
                    r = t.labelSeries(this.xmin, this.xmax, this.width, this.options.xLabels, this.options.xLabelFormat)
                }
            } else {
                r = function() {
                    var e, t, n, r;
                    n = this.data;
                    r = [];
                    for (e = 0, t = n.length; e < t; e++) {
                        o = n[e];
                        r.push([o.label, o.x])
                    }
                    return r
                }.call(this)
            }
            r.reverse();
            l = [];
            for (a = 0, f = r.length; a < f; a++) {
                n = r[a];
                l.push(e(n[0], n[1]))
            }
            return l
        };
        n.prototype.drawSeries = function() {
            var e, t, n, r, i, s;
            this.seriesPoints = [];
            for (e = t = r = this.options.ykeys.length - 1; r <= 0 ? t <= 0 : t >= 0; e = r <= 0 ? ++t : --t) {
                this._drawLineFor(e)
            }
            s = [];
            for (e = n = i = this.options.ykeys.length - 1; i <= 0 ? n <= 0 : n >= 0; e = i <= 0 ? ++n : --n) {
                s.push(this._drawPointFor(e))
            }
            return s
        };
        n.prototype._drawPointFor = function(e) {
            var t, n, r, i, s, o;
            this.seriesPoints[e] = [];
            s = this.data;
            o = [];
            for (r = 0, i = s.length; r < i; r++) {
                n = s[r];
                t = null;
                if (n._y[e] != null) {
                    t = this.drawLinePoint(n._x, n._y[e], this.colorFor(n, e, "point"), e)
                }
                o.push(this.seriesPoints[e].push(t))
            }
            return o
        };
        n.prototype._drawLineFor = function(e) {
            var t;
            t = this.paths[e];
            if (t !== null) {
                return this.drawLinePath(t, this.colorFor(null, e, "line"), e)
            }
        };
        n.createPath = function(e, n, r) {
            var i, s, o, u, a, f, l, c, h, p, d, v, m, g;
            l = "";
            if (n) {
                o = t.Line.gradients(e)
            }
            c = {
                y: null
            };
            for (u = m = 0, g = e.length; m < g; u = ++m) {
                i = e[u];
                if (i.y != null) {
                    if (c.y != null) {
                        if (n) {
                            s = o[u];
                            f = o[u - 1];
                            a = (i.x - c.x) / 4;
                            h = c.x + a;
                            d = Math.min(r, c.y + a * f);
                            p = i.x - a;
                            v = Math.min(r, i.y - a * s);
                            l += "C" + h + "," + d + "," + p + "," + v + "," + i.x + "," + i.y
                        } else {
                            l += "L" + i.x + "," + i.y
                        }
                    } else {
                        if (!n || o[u] != null) {
                            l += "M" + i.x + "," + i.y
                        }
                    }
                }
                c = i
            }
            return l
        };
        n.gradients = function(e) {
            var t, n, r, i, s, o, u, a;
            n = function(e, t) {
                return (e.y - t.y) / (e.x - t.x)
            };
            a = [];
            for (r = o = 0, u = e.length; o < u; r = ++o) {
                t = e[r];
                if (t.y != null) {
                    i = e[r + 1] || {
                        y: null
                    };
                    s = e[r - 1] || {
                        y: null
                    };
                    if (s.y != null && i.y != null) {
                        a.push(n(s, i))
                    } else if (s.y != null) {
                        a.push(n(s, t))
                    } else if (i.y != null) {
                        a.push(n(t, i))
                    } else {
                        a.push(null)
                    }
                } else {
                    a.push(null)
                }
            }
            return a
        };
        n.prototype.hilight = function(e) {
            var t, n, r, i, s;
            if (this.prevHilight !== null && this.prevHilight !== e) {
                for (t = n = 0, i = this.seriesPoints.length - 1; 0 <= i ? n <= i : n >= i; t = 0 <= i ? ++n : --n) {
                    if (this.seriesPoints[t][this.prevHilight]) {
                        this.seriesPoints[t][this.prevHilight].animate(this.pointShrinkSeries(t))
                    }
                }
            }
            if (e !== null && this.prevHilight !== e) {
                for (t = r = 0, s = this.seriesPoints.length - 1; 0 <= s ? r <= s : r >= s; t = 0 <= s ? ++r : --r) {
                    if (this.seriesPoints[t][e]) {
                        this.seriesPoints[t][e].animate(this.pointGrowSeries(t))
                    }
                }
            }
            return this.prevHilight = e
        };
        n.prototype.colorFor = function(e, t, n) {
            if (typeof this.options.lineColors === "function") {
                return this.options.lineColors.call(this, e, t, n)
            } else if (n === "point") {
                return this.options.pointFillColors[t % this.options.pointFillColors.length] || this.options.lineColors[t % this.options.lineColors.length]
            } else {
                return this.options.lineColors[t % this.options.lineColors.length]
            }
        };
        n.prototype.drawXAxisLabel = function(e, t, n) {
            return this.raphael.text(e, t, n).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).attr("fill", this.options.gridTextColor)
        };
        n.prototype.drawLinePath = function(e, t, n) {
            return this.raphael.path(e).attr("stroke", t).attr("stroke-width", this.lineWidthForSeries(n))
        };
        n.prototype.drawLinePoint = function(e, t, n, r) {
            return this.raphael.circle(e, t, this.pointSizeForSeries(r)).attr("fill", n).attr("stroke-width", this.pointStrokeWidthForSeries(r)).attr("stroke", this.pointStrokeColorForSeries(r))
        };
        n.prototype.pointStrokeWidthForSeries = function(e) {
            return this.options.pointStrokeWidths[e % this.options.pointStrokeWidths.length]
        };
        n.prototype.pointStrokeColorForSeries = function(e) {
            return this.options.pointStrokeColors[e % this.options.pointStrokeColors.length]
        };
        n.prototype.lineWidthForSeries = function(e) {
            if (this.options.lineWidth instanceof Array) {
                return this.options.lineWidth[e % this.options.lineWidth.length]
            } else {
                return this.options.lineWidth
            }
        };
        n.prototype.pointSizeForSeries = function(e) {
            if (this.options.pointSize instanceof Array) {
                return this.options.pointSize[e % this.options.pointSize.length]
            } else {
                return this.options.pointSize
            }
        };
        n.prototype.pointGrowSeries = function(e) {
            return Raphael.animation({
                r: this.pointSizeForSeries(e) + 3
            }, 25, "linear")
        };
        n.prototype.pointShrinkSeries = function(e) {
            return Raphael.animation({
                r: this.pointSizeForSeries(e)
            }, 25, "linear")
        };
        return n
    }(t.Grid);
    t.labelSeries = function(n, r, i, s, o) {
        var u, a, f, l, c, h, p, d, v, m, g;
        f = 200 * (r - n) / i;
        a = new Date(n);
        p = t.LABEL_SPECS[s];
        if (p === void 0) {
            g = t.AUTO_LABEL_ORDER;
            for (v = 0, m = g.length; v < m; v++) {
                l = g[v];
                h = t.LABEL_SPECS[l];
                if (f >= h.span) {
                    p = h;
                    break
                }
            }
        }
        if (p === void 0) {
            p = t.LABEL_SPECS["second"]
        }
        if (o) {
            p = e.extend({}, p, {
                fmt: o
            })
        }
        u = p.start(a);
        c = [];
        while ((d = u.getTime()) <= r) {
            if (d >= n) {
                c.push([p.fmt(u), d])
            }
            p.incr(u)
        }
        return c
    };
    n = function(e) {
        return {
            span: e * 60 * 1e3,
            start: function(e) {
                return new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours())
            },
            fmt: function(e) {
                return "" + t.pad2(e.getHours()) + ":" + t.pad2(e.getMinutes())
            },
            incr: function(t) {
                return t.setUTCMinutes(t.getUTCMinutes() + e)
            }
        }
    };
    r = function(e) {
        return {
            span: e * 1e3,
            start: function(e) {
                return new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes())
            },
            fmt: function(e) {
                return "" + t.pad2(e.getHours()) + ":" + t.pad2(e.getMinutes()) + ":" + t.pad2(e.getSeconds())
            },
            incr: function(t) {
                return t.setUTCSeconds(t.getUTCSeconds() + e)
            }
        }
    };
    t.LABEL_SPECS = {
        decade: {
            span: 1728e8,
            start: function(e) {
                return new Date(e.getFullYear() - e.getFullYear() % 10, 0, 1)
            },
            fmt: function(e) {
                return "" + e.getFullYear()
            },
            incr: function(e) {
                return e.setFullYear(e.getFullYear() + 10)
            }
        },
        year: {
            span: 1728e7,
            start: function(e) {
                return new Date(e.getFullYear(), 0, 1)
            },
            fmt: function(e) {
                return "" + e.getFullYear()
            },
            incr: function(e) {
                return e.setFullYear(e.getFullYear() + 1)
            }
        },
        month: {
            span: 24192e5,
            start: function(e) {
                return new Date(e.getFullYear(), e.getMonth(), 1)
            },
            fmt: function(e) {
                return "" + e.getFullYear() + "-" + t.pad2(e.getMonth() + 1)
            },
            incr: function(e) {
                return e.setMonth(e.getMonth() + 1)
            }
        },
        week: {
            span: 6048e5,
            start: function(e) {
                return new Date(e.getFullYear(), e.getMonth(), e.getDate())
            },
            fmt: function(e) {
                return "" + e.getFullYear() + "-" + t.pad2(e.getMonth() + 1) + "-" + t.pad2(e.getDate())
            },
            incr: function(e) {
                return e.setDate(e.getDate() + 7)
            }
        },
        day: {
            span: 864e5,
            start: function(e) {
                return new Date(e.getFullYear(), e.getMonth(), e.getDate())
            },
            fmt: function(e) {
                return "" + e.getFullYear() + "-" + t.pad2(e.getMonth() + 1) + "-" + t.pad2(e.getDate())
            },
            incr: function(e) {
                return e.setDate(e.getDate() + 1)
            }
        },
        hour: n(60),
        "30min": n(30),
        "15min": n(15),
        "10min": n(10),
        "5min": n(5),
        minute: n(1),
        "30sec": r(30),
        "15sec": r(15),
        "10sec": r(10),
        "5sec": r(5),
        second: r(1)
    };
    t.AUTO_LABEL_ORDER = ["decade", "year", "month", "week", "day", "hour", "30min", "15min", "10min", "5min", "minute", "30sec", "15sec", "10sec", "5sec", "second"];
    t.Area = function(n) {
        function i(n) {
            var s;
            if (!(this instanceof t.Area)) {
                return new t.Area(n)
            }
            s = e.extend({}, r, n);
            this.cumulative = !s.behaveLikeLine;
            if (s.fillOpacity === "auto") {
                s.fillOpacity = s.behaveLikeLine ? .8 : 1
            }
            i.__super__.constructor.call(this, s)
        }
        var r;
        u(i, n);
        r = {
            fillOpacity: "auto",
            behaveLikeLine: false
        };
        i.prototype.calcPoints = function() {
            var e, t, n, r, i, s, o;
            s = this.data;
            o = [];
            for (r = 0, i = s.length; r < i; r++) {
                e = s[r];
                e._x = this.transX(e.x);
                t = 0;
                e._y = function() {
                    var r, i, s, o;
                    s = e.y;
                    o = [];
                    for (r = 0, i = s.length; r < i; r++) {
                        n = s[r];
                        if (this.options.behaveLikeLine) {
                            o.push(this.transY(n))
                        } else {
                            t += n || 0;
                            o.push(this.transY(t))
                        }
                    }
                    return o
                }.call(this);
                o.push(e._ymax = Math.max.apply(Math, e._y))
            }
            return o
        };
        i.prototype.drawSeries = function() {
            var e, t, n, r, i, s, o, u, a, f, l;
            this.seriesPoints = [];
            if (this.options.behaveLikeLine) {
                t = function() {
                    a = [];
                    for (var e = 0, t = this.options.ykeys.length - 1; 0 <= t ? e <= t : e >= t; 0 <= t ? e++ : e--) {
                        a.push(e)
                    }
                    return a
                }.apply(this)
            } else {
                t = function() {
                    f = [];
                    for (var e = u = this.options.ykeys.length - 1; u <= 0 ? e <= 0 : e >= 0; u <= 0 ? e++ : e--) {
                        f.push(e)
                    }
                    return f
                }.apply(this)
            }
            l = [];
            for (i = 0, s = t.length; i < s; i++) {
                e = t[i];
                this._drawFillFor(e);
                this._drawLineFor(e);
                l.push(this._drawPointFor(e))
            }
            return l
        };
        i.prototype._drawFillFor = function(e) {
            var t;
            t = this.paths[e];
            if (t !== null) {
                t = t + ("L" + this.transX(this.xmax) + "," + this.bottom + "L" + this.transX(this.xmin) + "," + this.bottom + "Z");
                return this.drawFilledPath(t, this.fillForSeries(e))
            }
        };
        i.prototype.fillForSeries = function(e) {
            var t;
            t = Raphael.rgb2hsl(this.colorFor(this.data[e], e, "line"));
            return Raphael.hsl(t.h, this.options.behaveLikeLine ? t.s * .9 : t.s * .75, Math.min(.98, this.options.behaveLikeLine ? t.l * 1.2 : t.l * 1.25))
        };
        i.prototype.drawFilledPath = function(e, t) {
            return this.raphael.path(e).attr("fill", t).attr("fill-opacity", this.options.fillOpacity).attr("stroke", "none")
        };
        return i
    }(t.Line);
    t.Bar = function(n) {
        function r(n) {
            this.onHoverOut = s(this.onHoverOut, this);
            this.onHoverMove = s(this.onHoverMove, this);
            this.onGridClick = s(this.onGridClick, this);
            if (!(this instanceof t.Bar)) {
                return new t.Bar(n)
            }
            r.__super__.constructor.call(this, e.extend({}, n, {
                parseTime: false
            }))
        }
        u(r, n);
        r.prototype.init = function() {
            this.cumulative = this.options.stacked;
            if (this.options.hideHover !== "always") {
                this.hover = new t.Hover({
                    parent: this.el
                });
                this.on("hovermove", this.onHoverMove);
                this.on("hoverout", this.onHoverOut);
                return this.on("gridclick", this.onGridClick)
            }
        };
        r.prototype.defaults = {
            barSizeRatio: .75,
            barGap: 3,
            barColors: ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
            barOpacity: 1,
            barRadius: [0, 0, 0, 0],
            xLabelMargin: 50
        };
        r.prototype.calc = function() {
            var e;
            this.calcBars();
            if (this.options.hideHover === false) {
                return (e = this.hover).update.apply(e, this.hoverContentForRow(this.data.length - 1))
            }
        };
        r.prototype.calcBars = function() {
            var e, t, n, r, i, s, o;
            s = this.data;
            o = [];
            for (e = r = 0, i = s.length; r < i; e = ++r) {
                t = s[e];
                t._x = this.left + this.width * (e + .5) / this.data.length;
                o.push(t._y = function() {
                    var e, r, i, s;
                    i = t.y;
                    s = [];
                    for (e = 0, r = i.length; e < r; e++) {
                        n = i[e];
                        if (n != null) {
                            s.push(this.transY(n))
                        } else {
                            s.push(null)
                        }
                    }
                    return s
                }.call(this))
            }
            return o
        };
        r.prototype.draw = function() {
            var e;
            if ((e = this.options.axes) === true || e === "both" || e === "x") {
                this.drawXAxis()
            }
            return this.drawSeries()
        };
        r.prototype.drawXAxis = function() {
            var e, t, n, r, i, s, o, u, a, f, l, c, h;
            f = this.bottom + (this.options.xAxisLabelTopPadding || this.options.padding / 2);
            o = null;
            s = null;
            h = [];
            for (e = l = 0, c = this.data.length; 0 <= c ? l < c : l > c; e = 0 <= c ? ++l : --l) {
                u = this.data[this.data.length - 1 - e];
                t = this.drawXAxisLabel(u._x, f, u.label);
                a = t.getBBox();
                t.transform("r" + -this.options.xLabelAngle);
                n = t.getBBox();
                t.transform("t0," + n.height / 2 + "...");
                if (this.options.xLabelAngle !== 0) {
                    i = -.5 * a.width * Math.cos(this.options.xLabelAngle * Math.PI / 180);
                    t.transform("t" + i + ",0...")
                }
                if ((o == null || o >= n.x + n.width || s != null && s >= n.x) && n.x >= 0 && n.x + n.width < this.el.width()) {
                    if (this.options.xLabelAngle !== 0) {
                        r = 1.25 * this.options.gridTextSize / Math.sin(this.options.xLabelAngle * Math.PI / 180);
                        s = n.x - r
                    }
                    h.push(o = n.x - this.options.xLabelMargin)
                } else {
                    h.push(t.remove())
                }
            }
            return h
        };
        r.prototype.drawSeries = function() {
            var e, t, n, r, i, s, o, u, a, f, l, c, h, p, d;
            n = this.width / this.options.data.length;
            u = this.options.stacked != null ? 1 : this.options.ykeys.length;
            e = (n * this.options.barSizeRatio - this.options.barGap * (u - 1)) / u;
            if (this.options.barSize) {
                e = Math.min(e, this.options.barSize)
            }
            c = n - e * u - this.options.barGap * (u - 1);
            o = c / 2;
            d = this.ymin <= 0 && this.ymax >= 0 ? this.transY(0) : null;
            return this.bars = function() {
                var u, c, v, m;
                v = this.data;
                m = [];
                for (r = u = 0, c = v.length; u < c; r = ++u) {
                    a = v[r];
                    i = 0;
                    m.push(function() {
                        var u, c, v, m;
                        v = a._y;
                        m = [];
                        for (f = u = 0, c = v.length; u < c; f = ++u) {
                            p = v[f];
                            if (p !== null) {
                                if (d) {
                                    h = Math.min(p, d);
                                    t = Math.max(p, d)
                                } else {
                                    h = p;
                                    t = this.bottom
                                }
                                s = this.left + r * n + o;
                                if (!this.options.stacked) {
                                    s += f * (e + this.options.barGap)
                                }
                                l = t - h;
                                if (this.options.stacked) {
                                    h -= i
                                }
                                this.drawBar(s, h, e, l, this.colorFor(a, f, "bar"), this.options.barOpacity, this.options.barRadius);
                                m.push(i += l)
                            } else {
                                m.push(null)
                            }
                        }
                        return m
                    }.call(this))
                }
                return m
            }.call(this)
        };
        r.prototype.colorFor = function(e, t, n) {
            var r, i;
            if (typeof this.options.barColors === "function") {
                r = {
                    x: e.x,
                    y: e.y[t],
                    label: e.label
                };
                i = {
                    index: t,
                    key: this.options.ykeys[t],
                    label: this.options.labels[t]
                };
                return this.options.barColors.call(this, r, i, n)
            } else {
                return this.options.barColors[t % this.options.barColors.length]
            }
        };
        r.prototype.hitTest = function(e) {
            if (this.data.length === 0) {
                return null
            }
            e = Math.max(Math.min(e, this.right), this.left);
            return Math.min(this.data.length - 1, Math.floor((e - this.left) / (this.width / this.data.length)))
        };
        r.prototype.onGridClick = function(e, t) {
            var n;
            n = this.hitTest(e);
            return this.fire("click", n, this.data[n].src, e, t)
        };
        r.prototype.onHoverMove = function(e, t) {
            var n, r;
            n = this.hitTest(e);
            return (r = this.hover).update.apply(r, this.hoverContentForRow(n))
        };
        r.prototype.onHoverOut = function() {
            if (this.options.hideHover !== false) {
                return this.hover.hide()
            }
        };
        r.prototype.hoverContentForRow = function(e) {
            var t, n, r, i, s, o, u, a;
            r = this.data[e];
            t = "<div class='morris-hover-row-label'>" + r.label + "</div>";
            a = r.y;
            for (n = o = 0, u = a.length; o < u; n = ++o) {
                s = a[n];
                t += "<div class='morris-hover-point' style='color: " + this.colorFor(r, n, "label") + "'>\n  " + this.options.labels[n] + ":\n  " + this.yLabelFormat(s) + "\n</div>"
            }
            if (typeof this.options.hoverCallback === "function") {
                t = this.options.hoverCallback(e, this.options, t, r.src)
            }
            i = this.left + (e + .5) * this.width / this.data.length;
            return [t, i]
        };
        r.prototype.drawXAxisLabel = function(e, t, n) {
            var r;
            return r = this.raphael.text(e, t, n).attr("font-size", this.options.gridTextSize).attr("font-family", this.options.gridTextFamily).attr("font-weight", this.options.gridTextWeight).attr("fill", this.options.gridTextColor)
        };
        r.prototype.drawBar = function(e, t, n, r, i, s, o) {
            var u, a;
            u = Math.max.apply(Math, o);
            if (u === 0 || u > r) {
                a = this.raphael.rect(e, t, n, r)
            } else {
                a = this.raphael.path(this.roundedRect(e, t, n, r, o))
            }
            return a.attr("fill", i).attr("fill-opacity", s).attr("stroke", "none")
        };
        r.prototype.roundedRect = function(e, t, n, r, i) {
            if (i == null) {
                i = [0, 0, 0, 0]
            }
            return ["M", e, i[0] + t, "Q", e, t, e + i[0], t, "L", e + n - i[1], t, "Q", e + n, t, e + n, t + i[1], "L", e + n, t + r - i[2], "Q", e + n, t + r, e + n - i[2], t + r, "L", e + i[3], t + r, "Q", e, t + r, e, t + r - i[3], "Z"]
        };
        return r
    }(t.Grid);
    t.Donut = function(n) {
        function r(n) {
            this.resizeHandler = s(this.resizeHandler, this);
            this.select = s(this.select, this);
            this.click = s(this.click, this);
            var r = this;
            if (!(this instanceof t.Donut)) {
                return new t.Donut(n)
            }
            this.options = e.extend({}, this.defaults, n);
            if (typeof n.element === "string") {
                this.el = e(document.getElementById(n.element))
            } else {
                this.el = e(n.element)
            }
            if (this.el === null || this.el.length === 0) {
                throw new Error("Graph placeholder not found.")
            }
            if (n.data === void 0 || n.data.length === 0) {
                return
            }
            this.raphael = new Raphael(this.el[0]);
            if (this.options.resize) {
                e(window).bind("resize", function(e) {
                    if (r.timeoutId != null) {
                        window.clearTimeout(r.timeoutId)
                    }
                    return r.timeoutId = window.setTimeout(r.resizeHandler, 100)
                })
            }
            this.setData(n.data)
        }
        u(r, n);
        r.prototype.defaults = {
            colors: ["#0B62A4", "#3980B5", "#679DC6", "#95BBD7", "#B0CCE1", "#095791", "#095085", "#083E67", "#052C48", "#042135"],
            backgroundColor: "#FFFFFF",
            labelColor: "#000000",
            formatter: t.commas,
            resize: false
        };
        r.prototype.redraw = function() {
            var e, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x;
            this.raphael.clear();
            n = this.el.width() / 2;
            r = this.el.height() / 2;
            p = (Math.min(n, r) - 10) / 3;
            c = 0;
            w = this.values;
            for (d = 0, g = w.length; d < g; d++) {
                h = w[d];
                c += h
            }
            a = 5 / (2 * p);
            e = 1.9999 * Math.PI - a * this.data.length;
            o = 0;
            s = 0;
            this.segments = [];
            E = this.values;
            for (i = v = 0, y = E.length; v < y; i = ++v) {
                h = E[i];
                f = o + a + e * (h / c);
                l = new t.DonutSegment(n, r, p * 2, p, o, f, this.data[i].color || this.options.colors[s % this.options.colors.length], this.options.backgroundColor, s, this.raphael);
                l.render();
                this.segments.push(l);
                l.on("hover", this.select);
                l.on("click", this.click);
                o = f;
                s += 1
            }
            this.text1 = this.drawEmptyDonutLabel(n, r - 10, this.options.labelColor, 15, 800);
            this.text2 = this.drawEmptyDonutLabel(n, r + 10, this.options.labelColor, 14);
            u = Math.max.apply(Math, this.values);
            s = 0;
            S = this.values;
            x = [];
            for (m = 0, b = S.length; m < b; m++) {
                h = S[m];
                if (h === u) {
                    this.select(s);
                    break
                }
                x.push(s += 1)
            }
            return x
        };
        r.prototype.setData = function(e) {
            var t;
            this.data = e;
            this.values = function() {
                var e, n, r, i;
                r = this.data;
                i = [];
                for (e = 0, n = r.length; e < n; e++) {
                    t = r[e];
                    i.push(parseFloat(t.value))
                }
                return i
            }.call(this);
            return this.redraw()
        };
        r.prototype.click = function(e) {
            return this.fire("click", e, this.data[e])
        };
        r.prototype.select = function(e) {
            var t, n, r, i, s, o;
            o = this.segments;
            for (i = 0, s = o.length; i < s; i++) {
                n = o[i];
                n.deselect()
            }
            r = this.segments[e];
            r.select();
            t = this.data[e];
            return this.setLabels(t.label, this.options.formatter(t.value, t))
        };
        r.prototype.setLabels = function(e, t) {
            var n, r, i, s, o, u, a, f;
            n = (Math.min(this.el.width() / 2, this.el.height() / 2) - 10) * 2 / 3;
            s = 1.8 * n;
            i = n / 2;
            r = n / 3;
            this.text1.attr({
                text: e,
                transform: ""
            });
            o = this.text1.getBBox();
            u = Math.min(s / o.width, i / o.height);
            this.text1.attr({
                transform: "S" + u + "," + u + "," + (o.x + o.width / 2) + "," + (o.y + o.height)
            });
            this.text2.attr({
                text: t,
                transform: ""
            });
            a = this.text2.getBBox();
            f = Math.min(s / a.width, r / a.height);
            return this.text2.attr({
                transform: "S" + f + "," + f + "," + (a.x + a.width / 2) + "," + a.y
            })
        };
        r.prototype.drawEmptyDonutLabel = function(e, t, n, r, i) {
            var s;
            s = this.raphael.text(e, t, "").attr("font-size", r).attr("fill", n);
            if (i != null) {
                s.attr("font-weight", i)
            }
            return s
        };
        r.prototype.resizeHandler = function() {
            this.timeoutId = null;
            this.raphael.setSize(this.el.width(), this.el.height());
            return this.redraw()
        };
        return r
    }(t.EventEmitter);
    t.DonutSegment = function(e) {
        function t(e, t, n, r, i, o, u, a, f, l) {
            this.cx = e;
            this.cy = t;
            this.inner = n;
            this.outer = r;
            this.color = u;
            this.backgroundColor = a;
            this.index = f;
            this.raphael = l;
            this.deselect = s(this.deselect, this);
            this.select = s(this.select, this);
            this.sin_p0 = Math.sin(i);
            this.cos_p0 = Math.cos(i);
            this.sin_p1 = Math.sin(o);
            this.cos_p1 = Math.cos(o);
            this.is_long = o - i > Math.PI ? 1 : 0;
            this.path = this.calcSegment(this.inner + 3, this.inner + this.outer - 5);
            this.selectedPath = this.calcSegment(this.inner + 3, this.inner + this.outer);
            this.hilight = this.calcArc(this.inner)
        }
        u(t, e);
        t.prototype.calcArcPoints = function(e) {
            return [this.cx + e * this.sin_p0, this.cy + e * this.cos_p0, this.cx + e * this.sin_p1, this.cy + e * this.cos_p1]
        };
        t.prototype.calcSegment = function(e, t) {
            var n, r, i, s, o, u, a, f, l, c;
            l = this.calcArcPoints(e), n = l[0], i = l[1], r = l[2], s = l[3];
            c = this.calcArcPoints(t), o = c[0], a = c[1], u = c[2], f = c[3];
            return "M" + n + "," + i + ("A" + e + "," + e + ",0," + this.is_long + ",0," + r + "," + s) + ("L" + u + "," + f) + ("A" + t + "," + t + ",0," + this.is_long + ",1," + o + "," + a) + "Z"
        };
        t.prototype.calcArc = function(e) {
            var t, n, r, i, s;
            s = this.calcArcPoints(e), t = s[0], r = s[1], n = s[2], i = s[3];
            return "M" + t + "," + r + ("A" + e + "," + e + ",0," + this.is_long + ",0," + n + "," + i)
        };
        t.prototype.render = function() {
            var e = this;
            this.arc = this.drawDonutArc(this.hilight, this.color);
            return this.seg = this.drawDonutSegment(this.path, this.color, this.backgroundColor, function() {
                return e.fire("hover", e.index)
            }, function() {
                return e.fire("click", e.index)
            })
        };
        t.prototype.drawDonutArc = function(e, t) {
            return this.raphael.path(e).attr({
                stroke: t,
                "stroke-width": 2,
                opacity: 0
            })
        };
        t.prototype.drawDonutSegment = function(e, t, n, r, i) {
            return this.raphael.path(e).attr({
                fill: t,
                stroke: n,
                "stroke-width": 3
            }).hover(r).click(i)
        };
        t.prototype.select = function() {
            if (!this.selected) {
                this.seg.animate({
                    path: this.selectedPath
                }, 150, "<>");
                this.arc.animate({
                    opacity: 1
                }, 150, "<>");
                return this.selected = true
            }
        };
        t.prototype.deselect = function() {
            if (this.selected) {
                this.seg.animate({
                    path: this.path
                }, 150, "<>");
                this.arc.animate({
                    opacity: 0
                }, 150, "<>");
                return this.selected = false
            }
        };
        return t
    }(t.EventEmitter)
}).call(this);
$(document).ready(function() {
    function n(e) {
        e.wrap("<div class='table-wrapper' />");
        var t = e.clone();
        t.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
        t.removeClass("responsive");
        e.closest(".table-wrapper").append(t);
        t.wrap("<div class='pinned' />");
        e.wrap("<div class='scrollable' />");
        i(e, t)
    }

    function r(e) {
        e.closest(".table-wrapper").find(".pinned").remove();
        e.unwrap();
        e.unwrap()
    }

    function i(e, t) {
        var n = e.find("tr"),
            r = t.find("tr"),
            i = [];
        n.each(function(e) {
            var t = $(this),
                n = t.find("th, td");
            n.each(function() {
                var t = $(this).outerHeight(true);
                i[e] = i[e] || 0;
                if (t > i[e]) i[e] = t
            })
        });
        r.each(function(e) {
            $(this).height(i[e])
        })
    }
    var e = false;
    var t = function() {
        if ($(window).width() < 767 && !e) {
            e = true;
            $("table.responsive").each(function(e, t) {
                n($(t))
            });
            return true
        } else if (e && $(window).width() > 767) {
            e = false;
            $("table.responsive").each(function(e, t) {
                r($(t))
            })
        }
    };
    $(window).load(t);
    $(window).on("redraw", function() {
        e = false;
        t()
    });
    $(window).on("resize", t)
});
(function(e, t, n) {
    (function(e) {
        typeof define == "function" && define.amd ? define(["jquery"], e) : jQuery && !jQuery.fn.sparkline && e(jQuery)
    })(function(r) {
        "use strict";
        var i = {},
            s, o, u, f, l, h, p, d, v, m, g, y, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q = 0;
        s = function() {
            return {
                common: {
                    type: "line",
                    lineColor: "#00f",
                    fillColor: "#cdf",
                    defaultPixelsPerValue: 3,
                    width: "auto",
                    height: "auto",
                    composite: !1,
                    tagValuesAttribute: "values",
                    tagOptionsPrefix: "spark",
                    enableTagOptions: !1,
                    enableHighlight: !0,
                    highlightLighten: 1.4,
                    tooltipSkipNull: !0,
                    tooltipPrefix: "",
                    tooltipSuffix: "",
                    disableHiddenCheck: !1,
                    numberFormatter: !1,
                    numberDigitGroupCount: 3,
                    numberDigitGroupSep: ",",
                    numberDecimalMark: ".",
                    disableTooltips: !1,
                    disableInteraction: !1
                },
                line: {
                    spotColor: "#f80",
                    highlightSpotColor: "#5f5",
                    highlightLineColor: "#f22",
                    spotRadius: 1.5,
                    minSpotColor: "#f80",
                    maxSpotColor: "#f80",
                    lineWidth: 1,
                    normalRangeMin: n,
                    normalRangeMax: n,
                    normalRangeColor: "#ccc",
                    drawNormalOnTop: !1,
                    chartRangeMin: n,
                    chartRangeMax: n,
                    chartRangeMinX: n,
                    chartRangeMaxX: n,
                    tooltipFormat: new u('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
                },
                bar: {
                    barColor: "#3366cc",
                    negBarColor: "#f44",
                    stackedBarColor: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
                    zeroColor: n,
                    nullColor: n,
                    zeroAxis: !0,
                    barWidth: 4,
                    barSpacing: 1,
                    chartRangeMax: n,
                    chartRangeMin: n,
                    chartRangeClip: !1,
                    colorMap: n,
                    tooltipFormat: new u('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
                },
                tristate: {
                    barWidth: 4,
                    barSpacing: 1,
                    posBarColor: "#6f6",
                    negBarColor: "#f44",
                    zeroBarColor: "#999",
                    colorMap: {},
                    tooltipFormat: new u('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
                    tooltipValueLookups: {
                        map: {
                            "-1": "Loss",
                            0: "Draw",
                            1: "Win"
                        }
                    }
                },
                discrete: {
                    lineHeight: "auto",
                    thresholdColor: n,
                    thresholdValue: 0,
                    chartRangeMax: n,
                    chartRangeMin: n,
                    chartRangeClip: !1,
                    tooltipFormat: new u("{{prefix}}{{value}}{{suffix}}")
                },
                bullet: {
                    targetColor: "#f33",
                    targetWidth: 3,
                    performanceColor: "#33f",
                    rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
                    base: n,
                    tooltipFormat: new u("{{fieldkey:fields}} - {{value}}"),
                    tooltipValueLookups: {
                        fields: {
                            r: "Range",
                            p: "Performance",
                            t: "Target"
                        }
                    }
                },
                pie: {
                    offset: 0,
                    sliceColors: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
                    borderWidth: 0,
                    borderColor: "#000",
                    tooltipFormat: new u('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
                },
                box: {
                    raw: !1,
                    boxLineColor: "#000",
                    boxFillColor: "#cdf",
                    whiskerColor: "#000",
                    outlierLineColor: "#333",
                    outlierFillColor: "#fff",
                    medianColor: "#f00",
                    showOutliers: !0,
                    outlierIQR: 1.5,
                    spotRadius: 1.5,
                    target: n,
                    targetColor: "#4a2",
                    chartRangeMax: n,
                    chartRangeMin: n,
                    tooltipFormat: new u("{{field:fields}}: {{value}}"),
                    tooltipFormatFieldlistKey: "field",
                    tooltipValueLookups: {
                        fields: {
                            lq: "Lower Quartile",
                            med: "Median",
                            uq: "Upper Quartile",
                            lo: "Left Outlier",
                            ro: "Right Outlier",
                            lw: "Left Whisker",
                            rw: "Right Whisker"
                        }
                    }
                }
            }
        }, D = '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}', o = function() {
            var e, t;
            return e = function() {
                this.init.apply(this, arguments)
            }, arguments.length > 1 ? (arguments[0] ? (e.prototype = r.extend(new arguments[0], arguments[arguments.length - 1]), e._super = arguments[0].prototype) : e.prototype = arguments[arguments.length - 1], arguments.length > 2 && (t = Array.prototype.slice.call(arguments, 1, -1), t.unshift(e.prototype), r.extend.apply(r, t))) : e.prototype = arguments[0], e.prototype.cls = e, e
        }, r.SPFormatClass = u = o({
            fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
            precre: /(\w+)\.(\d+)/,
            init: function(e, t) {
                this.format = e, this.fclass = t
            },
            render: function(e, t, r) {
                var i = this,
                    s = e,
                    o, u, a, f, l;
                return this.format.replace(this.fre, function() {
                    var e;
                    return u = arguments[1], a = arguments[3], o = i.precre.exec(u), o ? (l = o[2], u = o[1]) : l = !1, f = s[u], f === n ? "" : a && t && t[a] ? (e = t[a], e.get ? t[a].get(f) || f : t[a][f] || f) : (v(f) && (r.get("numberFormatter") ? f = r.get("numberFormatter")(f) : f = E(f, l, r.get("numberDigitGroupCount"), r.get("numberDigitGroupSep"), r.get("numberDecimalMark"))), f)
                })
            }
        }), r.spformat = function(e, t) {
            return new u(e, t)
        }, f = function(e, t, n) {
            return e < t ? t : e > n ? n : e
        }, l = function(e, n) {
            var r;
            return n === 2 ? (r = t.floor(e.length / 2), e.length % 2 ? e[r] : (e[r - 1] + e[r]) / 2) : e.length % 2 ? (r = (e.length * n + n) / 4, r % 1 ? (e[t.floor(r)] + e[t.floor(r) - 1]) / 2 : e[r - 1]) : (r = (e.length * n + 2) / 4, r % 1 ? (e[t.floor(r)] + e[t.floor(r) - 1]) / 2 : e[r - 1])
        }, h = function(e) {
            var t;
            switch (e) {
                case "undefined":
                    e = n;
                    break;
                case "null":
                    e = null;
                    break;
                case "true":
                    e = !0;
                    break;
                case "false":
                    e = !1;
                    break;
                default:
                    t = parseFloat(e), e == t && (e = t)
            }
            return e
        }, p = function(e) {
            var t, n = [];
            for (t = e.length; t--;) n[t] = h(e[t]);
            return n
        }, d = function(e, t) {
            var n, r, i = [];
            for (n = 0, r = e.length; n < r; n++) e[n] !== t && i.push(e[n]);
            return i
        }, v = function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }, E = function(e, t, n, i, s) {
            var o, u;
            e = (t === !1 ? parseFloat(e).toString() : e.toFixed(t)).split(""), o = (o = r.inArray(".", e)) < 0 ? e.length : o, o < e.length && (e[o] = s);
            for (u = o - n; u > 0; u -= n) e.splice(u, 0, i);
            return e.join("")
        }, m = function(e, t, n) {
            var r;
            for (r = t.length; r--;) {
                if (n && t[r] === null) continue;
                if (t[r] !== e) return !1
            }
            return !0
        }, g = function(e) {
            var t = 0,
                n;
            for (n = e.length; n--;) t += typeof e[n] == "number" ? e[n] : 0;
            return t
        }, w = function(e) {
            return r.isArray(e) ? e : [e]
        }, y = function(t) {
            var n;
            e.createStyleSheet ? e.createStyleSheet().cssText = t : (n = e.createElement("style"), n.type = "text/css", e.getElementsByTagName("head")[0].appendChild(n), n[typeof e.body.style.WebkitAppearance == "string" ? "innerText" : "innerHTML"] = t)
        }, r.fn.simpledraw = function(t, i, s, o) {
            var u, f;
            if (s && (u = this.data("_jqs_vcanvas"))) return u;
            if (r.fn.sparkline.canvas === !1) return !1;
            if (r.fn.sparkline.canvas === n) {
                var l = e.createElement("canvas");
                if (!l.getContext || !l.getContext("2d")) {
                    if (!e.namespaces || !!e.namespaces.v) return r.fn.sparkline.canvas = !1, !1;
                    e.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"), r.fn.sparkline.canvas = function(e, t, n, r) {
                        return new F(e, t, n)
                    }
                } else r.fn.sparkline.canvas = function(e, t, n, r) {
                    return new j(e, t, n, r)
                }
            }
            return t === n && (t = r(this).innerWidth()), i === n && (i = r(this).innerHeight()), u = r.fn.sparkline.canvas(t, i, this, o), f = r(this).data("_jqs_mhandler"), f && f.registerCanvas(u), u
        }, r.fn.cleardraw = function() {
            var e = this.data("_jqs_vcanvas");
            e && e.reset()
        }, r.RangeMapClass = S = o({
            init: function(e) {
                var t, n, r = [];
                for (t in e) e.hasOwnProperty(t) && typeof t == "string" && t.indexOf(":") > -1 && (n = t.split(":"), n[0] = n[0].length === 0 ? -Infinity : parseFloat(n[0]), n[1] = n[1].length === 0 ? Infinity : parseFloat(n[1]), n[2] = e[t], r.push(n));
                this.map = e, this.rangelist = r || !1
            },
            get: function(e) {
                var t = this.rangelist,
                    r, i, s;
                if ((s = this.map[e]) !== n) return s;
                if (t)
                    for (r = t.length; r--;) {
                        i = t[r];
                        if (i[0] <= e && i[1] >= e) return i[2]
                    }
                return n
            }
        }), r.range_map = function(e) {
            return new S(e)
        }, x = o({
            init: function(e, t) {
                var n = r(e);
                this.$el = n, this.options = t, this.currentPageX = 0, this.currentPageY = 0, this.el = e, this.splist = [], this.tooltip = null, this.over = !1, this.displayTooltips = !t.get("disableTooltips"), this.highlightEnabled = !t.get("disableHighlight")
            },
            registerSparkline: function(e) {
                this.splist.push(e), this.over && this.updateDisplay()
            },
            registerCanvas: function(e) {
                var t = r(e.canvas);
                this.canvas = e, this.$canvas = t, t.mouseenter(r.proxy(this.mouseenter, this)), t.mouseleave(r.proxy(this.mouseleave, this)), t.click(r.proxy(this.mouseclick, this))
            },
            reset: function(e) {
                this.splist = [], this.tooltip && e && (this.tooltip.remove(), this.tooltip = n)
            },
            mouseclick: function(e) {
                var t = r.Event("sparklineClick");
                t.originalEvent = e, t.sparklines = this.splist, this.$el.trigger(t)
            },
            mouseenter: function(t) {
                r(e.body).unbind("mousemove.jqs"), r(e.body).bind("mousemove.jqs", r.proxy(this.mousemove, this)), this.over = !0, this.currentPageX = t.pageX, this.currentPageY = t.pageY, this.currentEl = t.target, !this.tooltip && this.displayTooltips && (this.tooltip = new T(this.options), this.tooltip.updatePosition(t.pageX, t.pageY)), this.updateDisplay()
            },
            mouseleave: function() {
                r(e.body).unbind("mousemove.jqs");
                var t = this.splist,
                    n = t.length,
                    i = !1,
                    s, o;
                this.over = !1, this.currentEl = null, this.tooltip && (this.tooltip.remove(), this.tooltip = null);
                for (o = 0; o < n; o++) s = t[o], s.clearRegionHighlight() && (i = !0);
                i && this.canvas.render()
            },
            mousemove: function(e) {
                this.currentPageX = e.pageX, this.currentPageY = e.pageY, this.currentEl = e.target, this.tooltip && this.tooltip.updatePosition(e.pageX, e.pageY), this.updateDisplay()
            },
            updateDisplay: function() {
                var e = this.splist,
                    t = e.length,
                    n = !1,
                    i = this.$canvas.offset(),
                    s = this.currentPageX - i.left,
                    o = this.currentPageY - i.top,
                    u, a, f, l, c;
                if (!this.over) return;
                for (f = 0; f < t; f++) a = e[f], l = a.setRegionHighlight(this.currentEl, s, o), l && (n = !0);
                if (n) {
                    c = r.Event("sparklineRegionChange"), c.sparklines = this.splist, this.$el.trigger(c);
                    if (this.tooltip) {
                        u = "";
                        for (f = 0; f < t; f++) a = e[f], u += a.getCurrentRegionTooltip();
                        this.tooltip.setContent(u)
                    }
                    this.disableHighlight || this.canvas.render()
                }
                l === null && this.mouseleave()
            }
        }), T = o({
            sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
            init: function(t) {
                var n = t.get("tooltipClassname", "jqstooltip"),
                    i = this.sizeStyle,
                    s;
                this.container = t.get("tooltipContainer") || e.body, this.tooltipOffsetX = t.get("tooltipOffsetX", 10), this.tooltipOffsetY = t.get("tooltipOffsetY", 12), r("#jqssizetip").remove(), r("#jqstooltip").remove(), this.sizetip = r("<div/>", {
                    id: "jqssizetip",
                    style: i,
                    "class": n
                }), this.tooltip = r("<div/>", {
                    id: "jqstooltip",
                    "class": n
                }).appendTo(this.container), s = this.tooltip.offset(), this.offsetLeft = s.left, this.offsetTop = s.top, this.hidden = !0, r(window).unbind("resize.jqs scroll.jqs"), r(window).bind("resize.jqs scroll.jqs", r.proxy(this.updateWindowDims, this)), this.updateWindowDims()
            },
            updateWindowDims: function() {
                this.scrollTop = r(window).scrollTop(), this.scrollLeft = r(window).scrollLeft(), this.scrollRight = this.scrollLeft + r(window).width(), this.updatePosition()
            },
            getSize: function(e) {
                this.sizetip.html(e).appendTo(this.container), this.width = this.sizetip.width() + 1, this.height = this.sizetip.height(), this.sizetip.remove()
            },
            setContent: function(e) {
                if (!e) {
                    this.tooltip.css("visibility", "hidden"), this.hidden = !0;
                    return
                }
                this.getSize(e), this.tooltip.html(e).css({
                    width: this.width,
                    height: this.height,
                    visibility: "visible"
                }), this.hidden && (this.hidden = !1, this.updatePosition())
            },
            updatePosition: function(e, t) {
                if (e === n) {
                    if (this.mousex === n) return;
                    e = this.mousex - this.offsetLeft, t = this.mousey - this.offsetTop
                } else this.mousex = e -= this.offsetLeft, this.mousey = t -= this.offsetTop;
                if (!this.height || !this.width || this.hidden) return;
                t -= this.height + this.tooltipOffsetY, e += this.tooltipOffsetX, t < this.scrollTop && (t = this.scrollTop), e < this.scrollLeft ? e = this.scrollLeft : e + this.width > this.scrollRight && (e = this.scrollRight - this.width), this.tooltip.css({
                    left: e,
                    top: t
                })
            },
            remove: function() {
                this.tooltip.remove(), this.sizetip.remove(), this.sizetip = this.tooltip = n, r(window).unbind("resize.jqs scroll.jqs")
            }
        }), P = function() {
            y(D)
        }, r(P), I = [], r.fn.sparkline = function(t, i) {
            return this.each(function() {
                var s = new r.fn.sparkline.options(this, i),
                    o = r(this),
                    u, f;
                u = function() {
                    var i, u, f, l, h, p, d;
                    if (t === "html" || t === n) {
                        d = this.getAttribute(s.get("tagValuesAttribute"));
                        if (d === n || d === null) d = o.html();
                        i = d.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")
                    } else i = t;
                    u = s.get("width") === "auto" ? i.length * s.get("defaultPixelsPerValue") : s.get("width");
                    if (s.get("height") === "auto") {
                        if (!s.get("composite") || !r.data(this, "_jqs_vcanvas")) l = e.createElement("span"), l.innerHTML = "a", o.html(l), f = r(l).innerHeight() || r(l).height(), r(l).remove(), l = null
                    } else f = s.get("height");
                    s.get("disableInteraction") ? h = !1 : (h = r.data(this, "_jqs_mhandler"), h ? s.get("composite") || h.reset() : (h = new x(this, s), r.data(this, "_jqs_mhandler", h)));
                    if (s.get("composite") && !r.data(this, "_jqs_vcanvas")) {
                        r.data(this, "_jqs_errnotify") || (alert("Attempted to attach a composite sparkline to an element with no existing sparkline"), r.data(this, "_jqs_errnotify", !0));
                        return
                    }
                    p = new(r.fn.sparkline[s.get("type")])(this, i, s, u, f), p.render(), h && h.registerSparkline(p)
                };
                if (r(this).html() && !s.get("disableHiddenCheck") && r(this).is(":hidden") || !r(this).parents("body").length) {
                    if (!s.get("composite") && r.data(this, "_jqs_pending"))
                        for (f = I.length; f; f--) I[f - 1][0] == this && I.splice(f - 1, 1);
                    I.push([this, u]), r.data(this, "_jqs_pending", !0)
                } else u.call(this)
            })
        }, r.fn.sparkline.defaults = s(), r.sparkline_display_visible = function() {
            var e, t, n, i = [];
            for (t = 0, n = I.length; t < n; t++) e = I[t][0], r(e).is(":visible") && !r(e).parents().is(":hidden") ? (I[t][1].call(e), r.data(I[t][0], "_jqs_pending", !1), i.push(t)) : !r(e).closest("html").length && !r.data(e, "_jqs_pending") && (r.data(I[t][0], "_jqs_pending", !1), i.push(t));
            for (t = i.length; t; t--) I.splice(i[t - 1], 1)
        }, r.fn.sparkline.options = o({
            init: function(e, t) {
                var n, s, o, u;
                this.userOptions = t = t || {}, this.tag = e, this.tagValCache = {}, s = r.fn.sparkline.defaults, o = s.common, this.tagOptionsPrefix = t.enableTagOptions && (t.tagOptionsPrefix || o.tagOptionsPrefix), u = this.getTagSetting("type"), u === i ? n = s[t.type || o.type] : n = s[u], this.mergedOptions = r.extend({}, o, n, t)
            },
            getTagSetting: function(e) {
                var t = this.tagOptionsPrefix,
                    r, s, o, u;
                if (t === !1 || t === n) return i;
                if (this.tagValCache.hasOwnProperty(e)) r = this.tagValCache.key;
                else {
                    r = this.tag.getAttribute(t + e);
                    if (r === n || r === null) r = i;
                    else if (r.substr(0, 1) === "[") {
                        r = r.substr(1, r.length - 2).split(",");
                        for (s = r.length; s--;) r[s] = h(r[s].replace(/(^\s*)|(\s*$)/g, ""))
                    } else if (r.substr(0, 1) === "{") {
                        o = r.substr(1, r.length - 2).split(","), r = {};
                        for (s = o.length; s--;) u = o[s].split(":", 2), r[u[0].replace(/(^\s*)|(\s*$)/g, "")] = h(u[1].replace(/(^\s*)|(\s*$)/g, ""))
                    } else r = h(r);
                    this.tagValCache.key = r
                }
                return r
            },
            get: function(e, t) {
                var r = this.getTagSetting(e),
                    s;
                return r !== i ? r : (s = this.mergedOptions[e]) === n ? t : s
            }
        }), r.fn.sparkline._base = o({
            disabled: !1,
            init: function(e, t, i, s, o) {
                this.el = e, this.$el = r(e), this.values = t, this.options = i, this.width = s, this.height = o, this.currentRegion = n
            },
            initTarget: function() {
                var e = !this.options.get("disableInteraction");
                (this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), e)) ? (this.canvasWidth = this.target.pixelWidth, this.canvasHeight = this.target.pixelHeight) : this.disabled = !0
            },
            render: function() {
                return this.disabled ? (this.el.innerHTML = "", !1) : !0
            },
            getRegion: function(e, t) {},
            setRegionHighlight: function(e, t, r) {
                var i = this.currentRegion,
                    s = !this.options.get("disableHighlight"),
                    o;
                return t > this.canvasWidth || r > this.canvasHeight || t < 0 || r < 0 ? null : (o = this.getRegion(e, t, r), i !== o ? (i !== n && s && this.removeHighlight(), this.currentRegion = o, o !== n && s && this.renderHighlight(), !0) : !1)
            },
            clearRegionHighlight: function() {
                return this.currentRegion !== n ? (this.removeHighlight(), this.currentRegion = n, !0) : !1
            },
            renderHighlight: function() {
                this.changeHighlight(!0)
            },
            removeHighlight: function() {
                this.changeHighlight(!1)
            },
            changeHighlight: function(e) {},
            getCurrentRegionTooltip: function() {
                var e = this.options,
                    t = "",
                    i = [],
                    s, o, a, f, l, h, p, d, v, m, g, y, b, w;
                if (this.currentRegion === n) return "";
                s = this.getCurrentRegionFields(), g = e.get("tooltipFormatter");
                if (g) return g(this, e, s);
                e.get("tooltipChartTitle") && (t += '<div class="jqs jqstitle">' + e.get("tooltipChartTitle") + "</div>\n"), o = this.options.get("tooltipFormat");
                if (!o) return "";
                r.isArray(o) || (o = [o]), r.isArray(s) || (s = [s]), p = this.options.get("tooltipFormatFieldlist"), d = this.options.get("tooltipFormatFieldlistKey");
                if (p && d) {
                    v = [];
                    for (h = s.length; h--;) m = s[h][d], (w = r.inArray(m, p)) != -1 && (v[w] = s[h]);
                    s = v
                }
                a = o.length, b = s.length;
                for (h = 0; h < a; h++) {
                    y = o[h], typeof y == "string" && (y = new u(y)), f = y.fclass || "jqsfield";
                    for (w = 0; w < b; w++)
                        if (!s[w].isNull || !e.get("tooltipSkipNull")) r.extend(s[w], {
                            prefix: e.get("tooltipPrefix"),
                            suffix: e.get("tooltipSuffix")
                        }), l = y.render(s[w], e.get("tooltipValueLookups"), e), i.push('<div class="' + f + '">' + l + "</div>")
                }
                return i.length ? t + i.join("\n") : ""
            },
            getCurrentRegionFields: function() {},
            calcHighlightColor: function(e, n) {
                var r = n.get("highlightColor"),
                    i = n.get("highlightLighten"),
                    s, o, u, a;
                if (r) return r;
                if (i) {
                    s = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(e);
                    if (s) {
                        u = [], o = e.length === 4 ? 16 : 1;
                        for (a = 0; a < 3; a++) u[a] = f(t.round(parseInt(s[a + 1], 16) * o * i), 0, 255);
                        return "rgb(" + u.join(",") + ")"
                    }
                }
                return e
            }
        }), N = {
            changeHighlight: function(e) {
                var t = this.currentRegion,
                    n = this.target,
                    i = this.regionShapes[t],
                    s;
                i && (s = this.renderRegion(t, e), r.isArray(s) || r.isArray(i) ? (n.replaceWithShapes(i, s), this.regionShapes[t] = r.map(s, function(e) {
                    return e.id
                })) : (n.replaceWithShape(i, s), this.regionShapes[t] = s.id))
            },
            render: function() {
                var e = this.values,
                    t = this.target,
                    n = this.regionShapes,
                    i, s, o, u;
                if (!this.cls._super.render.call(this)) return;
                for (o = e.length; o--;) {
                    i = this.renderRegion(o);
                    if (i)
                        if (r.isArray(i)) {
                            s = [];
                            for (u = i.length; u--;) i[u].append(), s.push(i[u].id);
                            n[o] = s
                        } else i.append(), n[o] = i.id;
                    else n[o] = null
                }
                t.render()
            }
        }, r.fn.sparkline.line = C = o(r.fn.sparkline._base, {
            type: "line",
            init: function(e, t, n, r, i) {
                C._super.init.call(this, e, t, n, r, i), this.vertices = [], this.regionMap = [], this.xvalues = [], this.yvalues = [], this.yminmax = [], this.hightlightSpotId = null, this.lastShapeId = null, this.initTarget()
            },
            getRegion: function(e, t, r) {
                var i, s = this.regionMap;
                for (i = s.length; i--;)
                    if (s[i] !== null && t >= s[i][0] && t <= s[i][1]) return s[i][2];
                return n
            },
            getCurrentRegionFields: function() {
                var e = this.currentRegion;
                return {
                    isNull: this.yvalues[e] === null,
                    x: this.xvalues[e],
                    y: this.yvalues[e],
                    color: this.options.get("lineColor"),
                    fillColor: this.options.get("fillColor"),
                    offset: e
                }
            },
            renderHighlight: function() {
                var e = this.currentRegion,
                    t = this.target,
                    r = this.vertices[e],
                    i = this.options,
                    s = i.get("spotRadius"),
                    o = i.get("highlightSpotColor"),
                    u = i.get("highlightLineColor"),
                    a, f;
                if (!r) return;
                s && o && (a = t.drawCircle(r[0], r[1], s, n, o), this.highlightSpotId = a.id, t.insertAfterShape(this.lastShapeId, a)), u && (f = t.drawLine(r[0], this.canvasTop, r[0], this.canvasTop + this.canvasHeight, u), this.highlightLineId = f.id, t.insertAfterShape(this.lastShapeId, f))
            },
            removeHighlight: function() {
                var e = this.target;
                this.highlightSpotId && (e.removeShapeId(this.highlightSpotId), this.highlightSpotId = null), this.highlightLineId && (e.removeShapeId(this.highlightLineId), this.highlightLineId = null)
            },
            scanValues: function() {
                var e = this.values,
                    n = e.length,
                    r = this.xvalues,
                    i = this.yvalues,
                    s = this.yminmax,
                    o, u, a, f, l;
                for (o = 0; o < n; o++) u = e[o], a = typeof e[o] == "string", f = typeof e[o] == "object" && e[o] instanceof Array, l = a && e[o].split(":"), a && l.length === 2 ? (r.push(Number(l[0])), i.push(Number(l[1])), s.push(Number(l[1]))) : f ? (r.push(u[0]), i.push(u[1]), s.push(u[1])) : (r.push(o), e[o] === null || e[o] === "null" ? i.push(null) : (i.push(Number(u)), s.push(Number(u))));
                this.options.get("xvalues") && (r = this.options.get("xvalues")), this.maxy = this.maxyorg = t.max.apply(t, s), this.miny = this.minyorg = t.min.apply(t, s), this.maxx = t.max.apply(t, r), this.minx = t.min.apply(t, r), this.xvalues = r, this.yvalues = i, this.yminmax = s
            },
            processRangeOptions: function() {
                var e = this.options,
                    t = e.get("normalRangeMin"),
                    r = e.get("normalRangeMax");
                t !== n && (t < this.miny && (this.miny = t), r > this.maxy && (this.maxy = r)), e.get("chartRangeMin") !== n && (e.get("chartRangeClip") || e.get("chartRangeMin") < this.miny) && (this.miny = e.get("chartRangeMin")), e.get("chartRangeMax") !== n && (e.get("chartRangeClip") || e.get("chartRangeMax") > this.maxy) && (this.maxy = e.get("chartRangeMax")), e.get("chartRangeMinX") !== n && (e.get("chartRangeClipX") || e.get("chartRangeMinX") < this.minx) && (this.minx = e.get("chartRangeMinX")), e.get("chartRangeMaxX") !== n && (e.get("chartRangeClipX") || e.get("chartRangeMaxX") > this.maxx) && (this.maxx = e.get("chartRangeMaxX"))
            },
            drawNormalRange: function(e, r, i, s, o) {
                var u = this.options.get("normalRangeMin"),
                    a = this.options.get("normalRangeMax"),
                    f = r + t.round(i - i * ((a - this.miny) / o)),
                    l = t.round(i * (a - u) / o);
                this.target.drawRect(e, f, s, l, n, this.options.get("normalRangeColor")).append()
            },
            render: function() {
                var e = this.options,
                    i = this.target,
                    s = this.canvasWidth,
                    o = this.canvasHeight,
                    u = this.vertices,
                    a = e.get("spotRadius"),
                    f = this.regionMap,
                    l, h, p, d, v, m, g, y, w, E, x, T, N, k, L, A, O, M, _, D, P, H, B, j, F;
                if (!C._super.render.call(this)) return;
                this.scanValues(), this.processRangeOptions(), B = this.xvalues, j = this.yvalues;
                if (!this.yminmax.length || this.yvalues.length < 2) return;
                d = v = 0, l = this.maxx - this.minx === 0 ? 1 : this.maxx - this.minx, h = this.maxy - this.miny === 0 ? 1 : this.maxy - this.miny, p = this.yvalues.length - 1, a && (s < a * 4 || o < a * 4) && (a = 0);
                if (a) {
                    P = e.get("highlightSpotColor") && !e.get("disableInteraction");
                    if (P || e.get("minSpotColor") || e.get("spotColor") && j[p] === this.miny) o -= t.ceil(a);
                    if (P || e.get("maxSpotColor") || e.get("spotColor") && j[p] === this.maxy) o -= t.ceil(a), d += t.ceil(a);
                    if (P || (e.get("minSpotColor") || e.get("maxSpotColor")) && (j[0] === this.miny || j[0] === this.maxy)) v += t.ceil(a), s -= t.ceil(a);
                    if (P || e.get("spotColor") || e.get("minSpotColor") || e.get("maxSpotColor") && (j[p] === this.miny || j[p] === this.maxy)) s -= t.ceil(a)
                }
                o--, e.get("normalRangeMin") !== n && !e.get("drawNormalOnTop") && this.drawNormalRange(v, d, o, s, h), g = [], y = [g], k = L = null, A = j.length;
                for (F = 0; F < A; F++) w = B[F], x = B[F + 1], E = j[F], T = v + t.round((w - this.minx) * (s / l)), N = F < A - 1 ? v + t.round((x - this.minx) * (s / l)) : s, L = T + (N - T) / 2, f[F] = [k || 0, L, F], k = L, E === null ? F && (j[F - 1] !== null && (g = [], y.push(g)), u.push(null)) : (E < this.miny && (E = this.miny), E > this.maxy && (E = this.maxy), g.length || g.push([T, d + o]), m = [T, d + t.round(o - o * ((E - this.miny) / h))], g.push(m), u.push(m));
                O = [], M = [], _ = y.length;
                for (F = 0; F < _; F++) g = y[F], g.length && (e.get("fillColor") && (g.push([g[g.length - 1][0], d + o]), M.push(g.slice(0)), g.pop()), g.length > 2 && (g[0] = [g[0][0], g[1][1]]), O.push(g));
                _ = M.length;
                for (F = 0; F < _; F++) i.drawShape(M[F], e.get("fillColor"), e.get("fillColor")).append();
                e.get("normalRangeMin") !== n && e.get("drawNormalOnTop") && this.drawNormalRange(v, d, o, s, h), _ = O.length;
                for (F = 0; F < _; F++) i.drawShape(O[F], e.get("lineColor"), n, e.get("lineWidth")).append();
                if (a && e.get("valueSpots")) {
                    D = e.get("valueSpots"), D.get === n && (D = new S(D));
                    for (F = 0; F < A; F++) H = D.get(j[F]), H && i.drawCircle(v + t.round((B[F] - this.minx) * (s / l)), d + t.round(o - o * ((j[F] - this.miny) / h)), a, n, H).append()
                }
                a && e.get("spotColor") && j[p] !== null && i.drawCircle(v + t.round((B[B.length - 1] - this.minx) * (s / l)), d + t.round(o - o * ((j[p] - this.miny) / h)), a, n, e.get("spotColor")).append(), this.maxy !== this.minyorg && (a && e.get("minSpotColor") && (w = B[r.inArray(this.minyorg, j)], i.drawCircle(v + t.round((w - this.minx) * (s / l)), d + t.round(o - o * ((this.minyorg - this.miny) / h)), a, n, e.get("minSpotColor")).append()), a && e.get("maxSpotColor") && (w = B[r.inArray(this.maxyorg, j)], i.drawCircle(v + t.round((w - this.minx) * (s / l)), d + t.round(o - o * ((this.maxyorg - this.miny) / h)), a, n, e.get("maxSpotColor")).append())), this.lastShapeId = i.getLastShapeId(), this.canvasTop = d, i.render()
            }
        }), r.fn.sparkline.bar = k = o(r.fn.sparkline._base, N, {
            type: "bar",
            init: function(e, i, s, o, u) {
                var a = parseInt(s.get("barWidth"), 10),
                    l = parseInt(s.get("barSpacing"), 10),
                    v = s.get("chartRangeMin"),
                    m = s.get("chartRangeMax"),
                    g = s.get("chartRangeClip"),
                    y = Infinity,
                    w = -Infinity,
                    E, x, T, N, C, L, A, O, M, _, D, P, H, B, j, F, I, q, R, U, z, W, X;
                k._super.init.call(this, e, i, s, o, u);
                for (L = 0, A = i.length; L < A; L++) {
                    U = i[L], E = typeof U == "string" && U.indexOf(":") > -1;
                    if (E || r.isArray(U)) j = !0, E && (U = i[L] = p(U.split(":"))), U = d(U, null), x = t.min.apply(t, U), T = t.max.apply(t, U), x < y && (y = x), T > w && (w = T)
                }
                this.stacked = j, this.regionShapes = {}, this.barWidth = a, this.barSpacing = l, this.totalBarWidth = a + l, this.width = o = i.length * a + (i.length - 1) * l, this.initTarget(), g && (H = v === n ? -Infinity : v, B = m === n ? Infinity : m), C = [], N = j ? [] : C;
                var V = [],
                    $ = [];
                for (L = 0, A = i.length; L < A; L++)
                    if (j) {
                        F = i[L], i[L] = R = [], V[L] = 0, N[L] = $[L] = 0;
                        for (I = 0, q = F.length; I < q; I++) U = R[I] = g ? f(F[I], H, B) : F[I], U !== null && (U > 0 && (V[L] += U), y < 0 && w > 0 ? U < 0 ? $[L] += t.abs(U) : N[L] += U : N[L] += t.abs(U - (U < 0 ? w : y)), C.push(U))
                    } else U = g ? f(i[L], H, B) : i[L], U = i[L] = h(U), U !== null && C.push(U);
                this.max = P = t.max.apply(t, C), this.min = D = t.min.apply(t, C), this.stackMax = w = j ? t.max.apply(t, V) : P, this.stackMin = y = j ? t.min.apply(t, C) : D, s.get("chartRangeMin") !== n && (s.get("chartRangeClip") || s.get("chartRangeMin") < D) && (D = s.get("chartRangeMin")), s.get("chartRangeMax") !== n && (s.get("chartRangeClip") || s.get("chartRangeMax") > P) && (P = s.get("chartRangeMax")), this.zeroAxis = M = s.get("zeroAxis", !0), D <= 0 && P >= 0 && M ? _ = 0 : M == 0 ? _ = D : D > 0 ? _ = D : _ = P, this.xaxisOffset = _, O = j ? t.max.apply(t, N) + t.max.apply(t, $) : P - D, this.canvasHeightEf = M && D < 0 ? this.canvasHeight - 2 : this.canvasHeight - 1, D < _ ? (W = j && P >= 0 ? w : P, z = (W - _) / O * this.canvasHeight, z !== t.ceil(z) && (this.canvasHeightEf -= 2, z = t.ceil(z))) : z = this.canvasHeight, this.yoffset = z, r.isArray(s.get("colorMap")) ? (this.colorMapByIndex = s.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = s.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === n && (this.colorMapByValue = new S(this.colorMapByValue))), this.range = O
            },
            getRegion: function(e, r, i) {
                var s = t.floor(r / this.totalBarWidth);
                return s < 0 || s >= this.values.length ? n : s
            },
            getCurrentRegionFields: function() {
                var e = this.currentRegion,
                    t = w(this.values[e]),
                    n = [],
                    r, i;
                for (i = t.length; i--;) r = t[i], n.push({
                    isNull: r === null,
                    value: r,
                    color: this.calcColor(i, r, e),
                    offset: e
                });
                return n
            },
            calcColor: function(e, t, i) {
                var s = this.colorMapByIndex,
                    o = this.colorMapByValue,
                    u = this.options,
                    a, f;
                return this.stacked ? a = u.get("stackedBarColor") : a = t < 0 ? u.get("negBarColor") : u.get("barColor"), t === 0 && u.get("zeroColor") !== n && (a = u.get("zeroColor")), o && (f = o.get(t)) ? a = f : s && s.length > i && (a = s[i]), r.isArray(a) ? a[e % a.length] : a
            },
            renderRegion: function(e, i) {
                var s = this.values[e],
                    o = this.options,
                    u = this.xaxisOffset,
                    a = [],
                    f = this.range,
                    l = this.stacked,
                    h = this.target,
                    p = e * this.totalBarWidth,
                    d = this.canvasHeightEf,
                    v = this.yoffset,
                    g, y, w, E, S, x, T, N, C, k;
                s = r.isArray(s) ? s : [s], T = s.length, N = s[0], E = m(null, s), k = m(u, s, !0);
                if (E) return o.get("nullColor") ? (w = i ? o.get("nullColor") : this.calcHighlightColor(o.get("nullColor"), o), g = v > 0 ? v - 1 : v, h.drawRect(p, g, this.barWidth - 1, 0, w, w)) : n;
                S = v;
                for (x = 0; x < T; x++) {
                    N = s[x];
                    if (l && N === u) {
                        if (!k || C) continue;
                        C = !0
                    }
                    f > 0 ? y = t.floor(d * (t.abs(N - u) / f)) + 1 : y = 1, N < u || N === u && v === 0 ? (g = S, S += y) : (g = v - y, v -= y), w = this.calcColor(x, N, e), i && (w = this.calcHighlightColor(w, o)), a.push(h.drawRect(p, g, this.barWidth - 1, y - 1, w, w))
                }
                return a.length === 1 ? a[0] : a
            }
        }), r.fn.sparkline.tristate = L = o(r.fn.sparkline._base, N, {
            type: "tristate",
            init: function(e, t, i, s, o) {
                var u = parseInt(i.get("barWidth"), 10),
                    a = parseInt(i.get("barSpacing"), 10);
                L._super.init.call(this, e, t, i, s, o), this.regionShapes = {}, this.barWidth = u, this.barSpacing = a, this.totalBarWidth = u + a, this.values = r.map(t, Number), this.width = s = t.length * u + (t.length - 1) * a, r.isArray(i.get("colorMap")) ? (this.colorMapByIndex = i.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = i.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === n && (this.colorMapByValue = new S(this.colorMapByValue))), this.initTarget()
            },
            getRegion: function(e, n, r) {
                return t.floor(n / this.totalBarWidth)
            },
            getCurrentRegionFields: function() {
                var e = this.currentRegion;
                return {
                    isNull: this.values[e] === n,
                    value: this.values[e],
                    color: this.calcColor(this.values[e], e),
                    offset: e
                }
            },
            calcColor: function(e, t) {
                var n = this.values,
                    r = this.options,
                    i = this.colorMapByIndex,
                    s = this.colorMapByValue,
                    o, u;
                return s && (u = s.get(e)) ? o = u : i && i.length > t ? o = i[t] : n[t] < 0 ? o = r.get("negBarColor") : n[t] > 0 ? o = r.get("posBarColor") : o = r.get("zeroBarColor"), o
            },
            renderRegion: function(e, n) {
                var r = this.values,
                    i = this.options,
                    s = this.target,
                    o, u, a, f, l, c;
                o = s.pixelHeight, a = t.round(o / 2), f = e * this.totalBarWidth, r[e] < 0 ? (l = a, u = a - 1) : r[e] > 0 ? (l = 0, u = a - 1) : (l = a - 1, u = 2), c = this.calcColor(r[e], e);
                if (c === null) return;
                return n && (c = this.calcHighlightColor(c, i)), s.drawRect(f, l, this.barWidth - 1, u - 1, c, c)
            }
        }), r.fn.sparkline.discrete = A = o(r.fn.sparkline._base, N, {
            type: "discrete",
            init: function(e, i, s, o, u) {
                A._super.init.call(this, e, i, s, o, u), this.regionShapes = {}, this.values = i = r.map(i, Number), this.min = t.min.apply(t, i), this.max = t.max.apply(t, i), this.range = this.max - this.min, this.width = o = s.get("width") === "auto" ? i.length * 2 : this.width, this.interval = t.floor(o / i.length), this.itemWidth = o / i.length, s.get("chartRangeMin") !== n && (s.get("chartRangeClip") || s.get("chartRangeMin") < this.min) && (this.min = s.get("chartRangeMin")), s.get("chartRangeMax") !== n && (s.get("chartRangeClip") || s.get("chartRangeMax") > this.max) && (this.max = s.get("chartRangeMax")), this.initTarget(), this.target && (this.lineHeight = s.get("lineHeight") === "auto" ? t.round(this.canvasHeight * .3) : s.get("lineHeight"))
            },
            getRegion: function(e, n, r) {
                return t.floor(n / this.itemWidth)
            },
            getCurrentRegionFields: function() {
                var e = this.currentRegion;
                return {
                    isNull: this.values[e] === n,
                    value: this.values[e],
                    offset: e
                }
            },
            renderRegion: function(e, n) {
                var r = this.values,
                    i = this.options,
                    s = this.min,
                    o = this.max,
                    u = this.range,
                    a = this.interval,
                    l = this.target,
                    c = this.canvasHeight,
                    h = this.lineHeight,
                    p = c - h,
                    d, v, m, g;
                return v = f(r[e], s, o), g = e * a, d = t.round(p - p * ((v - s) / u)), m = i.get("thresholdColor") && v < i.get("thresholdValue") ? i.get("thresholdColor") : i.get("lineColor"), n && (m = this.calcHighlightColor(m, i)), l.drawLine(g, d, g, d + h, m)
            }
        }), r.fn.sparkline.bullet = O = o(r.fn.sparkline._base, {
            type: "bullet",
            init: function(e, r, i, s, o) {
                var u, a, f;
                O._super.init.call(this, e, r, i, s, o), this.values = r = p(r), f = r.slice(), f[0] = f[0] === null ? f[2] : f[0], f[1] = r[1] === null ? f[2] : f[1], u = t.min.apply(t, r), a = t.max.apply(t, r), i.get("base") === n ? u = u < 0 ? u : 0 : u = i.get("base"), this.min = u, this.max = a, this.range = a - u, this.shapes = {}, this.valueShapes = {}, this.regiondata = {}, this.width = s = i.get("width") === "auto" ? "4.0em" : s, this.target = this.$el.simpledraw(s, o, i.get("composite")), r.length || (this.disabled = !0), this.initTarget()
            },
            getRegion: function(e, t, r) {
                var i = this.target.getShapeAt(e, t, r);
                return i !== n && this.shapes[i] !== n ? this.shapes[i] : n
            },
            getCurrentRegionFields: function() {
                var e = this.currentRegion;
                return {
                    fieldkey: e.substr(0, 1),
                    value: this.values[e.substr(1)],
                    region: e
                }
            },
            changeHighlight: function(e) {
                var t = this.currentRegion,
                    n = this.valueShapes[t],
                    r;
                delete this.shapes[n];
                switch (t.substr(0, 1)) {
                    case "r":
                        r = this.renderRange(t.substr(1), e);
                        break;
                    case "p":
                        r = this.renderPerformance(e);
                        break;
                    case "t":
                        r = this.renderTarget(e)
                }
                this.valueShapes[t] = r.id, this.shapes[r.id] = t, this.target.replaceWithShape(n, r)
            },
            renderRange: function(e, n) {
                var r = this.values[e],
                    i = t.round(this.canvasWidth * ((r - this.min) / this.range)),
                    s = this.options.get("rangeColors")[e - 2];
                return n && (s = this.calcHighlightColor(s, this.options)), this.target.drawRect(0, 0, i - 1, this.canvasHeight - 1, s, s)
            },
            renderPerformance: function(e) {
                var n = this.values[1],
                    r = t.round(this.canvasWidth * ((n - this.min) / this.range)),
                    i = this.options.get("performanceColor");
                return e && (i = this.calcHighlightColor(i, this.options)), this.target.drawRect(0, t.round(this.canvasHeight * .3), r - 1, t.round(this.canvasHeight * .4) - 1, i, i)
            },
            renderTarget: function(e) {
                var n = this.values[0],
                    r = t.round(this.canvasWidth * ((n - this.min) / this.range) - this.options.get("targetWidth") / 2),
                    i = t.round(this.canvasHeight * .1),
                    s = this.canvasHeight - i * 2,
                    o = this.options.get("targetColor");
                return e && (o = this.calcHighlightColor(o, this.options)), this.target.drawRect(r, i, this.options.get("targetWidth") - 1, s - 1, o, o)
            },
            render: function() {
                var e = this.values.length,
                    t = this.target,
                    n, r;
                if (!O._super.render.call(this)) return;
                for (n = 2; n < e; n++) r = this.renderRange(n).append(), this.shapes[r.id] = "r" + n, this.valueShapes["r" + n] = r.id;
                this.values[1] !== null && (r = this.renderPerformance().append(), this.shapes[r.id] = "p1", this.valueShapes.p1 = r.id), this.values[0] !== null && (r = this.renderTarget().append(), this.shapes[r.id] = "t0", this.valueShapes.t0 = r.id), t.render()
            }
        }), r.fn.sparkline.pie = M = o(r.fn.sparkline._base, {
            type: "pie",
            init: function(e, n, i, s, o) {
                var u = 0,
                    a;
                M._super.init.call(this, e, n, i, s, o), this.shapes = {}, this.valueShapes = {}, this.values = n = r.map(n, Number), i.get("width") === "auto" && (this.width = this.height);
                if (n.length > 0)
                    for (a = n.length; a--;) u += n[a];
                this.total = u, this.initTarget(), this.radius = t.floor(t.min(this.canvasWidth, this.canvasHeight) / 2)
            },
            getRegion: function(e, t, r) {
                var i = this.target.getShapeAt(e, t, r);
                return i !== n && this.shapes[i] !== n ? this.shapes[i] : n
            },
            getCurrentRegionFields: function() {
                var e = this.currentRegion;
                return {
                    isNull: this.values[e] === n,
                    value: this.values[e],
                    percent: this.values[e] / this.total * 100,
                    color: this.options.get("sliceColors")[e % this.options.get("sliceColors").length],
                    offset: e
                }
            },
            changeHighlight: function(e) {
                var t = this.currentRegion,
                    n = this.renderSlice(t, e),
                    r = this.valueShapes[t];
                delete this.shapes[r], this.target.replaceWithShape(r, n), this.valueShapes[t] = n.id, this.shapes[n.id] = t
            },
            renderSlice: function(e, r) {
                var i = this.target,
                    s = this.options,
                    o = this.radius,
                    u = s.get("borderWidth"),
                    a = s.get("offset"),
                    f = 2 * t.PI,
                    l = this.values,
                    h = this.total,
                    p = a ? 2 * t.PI * (a / 360) : 0,
                    d, v, m, g, y;
                g = l.length;
                for (m = 0; m < g; m++) {
                    d = p, v = p, h > 0 && (v = p + f * (l[m] / h));
                    if (e === m) return y = s.get("sliceColors")[m % s.get("sliceColors").length], r && (y = this.calcHighlightColor(y, s)), i.drawPieSlice(o, o, o - u, d, v, n, y);
                    p = v
                }
            },
            render: function() {
                var e = this.target,
                    r = this.values,
                    i = this.options,
                    s = this.radius,
                    o = i.get("borderWidth"),
                    u, a;
                if (!M._super.render.call(this)) return;
                o && e.drawCircle(s, s, t.floor(s - o / 2), i.get("borderColor"), n, o).append();
                for (a = r.length; a--;) r[a] && (u = this.renderSlice(a).append(), this.valueShapes[a] = u.id, this.shapes[u.id] = a);
                e.render()
            }
        }), r.fn.sparkline.box = _ = o(r.fn.sparkline._base, {
            type: "box",
            init: function(e, t, n, i, s) {
                _._super.init.call(this, e, t, n, i, s), this.values = r.map(t, Number), this.width = n.get("width") === "auto" ? "4.0em" : i, this.initTarget(), this.values.length || (this.disabled = 1)
            },
            getRegion: function() {
                return 1
            },
            getCurrentRegionFields: function() {
                var e = [{
                    field: "lq",
                    value: this.quartiles[0]
                }, {
                    field: "med",
                    value: this.quartiles[1]
                }, {
                    field: "uq",
                    value: this.quartiles[2]
                }];
                return this.loutlier !== n && e.push({
                    field: "lo",
                    value: this.loutlier
                }), this.routlier !== n && e.push({
                    field: "ro",
                    value: this.routlier
                }), this.lwhisker !== n && e.push({
                    field: "lw",
                    value: this.lwhisker
                }), this.rwhisker !== n && e.push({
                    field: "rw",
                    value: this.rwhisker
                }), e
            },
            render: function() {
                var e = this.target,
                    r = this.values,
                    i = r.length,
                    s = this.options,
                    o = this.canvasWidth,
                    u = this.canvasHeight,
                    a = s.get("chartRangeMin") === n ? t.min.apply(t, r) : s.get("chartRangeMin"),
                    f = s.get("chartRangeMax") === n ? t.max.apply(t, r) : s.get("chartRangeMax"),
                    h = 0,
                    p, d, v, m, g, y, w, E, S, x, T;
                if (!_._super.render.call(this)) return;
                if (s.get("raw")) s.get("showOutliers") && r.length > 5 ? (d = r[0], p = r[1], m = r[2], g = r[3], y = r[4], w = r[5], E = r[6]) : (p = r[0], m = r[1], g = r[2], y = r[3], w = r[4]);
                else {
                    r.sort(function(e, t) {
                        return e - t
                    }), m = l(r, 1), g = l(r, 2), y = l(r, 3), v = y - m;
                    if (s.get("showOutliers")) {
                        p = w = n;
                        for (S = 0; S < i; S++) p === n && r[S] > m - v * s.get("outlierIQR") && (p = r[S]), r[S] < y + v * s.get("outlierIQR") && (w = r[S]);
                        d = r[0], E = r[i - 1]
                    } else p = r[0], w = r[i - 1]
                }
                this.quartiles = [m, g, y], this.lwhisker = p, this.rwhisker = w, this.loutlier = d, this.routlier = E, T = o / (f - a + 1), s.get("showOutliers") && (h = t.ceil(s.get("spotRadius")), o -= 2 * t.ceil(s.get("spotRadius")), T = o / (f - a + 1), d < p && e.drawCircle((d - a) * T + h, u / 2, s.get("spotRadius"), s.get("outlierLineColor"), s.get("outlierFillColor")).append(), E > w && e.drawCircle((E - a) * T + h, u / 2, s.get("spotRadius"), s.get("outlierLineColor"), s.get("outlierFillColor")).append()), e.drawRect(t.round((m - a) * T + h), t.round(u * .1), t.round((y - m) * T), t.round(u * .8), s.get("boxLineColor"), s.get("boxFillColor")).append(), e.drawLine(t.round((p - a) * T + h), t.round(u / 2), t.round((m - a) * T + h), t.round(u / 2), s.get("lineColor")).append(), e.drawLine(t.round((p - a) * T + h), t.round(u / 4), t.round((p - a) * T + h), t.round(u - u / 4), s.get("whiskerColor")).append(), e.drawLine(t.round((w - a) * T + h), t.round(u / 2), t.round((y - a) * T + h), t.round(u / 2), s.get("lineColor")).append(), e.drawLine(t.round((w - a) * T + h), t.round(u / 4), t.round((w - a) * T + h), t.round(u - u / 4), s.get("whiskerColor")).append(), e.drawLine(t.round((g - a) * T + h), t.round(u * .1), t.round((g - a) * T + h), t.round(u * .9), s.get("medianColor")).append(), s.get("target") && (x = t.ceil(s.get("spotRadius")), e.drawLine(t.round((s.get("target") - a) * T + h), t.round(u / 2 - x), t.round((s.get("target") - a) * T + h), t.round(u / 2 + x), s.get("targetColor")).append(), e.drawLine(t.round((s.get("target") - a) * T + h - x), t.round(u / 2), t.round((s.get("target") - a) * T + h + x), t.round(u / 2), s.get("targetColor")).append()), e.render()
            }
        }), H = o({
            init: function(e, t, n, r) {
                this.target = e, this.id = t, this.type = n, this.args = r
            },
            append: function() {
                return this.target.appendShape(this), this
            }
        }), B = o({
            _pxregex: /(\d+)(px)?\s*$/i,
            init: function(e, t, n) {
                if (!e) return;
                this.width = e, this.height = t, this.target = n, this.lastShapeId = null, n[0] && (n = n[0]), r.data(n, "_jqs_vcanvas", this)
            },
            drawLine: function(e, t, n, r, i, s) {
                return this.drawShape([
                    [e, t],
                    [n, r]
                ], i, s)
            },
            drawShape: function(e, t, n, r) {
                return this._genShape("Shape", [e, t, n, r])
            },
            drawCircle: function(e, t, n, r, i, s) {
                return this._genShape("Circle", [e, t, n, r, i, s])
            },
            drawPieSlice: function(e, t, n, r, i, s, o) {
                return this._genShape("PieSlice", [e, t, n, r, i, s, o])
            },
            drawRect: function(e, t, n, r, i, s) {
                return this._genShape("Rect", [e, t, n, r, i, s])
            },
            getElement: function() {
                return this.canvas
            },
            getLastShapeId: function() {
                return this.lastShapeId
            },
            reset: function() {
                alert("reset not implemented")
            },
            _insert: function(e, t) {
                r(t).html(e)
            },
            _calculatePixelDims: function(e, t, n) {
                var i;
                i = this._pxregex.exec(t), i ? this.pixelHeight = i[1] : this.pixelHeight = r(n).height(), i = this._pxregex.exec(e), i ? this.pixelWidth = i[1] : this.pixelWidth = r(n).width()
            },
            _genShape: function(e, t) {
                var n = q++;
                return t.unshift(n), new H(this, n, e, t)
            },
            appendShape: function(e) {
                alert("appendShape not implemented")
            },
            replaceWithShape: function(e, t) {
                alert("replaceWithShape not implemented")
            },
            insertAfterShape: function(e, t) {
                alert("insertAfterShape not implemented")
            },
            removeShapeId: function(e) {
                alert("removeShapeId not implemented")
            },
            getShapeAt: function(e, t, n) {
                alert("getShapeAt not implemented")
            },
            render: function() {
                alert("render not implemented")
            }
        }), j = o(B, {
            init: function(t, i, s, o) {
                j._super.init.call(this, t, i, s), this.canvas = e.createElement("canvas"), s[0] && (s = s[0]), r.data(s, "_jqs_vcanvas", this), r(this.canvas).css({
                    display: "inline-block",
                    width: t,
                    height: i,
                    verticalAlign: "top"
                }), this._insert(this.canvas, s), this._calculatePixelDims(t, i, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, this.interact = o, this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = n, r(this.canvas).css({
                    width: this.pixelWidth,
                    height: this.pixelHeight
                })
            },
            _getContext: function(e, t, r) {
                var i = this.canvas.getContext("2d");
                return e !== n && (i.strokeStyle = e), i.lineWidth = r === n ? 1 : r, t !== n && (i.fillStyle = t), i
            },
            reset: function() {
                var e = this._getContext();
                e.clearRect(0, 0, this.pixelWidth, this.pixelHeight), this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = n
            },
            _drawShape: function(e, t, r, i, s) {
                var o = this._getContext(r, i, s),
                    u, a;
                o.beginPath(), o.moveTo(t[0][0] + .5, t[0][1] + .5);
                for (u = 1, a = t.length; u < a; u++) o.lineTo(t[u][0] + .5, t[u][1] + .5);
                r !== n && o.stroke(), i !== n && o.fill(), this.targetX !== n && this.targetY !== n && o.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = e)
            },
            _drawCircle: function(e, r, i, s, o, u, a) {
                var f = this._getContext(o, u, a);
                f.beginPath(), f.arc(r, i, s, 0, 2 * t.PI, !1), this.targetX !== n && this.targetY !== n && f.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = e), o !== n && f.stroke(), u !== n && f.fill()
            },
            _drawPieSlice: function(e, t, r, i, s, o, u, a) {
                var f = this._getContext(u, a);
                f.beginPath(), f.moveTo(t, r), f.arc(t, r, i, s, o, !1), f.lineTo(t, r), f.closePath(), u !== n && f.stroke(), a && f.fill(), this.targetX !== n && this.targetY !== n && f.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = e)
            },
            _drawRect: function(e, t, n, r, i, s, o) {
                return this._drawShape(e, [
                    [t, n],
                    [t + r, n],
                    [t + r, n + i],
                    [t, n + i],
                    [t, n]
                ], s, o)
            },
            appendShape: function(e) {
                return this.shapes[e.id] = e, this.shapeseq.push(e.id), this.lastShapeId = e.id, e.id
            },
            replaceWithShape: function(e, t) {
                var n = this.shapeseq,
                    r;
                this.shapes[t.id] = t;
                for (r = n.length; r--;) n[r] == e && (n[r] = t.id);
                delete this.shapes[e]
            },
            replaceWithShapes: function(e, t) {
                var n = this.shapeseq,
                    r = {},
                    i, s, o;
                for (s = e.length; s--;) r[e[s]] = !0;
                for (s = n.length; s--;) i = n[s], r[i] && (n.splice(s, 1), delete this.shapes[i], o = s);
                for (s = t.length; s--;) n.splice(o, 0, t[s].id), this.shapes[t[s].id] = t[s]
            },
            insertAfterShape: function(e, t) {
                var n = this.shapeseq,
                    r;
                for (r = n.length; r--;)
                    if (n[r] === e) {
                        n.splice(r + 1, 0, t.id), this.shapes[t.id] = t;
                        return
                    }
            },
            removeShapeId: function(e) {
                var t = this.shapeseq,
                    n;
                for (n = t.length; n--;)
                    if (t[n] === e) {
                        t.splice(n, 1);
                        break
                    }
                delete this.shapes[e]
            },
            getShapeAt: function(e, t, n) {
                return this.targetX = t, this.targetY = n, this.render(), this.currentTargetShapeId
            },
            render: function() {
                var e = this.shapeseq,
                    t = this.shapes,
                    n = e.length,
                    r = this._getContext(),
                    i, s, o;
                r.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
                for (o = 0; o < n; o++) i = e[o], s = t[i], this["_draw" + s.type].apply(this, s.args);
                this.interact || (this.shapes = {}, this.shapeseq = [])
            }
        }), F = o(B, {
            init: function(t, n, i) {
                var s;
                F._super.init.call(this, t, n, i), i[0] && (i = i[0]), r.data(i, "_jqs_vcanvas", this), this.canvas = e.createElement("span"), r(this.canvas).css({
                    display: "inline-block",
                    position: "relative",
                    overflow: "hidden",
                    width: t,
                    height: n,
                    margin: "0px",
                    padding: "0px",
                    verticalAlign: "top"
                }), this._insert(this.canvas, i), this._calculatePixelDims(t, n, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, s = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"' + ' style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>', this.canvas.insertAdjacentHTML("beforeEnd", s), this.group = r(this.canvas).children()[0], this.rendered = !1, this.prerender = ""
            },
            _drawShape: function(e, t, r, i, s) {
                var o = [],
                    u, a, f, l, h, p, d;
                for (d = 0, p = t.length; d < p; d++) o[d] = "" + t[d][0] + "," + t[d][1];
                return u = o.splice(0, 1), s = s === n ? 1 : s, a = r === n ? ' stroked="false" ' : ' strokeWeight="' + s + 'px" strokeColor="' + r + '" ', f = i === n ? ' filled="false"' : ' fillColor="' + i + '" filled="true" ', l = o[0] === o[o.length - 1] ? "x " : "", h = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + e + '" ' + a + f + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + u + " l " + o.join(", ") + " " + l + 'e">' + " </v:shape>", h
            },
            _drawCircle: function(e, t, r, i, s, o, u) {
                var a, f, l;
                return t -= i, r -= i, a = s === n ? ' stroked="false" ' : ' strokeWeight="' + u + 'px" strokeColor="' + s + '" ', f = o === n ? ' filled="false"' : ' fillColor="' + o + '" filled="true" ', l = '<v:oval  id="jqsshape' + e + '" ' + a + f + ' style="position:absolute;top:' + r + "px; left:" + t + "px; width:" + i * 2 + "px; height:" + i * 2 + 'px"></v:oval>', l
            },
            _drawPieSlice: function(e, r, i, s, o, u, a, f) {
                var l, h, p, d, v, m, g, y;
                if (o === u) return "";
                u - o === 2 * t.PI && (o = 0, u = 2 * t.PI), h = r + t.round(t.cos(o) * s), p = i + t.round(t.sin(o) * s), d = r + t.round(t.cos(u) * s), v = i + t.round(t.sin(u) * s);
                if (h === d && p === v) {
                    if (u - o < t.PI) return "";
                    h = d = r + s, p = v = i
                }
                return h === d && p === v && u - o < t.PI ? "" : (l = [r - s, i - s, r + s, i + s, h, p, d, v], m = a === n ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + a + '" ', g = f === n ? ' filled="false"' : ' fillColor="' + f + '" filled="true" ', y = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + e + '" ' + m + g + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + r + "," + i + " wa " + l.join(", ") + ' x e">' + " </v:shape>", y)
            },
            _drawRect: function(e, t, n, r, i, s, o) {
                return this._drawShape(e, [
                    [t, n],
                    [t, n + i],
                    [t + r, n + i],
                    [t + r, n],
                    [t, n]
                ], s, o)
            },
            reset: function() {
                this.group.innerHTML = ""
            },
            appendShape: function(e) {
                var t = this["_draw" + e.type].apply(this, e.args);
                return this.rendered ? this.group.insertAdjacentHTML("beforeEnd", t) : this.prerender += t, this.lastShapeId = e.id, e.id
            },
            replaceWithShape: function(e, t) {
                var n = r("#jqsshape" + e),
                    i = this["_draw" + t.type].apply(this, t.args);
                n[0].outerHTML = i
            },
            replaceWithShapes: function(e, t) {
                var n = r("#jqsshape" + e[0]),
                    i = "",
                    s = t.length,
                    o;
                for (o = 0; o < s; o++) i += this["_draw" + t[o].type].apply(this, t[o].args);
                n[0].outerHTML = i;
                for (o = 1; o < e.length; o++) r("#jqsshape" + e[o]).remove()
            },
            insertAfterShape: function(e, t) {
                var n = r("#jqsshape" + e),
                    i = this["_draw" + t.type].apply(this, t.args);
                n[0].insertAdjacentHTML("afterEnd", i)
            },
            removeShapeId: function(e) {
                var t = r("#jqsshape" + e);
                this.group.removeChild(t[0])
            },
            getShapeAt: function(e, t, n) {
                var r = e.id.substr(8);
                return r
            },
            render: function() {
                this.rendered || (this.group.innerHTML = this.prerender, this.rendered = !0)
            }
        })
    })
})(document, Math);
(function(e) {
    e.color = {};
    e.color.make = function(t, n, r, i) {
        var s = {};
        s.r = t || 0;
        s.g = n || 0;
        s.b = r || 0;
        s.a = i != null ? i : 1;
        s.add = function(e, t) {
            for (var n = 0; n < e.length; ++n) s[e.charAt(n)] += t;
            return s.normalize()
        };
        s.scale = function(e, t) {
            for (var n = 0; n < e.length; ++n) s[e.charAt(n)] *= t;
            return s.normalize()
        };
        s.toString = function() {
            if (s.a >= 1) {
                return "rgb(" + [s.r, s.g, s.b].join(",") + ")"
            } else {
                return "rgba(" + [s.r, s.g, s.b, s.a].join(",") + ")"
            }
        };
        s.normalize = function() {
            function e(e, t, n) {
                return t < e ? e : t > n ? n : t
            }
            s.r = e(0, parseInt(s.r), 255);
            s.g = e(0, parseInt(s.g), 255);
            s.b = e(0, parseInt(s.b), 255);
            s.a = e(0, s.a, 1);
            return s
        };
        s.clone = function() {
            return e.color.make(s.r, s.b, s.g, s.a)
        };
        return s.normalize()
    };
    e.color.extract = function(t, n) {
        var r;
        do {
            r = t.css(n).toLowerCase();
            if (r != "" && r != "transparent") break;
            t = t.parent()
        } while (t.length && !e.nodeName(t.get(0), "body"));
        if (r == "rgba(0, 0, 0, 0)") r = "transparent";
        return e.color.parse(r)
    };
    e.color.parse = function(n) {
        var r, i = e.color.make;
        if (r = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(n)) return i(parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10));
        if (r = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(n)) return i(parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10), parseFloat(r[4]));
        if (r = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(n)) return i(parseFloat(r[1]) * 2.55, parseFloat(r[2]) * 2.55, parseFloat(r[3]) * 2.55);
        if (r = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(n)) return i(parseFloat(r[1]) * 2.55, parseFloat(r[2]) * 2.55, parseFloat(r[3]) * 2.55, parseFloat(r[4]));
        if (r = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(n)) return i(parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16));
        if (r = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(n)) return i(parseInt(r[1] + r[1], 16), parseInt(r[2] + r[2], 16), parseInt(r[3] + r[3], 16));
        var s = e.trim(n).toLowerCase();
        if (s == "transparent") return i(255, 255, 255, 0);
        else {
            r = t[s] || [0, 0, 0];
            return i(r[0], r[1], r[2])
        }
    };
    var t = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
})(jQuery);
(function(e) {
    function n(t, n) {
        var r = n.children("." + t)[0];
        if (r == null) {
            r = document.createElement("canvas");
            r.className = t;
            e(r).css({
                direction: "ltr",
                position: "absolute",
                left: 0,
                top: 0
            }).appendTo(n);
            if (!r.getContext) {
                if (window.G_vmlCanvasManager) {
                    r = window.G_vmlCanvasManager.initElement(r)
                } else {
                    throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.")
                }
            }
        }
        this.element = r;
        var i = this.context = r.getContext("2d");
        var s = window.devicePixelRatio || 1,
            o = i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1;
        this.pixelRatio = s / o;
        this.resize(n.width(), n.height());
        this.textContainer = null;
        this.text = {};
        this._textCache = {}
    }

    function r(t, r, s, o) {
        function E(e, t) {
            t = [w].concat(t);
            for (var n = 0; n < e.length; ++n) e[n].apply(this, t)
        }

        function S() {
            var t = {
                Canvas: n
            };
            for (var r = 0; r < o.length; ++r) {
                var i = o[r];
                i.init(w, t);
                if (i.options) e.extend(true, a, i.options)
            }
        }

        function x(n) {
            e.extend(true, a, n);
            if (n && n.colors) {
                a.colors = n.colors
            }
            if (a.xaxis.color == null) a.xaxis.color = e.color.parse(a.grid.color).scale("a", .22).toString();
            if (a.yaxis.color == null) a.yaxis.color = e.color.parse(a.grid.color).scale("a", .22).toString();
            if (a.xaxis.tickColor == null) a.xaxis.tickColor = a.grid.tickColor || a.xaxis.color;
            if (a.yaxis.tickColor == null) a.yaxis.tickColor = a.grid.tickColor || a.yaxis.color;
            if (a.grid.borderColor == null) a.grid.borderColor = a.grid.color;
            if (a.grid.tickColor == null) a.grid.tickColor = e.color.parse(a.grid.color).scale("a", .22).toString();
            var r, i, s, o = t.css("font-size"),
                u = o ? +o.replace("px", "") : 13,
                f = {
                    style: t.css("font-style"),
                    size: Math.round(.8 * u),
                    variant: t.css("font-variant"),
                    weight: t.css("font-weight"),
                    family: t.css("font-family")
                };
            s = a.xaxes.length || 1;
            for (r = 0; r < s; ++r) {
                i = a.xaxes[r];
                if (i && !i.tickColor) {
                    i.tickColor = i.color
                }
                i = e.extend(true, {}, a.xaxis, i);
                a.xaxes[r] = i;
                if (i.font) {
                    i.font = e.extend({}, f, i.font);
                    if (!i.font.color) {
                        i.font.color = i.color
                    }
                    if (!i.font.lineHeight) {
                        i.font.lineHeight = Math.round(i.font.size * 1.15)
                    }
                }
            }
            s = a.yaxes.length || 1;
            for (r = 0; r < s; ++r) {
                i = a.yaxes[r];
                if (i && !i.tickColor) {
                    i.tickColor = i.color
                }
                i = e.extend(true, {}, a.yaxis, i);
                a.yaxes[r] = i;
                if (i.font) {
                    i.font = e.extend({}, f, i.font);
                    if (!i.font.color) {
                        i.font.color = i.color
                    }
                    if (!i.font.lineHeight) {
                        i.font.lineHeight = Math.round(i.font.size * 1.15)
                    }
                }
            }
            if (a.xaxis.noTicks && a.xaxis.ticks == null) a.xaxis.ticks = a.xaxis.noTicks;
            if (a.yaxis.noTicks && a.yaxis.ticks == null) a.yaxis.ticks = a.yaxis.noTicks;
            if (a.x2axis) {
                a.xaxes[1] = e.extend(true, {}, a.xaxis, a.x2axis);
                a.xaxes[1].position = "top";
                if (a.x2axis.min == null) {
                    a.xaxes[1].min = null
                }
                if (a.x2axis.max == null) {
                    a.xaxes[1].max = null
                }
            }
            if (a.y2axis) {
                a.yaxes[1] = e.extend(true, {}, a.yaxis, a.y2axis);
                a.yaxes[1].position = "right";
                if (a.y2axis.min == null) {
                    a.yaxes[1].min = null
                }
                if (a.y2axis.max == null) {
                    a.yaxes[1].max = null
                }
            }
            if (a.grid.coloredAreas) a.grid.markings = a.grid.coloredAreas;
            if (a.grid.coloredAreasColor) a.grid.markingsColor = a.grid.coloredAreasColor;
            if (a.lines) e.extend(true, a.series.lines, a.lines);
            if (a.points) e.extend(true, a.series.points, a.points);
            if (a.bars) e.extend(true, a.series.bars, a.bars);
            if (a.shadowSize != null) a.series.shadowSize = a.shadowSize;
            if (a.highlightColor != null) a.series.highlightColor = a.highlightColor;
            for (r = 0; r < a.xaxes.length; ++r) O(d, r + 1).options = a.xaxes[r];
            for (r = 0; r < a.yaxes.length; ++r) O(v, r + 1).options = a.yaxes[r];
            for (var l in b)
                if (a.hooks[l] && a.hooks[l].length) b[l] = b[l].concat(a.hooks[l]);
            E(b.processOptions, [a])
        }

        function T(e) {
            u = N(e);
            M();
            _()
        }

        function N(t) {
            var n = [];
            for (var r = 0; r < t.length; ++r) {
                var i = e.extend(true, {}, a.series);
                if (t[r].data != null) {
                    i.data = t[r].data;
                    delete t[r].data;
                    e.extend(true, i, t[r]);
                    t[r].data = i.data
                } else i.data = t[r];
                n.push(i)
            }
            return n
        }

        function C(e, t) {
            var n = e[t + "axis"];
            if (typeof n == "object") n = n.n;
            if (typeof n != "number") n = 1;
            return n
        }

        function k() {
            return e.grep(d.concat(v), function(e) {
                return e
            })
        }

        function L(e) {
            var t = {},
                n, r;
            for (n = 0; n < d.length; ++n) {
                r = d[n];
                if (r && r.used) t["x" + r.n] = r.c2p(e.left)
            }
            for (n = 0; n < v.length; ++n) {
                r = v[n];
                if (r && r.used) t["y" + r.n] = r.c2p(e.top)
            }
            if (t.x1 !== undefined) t.x = t.x1;
            if (t.y1 !== undefined) t.y = t.y1;
            return t
        }

        function A(e) {
            var t = {},
                n, r, i;
            for (n = 0; n < d.length; ++n) {
                r = d[n];
                if (r && r.used) {
                    i = "x" + r.n;
                    if (e[i] == null && r.n == 1) i = "x";
                    if (e[i] != null) {
                        t.left = r.p2c(e[i]);
                        break
                    }
                }
            }
            for (n = 0; n < v.length; ++n) {
                r = v[n];
                if (r && r.used) {
                    i = "y" + r.n;
                    if (e[i] == null && r.n == 1) i = "y";
                    if (e[i] != null) {
                        t.top = r.p2c(e[i]);
                        break
                    }
                }
            }
            return t
        }

        function O(t, n) {
            if (!t[n - 1]) t[n - 1] = {
                n: n,
                direction: t == d ? "x" : "y",
                options: e.extend(true, {}, t == d ? a.xaxis : a.yaxis)
            };
            return t[n - 1]
        }

        function M() {
            var t = u.length,
                n = -1,
                r;
            for (r = 0; r < u.length; ++r) {
                var i = u[r].color;
                if (i != null) {
                    t--;
                    if (typeof i == "number" && i > n) {
                        n = i
                    }
                }
            }
            if (t <= n) {
                t = n + 1
            }
            var s, o = [],
                f = a.colors,
                l = f.length,
                c = 0;
            for (r = 0; r < t; r++) {
                s = e.color.parse(f[r % l] || "#666");
                if (r % l == 0 && r) {
                    if (c >= 0) {
                        if (c < .5) {
                            c = -c - .2
                        } else c = 0
                    } else c = -c
                }
                o[r] = s.scale("rgb", 1 + c)
            }
            var h = 0,
                p;
            for (r = 0; r < u.length; ++r) {
                p = u[r];
                if (p.color == null) {
                    p.color = o[h].toString();
                    ++h
                } else if (typeof p.color == "number") p.color = o[p.color].toString();
                if (p.lines.show == null) {
                    var m, g = true;
                    for (m in p)
                        if (p[m] && p[m].show) {
                            g = false;
                            break
                        }
                    if (g) p.lines.show = true
                }
                if (p.lines.zero == null) {
                    p.lines.zero = !!p.lines.fill
                }
                p.xaxis = O(d, C(p, "x"));
                p.yaxis = O(v, C(p, "y"))
            }
        }

        function _() {
            function x(e, t, n) {
                if (t < e.datamin && t != -r) e.datamin = t;
                if (n > e.datamax && n != r) e.datamax = n
            }
            var t = Number.POSITIVE_INFINITY,
                n = Number.NEGATIVE_INFINITY,
                r = Number.MAX_VALUE,
                i, s, o, a, f, l, c, h, p, d, v, m, g, y, w, S;
            e.each(k(), function(e, r) {
                r.datamin = t;
                r.datamax = n;
                r.used = false
            });
            for (i = 0; i < u.length; ++i) {
                l = u[i];
                l.datapoints = {
                    points: []
                };
                E(b.processRawData, [l, l.data, l.datapoints])
            }
            for (i = 0; i < u.length; ++i) {
                l = u[i];
                w = l.data;
                S = l.datapoints.format;
                if (!S) {
                    S = [];
                    S.push({
                        x: true,
                        number: true,
                        required: true
                    });
                    S.push({
                        y: true,
                        number: true,
                        required: true
                    });
                    if (l.bars.show || l.lines.show && l.lines.fill) {
                        var T = !!(l.bars.show && l.bars.zero || l.lines.show && l.lines.zero);
                        S.push({
                            y: true,
                            number: true,
                            required: false,
                            defaultValue: 0,
                            autoscale: T
                        });
                        if (l.bars.horizontal) {
                            delete S[S.length - 1].y;
                            S[S.length - 1].x = true
                        }
                    }
                    l.datapoints.format = S
                }
                if (l.datapoints.pointsize != null) continue;
                l.datapoints.pointsize = S.length;
                h = l.datapoints.pointsize;
                c = l.datapoints.points;
                var N = l.lines.show && l.lines.steps;
                l.xaxis.used = l.yaxis.used = true;
                for (s = o = 0; s < w.length; ++s, o += h) {
                    y = w[s];
                    var C = y == null;
                    if (!C) {
                        for (a = 0; a < h; ++a) {
                            m = y[a];
                            g = S[a];
                            if (g) {
                                if (g.number && m != null) {
                                    m = +m;
                                    if (isNaN(m)) m = null;
                                    else if (m == Infinity) m = r;
                                    else if (m == -Infinity) m = -r
                                }
                                if (m == null) {
                                    if (g.required) C = true;
                                    if (g.defaultValue != null) m = g.defaultValue
                                }
                            }
                            c[o + a] = m
                        }
                    }
                    if (C) {
                        for (a = 0; a < h; ++a) {
                            m = c[o + a];
                            if (m != null) {
                                g = S[a];
                                if (g.autoscale !== false) {
                                    if (g.x) {
                                        x(l.xaxis, m, m)
                                    }
                                    if (g.y) {
                                        x(l.yaxis, m, m)
                                    }
                                }
                            }
                            c[o + a] = null
                        }
                    } else {
                        if (N && o > 0 && c[o - h] != null && c[o - h] != c[o] && c[o - h + 1] != c[o + 1]) {
                            for (a = 0; a < h; ++a) c[o + h + a] = c[o + a];
                            c[o + 1] = c[o - h + 1];
                            o += h
                        }
                    }
                }
            }
            for (i = 0; i < u.length; ++i) {
                l = u[i];
                E(b.processDatapoints, [l, l.datapoints])
            }
            for (i = 0; i < u.length; ++i) {
                l = u[i];
                c = l.datapoints.points;
                h = l.datapoints.pointsize;
                S = l.datapoints.format;
                var L = t,
                    A = t,
                    O = n,
                    M = n;
                for (s = 0; s < c.length; s += h) {
                    if (c[s] == null) continue;
                    for (a = 0; a < h; ++a) {
                        m = c[s + a];
                        g = S[a];
                        if (!g || g.autoscale === false || m == r || m == -r) continue;
                        if (g.x) {
                            if (m < L) L = m;
                            if (m > O) O = m
                        }
                        if (g.y) {
                            if (m < A) A = m;
                            if (m > M) M = m
                        }
                    }
                }
                if (l.bars.show) {
                    var _;
                    switch (l.bars.align) {
                        case "left":
                            _ = 0;
                            break;
                        case "right":
                            _ = -l.bars.barWidth;
                            break;
                        default:
                            _ = -l.bars.barWidth / 2
                    }
                    if (l.bars.horizontal) {
                        A += _;
                        M += _ + l.bars.barWidth
                    } else {
                        L += _;
                        O += _ + l.bars.barWidth
                    }
                }
                x(l.xaxis, L, O);
                x(l.yaxis, A, M)
            }
            e.each(k(), function(e, r) {
                if (r.datamin == t) r.datamin = null;
                if (r.datamax == n) r.datamax = null
            })
        }

        function D() {
            t.css("padding", 0).children().filter(function() {
                return !e(this).hasClass("flot-overlay") && !e(this).hasClass("flot-base")
            }).remove();
            if (t.css("position") == "static") t.css("position", "relative");
            f = new n("flot-base", t);
            l = new n("flot-overlay", t);
            h = f.context;
            p = l.context;
            c = e(l.element).unbind();
            var r = t.data("plot");
            if (r) {
                r.shutdown();
                l.clear()
            }
            t.data("plot", w)
        }

        function P() {
            if (a.grid.hoverable) {
                c.mousemove(at);
                c.bind("mouseleave", ft)
            }
            if (a.grid.clickable) c.click(lt);
            E(b.bindEvents, [c])
        }

        function H() {
            if (ot) clearTimeout(ot);
            c.unbind("mousemove", at);
            c.unbind("mouseleave", ft);
            c.unbind("click", lt);
            E(b.shutdown, [c])
        }

        function B(e) {
            function t(e) {
                return e
            }
            var n, r, i = e.options.transform || t,
                s = e.options.inverseTransform;
            if (e.direction == "x") {
                n = e.scale = g / Math.abs(i(e.max) - i(e.min));
                r = Math.min(i(e.max), i(e.min))
            } else {
                n = e.scale = y / Math.abs(i(e.max) - i(e.min));
                n = -n;
                r = Math.max(i(e.max), i(e.min))
            }
            if (i == t) e.p2c = function(e) {
                return (e - r) * n
            };
            else e.p2c = function(e) {
                return (i(e) - r) * n
            };
            if (!s) e.c2p = function(e) {
                return r + e / n
            };
            else e.c2p = function(e) {
                return s(r + e / n)
            }
        }

        function j(e) {
            var t = e.options,
                n = e.ticks || [],
                r = t.labelWidth || 0,
                i = t.labelHeight || 0,
                s = r || (e.direction == "x" ? Math.floor(f.width / (n.length || 1)) : null),
                o = e.direction + "Axis " + e.direction + e.n + "Axis",
                u = "flot-" + e.direction + "-axis flot-" + e.direction + e.n + "-axis " + o,
                a = t.font || "flot-tick-label tickLabel";
            for (var l = 0; l < n.length; ++l) {
                var c = n[l];
                if (!c.label) continue;
                var h = f.getTextInfo(u, c.label, a, null, s);
                r = Math.max(r, h.width);
                i = Math.max(i, h.height)
            }
            e.labelWidth = t.labelWidth || r;
            e.labelHeight = t.labelHeight || i
        }

        function F(t) {
            var n = t.labelWidth,
                r = t.labelHeight,
                i = t.options.position,
                s = t.direction === "x",
                o = t.options.tickLength,
                u = a.grid.axisMargin,
                l = a.grid.labelMargin,
                c = true,
                h = true,
                p = true,
                g = false;
            e.each(s ? d : v, function(e, n) {
                if (n && (n.show || n.reserveSpace)) {
                    if (n === t) {
                        g = true
                    } else if (n.options.position === i) {
                        if (g) {
                            h = false
                        } else {
                            c = false
                        }
                    }
                    if (!g) {
                        p = false
                    }
                }
            });
            if (h) {
                u = 0
            }
            if (o == null) {
                o = p ? "full" : 5
            }
            if (!isNaN(+o)) l += +o;
            if (s) {
                r += l;
                if (i == "bottom") {
                    m.bottom += r + u;
                    t.box = {
                        top: f.height - m.bottom,
                        height: r
                    }
                } else {
                    t.box = {
                        top: m.top + u,
                        height: r
                    };
                    m.top += r + u
                }
            } else {
                n += l;
                if (i == "left") {
                    t.box = {
                        left: m.left + u,
                        width: n
                    };
                    m.left += n + u
                } else {
                    m.right += n + u;
                    t.box = {
                        left: f.width - m.right,
                        width: n
                    }
                }
            }
            t.position = i;
            t.tickLength = o;
            t.box.padding = l;
            t.innermost = c
        }

        function I(e) {
            if (e.direction == "x") {
                e.box.left = m.left - e.labelWidth / 2;
                e.box.width = f.width - m.left - m.right + e.labelWidth
            } else {
                e.box.top = m.top - e.labelHeight / 2;
                e.box.height = f.height - m.bottom - m.top + e.labelHeight
            }
        }

        function q() {
            var t = a.grid.minBorderMargin,
                n, r;
            if (t == null) {
                t = 0;
                for (r = 0; r < u.length; ++r) t = Math.max(t, 2 * (u[r].points.radius + u[r].points.lineWidth / 2))
            }
            var i = {
                left: t,
                right: t,
                top: t,
                bottom: t
            };
            e.each(k(), function(e, t) {
                if (t.reserveSpace && t.ticks && t.ticks.length) {
                    if (t.direction === "x") {
                        i.left = Math.max(i.left, t.labelWidth / 2);
                        i.right = Math.max(i.right, t.labelWidth / 2)
                    } else {
                        i.bottom = Math.max(i.bottom, t.labelHeight / 2);
                        i.top = Math.max(i.top, t.labelHeight / 2)
                    }
                }
            });
            m.left = Math.ceil(Math.max(i.left, m.left));
            m.right = Math.ceil(Math.max(i.right, m.right));
            m.top = Math.ceil(Math.max(i.top, m.top));
            m.bottom = Math.ceil(Math.max(i.bottom, m.bottom))
        }

        function R() {
            var t, n = k(),
                r = a.grid.show;
            for (var i in m) {
                var s = a.grid.margin || 0;
                m[i] = typeof s == "number" ? s : s[i] || 0
            }
            E(b.processOffset, [m]);
            for (var i in m) {
                if (typeof a.grid.borderWidth == "object") {
                    m[i] += r ? a.grid.borderWidth[i] : 0
                } else {
                    m[i] += r ? a.grid.borderWidth : 0
                }
            }
            e.each(n, function(e, t) {
                var n = t.options;
                t.show = n.show == null ? t.used : n.show;
                t.reserveSpace = n.reserveSpace == null ? t.show : n.reserveSpace;
                U(t)
            });
            if (r) {
                var o = e.grep(n, function(e) {
                    return e.show || e.reserveSpace
                });
                e.each(o, function(e, t) {
                    z(t);
                    W(t);
                    X(t, t.ticks);
                    j(t)
                });
                for (t = o.length - 1; t >= 0; --t) F(o[t]);
                q();
                e.each(o, function(e, t) {
                    I(t)
                })
            }
            g = f.width - m.left - m.right;
            y = f.height - m.bottom - m.top;
            e.each(n, function(e, t) {
                B(t)
            });
            if (r) {
                G()
            }
            it()
        }

        function U(e) {
            var t = e.options,
                n = +(t.min != null ? t.min : e.datamin),
                r = +(t.max != null ? t.max : e.datamax),
                i = r - n;
            if (i == 0) {
                var s = r == 0 ? 1 : .01;
                if (t.min == null) n -= s;
                if (t.max == null || t.min != null) r += s
            } else {
                var o = t.autoscaleMargin;
                if (o != null) {
                    if (t.min == null) {
                        n -= i * o;
                        if (n < 0 && e.datamin != null && e.datamin >= 0) n = 0
                    }
                    if (t.max == null) {
                        r += i * o;
                        if (r > 0 && e.datamax != null && e.datamax <= 0) r = 0
                    }
                }
            }
            e.min = n;
            e.max = r
        }

        function z(t) {
            var n = t.options;
            var r;
            if (typeof n.ticks == "number" && n.ticks > 0) r = n.ticks;
            else r = .3 * Math.sqrt(t.direction == "x" ? f.width : f.height);
            var s = (t.max - t.min) / r,
                o = -Math.floor(Math.log(s) / Math.LN10),
                u = n.tickDecimals;
            if (u != null && o > u) {
                o = u
            }
            var a = Math.pow(10, -o),
                l = s / a,
                c;
            if (l < 1.5) {
                c = 1
            } else if (l < 3) {
                c = 2;
                if (l > 2.25 && (u == null || o + 1 <= u)) {
                    c = 2.5;
                    ++o
                }
            } else if (l < 7.5) {
                c = 5
            } else {
                c = 10
            }
            c *= a;
            if (n.minTickSize != null && c < n.minTickSize) {
                c = n.minTickSize
            }
            t.delta = s;
            t.tickDecimals = Math.max(0, u != null ? u : o);
            t.tickSize = n.tickSize || c;
            if (n.mode == "time" && !t.tickGenerator) {
                throw new Error("Time mode requires the flot.time plugin.")
            }
            if (!t.tickGenerator) {
                t.tickGenerator = function(e) {
                    var t = [],
                        n = i(e.min, e.tickSize),
                        r = 0,
                        s = Number.NaN,
                        o;
                    do {
                        o = s;
                        s = n + r * e.tickSize;
                        t.push(s);
                        ++r
                    } while (s < e.max && s != o);
                    return t
                };
                t.tickFormatter = function(e, t) {
                    var n = t.tickDecimals ? Math.pow(10, t.tickDecimals) : 1;
                    var r = "" + Math.round(e * n) / n;
                    if (t.tickDecimals != null) {
                        var i = r.indexOf(".");
                        var s = i == -1 ? 0 : r.length - i - 1;
                        if (s < t.tickDecimals) {
                            return (s ? r : r + ".") + ("" + n).substr(1, t.tickDecimals - s)
                        }
                    }
                    return r
                }
            }
            if (e.isFunction(n.tickFormatter)) t.tickFormatter = function(e, t) {
                return "" + n.tickFormatter(e, t)
            };
            if (n.alignTicksWithAxis != null) {
                var h = (t.direction == "x" ? d : v)[n.alignTicksWithAxis - 1];
                if (h && h.used && h != t) {
                    var p = t.tickGenerator(t);
                    if (p.length > 0) {
                        if (n.min == null) t.min = Math.min(t.min, p[0]);
                        if (n.max == null && p.length > 1) t.max = Math.max(t.max, p[p.length - 1])
                    }
                    t.tickGenerator = function(e) {
                        var t = [],
                            n, r;
                        for (r = 0; r < h.ticks.length; ++r) {
                            n = (h.ticks[r].v - h.min) / (h.max - h.min);
                            n = e.min + n * (e.max - e.min);
                            t.push(n)
                        }
                        return t
                    };
                    if (!t.mode && n.tickDecimals == null) {
                        var m = Math.max(0, -Math.floor(Math.log(t.delta) / Math.LN10) + 1),
                            g = t.tickGenerator(t);
                        if (!(g.length > 1 && /\..*0$/.test((g[1] - g[0]).toFixed(m)))) t.tickDecimals = m
                    }
                }
            }
        }

        function W(t) {
            var n = t.options.ticks,
                r = [];
            if (n == null || typeof n == "number" && n > 0) r = t.tickGenerator(t);
            else if (n) {
                if (e.isFunction(n)) r = n(t);
                else r = n
            }
            var i, s;
            t.ticks = [];
            for (i = 0; i < r.length; ++i) {
                var o = null;
                var u = r[i];
                if (typeof u == "object") {
                    s = +u[0];
                    if (u.length > 1) o = u[1]
                } else s = +u;
                if (o == null) o = t.tickFormatter(s, t);
                if (!isNaN(s)) t.ticks.push({
                    v: s,
                    label: o
                })
            }
        }

        function X(e, t) {
            if (e.options.autoscaleMargin && t.length > 0) {
                if (e.options.min == null) e.min = Math.min(e.min, t[0].v);
                if (e.options.max == null && t.length > 1) e.max = Math.max(e.max, t[t.length - 1].v)
            }
        }

        function V() {
            f.clear();
            E(b.drawBackground, [h]);
            var e = a.grid;
            if (e.show && e.backgroundColor) K();
            if (e.show && !e.aboveData) {
                Q()
            }
            for (var t = 0; t < u.length; ++t) {
                E(b.drawSeries, [h, u[t]]);
                Y(u[t])
            }
            E(b.draw, [h]);
            if (e.show && e.aboveData) {
                Q()
            }
            f.render();
            ht()
        }

        function J(e, t) {
            var n, r, i, s, o = k();
            for (var u = 0; u < o.length; ++u) {
                n = o[u];
                if (n.direction == t) {
                    s = t + n.n + "axis";
                    if (!e[s] && n.n == 1) s = t + "axis";
                    if (e[s]) {
                        r = e[s].from;
                        i = e[s].to;
                        break
                    }
                }
            }
            if (!e[s]) {
                n = t == "x" ? d[0] : v[0];
                r = e[t + "1"];
                i = e[t + "2"]
            }
            if (r != null && i != null && r > i) {
                var a = r;
                r = i;
                i = a
            }
            return {
                from: r,
                to: i,
                axis: n
            }
        }

        function K() {
            h.save();
            h.translate(m.left, m.top);
            h.fillStyle = bt(a.grid.backgroundColor, y, 0, "rgba(255, 255, 255, 0)");
            h.fillRect(0, 0, g, y);
            h.restore()
        }

        function Q() {
            var t, n, r, i;
            h.save();
            h.translate(m.left, m.top);
            var s = a.grid.markings;
            if (s) {
                if (e.isFunction(s)) {
                    n = w.getAxes();
                    n.xmin = n.xaxis.min;
                    n.xmax = n.xaxis.max;
                    n.ymin = n.yaxis.min;
                    n.ymax = n.yaxis.max;
                    s = s(n)
                }
                for (t = 0; t < s.length; ++t) {
                    var o = s[t],
                        u = J(o, "x"),
                        f = J(o, "y");
                    if (u.from == null) u.from = u.axis.min;
                    if (u.to == null) u.to = u.axis.max;
                    if (f.from == null) f.from = f.axis.min;
                    if (f.to == null) f.to = f.axis.max;
                    if (u.to < u.axis.min || u.from > u.axis.max || f.to < f.axis.min || f.from > f.axis.max) continue;
                    u.from = Math.max(u.from, u.axis.min);
                    u.to = Math.min(u.to, u.axis.max);
                    f.from = Math.max(f.from, f.axis.min);
                    f.to = Math.min(f.to, f.axis.max);
                    var l = u.from === u.to,
                        c = f.from === f.to;
                    if (l && c) {
                        continue
                    }
                    u.from = Math.floor(u.axis.p2c(u.from));
                    u.to = Math.floor(u.axis.p2c(u.to));
                    f.from = Math.floor(f.axis.p2c(f.from));
                    f.to = Math.floor(f.axis.p2c(f.to));
                    if (l || c) {
                        var p = o.lineWidth || a.grid.markingsLineWidth,
                            d = p % 2 ? .5 : 0;
                        h.beginPath();
                        h.strokeStyle = o.color || a.grid.markingsColor;
                        h.lineWidth = p;
                        if (l) {
                            h.moveTo(u.to + d, f.from);
                            h.lineTo(u.to + d, f.to)
                        } else {
                            h.moveTo(u.from, f.to + d);
                            h.lineTo(u.to, f.to + d)
                        }
                        h.stroke()
                    } else {
                        h.fillStyle = o.color || a.grid.markingsColor;
                        h.fillRect(u.from, f.to, u.to - u.from, f.from - f.to)
                    }
                }
            }
            n = k();
            r = a.grid.borderWidth;
            for (var v = 0; v < n.length; ++v) {
                var b = n[v],
                    E = b.box,
                    S = b.tickLength,
                    x, T, N, C;
                if (!b.show || b.ticks.length == 0) continue;
                h.lineWidth = 1;
                if (b.direction == "x") {
                    x = 0;
                    if (S == "full") T = b.position == "top" ? 0 : y;
                    else T = E.top - m.top + (b.position == "top" ? E.height : 0)
                } else {
                    T = 0;
                    if (S == "full") x = b.position == "left" ? 0 : g;
                    else x = E.left - m.left + (b.position == "left" ? E.width : 0)
                }
                if (!b.innermost) {
                    h.strokeStyle = b.options.color;
                    h.beginPath();
                    N = C = 0;
                    if (b.direction == "x") N = g + 1;
                    else C = y + 1;
                    if (h.lineWidth == 1) {
                        if (b.direction == "x") {
                            T = Math.floor(T) + .5
                        } else {
                            x = Math.floor(x) + .5
                        }
                    }
                    h.moveTo(x, T);
                    h.lineTo(x + N, T + C);
                    h.stroke()
                }
                h.strokeStyle = b.options.tickColor;
                h.beginPath();
                for (t = 0; t < b.ticks.length; ++t) {
                    var L = b.ticks[t].v;
                    N = C = 0;
                    if (isNaN(L) || L < b.min || L > b.max || S == "full" && (typeof r == "object" && r[b.position] > 0 || r > 0) && (L == b.min || L == b.max)) continue;
                    if (b.direction == "x") {
                        x = b.p2c(L);
                        C = S == "full" ? -y : S;
                        if (b.position == "top") C = -C
                    } else {
                        T = b.p2c(L);
                        N = S == "full" ? -g : S;
                        if (b.position == "left") N = -N
                    }
                    if (h.lineWidth == 1) {
                        if (b.direction == "x") x = Math.floor(x) + .5;
                        else T = Math.floor(T) + .5
                    }
                    h.moveTo(x, T);
                    h.lineTo(x + N, T + C)
                }
                h.stroke()
            }
            if (r) {
                i = a.grid.borderColor;
                if (typeof r == "object" || typeof i == "object") {
                    if (typeof r !== "object") {
                        r = {
                            top: r,
                            right: r,
                            bottom: r,
                            left: r
                        }
                    }
                    if (typeof i !== "object") {
                        i = {
                            top: i,
                            right: i,
                            bottom: i,
                            left: i
                        }
                    }
                    if (r.top > 0) {
                        h.strokeStyle = i.top;
                        h.lineWidth = r.top;
                        h.beginPath();
                        h.moveTo(0 - r.left, 0 - r.top / 2);
                        h.lineTo(g, 0 - r.top / 2);
                        h.stroke()
                    }
                    if (r.right > 0) {
                        h.strokeStyle = i.right;
                        h.lineWidth = r.right;
                        h.beginPath();
                        h.moveTo(g + r.right / 2, 0 - r.top);
                        h.lineTo(g + r.right / 2, y);
                        h.stroke()
                    }
                    if (r.bottom > 0) {
                        h.strokeStyle = i.bottom;
                        h.lineWidth = r.bottom;
                        h.beginPath();
                        h.moveTo(g + r.right, y + r.bottom / 2);
                        h.lineTo(0, y + r.bottom / 2);
                        h.stroke()
                    }
                    if (r.left > 0) {
                        h.strokeStyle = i.left;
                        h.lineWidth = r.left;
                        h.beginPath();
                        h.moveTo(0 - r.left / 2, y + r.bottom);
                        h.lineTo(0 - r.left / 2, 0);
                        h.stroke()
                    }
                } else {
                    h.lineWidth = r;
                    h.strokeStyle = a.grid.borderColor;
                    h.strokeRect(-r / 2, -r / 2, g + r, y + r)
                }
            }
            h.restore()
        }

        function G() {
            e.each(k(), function(e, t) {
                var n = t.box,
                    r = t.direction + "Axis " + t.direction + t.n + "Axis",
                    i = "flot-" + t.direction + "-axis flot-" + t.direction + t.n + "-axis " + r,
                    s = t.options.font || "flot-tick-label tickLabel",
                    o, u, a, l, c;
                f.removeText(i);
                if (!t.show || t.ticks.length == 0) return;
                for (var h = 0; h < t.ticks.length; ++h) {
                    o = t.ticks[h];
                    if (!o.label || o.v < t.min || o.v > t.max) continue;
                    if (t.direction == "x") {
                        l = "center";
                        u = m.left + t.p2c(o.v);
                        if (t.position == "bottom") {
                            a = n.top + n.padding
                        } else {
                            a = n.top + n.height - n.padding;
                            c = "bottom"
                        }
                    } else {
                        c = "middle";
                        a = m.top + t.p2c(o.v);
                        if (t.position == "left") {
                            u = n.left + n.width - n.padding;
                            l = "right"
                        } else {
                            u = n.left + n.padding
                        }
                    }
                    f.addText(i, u, a, o.label, s, null, null, l, c)
                }
            })
        }

        function Y(e) {
            if (e.lines.show) Z(e);
            if (e.bars.show) nt(e);
            if (e.points.show) et(e)
        }

        function Z(e) {
            function t(e, t, n, r, i) {
                var s = e.points,
                    o = e.pointsize,
                    u = null,
                    a = null;
                h.beginPath();
                for (var f = o; f < s.length; f += o) {
                    var l = s[f - o],
                        c = s[f - o + 1],
                        p = s[f],
                        d = s[f + 1];
                    if (l == null || p == null) continue;
                    if (c <= d && c < i.min) {
                        if (d < i.min) continue;
                        l = (i.min - c) / (d - c) * (p - l) + l;
                        c = i.min
                    } else if (d <= c && d < i.min) {
                        if (c < i.min) continue;
                        p = (i.min - c) / (d - c) * (p - l) + l;
                        d = i.min
                    }
                    if (c >= d && c > i.max) {
                        if (d > i.max) continue;
                        l = (i.max - c) / (d - c) * (p - l) + l;
                        c = i.max
                    } else if (d >= c && d > i.max) {
                        if (c > i.max) continue;
                        p = (i.max - c) / (d - c) * (p - l) + l;
                        d = i.max
                    }
                    if (l <= p && l < r.min) {
                        if (p < r.min) continue;
                        c = (r.min - l) / (p - l) * (d - c) + c;
                        l = r.min
                    } else if (p <= l && p < r.min) {
                        if (l < r.min) continue;
                        d = (r.min - l) / (p - l) * (d - c) + c;
                        p = r.min
                    }
                    if (l >= p && l > r.max) {
                        if (p > r.max) continue;
                        c = (r.max - l) / (p - l) * (d - c) + c;
                        l = r.max
                    } else if (p >= l && p > r.max) {
                        if (l > r.max) continue;
                        d = (r.max - l) / (p - l) * (d - c) + c;
                        p = r.max
                    }
                    if (l != u || c != a) h.moveTo(r.p2c(l) + t, i.p2c(c) + n);
                    u = p;
                    a = d;
                    h.lineTo(r.p2c(p) + t, i.p2c(d) + n)
                }
                h.stroke()
            }

            function n(e, t, n) {
                var r = e.points,
                    i = e.pointsize,
                    s = Math.min(Math.max(0, n.min), n.max),
                    o = 0,
                    u, a = false,
                    f = 1,
                    l = 0,
                    c = 0;
                while (true) {
                    if (i > 0 && o > r.length + i) break;
                    o += i;
                    var p = r[o - i],
                        d = r[o - i + f],
                        v = r[o],
                        m = r[o + f];
                    if (a) {
                        if (i > 0 && p != null && v == null) {
                            c = o;
                            i = -i;
                            f = 2;
                            continue
                        }
                        if (i < 0 && o == l + i) {
                            h.fill();
                            a = false;
                            i = -i;
                            f = 1;
                            o = l = c + i;
                            continue
                        }
                    }
                    if (p == null || v == null) continue;
                    if (p <= v && p < t.min) {
                        if (v < t.min) continue;
                        d = (t.min - p) / (v - p) * (m - d) + d;
                        p = t.min
                    } else if (v <= p && v < t.min) {
                        if (p < t.min) continue;
                        m = (t.min - p) / (v - p) * (m - d) + d;
                        v = t.min
                    }
                    if (p >= v && p > t.max) {
                        if (v > t.max) continue;
                        d = (t.max - p) / (v - p) * (m - d) + d;
                        p = t.max
                    } else if (v >= p && v > t.max) {
                        if (p > t.max) continue;
                        m = (t.max - p) / (v - p) * (m - d) + d;
                        v = t.max
                    }
                    if (!a) {
                        h.beginPath();
                        h.moveTo(t.p2c(p), n.p2c(s));
                        a = true
                    }
                    if (d >= n.max && m >= n.max) {
                        h.lineTo(t.p2c(p), n.p2c(n.max));
                        h.lineTo(t.p2c(v), n.p2c(n.max));
                        continue
                    } else if (d <= n.min && m <= n.min) {
                        h.lineTo(t.p2c(p), n.p2c(n.min));
                        h.lineTo(t.p2c(v), n.p2c(n.min));
                        continue
                    }
                    var g = p,
                        y = v;
                    if (d <= m && d < n.min && m >= n.min) {
                        p = (n.min - d) / (m - d) * (v - p) + p;
                        d = n.min
                    } else if (m <= d && m < n.min && d >= n.min) {
                        v = (n.min - d) / (m - d) * (v - p) + p;
                        m = n.min
                    }
                    if (d >= m && d > n.max && m <= n.max) {
                        p = (n.max - d) / (m - d) * (v - p) + p;
                        d = n.max
                    } else if (m >= d && m > n.max && d <= n.max) {
                        v = (n.max - d) / (m - d) * (v - p) + p;
                        m = n.max
                    }
                    if (p != g) {
                        h.lineTo(t.p2c(g), n.p2c(d))
                    }
                    h.lineTo(t.p2c(p), n.p2c(d));
                    h.lineTo(t.p2c(v), n.p2c(m));
                    if (v != y) {
                        h.lineTo(t.p2c(v), n.p2c(m));
                        h.lineTo(t.p2c(y), n.p2c(m))
                    }
                }
            }
            h.save();
            h.translate(m.left, m.top);
            h.lineJoin = "round";
            var r = e.lines.lineWidth,
                i = e.shadowSize;
            if (r > 0 && i > 0) {
                h.lineWidth = i;
                h.strokeStyle = "rgba(0,0,0,0.1)";
                var s = Math.PI / 18;
                t(e.datapoints, Math.sin(s) * (r / 2 + i / 2), Math.cos(s) * (r / 2 + i / 2), e.xaxis, e.yaxis);
                h.lineWidth = i / 2;
                t(e.datapoints, Math.sin(s) * (r / 2 + i / 4), Math.cos(s) * (r / 2 + i / 4), e.xaxis, e.yaxis)
            }
            h.lineWidth = r;
            h.strokeStyle = e.color;
            var o = rt(e.lines, e.color, 0, y);
            if (o) {
                h.fillStyle = o;
                n(e.datapoints, e.xaxis, e.yaxis)
            }
            if (r > 0) t(e.datapoints, 0, 0, e.xaxis, e.yaxis);
            h.restore()
        }

        function et(e) {
            function t(e, t, n, r, i, s, o, u) {
                var a = e.points,
                    f = e.pointsize;
                for (var l = 0; l < a.length; l += f) {
                    var c = a[l],
                        p = a[l + 1];
                    if (c == null || c < s.min || c > s.max || p < o.min || p > o.max) continue;
                    h.beginPath();
                    c = s.p2c(c);
                    p = o.p2c(p) + r;
                    if (u == "circle") h.arc(c, p, t, 0, i ? Math.PI : Math.PI * 2, false);
                    else u(h, c, p, t, i);
                    h.closePath();
                    if (n) {
                        h.fillStyle = n;
                        h.fill()
                    }
                    h.stroke()
                }
            }
            h.save();
            h.translate(m.left, m.top);
            var n = e.points.lineWidth,
                r = e.shadowSize,
                i = e.points.radius,
                s = e.points.symbol;
            if (n == 0) n = 1e-4;
            if (n > 0 && r > 0) {
                var o = r / 2;
                h.lineWidth = o;
                h.strokeStyle = "rgba(0,0,0,0.1)";
                t(e.datapoints, i, null, o + o / 2, true, e.xaxis, e.yaxis, s);
                h.strokeStyle = "rgba(0,0,0,0.2)";
                t(e.datapoints, i, null, o / 2, true, e.xaxis, e.yaxis, s)
            }
            h.lineWidth = n;
            h.strokeStyle = e.color;
            t(e.datapoints, i, rt(e.points, e.color), 0, false, e.xaxis, e.yaxis, s);
            h.restore()
        }

        function tt(e, t, n, r, i, s, o, u, a, f, l) {
            var c, h, p, d, v, m, g, y, b;
            if (f) {
                y = m = g = true;
                v = false;
                c = n;
                h = e;
                d = t + r;
                p = t + i;
                if (h < c) {
                    b = h;
                    h = c;
                    c = b;
                    v = true;
                    m = false
                }
            } else {
                v = m = g = true;
                y = false;
                c = e + r;
                h = e + i;
                p = n;
                d = t;
                if (d < p) {
                    b = d;
                    d = p;
                    p = b;
                    y = true;
                    g = false
                }
            }
            if (h < o.min || c > o.max || d < u.min || p > u.max) return;
            if (c < o.min) {
                c = o.min;
                v = false
            }
            if (h > o.max) {
                h = o.max;
                m = false
            }
            if (p < u.min) {
                p = u.min;
                y = false
            }
            if (d > u.max) {
                d = u.max;
                g = false
            }
            c = o.p2c(c);
            p = u.p2c(p);
            h = o.p2c(h);
            d = u.p2c(d);
            if (s) {
                a.fillStyle = s(p, d);
                a.fillRect(c, d, h - c, p - d)
            }
            if (l > 0 && (v || m || g || y)) {
                a.beginPath();
                a.moveTo(c, p);
                if (v) a.lineTo(c, d);
                else a.moveTo(c, d);
                if (g) a.lineTo(h, d);
                else a.moveTo(h, d);
                if (m) a.lineTo(h, p);
                else a.moveTo(h, p);
                if (y) a.lineTo(c, p);
                else a.moveTo(c, p);
                a.stroke()
            }
        }

        function nt(e) {
            function t(t, n, r, i, s, o) {
                var u = t.points,
                    a = t.pointsize;
                for (var f = 0; f < u.length; f += a) {
                    if (u[f] == null) continue;
                    tt(u[f], u[f + 1], u[f + 2], n, r, i, s, o, h, e.bars.horizontal, e.bars.lineWidth)
                }
            }
            h.save();
            h.translate(m.left, m.top);
            h.lineWidth = e.bars.lineWidth;
            h.strokeStyle = e.color;
            var n;
            switch (e.bars.align) {
                case "left":
                    n = 0;
                    break;
                case "right":
                    n = -e.bars.barWidth;
                    break;
                default:
                    n = -e.bars.barWidth / 2
            }
            var r = e.bars.fill ? function(t, n) {
                return rt(e.bars, e.color, t, n)
            } : null;
            t(e.datapoints, n, n + e.bars.barWidth, r, e.xaxis, e.yaxis);
            h.restore()
        }

        function rt(t, n, r, i) {
            var s = t.fill;
            if (!s) return null;
            if (t.fillColor) return bt(t.fillColor, r, i, n);
            var o = e.color.parse(n);
            o.a = typeof s == "number" ? s : .4;
            o.normalize();
            return o.toString()
        }

        function it() {
            if (a.legend.container != null) {
                e(a.legend.container).html("")
            } else {
                t.find(".legend").remove()
            }
            if (!a.legend.show) {
                return
            }
            var n = [],
                r = [],
                i = false,
                s = a.legend.labelFormatter,
                o, f;
            for (var l = 0; l < u.length; ++l) {
                o = u[l];
                if (o.label) {
                    f = s ? s(o.label, o) : o.label;
                    if (f) {
                        r.push({
                            label: f,
                            color: o.color
                        })
                    }
                }
            }
            if (a.legend.sorted) {
                if (e.isFunction(a.legend.sorted)) {
                    r.sort(a.legend.sorted)
                } else if (a.legend.sorted == "reverse") {
                    r.reverse()
                } else {
                    var c = a.legend.sorted != "descending";
                    r.sort(function(e, t) {
                        return e.label == t.label ? 0 : e.label < t.label != c ? 1 : -1
                    })
                }
            }
            for (var l = 0; l < r.length; ++l) {
                var h = r[l];
                if (l % a.legend.noColumns == 0) {
                    if (i) n.push("</tr>");
                    n.push("<tr>");
                    i = true
                }
                n.push('<td class="legendColorBox"><div style="border:1px solid ' + a.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + h.color + ';overflow:hidden"></div></div></td>' + '<td class="legendLabel">' + h.label + "</td>")
            }
            if (i) n.push("</tr>");
            if (n.length == 0) return;
            var p = '<table style="font-size:smaller;color:' + a.grid.color + '">' + n.join("") + "</table>";
            if (a.legend.container != null) e(a.legend.container).html(p);
            else {
                var d = "",
                    v = a.legend.position,
                    g = a.legend.margin;
                if (g[0] == null) g = [g, g];
                if (v.charAt(0) == "n") d += "top:" + (g[1] + m.top) + "px;";
                else if (v.charAt(0) == "s") d += "bottom:" + (g[1] + m.bottom) + "px;";
                if (v.charAt(1) == "e") d += "right:" + (g[0] + m.right) + "px;";
                else if (v.charAt(1) == "w") d += "left:" + (g[0] + m.left) + "px;";
                var y = e('<div class="legend">' + p.replace('style="', 'style="position:absolute;' + d + ";") + "</div>").appendTo(t);
                if (a.legend.backgroundOpacity != 0) {
                    var b = a.legend.backgroundColor;
                    if (b == null) {
                        b = a.grid.backgroundColor;
                        if (b && typeof b == "string") b = e.color.parse(b);
                        else b = e.color.extract(y, "background-color");
                        b.a = 1;
                        b = b.toString()
                    }
                    var w = y.children();
                    e('<div style="position:absolute;width:' + w.width() + "px;height:" + w.height() + "px;" + d + "background-color:" + b + ';"> </div>').prependTo(y).css("opacity", a.legend.backgroundOpacity)
                }
            }
        }

        function ut(e, t, n) {
            var r = a.grid.mouseActiveRadius,
                i = r * r + 1,
                s = null,
                o = false,
                f, l, c;
            for (f = u.length - 1; f >= 0; --f) {
                if (!n(u[f])) continue;
                var h = u[f],
                    p = h.xaxis,
                    d = h.yaxis,
                    v = h.datapoints.points,
                    m = p.c2p(e),
                    g = d.c2p(t),
                    y = r / p.scale,
                    b = r / d.scale;
                c = h.datapoints.pointsize;
                if (p.options.inverseTransform) y = Number.MAX_VALUE;
                if (d.options.inverseTransform) b = Number.MAX_VALUE;
                if (h.lines.show || h.points.show) {
                    for (l = 0; l < v.length; l += c) {
                        var w = v[l],
                            E = v[l + 1];
                        if (w == null) continue;
                        if (w - m > y || w - m < -y || E - g > b || E - g < -b) continue;
                        var S = Math.abs(p.p2c(w) - e),
                            x = Math.abs(d.p2c(E) - t),
                            T = S * S + x * x;
                        if (T < i) {
                            i = T;
                            s = [f, l / c]
                        }
                    }
                }
                if (h.bars.show && !s) {
                    var N, C;
                    switch (h.bars.align) {
                        case "left":
                            N = 0;
                            break;
                        case "right":
                            N = -h.bars.barWidth;
                            break;
                        default:
                            N = -h.bars.barWidth / 2
                    }
                    C = N + h.bars.barWidth;
                    for (l = 0; l < v.length; l += c) {
                        var w = v[l],
                            E = v[l + 1],
                            k = v[l + 2];
                        if (w == null) continue;
                        if (u[f].bars.horizontal ? m <= Math.max(k, w) && m >= Math.min(k, w) && g >= E + N && g <= E + C : m >= w + N && m <= w + C && g >= Math.min(k, E) && g <= Math.max(k, E)) s = [f, l / c]
                    }
                }
            }
            if (s) {
                f = s[0];
                l = s[1];
                c = u[f].datapoints.pointsize;
                return {
                    datapoint: u[f].datapoints.points.slice(l * c, (l + 1) * c),
                    dataIndex: l,
                    series: u[f],
                    seriesIndex: f
                }
            }
            return null
        }

        function at(e) {
            if (a.grid.hoverable) ct("plothover", e, function(e) {
                return e["hoverable"] != false
            })
        }

        function ft(e) {
            if (a.grid.hoverable) ct("plothover", e, function(e) {
                return false
            })
        }

        function lt(e) {
            ct("plotclick", e, function(e) {
                return e["clickable"] != false
            })
        }

        function ct(e, n, r) {
            var i = c.offset(),
                s = n.pageX - i.left - m.left,
                o = n.pageY - i.top - m.top,
                u = L({
                    left: s,
                    top: o
                });
            u.pageX = n.pageX;
            u.pageY = n.pageY;
            var f = ut(s, o, r);
            if (f) {
                f.pageX = parseInt(f.series.xaxis.p2c(f.datapoint[0]) + i.left + m.left, 10);
                f.pageY = parseInt(f.series.yaxis.p2c(f.datapoint[1]) + i.top + m.top, 10)
            }
            if (a.grid.autoHighlight) {
                for (var l = 0; l < st.length; ++l) {
                    var h = st[l];
                    if (h.auto == e && !(f && h.series == f.series && h.point[0] == f.datapoint[0] && h.point[1] == f.datapoint[1])) vt(h.series, h.point)
                }
                if (f) dt(f.series, f.datapoint, e)
            }
            t.trigger(e, [u, f])
        }

        function ht() {
            var e = a.interaction.redrawOverlayInterval;
            if (e == -1) {
                pt();
                return
            }
            if (!ot) ot = setTimeout(pt, e)
        }

        function pt() {
            ot = null;
            p.save();
            l.clear();
            p.translate(m.left, m.top);
            var e, t;
            for (e = 0; e < st.length; ++e) {
                t = st[e];
                if (t.series.bars.show) yt(t.series, t.point);
                else gt(t.series, t.point)
            }
            p.restore();
            E(b.drawOverlay, [p])
        }

        function dt(e, t, n) {
            if (typeof e == "number") e = u[e];
            if (typeof t == "number") {
                var r = e.datapoints.pointsize;
                t = e.datapoints.points.slice(r * t, r * (t + 1))
            }
            var i = mt(e, t);
            if (i == -1) {
                st.push({
                    series: e,
                    point: t,
                    auto: n
                });
                ht()
            } else if (!n) st[i].auto = false
        }

        function vt(e, t) {
            if (e == null && t == null) {
                st = [];
                ht();
                return
            }
            if (typeof e == "number") e = u[e];
            if (typeof t == "number") {
                var n = e.datapoints.pointsize;
                t = e.datapoints.points.slice(n * t, n * (t + 1))
            }
            var r = mt(e, t);
            if (r != -1) {
                st.splice(r, 1);
                ht()
            }
        }

        function mt(e, t) {
            for (var n = 0; n < st.length; ++n) {
                var r = st[n];
                if (r.series == e && r.point[0] == t[0] && r.point[1] == t[1]) return n
            }
            return -1
        }

        function gt(t, n) {
            var r = n[0],
                i = n[1],
                s = t.xaxis,
                o = t.yaxis,
                u = typeof t.highlightColor === "string" ? t.highlightColor : e.color.parse(t.color).scale("a", .5).toString();
            if (r < s.min || r > s.max || i < o.min || i > o.max) return;
            var a = t.points.radius + t.points.lineWidth / 2;
            p.lineWidth = a;
            p.strokeStyle = u;
            var f = 1.5 * a;
            r = s.p2c(r);
            i = o.p2c(i);
            p.beginPath();
            if (t.points.symbol == "circle") p.arc(r, i, f, 0, 2 * Math.PI, false);
            else t.points.symbol(p, r, i, f, false);
            p.closePath();
            p.stroke()
        }

        function yt(t, n) {
            var r = typeof t.highlightColor === "string" ? t.highlightColor : e.color.parse(t.color).scale("a", .5).toString(),
                i = r,
                s;
            switch (t.bars.align) {
                case "left":
                    s = 0;
                    break;
                case "right":
                    s = -t.bars.barWidth;
                    break;
                default:
                    s = -t.bars.barWidth / 2
            }
            p.lineWidth = t.bars.lineWidth;
            p.strokeStyle = r;
            tt(n[0], n[1], n[2] || 0, s, s + t.bars.barWidth, function() {
                return i
            }, t.xaxis, t.yaxis, p, t.bars.horizontal, t.bars.lineWidth)
        }

        function bt(t, n, r, i) {
            if (typeof t == "string") return t;
            else {
                var s = h.createLinearGradient(0, r, 0, n);
                for (var o = 0, u = t.colors.length; o < u; ++o) {
                    var a = t.colors[o];
                    if (typeof a != "string") {
                        var f = e.color.parse(i);
                        if (a.brightness != null) f = f.scale("rgb", a.brightness);
                        if (a.opacity != null) f.a *= a.opacity;
                        a = f.toString()
                    }
                    s.addColorStop(o / (u - 1), a)
                }
                return s
            }
        }
        var u = [],
            a = {
                colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
                legend: {
                    show: true,
                    noColumns: 1,
                    labelFormatter: null,
                    labelBoxBorderColor: "#ccc",
                    container: null,
                    position: "ne",
                    margin: 5,
                    backgroundColor: null,
                    backgroundOpacity: .85,
                    sorted: null
                },
                xaxis: {
                    show: null,
                    position: "bottom",
                    mode: null,
                    font: null,
                    color: null,
                    tickColor: null,
                    transform: null,
                    inverseTransform: null,
                    min: null,
                    max: null,
                    autoscaleMargin: null,
                    ticks: null,
                    tickFormatter: null,
                    labelWidth: null,
                    labelHeight: null,
                    reserveSpace: null,
                    tickLength: null,
                    alignTicksWithAxis: null,
                    tickDecimals: null,
                    tickSize: null,
                    minTickSize: null
                },
                yaxis: {
                    autoscaleMargin: .02,
                    position: "left"
                },
                xaxes: [],
                yaxes: [],
                series: {
                    points: {
                        show: false,
                        radius: 3,
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle"
                    },
                    lines: {
                        lineWidth: 2,
                        fill: false,
                        fillColor: null,
                        steps: false
                    },
                    bars: {
                        show: false,
                        lineWidth: 2,
                        barWidth: 1,
                        fill: true,
                        fillColor: null,
                        align: "left",
                        horizontal: false,
                        zero: true
                    },
                    shadowSize: 3,
                    highlightColor: null
                },
                grid: {
                    show: true,
                    aboveData: false,
                    color: "#545454",
                    backgroundColor: null,
                    borderColor: null,
                    tickColor: null,
                    margin: 0,
                    labelMargin: 5,
                    axisMargin: 8,
                    borderWidth: 2,
                    minBorderMargin: null,
                    markings: null,
                    markingsColor: "#f4f4f4",
                    markingsLineWidth: 2,
                    clickable: false,
                    hoverable: false,
                    autoHighlight: true,
                    mouseActiveRadius: 10
                },
                interaction: {
                    redrawOverlayInterval: 1e3 / 60
                },
                hooks: {}
            },
            f = null,
            l = null,
            c = null,
            h = null,
            p = null,
            d = [],
            v = [],
            m = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            g = 0,
            y = 0,
            b = {
                processOptions: [],
                processRawData: [],
                processDatapoints: [],
                processOffset: [],
                drawBackground: [],
                drawSeries: [],
                draw: [],
                bindEvents: [],
                drawOverlay: [],
                shutdown: []
            },
            w = this;
        w.setData = T;
        w.setupGrid = R;
        w.draw = V;
        w.getPlaceholder = function() {
            return t
        };
        w.getCanvas = function() {
            return f.element
        };
        w.getPlotOffset = function() {
            return m
        };
        w.width = function() {
            return g
        };
        w.height = function() {
            return y
        };
        w.offset = function() {
            var e = c.offset();
            e.left += m.left;
            e.top += m.top;
            return e
        };
        w.getData = function() {
            return u
        };
        w.getAxes = function() {
            var t = {},
                n;
            e.each(d.concat(v), function(e, n) {
                if (n) t[n.direction + (n.n != 1 ? n.n : "") + "axis"] = n
            });
            return t
        };
        w.getXAxes = function() {
            return d
        };
        w.getYAxes = function() {
            return v
        };
        w.c2p = L;
        w.p2c = A;
        w.getOptions = function() {
            return a
        };
        w.highlight = dt;
        w.unhighlight = vt;
        w.triggerRedrawOverlay = ht;
        w.pointOffset = function(e) {
            return {
                left: parseInt(d[C(e, "x") - 1].p2c(+e.x) + m.left, 10),
                top: parseInt(v[C(e, "y") - 1].p2c(+e.y) + m.top, 10)
            }
        };
        w.shutdown = H;
        w.destroy = function() {
            H();
            t.removeData("plot").empty();
            u = [];
            a = null;
            f = null;
            l = null;
            c = null;
            h = null;
            p = null;
            d = [];
            v = [];
            b = null;
            st = [];
            w = null
        };
        w.resize = function() {
            var e = t.width(),
                n = t.height();
            f.resize(e, n);
            l.resize(e, n)
        };
        w.hooks = b;
        S(w);
        x(s);
        D();
        T(r);
        R();
        V();
        P();
        var st = [],
            ot = null
    }

    function i(e, t) {
        return t * Math.floor(e / t)
    }
    var t = Object.prototype.hasOwnProperty;
    if (!e.fn.detach) {
        e.fn.detach = function() {
            return this.each(function() {
                if (this.parentNode) {
                    this.parentNode.removeChild(this)
                }
            })
        }
    }
    n.prototype.resize = function(e, t) {
        if (e <= 0 || t <= 0) {
            throw new Error("Invalid dimensions for plot, width = " + e + ", height = " + t)
        }
        var n = this.element,
            r = this.context,
            i = this.pixelRatio;
        if (this.width != e) {
            n.width = e * i;
            n.style.width = e + "px";
            this.width = e
        }
        if (this.height != t) {
            n.height = t * i;
            n.style.height = t + "px";
            this.height = t
        }
        r.restore();
        r.save();
        r.scale(i, i)
    };
    n.prototype.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height)
    };
    n.prototype.render = function() {
        var e = this._textCache;
        for (var n in e) {
            if (t.call(e, n)) {
                var r = this.getTextLayer(n),
                    i = e[n];
                r.hide();
                for (var s in i) {
                    if (t.call(i, s)) {
                        var o = i[s];
                        for (var u in o) {
                            if (t.call(o, u)) {
                                var a = o[u].positions;
                                for (var f = 0, l; l = a[f]; f++) {
                                    if (l.active) {
                                        if (!l.rendered) {
                                            r.append(l.element);
                                            l.rendered = true
                                        }
                                    } else {
                                        a.splice(f--, 1);
                                        if (l.rendered) {
                                            l.element.detach()
                                        }
                                    }
                                }
                                if (a.length == 0) {
                                    delete o[u]
                                }
                            }
                        }
                    }
                }
                r.show()
            }
        }
    };
    n.prototype.getTextLayer = function(t) {
        var n = this.text[t];
        if (n == null) {
            if (this.textContainer == null) {
                this.textContainer = e("<div class='flot-text'></div>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    "font-size": "smaller",
                    color: "#545454"
                }).insertAfter(this.element)
            }
            n = this.text[t] = e("<div></div>").addClass(t).css({
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }).appendTo(this.textContainer)
        }
        return n
    };
    n.prototype.getTextInfo = function(t, n, r, i, s) {
        var o, u, a, f;
        n = "" + n;
        if (typeof r === "object") {
            o = r.style + " " + r.variant + " " + r.weight + " " + r.size + "px/" + r.lineHeight + "px " + r.family
        } else {
            o = r
        }
        u = this._textCache[t];
        if (u == null) {
            u = this._textCache[t] = {}
        }
        a = u[o];
        if (a == null) {
            a = u[o] = {}
        }
        f = a[n];
        if (f == null) {
            var l = e("<div></div>").html(n).css({
                position: "absolute",
                "max-width": s,
                top: -9999
            }).appendTo(this.getTextLayer(t));
            if (typeof r === "object") {
                l.css({
                    font: o,
                    color: r.color
                })
            } else if (typeof r === "string") {
                l.addClass(r)
            }
            f = a[n] = {
                width: l.outerWidth(true),
                height: l.outerHeight(true),
                element: l,
                positions: []
            };
            l.detach()
        }
        return f
    };
    n.prototype.addText = function(e, t, n, r, i, s, o, u, a) {
        var f = this.getTextInfo(e, r, i, s, o),
            l = f.positions;
        if (u == "center") {
            t -= f.width / 2
        } else if (u == "right") {
            t -= f.width
        }
        if (a == "middle") {
            n -= f.height / 2
        } else if (a == "bottom") {
            n -= f.height
        }
        for (var c = 0, h; h = l[c]; c++) {
            if (h.x == t && h.y == n) {
                h.active = true;
                return
            }
        }
        h = {
            active: true,
            rendered: false,
            element: l.length ? f.element.clone() : f.element,
            x: t,
            y: n
        };
        l.push(h);
        h.element.css({
            top: Math.round(n),
            left: Math.round(t),
            "text-align": u
        })
    };
    n.prototype.removeText = function(e, n, r, i, s, o) {
        if (i == null) {
            var u = this._textCache[e];
            if (u != null) {
                for (var a in u) {
                    if (t.call(u, a)) {
                        var f = u[a];
                        for (var l in f) {
                            if (t.call(f, l)) {
                                var c = f[l].positions;
                                for (var h = 0, p; p = c[h]; h++) {
                                    p.active = false
                                }
                            }
                        }
                    }
                }
            }
        } else {
            var c = this.getTextInfo(e, i, s, o).positions;
            for (var h = 0, p; p = c[h]; h++) {
                if (p.x == n && p.y == r) {
                    p.active = false
                }
            }
        }
    };
    e.plot = function(t, n, i) {
        var s = new r(e(t), n, i, e.plot.plugins);
        return s
    };
    e.plot.version = "0.8.3";
    e.plot.plugins = [];
    e.fn.plot = function(t, n) {
        return this.each(function() {
            e.plot(this, t, n)
        })
    }
})(jQuery);
(function(e, t, n) {
    "$:nomunge";

    function p(n) {
        if (o === true) {
            o = n || 1
        }
        for (var u = r.length - 1; u >= 0; u--) {
            var c = e(r[u]);
            if (c[0] == t || c.is(":visible")) {
                var h = c.width(),
                    d = c.height(),
                    v = c.data(f);
                if (v && (h !== v.w || d !== v.h)) {
                    c.trigger(a, [v.w = h, v.h = d]);
                    o = n || true
                }
            } else {
                v = c.data(f);
                v.w = 0;
                v.h = 0
            }
        }
        if (s !== null) {
            if (o && (n == null || n - o < 1e3)) {
                s = t.requestAnimationFrame(p)
            } else {
                s = setTimeout(p, i[l]);
                o = false
            }
        }
    }
    var r = [],
        i = e.resize = e.extend(e.resize, {}),
        s, o = false,
        u = "setTimeout",
        a = "resize",
        f = a + "-special-event",
        l = "pendingDelay",
        c = "activeDelay",
        h = "throttleWindow";
    i[l] = 200;
    i[c] = 20;
    i[h] = true;
    e.event.special[a] = {
        setup: function() {
            if (!i[h] && this[u]) {
                return false
            }
            var t = e(this);
            r.push(this);
            t.data(f, {
                w: t.width(),
                h: t.height()
            });
            if (r.length === 1) {
                s = n;
                p()
            }
        },
        teardown: function() {
            if (!i[h] && this[u]) {
                return false
            }
            var t = e(this);
            for (var n = r.length - 1; n >= 0; n--) {
                if (r[n] == this) {
                    r.splice(n, 1);
                    break
                }
            }
            t.removeData(f);
            if (!r.length) {
                if (o) {
                    cancelAnimationFrame(s)
                } else {
                    clearTimeout(s)
                }
                s = null
            }
        },
        add: function(t) {
            function s(t, i, s) {
                var o = e(this),
                    u = o.data(f) || {};
                u.w = i !== n ? i : o.width();
                u.h = s !== n ? s : o.height();
                r.apply(this, arguments)
            }
            if (!i[h] && this[u]) {
                return false
            }
            var r;
            if (e.isFunction(t)) {
                r = t;
                return s
            } else {
                r = t.handler;
                t.handler = s
            }
        }
    };
    if (!t.requestAnimationFrame) {
        t.requestAnimationFrame = function() {
            return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e, n) {
                return t.setTimeout(function() {
                    e((new Date).getTime())
                }, i[c])
            }
        }()
    }
    if (!t.cancelAnimationFrame) {
        t.cancelAnimationFrame = function() {
            return t.webkitCancelRequestAnimationFrame || t.mozCancelRequestAnimationFrame || t.oCancelRequestAnimationFrame || t.msCancelRequestAnimationFrame || clearTimeout
        }()
    }
})(jQuery, this);
(function(e) {
    function n(e) {
        function t() {
            var t = e.getPlaceholder();
            if (t.width() == 0 || t.height() == 0) return;
            e.resize();
            e.setupGrid();
            e.draw()
        }

        function n(e, n) {
            e.getPlaceholder().resize(t)
        }

        function r(e, n) {
            e.getPlaceholder().unbind("resize", t)
        }
        e.hooks.bindEvents.push(n);
        e.hooks.shutdown.push(r)
    }
    var t = {};
    e.plot.plugins.push({
        init: n,
        options: t,
        name: "resize",
        version: "1.0"
    })
})(jQuery);
(function(e) {
    function r(r) {
        function p(t, n, r) {
            if (!l) {
                l = true;
                i = t.getCanvas();
                s = e(i).parent();
                o = t.getOptions();
                t.setData(d(t.getData()))
            }
        }

        function d(t) {
            var n = 0,
                r = 0,
                i = 0,
                s = o.series.pie.combine.color,
                u = [];
            for (var a = 0; a < t.length; ++a) {
                var f = t[a].data;
                if (e.isArray(f) && f.length == 1) {
                    f = f[0]
                }
                if (e.isArray(f)) {
                    if (!isNaN(parseFloat(f[1])) && isFinite(f[1])) {
                        f[1] = +f[1]
                    } else {
                        f[1] = 0
                    }
                } else if (!isNaN(parseFloat(f)) && isFinite(f)) {
                    f = [1, +f]
                } else {
                    f = [1, 0]
                }
                t[a].data = [f]
            }
            for (var a = 0; a < t.length; ++a) {
                n += t[a].data[0][1]
            }
            for (var a = 0; a < t.length; ++a) {
                var f = t[a].data[0][1];
                if (f / n <= o.series.pie.combine.threshold) {
                    r += f;
                    i++;
                    if (!s) {
                        s = t[a].color
                    }
                }
            }
            for (var a = 0; a < t.length; ++a) {
                var f = t[a].data[0][1];
                if (i < 2 || f / n > o.series.pie.combine.threshold) {
                    u.push(e.extend(t[a], {
                        data: [
                            [1, f]
                        ],
                        color: t[a].color,
                        label: t[a].label,
                        angle: f * Math.PI * 2 / n,
                        percent: f / (n / 100)
                    }))
                }
            }
            if (i > 1) {
                u.push({
                    data: [
                        [1, r]
                    ],
                    color: s,
                    label: o.series.pie.combine.label,
                    angle: r * Math.PI * 2 / n,
                    percent: r / (n / 100)
                })
            }
            return u
        }

        function v(r, i) {
            function y() {
                c.clearRect(0, 0, h, p);
                s.children().filter(".pieLabel, .pieLabelBackground").remove()
            }

            function b() {
                var e = o.series.pie.shadow.left;
                var t = o.series.pie.shadow.top;
                var n = 10;
                var r = o.series.pie.shadow.alpha;
                var i = o.series.pie.radius > 1 ? o.series.pie.radius : u * o.series.pie.radius;
                if (i >= h / 2 - e || i * o.series.pie.tilt >= p / 2 - t || i <= n) {
                    return
                }
                c.save();
                c.translate(e, t);
                c.globalAlpha = r;
                c.fillStyle = "#000";
                c.translate(a, f);
                c.scale(1, o.series.pie.tilt);
                for (var s = 1; s <= n; s++) {
                    c.beginPath();
                    c.arc(0, 0, i, 0, Math.PI * 2, false);
                    c.fill();
                    i -= s
                }
                c.restore()
            }

            function w() {
                function l(e, t, i) {
                    if (e <= 0 || isNaN(e)) {
                        return
                    }
                    if (i) {
                        c.fillStyle = t
                    } else {
                        c.strokeStyle = t;
                        c.lineJoin = "round"
                    }
                    c.beginPath();
                    if (Math.abs(e - Math.PI * 2) > 1e-9) {
                        c.moveTo(0, 0)
                    }
                    c.arc(0, 0, n, r, r + e / 2, false);
                    c.arc(0, 0, n, r + e / 2, r + e, false);
                    c.closePath();
                    r += e;
                    if (i) {
                        c.fill()
                    } else {
                        c.stroke()
                    }
                }

                function d() {
                    function l(t, n, i) {
                        if (t.data[0][1] == 0) {
                            return true
                        }
                        var u = o.legend.labelFormatter,
                            l, c = o.series.pie.label.formatter;
                        if (u) {
                            l = u(t.label, t)
                        } else {
                            l = t.label
                        }
                        if (c) {
                            l = c(l, t)
                        }
                        var d = (n + t.angle + n) / 2;
                        var v = a + Math.round(Math.cos(d) * r);
                        var m = f + Math.round(Math.sin(d) * r) * o.series.pie.tilt;
                        var g = "<span class='pieLabel' id='pieLabel" + i + "' style='position:absolute;top:" + m + "px;left:" + v + "px;'>" + l + "</span>";
                        s.append(g);
                        var y = s.children("#pieLabel" + i);
                        var b = m - y.height() / 2;
                        var w = v - y.width() / 2;
                        y.css("top", b);
                        y.css("left", w);
                        if (0 - b > 0 || 0 - w > 0 || p - (b + y.height()) < 0 || h - (w + y.width()) < 0) {
                            return false
                        }
                        if (o.series.pie.label.background.opacity != 0) {
                            var E = o.series.pie.label.background.color;
                            if (E == null) {
                                E = t.color
                            }
                            var S = "top:" + b + "px;left:" + w + "px;";
                            e("<div class='pieLabelBackground' style='position:absolute;width:" + y.width() + "px;height:" + y.height() + "px;" + S + "background-color:" + E + ";'></div>").css("opacity", o.series.pie.label.background.opacity).insertBefore(y)
                        }
                        return true
                    }
                    var n = t;
                    var r = o.series.pie.label.radius > 1 ? o.series.pie.label.radius : u * o.series.pie.label.radius;
                    for (var i = 0; i < v.length; ++i) {
                        if (v[i].percent >= o.series.pie.label.threshold * 100) {
                            if (!l(v[i], n, i)) {
                                return false
                            }
                        }
                        n += v[i].angle
                    }
                    return true
                }
                var t = Math.PI * o.series.pie.startAngle;
                var n = o.series.pie.radius > 1 ? o.series.pie.radius : u * o.series.pie.radius;
                c.save();
                c.translate(a, f);
                c.scale(1, o.series.pie.tilt);
                c.save();
                var r = t;
                for (var i = 0; i < v.length; ++i) {
                    v[i].startAngle = r;
                    l(v[i].angle, v[i].color, true)
                }
                c.restore();
                if (o.series.pie.stroke.width > 0) {
                    c.save();
                    c.lineWidth = o.series.pie.stroke.width;
                    r = t;
                    for (var i = 0; i < v.length; ++i) {
                        l(v[i].angle, o.series.pie.stroke.color, false)
                    }
                    c.restore()
                }
                m(c);
                c.restore();
                if (o.series.pie.label.show) {
                    return d()
                } else return true
            }
            if (!s) {
                return
            }
            var h = r.getPlaceholder().width(),
                p = r.getPlaceholder().height(),
                d = s.children().filter(".legend").children().width() || 0;
            c = i;
            l = false;
            u = Math.min(h, p / o.series.pie.tilt) / 2;
            f = p / 2 + o.series.pie.offset.top;
            a = h / 2;
            if (o.series.pie.offset.left == "auto") {
                if (o.legend.position.match("w")) {
                    a += d / 2
                } else {
                    a -= d / 2
                }
                if (a < u) {
                    a = u
                } else if (a > h - u) {
                    a = h - u
                }
            } else {
                a += o.series.pie.offset.left
            }
            var v = r.getData(),
                g = 0;
            do {
                if (g > 0) {
                    u *= n
                }
                g += 1;
                y();
                if (o.series.pie.tilt <= .8) {
                    b()
                }
            } while (!w() && g < t);
            if (g >= t) {
                y();
                s.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")
            }
            if (r.setSeries && r.insertLegend) {
                r.setSeries(v);
                r.insertLegend()
            }
        }

        function m(e) {
            if (o.series.pie.innerRadius > 0) {
                e.save();
                var t = o.series.pie.innerRadius > 1 ? o.series.pie.innerRadius : u * o.series.pie.innerRadius;
                e.globalCompositeOperation = "destination-out";
                e.beginPath();
                e.fillStyle = o.series.pie.stroke.color;
                e.arc(0, 0, t, 0, Math.PI * 2, false);
                e.fill();
                e.closePath();
                e.restore();
                e.save();
                e.beginPath();
                e.strokeStyle = o.series.pie.stroke.color;
                e.arc(0, 0, t, 0, Math.PI * 2, false);
                e.stroke();
                e.closePath();
                e.restore()
            }
        }

        function g(e, t) {
            for (var n = false, r = -1, i = e.length, s = i - 1; ++r < i; s = r)(e[r][1] <= t[1] && t[1] < e[s][1] || e[s][1] <= t[1] && t[1] < e[r][1]) && t[0] < (e[s][0] - e[r][0]) * (t[1] - e[r][1]) / (e[s][1] - e[r][1]) + e[r][0] && (n = !n);
            return n
        }

        function y(e, t) {
            var n = r.getData(),
                i = r.getOptions(),
                s = i.series.pie.radius > 1 ? i.series.pie.radius : u * i.series.pie.radius,
                o, l;
            for (var h = 0; h < n.length; ++h) {
                var p = n[h];
                if (p.pie.show) {
                    c.save();
                    c.beginPath();
                    c.moveTo(0, 0);
                    c.arc(0, 0, s, p.startAngle, p.startAngle + p.angle / 2, false);
                    c.arc(0, 0, s, p.startAngle + p.angle / 2, p.startAngle + p.angle, false);
                    c.closePath();
                    o = e - a;
                    l = t - f;
                    if (c.isPointInPath) {
                        if (c.isPointInPath(e - a, t - f)) {
                            c.restore();
                            return {
                                datapoint: [p.percent, p.data],
                                dataIndex: 0,
                                series: p,
                                seriesIndex: h
                            }
                        }
                    } else {
                        var d = s * Math.cos(p.startAngle),
                            v = s * Math.sin(p.startAngle),
                            m = s * Math.cos(p.startAngle + p.angle / 4),
                            y = s * Math.sin(p.startAngle + p.angle / 4),
                            b = s * Math.cos(p.startAngle + p.angle / 2),
                            w = s * Math.sin(p.startAngle + p.angle / 2),
                            E = s * Math.cos(p.startAngle + p.angle / 1.5),
                            S = s * Math.sin(p.startAngle + p.angle / 1.5),
                            x = s * Math.cos(p.startAngle + p.angle),
                            T = s * Math.sin(p.startAngle + p.angle),
                            N = [
                                [0, 0],
                                [d, v],
                                [m, y],
                                [b, w],
                                [E, S],
                                [x, T]
                            ],
                            C = [o, l];
                        if (g(N, C)) {
                            c.restore();
                            return {
                                datapoint: [p.percent, p.data],
                                dataIndex: 0,
                                series: p,
                                seriesIndex: h
                            }
                        }
                    }
                    c.restore()
                }
            }
            return null
        }

        function b(e) {
            E("plothover", e)
        }

        function w(e) {
            E("plotclick", e)
        }

        function E(e, t) {
            var n = r.offset();
            var i = parseInt(t.pageX - n.left);
            var u = parseInt(t.pageY - n.top);
            var a = y(i, u);
            if (o.grid.autoHighlight) {
                for (var f = 0; f < h.length; ++f) {
                    var l = h[f];
                    if (l.auto == e && !(a && l.series == a.series)) {
                        x(l.series)
                    }
                }
            }
            if (a) {
                S(a.series, e)
            }
            var c = {
                pageX: t.pageX,
                pageY: t.pageY
            };
            s.trigger(e, [c, a])
        }

        function S(e, t) {
            var n = T(e);
            if (n == -1) {
                h.push({
                    series: e,
                    auto: t
                });
                r.triggerRedrawOverlay()
            } else if (!t) {
                h[n].auto = false
            }
        }

        function x(e) {
            if (e == null) {
                h = [];
                r.triggerRedrawOverlay()
            }
            var t = T(e);
            if (t != -1) {
                h.splice(t, 1);
                r.triggerRedrawOverlay()
            }
        }

        function T(e) {
            for (var t = 0; t < h.length; ++t) {
                var n = h[t];
                if (n.series == e) return t
            }
            return -1
        }

        function N(e, t) {
            function s(e) {
                if (e.angle <= 0 || isNaN(e.angle)) {
                    return
                }
                t.fillStyle = "rgba(255, 255, 255, " + n.series.pie.highlight.opacity + ")";
                t.beginPath();
                if (Math.abs(e.angle - Math.PI * 2) > 1e-9) {
                    t.moveTo(0, 0)
                }
                t.arc(0, 0, r, e.startAngle, e.startAngle + e.angle / 2, false);
                t.arc(0, 0, r, e.startAngle + e.angle / 2, e.startAngle + e.angle, false);
                t.closePath();
                t.fill()
            }
            var n = e.getOptions();
            var r = n.series.pie.radius > 1 ? n.series.pie.radius : u * n.series.pie.radius;
            t.save();
            t.translate(a, f);
            t.scale(1, n.series.pie.tilt);
            for (var i = 0; i < h.length; ++i) {
                s(h[i].series)
            }
            m(t);
            t.restore()
        }
        var i = null,
            s = null,
            o = null,
            u = null,
            a = null,
            f = null,
            l = false,
            c = null;
        var h = [];
        r.hooks.processOptions.push(function(e, t) {
            if (t.series.pie.show) {
                t.grid.show = false;
                if (t.series.pie.label.show == "auto") {
                    if (t.legend.show) {
                        t.series.pie.label.show = false
                    } else {
                        t.series.pie.label.show = true
                    }
                }
                if (t.series.pie.radius == "auto") {
                    if (t.series.pie.label.show) {
                        t.series.pie.radius = 3 / 4
                    } else {
                        t.series.pie.radius = 1
                    }
                }
                if (t.series.pie.tilt > 1) {
                    t.series.pie.tilt = 1
                } else if (t.series.pie.tilt < 0) {
                    t.series.pie.tilt = 0
                }
            }
        });
        r.hooks.bindEvents.push(function(e, t) {
            var n = e.getOptions();
            if (n.series.pie.show) {
                if (n.grid.hoverable) {
                    t.unbind("mousemove").mousemove(b)
                }
                if (n.grid.clickable) {
                    t.unbind("click").click(w)
                }
            }
        });
        r.hooks.processDatapoints.push(function(e, t, n, r) {
            var i = e.getOptions();
            if (i.series.pie.show) {
                p(e, t, n, r)
            }
        });
        r.hooks.drawOverlay.push(function(e, t) {
            var n = e.getOptions();
            if (n.series.pie.show) {
                N(e, t)
            }
        });
        r.hooks.draw.push(function(e, t) {
            var n = e.getOptions();
            if (n.series.pie.show) {
                v(e, t)
            }
        })
    }
    var t = 10;
    var n = .95;
    var i = {
        series: {
            pie: {
                show: false,
                radius: "auto",
                innerRadius: 0,
                startAngle: 3 / 2,
                tilt: 1,
                shadow: {
                    left: 5,
                    top: 15,
                    alpha: .02
                },
                offset: {
                    top: 0,
                    left: "auto"
                },
                stroke: {
                    color: "#fff",
                    width: 1
                },
                label: {
                    show: "auto",
                    formatter: function(e, t) {
                        return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + t.color + ";'>" + e + "<br/>" + Math.round(t.percent) + "%</div>"
                    },
                    radius: 1,
                    background: {
                        color: null,
                        opacity: 0
                    },
                    threshold: 0
                },
                combine: {
                    threshold: -1,
                    color: null,
                    label: "Other"
                },
                highlight: {
                    opacity: .5
                }
            }
        }
    };
    e.plot.plugins.push({
        init: r,
        options: i,
        name: "pie",
        version: "1.1"
    })
})(jQuery);
(function(e) {
    function n(e) {
        function t(e, t) {
            var n = null;
            for (var r = 0; r < t.length; ++r) {
                if (e == t[r]) break;
                if (t[r].stack == e.stack) n = t[r]
            }
            return n
        }

        function n(e, n, r) {
            if (n.stack == null || n.stack === false) return;
            var i = t(n, e.getData());
            if (!i) return;
            var s = r.pointsize,
                o = r.points,
                u = i.datapoints.pointsize,
                a = i.datapoints.points,
                f = [],
                l, c, h, p, d, v, m = n.lines.show,
                g = n.bars.horizontal,
                y = s > 2 && (g ? r.format[2].x : r.format[2].y),
                b = m && n.lines.steps,
                w = true,
                E = g ? 1 : 0,
                S = g ? 0 : 1,
                x = 0,
                T = 0,
                N, C;
            while (true) {
                if (x >= o.length) break;
                N = f.length;
                if (o[x] == null) {
                    for (C = 0; C < s; ++C) f.push(o[x + C]);
                    x += s
                } else if (T >= a.length) {
                    if (!m) {
                        for (C = 0; C < s; ++C) f.push(o[x + C])
                    }
                    x += s
                } else if (a[T] == null) {
                    for (C = 0; C < s; ++C) f.push(null);
                    w = true;
                    T += u
                } else {
                    l = o[x + E];
                    c = o[x + S];
                    p = a[T + E];
                    d = a[T + S];
                    v = 0;
                    if (l == p) {
                        for (C = 0; C < s; ++C) f.push(o[x + C]);
                        f[N + S] += d;
                        v = d;
                        x += s;
                        T += u
                    } else if (l > p) {
                        if (m && x > 0 && o[x - s] != null) {
                            h = c + (o[x - s + S] - c) * (p - l) / (o[x - s + E] - l);
                            f.push(p);
                            f.push(h + d);
                            for (C = 2; C < s; ++C) f.push(o[x + C]);
                            v = d
                        }
                        T += u
                    } else {
                        if (w && m) {
                            x += s;
                            continue
                        }
                        for (C = 0; C < s; ++C) f.push(o[x + C]);
                        if (m && T > 0 && a[T - u] != null) v = d + (a[T - u + S] - d) * (l - p) / (a[T - u + E] - p);
                        f[N + S] += v;
                        x += s
                    }
                    w = false;
                    if (N != f.length && y) f[N + 2] += v
                }
                if (b && N != f.length && N > 0 && f[N] != null && f[N] != f[N - s] && f[N + 1] != f[N - s + 1]) {
                    for (C = 0; C < s; ++C) f[N + s + C] = f[N + C];
                    f[N + 1] = f[N - s + 1]
                }
            }
            r.points = f
        }
        e.hooks.processDatapoints.push(n)
    }
    var t = {
        series: {
            stack: null
        }
    };
    e.plot.plugins.push({
        init: n,
        options: t,
        name: "stack",
        version: "1.2"
    })
})(jQuery);
Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        if (void 0 === this || null === this) throw new TypeError('"this" is null or not defined');
        var n = this.length >>> 0;
        for (t = +t || 0, 1 / 0 === Math.abs(t) && (t = 0), 0 > t && (t += n, 0 > t && (t = 0)); n > t; t++)
            if (this[t] === e) return t;
        return -1
    }),
    function(e) {
        var t = {
                tooltip: !1,
                tooltipOpts: {
                    content: "%s | X: %x | Y: %y",
                    xDateFormat: null,
                    yDateFormat: null,
                    monthNames: null,
                    dayNames: null,
                    shifts: {
                        x: 10,
                        y: 20
                    },
                    defaultTheme: !0,
                    onHover: function() {}
                }
            },
            n = function(e) {
                this.tipPosition = {
                    x: 0,
                    y: 0
                }, this.init(e)
            };
        n.prototype.init = function(t) {
            function n(e) {
                var t = {};
                t.x = e.pageX, t.y = e.pageY, i.updateTooltipPosition(t)
            }

            function r(e, t, n) {
                var r = i.getDomElement();
                if (n) {
                    var s;
                    s = i.stringFormat(i.tooltipOptions.content, n), r.html(s), i.updateTooltipPosition({
                        x: t.pageX,
                        y: t.pageY
                    }), r.css({
                        left: i.tipPosition.x + i.tooltipOptions.shifts.x,
                        top: i.tipPosition.y + i.tooltipOptions.shifts.y
                    }).show(), "function" == typeof i.tooltipOptions.onHover && i.tooltipOptions.onHover(n, r)
                } else r.hide().html("")
            }
            var i = this,
                s = e.plot.plugins.length;
            if (this.plotPlugins = [], s)
                for (var o = 0; s > o; o++) this.plotPlugins.push(e.plot.plugins[o].name);
            t.hooks.bindEvents.push(function(t, s) {
                i.plotOptions = t.getOptions(), i.plotOptions.tooltip !== !1 && void 0 !== i.plotOptions.tooltip && (i.tooltipOptions = i.plotOptions.tooltipOpts, i.getDomElement(), e(t.getPlaceholder()).bind("plothover", r), e(s).bind("mousemove", n))
            }), t.hooks.shutdown.push(function(t, i) {
                e(t.getPlaceholder()).unbind("plothover", r), e(i).unbind("mousemove", n)
            })
        }, n.prototype.getDomElement = function() {
            var t;
            return e("#flotTip").length > 0 ? t = e("#flotTip") : (t = e("<div />").attr("id", "flotTip"), t.appendTo("body").hide().css({
                position: "absolute"
            }), this.tooltipOptions.defaultTheme && t.css({
                background: "#fff",
                "z-index": "1040",
                padding: "0.4em 0.6em",
                "border-radius": "0.5em",
                "font-size": "0.8em",
                border: "1px solid #111",
                display: "none",
                "white-space": "nowrap"
            })), t
        }, n.prototype.updateTooltipPosition = function(t) {
            var n = e("#flotTip").outerWidth() + this.tooltipOptions.shifts.x,
                r = e("#flotTip").outerHeight() + this.tooltipOptions.shifts.y;
            t.x - e(window).scrollLeft() > e(window).innerWidth() - n && (t.x -= n), t.y - e(window).scrollTop() > e(window).innerHeight() - r && (t.y -= r), this.tipPosition.x = t.x, this.tipPosition.y = t.y
        }, n.prototype.stringFormat = function(e, t) {
            var n, r, i = /%p\.{0,1}(\d{0,})/,
                s = /%s/,
                o = /%lx/,
                u = /%ly/,
                a = /%x\.{0,1}(\d{0,})/,
                f = /%y\.{0,1}(\d{0,})/,
                l = "%x",
                c = "%y";
            if (t.series.threshold !== void 0 ? (n = t.datapoint[0], r = t.datapoint[1]) : (n = t.series.data[t.dataIndex][0], r = t.series.data[t.dataIndex][1]), null === t.series.label && t.series.originSeries && (t.series.label = t.series.originSeries.label), "function" == typeof e && (e = e(t.series.label, n, r, t)), t.series.percent !== void 0 && (e = this.adjustValPrecision(i, e, t.series.percent)), e = t.series.label !== void 0 ? e.replace(s, t.series.label) : e.replace(s, ""), e = this.hasAxisLabel("xaxis", t) ? e.replace(o, t.series.xaxis.options.axisLabel) : e.replace(o, ""), e = this.hasAxisLabel("yaxis", t) ? e.replace(u, t.series.yaxis.options.axisLabel) : e.replace(u, ""), this.isTimeMode("xaxis", t) && this.isXDateFormat(t) && (e = e.replace(a, this.timestampToDate(n, this.tooltipOptions.xDateFormat))), this.isTimeMode("yaxis", t) && this.isYDateFormat(t) && (e = e.replace(f, this.timestampToDate(r, this.tooltipOptions.yDateFormat))), "number" == typeof n && (e = this.adjustValPrecision(a, e, n)), "number" == typeof r && (e = this.adjustValPrecision(f, e, r)), t.series.xaxis.ticks !== void 0) {
                var h;
                h = this.hasRotatedXAxisTicks(t) ? "rotatedTicks" : "ticks";
                var p = t.dataIndex + t.seriesIndex;
                t.series.xaxis[h].length > p && !this.isTimeMode("xaxis", t) && (e = e.replace(a, t.series.xaxis[h][p].label))
            }
            if (t.series.yaxis.ticks !== void 0)
                for (var d in t.series.yaxis.ticks)
                    if (t.series.yaxis.ticks.hasOwnProperty(d)) {
                        var v = this.isCategoriesMode("yaxis", t) ? t.series.yaxis.ticks[d].label : t.series.yaxis.ticks[d].v;
                        v === r && (e = e.replace(f, t.series.yaxis.ticks[d].label))
                    }
            return t.series.xaxis.tickFormatter !== void 0 && (e = e.replace(l, t.series.xaxis.tickFormatter(n, t.series.xaxis).replace(/\$/g, "$$"))), t.series.yaxis.tickFormatter !== void 0 && (e = e.replace(c, t.series.yaxis.tickFormatter(r, t.series.yaxis).replace(/\$/g, "$$"))), e
        }, n.prototype.isTimeMode = function(e, t) {
            return t.series[e].options.mode !== void 0 && "time" === t.series[e].options.mode
        }, n.prototype.isXDateFormat = function() {
            return this.tooltipOptions.xDateFormat !== void 0 && null !== this.tooltipOptions.xDateFormat
        }, n.prototype.isYDateFormat = function() {
            return this.tooltipOptions.yDateFormat !== void 0 && null !== this.tooltipOptions.yDateFormat
        }, n.prototype.isCategoriesMode = function(e, t) {
            return t.series[e].options.mode !== void 0 && "categories" === t.series[e].options.mode
        }, n.prototype.timestampToDate = function(t, n) {
            var r = new Date(1 * t);
            return e.plot.formatDate(r, n, this.tooltipOptions.monthNames, this.tooltipOptions.dayNames)
        }, n.prototype.adjustValPrecision = function(e, t, n) {
            var r, i = t.match(e);
            return null !== i && "" !== RegExp.$1 && (r = RegExp.$1, n = n.toFixed(r), t = t.replace(e, n)), t
        }, n.prototype.hasAxisLabel = function(e, t) {
            return -1 !== this.plotPlugins.indexOf("axisLabels") && t.series[e].options.axisLabel !== void 0 && t.series[e].options.axisLabel.length > 0
        }, n.prototype.hasRotatedXAxisTicks = function(t) {
            return 1 === e.grep(e.plot.plugins, function(e) {
                return "tickRotor" === e.name
            }).length && t.series.xaxis.rotatedTicks !== void 0
        };
        var r = function(e) {
            new n(e)
        };
        e.plot.plugins.push({
            init: r,
            options: t,
            name: "tooltip",
            version: "0.6.7"
        })
    }(jQuery);
(function(e) {
    function n(e, t) {
        return t * Math.floor(e / t)
    }

    function r(e, t, n, r) {
        if (typeof e.strftime == "function") {
            return e.strftime(t)
        }
        var i = function(e, t) {
            e = "" + e;
            t = "" + (t == null ? "0" : t);
            return e.length == 1 ? t + e : e
        };
        var s = [];
        var o = false;
        var u = e.getHours();
        var a = u < 12;
        if (n == null) {
            n = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
        if (r == null) {
            r = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        }
        var f;
        if (u > 12) {
            f = u - 12
        } else if (u == 0) {
            f = 12
        } else {
            f = u
        }
        for (var l = 0; l < t.length; ++l) {
            var c = t.charAt(l);
            if (o) {
                switch (c) {
                    case "a":
                        c = "" + r[e.getDay()];
                        break;
                    case "b":
                        c = "" + n[e.getMonth()];
                        break;
                    case "d":
                        c = i(e.getDate());
                        break;
                    case "e":
                        c = i(e.getDate(), " ");
                        break;
                    case "h":
                    case "H":
                        c = i(u);
                        break;
                    case "I":
                        c = i(f);
                        break;
                    case "l":
                        c = i(f, " ");
                        break;
                    case "m":
                        c = i(e.getMonth() + 1);
                        break;
                    case "M":
                        c = i(e.getMinutes());
                        break;
                    case "q":
                        c = "" + (Math.floor(e.getMonth() / 3) + 1);
                        break;
                    case "S":
                        c = i(e.getSeconds());
                        break;
                    case "y":
                        c = i(e.getFullYear() % 100);
                        break;
                    case "Y":
                        c = "" + e.getFullYear();
                        break;
                    case "p":
                        c = a ? "" + "am" : "" + "pm";
                        break;
                    case "P":
                        c = a ? "" + "AM" : "" + "PM";
                        break;
                    case "w":
                        c = "" + e.getDay();
                        break
                }
                s.push(c);
                o = false
            } else {
                if (c == "%") {
                    o = true
                } else {
                    s.push(c)
                }
            }
        }
        return s.join("")
    }

    function i(e) {
        function t(e, t, n, r) {
            e[t] = function() {
                return n[r].apply(n, arguments)
            }
        }
        var n = {
            date: e
        };
        if (e.strftime != undefined) {
            t(n, "strftime", e, "strftime")
        }
        t(n, "getTime", e, "getTime");
        t(n, "setTime", e, "setTime");
        var r = ["Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds"];
        for (var i = 0; i < r.length; i++) {
            t(n, "get" + r[i], e, "getUTC" + r[i]);
            t(n, "set" + r[i], e, "setUTC" + r[i])
        }
        return n
    }

    function s(e, t) {
        if (t.timezone == "browser") {
            return new Date(e)
        } else if (!t.timezone || t.timezone == "utc") {
            return i(new Date(e))
        } else if (typeof timezoneJS != "undefined" && typeof timezoneJS.Date != "undefined") {
            var n = new timezoneJS.Date;
            n.setTimezone(t.timezone);
            n.setTime(e);
            return n
        } else {
            return i(new Date(e))
        }
    }

    function l(t) {
        t.hooks.processOptions.push(function(t, i) {
            e.each(t.getAxes(), function(e, t) {
                var i = t.options;
                if (i.mode == "time") {
                    t.tickGenerator = function(e) {
                        var t = [];
                        var r = s(e.min, i);
                        var u = 0;
                        var l = i.tickSize && i.tickSize[1] === "quarter" || i.minTickSize && i.minTickSize[1] === "quarter" ? f : a;
                        if (i.minTickSize != null) {
                            if (typeof i.tickSize == "number") {
                                u = i.tickSize
                            } else {
                                u = i.minTickSize[0] * o[i.minTickSize[1]]
                            }
                        }
                        for (var c = 0; c < l.length - 1; ++c) {
                            if (e.delta < (l[c][0] * o[l[c][1]] + l[c + 1][0] * o[l[c + 1][1]]) / 2 && l[c][0] * o[l[c][1]] >= u) {
                                break
                            }
                        }
                        var h = l[c][0];
                        var p = l[c][1];
                        if (p == "year") {
                            if (i.minTickSize != null && i.minTickSize[1] == "year") {
                                h = Math.floor(i.minTickSize[0])
                            } else {
                                var d = Math.pow(10, Math.floor(Math.log(e.delta / o.year) / Math.LN10));
                                var v = e.delta / o.year / d;
                                if (v < 1.5) {
                                    h = 1
                                } else if (v < 3) {
                                    h = 2
                                } else if (v < 7.5) {
                                    h = 5
                                } else {
                                    h = 10
                                }
                                h *= d
                            }
                            if (h < 1) {
                                h = 1
                            }
                        }
                        e.tickSize = i.tickSize || [h, p];
                        var m = e.tickSize[0];
                        p = e.tickSize[1];
                        var g = m * o[p];
                        if (p == "second") {
                            r.setSeconds(n(r.getSeconds(), m))
                        } else if (p == "minute") {
                            r.setMinutes(n(r.getMinutes(), m))
                        } else if (p == "hour") {
                            r.setHours(n(r.getHours(), m))
                        } else if (p == "month") {
                            r.setMonth(n(r.getMonth(), m))
                        } else if (p == "quarter") {
                            r.setMonth(3 * n(r.getMonth() / 3, m))
                        } else if (p == "year") {
                            r.setFullYear(n(r.getFullYear(), m))
                        }
                        r.setMilliseconds(0);
                        if (g >= o.minute) {
                            r.setSeconds(0)
                        }
                        if (g >= o.hour) {
                            r.setMinutes(0)
                        }
                        if (g >= o.day) {
                            r.setHours(0)
                        }
                        if (g >= o.day * 4) {
                            r.setDate(1)
                        }
                        if (g >= o.month * 2) {
                            r.setMonth(n(r.getMonth(), 3))
                        }
                        if (g >= o.quarter * 2) {
                            r.setMonth(n(r.getMonth(), 6))
                        }
                        if (g >= o.year) {
                            r.setMonth(0)
                        }
                        var y = 0;
                        var b = Number.NaN;
                        var w;
                        do {
                            w = b;
                            b = r.getTime();
                            t.push(b);
                            if (p == "month" || p == "quarter") {
                                if (m < 1) {
                                    r.setDate(1);
                                    var E = r.getTime();
                                    r.setMonth(r.getMonth() + (p == "quarter" ? 3 : 1));
                                    var S = r.getTime();
                                    r.setTime(b + y * o.hour + (S - E) * m);
                                    y = r.getHours();
                                    r.setHours(0)
                                } else {
                                    r.setMonth(r.getMonth() + m * (p == "quarter" ? 3 : 1))
                                }
                            } else if (p == "year") {
                                r.setFullYear(r.getFullYear() + m)
                            } else {
                                r.setTime(b + g)
                            }
                        } while (b < e.max && b != w);
                        return t
                    };
                    t.tickFormatter = function(e, t) {
                        var n = s(e, t.options);
                        if (i.timeformat != null) {
                            return r(n, i.timeformat, i.monthNames, i.dayNames)
                        }
                        var u = t.options.tickSize && t.options.tickSize[1] == "quarter" || t.options.minTickSize && t.options.minTickSize[1] == "quarter";
                        var a = t.tickSize[0] * o[t.tickSize[1]];
                        var f = t.max - t.min;
                        var l = i.twelveHourClock ? " %p" : "";
                        var c = i.twelveHourClock ? "%I" : "%H";
                        var h;
                        if (a < o.minute) {
                            h = c + ":%M:%S" + l
                        } else if (a < o.day) {
                            if (f < 2 * o.day) {
                                h = c + ":%M" + l
                            } else {
                                h = "%b %d " + c + ":%M" + l
                            }
                        } else if (a < o.month) {
                            h = "%b %d"
                        } else if (u && a < o.quarter || !u && a < o.year) {
                            if (f < o.year) {
                                h = "%b"
                            } else {
                                h = "%b %Y"
                            }
                        } else if (u && a < o.year) {
                            if (f < o.year) {
                                h = "Q%q"
                            } else {
                                h = "Q%q %Y"
                            }
                        } else {
                            h = "%Y"
                        }
                        var p = r(n, h, i.monthNames, i.dayNames);
                        return p
                    }
                }
            })
        })
    }
    var t = {
        xaxis: {
            timezone: null,
            timeformat: null,
            twelveHourClock: false,
            monthNames: null
        }
    };
    var o = {
        second: 1e3,
        minute: 60 * 1e3,
        hour: 60 * 60 * 1e3,
        day: 24 * 60 * 60 * 1e3,
        month: 30 * 24 * 60 * 60 * 1e3,
        quarter: 3 * 30 * 24 * 60 * 60 * 1e3,
        year: 365.2425 * 24 * 60 * 60 * 1e3
    };
    var u = [
        [1, "second"],
        [2, "second"],
        [5, "second"],
        [10, "second"],
        [30, "second"],
        [1, "minute"],
        [2, "minute"],
        [5, "minute"],
        [10, "minute"],
        [30, "minute"],
        [1, "hour"],
        [2, "hour"],
        [4, "hour"],
        [8, "hour"],
        [12, "hour"],
        [1, "day"],
        [2, "day"],
        [3, "day"],
        [.25, "month"],
        [.5, "month"],
        [1, "month"],
        [2, "month"]
    ];
    var a = u.concat([
        [3, "month"],
        [6, "month"],
        [1, "year"]
    ]);
    var f = u.concat([
        [1, "quarter"],
        [2, "quarter"],
        [1, "year"]
    ]);
    e.plot.plugins.push({
        init: l,
        options: t,
        name: "time",
        version: "1.0"
    });
    e.plot.formatDate = r;
    e.plot.dateGenerator = s
})(jQuery);
! function() {
    var e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y = {}.hasOwnProperty,
        b = function(e, t) {
            function r() {
                this.constructor = e
            }
            for (var n in t) {
                if (y.call(t, n)) e[n] = t[n]
            }
            r.prototype = t.prototype;
            e.prototype = new r;
            e.__super__ = t.prototype;
            return e
        };
    ! function() {
        var e, t, n, r, i, s, o;
        i = ["ms", "moz", "webkit", "o"];
        for (s = 0, o = i.length; s < o; s++) {
            r = i[s];
            if (window.requestAnimationFrame) {
                break
            }
            window.requestAnimationFrame = window[r + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[r + "CancelAnimationFrame"] || window[r + "CancelRequestAnimationFrame"]
        }
        e = null;
        n = 0;
        t = {};
        if (!requestAnimationFrame) {
            window.requestAnimationFrame = function(e, t) {
                var n, r, i, s;
                n = (new Date).getTime();
                s = Math.max(0, 16 - (n - i));
                r = window.setTimeout(function() {
                    return e(n + s)
                }, s);
                i = n + s;
                return r
            };
            return window.cancelAnimationFrame = function(e) {
                return clearTimeout(e)
            }
        } else if (!window.cancelAnimationFrame) {
            e = window.requestAnimationFrame;
            window.requestAnimationFrame = function(r, i) {
                var s;
                s = ++n;
                e(function() {
                    if (!t[s]) {
                        return r()
                    }
                }, i);
                return s
            };
            return window.cancelAnimationFrame = function(e) {
                return t[e] = true
            }
        }
    }();
    String.prototype.hashCode = function() {
        var e, t, n, r, i;
        t = 0;
        if (this.length === 0) {
            return t
        }
        for (n = r = 0, i = this.length; 0 <= i ? r < i : r > i; n = 0 <= i ? ++r : --r) {
            e = this.charCodeAt(n);
            t = (t << 5) - t + e;
            t = t & t
        }
        return t
    };
    d = function(e) {
        var t, n;
        t = Math.floor(e / 3600);
        n = Math.floor((e - t * 3600) / 60);
        e -= t * 3600 + n * 60;
        e += "";
        n += "";
        while (n.length < 2) {
            n = "0" + n
        }
        while (e.length < 2) {
            e = "0" + e
        }
        t = t ? t + ":" : "";
        return t + n + ":" + e
    };
    h = function(e) {
        return l(e.toFixed(0))
    };
    v = function(e, t) {
        var n, r;
        for (n in t) {
            if (!y.call(t, n)) continue;
            r = t[n];
            e[n] = r
        }
        return e
    };
    p = function(e, t) {
        var n, r, i;
        r = {};
        for (n in e) {
            if (!y.call(e, n)) continue;
            i = e[n];
            r[n] = i
        }
        for (n in t) {
            if (!y.call(t, n)) continue;
            i = t[n];
            r[n] = i
        }
        return r
    };
    l = function(e) {
        var t, n, r, i;
        e += "";
        n = e.split(".");
        r = n[0];
        i = "";
        if (n.length > 1) {
            i = "." + n[1]
        }
        t = /(\d+)(\d{3})/;
        while (t.test(r)) {
            r = r.replace(t, "$1" + "," + "$2")
        }
        return r + i
    };
    c = function(e) {
        if (e.charAt(0) === "#") {
            return e.substring(1, 7)
        }
        return e
    };
    f = function() {
        function e(e, t) {
            if (e == null) {
                e = true
            }
            this.clear = t != null ? t : true;
            if (e) {
                AnimationUpdater.add(this)
            }
        }
        e.prototype.animationSpeed = 32;
        e.prototype.update = function(e) {
            var t;
            if (e == null) {
                e = false
            }
            if (e || this.displayedValue !== this.value) {
                if (this.ctx && this.clear) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                }
                t = this.value - this.displayedValue;
                if (Math.abs(t / this.animationSpeed) <= .001) {
                    this.displayedValue = this.value
                } else {
                    this.displayedValue = this.displayedValue + t / this.animationSpeed
                }
                this.render();
                return true
            }
            return false
        };
        return e
    }();
    i = function(e) {
        function t() {
            m = t.__super__.constructor.apply(this, arguments);
            return m
        }
        b(t, e);
        t.prototype.displayScale = 1;
        t.prototype.setTextField = function(e) {
            return this.textField = e instanceof a ? e : new a(e)
        };
        t.prototype.setMinValue = function(e, t) {
            var n, r, i, s, o;
            this.minValue = e;
            if (t == null) {
                t = true
            }
            if (t) {
                this.displayedValue = this.minValue;
                s = this.gp || [];
                o = [];
                for (r = 0, i = s.length; r < i; r++) {
                    n = s[r];
                    o.push(n.displayedValue = this.minValue)
                }
                return o
            }
        };
        t.prototype.setOptions = function(e) {
            if (e == null) {
                e = null
            }
            this.options = p(this.options, e);
            if (this.textField) {
                this.textField.el.style.fontSize = e.fontSize + "px"
            }
            if (this.options.angle > .5) {
                this.gauge.options.angle = .5
            }
            this.configDisplayScale();
            return this
        };
        t.prototype.configDisplayScale = function() {
            var e, t, n, r, i;
            r = this.displayScale;
            if (this.options.highDpiSupport === false) {
                delete this.displayScale
            } else {
                t = window.devicePixelRatio || 1;
                e = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1;
                this.displayScale = t / e
            }
            if (this.displayScale !== r) {
                i = this.canvas.G__width || this.canvas.width;
                n = this.canvas.G__height || this.canvas.height;
                this.canvas.width = i * this.displayScale;
                this.canvas.height = n * this.displayScale;
                this.canvas.style.width = "" + i + "px";
                this.canvas.style.height = "" + n + "px";
                this.canvas.G__width = i;
                this.canvas.G__height = n
            }
            return this
        };
        return t
    }(f);
    a = function() {
        function e(e) {
            this.el = e
        }
        e.prototype.render = function(e) {
            return this.el.innerHTML = h(e.displayedValue)
        };
        return e
    }();
    e = function(e) {
        function t(e, t) {
            this.elem = e;
            this.text = t != null ? t : false;
            this.value = 1 * this.elem.innerHTML;
            if (this.text) {
                this.value = 0
            }
        }
        b(t, e);
        t.prototype.displayedValue = 0;
        t.prototype.value = 0;
        t.prototype.setVal = function(e) {
            return this.value = 1 * e
        };
        t.prototype.render = function() {
            var e;
            if (this.text) {
                e = d(this.displayedValue.toFixed(0))
            } else {
                e = l(h(this.displayedValue))
            }
            return this.elem.innerHTML = e
        };
        return t
    }(f);
    t = {
        create: function(t) {
            var n, r, i, s;
            r = [];
            for (i = 0, s = t.length; i < s; i++) {
                n = t[i];
                r.push(new e(n))
            }
            return r
        }
    };
    u = function(e) {
        function t(e) {
            this.gauge = e;
            this.ctx = this.gauge.ctx;
            this.canvas = this.gauge.canvas;
            t.__super__.constructor.call(this, false, false);
            this.setOptions()
        }
        b(t, e);
        t.prototype.displayedValue = 0;
        t.prototype.value = 0;
        t.prototype.options = {
            strokeWidth: .035,
            length: .1,
            color: "#000000"
        };
        t.prototype.setOptions = function(e) {
            if (e == null) {
                e = null
            }
            v(this.options, e);
            this.length = this.canvas.height * this.options.length;
            this.strokeWidth = this.canvas.height * this.options.strokeWidth;
            this.maxValue = this.gauge.maxValue;
            this.minValue = this.gauge.minValue;
            this.animationSpeed = this.gauge.animationSpeed;
            return this.options.angle = this.gauge.options.angle
        };
        t.prototype.render = function() {
            var e, t, n, r, i, s, o, u, a;
            e = this.gauge.getAngle.call(this, this.displayedValue);
            t = this.canvas.width / 2;
            n = this.canvas.height * .9;
            u = Math.round(t + this.length * Math.cos(e));
            a = Math.round(n + this.length * Math.sin(e));
            s = Math.round(t + this.strokeWidth * Math.cos(e - Math.PI / 2));
            o = Math.round(n + this.strokeWidth * Math.sin(e - Math.PI / 2));
            r = Math.round(t + this.strokeWidth * Math.cos(e + Math.PI / 2));
            i = Math.round(n + this.strokeWidth * Math.sin(e + Math.PI / 2));
            this.ctx.fillStyle = this.options.color;
            this.ctx.beginPath();
            this.ctx.arc(t, n, this.strokeWidth, 0, Math.PI * 2, true);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.moveTo(s, o);
            this.ctx.lineTo(u, a);
            this.ctx.lineTo(r, i);
            return this.ctx.fill()
        };
        return t
    }(f);
    n = function() {
        function e(e) {
            this.elem = e
        }
        e.prototype.updateValues = function(e) {
            this.value = e[0];
            this.maxValue = e[1];
            this.avgValue = e[2];
            return this.render()
        };
        e.prototype.render = function() {
            var e, t;
            if (this.textField) {
                this.textField.text(h(this.value))
            }
            if (this.maxValue === 0) {
                this.maxValue = this.avgValue * 2
            }
            t = this.value / this.maxValue * 100;
            e = this.avgValue / this.maxValue * 100;
            $(".bar-value", this.elem).css({
                width: t + "%"
            });
            return $(".typical-value", this.elem).css({
                width: e + "%"
            })
        };
        return e
    }();
    o = function(e) {
        function t(e) {
            this.canvas = e;
            t.__super__.constructor.call(this);
            this.percentColors = null;
            if (typeof G_vmlCanvasManager !== "undefined") {
                this.canvas = window.G_vmlCanvasManager.initElement(this.canvas)
            }
            this.ctx = this.canvas.getContext("2d");
            this.gp = [new u(this)];
            this.setOptions();
            this.render()
        }
        b(t, e);
        t.prototype.elem = null;
        t.prototype.value = [20];
        t.prototype.maxValue = 80;
        t.prototype.minValue = 0;
        t.prototype.displayedAngle = 0;
        t.prototype.displayedValue = 0;
        t.prototype.lineWidth = 40;
        t.prototype.paddingBottom = .1;
        t.prototype.percentColors = null;
        t.prototype.options = {
            colorStart: "#6fadcf",
            colorStop: void 0,
            gradientType: 0,
            strokeColor: "#e0e0e0",
            pointer: {
                length: .8,
                strokeWidth: .035
            },
            angle: .15,
            lineWidth: .44,
            fontSize: 40,
            limitMax: false,
            percentColors: [
                [0, "#a9d70b"],
                [.5, "#f9c802"],
                [1, "#ff0000"]
            ]
        };
        t.prototype.setOptions = function(e) {
            var n, r, i, s;
            if (e == null) {
                e = null
            }
            t.__super__.setOptions.call(this, e);
            this.configPercentColors();
            this.lineWidth = this.canvas.height * (1 - this.paddingBottom) * this.options.lineWidth;
            this.radius = this.canvas.height * (1 - this.paddingBottom) - this.lineWidth;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.render();
            s = this.gp;
            for (r = 0, i = s.length; r < i; r++) {
                n = s[r];
                n.setOptions(this.options.pointer);
                n.render()
            }
            return this
        };
        t.prototype.configPercentColors = function() {
            var e, t, n, r, i, s, o;
            this.percentColors = null;
            if (this.options.percentColors !== void 0) {
                this.percentColors = new Array;
                o = [];
                for (n = i = 0, s = this.options.percentColors.length - 1; 0 <= s ? i <= s : i >= s; n = 0 <= s ? ++i : --i) {
                    r = parseInt(c(this.options.percentColors[n][1]).substring(0, 2), 16);
                    t = parseInt(c(this.options.percentColors[n][1]).substring(2, 4), 16);
                    e = parseInt(c(this.options.percentColors[n][1]).substring(4, 6), 16);
                    o.push(this.percentColors[n] = {
                        pct: this.options.percentColors[n][0],
                        color: {
                            r: r,
                            g: t,
                            b: e
                        }
                    })
                }
                return o
            }
        };
        t.prototype.set = function(e) {
            var t, n, r, i, s, o, a;
            if (!(e instanceof Array)) {
                e = [e]
            }
            if (e.length > this.gp.length) {
                for (t = i = 0, a = e.length - this.gp.length; 0 <= a ? i < a : i > a; t = 0 <= a ? ++i : --i) {
                    this.gp.push(new u(this))
                }
            }
            t = 0;
            n = false;
            for (s = 0, o = e.length; s < o; s++) {
                r = e[s];
                if (r > this.maxValue) {
                    this.maxValue = this.value * 1.1;
                    n = true
                }
                this.gp[t].value = r;
                this.gp[t++].setOptions({
                    maxValue: this.maxValue,
                    angle: this.options.angle
                })
            }
            this.value = e[e.length - 1];
            if (n) {
                if (!this.options.limitMax) {
                    return AnimationUpdater.run()
                }
            } else {
                return AnimationUpdater.run()
            }
        };
        t.prototype.getAngle = function(e) {
            return (1 + this.options.angle) * Math.PI + (e - this.minValue) / (this.maxValue - this.minValue) * (1 - this.options.angle * 2) * Math.PI
        };
        t.prototype.getColorForPercentage = function(e, t) {
            var n, r, i, s, o, u, a;
            if (e === 0) {
                n = this.percentColors[0].color
            } else {
                n = this.percentColors[this.percentColors.length - 1].color;
                for (i = u = 0, a = this.percentColors.length - 1; 0 <= a ? u <= a : u >= a; i = 0 <= a ? ++u : --u) {
                    if (e <= this.percentColors[i].pct) {
                        if (t === true) {
                            o = this.percentColors[i - 1];
                            r = this.percentColors[i];
                            s = (e - o.pct) / (r.pct - o.pct);
                            n = {
                                r: Math.floor(o.color.r * (1 - s) + r.color.r * s),
                                g: Math.floor(o.color.g * (1 - s) + r.color.g * s),
                                b: Math.floor(o.color.b * (1 - s) + r.color.b * s)
                            }
                        } else {
                            n = this.percentColors[i].color
                        }
                        break
                    }
                }
            }
            return "rgb(" + [n.r, n.g, n.b].join(",") + ")"
        };
        t.prototype.getColorForValue = function(e, t) {
            var n;
            n = (e - this.minValue) / (this.maxValue - this.minValue);
            return this.getColorForPercentage(n, t)
        };
        t.prototype.render = function() {
            var e, t, n, r, i, s, o, u, a;
            i = this.canvas.width / 2;
            r = this.canvas.height * (1 - this.paddingBottom);
            e = this.getAngle(this.displayedValue);
            if (this.textField) {
                this.textField.render(this)
            }
            this.ctx.lineCap = "butt";
            if (this.options.customFillStyle !== void 0) {
                t = this.options.customFillStyle(this)
            } else if (this.percentColors !== null) {
                t = this.getColorForValue(this.displayedValue, true)
            } else if (this.options.colorStop !== void 0) {
                if (this.options.gradientType === 0) {
                    t = this.ctx.createRadialGradient(i, r, 9, i, r, 70)
                } else {
                    t = this.ctx.createLinearGradient(0, 0, i, 0)
                }
                t.addColorStop(0, this.options.colorStart);
                t.addColorStop(1, this.options.colorStop)
            } else {
                t = this.options.colorStart
            }
            this.ctx.strokeStyle = t;
            this.ctx.beginPath();
            this.ctx.arc(i, r, this.radius, (1 + this.options.angle) * Math.PI, e, false);
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.stroke();
            this.ctx.strokeStyle = this.options.strokeColor;
            this.ctx.beginPath();
            this.ctx.arc(i, r, this.radius, e, (2 - this.options.angle) * Math.PI, false);
            this.ctx.stroke();
            u = this.gp;
            a = [];
            for (s = 0, o = u.length; s < o; s++) {
                n = u[s];
                a.push(n.update(true))
            }
            return a
        };
        return t
    }(i);
    r = function(e) {
        function t(e) {
            this.canvas = e;
            t.__super__.constructor.call(this);
            if (typeof G_vmlCanvasManager !== "undefined") {
                this.canvas = window.G_vmlCanvasManager.initElement(this.canvas)
            }
            this.ctx = this.canvas.getContext("2d");
            this.setOptions();
            this.render()
        }
        b(t, e);
        t.prototype.lineWidth = 15;
        t.prototype.displayedValue = 0;
        t.prototype.value = 33;
        t.prototype.maxValue = 80;
        t.prototype.minValue = 0;
        t.prototype.options = {
            lineWidth: .1,
            colorStart: "#6f6ea0",
            colorStop: "#c0c0db",
            strokeColor: "#eeeeee",
            shadowColor: "#d5d5d5",
            angle: .35
        };
        t.prototype.getAngle = function(e) {
            return (1 - this.options.angle) * Math.PI + (e - this.minValue) / (this.maxValue - this.minValue) * (2 + this.options.angle - (1 - this.options.angle)) * Math.PI
        };
        t.prototype.setOptions = function(e) {
            if (e == null) {
                e = null
            }
            t.__super__.setOptions.call(this, e);
            this.lineWidth = this.canvas.height * this.options.lineWidth;
            this.radius = this.canvas.height / 2 - this.lineWidth / 2;
            return this
        };
        t.prototype.set = function(e) {
            this.value = e;
            if (this.value > this.maxValue) {
                this.maxValue = this.value * 1.1
            }
            return AnimationUpdater.run()
        };
        t.prototype.render = function() {
            var e, t, n, r, i, s;
            e = this.getAngle(this.displayedValue);
            s = this.canvas.width / 2;
            n = this.canvas.height / 2;
            if (this.textField) {
                this.textField.render(this)
            }
            t = this.ctx.createRadialGradient(s, n, 39, s, n, 70);
            t.addColorStop(0, this.options.colorStart);
            t.addColorStop(1, this.options.colorStop);
            r = this.radius - this.lineWidth / 2;
            i = this.radius + this.lineWidth / 2;
            this.ctx.strokeStyle = this.options.strokeColor;
            this.ctx.beginPath();
            this.ctx.arc(s, n, this.radius, (1 - this.options.angle) * Math.PI, (2 + this.options.angle) * Math.PI, false);
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.lineCap = "round";
            this.ctx.stroke();
            this.ctx.strokeStyle = t;
            this.ctx.beginPath();
            this.ctx.arc(s, n, this.radius, (1 - this.options.angle) * Math.PI, e, false);
            return this.ctx.stroke()
        };
        return t
    }(i);
    s = function(e) {
        function t() {
            g = t.__super__.constructor.apply(this, arguments);
            return g
        }
        b(t, e);
        t.prototype.strokeGradient = function(e, t, n, r) {
            var i;
            i = this.ctx.createRadialGradient(e, t, n, e, t, r);
            i.addColorStop(0, this.options.shadowColor);
            i.addColorStop(.12, this.options._orgStrokeColor);
            i.addColorStop(.88, this.options._orgStrokeColor);
            i.addColorStop(1, this.options.shadowColor);
            return i
        };
        t.prototype.setOptions = function(e) {
            var n, r, i, s;
            if (e == null) {
                e = null
            }
            t.__super__.setOptions.call(this, e);
            s = this.canvas.width / 2;
            n = this.canvas.height / 2;
            r = this.radius - this.lineWidth / 2;
            i = this.radius + this.lineWidth / 2;
            this.options._orgStrokeColor = this.options.strokeColor;
            this.options.strokeColor = this.strokeGradient(s, n, r, i);
            return this
        };
        return t
    }(r);
    window.AnimationUpdater = {
        elements: [],
        animId: null,
        addAll: function(e) {
            var t, n, r, i;
            i = [];
            for (n = 0, r = e.length; n < r; n++) {
                t = e[n];
                i.push(AnimationUpdater.elements.push(t))
            }
            return i
        },
        add: function(e) {
            return AnimationUpdater.elements.push(e)
        },
        run: function() {
            var e, t, n, r, i;
            e = true;
            i = AnimationUpdater.elements;
            for (n = 0, r = i.length; n < r; n++) {
                t = i[n];
                if (t.update()) {
                    e = false
                }
            }
            if (!e) {
                return AnimationUpdater.animId = requestAnimationFrame(AnimationUpdater.run)
            } else {
                return cancelAnimationFrame(AnimationUpdater.animId)
            }
        }
    };
    window.Gauge = o;
    window.Donut = s;
    window.BaseDonut = r;
    window.TextRenderer = a
}.call(this);
! function(e, t) {
    "object" == typeof exports ? module.exports = t(require("angular")) : "function" == typeof define && define.amd ? define(["angular"], t) : t(e.angular)
}(this, function(e) {
    ! function(e) {
        "use strict";
        return e.module("easypiechart", []).directive("easypiechart", [function() {
            return {
                restrict: "A",
                require: "?ngModel",
                scope: {
                    percent: "=",
                    options: "="
                },
                link: function(t, r) {
                    t.percent = t.percent || 0;
                    var i = {
                        barColor: "#ef1e25",
                        trackColor: "#f9f9f9",
                        scaleColor: "#dfe0e0",
                        scaleLength: 5,
                        lineCap: "round",
                        lineWidth: 3,
                        size: 110,
                        rotate: 0,
                        animate: {
                            duration: 1e3,
                            enabled: !0
                        }
                    };
                    t.options = e.extend(i, t.options);
                    var s = new n(r[0], i);
                    t.$watch("percent", function(e) {
                        s.update(e)
                    })
                }
            }
        }])
    }(e);
    var t = function(e, t) {
            var n, r = document.createElement("canvas");
            e.appendChild(r), "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(r);
            var i = r.getContext("2d");
            r.width = r.height = t.size;
            var s = 1;
            window.devicePixelRatio > 1 && (s = window.devicePixelRatio, r.style.width = r.style.height = [t.size, "px"].join(""), r.width = r.height = t.size * s, i.scale(s, s)), i.translate(t.size / 2, t.size / 2), i.rotate((-.5 + t.rotate / 180) * Math.PI);
            var o = (t.size - t.lineWidth) / 2;
            t.scaleColor && t.scaleLength && (o -= t.scaleLength + 2), Date.now = Date.now || function() {
                return +(new Date)
            };
            var u = function(e, t, n) {
                    n = Math.min(Math.max(-1, n || 0), 1);
                    var r = 0 >= n ? !0 : !1;
                    i.beginPath(), i.arc(0, 0, o, 0, 2 * Math.PI * n, r), i.strokeStyle = e, i.lineWidth = t, i.stroke()
                },
                a = function() {
                    var e, n;
                    i.lineWidth = 1, i.fillStyle = t.scaleColor, i.save();
                    for (var r = 24; r > 0; --r) r % 6 === 0 ? (n = t.scaleLength, e = 0) : (n = .6 * t.scaleLength, e = t.scaleLength - n), i.fillRect(-t.size / 2 + e, 0, n, 1), i.rotate(Math.PI / 12);
                    i.restore()
                },
                f = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
                        window.setTimeout(e, 1e3 / 60)
                    }
                }(),
                l = function() {
                    t.scaleColor && a(), t.trackColor && u(t.trackColor, t.lineWidth, 1)
                };
            this.getCanvas = function() {
                return r
            }, this.getCtx = function() {
                return i
            }, this.clear = function() {
                i.clearRect(t.size / -2, t.size / -2, t.size, t.size)
            }, this.draw = function(e) {
                t.scaleColor || t.trackColor ? i.getImageData && i.putImageData ? n ? i.putImageData(n, 0, 0) : (l(), n = i.getImageData(0, 0, t.size * s, t.size * s)) : (this.clear(), l()) : this.clear(), i.lineCap = t.lineCap;
                var r;
                r = "function" == typeof t.barColor ? t.barColor(e) : t.barColor, u(r, t.lineWidth, e / 100)
            }.bind(this), this.animate = function(e, n) {
                var r = Date.now();
                t.onStart(e, n);
                var i = function() {
                    var s = Math.min(Date.now() - r, t.animate.duration),
                        o = t.easing(this, s, e, n - e, t.animate.duration);
                    this.draw(o), t.onStep(e, n, o), s >= t.animate.duration ? t.onStop(e, n) : f(i)
                }.bind(this);
                f(i)
            }.bind(this)
        },
        n = function(e, n) {
            var r = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                size: 110,
                rotate: 0,
                animate: {
                    duration: 1e3,
                    enabled: !0
                },
                easing: function(e, t, n, r, i) {
                    return t /= i / 2, 1 > t ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
                },
                onStart: function() {},
                onStep: function() {},
                onStop: function() {}
            };
            if ("undefined" != typeof t) r.renderer = t;
            else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                r.renderer = SVGRenderer
            }
            var i = {},
                s = 0,
                o = function() {
                    this.el = e, this.options = i;
                    for (var t in r) r.hasOwnProperty(t) && (i[t] = n && "undefined" != typeof n[t] ? n[t] : r[t], "function" == typeof i[t] && (i[t] = i[t].bind(this)));
                    i.easing = "string" == typeof i.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[i.easing]) ? jQuery.easing[i.easing] : r.easing, "number" == typeof i.animate && (i.animate = {
                        duration: i.animate,
                        enabled: !0
                    }), "boolean" != typeof i.animate || i.animate || (i.animate = {
                        duration: 1e3,
                        enabled: i.animate
                    }), this.renderer = new i.renderer(e, i), this.renderer.draw(s), e.dataset && e.dataset.percent ? this.update(parseFloat(e.dataset.percent)) : e.getAttribute && e.getAttribute("data-percent") && this.update(parseFloat(e.getAttribute("data-percent")))
                }.bind(this);
            this.update = function(e) {
                return e = parseFloat(e), i.animate.enabled ? this.renderer.animate(s, e) : this.renderer.draw(e), s = e, this
            }.bind(this), this.disableAnimation = function() {
                return i.animate.enabled = !1, this
            }, this.enableAnimation = function() {
                return i.animate.enabled = !0, this
            }, o()
        }
});
angular.module("templates-angularwizard", ["step.html", "wizard.html"]), angular.module("step.html", []).run(["$templateCache", function(e) {
    e.put("step.html", '<section ng-show="selected" ng-class="{current: selected, done: completed}" class="step" ng-transclude>\n</section>')
}]), angular.module("wizard.html", []).run(["$templateCache", function(e) {
    e.put("wizard.html", '<div>\n    <div class="steps" ng-transclude></div>\n    <ul class="steps-indicator steps-{{steps.length}}" ng-if="!hideIndicators">\n      <li ng-class="{default: !step.completed && !step.selected, current: step.selected && !step.completed, done: step.completed && !step.selected, editing: step.selected && step.completed}" ng-repeat="step in steps">\n        <a ng-click="goTo(step)">{{step.title}}</a>\n      </li>\n    </ul>\n</div>')
}]), angular.module("mgo-angular-wizard", ["templates-angularwizard"]), angular.module("mgo-angular-wizard").directive("wzStep", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        scope: {
            title: "@"
        },
        require: "^wizard",
        templateUrl: "step.html",
        link: function(e, t, n, r) {
            r.addStep(e)
        }
    }
}), angular.module("mgo-angular-wizard").directive("wizard", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        scope: {
            currentStep: "=",
            onFinish: "&",
            hideIndicators: "=",
            editMode: "=",
            name: "@"
        },
        templateUrl: "wizard.html",
        controller: ["$scope", "$element", "WizardHandler", function(e, t, n) {
            function r() {
                _.each(e.steps, function(e) {
                    e.selected = !1
                }), e.selectedStep = null
            }
            n.addWizard(e.name || n.defaultName, this), e.$on("$destroy", function() {
                n.removeWizard(e.name || n.defaultName)
            }), e.steps = [], e.$watch("currentStep", function(t) {
                t && e.selectedStep && e.selectedStep.title !== e.currentStep && e.goTo(_.find(e.steps, {
                    title: e.currentStep
                }))
            }), e.$watch("[editMode, steps.length]", function() {
                var t = e.editMode;
                _.isUndefined(t) || _.isNull(t) || t && _.each(e.steps, function(e) {
                    e.completed = !0
                })
            }, !0), this.addStep = function(t) {
                e.steps.push(t), 1 === e.steps.length && e.goTo(e.steps[0])
            }, e.goTo = function(t) {
                r(), e.selectedStep = t, _.isUndefined(e.currentStep) || (e.currentStep = t.title), t.selected = !0
            }, this.next = function(t) {
                var n = _.indexOf(e.steps, e.selectedStep);
                t || (e.selectedStep.completed = !0), n === e.steps.length - 1 ? this.finish() : e.goTo(e.steps[n + 1])
            }, this.goTo = function(t) {
                var n;
                n = _.isNumber(t) ? e.steps[t] : _.find(e.steps, {
                    title: t
                }), e.goTo(n)
            }, this.finish = function() {
                e.onFinish && e.onFinish()
            }, this.cancel = this.previous = function() {
                var t = _.indexOf(e.steps, e.selectedStep);
                if (0 === t) throw new Error("Can't go back. It's already in step 0");
                e.goTo(e.steps[t - 1])
            }
        }]
    }
}), wizardButtonDirective("wzNext"), wizardButtonDirective("wzPrevious"), wizardButtonDirective("wzFinish"), wizardButtonDirective("wzCancel"), angular.module("mgo-angular-wizard").factory("WizardHandler", function() {
    var e = {},
        t = {};
    return e.defaultName = "defaultWizard", e.addWizard = function(e, n) {
        t[e] = n
    }, e.removeWizard = function(e) {
        delete t[e]
    }, e.wizard = function(n) {
        var r = n;
        return n || (r = e.defaultName), t[r]
    }, e
});
! function(e, t) {
    t["true"] = e,
        function(e, t) {
            "use strict";

            function n() {
                this.$get = ["$$sanitizeUri", function(e) {
                    return function(t) {
                        var n = [];
                        return s(t, l(n, function(t, n) {
                            return !/^unsafe/.test(e(t, n))
                        })), n.join("")
                    }
                }]
            }

            function r(e) {
                var n = [],
                    r = l(n, t.noop);
                return r.chars(e), n.join("")
            }

            function i(e) {
                var t, n = {},
                    r = e.split(",");
                for (t = 0; t < r.length; t++) n[r[t]] = !0;
                return n
            }

            function s(e, n) {
                function r(e, r, s, u) {
                    if (r = t.lowercase(r), C[r])
                        for (; f.last() && k[f.last()];) i("", f.last());
                    N[r] && f.last() == r && i("", r), u = S[r] || !!u, u || f.push(r);
                    var a = {};
                    s.replace(d, function(e, t, n, r, i) {
                        var s = n || r || i || "";
                        a[t] = o(s)
                    }), n.start && n.start(r, a, u)
                }

                function i(e, r) {
                    var i, s = 0;
                    if (r = t.lowercase(r))
                        for (s = f.length - 1; s >= 0 && f[s] != r; s--);
                    if (s >= 0) {
                        for (i = f.length - 1; i >= s; i--) n.end && n.end(f[i]);
                        f.length = s
                    }
                }
                var s, u, a, f = [],
                    l = e;
                for (f.last = function() {
                        return f[f.length - 1]
                    }; e;) {
                    if (u = !0, f.last() && L[f.last()]) e = e.replace(new RegExp("(.*)<\\s*\\/\\s*" + f.last() + "[^>]*>", "i"), function(e, t) {
                        return t = t.replace(g, "$1").replace(b, "$1"), n.chars && n.chars(o(t)), ""
                    }), i("", f.last());
                    else if (0 === e.indexOf("<!--") ? (s = e.indexOf("--", 4), s >= 0 && e.lastIndexOf("-->", s) === s && (n.comment && n.comment(e.substring(4, s)), e = e.substring(s + 3), u = !1)) : y.test(e) ? (a = e.match(y), a && (e = e.replace(a[0], ""), u = !1)) : m.test(e) ? (a = e.match(p), a && (e = e.substring(a[0].length), a[0].replace(p, i), u = !1)) : v.test(e) && (a = e.match(h), a && (e = e.substring(a[0].length), a[0].replace(h, r), u = !1)), u) {
                        s = e.indexOf("<");
                        var w = 0 > s ? e : e.substring(0, s);
                        e = 0 > s ? "" : e.substring(s), n.chars && n.chars(o(w))
                    }
                    if (e == l) throw c("badparse", "The sanitizer was unable to parse the following block of html: {0}", e);
                    l = e
                }
                i()
            }

            function o(e) {
                if (!e) return "";
                var t = D.exec(e),
                    n = t[1],
                    r = t[3],
                    i = t[2];
                return i && (_.innerHTML = i.replace(/</g, "&lt;"), i = "textContent" in _ ? _.textContent : _.innerText), n + i + r
            }

            function u(e) {
                return e.replace(/&/g, "&").replace(w, function(e) {
                    var t = e.charCodeAt(0),
                        n = e.charCodeAt(1);
                    return "&#" + (1024 * (t - 55296) + (n - 56320) + 65536) + ";"
                }).replace(E, function(e) {
                    var t = e.charCodeAt(0);
                    return 159 >= t || 173 == t || t >= 1536 && 1540 >= t || 1807 == t || 6068 == t || 6069 == t || t >= 8204 && 8207 >= t || t >= 8232 && 8239 >= t || t >= 8288 && 8303 >= t || 65279 == t || t >= 65520 && 65535 >= t ? "&#" + t + ";" : e
                }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }

            function a(e) {
                var n = "",
                    r = e.split(";");
                return t.forEach(r, function(e) {
                    var r = e.split(":");
                    if (2 == r.length) {
                        var i = P(t.lowercase(r[0])),
                            e = P(t.lowercase(r[1]));
                        ("color" === i && (e.match(/^rgb\([0-9%,\. ]*\)$/i) || e.match(/^rgba\([0-9%,\. ]*\)$/i) || e.match(/^hsl\([0-9%,\. ]*\)$/i) || e.match(/^hsla\([0-9%,\. ]*\)$/i) || e.match(/^#[0-9a-f]{3,6}$/i) || e.match(/^[a-z]*$/i)) || "text-align" === i && ("left" === e || "right" === e || "center" === e || "justify" === e) || "float" === i && ("left" === e || "right" === e || "none" === e) || ("width" === i || "height" === i) && e.match(/[0-9\.]*(px|em|rem|%)/)) && (n += i + ": " + e + ";")
                    }
                }), n
            }

            function f(e, t, n, r) {
                return "img" === e && t["ta-insert-video"] && ("ta-insert-video" === n || "allowfullscreen" === n || "frameborder" === n || "contenteditble" === n && "false" === r) ? !0 : !1
            }

            function l(e, n) {
                var r = !1,
                    i = t.bind(e, e.push);
                return {
                    start: function(e, s, o) {
                        e = t.lowercase(e), !r && L[e] && (r = e), r || A[e] !== !0 || (i("<"), i(e), t.forEach(s, function(r, o) {
                            var l = t.lowercase(o),
                                c = "img" === e && "src" === l || "background" === l;
                            ("style" === l && "" !== (r = a(r)) || f(e, s, l, r) || M[l] === !0 && (O[l] !== !0 || n(r, c))) && (i(" "), i(o), i('="'), i(u(r)), i('"'))
                        }), i(o ? "/>" : ">"))
                    },
                    end: function(e) {
                        e = t.lowercase(e), r || A[e] !== !0 || (i("</"), i(e), i(">")), e == r && (r = !1)
                    },
                    chars: function(e) {
                        r || i(u(e))
                    }
                }
            }
            var c = t.$$minErr("$sanitize"),
                h = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
                p = /^<\s*\/\s*([\w:-]+)[^>]*>/,
                d = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
                v = /^</,
                m = /^<\s*\//,
                g = /<!--(.*?)-->/g,
                y = /<!DOCTYPE([^>]*?)>/i,
                b = /<!\[CDATA\[(.*?)]]>/g,
                w = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                E = /([^\#-~| |!])/g,
                S = i("area,br,col,hr,img,wbr"),
                x = i("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
                T = i("rp,rt"),
                N = t.extend({}, T, x),
                C = t.extend({}, x, i("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
                k = t.extend({}, T, i("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
                L = i("script,style"),
                A = t.extend({}, S, C, k, N),
                O = i("background,cite,href,longdesc,src,usemap"),
                M = t.extend({}, O, i("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),
                _ = document.createElement("pre"),
                D = /^(\s*)([\s\S]*?)(\s*)$/,
                P = function() {
                    return String.prototype.trim ? function(e) {
                        return t.isString(e) ? e.trim() : e
                    } : function(e) {
                        return t.isString(e) ? e.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : e
                    }
                }();
            t.module("ngSanitize", []).provider("$sanitize", n), t.module("ngSanitize").filter("linky", ["$sanitize", function(e) {
                var n = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,
                    i = /^mailto:/;
                return function(s, o) {
                    function u(e) {
                        e && p.push(r(e))
                    }

                    function a(e, n) {
                        p.push("<a "), t.isDefined(o) && (p.push('target="'), p.push(o), p.push('" ')), p.push('href="'), p.push(e), p.push('">'), u(n), p.push("</a>")
                    }
                    if (!s) return s;
                    for (var f, l, c, h = s, p = []; f = h.match(n);) l = f[0], f[2] == f[3] && (l = "mailto:" + l), c = f.index, u(h.substr(0, c)), a(l, f[0].replace(i, "")), h = h.substring(c + f[0].length);
                    return u(h), e(p.join(""))
                }
            }])
        }(window, window.angular)
}({}, function() {
    return this
}());
! function(e, t) {
    t["true"] = e, textAngularSetup = angular.module("textAngularSetup", []), textAngularSetup.value("taOptions", {
            toolbar: [
                ["h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "quote"],
                ["bold", "italics", "underline", "ul", "ol", "redo", "undo", "clear"],
                ["justifyLeft", "justifyCenter", "justifyRight"],
                ["html", "insertImage", "insertLink", "insertVideo"]
            ],
            classes: {
                focussed: "focussed",
                toolbar: "btn-toolbar",
                toolbarGroup: "btn-group",
                toolbarButton: "btn btn-default",
                toolbarButtonActive: "active",
                disabled: "disabled",
                textEditor: "form-control",
                htmlEditor: "form-control"
            },
            setup: {
                textEditorSetup: function() {},
                htmlEditorSetup: function() {}
            },
            defaultFileDropHandler: function(e, t) {
                var n = new FileReader;
                return "image" === e.type.substring(0, 5) ? (n.onload = function() {
                    "" !== n.result && t("insertImage", n.result, !0)
                }, n.readAsDataURL(e), !0) : !1
            }
        }), textAngularSetup.value("taSelectableElements", ["a", "img"]), textAngularSetup.value("taCustomRenderers", [{
            selector: "img",
            customAttribute: "ta-insert-video",
            renderLogic: function(e) {
                var t = angular.element("<iframe></iframe>"),
                    n = e.prop("attributes");
                angular.forEach(n, function(e) {
                    t.attr(e.name, e.value)
                }), t.attr("src", t.attr("ta-insert-video")), e.replaceWith(t)
            }
        }]), textAngularSetup.constant("taTranslations", {
            toggleHTML: "Toggle HTML",
            insertImage: "Please enter a image URL to insert",
            insertLink: "Please enter a URL to insert",
            insertVideo: "Please enter a youtube URL to embed"
        }), textAngularSetup.run(["taRegisterTool", "$window", "taTranslations", "taSelection", function(e, t, n, r) {
            e("html", {
                buttontext: n.toggleHTML,
                action: function() {
                    this.$editor().switchView()
                },
                activeState: function() {
                    return this.$editor().showHtml
                }
            });
            var i = function(e) {
                    return function() {
                        return this.$editor().queryFormatBlockState(e)
                    }
                },
                s = function() {
                    return this.$editor().wrapSelection("formatBlock", "<" + this.name.toUpperCase() + ">")
                };
            angular.forEach(["h1", "h2", "h3", "h4", "h5", "h6"], function(t) {
                e(t.toLowerCase(), {
                    buttontext: t.toUpperCase(),
                    action: s,
                    activeState: i(t.toLowerCase())
                })
            }), e("p", {
                buttontext: "P",
                action: function() {
                    return this.$editor().wrapSelection("formatBlock", "<P>")
                },
                activeState: function() {
                    return this.$editor().queryFormatBlockState("p")
                }
            }), e("pre", {
                buttontext: "pre",
                action: function() {
                    return this.$editor().wrapSelection("formatBlock", "<PRE>")
                },
                activeState: function() {
                    return this.$editor().queryFormatBlockState("pre")
                }
            }), e("ul", {
                iconclass: "fa fa-list-ul",
                action: function() {
                    return this.$editor().wrapSelection("insertUnorderedList", null)
                },
                activeState: function() {
                    return document.queryCommandState("insertUnorderedList")
                }
            }), e("ol", {
                iconclass: "fa fa-list-ol",
                action: function() {
                    return this.$editor().wrapSelection("insertOrderedList", null)
                },
                activeState: function() {
                    return document.queryCommandState("insertOrderedList")
                }
            }), e("quote", {
                iconclass: "fa fa-quote-right",
                action: function() {
                    return this.$editor().wrapSelection("formatBlock", "<BLOCKQUOTE>")
                },
                activeState: function() {
                    return this.$editor().queryFormatBlockState("blockquote")
                }
            }), e("undo", {
                iconclass: "fa fa-undo",
                action: function() {
                    return this.$editor().wrapSelection("undo", null)
                }
            }), e("redo", {
                iconclass: "fa fa-repeat",
                action: function() {
                    return this.$editor().wrapSelection("redo", null)
                }
            }), e("bold", {
                iconclass: "fa fa-bold",
                action: function() {
                    return this.$editor().wrapSelection("bold", null)
                },
                activeState: function() {
                    return document.queryCommandState("bold")
                },
                commandKeyCode: 98
            }), e("justifyLeft", {
                iconclass: "fa fa-align-left",
                action: function() {
                    return this.$editor().wrapSelection("justifyLeft", null)
                },
                activeState: function(e) {
                    var t = !1;
                    return e && (t = "left" === e.css("text-align") || "left" === e.attr("align") || "right" !== e.css("text-align") && "center" !== e.css("text-align") && !document.queryCommandState("justifyRight") && !document.queryCommandState("justifyCenter")), t = t || document.queryCommandState("justifyLeft")
                }
            }), e("justifyRight", {
                iconclass: "fa fa-align-right",
                action: function() {
                    return this.$editor().wrapSelection("justifyRight", null)
                },
                activeState: function(e) {
                    var t = !1;
                    return e && (t = "right" === e.css("text-align")), t = t || document.queryCommandState("justifyRight")
                }
            }), e("justifyCenter", {
                iconclass: "fa fa-align-center",
                action: function() {
                    return this.$editor().wrapSelection("justifyCenter", null)
                },
                activeState: function(e) {
                    var t = !1;
                    return e && (t = "center" === e.css("text-align")), t = t || document.queryCommandState("justifyCenter")
                }
            }), e("italics", {
                iconclass: "fa fa-italic",
                action: function() {
                    return this.$editor().wrapSelection("italic", null)
                },
                activeState: function() {
                    return document.queryCommandState("italic")
                },
                commandKeyCode: 105
            }), e("underline", {
                iconclass: "fa fa-underline",
                action: function() {
                    return this.$editor().wrapSelection("underline", null)
                },
                activeState: function() {
                    return document.queryCommandState("underline")
                },
                commandKeyCode: 117
            }), e("clear", {
                iconclass: "fa fa-ban",
                action: function(e, t) {
                    this.$editor().wrapSelection("removeFormat", null);
                    var n = angular.element(r.getSelectionElement()),
                        i = function(e) {
                            e = angular.element(e);
                            var t = e;
                            angular.forEach(e.children(), function(e) {
                                var n = angular.element("<p></p>");
                                n.html(angular.element(e).html()), t.after(n), t = n
                            }), e.remove()
                        };
                    angular.forEach(n.find("ul"), i), angular.forEach(n.find("ol"), i);
                    var s = this.$editor(),
                        o = function(e) {
                            e = angular.element(e), e[0] !== s.displayElements.text[0] && e.removeAttr("class"), angular.forEach(e.children(), o)
                        };
                    angular.forEach(n, o), "li" !== n[0].tagName.toLowerCase() && "ol" !== n[0].tagName.toLowerCase() && "ul" !== n[0].tagName.toLowerCase() && this.$editor().wrapSelection("formatBlock", "<p>"), t()
                }
            });
            var o = function(e, t, n) {
                var r = function() {
                    n.updateTaBindtaTextElement(), n.hidePopover()
                };
                e.preventDefault(), n.displayElements.popover.css("width", "375px");
                var i = n.displayElements.popoverContainer;
                i.empty();
                var s = angular.element('<div class="btn-group" style="padding-right: 6px;">'),
                    o = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');
                o.on("click", function(e) {
                    e.preventDefault(), t.css({
                        width: "100%",
                        height: ""
                    }), r()
                });
                var u = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');
                u.on("click", function(e) {
                    e.preventDefault(), t.css({
                        width: "50%",
                        height: ""
                    }), r()
                });
                var a = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');
                a.on("click", function(e) {
                    e.preventDefault(), t.css({
                        width: "25%",
                        height: ""
                    }), r()
                });
                var f = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');
                f.on("click", function(e) {
                    e.preventDefault(), t.css({
                        width: "",
                        height: ""
                    }), r()
                }), s.append(o), s.append(u), s.append(a), s.append(f), i.append(s), s = angular.element('<div class="btn-group" style="padding-right: 6px;">');
                var l = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');
                l.on("click", function(e) {
                    e.preventDefault(), t.css("float", "left"), r()
                });
                var c = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');
                c.on("click", function(e) {
                    e.preventDefault(), t.css("float", "right"), r()
                });
                var h = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');
                h.on("click", function(e) {
                    e.preventDefault(), t.css("float", ""), r()
                }), s.append(l), s.append(h), s.append(c), i.append(s), s = angular.element('<div class="btn-group">');
                var p = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');
                p.on("click", function(e) {
                    e.preventDefault(), t.remove(), r()
                }), s.append(p), i.append(s), n.showPopover(t), n.showResizeOverlay(t)
            };
            e("insertImage", {
                iconclass: "fa fa-picture-o",
                action: function() {
                    var e;
                    return e = t.prompt(n.insertImage, "http://"), e && "" !== e && "http://" !== e ? this.$editor().wrapSelection("insertImage", e, !0) : void 0
                },
                onElementSelect: {
                    element: "img",
                    action: o
                }
            }), e("insertVideo", {
                iconclass: "fa fa-youtube-play",
                action: function() {
                    var e;
                    if (e = t.prompt(n.insertVideo, "http://"), e && "" !== e && "http://" !== e) {
                        var r = e.match(/(\?|&)v=[^&]*/);
                        if (r.length > 0) {
                            var i = "http://www.youtube.com/embed/" + r[0].substring(3),
                                s = '<img class="ta-insert-video" ta-insert-video="' + i + '" contenteditable="false" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/>';
                            return this.$editor().wrapSelection("insertHTML", s, !0)
                        }
                    }
                },
                onElementSelect: {
                    element: "img",
                    onlyWithAttrs: ["ta-insert-video"],
                    action: o
                }
            }), e("insertLink", {
                iconclass: "fa fa-link",
                action: function() {
                    var e;
                    return e = t.prompt(n.insertLink, "http://"), e && "" !== e && "http://" !== e ? this.$editor().wrapSelection("createLink", e, !0) : void 0
                },
                activeState: function(e) {
                    return e ? "A" === e[0].tagName : !1
                },
                onElementSelect: {
                    element: "a",
                    action: function(e, r, i) {
                        e.preventDefault(), i.displayElements.popover.css("width", "305px");
                        var s = i.displayElements.popoverContainer;
                        s.empty(), s.css("line-height", "28px");
                        var o = angular.element('<a href="' + r.attr("href") + '" target="_blank">' + r.attr("href") + "</a>");
                        o.css({
                            display: "inline-block",
                            "max-width": "200px",
                            overflow: "hidden",
                            "text-overflow": "ellipsis",
                            "white-space": "nowrap",
                            "vertical-align": "middle"
                        }), s.append(o);
                        var u = angular.element('<div class="btn-group pull-right">'),
                            a = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-edit icon-edit"></i></button>');
                        a.on("click", function(e) {
                            e.preventDefault();
                            var s = t.prompt(n.insertLink, r.attr("href"));
                            s && "" !== s && "http://" !== s && (r.attr("href", s), i.updateTaBindtaTextElement()), i.hidePopover()
                        }), u.append(a);
                        var f = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-unlink icon-unlink"></i></button>');
                        f.on("click", function(e) {
                            e.preventDefault(), r.replaceWith(r.contents()), i.updateTaBindtaTextElement(), i.hidePopover()
                        }), u.append(f), s.append(u), i.showPopover(r)
                    }
                }
            })
        }]),
        function() {
            "Use Strict";

            function e(e) {
                try {
                    return 0 !== angular.element(e).length
                } catch (t) {
                    return !1
                }
            }

            function t(e, n) {
                var r = [],
                    i = e.children();
                return i.length && angular.forEach(i, function(e) {
                    r = r.concat(t(angular.element(e), n))
                }), void 0 !== e.attr(n) && r.push(e), r
            }

            function n(t, n) {
                if (!t || "" === t || h.hasOwnProperty(t)) throw "textAngular Error: A unique name is required for a Tool Definition";
                if (n.display && ("" === n.display || !e(n.display)) || !n.display && !n.buttontext && !n.iconclass) throw 'textAngular Error: Tool Definition for "' + t + '" does not have a valid display/iconclass/buttontext value';
                h[t] = n
            }
            var r = !1;
            /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && (document.addEventListener("click", function() {
                var e = window.event.target;
                if (r && null !== e) {
                    for (var t = !1, n = e; null !== n && "html" !== n.tagName.toLowerCase() && !t;) t = "true" === n.contentEditable, n = n.parentNode;
                    t || (document.getElementById("textAngular-editableFix-010203040506070809").setSelectionRange(0, 0), e.focus())
                }
                r = !1
            }, !1), angular.element(document.body).append('<input id="textAngular-editableFix-010203040506070809" style="width:1px;height:1px;border:none;margin:0;padding:0;position:absolute; top: -10000; left: -10000;" unselectable="on" tabIndex="-1">'));
            var s = function() {
                var e, t = -1,
                    n = window.navigator.userAgent,
                    r = n.indexOf("MSIE "),
                    i = n.indexOf("Trident/");
                if (r > 0) t = parseInt(n.substring(r + 5, n.indexOf(".", r)), 10);
                else if (i > 0) {
                    var s = n.indexOf("rv:");
                    t = parseInt(n.substring(s + 3, n.indexOf(".", s)), 10)
                }
                return t > -1 ? t : e
            }();
            "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
                return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            });
            var o, u, a;
            if (s > 8 || void 0 === s) {
                var f = function() {
                    var e = document.createElement("style");
                    return /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && e.appendChild(document.createTextNode("")), document.head.insertBefore(e, document.head.firstChild), e.sheet
                }();
                o = function() {
                    var e = document.createElement("style");
                    return /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && e.appendChild(document.createTextNode("")), document.head.appendChild(e), e.sheet
                }(), u = function(e, t) {
                    _addCSSRule(o, e, t)
                }, _addCSSRule = function(e, t, n) {
                    var r;
                    return e.rules ? r = Math.max(e.rules.length - 1, 0) : e.cssRules && (r = Math.max(e.cssRules.length - 1, 0)), e.insertRule ? e.insertRule(t + "{" + n + "}", r) : e.addRule(t, n, r), r
                }, a = function(e) {
                    _removeCSSRule(o, e)
                }, _removeCSSRule = function(e, t) {
                    e.removeRule ? e.removeRule(t) : e.deleteRule(t)
                }, _addCSSRule(f, ".ta-scroll-window.form-control", "height: 300px; overflow: auto; font-family: inherit; font-size: 100%; position: relative; padding: 0;"), _addCSSRule(f, ".ta-root.focussed .ta-scroll-window.form-control", "border-color: #66afe9; outline: 0; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);"), _addCSSRule(f, ".ta-editor.ta-html", "min-height: 300px; height: auto; overflow: auto; font-family: inherit; font-size: 100%;"), _addCSSRule(f, ".ta-scroll-window .ta-bind", "height: auto; min-height: 300px; padding: 6px 12px;"), _addCSSRule(f, ".ta-root .ta-resizer-handle-overlay", "z-index: 100; position: absolute; display: none;"), _addCSSRule(f, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-info", "position: absolute; bottom: 16px; right: 16px; border: 1px solid black; background-color: #FFF; padding: 0 4px; opacity: 0.7;"), _addCSSRule(f, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-background", "position: absolute; bottom: 5px; right: 5px; left: 5px; top: 5px; border: 1px solid black; background-color: rgba(0, 0, 0, 0.2);"), _addCSSRule(f, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner", "width: 10px; height: 10px; position: absolute;"), _addCSSRule(f, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tl", "top: 0; left: 0; border-left: 1px solid black; border-top: 1px solid black;"), _addCSSRule(f, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tr", "top: 0; right: 0; border-right: 1px solid black; border-top: 1px solid black;"), _addCSSRule(f, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-bl", "bottom: 0; left: 0; border-left: 1px solid black; border-bottom: 1px solid black;"), _addCSSRule(f, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-br", "bottom: 0; right: 0; border: 1px solid black; cursor: se-resize; background-color: white;")
            }
            var l = !1,
                c = angular.module("textAngular", ["ngSanitize", "textAngularSetup"]),
                h = {};
            c.constant("taRegisterTool", n), c.value("taTools", h), c.config([function() {
                angular.forEach(h, function(e, t) {
                    delete h[t]
                })
            }]), c.directive("textAngular", ["$compile", "$timeout", "taOptions", "taSanitize", "taSelection", "taExecCommand", "textAngularManager", "$window", "$document", "$animate", "$log", function(e, t, n, r, i, s, o, u, a, f, l) {
                return {
                    require: "?ngModel",
                    scope: {},
                    restrict: "EA",
                    link: function(r, c, h, p) {
                        var d, v, m, y, w, E, S, x, T, N = Math.floor(1e16 * Math.random()),
                            C = h.name ? h.name : "textAngularEditor" + N,
                            L = function(e, n, r) {
                                t(function() {
                                    var t = function() {
                                        e.off(n, t), r()
                                    };
                                    e.on(n, t)
                                }, 100)
                            };
                        T = s(h.taDefaultWrap), angular.extend(r, angular.copy(n), {
                            wrapSelection: function(e, t, n) {
                                T(e, !1, t), n && r["reApplyOnSelectorHandlerstaTextElement" + N](), r.displayElements.text[0].focus()
                            },
                            showHtml: !1
                        }), h.taFocussedClass && (r.classes.focussed = h.taFocussedClass), h.taTextEditorClass && (r.classes.textEditor = h.taTextEditorClass), h.taHtmlEditorClass && (r.classes.htmlEditor = h.taHtmlEditorClass), h.taTextEditorSetup && (r.setup.textEditorSetup = r.$parent.$eval(h.taTextEditorSetup)), h.taHtmlEditorSetup && (r.setup.htmlEditorSetup = r.$parent.$eval(h.taHtmlEditorSetup)), r.fileDropHandler = h.taFileDrop ? r.$parent.$eval(h.taFileDrop) : r.defaultFileDropHandler, S = c[0].innerHTML, c[0].innerHTML = "", r.displayElements = {
                            forminput: angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),
                            html: angular.element("<textarea></textarea>"),
                            text: angular.element("<div></div>"),
                            scrollWindow: angular.element("<div class='ta-scroll-window'></div>"),
                            popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"><div class="arrow"></div></div>'),
                            popoverContainer: angular.element('<div class="popover-content"></div>'),
                            resize: {
                                overlay: angular.element('<div class="ta-resizer-handle-overlay"></div>'),
                                background: angular.element('<div class="ta-resizer-handle-background"></div>'),
                                anchors: [angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],
                                info: angular.element('<div class="ta-resizer-handle-info"></div>')
                            }
                        }, r.displayElements.popover.append(r.displayElements.popoverContainer), r.displayElements.scrollWindow.append(r.displayElements.popover), r.displayElements.popover.on("mousedown", function(e, t) {
                            return t && angular.extend(e, t), e.preventDefault(), !1
                        }), r.showPopover = function(e) {
                            r.reflowPopover(e), r.displayElements.popover.css("display", "block"), f.addClass(r.displayElements.popover, "in"), L(c, "click keyup", function() {
                                r.hidePopover()
                            })
                        }, r.reflowPopover = function(e) {
                            r.displayElements.text[0].offsetHeight - 51 > e[0].offsetTop ? (r.displayElements.popover.css("top", e[0].offsetTop + e[0].offsetHeight + "px"), r.displayElements.popover.removeClass("top").addClass("bottom")) : (r.displayElements.popover.css("top", e[0].offsetTop - 54 + "px"), r.displayElements.popover.removeClass("bottom").addClass("top")), r.displayElements.popover.css("left", Math.max(0, Math.min(r.displayElements.text[0].offsetWidth - 305, e[0].offsetLeft + e[0].offsetWidth / 2 - 152.5)) + "px")
                        }, r.hidePopover = function() {
                            f.removeClass(r.displayElements.popover, "in", function() {
                                r.displayElements.popover.css("display", ""), r.displayElements.popoverContainer.attr("style", ""), r.displayElements.popoverContainer.attr("class", "popover-content")
                            })
                        }, r.displayElements.resize.overlay.append(r.displayElements.resize.background), angular.forEach(r.displayElements.resize.anchors, function(e) {
                            r.displayElements.resize.overlay.append(e)
                        }), r.displayElements.resize.overlay.append(r.displayElements.resize.info), r.displayElements.scrollWindow.append(r.displayElements.resize.overlay), r.reflowResizeOverlay = function(e) {
                            e = angular.element(e)[0], r.displayElements.resize.overlay.css({
                                display: "block",
                                left: e.offsetLeft - 5 + "px",
                                top: e.offsetTop - 5 + "px",
                                width: e.offsetWidth + 10 + "px",
                                height: e.offsetHeight + 10 + "px"
                            }), r.displayElements.resize.info.text(e.offsetWidth + " x " + e.offsetHeight)
                        }, r.showResizeOverlay = function(e) {
                            var t = function(t) {
                                var n = {
                                    width: parseInt(e.attr("width")),
                                    height: parseInt(e.attr("height")),
                                    x: t.clientX,
                                    y: t.clientY
                                };
                                void 0 === n.width && (n.width = e[0].offsetWidth), void 0 === n.height && (n.height = e[0].offsetHeight), r.hidePopover();
                                var i = n.height / n.width,
                                    s = function(t) {
                                        var s = {
                                                x: Math.max(0, n.width + (t.clientX - n.x)),
                                                y: Math.max(0, n.height + (t.clientY - n.y))
                                            },
                                            o = function(e, t) {
                                                e = angular.element(e), "img" === e[0].tagName.toLowerCase() && (t.height && (e.attr("height", t.height), delete t.height), t.width && (e.attr("width", t.width), delete t.width)), e.css(t)
                                            };
                                        if (t.shiftKey) {
                                            var u = s.y / s.x;
                                            o(e, {
                                                width: i > u ? s.x : s.y / i,
                                                height: i > u ? s.x * i : s.y
                                            })
                                        } else o(e, {
                                            width: s.x,
                                            height: s.y
                                        });
                                        r.reflowResizeOverlay(e)
                                    };
                                a.find("body").on("mousemove", s), L(r.displayElements.resize.overlay, "mouseup", function() {
                                    a.find("body").off("mousemove", s), r.showPopover(e)
                                }), t.stopPropagation(), t.preventDefault()
                            };
                            r.displayElements.resize.anchors[3].on("mousedown", t), r.reflowResizeOverlay(e), L(c, "click", function() {
                                r.hideResizeOverlay()
                            })
                        }, r.hideResizeOverlay = function() {
                            r.displayElements.resize.overlay.css("display", "")
                        }, r.setup.htmlEditorSetup(r.displayElements.html), r.setup.textEditorSetup(r.displayElements.text), r.displayElements.html.attr({
                            id: "taHtmlElement" + N,
                            "ng-show": "showHtml",
                            "ta-bind": "ta-bind",
                            "ng-model": "html"
                        }), r.displayElements.text.attr({
                            id: "taTextElement" + N,
                            contentEditable: "true",
                            "ta-bind": "ta-bind",
                            "ng-model": "html"
                        }), r.displayElements.scrollWindow.attr({
                            "ng-hide": "showHtml"
                        }), h.taDefaultWrap && r.displayElements.text.attr("ta-default-wrap", h.taDefaultWrap), r.displayElements.scrollWindow.append(r.displayElements.text), c.append(r.displayElements.scrollWindow), c.append(r.displayElements.html), r.displayElements.forminput.attr("name", C), c.append(r.displayElements.forminput), h.tabindex && (c.removeAttr("tabindex"), r.displayElements.text.attr("tabindex", h.tabindex), r.displayElements.html.attr("tabindex", h.tabindex)), h.placeholder && (r.displayElements.text.attr("placeholder", h.placeholder), r.displayElements.html.attr("placeholder", h.placeholder)), h.taDisabled && (r.displayElements.text.attr("ta-readonly", "disabled"), r.displayElements.html.attr("ta-readonly", "disabled"), r.disabled = r.$parent.$eval(h.taDisabled), r.$parent.$watch(h.taDisabled, function(e) {
                            r.disabled = e, r.disabled ? c.addClass(r.classes.disabled) : c.removeClass(r.classes.disabled)
                        })), e(r.displayElements.scrollWindow)(r), e(r.displayElements.html)(r), r.updateTaBindtaTextElement = r["updateTaBindtaTextElement" + N], r.updateTaBindtaHtmlElement = r["updateTaBindtaHtmlElement" + N], c.addClass("ta-root"), r.displayElements.scrollWindow.addClass("ta-text ta-editor " + r.classes.textEditor), r.displayElements.html.addClass("ta-html ta-editor " + r.classes.htmlEditor), r._actionRunning = !1;
                        var A = !1;
                        if (r.startAction = function() {
                                return r._actionRunning = !0, u.rangy && u.rangy.saveSelection ? (A = u.rangy.saveSelection(), function() {
                                    A && u.rangy.restoreSelection(A)
                                }) : void 0
                            }, r.endAction = function() {
                                r._actionRunning = !1, A && u.rangy.removeMarkers(A), A = !1, r.updateSelectedStyles(), r.showHtml || r["updateTaBindtaTextElement" + N]()
                            }, w = function() {
                                c.addClass(r.classes.focussed), x.focus()
                            }, r.displayElements.html.on("focus", w), r.displayElements.text.on("focus", w), E = function(e) {
                                return r._actionRunning || a[0].activeElement === r.displayElements.html[0] || a[0].activeElement === r.displayElements.text[0] || (c.removeClass(r.classes.focussed), x.unfocus(), t(function() {
                                    c.triggerHandler("blur")
                                }, 0)), e.preventDefault(), !1
                            }, r.displayElements.html.on("blur", E), r.displayElements.text.on("blur", E), r.queryFormatBlockState = function(e) {
                                return e.toLowerCase() === a[0].queryCommandValue("formatBlock").toLowerCase()
                            }, r.switchView = function() {
                                r.showHtml = !r.showHtml, r.showHtml ? t(function() {
                                    return r.displayElements.html[0].focus()
                                }, 100) : t(function() {
                                    return r.displayElements.text[0].focus()
                                }, 100)
                            }, h.ngModel) {
                            var O = !0;
                            p.$render = function() {
                                if (O) {
                                    O = !1;
                                    var e = r.$parent.$eval(h.ngModel);
                                    void 0 !== e && null !== e || !S || "" === S || p.$setViewValue(S)
                                }
                                r.displayElements.forminput.val(p.$viewValue), r._elementSelectTriggered || a[0].activeElement === r.displayElements.html[0] || a[0].activeElement === r.displayElements.text[0] || (r.html = p.$viewValue || "")
                            }
                        } else r.displayElements.forminput.val(S), r.html = S;
                        if (r.$watch("html", function(e, t) {
                                e !== t && (h.ngModel && p.$viewValue !== e && p.$setViewValue(e), r.displayElements.forminput.val(e))
                            }), h.taTargetToolbars) x = o.registerEditor(C, r, h.taTargetToolbars.split(","));
                        else {
                            var M = angular.element('<div text-angular-toolbar name="textAngularToolbar' + N + '">');
                            h.taToolbar && M.attr("ta-toolbar", h.taToolbar), h.taToolbarClass && M.attr("ta-toolbar-class", h.taToolbarClass), h.taToolbarGroupClass && M.attr("ta-toolbar-group-class", h.taToolbarGroupClass), h.taToolbarButtonClass && M.attr("ta-toolbar-button-class", h.taToolbarButtonClass), h.taToolbarActiveButtonClass && M.attr("ta-toolbar-active-button-class", h.taToolbarActiveButtonClass), h.taFocussedClass && M.attr("ta-focussed-class", h.taFocussedClass), c.prepend(M), e(M)(r.$parent), x = o.registerEditor(C, r, ["textAngularToolbar" + N])
                        }
                        r.$on("$destroy", function() {
                            o.unregisterEditor(C)
                        }), r.$on("ta-element-select", function(e, t) {
                            x.triggerElementSelect(e, t)
                        }), r.$on("ta-drop-event", function(e, t, n, i) {
                            r.displayElements.text[0].focus(), i && i.files && i.files.length > 0 && (angular.forEach(i.files, function(e) {
                                try {
                                    return r.fileDropHandler(e, r.wrapSelection) || r.fileDropHandler !== r.defaultFileDropHandler && r.defaultFileDropHandler(e, r.wrapSelection)
                                } catch (t) {
                                    l.error(t)
                                }
                            }), n.preventDefault(), n.stopPropagation())
                        }), r._bUpdateSelectedStyles = !1, r.updateSelectedStyles = function() {
                            var e;
                            void 0 !== (e = i.getSelectionElement()) && e.parentNode !== r.displayElements.text[0] ? x.updateSelectedStyles(angular.element(e)) : x.updateSelectedStyles(), r._bUpdateSelectedStyles && t(r.updateSelectedStyles, 200)
                        }, d = function() {
                            r._bUpdateSelectedStyles || (r._bUpdateSelectedStyles = !0, r.$apply(function() {
                                r.updateSelectedStyles()
                            }))
                        }, r.displayElements.html.on("keydown", d), r.displayElements.text.on("keydown", d), v = function() {
                            r._bUpdateSelectedStyles = !1
                        }, r.displayElements.html.on("keyup", v), r.displayElements.text.on("keyup", v), m = function(e, t) {
                            t && angular.extend(e, t), r.$apply(function() {
                                return x.sendKeyCommand(e) ? (r._bUpdateSelectedStyles || r.updateSelectedStyles(), e.preventDefault(), !1) : void 0
                            })
                        }, r.displayElements.html.on("keypress", m), r.displayElements.text.on("keypress", m), y = function() {
                            r._bUpdateSelectedStyles = !1, r.$apply(function() {
                                r.updateSelectedStyles()
                            })
                        }, r.displayElements.html.on("mouseup", y), r.displayElements.text.on("mouseup", y)
                    }
                }
            }]).factory("taBrowserTag", [function() {
                return function(e) {
                    return e ? "" === e ? void 0 === s ? "div" : 8 >= s ? "P" : "p" : 8 >= s ? e.toUpperCase() : e : 8 >= s ? "P" : "p"
                }
            }]).factory("taExecCommand", ["taSelection", "taBrowserTag", "$document", function(e, t, n) {
                var r = /(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)/gi,
                    s = /(ul|li|ol)/gi,
                    o = function(t, n) {
                        var r, s = t.find("li");
                        for (i = s.length - 1; i >= 0; i--) r = angular.element("<" + n + ">" + s[i].innerHTML + "</" + n + ">"), t.after(r);
                        t.remove(), e.setSelectionToElementEnd(r[0])
                    },
                    u = function(t, n) {
                        var r = angular.element("<" + n + ">" + t[0].innerHTML + "</" + n + ">");
                        t.after(r), t.remove(), e.setSelectionToElementEnd(r.find("li")[0])
                    },
                    a = function(n, r, s) {
                        var o = "";
                        for (i = n.length - 1; i >= 0; i--) o += "<" + t("li") + ">" + n[i].innerHTML + "</" + t("li") + ">";
                        var u = angular.element("<" + s + ">" + o + "</" + s + ">");
                        r.after(u), r.remove(), e.setSelectionToElementEnd(u.find("li")[0])
                    };
                return function(i) {
                    return i = t(i),
                        function(f, l, c) {
                            var h, p, v, m, y, w = angular.element("<" + i + ">"),
                                E = e.getSelectionElement(),
                                S = angular.element(E);
                            if (void 0 !== E) {
                                var x = E.tagName.toLowerCase();
                                if ("insertorderedlist" === f.toLowerCase() || "insertunorderedlist" === f.toLowerCase()) {
                                    var T = t("insertorderedlist" === f.toLowerCase() ? "ol" : "ul");
                                    if (x === T) return o(S, i);
                                    if ("li" === x && S.parent()[0].tagName.toLowerCase() === T && 1 === S.parent().children().length) return o(S.parent(), i);
                                    if ("li" === x && S.parent()[0].tagName.toLowerCase() !== T && 1 === S.parent().children().length) return u(S.parent(), T);
                                    if (x.match(r) && !S.hasClass("ta-bind")) return "ol" === x || "ul" === x ? u(S, T) : E.innerHTML.match(r) ? a(S.children(), S, T) : a(angular.element("<div>" + E.innerHTML + "</div>"), S, T);
                                    if (x.match(r)) {
                                        if (m = e.getOnlySelectedElements(), 1 === m.length && ("ol" === m[0].tagName.toLowerCase() || "ul" === m[0].tagName.toLowerCase())) return m[0].tagName.toLowerCase() === T ? o(angular.element(m[0]), i) : u(angular.element(m[0]), T);
                                        v = "";
                                        var N = [];
                                        for (h = 0; h < m.length; h++)
                                            if (3 !== m[h].nodeType) {
                                                var C = angular.element(m[h]);
                                                v += "<" + t("li") + ">" + C[0].innerHTML + "</" + t("li") + ">", N.unshift(C)
                                            }
                                        return p = angular.element("<" + T + ">" + v + "</" + T + ">"), N.pop().replaceWith(p), angular.forEach(N, function(e) {
                                            e.remove()
                                        }), void e.setSelectionToElementEnd(p[0])
                                    }
                                } else if ("formatblock" === f.toLowerCase() && "blockquote" === c.toLowerCase().replace(/[<>]/gi, "")) {
                                    for (p = "li" === x ? S.parent() : S; !p[0].tagName.match(r);) p = p.parent(), x = p[0].tagName.toLowerCase();
                                    if (x === c.toLowerCase().replace(/[<>]/gi, "")) {
                                        m = p.children();
                                        var k = !1;
                                        for (h = 0; h < m.length; h++) k = k || m[h].tagName.match(r);
                                        k ? (p.after(m), y = p.next(), p.remove(), p = y) : (w.append(p[0].childNodes), p.after(w), p.remove(), p = w)
                                    } else if (p.parent()[0].tagName.toLowerCase() !== c.toLowerCase().replace(/[<>]/gi, "") || p.parent().hasClass("ta-bind"))
                                        if (x.match(s)) p.wrap(c);
                                        else {
                                            if (m = e.getOnlySelectedElements(), 0 === m.length && (m = [p[0]]), v = "", 1 === m.length && 3 === m[0].nodeType) {
                                                for (var L = m[0].parentNode; !L.tagName.match(r);) L = L.parentNode;
                                                m = [L]
                                            }
                                            for (h = 0; h < m.length; h++) v += m[h].outerHTML;
                                            p = angular.element(c), p[0].innerHTML = v, m[0].parentNode.insertBefore(p[0], m[0]), angular.forEach(m, function(e) {
                                                e.parentNode.removeChild(e)
                                            })
                                        } else {
                                        var A = p.parent(),
                                            O = A.contents();
                                        for (h = 0; h < O.length; h++) A.parent().hasClass("ta-bind") && 3 === O[h].nodeType && (w = angular.element("<" + i + ">"), w[0].innerHTML = O[h].outerHTML, O[h] = w[0]), A.parent()[0].insertBefore(O[h], A[0]);
                                        A.remove()
                                    }
                                    return void e.setSelectionToElementEnd(p[0])
                                }
                            }
                            try {
                                n[0].execCommand(f, l, c)
                            } catch (M) {}
                        }
                }
            }]).directive("taBind", ["taSanitize", "$timeout", "$window", "$document", "taFixChrome", "taBrowserTag", "taSelection", "taSelectableElements", "taApplyCustomRenderers", function(e, t, n, i, o, f, c, h, p) {
                return {
                    require: "ngModel",
                    scope: {},
                    link: function(f, v, y, w) {
                        var E, S, x = void 0 !== v.attr("contenteditable") && v.attr("contenteditable"),
                            T = x || "textarea" === v[0].tagName.toLowerCase() || "input" === v[0].tagName.toLowerCase(),
                            N = !1,
                            C = !1;
                        void 0 === y.taDefaultWrap && (y.taDefaultWrap = "p"), "" === y.taDefaultWrap ? (E = "", S = void 0 === s ? "<div><br></div>" : s >= 11 ? "<p><br></p>" : 8 >= s ? "<P>&nbsp;</P>" : "<p>&nbsp;</p>") : (E = void 0 === s || s >= 11 ? "<" + y.taDefaultWrap + "><br></" + y.taDefaultWrap + ">" : 8 >= s ? "<" + y.taDefaultWrap.toUpperCase() + "></" + y.taDefaultWrap.toUpperCase() + ">" : "<" + y.taDefaultWrap + "></" + y.taDefaultWrap + ">", S = void 0 === s || s >= 11 ? "<" + y.taDefaultWrap + "><br></" + y.taDefaultWrap + ">" : 8 >= s ? "<" + y.taDefaultWrap.toUpperCase() + ">&nbsp;</" + y.taDefaultWrap.toUpperCase() + ">" : "<" + y.taDefaultWrap + ">&nbsp;</" + y.taDefaultWrap + ">"), v.addClass("ta-bind");
                        var L = function() {
                            if (x) return v[0].innerHTML;
                            if (T) return v.val();
                            throw "textAngular Error: attempting to update non-editable taBind"
                        };
                        if (f.$parent["updateTaBind" + (y.id || "")] = function() {
                                N || w.$setViewValue(L())
                            }, T)
                            if (x) {
                                if (v.on("cut", function(e) {
                                        N ? e.preventDefault() : t(function() {
                                            w.$setViewValue(L())
                                        }, 0)
                                    }), v.on("paste", function(e, t) {
                                        t && angular.extend(e, t);
                                        var r;
                                        if (e.clipboardData || e.originalEvent && e.originalEvent.clipboardData ? r = (e.originalEvent || e).clipboardData.getData("text/plain") : n.clipboardData && (r = n.clipboardData.getData("Text")), !r && !N) return !0;
                                        if (e.preventDefault(), !N) {
                                            var s = angular.element("<div></div>");
                                            if (s[0].innerHTML = r, r = s.text(), i[0].selection) {
                                                var o = i[0].selection.createRange();
                                                o.pasteHTML(r)
                                            } else i[0].execCommand("insertText", !1, r);
                                            w.$setViewValue(L())
                                        }
                                    }), v.on("keyup", function(e, t) {
                                        if (t && angular.extend(e, t), !N) {
                                            if ("" !== E && 13 === e.keyCode && !e.shiftKey) {
                                                var n = c.getSelectionElement();
                                                if (n.tagName.toLowerCase() !== y.taDefaultWrap && "li" !== n.tagName.toLowerCase() && ("" === n.innerHTML.trim() || "<br>" === n.innerHTML.trim())) {
                                                    var r = angular.element(E);
                                                    angular.element(n).replaceWith(r), c.setSelectionToElementStart(r[0])
                                                }
                                            }
                                            var i = L();
                                            "" !== E && "" === i.trim() && (v[0].innerHTML = E, c.setSelectionToElementStart(v.children()[0])), w.$setViewValue(i)
                                        }
                                    }), v.on("blur", function() {
                                        C = !1;
                                        var e = L();
                                        N || w.$setViewValue(e === S ? "" : L()), w.$render()
                                    }), y.placeholder && (s > 8 || void 0 === s)) {
                                    var A;
                                    if (!y.id) throw "textAngular Error: An unique ID is required for placeholders to work";
                                    A = u("#" + y.id + ".placeholder-text:before", 'content: "' + y.placeholder + '"'), f.$on("$destroy", function() {
                                        a(A)
                                    })
                                }
                                v.on("focus", function() {
                                    C = !0, w.$render()
                                })
                            } else v.on("paste cut", function() {
                                N || t(function() {
                                    w.$setViewValue(L())
                                }, 0)
                            }), v.on("change blur", function() {
                                N || w.$setViewValue(L())
                            });
                        var O = function(t) {
                            return w.$oldViewValue = e(o(t), w.$oldViewValue)
                        };
                        w.$parsers.push(O), w.$formatters.push(O);
                        var M = function(e) {
                                return f.$emit("ta-element-select", this), e.preventDefault(), !1
                            },
                            _ = function(e, n) {
                                if (n && angular.extend(e, n), !l && !N) {
                                    l = !0;
                                    var r;
                                    r = e.originalEvent ? e.originalEvent.dataTransfer : e.dataTransfer, f.$emit("ta-drop-event", this, e, r), t(function() {
                                        l = !1
                                    }, 100)
                                }
                            };
                        f.$parent["reApplyOnSelectorHandlers" + (y.id || "")] = function() {
                            N || angular.forEach(h, function(e) {
                                v.find(e).off("click", M).on("click", M)
                            })
                        }, w.$render = function() {
                            var e = w.$viewValue || "";
                            i[0].activeElement !== v[0] ? x ? (y.placeholder ? "" === e ? (C ? v.removeClass("placeholder-text") : v.addClass("placeholder-text"), v[0].innerHTML = E) : (v.removeClass("placeholder-text"), v[0].innerHTML = e) : v[0].innerHTML = "" === e ? E : e, N ? v.off("drop", _) : (angular.forEach(h, function(e) {
                                v.find(e).on("click", M)
                            }), v.on("drop", _))) : "textarea" !== v[0].tagName.toLowerCase() && "input" !== v[0].tagName.toLowerCase() ? v[0].innerHTML = p(e) : v.val(e) : x && v.removeClass("placeholder-text")
                        }, y.taReadonly && (N = f.$parent.$eval(y.taReadonly), N ? (v.addClass("ta-readonly"), ("textarea" === v[0].tagName.toLowerCase() || "input" === v[0].tagName.toLowerCase()) && v.attr("disabled", "disabled"), void 0 !== v.attr("contenteditable") && v.attr("contenteditable") && v.removeAttr("contenteditable")) : (v.removeClass("ta-readonly"), "textarea" === v[0].tagName.toLowerCase() || "input" === v[0].tagName.toLowerCase() ? v.removeAttr("disabled") : x && v.attr("contenteditable", "true")), f.$parent.$watch(y.taReadonly, function(e, t) {
                            t !== e && (e ? (v.addClass("ta-readonly"), ("textarea" === v[0].tagName.toLowerCase() || "input" === v[0].tagName.toLowerCase()) && v.attr("disabled", "disabled"), void 0 !== v.attr("contenteditable") && v.attr("contenteditable") && v.removeAttr("contenteditable"), angular.forEach(h, function(e) {
                                v.find(e).on("click", M)
                            }), v.off("drop", _)) : (v.removeClass("ta-readonly"), "textarea" === v[0].tagName.toLowerCase() || "input" === v[0].tagName.toLowerCase() ? v.removeAttr("disabled") : x && v.attr("contenteditable", "true"), angular.forEach(h, function(e) {
                                v.find(e).off("click", M)
                            }), v.on("drop", _)), N = e)
                        })), x && !N && (angular.forEach(h, function(e) {
                            v.find(e).on("click", M)
                        }), v.on("drop", _), v.on("blur", function() {
                            /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && (r = !0)
                        }))
                    }
                }
            }]).factory("taApplyCustomRenderers", ["taCustomRenderers", function(e) {
                return function(n) {
                    var r = angular.element("<div></div>");
                    return r[0].innerHTML = n, angular.forEach(e, function(e) {
                        var n = [];
                        e.selector && "" !== e.selector ? n = r.find(e.selector) : e.customAttribute && "" !== e.customAttribute && (n = t(r, e.customAttribute)), angular.forEach(n, function(t) {
                            t = angular.element(t), e.selector && "" !== e.selector && e.customAttribute && "" !== e.customAttribute ? void 0 !== t.attr(e.customAttribute) && e.renderLogic(t) : e.renderLogic(t)
                        })
                    }), r[0].innerHTML
                }
            }]).directive("taMaxText", function() {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(e, t, n, r) {
                        function i(e) {
                            var t = angular.element("<div/>");
                            t.html(e);
                            var n = t.text().length;
                            return s >= n ? (r.$setValidity("taMaxText", !0), e) : void r.$setValidity("taMaxText", !1)
                        }
                        var s = parseInt(e.$eval(n.taMaxText));
                        if (isNaN(s)) throw "Max text must be an integer";
                        n.$observe("taMaxText", function(e) {
                            if (s = parseInt(e), isNaN(s)) throw "Max text must be an integer";
                            r.$dirty && r.$setViewValue(r.$viewValue)
                        }), r.$parsers.unshift(i)
                    }
                }
            }).factory("taFixChrome", function() {
                var e = function(e) {
                    for (var t = angular.element("<div>" + e + "</div>"), n = angular.element(t).find("span"), r = 0; r < n.length; r++) {
                        var i = angular.element(n[r]);
                        i.attr("style") && i.attr("style").match(/line-height: 1.428571429;|color: inherit; line-height: 1.1;/i) && (i.attr("style", i.attr("style").replace(/( |)font-family: inherit;|( |)line-height: 1.428571429;|( |)line-height:1.1;|( |)color: inherit;/gi, "")), i.attr("style") && "" !== i.attr("style") || (i.next().length > 0 && "BR" === i.next()[0].tagName && i.next().remove(), i.replaceWith(i[0].innerHTML)))
                    }
                    var s = t[0].innerHTML.replace(/style="[^"]*?(line-height: 1.428571429;|color: inherit; line-height: 1.1;)[^"]*"/gi, "");
                    return s !== t[0].innerHTML && (t[0].innerHTML = s), t[0].innerHTML
                };
                return e
            }).factory("taSanitize", ["$sanitize", function(e) {
                return function(n, r) {
                    var i = angular.element("<div>" + n + "</div>");
                    angular.forEach(t(i, "align"), function(e) {
                        e.css("text-align", e.attr("align")), e.removeAttr("align")
                    }), n = i[0].innerHTML;
                    var s;
                    try {
                        s = e(n)
                    } catch (o) {
                        s = r || ""
                    }
                    return s
                }
            }]).directive("textAngularToolbar", ["$compile", "textAngularManager", "taOptions", "taTools", "taToolExecuteAction", "$window", function(e, t, n, r, i, s) {
                return {
                    scope: {
                        name: "@"
                    },
                    restrict: "EA",
                    link: function(o, u, a) {
                        if (!o.name || "" === o.name) throw "textAngular Error: A toolbar requires a name";
                        angular.extend(o, angular.copy(n)), a.taToolbar && (o.toolbar = o.$parent.$eval(a.taToolbar)), a.taToolbarClass && (o.classes.toolbar = a.taToolbarClass), a.taToolbarGroupClass && (o.classes.toolbarGroup = a.taToolbarGroupClass), a.taToolbarButtonClass && (o.classes.toolbarButton = a.taToolbarButtonClass), a.taToolbarActiveButtonClass && (o.classes.toolbarButtonActive = a.taToolbarActiveButtonClass), a.taFocussedClass && (o.classes.focussed = a.taFocussedClass), o.disabled = !0, o.focussed = !1, o._$element = u, u[0].innerHTML = "", u.addClass("ta-toolbar " + o.classes.toolbar), o.$watch("focussed", function() {
                            o.focussed ? u.addClass(o.classes.focussed) : u.removeClass(o.classes.focussed)
                        });
                        var f = function(t, n) {
                            var r;
                            if (r = angular.element(t && t.display ? t.display : "<button type='button'>"), r.addClass(o.classes.toolbarButton), r.attr("name", n.name), r.attr("unselectable", "on"), r.attr("ng-disabled", "isDisabled()"), r.attr("tabindex", "-1"), r.attr("ng-click", "executeAction()"), r.attr("ng-class", "displayActiveToolClass(active)"), r.on("mousedown", function(e, t) {
                                    return t && angular.extend(e, t), e.preventDefault(), !1
                                }), t && !t.display && !n._display && (r[0].innerHTML = "", t.buttontext && (r[0].innerHTML = t.buttontext), t.iconclass)) {
                                var i = angular.element("<i>"),
                                    s = r[0].innerHTML;
                                i.addClass(t.iconclass), r[0].innerHTML = "", r.append(i), s && "" !== s && r.append("&nbsp;" + s)
                            }
                            return n._lastToolDefinition = angular.copy(t), e(r)(n)
                        };
                        o.tools = {}, o._parent = {
                            disabled: !0,
                            showHtml: !1,
                            queryFormatBlockState: function() {
                                return !1
                            }
                        };
                        var l = {
                            $window: s,
                            $editor: function() {
                                return o._parent
                            },
                            isDisabled: function() {
                                return this.$eval("disabled") || this.$eval("disabled()") || "html" !== this.name && this.$editor().showHtml || this.$parent.disabled || this.$editor().disabled
                            },
                            displayActiveToolClass: function(e) {
                                return e ? o.classes.toolbarButtonActive : ""
                            },
                            executeAction: i
                        };
                        angular.forEach(o.toolbar, function(e) {
                            var t = angular.element("<div>");
                            t.addClass(o.classes.toolbarGroup), angular.forEach(e, function(e) {
                                o.tools[e] = angular.extend(o.$new(!0), r[e], l, {
                                    name: e
                                }), o.tools[e].$element = f(r[e], o.tools[e]), t.append(o.tools[e].$element)
                            }), u.append(t)
                        }), o.updateToolDisplay = function(e, t, n) {
                            var r = o.tools[e];
                            if (r) {
                                if (r._lastToolDefinition && !n && (t = angular.extend({}, r._lastToolDefinition, t)), null === t.buttontext && null === t.iconclass && null === t.display) throw 'textAngular Error: Tool Definition for updating "' + e + '" does not have a valid display/iconclass/buttontext value';
                                null === t.buttontext && delete t.buttontext, null === t.iconclass && delete t.iconclass, null === t.display && delete t.display;
                                var i = f(t, r);
                                r.$element.replaceWith(i), r.$element = i
                            }
                        }, o.addTool = function(e, t, n, i) {
                            o.tools[e] = angular.extend(o.$new(!0), r[e], l, {
                                name: e
                            }), o.tools[e].$element = f(r[e], o.tools[e]);
                            var s;
                            void 0 === n && (n = o.toolbar.length - 1), s = angular.element(u.children()[n]), void 0 === i ? (s.append(o.tools[e].$element), o.toolbar[n][o.toolbar[n].length - 1] = e) : (s.children().eq(i).after(o.tools[e].$element), o.toolbar[n][i] = e)
                        }, t.registerToolbar(o), o.$on("$destroy", function() {
                            t.unregisterToolbar(o.name)
                        })
                    }
                }
            }]).service("taToolExecuteAction", ["$q", function(e) {
                return function(t) {
                    void 0 !== t && (this.$editor = function() {
                        return t
                    });
                    var n = e.defer(),
                        r = n.promise,
                        i = this.$editor();
                    r["finally"](function() {
                        i.endAction.call(i)
                    });
                    var s;
                    try {
                        s = this.action(n, i.startAction())
                    } catch (o) {}(s || void 0 === s) && n.resolve()
                }
            }]).service("textAngularManager", ["taToolExecuteAction", "taTools", "taRegisterTool", function(e, t, n) {
                var r = {},
                    i = {};
                return {
                    registerEditor: function(n, s, o) {
                        if (!n || "" === n) throw "textAngular Error: An editor requires a name";
                        if (!s) throw "textAngular Error: An editor requires a scope";
                        if (i[n]) throw 'textAngular Error: An Editor with name "' + n + '" already exists';
                        var u = [];
                        return angular.forEach(o, function(e) {
                            r[e] && u.push(r[e])
                        }), i[n] = {
                            scope: s,
                            toolbars: o,
                            _registerToolbar: function(e) {
                                this.toolbars.indexOf(e.name) >= 0 && u.push(e)
                            },
                            editorFunctions: {
                                disable: function() {
                                    angular.forEach(u, function(e) {
                                        e.disabled = !0
                                    })
                                },
                                enable: function() {
                                    angular.forEach(u, function(e) {
                                        e.disabled = !1
                                    })
                                },
                                focus: function() {
                                    angular.forEach(u, function(e) {
                                        e._parent = s, e.disabled = !1, e.focussed = !0
                                    })
                                },
                                unfocus: function() {
                                    angular.forEach(u, function(e) {
                                        e.disabled = !0, e.focussed = !1
                                    })
                                },
                                updateSelectedStyles: function(e) {
                                    angular.forEach(u, function(t) {
                                        angular.forEach(t.tools, function(t) {
                                            t.activeState && (t.active = t.activeState(e))
                                        })
                                    })
                                },
                                sendKeyCommand: function(n) {
                                    var r = !1;
                                    return (n.ctrlKey || n.metaKey) && angular.forEach(t, function(t, i) {
                                        if (t.commandKeyCode && t.commandKeyCode === n.which)
                                            for (var o = 0; o < u.length; o++)
                                                if (void 0 !== u[o].tools[i]) {
                                                    e.call(u[o].tools[i], s), r = !0;
                                                    break
                                                }
                                    }), r
                                },
                                triggerElementSelect: function(e, n) {
                                    var r = function(e, t) {
                                            for (var n = !0, r = 0; r < t.length; r++) n = n && e.attr(t[r]);
                                            return n
                                        },
                                        i = [],
                                        o = {},
                                        a = !1;
                                    n = angular.element(n);
                                    var f = !1;
                                    if (angular.forEach(t, function(e, t) {
                                            e.onElementSelect && e.onElementSelect.element && e.onElementSelect.element.toLowerCase() === n[0].tagName.toLowerCase() && (!e.onElementSelect.filter || e.onElementSelect.filter(n)) && (f = f || angular.isArray(e.onElementSelect.onlyWithAttrs) && r(n, e.onElementSelect.onlyWithAttrs), (!e.onElementSelect.onlyWithAttrs || r(n, e.onElementSelect.onlyWithAttrs)) && (o[t] = e))
                                        }), f ? (angular.forEach(o, function(e, t) {
                                            e.onElementSelect.onlyWithAttrs && r(n, e.onElementSelect.onlyWithAttrs) && i.push({
                                                name: t,
                                                tool: e
                                            })
                                        }), i.sort(function(e, t) {
                                            return t.tool.onElementSelect.onlyWithAttrs.length - e.tool.onElementSelect.onlyWithAttrs.length
                                        })) : angular.forEach(o, function(e, t) {
                                            i.push({
                                                name: t,
                                                tool: e
                                            })
                                        }), i.length > 0)
                                        for (var l = i[0].tool, c = i[0].name, h = 0; h < u.length; h++)
                                            if (void 0 !== u[h].tools[c]) {
                                                l.onElementSelect.action.call(u[h].tools[c], e, n, s), a = !0;
                                                break
                                            }
                                    return a
                                }
                            }
                        }, i[n].editorFunctions
                    },
                    retrieveEditor: function(e) {
                        return i[e]
                    },
                    unregisterEditor: function(e) {
                        delete i[e]
                    },
                    registerToolbar: function(e) {
                        if (!e) throw "textAngular Error: A toolbar requires a scope";
                        if (!e.name || "" === e.name) throw "textAngular Error: A toolbar requires a name";
                        if (r[e.name]) throw 'textAngular Error: A toolbar with name "' + e.name + '" already exists';
                        r[e.name] = e, angular.forEach(i, function(t) {
                            t._registerToolbar(e)
                        })
                    },
                    retrieveToolbar: function(e) {
                        return r[e]
                    },
                    retrieveToolbarsViaEditor: function(e) {
                        var t = [],
                            n = this;
                        return angular.forEach(this.retrieveEditor(e).toolbars, function(e) {
                            t.push(n.retrieveToolbar(e))
                        }), t
                    },
                    unregisterToolbar: function(e) {
                        delete r[e]
                    },
                    updateToolsDisplay: function(e) {
                        var t = this;
                        angular.forEach(e, function(e, n) {
                            t.updateToolDisplay(n, e)
                        })
                    },
                    resetToolsDisplay: function() {
                        var e = this;
                        angular.forEach(t, function(t, n) {
                            e.resetToolDisplay(n)
                        })
                    },
                    updateToolDisplay: function(e, t) {
                        var n = this;
                        angular.forEach(r, function(r, i) {
                            n.updateToolbarToolDisplay(i, e, t)
                        })
                    },
                    resetToolDisplay: function(e) {
                        var t = this;
                        angular.forEach(r, function(n, r) {
                            t.resetToolbarToolDisplay(r, e)
                        })
                    },
                    updateToolbarToolDisplay: function(e, t, n) {
                        if (!r[e]) throw 'textAngular Error: No Toolbar with name "' + e + '" exists';
                        r[e].updateToolDisplay(t, n)
                    },
                    resetToolbarToolDisplay: function(e, n) {
                        if (!r[e]) throw 'textAngular Error: No Toolbar with name "' + e + '" exists';
                        r[e].updateToolDisplay(n, t[n], !0)
                    },
                    removeTool: function(e) {
                        delete t[e], angular.forEach(r, function(t) {
                            delete t.tools[e];
                            for (var n = 0; n < t.toolbar.length; n++) {
                                for (var r, i = 0; i < t.toolbar[n].length; i++) {
                                    if (t.toolbar[n][i] === e) {
                                        r = {
                                            group: n,
                                            index: i
                                        };
                                        break
                                    }
                                    if (void 0 !== r) break
                                }
                                void 0 !== r && (t.toolbar[r.group].slice(r.index, 1), t._$element.children().eq(r.group).children().eq(r.index).remove())
                            }
                        })
                    },
                    addTool: function(e, t, i, s) {
                        n(e, t), angular.forEach(r, function(n) {
                            n.addTool(e, t, i, s)
                        })
                    },
                    addToolToToolbar: function(e, t, i, s, o) {
                        n(e, t), r[i].addTool(e, t, s, o)
                    },
                    refreshEditor: function(e) {
                        if (!i[e]) throw 'textAngular Error: No Editor with name "' + e + '" exists';
                        i[e].scope.updateTaBindtaTextElement(), i[e].scope.$$phase || i[e].scope.$digest()
                    }
                }
            }]).service("taSelection", ["$window", "$document", function(e, t) {
                _document = t[0];
                var n = function(e) {
                        if (e.hasChildNodes()) return e.firstChild;
                        for (; e && !e.nextSibling;) e = e.parentNode;
                        return e ? e.nextSibling : null
                    },
                    r = function(e) {
                        var t = e.startContainer,
                            r = e.endContainer;
                        if (t === r) return [t];
                        for (var i = []; t && t !== r;) t = n(t), t.parentNode === e.commonAncestorContainer && i.push(t);
                        for (t = e.startContainer; t && t !== e.commonAncestorContainer;) t.parentNode === e.commonAncestorContainer && i.unshift(t), t = t.parentNode;
                        return i
                    };
                return {
                    getOnlySelectedElements: function() {
                        if (window.getSelection) {
                            var t = e.getSelection();
                            if (!t.isCollapsed) return r(t.getRangeAt(0))
                        }
                        return []
                    },
                    getSelectionElement: function() {
                        var t, n, r;
                        return _document.selection && _document.selection.createRange ? (t = _document.selection.createRange(), t.parentElement()) : e.getSelection && (n = e.getSelection(), n.getRangeAt ? n.rangeCount > 0 && (t = n.getRangeAt(0)) : (t = _document.createRange(), t.setStart(n.anchorNode, n.anchorOffset), t.setEnd(n.focusNode, n.focusOffset), t.collapsed !== n.isCollapsed && (t.setStart(n.focusNode, n.focusOffset), t.setEnd(n.anchorNode, n.anchorOffset))), t) ? (r = t.commonAncestorContainer, 3 === r.nodeType ? r.parentNode : r) : void 0
                    },
                    setSelectionToElementStart: function(t) {
                        if (_document.createRange && e.getSelection) {
                            var n = _document.createRange();
                            n.selectNodeContents(t), n.setStart(t, 0), n.setEnd(t, 0);
                            var r = e.getSelection();
                            r.removeAllRanges(), r.addRange(n)
                        } else if (_document.selection && _document.body.createTextRange) {
                            var i = _document.body.createTextRange();
                            i.moveToElementText(t), i.collapse(!0), i.moveEnd("character", 0), i.moveStart("character", 0), i.select()
                        }
                    },
                    setSelectionToElementEnd: function(t) {
                        if (_document.createRange && e.getSelection) {
                            var n = _document.createRange();
                            n.selectNodeContents(t), n.collapse(!1);
                            var r = e.getSelection();
                            r.removeAllRanges(), r.addRange(n)
                        } else if (_document.selection && _document.body.createTextRange) {
                            var i = _document.body.createTextRange();
                            i.moveToElementText(t), i.collapse(!1), i.select()
                        }
                    }
                }
            }])
        }()
}({}, function() {
    return this
}());
(function(e) {
    "use strict";

    function u(e, t, n, r) {
        e.beginPath();
        e.arc(t, n, r, 0, s, false);
        e.fill()
    }

    function a(e, t, n, r, i) {
        e.beginPath();
        e.moveTo(t, n);
        e.lineTo(r, i);
        e.stroke()
    }

    function f(e, t, n, r, i, o, a, f) {
        var l = Math.cos(t * s),
            c = Math.sin(t * s);
        f -= a;
        u(e, n - c * i, r + l * o + f * .5, a + (1 - l * .5) * f)
    }

    function l(e, t, n, r, i, s, o, u) {
        var a;
        for (a = 5; a--;) f(e, t + a / 5, n, r, i, s, o, u)
    }

    function c(e, t, n, r, i, s, o) {
        t /= 3e4;
        var u = i * .21,
            a = i * .12,
            f = i * .24,
            c = i * .28;
        e.fillStyle = o;
        l(e, t, n, r, u, a, f, c);
        e.globalCompositeOperation = "destination-out";
        l(e, t, n, r, u, a, f - s, c - s);
        e.globalCompositeOperation = "source-over"
    }

    function h(e, t, n, r, i, o, u) {
        t /= 12e4;
        var f = i * .25 - o * .5,
            l = i * .32 + o * .5,
            c = i * .5 - o * .5,
            h, p, d, v;
        e.strokeStyle = u;
        e.lineWidth = o;
        e.lineCap = "round";
        e.lineJoin = "round";
        e.beginPath();
        e.arc(n, r, f, 0, s, false);
        e.stroke();
        for (h = 8; h--;) {
            p = (t + h / 8) * s;
            d = Math.cos(p);
            v = Math.sin(p);
            a(e, n + d * l, r + v * l, n + d * c, r + v * c)
        }
    }

    function p(e, t, n, r, i, u, a) {
        t /= 15e3;
        var f = i * .29 - u * .5,
            l = i * .05,
            c = Math.cos(t * s),
            h = c * s / -16;
        e.strokeStyle = a;
        e.lineWidth = u;
        e.lineCap = "round";
        e.lineJoin = "round";
        n += c * l;
        e.beginPath();
        e.arc(n, r, f, h + s / 8, h + s * 7 / 8, false);
        e.arc(n + Math.cos(h) * f * o, r + Math.sin(h) * f * o, f, h + s * 5 / 8, h + s * 3 / 8, true);
        e.closePath();
        e.stroke()
    }

    function d(e, t, n, r, i, o, u) {
        t /= 1350;
        var a = i * .16,
            f = s * 11 / 12,
            l = s * 7 / 12,
            c, h, p, d;
        e.fillStyle = u;
        for (c = 4; c--;) {
            h = (t + c / 4) % 1;
            p = n + (c - 1.5) / 1.5 * (c === 1 || c === 2 ? -1 : 1) * a;
            d = r + h * h * i;
            e.beginPath();
            e.moveTo(p, d - o * 1.5);
            e.arc(p, d, o * .75, f, l, false);
            e.fill()
        }
    }

    function v(e, t, n, r, i, o, u) {
        t /= 750;
        var f = i * .1875,
            l = s * 11 / 12,
            c = s * 7 / 12,
            h, p, d, v;
        e.strokeStyle = u;
        e.lineWidth = o * .5;
        e.lineCap = "round";
        e.lineJoin = "round";
        for (h = 4; h--;) {
            p = (t + h / 4) % 1;
            d = Math.floor(n + (h - 1.5) / 1.5 * (h === 1 || h === 2 ? -1 : 1) * f) + .5;
            v = r + p * i;
            a(e, d, v - o * 1.5, d, v + o * 1.5)
        }
    }

    function m(e, t, n, r, i, o, u) {
        t /= 3e3;
        var f = i * .16,
            l = o * .75,
            c = t * s * .7,
            h = Math.cos(c) * l,
            p = Math.sin(c) * l,
            d = c + s / 3,
            v = Math.cos(d) * l,
            m = Math.sin(d) * l,
            g = c + s * 2 / 3,
            y = Math.cos(g) * l,
            b = Math.sin(g) * l,
            w, E, S, x;
        e.strokeStyle = u;
        e.lineWidth = o * .5;
        e.lineCap = "round";
        e.lineJoin = "round";
        for (w = 4; w--;) {
            E = (t + w / 4) % 1;
            S = n + Math.sin((E + w / 4) * s) * f;
            x = r + E * i;
            a(e, S - h, x - p, S + h, x + p);
            a(e, S - v, x - m, S + v, x + m);
            a(e, S - y, x - b, S + y, x + b)
        }
    }

    function g(e, t, n, r, i, s, o) {
        t /= 3e4;
        var u = i * .21,
            a = i * .06,
            f = i * .21,
            c = i * .28;
        e.fillStyle = o;
        l(e, t, n, r, u, a, f, c);
        e.globalCompositeOperation = "destination-out";
        l(e, t, n, r, u, a, f - s, c - s);
        e.globalCompositeOperation = "source-over"
    }

    function w(e, t, n, r, i, o, u) {
        var a = i / 8,
            f = a / 3,
            l = 2 * f,
            c = t % 1 * s,
            h = Math.cos(c),
            p = Math.sin(c);
        e.fillStyle = u;
        e.strokeStyle = u;
        e.lineWidth = o;
        e.lineCap = "round";
        e.lineJoin = "round";
        e.beginPath();
        e.arc(n, r, a, c, c + Math.PI, false);
        e.arc(n - f * h, r - f * p, l, c + Math.PI, c, false);
        e.arc(n + l * h, r + l * p, f, c + Math.PI, c, true);
        e.globalCompositeOperation = "destination-out";
        e.fill();
        e.globalCompositeOperation = "source-over";
        e.stroke()
    }

    function E(e, t, n, r, i, s, o, u, a) {
        t /= 2500;
        var f = y[o],
            l = (t + o - b[o].start) % u,
            c = (t + o - b[o].end) % u,
            h = (t + o) % u,
            p, d, v, m;
        e.strokeStyle = a;
        e.lineWidth = s;
        e.lineCap = "round";
        e.lineJoin = "round";
        if (l < 1) {
            e.beginPath();
            l *= f.length / 2 - 1;
            p = Math.floor(l);
            l -= p;
            p *= 2;
            p += 2;
            e.moveTo(n + (f[p - 2] * (1 - l) + f[p] * l) * i, r + (f[p - 1] * (1 - l) + f[p + 1] * l) * i);
            if (c < 1) {
                c *= f.length / 2 - 1;
                d = Math.floor(c);
                c -= d;
                d *= 2;
                d += 2;
                for (m = p; m !== d; m += 2) e.lineTo(n + f[m] * i, r + f[m + 1] * i);
                e.lineTo(n + (f[d - 2] * (1 - c) + f[d] * c) * i, r + (f[d - 1] * (1 - c) + f[d + 1] * c) * i)
            } else
                for (m = p; m !== f.length; m += 2) e.lineTo(n + f[m] * i, r + f[m + 1] * i);
            e.stroke()
        } else if (c < 1) {
            e.beginPath();
            c *= f.length / 2 - 1;
            d = Math.floor(c);
            c -= d;
            d *= 2;
            d += 2;
            e.moveTo(n + f[0] * i, r + f[1] * i);
            for (m = 2; m !== d; m += 2) e.lineTo(n + f[m] * i, r + f[m + 1] * i);
            e.lineTo(n + (f[d - 2] * (1 - c) + f[d] * c) * i, r + (f[d - 1] * (1 - c) + f[d + 1] * c) * i);
            e.stroke()
        }
        if (h < 1) {
            h *= f.length / 2 - 1;
            v = Math.floor(h);
            h -= v;
            v *= 2;
            v += 2;
            w(e, t, n + (f[v - 2] * (1 - h) + f[v] * h) * i, r + (f[v - 1] * (1 - h) + f[v + 1] * h) * i, i, s, a)
        }
    }
    var t, n;
    (function() {
        var r = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame,
            i = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || e.msCancelAnimationFrame;
        if (r && i) {
            t = function(e, t) {
                function i() {
                    n.value = r(i);
                    e()
                }
                var n = {
                    value: null
                };
                i();
                return n
            };
            n = function(e) {
                i(e.value)
            }
        } else {
            t = setInterval;
            n = clearInterval
        }
    })();
    var r = 500,
        i = .08,
        s = 2 * Math.PI,
        o = 2 / Math.sqrt(2);
    var y = [
            [-.75, -.18, -.7219, -.1527, -.6971, -.1225, -.6739, -.091, -.6516, -.0588, -.6298, -.0262, -.6083, .0065, -.5868, .0396, -.5643, .0731, -.5372, .1041, -.5033, .1259, -.4662, .1406, -.4275, .1493, -.3881, .153, -.3487, .1526, -.3095, .1488, -.2708, .1421, -.2319, .1342, -.1943, .1217, -.16, .1025, -.129, .0785, -.1012, .0509, -.0764, .0206, -.0547, -.012, -.0378, -.0472, -.0324, -.0857, -.0389, -.1241, -.0546, -.1599, -.0814, -.1876, -.1193, -.1964, -.1582, -.1935, -.1931, -.1769, -.2157, -.1453, -.229, -.1085, -.2327, -.0697, -.224, -.0317, -.2064, .0033, -.1853, .0362, -.1613, .0672, -.135, .0961, -.1051, .1213, -.0706, .1397, -.0332, .1512, .0053, .158, .0442, .1624, .0833, .1636, .1224, .1615, .1613, .1565, .1999, .15, .2378, .1402, .2749, .1279, .3118, .1147, .3487, .1015, .3858, .0892, .4236, .0787, .4621, .0715, .5012, .0702, .5398, .0766, .5768, .089, .6123, .1055, .6466, .1244, .6805, .144, .7147, .163, .75, .18],
            [-.75, 0, -.7033, .0195, -.6569, .0399, -.6104, .06, -.5634, .0789, -.5155, .0954, -.4667, .1089, -.4174, .1206, -.3676, .1299, -.3174, .1365, -.2669, .1398, -.2162, .1391, -.1658, .1347, -.1157, .1271, -.0661, .1169, -.017, .1046, .0316, .0903, .0791, .0728, .1259, .0534, .1723, .0331, .2188, .0129, .2656, -.0064, .3122, -.0263, .3586, -.0466, .4052, -.0665, .4525, -.0847, .5007, -.1002, .5497, -.113, .5991, -.124, .6491, -.1325, .6994, -.138, .75, -.14]
        ],
        b = [{
            start: .36,
            end: .11
        }, {
            start: .56,
            end: .16
        }];
    var S = function(e) {
        this.list = [];
        this.interval = null;
        this.color = e && e.color ? e.color : "black";
        this.resizeClear = !!(e && e.resizeClear)
    };
    S.CLEAR_DAY = function(e, t, n) {
        var r = e.canvas.width,
            s = e.canvas.height,
            o = Math.min(r, s);
        h(e, t, r * .5, s * .5, o, o * i, n)
    };
    S.CLEAR_NIGHT = function(e, t, n) {
        var r = e.canvas.width,
            s = e.canvas.height,
            o = Math.min(r, s);
        p(e, t, r * .5, s * .5, o, o * i, n)
    };
    S.PARTLY_CLOUDY_DAY = function(e, t, n) {
        var r = e.canvas.width,
            s = e.canvas.height,
            o = Math.min(r, s);
        h(e, t, r * .625, s * .375, o * .75, o * i, n);
        c(e, t, r * .375, s * .625, o * .75, o * i, n)
    };
    S.PARTLY_CLOUDY_NIGHT = function(e, t, n) {
        var r = e.canvas.width,
            s = e.canvas.height,
            o = Math.min(r, s);
        p(e, t, r * .667, s * .375, o * .75, o * i, n);
        c(e, t, r * .375, s * .625, o * .75, o * i, n)
    };
    S.CLOUDY = function(e, t, n) {
        var r = e.canvas.width,
            s = e.canvas.height,
            o = Math.min(r, s);
        c(e, t, r * .5, s * .5, o, o * i, n)
    };
    S.RAIN = function(e, t, n) {
        var r = e.canvas.width,
            s = e.canvas.height,
            o = Math.min(r, s);
        d(e, t, r * .5, s * .37, o * .9, o * i, n);
        c(e, t, r * .5, s * .37, o * .9, o * i, n)
    };
    S.SLEET = function(e, t, n) {
        var r = e.canvas.width,
            s = e.canvas.height,
            o = Math.min(r, s);
        v(e, t, r * .5, s * .37, o * .9, o * i, n);
        c(e, t, r * .5, s * .37, o * .9, o * i, n)
    };
    S.SNOW = function(e, t, n) {
        var r = e.canvas.width,
            s = e.canvas.height,
            o = Math.min(r, s);
        m(e, t, r * .5, s * .37, o * .9, o * i, n);
        c(e, t, r * .5, s * .37, o * .9, o * i, n)
    };
    S.WIND = function(e, t, n) {
        var r = e.canvas.width,
            s = e.canvas.height,
            o = Math.min(r, s);
        E(e, t, r * .5, s * .5, o, o * i, 0, 2, n);
        E(e, t, r * .5, s * .5, o, o * i, 1, 2, n)
    };
    S.FOG = function(e, t, n) {
        var r = e.canvas.width,
            o = e.canvas.height,
            u = Math.min(r, o),
            f = u * i;
        g(e, t, r * .5, o * .32, u * .75, f, n);
        t /= 5e3;
        var l = Math.cos(t * s) * u * .02,
            c = Math.cos((t + .25) * s) * u * .02,
            h = Math.cos((t + .5) * s) * u * .02,
            p = Math.cos((t + .75) * s) * u * .02,
            d = o * .936,
            v = Math.floor(d - f * .5) + .5,
            m = Math.floor(d - f * 2.5) + .5;
        e.strokeStyle = n;
        e.lineWidth = f;
        e.lineCap = "round";
        e.lineJoin = "round";
        a(e, l + r * .2 + f * .5, v, c + r * .8 - f * .5, v);
        a(e, h + r * .2 + f * .5, m, p + r * .8 - f * .5, m)
    };
    S.prototype = {
        add: function(e, t) {
            var n;
            if (typeof e === "string") e = document.getElementById(e);
            if (e === null) return;
            if (typeof t === "string") {
                t = t.toUpperCase().replace(/-/g, "_");
                t = S.hasOwnProperty(t) ? S[t] : null
            }
            if (typeof t !== "function") return;
            n = {
                element: e,
                context: e.getContext("2d"),
                drawing: t
            };
            this.list.push(n);
            this.draw(n, r)
        },
        set: function(e, t) {
            var n;
            if (typeof e === "string") e = document.getElementById(e);
            for (n = this.list.length; n--;)
                if (this.list[n].element === e) {
                    this.list[n].drawing = t;
                    this.draw(this.list[n], r);
                    return
                }
            this.add(e, t)
        },
        remove: function(e) {
            var t;
            if (typeof e === "string") e = document.getElementById(e);
            for (t = this.list.length; t--;)
                if (this.list[t].element === e) {
                    this.list.splice(t, 1);
                    return
                }
        },
        draw: function(e, t) {
            var n = e.context.canvas;
            if (this.resizeClear) n.width = n.width;
            else e.context.clearRect(0, 0, n.width, n.height);
            e.drawing(e.context, t, this.color)
        },
        play: function() {
            var e = this;
            this.pause();
            this.interval = t(function() {
                var t = Date.now(),
                    n;
                for (n = e.list.length; n--;) e.draw(e.list[n], t)
            }, 1e3 / 60)
        },
        pause: function() {
            var e;
            if (this.interval) {
                n(this.interval);
                this.interval = null
            }
        }
    };
    e.Skycons = S
})(this);
(function() {
    var e = angular.module("angularFileUpload", []);
    e.service("$upload", ["$http", "$q", "$timeout", function(e, t, n) {
        function r(r) {
            r.method = r.method || "POST";
            r.headers = r.headers || {};
            r.transformRequest = r.transformRequest || function(t, n) {
                if (window.ArrayBuffer && t instanceof window.ArrayBuffer) {
                    return t
                }
                return e.defaults.transformRequest[0](t, n)
            };
            var i = t.defer();
            if (window.XMLHttpRequest.__isShim) {
                r.headers["__setXHR_"] = function() {
                    return function(e) {
                        if (!e) return;
                        r.__XHR = e;
                        r.xhrFn && r.xhrFn(e);
                        e.upload.addEventListener("progress", function(e) {
                            i.notify(e)
                        }, false);
                        e.upload.addEventListener("load", function(e) {
                            if (e.lengthComputable) {
                                i.notify(e)
                            }
                        }, false)
                    }
                }
            }
            e(r).then(function(e) {
                i.resolve(e)
            }, function(e) {
                i.reject(e)
            }, function(e) {
                i.notify(e)
            });
            var s = i.promise;
            s.success = function(e) {
                s.then(function(t) {
                    e(t.data, t.status, t.headers, r)
                });
                return s
            };
            s.error = function(e) {
                s.then(null, function(t) {
                    e(t.data, t.status, t.headers, r)
                });
                return s
            };
            s.progress = function(e) {
                s.then(null, null, function(t) {
                    e(t)
                });
                return s
            };
            s.abort = function() {
                if (r.__XHR) {
                    n(function() {
                        r.__XHR.abort()
                    })
                }
                return s
            };
            s.xhr = function(e) {
                r.xhrFn = function(t) {
                    return function() {
                        t && t.apply(s, arguments);
                        e.apply(s, arguments)
                    }
                }(r.xhrFn);
                return s
            };
            return s
        }
        this.upload = function(t) {
            t.headers = t.headers || {};
            t.headers["Content-Type"] = undefined;
            t.transformRequest = t.transformRequest || e.defaults.transformRequest;
            var n = new FormData;
            var i = t.transformRequest;
            var s = t.data;
            t.transformRequest = function(e, n) {
                if (s) {
                    if (t.formDataAppender) {
                        for (var r in s) {
                            var o = s[r];
                            t.formDataAppender(e, r, o)
                        }
                    } else {
                        for (var r in s) {
                            var o = s[r];
                            if (typeof i == "function") {
                                o = i(o, n)
                            } else {
                                for (var u = 0; u < i.length; u++) {
                                    var a = i[u];
                                    if (typeof a == "function") {
                                        o = a(o, n)
                                    }
                                }
                            }
                            e.append(r, o)
                        }
                    }
                }
                if (t.file != null) {
                    var f = t.fileFormDataName || "file";
                    if (Object.prototype.toString.call(t.file) === "[object Array]") {
                        var l = Object.prototype.toString.call(f) === "[object String]";
                        for (var u = 0; u < t.file.length; u++) {
                            e.append(l ? f : f[u], t.file[u], t.fileName && t.fileName[u] || t.file[u].name)
                        }
                    } else {
                        e.append(f, t.file, t.fileName || t.file.name)
                    }
                }
                return e
            };
            t.data = n;
            return r(t)
        };
        this.http = function(e) {
            return r(e)
        }
    }]);
    e.directive("ngFileSelect", ["$parse", "$timeout", function(e, t) {
        return function(n, r, i) {
            var s = e(i["ngFileSelect"]);
            if (r[0].tagName.toLowerCase() !== "input" || (r.attr("type") && r.attr("type").toLowerCase()) !== "file") {
                var o = angular.element('<input type="file">');
                for (var u = 0; u < r[0].attributes.length; u++) {
                    o.attr(r[0].attributes[u].name, r[0].attributes[u].value)
                }
                if (r.attr("data-multiple")) o.attr("multiple", "true");
                o.css("top", 0).css("bottom", 0).css("left", 0).css("right", 0).css("width", "100%").css("opacity", 0).css("position", "absolute").css("filter", "alpha(opacity=0)");
                r.append(o);
                if (r.css("position") === "" || r.css("position") === "static") {
                    r.css("position", "relative")
                }
                r = o
            }
            r.bind("change", function(e) {
                var r = [],
                    i, o;
                i = e.__files_ || e.target.files;
                if (i != null) {
                    for (o = 0; o < i.length; o++) {
                        r.push(i.item(o))
                    }
                }
                t(function() {
                    s(n, {
                        $files: r,
                        $event: e
                    })
                })
            })
        }
    }]);
    e.directive("ngFileDropAvailable", ["$parse", "$timeout", function(e, t) {
        return function(n, r, i) {
            if ("draggable" in document.createElement("span")) {
                var s = e(i["ngFileDropAvailable"]);
                t(function() {
                    s(n)
                })
            }
        }
    }]);
    e.directive("ngFileDrop", ["$parse", "$timeout", "$location", function(e, t, n) {
        return function(r, i, s) {
            if ("draggable" in document.createElement("span")) {
                var o = null;
                i[0].addEventListener("dragover", function(n) {
                    n.stopPropagation();
                    n.preventDefault();
                    t.cancel(o);
                    if (!i[0].__drag_over_class_) {
                        if (s["ngFileDragOverClass"].search(/\) *$/) > -1) {
                            dragOverClassFn = e(s["ngFileDragOverClass"]);
                            var u = dragOverClassFn(r, {
                                $event: n
                            });
                            i[0].__drag_over_class_ = u
                        } else {
                            i[0].__drag_over_class_ = s["ngFileDragOverClass"] || "dragover"
                        }
                    }
                    i.addClass(i[0].__drag_over_class_)
                }, false);
                i[0].addEventListener("dragenter", function(e) {
                    e.stopPropagation();
                    e.preventDefault()
                }, false);
                i[0].addEventListener("dragleave", function(e) {
                    o = t(function() {
                        i.removeClass(i[0].__drag_over_class_);
                        i[0].__drag_over_class_ = null
                    }, s["ngFileDragOverDelay"] || 1)
                }, false);
                var u = e(s["ngFileDrop"]);
                i[0].addEventListener("drop", function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    i.removeClass(i[0].__drag_over_class_);
                    i[0].__drag_over_class_ = null;
                    f(e, function(t) {
                        u(r, {
                            $files: t,
                            $event: e
                        })
                    })
                }, false);

                function a(e) {
                    return /^[\000-\177]*$/.test(e)
                }

                function f(e, r) {
                    var i = [],
                        s = e.dataTransfer.items;
                    if (s && s.length > 0 && s[0].webkitGetAsEntry && n.protocol() != "file") {
                        for (var o = 0; o < s.length; o++) {
                            var u = s[o].webkitGetAsEntry();
                            if (u != null) {
                                if (a(u.name)) {
                                    c(i, u)
                                } else if (!s[o].webkitGetAsEntry().isDirectory) {
                                    i.push(s[o].getAsFile())
                                }
                            }
                        }
                    } else {
                        var f = e.dataTransfer.files;
                        if (f != null) {
                            for (var o = 0; o < f.length; o++) {
                                i.push(f.item(o))
                            }
                        }
                    }(function h(e) {
                        t(function() {
                            if (!l) {
                                r(i)
                            } else {
                                h(10)
                            }
                        }, e || 0)
                    })()
                }
                var l = 0;

                function c(e, t, n) {
                    if (t != null) {
                        if (t.isDirectory) {
                            var r = t.createReader();
                            l++;
                            r.readEntries(function(r) {
                                for (var i = 0; i < r.length; i++) {
                                    c(e, r[i], (n ? n : "") + t.name + "/")
                                }
                                l--
                            })
                        } else {
                            l++;
                            t.file(function(t) {
                                l--;
                                t._relativePath = (n ? n : "") + t.name;
                                e.push(t)
                            })
                        }
                    }
                }
            }
        }
    }])
})()