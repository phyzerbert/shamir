var GSSCLIENTHANDLER = (function () {
    var canStartDrag = 0;
    var lastKnownCoordinate;
    var dragComplete = 0;
    var prevX = 0;
    var keyboardDrag = 0;
    var dragStarted = 0;
    var getAbsoluteTop = function (node) {
        var obj = node;
        var positionArray = new Array();
        var curtop = obj.offsetTop;
        if (obj.offsetParent) {
            while (obj = obj.offsetParent) {
                curtop += obj.offsetTop - obj.scrollTop;
            }
        }
        return curtop;
    }
    var getAbsoluteLeft = function (obj) {
        var curleft = obj.offsetLeft;
        if (obj.offsetParent) {
            while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft - obj.scrollLeft;
            }
        }
        return curleft;
    }




    function drag_start(event) {
        if (canStartDrag == 0)
            return;
        dragStarted = 1;
        document.getElementById("dummyContainer").style.display = 'block';
        var style = style = event.target.currentStyle || window.getComputedStyle(event.target, null);
        var nodeLeft = getAbsoluteLeft(event.target);
        var nodeTop = getAbsoluteTop(event.target);
        event.dataTransfer.setData("text",
                    (nodeLeft - event.clientX) + ',' + (nodeTop - event.clientY));
    }
    function drag_over(event) {
        dragComplete = 1;
        var allowedY = ($("#chat_help").offset().top - $(document).scrollTop()) + event.clientY + 30;
        var allowedX = ($("#chat_help").offset().left - $(document).scrollLeft()) + event.clientX + 30;
        var dm = document.getElementById('chat_help');
        dm.style.left = Math.min((event.clientX - 30), allowedX) + 'px';
        dm.style.top = Math.min((event.clientY - 30), allowedY) + 'px';
        lastKnownCoordinate = Math.min((event.clientX - 30), allowedX) + ',' + Math.min((event.clientY - 30), allowedY);
        event.preventDefault();
        return false;
    }
    function drop(event) {
        dragComplete = 0;
        prevX = prevX + 1;
        document.getElementById("dummyContainer").style.display = 'none';
        var offset = event.dataTransfer.getData("text").split(',');
        //	lastKnownCoordinate=offset;
        var adjustedLeft = (event.clientX + parseInt(offset[0], 10));
        var adjustedTop = (event.clientY + parseInt(offset[1], 10));
        var dm = document.getElementById('chat_help');
        dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        return false;
    }
    gssConfigVAlues = {
        IsAlreadyLoaded: "False"
    };


    var fnGSSKeyEvents = function () {
        $(document).unbind('keydown');
        //  if(canStartDrag == 0)	{
        $(document).bind('keydown', function (e) { //set the keydown function as...
            if (keyboardDrag == 0 && e.which != 27)
                return;
            var startingLeftPoint = $("#chat_help").offset().left;
            //debugger;
            var gbody = document.body,
              ghtml = document.documentElement;

            var visibleWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
            var visibleHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
            var dHeight = ($("#chat_help").offset().top - $(document).scrollTop()); //+ 63.875;
            switch (e.which) {
                //left                     
                case 27: if (document.getElementById('kmiModalPopup') != null) {
                    if (document.getElementById('kmiModalPopup').style.display == 'block')
                        gssUtility.kmiClosePopup();
                    else
                        fnGSSWidgetClose();
                }
                else
                    fnGSSWidgetClose();
                    break;

                case 37: if (($("#chat_help").offset().left + 328) < $(window).width() && ($("#chat_help").offset().left + 328) > 354) {


                    var offset = $('#chat_help').offset();

                    $('#chat_help').css({
                        position: 'fixed',
                        // top: offset.top,
                        left: offset.left - 40

                    });

                }
                else if (($("#chat_help").offset().left + 328) > $(window).width() && ($("#chat_help").offset().left + 328) > 354) {
                    $("#chat_help").animate({
                        left: '-=40'
                    }, 5, function () {

                    });
                }
                    if (gssUtility.getCookie('G_stat') == 'Max') {
                        e.preventDefault();
                    }
                    break;
                    //Right                                  
                case 39: if (($("#chat_help").offset().left + 281) < $(window).width()) {
                    $("#chat_help").animate({
                        left: '+=40'
                    }, 5, function () {

                    });
                }
                    if (gssUtility.getCookie('G_stat') == 'Max') {
                        e.preventDefault();
                    }
                    break;
                    //up                          
                case 38:
                    if ((($("#chat_help").offset().top - $(document).scrollTop()) + 63.875) < visibleHeight &&
					(($("#chat_help").offset().top - $(document).scrollTop()) + 63.875) > 85) {
                        var newTop = ($("#chat_help").offset().top - $(document).scrollTop()) - 40;
                        $('#chat_help').css({
                            position: 'fixed',
                            top: newTop

                        });

                    }
                    else if (dHeight > visibleHeight && dHeight > 85) {
                        var newTop = ($("#chat_help").offset().top - $(document).scrollTop()) - 40;
                        $('#chat_help').css({
                            position: 'fixed',
                            top: newTop
                        });

                    }
                    if (gssUtility.getCookie('G_stat') == 'Max') {
                        e.preventDefault();
                    }
                    break;
                    //down                          
                case 40:

                    if (dHeight < visibleHeight && dHeight < 310) {
                        $("#chat_help").animate({
                            top: '+=40'
                        }, 5, function () {

                        });
                    }
                    else if (dHeight > visibleHeight && dHeight > 200) {
                        $("#chat_help").animate({
                            top: '+=40'
                        }, 5, function () {

                        });
                    }
                    if (gssUtility.getCookie('G_stat') == 'Max') {
                        e.preventDefault();
                    }
                    break;
            }
        });
        //}
    }

    var getAfToken = function () {
        var currentUrl = window.location.href;
        var afToken = currentUrl.match(/af\(.*\)/);
        if (afToken && afToken.length > 0)
            return afToken[0];
        else
            return '';
    }

    var fnGSSWidgetClose = function () {
        $(document).unbind('keydown');
        $("#btnGSSLaunch").show();
        $("#gssUIWrapper > div").removeClass('notransition');
        $("#gssUIWrapper > div").css({ "transition": "all ease-in .3s" });
        $("#chat_help").removeClass("chat_help_active");

        gssUtility.setCookie('G_stat', 'Min');
        if (dragStarted > 0) {
            $("#chat_help").addClass("resetChatWindow");
            $("#chat_help").css({ "bottom": "-475px", "left": "", "top": "" });
        }
        $("#btnGSSClose").removeClass('icon-arrow_org');

        setGSSWindowStatus('minimized');
        $("#btnGSSLaunch").focus();
        setTimeout(function () {
            document.getElementById("chat_help").style.display = "none";
        }, 350);
        if (gssUtility.getCookie('G_sess') == "e") {

            var src = gssUtility.getGSSIFRAMEUrl();
            document.getElementById('IframeGSS').src = src;

        }
        //SITECAT
        try {
            s.linkTrackVars = 'prop2,prop4,prop6,prop7,prop53,prop29,evar35,eVar8,prop8,prop40,eVar40,eVar90,prop24,events,contextData.appNameForSiteCat,contextData.uxNameForSiteCat,contextData.appName_PERS,contextData.uxName_PERS';
            s.linkTrackEvents = '';
            s.prop2 = 'olb gss';
            s.prop4 = s.linkTrackVars;
            s.prop6 = s.linkTrackVars;
            s.prop7 = s.linkTrackVars;
            s.eVar90 = s.prop29;

            s.eVar35 = 'gss window minimized';
            s.eVar40 = (cd.currentPage ? cd.currentPage : s.pageName) + ':gss';   ///gssUtility.getCookie('G_lp');
            s.prop53 = 'gss window minimized';
            //   prop24=s.getPageName();
            s.events = 'event118';        // GSS Button Minimize
            s.tl(this, 'o', 'gss window minimized', null, 'navigate');
            s.linkTrackVars = "";
            s.eVar40 = "";
            s.prop2 = "";
        }
        catch (err) {

            console.log('SiteCat-fnGSSWidgetClose-Error=' + err.message);
        }
        ///END OF SITECAT	
    }
    var GSS_WidgetPopup = function () {
        document.getElementById("chat_help").style.display = "block";
        fnGSSKeyEvents();
        if (dragStarted > 0) {
            document.getElementById("gssUIWrapper").style.display = "block";
            $("#chat_help").css({ "bottom": "0px", "positon": "fixed", "top": "" });

            $("#chat_help").removeClass("resetChatWindow");
        }
        $('#chat_help').addClass("chat_help_active");
        gssUtility.setCookie('G_stat', 'Max');
        //if (gssUtility.getCookie('G_lch') == 'N') {

        //    if ((s.getPageName().indexOf("CustomerDashboard") > 0) || (s.getPageName().indexOf("AccountDashboard") > 0) || (s.getPageName().indexOf("HelpCenter") > 0) || (s.getPageName().indexOf("ContactUs") > 0) || (s.getPageName().indexOf("SelfServiceDashboardIndex") > 0)) {
        //        try {
        //            gssUtility.setCookie('G_lch', 'A');

        //        } catch (e) { }
        //    }
        //}
        setGSSWindowStatus('maximized');
        $("#btnGSSLaunch").hide();

        setTimeout(function () {

            $("#gssUIWrapper > div").addClass('notransition');
            $("#btnGSSClose").addClass('icon-arrow_org');

            $("#btnGSSClose").focus();

        }, 250);

        if (gssConfigVAlues.IsAlreadyLoaded == 'False') {
            gssConfigVAlues.IsAlreadyLoaded = 'TRUE';
            if (gssUtility.getCookie('G_lp') == '') {
                gssUtility.setCookie('G_lp', 'ALREAD_Loaded');
                document.getElementById('IframeGSS').src = gssUtility.getGSSIFRAMEUrl('reaload');
            }
            else {
                document.getElementById('IframeGSS').src = gssUtility.getGSSIFRAMEUrl();
            }
        }
    }

    var setGSSWindowStatus = function (status) {
        var message = { name: "Window1", gssWindowStatus: status, pageUrl: s.pageName };
        document.getElementById('IframeGSS').contentWindow.postMessage(message, '*');
    }
    var setGSSValues = function (vid, mid) {
        var message = { name: 'GSSInitialize', VID: vid, MID: mid, pageUrl: s.pageName };
        document.getElementById('IframeGSS').contentWindow.postMessage(message, '*');
    }
    var GSSCoreImp = function () {
        fnGSSKeyEvents();
        var dm = document.getElementById('chat_help');
        dm.addEventListener('dragstart', drag_start, false);
        document.body.addEventListener('dragover', drag_over, false);
        document.body.addEventListener('drop', drop, false);

        document.body.addEventListener("dragend", function (event) {
            var isFirefox = typeof InstallTrigger !== 'undefined';
            var standbyoffset = lastKnownCoordinate.split(',');
            if (isFirefox != true) {
                // reset the transparency
                // event.target.style.opacity = "";
                var jaba = '';
                prevX = prevX + 2;
                var offset = event.dataTransfer.getData("text").split(',');
                var standbyoffset = lastKnownCoordinate.split(',');
                var adjustedLeft = (event.clientX + parseInt(offset[0], 10));
                var adjustedTop = (event.clientY + parseInt(offset[1], 10));
                var dm = document.getElementById('chat_help');
                var dHeight = ($("#chat_help").offset().top - $(document).scrollTop());
                if (event.clientY <= 30)
                    dm.style.top = 5 + 'px';
                if (event.clientX <= 20)
                    dm.style.left = 5 + 'px';

                if (event.clientY >= dHeight)
                    dm.style.top == (dHeight - 405) + 'px';

                if (dHeight > 550) {
                    dm.style.top = 550 + 'px';
                }
                if (event.clientX >= ($(window).width()) - 300)
                    dm.style.left = ($(window).width() - 300) + 'px';
            }
            else {
                // reset the transparency
                // event.target.style.opacity = "";
                var jaba = '';
                prevX = prevX + 2;

                var offset = event.dataTransfer.getData("text").split(',');

                var standbyoffset = lastKnownCoordinate.split(',');
                //	lastKnownCoordinate=offset;
                var adjustedLeft = parseInt(standbyoffset[0]);
                var adjustedTop = parseInt(standbyoffset[1]);

                var dm = document.getElementById('chat_help');
                var dHeight = ($("#chat_help").offset().top - $(document).scrollTop());
                if (adjustedTop <= 30)
                    dm.style.top = 5 + 'px';
                if (adjustedLeft <= 20)
                    dm.style.left = 5 + 'px';

                if (adjustedTop >= dHeight)
                    dm.style.top == (dHeight - 405) + 'px';

                if (dHeight > 550) {
                    dm.style.top = 550 + 'px';
                }

                if (adjustedLeft >= ($(window).width()) - 300)
                    dm.style.left = ($(window).width() - 300) + 'px';
            }
        }, false);

        //step 0- Set the GSS widget positioning
       
        var rp;
        var flnObj = document.getElementById("firstLevelNav");
        if (flnObj == null || flnObj == undefined) {
            if (gssUtility.getCookie("G_alg") != null)
                rp = gssUtility.getCookie("G_alg");
            else
            rp= 280;//postioning to a default value
        }
        else
        rp = flnObj.getBoundingClientRect().left;

         document.getElementById("chat_help").style.right = rp + "px";
         document.getElementById("btnGSSLaunch").style.right = rp + "px";

         if (gssUtility.getCookie('G_stat') != null) {
            if (gssUtility.getCookie('G_stat') == "N")
              gssUtility.setCookie('G_alg', rp);
                }         
            //step 1 - Enable the widget
        var drag = 0;


        document.getElementById("gssUIWrapper").style.display = "block";
        if (gssUtility.getCookie('G_stat') == 'N') {//from authentication project
            gssUtility.setCookie('G_stat', 'H');
        }
        //CHECK IF WINDOW ACTIVE, if yes popup
        if (gssUtility.getCookie('G_stat') != null && gssUtility.getCookie('G_sess') != null) {
            if (gssUtility.getCookie('G_sess') == 's') {// maximize window only if active session 
                if (gssUtility.getCookie('G_stat') == 'Max') {
                    GSS_WidgetPopup();
                }
            }
        }
        $("#dummyContainer").click(function() {
            document.getElementById("dummyContainer").style.display = 'none';
        });
        $("#dummyContainer").mouseenter(function() {
            document.getElementById("dummyContainer").style.display = 'none';
        });
        $("#spnGSSheaderCenter").mousedown(function() {
            return false;
        });

        $('#btnGSSClose').keydown(function(event) {
            if(event.shiftKey && event.keyCode == 9) {
            }
            else if (event.keyCode == 9 || event.keyCode == 40) {

                var message = { name: 'GSSOLBFocus', focusMovedfromOLB: 'true' };
                document.getElementById('IframeGSS').contentWindow.postMessage(message, '*');
            }
        });
        var dragImgHandle = document.getElementById("dragImg");
        dragImgHandle.addEventListener("keydown", function (eve) {
            //keyboardDrag=1; 
            if(eve.which == 13 || eve.which == 32) {

                keyboardDrag = 1;
                canStartDrag = 1;
                dragStarted = 1;
            }
        }, true);
        dragImgHandle.addEventListener("focus", function (event) {
            canStartDrag = 1;
        }, true);

        dragImgHandle.addEventListener("blur", function (event) {
            keyboardDrag = 0;
        }, true);

        $("#btnGSSLaunch").unbind().click(function() {
            GSS_WidgetPopup();
            // SITECAT
            try {
                s.linkTrackVars = 'prop2,prop4,prop6,prop7,prop53,prop29,evar35,eVar8,prop8,prop40,eVar40,eVar90,prop24,events,contextData.appNameForSiteCat,contextData.uxNameForSiteCat,contextData.appName_PERS,contextData.uxName_PERS';
                s.linkTrackEvents = '';
                s.prop2 = 'olb gss';
                s.prop4 = s.linkTrackVars;
                s.prop6 = s.linkTrackVars;
                s.prop7 = s.linkTrackVars;
                s.eVar90 = s.prop29;

                s.eVar35 = "gss button click";

                s.eVar40 = (cd.currentPage ? cd.currentPage: s.pageName) + ':gss';
                s.prop53 = 'gss button click';

                s.events = 'event117';  //GSS Button Click
                s.tl(this, 'o', 'gss button click', null, 'navigate');
                s.linkTrackVars = "";
                s.eVar40 = "";
                s.prop2 = "";
            }
            catch (err) {
                console.log('SiteCat-GSS_WidgetPopup-Error=' + err.message);
            }
            //END OF SITECAT      
        });
        $("#imgClose").unbind().click(function() {
            fnGSSWidgetClose();
        });
        $("#helpCenterId").keydown(function(event) {
            if(event.which == 13 || event.which == 32) {
                gssUtility.helpCenterUrl();
            }
        });






        var handleEvent = function (event, args) {
            if(event.data.urlToLaunch === undefined || event.data.urlToLaunch == "") {
                if (event.data.name == "gssWindow" && event.data.windowStatus == "close") {
                    fnGSSWidgetClose();
                }
                else if (event.data.sessionStatus == "" || event.data.sessionStatus === undefined) {
                    return;
                }
                else if (event.data.sessionStatus == "started") {
                    gssUtility.setCookie('G_sess', 's');
                    var VID = null;
                    var MID = null;
                    if (typeof window.visitor != 'undefined') {
                        VID = visitor.getAnalyticsVisitorID();
                        MID = visitor.getMarketingCloudVisitorID();
                    }
                    setGSSValues(VID, MID);
                }
                else if (event.data.sessionStatus == "ended") {
                    gssUtility.setCookie('G_sess', 'e');
                    fnGSSWidgetClose();
                }
                else if (event.data.sessionStatus == "endCobrowse") {
                    try {
                        if (GLANCE.Cobrowse.Visitor.inSession() == true)
                            GLANCE.Cobrowse.Visitor.stopSession();
                    }
                    catch (e) {
                    }
                }

            }
            else {
                if ((event.data.name == "gssWindow") && (event.data.windowStatus == "close")) {
                    fnGSSWidgetClose();
                }
                else if (event.data.name == "kmiurl") {
                    gssUtility.kmiShowPopup(event.data.urlToLaunch);
                    return false;
                }
                else if (event.data.name == "dotcomUrl") {
                    window.open(event.data.urlToLaunch);
                    return false;
                }
                if (event.data.urlToLaunch == '/CCAP/[[AFTOKEN]]/FindPastCheckOrDepositSlipImages') {
                    var accountType = "";      // AccountType will be check based on the FunctionName call in CommonDataHelper.js
                    var accountIndex = "";     //No values will be passed from SS
                    var parameters = {
                        AccountIndex: accountIndex,
                        AccountType: accountType
                    };
                    var action = 'FindPastCheckorDepositSlipImages';
                    gssUtility.redirectToCCAP('/CCAP/LandingPage.aspx', action, parameters);
                    return true;
                }
                else if (event.data.urlToLaunch == '/CCAP/[[AFTOKEN]]/ActivateCheckCard') {
                    var accountType = "";      // AccountType will be check based on the FunctionName call in CommonDataHelper.js
                    var accountIndex = "";     //No values will be passed from SS
                    var parameters = {
                        AccountIndex: accountIndex,
                        AccountType: accountType
                    };
                    var action = 'ActivateYourCheckCard';
                    gssUtility.redirectToCCAP('/CCAP/LandingPage.aspx', action, parameters);
                    return true;
                }
                else if (event.data.urlToLaunch == '/CCAP/[[AFTOKEN]]/EmailUs') {
                    var accountType = "";      // AccountType will be check based on the FunctionName call in CommonDataHelper.js
                    var accountIndex = "";     //No values will be passed from SS
                    var parameters = {
                        AccountIndex: accountIndex,
                        AccountType: accountType
                    };
                    var action = 'EmailUs';
                    gssUtility.redirectToCCAP('/CCAP/LandingPage.aspx', action, parameters);
                    return true;
                }
                else if (event.data.urlToLaunch == '/CCAP/[[AFTOKEN]]/ReportCardAsLostorStolen') {
                    var accountType = "";      // AccountType will be check based on the FunctionName call in CommonDataHelper.js
                    var accountIndex = "";     //No values will be passed from SS
                    var parameters = {
                        AccountIndex: accountIndex,
                        AccountType: accountType
                    };
                    var action = 'ReportCardAsLostorStolen';
                    gssUtility.redirectToCCAP('/CCAP/LandingPage.aspx', action, parameters);
                    return true;
                }
                else if (event.data.urlToLaunch == '/CCAP/[[AFTOKEN]]/RequestPastStatements') {
                    var accountType = "";      // AccountType will be check based on the FunctionName call in CommonDataHelper.js
                    var accountIndex = "";     //No values will be passed from SS
                    var parameters = {
                        AccountIndex: accountIndex,
                        AccountType: accountType
                    };
                    var action = 'RequestPastStatements';
                    gssUtility.redirectToCCAP('/CCAP/LandingPage.aspx', action, parameters);
                    return true;
                }
                else if (event.data.urlToLaunch == '/CCAP/[[AFTOKEN]]/DisputeCharge') {
                    var accountType = "";      // AccountType will be check based on the FunctionName call in CommonDataHelper.js
                    var accountIndex = "";     //No values will be passed from SS
                    var parameters = {
                        AccountIndex: accountIndex,
                        AccountType: accountType
                    };
                    var action = 'DisputeACharge';
                    gssUtility.redirectToCCAP('/CCAP/LandingPage.aspx', action, parameters);
                    return true;
                }
                else {

                    window.location.replace(event.data.urlToLaunch.replace("[[AFTOKEN]]", getAfToken()));
                }
            }
        };
        window.addEventListener('message', handleEvent, false);
        try { // glance Co-browse :: Playing sound when the agent is live// this sound file is kb size , we will change this to host in OLB, so that we can avoid tunnel request
            GLANCE.Cobrowse.Visitor.addEventListener('sessionstart', function (event, args) {
                window.setTimeout(function() {
                    var obj = document.createElement("audio");
                    obj.src = "https://www.cobrowsing.net/beep.mp3"; //You may download any audible of your choosing and reference it here
                    obj.volume = 0.10;
                    obj.autoPlay = false;
                    obj.preLoad = true;
                    obj.play();
                }, 2000);

            });
        } catch (e) {

        }
        $('#clientsOpen').click(function() {
            $('#clientsDropDown #clientsDashboard').slideToggle({
                direction: "up"
            }, 300);
            $(this).toggleClass('clientsClose');
        }); // end click
    }

    return {
        GSSCore: GSSCoreImp
    };

}) ();



