import { isHex } from '../lib/isHex';

it('should return true for hex value', () => {
    const actual = isHex('#aabbcc');
    expect(actual).toEqual(true);
});

it('should return true for hex value in short notation', () => {
    const actual = isHex('#abc');
    expect(actual).toEqual(true);
});

it('should return false for rgb|hsl value', () => {
    const actual = isHex('rgb(2, 12, 85');
    expect(actual).toEqual(false);
});
