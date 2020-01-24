/*eslint-disable */
var PhonePe = function (e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {i: r, l: !1, exports: {}};
        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }

    return n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
            return e[t]
        }.bind(null, i));
        return r
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 9)
}([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
        let t, n, r, i, s;
        !function (e) {
            e.READ_SMS = "READ_SMS", e.LOCATION = "LOCATION", e.CAMERA = "CAMERA", e.WRITE_EXTERNAL_STORAGE = "WRITE_EXTERNAL_STORAGE", e.READ_EXTERNAL_STORAGE = "READ_EXTERNAL_STORAGE"
        }(t = e.Permission || (e.Permission = {})), function (e) {
            e.web = "web", e.native = "native"
        }(n = e.Species || (e.Species = {})), function (e) {
            e.ios = "ios", e.android = "android"
        }(r = e.OS || (e.OS = {})), function (e) {
            e.ios = "phonepe-ios", e.android = "phonepe-android"
        }(i = e.OSUserAgent || (e.OSUserAgent = {})), function (e) {
            e.email = "email", e.name = "name", e.phoneNumber = "phoneNumber", e.isEmailVerified = "isEmailVerified"
        }(s = e.UserDetail || (e.UserDetail = {}))
    }(t.ExternalConstants || (t.ExternalConstants = {}))
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(4), i = n(5), s = n(3), o = n(10);

    class a {
        static callback(e, t, n, r) {
            i.Logger.logd("PhonePe", "phonepeCallback called! with callbackName = " + e);
            let o = a.promiseMapping[e];
            o && ("1" === t ? o[s.PhonePeSDKWebConstants.General.resolve](n) : o[s.PhonePeSDKWebConstants.General.reject](r), delete a.promiseMapping[e])
        }

        static callNative(e, t, n) {
            if (!o.MethodVersioningHandler.isMethodSupported(e)) return void i.Logger.logd("PhonePe", "Sorry! This method is not supported with PhonePe app's version");
            i.Logger.logd("PhonePe", "Trying to call methodName = " + e);
            let s = window.webkit;
            if (r.PhonePeUtils.isValidMethodOniOS(e)) s.messageHandlers[e].postMessage(n); else {
                window[t][e](JSON.stringify(n))
            }
        }

        static storePromiseAndCallNative(e, t, n) {
            return new Promise((i, o) => {
                let a = r.PhonePeUtils.createuuid();
                n[s.PhonePeSDKWebConstants.General.callbackId] = a, this.callNative(e, t, n), this.promiseMapping[a] = {
                    resolve: i,
                    reject: o
                }
            })
        }
    }

    a.promiseMapping = {}, t.MessagingHandler = a
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
        let t, n, r, i, s, o, a, c, l;
        e.sdkVersion = "0.1", e.PhonePeSDKRNMajorVersion = 0, e.PhonePeSDKRNMinorVersion = 53, e.data_preferences = "database_versions", e.PhonePeSDKVersion = 4, function (e) {
            e.confirmationScreenDuration = 400, e.discoveryContextMode = "PEER_TO_MERCHANT", e.paymentScreenName = "PAY", e.v1 = "v1", e.v2 = "v2"
        }(t = e.General || (e.General = {})), function (e) {
            e.invalidParams = "PARAMS_INVALID_OR_INSUFFICIENT"
        }(n = e.ErrorCode || (e.ErrorCode = {})), function (e) {
            e.payments = 103, e.transactionDetails = 105
        }(r = e.ActivityID || (e.ActivityID = {})), function (e) {
            e.name = "PermissionsBridge", e.seekPermission = "seekPermission", e.openSettingsPage = "openSettingsPageForPermission", e.androidPrefix = "android.permission.", e.locationPermissionName = "ACCESS_FINE_LOCATION", e.kPermission = "permission"
        }(i = e.PermissionsBridge || (e.PermissionsBridge = {})), function (e) {
            e.bridgeName = "AnalyticsBridge", e.methodName = "logMerchantEvent", e.kName = "name", e.kMetadata = "metadata", e.kGroupingKey = "groupingKey"
        }(s = e.AnalyticsBridge || (e.AnalyticsBridge = {})), function (e) {
            e.bridgeName = "AuthBridge", e.fetchGrantToken = "fetchGrantToken", e.fetchAuthToken = "fetchAuthToken"
        }(o = e.AuthBridge || (e.AuthBridge = {})), function (e) {
            e.bridgeName = "OrderActionBridge", e.reserveOrder = "reserveOrder", e.fetchOrderRequestToken = "fetchOrderRequestToken", e.openPaymentsPageForReservedOrder = "openPaymentsPageForReservedOrder"
        }(a = e.OrderActionBridge || (e.OrderActionBridge = {})), function (e) {
            e.bridgeName = "FilePickerBridge", e.selectFile = "selectFile", e.readFile = "readFile"
        }(c = e.FilePickerBridge || (e.FilePickerBridge = {})), function (e) {
            e.bridgeName = "CameraBridge", e.scanQRCode = "scanQRCode", e.startCamera = "startCamera"
        }(l = e.CameraBridge || (e.CameraBridge = {}))
    }(t.InternalConstants || (t.InternalConstants = {}))
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
        let t, n, r, i, s, o, a, c, l;
        !function (e) {
            e.reject = "reject", e.resolve = "resolve", e.callbackId = "callbackId", e.prefName = "prefName", e.key = "key", e.defaultValue = "defaultValue", e.value = "value", e.min = "min", e.max = "max"
        }(t = e.General || (e.General = {})), function (e) {
            e.androidBridgeName = "PreferencesBridge", e.getItem = "getItem", e.setItem = "setItem", e.removeItem = "removeItem", e.removeItemAndroid = "removeKey"
        }(n = e.Preferences || (e.Preferences = {})), function (e) {
            e.supportedVersion = "getSupportedWebSDKVersion", e.androidBridgeName = "MetadataBridge"
        }(r = e.Metadata || (e.Metadata = {})), function (e) {
            e.androidBridgeName = "LocationBridge", e.startUpdatingLocation = "startUpdatingLocation", e.stopUpdatingLocation = "stopUpdatingLocation", e.getCurrentLocation = "getCurrentLocation", e.locationSuccessEventKey = "locationUpdated", e.locationFailureEventKey = "failedToUpdateLocation", e.forceNewLocation = "forceNew", e.getAddress = "getAddress"
        }(i = e.Location || (e.Location = {})), function (e) {
            e.androidBridgeName = "NavigationBridge", e.processRequest = "processRequest", e.navigateToPath = "navigateToPath", e.navigateToPathForResult = "navigateToPathForResult", e.navigateToGenericPaymentForResult = "navigateToGenericPaymentForResult", e.navigateToGenericPayment = "navigateToGenericPayment"
        }(s = e.Navigation || (e.Navigation = {})), function (e) {
            e.navigateToPaymentsView = "openPaymentsPage", e.navigateToTransactionDetail = "openTransactionDetailsPage", e.navigateToGenericPaymentsView = "openGenericPaymentsPage", e.navigateToHelpPage = "openHelpPage", e.navigateToReactView = "openReactView"
        }(o = e.NavigationIOS || (e.NavigationIOS = {})), function (e) {
            e.merchantId = "merchantId", e.discoveryMode = "mode", e.discoveryModeValue = "PEER_TO_MERCHANT", e.title = "Pay", e.transactionType = "SENT_PAYMENT", e.timeoutTitle = "Payment Expired", e.timeoutMessage = "Sorry! Your payment request timed out. Please try again.", e.timeoutActionButtonTitle = "OK", e.dismissTitle = "Are you sure?", e.dismissMessage = "Going back will cancel the payment. Are you sure you want to proceed?", e.dismissPositiveButtonTitle = "I'm sure", e.dismissNegativeButtonTitle = "Dismiss"
        }(a = e.Payments || (e.Payments = {})), function (e) {
            e.getUserDetails = "getUserDetails", e.androidBridgeName = "UserBridge", e.attributes = "attributes"
        }(c = e.User || (e.User = {})), function (e) {
            e.androidBridgeName = "CameraBridge", e.scanQRCode = "scanQRCode", e.startCamera = "startCamera"
        }(l = e.Camera || (e.Camera = {}))
    }(t.PhonePeSDKWebConstants || (t.PhonePeSDKWebConstants = {}))
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(0), i = n(2);
    var s = r.ExternalConstants.Permission;

    class o {
        static assert(e, t) {
            if (!e) throw new Error(t)
        }

        static assertString(e, t) {
            o.assertType(e, "string", t)
        }

        static assertNumber(e, t) {
            o.assertType(e, "number", t)
        }

        static assertBoolean(e, t) {
            o.assertType(e, "boolean", t)
        }

        static assertFunction(e, t) {
            o.assertType(e, "function", t)
        }

        static assertArray(e, t) {
            if ((!t || e) && e.constructor !== Array) throw new TypeError(i.InternalConstants.ErrorCode.invalidParams)
        }

        static assertObject(e, t) {
            o.assertType(e, "object", t)
        }

        static assertType(e, t, n) {
            if ((!n || e) && typeof e !== t) throw new TypeError(i.InternalConstants.ErrorCode.invalidParams)
        }

        static returnResolution(e) {
            return new Promise((t, n) => {
                t(e)
            })
        }

        static returnRejection(e) {
            return new Promise((t, n) => {
                n(e)
            })
        }

        static isValidSpecies(e) {
            return e === r.ExternalConstants.Species.web || e === r.ExternalConstants.Species.native
        }

        static isValidOS(e) {
            return e === r.ExternalConstants.OS.ios || e === r.ExternalConstants.OS.android
        }

        static createuuid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                var t = 16 * Math.random() | 0;
                return ("x" == e ? t : 3 & t | 8).toString(16)
            })
        }

        static osSpecificPermissionNames(e, t) {
            let n = [];
            for (let o of e) if (t === r.ExternalConstants.OS.ios) n.push(s[o]); else {
                let e = "";
                e = o === s.LOCATION ? i.InternalConstants.PermissionsBridge.androidPrefix + i.InternalConstants.PermissionsBridge.locationPermissionName : i.InternalConstants.PermissionsBridge.androidPrefix + s[o], n.push(e)
            }
            return n
        }

        static strippedPermissionName(e, t) {
            if (t === r.ExternalConstants.OS.ios) return e;
            let n = i.InternalConstants.PermissionsBridge.androidPrefix, o = e.replace(new RegExp("^" + n), "");
            return o === i.InternalConstants.PermissionsBridge.locationPermissionName && (o = s.LOCATION), o
        }

        static isValidMethodOniOS(e) {
            let t = window.webkit;
            return t && t.messageHandlers && t.messageHandlers[e] && "function" == typeof t.messageHandlers[e].postMessage
        }

        static getReserveOrderPayload(e, t) {
            const n = {};
            return n["X-PROVIDER-ID"] = t, {headers: n, body: e}
        }
    }

    t.PhonePeUtils = o
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(9);

    class i {
        static isLoggingEnabled() {
            return r.PhonePe.loggingEnabled
        }

        static logd(e, t) {
            i.isLoggingEnabled() && console.log("[" + e + "] " + t)
        }

        constructor(e) {
            this.tag = e
        }

        logd(e) {
            i.logd(this.tag, e)
        }

        logAnything(e) {
            console.log(e)
        }

        logError(e) {
            0
        }
    }

    t.Logger = i
}, function (e, t, n) {
    "use strict";
    var r;
    Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
        e.WebView = "WebView", e.ReactView = "ReactView", e.PaymentsView = "PaymentView", e.GenericPaymentsView = "GenericPaymentsView", e.AppScreen = "AppScreen", e.ContactPicker = "ContactPicker", e.TransactionDetail = "TransactionDetail", e.Profile = "Profile", e.HelpPage = "HelpPage", e.MandateSetup = "MandateSetup", e.AddToWallet = "AddToWallet", e.MicroApp = "MicroApp", e.PWAWebView = "PWAWebView"
    }(r = t.NavigationScreenType || (t.NavigationScreenType = {}));

    class i {
        constructor(e, t, n, r) {
            this.screenType = e, this.title = t, this.animated = n, this.showModally = r, this.isNewTask = !1
        }
    }

    t.BaseNavigationRequest = i;
    t.ReactViewNavigationRequest = class extends i {
        constructor(e, t, n, i, s, o, a, c, l, d, u, h, g) {
            super(r.ReactView, i, s, o), this.appId = h, this.bundleName = e, this.componentName = t, this.shouldShowToolbar = n, this.toolBarText = i, this.animated = s, this.showModally = o, this.initialProperties = a, this.category = c, this.merchantId = l, this.merchantName = d, this.tAndCUrl = u, this.appUniqueId = g
        }
    };
    t.WebViewNavigationRequest = class extends i {
        constructor(e, t, n, i, s, o, a, c, l) {
            super(r.WebView, t, c, l), this.url = e, this.title = t, this.shouldShowToolBar = n, this.shouldShowBackButton = i, this.screenName = s, this.shouldAllowWebViewBack = o, this.shouldShowProgressWhileLoading = a
        }
    };
    t.PWAWebViewNavigationRequest = class extends i {
        constructor(e, t, n, i) {
            super(r.PWAWebView, "", !0, !0), this.merchantId = e, this.deepLinkUrl = t, this.appId = n, this.appUniqueId = i
        }
    };
    t.AppScreenNavigationRequest = class extends i {
        constructor(e, t, n, i, s, o) {
            super(r.AppScreen, i, s, o), this.screenName = e, this.url = t, this.params = n
        }
    };
    t.PaymentMetaData = class {
        constructor(e) {
            this.details = e
        }
    };
    t.PaymentNavigationRequest = class extends i {
        constructor(e, t, n, i, s, o, a, c, l, d) {
            super(r.PaymentsView, t, n, i), this.mode = s, this.microPayRequest = o, this.internalPaymentUiConfig = a, this.transactionType = c, this.metaData = l, this.originInfo = d
        }
    };
    t.GenericPaymentNavigationRequest = class extends i {
        constructor(e, t, n, i, s) {
            super(r.GenericPaymentsView, e, t, n), this.reservationId = i, s && (this.fallbackUrl = s)
        }
    };
    t.MandateSetupNavigationRequest = class extends i {
        constructor(e, t, n, i, s, o) {
            super(r.MandateSetup, n, i, s), this.mandateContext = e, this.mandateUiConfig = t, this.mandateType = o || "MERCHANT"
        }
    };
    t.AddToWalletNavigationRequest = class extends i {
        constructor(e, t, n, i) {
            super(r.AddToWallet, t, n, i), this.addToWalletUiContext = e
        }
    };
    t.TransactionDetailsNavigationRequest = class extends i {
        constructor(e, t, n, i, s, o, a) {
            super(r.TransactionDetail, t, n, i), this.transactionId = s, this.transactionType = o, this.info = a
        }
    };
    t.ContactNavigationRequest = class extends i {
        constructor(e, t, n, i, s, o, a, c, l, d, u, h, g, P) {
            super(r.ContactPicker, t, n, i), this.contactPickerMode = s, this.contactPickerType = o, this.initialContacts = a, this.transactionType = c, this.isVpaEnable = l, this.isSelfEnable = d, this.phoneContact = u, this.vpaContact = h, this.accountContact = g
        }
    };
    t.ProfileNavRequest = class extends i {
        constructor(e, t, n, r) {
            super(e, t, n, r)
        }
    };
    t.HelpPageNavRequest = class extends i {
        constructor(e, t, n, i, s, o, a, c, l) {
            super(r.HelpPage, t, n, i), this.transactionId = e, this.screen = a, this.url = c, this.shouldShowToolBar = s, this.shouldAllowWebViewBack = o, this.freshBotIntentData = l
        }
    };
    t.FreshBotIntentData = class {
        constructor(e) {
            this.freshBotScreens = e, this.queryParams = {}
        }
    };
    t.CloseAppNavRequest = class {
        constructor(e) {
            this.appIdentifier = e
        }
    };
    t.MicroAppNavigationRequest = class extends i {
        constructor(e, t, n, i, s, o) {
            super(r.MicroApp, i, s, o), this.appId = e, this.appUniqueId = t, this.initialProperties = n
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var r = n(11).ExternalPaymentModels.ActionButtonProp;
    !function (e) {
        let t, n, i, s, o;
        !function (e) {
            e.discoveryModeValue = "PEER_TO_MERCHANT", e.title = "Pay", e.transactionType = "SENT_PAYMENT", e.timeoutTitle = "Payment Expired", e.timeoutMessage = "Sorry! Your payment request timed out. Please try again.", e.timeoutActionButtonTitle = "OK", e.dismissTitle = "Are you sure?", e.dismissMessage = "Going back will cancel the payment. Are you sure you want to proceed?", e.dismissPositiveButtonTitle = "I'm sure", e.dismissNegativeButtonTitle = "Dismiss", e.PAYMENT_TIMEOUT = "PAYMENT_TIMEOUT", e.PAYMENT_DISMISS = "PAYMENT_DISMISS", e.kMerchantId = "merchantId", e.kSellingPrice = "sellingPrice", e.kPayableAmount = "payableAmount", e.kServiceType = "serviceType", e.kServiceTypeValue = "WEBAPP", e.kReservationId = "reservationId", e.kServiceRequestId = "serviceRequestId", e.kServiceCategory = "serviceCategory", e.kServiceCategoryValue = "WEB", e.kServiceContext = "serviceContext", e.kQuantity = "quantity", e.kValidFor = "validFor", e.kMerchantTransactionId = "merchantTransactionId", e.kServiceTypeVersion = "serviceTypeVersion", e.kKey = "key", e.kValue = "value"
        }(t = e.Constant || (e.Constant = {})), function (e) {
            e[e.CONTACT_TYPE_VPA = 1] = "CONTACT_TYPE_VPA", e[e.CONTACT_TYPE_PHONE = 2] = "CONTACT_TYPE_PHONE", e[e.CONTACT_TYPE_MERCHANT = 3] = "CONTACT_TYPE_MERCHANT", e[e.CONTACT_TYPE_USER_DATA = 4] = "CONTACT_TYPE_USER_DATA", e[e.CONTACT_TYPE_EXTERNAL_UPI_MERCHANT = 5] = "CONTACT_TYPE_EXTERNAL_UPI_MERCHANT", e[e.CONTACT_TYPE_RETAIL_MERCHANT = 6] = "CONTACT_TYPE_RETAIL_MERCHANT", e[e.CONTACT_TYPE_BANK_ACCOUNT = 7] = "CONTACT_TYPE_BANK_ACCOUNT", e[e.CONTACT_TYPE_WALLET = 8] = "CONTACT_TYPE_WALLET", e[e.CONTACT_TYPE_MY_ACCOUNT = 9] = "CONTACT_TYPE_MY_ACCOUNT"
        }(n = e.CONTACT_TYPE || (e.CONTACT_TYPE = {})), function (e) {
            e[e.MODE_SEND_MONEY = 1] = "MODE_SEND_MONEY", e[e.MODE_SPLIT_MONEY = 2] = "MODE_SPLIT_MONEY", e[e.REQUEST_MONEY = 3] = "REQUEST_MONEY", e[e.MODE_RECHARGE_MOBILE = 4] = "MODE_RECHARGE_MOBILE", e[e.MODE_WALLET_TOP_UP = 5] = "MODE_WALLET_TOP_UP", e[e.MODE_BLE_PAYMENT = 6] = "MODE_BLE_PAYMENT"
        }(i = e.PAYMENT_MODE || (e.PAYMENT_MODE = {})), function (e) {
            e.SENT_PAYMENT = "SENT_PAYMENT", e.RECEIVED_PAYMENT = "RECEIVED_PAYMENT", e.USER_TO_USER_SENT_REQUEST = "USER_TO_USER_SENT_REQUEST", e.USER_TO_USER_RECEIVED_REQUEST = "USER_TO_USER_RECEIVED_REQUEST", e.ENSEMBLE_SENT_PAYMENT = "ENSEMBLE_SENT_PAYMENT", e.MISSED_PAYMENT = "MISSED_PAYMENT", e.PHONE_RECHARGE = "PHONE_RECHARGE", e.BILL_PAYMENT = "BILL_PAYMENT", e.TICKETING = "TICKETING", e.COMMUTE = "COMMUTE", e.UNKNOWN = "UNKNOWN"
        }(s = e.TRANSACTION_TYPE || (e.TRANSACTION_TYPE = {})), function (e) {
            e.MERCHANT_REVERSAL = "MERCHANT_REVERSAL", e.MERCHANT_CASHBACK = "MERCHANT_CASHBACK"
        }(o = e.TRANSFER_MODE || (e.TRANSFER_MODE = {}));
        e.Contact = class {
            constructor(e, t, n, r) {
                this.type = e, this.name = t, this.displayImageUrl = n, this.lookupId = r
            }
        };
        e.InternalPaymentUiConfig = class {
            constructor(e, t, n, i, s, o) {
                if (this.isAmountEditable = !1, this.isInitialContactEditable = !1, this.isNoteEditable = !1, this.showRateMeDialog = !1, this.title = e, this.initialAmount = t, this.initialContactList = n, this.confirmationScreenDuration = i, s) this.confirmationActionButtonProperties = s; else {
                    let e = {
                        PENDING: new r("DONE"),
                        COMPLETED: new r("VIEW BOOKING"),
                        ERRORED: new r("DONE"),
                        DEFAULT: new r("DONE")
                    };
                    this.confirmationActionButtonProperties = e
                }
                this.shouldConfirmationCloseOnFailure = o || !1
            }
        };

        class a {
            constructor(e) {
                this.allowedInstruments = e, this.supportedInstruments = e
            }
        }

        e.PayRequest = a;
        e.MicroPayRequest = class extends a {
            constructor(e, t, n, r, i, s) {
                super(t), this.merchantId = e, this.serviceVersion = n, this.fallbackURL = r, this.paymentOptionsContext = i, this.serviceRequestId = s
            }
        };
        e.PaymentTimeOutModel = class {
            constructor(e, t, n, r, i, s) {
                this.time = e, this.showDialog = t, this.title = n, this.message = r, this.actionButtonName = i, this.errorCode = s
            }
        };
        e.DismissBehaviourModel = class {
            constructor(e, t, n, r, i, s) {
                this.showDialog = e, this.title = t, this.message = n, this.positiveButton = r, this.negativeButton = i, this.errorCode = s
            }
        };
        e.TopUpConsentContext = class {
            constructor(e, t, n) {
                this.showDialog = e, this.title = t, this.message = n
            }
        };
        e.AddToWalletUiContext = class {
            constructor(e, t, n, r, i, s, o, a, c, l, d, u) {
                this.walletPageTitle = e, this.suggestedAmount = t, this.showCloseWalletOption = n, this.hideWalletWithdrawal = r, this.minAmount = i, this.showRateMeDialog = s, this.isAmountEditable = o, this.confirmationScreenDuration = a, this.showTopupConsent = c, this.topUpConsentContext = l, this.paymentDismiss = d, this.paymentOptionsContext = u
            }
        };
        e.MandateConfig = class {
            constructor(e, t, n, r, i, s) {
                this.type = e, this.merchantId = t, this.serviceProviderIds = n, this.serviceType = r, this.serviceCategory = i, this.entityType = s
            }
        };
        e.MandateVisibleProperties = class {
            constructor(e, t, n, r, i) {
                this.amount = e, this.frequency = t, this.autoPayDay = n, this.payeeWidget = r, this.toolbar = i
            }
        };
        e.MandateUiConfig = class {
            constructor(e, t, n, r, i, s, o, a, c, l, d, u, h, g, P) {
                this.visibilityProperty = e, this.analyticsInfo = t, this.successMessage = n, this.actionButtonText = r, this.title = i, this.merchantName = s, this.merchantMandateDescription = o, this.merchantBannerImageId = a, this.merchantBannerImageSection = c, this.merchantImageId = l, this.merchantImageSection = d, this.mandateInfoLink = u, this.confirmationScreenDuration = h, this.dismissButtonDisplayTimeout = g, this.contactId = P
            }
        };
        e.PaymentOptionsContext = class {
            constructor(e) {
                this.type = "FULFILL_SERVICE", this.metaData = e
            }
        };
        e.PaymentOptionsContextMetadata = class {
            constructor(e, t, n, r) {
                this.merchantId = e, this.serviceCategory = t, this.serviceProviderId = n, this.serviceType = r
            }
        }
    }(t.ExternalPaymentsNamespace || (t.ExternalPaymentsNamespace = {}))
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(5);

    class i {
        static addSubscription(e) {
            let t = this.eventNameToSubscriptionMapping[e.eventName];
            t ? t.push(e) : (t = []).push(e), this.eventNameToSubscriptionMapping[e.eventName] = t
        }

        static removeSubscription(e) {
            let t = e.eventName, n = e.callbackName, r = this.eventNameToSubscriptionMapping[t];
            if (r) {
                let e = [], t = 0;
                for (let i of r) i.callbackName === n && (e.push(t), t++);
                for (; e.length;) {
                    let t = e.pop();
                    t && r.splice(t, 1)
                }
            }
        }

        static removeAllSubscriptions(e) {
            this.eventNameToSubscriptionMapping.hasOwnProperty(e) && delete this.eventNameToSubscriptionMapping[e]
        }

        static sendEvent(e, t) {
            let n = this.eventNameToSubscriptionMapping[e];
            if (n) for (let e of n) e.listener(t); else r.Logger.logd("PhonePe", "[Error] No subscribers for eventName = " + e)
        }
    }

    i.eventNameToSubscriptionMapping = {}, t.EventHandler = i
}, function (e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function (e, t, n, r) {
        return new (n || (n = Promise))(function (i, s) {
            function o(e) {
                try {
                    c(r.next(e))
                } catch (e) {
                    s(e)
                }
            }

            function a(e) {
                try {
                    c(r.throw(e))
                } catch (e) {
                    s(e)
                }
            }

            function c(e) {
                e.done ? i(e.value) : new n(function (t) {
                    t(e.value)
                }).then(o, a)
            }

            c((r = r.apply(e, t || [])).next())
        })
    };
    Object.defineProperty(t, "__esModule", {value: !0});
    const i = n(6), s = n(12), o = n(14), a = n(16), c = n(10), l = n(4), d = n(18), u = n(22), h = n(25), g = n(30),
        P = n(32), p = n(34), m = n(36), v = n(1), f = n(8), y = n(2), N = n(0), T = n(3), C = n(7), b = n(11),
        E = n(38), S = n(40), M = n(42);
    var _ = N.ExternalConstants.Permission;
    t.MessagingHandler = v.MessagingHandler, t.EventHandler = f.EventHandler, t.Constants = N.ExternalConstants, t.PaymentModels = b.ExternalPaymentModels;

    class A {
        constructor(e, t) {
            this.preferencesModule = g.NativePreferenceBridgeFactory.getNativePreferenceBridge(e, t), this.locationModule = u.LocationBridgeFactory.getNativeLocationBridge(e, t), this.navigationModule = h.NativeNavigationFactory.repository(e, t), this.cameraBridge = S.NativeCameraBridgeFactory.getNativeCameraBridge(e), this.permissionsBridge = a.NativePermissionsBridgeFactory.getPermissionsBridge(e, t), this.analyticsBridge = o.NativeAnalyticsBridgeFactory.getNativeAnalyticsBridge(e, t), this.authBridge = s.NativeOAuthBridgeFactory.bridge(e), this.deviceInfoBridge = P.NativeDeviceInfoBridgeFactory.bridge(e), this.bleManagerBridge = E.default.getBleManagerBridge(e), this.orderActionBridge = p.NativeOrderActionBridgeFactory.bridge(e), this.filePickerBridge = m.NativeFilePickerBridgeFactory.bridge(e), this.species = e
        }

        static build(e, t) {
            return r(this, void 0, void 0, function* () {
                let n = t;
                if (n || (n = this.getOperatingSystem(e)), !n) throw new Error(y.InternalConstants.ErrorCode.invalidParams);
                if (!l.PhonePeUtils.isValidSpecies(e) || !l.PhonePeUtils.isValidOS(n)) throw new Error(y.InternalConstants.ErrorCode.invalidParams);
                let r = new A(e, n);
                return e === N.ExternalConstants.Species.web && (yield c.MethodVersioningHandler.initSupportedVersionFromNative()), r
            })
        }

        static getOperatingSystem(e) {
            if (e === N.ExternalConstants.Species.web) {
                if (-1 !== navigator.userAgent.search(N.ExternalConstants.OSUserAgent.android)) return N.ExternalConstants.OS.android;
                if (-1 !== navigator.userAgent.search(N.ExternalConstants.OSUserAgent.ios)) return N.ExternalConstants.OS.ios;
                let e = T.PhonePeSDKWebConstants.NavigationIOS.navigateToPaymentsView;
                return l.PhonePeUtils.isValidMethodOniOS(e) ? N.ExternalConstants.OS.ios : N.ExternalConstants.OS.android
            }
            return N.ExternalConstants.OS.android
        }

        getItem(e, t, n) {
            try {
                l.PhonePeUtils.assertString(e), l.PhonePeUtils.assertString(t), l.PhonePeUtils.assertString(n, !0)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            return this.preferencesModule.getString(e, t, n)
        }

        setItem(e, t, n) {
            try {
                l.PhonePeUtils.assertString(e), l.PhonePeUtils.assertString(t), l.PhonePeUtils.assertString(n)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            return this.preferencesModule.saveString(e, t, n), l.PhonePeUtils.returnResolution(void 0)
        }

        removeItem(e, t) {
            try {
                l.PhonePeUtils.assertString(e), l.PhonePeUtils.assertString(t)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            return this.preferencesModule.removeItem(e, t), l.PhonePeUtils.returnResolution(void 0)
        }

        startUpdatingLocation() {
            this.locationModule.startUpdatingLocation()
        }

        stopUpdatingLocation() {
            this.locationModule.stopUpdatingLocation()
        }

        getCurrentLocation() {
            return this.locationModule.getCurrentLocation(!0)
        }

        registerLocationUpdateSuccessCallback(e, t) {
            try {
                l.PhonePeUtils.assertString(e), l.PhonePeUtils.assertFunction(t)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            let n = this.locationModule.onLocationUpdateSuccess(e, t);
            return l.PhonePeUtils.returnResolution(n)
        }

        registerLocationUpdateFailureCallback(e, t) {
            try {
                l.PhonePeUtils.assertString(e), l.PhonePeUtils.assertFunction(t)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            let n = this.locationModule.onLocationUpdateFailure(e, t);
            return l.PhonePeUtils.returnResolution(n)
        }

        openPaymentsPage(e, t, n, r, i, s) {
            return this.makeCommonPaymentsPageCall(y.InternalConstants.General.v1, e, t, n, r, i, s)
        }

        openTransactionDetailsPage(e) {
            try {
                l.PhonePeUtils.assertString(e)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            let t = d.ExternalNavigationFactory.transactionDetailRequest(e);
            return this.navigationModule.processNavigationRequestForResultAsync(t)
        }

        seekPermission(e) {
            try {
                l.PhonePeUtils.assertArray(e);
                for (let t of e) l.PhonePeUtils.assertString(t), l.PhonePeUtils.assert(void 0 !== _[t], y.InternalConstants.ErrorCode.invalidParams)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            return this.permissionsBridge.seekPermission(e)
        }

        openSettingsPageForPermission() {
            return this.permissionsBridge.openSettingsPageForPermission()
        }

        scanQRCode(e, t = ".*") {
            return this.cameraBridge.scanQRCode(e, t)
        }

        startCamera() {
            return this.cameraBridge.startCamera()
        }

        loadFont(e, t, n) {
            if (this.species === N.ExternalConstants.Species.web) return l.PhonePeUtils.returnRejection(y.InternalConstants.ErrorCode.invalidParams);
            throw new Error("Wrong species sent")
        }

        logMerchantEvent(e, t) {
            try {
                l.PhonePeUtils.assertString(e), l.PhonePeUtils.assertObject(t, !0)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            return this.analyticsBridge.logMerchantEvent(e, t)
        }

        fetchGrantToken() {
            return this.authBridge.fetchGrantToken()
        }

        fetchAuthToken() {
            return this.authBridge.fetchAuthToken()
        }

        createServiceRequestToken() {
            return this.orderActionBridge.createServiceRequestToken()
        }

        getDeviceInfo() {
            return this.deviceInfoBridge.getDeviceInfo()
        }

        bluetoothRead(e, t, n) {
            return this.bleManagerBridge.read(e, t, n)
        }

        bluetoothReadRSSI(e) {
            return this.bleManagerBridge.readRSSI(e)
        }

        bluetoothRefreshCache(e) {
            return this.bleManagerBridge.refreshCache(e)
        }

        bluetoothRetrieveServices(e, t) {
            return this.bleManagerBridge.retrieveServices(e, t)
        }

        bluetoothWrite(e, t, n, r, i = 20) {
            return this.bleManagerBridge.write(e, t, n, r, i)
        }

        bluetoothWriteWithoutResponse(e, t, n, r, i = 20, s = 10) {
            return this.bleManagerBridge.writeWithoutResponse(e, t, n, r, i, s)
        }

        bluetoothConnect(e) {
            return this.bleManagerBridge.connect(e)
        }

        bluetoothCreateBond(e) {
            return this.bleManagerBridge.createBond(e)
        }

        bluetoothRemoveBond(e) {
            return this.bleManagerBridge.removeBond(e)
        }

        bluetoothDisconnect(e) {
            return this.bleManagerBridge.disconnect(e)
        }

        bluetoothStartNotification(e, t, n) {
            return this.bleManagerBridge.startNotification(e, t, n)
        }

        bluetoothStopNotification(e, t, n) {
            return this.bleManagerBridge.stopNotification(e, t, n)
        }

        bluetoothCheckState() {
            this.bleManagerBridge.checkState()
        }

        bluetoothStart(e) {
            return this.bleManagerBridge.start(e)
        }

        bluetoothScan(e, t, n = !1, r = {}) {
            return this.bleManagerBridge.scan(e, t, n, r)
        }

        bluetoothStopScan() {
            return this.bleManagerBridge.stopScan()
        }

        bluetoothEnableBluetooth() {
            return this.bleManagerBridge.enableBluetooth()
        }

        bluetoothGetConnectedPeripherals(e) {
            return this.bleManagerBridge.getConnectedPeripherals(e)
        }

        bluetoothGetBondedPeripherals() {
            return this.bleManagerBridge.getBondedPeripherals()
        }

        bluetoothGetDiscoveredPeripherals() {
            return this.bleManagerBridge.getDiscoveredPeripherals()
        }

        bluetoothRemovePeripheral(e) {
            return this.bleManagerBridge.removePeripheral(e)
        }

        bluetoothIsPeripheralConnected(e, t) {
            return this.bleManagerBridge.isPeripheralConnected(e, t)
        }

        bluetoothRequestConnectionPriority(e, t) {
            return this.bleManagerBridge.requestConnectionPriority(e, t)
        }

        bluetoothRequestMTU(e, t) {
            return this.bleManagerBridge.requestMTU(e, t)
        }

        reserveOrder(e, t) {
            let n;
            try {
                l.PhonePeUtils.assertString(e), l.PhonePeUtils.assertString(t), n = JSON.parse(M.Base64Client.decode(e)), l.PhonePeUtils.assertObject(n)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            return this.orderActionBridge.reserveOrder(l.PhonePeUtils.getReserveOrderPayload(n, t))
        }

        proceedToPay(e, t) {
            try {
                l.PhonePeUtils.assertString(e), A.getOperatingSystem(this.species) === N.ExternalConstants.OS.ios && l.PhonePeUtils.assertString(t)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            let n = t ? encodeURIComponent(t) : "";
            const r = d.ExternalNavigationFactory.genericPaymentNavigationRequest(e, n);
            return this.navigationModule.processNavigationRequestForResultAsync(r)
        }

        openPaymentsPageForReservedOrder(e, t, n, r, i, s) {
            const o = JSON.parse(M.Base64Client.decode(t));
            return this.makeCommonPaymentsPageCall(y.InternalConstants.General.v2, e, o, n, r, i, s)
        }

        makeCommonPaymentsPageCall(e, t, n, r, i, s, o) {
            try {
                l.PhonePeUtils.assertString(t), l.PhonePeUtils.assertObject(n), this.species === N.ExternalConstants.Species.web && l.PhonePeUtils.assertString(r, !0), l.PhonePeUtils.assertString(i, !0), l.PhonePeUtils.assertArray(s, !0)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            let a = n[C.ExternalPaymentsNamespace.Constant.kPayableAmount], c = {};
            a && (c = {amount: a}), this.logMerchantEvent("CATEGORY_PAYMENT_INIT", c);
            let u = d.ExternalNavigationFactory.paymentNavigationRequest(t, n, e, r, i, s, o);
            return new Promise((e, t) => {
                this.navigationModule.processNavigationRequestForResultAsync(u).then(t => {
                    let r = {}, i = C.ExternalPaymentsNamespace.Constant.kMerchantTransactionId, s = n[i];
                    s && (r[i] = s), e(r)
                }).catch(e => {
                    t(e)
                })
            })
        }

        selectFile(e, t) {
            try {
                l.PhonePeUtils.assertString(e), l.PhonePeUtils.assertBoolean(t)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            return this.filePickerBridge.selectFile(e, t)
        }

        readFile(e, t, n) {
            try {
                if (l.PhonePeUtils.assertString(e), l.PhonePeUtils.assertNumber(t), l.PhonePeUtils.assertNumber(n), t < 0 || n < 0) throw new TypeError(y.InternalConstants.ErrorCode.invalidParams)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            return this.filePickerBridge.readFile(e, t, n)
        }

        closeApp() {
            let e = new i.CloseAppNavRequest("");
            this.navigationModule.closeAppRequest(e)
        }

        openMicroApp(e, t) {
            try {
                l.PhonePeUtils.assertString(e), l.PhonePeUtils.assertObject(t, !0)
            } catch (e) {
                return l.PhonePeUtils.returnRejection(e)
            }
            let n = new i.MicroAppNavigationRequest("", e, t, "", !0, !1);
            return this.navigationModule.processNavigationRequestAsync(n)
        }

        isMethodSupported(e) {
            return c.MethodVersioningHandler.isMethodSupported(e)
        }
    }

    A.loggingEnabled = !1, t.PhonePe = A
}, function (e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function (e, t, n, r) {
        return new (n || (n = Promise))(function (i, s) {
            function o(e) {
                try {
                    c(r.next(e))
                } catch (e) {
                    s(e)
                }
            }

            function a(e) {
                try {
                    c(r.throw(e))
                } catch (e) {
                    s(e)
                }
            }

            function c(e) {
                e.done ? i(e.value) : new n(function (t) {
                    t(e.value)
                }).then(o, a)
            }

            c((r = r.apply(e, t || [])).next())
        })
    };
    Object.defineProperty(t, "__esModule", {value: !0});
    const i = n(5), s = n(1), o = n(3), a = n(2);

    class c {
        static initSupportedVersionFromNative() {
            return r(this, void 0, void 0, function* () {
                yield this.fetchNativeSupportedSDKVersion().then(e => {
                    i.Logger.logd("PhonePe", "Version received from native side = " + e), c.version = Number(e)
                }).catch(e => {
                    throw i.Logger.logd("PhonePe", "Error found when trying to fetch version = " + e), Error("Something is really wrong here! We should be able to fetch version always. Are you sure you are testing it inside the PhonePe app?")
                }), this.populateMethodToVersionMapping()
            })
        }

        static isMethodSupported(e) {
            if (e === o.PhonePeSDKWebConstants.Metadata.supportedVersion) return !0;
            if (!c.version) throw i.Logger.logd("PhonePe", "[Error] Can't call isMethodSupported before native has returned the version"), Error("Can't call isMethodSupported before native has returned the version");
            let t = c.methodToVersionMapping[e];
            if (!t) throw i.Logger.logd("PhonePe", "[Error] Could not find this method in mapping. This should never happen!"), Error("Could not find this method in mapping. This should never happen!");
            {
                let e = t[o.PhonePeSDKWebConstants.General.min], n = t[o.PhonePeSDKWebConstants.General.max],
                    r = c.version;
                if (i.Logger.logd("PhonePe", "Comparing minVersion = " + e + " maxVersion = " + n + " nativeSDKSupportVersion = " + r), r < e) return !1;
                if (-1 !== n && r > n) return !1
            }
            return !0
        }

        static fetchNativeSupportedSDKVersion() {
            return i.Logger.logd("PhonePe", "Trying to call supportedVersion method in fetchNativeSupportedSDKVersion"), s.MessagingHandler.storePromiseAndCallNative(o.PhonePeSDKWebConstants.Metadata.supportedVersion, o.PhonePeSDKWebConstants.Metadata.androidBridgeName, {})
        }

        static populateMethodToVersionMapping() {
            let e = {min: 1, max: -1};
            this.methodToVersionMapping[o.PhonePeSDKWebConstants.Preferences.getItem] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.Preferences.setItem] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.Preferences.removeItem] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.Preferences.removeItemAndroid] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.Location.startUpdatingLocation] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.Location.stopUpdatingLocation] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.Location.getCurrentLocation] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.Navigation.navigateToPath] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.Navigation.navigateToPathForResult] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.NavigationIOS.navigateToPaymentsView] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.NavigationIOS.navigateToHelpPage] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.NavigationIOS.navigateToTransactionDetail] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.User.getUserDetails] = e, this.methodToVersionMapping[o.PhonePeSDKWebConstants.Metadata.supportedVersion] = e, this.methodToVersionMapping[a.InternalConstants.PermissionsBridge.openSettingsPage] = e, this.methodToVersionMapping[a.InternalConstants.PermissionsBridge.seekPermission] = e, this.methodToVersionMapping[a.InternalConstants.AnalyticsBridge.methodName] = e, this.methodToVersionMapping[a.InternalConstants.AuthBridge.fetchGrantToken] = e, this.methodToVersionMapping[a.InternalConstants.CameraBridge.scanQRCode] = e, this.methodToVersionMapping[a.InternalConstants.CameraBridge.startCamera] = e, this.methodToVersionMapping[a.InternalConstants.OrderActionBridge.reserveOrder] = Object.assign({}, e, {min: 3}), this.methodToVersionMapping[a.InternalConstants.OrderActionBridge.openPaymentsPageForReservedOrder] = Object.assign({}, e, {min: 3}), this.methodToVersionMapping[a.InternalConstants.OrderActionBridge.fetchOrderRequestToken] = Object.assign({}, e, {min: 6}), this.methodToVersionMapping[a.InternalConstants.FilePickerBridge.readFile] = Object.assign({}, e, {min: 4}), this.methodToVersionMapping[a.InternalConstants.FilePickerBridge.selectFile] = Object.assign({}, e, {min: 4}), this.methodToVersionMapping[o.PhonePeSDKWebConstants.NavigationIOS.navigateToGenericPaymentsView] = Object.assign({}, e, {min: 5}), this.methodToVersionMapping[o.PhonePeSDKWebConstants.Navigation.navigateToGenericPayment] = Object.assign({}, e, {min: 5}), this.methodToVersionMapping[o.PhonePeSDKWebConstants.Navigation.navigateToGenericPaymentForResult] = Object.assign({}, e, {min: 5}), this.methodToVersionMapping[a.InternalConstants.AuthBridge.fetchAuthToken] = Object.assign({}, e, {min: 5})
        }
    }

    c.methodToVersionMapping = {}, t.MethodVersioningHandler = c
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), function (e) {
        let t;
        !function (e) {
            e.PENDING = "PENDING", e.COMPLETED = "COMPLETED", e.ERRORED = "ERRORED", e.DEFAULT = "DEFAULT"
        }(t = e.TransactionState || (e.TransactionState = {}));
        e.ActionButtonProp = class {
            constructor(e, t) {
                this.name = e, this.shouldHide = t
            }
        }
    }(t.ExternalPaymentModels || (t.ExternalPaymentModels = {}))
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(13), i = n(0);
    t.NativeOAuthBridgeFactory = class {
        static bridge(e) {
            if (e === i.ExternalConstants.Species.web) return new r.WebNativeOAuthBridge;
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(1), i = n(2).InternalConstants.AuthBridge;
    t.WebNativeOAuthBridge = class {
        fetchGrantToken() {
            return new Promise((e, t) => {
                r.MessagingHandler.storePromiseAndCallNative(i.fetchGrantToken, i.bridgeName, {}).then(t => {
                    e(JSON.parse(t))
                }).catch(e => {
                    t(e)
                })
            })
        }

        fetchAuthToken() {
            return new Promise((e, t) => {
                r.MessagingHandler.storePromiseAndCallNative(i.fetchAuthToken, i.bridgeName, {}).then(t => {
                    e(JSON.parse(t))
                }).catch(e => {
                    t(e)
                })
            })
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(15), i = n(0);
    t.NativeAnalyticsBridgeFactory = class {
        static getNativeAnalyticsBridge(e, t) {
            if (e === i.ExternalConstants.Species.web) return new r.WebNativeAnalyticsBridge;
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(1), i = n(2);
    var s = i.InternalConstants.AnalyticsBridge;
    t.WebNativeAnalyticsBridge = class {
        logMerchantEvent(e, t) {
            return r.MessagingHandler.storePromiseAndCallNative(s.methodName, s.bridgeName, this.objectForAnalytics(e, t))
        }

        objectForAnalytics(e, t) {
            let n = {};
            return n[i.InternalConstants.AnalyticsBridge.kName] = e, t && (n[i.InternalConstants.AnalyticsBridge.kMetadata] = t), n
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(17), i = n(0);
    t.NativePermissionsBridgeFactory = class {
        static getPermissionsBridge(e, t) {
            if (e === i.ExternalConstants.Species.web) return new r.WebPermissionsBridge(t);
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(5), i = n(4), s = n(1);
    var o = n(2).InternalConstants.PermissionsBridge;
    t.WebPermissionsBridge = class {
        constructor(e) {
            this.operatingSystem = e
        }

        seekPermission(e) {
            let t = i.PhonePeUtils.osSpecificPermissionNames(e, this.operatingSystem);
            return new Promise((e, n) => {
                s.MessagingHandler.storePromiseAndCallNative(o.seekPermission, o.name, {permissions: t}).then(t => {
                    if (r.Logger.logd("PhonePe", "Unstripped response = " + JSON.stringify(t)), "string" == typeof t) {
                        let n = JSON.parse(t);
                        n.forEach(e => {
                            let t = i.PhonePeUtils.strippedPermissionName(e[o.kPermission], this.operatingSystem);
                            e[o.kPermission] = t
                        }), r.Logger.logd("PhonePe", "Stripped response = " + JSON.stringify(n)), e(n)
                    } else n("Wrong response sent by PhonePe")
                }).catch(e => {
                    n(e)
                })
            })
        }

        openSettingsPageForPermission() {
            return s.MessagingHandler.storePromiseAndCallNative(o.openSettingsPage, o.name, {})
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(19), i = n(20), s = n(6), o = n(7), a = n(21);
    var c = o.ExternalPaymentsNamespace.Constant;
    t.ExternalNavigationFactory = class {
        static genericPaymentNavigationRequest(e, t) {
            return new s.GenericPaymentNavigationRequest("Pay", !0, !1, e, t)
        }

        static paymentNavigationRequest(e, t, n, l, d, u, h) {
            let g = t[o.ExternalPaymentsNamespace.Constant.kPayableAmount],
                P = t[o.ExternalPaymentsNamespace.Constant.kValidFor];
            P && (P *= 1e3);
            let p = t[c.kMerchantId], m = i.ExternalPaymentsRequestFactory.internalPaymentUIConfig(g, e, P, d, h, p),
                v = i.ExternalPaymentsRequestFactory.microPayRequest(t, n, l), f = new s.PaymentMetaData([{}]);
            if (void 0 !== u) {
                let e = [];
                for (let t of u) for (let n in t) if (t.hasOwnProperty(n)) {
                    let r = n, i = t[n], s = {};
                    s[c.kKey] = r, s[c.kValue] = i, e.push(s)
                }
                f.details = e
            }
            let y = t[c.kServiceCategory];
            y || (y = "JSSDK");
            let N = new r.OriginInfo(new a.AnalyticsInfo(y, y + "_NAVIGATE_TO_PAYMENTS", Math.random().toString(36).substring(7)));
            return new s.PaymentNavigationRequest("Pay", "Pay", !0, !1, o.ExternalPaymentsNamespace.PAYMENT_MODE.MODE_SEND_MONEY, v, m, o.ExternalPaymentsNamespace.TRANSACTION_TYPE.SENT_PAYMENT, f, N)
        }

        static transactionDetailRequest(e) {
            let t = new r.OriginInfo(new a.AnalyticsInfo("JSSDK", "JSSDK_NAVIGATE_TO_TRANSACTION_DETAILS", Math.random().toString(36).substring(7)));
            return new s.TransactionDetailsNavigationRequest("Details", "Details", !0, !1, e, o.ExternalPaymentsNamespace.TRANSACTION_TYPE.SENT_PAYMENT, t)
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.OriginInfo = class {
        constructor(e) {
            this.analyticsInfo = e
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(7);
    var i = r.ExternalPaymentsNamespace.Constant, s = r.ExternalPaymentsNamespace.PaymentOptionsContext,
        o = r.ExternalPaymentsNamespace.PaymentOptionsContextMetadata, a = r.ExternalPaymentsNamespace.MicroPayRequest,
        c = r.ExternalPaymentsNamespace.PaymentTimeOutModel, l = r.ExternalPaymentsNamespace.DismissBehaviourModel,
        d = r.ExternalPaymentsNamespace.InternalPaymentUiConfig, u = r.ExternalPaymentsNamespace.Contact,
        h = r.ExternalPaymentsNamespace.CONTACT_TYPE;
    const g = n(2);
    t.ExternalPaymentsRequestFactory = class {
        static microPayRequest(e, t, n) {
            let r = e[i.kServiceRequestId],
                c = new a(e[i.kMerchantId], 191, g.InternalConstants.General.v1, n, void 0, r);
            c.serviceProviderId = c.merchantId;
            let l = {};
            l[i.kSellingPrice] = e[i.kPayableAmount], l[i.kServiceType] = i.kServiceTypeValue, l[i.kReservationId] = e[i.kReservationId];
            let d = {};
            d[i.kServiceCategory] = e[i.kServiceCategory], l[i.kServiceContext] = d, e[i.kQuantity] && (l[i.kQuantity] = e[i.kQuantity]), l[i.kServiceTypeVersion] = e[i.kServiceTypeVersion], c.fulFillContext = JSON.stringify(l), c.discoveryContext = JSON.stringify(this.discoveryContext(c.merchantId));
            let u = new o(c.merchantId, e[i.kServiceCategory], c.merchantId, i.kServiceTypeValue);
            return c.paymentOptionsContext = JSON.stringify(new s(u)), c
        }

        static discoveryContext(e) {
            return {merchantId: e, mode: g.InternalConstants.General.discoveryContextMode}
        }

        static internalPaymentUIConfig(e, t, n, r, i, s) {
            let o = [new u(h.CONTACT_TYPE_MERCHANT, t, r, s)],
                a = g.InternalConstants.General.confirmationScreenDuration,
                c = new d(g.InternalConstants.General.paymentScreenName, e, o, a, i);
            return void 0 !== n && null !== n && n > 0 && (c.paymentTimeout = this.paymentTimeoutModel(n)), c.paymentDismiss = this.paymentDismissModel(), c
        }

        static paymentTimeoutModel(e) {
            return new c(e, !0, i.timeoutTitle, i.timeoutMessage, i.timeoutActionButtonTitle, i.PAYMENT_TIMEOUT)
        }

        static paymentDismissModel() {
            return new l(!0, i.dismissTitle, i.dismissMessage, i.dismissPositiveButtonTitle, i.dismissNegativeButtonTitle, i.PAYMENT_DISMISS)
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.AnalyticsInfo = class {
        constructor(e, t, n) {
            this.category = e, this.action = t, this.groupingKey = n, this.startTimeStamp = (new Date).getTime(), this.lastTimeStamp = this.startTimeStamp, this.customDimens = {}, this.isTransactionalEvent = !1, this.value = 0, this.isFirstTime = !0
        }

        setValue(e) {
            this.value = e
        }

        setTransactionalEvent(e) {
            this.isTransactionalEvent = !0, this.value = e
        }

        setCustomDimension(e) {
            this.customDimens = e
        }

        setLastTimeStamp(e) {
            this.lastTimeStamp = e
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(23), i = n(0);
    t.LocationBridgeFactory = class {
        static getNativeLocationBridge(e, t) {
            if (e === i.ExternalConstants.Species.web) return new r.WebLocationBridge;
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(24), i = n(3), s = n(1), o = n(8);
    var a = i.PhonePeSDKWebConstants.Location;
    t.WebLocationBridge = class {
        getAddress(e, t) {
            return Promise.resolve()
        }

        startUpdatingLocation() {
            s.MessagingHandler.callNative(a.startUpdatingLocation, a.androidBridgeName, {})
        }

        stopUpdatingLocation() {
            s.MessagingHandler.callNative(a.stopUpdatingLocation, a.androidBridgeName, {}), o.EventHandler.removeAllSubscriptions(a.locationSuccessEventKey), o.EventHandler.removeAllSubscriptions(a.locationFailureEventKey)
        }

        getCurrentLocation() {
            let e = {};
            return e[a.forceNewLocation] = !0, s.MessagingHandler.storePromiseAndCallNative(a.getCurrentLocation, a.androidBridgeName, e)
        }

        onLocationUpdateSuccess(e, t) {
            let n = new r.PhonePeWebSubscription(e, a.locationSuccessEventKey, t);
            return o.EventHandler.addSubscription(n), n
        }

        onLocationUpdateFailure(e, t) {
            let n = new r.PhonePeWebSubscription(e, a.locationFailureEventKey, t);
            return o.EventHandler.addSubscription(n), n
        }

        isLocationTurnedOn() {
            return Promise.resolve()
        }

        turnOnLocation() {
            return Promise.resolve()
        }

        setLocationPriority(e) {
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(8);
    t.PhonePeWebSubscription = class {
        constructor(e, t, n) {
            this.eventName = t, this.listener = n, this.callbackName = e
        }

        remove() {
            r.EventHandler.removeSubscription(this)
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(26), i = n(29), s = n(0);
    t.NativeNavigationFactory = class {
        static repository(e, t) {
            if (e === s.ExternalConstants.Species.web) return t === s.ExternalConstants.OS.ios ? new i.IOSWebNavigationHandler : new r.AndroidWebNavigationHandler;
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function (e, t, n, r) {
        return new (n || (n = Promise))(function (i, s) {
            function o(e) {
                try {
                    c(r.next(e))
                } catch (e) {
                    s(e)
                }
            }

            function a(e) {
                try {
                    c(r.throw(e))
                } catch (e) {
                    s(e)
                }
            }

            function c(e) {
                e.done ? i(e.value) : new n(function (t) {
                    t(e.value)
                }).then(o, a)
            }

            c((r = r.apply(e, t || [])).next())
        })
    };
    Object.defineProperty(t, "__esModule", {value: !0});
    const i = n(4), s = n(1), o = n(27), a = n(6), c = n(3), l = n(2);
    var d = c.PhonePeSDKWebConstants.Navigation, u = l.InternalConstants.ActivityID;

    class h {
        processNavigationRequestAsync(e, t) {
            return r(this, void 0, void 0, function* () {
                if (e.screenType === a.NavigationScreenType.PaymentsView) {
                    let n = e;
                    return this.navigateToPayment(n, e.isNewTask, t)
                }
                if (e.screenType === a.NavigationScreenType.TransactionDetail) {
                    let n = e;
                    return this.navigateToTransactionDetail(n, e.isNewTask, t)
                }
                if (e.screenType === a.NavigationScreenType.GenericPaymentsView) {
                    let n = e;
                    return this.navigateToGenericPayment(n, e.isNewTask, t)
                }
                return i.PhonePeUtils.returnRejection("Unhandled request type")
            })
        }

        processNavigationRequestForResultAsync(e) {
            return r(this, void 0, void 0, function* () {
                return this.processNavigationRequestAsync(e, !0)
            })
        }

        navigateToPayment(e, t, n) {
            let r = o.NativeNavigationRequestFactory.pathFromPaymentRequest(e, t),
                i = this.objectForNavigation(r, u.payments, t);
            return n ? s.MessagingHandler.storePromiseAndCallNative(d.navigateToPathForResult, d.androidBridgeName, i) : s.MessagingHandler.callNative(d.navigateToPath, d.androidBridgeName, i)
        }

        navigateToTransactionDetail(e, t, n) {
            return r(this, void 0, void 0, function* () {
                let r = o.NativeNavigationRequestFactory.pathFromTransactionDetailsRequest(e, t),
                    i = this.objectForNavigation(r, u.transactionDetails, t);
                return n ? s.MessagingHandler.storePromiseAndCallNative(d.navigateToPathForResult, d.androidBridgeName, i) : s.MessagingHandler.callNative(d.navigateToPath, d.androidBridgeName, i)
            })
        }

        navigateToGenericPayment(e, t, n) {
            let r = o.NativeNavigationRequestFactory.pathFromGenericPaymentRequest(e, t),
                i = this.objectForNavigation(r, u.payments, t);
            return n ? s.MessagingHandler.storePromiseAndCallNative(d.navigateToPathForResult, d.androidBridgeName, i) : s.MessagingHandler.callNative(d.navigateToPath, d.androidBridgeName, i)
        }

        objectForNavigation(e, t, n) {
            let r = {};
            return r[h.pathKey] = JSON.stringify(e), r[h.activityIdKey] = t, r[h.isNewTaskKey] = n ? 268435456 : 0, r
        }

        closeAppRequest(e) {
        }
    }

    h.pathKey = "path", h.activityIdKey = "activityId", h.isNewTaskKey = "isNewTask", t.AndroidWebNavigationHandler = h
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(28);
    t.NativeNavigationRequestFactory = class {
        static pathFromPaymentRequest(e, t) {
            let n = [], i = new r.Node("payment_activity", "ACTIVITY", {}), s = {};
            s.mode = JSON.stringify(e.mode), s.internalPaymentUiConfig = JSON.stringify(e.internalPaymentUiConfig), s.microPayRequest = JSON.stringify(e.microPayRequest), s.transactionType = JSON.stringify(e.transactionType), s.info = JSON.stringify(e.originInfo), s.metaData = JSON.stringify(e.metaData);
            let o = new r.Node("micro_app_payment", "FRAGMENT", s);
            return n.push(i), n.push(o), new r.Path(n)
        }

        static pathFromGenericPaymentRequest(e, t) {
            let n = [], i = new r.Node("payment_activity", "ACTIVITY", {}), s = {};
            s.reservationId = e.reservationId, s.fallbackUrl = e.fallbackUrl;
            let o = new r.Node("micro_app_aggregator_payment", "FRAGMENT", s);
            return n.push(i), n.push(o), new r.Path(n)
        }

        static pathFromTransactionDetailsRequest(e, t) {
            let n = [], i = new r.Node("transaction_details_activity", "ACTIVITY", {}), s = {};
            s.transactionId = JSON.stringify(e.transactionId), s.transactionType = JSON.stringify("TICKETING"), s.info = JSON.stringify(e.info);
            let o = new r.Node("transaction_details_fragment", "FRAGMENT", s);
            return n.push(i), n.push(o), new r.Path(n)
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.Node = class {
        constructor(e, t, n) {
            this.name = e, this.screenType = t, this.data = n
        }
    };
    t.Path = class {
        constructor(e) {
            this.node = e
        }
    }
}, function (e, t, n) {
    "use strict";
    var r = this && this.__awaiter || function (e, t, n, r) {
        return new (n || (n = Promise))(function (i, s) {
            function o(e) {
                try {
                    c(r.next(e))
                } catch (e) {
                    s(e)
                }
            }

            function a(e) {
                try {
                    c(r.throw(e))
                } catch (e) {
                    s(e)
                }
            }

            function c(e) {
                e.done ? i(e.value) : new n(function (t) {
                    t(e.value)
                }).then(o, a)
            }

            c((r = r.apply(e, t || [])).next())
        })
    };
    Object.defineProperty(t, "__esModule", {value: !0});
    const i = n(4), s = n(6), o = n(1), a = n(3);
    t.IOSWebNavigationHandler = class {
        processNavigationRequestAsync(e, t) {
            return r(this, void 0, void 0, function* () {
                if (e.screenType === s.NavigationScreenType.PaymentsView) {
                    let n = e;
                    return this.navigateToPayment(n, e.isNewTask, t)
                }
                if (e.screenType === s.NavigationScreenType.TransactionDetail) {
                    let n = e;
                    return this.navigateToTransactionDetail(n, e.isNewTask, t)
                }
                if (e.screenType === s.NavigationScreenType.GenericPaymentsView) {
                    let n = e;
                    return this.navigateToGenericPayment(n, e.isNewTask, t)
                }
                return i.PhonePeUtils.returnRejection("Unhandled request type")
            })
        }

        processNavigationRequestForResultAsync(e) {
            return r(this, void 0, void 0, function* () {
                return this.processNavigationRequestAsync(e, !0)
            })
        }

        navigateToPayment(e, t, n) {
            let r = e, i = a.PhonePeSDKWebConstants.NavigationIOS.navigateToPaymentsView;
            return o.MessagingHandler.storePromiseAndCallNative(i, "", r)
        }

        navigateToTransactionDetail(e, t, n) {
            return r(this, void 0, void 0, function* () {
                let t = e, n = a.PhonePeSDKWebConstants.NavigationIOS.navigateToTransactionDetail;
                return o.MessagingHandler.storePromiseAndCallNative(n, "", t)
            })
        }

        navigateToGenericPayment(e, t, n) {
            return r(this, void 0, void 0, function* () {
                let t = e, n = a.PhonePeSDKWebConstants.NavigationIOS.navigateToGenericPaymentsView;
                return o.MessagingHandler.storePromiseAndCallNative(n, "", t)
            })
        }

        closeAppRequest(e) {
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(31), i = n(0);
    t.NativePreferenceBridgeFactory = class {
        static getNativePreferenceBridge(e, t) {
            if (e === i.ExternalConstants.Species.web) return new r.WebNativePreferenceBridge(t);
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(5), i = n(1), s = n(0), o = n(3);
    var a = o.PhonePeSDKWebConstants.Preferences;
    t.WebNativePreferenceBridge = class {
        constructor(e) {
            this.operatingSystem = e
        }

        getString(e, t, n) {
            let r = this.prefObject(e, t, void 0, n);
            return i.MessagingHandler.storePromiseAndCallNative(a.getItem, a.androidBridgeName, r)
        }

        getNumber(e, t, n) {
            return new Promise((e, t) => {
                t("This should not be called in case of web pref bridge")
            })
        }

        getDecryptedUserId() {
            return new Promise((e, t) => {
                t("This should not be called in case of web pref bridge")
            })
        }

        saveNumber(e, t, n) {
            r.Logger.logd("PhonePe", "[Error] his should not be called in case of web pref bridge")
        }

        saveString(e, t, n) {
            let r = this.prefObject(e, t, n, void 0);
            i.MessagingHandler.callNative(a.setItem, a.androidBridgeName, r)
        }

        removeItem(e, t) {
            let n = this.prefObject(e, t, void 0, void 0), r = a.removeItem;
            this.operatingSystem === s.ExternalConstants.OS.android && (r = a.removeItemAndroid), i.MessagingHandler.callNative(r, o.PhonePeSDKWebConstants.Preferences.androidBridgeName, n)
        }

        prefObject(e, t, n, r) {
            let i = {};
            return e && (i[o.PhonePeSDKWebConstants.General.prefName] = e), t && (i[o.PhonePeSDKWebConstants.General.key] = t), r && (i[o.PhonePeSDKWebConstants.General.defaultValue] = r), n && (i[o.PhonePeSDKWebConstants.General.value] = n), i
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(33), i = n(0);
    t.NativeDeviceInfoBridgeFactory = class {
        static bridge(e) {
            if (e === i.ExternalConstants.Species.web) return new r.WebNativeDeviceInfoBridge;
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.WebNativeDeviceInfoBridge = class {
        getDeviceInfo() {
            return Promise.resolve()
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(35), i = n(0);
    t.NativeOrderActionBridgeFactory = class {
        static bridge(e) {
            if (e === i.ExternalConstants.Species.web) return new r.WebNativeOrderActionBridge;
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(1), i = n(2).InternalConstants.OrderActionBridge;
    t.WebNativeOrderActionBridge = class {
        reserveOrder(e) {
            return new Promise((t, n) => {
                r.MessagingHandler.storePromiseAndCallNative(i.reserveOrder, i.bridgeName, e).then(e => {
                    t(JSON.parse(e))
                }).catch(e => {
                    n(e)
                })
            })
        }

        createServiceRequestToken() {
            return new Promise((e, t) => {
                r.MessagingHandler.storePromiseAndCallNative(i.fetchOrderRequestToken, i.bridgeName, {}).then(t => {
                    e(JSON.parse(t))
                }).catch(e => {
                    t(e)
                })
            })
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(37), i = n(0);
    t.NativeFilePickerBridgeFactory = class {
        static bridge(e) {
            if (e === i.ExternalConstants.Species.web) return new r.WebNativeFilePickerBridge;
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(1), i = n(2).InternalConstants.FilePickerBridge;
    t.WebNativeFilePickerBridge = class {
        selectFile(e, t) {
            return new Promise((n, s) => {
                r.MessagingHandler.storePromiseAndCallNative(i.selectFile, i.bridgeName, {
                    mimeType: e,
                    allowMultiple: t
                }).then(e => {
                    n(JSON.parse(e))
                }).catch(e => {
                    s(e)
                })
            })
        }

        readFile(e, t, n) {
            return new Promise((s, o) => {
                r.MessagingHandler.storePromiseAndCallNative(i.readFile, i.bridgeName, {
                    uri: e,
                    offset: t,
                    length: n
                }).then(e => {
                    s(JSON.parse(e))
                }).catch(e => {
                    o(e)
                })
            })
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(0), i = n(39);
    t.default = class {
        static getBleManagerBridge(e) {
            if (e === r.ExternalConstants.Species.web) return new i.WebPPBleManager;
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.WebPPBleManager = class {
        read(e, t, n) {
            throw new Error("Wrong species sent")
        }

        readRSSI(e) {
            throw new Error("Wrong species sent")
        }

        refreshCache(e) {
            throw new Error("Wrong species sent")
        }

        retrieveServices(e, t) {
            throw new Error("Wrong species sent")
        }

        write(e, t, n, r, i) {
            throw new Error("Wrong species sent")
        }

        writeWithoutResponse(e, t, n, r, i, s) {
            throw new Error("Wrong species sent")
        }

        connect(e) {
            throw new Error("Wrong species sent")
        }

        createBond(e) {
            throw new Error("Wrong species sent")
        }

        removeBond(e) {
            throw new Error("Wrong species sent")
        }

        disconnect(e) {
            throw new Error("Wrong species sent")
        }

        startNotification(e, t, n) {
            throw new Error("Wrong species sent")
        }

        stopNotification(e, t, n) {
            throw new Error("Wrong species sent")
        }

        checkState() {
            throw new Error("Wrong species sent")
        }

        start(e) {
            throw new Error("Wrong species sent")
        }

        scan(e, t, n, r) {
            throw new Error("Wrong species sent")
        }

        stopScan() {
            throw new Error("Wrong species sent")
        }

        enableBluetooth() {
            throw new Error("Wrong species sent")
        }

        getConnectedPeripherals(e) {
            throw new Error("Wrong species sent")
        }

        getBondedPeripherals() {
            throw new Error("Wrong species sent")
        }

        getDiscoveredPeripherals() {
            throw new Error("Wrong species sent")
        }

        removePeripheral(e) {
            throw new Error("Wrong species sent")
        }

        isPeripheralConnected(e, t) {
            throw new Error("Wrong species sent")
        }

        requestConnectionPriority(e, t) {
            throw new Error("Wrong species sent")
        }

        requestMTU(e, t) {
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(41), i = n(0);
    t.NativeCameraBridgeFactory = class {
        static getNativeCameraBridge(e) {
            if (e === i.ExternalConstants.Species.web) return new r.WebNativeCameraBridge;
            throw new Error("Wrong species sent")
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(1);
    var i = n(3).PhonePeSDKWebConstants.Camera;
    t.WebNativeCameraBridge = class {
        scanQRCode(e, t) {
            return new Promise((n, s) => {
                r.MessagingHandler.storePromiseAndCallNative(i.scanQRCode, i.androidBridgeName, {
                    showGallery: e,
                    validator: t
                }).then(e => {
                    n(e)
                }).catch(e => {
                    s(e)
                })
            })
        }

        startCamera() {
            return new Promise((e, t) => {
                r.MessagingHandler.storePromiseAndCallNative(i.startCamera, i.androidBridgeName, {}).then(t => {
                    e(t)
                }).catch(e => {
                    t(e)
                })
            })
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    const r = n(43);
    t.Base64Client = class {
        static encode(e) {
            return r.Base64.encode(e)
        }

        static decode(e) {
            return r.Base64.decode(e)
        }
    }
}, function (module, exports, __webpack_require__) {
    (function (global) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        !function (global, factory) {
            module.exports = function (global) {
                "use strict";
                var _Base64 = (global = global || {}).Base64, version = "2.5.1", buffer;
                if (module.exports) try {
                    buffer = eval("require('buffer').Buffer")
                } catch (e) {
                    buffer = void 0
                }
                var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    b64tab = function (e) {
                        for (var t = {}, n = 0, r = e.length; n < r; n++) t[e.charAt(n)] = n;
                        return t
                    }(b64chars), fromCharCode = String.fromCharCode, cb_utob = function (e) {
                        if (e.length < 2) {
                            var t = e.charCodeAt(0);
                            return t < 128 ? e : t < 2048 ? fromCharCode(192 | t >>> 6) + fromCharCode(128 | 63 & t) : fromCharCode(224 | t >>> 12 & 15) + fromCharCode(128 | t >>> 6 & 63) + fromCharCode(128 | 63 & t)
                        }
                        var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                        return fromCharCode(240 | t >>> 18 & 7) + fromCharCode(128 | t >>> 12 & 63) + fromCharCode(128 | t >>> 6 & 63) + fromCharCode(128 | 63 & t)
                    }, re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, utob = function (e) {
                        return e.replace(re_utob, cb_utob)
                    }, cb_encode = function (e) {
                        var t = [0, 2, 1][e.length % 3],
                            n = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0),
                            r = [b64chars.charAt(n >>> 18), b64chars.charAt(n >>> 12 & 63), t >= 2 ? "=" : b64chars.charAt(n >>> 6 & 63), t >= 1 ? "=" : b64chars.charAt(63 & n)];
                        return r.join("")
                    }, btoa = global.btoa ? function (e) {
                        return global.btoa(e)
                    } : function (e) {
                        return e.replace(/[\s\S]{1,3}/g, cb_encode)
                    }, _encode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (e) {
                        return (e.constructor === buffer.constructor ? e : buffer.from(e)).toString("base64")
                    } : function (e) {
                        return (e.constructor === buffer.constructor ? e : new buffer(e)).toString("base64")
                    } : function (e) {
                        return btoa(utob(e))
                    }, encode = function (e, t) {
                        return t ? _encode(String(e)).replace(/[+\/]/g, function (e) {
                            return "+" == e ? "-" : "_"
                        }).replace(/=/g, "") : _encode(String(e))
                    }, encodeURI = function (e) {
                        return encode(e, !0)
                    }, re_btou = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
                    cb_btou = function (e) {
                        switch (e.length) {
                            case 4:
                                var t = (7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3),
                                    n = t - 65536;
                                return fromCharCode(55296 + (n >>> 10)) + fromCharCode(56320 + (1023 & n));
                            case 3:
                                return fromCharCode((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                            default:
                                return fromCharCode((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
                        }
                    }, btou = function (e) {
                        return e.replace(re_btou, cb_btou)
                    }, cb_decode = function (e) {
                        var t = e.length, n = t % 4,
                            r = (t > 0 ? b64tab[e.charAt(0)] << 18 : 0) | (t > 1 ? b64tab[e.charAt(1)] << 12 : 0) | (t > 2 ? b64tab[e.charAt(2)] << 6 : 0) | (t > 3 ? b64tab[e.charAt(3)] : 0),
                            i = [fromCharCode(r >>> 16), fromCharCode(r >>> 8 & 255), fromCharCode(255 & r)];
                        return i.length -= [0, 0, 2, 1][n], i.join("")
                    }, _atob = global.atob ? function (e) {
                        return global.atob(e)
                    } : function (e) {
                        return e.replace(/\S{1,4}/g, cb_decode)
                    }, atob = function (e) {
                        return _atob(String(e).replace(/[^A-Za-z0-9\+\/]/g, ""))
                    }, _decode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (e) {
                        return (e.constructor === buffer.constructor ? e : buffer.from(e, "base64")).toString()
                    } : function (e) {
                        return (e.constructor === buffer.constructor ? e : new buffer(e, "base64")).toString()
                    } : function (e) {
                        return btou(_atob(e))
                    }, decode = function (e) {
                        return _decode(String(e).replace(/[-_]/g, function (e) {
                            return "-" == e ? "+" : "/"
                        }).replace(/[^A-Za-z0-9\+\/]/g, ""))
                    }, noConflict = function () {
                        var e = global.Base64;
                        return global.Base64 = _Base64, e
                    };
                if (global.Base64 = {
                    VERSION: version,
                    atob: atob,
                    btoa: btoa,
                    fromBase64: decode,
                    toBase64: encode,
                    utob: utob,
                    encode: encode,
                    encodeURI: encodeURI,
                    btou: btou,
                    decode: decode,
                    noConflict: noConflict,
                    __buffer__: buffer
                }, "function" == typeof Object.defineProperty) {
                    var noEnum = function (e) {
                        return {value: e, enumerable: !1, writable: !0, configurable: !0}
                    };
                    global.Base64.extendString = function () {
                        Object.defineProperty(String.prototype, "fromBase64", noEnum(function () {
                            return decode(this)
                        })), Object.defineProperty(String.prototype, "toBase64", noEnum(function (e) {
                            return encode(this, e)
                        })), Object.defineProperty(String.prototype, "toBase64URI", noEnum(function () {
                            return encode(this, !0)
                        }))
                    }
                }
                global.Meteor && (Base64 = global.Base64);
                module.exports ? module.exports.Base64 = global.Base64 : (__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return global.Base64
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                return {Base64: global.Base64}
            }(global)
        }("undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== global ? global : this)
    }).call(this, __webpack_require__(44))
}, function (e, t) {
    var n;
    n = function () {
        return this
    }();
    try {
        n = n || new Function("return this")()
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}]);