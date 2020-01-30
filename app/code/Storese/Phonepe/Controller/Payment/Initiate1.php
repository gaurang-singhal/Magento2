<?php

namespace Storese\Phonepe\Controller\Payment;

use Magento\Framework\Controller\ResultFactory;
use Storese\Phonepe\Model\Config;

class Initiate1 extends \Magento\Framework\App\Action\Action
{
    /**
     * @var \Magento\Checkout\Model\Session
     */
    protected $checkoutSession;

    protected $catalogSession;

    protected $quote = false;
    protected $config;

    protected $curlFactory;
    protected $jsonHelper;
    protected $logger;

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Checkout\Model\Session $checkoutSession,
        \Magento\Catalog\Model\Session $catalogSession,
        \Magento\Framework\HTTP\Adapter\CurlFactory $curlFactory,
        \Magento\Framework\Json\Helper\Data $jsonHelper,
        \Magento\Payment\Model\Method\Logger $logger,
        Config $config
    )
    {
        parent::__construct($context);
        $this->checkoutSession = $checkoutSession;
        $this->catalogSession = $catalogSession;
        $this->curlFactory = $curlFactory;
        $this->jsonHelper = $jsonHelper;
        $this->config = $config;
        $this->logger = $logger;
    }

    public function execute()
    {
        $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/test12.log');
        $this->logger = new \Zend\Log\Logger();
        $this->logger->addWriter($writer);
//        echo $this->getUserDetailsFromPhonePe('AUTH67e63ef3e878409f96b3d3070da5ae6cb90c07fe2b83f6dc28a34a47e9c62cbd');
        $this->logger->info($this->getUserDetailsFromPhonePe('AUTH24878256a39a2a6b67123027aab2a4a3e49358bac9f1ba9c5eaba2851be959f2'));

//        return $this->initiateTransactionPhonepe();
    }

    public function getUserDetailsFromPhonePe($accessToken)
    {
        $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/test12.log');
        $this->logger = new \Zend\Log\Logger();
        $this->logger->addWriter($writer);

        $url = 'https://apps-uat.phonepe.com/v3/service/userdetails';
        $salt_key = $this->config->getSaltKey1();
        $salt_index = $this->config->getSaltIndex1();
        $x_verify = hash('sha256', '/v3/service/userdetails' . '33fba4d9-a996-4aee-b45e-49e2ddfcda61') . '###1';
        $headers = [
            'content-type:application/json',
            'x-client-id:' . 'PERPULETEST',
            'x-verify:' . $x_verify,
            'x-access-token:' . $accessToken
        ];

        $response = $this->callCurlInitGet($url, $headers);
        $this->logger->info('url : ' . json_encode($url));
        $this->logger->info('headers : ' . json_encode($headers));
        $this->logger->info('$response : ' . json_encode($response));
//        print_r($url . '\r\n');
//        echo 'headers : ' . json_encode($headers) . '\r\n';
        echo json_encode($response);
        return ($response);
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

    public function initiateTransactionPhonepe()
    {
//        $brand = Brand::where('id', $request->brand)->get('name')[0]->name;

//        $newOrder = $this->generateOrderForPhonePe($request);
//        if (!isset($newOrder->total))
//            return;
        $transactionContextArray = json_encode($this->generatePhonePeCart($this->getQuote()->getId()), JSON_UNESCAPED_SLASHES);
        $req_body = [
//            'merchantId' => Constants::getPhonepeMerchantId(),
            'merchantId' => 'PERPULENTEST',
            "amount" => (int)(round($this->getQuote()->getGrandTotal(), 2) * 100),
            "validFor" => 600000,
//            "subMerchantId" => Constants::getSubMerchantId($brand),
            "transactionId" => $this->generateTransactionIdForPhonePe('TI', $this->getQuote()->getId()),
            "merchantOrderId" => $this->getQuote()->getId(),
            "transactionContext" => base64_encode($transactionContextArray)
        ];
//        if(Constants::getEnv()=='prod'){
//            $req_body['subMerchantId'] = Constants::getSubMerchantId($brand);
//        }
//        $req_body = $request->json()->all();
//        echo json_encode(base64_encode(json_encode($req_body)));
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
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);
        $var = json_decode($result);
        if ($var->{'code'} == 'SUCCESS' && $var->{'success'} == true) {
            $var->{'data'}->{'transactionId'} = $this->generateTransactionIdForPhonePe('TI', $this->getQuote()->getId());
        }
//        Mage::log($var);
//        $this->logger->info('var : ' . json_encode($var));
//        $result = json_encode($var);
//        print $result;
//        return response()->json($var);
//        exit;
//        $resp = json_encode($var);
//        $this->logger->info($result);
//        $this->logger->info($var);
//        $this->logger->info($resp);
        $response = $this->resultFactory->create(ResultFactory::TYPE_JSON);
        $response->setData($var);
        $response->setHttpResponseCode(200);
        return $response;
    }

    public function generateTransactionIdForPhonePe($base, $orderId)
    {
        $hashedOrderId = $orderId;
        return $base . '-' . date('m-d-s-U') . '-' . strtoupper($hashedOrderId);
    }

    public function generatePhonePeCart($orderId)
    {
        $cartItemsList = [];
//        foreach ($request['cartProducts'] as $item) {
//            $cartItems = array();
//            $cartItems["category"] = "SHOPPING";
//            $cartItems["itemId"] = $item['id'];
//            $cartItems["price"] = (float)($item['price']);
//            $cartItems["itemName"] = $item['name'];
//            $cartItems["quantity"] = $item['quantity'];
//            $cartItems["address"] = array("addressString" => $request['user']['data']['default_address']['address']);
//            $cartItems["shippingInfo"] = array("deliveryType" => "STANDARD", "time" => ["timestamp" => now()->timestamp, "zoneOffSet" => "+05:30"]);
//            array_push($cartItemsList, $cartItems);
//        }
        $cartItems = [];
        $cartItems["category"] = "SHOPPING";
//        $cartItems["itemId"] = 'NA';
//        $cartItems["price"] = 0;
//        $cartItems["itemName"] = 'NA';
//        $cartItems["quantity"] = 0;
//        $cartItems["address"] = array("addressString" => "NA");
        $cartItems["shippingInfo"] = ["deliveryType" => "STANDARD", "time" => ["timestamp" => 1561540218, "zoneOffSet" => "+05:30"]];
        array_push($cartItemsList, $cartItems);
//        $brand = Brand::where('id', $request->brand)->get('name')[0]->name;
//        $feedback_base_url = Constants::getFeedbackBaseUrl($brand);
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

    protected function getQuote()
    {
        if (!$this->quote) {
            $this->quote = $this->checkoutSession->getQuote();
        }
        return $this->quote;
    }
}
