import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import CurrencyConverterText from "./components/CurrencyConverterText";
import TimeStamp from "./components/TimeStamp";
import useCurrencyConverter from "./hooks/useCurrencyConverter";

const endpoint = "latest";
const access_key = process.env.REACT_APP_EXCHANGE_RATES_API_KEY;

function App() {
  const {
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
    currencies,
  } = useCurrencyConverter(endpoint, access_key);

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
        <TimeStamp timestamp={timestamp} />
      </div>
    </>
  );
}

export default App;
