/*
 Custom Cobrowse UI with hard coded aria labels and html content.  Does not rely on content:before css to supply the content.
*/

(function () {


    // Detect ie
    var ie = document.documentMode && window.XDomainRequest,
        iever = ie ? document.documentMode : 0,
        ie9_10 = ie && (iever == 9 || iever == 10),
        ie8 = ie && iever <= 8;

    var screenshare, agentvideo, ssnbutton;

    // Presence integration
    function presenceFire(eventname, eventdata) {
        // Fire event on the agent side
        if (GLANCE.Presence && GLANCE.Presence.Visitor && GLANCE.Presence.Visitor.instance)
            GLANCE.Presence.Visitor.instance.fire(eventname, eventdata);
    }

    // DOM Element utility methods --------------------------------------------------------
    function getElement(sel) {
        var selem, elem = sel.match(/^#/) ? document.getElementById(sel.substr(1)) : ((selem = elem.querySelectorAll(sel)) ? selem[0] : null);
        if (!elem)
            return null;

        function GElement(elem) {
            this.elem = elem;
            this.show = function (b) {
                if (b === undefined) b = true;
                var oldclass = b ? "glance_hide" : "glance_show",
                    newclass = b ? "glance_show" : "glance_hide",
                    re = new RegExp(oldclass, "g");
                // In IE9 setting class triggers a dom mutation event even if it's a no-op
                if (elem.className.match(new RegExp(newclass, "g")))
                    return;
                if (!elem.className.match(re))
                    this.addClass(newclass);
                else
                    elem.className = elem.className.replace(re, newclass);
            }
            this.hide = function () {
                this.show(false);
            }
            this.setDimensions = function (width, height) {
                elem.style["width"] = width + "px";
                elem.style["height"] = height + "px";
            }
            this.getElement = function (selector) {
                return new GElement(elem.querySelectorAll(selector)[0]);
            }
            this.setClass = function (cls) {
                elem.className = cls;
            }
            this.addClass = function (cls) {
                if (typeof elem.className === "string" && // for SVG elements, className is type SVGAnimatedString
                    elem.className.match(new RegExp("\\b" + cls + "\\b", "g")))
                    return;
                elem.className += (" " + cls);
            }
            this.removeClass = function (cls) {
                if (elem.className === cls) {
                    elem.className = "";
                    return;
                }
                var re = new RegExp("\\b" + cls + "\\b", "g");
                elem.className = elem.className.replace(re, " ");
            }
            this.addEvent = function (evt, handler, stopprop) {
                elem.addEventListener(evt, function (e) {
                    handler(e);
                    if (stopprop !== false) { // true or undefined
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }

            this.getAttr = function (attrname) {
                return elem.getAttribute(attrname);
            }
            this.setAttr = function (attrname, attrval) {
                elem.setAttribute(attrname, attrval);
            }
            this.html = function (h) {
                if (h)
                    elem.innerHTML = h;
                return elem.innerHTML;
            }

            // Accessibility
            // Make a dialog box which handles tab to set focus, esc key to cancel
            this.makeDialog = function (closebutton, onclose) {
                var self = this;

                function closeDialog() {
                    onclose();
                    self.previousFocus.focus();
                }
                this.setAttr("role", "dialog");
                elem.tabIndex = 0; // so it is focusable
                this.handleKey(27 /* ESC */, "", closeDialog);
                getElement(closebutton).addEvent("click", closeDialog);

                // Once focus is in the dialog, trap it there by preventing tab away from first and last input
                // Also give each a and input a tabIndex so it can get focus
                var dialogelements = elem.querySelectorAll("a, input, button");
                if (dialogelements.length >= 1) {
                    (new GElement(dialogelements[0])).trapFocus(true);
                    for (var n = 0; n < dialogelements.length; n++)
                        dialogelements[n].tabIndex = 0;
                    (new GElement(dialogelements[n - 1])).trapFocus(false);
                }
            }
            this.ariaLabel = function () {
                // Create a hidden label for the eleemnt, and a aria-labelledby attribute
                // that points to it.
                var label = document.createElement("div");
                label.className = "glance_hide";
                label.id = elem.id + "_al";
                elem.appendChild(label);
                this.setAttr("aria-labelledby", label.id);
            }
            this.showDialog = function () {
                this.previousFocus = document.activeElement;
                this.show();
                this.focus();
            }
            this.focus = function () {
                elem.focus();
            }
            this.trapFocus = function (first) {
                this.handleKey(9 /* TAB */, first ? "shift" : "", function () { });
            }
            this.handleKey = function (keyCode, modifier, handler) {
                this.addEvent("keydown", function (e) {
                    var modified = e["shiftKey"] || e["ctrlKey"] || e["altKey"];
                    if (e.keyCode === keyCode && ((modifier && e[modifier + "Key"]) || (!modifier && !modified))) {
                        handler();
                        e.preventDefault(); // only if key matches
                        e.stopPropagation();
                    }
                }, false);
            }
        }

        return new GElement(elem);
    }

    function getDocument() {

        function GDocument() {
            var doc = document;

            this.onLoad = function (fn) {
                doc.readyState.match(/uninitialized|loading/) ? doc.addEventListener("DOMContentLoaded", fn) : fn();
            }
        }

        return new GDocument();
    }



    // UIState -------------------------------------------------------------

    var UIState = {

        EXPANDED: "expanded",
        BOXSTATE: "boxstate",
        RCENABLED: "rcenabled",

        set: function (prop, val) {
            if (GLANCE.Cobrowse.Visitor.inSession())
                GLANCE.Cobrowse.Visitor.setCookieValue(prop, val);
        },

        get: function (prop) {
            return GLANCE.Cobrowse.Visitor.inSession() ? GLANCE.Cobrowse.Visitor.getCookieValue(prop) : null;
        }
    }

    // Confirmation --------------------------------------------------------

    /**
     * @constructor
     */
    function Confirmation() {
        this.confirm = getElement('#glance_confirm');
        this.scrim = getElement('#glance_scrim');

        var self = this;
        getElement('#glance_yes').addEvent('click', function () {
            self.hide();
            self.onYes();
        });

        this.confirm.makeDialog("#glance_no", function () {
            self.hide();
            self.onNo();
        });
    }

    Confirmation.prototype.hide = function () {
        this.confirm.hide();
        this.scrim.hide();
        this.confirm.previousFocus.focus();
    }

    Confirmation.prototype.show = function (msgClass, onYes, onNo) {
        this.onYes = onYes;
        this.onNo = onNo ? onNo : function () { };

        var confmsg = getElement('#glance_confirm_msg');

        switch (msgClass) {
            case "glance_confirm_rc":
                confmsg.elem.innerHTML = "Allow the agent to take control?";
                break;
            default:

        }
        confmsg.setClass(msgClass);

        // Must show the confirmation message in order to see effects of setting className (at least on safari)
        this.confirm.showDialog();

        var msgtext = getComputedStyle(confmsg.elem, ":before").getPropertyValue("content");

        this.scrim.show();
    }

    // Screenshare ---------------------------------------------------------

    /**
     * @constructor
     */
    function Screenshare() {
        this.view = getElement('#glance_ssview');
        this.scrim = getElement('#glance_scrim');
    }

    Screenshare.prototype.show = function (show) {
        var b = (show.state !== "ended" && !show.paused);
        this.view.show(b);
        this.scrim.show(b);
    }

    Screenshare.prototype.viewerinfo = function (v) { }

    Screenshare.prototype.pause = function () {
        this.show({
            state: "continued",
            paused: true
        });
    }

    Screenshare.prototype.resume = function () {
        this.show({
            state: "continued",
            paused: false
        });
    }

    // AgentVideo ---------------------------------------------------------

    /**
     * @constructor
     */
    function AgentVideo() {
        this.iframe = getElement("#glance_agentvideo");
    }

    AgentVideo.prototype.setDims = function () {
        // Adjust iframe width to match width of parent's content box, and adjust height according to video aspect ratio
        var iframeparent = this.iframe.elem.parentElement;
        var parentstyle = getComputedStyle(iframeparent);
        var framewidth = iframeparent.scrollWidth - (parseInt(parentstyle.paddingLeft) + parseInt(parentstyle.paddingRight)); // iframe.getBoundingClientRect()
        var aspectratio = (this.params.width || 320) / (this.params.height || 240);
        var frameheight = Math.ceil(framewidth / aspectratio);
        this.iframe.setDimensions(framewidth, frameheight);
    }

    AgentVideo.prototype.show = function (ss) {

        this.params = ss.params;

        if (ss.paused)
            return;

        if (ss.state !== "ended")
            this.videoOn(ss.state === "new");
        else
            this.videoOff();
    }

    AgentVideo.prototype.videoOn = function (expand) {
        // Set video visibility first so iframe has a non-zero width
        ssnbutton.setBoxState(SessionButton.BOXSTATE_VIDEO);
        if (expand)
            ssnbutton.setExpanded(true);
        this.setDims();
    }

    AgentVideo.prototype.videoOff = function () {
        ssnbutton.setBoxState(SessionButton.BOXSTATE_JOINED);
        ssnbutton.setExpanded(false);
    }

    AgentVideo.prototype.viewerinfo = function (v) {
        (false && window.console && window.console.log && window.console.log("UI:", "Viewer info:" + JSON.stringify(v)));
    }

    AgentVideo.prototype.pause = function () {
        this.videoOff();
    }

    AgentVideo.prototype.resume = function () {
        this.videoOn(true);
    }

    // SessionButon --------------------------------------------------------

    var IN_SESSION = 1,
        NOT_IN_SESSION = 2,
        SESSION_STARTING = 3,
        SESSION_BLURRED = 4,
        IN_SESSION_DISCON = 5;
    var buttonStateClasses = ["", "in_session", "not_in_session", "session_starting", "in_session_blurred", "in_session discon"];

    /**
     * @constructor
     */
    function SessionButton() {

        if (!document.body)
            return;

        var buttonhtml;
        this.button = document.createElement("div");
        this.button.id = "glance_cobrowse_btn";
        //this.button.tabIndex = 0; // make focusable
        //this.button.setAttribute("role", "");
        //this.button.setAttribute("aria-label", "Start cobrowsing");

        buttonhtml = SessionButton.buttonHTML;

        this.button.innerHTML = SessionButton.buttonHTML;

        document.body.appendChild(this.button);

        this.button = getElement("#glance_cobrowse_btn");
        this.button.setClass("glance_ui_36");
        this.setState(NOT_IN_SESSION);

        //#ifndef _GLANCE_CUSTOMUI
        //    // If background color of glance_start_label has been customized (ie it is not #0d475d) and the background
        //    // of the start/stop buttons has not been customized yet, make the start/stop buttons transparent
        //    if (window.getComputedStyle(getElement("#glance_show_btn").elem).backgroundColor === "#2f6975" &&
        //        window.getComputedStyle(getElement("#glance_start_label").elem).backgroundColor !== "#0d475d") {
        //        getElement("#glance_show_btn").elem.style.backgroundColor = "transparent";
        //        getElement("#glance_stop_btn").elem.style.backgroundColor = "transparent";
        //    }
        //#endif

        this.terms = getElement("#glance_terms");
        this.startlabel = getElement("#glance_start_label");
        this.scrim = getElement('#glance_scrim');
        this.msgbox = getElement("#glance_msg_box");
        this.border = getElement("#glance_border");

        this.addEventListeners();

        this.confirmation = new Confirmation();
    }

    SessionButton.buttonHTML =
       "<div id='glance_scrim' class='glance_dim glance_hide'></div>" +
        "<div id='glance_ssview' class='glance_hide' glance_cobrowse_suppress='1'><iframe scrolling='no' id='glance_screenshare' data-no-cobrowse-content='1' glance_cobrowse_suppress='1'></iframe></div> " +
        "<div id='glance_start_label' class='glance_ui glance_ui_titlebar'>" +
        "<div id='glance_show_btn' tabIndex='0' role='button'>Cobrowse</div>" +
        "<div id='glance_in_session'>" +
        "<div id='glance_stop_btn' class='glance_ishow' tabIndex='0' role='button'>Stop cobrowsing</div>" +
		"<div class='separaterClass'></div>" +
        "<div id='glance_expand' style='margin-top: 7px;' class='glance_closed' tabIndex='0' role='button' aria-expanded='false' aria-label='Co-browse'>" +
		"</div>" +
        "</div>" +
        "</div>" +
        "<div id='glance_ssnkey_box' class='glance_hide glance_ui'>" +
        "<iframe id='glance_agentvideo' data-no-cobrowse-content='1'></iframe>" +
        "<div style='font-size: 18px;' id='glance_ssn_starting'>Establishing cobrowse session...</div>" +
        "<div id='glance_keyless_prompt'>Please wait for the agent to connect</div>" +
        "<div style='font-size: 18px;' id='glance_key_prompt'>Give your banker the code below to begin cobrowsing.</div>" +
        "<div id='glance_ssn_key'></div>" +
        "<div id='glance_ssn_info'></div>" +
        "<a href='https://answers.usbank.com/GSSChat/CoBrowseAgreement'><div id='glance_tagline'><a class='tandcunderline' id='glance_terms_link'>Terms and conditions</a></div></a>" +
		"<button id='glance_yes'></button><button id='glance_no'></button></div>" +
        "</div>" +
        "<div id='glance_msg_box' class='glance_hide glance_ui'><p id='glance_msg'></p><button id='glance_msg_ok'></button></div>" +
        "<div id='glance_confirm' class='glance_hide glance_ui'><p id='glance_confirm_msg'></p></div>" +
        "<div id='glance_terms'class='glance_hide glance_ui'>" +
        "<h2 role='heading' aria-level='2' id='glance_terms_title'>Start cobrowsing</h2><p id='glance_terms_text'>Would you like to share your browser with your banker?</p>" +
        "<button id='glance_accept'>Accept</button>" +
		"<button id='glance_decline'>Decline</button><br/>" +
        "<a id='glance_terms_link2' onclick='glanceCbrUtility.openTerms();'>Terms and conditions</a>" +
        "</div>" +
        "<div id='glance_border' " + (ie9_10 ? "class='ie9'" : "") + "></div>";

    SessionButton.prototype.showTerms = function (show, startparams) {
        this.startparams = startparams;
        this.scrim.show(show);

        // Terms and conditions must be displayed even when button is "not_in_session"
        this.terms.elem.style.display = (show ? "block" : "none");
        this.scrim.elem.style.display = (show ? "block" : "");
        if (show)
            this.terms.showDialog();
        else
            this.terms.hide();
    },

        SessionButton.prototype.focus = function () {
            this.button.focus();
        },

        SessionButton.prototype.showDisconnected = function (discon) {
            if (discon)
                this.setState(IN_SESSION_DISCON);
            else if (this.state === IN_SESSION_DISCON)
                this.setState(IN_SESSION);
        },

        SessionButton.prototype.addEventListeners = function () {
            var self = this,
                n;

            getElement("#glance_show_btn").addEvent("click", function (event) {
                GLANCE.Cobrowse.Visitor.startSession();
            });

            getElement("#glance_stop_btn").addEvent("click", function (event) {
                GLANCE.Cobrowse.Visitor.stopSession();
            });

            getElement("#glance_expand").addEvent("click", function (event) {
                self.setExpanded(!UIState.get(UIState.EXPANDED));
            });
            getElement("#glance_expand").ariaLabel();

            getElement("#glance_accept").addEvent("click", function (event) {
                presenceFire("terms", {
                    "status": "accepted"
                });
                self.showTerms(false);
                GLANCE.Cobrowse.Visitor.startSession(ssnbutton.startparams);
            });

            var termslink = getElement("#glance_terms_link");
            termslink.addEvent("click", function () {
                var termsdata = self.terms.getElement("#glance_terms .data");
                var termsUrl = "https://answers.usbank.com/GSSChat/CoBrowseAgreement";
                window.open(termsUrl, "_blank", "width=800,height=800,top=10,left=10,scrollbars=1");
            });

            this.terms.makeDialog("#glance_decline", function () {
                self.showTerms(false);
                presenceFire("terms", {
                    "status": "declined"
                });
            });
            this.msgbox.makeDialog("#glance_msg_ok", function () {
                self.hideMessage();
            });
        }
    SessionButton.prototype.setState = function (s) {
        this.state = s;
        for (var n = buttonStateClasses.length - 1; n >= 0; n--) // remove the two-word classes first
            this.button.removeClass(buttonStateClasses[n]);
        this.button.addClass(buttonStateClasses[s]);
    };

    SessionButton.prototype.showStarting = function () {
        (false && window.console && window.console.log && window.console.log("UI:", "SessionButton.showStarting"));
        this.hideMessage(); // hide any message left over from previous start attempt
        this.showTerms(false); // in case terms are open
        this.setState(SESSION_STARTING);
        this.setBoxState(SessionButton.BOXSTATE_STARTING);
        this.setExpanded(true);
    }

    SessionButton.prototype.showInSession = function () {
        this.setState(IN_SESSION);

        // Get rcenabled from the cookie instead of waiting for server to send it so border can be displayed
        // with correct color from the start
        if (UIState.get(UIState.RCENABLED))
            this.border.addClass("glance_rcenabled");
        getElement("#glance_ssn_key").html(GLANCE.Cobrowse.Visitor.getKey());

        this.setBoxState(UIState.get(UIState.BOXSTATE));
        this.setExpanded(UIState.get(UIState.EXPANDED));
    };

    SessionButton.BoxStates = ["starting", "integrated", "keyed", "joined", "video"];
    SessionButton.BOXSTATE_STARTING = 0;
    SessionButton.BOXSTATE_INTEGRATED = 1;
    SessionButton.BOXSTATE_KEYED = 2;
    SessionButton.BOXSTATE_JOINED = 3;
    SessionButton.BOXSTATE_VIDEO = 4;

    SessionButton.prototype.setBoxState = function (s) {
        var ssnkeybox = getElement("#glance_ssnkey_box");
        SessionButton.BoxStates.forEach(function (c) {
            ssnkeybox.removeClass(c);
        });
        ssnkeybox.addClass(SessionButton.BoxStates[s]);
        UIState.set(UIState.BOXSTATE, s);

        if (s == SessionButton.BOXSTATE_JOINED)
            getElement("#glance_ssn_info").elem.innerHTML = "You're sharing your browser.";
    }

    SessionButton.prototype.showJoinPrompt = function () {
        // Choose prompt depending on whether session key is an integrated visitorid
        this.setBoxState(GLANCE.Cobrowse.Visitor.isRandomKey() ? SessionButton.BOXSTATE_KEYED : SessionButton.BOXSTATE_INTEGRATED);
        this.setExpanded(true);
    }

    SessionButton.prototype.showSessionStopped = function () {
        this.setExpanded(false);
        this.setState(NOT_IN_SESSION);
    };

    SessionButton.prototype.showMessage = function (msg) {
        this.scrim.show();
        this.msgbox.showDialog();
        this.msgbox.getElement("#glance_msg").html(msg);
    }

    SessionButton.prototype.hideMessage = function () {
        this.msgbox.hide();
        this.msgbox.html("");
        this.scrim.hide();
    }

    SessionButton.prototype.setExpanded = function (exp) {
        (exp ? this.button.addClass : this.button.removeClass).call(this.button, "expanded");
        getElement("#glance_expand").setAttr("aria-expanded", exp);
        UIState.set(UIState.EXPANDED, exp);
    }

    SessionButton.prototype.show = function (show) {
        this.startlabel.elem.style.display = (show ? "block" : "");
    }

    SessionButton.prototype.toggle = function () {
        this.show(this.startlabel.elem.style.display === "");
    }

    function initUI() {


        if (getElement("#glance_cobrowse_btn"))
            return;
        ssnbutton = new SessionButton();

        GLANCE.Cobrowse.Visitor.addEventListener("agents", function (agentinfo) {
            // first agent has joined, hide session key message box
            if (UIState.get(UIState.BOXSTATE) < SessionButton.BOXSTATE_JOINED) {
                ssnbutton.setBoxState(SessionButton.BOXSTATE_JOINED);
                ssnbutton.setExpanded(false);
            }
        });

        GLANCE.Cobrowse.Visitor.addEventListener("reverseconfirm", function (ss) {
            ssnbutton.confirmation.show("glance_confirm_show", function () {
                ss.accept();
            }, function () {
                ss.decline();
            });
        });

        GLANCE.Cobrowse.Visitor.addEventListener("reverseended", function () {
            // Hide the reverse screenshare confirmation message box if it is still being displayed
            if (getElement('#glance_confirm_msg').elem.className.includes("glance_confirm_show"))
                ssnbutton.confirmation.hide();
        });

        function getScreenshare(screenshareView) {
            switch (screenshareView) {
                case "glance_screenshare":
                    return screenshare || (screenshare = new Screenshare());
                case "glance_agentvideo":
                    return agentvideo || (agentvideo = new AgentVideo());
            }
        }

        GLANCE.Cobrowse.Visitor.addEventListener("sessionstarting", function () {
            ssnbutton.showStarting();
            return true;
        });

        GLANCE.Cobrowse.Visitor.addEventListener("sessionstart", function () {
            ssnbutton.focus(); // for screen reader
            ssnbutton.hideMessage();
            ssnbutton.showJoinPrompt();
        });

        GLANCE.Cobrowse.Visitor.addEventListener("sessioncontinue", function () {
            ssnbutton.showInSession();
        });

        GLANCE.Cobrowse.Visitor.addEventListener("statereceived", function () {
        });

        GLANCE.Cobrowse.Visitor.addEventListener("sessionend", function () {
            ssnbutton.showSessionStopped();
        });

        GLANCE.Cobrowse.Visitor.addEventListener("error", function (err) {
            if (console && console.log) console.log("Error:", err.msg, err.params);
            var msg = err.msg; // default message
            switch (err.code) {
                case "conndrop":
                    // Failed to connect or lost connection to the session server
                    msg = "Could not connect to server <em>" + err.params.server + "</em>";
                    break;
                case "service":
                    // Failed to provision or lookup the session
                    msg = "Unable to connect to Glance";
                    break;
            }
            ssnbutton.showMessage(msg);
        });

        GLANCE.Cobrowse.Visitor.addEventListener("screenshare", function (ss) {
            getScreenshare(ss.screenshareView).show(ss);
        });

        GLANCE.Cobrowse.Visitor.addEventListener("screensharepaused", function (ss) {
            getScreenshare(ss.screenshareView).pause(ss);
        });

        GLANCE.Cobrowse.Visitor.addEventListener("screenshareresumed", function (ss) {
            getScreenshare(ss.screenshareView).resume(ss);
        });

        GLANCE.Cobrowse.Visitor.addEventListener("viewerinfo", function (v) {
            getScreenshare(v.screenshareView).viewerinfo(v);
        });

        GLANCE.Cobrowse.Visitor.addEventListener("blur", function () {
            ssnbutton.setState(SESSION_BLURRED);
            ssnbutton.show(false); // in case button was "shown"
            ssnbutton.border.hide();
        });

        GLANCE.Cobrowse.Visitor.addEventListener("focus", function () {
            ssnbutton.showInSession();
            ssnbutton.border.show();
        });

        GLANCE.Cobrowse.Visitor.addEventListener("rcrequested", function (rc) {
            function enableRC(enable) {
                return function () {
                    enable ? rc.accept() : rc.decline();
                }
            }

            ssnbutton.confirmation.show("glance_confirm_rc", enableRC(true), enableRC(false));
        });

        GLANCE.Cobrowse.Visitor.addEventListener("confirm", function (params) {
            ssnbutton.confirmation.show("glance_confirm_" + params["confirm"], params.accept);
        });

        GLANCE.Cobrowse.Visitor.addEventListener("rc", function (e) {
            (e.enabled ? ssnbutton.border.addClass : ssnbutton.border.removeClass).call(ssnbutton.border, "glance_rcenabled");

            // Cache rc enabled state in the cookie for quick access on next page
            UIState.set(UIState.RCENABLED, e.enabled);
        });

        GLANCE.Cobrowse.Visitor.addEventListener("connection", function (e) {
            ssnbutton.showDisconnected(e.status === "reconnecting");
        });

        GLANCE.Cobrowse.Visitor.addEventListener("urlstartwarning", function (w) {
            ssnbutton.confirmation.show("glance_confirm_xd", w.accept, w.decline);
        });

        // EXPORTS
        window.GLANCE.Cobrowse.VisitorUI.showTerms = function () { ssnbutton.showTerms(true); }
    }

    if (!ie8) {
        getDocument().onLoad(function () {
            // Call initUI once loader or visitor script is loaded
            if (window.GLANCE && GLANCE.Cobrowse && GLANCE.Cobrowse.Visitor)
                initUI();
            else
            {
                if (getElement("#cobrowsescript")) {//PRJ23878 - check introduced while flow coming from APPLY -> applyMM in IE11.
                    getElement("#cobrowsescript").addEvent("load", initUI);
                }
            }
        });
    }
})();


var glanceCbrUtility = (function () {
    var openTermsImpl = function () {
        var termsUrl = "https://answers.usbank.com/GSSChat/CoBrowseAgreement";
        window.open(termsUrl, "_blank", "width=800,height=800,top=10,left=10,scrollbars=1");
    }
    return {
        openTerms: openTermsImpl
    };
})();
