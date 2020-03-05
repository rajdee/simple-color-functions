import { IRgb } from '../types';
import { rgb2lab } from './rgb2lab';
import { lab2rgb } from './lab2rgb';
import { convertPercentage } from './convertPercentage';
import { limit } from './limit';

export const brightness = (rgb: IRgb, amount: string | number ): IRgb => {
    const { L, a, b } = rgb2lab(rgb);

    const modifiedL = limit(
        L * (1 + convertPercentage(amount)),
        0,
        100
    );
    return lab2rgb({
        L: modifiedL,
        a,
        b
    });
};
