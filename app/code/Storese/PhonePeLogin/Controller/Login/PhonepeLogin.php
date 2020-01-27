<?php

namespace Storese\PhonePeLogin\Controller\Login;

use Magento\Catalog\Model\ProductFactory;
use Magento\Checkout\Model\Cart;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use Storese\Phonepe\Helper\Api as helper;

class PhonepeLogin extends \Magento\Framework\App\Action\Action
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

    /**
     * @inheritDoc
     */
    public function execute()
    {
        $params = $this->getRequest()->getParams();
        return $this->initiateLogin($params);
    }

    public function initiateLogin($request)
    {
        $response = json_decode($this->fetchAuthToken($request));
        if ($response->success == true && $response->code == "SUCCESS") {
            $accessToken = $response->data->accessToken;
            $loginRequest = json_decode($this->getUserDetailsFromPhonePe($request));
            if ($loginRequest->success == true && $loginRequest->code == "SUCCESS") {
                $loginRequest->data->provider = 'PHONEPE';
                return $this->loginPhonepeUser($loginRequest->data, $request->phonePeResp['grantToken']);
            }
        }
        return response()->json($response);
        // return $this->jsonHelper->jsonDecode($apiResponse);
    }

    public function fetchAuthToken($request)
    {
        $grantToken = $request->phonePeResp['grantToken'];
        $brandId = $request->brand;
        $url = 'https://apps.phonepe.com/v3/service/auth/access';
        $fields = [
            "grantToken" => $grantToken
        ];
        $fields_string = base64_encode(json_encode($fields));
        $x_verify = hash('sha256', $fields_string . '/v3/service/auth/access' . '33fba4d9-a996-4aee-b45e-49e2ddfcda61') . '###' . '1';
        $headers = [
            'content-type: application/json',
            'x-client-id: ' . 'PERPULENTEST',
            'x-verify: ' . $x_verify
        ];
        $data = [
            "request" => $fields_string
        ];
        $apiResponse = $this->_helper->callCurlInitPost($url, $headers, $data);
        return $apiResponse;
    }

    public function getUserDetailsFromPhonePe($accessToken)
    {
        $url = 'https://apps.phonepe.com/v3/service/userdetails';
        $x_verify = hash('sha256', '/v3/service/userdetails' . '33fba4d9-a996-4aee-b45e-49e2ddfcda61') . '###' . '1';
        $headers = [
            'content-type:application/json',
            'x-client-id:' . 'PERPULENTEST',
            'x-verify:' . $x_verify,
            'x-access-token:' . $accessToken
        ];
        $apiResponse = $this->_helper->callCurlInitGet($url, $headers);
        return $apiResponse;
    }
}
