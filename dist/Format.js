'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Format = function () {
  function Format() {
    _classCallCheck(this, Format);
  }

  _createClass(Format, null, [{
    key: 'money',
    value: function money(number) {
      if (!number) {
        return '';
      }
      var formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0
      });
      return formatter.format(parseInt(number));
    }
  }, {
    key: 'percent',
    value: function percent(number) {
      if (!number) {
        return '';
      }
      return _Utils2.default.round(number * 100, 3).toFixed(1);
    }
  }, {
    key: 'bitcoin',
    value: function bitcoin(number) {
      if (!number) {
        return '';
      }
      return _Utils2.default.round(number, 1).toFixed(1);
    }
  }, {
    key: 'addPlusSign',
    value: function addPlusSign(number) {
      if (number.search('-')) {
        return '+' + number;
      }
      return number;
    }
  }]);

  return Format;
}();

exports.default = Format;