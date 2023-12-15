import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import CurrencyConverterText from "./components/CurrencyConverterText";
import TimeStamp from "./components/TimeStamp";
import useCurrencyConverter from "./hooks/useCurrencyConverter";
import useFetch from "./hooks/useFetch";
import React, { useState } from "react";

const params = {
  access_key: process.env.REACT_APP_EXCHANGE_RATES_API_KEY,
  endpoint: "latest",
};

const BASE_URL =
  "http://api.exchangeratesapi.io/v1/" +
  params.endpoint +
  "?access_key=" +
  params.access_key;

function App() {
  const [amount, setAmount] = useState(1);
  const [isAmountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const {
    currencies,
    timestamp,
    currencyOptions,
    fromCurrency,
    toCurrency,
    initialRate,
    setFromCurrency,
    setToCurrency,
  } = useFetch(BASE_URL);

  const { exchangeRate, calculateExchangeRate } = useCurrencyConverter(
    currencies,
    fromCurrency,
    toCurrency,
    initialRate
  );

  let inputAmount, outputAmount;
  if (isAmountInFromCurrency) {
    outputAmount = amount;
    inputAmount = amount * exchangeRate;
  } else {
    inputAmount = amount;
    outputAmount = amount / exchangeRate;
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  const handleFromCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setFromCurrency(newCurrency);
    calculateExchangeRate(currencies, newCurrency, toCurrency);
  };

  const handleToCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setToCurrency(newCurrency);
    calculateExchangeRate(currencies, fromCurrency, newCurrency);
  };

  return (
    <>
      <div className="container">
        <CurrencyConverterText />
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={handleFromCurrencyChange}
          onChangeAmount={handleFromAmountChange}
          amount={outputAmount}
        />
        <div className="equals">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={handleToCurrencyChange}
          onChangeAmount={handleToAmountChange}
          amount={inputAmount}
        />
        <TimeStamp timestamp={timestamp} />
      </div>
    </>
  );
}

export default App;
