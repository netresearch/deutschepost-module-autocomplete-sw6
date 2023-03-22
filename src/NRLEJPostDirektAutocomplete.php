<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete;

use Shopware\Core\Framework\Plugin;

class NRLEJPostDirektAutocomplete extends Plugin
{
    public function executeComposerCommands(): bool
    {
        return true;
    }
}
