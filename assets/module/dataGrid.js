﻿/**
 * 数据列表组件
 * date:2019-08-10   License By http://easyweb.vip
 */
layui.define(["laytpl", "laypage"], function(E) {
	var d = layui.jquery,
		w = layui.laytpl,
		F = layui.laypage,
		y = {},
		z = {},
		r = {
			render: function(a) {
				function b(a) {
					function b(a) {
						if(c) {
							B();
							var b = d("#" + c.elem);
							b.click(function() {
								d(this).hasClass("ew-loading") || (c.first ? c.first = !1 : c.curr++, h(1), a({
									page: c.curr,
									limit: c.limit
								}, function(a) {
									0 == a.code ? (a.data.length < c.limit ? h(2) : h(0), 1 == c.curr && (g.html(""), m = []), e(a.data, (c.curr - 1) * c.limit, !0), l && l(a.data, c.curr, a.count)) : h(3)
								}))
							});
							b.trigger("click")
						} else f ? a({
								page: 1,
								limit: f.limit
							},
							function(b) {
								0 == b.code && (f.count = b.count, f.jump = function(b, c) {
									c || a({
										page: b.curr,
										limit: b.limit
									}, function(a) {
										0 == a.code && (e(a.data, (b.curr - 1) * b.limit), l && l(a.data, b.curr, b.count))
									})
								}, t(), e(b.data))
							}) : a({
							page: 1
						}, function(a) {
							0 == a.code && (e(a.data), l && l(a.data, 1, a.count))
						})
					}

					function t() {
						f.elem = "ew-datagrid-page-" + q.substring(1);
						g.after('<div class="ew-datagrid-page ' + f.class + '" id="' + f.elem + '"></div>');
						F.render(f)
					}

					function B() {
						c.elem = "ew-datagrid-page-" + q.substring(1);
						g.after('<div id="' + c.elem + '" class="ew-datagrid-loadmore ' +
							c.class + '"><div><span class="ew-icon-loading"><i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop"></i></span><span class="ew-loadmore-text">' + c.text + "</span></div></div>")
					}

					function h(a) {
						var b = d("#" + c.elem),
							f = b.find(".ew-loadmore-text");
						b.removeClass("ew-loading");
						0 == a ? f.html(c.text) : 1 == a ? (f.html(c.loadingText), b.addClass("ew-loading")) : 2 == a ? f.html(c.noMoreText) : f.html(c.errorText)
					}
					var k = a.data,
						A = a.reqData,
						f = a.page,
						c = a.loadMore,
						p = a.parseData,
						n = a.where,
						u = a.headers,
						v = a.method,
						w = a.request;
					c && (c = "object" == typeof c ? d.extend(x, c) : x);
					f && (f = "object" == typeof f ? d.extend(C, f) : C);
					g.html("");
					d(q + "+.ew-datagrid-loadmore").remove();
					d(q + "+.ew-datagrid-page").remove();
					k ? "string" == typeof k ? b(function(a, b) {
						g.addClass("ew-datagrid-loading");
						var c = r.deepClone(n);
						c[w.pageName] = a.page;
						c[w.limitName] = a.limit;
						var f = {
							url: k,
							data: c,
							headers: u,
							type: v,
							dataType: "json",
							success: function(a, c, f) {
								g.removeClass("ew-datagrid-loading");
								p && (a = p(a));
								b(a)
							},
							error: function(a) {
								f.success({
									code: a.status,
									msg: a.statusText
								})
							}
						};
						d.ajax(f)
					}) : c ? (B(), h(2), e(k), l && l(k, 1, k.length)) : f ? (f.count = k.length, f.jump = function(a, b) {
						var c = (a.curr - 1) * f.limit;
						b = c + f.limit;
						b > k.length && (b = k.length);
						for(var d = []; c < b; c++) d.push(k[c]);
						e(d, (a.curr - 1) * a.limit);
						l && l(d, a.curr, a.count)
					}, t()) : (e(k), l && l(k, 1, k.length)) : A && b(A)
				}

				function e(a, b, e) {
					void 0 == b && (b = 0);
					void 0 == e && (e = !1);
					for(var t = "", h = 0; h < a.length; h++) {
						var k = a[h];
						k.LAY_INDEX = h;
						k.LAY_NUMBER = h + b + 1;
						w(d(D).html()).render(k, function(a) {
							t += a
						})
					}
					if(e) {
						for(h = 0; h < a.length; h++) m.push(a[h]);
						g.append(t)
					} else m = a, g.html(t);
					p()
				}

				function p() {
					g.children().each(function(a) {
						var b = d(this);
						b.attr("data-index", a);
						b.addClass("ew-datagrid-item")
					})
				}
				var x = {
						class: "",
						first: !0,
						curr: 1,
						limit: 10,
						text: "\u52a0\u8f7d\u66f4\u591a",
						loadingText: "\u52a0\u8f7d\u4e2d...",
						noMoreText: "\u6ca1\u6709\u66f4\u591a\u6570\u636e\u4e86~",
						errorText: "\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5"
					},
					C = {
						class: "",
						limit: 10,
						layout: "prev page next skip count limit".split(" ")
					},
					n = d.extend({
						page: !1,
						loadMore: !1,
						where: {},
						headers: {},
						method: "GET",
						request: {
							pageName: "page",
							limitName: "limit"
						}
					}, a),
					q = n.elem,
					D = n.templet,
					l = n.done,
					u = n.onItemClick,
					v = n.onToolBarClick,
					g = d(q),
					m = [];
				"static" == g.css("position") && g.css("position", "relative");
				b(n);
				(function() {
					function a(a, b, e, h, k, g) {
						return {
							data: a,
							index: b,
							elem: e,
							event: h,
							e: k,
							del: function() {
								g.remove();
								m.splice(b, 1);
								p()
							},
							update: function(a) {
								a.LAY_INDEX = m[b].LAY_INDEX;
								a.LAY_NUMBER = m[b].LAY_NUMBER;
								m[b] = a;
								w(d(D).html()).render(a, function(a) {
									g.before(a);
									g.remove();
									p()
								})
							}
						}
					}
					g.off("click.dgItem").on("click.dgItem",
						">.ew-datagrid-item",
						function(b) {
							var e = d(this),
								g = e.data("index");
							u || (u = y[q.substring(1)]);
							u && u(a(m[g], g, b.currentTarget, void 0, b, e))
						});
					g.off("click.dgToolBar").on("click.dgToolBar", "[lay-event]", function(b) {
						b.stopPropagation();
						var e = d(this).parentsUntil(".ew-datagrid-item").parent(),
							g = e.data("index"),
							h = d(this).attr("lay-event");
						v || (v = z[q.substring(1)]);
						v && v(a(m[g], g, b.currentTarget, h, b, e))
					})
				})();
				return {
					data: m,
					reload: function(a) {
						b(d.extend(n, a))
					}
				}
			},
			onItemClick: function(a, b) {
				y[a] = b
			},
			onToolBarClick: function(a,
				b) {
				z[a] = b
			},
			deepClone: function(a) {
				var b = r.isClass(a);
				if("Object" === b) b = {};
				else if("Array" === b) b = [];
				else return a;
				for(var e in a) {
					var d = a[e];
					"Object" == r.isClass(d) ? b[e] = arguments.callee(d) : "Array" == r.isClass(d) ? b[e] = arguments.callee(d) : b[e] = a[e]
				}
				return b
			},
			isClass: function(a) {
				return null === a ? "Null" : void 0 === a ? "Undefined" : Object.prototype.toString.call(a).slice(8, -1)
			},
			autoRender: function() {
				d("[data-grid]").each(function() {
					var a = d(this),
						b = a.attr("id");
					b || (b = "ew-datagrid-" + d('[id^="ew-datagrid-"]').length +
						1, a.attr("id", b));
					var e = a.children("[data-grid-tpl]");
					if(0 < e.length) {
						e.attr("id", b + "-tpl");
						a.after(e[0].outerHTML);
						e.remove();
						a = d(this).attr("lay-data");
						if(a) try {
							var p = (new Function("return " + a))()
						} catch(x) {
							console.error("element property data- configuration item has a syntax error: " + a)
						}
						a = p;
						a.elem = "#" + b;
						a.templet = "#" + b + "-tpl";
						r.render(a)
					}
				})
			}
		};
	r.autoRender();
	d("head").append('<style id="ew-css-datagrid">.ew-datagrid-loadmore, .ew-datagrid-page {    text-align: center;}.ew-datagrid-loadmore {    color: #666;    cursor: pointer;}.ew-datagrid-loadmore > div {    padding: 12px;}.ew-datagrid-loadmore > div:hover {    background-color: rgba(0, 0, 0, .03);}.ew-datagrid-loadmore .ew-icon-loading {    margin-right: 6px;    display: none;}.ew-datagrid-loadmore.ew-loading .ew-icon-loading {    display: inline;}.ew-datagrid-loading:before {    content: "e63d";    font-family: layui-icon !important;    font-size: 32px;    color: #C3C3C3;    position: absolute;    left: 50%;    margin-left: -16px;    margin-top: -16px;    z-index: 999;    -webkit-animatione: layui-rotate 1s linear;    animation: layui-rotate 1s linear;    -webkit-animation-iteration-count: infinite;    animation-iteration-count: infinite;}</style>');
	E("dataGrid", r)
});