<?php

namespace Storese\Phonepe\Model;

use Magento\Framework\App\Config\ScopeConfigInterface;

class Config
{
//    protected $websiteId = null;
    protected $methodCode = 'phonepe';
    protected $scopeConfig;
    protected $storeManager;

    public function __construct(\Magento\Store\Model\StoreManagerInterface $storeManager, ScopeConfigInterface $scopeConfig)
    {
        $this->storeManager = $storeManager;
        $this->scopeConfig = $scopeConfig;
    }

    public function isProd()
    {
        return (bool) (int) $this->getConfigData('prod');
    }

    public function getXClientId()
    {
        return $this->getConfigData('xClientId', $this->getWebId());
    }

    public function getSaltIndex1()
    {
        return $this->getConfigData('saltIndex1', $this->getWebId());
    }

    public function getSaltKey1()
    {
        return $this->getConfigData('saltKey1', $this->getWebId());
    }

    public function getSaltIndex2()
    {
        return $this->getConfigData('saltIndex2', $this->getWebId());
    }

    public function getSaltKey2()
    {
        return $this->getConfigData('saltKey2', $this->getWebId());
    }

    public function getMerchantId()
    {
        return $this->getConfigData('merchantId', $this->getWebId());
    }

    public function getSubMerchantId()
    {
        return $this->getConfigData('submerchantId', $this->getWebId());
    }

    public function getFeedBaseUrl()
    {
        return $this->getConfigData('feedbackBaseUrl', $this->getWebId());
    }

    public function getApiHost()
    {
        return $this->getConfigData('apiHost');
    }

    public function getConfigData($field, $websiteId = null)
    {
        $code = $this->methodCode;
        $path = 'payment/' . $code . '/' . $field;
        return $this->scopeConfig->getValue($path, \Magento\Store\Model\ScopeInterface::SCOPE_WEBSITE, $websiteId);
    }

    protected function getWebId()
    {
        return $this->storeManager->getStore()->getWebsiteId();
    }
}
