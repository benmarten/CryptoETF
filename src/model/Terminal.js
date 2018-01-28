import Utils from '../Utils'
import Coinmarket from './Coinmarket'
import Portfolio from './Portfolio'
import Format from '../Format'
import * as Settings from '../Settings'
import {table} from 'table'
import colors from 'colors';

export default class Terminal {
  /**
   * Formats the output for the command line.
   * @return {string} A string with the result.
   */
  static printOutput(portfolio) {
    let stretchFactor = Portfolio.getStretchFactor()
    let data = [
      ['#', 'SYMBOL', 'AMOUNT', 'VALUE', 'VALUE', 'ALLOCATION', 'ALLOCATION', 'TARGET', 'TARGET', 'BUY(-)/SELL(+)', 'BUY(-)/SELL(+)', 'BUY(-)/SELL(+)', 'DRIFT', 'REBALANCE', 'EXCHANGES'],
      ['', '', '', '฿', '$', 'actual %', 'target %', '฿', '$', '฿', 'ETH', '$', '%', '', '']
    ]
    let sortedKeys = Utils.getSortedKeys(portfolio, 'rank')
    let targetSum = []
    let targetValueUsd = Portfolio.getTargetValueUsd()
    let targetValueBtc = Portfolio.getTargetValueUsd() / Coinmarket.getBtcUsd()
    targetSum['allocationActualPct'] = 0
    targetSum['allocationTargetPct'] = 0
    targetSum['targetBtc'] = 0
    targetSum['targetUsd'] = 0
    for (let index in sortedKeys) {
      if (!sortedKeys.hasOwnProperty(index)) {
        continue
      }
      let coin = portfolio[sortedKeys[index]]
      if (coin.getBtcValue() < Settings.options.minValueBtc) { continue }
      let allocationActualPct = coin.getRelativeMarketCap()
      let allocationTargetPct = coin.getRelativeMarketCapRecommended() / stretchFactor
      let targetBtc = coin.getRelativeMarketCapRecommended() / stretchFactor * targetValueBtc
      let targetUsd = coin.getRelativeMarketCapRecommended() / stretchFactor * targetValueUsd
      let drift = (coin.getUsdValue() - targetUsd) / targetValueUsd
      data.push([
        coin.getRank(),
        coin.getSymbol(),
        Utils.round(coin.getAmount(), 2),
        Format.bitcoin(coin.getBtcValue()),
        Format.money(coin.getUsdValue(), 0),
        Format.percent(allocationActualPct),
        Format.percent(allocationTargetPct),
        Format.bitcoin(targetBtc),
        Format.money(targetUsd),
        Utils.colorize(Format.bitcoin(coin.getBtcValue() - targetBtc, 8)),
        Utils.colorize(Format.bitcoin((coin.getBtcValue() - targetBtc) / Coinmarket.getBtcEth(), 8)),
        Utils.colorize(Format.money(coin.getUsdValue() - targetUsd)),
        Utils.colorize(Format.percent(drift)),
        Utils.hasDriftedAboveTreshold(drift, Settings.options.rebalanceDeltaPct),
        coin.getExchangesString()
      ])
      targetSum['allocationActualPct'] += allocationActualPct || 0
      targetSum['allocationTargetPct'] += allocationTargetPct || 0
      targetSum['targetBtc'] += targetBtc
      targetSum['targetUsd'] += targetUsd
    }

    let drift = (Portfolio.getSumBtc() - targetSum['targetBtc']) / targetSum['targetBtc']
    let deltaSumBtc = Portfolio.getSumBtc() - targetSum['targetBtc']
    data.push([
      '',
      '',
      '',
      '฿' + Format.bitcoin(Portfolio.getSumBtc()),
      ('$' + Format.money(Portfolio.getSumUsd())).bold,
      Format.percent(targetSum['allocationActualPct']) + '%',
      Format.percent(targetSum['allocationTargetPct']) + '%',
      '฿' + Format.bitcoin(targetSum['targetBtc']),
      '$' + Format.money(targetSum['targetUsd']),
      Utils.colorize('฿' + Format.bitcoin(deltaSumBtc)),
      Utils.colorize(Format.bitcoin(deltaSumBtc / Coinmarket.getBtcEth()) + ' ETH'),
      Utils.colorize('$' + Format.money(Portfolio.getSumUsd() - targetSum['targetUsd'])),
      Utils.colorize(Format.percent(drift) + '%'),
      Utils.hasDriftedAboveTreshold(drift, (Settings.options.rebalanceDeltaTotalPct ||
          Settings.options.rebalanceDeltaPct)),
      ''])

    // noinspection JSUnusedGlobalSymbols
    let config = {
      columns: {
        2: {
          alignment: 'right'
        },
        3: {
          alignment: 'right'
        },
        4: {
          alignment: 'right'
        },
        5: {
          alignment: 'right'
        },
        6: {
          alignment: 'right'
        },
        7: {
          alignment: 'right'
        },
        8: {
          alignment: 'right'
        },
        9: {
          alignment: 'right'
        },
        10: {
          alignment: 'right'
        },
        11: {
          alignment: 'right'
        },
        12: {
          alignment: 'right'
        },
        13: {
          alignment: 'right'
        }
      },
      drawHorizontalLine: (index, size) => {
        return index === 0 || index === 2 || index === size - 1 || index === size
      }
    }
    console.log(table(data, config))
  }
}
