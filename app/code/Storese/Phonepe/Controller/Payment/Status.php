<?php

namespace Storese\Phonepe\Controller\Payment;

use Magento\Catalog\Model\ProductFactory;
use Magento\Checkout\Model\Cart;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use Psr\Log\LoggerInterface;
use Storese\Phonepe\Helper\Api as helper;
use Storese\Phonepe\Model\Config;

class Status extends \Magento\Framework\App\Action\Action
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
        LoggerInterface $logger,
        Config $config
    )
    {
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

    public function execute()
    {
        $params = $this->getRequest()->getParams();
        return $this->checkStatusPhonePe($params);
    }

    public function checkStatusPhonePe($request)
    {
        $this->logger->debug('inside checkstatus');
        $merchantId = $this->config->getMerchantId();
        $transactionId = $request['transactionID'];
        $salt_key = $this->config->getSaltKey1();
        $salt_index = $this->config->getSaltIndex1();
        $url = $this->config->getApiHost() . '/v3/transaction/' . $merchantId . '/' . $transactionId . '/status';
        $x_verify = hash('sha256', '/v3/transaction/' . $merchantId . '/' . $transactionId . '/status' . $salt_key) . '###' . $salt_index;
        $headers = [
            'x-client-id: ' . $this->config->getXClientId(),
            'x-verify: ' . $x_verify
        ];
        $this->logger->debug('url : ' . $url);
        $this->logger->debug('headers : ' . json_encode($headers));
//        $this->logger->debug('headers : ' . $headers);
        $result = $this->_helper->callCurlInitGet($url, $headers);
        $var = $this->jsonHelper->jsonDecode($result);
        $response = $this->resultJsonFactory->create();
        $response->setData($var);
        $response->setHttpResponseCode(200);
        return $response;
    }
}
