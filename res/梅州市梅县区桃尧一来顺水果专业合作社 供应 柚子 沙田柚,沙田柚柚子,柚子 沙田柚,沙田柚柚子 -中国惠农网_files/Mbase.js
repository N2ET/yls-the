/*! LAB.js (LABjs :: Loading And Blocking JavaScript)
    v2.0.3 (c) Kyle Simpson
    MIT License
*/

(function (global) {
    var _$LAB = global.$LAB,

		// constants for the valid keys of the options object
		_UseLocalXHR = "UseLocalXHR",
		_AlwaysPreserveOrder = "AlwaysPreserveOrder",
		_AllowDuplicates = "AllowDuplicates",
		_CacheBust = "CacheBust",
		/*!START_DEBUG*/_Debug = "Debug",/*!END_DEBUG*/
		_BasePath = "BasePath",

		// stateless variables used across all $LAB instances
		root_page = /^[^?#]*\//.exec(location.href)[0],
		root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
		append_to = document.head || document.getElementsByTagName("head"),

		// inferences... ick, but still necessary
		opera_or_gecko = (global.opera && Object.prototype.toString.call(global.opera) == "[object Opera]") || ("MozAppearance" in document.documentElement.style),

/*!START_DEBUG*/
		// console.log() and console.error() wrappers
		log_msg = function () { },
		log_error = log_msg,
/*!END_DEBUG*/

		// feature sniffs (yay!)
		test_script_elem = document.createElement("script"),
		explicit_preloading = typeof test_script_elem.preload == "boolean", // http://wiki.whatwg.org/wiki/Script_Execution_Control#Proposal_1_.28Nicholas_Zakas.29
		real_preloading = explicit_preloading || (test_script_elem.readyState && test_script_elem.readyState == "uninitialized"), // will a script preload with `src` set before DOM append?
		script_ordered_async = !real_preloading && test_script_elem.async === true, // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order

		// XHR preloading (same-domain) and cache-preloading (remote-domain) are the fallbacks (for some browsers)
		xhr_or_cache_preloading = !real_preloading && !script_ordered_async && !opera_or_gecko
    ;

    /*!START_DEBUG*/
    // define console wrapper functions if applicable
    if (global.console && global.console.log) {
        if (!global.console.error) global.console.error = global.console.log;
        log_msg = function (msg) { global.console.log(msg); };
        log_error = function (msg, err) { global.console.error(msg, err); };
    }
    /*!END_DEBUG*/

    // test for function
    function is_func(func) { return Object.prototype.toString.call(func) == "[object Function]"; }

    // test for array
    function is_array(arr) { return Object.prototype.toString.call(arr) == "[object Array]"; }

    // make script URL absolute/canonical
    function canonical_uri(src, base_path) {
        var absolute_regex = /^\w+\:\/\//;

        // is `src` is protocol-relative (begins with // or ///), prepend protocol
        if (/^\/\/\/?/.test(src)) {
            src = location.protocol + src;
        }
            // is `src` page-relative? (not an absolute URL, and not a domain-relative path, beginning with /)
        else if (!absolute_regex.test(src) && src.charAt(0) != "/") {
            // prepend `base_path`, if any
            src = (base_path || "") + src;
        }
        // make sure to return `src` as absolute
        return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
    }

    // merge `source` into `target`
    function merge_objs(source, target) {
        for (var k in source) {
            if (source.hasOwnProperty(k)) {
                target[k] = source[k]; // TODO: does this need to be recursive for our purposes?
            }
        }
        return target;
    }

    // does the chain group have any ready-to-execute scripts?
    function check_chain_group_scripts_ready(chain_group) {
        var any_scripts_ready = false;
        for (var i = 0; i < chain_group.scripts.length; i++) {
            if (chain_group.scripts[i].ready && chain_group.scripts[i].exec_trigger) {
                any_scripts_ready = true;
                chain_group.scripts[i].exec_trigger();
                chain_group.scripts[i].exec_trigger = null;
            }
        }
        return any_scripts_ready;
    }

    // creates a script load listener
    function create_script_load_listener(elem, registry_item, flag, onload) {
        elem.onload = elem.onreadystatechange = function () {
            if ((elem.readyState && elem.readyState != "complete" && elem.readyState != "loaded") || registry_item[flag]) return;
            elem.onload = elem.onreadystatechange = null;
            onload();
        };
    }

    // script executed handler
    function script_executed(registry_item) {
        registry_item.ready = registry_item.finished = true;
        for (var i = 0; i < registry_item.finished_listeners.length; i++) {
            registry_item.finished_listeners[i]();
        }
        registry_item.ready_listeners = [];
        registry_item.finished_listeners = [];
    }

    // make the request for a scriptha
    function request_script(chain_opts, script_obj, registry_item, onload, preload_this_script) {
        // setTimeout() "yielding" prevents some weird race/crash conditions in older browsers
        setTimeout(function () {
            var script, src = script_obj.real_src, xhr;

            // don't proceed until `append_to` is ready to append to
            if ("item" in append_to) { // check if `append_to` ref is still a live node list
                if (!append_to[0]) { // `append_to` node not yet ready
                    // try again in a little bit -- note: will re-call the anonymous function in the outer setTimeout, not the parent `request_script()`
                    setTimeout(arguments.callee, 25);
                    return;
                }
                // reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
                append_to = append_to[0];
            }
            script = document.createElement("script");
            if (script_obj.type) script.type = script_obj.type;
            if (script_obj.charset) script.charset = script_obj.charset;

            // should preloading be used for this script?
            if (preload_this_script) {
                // real script preloading?
                if (real_preloading) {
                    /*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("start script preload: " + src);/*!END_DEBUG*/
                    registry_item.elem = script;
                    if (explicit_preloading) { // explicit preloading (aka, Zakas' proposal)
                        script.preload = true;
                        script.onpreload = onload;
                    }
                    else {
                        script.onreadystatechange = function () {
                            if (script.readyState == "loaded") onload();
                        };
                    }
                    script.src = src;
                    // NOTE: no append to DOM yet, appending will happen when ready to execute
                }
                    // same-domain and XHR allowed? use XHR preloading
                else if (preload_this_script && src.indexOf(root_domain) == 0 && chain_opts[_UseLocalXHR]) {
                    xhr = new XMLHttpRequest(); // note: IE never uses XHR (it supports true preloading), so no more need for ActiveXObject fallback for IE <= 7
                    /*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("start script preload (xhr): " + src);/*!END_DEBUG*/
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            xhr.onreadystatechange = function () { }; // fix a memory leak in IE
                            registry_item.text = xhr.responseText + "\n//@ sourceURL=" + src; // http://blog.getfirebug.com/2009/08/11/give-your-eval-a-name-with-sourceurl/
                            onload();
                        }
                    };
                    xhr.open("GET", src);
                    xhr.send();
                }
                    // as a last resort, use cache-preloading
                else {
                    /*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("start script preload (cache): " + src);/*!END_DEBUG*/
                    script.type = "text/cache-script";
                    create_script_load_listener(script, registry_item, "ready", function () {
                        append_to.removeChild(script);
                        onload();
                    });
                    script.src = src;
                    append_to.insertBefore(script, append_to.firstChild);
                }
            }
                // use async=false for ordered async? parallel-load-serial-execute http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
            else if (script_ordered_async) {
                /*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("start script load (ordered async): " + src);/*!END_DEBUG*/
                script.async = false;
                create_script_load_listener(script, registry_item, "finished", onload);
                script.src = src;
                append_to.insertBefore(script, append_to.firstChild);
            }
                // otherwise, just a normal script element
            else {
                /*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("start script load: " + src);/*!END_DEBUG*/
                create_script_load_listener(script, registry_item, "finished", onload);
                script.src = src;
                append_to.insertBefore(script, append_to.firstChild);
            }
        }, 0);
    }

    // create a clean instance of $LAB
    function create_sandbox() {
        var global_defaults = {},
			can_use_preloading = real_preloading || xhr_or_cache_preloading,
			queue = [],
			registry = {},
			instanceAPI
        ;

        // global defaults
        global_defaults[_UseLocalXHR] = true;
        global_defaults[_AlwaysPreserveOrder] = false;
        global_defaults[_AllowDuplicates] = false;
        global_defaults[_CacheBust] = false;
        /*!START_DEBUG*/global_defaults[_Debug] = false;/*!END_DEBUG*/
        global_defaults[_BasePath] = "";

        // execute a script that has been preloaded already
        function execute_preloaded_script(chain_opts, script_obj, registry_item) {
            var script;

            function preload_execute_finished() {
                if (script != null) { // make sure this only ever fires once
                    script = null;
                    script_executed(registry_item);
                }
            }

            if (registry[script_obj.src].finished) return;
            if (!chain_opts[_AllowDuplicates]) registry[script_obj.src].finished = true;

            script = registry_item.elem || document.createElement("script");
            if (script_obj.type) script.type = script_obj.type;
            if (script_obj.charset) script.charset = script_obj.charset;
            create_script_load_listener(script, registry_item, "finished", preload_execute_finished);

            // script elem was real-preloaded
            if (registry_item.elem) {
                registry_item.elem = null;
            }
                // script was XHR preloaded
            else if (registry_item.text) {
                script.onload = script.onreadystatechange = null;	// script injection doesn't fire these events
                script.text = registry_item.text;
            }
                // script was cache-preloaded
            else {
                script.src = script_obj.real_src;
            }
            append_to.insertBefore(script, append_to.firstChild);

            // manually fire execution callback for injected scripts, since events don't fire
            if (registry_item.text) {
                preload_execute_finished();
            }
        }

        // process the script request setup
        function do_script(chain_opts, script_obj, chain_group, preload_this_script) {
            var registry_item,
				registry_items,
				ready_cb = function () { script_obj.ready_cb(script_obj, function () { execute_preloaded_script(chain_opts, script_obj, registry_item); }); },
				finished_cb = function () { script_obj.finished_cb(script_obj, chain_group); }
            ;

            script_obj.src = canonical_uri(script_obj.src, chain_opts[_BasePath]);
            script_obj.real_src = script_obj.src +
				// append cache-bust param to URL?
				(chain_opts[_CacheBust] ? ((/\?.*$/.test(script_obj.src) ? "&_" : "?_") + ~~(Math.random() * 1E9) + "=") : "")
            ;

            if (!registry[script_obj.src]) registry[script_obj.src] = { items: [], finished: false };
            registry_items = registry[script_obj.src].items;

            // allowing duplicates, or is this the first recorded load of this script?
            if (chain_opts[_AllowDuplicates] || registry_items.length == 0) {
                registry_item = registry_items[registry_items.length] = {
                    ready: false,
                    finished: false,
                    ready_listeners: [ready_cb],
                    finished_listeners: [finished_cb]
                };

                request_script(chain_opts, script_obj, registry_item,
					// which callback type to pass?
					(
					 	(preload_this_script) ? // depends on script-preloading
						function () {
						    registry_item.ready = true;
						    for (var i = 0; i < registry_item.ready_listeners.length; i++) {
						        registry_item.ready_listeners[i]();
						    }
						    registry_item.ready_listeners = [];
						} :
						function () { script_executed(registry_item); }
					),
					// signal if script-preloading should be used or not
					preload_this_script
				);
            }
            else {
                registry_item = registry_items[0];
                if (registry_item.finished) {
                    finished_cb();
                }
                else {
                    registry_item.finished_listeners.push(finished_cb);
                }
            }
        }

        // creates a closure for each separate chain spawned from this $LAB instance, to keep state cleanly separated between chains
        function create_chain() {
            var chainedAPI,
				chain_opts = merge_objs(global_defaults, {}),
				chain = [],
				exec_cursor = 0,
				scripts_currently_loading = false,
				group
            ;

            // called when a script has finished preloading
            function chain_script_ready(script_obj, exec_trigger) {
                /*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("script preload finished: " + script_obj.real_src);/*!END_DEBUG*/
                script_obj.ready = true;
                script_obj.exec_trigger = exec_trigger;
                advance_exec_cursor(); // will only check for 'ready' scripts to be executed
            }

            // called when a script has finished executing
            function chain_script_executed(script_obj, chain_group) {
                /*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("script execution finished: " + script_obj.real_src);/*!END_DEBUG*/
                script_obj.ready = script_obj.finished = true;
                script_obj.exec_trigger = null;
                // check if chain group is all finished
                for (var i = 0; i < chain_group.scripts.length; i++) {
                    if (!chain_group.scripts[i].finished) return;
                }
                // chain_group is all finished if we get this far
                chain_group.finished = true;
                advance_exec_cursor();
            }

            // main driver for executing each part of the chain
            function advance_exec_cursor() {
                while (exec_cursor < chain.length) {
                    if (is_func(chain[exec_cursor])) {
                        /*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("$LAB.wait() executing: " + chain[exec_cursor]);/*!END_DEBUG*/
                        try { chain[exec_cursor++](); } catch (err) {
                            /*!START_DEBUG*/if (chain_opts[_Debug]) log_error("$LAB.wait() error caught: ", err);/*!END_DEBUG*/
                        }
                        continue;
                    }
                    else if (!chain[exec_cursor].finished) {
                        if (check_chain_group_scripts_ready(chain[exec_cursor])) continue;
                        break;
                    }
                    exec_cursor++;
                }
                // we've reached the end of the chain (so far)
                if (exec_cursor == chain.length) {
                    scripts_currently_loading = false;
                    group = false;
                }
            }

            // setup next chain script group
            function init_script_chain_group() {
                if (!group || !group.scripts) {
                    chain.push(group = { scripts: [], finished: true });
                }
            }

            // API for $LAB chains
            chainedAPI = {
                // start loading one or more scripts
                script: function () {
                    for (var i = 0; i < arguments.length; i++) {
                        (function (script_obj, script_list) {
                            var splice_args;

                            if (!is_array(script_obj)) {
                                script_list = [script_obj];
                            }
                            for (var j = 0; j < script_list.length; j++) {
                                init_script_chain_group();
                                script_obj = script_list[j];

                                if (is_func(script_obj)) script_obj = script_obj();
                                if (!script_obj) continue;
                                if (is_array(script_obj)) {
                                    // set up an array of arguments to pass to splice()
                                    splice_args = [].slice.call(script_obj); // first include the actual array elements we want to splice in
                                    splice_args.unshift(j, 1); // next, put the `index` and `howMany` parameters onto the beginning of the splice-arguments array
                                    [].splice.apply(script_list, splice_args); // use the splice-arguments array as arguments for splice()
                                    j--; // adjust `j` to account for the loop's subsequent `j++`, so that the next loop iteration uses the same `j` index value
                                    continue;
                                }
                                if (typeof script_obj == "string") script_obj = { src: script_obj };
                                script_obj = merge_objs(script_obj, {
                                    ready: false,
                                    ready_cb: chain_script_ready,
                                    finished: false,
                                    finished_cb: chain_script_executed
                                });
                                group.finished = false;
                                group.scripts.push(script_obj);

                                do_script(chain_opts, script_obj, group, (can_use_preloading && scripts_currently_loading));
                                scripts_currently_loading = true;

                                if (chain_opts[_AlwaysPreserveOrder]) chainedAPI.wait();
                            }
                        })(arguments[i], arguments[i]);
                    }
                    return chainedAPI;
                },
                // force LABjs to pause in execution at this point in the chain, until the execution thus far finishes, before proceeding
                wait: function () {
                    if (arguments.length > 0) {
                        for (var i = 0; i < arguments.length; i++) {
                            chain.push(arguments[i]);
                        }
                        group = chain[chain.length - 1];
                    }
                    else group = false;

                    advance_exec_cursor();

                    return chainedAPI;
                }
            };

            // the first chain link API (includes `setOptions` only this first time)
            return {
                script: chainedAPI.script,
                wait: chainedAPI.wait,
                setOptions: function (opts) {
                    merge_objs(opts, chain_opts);
                    return chainedAPI;
                }
            };
        }

        // API for each initial $LAB instance (before chaining starts)
        instanceAPI = {
            // main API functions
            setGlobalDefaults: function (opts) {
                merge_objs(opts, global_defaults);
                return instanceAPI;
            },
            setOptions: function () {
                return create_chain().setOptions.apply(null, arguments);
            },
            script: function () {
                return create_chain().script.apply(null, arguments);
            },
            wait: function () {
                return create_chain().wait.apply(null, arguments);
            },

            // built-in queuing for $LAB `script()` and `wait()` calls
            // useful for building up a chain programmatically across various script locations, and simulating
            // execution of the chain
            queueScript: function () {
                queue[queue.length] = { type: "script", args: [].slice.call(arguments) };
                return instanceAPI;
            },
            queueWait: function () {
                queue[queue.length] = { type: "wait", args: [].slice.call(arguments) };
                return instanceAPI;
            },
            runQueue: function () {
                var $L = instanceAPI, len = queue.length, i = len, val;
                for (; --i >= 0;) {
                    val = queue.shift();
                    $L = $L[val.type].apply(null, val.args);
                }
                return $L;
            },

            // rollback `[global].$LAB` to what it was before this file was loaded, the return this current instance of $LAB
            noConflict: function () {
                global.$LAB = _$LAB;
                return instanceAPI;
            },

            // create another clean instance of $LAB
            sandbox: function () {
                return create_sandbox();
            }
        };

        return instanceAPI;
    }

    // create the main instance of $LAB
    global.$LAB = create_sandbox();


    /* The following "hack" was suggested by Andrea Giammarchi and adapted from: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
	   NOTE: this hack only operates in FF and then only in versions where document.readyState is not present (FF < 3.6?).
	   
	   The hack essentially "patches" the **page** that LABjs is loaded onto so that it has a proper conforming document.readyState, so that if a script which does 
	   proper and safe dom-ready detection is loaded onto a page, after dom-ready has passed, it will still be able to detect this state, by inspecting the now hacked 
	   document.readyState property. The loaded script in question can then immediately trigger any queued code executions that were waiting for the DOM to be ready. 
	   For instance, jQuery 1.4+ has been patched to take advantage of document.readyState, which is enabled by this hack. But 1.3.2 and before are **not** safe or 
	   fixed by this hack, and should therefore **not** be lazy-loaded by script loader tools such as LABjs.
	*/
    (function (addEvent, domLoaded, handler) {
        if (document.readyState == null && document[addEvent]) {
            document.readyState = "loading";
            document[addEvent](domLoaded, handler = function () {
                document.removeEventListener(domLoaded, handler, false);
                document.readyState = "complete";
            }, false);
        }
    })("addEventListener", "DOMContentLoaded");

})(this);