var gssUtility = (function () {
    var getAfTokenImp = function () {
        var currentUrl = window.location.href;
        var afToken = currentUrl.match(/af\(.*\)/);
        if (afToken && afToken.length > 0)
            return afToken[0];
        else
            return '';
    }
    var helpCenterUrlImpl = function () {

        window.location.replace("/USB/" + getAfTokenImp() + "/HelpCenter.aspx");
    };

    // Added for Gss:: All this variables needs to be coming from constants:: this is just a starting point for contractors to work
    var setCookieImpl = function (cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };
    var getCookieImpl = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    };

    var deleteCookieImpl = function (name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };


    var redirectToCCAPImp = function (urlPath, functionName, params, openInNewWindow, isBrokerageCall, isTrustCall) {
        var form = document.createElement("form");
        var functionToCall = functionName;  //Just incase the functionName are same

        form.setAttribute("method", "post");
        form.setAttribute("action", urlPath);

        switch (functionName) {
            case "ChangeCheckORATMCardPIN":
                functionToCall = "ChangePIN"; //CCAP Integration
                accountType = "DDA";
                break;
            case "ReportCardAsLostorStolen":
            case "ReportCheckasLostorStolen":
                functionToCall = "ReportLostStolen";
                accountType = "DDA";
                break;
            case "DisputeACharge":
            case "BCCreditCardDisputeCharge":
                functionToCall = "DisputeCharge";
                accountType = "CCD";
                break;
            case "ReportCreditCardAsLostOrStolen":
            case "ReportOtherCardAsLostOrStolen":
                functionToCall = "ReportLostStolen";
                accountType = "CCD";
                break;
            case "StopPaymentonaCheck":
                functionToCall = "ReportLostStolen";
                accountType = "DDA";
                break;
            case "FindPastCheckorDepositSlipImages":
                //Defect DTSYS00129368 Fixed : Added case for CheckingFindPastCheckOrDepositSlipImages
            case "CheckingFindPastCheckOrDepositSlipImages":
                functionToCall = "FindChecks"; //CCAP Integration
                accountType = "DDA";
                break;
            case "RequestPastStatements":
                functionToCall = "RequestStatements"; //CCAP Integration
                accountType = "DDA";
                break;
                //RQT 456 Start  - overdraft coverage                                                                                                
            case "CheckingATMAndCheckCardOverdraftCoverage":
            case "ManageOverdraftCoverage":
                functionToCall = "ChangeODCoverage";
                accountType = "DDA";
                break;
                //RQT 456 End - overdraft coverage                                                                                               
            case "ActivateYourCheckCard":
                functionToCall = "ActivateCheckCard"; //CCAP Integration
                accountType = "DDA";
                break;
                //RQT 407 Start: Request a U.S. Bank Check Card                                                                                               
            case "RequestaCheckCard":
                functionToCall = "RequestCheckCard";
                accountType = "DDA";
                break;
                //RQT 407 End: Request a U.S. Bank Check Card                                                                                                
                //Start: ^PCR358 - My Profile - new entries for My profile edit CCAP links                                                                                               
            case "UpdatePhone":
            case "UpdateMobile":
            case "UpdateEmail":
            case "UpdateAddress":
            case "ChangePersonalID":
            case "ChangePassword":
            case "ChangeIDShieldQA":
            case "ChangeIDShieldImage":
                accountType = "";
                break;
                //End: ^PCR358 - My Profile                                                                                  
                // Start: RQT422 - CCAP Links for Alerts                                                                                                 
            case "QuietTimeEnabled":
                functionToCall = "QuiteTimeEnable";
                accountType = "";
                break;
            case "AccountAlertFaqs":
                functionToCall = "AccountAlertsFaq"; //CCAP Integration
                accountType = "";
                break;
            case "SecurityAlertFaqs":
                functionToCall = "SecurityAlertsFaq"; //CCAP Integration
                accountType = "";
                break;
            case "StartAlertFaqs":
                functionToCall = "StartAlertsFaq"; //CCAP Integration
                accountType = "";
                break;
                // Added for PCR 410                                                                                  
            case "IdShieldFaq":
                functionToCall = "IdShieldFaq"; //CCAP Integration for PCr 410
                accountType = "";
                break;
                // End PCR 410                                                                                  
                // End: RQT422 - CCAP Links for Alerts                                                                   
            default:
                if (isBrokerageCall !== null && isBrokerageCall !== undefined && isBrokerageCall.toLowerCase() == 'true') {
                    accountType = "INV";
                }
                else if (isTrustCall !== null && isTrustCall !== undefined && isTrustCall.toLowerCase() == 'true') {
                    accountType = "TST";
                }
                else {
                    accountType = ""; //PCR 370 - Adding this code here to cover all other cases
                }
                break;
            }

        //Logic for generating function name can be implemented here ,Since CCAP expects functionName differently than OLB
        var hdFunctionName = document.createElement("input");
        hdFunctionName.setAttribute("type", "hidden");
        hdFunctionName.setAttribute("name", "FunctionName");
        hdFunctionName.setAttribute("value", functionToCall);

        var hdReturnurl = document.createElement("input");
        hdReturnurl.setAttribute("type", "hidden");
        hdReturnurl.setAttribute("name", "Returnurl");
        hdReturnurl.setAttribute("value", '/USB/' + getAfTokenImp() + '/CustomerDashboard/Index');

        var hdKeepaliveurl = document.createElement("input");
        hdKeepaliveurl.setAttribute("type", "hidden");
        hdKeepaliveurl.setAttribute("name", "Keepaliveurl");
        hdKeepaliveurl.setAttribute("value", '/USB/PingImage.ashx');

        var hdTimeout = document.createElement("input");
        hdTimeout.setAttribute("type", "hidden");
        hdTimeout.setAttribute("name", "Timeout");
        //  PCR 410 Added condition for to check the undefined condition for Session time on Send/Receive money and deposit
        //if (CommonDataHelper.urls.SessionTimeout != undefined) {
        hdTimeout.setAttribute("value", 450);
        // } else {
        //   hdTimeout.setAttribute("value", 30);
        //}
        // End condition

        //START : User story B-26071
        var hdWarningTimeout = document.createElement("input");
        hdWarningTimeout.setAttribute("type", "hidden");
        hdWarningTimeout.setAttribute("name", "WarningTimeout");
        hdWarningTimeout.setAttribute("value", 30);
        //END : User story B-26071

        var hdLogouturl = document.createElement("input");
        hdLogouturl.setAttribute("type", "hidden");
        hdLogouturl.setAttribute("name", "Logouturl");
        hdLogouturl.setAttribute("value", '/Auth/LogoutConfirmation');

        var customerSegmentTypeCode = "";
        //        if (CommonDataHelper.UserAndAccountsFromServer != undefined && CommonDataHelper.UserAndAccountsFromServer != null &&
        //                CommonDataHelper.UserAndAccountsFromServer.UserInfoResponse != undefined && CommonDataHelper.UserAndAccountsFromServer.UserInfoResponse != null) {
        //            customerSegmentTypeCode = CommonDataHelper.UserAndAccountsFromServer.UserInfoResponse.CustomerTypeCode;
        //        }

        var hCustomerSegmentType = document.createElement("input");
        hCustomerSegmentType.setAttribute("type", "hidden");
        hCustomerSegmentType.setAttribute("name", "CustomerTypeCode");
        hCustomerSegmentType.setAttribute("value", customerSegmentTypeCode);

        form.appendChild(hdFunctionName);
        form.appendChild(hdReturnurl);
        form.appendChild(hdKeepaliveurl);
        form.appendChild(hdTimeout);
        form.appendChild(hdWarningTimeout);
        form.appendChild(hdLogouturl);
        form.appendChild(hCustomerSegmentType);

        //for all other parameters we can use this logic
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                if (key != undefined && key.length > 0) {
                    var value = params[key];
                    if (key == "AccountType" || value != undefined && value != "") {
                        var hiddenField = document.createElement("input");
                        hiddenField.setAttribute("type", "hidden");
                        hiddenField.setAttribute("name", key);
                        if (key == "AccountType") {
                            hiddenField.setAttribute("value", accountType);
                        } else {
                            hiddenField.setAttribute("value", value);
                        }
                        form.appendChild(hiddenField);
                    }
                }
            }
        }
        // Added condition for PCR 410
        if (openInNewWindow != undefined && openInNewWindow === true)
            form.target = "_blank";
        // End PCR 410    
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };

    var getGssIframeURLImple = function (status) {
        var gssChatStatus = 1;
        var HLPID = getCookieImpl('riblpid');
        var SFURL = document.getElementById("GSSChaturl").value;
        if (status != 'reaload') {
            //  if (getCookieImpl('G_on') != null) {
            //if (gssUtility.getCookie("G_on") == "T") {
            if (gssUtility.getCookie('G_sess') == "e" || gssUtility.getCookie('G_sess') == "Na")
                gssChatStatus = 1;
            else
                gssChatStatus = 0; //0: Refresh load or navigation load

            if (gssUtility.getCookie('G_sess') == "Na")
                gssUtility.setCookie('G_sess', 'Wt');// setting the status to Wt , as during the first load, Na change to Wt(waiting for session)
            //}
            //    else { gssChatStatus = 1; }
            //} //1: value is not true, so it is first time load after login
        }
        var VID = null;
        var MID = null;
        if (typeof window.visitor != 'undefined') {
            VID = visitor.getAnalyticsVisitorID();
            MID = visitor.getMarketingCloudVisitorID();
        }
        var IsMMPage = document.getElementById('IsMMPage') != null ? document.getElementById('IsMMPage').value: undefined;
        if (IsMMPage == undefined) {
            var elgc;
            if (document.getElementById('hdnInEligibility') != null) {
                setCookieImpl('G_elg', document.getElementById('hdnInEligibility').value);
                elgc = document.getElementById('hdnInEligibility').value;
            }
            else
                elgc = getCookieImpl('G_elg');
        }
        else {
            elgc = getCookieImpl('G_elg');
        }

        var src = SFURL + '?HLPID=' + HLPID + '&VID=' + VID + '&MID=' + MID + '&ELC=' + elgc + '&gssChatStatus=' + gssChatStatus;   //
        return src;
    };
    var kmiClosePopupImpl = function () {
        try {

        if(document.getElementById('kmiModalPopup') != null) {
            document.getElementById('kmi_content_Frame').src = '';
            document.getElementById('kmiModalPopup').style.display = 'none';
            document.getElementById('kmi_cover').style.display = 'none';
            if (navigator.userAgent.indexOf("Firefox") != -1) {
                document.getElementById('IframeGSS').focus();
            }
            var message = { name: 'GSSKMIClose', KMIClosed: 'true' };
            document.getElementById('IframeGSS').contentWindow.postMessage(message, '*');

            document.getElementsByTagName("body")[0].setAttribute("aria-hidden", "false");
            document.getElementsByTagName("body")[0].removeAttribute("aria-hidden");
            setTimeout(function() {
                $('#kmiModalPopup').attr("aria-hidden", "true");
                document.getElementById("kmiModalPopup").setAttribute("aria-hidden", "true");
            }, 500);
        }
      }
       catch (e) { }
    };
    var kmiShowPopupImpl = function (url) {
        try {
        if(url === undefined || url == '') {
        }
        else {
            if (document.getElementById('kmiModalPopup') != null) {
                document.getElementById('kmi_content_Frame').src = url;
                document.getElementById('kmiModalPopup').style.display = 'block';
                document.getElementById('kmi_cover').style.display = 'block';
                document.getElementById('kmi_cancel_btn').focus();

                document.getElementsByTagName("body")[0].setAttribute("aria-hidden", "true");
                setTimeout(function() {
                    $('#kmiModalPopup').attr("aria-hidden", "false");
                    document.getElementById("kmiModalPopup").setAttribute("aria-hidden", "false");
                    }, 500);              
            }
          }
        }
        catch (e) { }
    };

    return {
        getGSSIFRAMEUrl: getGssIframeURLImple,
        setCookie: setCookieImpl,
        getCookie: getCookieImpl,
        deleteCookie: deleteCookieImpl,
        redirectToCCAP: redirectToCCAPImp,
        helpCenterUrl: helpCenterUrlImpl,
        kmiClosePopup: kmiClosePopupImpl,
        kmiShowPopup: kmiShowPopupImpl
    };
}) ();
//end GSS 