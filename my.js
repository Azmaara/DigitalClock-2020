/*!
 * my.js v1.4.2 b5
 * (c) 2019 Shinigami
 * Released under the MIT License.
 */
!function( global, factory ) {
	"use strict"
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(global, !0) :
	  typeof define === 'function' && define.amd ? define(factory) :
	  factory(global, !1)
	}(this, function (root, noGl) {
	"use strict"
	function isFunc (e) {
		return typeof e === 'function' && typeof e.nodeType !== 'number'
	}
	function isLikeArr (arr) {
		return !isFunc(arr) && arr !== root  && isObj(arr) && 'length' in arr
	}
	function isObj (obj) {
		return typeof obj === 'object' && obj !== null
	}
	function isNumber (n) {
		return isExists(n) && !Number.isNaN(n - 0)
	}
	function isExists (e) {
		return e !== null && e !== undefined
	}
	function isWin (e) {
		return e != null && e === e.window
	}
	function map (a, b, c, d, e) {
		return ((a - b) * (e - d))/(c - b) + d
	}
	function deflt (a, d) {
		return isExists(a) ? a : d
	}
	function crElem (s) {
		return DOM.createElement(s)
	}
	function crText (s) {
		return DOM.createTextNode(s)
	}
	function randInt (a) {
		return round(rand(a))
	}
	function rand (a) {
		return Math.random()*a
	}
	function randColor () {
		return 'rgb(' + [randInt(255), randInt(255), randInt(255)].join(',') + ')'
	}
	var hypot = typeof Math.hypot === 'function' ? Math.hypot : function () {
		var args = arguments, len = args.length, i = 0, result = 0;
		while (i < len)
			result += pow(args[i++], 2);
		return sqrt(result)
	}
	function crCanvas (r, t) {
	return my('<canvas>')
	.attr({width: r, height: t})
	.appendTo('body')[0]
	}
	//ownerDocument -- defaultView
	//XOR ^
	var isArr = Array.isArray,
		def = Object.defineProperty,
		DOM = document,
		DOMe = DOM.documentElement,
		slice = Array.prototype.slice,
		M = Math,
		window = (isWin(root) ? root : DOM.defaultView) || root,
		nav = window.navigator,
		regDel = /[^\x20\t\r\n\f]+/g,
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
		rhtml = /<|&#?\w+;/,
		selector = /[a-zA-Z_]|\.|#/,
		reg = /(?:(?:\d|\-\d)+\.)|(?:\d|\-\d)?/g,
		prefix = ' -webkit- -moz- -ms- -o- -khtml-'.split(' '),
		xprefix = /\-(?:webkit|moz|ms|o|khtml)\-/i,
		_prefix = prefix.length,
		rhash = /#.*$/,
		rquery = /\?/,
		rantiCache = /([?&])_=[^&]*/,
		rprotocol = /^\/\//, r20 = /%20/g,
		rnoContent = /^(?:GET|HEAD)$/,
	device = {
		fullLang: nav && nav.language,
		lang: nav && nav.language.slice(0, 2),
		navigator: nav,
		window: window,
		get network () {
			return nav && nav.onLine
		},
		get cookieEnabled () {
			return nav && nav.cookieEnabled
		},
		wW: function () {
			return window.innerWidth || DOMe.clientWidth || DOM.body.clientWidth
		},
		wH:function () {
			return window.innerHeight || DOMe.clientHeight || DOM.body.clientHeight
		},
		get ww() {
			return this.wW()
		},
		get wh() {
			return this.wH()
		},
		cookie: {
			get cookie() {
				return DOM.cookie
			},
			set cookie(e) {
				DOM.cookie = e
			},
			set: function () {
				var e = arguments;
				if(1 === e.length){
					var t = e[0];
					if(!isObj(t)) return;
					var i = t.key, n = t.value, r = t.expires || t.UTC, o = t.date, a = t.time, c = t.path, s = t.yourTime, u = (t.add || "").trim();
					if (u) {
						var f = parseFloat(u), l = 0;
	switch (u.replace(f, "").replace(/\+/g, "").trim()) {
		case "day": l = 864e5 * f;
			break;
		case "week": l = 6048e5 * f;
			break;
		case "hours": l = 36e5 * f;
			break;
		case "minutes": l = 6e4 * f;
			break;
		case "seconds": l = 1e3 * f
	}
		r = new Date(Date.now() + l)
						.toUTCString()
					}
					else if (o || a) r = new Date(s || deflt(o, "1/1/1") + " " + deflt(a, "")).toUTCString()
				}
				else i = e[0], n = e[1], r = new Date(e[2]).toUTCString(), c = e[3];
	
	return DOM.cookie = i + " = " + n + (r ? "; expires = " + r : "") + (c ? "; path = " + c : ""), this
			},
			get: function (e) {
				var t = DOM.cookie
						.split(";");
				for (var i in t) {
					var n = t[i].trim()
							.split("=");
					if(n[0] === e)
						return n.slice(1)
								.join("=")
				}
			},
			get count() {
				return DOM.cookie
					.split(";").length
			},
			each: function (e) {
				if(!DOM.cookie.match(/\S+/)) 
					return this;
				var t = DOM.cookie
						.split(";"), n, i
				for (i in t) {
					n = t[i].trim().split("=");
					if(!1 === e.call(
						n.slice(1).join("="),
						n[0],
						n.slice(1).join("="))
					) break;
				};
				
				return this
			},
			clear: function () {
				var i = this;
				return this.each(function (e, t) {
					i.set({
						key: e,
						value: "",
						add: "-1 seconds"
					})
	}), this
			},
			exists: function (t) {
				var i = !1;
				return this.each(function (e) {
					if(e === t) return ! (i = !0)
				}), i
			}
		}
	},
		isTouch = 'ontouchstart' in window || 'onmsgesturechange' in window,
	pi=M.PI,abs=M.abs,floor=M.floor,pow=M.pow,sqrt=M.sqrt,sin=M.sin,cos=M.cos,tan=M.tan,ceil=M.ceil,round=M.round,asin=M.asin,acos=M.acos,atan=M.atan,acot=M.atan2;
	function parse (e) {
	var n = (e.match(reg)||[]).join('') - 0,
	s = e.replace(reg, '');
	return {n: n, s: s, number: n, string: s}
	}
	!function (arr) {
	var args = arr.split(' '), count = args.length, i = 0, fn, gl = noGl ? my : root;
	while (i < count) {fn = args[i++]; gl[fn] = eval(fn); def(gl, fn, {enumerable: !1, writable: !1})}
	}('isFunc isArr isLikeArr isObj isExists map deflt randInt rand abs floor pow sqrt sin cos tan ceil round asin acos atan acot hypot randColor parse crElem crText crCanvas isTouch pi device')
	function addPx (e) {
		return isNumber(e) ? e + 'px' : e
	}
	function exists (str, key) {
		return str.indexOf(key) > -1
	}
	function stripedClass (str) {
		return (str.match(regDel) || []).join(' ')
	}
	function classToArray (val) {
		if (isArr(val)) return val;
		if (typeof val === 'string')
			return val.match(regDel) || [];
		return []
	}
	function Loop (e, fn) {
		var len = e.length, i = 0;
		while (i < len) fn.call(root, e[i], i++, e);
	}
	function toArr (e) {
		return isLikeArr(e) ? e : [e]
	}
	function htmlPrefilter (html) {
		return html.replace(rxhtmlTag, '<$1></$2>')
	}
	var wrapMap = {
		option: [1, "<select multiple='multiple'>", "</select>"],
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default: [ 0, "", "" ]
	}
	wrapMap.optgroup = wrapMap.option
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead
	wrapMap.th = wrapMap.td
	/*
	function domify (html) {
	var elems = DOM.createElement('div')
	elems.innerHTML = html
	var frag = DOM.createDocumentFragment(),
	scripts = elems.getElementsByTagName('script'),
	i = 0, length = scripts.length, script;
		while (i < length) {
			script = crElem('script')
			script.innerHTML = 
			scripts[i].innerHTML
			my(scripts[i++]).replace(script)
		}
	var all = elems.childNodes, elem;
		while (elem = all[0])
			frag.appendChild(elem);
	return frag
	}
	*/
	function domify (html) {
	var frag = DOM.createDocumentFragment(),
	tmp, tag, wrap, scripts, all, elem;
	
			tmp = DOM.createElement('div')
			tag = (rtagName.exec(html) || ['', ''])[1].toLowerCase()
		wrap = wrapMap[tag] || wrapMap._default
	
		tmp.innerHTML = wrap[1] + htmlPrefilter(html) + wrap[2]
	
			var j = wrap[0];
			while (j--) tmp = tmp.lastChild;
	
			scripts = tmp.getElementsByTagName('script')
		var i = 0, script, leng = scripts.length;
		while (i < leng) {
			elem = scripts[i++]
			script = DOM.createElement ('script')
				script.innerHTML = elem.innerHTML
			my(elem).replace(script)
		}
		all = tmp.childNodes;
		while (elem = all[0])
			frag.appendChild(elem);
	
		return frag
	}
	function targetHTML (html) {
		if (typeof html === 'string') {
			if ( rhtml.test (html) )
				return domify (my.trim(html));
			else return crText (html);
		} else return html;
	}
	function build (str) {
	return slice.call(domify (str).childNodes)
	}
	// scroll [Width | Height | Top | Left]
	var CustomEvent = function () {
	if ( typeof window.CustomEvent === "function" ) return window.CustomEvent;
	
	if ( typeof root.CustomEvent === "function" ) return root.CustomEvent;
	
	  function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = DOM.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	   }
	  CustomEvent.prototype = Event.prototype
	
	  return CustomEvent;
	}()
	function my(elem) {
		return new my.fn.init(elem)
	}
	my.fn = my.prototype = {
	constructor: my,
	init: function (elem) {
	var elems = [], i = 0, length;
	
	elem === undefined && (elem = DOM)
	if (typeof elem === 'string') {
		elem = my.trim(elem)
	
		elems = selector.test (elem[0]) ?
			DOM.querySelectorAll(elem) :
			build(elem)
	
		elem = elems[0]
	}
	else elems = isLikeArr(elem) ? elem : [elem];
	
	length = this.length = elems.length
	
		while (i < length)
			this[i] = elems[i++];
		//this[0] = elems[0] || elem
	},
	length: 0,
	getWindow: function () {
	return this[0].defaultView || this[0].ownerDocument.defaultView || window
	},
	eq: function (e) {return my(this[e < 0 ? this.length + e : e])},
	get: function (i) {
		return i == null ? slice.call(this) : this[i < 0 ? this.length + i : i]
	},
	first: function () {return this.eq(0)},
	last: function () {return this.eq(-1)},
	child: function (i) {
	var el = this[0]
		return my(arguments.length ? el.children[i < 0 ? el.children.length + i : i] : el.children)
	},
	each: function (e) {return my.each(this, e)},
	contents: function () {
	var el = this[0];
	if (el.nodeName === 'IFRAME')
		return el.contentDocument;
	if (el.nodeName === 'TEMPLATE')
		el = el.content || el;
	return my.merge([], el.childNodes)
	},
	prop: function (k, v) {
	var me = this[0]
		if(isObj(k)) return my.each(k, function (i, e) {me[i] = e}), this;
		if(v === undefined) return me[k];
		me[k] = v
	  return this
	},
	unProp: function (arr) {
	var me = this[0]
		Loop(classToArray(arr), function (i, e) {delete me[i]})
		return this
	},
	val: function (v) {
	var el = this[0], text = el.value
	if(!arguments.length) return text;
	isFunc(v) && (v = v.call(el, text))
	v !== undefined && (el.value = v)
	return this
	},
	text: function(v){
	var el = this[0], text = el.innerText
	if(!arguments.length) return text;
	isFunc(v) && (v = v.call(el, text))
	v !== undefined && (el.innerText = v)
	return this
	},
	html: function(v){
	var el = this[0], text = el.innerHTML
	if(!arguments.length) return text;
	isFunc(v) && (v = v.call(el, text))
	v !== undefined && (el.innerHTML = v)
	return this
	},
	find: function(q){return my(this[0].querySelectorAll(q))},
	trigger: function(n, d) {
	var elem = this[0];
	if ( elem.dispatchEvent )
		return elem.dispatchEvent(new CustomEvent(n, { bubbles: true, detail: d})), this;
	if ( elem.fireEvent )
		return elem.fireEvent(new CustomEvent(n, { bubbles: true, detail: d})), this;
		isArr(elem.myEvent) && 
		elem.myEvent.map(function (e) {
			e.eType === n && isFunc (e.callBack) && e.callBack.call(elem, {bubbles: true, detail: d})
		})
	return this
	},
	load: function () {
	var that = this, args = arguments, url = args[0], data = args[1], fn = args[2], length = args.length;
	
	if (length === 0)
		return this[0].load(), this;
	if (length === 1 && isFunc(url) )
		return this.on("load", url);
	if (length === 2 && isFunc(data))
		fn = data,
		data = undefined;
	
	return my.ajax({
		url: url,
		data: data,
		type: data ? "post" : "get",
		success: function (t) {
			that.empty().append(t)
			isFunc(fn) && fn.apply(this, arguments)
		},
		error: args[4]
	}), this
	},
	transition: function (e) {
	if (e === undefined)
		return this.css(my.prefix('transition'))
	
	this.css(my.prefix('transition'), function (val) {
		return my.trim(val) + ', ' + my.trim(e)
	})
		return this;
	},
	id: function(i){return this.prop('id', i)},
	class: function(g){return this.prop('className', g)},
	addClass: function (val) {
	var elem = this[0];
		if (isFunc(val))
			val = val.call(elem, elem.className);
		var lastClass = elem.className
		
		var custom = ' ' + 
				stripedClass(lastClass) +
				' '
		var clasess = classToArray (val)
		
		var i = 0, clazz;
		while (clazz = clasess[i++]) {
			if (custom.indexOf (
				' ' + clazz + ' '
			) < 0) 
				custom += clazz + ' ';
		}
		custom = stripedClass (custom)
		
		if (lastClass !== custom)
			elem.className = custom;
		return this;
	},
	removeClass: function (val) {
	var elem = this[0];
		if (isFunc(val))
			val = val.call(elem, elem.className);
		var lastClass = elem.className
		
		var custom = ' ' + stripedClass(lastClass) + ' '
		var clasess = classToArray (val)
		
		var i = 0, clazz;
		while (clazz = clasess[i++]) {
			if (custom.indexOf (' ' + clazz + ' ') > -1) 
				custom = custom.replace(' ' + clazz + ' ', ' ');
		}
		custom = stripedClass (custom)
		
		if (lastClass !== custom)
			elem.className = custom;
		return this;
	},
	toggleClass: function (val) {
	var elem = this[0];
		if (isFunc(val))
			val = val.call(elem, elem.className);
		var lastClass = elem.className
		
		var custom = ' ' + 
				stripedClass(lastClass) +
				' '
		var clasess = classToArray (val)
		
		var i = 0, clazz;
		while (clazz = clasess[i++]) {
			if (custom.indexOf (
				' ' + clazz + ' '
			) < 0) 
				custom += clazz + ' ';
			else custom = custom.replace(' ' + clazz + ' ', ' ');
		}
		
		custom = stripedClass (custom)
		
		if (lastClass !== custom)
			elem.className = custom;
		return this;
	},
	hasClass: function (val) {
	var elem = this[0];
		if (isFunc(val))
			val = val.call(elem, elem.className);
		return (' ' + stripedClass(elem.className) + ' ').indexOf (' ' + val + ' ') > -1
	},
	before: function () {
	var elem = this[0];
	Loop(arguments, function (e) {
		Loop(toArr(e), function (f) {
			elem.parentNode
			.insertBefore(
				targetHTML(f),
				elem
			)
		})
	})
	return this
	},
	after: function () {
	var elem = this[0];
	Loop(arguments, function (e) {
		Loop(toArr(e), function (f) {
			elem.parentNode
			.insertBefore(
				targetHTML(f),
				elem.nextSibling
			)
		})
	})
	return this
	},
	append: function () {
	var elem = this[0];
	Loop(arguments, function (e) {
		Loop(toArr(e), function (f) {
			elem.appendChild(
				targetHTML(f)
			)
		})
	})
	return this
	},
	prepend: function () {
	var elem = this[0];
	Loop(arguments, function (e) {
		Loop(toArr(e), function (f) {
			elem.firstChild === null ? 
				elem.appendChild(
					targetHTML(e)
				) :
				elem.insertBefore(
					targetHTML(e),
					elem.firstChild
				)
		})
	})
	return this
	},
	appendTo: function (e) {
	return my(e).append(this[0]), this
	},
	prependTo: function (e) {
	return my(e).prepend(this[0]), this
	},
	tag: function(){return (( this[0] || '' ).tagName || '').toLowerCase()},
	childCount: function () {return (this[0] || '').childElementCount},
	event: function (name, fn, opt) {
	var that = this, elem = this[0];
	
	isFunc(fn) && Loop(classToArray(name), function (e) {
		that._event_(e, fn, opt)
		isArr(elem.myEvent) || (elem.myEvent = [])
		elem.myEvent.push({
			eType: e,
			callBack: fn,
			more: opt
		})
	})
	return my.extend(this, {
		prevent: function (fn, opt) {
			return that.on(name, function (n) {
				try {
					n.preventDefault()
				} catch (e) {}
				if ( isFunc(fn) )
					return fn.call(this, n)
			}, opt)
		},
		stop: function (fn, opt) {
			return that.on(name, function (n) {
				try {
					n.stopPropagation()
				} catch (e) {}
				if( isFunc(t) )
					return fn.call(this, n)
			}, opt)
		},
		then: function (fn, opt) {	
			return that.on(name, fn, opt)
		}
	})
	},
	unEvent: function (name, fn, opt) {
	var that = this, elem = this[0];
	if(isFunc(fn))
		Loop(classToArray(name), function (w) {
			that._unEvent_(w, fn, opt)
		});
	else if (isArr(elem.myEvent)) {
		if (isExists(name))
			Loop(classToArray(name), function (e) {
				elem.myEvent = elem.myEvent.filter(function (f) {
					if (f.eType === e)
						that._unEvent_(
							f.eType,
							f.callBack,
							f.more
						)
					else return !0;
				})
			})
		else {
			Loop(elem.myEvent, function (w) {
				that._unEvent_(
					w.eType,
					w.callBack,
					w.more
				)
		})
		delete elem.myEvent
		}
	}
	return this
	},
	one: function (name, fn, opt) {
	var that = this
	isFunc(fn) && Loop(classToArray(name), function (w) {
	that.on(w, m, opt)
		function m (e){
			var tmp = fn.call(this, e)
			that.off(w, m, opt)
			return tmp
		}
	})
	return my.extend(this, {
		prevent: function (fn, opt) {
			return that.one(name, function (n) {
				try {
					n.preventDefault()
				} catch (e) {}
				if( isFunc(fn) )
					return fn.call(this, n);
			})
		},
		stop: function (fn, opt) {
			return that.one(name, function (n) {
				try {
					n.stopPropagation()
				} catch (e) {}
				if( isFunc(fn) )
					return fn.call(this, n);
			}, opt)
		},
		then: function (fn, opt) {
			return that.one(name, fn, opt)
		}
	})
	},
	_event_: function (a, b, c) {
	//attachEvent()
	return this[0].addEventListener(a, b, c), this
	},
	_unEvent_: function (a, b, c) {
	//detachEvent()
	return this[0].removeEventListener(a, b, c), this
	},
	css: function (k, v) {
	var el = this[0]
		if (isObj(k)) {
			for(var i in k) 
				this.css(i, k[i]);
		}
		else if(arguments.length === 1) 
			return (el.currentStyle || this.getWindow().getComputedStyle(el)).getPropertyValue(k);
		else {
			isFunc(v) && (v = v.call(el, this.css(k)))
			v !== undefined && (el.style[k] = v)
		}
	 return this
	},
	remove: function () {this[0].remove()},
	clone: function(a, b){return this[0].cloneNode(deflt(a, true), b)},
	replace: function(j){
	if (Element.prototype.replaceChild)
		this.parent()[0]
		.replaceChild(j, this[0]);
	else {
		this.parent()[0]
		.insertBefore (j, this[0])
	this.remove()
	}
	return this.constructor(j)
	},
	hasEmpty: function() {return isWin(el) ? !0 : !this[0].hasChildNodes()},
	parent: function () {
		return my(this[0].parentNode)
	},
	sibling: function (i) {
	var node = this[0].parentNode.children;
		return my(arguments.length ? node[i < 0 ? node.length + i : i] : node)
	},
	next: function(){
		return my(this[0].nextElementSibling || this[0].nextSibling)
	},
	prev: function(){
		return my(this[0].previousElementSibling || this[0].previosSibling)
	},
	nextAll: function () {
		var el = this[0].nextElementSibling || this[0].nextSibling, node = [el];
		while (el = el.nextElementSibling || el.nextSibling)
			node.push(el);
		return my(node)
	},
	prevAll: function () {
		var el = this[0].previousElementSibling || this[0].previosSibling, node = [el];
		while (el = el.previousElementSibling || el.previosSibling)
			node.push(el);
		return my(node)
	},
	toArray: function () {
		return slice.call(this)
	},
	firstChild: function(){
		return my(this[0].firstChild)
	},
	lastChild: function(){
		return my(this[0].lastChild)
	},
	empty: function(){return this.html('')},
	displayToggle: function(){
		   return this.css('display', function (e) {return e === 'none' ? 'block' : 'none'})
	},
	attr: function (key, val) {
		if(isObj(key)) {
			for(var i in key)
				this.attr(i, key[i]);
		}
		else if(arguments.length === 1)
			return this[0].getAttribute(key);
		else {
			isFunc(val) && (val = val.call(this[0], this.attr(key)))
			val !== undefined && this[0].setAttribute(key, val)
		}
	return this
	},
	unAttr: function (key) {
		var el = this[0]
		return Loop(classToArray(key), function (e) {el.removeAttribute(e)}), el
	},
	hasAttr: function(j){return this[0].hasAttribute(j)},
	data: function (type, val) {
		if ( isObj(type) ) {
			for(var i in type)
				this.data(i, type[i]);
		}
		else if (arguments.length === 1)
			return this.attr('data-' + type);
	
		isFunc(val) && (val = val.call(this[0], this.data(type)))
	
		val !== undefined && this.attr('data-' + type, val)
	
		return this
	},
	unData: function (key) {
		var _ = this
		return Loop(classToArray(key), function (e) {
			_.unAttr('data-' + e)
		}), _
	},/*
	width: function (t) {
	var el = this[0], rect;
	if ( !el.getClientRects().length )
		return 0;
			rect = el.getBoundingClientRect();
		return t === undefined ? rect.width : this.css("width", addPx(t))
	},
	height: function(t){
	var el = this[0], rect;
	if ( !el.getClientRects().length )
		return 0;
			rect = el.getBoundingClientRect();
		return t === undefined ? rect.height : this.css("height", addPx(t))
	},*/
	bounding: function () {
		if (this[0].getClientRects().length)
		return this[0].getBoundingClientRect();
		return {};
	},
	clientRects: function () {
		return this[0]
			.getBoundingClientRect();
	},
	offset: function () {
	
	var elem = this[0], rect, win, args = arguments, x, y;
	
	if (args.length && !(typeof args[0] === 'string' && Number.isNaN(args[0] - 0))) {
		this.position() === 'static' && this.position('relative')
	
		if (isObj(args[0])) {
			x = args[0].x || args[0].left || args[0].X
			 y = args[0].y || args[0].top || args[0].Y
		}
		else x = args[0], y = args[1];
		
		isExists(y) && this.css('top', addPx(y))
		isExists(x) && this.css('left', addPx(x))
		return this
	}
	
	if ( !elem.getClientRects().length )
		return { top: 0, left: 0 };
			// Get document-relative position by adding viewport scroll to viewport-relative gBCR
			rect = elem.getBoundingClientRect();
			win = elem.ownerDocument.defaultView;
			return {
				top: rect.top + win.pageYOffset,
				left: rect.left + win.pageXOffset,
				width: elem.offsetWidth,
				height: elem.offsetHeight
			};
	},
	typing: function (t) {
	if(isObj(t)) var s = t.space, space = isExists(s) && s !== false ? '<span style=font:initial>' + (typeof s === 'boolean' ? '|' : s) + '</span>' : '', t = t.delay; 
	var str = this.html(), len = str.length, that = this;
	this.empty()
	var saved = deflt(t, 200), space = deflt(space, '');
	typing(0)
		function typing (j) {
			if(j > len) return that.trigger('my.typing.done');
	 setTimeout(function (){
			var su = str.slice(0, j + 1), m = str.indexOf('>', j), l = su[su.length - 1];
		if(l == '<') j = m + 1;
		else if(exists('.!?', l)) t = saved * 3;
		else if(l == ',') t = saved * 2;
		else t = saved;
			var su = str.slice(0, j + 1)
			that.html(su + (j === len - 1 ? '' : space))
			typing(++j)
	 }, deflt(t, 200))
		}
	  return this
	},
	select: function (fn) {
	if(isFunc(fn)) return this.on('select', fn);
	var me = this[0]
		if(/input|textarea/.test(this.tag())) {
			me.select()
			me.setSelectionRange(0, this.val().length)
				  return this.val()
		} 
		if('select' === this.tag()) {
			me.focus()
				  return this.val()
		}
			var range = DOM.createRange()
			var select = DOM.getSelection()
			range.selectNodeContents(me)
			select.removeAllRanges()
			select.addRange(range)
				return select
	},
	hover: function(e,n){return this.mouseover(e).mouseout(n||e)},
	index: function(){return Array.prototype.indexOf.call(this.sibling(),this[0])},
	matches: function (e) {
	return (
	this[0].webkitMatchesSelector || 
	this[0].msMatchesSelector || 
	this[0].mozMatchesSelector || 
	this[0].oMatchesSelector || 
	this[0].matchesSelector
	).call(this[0], e)
	},
	closest: function (e) {
	if (Element.prototype.closest) 
		return my(this[0].closest(e));
	else 
	  return my((function(s) {
		var el = this;
		do {
		  if (my(el).matches(s)) return el;
		  el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	  }).call(this[0], e));
	},
	direct: function (fn) {
	var obj = {}
	return this.on(my.fx.start, function (e) {
			obj.lastX = ((e.changedTouches || [])[0]||e).clientX
		 obj.lastY = ((e.changedTouches || [])[0]||e).clientY
		})
		.on(my.fx.move, function (e) {
			var x = ((e.changedTouches || [])[0]||e).clientX, y = ((e.changedTouches || [])[0]||e).clientY, dX = x - obj.lastX, dY = y - obj.lastY;
			obj.direct = abs(dX) >= abs(dY) ? 0 < dX ? "right" : "left" : 0 < dY ? "bottom" : "top"
			obj.direction = abs(dX) >= abs(dY) ? 0 < dX ? "Right" : "Left" : 0 < dY ? "Down" : "Up"
				obj.nowX = x, obj.nowY = y
				fn.call(this, obj, e)
		})
	}
	}
	my.fn.extend = my.extend = function () {
		var args = arguments, target = args[0], length = args.length, noChild = false, i = 1, opt, src, copy, Arr = false, clone;
		if(typeof target === 'boolean')
				noChild = target,
				target = args[i],
				i++;
		if(length === i) target = this, i--;
		if(typeof target !== 'object' && !isFunc(target)) target = {};
		for(; i < length; i++)
		  if((opt = args[i]) != null)
			for(var key in opt) {
				src = target[key]
				copy = opt[key]
				if(src === copy) continue;
				if(noChild && copy && ((Arr = isArr(copy)) || isObj(copy))) {
	   //giá»¯ tÃ­nh cháº¥t
	   Arr ? (
			   clone = src && isArr(src) ? src : [], Arr = !1
	   ) : (
			   clone = src && isObj(src) ? src : {}
	   )
	   target[key] = my.extend(!0, clone, copy)
	} else if(copy !== undefined) target[key] = copy;
			};;
		return target
	}
	my.fn.on = my.fn.event
	my.fn.off = my.fn.unEvent
	my.fn.once = my.fn.one
	my.fn.init.prototype = my.fn
	my.extend({
	merge: function (one, two) {
			var i = one.length,
				 j = 0,
				   len = two.length;
			   for (; j < len; j++) 
				   one [i++] = two [j];
			   one.length = i
		   return one
	},
	isCss: function (r) {return DOMe.style[r]!=null},
	prefixCss: function (r) {
	r = r.replace(xprefix, '')
	var i = 0;
	while(i < _prefix) {if(my.isCss(prefix[i] + r)) return prefix[i] + r; i++}
		return undefined
	},
	XML: {parse:function(e){
	try {
	return new DOMParser().parseFromString(e,"text/xml")
	} catch (e) {return undefined}
	},
	stringify:function(e){return e.outerHTML||e.documentElement.outerHTML}},
	$clone: function (r) {
		return r.nodeType === 1 ? r.cloneNode(!0) : JSON.parse(JSON.stringify(r))
	},
	isEmptyObj: function (a) {
		for(var i in a) return false;
	return true
	},
	isWindow: isWin,
	param: function (str) {
	var dstr = [], is = isArr(str);
	my.each(str, function (key, val) {
	is && (key = this.name, val = this.value)
		val = isFunc(val) ? val() : val
		dstr.push(
			encodeURIComponent(key) 
			+ '=' + 
			encodeURIComponent(val == null ? '' : val)
		)
	})
	  return dstr.join('&')
	},
	each: function(arr, callback) {
	var len, i = 0;
		if(isLikeArr(arr)) {
			   len = arr.length
			 for(; i < len; i++)
				if(callback.call(arr[i], i, arr[i]) === false) break;;
		} else {
			for(i in arr) 
				if(callback.call(arr[i], i, arr[i]) === false) break;;
		}
	  return arr
	},
	getText: function (url, timeout) {
	var n, xhr;
	try {
		xhr = new XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP")
		xhr.open("get", url, !1)
		xhr.onreadystatechange = function () {
		this.readyState === 4 && (n = this.responseText)
		}
		isNumber(timeout) && (xhr.timeout = timeout)
		xhr.send()
	}
	catch (e) {}
	return n
	},
	strips: function (str) {
		return str.replace(/(\!|"|\#|\$|\%|\&|\\|'|\(|\)|\*|\+|,|-|\.|\:|;|\<|\=|\>|\?|\@|\[|\]|\^|\`|\{|\}|\~|\Â¡|\Â¿)/g, '\\$1')
	},
	ajax: function (opt) {
	if(!isObj(opt)) throw new Error("Not exists ajaxSetting in Ajax");
	
	var xhr = new XMLHttpRequest || new ActiveXObject("Microsoft.XMLHTTP"),
	
	type = (opt.type || 'GET').toUpperCase(),
	
	dataType = (opt.dataType || 'TEXT').toUpperCase(),
	
	cache, uncached,
	
	headers = opt.headers || {};
	
	opt.url = ((opt.url || location.href) + '')
			.replace( rprotocol, location.protocol + "//" )
	opt.processData === undefined && (opt.processData = true)
	
	type !== "GET" && opt.contentType !== false && xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	
	'contentType' in opt && typeof opt.contentType !== 'boolean' && xhr.setRequestHeader("Content-Type", n.contentType)
	
	my.each(headers, function (key, val) {
		xhr.setRequestHeader(key, val)
	})
	
	if (opt.data && opt.processData && typeof opt.data !== "string")
		opt.data = my.param(opt.data);
	
	if (rnoContent.test( type )) {
		cache = opt.url.replace(rhash, '')
		uncached = opt.url.slice(cache.length)
	
		if (opt.data && (opt.processData || typeof opt.data === "string")) {
			cache += (rquery.test(cache) ? "&" : "?" ) + opt.data;
			delete opt.data;
		}
		
		if (opt.cache === false) {
			cache = cache.replace(rantiCache, "$1" );
			uncached = (rquery.test(cache) ? "&" : "?" ) + "_=" + Date.now() + uncached;
		}
	
		opt.url = cache + uncached
	} else if (opt.data && opt.processData && (opt.contentType || "" ).indexOf("application/x-www-form-urlencoded") === 0)
		opt.data = opt.data.replace( r20, "+" );
	
	xhr.open(type, opt.url, deflt(opt.async, true), opt.username, opt.password)
	
	Number.isNaN(opt.timeout - 0) || (xhr.timeout = opt.timeout - 0)
	
	isFunc(opt.abort) && opt.abort(xhr) === true && xhr.abort()
	
	isFunc(opt.beforeSend) && opt.beforeSend(xhr)
	
	my(xhr).on("error timeout abort", function (t) {
		my(this).trigger("ajax.fail", {
			status: xhr.status,
			statusText: xhr.statusText,
			xhr: xhr
		})
		isFunc(opt.error) && opt.error.call(this, status, this.statusText, this)
		isFunc(opt.completed) && opt.completed.call(this, this)
	
	})
	.on("readystatechange", function(){
	var data = dataType === 'XML' ? xhr.responseXML : dataType === 'TEXT' ? xhr.responseText : xhr.responseType || xhr.response,
	status = xhr.status,
	state = xhr.readyState;
	
	if (state === 4) {
		my(xhr).trigger('ajax.done',{
			data: data,
			xhr: xhr
		})
		isFunc(opt.success) && opt.success.call(this, data, xhr)
		isFunc(opt.completed) && opt.completed.call(this, data, xhr)
	}
	
	if (state === 4 && (status >= 200 && status < 300 || status === 304)) {
		my(xhr).trigger("ajax.doneAll", {
			data: data,
			xhr: xhr
		})
		isFunc(opt.successFull) && opt.successFull.call(this, data, xhr)
	}
	
	})
	
	isFunc(opt.uploadProgress) && my(xhr.upload).on("progress", function (t) {
		n.uploadProgress.call(this, t.loaded, t.total, t, xhr)
	})
	
	xhr.send(opt.data)
	
	isFunc(opt.completed) && opt.completed(xhr, xhr)
	
	return {
		done: function (e) {
			return my(xhr).on('ajax.done', function (f) {
				f = f.detail || f
				isFunc(e) && e.call(
					xhr,
					f.data,
					xhr
				)
			}), this
		},
		fail: function (e) {
			return my(xhr).on('ajax.fail', function (f) {
				f = f.detail || f
				isFunc(e) && e.call(
					xhr,
					f.data,
					xhr
				)
			}), this
		},
		always: function (e) {
			return my(xhr).on('ajax.always', function (f) {
				isFunc(e) && e.call(
					xhr,
					'',
					xhr
				)
			}), this
		},
		doneAll: function (e) {
			return my(xhr).on('ajax.doneAll', function (f) {
				f = f.detail || f
				isFunc(e) && e.call(
					xhr,
					f.data,
					xhr
				)
			}), this
		}
	}
	},
	speed: function (fn) {
		var last = Date.now()
		fn()
		console.log(Date.now() - last + 'ms')
	},
	start: function () {
		this.timeSpeed = Date.now()
	},
	end: function () {
		console.log(Date.now() - my.timeSpeed + 'ms')
	},
	trim: function (str) {
	return str == null ? '' : (str + '')
	.replace(rtrim, '')
	},
	proxy: function (fn, obj) {
		if(typeof obj === 'string')
			var tmp = fn, fn = fn[obj], obj = tmp;
		if(!isFunc(fn)) return undefined;
		var args = slice.call(arguments, 2);
	return function () {
		fn.apply(obj || this, args.concat(slice.call(arguments)))
	}
	}
	})
	my.prefix = my.prefixCss
	my.each( {
		Height: "height",
		Width: "width"
	}, function( name, type ) {
		my.each( {
			padding: "inner" + name,
			content: type,
			"": "outer" + name
		}, function (defaultExtra, funcName) {
	
			my.fn[ funcName ] = function( value ) {
				var el = this[0],
					doc, rect,
					padName = type === 'width' ? ['left', 'right'] : ['top', 'bottom'],
					extra = defaultExtra === 'content' ? parseFloat(this.css('padding-' + padName[0])) + parseFloat(this.css('padding-' + padName[1])) : 0;
			if ( isWin(el) ) {
				return funcName.indexOf( "outer" ) === 0 ?
				el[ "inner" + name ] :
				el.document
				.documentElement[ "client" + name ];
			}
	
			if ( el.nodeType === 9 ) {
				/* if is document */
				doc = el.documentElement;
	
				return Math.max(
					el.body[ "scroll" + name ],
					doc[ "scroll" + name ],
					el.body[ "offset" + name ],
					doc[ "offset" + name ],
					doc[ "client" + name ]
				)
			}
			if ( !el.getClientRects().length )
				return value === undefined ? 0 : this;
			rect = el.getBoundingClientRect();
			return value === undefined ? (rect[type] - extra) : this.css(type, addPx(value))
			}
		})
	})
	
	my.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		my.fn[method] = function (val) {
			var win, el = this[0];
			if ( isWin( el ) )
				win = el;
			else if (el.nodeType === 9)
				/* if is document */
				win = el.defaultView;
			if (val === undefined)
				return win ? win[ prop ] : el[ method ]
	
			if ( win ) win.scrollTo(
				!top ? val : win.pageXOffset,
				top ? val : win.pageYOffset
			);
			else el[ method ] = val;
			
			return this
		}
	})
	
	var eventReplace = {
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}
	
	my.each('click change input submit blur focus focusin focusout resize mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave scroll keydown keypress keyup touchmove touchstart touchend contextmenu'.split(' '), function (i, e) {
		e = eventReplace[e] || e;
		my.fn[e] = function (fn) {
			return isFunc(fn) ? this.on(e, fn) : isFunc(this[0][e]) ? this[0][e]() : this.trigger(e)
		}
	})
	
	my.fx = {
		start: isTouch ? 'touchstart' : 'mousedown',
		end: isTouch ? 'touchend' : 'mouseup',
		move: isTouch ? 'touchmove' : 'mousemove',
		enter: 'mouseover',
		leave: 'mouseout'
	}
	var TRANSITION = {
		Prop: 'transition',
		End: 'transitionend',
		Run: 'transitionrun',
		Start: 'transitionstart',
		Cancel: 'transitioncancel'
	}
	var ANIMATION = {
		Prop: 'animation',
		End: 'animationend',
		Run: 'animationrun',
		Start: 'animationstart',
		Cancel: 'animationcancel'
	}
	if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
		TRANSITION.Prop = 'WebkitTransition';
		TRANSITION.End = 'webkitTransitionEnd';
		TRANSITION.Run = 'webkitTransitionRun';
		TRANSITION.Start = 'webkitTransitionStart';
		TRANSITION.Cancel = 'webkitTransitionCancel';
	}
	if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
		ANIMATION.Prop = 'WebkitAnimation';
		ANIMATION.End = 'webkitAnimationEnd';
		ANIMATION.Run = 'webkitAnimationRun';
		ANIMATION.Start = 'webkitAnimationStart';
		ANIMATION.Cancel = 'webkitAnimationCancel';
	}
	my.each(TRANSITION, function (e) {
		my.fx['transition' + e] = TRANSITION[e];
	})
	my.each(ANIMATION, function (e) {
		my.fx['animation' + e] = ANIMATION[e];
	})
	my.each('color position display background'.split(' '), function (i, e) {
		my.fn[e] = function (v) {
			return v === undefined ? this.css(e) : this.css(e, v)
		}
	})
	my.fn.bg = my.fn.background
	my.ready = my.fn.ready = function (e) {
	function loadDone () {
	root.removeEventListener('load', loadDone)
	DOM.removeEventListener('DOMContentLoaded', loadDone)
	isFunc(e) && e(my)
	}
	if(DOM.readyState === 'complete')
		isFunc(e) && e(my);
	else {
	root.addEventListener('load', loadDone)
	DOM.addEventListener('DOMContentLoaded', loadDone)
	}
	return this
	}
	noGl || (root.my = my)
	return my
	})