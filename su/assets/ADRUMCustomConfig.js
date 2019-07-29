//Defect# 21762 Begin
try {
    if (typeof (signOnUserId) === "undefined") {
        signOnUserId = "";
    }
}
catch (ex) {
    //console.error(ex);
}

try {
    window["adrum-start-time"] = new Date().getTime();
    window['adrum-config'] = {
        userEventInfo: {
            //information available on load can be captured here. Data initialized in later events cannot be captured here.
            "PageView": function (context) {
                return {
                    userData: {
                        UserID: signOnUserId ? signOnUserId.toLowerCase() : "",
                        //pagename tag set before omniture call
                        PageName: s.pageName ? s.pageName.toLowerCase() : "",
                        //prop13 has error message most of the time. There are however other minor uses for this property
                        Prop13: s.prop13 ? s.prop13.toLowerCase() : "",
                        CurrentPage: cd.currentPage ? cd.currentPage.toLowerCase() : "",
                        ErrorStatus: cd.errorStatus ? cd.errorStatus.toLowerCase() : ""
                    }
                }
            },
            //capture omniture tags and report to AppD. This configuration is common to all AJAX calls but
            //everything other than sign on user Id is only available during omniture calls most times.
            //sometimes its possible that all variables are set in non - omniture calls when an omniture call
            //had been made earlier.
            "Ajax": function (context) {
                return {
                    userData: {
                        UserID: signOnUserId ? signOnUserId.toLowerCase() : "",
                        //pagename tag set before omniture call
                        PageName: s.pageName ? s.pageName.toLowerCase() : "",
                        //prop13 has error message most of the time. There are however other minor uses for this property
                        Prop13: s.prop13 ? s.prop13.toLowerCase() : "",
                        CurrentPage: cd.currentPage ? cd.currentPage.toLowerCase() : "",
                        ErrorStatus: cd.errorStatus ? cd.errorStatus.toLowerCase() : ""
                    }
                }
            },
            //this section is for dynamically regenerated SPA views AKA Virtual Pages
            "VPageView": function (context) {
                return {
                    userData: {
                        UserID: signOnUserId ? signOnUserId.toLowerCase() : "",
                        //pagename tag set before omniture call
                        PageName: s.pageName ? s.pageName.toLowerCase() : "",
                        //prop13 has error message most of the time. There are however other minor uses for this property
                        Prop13: s.prop13 ? s.prop13.toLowerCase() : "",
                        CurrentPage: cd.currentPage ? cd.currentPage.toLowerCase() : "",
                        ErrorStatus: cd.errorStatus ? cd.errorStatus.toLowerCase() : ""
                    }
                }
            }
        }
    };
}
catch (ex) {
    //console.error(ex);
}
//Defect# 21762 End
