# Currency Converter React App

## Introduction

This React app serves as a simple currency converter that leverages the ExchangeRates API to provide up-to-date currency exchange rates. The app is designed to be user-friendly, allowing users to easily convert between different currencies.

### Features

- Fetches data from the ExchangeRates API and stores it inside an object within the program.
- Provides input fields for both the "from" and "to" currencies, with a default base currency of EUR.
- Allows users to dynamically change both the "fromCurrency" and "toCurrency" fields.
- Automatically updates the conversion when either of the currencies or their values is changed.
- The exchange rates are refreshed each time the page is loaded.

## Installation

Follow these steps to set up and run the currency converter React app:

1. Clone the git repository:

   ```bash
   git clone <repository_url>

    Create a .env file in the root directory of your project and initialize your API key for the ExchangeRates API:

    env
   ```

REACT_APP_EXCHANGE_RATES_API_KEY=<your_api_key>

2. Create a .gitignore file in the root directory and add .env to it to ensure that your API key is not committed to version control.

3. Install project dependencies using npm:

bash

npm install

4. Start the app by typing either of the following commands in the terminal:

For a production build type: npm start

For a development build (if configured): npm run dev

The app should now be accessible in your web browser. Open it and start converting currencies effortlessly!
