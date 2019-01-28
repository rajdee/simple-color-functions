'use strict';

var constants = {
    // Corresponds roughly to RGB brighter/darker
    Kn: 18,

    // D65 standard referent
    // https://en.wikipedia.org/wiki/CIELAB_color_space
    Xn: 0.950470,
    Yn: 1,
    Zn: 1.088830,

    t0: 0.137931034,  // 4 / 29
    t1: 0.206896552,  // 6 / 29
    t2: 0.12841855,   // 3 * t1 * t1
    t3: 0.008856452,  // t1 * t1 * t1
};

var limit = function (c, min, max) {
    if ( min === void 0 ) min = 0;
    if ( max === void 0 ) max = 255;

    return Math.min(Math.max(min, c), max);
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
        : c * 12.92;
    return Math.round(255 * limit(x, 0, 1));
};

var lab_xyz = function (t) {
    return t > constants.t1
        ? t * t * t
        : constants.t2 * (t - constants.t0);
};

var lab2rgb_1 = lab2rgb;

var rgb2lab = function (rgb) {
    // https://en.wikipedia.org/wiki/CIELAB_color_space
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
    if (!color) {
        return false;
    }
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
        var hex = rgb[key].toString(16);
        acc += hex.length > 1 ? hex : ("0" + hex);
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

// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
var rgb2luminance = function (ref) {
    var r = ref.r;
    var g = ref.g;
    var b = ref.b;

    var R = luminance_c(r);
    var G = luminance_c(g);
    var B = luminance_c(b);
    return Math.sqrt(
        0.299 * R * R +
        0.587 * G * G +
        0.114 * B * B
    );
};

var luminance_c = function (c) {
    c = c / 255;
    return c <= 0.03928
        ? c / 12.92
        : Math.pow((c + 0.055) / 1.055, 2.4);
};

var rgb2luminance_1 = rgb2luminance;

function string2rgb(color) {
    var rgb = color.replace(/\s+/g,'').split(',').map(function (i) { return parseInt(i, 10); });
    return {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2]
    };
}

var parseColor = function parseColor(color) {
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
};

var convertPercentage = function convertPercentage(amount) {
    if (typeof(amount) === 'number') {
        // return result if -1 >= amount <= 1
        if (Math.abs(amount) <= 1) {
            return amount;
        }
        // return normalized result if -100 >= amount <= 100
        if (Math.abs(amount) <= 100) {
            return amount / 100;
        }
    }

    if (typeof(amount) === 'string' && amount[amount.length - 1] === '%') {
        return parseFloat(amount.replace('%', '') / 100);
    }

    return null;
};

var brightness = function brightness(rgb, amount) {
    var ref = rgb2lab_1(rgb);
    var l = ref.l;
    var a = ref.a;
    var b = ref.b;

    var modifiedL = limit(
        l * (1 + convertPercentage(amount)),
        0,
        100
    );
    return lab2rgb_1({
        l: modifiedL,
        a: a,
        b: b
    });
};

var Colors = function Colors(color) {
    this._rgb = parseColor(color);
};

Colors.prototype.rgb = function rgb () {
    return this._rgb;
};

Colors.prototype.css = function css () {
    var ref = this._rgb;
        var r = ref.r;
        var g = ref.g;
        var b = ref.b;
        var a = ref.a;
    return a === 1 || !a
        ? ("rgb(" + r + "," + g + "," + b + ")")
        : a > 0 && a < 1 && ("rgba(" + r + "," + g + "," + b + "," + a + ")");
};

Colors.prototype.hex = function hex () {
    return rgb2hex(this._rgb);
};

Colors.prototype.alpha = function alpha (opacity) {
    opacity = parseFloat(opacity);
    this._rgb = Object.assign({}, this._rgb,
        {a: opacity >= 0 && opacity <= 1
            ? opacity
            : 1});
    return this;
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

Colors.prototype.brightness = function brightness$1 (amount) {
    this._rgb = brightness(this._rgb, amount);
    return this;
};

Colors.prototype.luminance = function luminance (rgb) {
    return rgb2luminance_1(rgb || this._rgb);
};

Colors.prototype.contrast = function contrast (c1, c2) {
    // https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
    var l1 = this.luminance(parseColor(c1));
    var l2 = this.luminance(parseColor(c2));
    // contrast 1 - 21
    return l1 > l2
        ? (l1 + 0.05) / (l2 + 0.05)
        : (l2 + 0.05) / (l1 + 0.05);
};

Colors.prototype.toString = function toString () {
    return this.hex();
};

var src = function colors(color) {
    return new Colors(color);
};

module.exports = src;
