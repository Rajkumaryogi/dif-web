"use strict";

var ContactCard = require('../models/ContactCard');

exports.getTeamMembers = function _callee(req, res) {
  var teamMembers;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(ContactCard.find().sort({
            order: 1
          }));

        case 3:
          teamMembers = _context.sent;

          if (!(!teamMembers || teamMembers.length === 0)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            success: false,
            message: 'No team members found'
          }));

        case 6:
          res.status(200).json({
            success: true,
            data: teamMembers
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching team members:', _context.t0);
          res.status(500).json({
            success: false,
            message: 'Server error while fetching team members'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getTeamMembersForPage = function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(ContactCard.find().sort({
            order: 1
          }).lean());

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching team members:', _context2.t0);
          return _context2.abrupt("return", null);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; //Admin