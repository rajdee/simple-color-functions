import { Lab, IRgb } from '../types';
import { CONSTANTS } from './constants';
import { limit } from './limit';

const xyz_rgb = (c: number) => {
    const x = c > 0.00304
        ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055
        : c * 12.92;
    return Math.round(255 * limit(x, 0, 1));
};

const lab_xyz = (t: number) => {
    return t > CONSTANTS.t1
        ? t * t * t
        : CONSTANTS.t2 * (t - CONSTANTS.t0);
};


/*
 * L* [0..100]
 * a [-100..100]
 * b [-100..100]
 */

export const lab2rgb = ({ L, a, b }: Lab): IRgb => {
    let x, y, z;

    y = (L + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;

    y = CONSTANTS.Yn * lab_xyz(y);
    x = CONSTANTS.Xn * lab_xyz(x);
    z = CONSTANTS.Zn * lab_xyz(z);

    return {
        r: xyz_rgb( (x * 3.2404542) - (y * 1.5371385) - (z * 0.4985314) ),
        g: xyz_rgb( (x * -0.9692660) + (y * 1.8760108) + (z * 0.0415560) ),
        b: xyz_rgb( (x * 0.0556434) - (y * 0.2040259) +  (z * 1.0572252 ) ),
        a: 1
    };
};
