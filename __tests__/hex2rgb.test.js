const hex2rgb = require('../src/utils/hex2rgb');

it('should return an object with converted values from hex to rgb', () => {
    const actual = hex2rgb('#aabbcc');
    expect(actual).toEqual({
        r: 170, g: 187, b: 204
    });
});

it('should return an object with converted values from short hex to rgb', () => {
    const actual = hex2rgb('#abc');
    expect(actual).toEqual({
        r: 170, g: 187, b: 204
    });
});
