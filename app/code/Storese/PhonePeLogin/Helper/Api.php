<?php

namespace Storese\PhonepeLogin\Helper;

use Magento\Framework\App\Helper\AbstractHelper;

class Api extends AbstractHelper
{
    protected $curlFactory;
    protected $jsonHelper;

    public function __construct(
        \Magento\Framework\HTTP\Adapter\CurlFactory $curlFactory,
        \Magento\Framework\Json\Helper\Data $jsonHelper,
        \Magento\Framework\App\Helper\Context $context
    ) {
        $this->curlFactory = $curlFactory;
        $this->jsonHelper = $jsonHelper;
        parent::__construct($context);
    }

    public function callCurlInitPost($url, $headers, $requestBody)
    {
        $httpAdapter = $this->curlFactory->create();
        $httpAdapter->write(
            \Zend_Http_Client::POST,
            $url,
            '1.1',
            $headers,
            json_encode($requestBody)
        );
        $result = $httpAdapter->read();
        $body = \Zend_Http_Response::extractBody($result);
        return $body;
    }

    public function callCurlInitGet($url, $headers)
    {
        $httpAdapter = $this->curlFactory->create();
        $httpAdapter->write(
            \Zend_Http_Client::GET,
            $url,
            '1.1',
            $headers
        );
        $result = $httpAdapter->read();
        $body = \Zend_Http_Response::extractBody($result);
        return $body;
    }
}
