import { useState, useEffect } from "react";

function calculateExchangeRate(currencies, fromCurrency, toCurrency) {
  if (!currencies || !currencies.rates) {
    return;
  }
  if (fromCurrency === currencies.base) {
    return currencies.rates[toCurrency];
  } else if (toCurrency === currencies.base) {
    return 1 / currencies.rates[fromCurrency];
  } else {
    return currencies.rates[toCurrency] / currencies.rates[fromCurrency];
  }
}

const useCurrencyConverter = (
  currencies,
  fromCurrency,
  toCurrency,
  initialRate
) => {
  const [exchangeRate, setRate] = useState(initialRate);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null && currencies != null) {
      const calculatedRate = calculateExchangeRate(
        currencies,
        fromCurrency,
        toCurrency
      );
      if (calculatedRate !== exchangeRate) {
        setRate(calculatedRate);
      }
    }
  }, [fromCurrency, toCurrency, currencies, exchangeRate]);

  return { exchangeRate, calculateExchangeRate };
};

export default useCurrencyConverter;
