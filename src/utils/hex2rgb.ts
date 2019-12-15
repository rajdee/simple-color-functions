import { IRgb } from '../types';
import { convertFromShortNotation } from './convertFromShortNotation';

export const hex2rgb = (hex: string): IRgb => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(convertFromShortNotation(hex)) || [];

    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1
    };
};
