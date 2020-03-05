import { IRgb } from '../types';

export const rgb2hex = ({ r, g, b }: IRgb): string => {
    return [ r, g, b ].reduce((acc, c) => {
        const hex = c.toString(16);
        acc += hex.length > 1 ? hex : `0${hex}`;
        return acc;
    }, '#');
};
