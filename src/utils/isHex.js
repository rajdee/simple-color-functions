module.exports = function isHex(color) {
    return color[0] === '#' && color.length === 4 || color.length === 7;
};
