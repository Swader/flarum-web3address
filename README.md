# Add Web3 Address

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/swader/web3address.svg)](https://packagist.org/packages/swader/web3address)

A [Flarum](http://flarum.org) extension which lets a user add a Web3 address into their user profile. A Web3 address is a cryptographic keypair usable on any [Substrate-based](https://dotleap.com/an-explanation-of-substrate-for-humans/) chain like [Polkadot](https://dotleap.com/an-explanation-of-polkadot-for-humans/), [Kusama](https://youtu.be/Kke1FmIAYfo), UBIKchain, Edgeware, Moonbeam, and others. The [Polkadot JS extension](https://github.com/polkadot-js/extension) is required. Alternatively, an admin has permission to manually input the address for a user.

### Installation

With Composer:

```sh
composer require swader/web3address
```

### Caveat

The extension relies on some JS-only crypto functions for server-side verification. This means the server running Flarum should ideally have nodejs and yarn installed, and you should run `yarn install` in the `js` folder of the extension. [@todo - fix this requirement (see issue #1)](https://github.com/Swader/flarum-web3address/issues/1).

### Links

- [Packagist](https://packagist.org/packages/swader/web3address)
