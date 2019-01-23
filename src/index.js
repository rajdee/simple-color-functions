const c = require('./utils/constants');
const lab2rgb = require('./utils/lab2rgb');
const rgb2lab = require('./utils/rgb2lab');
const isRgb = require('./utils/isRgb');
const isHex = require('./utils/isHex');
const rgb2hex = require('./utils/rgb2hex');
const hex2rgb = require('./utils/hex2rgb');
const rgb2luminance = require('./utils/rgb2luminance');

function string2rgb(color) {
    const rgb = color.replace(/\s+/g,'').split(',').map(i => parseInt(i, 10));
    return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2]
    };
}

function parseColor(color) {
    if (!color) {
        return {
            r: null,
            g: null,
            b: null,
            a: 1
        };
    } else if (isHex(color)) {
        return hex2rgb(color);
    } else if (isRgb(color)) {
        return string2rgb(color);
    }
}

class Colors {
    constructor(color) {
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

    alpha(opacity) {
        opacity = parseFloat(opacity);
        this._rgb = {
            ...this._rgb,
            a: opacity >= 0 && opacity <= 1
                ? opacity
                : 1
        };
        return this;
    }

    darken(amount = 1) {
        const { l, a, b } = rgb2lab(this._rgb);
        this._rgb = lab2rgb({
            l: l - c.Kn * amount,
            a,
            b
        });
        return this;
    }

    brighten(amount = 1) {
        return this.darken(-amount);
    }

    brightness() {
        const { r, g, b } = this._rgb;
        return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
    }

    luminance(rgb) {
        return rgb2luminance(rgb || this._rgb);
    }

    contrast(c1, c2) {
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

module.exports = function colors(color) {
    return new Colors(color);
};
