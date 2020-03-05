export const isHex = (color: string): boolean => {
    return /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.test(color);
};
