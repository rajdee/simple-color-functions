(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.colors = factory());
}(this, function () { 'use strict';

    var constants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,

        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,

        t0: 0.137931034,  // 4 / 29
        t1: 0.206896552,  // 6 / 29
        t2: 0.12841855,   // 3 * t1 * t1
        t3: 0.008856452,  // t1 * t1 * t1
    };

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var lab2rgb = function (ref) {
        var l = ref.l;
        var a = ref.a;
        var b = ref.b;

        var x, y, z;

        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;

        y = constants.Yn * lab_xyz(y);
        x = constants.Xn * lab_xyz(x);
        z = constants.Zn * lab_xyz(z);

        return {
            r: xyz_rgb( (x * 3.2404542) - (y * 1.5371385) - (z * 0.4985314) ),
            g: xyz_rgb( (x * -0.9692660) + (y * 1.8760108) + (z * 0.0415560) ),
            b: xyz_rgb( (x * 0.0556434) - (y * 0.2040259) +  (z * 1.0572252 ) )
        };
    };

    var xyz_rgb = function (c) {
        var x = c > 0.00304
            ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055
            : r * 12.92;
        return Math.round(255 * Math.min(Math.max(0, x), 1));
    };

    var lab_xyz = function (t) {
        return t > constants.t1
            ? t * t * t
            : constants.t2 * (t - constants.t0);
    };

    var lab2rgb_1 = lab2rgb;

    var rgb2lab = function (rgb) {
        var r = rgb.r;
        var g = rgb.g;
        var b = rgb.b;
        var ref = rgb2xyz(r, g, b);
        var x = ref.x;
        var y = ref.y;
        var z = ref.z;
        var l = 116 * y - 16;
        return {
            l: l < 0 ? 0 : l,
            a: 500 * (x - y),
            b: 200 * (y - z)
        };
    };

    var rgb_xyz = function (c) {
        return ((c /= 255) > 0.04045)
            ? Math.pow((c + 0.055) / 1.055, 2.4)
            : c / 12.92;
    };

    var xyz_lab = function (t) {
        return t > constants.t3
            ? Math.pow(t, 1 / 3)
            : t / constants.t2 + constants.t0;
    };

    var rgb2xyz = function (r, g, b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab(
            (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / constants.Xn
        );
        var y = xyz_lab(
            (0.2126729 * r + 0.7151522 * g + 0.072175 * b) / constants.Yn
        );
        var z = xyz_lab(
            (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / constants.Zn
        );
        return { x: x, y: y, z: z };
    };

    var rgb2lab_1 = rgb2lab;

    var isRgb = function isRgb(color) {
        var rgb = color.replace(/\s+/g,'').split(',');

        return rgb.length === 3 && rgb.every(function (num) {
            var isInt = /^\+?(0|[1-9]\d*)$/.test(num);
            var toNumber = parseInt(num, 10);

            return isInt && toNumber >= 0 && toNumber <= 255;
        });
    };

    var isHex = function isHex(color) {
        return color[0] === '#' && color.length === 4 || color.length === 7;
    };

    var rgb2hex = function rgb2hex(rgb) {
        return Object.keys(rgb).reduce(function (acc, key) {
            acc += rgb[key].toString(16);
            return acc;
        }, '#');
    };

    var convertFromShortNotation = function convertShortNotation(color) {
        if (color.length !== 4) {
            return color;
        }

        var colorArray = color.split('').slice(1);

        return colorArray.reduce(function (acc, item) { return acc + item + item; }, '#');
    };

    var hex2rgb = function hex2rgb(hex) {
        if (!isHex(hex)) {
            return null;
        }

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(convertFromShortNotation(hex));

        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
    };

    function string2rgb(color) {
        var rgb = color.replace(/\s+/g,'').split(',').map(function (i) { return parseInt(i, 10); });
        return {
            r: rgb[0],
            g: rgb[1],
            b: rgb[2]
        };
    }

    var Colors = function Colors(color) {
        if (isHex(color)) {
            this._rgb = hex2rgb(color);
        } else if (isRgb(color)) {
            this._rgb = string2rgb(color);
        }
    };

    Colors.prototype.rgb = function rgb () {
        return this._rgb;
    };

    Colors.prototype.css = function css () {
        var ref = this._rgb;
            var r = ref.r;
            var g = ref.g;
            var b = ref.b;
        return ("rgb(" + r + ", " + g + ", " + b + ")");
    };

    Colors.prototype.hex = function hex () {
        return rgb2hex(this._rgb);
    };

    Colors.prototype.aplha = function aplha (opacity) {
        var ref = this._rgb;
            var r = ref.r;
            var g = ref.g;
            var b = ref.b;

        return ("rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")");
    };

    Colors.prototype.darken = function darken (amount) {
            if ( amount === void 0 ) amount = 1;

        var ref = rgb2lab_1(this._rgb);
            var l = ref.l;
            var a = ref.a;
            var b = ref.b;
        this._rgb = lab2rgb_1({
            l: l - constants.Kn * amount,
            a: a,
            b: b
        });
        return this;
    };

    Colors.prototype.brighten = function brighten (amount) {
            if ( amount === void 0 ) amount = 1;

        return this.darken(-amount);
    };

    Colors.prototype.brightness = function brightness () {
        var ref = this._rgb;
            var r = ref.r;
            var g = ref.g;
            var b = ref.b;
        return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
    };

    var src = function colors(color) {
        return new Colors(color);
    };

    return src;

}));
