import { convertPercentage } from '../lib/convertPercentage';

it('should return an original result if passed amount between -1 and 1', () => {
    const actual = convertPercentage(-0.5);
    expect(actual).toEqual(-0.5);
});

it('should return a amount /100 if passed amount > 1 or < -1', () => {
    const actual = convertPercentage(15);
    expect(actual).toEqual(0.15);
});

it('should return a parced amount from string', () => {
    const actual = convertPercentage('-89%');
    expect(actual).toEqual(-0.89);
});


