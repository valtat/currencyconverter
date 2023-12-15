import { useState, useEffect } from "react";

const useFetch = (BASE_URL) => {
  const [currencies, setCurrencies] = useState([]);
  const [timestamp, setTimestamp] = useState("");
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [initialRate, setInitialRate] = useState(0);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data);
        setTimestamp(data.timestamp);
        const initialCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(initialCurrency);
        setInitialRate(data.rates[initialCurrency]);
      });
  }, [BASE_URL]);

  return {
    currencies,
    timestamp,
    currencyOptions,
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
    initialRate,
  };
};

export default useFetch;
