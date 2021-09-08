<?php declare(strict_types=1);

/**
 * See LICENSE.md for license details.
 */

namespace PostDirekt\Autocomplete\Test\Subscriber;

use Faker\Provider\Uuid;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use PostDirekt\Autocomplete\Service\AuthenticationService;
use PostDirekt\Autocomplete\Service\ModuleConfig;
use PostDirekt\Autocomplete\Subscriber\AddressSubscriber;
use Shopware\Core\Framework\Struct\ArrayEntity;
use Shopware\Core\Framework\Test\TestCaseBase\IntegrationTestBehaviour;
use Shopware\Storefront\Page\Account\Login\AccountLoginPage;
use Shopware\Storefront\Page\Account\Login\AccountLoginPageLoadedEvent;
use Shopware\Storefront\Page\Account\Login\AccountLoginPageLoader;
use Shopware\Storefront\Test\Page\StorefrontPageTestBehaviour;

/**
 * @author   Andreas Müller <andreas.mueller@netresearch.de>
 *
 * @see     https://www.netresearch.de/
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
     * @var MockObject|AuthenticationService
     */
    private $authService;

    protected function setUp(): void
    {
        $this->moduleConfig = $this->getMockBuilder(ModuleConfig::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['isActive', 'getApiUser', 'getApiPassword', 'isHouseNumberHintActive', 'getHouseNumberHint'])
            ->getMock();
        $this->authService = $this->getMockBuilder(AuthenticationService::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['fetchToken'])
            ->getMock();
        parent::setUp();
    }

    public function testLoginPageWithToken(): void
    {
        $accessToken = Uuid::regexify('[A-Za-z0-9]{20}');
        $this->moduleConfig->expects(static::once())
            ->method('isActive')
            ->willReturn(true);

        $this->moduleConfig->expects(static::once())
            ->method('isHouseNumberHintActive')
            ->willReturn(true);

        $this->authService->expects(static::once())
            ->method('fetchToken')
            ->willReturn($accessToken);

        $subject = new AddressSubscriber($this->authService, $this->moduleConfig);
        $page = new AccountLoginPage();
        $context = $this->createSalesChannelContextWithNavigation();
        $event = $this->createMock(AccountLoginPageLoadedEvent::class);
        $event->expects(static::once())->method('getPage')->willReturn($page);
        $event->expects(static::once())->method('getSalesChannelContext')->willReturn($context);
        $subject->onAddressPagesLoaded($event);
        /** @var ArrayEntity|null $extension */
        $extension = $page->getExtension(AddressSubscriber::PAGE_EXTENSION_KEY);
        static::assertNotNull($extension);
        static::assertEquals($accessToken, $extension->get(AddressSubscriber::TOKEN_KEY));
    }

    protected function getPageLoader(): ?object
    {
        /* @var AccountLoginPageLoader $accountLoginPageLoader */
        return $this->getContainer()->get(AccountLoginPageLoader::class);
    }
}
