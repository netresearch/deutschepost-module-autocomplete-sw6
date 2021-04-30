<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Subscriber;

use PostDirekt\Autocomplete\Service\AuthenticationService;
use PostDirekt\Autocomplete\Service\ModuleConfig;
use Shopware\Core\Framework\Struct\ArrayEntity;
use Shopware\Storefront\Page\Account\Login\AccountLoginPage;
use Shopware\Storefront\Page\Account\Login\AccountLoginPageLoadedEvent;
use Shopware\Storefront\Page\Address\Detail\AddressDetailPage;
use Shopware\Storefront\Page\Address\Detail\AddressDetailPageLoadedEvent;
use Shopware\Storefront\Page\Address\Listing\AddressListingPage;
use Shopware\Storefront\Page\Address\Listing\AddressListingPageLoadedEvent;
use Shopware\Storefront\Page\Checkout\Register\CheckoutRegisterPage;
use Shopware\Storefront\Page\Checkout\Register\CheckoutRegisterPageLoadedEvent;
use Shopware\Storefront\Page\PageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Subscribes AccountLoginPageLoadedEvent,AddressListingPageLoadedEvent, CheckoutRegisterPageLoadedEvent,
 * AddressDetailPageLoadedEvent and provides api token to page objects if autocomplete service is enabled.
 *
 * @author   Andreas Müller <andreas.mueller@netresearch.de>
 *
 * @see     https://www.netresearch.de/
 */
class AddressSubscriber implements EventSubscriberInterface
{
    public const TOKEN_KEY = 'token';
    public const PAGE_EXTENSION_KEY = 'postdirekt_autocomplete';

    /**
     * @var AuthenticationService
     */
    private $authService;

    /**
     * @var ModuleConfig
     */
    private $moduleConfig;

    public function __construct(
        AuthenticationService $authService,
        ModuleConfig $moduleConfig
    ) {
        $this->authService = $authService;
        $this->moduleConfig = $moduleConfig;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            AccountLoginPageLoadedEvent::class => 'onAddressPagesLoaded',
            AddressListingPageLoadedEvent::class => 'onAddressPagesLoaded',
            CheckoutRegisterPageLoadedEvent::class => 'onAddressPagesLoaded',
            AddressDetailPageLoadedEvent::class => 'onAddressPagesLoaded',
        ];
    }

    /**
     * When page is loaded, fetch API token and pass it into the page context for templates to use
     *
     * @param AccountLoginPageLoadedEvent|AddressListingPageLoadedEvent|CheckoutRegisterPageLoadedEvent|AddressDetailPageLoadedEvent|PageLoadedEvent $event
     */
    public function onAddressPagesLoaded(PageLoadedEvent $event): void
    {
        $salesChannelId = $event->getSalesChannelContext()->getSalesChannel()->getId();
        if (!$this->moduleConfig->isActive($salesChannelId)) {
            // Deactivated by configuration
            return;
        }

        try {
            $token = $this->authService->fetchToken($salesChannelId);
        } catch (\RuntimeException $exception) {
            /*
             * Logging is already done in SDK, we will just early return here to avoid rendering of
             * our element in the templates
             */
            return;
        }

        /** @var AccountLoginPage|AddressListingPage|CheckoutRegisterPage|AddressDetailPage $page */
        $page = $event->getPage();
        $page->addExtension(self::PAGE_EXTENSION_KEY, new ArrayEntity([self::TOKEN_KEY => $token]));
    }
}
