module.exports = (c, min = 0, max = 255) => {
    return Math.min(Math.max(min, c), max);
};
