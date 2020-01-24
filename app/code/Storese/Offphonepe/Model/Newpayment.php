<?php


namespace Storese\Offphonepe\Model;


class Newpayment extends \Magento\Payment\Model\Method\AbstractMethod
{

    /**
     * Payment code
     *
     * @var string
     */
    protected $_code = 'newpayment';

    /**
     * Availability option
     *
     * @var bool
     */
    protected $_isOffline = true;
}