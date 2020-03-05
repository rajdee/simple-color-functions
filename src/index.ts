import { IRgb } from './types';
import { lab2rgb } from './lib/lab2rgb';
import { rgb2lab } from './lib/rgb2lab';
import { rgb2hex } from './lib/rgb2hex';
import { rgb2luminance } from './lib/rgb2luminance';
import { parseColor } from './lib/parseColor';
import { brightness } from './lib/brightness';
import { CONSTANTS } from './lib/constants';

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

    contrast(color2: string) {
        // https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        const l1 = rgb2luminance(this._rgb);
        const l2 = rgb2luminance(parseColor(color2));
        // contrast 1 - 21
        return l1 > l2
            ? (l1 + 0.05) / (l2 + 0.05)
            : (l2 + 0.05) / (l1 + 0.05);
    }

    toString() {
        return this.hex();
    }
}

export default function colors(color: string) {
    return new Colors(color);
}
