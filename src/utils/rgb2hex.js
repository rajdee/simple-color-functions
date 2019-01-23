module.exports = function rgb2hex(rgb) {
    return Object.keys(rgb).reduce((acc, key) => {
        const hex = rgb[key].toString(16);
        acc += hex.length > 1 ? hex : `0${hex}`;
        return acc;
    }, '#');
};