(function (a) {
    var f = a.M = a.M || {};
    var c = {
        decodeHtml: function (l) {
            var m = {
                "&lt;": "<",
                "&gt;": ">",
                "&amp;": "&",
                "&nbsp;": " ",
                "&quot;": '"',
                "&copy;": "",
                "&apos;": "'"
            };
            return (typeof l != "string") ? l : l.replace(/&\w+;|&#(\d+);/g, function (o, n) {
                var p = m[o];
                if (p === undefined) {
                    if (!isNaN(n)) {
                        p = String.fromCharCode((n == 160) ? 32 : n)
                    } else {
                        p = o
                    }
                }
                return p
            })
        },
        isUnsignedNumeric: function (l) {
            if (g.isEmpty(l)) {
                return false
            }
            var m = /^\d+(\.\d+)?$/;
            return m.test(l)
        },
        isInteger: function h(l) {
            if (g.isEmpty(phone)) {
                return false
            }
            var m = /^(-     |\+)?\d+$/;
            return m.test(l)
        },
        isUnsignedInteger: function (l) {
            var m = /^\d+$/;
            return m.test(l)
        },
        isFloat: function (l) {
            if (g.isEmpty(l)) {
                return false
            }
            var m = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
            return m.test(l)
        },
        isPhoneNum: function (l) {
            if (g.isEmpty(l)) {
                return false
            }
            var m = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            return m.test(l)
        },
        isEmail: function (l) {
            if (g.isEmpty(l)) {
                return false
            }
            var m = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            return m.test(l)
        },
        hasSpace: function (l) {
            if (val == undefined || val == null || val == "null" || val == "undefined") {
                return true
            }
            return l.indexOf("") > -1
        }
    };
    var g = {
        $mObj: {},
        merge: function (n, m, l) {
            if (!n || !m || typeof m != "object") {
                return n
            }
            if (!l) {
                for (var r in m) {
                    n[r] = m[r]
                }
            } else {
                var q, o;
                for (q in m) {
                    if (m.hasOwnProperty(q)) {
                        o = m[q];
                        if (o && o.constructor === Object) {
                            if (n[q] && n[q].constructor === Object) {
                                g.merge(n[q], o)
                            } else {
                                n[q] = o
                            }
                        } else {
                            n[q] = o
                        }
                    }
                }
            }
            return n
        },
        clone: function (m, l) {
            return g.merge({}, m, l)
        },
        namespace: function () {
            var m = a,
				r, o, p, n, q, s;
            for (p = 0, q = arguments.length; p < q; p++) {
                var l = arguments[p];
                if (g.$mObj.namespace[l]) {
                    continue
                }
                r = l.split(".");
                for (n = 0, s = r.length; n < s; n++) {
                    o = r[n];
                    if (!m[o]) {
                        m[o] = {}
                    }
                    m = m[o]
                }
                g.$mObj.namespace[l] = true
            }
        },
        extend: function () {
            var l = function (p) {
                for (var n in p) {
                    if (!p.hasOwnProperty(n)) {
                        continue
                    }
                    this[n] = p[n]
                }
            };
            return function (p, o) {
                (typeof p == "function") || (p = function () { });
                var m = function () {
                    p.apply(this, arguments)
                };
                var n = function () { };
                n.prototype = p.prototype;
                m.prototype = new n();
                m.prototype.constructor = m;
                m.superclass = p.prototype;
                if (p.prototype.constructor === Object.prototype.constructor) {
                    p.prototype.constructor = p
                }
                m.override = function (r) {
                    if (m.prototype && r && typeof r == "object") {
                        for (var q in r) {
                            m.prototype[q] = r[q]
                        }
                    }
                };
                m.prototype.override = l;
                m.override(o);
                return m
            }
        }(),
        each: function (n, r, q) {
            if (g.isEmpty(n) || !r) {
                return
            }
            if (g.isArray(n)) {
                for (var p = 0, m = n.length; p < m; p++) {
                    try {
                        if (r.call(q, n[p], p, n) === false) {
                            return
                        }
                    } catch (s) {
                        f.log(s, "error")
                    }
                }
            } else {
                for (var o in n) {
                    if (!n.hasOwnProperty(o)) {
                        continue
                    }
                    try {
                        if (r.call(q, n[o], o, n) === false) {
                            return
                        }
                    } catch (s) {
                        f.log(s, "error")
                    }
                }
            }
        },
        contains: function (o, n) {
            if (g.isArray(o)) {
                if ("indexOf" in Array.prototype) {
                    return o.indexOf(n) !== -1
                }
                var l, m;
                for (l = 0, m = o.length; l < m; l++) {
                    if (o[l] === n) {
                        return true
                    }
                }
                return false
            } else {
                return !g.isEmpty(o) && n in o
            }
        },
        isEmpty: function (l, n) {
            if ((typeof l === "undefined") || (l === null) || (!n ? l === "" : false) || (g.isArray(l) && l.length === 0)) {
                return true
            } else {
                if (g.isObject(l)) {
                    for (var m in l) {
                        if (Object.prototype.hasOwnProperty.call(l, m)) {
                            return false
                        }
                    }
                    return true
                }
            }
            return false
        },
        isBlank: function (l) {
            return g.isEmpty(l) ? true : g.isEmpty(String(l).replace(/^\s+|\s+$/g, ""))
        },
        isDefined: function (l) {
            return typeof l === "undefined"
        },
        isObject: function (l) {
            if (Object.prototype.toString.call(null) === "[object Object]") {
                return l !== null && l !== undefined && Object.prototype.toString.call(l) === "[object Object]" && l.ownerDocument === undefined
            } else {
                return Object.prototype.toString.call(l) === "[object Object]"
            }
        },
        isFunction: function (l) {
            return Object.prototype.toString.apply(l) === "[object Function]"
        },
        isArray: function (l) {
            return Object.prototype.toString.apply(l) === "[object Array]"
        },
        isDate: function (l) {
            return Object.prototype.toString.apply(l) === "[object Date]"
        },
        isNumber: function (l) {
            return typeof l === "number" && isFinite(l)
        },
        isString: function (l) {
            return typeof l === "string"
        },
        isBoolean: function (l) {
            return typeof l === "boolean"
        }
    };
    var j = {
        toString: function (l, t) {
            var s = undefined;
            var q = l.getFullYear();
            var p = l.getMonth() + 1;
            var r = l.getDate();
            var m = l.getHours();
            var n = l.getMinutes();
            var o = l.getSeconds();
            p = (parseInt(p) < 10) ? ("0" + p) : (p);
            r = (parseInt(r) < 10) ? ("0" + r) : (r);
            m = (parseInt(m) < 10) ? ("0" + m) : (m);
            n = (parseInt(n) < 10) ? ("0" + n) : (n);
            o = (parseInt(o) < 10) ? ("0" + o) : (o);
            if ("yyyy-MM-dd HH:mm:ss" == t) {
                s = q + "-" + p + "-" + r + " " + m + ":" + n + ":" + o
            } else {
                if ("yyyy-MM-dd" == t) {
                    s = q + "-" + p + "-" + r
                } else {
                    if ("yyyy-MM" == t) {
                        s = q + "-" + p
                    } else {
                        if ("yyyy" == t) {
                            s = q
                        }
                    }
                }
            }
            return s
        },
        toDate: function (q) {
            if (q.length == 19) {
                var p = q.substring(0, 4);
                var r = q.substring(5, 7);
                var m = q.substring(8, 10);
                var l = q.substring(11, 13);
                var n = q.substring(14, 16);
                var o = q.substring(17, 19);
                return new Date(p, r - 1, m, l, n, o)
            } else {
                if (q.length == 10) {
                    var p = q.substring(0, 4);
                    var r = q.substring(5, 7);
                    var m = q.substring(8, 10);
                    return new Date(p, r - 1, m)
                } else {
                    if (q.length == 7) {
                        var p = q.substring(0, 4);
                        var r = q.substring(5, 7);
                        return new Date(p, r - 1)
                    } else {
                        if (q.length == 4) {
                            var p = q.substring(0, 4);
                            return new Date(p)
                        } else {
                            return undefined
                        }
                    }
                }
            }
        },
        getMonthDays: function (l, o) {
            var m = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
            var n = l.getFullYear();
            if (typeof o == "undefined") {
                o = l.getMonth()
            }
            if (((0 == (n % 4)) && ((0 != (n % 100)) || (0 == (n % 400)))) && o == 1) {
                return 29
            } else {
                return m[o]
            }
        },
        addDays: function (l, n) {
            var m = (arguments.length == 1) ? j.toDate(j.today()) : j.toDate(n);
            m = new Date(m.getTime() + parseInt(l) * 24 * 3600 * 1000);
            return j.toString(new Date(m), "yyyy-MM-dd HH:mm:ss")
        },
        addMonths: function (p, o) {
            var l = (arguments.length == 1) ? j.toDate(j.today()) : j.toDate(o);
            var m = l.getMonth();
            var n = l.getDate();
            var q = j.getMonthDays(l, l.getMonth() + parseInt(p));
            if (n > q) {
                l.setDate(q)
            }
            l.setMonth(l.getMonth() + parseInt(p));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        addMonthsForStart: function (n, m) {
            var l = (arguments.length == 1) ? j.today() : m;
            l = j.addMonths(n, l);
            return j.firstDayOfMonth(l)
        },
        addMonthsForEnd: function (n, m) {
            var l = (arguments.length == 1) ? j.today() : m;
            l = j.addMonths(n, l);
            return j.addDays(-1, j.firstDayOfMonth(l))
        },
        addYears: function (m, n) {
            var l = (arguments.length == 1) ? j.toDate(j.today()) : j.toDate(n);
            l.setYear(l.getYear() + parseInt(m));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        addYearsForStart: function (l, n) {
            var m = (arguments.length == 1) ? j.today() : n;
            m = j.addYears(l, m);
            return j.firstDayOfYear(m)
        },
        addYearsForEnd: function (l, n) {
            var m = (arguments.length == 1) ? j.today() : n;
            m = j.addYears(l, m);
            return j.firstDayOfYear(m)
        },
        sunOfWeek: function (m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay()) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        monOfWeek: function (m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 1) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        tueOfWeek: function (m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 2) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        wedOfWeek: function (m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 3) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        turOfWeek: function (m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 4) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        friOfWeek: function (m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 5) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        satOfWeek: function (m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 6) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        firstDayOfMonth: function (m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l.setDate(1);
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        lastDayOfMonth: function (l) {
            l = (arguments.length == 0) ? j.today() : (l);
            l = j.addMonths(1, l);
            l = j.firstDayOfMonth(l);
            l = j.addDays(-1, l);
            return l
        },
        firstDayOfYear: function (m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l.setMonth(0);
            l.setDate(1);
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        lastDayOfYear: function (m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l.setMonth(11);
            l.setDate(31);
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        today: function (l) {
            if (arguments.length == 0) {
                return j.toString(new Date(), "yyyy-MM-dd")
            } else {
                return j.toString(new Date(), l)
            }
        }
    };
    var k = {
        getCookie: function (n) {
            var m = document.cookie.indexOf(n + "=");
            if (m == -1) {
                return null
            }
            m = m + n.length + 1;
            var l = document.cookie.indexOf(";", m);
            if (l == -1) {
                l = document.cookie.length
            }
            return document.cookie.substring(m, l)
        },
        setCookie: function (n, p, l, q, o) {
            var r = n + "=" + escape(p);
            if (l != "") {
                var m = new Date();
                m.setTime(m.getTime() + l * 24 * 3600 * 1000);
                r += ";expires=" + m.toGMTString()
            }
            if (q != "") {
                r += ";path=" + q
            }
            if (o != "") {
                r += ";domain=" + o
            }
            document.cookie = r
        },
        delCookie: function (m) {
            var l = new Date();
            l.setTime(l.getTime() - 1);
            document.cookie = m + "=; expires=" + l.toGMTString()
        }
    };
    var b = {
        getParam: function (l) {
            var m = new RegExp("(^|&)" + l + "=([^&]*)(&|$)", "i");
            var n = window.location.search.substr(1).match(m);
            if (n != null) {
                return unescape(n[2])
            }
            return null
        },
        setParams: function (n) {
            var m = window.location.search;
            var r = "";
            var l = new Array();
            var o = {};
            if (g.isObject(n)) {
                if (m.indexOf("?") != -1) {
                    r = m.substr(m.indexOf("?") + 1)
                }
                if (r.length > 0) {
                    var q = r.split("&");
                    for (i in q) {
                        var p = q[i].split("=");
                        if (p.length > 1) {
                            o[p[0]] = p[1]
                        } else {
                            o[p[0]] = ""
                        }
                    }
                    g.merge(o, n)
                } else {
                    o = n
                }
            } else {
                throw new Error("arguments is not a jsonobject")
            }
            for (key in o) {
                l.push(key);
                l.push("=");
                l.push(n[key]);
                l.push("&")
            }
            l.pop();
            window.location.search = l.jion()
        },
        getHash: function () {
            var l = window.location.hash;
            if (!l) {
                return undefined
            } else {
                return l.replace("#", "")
            }
        },
        setHash: function (l) {
            if (l) {
                window.location.hash = "#" + l
            } else {
                window.location.hash = ""
            }
        }
    };
    var d = {
        ajax: function (l) {
            if (!l || !l.url) {
                return false
            }
            $.ajax({
                url: l.url,
                type: l.type || "post",
                dataType: l.dataType || "json",
                async: l.async === false ? false : true,
                data: l.data || {},
                cache:false,
                success: function (m) {
                    if (!l.success) {
                        return
                    }
                    l.success.call(l.scope, m)
                },
                error: function (m) {
                    if (!l.error) {
                        return
                    }
                    l.error.call(l.scope, m)
                }
            });
            return true
        }
    };
    BrowserUtil = function () {
        var o = null;
        var m = null;

        function p() {
            var I = navigator.userAgent;
            o = {}, m = {};
            var r = I.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
				J = I.match(/(Android);?[\s\/]+([\d.]+)?/),
				K = !!I.match(/\(Macintosh\; Intel /),
				C = I.match(/(iPad).*OS\s([\d_]+)/),
				w = I.match(/(iPod)(.*OS\s([\d_]+))?/),
				u = !C && I.match(/(iPhone\sOS)\s([\d_]+)/),
				q = I.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
				E = q && I.match(/TouchPad/),
				v = I.match(/Kindle\/([\d.]+)/),
				H = I.match(/Silk\/([\d._]+)/),
				D = I.match(/(BlackBerry).*Version\/([\d.]+)/),
				A = I.match(/(BB10).*Version\/([\d.]+)/),
				s = I.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
				B = I.match(/PlayBook/),
				G = I.match(/Chrome\/([\d.]+)/) || I.match(/CriOS\/([\d.]+)/),
				x = I.match(/Firefox\/([\d.]+)/),
				F = I.match(/MSIE\s([\d.]+)/) || I.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
				t = !G && I.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
				z = t || I.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/),
				y = I.indexOf("MicroMessenger") >= 0;
            if (r) {
                m.browser = "webkit";
                m.version = r[1]
            }
            if (J) {
                o.os = "android";
                o.version = J[2]
            }
            if (u && !w) {
                o.os = "ios";
                o.cline = "iphone"
            }
            if (C) {
                o.os = "ios";
                o.cline = "ipad"
            }
            if (w) {
                o.os = "ios";
                o.cline = "ipod";
                o.version = w[3] ? w[3].replace(/_/g, ".") : null
            }
            if (q) {
                o.os = "webos";
                o.version = q[2]
            }
            if (E) {
                o.os = "touchpad"
            }
            if (D) {
                o.os = "blackberry";
                o.version = D[2]
            }
            if (A) {
                o.os = "bb10";
                o.version = A[2]
            }
            if (s) {
                o.os = "rimtabletos";
                o.version = s[2]
            }
            if (B) {
                o.os = "playbook"
            }
            if (v) {
                o.kindle = "kindle";
                o.version = v[1]
            }
            if (H) {
                o.silk = "silk";
                o.version = H[1]
            }
            if (!H && o.android && I.match(/Kindle Fire/)) {
                m.browser = "silk"
            }
            if (G) {
                m.browser = "chrome";
                m.version = G[1]
            }
            if (x) {
                m.browser = "firefox";
                m.version = x[1]
            }
            if (F) {
                m.browser = "ie";
                m.version = F[1]
            }
            if (z && (K || o.ios)) {
                m.browser = "safari";
                if (K) {
                    m.version = z[1]
                }
            }
            if (t) {
                m.browser = "webview"
            }
            if (y) {
                m.browser = "weixin"
            }
            o.tablet = !!(C || B || (J && !I.match(/Mobile/)) || (x && I.match(/Tablet/)) || (F && !I.match(/Phone/) && I.match(/Touch/)));
            o.phone = !!(!o.tablet && !o.ipod && (J || u || q || D || A || (G && I.match(/Android/)) || (G && I.match(/CriOS\/([\d.]+)/)) || (x && I.match(/Mobile/)) || (F && I.match(/Touch/))));
            o.os = o.os || null;
            o.version = o.version || null;
            o.cline = o.cline || null;
            o.kindle = o.kindle || false;
            o.tablet = o.tablet || null;
            o.phone = o.phone || false;
            o.silk = o.silk || null;
            m.browser = m.browser || null;
            m.version = m.version || null
        }
        function l() {
            if (!o || !m) {
                p()
            }
            return o
        }
        function n() {
            if (!o || !m) {
                p()
            }
            return m
        }
        return {
            getOs: l,
            getBrowser: n
        }
    };
    LocalStorageUtil = function () {
        var o = window.localStorage ? true : false;
        if (o) {
            try {
                window.localStorage.setItem("M_test", 1)
            } catch (p) {
                o = false;
                f.log("localStorage无法set", "error")
            }
            try {
                window.localStorage.getItem("M_test")
            } catch (p) {
                o = false;
                f.log("localStorage无法get", "error")
            }
            try {
                window.localStorage.removeItem("M_test")
            } catch (p) {
                o = false;
                f.log("localStorage无法remove", "error")
            }
        }
        function m(s) {
            var r = null;
            if (o && s) {
                r = window.localStorage.getItem(s)
            }
            return r
        }
        function q(r, s) {
            if (o && r) {
                try {
                    window.localStorage.setItem(r, s)
                } catch (t) {
                    LocalStorageUtil.removeAll();
                    window.localStorage.setItem(r, s)
                }
            }
        }
        function l(r) {
            if (o && r) {
                window.localStorage.removeItem(r)
            }
        }
        function n() {
            if (o) {
                g.each(window.localStorage, function (t, u, s, r) {
                    window.localStorage.removeItem(s)
                })
            }
        }
        return {
            get: m,
            set: q,
            remove: l,
            removeAll: n
        }
    };
    f.modules = {};
    f.runMod = [];
    f.config = {
        debug: 0
    };
    f.log = function (m, l) {
        f.config && f.config.debug && (typeof console !== "undefined" && console !== null) && (console[l || (l = "log")]) && console[l](m)
    };
    var e = {
        require: function (l, m) {
            !g.isArray(l) && (l = Array(l));
            e.loadJs(l, m)
        },
        loadJs: function (l, m) {
            $LAB.setOptions({
                AlwaysPreserveOrder: true
            }).script(l).wait(function () {
                if (m) {
                    m.call(null)
                }
            })
        },
        exports: function (l) {
            if (f.modules[l] && f.modules[l].exports) {
                return f.modules[l].exports
            }
            return null
        },
        define: function (l, m) {
            if (arguments.length == 1) {
                m = l
            }
            if (g.isEmpty(l) && f.isFunction(m)) {
                m.call(null);
                return
            } !f.modules[l] && (f.modules[l] = {});
            f.modules[l]["factory"] = m
        },
        defineModule: function () {
            g.each(f.modules, function (o, m) {
                var n = f.modules[m];
                if (!n.exports && n.factory) {
                    n.exports = {};
                    var l = n.factory.call(null, n.exports);
                    l && (n.exports = l)
                }
            })
        },
        setRunMod: function (l, m) {
            if (g.isArray(l)) {
                if (m) {
                    f.runMod = l
                } else {
                    f.runMod = f.runMod.concat(l)
                }
            } else {
                if (g.isString(l) && !g.isBlank(l)) {
                    if (m) {
                        f.runMod = [l]
                    } else {
                        f.runMod.push(l)
                    }
                }
            }
        },
        setConfig: function (l, m) {
            e.setGlobalProp("config", l, m)
        },
        setGlobalProp: function (p, l, n) {
            var m = f[p];
            if (g.isString(l)) {
                m[l] = n;
                return
            }
            if (g.isObject(l)) {
                var o = l;
                g.each(o, function (r, q) {
                    setGlobalProp(p, q, r)
                })
            }
        },
        idSeed: 0,
        genId: function (l) {
            var m = (l || "mGen") + (++e.idSeed);
            return m
        },
        runner: function (l) {
            e.defineModule();
            var m = false;
            if (g.isObject(l)) {
                m = true
            }
            g.each(f.runMod, function (o) {
                var p = m && l[o] ? l[o] : null;
                if (e.exports(o)) {
                    var n = e.exports(o);
                    var r = n.clazz ? new n.clazz(p) : n;
                    if (g.isFunction(r.run)) {
                        try {
                            r.run()
                        } catch (q) {
                            f.log(q, "error")
                        }
                    }
                }
            })
        }
    };
    f.defineModule = function () {
        return e.defineModule.apply(null, arguments)
    }
    f.require = function () {
        return e.require.apply(null, arguments)
    };
    f.genId = function () {
        return e.genId.apply(null, arguments)
    };
    f.define = function () {
        return e.define.apply(null, arguments)
    };
    f.runner = function () {
        return e.runner.apply(null, arguments)
    };
    f.setConfig = function () {
        return e.setConfig.apply(null, arguments)
    };
    f.setRunMod = function () {
        return e.setRunMod.apply(null, arguments)
    };
    f.exports = function () {
        return e.exports.apply(null, arguments)
    };
    f.http = d;
    f.string = c;
    f.date = j;
    f.object = g;
    f.cookie = k;
    f.url = b;
    f.browser = new BrowserUtil();
    f.localstorage = new LocalStorageUtil()
})(window);