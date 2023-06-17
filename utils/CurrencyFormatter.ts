const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbol: 'Rp.'
}

export const currencyFormatter = (value: number, options?: any) => {
    if (typeof value !== 'number') value = 0.0
    options = { ...defaultOptions, ...options }
    const valueRes = value.toFixed(options.significantDigits)

    const [currency, decimal] = valueRes.split('.')
    return `${currency.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        options.thousandsSeparator
    )}`
}
