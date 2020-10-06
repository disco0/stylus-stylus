# Stylus Stylus Plugin

## Setup

1. Make me finish this

## Commands

### build

Builds your module for distribution in multiple formats (ESM, CommonJS, and UMD).

```sh
$ npm run build
```

### test

Runs your test suite(s) (`/tests/**`) against your source code (`/src/**`).<br>Doing so allows for accurate code coverage.

> **Note:** Coverage is only collected and reported through the "CI" Github Action (`.github/workflows/ci.yml`).

```sh
$ npm test
```

## Publishing

> **Important:** Please finish [Setup](#setup) before continuing!

Once all `TODO` notes have been updated & your new module is ready to be shared, all that's left to do is decide its new version &mdash; AKA, do the changes consitute a `patch`, `minor`, or `major` release?

Once decided, you can run the following:

```sh
$ npm version <patch|minor|major> && git push origin master --tags && npm publish
# Example:
# npm version patch && git push origin master --tags && npm publish
```

This command sequence will:
* version your module, updating the `package.json` "version"
* create and push a `git` tag (matching the new version) to your repository
* build your module (via the `prepublishOnly` script)
* publish the module to the npm registry

## License

MIT © [Luke Edwards](https://lukeed.com)
