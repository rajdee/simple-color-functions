const rgb2lab = require('./rgb2lab');
const lab2rgb = require('./lab2rgb');
const convertPercentage = require('./convertPercentage');
const limit = require('./limit');

module.exports = function brightness(rgb, amount) {
    const { l, a, b } = rgb2lab(rgb);

    const modifiedL = limit(
        l * (1 + convertPercentage(amount)),
        0,
        100
    );
    return lab2rgb({
        l: modifiedL,
        a,
        b
    });
};
