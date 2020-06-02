<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete;

use Shopware\Core\Framework\Plugin;

$autoloadPath = __DIR__ . '/../vendor/autoload.php';
if (!defined('__NR_POSTDIREKT_MANAGED_BY_COMPOSER') && file_exists($autoloadPath)) {
    require_once $autoloadPath;
}

class NRPostDirektAutocomplete extends Plugin
{
}
