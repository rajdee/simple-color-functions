const isHex = require('./isHex');
const isRgb = require('./isRgb');
const hex2rgb = require('./hex2rgb');

function string2rgb(color) {
    const rgb = color.replace(/\s+/g,'').split(',').map(i => parseInt(i, 10));
    return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2]
    };
}

module.exports = function parseColor(color) {
    if (!color) {
        return {
            r: null,
            g: null,
            b: null,
            a: 1
        };
    } else if (isHex(color)) {
        return hex2rgb(color);
    } else if (isRgb(color)) {
        return string2rgb(color);
    }
};
