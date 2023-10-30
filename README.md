# NRLEJPostDirektAutocomplete - Shopware 6 Integration for Deutsche Post Direkt DATAFACTORY Autocomplete 2.0

This extension adds autocompletion functionality for customer addresses to your shop frontend
(checkout and customer account) using the Deutsche Post Direkt Autocomplete API 2.0.

## Requirements

* Shopware 6.5.0 or newer
* PHP >= 8.1
* Contract with Deutsche Post Direkt GmbH for using the Autocomplete 2.0 API

## Installation

### From [Community Store](https://store.shopware.com/)

You have bought the plugin in the Shopware community store. You manage your plugins from within your shop.

Please follow the
corresponding [documentation](https://docs.shopware.com/en/shopware-6-en/extensions/myextensions#installing-extensions).

### From [Community Store via Composer](https://store.shopware.com/) (recommended)

You have bought the plugin in the Shopware community store and want to manage your shop's plugins and dependencies with
composer.

Follow the [Shopware Instruction Video](https://www.youtube.com/watch?v=OcaTiOhum2k) to set up your shop for using
composer.

```shell script
composer require store.shopware.com/nrlejpostdirektautocomplete
bin/console plugin:refresh
bin/console plugin:install --activate --clearCache NRLEJPostDirektAutocomplete

```

### From [Packagist](https://packagist.org/)

You are fine with having to install dependencies of the plugin yourself.

Assuming, you are using the [Flex-Template](https://developer.shopware.com/docs/guides/installation/template), run the
following commands from your shop's root directory:

```shell script
composer require netresearch/postdirekt-autocomplete
(cd vendor/netresearch/postdirekt-autocomplete/src/Resources/app/storefront && npm install)
composer dump
bin/console plugin:refresh
bin/console plugin:install --activate --clearCache NRLEJPostDirektAutocomplete
bin/build-js.sh
```

### From [GitHub](https://github.com/netresearch/deutschepost-module-autocomplete-sw6)

You are fine with having to install dependencies of the plugin yourself. You want to extend or adapt the extension to
your own needs.

Run the following command from your shop's root directory:

```shell script
git clone git@github.com:netresearch/deutschepost-module-autocomplete-sw6 custom/plugins/NRLEJPostDirektAutocomplete
```

Then, continue as described in [From Packagist](#from-packagist).

## Configuration

* Navigate to `Administration > Settings > System > Plugins`
* Select **'…'** in the "Deutsche Post Direkt Autocomplete" row and select **"Config"**
* Check **"Active"**
* Enter your credentials in the **"API User"** and **"API Password"** fields
* Check **"Active"** in "House number hint" if the hint should be active
* Navigate to `Administration > Settings > Snippets` to maintain **postdirekt.autocomplete.housenumber_hint** snippets

## Author

[Netresearch DTT GmbH](https://www.netresearch.de)

## License

See LICENSE.md.
