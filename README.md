# CryptoETF
*DISCLAIMER: This tool neither is, nor should be construed as an offer, solicitation, or recommendation to buy or sell any cryptoassets.*

<img src="https://raw.githubusercontent.com/benmarten/CryptoETF/static/screenshot.jpg" width="1102">
A CLI app, that pulls the cryptocoin balances from your exchanges and displayes your portoflio in comparison to the overall market. A recommendation is shown based on the ideal capitalization-weighted portfolio.

## Installation
```
npm install
npm run build
cp settings.example.json settings.json
```

## Usage
Run the sample:
`node sample`
Edit settings.json with your exchange api keys, then:
`node index`

## Exchanges
CryptoETF has API integrations with the following exchanges:
- Coinbase. Join Here: https://www.coinbase.com/join/587ab088801bae035cad02c5
- GDAX. Join Here: https://www.gdax.com/
- Poloniex. Join Here: https://www.poloniex.com
- Bittrex. Join Here: https://www.bittrex.com
- Binance. Join Here: https://www.binance.com/?ref=12278261
- HitBTC. Join Here: https://hitbtc.com/?ref_id=5a3596f643b9e
- Bitfinex. Join Here: https://www.bitfinex.com
- Kraken. Join Here: https://www.kraken.com
- Bitgrail. Join Here: https://bitgrail.com

With these exchanges, you can easily build yourself your own CryptoETF.

## Settings
The tool expects your settings in settings.json. Take a look at settings.example.json for a starting point.
- *accounts*: Under accounts, fill in your api credentials for the exchange that you want to use. Delete the exchanges that you do not need.
- *symbolMapping*: Some exchanges use different symbols that coinmarketcap.com. Hence here you can map the symbols, e.g.: map MIOTA to IOTA.
- *otherHoldings*: A place to manually add some of your holdings. Notation is key: Symbol, value is amount of native currency.
- *options*: These are specific options for the tool:
  - targetValueUsd: The target value for your ETF; A general rule of thumb is to keep your crypto at a certain percentage of your overall investment portfolio. This could be 5, 10, 20 or more percent, depending on your risk tolerance.
    - Default [false]: Use current portfolio value as target value.
    - Number [1 - 999999999999]: Use fixed number as target value.
  - rebalanceDeltaTotalPct: Treshold in percent, that will show a Y in the rebalance column, once rebalancing of total portfolio is recommended.
  - rebalanceDeltaPct: Treshold in percent, that will show a Y in the rebalance column, once rebalancing of individual position is recommended.
  - minValueBtc: Ignore coins that only have a holdingsvalue under a certain bitcoin value.
  - hideMissingCoins: By default CryptoETF will add all missing coins up to your last coin holding by rank of the coin (global market cap). This option disables that behaviour.
- *outputFile*: Path to a file to forward the output to as json.

## Test
`npm test`

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
See LICENSE.md

## Donate
- BTC: 1jzYq6yo4MCZnjsGFahhV8ZQd7TwLeCL6
- ETH: 0xfE131Eb3dc3E0476d7eD26134A4A17Cc253C1689
- LTC: LUVz63UPLqsQG5LHD3zgnaHGts7bm4Yxm8
