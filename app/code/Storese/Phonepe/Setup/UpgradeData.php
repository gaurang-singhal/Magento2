<?php
namespace Storese\Phonepe\Setup;

    use Magento\Customer\Model\Customer;
    use Magento\Customer\Setup\CustomerSetupFactory;
    use Magento\Eav\Model\Entity\Attribute\Set as AttributeSet;
    use Magento\Eav\Model\Entity\Attribute\SetFactory as AttributeSetFactory;
    use Magento\Framework\Setup\ModuleContextInterface;
    use Magento\Framework\Setup\ModuleDataSetupInterface;
    use Magento\Framework\Setup\UpgradeDataInterface;

    class UpgradeData implements UpgradeDataInterface
    {
        protected $customerSetupFactory;
        private $attributeSetFactory;

        public function __construct(
            CustomerSetupFactory $customerSetupFactory,
            AttributeSetFactory $attributeSetFactory
        ) {
            $this->customerSetupFactory = $customerSetupFactory;
            $this->attributeSetFactory = $attributeSetFactory;
        }
        public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
        {
            if (version_compare($context->getVersion(), '0.0.2', '<')) {
                $customerSetup = $this->customerSetupFactory->create(['setup' => $setup]);

                $customerEntity = $customerSetup->getEavConfig()->getEntityType('customer');
                $attributeSetId = $customerEntity->getDefaultAttributeSetId();

                /** @var $attributeSet AttributeSet */
                $attributeSet = $this->attributeSetFactory->create();
                $attributeGroupId = $attributeSet->getDefaultGroupId($attributeSetId);
                /**
                 * customer registration form default field mobile number
                 */
                $customerSetup->addAttribute(Customer::ENTITY, 'mobile_number', [
                  'type' => 'varchar',
                  'label' => 'Mobile Number',
                  'input' => 'text',
                  'required' => true,
                  'visible' => true,
                  'user_defined' => true,
                  'sort_order' => 1000,
                  'position' => 1000,
                  'system' => 0,
                  ]);
                //add attribute to attribute set
                $attribute = $customerSetup->getEavConfig()->getAttribute(Customer::ENTITY, 'mobile_number')
                  ->addData([
                      'attribute_set_id' => $attributeSetId,
                      'attribute_group_id' => $attributeGroupId,
                      'used_in_forms' => ['adminhtml_customer', 'customer_account_create'],
                  ]);

                $attribute->save();
            }
        }
    }
