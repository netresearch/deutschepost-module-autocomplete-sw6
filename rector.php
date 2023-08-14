<?php

declare(strict_types=1);

use Frosh\Rector\Set\ShopwareSetList;
use Rector\Config\RectorConfig;

return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->paths([
        __DIR__ . '/src',
    ]);

    $rectorConfig->importNames();

    $rectorConfig->sets([
        \Rector\Set\ValueObject\LevelSetList::UP_TO_PHP_81,
        ShopwareSetList::SHOPWARE_6_5_0,
    ]);
};
