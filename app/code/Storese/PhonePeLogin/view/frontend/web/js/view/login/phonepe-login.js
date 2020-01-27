require(
    [
        'ko',
        'jquery',
        'mage/url',
        'Storese_PhonePeLogin/js/view/bundle/phonepe'
    ],
    function (ko, $, url) {
        'use strict';
        console.log('inside phonepe login')
        window.PhonePe.PhonePe.build(window.PhonePe.Constants.Species.web).then((sdk) => {
            //set a loader in background
            sdk.fetchAuthToken().then((res) => {
                console.log("Grant token data received = " + JSON.stringify(res))
                // this.loginPhonePe(res);
                $.ajax({
                    type: 'POST',
                    url: url.build('phonepeLogin/login/phonepelogin'),
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
            }).catch((err) => {
                console.log("Error occurred while fetching the grant token: " + err)
            })
        })


    });