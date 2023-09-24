#! /usr/bin/env node
import inquirer from 'inquirer';
const exchangeRates = {
    USD: 1,
    PKR: 287.22,
    EUR: 0.94,
    GBP: 0.82,
};
async function currencyConverter() {
    const questions = [
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount to convert:',
            validate: (value) => !isNaN(parseFloat(value)) || 'Please enter a valid number',
        },
        {
            type: 'list',
            name: 'fromCurrency',
            message: 'Select the currency to convert from:',
            choices: Object.keys(exchangeRates),
        },
        {
            type: 'list',
            name: 'toCurrency',
            message: 'Select the currency to convert to:',
            choices: Object.keys(exchangeRates),
        },
    ];
    let result = '';
    do {
        const answers = await inquirer.prompt(questions);
        const { amount, fromCurrency, toCurrency } = answers;
        const conversionRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
        const convertedAmount = parseFloat(amount) * conversionRate;
        console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`);
        const askAgain = await inquirer.prompt({
            message: 'Press "x" to exit or any key ton continue',
            type: 'input',
            name: 'x_or_y',
        });
        result = askAgain.x_or_y;
    } while (result !== 'x');
}
currencyConverter();
