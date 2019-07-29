// ForEach fallback ie11
if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
var toggleHAMBURGER = document.getElementById("usb-olb-hamburger-toggle"),
            togglePersonal = document.getElementById("usb-olb-personal-toggle"),
            toggleMENULIST = document.querySelectorAll("[data-navigation-source]"),
            usbArrow = document.getElementById("usb-olb-navigation--arrow"),
            USBMenuALLYSource = document.querySelectorAll('[aria-haspopup="true"]'),
            USBMenuALLYGroups = document.querySelectorAll('[role="menu"]'),
            previousMenuItemState = toggleMENULIST[0],
            arrowMovementState = previousMenuItemState,
            previousMenuALLYState = undefined,
            startMenu = document.querySelectorAll(".usb-olb-default")[0],
            previousMenuItemActive,
            hamburgerState = false;

toggleHAMBURGER.addEventListener('click', function(event) {
    menuToggle(toggleHAMBURGER);

    hamburgerState = !hamburgerState;

    if (hamburgerState == false) {
        var openElements = document.querySelectorAll('.usb-olb-visible');

        openElements.forEach(function(e) {
            return e.classList.remove('usb-olb-visible');
        });
    } else {
        var focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusableElements.forEach(function(element) {
            element.setAttribute('tabindex', 0);
        });
    }
});

toggleMENULIST.forEach(function(element) {
    element.addEventListener('click', function (event) {
        /* New Change */        
        if (element.getAttribute('aria-controls')) {
            event.preventDefault();
            event.stopPropagation();
        }
        /* New Change */
        var windowWidth = window.innerWidth;
        var defaultMenu = document.getElementsByClassName('usb-olb-default')[0];
        var openMenu = document.querySelector('.usb-olb-navigation--navbar-secondary .usb-olb-visible');

        // element.classList.toggle("usb-active");

        targetElementText = this.getAttribute('data-navigation-source');
        targetElement = document.querySelectorAll('[data-destination=' + targetElementText + ']')[0];


        // Remove the active toggle classes from the previously selected item.
        // Do nothing if previousMenuItemState has not been defined yet
        // OR
        // The previous menu state equals the current menu state ( to make it a toggle )

        if (windowWidth < 900) {
            targetElement.classList.toggle("usb-olb-visible");

            //To skip below if for back arrow click in responsive
            if (this.getAttribute('data-previous-container') != "menu-home") {
                //Removing the display none for View All Accounts in responsive mode since Visibility is enabled
                if ($('#' + targetElement.id).hasClass('usb-olb-visible') && $('#' + targetElement.id).hasClass('usb-olb-mobile-hidden-temp'))
                    targetElement.classList.remove('usb-olb-mobile-hidden-temp');
            } else if (targetElementText == 'tabMyAccount') { //When back arrow is clicked on My Accounts sub menu then go back to main hamburger sub menu 
                document.querySelectorAll('[data-destination=ChooseanAccount]')[0].classList.add('usb-olb-mobile-hidden-temp');
            }

            if (defaultMenu) 
                defaultMenu.classList.remove("usb-olb-default");            

            if (element.classList == "usb-olb-svg-icon-container") {
                // when clicking the back link grab the data-previous-container attribute and force the focus on that container
                if (element.getAttribute('data-previous-container') == 'menu-home') {
                    var topMenu = document.querySelectorAll('.usb-olb-navigation--navbar-suport .usb-olb-navigation--a');
                    topMenu.forEach(function (element) {
                        element.setAttribute('tabindex', 0);
                    });
                }
                focusTrap(document.getElementById(this.getAttribute('data-previous-container')));
            }

            else {
                focusTrap(targetElement);
            }

            //Fix for Defect-26281 User is not able to select the same Menu options repeatedly
            //if (previousMenuItemState != undefined && previousMenuItemState != targetElement) {
            //    previousMenuItemState.classList.remove('usb-olb-visible');
            //    if(previousMenuItemActive != undefined)
            //        previousMenuItemActive.classList.remove('usb-active');
            //}

            previousMenuItemState = targetElement;
            previousMenuItemActive = element;
        }

        // Do stuff differently on desktop and mobile

        if (windowWidth > 900) {
            closePersonalToggle(); /* New Change */
            if (event.target.dataset.level == "1") {

                arrowMovement(element);
                arrowMovementState = element;

                if (element.getAttribute("aria-expanded") == 'false') {
                    element.setAttribute("aria-expanded", true);
                } else {
                    element.setAttribute("aria-expanded", false)
                }
                if (previousMenuItemActive === undefined && defaultMenu) {
                    defaultMenu.classList.remove('usb-olb-default');
                    targetElement.classList.toggle("usb-olb-visible");

                }
                else if (previousMenuItemActive.dataset.level == "1" && previousMenuItemActive != element) {

                    targetElement.classList.add("usb-olb-visible");
                    previousMenuItemState.classList.remove('usb-olb-visible');
                    previousMenuItemActive.classList.remove('usb-active');
                    previousMenuItemActive.setAttribute("aria-expanded", false);
                }
                else if (previousMenuItemActive.dataset.level == "2") {

                    if (defaultMenu != undefined) {
                        defaultMenu.classList.remove('usb-olb-default');
                    }

                    // If you click into a dropdown and then click a top level menu item 
                    // you have to remove all the active classes for the second and third level dropdown.
                    var allActiveClasses = document.querySelectorAll('.usb-olb-visible');

                    allActiveClasses.forEach(function(e) {
                        return e.classList.remove('usb-olb-visible');
                    })

                    targetElement.classList.add("usb-olb-visible");
                    previousMenuItemState.classList.remove('usb-olb-visible');
                    previousMenuItemActive.classList.remove('usb-active');

                }

                focusableElementsPrev = previousMenuItemState.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                focusableElementsPrev.forEach(function(element) {
                    element.setAttribute('tabindex', -1);
                });

                focusableElements = targetElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                focusableElements.forEach(function(element) {
                    element.setAttribute('tabindex', 0);
                });
            }

            else if (event.target.dataset.level == "2") {
                if (element != null)
                    element.classList.toggle("usb-active");
                var elementPosition = element.getBoundingClientRect();
                var parentElementPosition = element.parentElement.parentElement.getBoundingClientRect();

                var relativeElementPosition = elementPosition.left - parentElementPosition.left;
                if (element.getAttribute("aria-expanded") == 'false') {
                    element.setAttribute("aria-expanded", true);
                } else {
                    element.setAttribute("aria-expanded", false)
                }

                targetElement.classList.toggle("usb-olb-visible");
                targetElement.setAttribute('style', 'left: ' + relativeElementPosition + 'px');
                targetElement.classList.add('usb-olb-mobile-hidden-temp');

                if (previousMenuItemActive == undefined) {
                    // targetElement.classList.toggle("usb-olb-visible");
                }

                else if (previousMenuItemActive.dataset.level == "1") {
                    targetElement.classList.add("usb-olb-visible");

                }
                else if (previousMenuItemActive.dataset.level == "2" && element != previousMenuItemActive) {
                    previousMenuItemState.classList.remove('usb-olb-visible');
                    previousMenuItemActive.classList.remove('usb-active');
                }

                focusableElements = targetElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
                focusableElements.forEach(function(element) {
                    element.setAttribute('tabindex', 0);
                });
            }
            previousMenuItemState = targetElement;
            previousMenuItemActive = element;            
        }
    });
});

