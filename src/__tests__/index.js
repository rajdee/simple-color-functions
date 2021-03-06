const colors = require('../../dist/index.min.js');

it('should return darken color with default amount', () => {
    const actual = colors('#23bc98').darken().hex();
    expect(actual).toEqual('#008b6a');
});

it('should return darken color with custom amount', () => {
    const actual = colors('#23bc98').darken(0.5).hex();
    expect(actual).toEqual('#00a381');
});

it('should return brighten color with default amount', () => {
    const actual = colors('#23bc98').brighten().hex();
    expect(actual).toEqual('#66efc9');
});

it('should return brighten color with custom amount', () => {
    const actual = colors('#23bc98').brighten(1.2).hex();
    expect(actual).toEqual('#71fad3');
});

it('should return converted color from hex to rgb', () => {
    const actual = colors('#23bc98').css();
    expect(actual).toEqual('rgb(35,188,152)');
});

it('should return contrast criteria of two colors', () => {
    const actual = colors('#fff').contrast('#23bc98');
    expect(actual).toEqual(2.3348071108457673);
});


it('should return brighten color by brightness in percent', () => {
    const actual = colors('#23bc98').brightness('20%').hex();
    expect(actual).toEqual('#58e3bd');
});

it('should return darken color by brightness in percent', () => {
    const actual = colors('#23bc98').brightness('-20%').hex();
    expect(actual).toEqual('#009675');
});

it('should return brighten color by brightness in decimals', () => {
    const actual = colors('#23bc98').brightness(0.2).hex();
    expect(actual).toEqual('#58e3bd');
});

it('should return darken color by brightness in decimals', () => {
    const actual = colors('#23bc98').brightness(-0.2).hex();
    expect(actual).toEqual('#009675');
});

it('should return converted color with alpha chanel', () => {
    const actual = colors('#23bc98').alpha(.5).rgb();
    expect(actual).toEqual({
        r: 35,
        g: 188,
        b: 152,
        a: 0.5
    });
});


