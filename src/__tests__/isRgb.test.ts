import { isRgb } from '../utils/isRgb';

it('should return true for rgb values', () => {
    const actual = isRgb('255, 192, 2');
    expect(actual).toEqual(true);
});

it('should return false if no valid rgb values', () => {
    const actual = isRgb('255, 192, 289');
    expect(actual).toEqual(false);
});

it('should return false for hex|hsl value', () => {
    const actual = isRgb('#88aa34');
    expect(actual).toEqual(false);
});
