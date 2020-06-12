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

    /**
     * @var SystemConfigService
     */
    private $systemConfig;

    public function __construct(SystemConfigService $systemConfig)
    {
        $this->systemConfig = $systemConfig;
    }

    /**
     * Check wether module functionality is activated
     */
    public function isActive(?string $salesChannelId = null): bool
    {
        return (bool) $this->systemConfig->get(self::PREFIX . 'active', $salesChannelId);
    }

    /**
     * Fetch API user
     */
    public function getApiUser(?string $salesChannelId = null): string
    {
        return (string) $this->systemConfig->get(self::PREFIX . 'apiUser', $salesChannelId);
    }

    /**
     * Fetch API password
     */
    public function getApiPassword(?string $salesChannelId = null): string
    {
        return (string) $this->systemConfig->get(self::PREFIX . 'apiPassword', $salesChannelId);
    }
}
