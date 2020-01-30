<?php

namespace Storese\Phonepe\Model;

class Order extends \Magento\Sales\Model\Order
{

    public function cancel()
    {

        // $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/test12.log');
        // $logger = new \Zend\Log\Logger();
        // $logger->addWriter($writer);
        
        // print_r($this->getPayment()->getMethodInstance()->getTitle()); die;
        if ($this->getPayment()->getMethodInstance()->getTitle() === 'PhonePe' && $this->refundPhonepe($this)) {
            $this->getPayment()->cancel();
            $this->registerCancellation();
            $this->_eventManager->dispatch('order_cancel_after', ['order' => $this]);
        } else if ($this->canCancel()) {
            $this->getPayment()->cancel();
            $this->registerCancellation();
            $this->_eventManager->dispatch('order_cancel_after', ['order' => $this]);
        }
        
        // if ($this->canCancel()) {
        //     $this->getPayment()->cancel();
        //     $this->registerCancellation();
        //     $this->_eventManager->dispatch('order_cancel_after', ['order' => $this]);
        // }

        return $this;
    }

    public function refundPhonepe($order)
    {
        $body = array(
            'merchantId'=> 'PERPULENTEST',
            'originalTransactionId' => $order->getQuoteId(),
            'amount' => $order->getGrandTotal(),
            'merchantOrderId' => $order->getOrderId(),
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
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $helper = $objectManager->create('Storese\PhonePeLogin\Helper\Api')->load();
        $apiresponse = json_decode($this->callCurlInitPost($url, $headers, $data));
        if($apiresponse->{'code'} == 'PAYMENT_SUCCESS') {
            return true;
        }
        return false;
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

}