# NRPostDirektAutocomplete - Shopware 6 integration for Deutsche Post Direkt DATAFACTORY Autocomplete 2.0

This extension adds autocompletion functionality for customer addresses to your shop frontend
(checkout and customer account) using the Deutsche Post Direkt Autocomplete API 2.0.

## Requirements

* Shopware 6
* PHP >= 7.2
* Contract with Deutsche Post Direkt GmbH for using the Autocomplete 2.0 API

## Installation

### With composer (recommended)

Run the following commands from your shop's root directory:

```shell script
composer require netresearch/postdirekt-autocomplete
bin/console plugin:install -r --activate --clearCache NRPostDirektAutocomplete
```

### With zip or git clone

Either extract the `NRPostDirektAutocomplete` directory from the `.zip` file into your `custom/plugins` directory
or run the following command from your shop's root directory:

```shell script
git clone git@github.com:netresearch/postdirekt-autocomplete-sw custom/plugins/NRPostDirektAutocomplete
```

Then, install the composer dependencies and activate the plugin:

```shell script
composer require netresearch/postdirekt-autocomplete
composer dump
bin/console plugin:install -r --activate --clearCache NRPostDirektAutocomplete
```

## Configuration

//@TODO describe configuration

## Author

Netresearch DTT GmbH (https://www.netresearch.de)

## License

See LICENSE.md.
