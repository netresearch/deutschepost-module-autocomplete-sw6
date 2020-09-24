<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete;

use Shopware\Core\Framework\Plugin;

if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    $autoloadPath = __DIR__ . '/../vendor/autoload.php';
}
if (file_exists(__DIR__ . '/../vendor/scoper-autoload.php')) {
    $autoloadPath = __DIR__ . '/../vendor/scoper-autoload.php';
}
if (!defined('__NR_POSTDIREKT_AUTOCOMPLETE_MANAGED_BY_COMPOSER') && isset($autoloadPath)) {
    require_once $autoloadPath;
}

class NRLEJPostDirektAutocomplete extends Plugin
{
}
