export const isShortNotation = (color: string): boolean => {
    const colorArray = color.split('').slice(1);
    return colorArray.every((item, i, array) => array[0] === item);
};
