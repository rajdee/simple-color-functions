import { IRgb } from './types';
import { lab2rgb } from './utils/lab2rgb';
import { rgb2lab } from './utils/rgb2lab';
import { rgb2hex } from './utils/rgb2hex';
import { rgb2luminance } from './utils/rgb2luminance';
import { parseColor } from './utils/parseColor';
import { brightness } from './utils/brightness';
import { CONSTANTS } from './utils/constants';

class Colors {
    _rgb: IRgb;
    constructor(color: string) {
        this._rgb = parseColor(color);
    }

    rgb() {
        return this._rgb;
    }

    css() {
        const { r, g, b, a } = this._rgb;
        return a === 1 || !a
            ? `rgb(${r},${g},${b})`
            : a > 0 && a < 1 && `rgba(${r},${g},${b},${a})`;
    }

    hex() {
        return rgb2hex(this._rgb);
    }

    alpha(opacity: number) {
        this._rgb = {
            ...this._rgb,
            a: opacity >= 0 && opacity <= 1
                ? opacity
                : 1
        };
        return this;
    }

    darken(amount: number = 1) {
        const { L, a, b } = rgb2lab(this._rgb);
        this._rgb = lab2rgb({
            L: L - CONSTANTS.Kn * amount,
            a,
            b
        });
        return this;
    }

    brighten(amount: number = 1) {
        return this.darken(-amount);
    }

    brightness(amount: number) {
        this._rgb = brightness(this._rgb, amount);
        return this;
    }

    luminance(rgb: IRgb) {
        return rgb2luminance(rgb || this._rgb);
    }

    contrast(c1: string, c2: string) {
        // https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        const l1 = this.luminance(parseColor(c1));
        const l2 = this.luminance(parseColor(c2));
        // contrast 1 - 21
        return l1 > l2
            ? (l1 + 0.05) / (l2 + 0.05)
            : (l2 + 0.05) / (l1 + 0.05);
    }

    toString() {
        return this.hex();
    }
}

export default function colors (color: string) {
    return new Colors(color);
}
