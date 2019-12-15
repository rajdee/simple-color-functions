import { rgb2luminance } from '../utils/rgb2luminance';

it('should return a luminance of passed color', () => {
    const actual = rgb2luminance({
        r: 170,
        g: 187,
        b: 204
    });
    expect(actual).toEqual(0.48459745575345853);
});
