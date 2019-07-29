(function(global) {
    var _transmitURL, _xmPath;

    var configureTSExtendSession = function(xmPath, transmitURL) {
        if (transmitURL) _transmitURL = transmitURL;
        if (xmPath) _xmPath = xmPath;

        extendTSSession();
    };

    var extendTSSession = function(forceUpdate) {
        try {
            if (!require) return;

            if (!forceUpdate && !sessionIntervalElapsed()) return;
            var additionalParams = {};

            var transmitAppID = sessionStorage.getItem('ts:appid');
            var userName = sessionStorage.getItem('ts:userid');
            if (!transmitAppID || !userName) return;

            if (_xmPath) require({ paths: { 'xm': _xmPath} });

            require(['xm/xmui', 'xm/xm_api'], function(xmui, xm) {
                var uiConf = {
                    "loginConf": {
                        "aid": transmitAppID,
                        "policy": 'heartbeat',
                        "additionalParams": additionalParams
                    }
                };

                xmui.configure(uiConf);
                if (_transmitURL) xm.setWebloginUrl(_transmitURL);

                var uiContainer = document.createElement('div');
                var authResultPromise = xmui.startAuthUi(userName, uiContainer);
                authResultPromise.then(
                function(response) { setLastUpdatedTime(); },
                function(response) { });
            });
        }
        catch (ex) { }
    }

    var sessionIntervalElapsed = function() {
        var lastUpdatedTime = sessionStorage.getItem('ts:sessionUpdatedAt');
        if (!lastUpdatedTime) {
            setLastUpdatedTime();
            return false;
        }

        var currentTime = new Date().getTime();
        var elapsedTime = (currentTime - lastUpdatedTime) / (1000 * 60);
        return elapsedTime > 10;
    }

    var setLastUpdatedTime = function() {
        sessionStorage.setItem('ts:sessionUpdatedAt', new Date().getTime());
    }

    global.ExtendTSSession = extendTSSession;
    global.ConfigureTSExtendSession = configureTSExtendSession;
})(window);