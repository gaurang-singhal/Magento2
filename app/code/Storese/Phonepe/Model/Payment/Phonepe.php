<?php

namespace Storese\Phonepe\Model\Payment;

//class Phonepe extends \Magento\Payment\Model\Method\AbstractMethod
class Phonepe extends \Magento\Payment\Model\Method\AbstractMethod
{
    const CODE = 'phonepe';
//    protected $_isGateway = true;
//    protected $_canCapture = true;
//    protected $_canAuthorize= true;
    protected $_code = self::CODE;
//    protected $_canCapturePartial = true;
//    protected $_canRefund = true;
//    protected $_canRefundInvoicePartial = true;
//    protected $_stripeApi = false;
//    protected $_countryFactory;
//    protected $_minAmount = null;
//    protected $_maxAmount = null;
//    protected $_supportedCurrencyCodes = ['USD'];
//    protected $_debugReplacePrivateDataKeys
//        = ['number', 'exp_month', 'exp_year', 'cvc'];
//    public function __construct(
//        \Magento\Framework\Model\Context $context,
//        \Magento\Framework\Registry $registry,
//        \Magento\Framework\Api\ExtensionAttributesFactory $extensionFactory,
//        \Magento\Framework\Api\AttributeValueFactory $customAttributeFactory,
//        \Magento\Payment\Helper\Data $paymentData,
//        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
//        \Magento\Payment\Model\Method\Logger $logger,
//        \Magento\Framework\Module\ModuleListInterface $moduleList,
//        \Magento\Framework\Stdlib\DateTime\TimezoneInterface $localeDate,
//        \Magento\Directory\Model\CountryFactory $countryFactory,
//        array $data = []
//    ) {
//        parent::__construct(
//            $context,
//            $registry,
//            $extensionFactory,
//            $customAttributeFactory,
//            $paymentData,
//            $scopeConfig,
//            $logger,
//            $moduleList,
//            $localeDate,
//            null,
//            null,
//            $data
//        );
//        $this->_countryFactory = $countryFactory;
//        $this->_minAmount = $this->getConfigData('min_order_total');
//        $this->_maxAmount = $this->getConfigData('max_order_total');
//    }
//    /**
//     * Authorize payment abstract method
//     *
//     * @param \Magento\Framework\DataObject|InfoInterface $payment
//     * @param float $amount
//     * @return $this
//     * @throws \Magento\Framework\Exception\LocalizedException
//     * @api
//     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
//     */
//    public function authorize(\Magento\Payment\Model\InfoInterface $payment, $amount)
//    {
//        if (!$this->canAuthorize()) {
//            throw new \Magento\Framework\Exception\LocalizedException(__('The authorize action is not available.'));
//        }
//        return $this;

//        try {
//
//            ///build array of payment data for API request.
//            $request = [
//                'cc_type' => $payment->getCcType(),
//                'cc_exp_month' => $payment->getCcExpMonth(),
//                'cc_exp_year' => $payment->getCcExpYear(),
//                'cc_number' => $payment->getCcNumberEnc(),
//                'amount' => $amount
//            ];
//
//            //check if payment has been authorized
//            $response = $this->makeAuthRequest($request);
//        } catch (\Exception $e) {
//            $this->debug($payment->getData(), $e->getMessage());
//        }
//
//        if (isset($response['transactionID'])) {
//            // Successful auth request.
//            // Set the transaction id on the payment so the capture request knows auth has happened.
//            $payment->setTransactionId($response['transactionID']);
//            $payment->setParentTransactionId($response['transactionID']);
//        }
//
//        //processing is not done yet.
//        $payment->setIsTransactionClosed(0);
//
//        return $this;
//    }

    /**
     * Capture payment abstract method
     *
     * @param \Magento\Quote\Api\Data\CartInterface|null $quote
     * @return bool
     * @api
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */

    public function isAvailable(\Magento\Quote\Api\Data\CartInterface $quote = null)
    {
        return true;
    }

//    public function capture(\Magento\Payment\Model\InfoInterface $payment, $amount)
//    {
//        if (!$this->canCapture()) {
//            throw new \Magento\Framework\Exception\LocalizedException(__('The capture action is not available.'));
//        }
//        return $this;

//        try {
//            //check if payment has been authorized
//            if (is_null($payment->getParentTransactionId())) {
//                $this->authorize($payment, $amount);
//            }
//
//            //build array of payment data for API request.
//            $request = [
//                'capture_amount' => $amount,
//                //any other fields, api key, etc.
//            ];
//
//            //make API request to credit card processor.
//            $response = $this->makeCaptureRequest($request);
//
//            //todo handle response
//
//            //transaction is done.
//            $payment->setIsTransactionClosed(1);
//        } catch (\Exception $e) {
//            $this->debug($payment->getData(), $e->getMessage());
//        }

//        return $this;
//    }

//    public function makeCaptureRequest($request)
//    {
//        $response = ['success']; //todo implement API call for capture request.
//
//        if (!$response) {
//            throw new \Magento\Framework\Exception\LocalizedException(__('Failed capture request.'));
//        }
//
//        return $response;
//    }
//
//    public function makeAuthRequest($request)
//    {
//        $response = ['transactionId' => 123]; //todo implement API call for auth request.
//
//        if (!$response) {
//            throw new \Magento\Framework\Exception\LocalizedException(__('Failed auth request.'));
//        }
//
//        return $response;
//    }
//    /**
//     * Refund specified amount for payment
//     *
//     * @param \Magento\Framework\DataObject|InfoInterface $payment
//     * @param float $amount
//     * @return $this
//     * @throws \Magento\Framework\Exception\LocalizedException
//     * @api
//     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
//     */
//    public function refund(\Magento\Payment\Model\InfoInterface $payment, $amount)
//    {
////        if (!$this->canRefund()) {
////            throw new \Magento\Framework\Exception\LocalizedException(__('The refund action is not available.'));
////        }
//        return $this;
//    }

//    public function getConfigPaymentAction()
//    {
//        return self::ACTION_AUTHORIZE_CAPTURE;
//    }
}
