# `@architect/repl` [![Travis Build Status](https://travis-ci.com/architect/repl.svg?branch=master)](https://travis-ci.com/architect/repl) [![Appveyor Build Status](https://ci.appveyor.com/api/projects/status/33hnhgxadmfjsrqr/branch/master?svg=true)](https://ci.appveyor.com/project/ArchitectCI/repl/branch/master)

[@architect/repl][npm] is a module that creates a REPL for your Architect
projects.

## Installation

    npm i @architect/repl

# API

## `repl()`

Creates a REPL using the [`repl`][repl] package, and, if the `NODE_ENV`
environment variable is set to `testing`, will create and attach a
[`@architect/sandbox`][sandbox] database for use with the REPL.

Returns the REPL server instance instantiated via [`repl`][repl].

[npm]: https://www.npmjs.com/package/@architect/repl
[sandbox]: https://www.npmjs.com/package/@architect/sandbox
[repl]: https://www.npmjs.com/package/repl
