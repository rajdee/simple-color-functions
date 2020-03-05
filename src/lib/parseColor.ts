import { IRgb } from '../types';
import { isHex } from './isHex';
import { isRgb } from './isRgb';
import { hex2rgb } from './hex2rgb';

const string2rgb = (color: string): IRgb => {
    const rgb = color.replace(/\s+/g,'').split(',').map(i => parseInt(i, 10));
    return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2],
        a: 1
    };
}

export const parseColor = (color: string): IRgb => {
    if (!color) {
        throw 'Color not passed';
    }

    if (isHex(color)) {
        return hex2rgb(color);
    }

    if (isRgb(color)) {
        return string2rgb(color);
    }

    return {
        r: -1,
        g: -1,
        b: -1,
        a: 1
    };
};
