#!/usr/bin/env php
<?php declare(strict_types=1);

use PostDirekt\Autocomplete\NRLEJPostDirektAutocomplete;
use Shopware\Core\DevOps\StaticAnalyze\StaticAnalyzeKernel;
use Shopware\Core\Framework\Plugin\KernelPluginLoader\StaticKernelPluginLoader;
use Symfony\Component\Dotenv\Dotenv;

$projectRoot = getenv('SHOPWARE_BUILD_DIR') ?: dirname(__DIR__, 4);
$pluginRootPath = dirname(__DIR__);
$classLoader = require $projectRoot . '/vendor/autoload.php';
if (file_exists($projectRoot . '/.env')) {
    (new Dotenv())->usePutEnv()->load($projectRoot . '/.env');
}

$composerJson = json_decode(
    (string) file_get_contents($pluginRootPath . '/composer.json'),
    true,
    512,
    \JSON_THROW_ON_ERROR
);

$nrlejAutocomplete = [
    'autoload' => $composerJson['autoload'],
    'baseClass' => NRLEJPostDirektAutocomplete::class,
    'managedByComposer' => true,
    'name' => 'NRLEJPostDirektAutocomplete',
    'version' => $composerJson['version'],
    'active' => true,
    'path' => $pluginRootPath,
];
$pluginLoader = new StaticKernelPluginLoader($classLoader, null, [$nrlejAutocomplete]);

$kernel = new StaticAnalyzeKernel('dev', true, $pluginLoader, 'phpstan-test-cache-id');
$kernel->boot();
$projectDir = $kernel->getProjectDir();
$cacheDir = $kernel->getCacheDir();

$phpStanConfigDist = file_get_contents($pluginRootPath . '/phpstan.neon.dist');
if ($phpStanConfigDist === false) {
    throw new RuntimeException('phpstan.neon.dist file not found');
}

// because the cache dir is hashed by Shopware, we need to set the PHPStan config dynamically
$phpStanConfig = str_replace(
    [
        '%ShopwareHashedCacheDir%',
        '%ShopwareRoot%',
        '%ShopwareKernelClass%',
    ],
    [
        $kernel->getCacheDir(),
        $kernel->getProjectDir(),
        str_replace('\\', '_', get_class($kernel)),
    ],
    $phpStanConfigDist
);

file_put_contents(__DIR__ . '/../phpstan.neon', $phpStanConfig);