USBMenuALLYSource.forEach(function(element) {

    var defaultMenu = document.getElementsByClassName('usb-olb-default')[0];
    var ALLYTEST = false;

    element.addEventListener('keydown', function(event) {

        var isExpanded = this.getAttribute('aria-expanded');

        if (event.keyCode == 13) {
            element.setAttribute('tab-focus', true);
        }

        if (event.keyCode == 9 && event.shiftKey == false && element.getAttribute('tab-focus') == "true") {
            // This is the thing that's moving focus when the dropdown is active.
            if (element.getAttribute('aria-expanded') == "true") {
                targetElementText = element.getAttribute('data-navigation-source');
                targetElement = document.querySelectorAll('[data-destination=' + targetElementText + ']')[0];
                targetElement.focus();
                targetElement.setAttribute('previous-element', element.getAttribute('data-navigation-source'));
                targetElement.getElementsByClassName('usb-olb-navigation--a')[0].setAttribute('previous-element', element.getAttribute('data-navigation-source'));
                element.setAttribute('tab-focus', false);
            }
        }
    });
});

if (togglePersonal != null) {
    togglePersonal.addEventListener('click', function(event) {

        event.preventDefault();
        event.stopPropagation();/* New Change */
        targetElementText = this.getAttribute('data-source');
        targetElement = document.querySelectorAll('[data-destination=' + targetElementText + ']')[0];
        targetElement.classList.toggle('usb-olb-personal-active');

        if (targetElement.classList.contains('usb-olb-personal-active')) {
            var focusableElements = targetElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusableElements.forEach(function(element) {
                element.setAttribute('tabindex', 0);
            });
        }
        else {
            var focusableElements = targetElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusableElements.forEach(function(element) {
                element.setAttribute('tabindex', -1);
            });
        }
        this.classList.toggle('usb-olb-personal-toggle-bold');
        closeThirdLevel(); /* New Change */
    });
}

USBMenuALLYGroups.forEach(function(element, index) {
    var currentALLYGroup = element[index];
    USBMenuALLYGroupLinks = element.querySelectorAll('.usb-olb-navigation--a');
    USBMenuALLYGroupLinks.forEach(function(element, currentALLYGroup) {
        element.addEventListener('keydown', function(event) {
            if (event.keyCode == 27) {
                previousMenuALLYState.focus();
            }

            if (event.keyCode == 9 && event.shiftKey == true && currentALLYGroup == 0) {
                previousElement = element.getAttribute('previous-element');

                if (previousElement != undefined) {
                    event.preventDefault();
                    document.querySelectorAll('[data-navigation-source=' + previousElement + ']')[0].focus();
                    // previousMenuItemActive = undefined;
                }
            }
        });
    });
});

