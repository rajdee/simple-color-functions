// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
const rgb2luminance = ({ r , g, b }) => {
    const R = luminance_c(r);
    const G = luminance_c(g);
    const B = luminance_c(b);
    return Math.sqrt(
        0.299 * R * R +
        0.587 * G * G +
        0.114 * B * B
    );
};

const luminance_c = c => {
    c = c / 255;
    return c <= 0.03928
        ? c / 12.92
        : Math.pow((c + 0.055) / 1.055, 2.4);
};

module.exports = rgb2luminance;
