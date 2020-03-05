export const convertPercentage = (amount: number | string): number => {
    if (typeof(amount) === 'number') {
        // return result if -1 >= amount <= 1
        if (Math.abs(amount) <= 1) {
            return amount;
        }
        // return normalized result if -100 >= amount <= 100
        if (Math.abs(amount) <= 100) {
            return amount / 100;
        }
    }

    if (typeof(amount) === 'string' && amount[amount.length - 1] === '%') {
        return parseFloat(amount.replace('%', '')) / 100;
    }

    return 0;
};