function menuToggle(source) {
    source.classList.toggle("active");
    if (source.getAttribute('aria-label') === 'navigation menu, shows content') {
        source.setAttribute('aria-label', 'navigation menu, hides content');
    } else {
        source.setAttribute('aria-label', 'navigation menu, shows content');
    }
    var state = source.getAttribute('data-hamburger');
    var destinations = document.querySelectorAll('.usb-olb-navigation--mobile-shell');
    if (destinations) {
        destinations.forEach(function (element) {
            element.classList.toggle("usb-olb-visible");
        });
    }
    var buggedElements = document.getElementsByName('.usb-olb-mobile-hidden-temp');

    if (buggedElements && buggedElements.length > 0) {
    buggedElements.forEach(function (element) {
        element.classList.remove('usb-olb-mobile-hidden-temp');
        element.style.removeProperty('left');
    });
    }
}

function arrowMovement(destination) {
    if (destination != undefined) {
        var arrowMovesTo = destination;
        var positionOfArrow = (arrowMovesTo.getBoundingClientRect().left) + (arrowMovesTo.getBoundingClientRect().width / 2) - 8;
        usbArrow.style.left = (positionOfArrow) + 'px';
    }
}

function focusTrap(containerDiv) {
    var outsideFocusableElements = document.querySelector('.usb-olb-navigation--a11y-shell').querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    var focusableElements = containerDiv.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    var firstFocusableElement = toggleHAMBURGER;
    var lastFocusableElement = focusableElements[focusableElements.length - 1];

    outsideFocusableElements.forEach(function(element) {
        if (element.id != 'usb-olb-hamburger-toggle' && element.id != 'imgUSBankLogo' && element.id != 'logOutLink')
            element.setAttribute('tabindex', -1);
    });

    firstFocusableElement.focus();

    firstFocusableElement.addEventListener('keydown', function(event) {
        if (event.keyCode == 9 && event.shiftKey == true) {
            event.preventDefault();
            lastFocusableElement.focus();
        }
    });

    focusableElements.forEach(function(element) {
        element.setAttribute('tabindex', 0);
        element.addEventListener('keydown', function(event) {
            if (event.target == lastFocusableElement) {
                if (event.keyCode == 9 && event.shiftKey == false) {
                    event.preventDefault();
                    toggleHAMBURGER.focus();
                }
            }
        });
    });
}
var windowSize;

window.onresize = function(event) {
    var defaultMenu = document.getElementsByClassName('usb-olb-default')[0];
    var visibleMenu = document.querySelectorAll('.usb-olb-visible');
    var expandedItems = document.querySelectorAll("[aria-expanded=true]");

    visibleMenu.forEach(function(element) {
        element.classList.remove('usb-olb-visible');
    });
    // Mobile to Desktop
    if (windowSize < 900 && event.currentTarget.outerWidth > 900) {
        if (previousMenuItemActive) {
            setState = previousMenuItemActive.getAttribute('data-navigation-source');
            targetElementonResize = document.querySelectorAll('[data-destination=' + setState + ']')[0];
        } else {
            targetElementonResize = startMenu;
            previousMenuItemActive = startMenu;
        }

        // visibleMenu.forEach(function (element) {
        //    element.classList.remove('usb-olb-visible');
        // })

        targetElementonResize.classList.add('usb-olb-visible');

        // previous
        previousMenuItemState = targetElementonResize;

        if (previousMenuItemActive.getAttribute("data-level") === "2") {
            var source = previousMenuItemActive.getAttribute('data-navigation-source');
            var sourceContainer = document.querySelectorAll('[data-destination=' + source + ']')[0];

            var arrowSource = arrowMovementState.getAttribute('data-navigation-source');
            var arrowSourceContainer = document.querySelectorAll('[data-destination=' + arrowSource + ']')[0];

            previousMenuItemActive.classList.remove('usb-active');
            sourceContainer.classList.remove('usb-olb-visible');
            arrowSourceContainer.classList.add('usb-olb-visible');
            previousMenuItemActive = previousMenuItemActive;
        }

        if (previousMenuItemActive.getAttribute("data-level") != "2") {
            previousMenuItemActive = arrowMovementState;
        }
        var defaultSource = document.getElementsByClassName('usb-olb-default')[0];

        if (defaultSource != undefined)
            defaultSource.classList.remove('usb-olb-default');

    }
    // Desktop to Mobile
    if (windowSize > 900 && event.currentTarget.outerWidth < 900) {

        if (defaultMenu) {
            defaultMenu.classList.remove('usb-olb-default');
        }
        //visibleMenu.forEach(function (element) {
        //    element.classList.remove('usb-olb-visible');
        //})

        var OpenedMenus = document.querySelectorAll('div[style]');

        OpenedMenus.forEach(function(element) {
            element.style.removeProperty('left');
            element.classList.remove('usb-olb-mobile-hidden-temp');
        });

        expandedItems.forEach(function(element) {
            element.setAttribute("aria-expanded", false);
        });

        previousMenuItemState = undefined;

    }

    if (windowSize === event.currentTarget.outerWidth) {
        visibleMenu.forEach(function(element) {
            element.classList.remove('usb-olb-visible');
        });
    }

    windowSize = event.currentTarget.outerWidth;

    arrowMovement(arrowMovementState);
};

arrowMovement(arrowMovementState);

if (window.innerWidth < 880) {
    focusableElements = document.querySelector('.usb-olb-navigation--a11y-shell').querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(function(element) {
        if (element.id != 'usb-olb-hamburger-toggle' && element.id != 'imgUSBankLogo' && element.id != 'logOutLink')
            element.setAttribute('tabindex', -1);
    });
}

