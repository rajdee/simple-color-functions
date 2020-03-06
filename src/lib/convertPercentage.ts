export const convertPercentage = (amount: number | string): number => {
    if (typeof(amount) === 'string') {
        const isPercentage = amount[amount.length - 1] === '%';
        const isNumber = /^0?\.\d+$/.test(amount);

        return isPercentage && !isNumber
            ? parseFloat(amount.replace('%', '')) / 100
            : parseFloat(amount);
    }

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

    return 0;
};
