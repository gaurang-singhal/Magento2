<?php

namespace Storese\PhonePeLogin\Controller\Login;

class Index extends \Magento\Framework\App\Action\Action
{
    protected $storeManager;
    protected $customerFactory;
    protected $_customerSession;

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Customer\Model\CustomerFactory $customerFactory,
        \Magento\Customer\Model\Session $customerSession
    ) {
        $this->storeManager = $storeManager;
        $this->customerFactory = $customerFactory;
        $this->_customerSession = $customerSession;

        parent::__construct($context);
    }

    public function execute()
    {
        // Get Website ID
        $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/test12.log');
        $logger = new \Zend\Log\Logger();
        $logger->addWriter($writer);

        $websiteId = $this->storeManager->getWebsite()->getWebsiteId();

        // Instantiate object (this is the most important part)
        $customer = $this->customerFactory->create();
        $customer->setWebsiteId($websiteId);
        $login = $this->getRequest()->getParams();
        $mobile_number = $login["mobile"];
        $customer_name = $login["name"];
        $customerCollection = $customer->getCollection()
            ->addAttributeToSelect("*")
            ->addAttributeToFilter("mobile_number", ["eq" => $mobile_number])
            ->load();
        if (sizeof($customerCollection)>0) {
            $logger->info('$customerCollection : ' . json_encode($customerCollection));
            $mail_id = '';
            foreach ($customerCollection as $key=>$customerdata) {
                $logger->info('customerdata : ' . json_encode($customerdata));
                $mail_id = $customerdata['email'];
            }
            $logger->info('mail_id : ' . $mail_id);
            $this->Login($mail_id);
            return true;
        } else {
            $websiteId  = $this->storeManager->getWebsite()->getWebsiteId();

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
            $logger->info('customer : ' . json_encode($customer));
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
