require(
    [
        'ko',
        'jquery',
        'mage/url',
        'Storese_Phonepe/js/view/bundle/phonepe'
    ],
    function (ko, $, url) {
        'use strict';
        console.log('inside phonepe login');
        console.log('http://127.0.0.1:8888/magento2/phonepe/login/Index');
        // url.setBaseUrl(window.BASE_URL);
        // $.ajax({
        //     type: 'POST',
        //     url: url.build('phonepe/login/phonepelogin'),
        //     // url: 'http://127.0.0.1:8888/magento2/phonepe/login/phonepelogin',
        //     data: {'phonePeResp': 'GRTb5f3606f3719f8631f76f3ff4d1ba90d982f6db64227c39a0c115867861cc007'},
        //     // data: {
        //     //     'mobile': '9698670828',
        //     //     'name': 'sujith'
        //     // },
        //     /**
        //      * Success callback
        //      * @param {Object} response
        //      */
        //     success: function (response) {
        //         location.reload();
        //         // fullScreenLoader.stopLoader();
        //         console.log(JSON.stringify('login resp: ' + response));
        //         if (response.success) {
        //             //Do what after logging in
        //             location.reload();
        //         } else {
        //             console.log('Error logging in..');
        //         }
        //     },
        //
        //     /**
        //      * Error callback
        //      * @param {*} response
        //      */
        //     error: function (response) {
        //         console.log('error logging in: ' + response);
        //     }
        // });
        window.PhonePe.PhonePe.build(window.PhonePe.Constants.Species.web).then((sdk) => {
            //set a loader in background
            sdk.fetchAuthToken().then((res) => {
                console.log("Grant token data received = " + JSON.stringify(res));
                url.setBaseUrl(window.BASE_URL);
                $.ajax({
                        type: 'POST',
                        url: url.build('phonepe/login/phonepelogin'),
                        // url: 'http://127.0.0.1:8888/magento2/phonepe/login/phonepelogin',
                        data: {'phonePeResp': res.grantToken},
                        // data: {
                        //     'mobile': '9698670828',
                        //     'name': 'sujith'
                        // },
                        /**
                         * Success callback
                         * @param {Object} response
                         */
                        success: function (response) {
                            location.reload();
                            // fullScreenLoader.stopLoader();
                            console.log(JSON.stringify('login resp: ' + response));
                            if (response.success) {
                                //Do what after logging in
                                location.reload();
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
            }).catch((err) => {
                console.log("Error occurred while fetching the grant token: " + err)
            })
        })
    });