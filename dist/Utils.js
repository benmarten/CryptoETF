"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "pad",
    value: function pad(width, string, padding) {
      return width <= string.length ? string : this.pad(width, padding + string, padding);
    }
  }, {
    key: "getSortedKeys",
    value: function getSortedKeys(object, keyName) {
      var keys = [];
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys.sort(function (a, b) {
        var ax = object[a][keyName];
        var bx = object[b][keyName];
        return ax - bx;
      });
    }

    /**
     * Round a float to given number of decimal places.
     * @param num The number to round.
     * @param places The number of decimal places.
     */

  }, {
    key: "round",
    value: function round(num, places) {
      places = places ? places : 0;
      var normalizer = Math.pow(10, places);
      return Math.round(num * normalizer) / normalizer;
    }
  }]);

  return Utils;
}();

exports.default = Utils;