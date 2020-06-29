<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Test\Subscriber;

use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use PostDirekt\Autocomplete\Service\ModuleConfig;
use PostDirekt\Sdk\Autocomplete\Authentication\Api\AuthenticationServiceInterface;
use PostDirekt\Sdk\Autocomplete\Authentication\Api\ServiceFactoryInterface;
use PostDirekt\Sdk\Autocomplete\Authentication\Model\Token;
use PostDirekt\Sdk\Autocomplete\Authentication\Service\ServiceFactory;
use Shopware\Core\Framework\Struct\ArrayEntity;
use Shopware\Core\Framework\Test\TestCaseBase\IntegrationTestBehaviour;
use Shopware\Storefront\Page\Account\Login\AccountLoginPageLoader;
use Shopware\Storefront\Test\Page\StorefrontPageTestBehaviour;

/**
 * Class AddressSubscriberTest
 *
 * @author   Andreas Müller <andreas.mueller@netresearch.de>
 * @link     https://www.netresearch.de/
 */
class AddressSubscriberTest extends TestCase
{
    use IntegrationTestBehaviour;
    use StorefrontPageTestBehaviour;

    /**
     * @var MockObject|ModuleConfig
     */
    private $moduleConfig;

    /**
     * @var MockObject|AuthenticationServiceInterface
     */
    private $authService;

    /**
     * @var MockObject|ServiceFactoryInterface
     */
    private $serviceFactory;

    protected function setUp(): void
    {
        $this->moduleConfig = $this->getMockBuilder(ModuleConfig::class)
                                   ->disableOriginalConstructor()
                                   ->onlyMethods(['isActive', 'getApiUser', 'getApiPassword'])
                                   ->getMock();
        $this->serviceFactory = $this->getMockBuilder(ServiceFactoryInterface::class)
                              ->onlyMethods(['createAuthenticationService'])
                              ->getMock();
        $this->authService  = $this->getMockBuilder(AuthenticationServiceInterface::class)
                                             ->onlyMethods(['authenticate'])
                                             ->getMock();
        parent::setUp();
    }


    /**
     * @return AccountLoginPageLoader
     */
    protected function getPageLoader(): AccountLoginPageLoader
    {
        /** @var AccountLoginPageLoader $accountLoginPageLoader */
        $accountLoginPageLoader = $this->getContainer()->get(AccountLoginPageLoader::class);

        return $accountLoginPageLoader;
    }

    public function testLoginPageWithToken(): void
    {

        $accessToken = 'abcdefghijklmnopq';
        $expected = new Token(
            $accessToken,
            123456987987
        );
        $this->moduleConfig->expects($this->once())
            ->method('isActive')
            ->willReturn(true);

        $this->authService->expects($this->once())
                                    ->method('authenticate')
                                    ->willReturn($expected);
        $this->serviceFactory->expects($this->once())
                      ->method('createAuthenticationService')
                      ->willReturn($this->authService);

        $this->getContainer()->set(ServiceFactory::class, $this->serviceFactory);
        $this->getContainer()->set(ModuleConfig::class, $this->moduleConfig);
        $request = new \Symfony\Component\HttpFoundation\Request();
        $context = $this->createSalesChannelContextWithNavigation();
        $page = $this->getPageLoader()->load($request, $context);
        /** @var ArrayEntity $extension */
        $extension = $page->getExtension('postdirekt_autocomplete');
        static::assertEquals($accessToken, $extension->get('token'));
    }
}
