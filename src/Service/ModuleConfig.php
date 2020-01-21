<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Service;

use Shopware\Core\System\SystemConfig\SystemConfigService;

/**
 * Class ModuleConfig
 *
 * @author Paul Siedler <paul.siedler@netresearch.de>
 * @link https://www.netresearch.de/
 */
class ModuleConfig
{
    private const PREFIX = 'NRPostDirektAutocomplete.config.';

    /**
     * @var SystemConfigService
     */
    private $systemConfig;

    /**
     * ModuleConfig constructor.
     *
     * @param SystemConfigService $systemConfig
     */
    public function __construct(SystemConfigService $systemConfig)
    {
        $this->systemConfig = $systemConfig;
    }

    /**
     * Check wether module functionality is activated
     *
     * @param string|null $salesChannelId
     * @return bool
     */
    public function isActive(?string $salesChannelId = null): bool
    {
        return (bool) $this->systemConfig->get(self::PREFIX . 'active', $salesChannelId);
    }

    /**
     * Check wether sandbox endpoint is activated
     *
     * @param string|null $salesChannelId
     * @return bool
     */
    public function isSandboxEnabled(?string $salesChannelId = null): bool
    {
        return (bool) $this->systemConfig->get(self::PREFIX . 'sandbox', $salesChannelId);
    }

    /**
     * Check wether logging is enabled
     *
     * @param string|null $salesChannelId
     * @return bool
     */
    public function isLoggingEnabled(?string $salesChannelId = null): bool
    {
        return (bool) $this->systemConfig->get(self::PREFIX . 'logging', $salesChannelId);
    }

    /**
     * Fetch API user
     *
     * @param string|null $salesChannelId
     * @return string
     */
    public function getApiUser(?string $salesChannelId = null): string
    {
        return (string) $this->systemConfig->get(self::PREFIX . 'apiUser', $salesChannelId);
    }

    /**
     * Fetch API password
     *
     * @param string|null $salesChannelId
     * @return string
     */
    public function getApiPassword(?string $salesChannelId = null): string
    {
        return (string) $this->systemConfig->get(self::PREFIX . 'apiPassword', $salesChannelId);
    }
}
