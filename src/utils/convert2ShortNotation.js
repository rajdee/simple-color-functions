module.exports = function isShortNotation(color) {
    const colorArray = color.split('').slice(1);
    return colorArray.every((item, i, array) => array[0] === item);
};