function closePersonalToggle() {
    var personelElement = document.getElementsByClassName('usb-olb-personal')[0];
    if(personelElement != undefined && personelElement != null)
        personelElement.classList.remove('usb-olb-personal-active');

    var personnelToggle = document.getElementById('usb-olb-personal-toggle');
    if(personnelToggle != undefined && personnelToggle != null)
        personnelToggle.classList.remove('usb-olb-personal-toggle-bold');
}

function closeThirdLevel() {
    var tertiaryElement = document.getElementsByClassName('usb-olb-navigation--navbar-tertiary')[0];
    if(tertiaryElement != undefined && tertiaryElement != null) {
        var tertiaryVisibleElement = tertiaryElement.getElementsByClassName('usb-olb-visible')[0];
        if(tertiaryVisibleElement != undefined && tertiaryVisibleElement != null)
            tertiaryVisibleElement.classList.remove('usb-olb-visible');
    }

    var secondaryElement = document.getElementsByClassName('usb-olb-navigation--navbar-secondary')[0];
    if(secondaryElement != undefined && secondaryElement != null) {
        var secondaryActiveElement = secondaryElement.getElementsByClassName('usb-active')[0];
        if(secondaryActiveElement != undefined && secondaryActiveElement != null)
            secondaryActiveElement.classList.remove('usb-active');
    }
}

