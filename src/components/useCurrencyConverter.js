import { useState, useEffect } from "react";

function calculateExchangeRate(currencies, fromCurrency, toCurrency) {
  if (fromCurrency === currencies.base) {
    return currencies.rates[toCurrency];
  } else if (toCurrency === currencies.base) {
    return 1 / currencies.rates[fromCurrency];
  } else {
    return currencies.rates[toCurrency] / currencies.rates[fromCurrency];
  }
}

export default function useCurrencyConverter(endpoint, access_key) {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [isAmountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [currencies, setCurrencies] = useState({});
  const [timestamp, setTimestamp] = useState();

  useEffect(() => {
    fetch(
      `http://api.exchangeratesapi.io/v1/${endpoint}?access_key=${access_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data);
        setTimestamp(data.timestamp);
        const initialCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(initialCurrency);
        setExchangeRate(data.rates[initialCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null && currencies != null) {
      const rate = calculateExchangeRate(currencies, fromCurrency, toCurrency);
      if (rate !== null) {
        setExchangeRate(rate);
      }
    }
  }, [fromCurrency, toCurrency, currencies]);

  return {
    timestamp,
    currencyOptions,
    fromCurrency,
    toCurrency,
    exchangeRate,
    amount,
    isAmountInFromCurrency,
    setFromCurrency,
    setToCurrency,
    setAmount,
    setAmountInFromCurrency,
  };
}
