import { limit } from '../utils/limit';

it('should return passed number with max limit', () => {
    const actual = limit(278, 1, 255);
    expect(actual).toEqual(255);
});

it('should return passed number with min limit', () => {
    const actual = limit(5, 10, 255);
    expect(actual).toEqual(10);
});

