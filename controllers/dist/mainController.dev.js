"use strict";

exports.getHome = function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('controller ok');
          _context.prev = 1;
          return _context.abrupt("return", res.status(200).json({
            message: 'Tout est ok'
          }));

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(500).json({
            message: 'nok',
            data: _context.t0
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 5]]);
};