const settings = require('../settings.json')

export default class Utils {
  static pad(width, string, padding) {
    return (width <= string.length) ? string : this.pad(width, padding + string, padding)
  }

  static getSortedKeys(object, keyName) {
    let keys = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key)
      }
    }
    return keys.sort(function(a, b) {
      let ax = object[a][keyName]
      let bx = object[b][keyName]
      return ax - bx
    })
  }

  /**
   * Round a float to given number of decimal places.
   * @param num The number to round.
   * @param places The number of decimal places.
   */
  static round(num, places) {
    places = (places ? places : 0)
    let normalizer = Math.pow(10, places)
    return Math.round(num * normalizer) / normalizer
  }

  /**
   * Capitalize the first Char, rest lower case.
   * @param string The input string
   * @return {string} The result string.
   */
  static capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  /**
   * Determines if drift is above treshold defined in settings.
   * @param drift The current drift.
   * @return {string} 'Y', if drifted, '' if not.
   */
  static hasDriftedAboveTreshold(drift) {
    return (Math.abs(drift) * 100 > (settings.options.rebalanceDeltaTotalPct ||
        settings.options.rebalanceDeltaPct)) ? 'Y' : ''
  }
}
