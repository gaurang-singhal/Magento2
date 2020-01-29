<?php

namespace Storese\Phonepe\Controller\Payment;

use Magento\Catalog\Model\ProductFactory;
use Magento\Checkout\Model\Cart;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use Storese\Phonepe\Helper\Api as helper;
use Storese\Phonepe\Model\Config;

class Initiate extends \Magento\Framework\App\Action\Action
{
    protected $resultJsonFactory;
    protected $checkoutSession;
    protected $product;
    protected $_modelCart;
    protected $_helper;
    protected $jsonHelper;
    protected $logger;
    protected $config;

    public function __construct(
        Context $context,
        \Magento\Framework\Json\Helper\Data $jsonHelper,
        JsonFactory $resultJsonFactory,
        CheckoutSession $checkoutSession,
        ProductFactory $product,
        Cart $modelCart,
        helper $helper,
        \Magento\Payment\Model\Method\Logger $logger,
        Config $config
    ) {
        $this->resultJsonFactory = $resultJsonFactory;
        $this->checkoutSession = $checkoutSession;
        $this->product = $product;
        $this->_modelCart = $modelCart;
        $this->_helper = $helper;
        $this->jsonHelper = $jsonHelper;
        $this->logger = $logger;
        $this->config = $config;

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
        $tId = $this->generateTransactionIdForPhonePe('TI', $quote->getId());
        $req_body = [
//            'merchantId' => 'PERPULENTEST',
            'merchantId' => $this->config->getMerchantId(),
            "amount" => (int)(round($quote->getGrandTotal(), 2) * 100),
            "validFor" => 600000,
            // "subMerchantId" => Constants::getSubMerchantId($brand),
            "transactionId" => $tId,
            "merchantOrderId" => $quote->getId(),
            "transactionContext" => base64_encode($transactionContextArray)
        ];
//        if(Constants::getEnv()=='prod'){
//            $req_body['subMerchantId'] = Constants::getSubMerchantId($brand);
//        }
        $url = $this->config->getApiHost() . '/v3/transaction/initiate';
        $salt_key = $this->config->getSaltKey1();
        $salt_index = $this->config->getSaltIndex1();
        $tmp_body_field = base64_encode(json_encode($req_body));
        $x_verify = hash('sha256', $tmp_body_field . '/v3/transaction/initiate' . $salt_key) . '###' . $salt_index;
        $callback_url = 'https://dashboard.storese.in/api/phonePe-callback';
        $headers = [
            'content-type: application/json',
            'x-client-id: ' . $this->config->getXClientId(),
            'x-verify: ' . $x_verify,
            'x-callback-url: ' . $callback_url
        ];
        $data = [
            "request" => $tmp_body_field
        ];
        $apiResponse = $this->_helper->callCurlInitPost($url, $headers, $data);
        $var = $this->jsonHelper->jsonDecode($apiResponse);
        if ($var['code'] == 'SUCCESS' && $var['success'] == true) {
            $var['data']['transactionId'] = $tId;
        }
//        $response = $this->resultFactory->create(ResultFactory::TYPE_JSON);
        ////        $response->setData($this->jsonHelper->jsonDecode($apiResponse));
        ////        $response->setHttpResponseCode(200);
        ////        return $response;
//        return $this->jsonHelper->jsonDecode($apiResponse);
        $result = $this->resultJsonFactory->create();
        $result->setData($var);
//        $result->setData($this->jsonHelper->jsonDecode($apiResponse));
        return $result;
    }

    public function generatePhonePeCart($orderId)
    {
        $feedback_base_url = $this->config->getFeedBaseUrl();
        return [
            "orderContext" => [
                "trackingInfo" => [
                    "type" => "HTTPS",
                    "url" => $feedback_base_url . $orderId
                ]
            ],
            "fareDetails" => [
                "totalAmount" => (int)(round($this->getQuote()->getGrandTotal(), 2) * 100),
                "payableAmount" => (int)(round($this->getQuote()->getGrandTotal(), 2) * 100)
            ]
        ];
    }

    public function generateTransactionIdForPhonePe($base, $orderId)
    {
        $hashedOrderId = $orderId;
        return $base . '-' . date('m-d-s-U') . '-' . strtoupper($hashedOrderId);
    }

    protected function getQuote()
    {
        return $this->checkoutSession->getQuote();
    }
}
