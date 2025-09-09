import React, { useState, useEffect, useCallback } from 'react';
import { currencies } from '../../data/currencies';
import { faker } from '@faker-js/faker';
import { ArrowRightLeft, Calculator } from 'lucide-react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<string | null>(null);
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    // Generate mock exchange rates relative to USD
    const mockRates: Record<string, number> = { 'USD': 1 };
    currencies.forEach(currency => {
      if (currency.code !== 'USD') {
        // Generate more realistic rates for common currencies
        if (['EUR', 'GBP', 'AUD', 'CAD', 'CHF'].includes(currency.code)) {
          mockRates[currency.code] = faker.number.float({ min: 0.7, max: 1.5, precision: 0.0001 });
        } else if (['JPY'].includes(currency.code)) {
          mockRates[currency.code] = faker.number.float({ min: 100, max: 150, precision: 0.01 });
        } else {
          mockRates[currency.code] = faker.number.float({ min: 0.1, max: 200, precision: 0.01 });
        }
      }
    });
    setRates(mockRates);
  }, []);

  const handleConvert = useCallback(() => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || !rates[fromCurrency] || !rates[toCurrency]) {
      setResult(null);
      return;
    }

    const amountInUsd = numericAmount / rates[fromCurrency];
    const convertedAmount = amountInUsd * rates[toCurrency];
    
    setResult(convertedAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }));
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  useEffect(() => {
    handleConvert();
  }, [handleConvert]);

  const currentRate = rates[fromCurrency] && rates[toCurrency] 
    ? (rates[toCurrency] / rates[fromCurrency]).toFixed(4) 
    : 'N/A';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Enter Amount to Convert</h3>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              placeholder="e.g., 100"
            />
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="flex-1">
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label>
              <select
                id="from"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                {currencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
              </select>
            </div>
            <button
              onClick={handleSwap}
              className="p-3 mt-7 rounded-full text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
              aria-label="Swap currencies"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
              <select
                id="to"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                {currencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={handleConvert}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="h-5 w-5" />
            <span>Convert</span>
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Conversion Result</h3>
          <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg p-6 text-center">
            {result ? (
              <>
                <div className="text-sm text-blue-800 dark:text-blue-200">{amount} {fromCurrency} =</div>
                <div className="text-4xl font-bold text-blue-900 dark:text-white my-2">{result} <span className="text-3xl">{toCurrency}</span></div>
                <div className="text-xs text-blue-700 dark:text-blue-300 font-mono">1 {fromCurrency} = {currentRate} {toCurrency}</div>
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 py-12">Enter an amount to see the conversion.</p>
            )}
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-300 text-sm">
              <strong>Disclaimer:</strong> Exchange rates are for demonstration purposes only and are not real-time. Do not use for actual financial transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
