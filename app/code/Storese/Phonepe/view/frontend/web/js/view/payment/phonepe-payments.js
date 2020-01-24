define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (Component,
              rendererList) {
        'use strict';
        rendererList.push(
            {
                type: 'phonepe',
                component: 'Storese_Phonepe/js/view/payment/method-renderer/phonepe-method'
            }
        );
        return Component.extend({});
    }
);