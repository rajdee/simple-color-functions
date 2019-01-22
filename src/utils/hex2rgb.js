const isHex = require('./isHex');
const convertFromShortNotation = require('./convertFromShortNotation');

module.exports = function hex2rgb(hex) {
    if (!isHex(hex)) {
        return null;
    }

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(convertFromShortNotation(hex));

    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    };
};
