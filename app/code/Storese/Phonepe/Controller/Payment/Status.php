<?php

namespace Storese\Phonepe\Controller\Payment;

use Magento\Catalog\Model\ProductFactory;
use Magento\Checkout\Model\Cart;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use Storese\Phonepe\Helper\Api as helper;

class Status extends \Magento\Framework\App\Action\Action
{
    protected $resultJsonFactory;
    protected $checkoutSession;
    protected $product;
    protected $_modelCart;
    protected $_helper;
    protected $jsonHelper;

    public function __construct(
        Context $context,
        \Magento\Framework\Json\Helper\Data $jsonHelper,
        JsonFactory $resultJsonFactory,
        CheckoutSession $checkoutSession,
        ProductFactory $product,
        Cart $modelCart,
        helper $helper
    ) {
        $this->resultJsonFactory = $resultJsonFactory;
        $this->checkoutSession = $checkoutSession;
        $this->product = $product;
        $this->_modelCart = $modelCart;
        $this->_helper = $helper;
        $this->jsonHelper = $jsonHelper;

        return parent::__construct($context);
    }

    public function execute()
    {
        $params = $this->getRequest()->getParams();
        return $this->checkStatusPhonePe($params);
    }
    public function checkStatusPhonePe($request)
    {
        $merchantId = 'PERPULENTEST';
        $transactionId = $request['transactionID'];
//        $order = \App\Order::where('transaction_id', $transactionId)->first();
        //        if ($order && $order->payment_code !== 'PAYMENT_PENDING') {
        //            return response()->json([
        //                'code' => $order->payment_code
        //            ]);
        //        }
        //        $transactionId = $order->transaction_id;
        $url = 'https://apps-uat.phonepe.com/v3/transaction/' . $merchantId . '/' . $transactionId . '/status';
        //        print $url;
        $x_verify = hash('sha256', '/v3/transaction/' . $merchantId . '/' . $transactionId . '/status') . '33fba4d9-a996-4aee-b45e-49e2ddfcda61' . '###1';
        $headers = [
            'x-client-id: ' . 'PERPULENTEST',
            'x-verify: ' . $x_verify
        ];

        $result = $this->_helper->callCurlInitGet($url, $headers);
        $var = $this->jsonHelper->jsonDecode($result);
        $response = $this->resultJsonFactory->create();
        $response->setData($var);
        $response->setHttpResponseCode(200);
        return $response;
    }
}
