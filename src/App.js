import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import CurrencyConverterText from "./components/CurrencyConverterText";
import TimeStamp from "./components/TimeStamp";

const endpoint = "latest";
const access_key = process.env.REACT_APP_EXCHANGE_RATES_API_KEY;

const params = {
  access_key: access_key,
  endpoint: endpoint,
};

const BASE_URL = `http://api.exchangeratesapi.io/v1/${params.endpoint}?access_key=${params.access_key}`;

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [isAmountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [currencies, setCurrencies] = useState({});

  let inputAmount, outputAmount;
  if (isAmountInFromCurrency) {
    outputAmount = amount;
    inputAmount = amount * exchangeRate;
  } else {
    outputAmount = amount / exchangeRate;
    inputAmount = amount;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data);
        const initialCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(initialCurrency);
        setExchangeRate(data.rates[initialCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null && currencies != null) {
      const rate = calculateExchangeRate(fromCurrency, toCurrency);
      if (rate !== null) {
        setExchangeRate(rate);
      }
    }
  }, [fromCurrency, toCurrency, currencies]);

  function calculateExchangeRate(fromCurrency, toCurrency) {
    if (currencies && currencies.rates) {
      const rateFromBase = currencies.rates[fromCurrency];
      const rateToBase = currencies.rates[toCurrency];
      return rateToBase / rateFromBase;
    }
    return null;
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <div className="container">
        <CurrencyConverterText />
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={outputAmount}
        />
        <div className="equals">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={inputAmount}
        />
        <TimeStamp timestamp={currencies?.timestamp} />
      </div>
    </>
  );
}

export default App;
