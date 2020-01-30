<?php

namespace Storese\Phonepe\Controller\Order;
use Magento\Framework\Controller\ResultFactory;
use Storese\Phonepe\Helper\Api as helper;

class CancelOrder extends \Magento\Framework\App\Action\Action
{
    protected $_customerSession;
    protected $orderManagement;
    protected $helper;

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Sales\Api\OrderManagementInterface $orderManagement,
        helper $helper
    ) {
        $this->orderManagement = $orderManagement;
        $this->helper = $helper;
        parent::__construct($context);
    }

    public function execute()
    {
        // $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/test12.log');
        // $logger = new \Zend\Log\Logger();
        // $logger->addWriter($writer);

        // $post = $this->getRequest()->getPostValue();
        $params = $this->getRequest()->getParams();
        // print_r($params); die;
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $order = $objectManager->create('Magento\Sales\Model\Order')->load($params['id']);
        if ($this->cancelOrder($order)) {
            $resultRedirect = $this->resultFactory->create(ResultFactory::TYPE_REDIRECT);
            $resultRedirect->setUrl($this->_redirect->getRefererUrl());
            return $resultRedirect;
        }
        return false;
    }

    /**
     * int $orderId
     * Order cancel by order id $orderId
     */
    public function cancelOrder($order) {
        try {
            // Logic to initiate refund from phonePe and proceed to cancel if successful
            //also check if payment method is phpnePe
            if ($order->getPayment()->getMethodInstance()->getTitle() === 'PhonePe') {
                $this->refundPhonepe($order);
            }
            $this->orderManagement->cancel($order->getId());
            return true;
        } catch (\Exception $e) {
            return __('You have not canceled the order.');
        }
    }

    public function refundPhonepe($order)
    {
        $body = array(
            'merchantId'=> 'PERPULENTEST',
            'originalTransactionId' => $order->getQuoteId(),
            'amount' => $order->getGrandTotal(),
            'merchantOrderId' => $order->getId(),
            'message' => 'refund for cancelled order',
            'transactionId' => 'RF' . $order->getQuoteId()
        );
        print_r($body); die;

        $url = 'https://apps-uat.phonepe.com/v3/credit/backToSource';
        $tmp_body_field = base64_encode(json_encode($body));
        $x_verify = hash('sha256', $tmp_body_field . '/v3/credit/backToSource' . '33fba4d9-a996-4aee-b45e-49e2ddfcda61') . '###' . 1;
        $headers = array(
            'content-type: application/json',
            'x-client-id: ' . 'PERPULETEST',
            'x-verify: ' . $x_verify
        );
        $data = array(
            "request" => $tmp_body_field
        );
        $apiresponse = json_decode($this->helper->callCurlInitPost($url, $headers, $data));
        if($apiresponse->{'code'} == 'PAYMENT_SUCCESS') {
            return true;
        }
        return false;
    }
}
