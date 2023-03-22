<?php declare(strict_types=1);

$testBootstrapper = null;
if (is_readable('/opt/share/shopware/tests/TestBootstrapper.php')) {
    // For Docker image: ghcr.io/friendsofshopware/platform-plugin-dev
    $testBootstrapper = require '/opt/share/shopware/tests/TestBootstrapper.php';
} else {
    // Create your own TestBootstrapper
    $testBootstrapper = require __DIR__ . '/../../../../vendor/shopware/core/TestBootstrap.php';
}

return $testBootstrapper
    ->setLoadEnvFile(true)
    ->setForceInstallPlugins(true)
    ->addActivePlugins('NRLEJPostDirektAutocomplete')
    ->bootstrap()
    ->getClassLoader();
