# NRLEJPostDirektAutocomplete - Shopware 6 Integration for Deutsche Post Direkt DATAFACTORY Autocomplete 2.0

This extension adds autocompletion functionality for customer addresses to your shop frontend
(checkout and customer account) using the Deutsche Post Direkt Autocomplete API 2.0.

## Requirements

* Shopware 6.1.0 or newer
* PHP >= 7.2
* Contract with Deutsche Post Direkt GmbH for using the Autocomplete 2.0 API

## Installation

### With Composer (Recommended)

Run the following commands from your shop's root directory:

```shell script
composer require netresearch/postdirekt-autocomplete
(cd vendor/netresearch/postdirekt-autocomplete/src/Resources/app/storefront && npm install)
composer dump
bin/console plugin:refresh
bin/console plugin:install --activate --clearCache NRLEJPostDirektAutocomplete
bin/console bundle:dump
PROJECT_ROOT=/app/  npm --prefix vendor/shopware/platform/src/Storefront/Resources/app/storefront/ run production
bin/console assets:install
bin/console theme:compile
```

### With .zip or `git clone`

Either extract the `NRLEJPostDirektAutocomplete` directory from the `.zip` file into your `custom/plugins` directory
or run the following command from your shop's root directory:

```shell script
git clone git@github.com:netresearch/postdirekt-autocomplete-sw custom/plugins/NRLEJPostDirektAutocomplete
```

Then, install the composer dependencies and activate the plugin:

```shell script
composer require netresearch/postdirekt-autocomplete
(cd vendor/netresearch/postdirekt-autocomplete/src/Resources/app/storefront && npm install)
composer dump
bin/console plugin:refresh
bin/console plugin:install --activate --clearCache NRLEJPostDirektAutocomplete
bin/console bundle:dump
PROJECT_ROOT=/app/  npm --prefix vendor/shopware/platform/src/Storefront/Resources/app/storefront/ run production
bin/console assets:install
bin/console theme:compile
```

## Configuration

* Navigate to `Administration > Settings > System > Plugins`
* Select **'…'** in the "Deutsche Post Direkt Autocomplete" row and select **"Config"**
* Check **"Active"**
* Enter your credentials in the **"API User"** and **"API Password"** fields

## Author

[Netresearch DTT GmbH](https://www.netresearch.de)

## License

See LICENSE.md.
