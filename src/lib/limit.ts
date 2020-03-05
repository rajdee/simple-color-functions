export const limit = (
    c: number,
    min: number = 0,
    max: number = 255
): number => {
    return Math.min(Math.max(min, c), max);
};
