import { IRgb, Lab } from '../types';
import { CONSTANTS } from './constants';

const rgb_xyz = (c: number) => {
    return ((c /= 255) > 0.04045)
        ? Math.pow((c + 0.055) / 1.055, 2.4)
        : c / 12.92;
};

const xyz_lab = (t: number) => {
    return t > CONSTANTS.t3
        ? Math.pow(t, 1 / 3)
        : t / CONSTANTS.t2 + CONSTANTS.t0;
};

const rgb2xyz = ({ r, g, b }: IRgb) => {
    r = rgb_xyz(r);
    g = rgb_xyz(g);
    b = rgb_xyz(b);
    const x = xyz_lab(
        (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / CONSTANTS.Xn
    );
    const y = xyz_lab(
        (0.2126729 * r + 0.7151522 * g + 0.072175 * b) / CONSTANTS.Yn
    );
    const z = xyz_lab(
        (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / CONSTANTS.Zn
    );
    return { x, y, z };
};

export const rgb2lab = (rgb: IRgb): Lab => {
    // https://en.wikipedia.org/wiki/CIELAB_color_space
    const { x, y, z } = rgb2xyz(rgb);
    const L = 116 * y - 16;
    return {
        L: L < 0 ? 0 : L,
        a: 500 * (x - y),
        b: 200 * (y - z)
    };
};
