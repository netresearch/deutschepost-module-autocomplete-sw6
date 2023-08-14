#!/usr/bin/env bash
set -x
if [ -z "$SHOPWARE_BUILD_DIR" ]; then
  SHOPWARE_ROOT_DIR="$(dirname \"$0\")"/../../..
else
  SHOPWARE_ROOT_DIR="$SHOPWARE_BUILD_DIR"
fi
CWD="$(dirname -- "$(readlink -f -- "$0")")"
plugin_directory=$CWD/..
composer dump-autoload
$CWD/phpstan-config-generator.php
php $SHOPWARE_ROOT_DIR/vendor/bin/phpstan analyze --configuration $plugin_directory/phpstan.neon --autoload-file=$SHOPWARE_ROOT_DIR/vendor/autoload.php
