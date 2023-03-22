<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Service;

use Shopware\Core\System\SystemConfig\SystemConfigService;

class ModuleConfig
{
    private const PREFIX = 'NRLEJPostDirektAutocomplete.config.';

    public function __construct(private readonly SystemConfigService $systemConfig)
    {
    }

    /**
     * Check if module functionality is activated
     */
    public function isActive(?string $salesChannelId = null): bool
    {
        return $this->systemConfig->getBool(self::PREFIX . 'active', $salesChannelId);
    }

    /**
     * Fetch API user
     */
    public function getApiUser(?string $salesChannelId = null): string
    {
        return $this->systemConfig->getString(self::PREFIX . 'apiUser', $salesChannelId);
    }

    /**
     * Fetch API password
     */
    public function getApiPassword(?string $salesChannelId = null): string
    {
        return $this->systemConfig->getString(self::PREFIX . 'apiPassword', $salesChannelId);
    }

    /**
     * Check house number hint is activated
     */
    public function isHouseNumberHintActive(?string $salesChannelId = null): bool
    {
        return $this->systemConfig->getBool(self::PREFIX . 'activeHousenumberHint', $salesChannelId);
    }
}
