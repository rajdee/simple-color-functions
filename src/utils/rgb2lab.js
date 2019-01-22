const LAB_CONSTANTS = require('./constants');

const rgb2lab = rgb => {
    const { r, g, b } = rgb;
    const { x, y, z } = rgb2xyz(r, g, b);
    const l = 116 * y - 16;
    return {
        l: l < 0 ? 0 : l,
        a: 500 * (x - y),
        b: 200 * (y - z)
    };
};

const rgb_xyz = c => {
    return ((c /= 255) > 0.04045)
        ? Math.pow((c + 0.055) / 1.055, 2.4)
        : c / 12.92;
};

const xyz_lab = t => {
    return t > LAB_CONSTANTS.t3
        ? Math.pow(t, 1 / 3)
        : t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
};

const rgb2xyz = (r, g, b) => {
    r = rgb_xyz(r);
    g = rgb_xyz(g);
    b = rgb_xyz(b);
    const x = xyz_lab(
        (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn
    );
    const y = xyz_lab(
        (0.2126729 * r + 0.7151522 * g + 0.072175 * b) / LAB_CONSTANTS.Yn
    );
    const z = xyz_lab(
        (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn
    );
    return { x, y, z };
};

module.exports = rgb2lab;
