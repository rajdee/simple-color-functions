module.exports = function isShortNotation(color) {
    return /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.test(color);
};
