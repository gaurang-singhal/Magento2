<?php

namespace Storese\Phonepe\Controller\Payment;

use Magento\Catalog\Model\ProductFactory;
use Magento\Checkout\Model\Cart;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use Storese\Phonepe\Helper\Api as helper;

class Initiate extends \Magento\Framework\App\Action\Action
{
    protected $resultJsonFactory;
    protected $checkoutSession;
    protected $product;
    protected $_modelCart;
    protected $_helper;
    protected $jsonHelper;
    protected $quote;

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

    /**
     * @inheritDoc
     */
    public function execute()
    {
        return $this->initiatePayment();
    }

    public function initiatePayment()
    {
        $quote = $this->checkoutSession->getQuote();
        $transactionContextArray = json_encode($this->generatePhonePeCart($quote->getId()), JSON_UNESCAPED_SLASHES);
        $req_body = [
            'merchantId' => 'PERPULENTEST',
            "amount" => (int)(round($quote->getGrandTotal(), 2) * 100),
            "validFor" => 600000,
            // "subMerchantId" => Constants::getSubMerchantId($brand),
            "transactionId" => $this->generateTransactionIdForPhonePe('TI', $quote->getId()),
            "merchantOrderId" => $quote->getId(),
            "transactionContext" => base64_encode($transactionContextArray)
        ];
        $url = 'https://apps-uat.phonepe.com/v3/transaction/initiate';
        $tmp_body_field = base64_encode(json_encode($req_body));
        $x_verify = hash('sha256', $tmp_body_field . '/v3/transaction/initiate' . '33fba4d9-a996-4aee-b45e-49e2ddfcda61') . '###' . 1;
        $callback_url = 'https://dashboard.storese.in/api/phonePe-callback';
        $headers = [
            'content-type: application/json',
            'x-client-id: ' . 'PERPULENTEST',
            'x-verify: ' . $x_verify,
            'x-callback-url: ' . $callback_url
        ];
        $data = [
            "request" => $tmp_body_field
        ];
        $apiResponse = $this->_helper->callCurlInitPost($url, $headers, $data);
//        $response = $this->resultFactory->create(ResultFactory::TYPE_JSON);
////        $response->setData($this->jsonHelper->jsonDecode($apiResponse));
////        $response->setHttpResponseCode(200);
////        return $response;
//        return $this->jsonHelper->jsonDecode($apiResponse);
        $result = $this->resultJsonFactory->create();
        $result->setData($this->jsonHelper->jsonDecode($apiResponse));
        return $result;
    }

    public function generatePhonePeCart($orderId)
    {
        $feedback_base_url = 'https://preprod.storese.in/feedback/';
        $value = [
            "orderContext" => [
                "trackingInfo" => [
                    "type" => "HTTPS",
                    // "url" => Constants::$feedback_base_url . Order::where('unique_order_id', $order->unique_order_id)->first()->unique_order_id
                    "url" => $feedback_base_url . $orderId
                ]
            ],
            "fareDetails" => [
                "totalAmount" => (int)(round($this->getQuote()->getGrandTotal(), 2) * 100),
                "payableAmount" => (int)(round($this->getQuote()->getGrandTotal(), 2) * 100)
            ]
//            "cartDetails" => [
//                "cartItems" => $cartItemsList
//            ]

        ];
        return $value;
    }

    public function generateTransactionIdForPhonePe($base, $orderId)
    {
        $hashedOrderId = $orderId;
        return $base . '-' . date('m-d-s-U') . '-' . strtoupper($hashedOrderId);
    }

    protected function getQuote()
    {
        if (!$this->quote) {
            $this->quote = $this->checkoutSession->getQuote();
        }
        return $this->quote;
    }
}
