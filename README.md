# Simple color functions [![Build Status][ci-img]][ci]

[ci-img]: https://travis-ci.org/rajdee/simple-color-functions.svg
[ci]:      https://travis-ci.org/rajdee/simple-color-functions

Javascript library with a set of functions of manipulation and color conversion.

## Installation

```sh
npm install simple-color-functions --save-dev
```
or
```sh
yarn add -D simple-color-functions
```

## Usage

Several examples of color manipulation

```javascript
colors('#23bc98').brighten(1.2).hex();  // #71fad3
```

```javascript
colors('#23bc98').css();  // rgb(35,188,152)
```

```javascript
colors('#23bc98').alpha(.5).css();  // rgba(35,188,152.5)
```

