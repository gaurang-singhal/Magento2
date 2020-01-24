<?php

namespace Storese\Phonepe\Controller\Payment;

use Magento\Framework\Controller\ResultFactory;

class Status1 extends \Magento\Framework\App\Action\Action
{

    /**
     * @inheritDoc
     */

    public function execute()
    {
        $params = $this->getRequest()->getParams();
        return $this->checkStatusPhonePe($params);
    }

    public function checkStatusPhonePe($request)
    {
        $merchantId = 'PERPULENTEST';
        $transactionId = $request['transactionID'];
        $order = \App\Order::where('transaction_id', $transactionId)->first();
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
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);
        $var = json_decode($result);
        $response = $this->resultFactory->create(ResultFactory::TYPE_JSON);
        $response->setData($var);
        $response->setHttpResponseCode(200);
        return $response;
    }
}