// Close the menus if you click anywhere else on the page.
document.addEventListener('click', function (event) {
    //Hi User link click will be handled by WelcomeTopNavigationDisplayShown() method
    if (!(event.target.id == 'usb-olb-personal-toggle' && event.target.innerText.indexOf('Hi') >= 0)) {
        closePersonalToggle();
        closeThirdLevel();
    }
});
/* New Change */
var USB = {
    Menu: {
        Navigation: (function() {
            var currentMenu;

            var getCurrentMenu = function(menu) {

                var currentUrl = window.location.href.replace(window.location.protocol + "//" + window.location.host, '');

                //To remove the string added after '#' in the browser URL
                if (currentUrl.indexOf('#') > 0)
                    currentUrl = currentUrl.substr(0, currentUrl.indexOf('#'));               

                //To show Send Money as a Active Menu after clicking Manage Recipients link 
                if (menu[0].id == "SendMoney" && currentUrl.indexOf('ManageRecipient') > 0)
                {
                        currentMenu = menu;
                        return false;
                }

                $('.usb-olb-navigation--navbar-secondary #' + menu[0].id +' ul').each(function () {                   
                    $(this).find('li').each(function () {
                        if ($(this)[0].getAttribute('highlightOnUrl').indexOf(currentUrl) >= 0) {
                            currentMenu = menu;
                            return false;
                        }
                    });
                });
                var highlightPreferences = menu.attr('highlightFor');
                if (highlightPreferences) {
                    $.each(highlightPreferences.split('|'), function (index, value) {
                        if(value) {
                            if (currentUrl.indexOf(value) >= 0) {
                                currentMenu = menu;
                                return false;
                            }
                        }
                    });
                }
            };

            return {
                IsCurrentMenu: function(newMenu) {
                    if (!currentMenu) return false;
                    return newMenu[0] === currentMenu[0];
                },

                ActivateCurrentMenu: function() {
                    if (currentMenu) {
                        USB.Menu.Positioning.ActivateMenu.apply(currentMenu);
                    }
                },

                HideCurrentMenu: function() {
                    //                  CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
                    //                    if (currentMenu) {
                    //                        USB.Menu.Positioning.HideMenu.apply(currentMenu);
                    //                    }
                },

                Initialize: function() {
                    //CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
                    var defaultMenu;
                    $("#navigationFirstLevel").find("li.menuItem").each(function() {
                        var $thisElement = $(this);
                        if ($thisElement.hasClass("navFirstLevel")) {
                            if ($thisElement[0].id == "MyAccounts")
                                defaultMenu = $thisElement;

                            if (!currentMenu) 
                                getCurrentMenu($thisElement);                            
                        }
                    });

                    if (currentMenu) 
                        arrowMovementState = currentMenu.find('a')[0];
                    else 
                        arrowMovementState = defaultMenu.find('a')[0];                        

                    arrowMovement(arrowMovementState);
                    currentMenuText = arrowMovementState.getAttribute('data-navigation-source');
                    document.querySelectorAll('.usb-olb-navigation--navbar-secondary #' + currentMenuText)[0].classList.add('usb-olb-default');
                },

                Navigate: function(navigateUrl, pageName, notifyEvent, hashedLpid) {
                    if (navigateUrl) {
                        if (pageName != null && pageName != undefined) {
                            var AID = null;
                            var MID = null;
                            if (typeof window.visitor != 'undefined') {
                                AID = visitor.getAnalyticsVisitorID();
                                MID = visitor.getMarketingCloudVisitorID();
                            }
                            switch (pageName.toLowerCase()) {
                                case "customerdashboard":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:customer dashboard link";
                                    s.tl(this, "o", "olb:navigation:customer dashboard link", null, "navigate");
                                    break;
                                case "rewardsdashboard":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:my rewards link";
                                    s.tl(this, "o", "olb:navigation:my rewards link", null, "navigate");
                                    break;
                                case "edocsdashboard":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:online statements my documents link";
                                    s.tl(this, "o", "olb:navigation:online statements my documents link", null, "navigate");
                                    break;
                                case "edocslan":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:letters notices my documents link";
                                    s.tl(this, "o", "olb:navigation:letters notices my documents link", null, "navigate");
                                    break;
                                case "edocstax":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:tax documents my documents link";
                                    s.tl(this, "o", "olb:navigation:tax documents my documents link", null, "navigate");
                                    break;
                                case "edocsenrollment":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:paperless preferences my documents link";
                                    s.tl(this, "o", "olb:navigation:paperless preferences my documents link", null, "navigate");
                                    break;
                                case "transfer":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:transfer money link";
                                    s.tl(this, "o", "olb:navigation:transfer money link", null, "navigate");
                                    break;
                                case "transfersomni":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:transfer money link";
                                    s.tl(this, "o", "olb:navigation:transfer money link", null, "navigate");
                                    break;
                                case "omnisendmoney":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:send money zelle link";
                                    s.tl(this, "o", "olb:navigation:send money zelle link", null, "navigate");
                                    break;
                                case "billpay":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:pay bills link";
                                    s.tl(this, "o", "olb:navigation:pay bills link", null, "navigate");
                                    break;
                                case "payments":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:pay us bank account link";
                                    s.tl(this, "o", "olb:navigation:pay us bank account link", null, "navigate");
                                    break;
                                case "p2p":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:send money alternative link";
                                    s.tl(this, "o", "olb:navigation:send money alternative link", null, "navigate");
                                    break;
                                case "advance":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:cash advance link";
                                    s.tl(this, "o", "olb:navigation:cash advance link", null, "navigate");
                                    break;
                                case "deposit":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:deposit check link";
                                    s.tl(this, "o", "olb:navigation:deposit check link", null, "navigate");
                                    break;
                                case "selfservice":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:self service link";
                                    s.tl(this, "o", "olb:navigation:self service link", null, "navigate");
                                    break;
                                case "myprofile":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:my profile link";
                                    s.tl(this, "o", "olb:navigation:my profile link", null, "navigate");
                                    break;
                                case "alerts":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:alerts link";
                                    s.tl(this, "o", "olb:navigation:alerts link", null, "navigate");
                                    break;
                                case "messages":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:messages link";
                                    s.tl(this, "o", "olb:navigation:messages link", null, "navigate");
                                    break;
                                case "contactus":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:contact us link";
                                    s.tl(this, "o", "olb:navigation:contact us link", null, "navigate");
                                    break;
                                case "makeappointment":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation: make an appointment link";
                                    s.tl(this, "o", "olb:navigation:make an appointment link", null, "navigate");
                                    window.open(navigateUrl, '_blank');
                                    break;
                                case "helpcenter":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:customer service help center link";
                                    s.tl(this, "o", "olb:navigation:customer service help center link", null, "navigate");
                                    break;
                                case "applyforproducts":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:apply for products link";
                                    s.tl(this, "o", "olb:navigation:apply for products link", null, "navigate");
                                    break;
                                case "mobiledashboard":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:mobile banking link";
                                    s.tl(this, "o", "olb:navigation:mobile banking link", null, "navigate");
                                    break;
                                case "viewall":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:view all accounts link";
                                    s.tl(this, "o", "olb:navigation:view all accounts link", null, "navigate");
                                    break;
                                case "mal":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:mortgage account link";
                                    s.tl(this, "o", "olb:navigation:mortgage account link", null, "navigate");
                                    break;
                                case "managemytransfersomni": //CI:Sept-2017, B-47787 Changes
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:manage my transfers link";
                                    s.tl(this, "o", "olb:navigation:manage my transfers link", null, "navigate");
                                    break;
                                case "managedelegates":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:shared access link";
                                    s.tl(this, "o", "olb:navigation:shared access link", null, "navigate");
                                    break;
                                case "checkingandsavings":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:checking and savings link";
                                    s.tl(this, "o", "olb:navigation:checking and savings link", null, "navigate");
                                    var src = navigateUrl + '?aid=' + AID + '&mid=' + MID + '&lpid=' + hashedLpid + '&device=online banking';
                                    window.open(src, '_blank');
                                    break;
                                case "creditcards":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:credit cards link";
                                    s.tl(this, "o", "olb:navigation:credit cards link", null, "navigate");
                                    var src = navigateUrl + '?aid=' + AID + '&mid=' + MID + '&lpid=' + hashedLpid + '&device=online banking';
                                    window.open(src, '_blank');
                                    break;
                                case "mortgageandrefinance":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:mortgage and refi link";
                                    s.tl(this, "o", "olb:navigation:mortgage and refi link", null, "navigate");
                                    var src = navigateUrl + '?aid=' + AID + '&mid=' + MID + '&lpid=' + hashedLpid + '&device=online banking';
                                    window.open(src, '_blank');
                                    break;
                                case "loansandcreditlines":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:loans and credit lines link";
                                    s.tl(this, "o", "olb:navigation:loans and credit lines link", null, "navigate");
                                    var src = navigateUrl + '?aid=' + AID + '&mid=' + MID + '&lpid=' + hashedLpid + '&device=online banking';
                                    window.open(src, '_blank');
                                    break;
                                case "investing":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:investing and wealth management link";
                                    s.tl(this, "o", "olb:navigation:investing and wealth management link", null, "navigate");
                                    var src = navigateUrl + '?aid=' + AID + '&mid=' + MID + '&lpid=' + hashedLpid + '&device=online banking';
                                    window.open(src, '_blank');
                                    break;
                                case "retirementplanning":
                                    s.linkTrackVars = s.linkTrackVars + ",prop53";
                                    s.prop53 = "olb:navigation:automated investing link";
                                    s.tl(this, "o", "olb:navigation:automated investing link", null, "navigate");
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (pageName == null || pageName == undefined || (pageName != null && pageName != undefined && pageName.toLowerCase() != 'makeappointment' && 
                            pageName.toLowerCase() != 'checkingandsavings' && pageName.toLowerCase() != 'creditcards' && pageName.toLowerCase() != 'mortgageandrefinance'
                            && pageName.toLowerCase() != 'loansandcreditlines' && pageName.toLowerCase() != 'investing'))
                            window.location = navigateUrl;

                        this.Notify(notifyEvent);
                    }
                },

                Notify: function(notifyEvent) {
                    if (notifyEvent) {
                        if ($.publish) {
                            $.publish(notifyEvent, "");
                        }
                    }
                },

                NavigateToAccountDashboard: function(accountIndex, productCode, isForbidden) { },

                NavigateToInvestment: function(accountIndex, encryptPayLoad, isEnabled, isSSOEligible, currentELement, investmentRedirectUrl, accountNumber, investmentTitle, isMidExist) {
                    if (!isEnabled || !isSSOEligible) {
                        window.location = investmentRedirectUrl;
                        return;
                    }

                    var currentID = currentELement ? currentELement.id : '';
                    USB.Menu.SSO.Scivantage(accountIndex, encryptPayLoad, currentID, accountNumber, isMidExist);
                },
                nav_CD_OpenYodleeLink: function(yodleeUrl) {

                    window.location = yodleeUrl;
                },
                NavigateToMortgageSSO: function(accountindex, fullUrl, redirectUrl, returnUrl, keepAliveUrl, logoutUrl, profileUrl) {
                    USB.Menu.SSO.Mortgage(accountindex, fullUrl, redirectUrl, returnUrl, keepAliveUrl, logoutUrl, profileUrl);
                }


            }
        } ()),

        SSO: (function() {

            var getAfToken = function() {
                var currentUrl = window.location.href;
                var afToken = currentUrl.match(/af\(.*\)/);
                if (afToken && afToken.length > 0)
                    return afToken[0];

                return '';
            };

            return {
                Scivantage: function(idx, encryptpayload, elementid, accountnum, ismidexist) {

                    var scivantageAPIUrl = '/USB/' + getAfToken() + '/CustomerDashboard/GetScivantageSSO';
                    var unexpectedError = '/USB/' + getAfToken() + '/UnexpectedError.aspx';

                    successHandler = function(responseData) {
                        if (responseData.Success != null && responseData.Success) {
                            //elementid is only used for omniture tracking
                            //Need to comment this omniture call as its breaking the scivantage redirection, $.publish is not avaiable in this function. need to look for another option.
                            //$.publish("OnTrackItemCustom", [$("#" + elementid), "CustomerDashboardCentral", "ScivantageSSOLink", "OLB"]);
                            //To open Scivantage in the same window
                            window.location = responseData.RedirectURL;
                        } else {
                            window.location = unexpectedError;
                        }
                    }
                    errorHandler = function(responseData) {
                        window.location = unexpectedError;
                    }

                    var postData = {};
                    postData.SelectedAccountIndex = idx; // AccountIndex
                    postData.EncryptPayload = encryptpayload; // encryptedPayload true or false this we are pulling from MTA.Config
                    postData.IsMidExist = ismidexist;
                    postData.AccountnumLastFour = accountnum;
                    $.ajax({
                        type: "POST",
                        url: scivantageAPIUrl,
                        data: postData,
                        contentType: "json",
                        dataType: "json",
                        success: successHandler,
                        error: errorHandler
                    });
                },
                Mortgage: function(idx, fullUrl, redirectUrl, returnUrl, keepAliveUrl, logoutUrl, profileUrl) {

                    var mortgageURL = '/USB/' + getAfToken() + '/NoCSRFPing/CCNMortgageSSOData';

                    successHandler = function(responseData) {

                        if (responseData.Success) {
                            window.location = responseData.ccnRedirectURL;

                        } else {
                            var UnexpectedError = '/USB/' + getAfToken() + '/UnexpectedError.aspx';
                            window.location = UnexpectedError;
                        }
                    };

                    errorHandler = function(responseData) {
                        var UnexpectedError = '/USB/' + getAfToken() + '/UnexpectedError.aspx';
                        window.location = UnexpectedError;
                    };

                    var urls = {};
                    urls.GetFullPath = window.location.origin;
                    urls.CCNRedirectURL = urls.GetFullPath + "/USB/" + getAfToken() + redirectUrl;
                    urls.CCNReturnURL = urls.GetFullPath + "/USB/" + getAfToken() + returnUrl;
                    urls.CCNKeepAlive = urls.GetFullPath + keepAliveUrl;
                    urls.CCNLogout = urls.GetFullPath + logoutUrl
                    urls.CCNProfileURL = urls.GetFullPath + "/USB/" + getAfToken() + profileUrl;
                    urls.USBRootUrl = "/USB/" + getAfToken() + "/";
                    urls.isMALPayment = false;

                    //Create request object to post required data to CCNMortgageSSOData Model Service        
                    var postData = {};
                    postData.selectedAccountIndex = idx;
                    postData.returnURL = urls.CCNReturnURL;
                    postData.logoutURL = urls.CCNLogout;
                    postData.keepAliveURL = urls.CCNKeepAlive;
                    //postData.redirectURL = urls.CCNRedirectURL;
                    postData.profileTarget = urls.CCNProfileURL;
                    postData.isMALPaymentRequest = urls.isMALPayment;
                    postData.USBRootUrl = urls.USBRootUrl;

                    $.ajax({
                        type: "POST",
                        url: mortgageURL,
                        data: postData,
                        dataType: "json",
                        success: successHandler,
                        error: errorHandler
                    });
                }
            }
        } ()),

        Positioning: (function() {
            var applyHover = function(menuElement) {
                if (isFirstLevelMenu(menuElement))
                    menuElement.addClass("navHover");
            };

            var isFirstLevelMenu = function(menuElement) {
                if (menuElement != null && typeof menuElement != 'undefined')
                    return menuElement.hasClass('navFirstLevelMenuItem');
            }

            var removeHover = function(menuElement) {
                if (menuElement.hasClass('navHover'))
                    menuElement.removeClass('navHover');
            };

            var displaySubMenu = function(menuElement) {
                var $subMenu = menuElement.children('#subMenu');
                if ($subMenu.length > 0)
                    $subMenu.removeClass('hidden');

                return $subMenu;
            };

            var hideSubMenu = function(menuElement) {
                var $subMenu = menuElement.children('#subMenu');
                if ($subMenu.length > 0)
                    $subMenu.addClass('hidden');

                return $subMenu;
            };

            var setSubMenuWidth = function(subMenuElement) {
                if (isOnResponsiveMode()) {
                    subMenuElement.css("width", '100%');
                    return subMenuElement.width();
                }

                var subMenuWidth = getSubMenuWidth(subMenuElement) + 10;
                subMenuElement.css("width", subMenuWidth + 'px');
                return subMenuWidth;
            };

            var getSubMenuWidth = function(subMenuElement) {
                var width = 0;
                subMenuElement.children('li').each(function() {
                    width += $(this).width();
                });

                return width;
            };

            var restoreSubMenuPosition = function(subMenuElement) {
                subMenuElement.css("left", "0px");
            };

            var positionSubMenuLeft = function(subMenuElement, subMenuWidth) {
                var mainMenuWidth = $(".navFirstLevelContainer").width();
                var subMenuLeft = subMenuElement.offset().left;

                var delta = mainMenuWidth - (subMenuWidth + subMenuLeft + 20);
                subMenuElement.css("left", delta + "px");
            };

            var subMenuOverflows = function(subMenuElement, subMenuWidth) {
                var mainMenuWidth = $(".navFirstLevelContainer").width();
                var subMenuLeft = subMenuElement.offset().left;

                if (mainMenuWidth < subMenuLeft + subMenuWidth)
                    return true;

                return false;
            };

            var adjustSubMenuPosition = function(subMenuContainer, restore) {

                var $subMenu = subMenuContainer.children('ul');

                if (restore) {
                    restoreSubMenuPosition($subMenu);
                    return;
                }

                var subMenuWidth = setSubMenuWidth($subMenu);

                if (!isOnResponsiveMode() && subMenuOverflows($subMenu, subMenuWidth)) {
                    //positionSubMenuLeft($subMenu, subMenuWidth);
                }
            };

            var isOnResponsiveMode = function() {
                var toggleIcon = $(".navBarToggle");
                return toggleIcon.css("display") === "block";
            };

            var applySubMenuClass = function(subMenuItem) {
                subMenuItem.addClass('usbMenu-accountSelectorDivBackground');
                subMenuItem.find('.navAnchor').addClass('usbMenu-accountSelectorDivColor');
                subMenuItem.find('.usbMenuSpanSecondLevel.thirdLevelFloatingIcon').addClass('usbMenu-ChosenArrow');
            };

            var removeSubMenuClass = function(subMenuItem) {
                if (subMenuItem.hasClass('usbMenu-accountSelectorDivBackground')) {
                    subMenuItem.removeClass('usbMenu-accountSelectorDivBackground');
                }
                if (subMenuItem.find('.navAnchor').hasClass('usbMenu-accountSelectorDivColor')) {
                    subMenuItem.find('.navAnchor').removeClass('usbMenu-accountSelectorDivColor');
                }
                if (subMenuItem.find('.usbMenuSpanSecondLevel.thirdLevelFloatingIcon').hasClass('usbMenu-ChosenArrow')) {
                    subMenuItem.find('.usbMenuSpanSecondLevel.thirdLevelFloatingIcon').removeClass('usbMenu-ChosenArrow');
                }
            };

            var mainMenuOn = false;
            var activateMenuTimer;

            var hideMenu = function(menu) {
                removeHover(menu);

                var isFullMenu = !isOnResponsiveMode();
                if (mainMenuOn || isFullMenu) {
                    var $subMenu = hideSubMenu(menu);
                    if (isFirstLevelMenu(menu)) {
                        adjustSubMenuPosition($subMenu, true);
                    }
                    if (menu.hasClass("navSecondLevelMenuItem")) {
                        removeSubMenuClass(menu);
                    }
                }
            };

            var showMenu = function(menu) {
                if (activateMenuTimer) {
                    clearTimeout(activateMenuTimer);
                    activateMenuTimer = null;
                }

                applyHover(menu);

                var isFullMenu = !isOnResponsiveMode();
                if (mainMenuOn || isFullMenu) {
                    if (isFullMenu) {
                        if (!menu.hasClass('toggleMainMenu'))
                            menu.addClass('toggleMainMenu');
                    }
                    if (menu.hasClass("navSecondLevelMenuItem")) {
                        applySubMenuClass(menu);
                    }

                    var $subMenu = displaySubMenu(menu);
                    if (isFirstLevelMenu(menu)) {
                        adjustSubMenuPosition($subMenu);
                    }
                }

                lockSubMenuWidth(menu);
            };

            var lockSubMenuWidth = function(menu) {
                menu.find("li.menuItem").each(function() {
                    var c = $(this);
                    if (c.hasClass('navSecondLevelMenuItem')) {
                        var width = c.width();
                        c.width(width);
                    }
                });
            };

            var isActive = function(menu) {
                return menu.hasClass('navHover');
            };

            return {
                OnMouseEnter: function() {
                    //                    CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
                    //                    $this = $(this);
                    //                    if (USB.Menu.Navigation.IsCurrentMenu($this) && isActive($this))
                    //                        return;

                    //                    USB.Menu.Navigation.HideCurrentMenu();
                    //                    setTimeout(function() { showMenu($this)}, 1);
                },

                OnMouseLeave: function() {
                    //                    CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
                    //                    var $this = $(this);
                    //                    
                    //                    if (activateMenuTimer) {
                    //                        clearTimeout(activateMenuTimer);
                    //                        activateMenuTimer = null;
                    //                    }

                    //                    if (USB.Menu.Navigation.IsCurrentMenu($this))
                    //                        return;

                    //                    hideMenu($this);
                    //                    activateMenuTimer = setTimeout(USB.Menu.Navigation.ActivateCurrentMenu, 60);
                },

                Clear: function() {
                    //                    CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
                    //                    if (activateMenuTimer) {
                    //                        clearTimeout(activateMenuTimer);
                    //                        activateMenuTimer = null;
                    //                    }
                },

                ActivateMenu: function() {
                    //                    CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
                    //                    var $this = $(this);
                    //                    if ($this.find('#subMenu').length == 0) {
                    //                        return;
                    //                    }

                    //                    if (activateMenuTimer) {
                    //                        clearTimeout(activateMenuTimer);
                    //                        activateMenuTimer = null;
                    //                    }

                    //                    $this.bind("mouseleave", USB.Menu.Positioning.OnMouseLeave);
                    //                    showMenu($this);
                },

                HideMenu: function() {
                    //                    CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
                    //                    var $this = $(this);
                    //                    hideMenu($this);
                },

                RestoreActiveMenu: function() {
                    //                    CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
                    //                    var $this = $(this);
                    //                    hideMenu($this);
                    //                    USB.Menu.Navigation.ActivateCurrentMenu();
                },

                ToggleMainMenu: function() {
                    //                    CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
                    //                    mainMenuOn = !mainMenuOn;
                    //                    $("#navigationFirstLevel > li:not(:first-child)").each(function () {
                    //                        var $this = $(this);
                    //                        if ($this.hasClass('toggleMainMenu'))
                    //                            $this.removeClass("toggleMainMenu");
                    //                        else
                    //                            $this.addClass("toggleMainMenu");
                    //                    });
                }
            };
        } ()),

        Initialize: function() {
            this.Navigation.Initialize();
            //CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
            //$(".navBarToggle").bind("click", this.Positioning.ToggleMainMenu);
        }
    }
};

$(window).load(USB.Menu.Initialize());


function WelcomeTopNavigationDisplayShown(id) {
    //CO: July-2018, E-14869 Increase Visibility of Products in OLB/Mobile
    var welcomePanel = document.getElementById(id);
    welcomePanel.classList.toggle('usb-olb-personal-active');

    if (welcomePanel.classList.contains('usb-olb-personal-active')) {
        var focusableElements = welcomePanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusableElements.forEach(function(element) {
            element.setAttribute('tabindex', 0);
        });

        s.linkTrackVars = s.linkTrackVars + ',prop53';
        s.prop53 = 'olb:mini nav:welcome widget expansion';
        s.tl(this, 'o', 'olb:mini nav:welcome widget expansion', null, 'navigate');
    }
    else {
        var focusableElements = welcomePanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusableElements.forEach(function(element) {
            element.setAttribute('tabindex', -1);
        });
    }

    var hiUserLink = document.getElementById('usb-olb-personal-toggle');
    hiUserLink.classList.toggle('usb-olb-personal-toggle-bold');
    closeThirdLevel();
};


