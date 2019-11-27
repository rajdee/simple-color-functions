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
colors('#23bc98').darken(0.5).hex();    // #00a381
```

```javascript
colors('#23bc98').css();  // rgb(35,188,152)
```

```javascript
colors('#23bc98').alpha(.5).css();  // rgba(35,188,152.5)
```

```javascript
colors('#23bc98').brightness('-20%').hex();  // #009675
colors('#23bc98').brightness(-0.2).hex();  // #009675
```

```javascript
colors().contrast('#fff', '#23bc98');  // 2.3348071108457673
colors('#23bc98').luminance();  // 0.39971595089054046
```
