export const convertFromShortNotation = (color: string): string => {
    if (color.length !== 4) {
        return color;
    }

    const colorArray = color.split('').slice(1);

    return colorArray.reduce((acc, item) => acc + item + item, '#');
};
