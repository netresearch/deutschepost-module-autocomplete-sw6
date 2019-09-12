# NRPostDirektAutocomplete - Shopware 6 integration for the Deutsche Post Direkt DATAFACTORY Autocomplete 2.0

This extension adds autocompletion functionality for customer addresses in your shops frontend (checkout and customer account) using the Deutsche Post Direkt Autocomplete API.

## Requirements
* Shopware 6
* PHP >= 7.2
* Contract with Deutsche Post Direkt GmbH for using the Autocomplete 2.0 API

## Installation

### With composer

Run the following commands from your shop's root directory:

```shell script
composer require netresearch/postdirekt-autocomplete
bin/command plugin:install --activate NRPostDirektAutocomplete
bin/command cache:clear
```

### With zip or git clone
Either `git clone` or ex the extension sources into your `custom/plugins` folder, then run the following commands from your shop's root directory:

```shell script
git clone git@github.com:netresearch/postdirekt-autocomplete custom/plugins/NRPostDirektAutocomplete
```

Afterwards install the dependencies with 

```shell script
composer require netresearch/postdirekt-autocomplete
bin/command plugin:install --activate NRPostDirektAutocomplete
```

## Configuration

//@TODO describe configuration

## Author

Netresearch DTT GmbH (https://www.netresearch.de)

## License

See LICENSE.md.
