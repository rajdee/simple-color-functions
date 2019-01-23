const isShortNotation = require('../src/utils/isShortNotation');

it('should return true if color short', () => {
    const actual = isShortNotation('#aaa');
    expect(actual).toEqual(true);
});

it('should return false if color isn`t short', () => {
    const actual = isShortNotation('#aab3cc');
    expect(actual).toEqual(false);
});

