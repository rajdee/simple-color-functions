const LAB_CONSTANTS = require('./constants');

/*
 * L* [0..100]
 * a [-100..100]
 * b [-100..100]
 */
const lab2rgb = ({ l, a, b }) => {
    let x, y, z;

    y = (l + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;

    y = LAB_CONSTANTS.Yn * lab_xyz(y);
    x = LAB_CONSTANTS.Xn * lab_xyz(x);
    z = LAB_CONSTANTS.Zn * lab_xyz(z);

    return {
        r: xyz_rgb( (x * 3.2404542) - (y * 1.5371385) - (z * 0.4985314) ),
        g: xyz_rgb( (x * -0.9692660) + (y * 1.8760108) + (z * 0.0415560) ),
        b: xyz_rgb( (x * 0.0556434) - (y * 0.2040259) +  (z * 1.0572252 ) )
    };
};

const xyz_rgb = c => {
    const x = c > 0.00304
        ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055
        : c * 12.92;
    return Math.round(255 * Math.min(Math.max(0, x), 1));
};

const lab_xyz = t => {
    return t > LAB_CONSTANTS.t1
        ? t * t * t
        : LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
};

module.exports = lab2rgb;
