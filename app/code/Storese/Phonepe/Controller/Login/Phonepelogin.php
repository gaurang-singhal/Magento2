<?php

namespace Storese\Phonepe\Controller\Login;

use Magento\Catalog\Model\ProductFactory;
use Magento\Checkout\Model\Cart;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use Storese\Phonepe\Helper\Api as helper;
use Storese\Phonepe\Model\Config;

class Phonepelogin extends \Magento\Framework\App\Action\Action
{
    protected $resultJsonFactory;
    protected $checkoutSession;
    protected $product;
    protected $_modelCart;
    protected $_helper;
    protected $jsonHelper;
    protected $logger;
    protected $storeManager;
    protected $customerFactory;
    protected $_customerSession;
    protected $config;

    public function __construct(
        Context $context,
        \Magento\Framework\Json\Helper\Data $jsonHelper,
        JsonFactory $resultJsonFactory,
        CheckoutSession $checkoutSession,
        ProductFactory $product,
        Cart $modelCart,
        helper $helper,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Customer\Model\CustomerFactory $customerFactory,
        \Magento\Customer\Model\Session $customerSession,
        Config $config
    ) {
        $this->resultJsonFactory = $resultJsonFactory;
        $this->checkoutSession = $checkoutSession;
        $this->product = $product;
        $this->_modelCart = $modelCart;
        $this->_helper = $helper;
        $this->jsonHelper = $jsonHelper;
        $this->storeManager = $storeManager;
        $this->customerFactory = $customerFactory;
        $this->_customerSession = $customerSession;
        $this->config = $config;

        return parent::__construct($context);
    }

    /**
     * @inheritDoc
     */
    public function execute()
    {
        $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/test12.log');
        $this->logger = new \Zend\Log\Logger();
        $this->logger->addWriter($writer);

        $params = $this->getRequest()->getParams();
        $this->logger->info('params : ' . json_encode($params));

        return $this->initiateLogin($params);
    }

    public function initiateLogin($request)
    {
        $response = $this->resultJsonFactory->create();
        $response->setData(false);
        $response->setHttpResponseCode(400);
        $authresponse = $this->jsonHelper->jsonDecode($this->fetchAuthToken($request));
        $this->logger->info('$authresponse : ' . json_encode($authresponse));
        if ($authresponse['success'] == true && $authresponse['code'] == "SUCCESS") {
            $accessToken = $authresponse['data']['accessToken'];
            $loginRequest = $this->jsonHelper->jsonDecode($this->getUserDetailsFromPhonePe($accessToken));
            $this->logger->info('$loginRequest : ' . json_encode($loginRequest));
            if ($loginRequest['success'] == true && $loginRequest['code'] == "SUCCESS") {
                $loginRequest['data']['provider'] = 'PHONEPE';
                if ($this->loginPhonepeUser($loginRequest['data'])) {
                    $response->setData(true);
                    $response->setHttpResponseCode(200);
                }
            }
        }
        $this->logger->info('$response : ' . json_encode($response));
        return $response;
    }

    public function fetchAuthToken($request)
    {
        $grantToken = $request['phonePeResp'];
        $this->logger->info('$grantToken : ' . $grantToken);
        $url = $this->config->getApiHost() . '/v3/service/auth/access';
        $fields = [
            "grantToken" => $grantToken
        ];
        $salt_key = $this->config->getSaltKey1();
        $salt_index = $this->config->getSaltIndex1();
        $fields_string = base64_encode(json_encode($fields));
        $x_verify = hash('sha256', $fields_string . '/v3/service/auth/access' . $salt_key) . '###' . $salt_index;
        $headers = [
            'content-type: application/json',
            'x-client-id: ' . $this->config->getXClientId(),
            'x-verify: ' . $x_verify
        ];
        $data = [
            "request" => $fields_string
        ];
        $this->logger->info('$data : ' . json_encode($data));
        $this->logger->info('$headers : ' . json_encode($headers));
        return $this->_helper->callCurlInitPost($url, $headers, $data);
    }

    public function getUserDetailsFromPhonePe($accessToken)
    {
        $url = $this->config->getApiHost() . '/v3/service/userdetails';
        $salt_key = $this->config->getSaltKey1();
        $salt_index = $this->config->getSaltIndex1();
        $x_verify = hash('sha256', '/v3/service/userdetails' . $salt_key) . '###' . $salt_index;
        $headers = [
            'content-type:application/json',
            'x-client-id:' . $this->config->getXClientId(),
            'x-verify:' . $x_verify,
            'x-access-token:' . $accessToken
        ];
        return $this->_helper->callCurlInitGet($url, $headers);
    }

    public function loginPhonepeUser($data)
    {
        $websiteId = $this->storeManager->getWebsite()->getWebsiteId();

        // Instantiate object (this is the most important part)
        $customer = $this->customerFactory->create();
        $customer->setWebsiteId($websiteId);
//        $login = $this->getRequest()->getParams();
        $mobile_number = $data["phoneNumber"];
        $customer_name = $data["name"];
        $customerCollection = $customer->getCollection()
            ->addAttributeToSelect("*")
            ->addAttributeToFilter("mobile_number", ["eq" => $mobile_number])
            ->load();
        if (sizeof($customerCollection) > 0) {
            $this->logger->info('$customerCollection : ' . json_encode($customerCollection));
            $mail_id = '';
            foreach ($customerCollection as $key => $customerdata) {
                $this->logger->info('customerdata : ' . json_encode($customerdata));
                $mail_id = $customerdata['email'];
            }
            $this->logger->info('mail_id : ' . $mail_id);
            $this->Login($mail_id);
            return true;
        } else {
            $websiteId = $this->storeManager->getWebsite()->getWebsiteId();

            $firstName = $customer_name;
            $lastName = $customer_name;

            $customer = $this->customerFactory->create();
            $customer->setWebsiteId($websiteId);

            $customer->setEmail($mobile_number . "@perpuledata.com");
            $customer->setFirstname($firstName);
            $customer->setLastname($lastName);
            $customer->setMobileNumber($mobile_number);
            $customer->setPassword($mobile_number . "password");
            $customer->setForceConfirmed(true);
            $customer->save();
            $this->logger->info('customer : ' . json_encode($customer));
            $this->Login($mobile_number . "@perpuledata.com");
            return true;
        }
    }

    public function Login($mail_id)
    {
        $customer = $this->customerFactory->create();
        $websiteId = $this->storeManager->getWebsite()->getWebsiteId();
        $customer->setWebsiteId($websiteId);
        $customer->loadByEmail($mail_id);
        $this->_customerSession->setCustomerAsLoggedIn($customer);
        return true;
    }
}
