define(
    [
        'ko',
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'Magento_Checkout/js/model/full-screen-loader',
        'Magento_Checkout/js/model/quote',
        'Magento_Customer/js/model/customer',
        'mage/url',
        'Storese_Phonepe/js/view/bundle/phonepe'
    ],
    function (ko, $, Component, fullScreenLoader, quote, customer, url) {
        'use strict';
        return Component.extend({
            redirectAfterPlaceOrder: true,
            isPlaceOrderActionAllowed: ko.observable(quote.billingAddress() != null),
            defaults: {
                template: 'Storese_Phonepe/payment/phonepe'
            },
            context: function () {
                return this;
            },

            getCode: function () {
                return 'phonepe';
            },

            isActive: function () {
                return true;
            },

            preparePayment: function (context, event) {

                var self = this,
                    billing_address,
                    ppe_order_id;

                fullScreenLoader.startLoader();
                this.messageContainer.clear();

                this.amount = quote.totals()['base_grand_total'] * 100;
                billing_address = quote.billingAddress();

                this.user = {
                    name: billing_address.firstname + ' ' + billing_address.lastname,
                    contact: billing_address.telephone,
                };

                if (!customer.isLoggedIn()) {
                    this.user.email = quote.guestEmail;
                } else {
                    this.user.email = customer.customerData.email;
                }

                this.isPaymentProcessing = $.Deferred();

                $.when(this.isPaymentProcessing).done(
                    function () {
                        self.placeOrder();
                    }
                ).fail(
                    function (result) {
                        self.handleError(result);
                    }
                );

                self.initiateTransaction();

                return;
            },

            initiateTransaction: function () {
                var self = this;
                console.log('placing order');
                $.ajax({
                    type: 'POST',
                    url: url.build('phonepe/payment/initiate'),

                    /**
                     * Success callback
                     * @param {Object} response
                     */
                    success: function (response) {
                        fullScreenLoader.stopLoader();
                        console.log(JSON.stringify(response));
                        if (response.success) {
                            console.log('response ' + JSON.stringify(response));
                            self.renderIframe(response);
                        } else {
                            console.log('Nah');
                            self.isPaymentProcessing.reject(response.message);
                        }
                    },

                    /**
                     * Error callback
                     * @param {*} response
                     */
                    error: function (response) {
                        console.log('error : ' + JSON.stringify(response));
                        alert('hello');

                        fullScreenLoader.stopLoader();
                        self.isPaymentProcessing.reject(response.message);
                    }
                });
            },

            renderIframe: function (data) {
                var self = this;
                console.log('type od data : ' + typeof data);
                console.log('data1 : ' + JSON.stringify(data));
                var reservationData = data.data.reservationId;
                console.log(reservationData);
                window.PhonePe.PhonePe.build(window.PhonePe.Constants.Species.web).then((sdk) => {
                    // this.setState({ loading: true })
                    sdk.proceedToPay(reservationData, "https://storese.in")
                        .then((response) => {
                            // const { user, cartProducts, cartTotal, coupon } = this.props;
                            console.log("PhonePe proceedToPay resp: " + JSON.stringify(response));
                            console.log('transactionId: '+data.data.transactionId);
                            self.checkStatus(data.data.transactionId);
                            // this.props.checkStatus(nextProps.reservationData.transactionId, user, cartProducts, cartTotal, coupon);
                            //Make changes to show loader till we go to running-order page

                        }).catch((err) => {
                        // this.setState({ pageLoading: false });
                        // nextProps.reservationData.reservationId = ""
                        // nextProps.reservationData.transactionId = ""
                        alert('error in pop up');
                        console.log("Payment failed")
                        // alert("PhonePe proceedToPay failed..")
                    })
                })
            },

            checkStatus: function (transactionID) {

                var self = this;
                console.log('inside checkstatus');
                $.ajax({
                    type: 'POST',
                    url: url.build('phonepe/payment/status'),
                    data: {'transactionID': transactionID},

                    /**
                     * Success callback
                     * @param {Object} response
                     */
                    success: function (response) {
                        // fullScreenLoader.stopLoader();
                        console.log(JSON.stringify(response));
                        if (response.success) {
                            console.log('response.code' + response.code);
                            if (response.code === "PAYMENT_SUCCESS") {
                                self.placeOrder();
                            } else {
                                console.log('Payment Unsuccessfull');
                                alert('Payment Unsuccessfull');
                            }
                        } else {
                            console.log('Error in check status');
                            alert('error in check status');
                            // self.isPaymentProcessing.reject(response.message);
                        }
                    },

                    /**
                     * Error callback
                     * @param {*} response
                     */
                    error: function (response) {
                        console.log('error : ' + JSON.stringify(response));
                        alert('error in check status');

                        // fullScreenLoader.stopLoader();
                        // self.isPaymentProcessing.reject(response.message);
                    }
                });
            },

            initiateLogin: function (context, event) {
            
                window.PhonePe.PhonePe.build(window.PhonePe.Constants.Species.web).then((sdk) => {
                    //set a loader in background
                    sdk.fetchAuthToken().then((res) => {
                        console.log("Grant token data received = " + JSON.stringify(res))
                        this.loginPhonePe(res);
                    }).catch((err) => {
                        console.log("Error occurred while fetching the grant token: " + err)
                    })
                })
            },

            loginPhonePe: function (data) {
                console.log('inside loginPhoenPe');
                $.ajax({
                    type: 'POST',
                    url: url.build('phonepe/payment/phonepelogin'),
                    data: {'phonePeResp': data},
    
                    /**
                     * Success callback
                     * @param {Object} response
                     */
                    success: function (response) {
                        // fullScreenLoader.stopLoader();
                        console.log(JSON.stringify('login resp: ' + response));
                        if (response.success) {
                            //Do what after logging in
                        } else {
                            console.log('Error logging in..');
                        }
                    },
    
                    /**
                     * Error callback
                     * @param {*} response
                     */
                    error: function (response) {
                        console.log('error logging in: ' + response);
                    }
                });
            }

            handleError: function (error) {
                if (_.isObject(error)) {
                    this.messageContainer.addErrorMessage(error);
                } else {
                    this.messageContainer.addErrorMessage({
                        message: error
                    });
                }
            },
        });
    }
);