define(
    [
        'ko',
        'Magento_Checkout/js/view/payment/default',
        'jquery',
        'Magento_Ui/js/modal/modal',
        'mage/url',
        'Magento_Checkout/js/model/payment/additional-validators',
        'Magento_Checkout/js/model/quote'
    ],
    function (ko, Component, $, modal, url, additionalValidators, quote, mage) {
        'use strict';
        return Component.extend({
            redirectAfterPlaceOrder: true,
            isPlaceOrderActionAllowed: ko.observable(quote.billingAddress() != null),
            defaults: {
                template: 'Storese_Phonepe/payment/phonepe'
            },

            getCode: function () {
                return 'phonepe';
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
                        console.log('error : ' + response);
                        alert('hello');

                        fullScreenLoader.stopLoader();
                        self.isPaymentProcessing.reject(response.message);
                    }
                });
            },

            renderIframe: function (data) {
                var self = this;

                console.log('data1 : ' + data);
                var reservationData = data.data.data;
                window.PhonePe.PhonePe.build(window.PhonePe.Constants.Species.web).then((sdk) => {
                    // this.setState({ loading: true })
                    sdk.proceedToPay(nextProps.reservationData.reservationId, "https://storese.in")
                        .then((response) => {
                            // const { user, cartProducts, cartTotal, coupon } = this.props;
                            console.log("PhonePe proceedToPay resp: " + JSON.stringify(response));
                            if (response.code == 'SUCCESS') {
                                self.checkStatus(response.data.transactionId);
                            }
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
                            if (response.data.code === "PAYMENT_SUCCESS") {
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
                        console.log('error : ' + response);
                        alert('error in check status');

                        // fullScreenLoader.stopLoader();
                        // self.isPaymentProcessing.reject(response.message);
                    }
                });
            },
        });
    });