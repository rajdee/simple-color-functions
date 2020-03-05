import { rgb2hex }  from '../lib/rgb2hex';

it('should return a string with hex color from rgb object', () => {
    const actual = rgb2hex({
        r: 170,
        g: 187,
        b: 204
    });
    expect(actual).toEqual('#aabbcc');
});
