#!/usr/bin/env bash

composer dump-autoload
php "`dirname \"$0\"`"/phpstan-config-generator.php
php "`dirname \"$0\"`"/../vendor/bin/phpstan analyze --configuration phpstan.neon --autoload-file=../../../vendor/autoload.php src test
php "`dirname \"$0\"`"/../vendor/bin/psalm.phar --config=psalm.xml --show-info=false --threads=4
