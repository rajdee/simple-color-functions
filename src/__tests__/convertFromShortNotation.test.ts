import { convertFromShortNotation} from '../lib/convertFromShortNotation';

it('should return an original color if length isn`t equal 3', () => {
    const actual = convertFromShortNotation('#aabbcc');
    expect(actual).toEqual('#aabbcc');
});

it('should return converted hex value from short notation', () => {
    const actual = convertFromShortNotation('#abc');
    expect(actual).toEqual('#aabbcc');
});

