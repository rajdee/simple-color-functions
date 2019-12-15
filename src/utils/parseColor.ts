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
        return {
            r: null,
            g: null,
            b: null,
            a: 1
        };
    }
    if (isHex(color)) {
        return hex2rgb(color);
    }

    if (isRgb(color)) {
        return string2rgb(color);
    }

    return {
        r: null,
        g: null,
        b: null,
        a: 1
    };


};
