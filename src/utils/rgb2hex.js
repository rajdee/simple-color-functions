module.exports = function rgb2hex(rgb) {
    return Object.keys(rgb).reduce((acc, key) => {
        acc += rgb[key].toString(16);
        return acc;
    }, '#');
};
