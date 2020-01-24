define(
    [
        'Storese/PhonePeLogin/view/frontend/web/js/view/bundle/phonepe',
        'mage/url',
    ], 
    function($, Component) {
    'use strict';
    return Component.extend({
        defaults: {
            template: 'Storese_Phonepe/login/phonepe'
        },
        context: function () {
            return this;
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
                url: url.build('phonepe/login/phonepelogin'),
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
    
    });
});