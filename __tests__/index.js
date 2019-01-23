const colors = require('../index.js');

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

