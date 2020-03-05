export const isRgb = (color: string): boolean => {
    if (!color) {
        return false;
    }
    const rgb = color.replace(/\s+/g,'').split(',');

    return rgb.length === 3 && rgb.every(num => {
        const isInt = /^\+?(0|[1-9]\d*)$/.test(num);
        const toNumber = parseInt(num, 10);

        return isInt && toNumber >= 0 && toNumber <= 255;
    });
};


