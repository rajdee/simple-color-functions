// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
const rgb2luminance = ({ r , g, b }) =>
    0.2126 * luminance_c(r) + 0.7152 * luminance_c(g) + 0.0722 * luminance_c(b);

const luminance_c = c => {
    c = c / 255;
    return c <= 0.03928
        ? c / 12.92
        : Math.pow((c + 0.055) / 1.055, 2.4);
};

module.exports = rgb2luminance;
