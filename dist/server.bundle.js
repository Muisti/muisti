/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 86);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react-intl");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-bootstrap");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setStorage = setStorage;
	exports.getToken = getToken;
	exports.getTokenPayload = getTokenPayload;
	exports.setToken = setToken;
	exports.removeToken = removeToken;

	var _jwtSimple = __webpack_require__(17);

	var jwt = _interopRequireWildcard(_jwtSimple);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var ownStorage = false;

	function setStorage(s) {
	    ownStorage = s;
	}

	function getToken() {
	    if (ownStorage) {
	        var token = ownStorage.getItem("token");
	        if (!token) {
	            return "";
	        }
	        return ownStorage.getItem("token");
	    } else {
	        return "";
	    }
	}

	function getTokenPayload() {
	    var token = getToken();
	    if (!token) {
	        return null;
	    }
	    return jwt.decode(token, "token", true);
	}

	function setToken(token) {
	    if (ownStorage) {
	        ownStorage.setItem("token", token);
	    }
	}

	function removeToken() {
	    if (ownStorage) {
	        ownStorage.removeItem("token");
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.decodeTokenFromRequest = exports.updateUser = exports.getToken = exports.addUser = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var addUser = exports.addUser = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
	    var userIsInDatabase, newUser;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            if (!(!req.body.user.name || !req.body.user.surname || !req.body.user.email || !req.body.user.password)) {
	              _context.next = 2;
	              break;
	            }

	            return _context.abrupt('return', res.status(403).end());

	          case 2:
	            _context.next = 4;
	            return _user2.default.findOne({ email: req.params.email });

	          case 4:
	            userIsInDatabase = _context.sent;

	            if (!userIsInDatabase) {
	              _context.next = 7;
	              break;
	            }

	            return _context.abrupt('return', res.status(403).end());

	          case 7:
	            newUser = new _user2.default(req.body.user);

	            newUser.cuid = (0, _cuid2.default)();
	            newUser.confirmation = (0, _cuid2.default)();

	            //this line is temporary code allowing developers to create account
	            //without confirmation emails: accounts surname must start with letter 'M'
	            if (newUser.surname.startsWith("M")) newUser.confirmation = "confirmed";

	            return _context.abrupt('return', newUser.save().then(function () {
	              return sendConfirmationEmail(req.body.url, newUser);
	            })
	            // we care security - not send confirmation code to client
	            .then(function () {
	              return res.json({ user: _extends({}, newUser, { confirmation: "" }) });
	            }).catch(function (err) {
	              return res.status(500).send(err);
	            }));

	          case 12:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function addUser(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var getToken = exports.getToken = function () {
	  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
	    var _this = this;

	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.next = 2;
	            return _user2.default.findOne({ email: req.params.email }).exec(function () {
	              var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(err, user) {
	                var isAdmin, payload, secret, token;
	                return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                  while (1) {
	                    switch (_context2.prev = _context2.next) {
	                      case 0:
	                        if (!err) {
	                          _context2.next = 2;
	                          break;
	                        }

	                        return _context2.abrupt('return', res.status(500).send(err));

	                      case 2:
	                        if (!(user == null)) {
	                          _context2.next = 4;
	                          break;
	                        }

	                        return _context2.abrupt('return', res.json({ token: "emailNotValid" }));

	                      case 4:
	                        if (!(!bcrypt.compareSync(req.params.password, user.password) && req.params.password != (0, _sanitizeHtml2.default)(user.password))) {
	                          _context2.next = 6;
	                          break;
	                        }

	                        return _context2.abrupt('return', res.status(500).send(err));

	                      case 6:
	                        if (isUserAccountConfirmed(user)) {
	                          _context2.next = 8;
	                          break;
	                        }

	                        return _context2.abrupt('return', res.json({ token: "notConfirmed" }));

	                      case 8:
	                        _context2.next = 10;
	                        return (0, _util.isAdminCuid)(user.cuid);

	                      case 10:
	                        isAdmin = _context2.sent;
	                        payload = { cuid: user.cuid, user: user.name, time: Date.now(), isAdmin: isAdmin };
	                        _context2.next = 14;
	                        return (0, _util.getKey)();

	                      case 14:
	                        secret = _context2.sent;
	                        token = jwt.encode(payload, secret);
	                        return _context2.abrupt('return', res.json({ token: token }));

	                      case 17:
	                      case 'end':
	                        return _context2.stop();
	                    }
	                  }
	                }, _callee2, _this);
	              }));

	              return function (_x5, _x6) {
	                return _ref3.apply(this, arguments);
	              };
	            }());

	          case 2:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function getToken(_x3, _x4) {
	    return _ref2.apply(this, arguments);
	  };
	}();

	var updateUser = exports.updateUser = function () {
	  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
	    var userIsInDatabase;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            if (!(!req.body.user.name || !req.body.user.surname || !req.body.user.email || !req.body.user.password || !req.body.user.cuid)) {
	              _context4.next = 2;
	              break;
	            }

	            return _context4.abrupt('return', res.status(403).end());

	          case 2:
	            _context4.next = 4;
	            return _user2.default.findOne({ email: req.params.email });

	          case 4:
	            userIsInDatabase = _context4.sent;

	            if (!userIsInDatabase) {
	              _context4.next = 8;
	              break;
	            }

	            if (!(req.body.user.cuid != userIsInDatabase.cuid)) {
	              _context4.next = 8;
	              break;
	            }

	            return _context4.abrupt('return', res.status(500).end());

	          case 8:
	            _context4.next = 10;
	            return _user2.default.findOneAndUpdate({ cuid: req.body.user.cuid }, { name: req.body.user.name,
	              surname: req.body.user.surname, email: req.body.user.email,
	              password: req.body.user.password
	            }, { new: true }).exec(function (err, doc) {
	              if (err) {
	                return res.status(500).send(err);
	              }

	              if (!doc) {
	                return res.status(403).end();
	              }

	              var modifiedUser = doc.toObject();
	              return res.json({ user: modifiedUser });
	            });

	          case 10:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));

	  return function updateUser(_x7, _x8) {
	    return _ref4.apply(this, arguments);
	  };
	}();

	var decodeTokenFromRequest = exports.decodeTokenFromRequest = function () {
	  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req) {
	    var token, secret;
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            token = req.get('authorization');

	            if (!(token && token != 'null')) {
	              _context5.next = 14;
	              break;
	            }

	            _context5.prev = 2;
	            _context5.next = 5;
	            return (0, _util.getKey)();

	          case 5:
	            secret = _context5.sent;
	            return _context5.abrupt('return', jwt.decode(token, secret));

	          case 9:
	            _context5.prev = 9;
	            _context5.t0 = _context5['catch'](2);
	            return _context5.abrupt('return', null);

	          case 12:
	            _context5.next = 15;
	            break;

	          case 14:
	            return _context5.abrupt('return', null);

	          case 15:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this, [[2, 9]]);
	  }));

	  return function decodeTokenFromRequest(_x9) {
	    return _ref5.apply(this, arguments);
	  };
	}();

	/**
	 * client-side code sends url (window.hostname) with request to addUser,
	 * this function uses it to build confirmation link
	 */

	var sendConfirmationEmail = function () {
	  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(ownUrl, user) {
	    var transporter, confirmationUrl, link, content, mailOptions;
	    return regeneratorRuntime.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            _context6.t0 = mailer;
	            _context6.next = 3;
	            return (0, _util.getEmailHost)();

	          case 3:
	            _context6.t1 = _context6.sent;
	            _context6.next = 6;
	            return (0, _util.getEmail)();

	          case 6:
	            _context6.t2 = _context6.sent;
	            _context6.next = 9;
	            return (0, _util.getPassword)();

	          case 9:
	            _context6.t3 = _context6.sent;
	            _context6.t4 = {
	              user: _context6.t2,
	              pass: _context6.t3
	            };
	            _context6.t5 = {
	              rejectUnauthorized: false
	            };
	            _context6.t6 = {
	              host: _context6.t1,
	              secure: true,
	              port: 465,
	              auth: _context6.t4,
	              tls: _context6.t5
	            };
	            transporter = _context6.t0.createTransport.call(_context6.t0, _context6.t6);
	            confirmationUrl = ownUrl + "/confirm/" + user.confirmation;
	            link = "<a href=" + confirmationUrl + ">" + confirmationUrl + "</a>";
	            content = "Olet rekisteröitynyt muistisovellukseen. Vahvistaaksesi rekisteröinnin paina linkkiä: " + link;
	            mailOptions = {
	              from: '"Muistisovellus " <muistivahvistus@gmail.com>',
	              to: user.email,
	              subject: 'rekisteröinnin vahvistus',
	              html: "<b>" + content + "</b>"
	            };
	            return _context6.abrupt('return', transporter.sendMail(mailOptions));

	          case 19:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, this);
	  }));

	  return function sendConfirmationEmail(_x10, _x11) {
	    return _ref6.apply(this, arguments);
	  };
	}();

	exports.getUsers = getUsers;
	exports.getUser = getUser;
	exports.getUserByCuid = getUserByCuid;
	exports.confirmUserAccount = confirmUserAccount;

	var _user = __webpack_require__(22);

	var _user2 = _interopRequireDefault(_user);

	var _cuid = __webpack_require__(7);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _bcryptjs = __webpack_require__(16);

	var bcrypt = _interopRequireWildcard(_bcryptjs);

	var _jwtSimple = __webpack_require__(17);

	var jwt = _interopRequireWildcard(_jwtSimple);

	var _nodemailer = __webpack_require__(92);

	var mailer = _interopRequireWildcard(_nodemailer);

	var _sanitizeHtml = __webpack_require__(23);

	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

	var _util = __webpack_require__(25);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function getUsers(req, res) {
	  _user2.default.find().sort('-dateAdded').exec(function (err, users) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    return res.json({ users: users });
	  });
	}

	function getUser(req, res) {
	  _user2.default.findOne({ email: req.params.email }).exec(function (err, user) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    return res.json({ user: user });
	  });
	}

	//Used in post.controller to find the username for post
	function getUserByCuid(req, res) {
	  _user2.default.findOne({ cuid: req.params.cuid }).exec(function (err, user) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    return res.json({ user: user });
	  });
	}

	;

	/**
	 * if there is user with confirmation-field's value matching
	 * code-pathparameter, then confirmation-field is set "confirmed"
	 * and json { confirmed: true } is returned.
	 */
	function confirmUserAccount(req, res) {

	  return _user2.default.findOne({ confirmation: req.params.code }).exec().then(function (user) {
	    if (!user) {
	      return res.status(404).end();
	    }
	    user.confirmation = "confirmed";
	    return user.save().then(function () {
	      return res.json({ confirmed: true });
	    });
	  }).catch(function (err) {
	    return res.status(500).send(err);
	  });
	}

	function isUserAccountConfirmed(user) {
	  return user.confirmation == "confirmed";
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("cuid");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EDIT_MODULE = exports.DELETE_MODULE = exports.ADD_MODULES = exports.ADD_MODULE = undefined;
	exports.addModule = addModule;
	exports.editModule = editModule;
	exports.addModules = addModules;
	exports.deleteModule = deleteModule;
	exports.fetchModules = fetchModules;
	exports.deleteModuleRequest = deleteModuleRequest;
	exports.fetchModule = fetchModule;
	exports.fetchSections = fetchSections;
	exports.addModuleRequest = addModuleRequest;
	exports.editModuleRequest = editModuleRequest;

	var _apiCaller = __webpack_require__(10);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Export Constants
	var ADD_MODULE = exports.ADD_MODULE = 'ADD_MODULE';
	var ADD_MODULES = exports.ADD_MODULES = 'ADD_MODULES';
	var DELETE_MODULE = exports.DELETE_MODULE = 'DELETE_MODULE';
	var EDIT_MODULE = exports.EDIT_MODULE = 'EDIT_MODULE';

	// Export Actions

	function addModule(module) {
	  return {
	    type: ADD_MODULE,
	    module: module
	  };
	}

	/**  */

	function editModule(module) {
	  return {
	    type: EDIT_MODULE,
	    module: module
	  };
	}

	function addModules(modules) {
	  return {
	    type: ADD_MODULES,
	    modules: modules
	  };
	}

	function deleteModule(cuid) {
	  return {
	    type: DELETE_MODULE,
	    cuid: cuid
	  };
	}

	function fetchModules() {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('modules', 'get').then(function (res) {
	      dispatch(addModules(res.modules));
	      return res.modules;
	    });
	  };
	}

	function deleteModuleRequest(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('modules/' + cuid, 'delete').then(function () {
	      return dispatch(deleteModule(cuid));
	    });
	  };
	}

	function fetchModule(title) {
	  return (0, _apiCaller2.default)('modules/' + title).then(function (res) {
	    return res.module;
	  });
	}

	function fetchSections(moduleCuid) {
	  return (0, _apiCaller2.default)('sections/' + moduleCuid).then(function (res) {
	    return res.sections;
	  });
	}

	function addModuleRequest(module) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('modules', 'post', { module: module }).then(function (res) {
	      return dispatch(addModule(res.module));
	    });
	  };
	}

	function editModuleRequest(module) {
	  return (0, _apiCaller2.default)('modules', 'put', { module: module }).then(function (res) {
	    return res.module;
	  });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.API_URL = undefined;
	exports.default = callApi;

	var _isomorphicFetch = __webpack_require__(91);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _config = __webpack_require__(24);

	var _config2 = _interopRequireDefault(_config);

	var _authStorage = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var API_URL = exports.API_URL = typeof window === 'undefined' || process.env.NODE_ENV === 'test' ? process.env.BASE_URL || 'http://localhost:' + (process.env.PORT || _config2.default.port) + '/api' : '/api';

	function callApi(endpoint) {
	  var method = arguments.length <= 1 || arguments[1] === undefined ? 'get' : arguments[1];
	  var body = arguments[2];


	  return (0, _isomorphicFetch2.default)(API_URL + '/' + endpoint, {
	    headers: { 'content-type': 'application/json', 'authorization': (0, _authStorage.getToken)() },
	    method: method,
	    body: JSON.stringify(body)
	  }).then(function (response) {
	    return response.json().then(function (json) {
	      return { json: json, response: response };
	    });
	  }).then(function (_ref) {
	    var json = _ref.json;
	    var response = _ref.response;

	    if (!response.ok) {
	      return Promise.reject(json);
	    }

	    return json;
	  }).then(function (response) {
	    return response;
	  }, function (error) {
	    return error;
	  });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});
	exports.addSectionRequest = addSectionRequest;
	exports.deleteSectionRequest = deleteSectionRequest;
	exports.editSectionRequest = editSectionRequest;
	exports.fetchSections = fetchSections;

	var _apiCaller = __webpack_require__(10);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addSectionRequest(section) {
	        return (0, _apiCaller2.default)('sections', 'post', { section: section }).then(function (res) {
	                return res.section;
	        });
	}

	function deleteSectionRequest(cuid) {
	        return (0, _apiCaller2.default)('sections/' + cuid, 'delete').then(function (res) {
	                return res;
	        });
	}

	function editSectionRequest(section) {
	        return (0, _apiCaller2.default)('sections', 'put', { section: section }).then(function (res) {
	                return res.section;
	        });
	}

	function fetchSections(moduleCuid) {
	        return (0, _apiCaller2.default)('sections/' + moduleCuid).then(function (res) {
	                return res.sections;
	        });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(2);

	var _reactIntl = __webpack_require__(1);

	var _SectionCreateModal = __webpack_require__(32);

	var _SectionCreateModal2 = _interopRequireDefault(_SectionCreateModal);

	var _SectionFactory = __webpack_require__(67);

	var _SectionFactory2 = _interopRequireDefault(_SectionFactory);

	var _ModuleListItem = __webpack_require__(31);

	var _ModuleListItem2 = _interopRequireDefault(_ModuleListItem);

	var _Section = __webpack_require__(66);

	var _Section2 = _interopRequireDefault(_Section);

	var _ModuleActions = __webpack_require__(9);

	var _SectionActions = __webpack_require__(11);

	var _authStorage = __webpack_require__(3);

	var _QuizActions = __webpack_require__(13);

	var _styles = __webpack_require__(15);

	var _ModuleList = {
	  "panel-heading": "ModuleList__panel-heading__3s4vL",
	  "hidden": "ModuleList__hidden__1v3nT",
	  "textarea": "ModuleList__textarea__16BvW"
	};

	var _ModuleList2 = _interopRequireDefault(_ModuleList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'submitBack'
	});

	var ModulePage = function (_Component) {
	  _inherits(ModulePage, _Component);

	  function ModulePage(props) {
	    _classCallCheck(this, ModulePage);

	    var _this = _possibleConstructorReturn(this, (ModulePage.__proto__ || Object.getPrototypeOf(ModulePage)).call(this, props));

	    _this.addToState = function (newSection) {
	      var newSections = [];
	      newSections = _this.state.sections.filter(function (sec) {
	        return sec.cuid !== newSection.cuid;
	      });
	      newSections.push(newSection);
	      newSections.sort(function (a, b) {
	        return a.orderNumber - b.orderNumber;
	      });
	      _this.setState({ sections: newSections });
	    };

	    _this.handleAddSection = function (newSection) {
	      newSection.moduleCuid = _this.state.module.cuid;
	      newSection.orderNumber = _this.state.sections.length;
	      newSection.quizzes = [];
	      (0, _SectionActions.addSectionRequest)(newSection).then(function (savedSection) {
	        _this.addToState(savedSection);
	      });
	    };

	    _this.handleEditSection = function (oldSection) {
	      return function (content, title, link) {
	        var editedSection = {};
	        //constructed by combining old and new
	        var thisSection = oldSection;
	        editedSection.cuid = thisSection.cuid;
	        editedSection.content = content;
	        editedSection.title = title;
	        editedSection.link = link;
	        editedSection.quizzes = thisSection.quizzes;

	        //Order number changing is not implemented yet.
	        editedSection.orderNumber = thisSection.orderNumber;

	        _this.addToState(editedSection);

	        (0, _SectionActions.editSectionRequest)(editedSection);
	      };
	    };

	    _this.panelHeader = function (section) {
	      return _jsx('div', {
	        className: 'clearfix'
	      }, void 0, _jsx('div', {
	        className: _ModuleList2.default['panel-heading']
	      }, void 0, section.title ? section.title : '', _this.panelButtonsForAdmin(section)));
	    };

	    _this.panelButtonsForAdmin = function (section) {
	      if ((0, _authStorage.getTokenPayload)() && (0, _authStorage.getTokenPayload)().isAdmin && section.cuid) {
	        return _jsx('span', {}, void 0, _jsx(_reactBootstrap.Button, {
	          className: 'pull-right',
	          bsStyle: 'danger',
	          bsSize: 'xsmall',
	          onClick: _this.handleDeleteSection(section)
	        }, void 0, 'Poista section'), _jsx(_SectionCreateModal2.default, {
	          editSection: _this.handleEditSection(section),
	          section: section
	        }));
	      }
	    };

	    _this.handleDeleteSection = function (section) {
	      return function (e) {
	        e.stopPropagation();
	        //  if (window.confirm('Haluatko varmasti poistaa sectionin?')) {
	        (0, _SectionActions.deleteSectionRequest)(section.cuid).then(_this.setState({ sections: _this.state.sections.filter(function (sec) {
	            return sec.cuid !== section.cuid;
	          }) }));
	        //  }
	      };
	    };

	    _this.state = { module: _this.props.module, sections: [] };
	    return _this;
	  }

	  /*
	   * gets all sections associated the module then
	   * gets the scores for all sections then
	   * goes through all quizzes within sections and lastly
	   * set the quiz points as they're saved inside scores
	   */


	  _createClass(ModulePage, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      (0, _SectionActions.fetchSections)(this.props.module.cuid).then(function (sections) {
	        return (0, _QuizActions.fetchScores)().then(function (scoreboard) {
	          if (!sections) sections = [];
	          if (scoreboard) {
	            sections.forEach(function (sec) {
	              return sec.quizzes.forEach(function (qui) {
	                var poi = scoreboard.scores.find(function (sco) {
	                  return sco.quizCuid == qui.cuid;
	                });
	                qui.points = poi ? poi.quizPoints : 0;
	              });
	            });
	          }
	          _this2.setState({ sections: sections });
	        });
	      });
	    }

	    //Sections have to be sorted or edited section would be rendered as last.

	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var i = 0;
	      if (!(0, _authStorage.getTokenPayload)()) {
	        this.props.addElementFunctionToMainview();
	      }

	      return _jsx('div', {}, void 0, _jsx(_reactBootstrap.PageHeader, {}, void 0, ' ', _jsx(_reactBootstrap.Button, {
	        onClick: function onClick() {
	          return _this3.props.addElementFunctionToMainview();
	        }
	      }, void 0, '←', _ref), ' ', this.state.module.title), _jsx(_reactBootstrap.Well, {}, void 0, _jsx('div', {
	        className: _ModuleList2.default.textarea
	      }, void 0, this.state.module.info)), this.state.sections.map(function (section) {
	        return _jsx(_reactBootstrap.Panel, {
	          collapsible: true,
	          defaultExpanded: true,
	          header: _this3.panelHeader(section),
	          eventKey: ++i
	        }, i, _jsx(_Section2.default, {
	          section: section
	        }));
	      }), _jsx('div', {
	        style: (0, _styles.show)((0, _authStorage.getTokenPayload)() && (0, _authStorage.getTokenPayload)().isAdmin)
	      }, void 0, _jsx(_SectionCreateModal2.default, {
	        moduleCuid: this.state.module.cuid,
	        addSection: this.handleAddSection
	      })));
	    }
	  }]);

	  return ModulePage;
	}(_react.Component);

	exports.default = ModulePage;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addQuizRequest = addQuizRequest;
	exports.editQuizRequest = editQuizRequest;
	exports.deleteQuizRequest = deleteQuizRequest;
	exports.fetchScores = fetchScores;
	exports.sendScoreRequest = sendScoreRequest;

	var _apiCaller = __webpack_require__(10);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addQuizRequest(quiz) {
	  return (0, _apiCaller2.default)('quizzes', 'post', { quiz: quiz }).then(function (res) {
	    return res.quiz;
	  });
	}

	function editQuizRequest(quiz) {
	  return (0, _apiCaller2.default)('quizzes', 'put', { quiz: quiz }).then(function (res) {
	    return res.quiz;
	  });
	}

	function deleteQuizRequest(cuid) {
	  return (0, _apiCaller2.default)('quizzes/' + cuid, 'delete').then(function (res) {
	    return res;
	  });
	}

	function fetchScores() {
	  return (0, _apiCaller2.default)('scores', 'get').then(function (res) {
	    return res.scores;
	  });
	}

	function sendScoreRequest(quizzes) {
	  return (0, _apiCaller2.default)('scores', 'put', { quizzes: quizzes }).then(function (res) {
	    return res.score;
	  });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addUserRequest = addUserRequest;
	exports.fetchUser = fetchUser;
	exports.fetchUserByCuid = fetchUserByCuid;
	exports.fetchToken = fetchToken;
	exports.confirmUserAccountRequest = confirmUserAccountRequest;
	exports.editUserRequest = editUserRequest;

	var _apiCaller = __webpack_require__(10);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addUserRequest(user) {
	    return (0, _apiCaller2.default)('users', 'post', {
	        user: user,
	        //url is used to construct confirmation link for email
	        url: window.location.protocol + "//" + window.location.host
	    });
	};

	function fetchUser(email) {
	    return (0, _apiCaller2.default)('users/' + email).then(function (res) {
	        return res.user;
	    });
	}

	function fetchUserByCuid(cuid) {
	    return (0, _apiCaller2.default)('user/' + cuid).then(function (res) {
	        return res.user;
	    });
	}

	function fetchToken(email, password, callback) {
	    return (0, _apiCaller2.default)('login/' + email + '/' + password).then(function (res) {
	        return callback(res.token);
	    });
	}

	function confirmUserAccountRequest(code, resultCallback) {
	    return (0, _apiCaller2.default)('confirmation/' + code).then(function (res) {
	        return resultCallback(res.confirmed);
	    });
	}

	function editUserRequest(user) {
	    return (0, _apiCaller2.default)('users', 'put', {
	        user: {
	            cuid: user.cuid,
	            name: user.name,
	            surname: user.surname,
	            email: user.email,
	            password: user.password
	        }
	    }).then(function (res) {
	        return res.user;
	    });
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.show = show;
	exports.showStyle = showStyle;

	//usage <div style={show(true)} />
	function show(condition) {
	    return condition ? {} : { display: 'none' };
	}

	//usage <div {...showStyle(true)} />
	function showStyle(condition) {
	    return { style: show(condition) };
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("bcryptjs");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("jwt-simple");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AlertModal = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.basicAlert = basicAlert;
	exports.errorAlert = errorAlert;

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactIntl = __webpack_require__(1);

	var _reactBootstrap = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* This is general component for showing alert messages to user through modal.
	 * Message content is received through message-prop. 
	 * Modal is hided until message is non-null. Message can be plain text or jsx.
	 * User can close modal by clickin "Ok"-button in modals footer.
	 * 
	 * basicAlert and errorAlert are helper methods to construct jsx-message with
	 * title and clearly visible text content. 
	*/

	var Body = _reactBootstrap.Modal.Body;
	var Footer = _reactBootstrap.Modal.Footer;

	var AlertModal = exports.AlertModal = function (_Component) {
	    _inherits(AlertModal, _Component);

	    function AlertModal(props) {
	        _classCallCheck(this, AlertModal);

	        var _this = _possibleConstructorReturn(this, (AlertModal.__proto__ || Object.getPrototypeOf(AlertModal)).call(this, props));

	        _this.close = function () {
	            return _this.setState({ closed: true });
	        };

	        _this.update = function () {
	            if (_this.props.message != _this.state.oldMessage) {
	                _this.state = { closed: false, oldMessage: _this.props.message };
	            }
	        };

	        _this.state = { closed: false, oldMessage: null };
	        return _this;
	    }

	    _createClass(AlertModal, [{
	        key: 'render',
	        value: function render() {
	            this.update();
	            return _jsx(_reactBootstrap.Modal, {
	                show: this.props.message && !this.state.closed
	            }, void 0, _jsx(Body, {}, void 0, this.props.message), _jsx(Footer, {}, void 0, _jsx(_reactBootstrap.Button, {
	                onClick: this.close
	            }, void 0, 'Ok')));
	        }
	    }]);

	    return AlertModal;
	}(_react.Component);

	var _ref = _jsx('br', {});

	function basicAlert(title, message) {
	    return _jsx('div', {}, void 0, _jsx('h2', {}, void 0, title), _ref, _jsx('h4', {}, void 0, message));
	}

	function errorAlert(title, message) {
	    return _jsx(_reactBootstrap.Alert, {
	        bsStyle: 'danger'
	    }, void 0, _jsx('h3', {}, void 0, title), message);
	}

	exports.default = AlertModal;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EDIT_POST = exports.DELETE_POST = exports.ADD_POSTS = exports.ADD_POST = undefined;
	exports.addPost = addPost;
	exports.editPost = editPost;
	exports.editPostRequest = editPostRequest;
	exports.addPostRequest = addPostRequest;
	exports.addPosts = addPosts;
	exports.fetchPosts = fetchPosts;
	exports.fetchPost = fetchPost;
	exports.deletePost = deletePost;
	exports.deletePostRequest = deletePostRequest;

	var _apiCaller = __webpack_require__(10);

	var _apiCaller2 = _interopRequireDefault(_apiCaller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Export Constants
	var ADD_POST = exports.ADD_POST = 'ADD_POST';
	var ADD_POSTS = exports.ADD_POSTS = 'ADD_POSTS';
	var DELETE_POST = exports.DELETE_POST = 'DELETE_POST';
	var EDIT_POST = exports.EDIT_POST = 'EDIT_POST';

	// Export Actions

	function addPost(post) {
	  return {
	    type: ADD_POST,
	    post: post
	  };
	}

	/**  */

	function editPost(post) {
	  return {
	    type: EDIT_POST,
	    post: post
	  };
	}

	function editPostRequest(post) {

	  return function (dispatch) {
	    (0, _apiCaller2.default)('posts', 'put', {
	      post: {
	        cuid: post.cuid,
	        name: post.name,
	        content: post.content,
	        dateAdded: post.dateAdded
	      }
	    }).then(function (res) {
	      dispatch(editPost(res.post));
	    });
	  };
	}

	function addPostRequest(post) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts', 'post', {
	      post: {
	        content: post.content,
	        shared: post.shared
	      }
	    }).then(function (res) {
	      return dispatch(addPost(res.post));
	    });
	  };
	}

	function addPosts(posts) {
	  return {
	    type: ADD_POSTS,
	    posts: posts
	  };
	}

	function fetchPosts() {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts', 'get').then(function (res) {
	      dispatch(addPosts(res.posts));
	      return res.posts;
	    });
	  };
	}

	function fetchPost(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts/' + cuid).then(function (res) {
	      return dispatch(addPost(res.post));
	    });
	  };
	}

	function deletePost(cuid) {
	  return {
	    type: DELETE_POST,
	    cuid: cuid
	  };
	}

	function deletePostRequest(cuid) {
	  return function (dispatch) {
	    return (0, _apiCaller2.default)('posts/' + cuid, 'delete').then(function () {
	      return dispatch(deletePost(cuid));
	    });
	  };
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(8);

	var _reactIntl = __webpack_require__(1);

	var _reactBootstrap = __webpack_require__(2);

	var _PostListPage = {
	  "topBar": "PostListPage__topBar__1wW3a",
	  "nameTitle": "PostListPage__nameTitle__2fHy0",
	  "hidden": "PostListPage__hidden__3phEb"
	};

	var _PostListPage2 = _interopRequireDefault(_PostListPage);

	var _UserActions = __webpack_require__(14);

	var _authStorage = __webpack_require__(3);

	var _styles = __webpack_require__(15);

	var _PostList = __webpack_require__(69);

	var _PostList2 = _interopRequireDefault(_PostList);

	var _ModuleList = __webpack_require__(65);

	var _ModuleList2 = _interopRequireDefault(_ModuleList);

	var _PostCreateWidget = __webpack_require__(68);

	var _PostCreateWidget2 = _interopRequireDefault(_PostCreateWidget);

	var _AlertModal = __webpack_require__(19);

	var _AlertModal2 = _interopRequireDefault(_AlertModal);

	var _PostActions = __webpack_require__(20);

	var _PostReducer = __webpack_require__(33);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import Components


	// Import Actions


	// Import Selectors


	var PostListPage = function (_Component) {
	  _inherits(PostListPage, _Component);

	  function PostListPage(props) {
	    _classCallCheck(this, PostListPage);

	    var _this = _possibleConstructorReturn(this, (PostListPage.__proto__ || Object.getPrototypeOf(PostListPage)).call(this, props));

	    _this.mainView = function () {
	      return [_this.postElement, _this.moduleListElement];
	    };

	    _this.renderElements = [];
	    _this.editingPost = null;

	    _this.handleDeletePost = function (post) {
	      if (window.confirm('Haluatko varmasti poistaa viestin?')) {
	        // eslint-disable-line
	        _this.props.dispatch((0, _PostActions.deletePostRequest)(post));
	      }
	    };

	    _this.handleAddPost = function (content, shared) {
	      _this.toggleAddPost();
	      _this.props.dispatch((0, _PostActions.addPostRequest)({ content: content, shared: shared }));
	      _this.props.dispatch((0, _PostActions.fetchPosts)());
	    };

	    _this.handleEditPost = function (post) {
	      _this.toggleAddPost();
	      _this.props.dispatch((0, _PostActions.editPostRequest)(post));
	      setTimeout(100);
	      _this.editingPost = null;
	    };

	    _this.handleHidePost = function () {
	      _this.toggleAddPost();
	      _this.editingPost = null;
	    };

	    _this.openEditPost = function (post) {
	      _this.editingPost = post;
	      _this.toggleAddPost();
	    };

	    _this.openAddPost = function () {
	      _this.setState({ showAddPost: true });
	    };

	    _this.closeAddPost = function () {
	      _this.setState({ showAddPost: false });
	    };

	    _this.toggleAddPost = function () {
	      _this.setState({ showAddPost: !_this.state.showAddPost });
	    };

	    _this.showAddButton = function () {
	      return !_this.state.showAddPost && (0, _authStorage.getToken)();
	    };

	    _this.moduleListElement = function () {
	      return _jsx(_reactBootstrap.Col, {
	        xs: 12,
	        sm: 9
	      }, void 0, _jsx(_ModuleList2.default, {
	        addElementFunctionToMainview: _this.addToElementFunctionsArray
	      }));
	    };

	    _this.postElement = function () {
	      return _jsx(_reactBootstrap.Col, {
	        xs: 12,
	        sm: 3
	      }, void 0, _jsx('div', {
	        style: (0, _styles.show)((0, _authStorage.getToken)())
	      }, void 0, _jsx(_PostCreateWidget2.default, {
	        addPost: _this.handleAddPost,
	        showAddPost: _this.state.showAddPost,
	        hideAddPost: _this.handleHidePost,
	        editPost: _this.handleEditPost,
	        originalPost: _this.editingPost,
	        toggleAddPost: _this.toggleAddPost
	      })), _jsx(_PostList2.default, {
	        handleDeletePost: _this.handleDeletePost,
	        posts: _this.props.posts,
	        handleEditPost: _this.openEditPost
	      }));
	    };

	    _this.addToElementFunctionsArray = function () {
	      var elementFunction = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


	      if (!elementFunction) {
	        _this.setState({ renderFunctionsArray: _this.mainView() });
	      } else {
	        _this.setState({ renderFunctionsArray: [].concat(_toConsumableArray(_this.state.renderFunctionsArray), [elementFunction]) });
	      }
	      _this.putElementsInRenderArray();
	    };

	    _this.putElementsInRenderArray = function () {
	      _this.renderElements = [];
	      var element;

	      _this.state.renderFunctionsArray.some(function (f) {
	        element = f();
	        if (element.length) {
	          _this.renderElements = element;
	        } else {
	          _this.renderElements = [].concat(_toConsumableArray(_this.renderElements), [f()]);
	        }
	        return element.length;
	      });
	    };

	    _this.state = { showAddPost: false, name: "Opetusmateriaali" };
	    _this.state = { renderFunctionsArray: [_this.postElement, _this.moduleListElement] };

	    return _this;
	  }

	  _createClass(PostListPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      this.props.dispatch((0, _PostActions.fetchPosts)());

	      if (this.props.params.confirmCode) {
	        (0, _UserActions.confirmUserAccountRequest)(this.props.params.confirmCode, function (success) {
	          _this2.setState({
	            alert: success ? (0, _AlertModal.basicAlert)("Käyttäjätunnuksesi on vahvistettu!", "Voit kirjautua sisään sähköpostillasi.") : (0, _AlertModal.errorAlert)("Käyttäjätunnuksen vahvistaminen epäonnistui!", "Ota yhteys ylläpitäjään.") });
	        });
	      }
	    }

	    /*
	      Function that is given to all children as a prop, so that
	      they could update main page render function (ergo give new 
	      view element to their parent). 
	    */

	    /*
	      Creates component view from element functions to be given 
	      to render function. 
	    */

	  }, {
	    key: 'render',
	    value: function render() {

	      this.putElementsInRenderArray();

	      return _jsx('div', {}, void 0, _jsx(_reactBootstrap.Grid, {}, void 0, _jsx(_reactBootstrap.Row, {
	        className: 'show-grid'
	      }, void 0, this.renderElements)), _jsx(_AlertModal2.default, {
	        message: this.state.alert
	      }));
	    }
	  }]);

	  return PostListPage;
	}(_react.Component);

	// Actions required to provide data for this component to render in sever side.
	//PostListPage.need = [() => { return fetchPosts(); }];

	// Retrieve data from store as props


	function mapStateToProps(state) {
	  return {
	    posts: (0, _PostReducer.getPosts)(state)
	  };
	}

	PostListPage.contextTypes = {
	  router: _react2.default.PropTypes.object
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PostListPage);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema;

	/**
	 * 
	 */
	var userSchema = new Schema({
	  name: { type: 'String', required: true },
	  surname: { type: 'String', required: true },
	  email: { type: 'String', required: true },
	  password: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  dateAdded: { type: 'Date', default: Date.now, required: true },
	  confirmation: { type: 'String', required: true }
	});

	userSchema.pre('remove', function (next) {

	  this.model('Score').remove({ userCuid: this.cuid }, next);
	});

	exports.default = _mongoose2.default.model('User', userSchema);

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("sanitize-html");

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = {
	  mongoURL: process.env.MONGO_URL,
	  port: process.env.PORT || 8000
	};

	exports.default = config;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isAdminCuid = exports.getEmailHost = exports.getEmail = exports.getPassword = exports.getKey = exports.fetchUtil = undefined;

	var fetchUtil = exports.fetchUtil = function () {
	    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	            while (1) {
	                switch (_context.prev = _context.next) {
	                    case 0:
	                        if (savedUtil) {
	                            _context.next = 9;
	                            break;
	                        }

	                        _context.next = 3;
	                        return _util2.default.findOne({}).exec();

	                    case 3:
	                        _context.t0 = _context.sent;

	                        if (_context.t0) {
	                            _context.next = 6;
	                            break;
	                        }

	                        _context.t0 = new _util2.default();

	                    case 6:
	                        savedUtil = _context.t0;
	                        _context.next = 9;
	                        return putUtil();

	                    case 9:
	                    case 'end':
	                        return _context.stop();
	                }
	            }
	        }, _callee, this);
	    }));

	    return function fetchUtil() {
	        return _ref.apply(this, arguments);
	    };
	}();

	var putUtil = function () {
	    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
	        var _this = this;

	        var newadmin, email, epassword, smtp, doUpdate;
	        return regeneratorRuntime.wrap(function _callee3$(_context3) {
	            while (1) {
	                switch (_context3.prev = _context3.next) {
	                    case 0:
	                        newadmin = getEnv("NEWADMIN");
	                        email = getEnv("EMAIL");
	                        epassword = getEnv("EPASSW");
	                        smtp = getEnv("EMAILHOST");
	                        doUpdate = !savedUtil.key || newadmin || email || epassword;

	                        if (!newadmin) {
	                            _context3.next = 7;
	                            break;
	                        }

	                        return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
	                            var user;
	                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                                while (1) {
	                                    switch (_context2.prev = _context2.next) {
	                                        case 0:
	                                            _context2.next = 2;
	                                            return _user2.default.findOne({ email: newadmin }).exec();

	                                        case 2:
	                                            user = _context2.sent;

	                                            if (user && !savedUtil.admins.find(function (admin) {
	                                                return admin.adminCuid === user.cuid;
	                                            })) {
	                                                savedUtil.admins.push({ adminCuid: user.cuid });
	                                                console.log(savedUtil.admins);
	                                            }

	                                        case 4:
	                                        case 'end':
	                                            return _context2.stop();
	                                    }
	                                }
	                            }, _callee2, _this);
	                        })(), 't0', 7);

	                    case 7:
	                        if (email && smtp) {
	                            savedUtil.emailAddress = email;
	                            savedUtil.emailHost = smtp;
	                        }
	                        if (epassword) {
	                            savedUtil.emailPassword = epassword;
	                        }
	                        if (epassword && email || !savedUtil.key) {
	                            savedUtil.key = (0, _cuid2.default)();
	                        }

	                        if (!doUpdate) {
	                            _context3.next = 13;
	                            break;
	                        }

	                        _context3.next = 13;
	                        return savedUtil.save();

	                    case 13:
	                    case 'end':
	                        return _context3.stop();
	                }
	            }
	        }, _callee3, this);
	    }));

	    return function putUtil() {
	        return _ref2.apply(this, arguments);
	    };
	}();

	var getKey = exports.getKey = function () {
	    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
	        return regeneratorRuntime.wrap(function _callee4$(_context4) {
	            while (1) {
	                switch (_context4.prev = _context4.next) {
	                    case 0:
	                        _context4.next = 2;
	                        return fetchUtil();

	                    case 2:
	                        return _context4.abrupt('return', savedUtil.key);

	                    case 3:
	                    case 'end':
	                        return _context4.stop();
	                }
	            }
	        }, _callee4, this);
	    }));

	    return function getKey() {
	        return _ref3.apply(this, arguments);
	    };
	}();

	var getPassword = exports.getPassword = function () {
	    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
	        return regeneratorRuntime.wrap(function _callee5$(_context5) {
	            while (1) {
	                switch (_context5.prev = _context5.next) {
	                    case 0:
	                        _context5.next = 2;
	                        return fetchUtil();

	                    case 2:
	                        return _context5.abrupt('return', savedUtil.emailPassword);

	                    case 3:
	                    case 'end':
	                        return _context5.stop();
	                }
	            }
	        }, _callee5, this);
	    }));

	    return function getPassword() {
	        return _ref4.apply(this, arguments);
	    };
	}();

	var getEmail = exports.getEmail = function () {
	    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
	        return regeneratorRuntime.wrap(function _callee6$(_context6) {
	            while (1) {
	                switch (_context6.prev = _context6.next) {
	                    case 0:
	                        _context6.next = 2;
	                        return fetchUtil();

	                    case 2:
	                        return _context6.abrupt('return', savedUtil.emailAddress);

	                    case 3:
	                    case 'end':
	                        return _context6.stop();
	                }
	            }
	        }, _callee6, this);
	    }));

	    return function getEmail() {
	        return _ref5.apply(this, arguments);
	    };
	}();

	var getEmailHost = exports.getEmailHost = function () {
	    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
	        return regeneratorRuntime.wrap(function _callee7$(_context7) {
	            while (1) {
	                switch (_context7.prev = _context7.next) {
	                    case 0:
	                        _context7.next = 2;
	                        return fetchUtil();

	                    case 2:
	                        return _context7.abrupt('return', savedUtil.emailHost);

	                    case 3:
	                    case 'end':
	                        return _context7.stop();
	                }
	            }
	        }, _callee7, this);
	    }));

	    return function getEmailHost() {
	        return _ref6.apply(this, arguments);
	    };
	}();

	var isAdminCuid = exports.isAdminCuid = function () {
	    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(cuid) {
	        return regeneratorRuntime.wrap(function _callee8$(_context8) {
	            while (1) {
	                switch (_context8.prev = _context8.next) {
	                    case 0:
	                        _context8.next = 2;
	                        return fetchUtil();

	                    case 2:
	                        return _context8.abrupt('return', savedUtil.admins.find(function (admin) {
	                            return admin.adminCuid === cuid;
	                        }) !== undefined);

	                    case 3:
	                    case 'end':
	                        return _context8.stop();
	                }
	            }
	        }, _callee8, this);
	    }));

	    return function isAdminCuid(_x) {
	        return _ref7.apply(this, arguments);
	    };
	}();

	var _util = __webpack_require__(85);

	var _util2 = _interopRequireDefault(_util);

	var _user = __webpack_require__(22);

	var _user2 = _interopRequireDefault(_user);

	var _cuid = __webpack_require__(7);

	var _cuid2 = _interopRequireDefault(_cuid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	var savedUtil = null;

	function getEnv(name) {
	    if (process.env[name]) {
	        return process.env[name];
	    }
	    var regex = '"' + name + '=([^="]*)"';
	    if (!process.env.npm_config_argv) {
	        console.log("VERSION MISMATCH, UNABLE TO PARSE ENV ARGUMENTS");
	        return null;
	    }
	    var match = process.env.npm_config_argv.match(regex);
	    if (match) {
	        return match[1];
	    }
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.localizationData = exports.enabledLanguages = undefined;

	var _reactIntl = __webpack_require__(1);

	var _intl = __webpack_require__(88);

	var _intl2 = _interopRequireDefault(_intl);

	__webpack_require__(89);

	var _en = __webpack_require__(96);

	var _en2 = _interopRequireDefault(_en);

	var _en3 = __webpack_require__(56);

	var _en4 = _interopRequireDefault(_en3);

	__webpack_require__(90);

	var _fi = __webpack_require__(97);

	var _fi2 = _interopRequireDefault(_fi);

	var _fi3 = __webpack_require__(57);

	var _fi4 = _interopRequireDefault(_fi3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// list of available languages
	var enabledLanguages = exports.enabledLanguages = ['en', 'fi'];

	// this object will have language-specific data added to it which will be placed in the state when that language is active
	// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages
	var localizationData = exports.localizationData = {};

	// here you bring in 'intl' browser polyfill and language-specific polyfills
	// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
	// as well as react-intl's language-specific data
	// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)


	// need Intl polyfill, Intl not supported in Safari

	global.Intl = _intl2.default;

	// use this to allow nested messages, taken from docs:
	// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
	function flattenMessages() {
	  var nestedMessages = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  return Object.keys(nestedMessages).reduce(function (messages, key) {
	    var value = nestedMessages[key];
	    var prefixedKey = prefix ? prefix + '.' + key : key;

	    if (typeof value === 'string') {
	      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
	    } else {
	      Object.assign(messages, flattenMessages(value, prefixedKey));
	    }

	    return messages;
	  }, {});
	}

	// bring in intl polyfill, react-intl, and app-specific language data

	(0, _reactIntl.addLocaleData)(_en2.default);
	localizationData.en = _en4.default;
	localizationData.en.messages = flattenMessages(localizationData.en.messages);

	(0, _reactIntl.addLocaleData)(_fi2.default);
	localizationData.fi = _fi4.default;
	localizationData.fi.messages = flattenMessages(localizationData.fi.messages);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SWITCH_LANGUAGE = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.switchLanguage = switchLanguage;

	var _setup = __webpack_require__(28);

	// Export Constants
	var SWITCH_LANGUAGE = exports.SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

	function switchLanguage(newLang) {
	  return _extends({
	    type: SWITCH_LANGUAGE
	  }, _setup.localizationData[newLang]);
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getModules = undefined;

	var _ModuleActions = __webpack_require__(9);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var initialState = { modules: [] };

	var ModuleReducer = function ModuleReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _ModuleActions.ADD_MODULE:
	      return {
	        modules: [action.module].concat(_toConsumableArray(state.modules))
	      };

	    case _ModuleActions.ADD_MODULES:
	      return {
	        modules: action.modules
	      };

	    case _ModuleActions.DELETE_MODULE:
	      return {
	        modules: state.modules.filter(function (module) {
	          return module.cuid !== action.cuid;
	        })
	      };

	    case _ModuleActions.EDIT_MODULE:
	      {

	        return {
	          modules: [action.module].concat(_toConsumableArray(state.modules.filter(function (module) {
	            return module.cuid !== action.module.cuid;
	          })))
	        };
	      }

	    default:
	      return state;
	  }
	};

	var getModules = exports.getModules = function getModules(state) {
	  return state.modules.modules.sort(function (m1, m2) {
	    return m1.orderNumber - m2.orderNumber;
	  });
	};

	exports.default = ModuleReducer;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ModuleListItem = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(2);

	var _reactIntl = __webpack_require__(1);

	var _authStorage = __webpack_require__(3);

	var _ModuleActions = __webpack_require__(9);

	var _ModulePage = __webpack_require__(12);

	var _ModulePage2 = _interopRequireDefault(_ModulePage);

	var _ModuleList = {
	  "panel-heading": "ModuleList__panel-heading__3s4vL",
	  "hidden": "ModuleList__hidden__1v3nT",
	  "textarea": "ModuleList__textarea__16BvW"
	};

	var _ModuleList2 = _interopRequireDefault(_ModuleList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/*
	 * ModuleListItem is a single module in the list of modules.
	 * ModuleListItem is rendered when the user clicks on the header of a panel
	 * which is located in ModuleList.js
	 */

	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'submitGo'
	});

	var ModuleListItem = exports.ModuleListItem = function (_Component) {
	  _inherits(ModuleListItem, _Component);

	  function ModuleListItem(props) {
	    _classCallCheck(this, ModuleListItem);

	    var _this = _possibleConstructorReturn(this, (ModuleListItem.__proto__ || Object.getPrototypeOf(ModuleListItem)).call(this, props));

	    _this.modulePageElement = function () {
	      return [_jsx(_reactBootstrap.Col, {}, void 0, _jsx(_ModulePage2.default, {
	        module: _this.state.module,
	        addElementFunctionToMainview: _this.props.addElementFunctionToMainview
	      }))];
	    };

	    _this.state = { module: _this.props.module };
	    return _this;
	  }

	  _createClass(ModuleListItem, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _jsx('div', {}, void 0, _jsx('div', {
	        className: _ModuleList2.default.textarea
	      }, void 0, this.props.module.info), _jsx(_reactBootstrap.Button, {
	        onClick: function onClick() {
	          return _this2.props.addElementFunctionToMainview(_this2.modulePageElement);
	        },
	        className: (0, _authStorage.getTokenPayload)() ? 'btn btn-default pull-right' : 'hidden'
	      }, void 0, _ref, '→'));
	    }
	  }]);

	  return ModuleListItem;
	}(_react.Component);

	exports.default = ModuleListItem;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SectionCreateModal = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(2);

	var _reactIntl = __webpack_require__(1);

	var _SectionActions = __webpack_require__(11);

	var _validator = __webpack_require__(38);

	var _validator2 = _interopRequireDefault(_validator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = _reactBootstrap.Modal.Header;
	var Title = _reactBootstrap.Modal.Title;
	var Body = _reactBootstrap.Modal.Body;
	var Footer = _reactBootstrap.Modal.Footer;

	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'sectionLinknotValid'
	});

	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'addSection'
	});

	var _ref3 = _jsx(Header, {
	  closeButton: true
	}, void 0, _jsx(Title, {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'addingSection'
	})));

	var _ref4 = _jsx(_reactBootstrap.ControlLabel, {}, void 0, ' ', _jsx(_reactIntl.FormattedMessage, {
	  id: 'sectionTitle'
	}), ' ');

	var _ref5 = _jsx(_reactBootstrap.ControlLabel, {}, void 0, ' ', _jsx(_reactIntl.FormattedMessage, {
	  id: 'sectionContent'
	}), ' ');

	var _ref6 = _jsx(_reactBootstrap.ControlLabel, {}, void 0, ' ', _jsx(_reactIntl.FormattedMessage, {
	  id: 'sectionLink'
	}), ' ');

	var _ref7 = _jsx(_reactBootstrap.Button, {
	  type: 'submit',
	  bsStyle: 'primary'
	}, void 0, ' ', _jsx(_reactIntl.FormattedMessage, {
	  id: 'submitAdd'
	}), ' ');

	var _ref8 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'cancel'
	});

	var SectionCreateModal = exports.SectionCreateModal = function (_Component) {
	  _inherits(SectionCreateModal, _Component);

	  function SectionCreateModal(props) {
	    _classCallCheck(this, SectionCreateModal);

	    var _this = _possibleConstructorReturn(this, (SectionCreateModal.__proto__ || Object.getPrototypeOf(SectionCreateModal)).call(this, props));

	    _this.clearFields = function () {
	      _this.setState({ formTitle: "", formContent: "", formLink: "" });
	    };

	    _this.close = function () {
	      _this.setState({ showModal: false });
	    };

	    _this.open = function () {
	      _this.setState({ showModal: true });
	    };

	    _this.openEditor = function (e) {
	      e.stopPropagation();
	      _this.setState({ showModal: true, formTitle: _this.props.section.title,
	        formContent: _this.props.section.content, formLink: _this.props.section.link });
	    };

	    _this.handleTitleChange = function (e) {
	      _this.setState({ formTitle: e.target.value });
	    };

	    _this.handleContentChange = function (e) {
	      _this.setState({ formContent: e.target.value });
	    };

	    _this.handleLinkChange = function (e) {
	      _this.setState({ formLink: e.target.value, error: "" });
	    };

	    _this.sendSection = function (e) {
	      if (e) e.preventDefault();
	      _this.setState({ error: _this.validateLink() });

	      //Jos molemmat pakollisista kentistä, tai ei URL niin validointi false
	      if (!_this.state.formContent && !_this.state.formLink || _this.validateLink()) return false;

	      var newSection = {};
	      newSection.content = _this.state.formContent;
	      newSection.title = _this.state.formTitle;
	      newSection.link = _this.state.formLink;

	      if (_this.props.editSection) {
	        _this.props.editSection(newSection.content, newSection.title, newSection.link);
	      } else {
	        _this.props.addSection(newSection);
	      }
	      _this.clearFields();
	      _this.close();
	    };

	    _this.validateLink = function () {
	      if (_this.state.formLink && !_validator2.default.isURL(_this.state.formLink)) return _ref;else return "";
	    };

	    _this.chooseButton = function () {
	      if (!_this.props.editSection) {
	        return _jsx(_reactBootstrap.Button, {
	          onClick: _this.open,
	          bsStyle: 'primary'
	        }, void 0, _ref2);
	      } else {
	        return _jsx(_reactBootstrap.Button, {
	          onClick: _this.openEditor,
	          bsStyle: 'warning',
	          bsSize: 'xsmall',
	          className: 'pull-right'
	        }, void 0, 'MUOKKAA SECTIONIA');
	      }
	    };

	    _this.state = { showModal: false };
	    return _this;
	  }

	  _createClass(SectionCreateModal, [{
	    key: 'render',
	    value: function render() {
	      return _jsx('span', {}, void 0, this.chooseButton(), _jsx(_reactBootstrap.Modal, {
	        show: this.state.showModal,
	        onHide: this.close,
	        bsSize: 'large',
	        'aria-labelledby': 'contained-modal-title-lg'
	      }, void 0, _ref3, _jsx('form', {
	        onSubmit: this.sendSection
	      }, void 0, _jsx(Body, {}, void 0, _ref4, _jsx(_reactBootstrap.FormControl, {
	        type: 'text',
	        value: this.state.formTitle,
	        onChange: this.handleTitleChange,
	        placeholder: this.props.intl.messages.sectionTitle
	      }), _ref5, _jsx(_reactBootstrap.FormControl, {
	        componentClass: 'textarea',
	        value: this.state.formContent,
	        onChange: this.handleContentChange,
	        placeholder: this.props.intl.messages.sectionContent
	      }), _ref6, _jsx(_reactBootstrap.FormControl, {
	        type: 'text',
	        value: this.state.formLink,
	        onChange: this.handleLinkChange,
	        placeholder: this.props.intl.messages.sectionLink
	      })), _jsx(Footer, {}, void 0, _jsx('div', {
	        className: this.state.error ? '' : 'hidden'
	      }, void 0, _jsx(_reactBootstrap.Alert, {
	        bsStyle: 'warning'
	      }, void 0, _jsx('b', {}, void 0, this.state.error))), _ref7, _jsx(_reactBootstrap.Button, {
	        onClick: this.close
	      }, void 0, ' ', _ref8, ' ')))));
	    }
	  }]);

	  return SectionCreateModal;
	}(_react.Component);

	exports.default = (0, _reactIntl.injectIntl)(SectionCreateModal);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPost = exports.getPosts = undefined;

	var _PostActions = __webpack_require__(20);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	// Initial State
	var initialState = { data: [] };

	var PostReducer = function PostReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _PostActions.ADD_POST:
	      return {
	        data: [action.post].concat(_toConsumableArray(state.data))
	      };

	    case _PostActions.ADD_POSTS:
	      return {
	        data: action.posts
	      };

	    case _PostActions.DELETE_POST:
	      return {
	        data: state.data.filter(function (post) {
	          return post.cuid !== action.cuid;
	        })
	      };

	    case _PostActions.EDIT_POST:
	      {

	        return {
	          data: [action.post].concat(_toConsumableArray(state.data.filter(function (post) {
	            return post.cuid !== action.post.cuid;
	          })))
	        };
	      }

	    default:
	      return state;
	  }
	};

	/* Selectors */

	// Get all posts
	var getPosts = exports.getPosts = function getPosts(state) {
	  return state.posts.data;
	};

	// Get post by cuid
	var getPost = exports.getPost = function getPost(state, cuid) {
	  return state.posts.data.filter(function (post) {
	    return post.cuid === cuid;
	  })[0];
	};

	// Export Reducer
	exports.default = PostReducer;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateQuiz = exports.deleteQuiz = exports.addQuiz = exports.getQuizzesForSection = exports.getQuizzes = undefined;

	var getQuizzes = exports.getQuizzes = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            token = (0, _user.decodeTokenFromRequest)(req);

	            if (token) {
	              _context.next = 3;
	              break;
	            }

	            return _context.abrupt('return', res.status(403).end());

	          case 3:

	            _quiz2.default.find({ sectionCuid: req.params.sectionCuid }).exec(function (err, quizzes) {
	              if (err) {
	                return res.status(500).send(err);
	              }
	              return res.json({ quizzes: quizzes });
	            });

	          case 4:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function getQuizzes(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var getQuizzesForSection = exports.getQuizzesForSection = function () {
	  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(section) {
	    var quizzes;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return _quiz2.default.find({ sectionCuid: section.cuid }).exec();

	          case 2:
	            quizzes = _context2.sent;
	            return _context2.abrupt('return', quizzes);

	          case 4:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function getQuizzesForSection(_x3) {
	    return _ref2.apply(this, arguments);
	  };
	}();

	var addQuiz = exports.addQuiz = function () {
	  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
	    var token, quiz, newQuiz;
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.next = 2;
	            return (0, _user.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context3.sent;
	            quiz = req.body.quiz;

	            if (!(!token || !token.isAdmin || !quiz || !quiz.sectionCuid || !quiz.question || !quiz.options)) {
	              _context3.next = 6;
	              break;
	            }

	            return _context3.abrupt('return', res.status(403).end());

	          case 6:
	            newQuiz = new _quiz2.default(quiz);

	            newQuiz.cuid = (0, _cuid2.default)();

	            return _context3.abrupt('return', newQuiz.save().then(function () {
	              return res.json({ quiz: newQuiz });
	            }).catch(function (err) {
	              return res.status(500).send(err);
	            }));

	          case 9:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function addQuiz(_x4, _x5) {
	    return _ref3.apply(this, arguments);
	  };
	}();

	var deleteQuiz = exports.deleteQuiz = function () {
	  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            _context4.next = 2;
	            return (0, _user.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context4.sent;

	            if (!(!token || !token.isAdmin)) {
	              _context4.next = 5;
	              break;
	            }

	            return _context4.abrupt('return', res.status(403).end());

	          case 5:

	            _quiz2.default.findOne({ cuid: req.params.cuid }).exec(function (err, quiz) {
	              if (err) {
	                return res.status(500).send(err);
	              } else if (!quiz) {
	                return res.status(404).end();
	              }
	              return quiz.remove(function () {
	                return res.status(200).end();
	              });
	            });

	          case 6:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));

	  return function deleteQuiz(_x6, _x7) {
	    return _ref4.apply(this, arguments);
	  };
	}();

	var updateQuiz = exports.updateQuiz = function () {
	  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
	    var token, quiz;
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            _context5.next = 2;
	            return (0, _user.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context5.sent;

	            if (!(!token || !token.isAdmin)) {
	              _context5.next = 5;
	              break;
	            }

	            return _context5.abrupt('return', res.status(403).end());

	          case 5:
	            quiz = req.body.quiz;
	            _context5.next = 8;
	            return _quiz2.default.findOne({ cuid: quiz.cuid }).exec(function (err, q) {
	              if (err) return res.status(500).send(err);
	              if (!q) {
	                return res.status(404).end();
	              }
	              if (!areOptionsEqual(q.options, quiz.options)) {
	                (0, _score.removeScorefromScoresArrays)(q.cuid);
	              }
	            });

	          case 8:
	            _context5.next = 10;
	            return _quiz2.default.update({ cuid: quiz.cuid }, { question: quiz.question,
	              options: quiz.options }, function (err) {
	              if (err) return res.status(500).send(err);

	              return res.json({ quiz: quiz });
	            });

	          case 10:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this);
	  }));

	  return function updateQuiz(_x8, _x9) {
	    return _ref5.apply(this, arguments);
	  };
	}();

	var _quiz = __webpack_require__(82);

	var _quiz2 = _interopRequireDefault(_quiz);

	var _cuid = __webpack_require__(7);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _score = __webpack_require__(35);

	var _user = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function areOptionsEqual(arr1, arr2) {
	  if (arr1.length != arr2.length) {
	    return false;
	  }
	  if (arr1.find(function (obj) {
	    return !arr2.find(function (obj2) {
	      return obj.text === obj2.text && obj.answer === obj2.answer;
	    });
	  })) {
	    return false;
	  }
	  return true;
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setScore = exports.getScores = exports.removeScorefromScoresArrays = undefined;

	var removeScorefromScoresArrays = exports.removeScorefromScoresArrays = function () {
	    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(cuid) {
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	            while (1) {
	                switch (_context.prev = _context.next) {
	                    case 0:
	                        _score2.default.update({}, { $pull: { scores: { quizCuid: cuid } } }, { multi: true }, next);

	                    case 1:
	                    case 'end':
	                        return _context.stop();
	                }
	            }
	        }, _callee, this);
	    }));

	    return function removeScorefromScoresArrays(_x) {
	        return _ref.apply(this, arguments);
	    };
	}();

	var getScores = exports.getScores = function () {
	    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
	        var token;
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	            while (1) {
	                switch (_context2.prev = _context2.next) {
	                    case 0:
	                        _context2.next = 2;
	                        return (0, _user.decodeTokenFromRequest)(req);

	                    case 2:
	                        token = _context2.sent;

	                        if (token) {
	                            _context2.next = 5;
	                            break;
	                        }

	                        return _context2.abrupt('return', res.status(403).end());

	                    case 5:
	                        _score2.default.findOne({ userCuid: token.cuid }).exec(function (err, scores) {
	                            if (err) {
	                                return res.status(500).send(err);
	                            }
	                            return res.json({ scores: scores });
	                        });

	                    case 6:
	                    case 'end':
	                        return _context2.stop();
	                }
	            }
	        }, _callee2, this);
	    }));

	    return function getScores(_x2, _x3) {
	        return _ref2.apply(this, arguments);
	    };
	}();

	var setScore = exports.setScore = function () {
	    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
	        var token, quizzes, foundScore;
	        return regeneratorRuntime.wrap(function _callee3$(_context3) {
	            while (1) {
	                switch (_context3.prev = _context3.next) {
	                    case 0:
	                        _context3.next = 2;
	                        return (0, _user.decodeTokenFromRequest)(req);

	                    case 2:
	                        token = _context3.sent;
	                        quizzes = req.body.quizzes;

	                        if (token) {
	                            _context3.next = 6;
	                            break;
	                        }

	                        return _context3.abrupt('return', res.status(403).end());

	                    case 6:
	                        _context3.next = 8;
	                        return _score2.default.findOne({ userCuid: token.cuid }).exec();

	                    case 8:
	                        foundScore = _context3.sent;

	                        if (!foundScore) {
	                            foundScore = new _score2.default({ userCuid: token.cuid, scores: [] });
	                        }

	                        quizzes.forEach(function (quiz) {
	                            var newScore = { quizCuid: quiz.cuid, quizPoints: quiz.points };
	                            foundScore.scores = foundScore.scores.filter(function (s) {
	                                return s.quizCuid != quiz.cuid;
	                            });
	                            foundScore.scores.push(newScore);
	                        });
	                        foundScore.save().then(function () {
	                            return res.json({ score: foundScore });
	                        }).catch(function (err) {
	                            return res.status(500).send(err);
	                        });

	                    case 12:
	                    case 'end':
	                        return _context3.stop();
	                }
	            }
	        }, _callee3, this);
	    }));

	    return function setScore(_x4, _x5) {
	        return _ref3.apply(this, arguments);
	    };
	}();

	var _score = __webpack_require__(83);

	var _score2 = _interopRequireDefault(_score);

	var _user = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("validator");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IntlWrapper = IntlWrapper;

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactIntl = __webpack_require__(1);

	var _reactRedux = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function IntlWrapper(props) {
	  return _react2.default.createElement(
	    _reactIntl.IntlProvider,
	    props.intl,
	    props.children
	  );
	}

	// Retrieve data from store as props
	function mapStateToProps(store) {
	  return {
	    intl: store.intl
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(IntlWrapper);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); /* eslint-disable global-require */


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(18);

	var _App = __webpack_require__(58);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// require.ensure polyfill for node
	if (false) {
	  require.ensure = function requireModule(deps, callback) {
	    callback(require);
	  };
	}

	/* Workaround for async react routes to work with react-hot-reloader till
	  https://github.com/reactjs/react-router/issues/2182 and
	  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  // Require async routes only in development for react-hot-reloader to work.
	  __webpack_require__(21);
	  __webpack_require__(12);
	}

	// react-router setup with code-splitting
	// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
	exports.default = _jsx(_reactRouter.Route, {
	  path: '/',
	  component: _App2.default
	}, void 0, _jsx(_reactRouter.IndexRoute, {
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(21).default);
	    }).bind(null, __webpack_require__));
	  }
	}), _jsx(_reactRouter.Route, {
	  path: '/module/:title',
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(12).default);
	    }).bind(null, __webpack_require__));
	  }
	}), _jsx(_reactRouter.Route, {
	  path: '/confirm/:confirmCode',
	  getComponent: function getComponent(nextState, cb) {
	    Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	      cb(null, __webpack_require__(21).default);
	    }).bind(null, __webpack_require__));
	  }
	}));

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureStore = configureStore;

	var _redux = __webpack_require__(37);

	var _reduxThunk = __webpack_require__(102);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _DevTools = __webpack_require__(59);

	var _DevTools2 = _interopRequireDefault(_DevTools);

	var _reducers = __webpack_require__(76);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Main store function
	 */
	function configureStore() {
	  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  // Middleware and store enhancers
	  var enhancers = [(0, _redux.applyMiddleware)(_reduxThunk2.default)];

	  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
	    // Enable DevTools only when rendering on client and during development.
	    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : _DevTools2.default.instrument());
	  }

	  var store = (0, _redux.createStore)(_reducers2.default, initialState, _redux.compose.apply(undefined, enhancers));

	  // For hot reloading reducers
	  if (false) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept('./reducers', function () {
	      var nextReducer = require('./reducers').default; // eslint-disable-line global-require
	      store.replaceReducer(nextReducer);
	    });
	  }

	  return store;
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _module = __webpack_require__(77);

	var ModuleController = _interopRequireWildcard(_module);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	//Get all modules
	router.route('/modules').get(ModuleController.getModules);
	//Get one module by title
	router.route('/modules/:title').get(ModuleController.getModule);
	//Add new module
	router.route('/modules').post(ModuleController.addModule);
	//Update a module
	router.route('/modules').put(ModuleController.updateModule);
	//Delete a module with cuid
	router.route('/modules/:cuid').delete(ModuleController.deleteModule);

	exports.default = router;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _post = __webpack_require__(78);

	var PostController = _interopRequireWildcard(_post);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	// Get all Posts
	router.route('/posts').get(PostController.getPosts);
	// Get one post by cuid
	router.route('/posts/:cuid').get(PostController.getPost);
	// Add a new Post
	router.route('/posts').post(PostController.addPost);
	// Edit old post
	router.route('/posts').put(PostController.updatePost);
	// Delete a post by cuid
	router.route('/posts/:cuid').delete(PostController.deletePost);

	exports.default = router;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _quiz = __webpack_require__(34);

	var QuizController = _interopRequireWildcard(_quiz);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.route('/quizzes/:sectionCuid').get(QuizController.getQuizzes);

	router.route('/quizzes').post(QuizController.addQuiz);

	router.route('/quizzes').put(QuizController.updateQuiz);

	router.route('/quizzes/:cuid').delete(QuizController.deleteQuiz);

	exports.default = router;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _score = __webpack_require__(35);

	var ScoreController = _interopRequireWildcard(_score);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	// Get all Scores
	router.route('/scores').get(ScoreController.getScores);

	// Update one score
	router.route('/scores').put(ScoreController.setScore);

	exports.default = router;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _section = __webpack_require__(79);

	var SectionController = _interopRequireWildcard(_section);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	router.route('/sections/:moduleCuid').get(SectionController.getSections);

	router.route('/sections').post(SectionController.addSection);

	router.route('/sections/:cuid').delete(SectionController.deleteSection);

	router.route('/sections').put(SectionController.updateSection);

	exports.default = router;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(5);

	var _user = __webpack_require__(6);

	var UserController = _interopRequireWildcard(_user);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var router = new _express.Router();

	//Add a new user
	router.route('/users').post(UserController.addUser);

	router.route('/users').get(UserController.getUsers);

	router.route('/users').put(UserController.updateUser);

	router.route('/users/:email').get(UserController.getUser);

	router.route('/user/:cuid').get(UserController.getUserByCuid);

	router.route('/login/:email/:password').get(UserController.getToken);

	//Confirm user account (through link sent in confirmation email)
	router.route('/confirmation/:code').get(UserController.confirmUserAccount);

	exports.default = router;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchComponentData = fetchComponentData;

	var _promiseUtils = __webpack_require__(87);

	function fetchComponentData(store, components, params) {
	  var needs = components.reduce(function (prev, current) {
	    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
	  }, []);

	  return (0, _promiseUtils.sequence)(needs, function (need) {
	    return store.dispatch(need(params, store.getState()));
	  });
	} /*
	  Utility function to fetch required data for component to render in server side.
	  This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
	  */

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var webpack = __webpack_require__(27);
	var cssnext = __webpack_require__(93);
	var postcssFocus = __webpack_require__(94);
	var postcssReporter = __webpack_require__(95);

	module.exports = {
	  devtool: 'cheap-module-eval-source-map',

	  entry: {
	    app: ['eventsource-polyfill', 'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './client/index.js'],
	    vendor: ['react', 'react-dom']
	  },

	  output: {
	    path: __dirname,
	    filename: 'app.js',
	    publicPath: 'http://0.0.0.0:8000/'
	  },

	  resolve: {
	    extensions: ['', '.js', '.jsx'],
	    modules: ['client', 'node_modules']
	  },

	  module: {
	    loaders: [{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader'
	    }, {
	      test: /\.css$/,
	      include: /node_modules/,
	      loaders: ['style-loader', 'css-loader']
	    }, {
	      test: /\.jsx*$/,
	      exclude: [/node_modules/, /.+\.config.js/],
	      loader: 'babel'
	    }, {
	      test: /\.(jpe?g|gif|png|svg)$/i,
	      loader: 'url-loader?limit=10000'
	    }, {
	      test: /\.json$/,
	      loader: 'json-loader'
	    }]
	  },

	  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendor',
	    minChunks: Infinity,
	    filename: 'vendor.js'
	  }), new webpack.DefinePlugin({
	    'process.env': {
	      CLIENT: JSON.stringify(true),
	      'NODE_ENV': JSON.stringify('development')
	    }
	  })],

	  postcss: function postcss() {
	    return [postcssFocus(), cssnext({
	      browsers: ['last 2 versions', 'IE > 10']
	    }), postcssReporter({
	      clearMessages: true
	    })];
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'en',
	  messages: {
	    //General
	    siteTitle: 'Memoryproject',
	    switchLanguage: 'Switch Language',
	    logInUser: 'Hello {user}',
	    twitterMessage: 'We are on Twitter',
	    submitAdd: 'Add',
	    submitCreate: 'Create',
	    submitEdit: 'Save',
	    submitRemove: 'Remove',
	    submitGo: 'Go',
	    submitBack: 'Back',
	    cancel: 'Cancel',
	    //Posts
	    addPost: 'Add Post',
	    deletePost: 'Delete post',
	    editPostLink: "Edit post",
	    createNewPost: 'Create new post',
	    editPost: "Edit post",
	    authorName: 'Author\'s Name',
	    postTitle: 'Post Title',
	    postContent: 'Post Content',
	    isPrivate: 'Private',
	    by: 'By',
	    //Modules
	    addModule: 'Add module',
	    deleteModule: 'Delete module',
	    moduleTitle: 'Header',
	    moduleContent: 'Introduction',
	    //Sections
	    addSection: 'Add section',
	    deleteSection: 'Delete section',
	    sectionTitle: 'Section header, optional',
	    sectionContent: 'Section content',
	    sectionLink: 'Link to Multimediacontent (images, videos etc.)',
	    sectionLinknotValid: 'Not a valid URL',
	    addingSection: 'Adding a new section:',
	    //Quizzes
	    addQuiz: 'Add quiz',
	    addQuizTitle: 'Creating a new quiz',
	    editQuizTitle: 'Editing a quiz',
	    question: 'Question',
	    option: 'Option',
	    rightAnswer: 'This is correct',
	    quizPanelTitle: 'Quizzes',
	    rightAnswerFeedback: 'Congratulations, that is the right answer!',
	    oneWrongAnswer: 'One wrong option!',
	    severalWrongAnswers: 'The number of wrong options: {count}!',
	    selectOption: 'Select at least one option',
	    check: 'Check',
	    //Registration and user control
	    displayRegisterModal: 'Register',
	    displayEditMenuItem: 'Change user information',
	    displayEditModal: 'Send changes',
	    registrationSuccessful_title: 'Registration successful!',
	    registrationSuccessful_info: 'Confirmation link has been sent to your email address.',
	    editSuccessful: 'Changes saved!',
	    editFailed: 'Error when saving changes!',
	    sendConfirmFail: 'Registration failed: Unable to send confirmation email. Is your email address working?',
	    registerTitle: "Register new user",
	    editTitle: "User information control",
	    userAlreadyExists: 'User {user} already exists!',
	    emailNotValid: 'Invalid email address!',
	    nameNotValid: 'Please fill your name and surname correctly.',
	    passwordNotValid: 'Your password is not strong enough. Password minimum length is 8 characters.',
	    verifyError: 'Your password does not match with verification.',
	    formEmail: 'Email',
	    formName: 'First name',
	    formSurname: 'Surname',
	    formPassword: 'Password',
	    formPassVerify: 'Confirm password',
	    notConfirmedTitle: 'Error: Your user account is not confirmed.',
	    notConfirmedInfo: 'Please open the link sent to your email address.',
	    loggingIn: "Logging in...",
	    logInButton: "Log in",
	    logOutButton: 'Log out',
	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t}',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t}',
	    nestedDateComment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} as of {date}'
	  }
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'fi',
	  messages: {
	    //General
	    siteTitle: 'Muistiprojekti',
	    switchLanguage: 'Vaihda kieli',
	    logInUser: 'Hei {user}',
	    twitterMessage: 'Twitter viesti',
	    submitAdd: 'Lisää',
	    submitCreate: 'Luo',
	    submitEdit: 'Tallenna',
	    submitRemove: 'Poista',
	    submitGo: 'Siirry',
	    submitBack: 'Palaa',
	    cancel: 'Peruuta',
	    //Posts
	    addPost: 'Lisää viesti',
	    deletePost: 'Poista',
	    editPostLink: 'Muokkaa',
	    createNewPost: 'Uusi viesti',
	    editPost: 'Muokkaa viestiä',
	    authorName: 'Kirjoittajan nimi',
	    postTitle: 'Postauksen otsikko',
	    postContent: 'Postauksen sisältö',
	    isPrivate: 'Näytä vain minulle',
	    by: 'Tekijä',
	    //Modules
	    addModule: 'Lisää moduuli',
	    deleteModule: 'Poista moduuli',
	    moduleTitle: 'Otsikko',
	    moduleContent: 'Kuvaus',
	    //Sections
	    addSection: 'Lisää osio',
	    deleteSection: 'Poista osio',
	    sectionTitle: 'Osion otsikko, valinnainen',
	    sectionContent: 'Osion sisältö',
	    sectionLink: 'Linkki multimediasisältöön (kuvat, videot ym.)',
	    sectionLinknotValid: 'Ei validi Osoite',
	    addingSection: 'Uuden osion lisäys:',
	    //Quizzes
	    addQuiz: 'Lisää tehtävä',
	    addQuizTitle: 'Luodaan uutta tehtävää',
	    editQuizTitle: 'Muokataan tehtävää',
	    question: 'Kysymys',
	    option: 'Vaihtoehto',
	    rightAnswer: 'Tämä on oikein',
	    quizPanelTitle: 'Tehtävät',
	    rightAnswerFeedback: 'Oikein!',
	    oneWrongAnswer: 'Yksi valinta väärin!',
	    severalWrongAnswers: 'Vääriä valintoja {count}!',
	    selectOption: 'Valitse vähintään yksi vaihtoehto',
	    check: 'Tarkista',
	    //Registration and user control
	    displayRegisterModal: 'Rekisteröidy',
	    displayEditMenuItem: 'Muuta käyttäjän tietoja',
	    displayEditModal: 'Lähetä muutokset',
	    registrationSuccessful_title: 'Rekisteröityminen onnistui!',
	    registrationSuccessful_info: 'Vahvistusviesti on lähetetty sähköpostiisi.',
	    editSuccessful: 'Muokkaukset tallennettu!',
	    editFailed: 'Muokkausten tallentaminen epäonnistui!',
	    sendConfirmFail: 'Rekisteröityminen epäonnistui, koska vahvistusviestiä ei voitu lähettää' + 'Onko sähköpostiosoitteesi toimiva?',
	    registerTitle: "Uuden käyttäjän rekisteröinti",
	    editTitle: "Käyttäjän tietojen hallinta",
	    userAlreadyExists: 'Käyttäjä {user} on jo olemassa!',
	    emailNotValid: 'Sähköpostiosoitteessa on kirjoitusvirhe!',
	    nameNotValid: 'Etunimi tai sukunimi puuttuu.',
	    passwordNotValid: 'Salasana ei ole tarpeeksi vahva.' + ' Salasanan on oltava yli 8 merkkiä pitkä',
	    verifyError: 'Salasanat eivät täsmää. Korjaa kirjoitusvirheet.',
	    formEmail: 'Sähköposti',
	    formName: 'Etunimi',
	    formSurname: 'Sukunimi',
	    formPassword: 'Salasana',
	    formPassVerify: 'Vahvista salasana',
	    notConfirmedTitle: 'Virhe: Käyttäjätilisi rekisteröintiä ei ole vahvistettu.',
	    notConfirmedInfo: "Klikkaa sähköpostiisi lähetetyssä vahvistusviestissä olevaa linkkiä." + " Vahvistamistaminen on tarpeellista huijaustunnusten estämiseksi.",
	    loggingIn: "Kirjaudutaan...",
	    logInButton: "Kirjaudu",
	    logOutButton: 'Kirjaudu ulos',

	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} (in real app this would be translated to Finnish)',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t} (in real app this would be translated to Finnish)',
	    nestedDateComment: 'user {name} {value, plural,\n  \t\t  =0 {does not have any comments}\n  \t\t  =1 {has # comment}\n  \t\t  other {has # comments}\n  \t\t} as of {date} (in real app this would be translated to Finnish)'
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(8);

	var _App = {
	  "container": "App__container__4uEyK"
	};

	var _App2 = _interopRequireDefault(_App);

	var _reactHelmet = __webpack_require__(26);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _PassStorage = __webpack_require__(62);

	var _PassStorage2 = _interopRequireDefault(_PassStorage);

	var _Header = __webpack_require__(60);

	var _Header2 = _interopRequireDefault(_Header);

	var _IntlActions = __webpack_require__(29);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import Style


	// Import Components


	var _ref = _jsx('link', {
	  rel: 'stylesheet',
	  href: 'http://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'
	});

	var _ref2 = _jsx(_PassStorage2.default, {});

	var App = exports.App = function (_Component) {
	  _inherits(App, _Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	    _this.state = { isMounted: false };
	    return _this;
	  }

	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ isMounted: true }); // eslint-disable-line
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _jsx('div', {}, void 0, _ref, _ref2, _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	        title: 'Muistiprojekti',
	        titleTemplate: '%s - Muisti',
	        meta: [{ charset: 'utf-8' }, {
	          'http-equiv': 'X-UA-Compatible',
	          content: 'IE=edge'
	        }, {
	          name: 'viewport',
	          content: 'width=device-width, initial-scale=1'
	        }]
	      }), _jsx(_Header2.default, {
	        switchLanguage: function switchLanguage(lang) {
	          return _this2.props.dispatch((0, _IntlActions.switchLanguage)(lang));
	        },
	        intl: this.props.intl,
	        dispatch: this.props.dispatch
	      }), _jsx('div', {
	        className: _App2.default.container
	      }, void 0, this.props.children)));
	    }
	  }]);

	  return App;
	}(_react.Component);

	// Retrieve data from store as props
	function mapStateToProps(store) {
	  return {
	    intl: store.intl
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reduxDevtools = __webpack_require__(99);

	var _reduxDevtoolsLogMonitor = __webpack_require__(101);

	var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

	var _reduxDevtoolsDockMonitor = __webpack_require__(100);

	var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _reduxDevtools.createDevTools)(_jsx(_reduxDevtoolsDockMonitor2.default, {
	  toggleVisibilityKey: 'ctrl-h',
	  changePositionKey: 'ctrl-w'
	}, void 0, _jsx(_reduxDevtoolsLogMonitor2.default, {})));

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Import Style


	// Import actions


	exports.Header = Header;

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(18);

	var _reactIntl = __webpack_require__(1);

	var _reactBootstrap = __webpack_require__(2);

	var _LoginBox = __webpack_require__(61);

	var _reactDom = __webpack_require__(36);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Header = {
	  "header": "Header__header__2sEZY",
	  "content": "Header__content__1eavA",
	  "site-title": "Header__site-title__UfFn6",
	  "add-post-button": "Header__add-post-button__CkTz6",
	  "language-switcher": "Header__language-switcher__3bviQ",
	  "navigation-bar": "Header__navigation-bar__3dvDl",
	  "selected": "Header__selected__3IRlm",
	  "hide": "Header__hide__fhhif"
	};

	var _Header2 = _interopRequireDefault(_Header);

	var _PostActions = __webpack_require__(20);

	var _ModuleActions = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Heade = _reactBootstrap.Navbar.Header;
	var Brand = _reactBootstrap.Navbar.Brand;
	var Toggle = _reactBootstrap.Navbar.Toggle;
	var Collapse = _reactBootstrap.Navbar.Collapse;

	var _ref = _jsx(Heade, {}, void 0, _jsx(Brand, {}, void 0, _jsx('a', {
	  href: '/'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'siteTitle'
	}))), _jsx(Toggle, {}));

	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'switchLanguage'
	});

	function Header(props) {

	  var languageNodes = props.intl.enabledLanguages.map(function (lang) {
	    return _jsx(_reactBootstrap.MenuItem, {
	      onClick: function onClick() {
	        return props.switchLanguage(lang);
	      },
	      className: lang === props.intl.locale ? _Header2.default.selected : ''
	    }, lang, lang);
	  });

	  return _jsx(_reactBootstrap.Navbar, {}, void 0, _ref, _jsx(Collapse, {}, void 0, _jsx(_reactBootstrap.Nav, {
	    pullRight: true
	  }, void 0, _jsx(_LoginBox.LoginBox, {
	    fetchPosts: function fetchPosts() {
	      return props.dispatch((0, _PostActions.fetchPosts)());
	    },
	    fetchModules: function fetchModules() {
	      return props.dispatch((0, _ModuleActions.fetchModules)());
	    },
	    intl: props.intl
	  }), _jsx(_reactBootstrap.NavDropdown, {
	    eventKey: 2,
	    title: _ref2,
	    id: 'basic-nav-dropdown'
	  }, void 0, languageNodes))));
	}

	Header.contextTypes = {
	  router: _react2.default.PropTypes.object
	};

	exports.default = Header;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LoginBox = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactIntl = __webpack_require__(1);

	var _reactBootstrap = __webpack_require__(2);

	var _bcryptjs = __webpack_require__(16);

	var bcrypt = _interopRequireWildcard(_bcryptjs);

	var _jwtSimple = __webpack_require__(17);

	var jwt = _interopRequireWildcard(_jwtSimple);

	var _reactDom = __webpack_require__(36);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _UserActions = __webpack_require__(14);

	var _UserCreateModal = __webpack_require__(75);

	var _AlertModal = __webpack_require__(19);

	var _AlertModal2 = _interopRequireDefault(_AlertModal);

	var _authStorage = __webpack_require__(3);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Importing components


	var Form = _reactBootstrap.Navbar.Form;
	var Feedback = _reactBootstrap.FormControl.Feedback;

	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'notConfirmedTitle'
	});

	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'notConfirmedInfo'
	});

	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'displayEditMenuItem'
	});

	var _ref4 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'logOutButton'
	});

	var _ref5 = _jsx(Feedback, {});

	var _ref6 = _jsx(Feedback, {});

	var _ref7 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'displayRegisterModal'
	});

	var LoginBox = exports.LoginBox = function (_Component) {
	  _inherits(LoginBox, _Component);

	  function LoginBox() {
	    _classCallCheck(this, LoginBox);

	    var _this = _possibleConstructorReturn(this, (LoginBox.__proto__ || Object.getPrototypeOf(LoginBox)).call(this));

	    _this.emailChange = function (event) {
	      return _this.setState({ validEmail: null });
	    };

	    _this.passwordChange = function (event) {
	      return _this.setState({ validPass: null });
	    };

	    _this.closeModal = function () {
	      _this.setState({ showModal: false });
	    };

	    _this.openModal = function () {
	      _this.setState({ showModal: true });
	    };

	    _this.logIn = function (e) {
	      e.preventDefault();
	      _this.setState({ isLoading: true });
	      console.log("koe");
	      var password = _reactDom2.default.findDOMNode(_this.refs.password).value;
	      var email = _reactDom2.default.findDOMNode(_this.refs.email).value;
	      if (!password || !email) {
	        _this.setValidationState("email");
	      } else {
	        (0, _UserActions.fetchToken)(email, password, _this.checkToken);
	      }
	    };

	    _this.logOut = function () {
	      (0, _authStorage.removeToken)("token");
	      _this.props.fetchPosts();
	      _this.props.fetchModules();
	      _this.setState({});
	    };

	    _this.refreshUser = function (user) {
	      (0, _UserActions.fetchToken)(user.email, user.password, _this.checkToken);
	    };

	    _this.checkToken = function (token) {
	      switch (token) {
	        case undefined:
	          _this.setValidationState("password");
	          break;
	        case "emailNotValid":
	          _this.setValidationState("email");
	          break;
	        case "notConfirmed":
	          _this.setState({ alert: (0, _AlertModal.errorAlert)(_ref, _ref2) });
	          break;
	        default:
	          (0, _authStorage.setToken)(token);
	          _this.setValidationState();
	          _this.props.fetchPosts();
	          _this.props.fetchModules();
	          break;
	      }
	    };

	    _this.state = { validEmail: null, validPass: null,
	      isLoading: false, showModal: false };
	    return _this;
	  }

	  _createClass(LoginBox, [{
	    key: 'setValidationState',
	    value: function setValidationState(invalidState) {
	      this.setState({ isLoading: false });
	      switch (invalidState) {
	        case "password":
	          this.setState({ validEmail: "success" });
	          this.setState({ validPass: "error" });
	          break;
	        case "email":
	          this.setState({ validEmail: "error" });
	          this.setState({ validPass: "warning" });
	          break;
	        default:
	          this.setState({ validEmail: null });
	          this.setState({ validPass: null });
	          break;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var payload = (0, _authStorage.getTokenPayload)();
	      if (payload) {
	        return _jsx(_reactBootstrap.Nav, {
	          pullLeft: true
	        }, void 0, _jsx(_reactBootstrap.NavDropdown, {
	          title: _jsx(_reactIntl.FormattedMessage, {
	            id: 'logInUser',
	            values: { user: payload.user + '!' }
	          })
	        }, void 0, _jsx(_reactBootstrap.MenuItem, {
	          eventKey: '1'
	        }, void 0, _jsx(_reactBootstrap.Button, {
	          onClick: this.openModal,
	          bsStyle: 'link'
	        }, void 0, _ref3))), _jsx(Form, {
	          pullLeft: true
	        }, void 0, _jsx(_reactBootstrap.Button, {
	          href: window.location.pathname != '/' ? '/' : '#',
	          type: 'submit',
	          bsStyle: 'warning',
	          onClick: this.logOut
	        }, void 0, _ref4)), _jsx(_AlertModal2.default, {
	          message: this.state.alert
	        }), _jsx(_UserCreateModal.UserCreateModal, {
	          refreshUser: this.refreshUser,
	          show: this.state.showModal,
	          close: this.closeModal
	        }));
	      }

	      var isLoading = this.state.isLoading;

	      return _jsx(_reactBootstrap.Nav, {}, void 0, _jsx(Form, {
	        pullLeft: true
	      }, void 0, _jsx('form', {}, void 0, _jsx(_reactBootstrap.FormGroup, {
	        controlId: 'emailForm',
	        validationState: this.state.validEmail
	      }, void 0, _react2.default.createElement(_reactBootstrap.FormControl, { type: 'email', placeholder: this.props.intl.messages.formEmail,
	        onChange: this.emailChange, ref: 'email' }), _ref5), ' ', _jsx(_reactBootstrap.FormGroup, {
	        controlId: 'passwordForm',
	        validationState: this.state.validPass
	      }, void 0, _react2.default.createElement(_reactBootstrap.FormControl, { type: 'password', placeholder: this.props.intl.messages.formPassword,
	        onChange: this.passwordChange, ref: 'password' }), _ref6), ' ', _jsx(_reactBootstrap.Button, {
	        type: 'submit',
	        bsStyle: 'primary',
	        disabled: isLoading,
	        onClick: this.logIn
	      }, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: isLoading ? "loggingIn" : 'logInButton'
	      })), ' ', _jsx(_reactBootstrap.Button, {
	        onClick: this.openModal,
	        bsStyle: 'primary'
	      }, void 0, _ref7), _jsx(_UserCreateModal.UserCreateModal, {
	        refreshUser: this.refreshUser,
	        show: this.state.showModal,
	        close: this.closeModal
	      }))), _jsx(_AlertModal2.default, {
	        message: this.state.alert
	      }));
	    }
	  }]);

	  return LoginBox;
	}(_react.Component);

	exports.default = LoginBox;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PassStorage = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _authStorage = __webpack_require__(3);

	var _bcryptjs = __webpack_require__(16);

	var bcrypt = _interopRequireWildcard(_bcryptjs);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ref = _jsx('span', {});

	var PassStorage = exports.PassStorage = function (_Component) {
	    _inherits(PassStorage, _Component);

	    function PassStorage() {
	        _classCallCheck(this, PassStorage);

	        return _possibleConstructorReturn(this, (PassStorage.__proto__ || Object.getPrototypeOf(PassStorage)).apply(this, arguments));
	    }

	    _createClass(PassStorage, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            (0, _authStorage.setStorage)(sessionStorage);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _ref;
	        }
	    }]);

	    return PassStorage;
	}(_react.Component);

	;

	exports.default = PassStorage;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _setup = __webpack_require__(28);

	var _IntlActions = __webpack_require__(29);

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var initLocale = global.navigator && global.navigator.language || 'fi';

	var initialState = _extends({
	  locale: initLocale,
	  enabledLanguages: _setup.enabledLanguages
	}, _setup.localizationData[initLocale] || {});

	var IntlReducer = function IntlReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _IntlActions.SWITCH_LANGUAGE:
	      {
	        var type = action.type;

	        var actionWithoutType = _objectWithoutProperties(action, ['type']); // eslint-disable-line


	        return _extends({}, state, actionWithoutType);
	      }

	    default:
	      return state;
	  }
	};

	exports.default = IntlReducer;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ModuleCreateWidget = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(2);

	var _reactIntl = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ref = _jsx(_reactBootstrap.ControlLabel, {}, void 0, ' ', _jsx(_reactIntl.FormattedMessage, {
	    id: 'moduleTitle'
	}), ' ');

	var _ref2 = _jsx(_reactBootstrap.ControlLabel, {}, void 0, ' ', _jsx(_reactIntl.FormattedMessage, {
	    id: 'moduleContent'
	}), ' ');

	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	    id: 'submitAdd'
	});

	var ModuleCreateWidget = exports.ModuleCreateWidget = function (_Component) {
	    _inherits(ModuleCreateWidget, _Component);

	    function ModuleCreateWidget() {
	        _classCallCheck(this, ModuleCreateWidget);

	        var _this = _possibleConstructorReturn(this, (ModuleCreateWidget.__proto__ || Object.getPrototypeOf(ModuleCreateWidget)).call(this));

	        _this.handleTitleChange = function (e) {
	            _this.setState({ formTitle: e.target.value });
	        };

	        _this.handleInfoChange = function (e) {
	            _this.setState({ formInfo: e.target.value });
	        };

	        _this.addModule = function () {
	            _this.props.sendModule(_this.state.formTitle, _this.state.formInfo);
	            _this.setState({ formTitle: '', formInfo: '' });
	        };

	        _this.state = { formTitle: '', formInfo: '' };
	        return _this;
	    }

	    _createClass(ModuleCreateWidget, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (this.props.oldModule && this.state.formTitle === '' && this.state.formInfo === '') {
	                this.setState({ formTitle: this.props.oldModule.title, formInfo: this.props.oldModule.info });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx(_reactBootstrap.FormGroup, {}, void 0, _ref, _jsx(_reactBootstrap.FormControl, {
	                type: 'text',
	                value: this.state.formTitle,
	                onChange: this.handleTitleChange,
	                placeholder: this.props.intl.messages.moduleTitle
	            }), _ref2, _jsx(_reactBootstrap.FormControl, {
	                componentClass: 'textarea',
	                value: this.state.formInfo,
	                onChange: this.handleInfoChange,
	                placeholder: this.props.intl.messages.moduleContent
	            }), _jsx(_reactBootstrap.Button, {
	                type: 'submit',
	                onClick: this.addModule
	            }, void 0, ' ', _ref3, ' '));
	        }
	    }]);

	    return ModuleCreateWidget;
	}(_react.Component);

	exports.default = (0, _reactIntl.injectIntl)(ModuleCreateWidget);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ModuleList = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(2);

	var _reactIntl = __webpack_require__(1);

	var _ModuleListItem = __webpack_require__(31);

	var _ModuleListItem2 = _interopRequireDefault(_ModuleListItem);

	var _ModuleCreateWidget = __webpack_require__(64);

	var _ModuleCreateWidget2 = _interopRequireDefault(_ModuleCreateWidget);

	var _authStorage = __webpack_require__(3);

	var _styles = __webpack_require__(15);

	var _reactRedux = __webpack_require__(8);

	var _ModuleActions = __webpack_require__(9);

	var _ModuleReducer = __webpack_require__(30);

	var _ModuleList = {
	  "panel-heading": "ModuleList__panel-heading__3s4vL",
	  "hidden": "ModuleList__hidden__1v3nT",
	  "textarea": "ModuleList__textarea__16BvW"
	};

	var _ModuleList2 = _interopRequireDefault(_ModuleList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/*
	 * ModuleList is a list of ModuleListItems. It takes care of adding, editing and
	 * removing ModuleListItems from it's array and sending it to the db.
	 * 
	 * Contains ModuleListItems to list them and ModuleCreateWidget to create and edit the Items
	 */

	var ModuleList = exports.ModuleList = function (_Component) {
	  _inherits(ModuleList, _Component);

	  function ModuleList(props) {
	    _classCallCheck(this, ModuleList);

	    var _this = _possibleConstructorReturn(this, (ModuleList.__proto__ || Object.getPrototypeOf(ModuleList)).call(this, props));

	    _this.buttonId = -1;

	    _this.handleAddModule = function (title, info) {
	      if (!title || !info) return;

	      var number = 0;
	      if (_this.props.modules.length > 0) {
	        number = _this.props.modules[_this.props.modules.length - 1].orderNumber + 1;
	      }

	      _this.props.dispatch((0, _ModuleActions.addModuleRequest)({
	        title: title,
	        info: info,
	        orderNumber: number }));
	    };

	    _this.addHeader = function () {
	      return _jsx('div', {
	        className: 'clearfix'
	      }, void 0, _jsx('div', {
	        className: _ModuleList2.default['panel-heading']
	      }, void 0, _this.props.intl.messages.addModule));
	    };

	    _this.panelHeader = function (module, index) {
	      return _jsx('div', {
	        className: 'clearfix'
	      }, void 0, _jsx('div', {
	        className: _ModuleList2.default['panel-heading']
	      }, void 0, module.title, _this.panelEditButtonForAdmin(module, index), _this.panelDeleteButtonForAdmin(module, index)));
	    };

	    _this.panelEditButtonForAdmin = function (module, index) {
	      if ((0, _authStorage.getTokenPayload)() && (0, _authStorage.getTokenPayload)().isAdmin) {
	        return _jsx(_reactBootstrap.Button, {
	          className: 'pull-right',
	          bsStyle: 'warning',
	          bsSize: 'xsmall',
	          onClick: _this.showEditModule(module, index)
	        }, void 0, 'Muokkaa Modulea');
	      }
	    };

	    _this.panelDeleteButtonForAdmin = function (module, index) {
	      if ((0, _authStorage.getTokenPayload)() && (0, _authStorage.getTokenPayload)().isAdmin) {
	        return _jsx(_reactBootstrap.Button, {
	          className: 'pull-right',
	          bsStyle: 'danger',
	          bsSize: 'xsmall',
	          onClick: _this.handleDeleteModule(module, index)
	        }, void 0, 'Poista Module');
	      }
	    };

	    _this.updateSelection = function (index) {
	      var nextOpen = _this.state.open === index ? null : index;
	      _this.state = _extends({}, _this.state, { open: nextOpen });
	    };

	    _this.showEditModule = function (module, index) {
	      return function (e) {
	        if (_this.state.open === index && _this.state.editing !== index) {
	          e.stopPropagation();
	        }
	        if (_this.state.editing != -1) {
	          _this.setState({ editing: -1 });
	        } else {
	          _this.setState({ editing: index });
	        }
	      };
	    };

	    _this.handleEditModule = function (module) {
	      return function (title, info) {
	        module.info = info;
	        module.title = title;
	        (0, _ModuleActions.editModuleRequest)(module).then(function (module) {
	          _this.props.dispatch((0, _ModuleActions.editModule)(module));
	          _this.setState({ editing: -1 });
	        });
	      };
	    };

	    _this.handleDeleteModule = function (module, index) {
	      return function (e) {
	        if (_this.state.open !== index) {
	          e.stopPropagation();
	        }
	        //   if (window.confirm('Haluatko varmasti poistaa moduulin? Moduulin poisto poistaa myös koko moduulin sisällön.')) {
	        _this.props.dispatch((0, _ModuleActions.deleteModuleRequest)(module.cuid));

	        //  }
	      };
	    };

	    _this.closeEditing = function () {
	      if (_this.state.editing != -1) _this.setState({ editing: -1 });
	    };

	    _this.state = { editing: -1 };
	    return _this;
	  }

	  _createClass(ModuleList, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _ModuleActions.fetchModules)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var i = 0;
	      return _jsx(_reactBootstrap.Accordion, {
	        onSelect: this.updateSelection
	      }, void 0, this.props.modules.map(function (module) {
	        return _jsx(_reactBootstrap.Panel, {
	          onSelect: _this2.closeEditing,
	          header: _this2.panelHeader(module, ++i),
	          eventKey: i
	        }, i, _jsx('div', {
	          style: (0, _styles.show)(i === _this2.state.editing)
	        }, void 0, _jsx(_ModuleCreateWidget2.default, {
	          sendModule: _this2.handleEditModule(module),
	          oldModule: { title: module.title, info: module.info }
	        })), _jsx('div', {
	          style: (0, _styles.show)(i !== _this2.state.editing)
	        }, void 0, _jsx(_ModuleListItem2.default, {
	          module: module,
	          addElementFunctionToMainview: _this2.props.addElementFunctionToMainview
	        })));
	      }), _jsx(_reactBootstrap.Panel, {
	        header: this.addHeader(),
	        bsStyle: 'success',
	        style: (0, _styles.show)((0, _authStorage.getTokenPayload)() && (0, _authStorage.getTokenPayload)().isAdmin),
	        eventKey: ++i
	      }, void 0, _jsx(_ModuleCreateWidget2.default, {
	        sendModule: this.handleAddModule
	      })));
	    }
	  }]);

	  return ModuleList;
	}(_react.Component);

	function mapStateToProps(state) {
	  return {
	    modules: (0, _ModuleReducer.getModules)(state)
	  };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(ModuleList));

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Section = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(2);

	var _reactIntl = __webpack_require__(1);

	var _validator = __webpack_require__(38);

	var _validator2 = _interopRequireDefault(_validator);

	var _QuizPanel = __webpack_require__(73);

	var _QuizPanel2 = _interopRequireDefault(_QuizPanel);

	var _QuizCreateModal = __webpack_require__(71);

	var _QuizCreateModal2 = _interopRequireDefault(_QuizCreateModal);

	var _SectionCreateModal = __webpack_require__(32);

	var _SectionCreateModal2 = _interopRequireDefault(_SectionCreateModal);

	var _authStorage = __webpack_require__(3);

	var _styles = __webpack_require__(15);

	var _SectionActions = __webpack_require__(11);

	var _ModuleList = {
	  "panel-heading": "ModuleList__panel-heading__3s4vL",
	  "hidden": "ModuleList__hidden__1v3nT",
	  "textarea": "ModuleList__textarea__16BvW"
	};

	var _ModuleList2 = _interopRequireDefault(_ModuleList);

	var _QuizActions = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/*
	 * Sections are displayed inside ModulePage in a list. Sections contain quizzes 
	 * and can edit, create and delete them.
	 * 
	 * Contains QuizPanels to list them and QuizCreateModal to create and edit quizzes.
	 */

	var _ref = _jsx('div', {}, void 0, ' Filetype not supported!');

	var _ref2 = _jsx('br', {});

	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'addQuiz'
	});

	var Section = exports.Section = function (_Component) {
	  _inherits(Section, _Component);

	  function Section(props) {
	    _classCallCheck(this, Section);

	    var _this = _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).call(this, props));

	    _this.checkMultimediaFileType = function (link) {
	      if (_validator2.default.contains(link, ".webm") || _validator2.default.contains(link, ".mp4") || _validator2.default.contains(link, ".ogg")) return "video";
	      if (_validator2.default.contains(link, ".jpg") || _validator2.default.contains(link, ".jpeg") || _validator2.default.contains(link, ".gif")) return "image";
	      if (_validator2.default.contains(link, "youtube.com") || _validator2.default.contains(link, "youtu.be")) return "youtube";else return "error";
	    };

	    _this.renderMultimediaFileType = function (type, section) {
	      if (type === "video") {
	        return _jsx('video', {
	          width: '640',
	          controls: true
	        }, void 0, _jsx('source', {
	          src: section.link,
	          type: 'video/webm'
	        }));
	      } else if (type === "image") {
	        return _jsx('img', {
	          src: section.link,
	          width: '480'
	        });
	      } else if (type === "youtube") {
	        //Parse 3 types of links. v=id, embed/id and tu.be/id
	        var re = /(v=|embed\/|tu.be\/)(\w+)/g;
	        var v = re.exec(section.link);
	        var link = "https://www.youtube.com/embed/";
	        link += v[2];
	        return _jsx('iframe', {
	          width: '560',
	          height: '315',
	          src: link,
	          frameBorder: '0',
	          allowFullScreen: true
	        });
	      } else {
	        return _ref;
	      }
	    };

	    _this.startEditingQuiz = function (quiz) {
	      _this.setState({ editingQuiz: quiz, showEditModal: true });
	    };

	    _this.startCreatingQuiz = function () {
	      return _this.startEditingQuiz({
	        question: '',
	        options: [{ text: '', answer: false }]
	      });
	    };

	    _this.saveQuiz = function (quiz) {
	      var isNewQuiz = !_this.state.editingQuiz.cuid;
	      if (isNewQuiz) {
	        _this.addQuiz(quiz);
	      } else {
	        _this.updateQuiz(quiz);
	      }
	    };

	    _this.updateQuiz = function (quiz) {
	      quiz.cuid = _this.state.editingQuiz.cuid;
	      (0, _QuizActions.editQuizRequest)(quiz).then(function () {
	        var oldQuiz = _this.state.editingQuiz;
	        if (oldQuiz) {
	          oldQuiz.question = quiz.question;
	          oldQuiz.options = quiz.options;
	        }
	        _this.setState({ showEditModal: false });
	      });
	    };

	    _this.addQuiz = function (quiz) {
	      quiz.sectionCuid = _this.props.section.cuid;
	      (0, _QuizActions.addQuizRequest)(quiz).then(function (savedQuiz) {
	        _this.props.section.quizzes.push(savedQuiz);
	        _this.setState({ showEditModal: false });
	      });
	    };

	    _this.deleteQuiz = function (quiz) {
	      _this.props.section.quizzes = _this.props.section.quizzes.filter(function (qu) {
	        return qu.cuid !== quiz.cuid;
	      });
	      _this.setState({});
	    };

	    _this.cancelEdit = function () {
	      return _this.setState({ showEditModal: false });
	    };

	    _this.state = { showEditModal: false, editingQuiz: {} };
	    return _this;
	  }

	  _createClass(Section, [{
	    key: 'render',
	    value: function render() {
	      var section = this.props.section;
	      var token = (0, _authStorage.getTokenPayload)();

	      return _jsx('div', {}, void 0, _jsx('div', {
	        className: _ModuleList2.default.textarea
	      }, void 0, section.content ? section.content : ''), section.link ? this.renderMultimediaFileType(this.checkMultimediaFileType(section.link), section) : '', _jsx('div', {
	        style: (0, _styles.show)(section.quizzes && section.quizzes.length > 0)
	      }, void 0, _ref2, _jsx(_QuizPanel2.default, {
	        quizzes: section.quizzes,
	        deleteQuizRender: this.deleteQuiz,
	        handleEditQuiz: this.startEditingQuiz
	      })), _jsx('div', {
	        style: (0, _styles.show)(token && token.isAdmin)
	      }, void 0, _jsx(_reactBootstrap.Button, {
	        onClick: this.startCreatingQuiz,
	        bsStyle: 'primary'
	      }, void 0, _ref3), _jsx(_QuizCreateModal2.default, {
	        quiz: this.state.editingQuiz,
	        cancel: this.cancelEdit,
	        save: this.saveQuiz,
	        show: this.state.showEditModal
	      })));
	    }
	  }]);

	  return Section;
	}(_react.Component);

	exports.default = (0, _reactIntl.injectIntl)(Section);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SectionFactory = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _SectionActions = __webpack_require__(11);

	var _reactBootstrap = __webpack_require__(2);

	var _ModulePage = __webpack_require__(12);

	var _ModulePage2 = _interopRequireDefault(_ModulePage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ref = _jsx(_reactBootstrap.MenuItem, {
		eventKey: '1'
	}, void 0, ' 100 ');

	var _ref2 = _jsx(_reactBootstrap.MenuItem, {
		eventKey: '2'
	}, void 0, ' 200 ');

	var _ref3 = _jsx(_reactBootstrap.MenuItem, {
		eventKey: '3'
	}, void 0, ' 300 ');

	var _ref4 = _jsx(_reactBootstrap.MenuItem, {
		eventKey: '3'
	}, void 0, ' 400 ');

	var SectionFactory = exports.SectionFactory = function (_Component) {
		_inherits(SectionFactory, _Component);

		function SectionFactory(props) {
			_classCallCheck(this, SectionFactory);

			var _this = _possibleConstructorReturn(this, (SectionFactory.__proto__ || Object.getPrototypeOf(SectionFactory)).call(this, props));

			_this.createSections = function (button) {
				var sectionsCount = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];


				var testContent = "";
				var testLink = "";
				sectionsCount = _this.numberOfSecs;

				for (var i = 0; i < sectionsCount; i++) {

					testContent = "koe sisältöä contenttiin " + i;
					if (i % 2) testLink = "http://www.w3schools.com/html/mov_bbb.mp4";else if (i % 3) testLink = "http://i.imgur.com/hXvANaX.jpg";else testLink = "";

					(0, _SectionActions.addSectionRequest)({
						moduleCuid: _this.props.moduleCuid,
						content: testContent,
						title: "koeotsikko " + i,
						link: testLink,
						orderNumber: i
					}).then(function (newSection) {
						_this.setState({ sections: [].concat(_toConsumableArray(_this.state.sections), [newSection]) });
						_this.props.addSectionToRender(newSection);
					});
				};
			};

			_this.deleteSections = function () {

				(0, _SectionActions.fetchSections)(_this.props.moduleCuid).then(function (sections) {
					return sections.forEach(function (section) {

						if (section.title) if (section.title.indexOf("koeotsikko") !== -1) {
							(0, _SectionActions.deleteSectionRequest)(section.cuid);
						}
					});
				});
				//this.state.sections
				//		.forEach(section => deleteSectionRequest(section.cuid));
				//this.setState({sections: []});
			};

			_this.state = { sections: [] };
			_this.numberOfSecs = 1;
			return _this;
		}

		_createClass(SectionFactory, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				return _jsx('div', {}, void 0, _jsx(_reactBootstrap.Well, {}, void 0, _jsx(_reactBootstrap.ButtonToolbar, {}, void 0, _jsx(_reactBootstrap.Button, {
					bsStyle: 'danger',
					onClick: this.createSections
				}, void 0, 'Create Sections'), _jsx(_reactBootstrap.DropdownButton, {
					onSelect: function onSelect(eventKey) {
						return _this2.numberOfSecs = eventKey * 100;
					},
					title: 'numbers of sections',
					id: 'bg-nested-dropdown'
				}, void 0, _ref, _ref2, _ref3, _ref4), _jsx(_reactBootstrap.Button, {
					bsStyle: 'danger',
					onClick: this.deleteSections
				}, void 0, 'Delete Sections'))));
			}
		}]);

		return SectionFactory;
	}(_react.Component);

	SectionFactory.PropTypes = {
		moduleCuid: _react.PropTypes.string.isRequired,
		addSectionToRender: _react.PropTypes.func.isRequired
	};

	exports.default = SectionFactory;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PostCreateWidget = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactIntl = __webpack_require__(1);

	var _reactBootstrap = __webpack_require__(2);

	var _PostCreateWidget = {
	  "form": "PostCreateWidget__form__1HNxV",
	  "form-content": "PostCreateWidget__form-content__VlHIH",
	  "form-title": "PostCreateWidget__form-title__32ccz",
	  "form-field": "PostCreateWidget__form-field__1srub",
	  "post-submit-button": "PostCreateWidget__post-submit-button__2m9Bz",
	  "appear": "PostCreateWidget__appear__30KT3",
	  "panel-heading": "PostCreateWidget__panel-heading__a8Xeh",
	  "hidden": "PostCreateWidget__hidden__k4x1o"
	};

	var _PostCreateWidget2 = _interopRequireDefault(_PostCreateWidget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Import Style


	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'isPrivate'
	});

	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'cancel'
	});

	var PostCreateWidget = exports.PostCreateWidget = function (_Component) {
	  _inherits(PostCreateWidget, _Component);

	  function PostCreateWidget() {
	    _classCallCheck(this, PostCreateWidget);

	    var _this = _possibleConstructorReturn(this, (PostCreateWidget.__proto__ || Object.getPrototypeOf(PostCreateWidget)).call(this));

	    _this.originalPost = null;

	    _this.isNewPost = function () {
	      return !_this.originalPost;
	    };

	    _this.changeContent = function (event) {
	      return _this.setState(_extends({}, _this.state, { content: event.target.value }));
	    };

	    _this.clearFields = function () {
	      _this.state = { name: "", content: "" };
	    };

	    _this.editPost = function () {
	      _this.props.editPost(_extends({}, _this.originalPost, {
	        content: _this.refs.content.value
	      }));
	    };

	    _this.addPost = function () {
	      var contentRef = _this.refs.content;
	      var privateRef = _this.refs.private.checked;
	      if (contentRef.value) {
	        _this.props.addPost(contentRef.value, !privateRef);
	        contentRef.value = '';
	        _this.clearFields();
	      }
	    };

	    _this.submit = function () {
	      if (_this.isNewPost()) {
	        _this.addPost();
	      } else {
	        _this.editPost();
	      }
	    };

	    _this.cancel = function () {
	      _this.clearFields();
	      _this.originalPost = null;
	      _this.props.hideAddPost();
	    };

	    _this.updateState = function () {
	      var postChanged = _this.props.originalPost != _this.originalPost;

	      if (postChanged) {
	        if (_this.props.originalPost == null) {
	          _this.clearFields();
	        } else {
	          var post = _this.props.originalPost;
	          _this.state = { content: post.content };
	        }
	        _this.originalPost = _this.props.originalPost;
	      }
	    };

	    _this.panelHeader = function (title) {
	      return _jsx('div', {
	        className: 'clearfix',
	        onClick: _this.props.toggleAddPost
	      }, void 0, _jsx('div', {
	        className: _PostCreateWidget2.default['panel-heading']
	      }, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: title
	      })));
	    };

	    _this.clearFields();
	    return _this;
	  }

	  //user is writing new post if originalPost is not defined


	  // these functions allow input-fields editing


	  //updating this components own state based on props


	  _createClass(PostCreateWidget, [{
	    key: 'render',
	    value: function render() {
	      this.updateState();

	      var submitText = this.isNewPost() ? "submitAdd" : "submitEdit";
	      var title = this.isNewPost() ? "createNewPost" : "editPost";

	      return _jsx(_reactBootstrap.Panel, {
	        header: this.panelHeader(title),
	        bsStyle: 'success',
	        collapsible: true,
	        expanded: this.props.showAddPost
	      }, void 0, _jsx('div', {
	        className: _PostCreateWidget2.default['form-content']
	      }, void 0, _jsx('div', {
	        className: this.isNewPost() ? 'bootstrap-switch-square' : 'hidden'
	      }, void 0, _react2.default.createElement('input', { type: 'checkbox', ref: 'private' }), ' ', _ref), _react2.default.createElement('textarea', { placeholder: this.props.intl.messages.postContent, className: _PostCreateWidget2.default['form-field'], ref: 'content',
	        value: this.state.content, onChange: this.changeContent }), _jsx('a', {
	        className: _PostCreateWidget2.default['post-submit-button'],
	        href: '#',
	        onClick: this.submit
	      }, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: submitText
	      })), _jsx('a', {
	        className: _PostCreateWidget2.default['post-submit-button'],
	        href: '#',
	        onClick: this.cancel
	      }, void 0, _ref2)));
	    }
	  }]);

	  return PostCreateWidget;
	}(_react.Component);

	exports.default = (0, _reactIntl.injectIntl)(PostCreateWidget);

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Import Components


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _PostListItem = __webpack_require__(70);

	var _PostListItem2 = _interopRequireDefault(_PostListItem);

	var _UserActions = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function PostList(props) {
	  return _jsx('div', {
	    className: 'listView'
	  }, void 0, props.posts.map(function (post) {
	    return _jsx(_PostListItem2.default, {
	      post: post,
	      onDelete: function onDelete() {
	        return props.handleDeletePost(post.cuid);
	      },
	      onEdit: function onEdit() {
	        return props.handleEditPost(post);
	      }
	    }, post.cuid);
	  }));
	}

	exports.default = PostList;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Import Style


	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactIntl = __webpack_require__(1);

	var _reactTime = __webpack_require__(98);

	var _reactTime2 = _interopRequireDefault(_reactTime);

	var _reactBootstrap = __webpack_require__(2);

	var _PostListItem = {
	  "single-post": "PostListItem__single-post__3B15Q",
	  "post-title": "PostListItem__post-title__3mZF-",
	  "author-name": "PostListItem__author-name__1cSDP",
	  "post-desc": "PostListItem__post-desc__3D8Fg",
	  "post-action": "PostListItem__post-action__3S84c",
	  "divider": "PostListItem__divider__y2SIF",
	  "post-detail": "PostListItem__post-detail__3W9vr",
	  "hidden": "PostListItem__hidden__3vqH-"
	};

	var _PostListItem2 = _interopRequireDefault(_PostListItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'deletePost'
	});

	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'editPostLink'
	});

	function PostListItem(props) {

	  return _jsx(_reactBootstrap.Panel, {
	    header: props.post.name,
	    bsStyle: props.post.shared ? 'default' : 'success'
	  }, void 0, _jsx('p', {
	    className: _PostListItem2.default['post-desc']
	  }, void 0, props.post.content), _jsx('p', {
	    className: _PostListItem2.default['post-desc']
	  }, void 0, _jsx(_reactTime2.default, {
	    value: props.post.dateAdded,
	    format: 'DD.MM.YYYY HH:mm:ss'
	  })), _jsx('p', {
	    className: _PostListItem2.default[props.post.own ? 'post-action' : 'hidden']
	  }, void 0, _jsx('a', {
	    href: '#',
	    onClick: props.onDelete
	  }, void 0, _ref), '   |  ', _jsx('a', {
	    href: '#',
	    onClick: props.onEdit
	  }, void 0, _ref2)));
	}

	exports.default = PostListItem;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.QuizCreateModal = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(2);

	var _reactIntl = __webpack_require__(1);

	var _QuizActions = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = _reactBootstrap.Modal.Header;
	var Title = _reactBootstrap.Modal.Title;
	var Body = _reactBootstrap.Modal.Body;
	var Footer = _reactBootstrap.Modal.Footer;

	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'option'
	});

	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'rightAnswer'
	});

	var _ref3 = _jsx(_reactBootstrap.ControlLabel, {}, void 0, ' ', _jsx(_reactIntl.FormattedMessage, {
	  id: 'question'
	}), ' ');

	var _ref4 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'submitAdd'
	});

	var _ref5 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'submitRemove'
	});

	var _ref6 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'cancel'
	});

	var QuizCreateModal = exports.QuizCreateModal = function (_Component) {
	  _inherits(QuizCreateModal, _Component);

	  function QuizCreateModal(props) {
	    _classCallCheck(this, QuizCreateModal);

	    var _this = _possibleConstructorReturn(this, (QuizCreateModal.__proto__ || Object.getPrototypeOf(QuizCreateModal)).call(this, props));

	    _this.setQuiz = function () {
	      var quiz = _this.props.quiz;
	      var optionCount = quiz.options.length;
	      _this.state = { fieldSize: optionCount, formQuestion: quiz.question };
	      quiz.options.forEach(function (option, i) {
	        _this.state[i + 1 + "answer"] = option.text;
	        _this.state[i + 1 + "chk"] = option.answer;
	      });
	    };

	    _this.addField = function () {
	      _this.setState({ fieldSize: _this.state.fieldSize + 1 });
	    };

	    _this.removeField = function () {
	      if (_this.state.fieldSize > 1) {
	        var _this$setState;

	        var i = _this.state.fieldSize;
	        _this.setState((_this$setState = {}, _defineProperty(_this$setState, i + 'answer', undefined), _defineProperty(_this$setState, i + 'chk', undefined), _defineProperty(_this$setState, 'fieldSize', i - 1), _this$setState));
	      }
	    };

	    _this.handleSaveQuiz = function () {
	      var question = _this.state.formQuestion;
	      var options = [];

	      for (var i = 1; i - 1 < _this.state.fieldSize; i++) {
	        var text = _this.state[i + 'answer'];
	        if (text) {
	          var answer = _this.state[i + 'chk'] == true;
	          options.push({ text: text, answer: answer });
	        }
	      }

	      if (!question || !options || options.length < 1) {
	        return;
	      }

	      _this.props.save({ question: question, options: options });
	    };

	    _this.handleQuestionChange = function (e) {
	      _this.setState({ formQuestion: e.target.value });
	    };

	    _this.handleCheckboxChange = function (number) {
	      return function (e) {
	        _this.setState(_defineProperty({}, number + 'chk', e.target.checked));
	      };
	    };

	    _this.handleAnswerChange = function (number) {
	      return function (e) {
	        _this.state[number + 'answer'] = e.target.value;
	        _this.setState({});
	      };
	    };

	    _this.optionField = function (fieldNumber) {
	      var fields = [];
	      for (var i = 1; i - 1 < fieldNumber; i++) {
	        fields.push(_jsx(_reactBootstrap.Form, {
	          horizontal: true
	        }, i, _jsx(_reactBootstrap.ControlLabel, {}, void 0, ' ', _ref, ' ', i, ' '), _jsx(_reactBootstrap.Checkbox, {
	          checked: _this.state[i + 'chk'],
	          onChange: _this.handleCheckboxChange(i)
	        }, void 0, _ref2), _jsx(_reactBootstrap.FormControl, {
	          type: 'text',
	          value: _this.state[i + 'answer'],
	          onChange: _this.handleAnswerChange(i),
	          placeholder: _this.props.intl.messages.option
	        })));
	      };
	      return _jsx('span', {}, void 0, fields);
	    };

	    _this.state = { fieldSize: 1 };
	    _this.previousShow = false;
	    return _this;
	  }

	  _createClass(QuizCreateModal, [{
	    key: 'render',
	    value: function render() {
	      if (!this.previousShow && this.props.show) {
	        this.setQuiz();
	      }
	      this.previousShow = this.props.show;
	      var isNewQuiz = !this.props.quiz.cuid;

	      return _jsx(_reactBootstrap.Modal, {
	        show: this.props.show,
	        onHide: this.close,
	        bsSize: 'large',
	        'aria-labelledby': 'contained-modal-title-lg'
	      }, void 0, _jsx(Header, {
	        closeButton: true
	      }, void 0, _jsx(Title, {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: isNewQuiz ? 'addQuizTitle' : 'editQuizTitle'
	      }))), _jsx(Body, {}, void 0, _ref3, _jsx(_reactBootstrap.FormControl, {
	        componentClass: 'textarea',
	        value: this.state.formQuestion,
	        onChange: this.handleQuestionChange,
	        placeholder: this.props.intl.messages.question
	      }), this.optionField(this.state.fieldSize), _jsx(_reactBootstrap.ButtonToolbar, {}, void 0, _jsx(_reactBootstrap.Button, {
	        onClick: this.addField,
	        bsStyle: 'danger'
	      }, void 0, ' ', _ref4, ' '), _jsx(_reactBootstrap.Button, {
	        onClick: this.removeField,
	        bsStyle: 'danger'
	      }, void 0, ' ', _ref5, ' '))), _jsx(Footer, {}, void 0, _jsx(_reactBootstrap.Button, {
	        onClick: this.handleSaveQuiz
	      }, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: isNewQuiz ? 'submitCreate' : 'submitEdit'
	      })), _jsx(_reactBootstrap.Button, {
	        onClick: this.props.cancel
	      }, void 0, ' ', _ref6, ' ')));
	    }
	  }]);

	  return QuizCreateModal;
	}(_react.Component);

	exports.default = (0, _reactIntl.injectIntl)(QuizCreateModal);

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.QuizItemOption = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(2);

	var _reactIntl = __webpack_require__(1);

	var _style = {
	  "quizPanelFeedback": "style__quizPanelFeedback__3jRZN",
	  "quizPanelHeader": "style__quizPanelHeader__2ANOs",
	  "quizPanelIcon": "style__quizPanelIcon__S595_",
	  "quizItem": "style__quizItem__17IK-",
	  "questionText": "style__questionText__4SiNi",
	  "quizOrderNumber": "style__quizOrderNumber__1UvKl",
	  "quizFeedbackSpace": "style__quizFeedbackSpace__31Zat",
	  "optionArea": "style__optionArea__3z-xd",
	  "optionLabel": "style__optionLabel__1DuGO",
	  "optionHighlight": "style__optionHighlight__1YENB",
	  "checkbox": "style__checkbox__9MUOi",
	  "quizFeedback": "style__quizFeedback__3hiri",
	  "gray": "style__gray__3Rzdv",
	  "green": "style__green__1jZ9V",
	  "red": "style__red__1yIId",
	  "quiz-action": "style__quiz-action__3Hz4k"
	};

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QuizItemOption = exports.QuizItemOption = function (_Component) {
	  _inherits(QuizItemOption, _Component);

	  function QuizItemOption(props) {
	    _classCallCheck(this, QuizItemOption);

	    var _this = _possibleConstructorReturn(this, (QuizItemOption.__proto__ || Object.getPrototypeOf(QuizItemOption)).call(this, props));

	    _this.changeChecked = function () {
	      _this.props.option.checked = !_this.props.option.checked;
	      _this.setState({});
	    };

	    return _this;
	  }

	  _createClass(QuizItemOption, [{
	    key: 'render',
	    value: function render() {
	      var highlight = this.props.option.highlight;

	      return _jsx('div', {
	        className: _style2.default.optionArea + (highlight ? ' ' + _style2.default.optionHighlight : '')
	      }, void 0, _jsx('label', {
	        className: _style2.default.optionLabel
	      }, void 0, _jsx('span', {
	        className: _style2.default.checkbox
	      }, void 0, _jsx('input', {
	        type: 'checkbox',
	        onClick: this.changeChecked,
	        checked: this.props.option.checked,
	        disabled: this.props.option.disabled
	      })), this.props.option.text));
	    }
	  }]);

	  return QuizItemOption;
	}(_react.Component);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.QuizPanel = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(2);

	var _reactIntl = __webpack_require__(1);

	var _QuizActions = __webpack_require__(13);

	var _QuizPanelItem = __webpack_require__(74);

	var _QuizPanelItem2 = _interopRequireDefault(_QuizPanelItem);

	var _style = {
	  "quizPanelFeedback": "style__quizPanelFeedback__3jRZN",
	  "quizPanelHeader": "style__quizPanelHeader__2ANOs",
	  "quizPanelIcon": "style__quizPanelIcon__S595_",
	  "quizItem": "style__quizItem__17IK-",
	  "questionText": "style__questionText__4SiNi",
	  "quizOrderNumber": "style__quizOrderNumber__1UvKl",
	  "quizFeedbackSpace": "style__quizFeedbackSpace__31Zat",
	  "optionArea": "style__optionArea__3z-xd",
	  "optionLabel": "style__optionLabel__1DuGO",
	  "optionHighlight": "style__optionHighlight__1YENB",
	  "checkbox": "style__checkbox__9MUOi",
	  "quizFeedback": "style__quizFeedback__3hiri",
	  "gray": "style__gray__3Rzdv",
	  "green": "style__green__1jZ9V",
	  "red": "style__red__1yIId",
	  "quiz-action": "style__quiz-action__3Hz4k"
	};

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'quizPanelTitle'
	});

	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'check'
	});

	var QuizPanel = exports.QuizPanel = function (_Component) {
	  _inherits(QuizPanel, _Component);

	  function QuizPanel(props) {
	    _classCallCheck(this, QuizPanel);

	    var _this = _possibleConstructorReturn(this, (QuizPanel.__proto__ || Object.getPrototypeOf(QuizPanel)).call(this, props));

	    _this.countPoints = function (quiz) {
	      if (_this.correctAnswers(quiz) == 0) {
	        return quiz.options.filter(function (option) {
	          return option.checked;
	        }).length ? 0 : 1;
	      } else {
	        return Math.max(quiz.options.reduce(function (result, option) {
	          return (option.checked ? option.answer ? +1 : -1 : 0) + result;
	        }, 0), 0);
	      }
	    };

	    _this.correctAnswers = function (quiz) {
	      return quiz.options.filter(function (option) {
	        return option.answer;
	      }).length;
	    };

	    _this.maxPoints = function (quiz) {
	      return _this.correctAnswers(quiz) || 1;
	    };

	    _this.correctUserAnswers = function (quiz) {
	      return quiz.options.filter(function (option) {
	        return option.answer == (option.checked == true);
	      }).length;
	    };

	    _this.quizFeedback = function (wrongAnswers, selected) {
	      var correct = wrongAnswers == 0;
	      var textId = correct ? 'rightAnswerFeedback' : selected === 0 ? 'selectOption' : wrongAnswers === 1 ? 'oneWrongAnswer' : 'severalWrongAnswers';
	      var color = correct ? 'green' : selected ? 'red' : 'gray';

	      return _jsx('span', {
	        className: _style2.default.quizFeedback + ' ' + _style2.default[color]
	      }, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: textId,
	        values: { count: wrongAnswers }
	      }));
	    };

	    _this.setPoints = function (quizzes) {
	      quizzes.forEach(function (quiz) {
	        if (_this.maxPoints(quiz) === quiz.points) {
	          quiz.options.forEach(function (option) {
	            option.highlight = option.answer;
	            option.disabled = true;
	            option.checked = option.answer;
	          });
	          quiz.feedback = _this.quizFeedback(0);
	        }
	      });

	      var maxPointsTotal = quizzes.map(_this.maxPoints).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      var pointsTotal = quizzes.map(function (quiz) {
	        return quiz.points;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      var totalPercent = Math.round(pointsTotal / maxPointsTotal * 100);
	      if (isNaN(totalPercent)) totalPercent = 0;
	      _this.setState({ totalPercent: totalPercent });
	    };

	    _this.verifyAnswers = function () {
	      _this.props.quizzes.forEach(function (quiz) {
	        quiz.points = _this.countPoints(quiz);
	        var wrongCount = quiz.options.length - _this.correctUserAnswers(quiz);
	        var selectedCount = quiz.options.filter(function (option) {
	          return option.checked;
	        }).length;
	        quiz.feedback = _this.quizFeedback(wrongCount, selectedCount);
	      });
	      (0, _QuizActions.sendScoreRequest)(_this.props.quizzes);
	      _this.setPoints(_this.props.quizzes);
	    };

	    _this.calculateQuizIndices = function () {
	      _this.props.quizzes.forEach(function (quiz, index) {
	        return quiz.index = index;
	      });
	    };

	    _this.renderProgressBar = function () {
	      return _jsx('div', {}, void 0, _jsx(_reactBootstrap.ProgressBar, {}, void 0, _jsx(_reactBootstrap.ProgressBar, {
	        now: _this.state.totalPercent,
	        bsStyle: 'success',
	        label: _this.state.totalPercent + "%"
	      }, 1)));
	    };

	    _this.handleDeleteQuiz = function (quiz) {
	      //   if (window.confirm('Haluatko varmasti poistaa kysymyksen?')) {
	      (0, _QuizActions.deleteQuizRequest)(quiz.cuid).then(_this.props.deleteQuizRender(quiz));
	      //   }
	    };

	    _this.state = { totalPercent: -1 };
	    return _this;
	  }

	  _createClass(QuizPanel, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var quizzes = [];
	      if (this.props.quizzes) {
	        quizzes = this.props.quizzes;
	      }
	      this.setPoints(quizzes);
	    }

	    //helper functions for quizzes

	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var quizzes = [];
	      if (this.props.quizzes) {
	        this.calculateQuizIndices();
	        quizzes = this.props.quizzes;
	      }
	      return _jsx(_reactBootstrap.Panel, {
	        collapsible: true,
	        header: _jsx('div', {
	          className: 'clearfix'
	        }, void 0, _jsx('div', {
	          className: _style2.default.quizPanelHeader
	        }, void 0, _jsx('img', {
	          src: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Question_Circle.svg?uselang=fi',
	          className: _style2.default.quizPanelIcon
	        }), _ref, _jsx('span', {
	          className: 'pull-right ' + _style2.default.quizPanelFeedback
	        }, void 0, this.state.totalPercent + "%")))
	      }, void 0, quizzes.map(function (quiz, key) {
	        return _jsx(_QuizPanelItem2.default, {
	          quiz: quiz,
	          onDelete: _this2.handleDeleteQuiz,
	          onEdit: _this2.props.handleEditQuiz
	        }, key);
	      }), this.renderProgressBar(), _jsx(_reactBootstrap.Button, {
	        onClick: this.verifyAnswers
	      }, void 0, _ref2));
	    }
	  }]);

	  return QuizPanel;
	}(_react.Component);

	exports.default = (0, _reactIntl.injectIntl)(QuizPanel);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.QuizPanelItem = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(2);

	var _reactIntl = __webpack_require__(1);

	var _authStorage = __webpack_require__(3);

	var _QuizItemOption = __webpack_require__(72);

	var _style = {
	  "quizPanelFeedback": "style__quizPanelFeedback__3jRZN",
	  "quizPanelHeader": "style__quizPanelHeader__2ANOs",
	  "quizPanelIcon": "style__quizPanelIcon__S595_",
	  "quizItem": "style__quizItem__17IK-",
	  "questionText": "style__questionText__4SiNi",
	  "quizOrderNumber": "style__quizOrderNumber__1UvKl",
	  "quizFeedbackSpace": "style__quizFeedbackSpace__31Zat",
	  "optionArea": "style__optionArea__3z-xd",
	  "optionLabel": "style__optionLabel__1DuGO",
	  "optionHighlight": "style__optionHighlight__1YENB",
	  "checkbox": "style__checkbox__9MUOi",
	  "quizFeedback": "style__quizFeedback__3hiri",
	  "gray": "style__gray__3Rzdv",
	  "green": "style__green__1jZ9V",
	  "red": "style__red__1yIId",
	  "quiz-action": "style__quiz-action__3Hz4k"
	};

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QuizPanelItem = exports.QuizPanelItem = function (_Component) {
	  _inherits(QuizPanelItem, _Component);

	  function QuizPanelItem(props) {
	    _classCallCheck(this, QuizPanelItem);

	    var _this = _possibleConstructorReturn(this, (QuizPanelItem.__proto__ || Object.getPrototypeOf(QuizPanelItem)).call(this, props));

	    _this.sendDelete = function () {
	      _this.props.onDelete(_this.props.quiz);
	    };

	    _this.sendEdit = function () {
	      _this.props.onEdit(_this.props.quiz);
	    };

	    return _this;
	  }

	  _createClass(QuizPanelItem, [{
	    key: 'render',
	    value: function render() {
	      var quiz = this.props.quiz;
	      var quizOrderNumber = quiz.index + 1;

	      return _jsx('div', {
	        className: _style2.default.quizItem
	      }, void 0, _jsx('div', {
	        className: _style2.default.questionText
	      }, void 0, _jsx('span', {
	        className: _style2.default.quizOrderNumber
	      }, void 0, quizOrderNumber + '.'), quiz.question, _jsx('span', {
	        className: (0, _authStorage.getTokenPayload)() && (0, _authStorage.getTokenPayload)().isAdmin ? 'pull-right' : 'hidden'
	      }, void 0, _jsx('span', {
	        className: _style2.default['quiz-action']
	      }, void 0, _jsx(_reactBootstrap.Button, {
	        bsStyle: 'link',
	        onClick: this.sendDelete
	      }, void 0, 'Poista kysymys'), _jsx(_reactBootstrap.Button, {
	        bsStyle: 'link',
	        onClick: this.sendEdit
	      }, void 0, 'Muokkaa kysymystä')))), quiz.options.map(function (option, i) {
	        return _jsx(_QuizItemOption.QuizItemOption, {
	          option: option
	        }, i);
	      }), _jsx('div', {
	        className: _style2.default.quizFeedbackSpace
	      }, void 0, quiz.feedback));
	    }
	  }]);

	  return QuizPanelItem;
	}(_react.Component);

	exports.default = (0, _reactIntl.injectIntl)(QuizPanelItem);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UserCreateModal = undefined;

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _reactIntl = __webpack_require__(1);

	var _reactBootstrap = __webpack_require__(2);

	var _bcryptjs = __webpack_require__(16);

	var bcrypt = _interopRequireWildcard(_bcryptjs);

	var _UserActions = __webpack_require__(14);

	var _AlertModal = __webpack_require__(19);

	var _AlertModal2 = _interopRequireDefault(_AlertModal);

	var _authStorage = __webpack_require__(3);

	var _sanitizeHtml = __webpack_require__(23);

	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = _reactBootstrap.Modal.Header;
	var Title = _reactBootstrap.Modal.Title;
	var Body = _reactBootstrap.Modal.Body;
	var Feedback = _reactBootstrap.FormControl.Feedback;
	var Footer = _reactBootstrap.Modal.Footer;

	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'editSuccessful'
	});

	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'editFailed'
	});

	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'registrationSuccessful_title'
	});

	var _ref4 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'registrationSuccessful_info'
	});

	var _ref5 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'sendConfirmFail'
	});

	var _ref6 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'emailNotValid'
	});

	var _ref7 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'nameNotValid'
	});

	var _ref8 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'passwordNotValid'
	});

	var _ref9 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'verifyError'
	});

	var _ref10 = _jsx(Feedback, {});

	var _ref11 = _jsx(Header, {
	  closeButton: true
	}, void 0, _jsx(Title, {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'registerTitle'
	})));

	var _ref12 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'cancel'
	});

	var UserCreateModal = exports.UserCreateModal = function (_Component) {
	  _inherits(UserCreateModal, _Component);

	  function UserCreateModal(props) {
	    _classCallCheck(this, UserCreateModal);

	    var _this = _possibleConstructorReturn(this, (UserCreateModal.__proto__ || Object.getPrototypeOf(UserCreateModal)).call(this, props));

	    _this.handleAddUser = function (e) {
	      if (e) e.preventDefault();
	      var email = _this.state.formEmail;
	      var error = _this.validate();
	      _this.setState({ error: error });
	      if (error) return;

	      _this.isLoading = true;

	      (0, _UserActions.fetchUser)(email).then(function (user) {
	        _this.isLoading = false;
	        if (_this.state.editing) {
	          if (user && user.cuid != _this.state.userToEdit.cuid) {
	            _this.setState({ error: _jsx(_reactIntl.FormattedMessage, {
	                id: 'userAlreadyExists',
	                values: { user: email }
	              }) });
	          } else {
	            _this.editUser();
	          }
	        } else {
	          if (!user) {
	            _this.createUser();
	          } else {
	            _this.setState({ error: _jsx(_reactIntl.FormattedMessage, {
	                id: 'userAlreadyExists',
	                values: { user: email }
	              }) });
	          }
	        }
	      });
	    };

	    _this.editUser = function () {
	      var editedUser = _this.constructUser();
	      editedUser.cuid = _this.state.userToEdit.cuid;
	      if (_this.state.formPassword === "") {
	        editedUser.password = (0, _sanitizeHtml2.default)(_this.state.userToEdit.password);
	      }
	      (0, _UserActions.editUserRequest)(editedUser).then(function (user) {
	        if (user) {
	          _this.props.close();
	          _this.setState({ alert: (0, _AlertModal.basicAlert)(_ref) });
	          _this.props.refreshUser(user);
	        } else {
	          _this.setState({ error: _ref2 });
	        }
	      });
	    };

	    _this.createUser = function () {
	      console.log("CREATEUSERISSA");
	      (0, _UserActions.addUserRequest)(_this.constructUser()).then(function (user) {
	        if (user) {
	          _this.props.close();
	          _this.setState({ alert: (0, _AlertModal.basicAlert)(_ref3, _ref4) });
	        } else {
	          _this.setState({ error: _ref5 });
	        }
	      });
	    };

	    _this.constructUser = function () {
	      return {
	        name: _this.state.formName,
	        surname: _this.state.formSurname,
	        email: _this.state.formEmail,
	        password: _this.hashedPassword()
	      };
	    };

	    _this.hashedPassword = function () {
	      var hashed = _this.state.formPassword;
	      var presalt = Math.random * (10 + _this.state.formEmail.length) + 10;
	      var salt = bcrypt.genSaltSync(Math.ceil(presalt));
	      hashed = bcrypt.hashSync(hashed, salt);

	      return hashed;
	    };

	    _this.validate = function () {
	      var error = '';
	      if (!_this.validateEmail()) {
	        error = _ref6;
	      } else if (_this.state.formName == '' || _this.state.formSurname == '') {
	        error = _ref7;
	      } else if (!_this.validatePassword()) {
	        error = _ref8;
	      }
	      return error;
	    };

	    _this.validateEmail = function () {
	      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	      return re.test(_this.state.formEmail);
	    };

	    _this.validatePassword = function () {
	      if (_this.state.editing && _this.state.formPassword == "" && _this.state.formPassVerify == "") {
	        return true;
	      }
	      var pass = _this.state.formPassword;
	      var verifier = _this.state.formPassVerify;
	      if (pass.length < 8 || pass.length > 18 || pass != verifier) {
	        return false;
	      }
	      return true;
	    };

	    _this.validatePasswordVerify = function () {
	      var pass = _this.state.formPassword;
	      var verifier = _this.state.formPassVerify;
	      return verifier.length < pass.length || verifier == pass;
	    };

	    _this.handleChange = function (key) {
	      return function (e) {
	        _this.state[key] = e.target.value;
	        _this.colorController(key);
	        _this.setState({});
	      };
	    };

	    _this.clearError = function () {
	      if (_this.state.error) {
	        _this.setState({ error: null });
	      }
	    };

	    _this.colorController = function (key) {
	      var str = 'color' + key;
	      if (_this.state[key] == null) {
	        _this.setState(_defineProperty({}, str, null));
	      } else if (key == 'formPassVerify') {
	        if (_this.validatePassword()) {
	          _this.setState(_defineProperty({}, str, 'success'));
	          _this.clearError();
	        } else if (!_this.validatePasswordVerify()) {
	          var _this$setState3;

	          _this.setState((_this$setState3 = {}, _defineProperty(_this$setState3, str, 'error'), _defineProperty(_this$setState3, 'error', _ref9), _this$setState3));
	        } else {
	          _this.setState(_defineProperty({}, str, 'warning'));
	          _this.clearError();
	        }
	      } else if (key == 'formEmail') {
	        if (_this.validateEmail()) {
	          _this.setState(_defineProperty({}, str, 'success'));
	        } else {
	          _this.setState(_defineProperty({}, str, 'warning'));
	        }
	      } else if (key == 'formPassword') {
	        if (_this.validatePassword()) {
	          _this.clearError();
	          _this.setState({ colorformPassVerify: 'success' });
	        } else {
	          _this.setState({ colorformPassVerify: null });
	        }
	      }
	    };

	    _this.initFieldsForEdit = function (token) {
	      (0, _UserActions.fetchUserByCuid)(token.cuid).then(function (user) {
	        _this.setState({ formEmail: user.email, formName: user.name,
	          formSurname: user.surname, formPassword: "", formPassVerify: "",
	          userToEdit: user, editing: true });
	      });
	    };

	    _this.registerField = function (controlId, type, placeholder) {
	      var key = controlId;
	      if (_this.state[key] === undefined) {
	        _this.state[key] = '';
	      }
	      if (_this.state['color' + key] === undefined) {
	        _this.state['color' + key] = null;
	      }
	      return _jsx(_reactBootstrap.FormGroup, {
	        controlId: controlId,
	        validationState: _this.state['color' + key]
	      }, void 0, _jsx(_reactBootstrap.Col, {
	        componentClass: _reactBootstrap.ControlLabel,
	        sm: 2
	      }, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: controlId
	      })), _jsx(_reactBootstrap.Col, {
	        sm: 10
	      }, void 0, _jsx(_reactBootstrap.FormControl, {
	        type: type,
	        value: _this.state[key],
	        onChange: _this.handleChange(key),
	        placeholder: placeholder
	      }), _ref10));
	    };

	    _this.state = { editing: false };
	    _this.isLoading = false;
	    return _this;
	  }

	  _createClass(UserCreateModal, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var userToken = (0, _authStorage.getTokenPayload)();
	      if (userToken) {
	        this.initFieldsForEdit(userToken);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _jsx('span', {}, void 0, _jsx(_reactBootstrap.Modal, {
	        show: this.props.show,
	        onHide: function onHide() {
	          _this2.props.close();
	        }
	      }, void 0, _ref11, _jsx(_reactBootstrap.Form, {
	        onSubmit: this.handleAddUser,
	        horizontal: true
	      }, void 0, _jsx(Body, {}, void 0, this.registerField('formEmail', "email", 'matti.meikalainen@gmail.com'), this.registerField('formName', "text", 'Matti'), this.registerField('formSurname', "text", 'Meikäläinen'), this.registerField('formPassword', "password", 'Salasana'), this.registerField('formPassVerify', "password", 'Salasana'), _jsx('div', {
	        className: this.state.error ? '' : 'hidden'
	      }, void 0, _jsx(_reactBootstrap.Alert, {
	        bsStyle: 'warning'
	      }, void 0, _jsx('b', {}, void 0, this.state.error)))), _jsx(Footer, {}, void 0, _jsx(_reactBootstrap.Button, {
	        type: 'submit',
	        bsStyle: 'primary',
	        disabled: this.isLoading
	      }, void 0, _jsx(_reactIntl.FormattedMessage, {
	        id: this.state.editing ? 'displayEditModal' : 'displayRegisterModal'
	      })), _jsx(_reactBootstrap.Button, {
	        onClick: this.props.close
	      }, void 0, _ref12)))), _jsx(_AlertModal2.default, {
	        message: this.state.alert
	      }));
	    }
	  }]);

	  return UserCreateModal;
	}(_react.Component);

	exports.default = UserCreateModal;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(37);

	var _PostReducer = __webpack_require__(33);

	var _PostReducer2 = _interopRequireDefault(_PostReducer);

	var _ModuleReducer = __webpack_require__(30);

	var _ModuleReducer2 = _interopRequireDefault(_ModuleReducer);

	var _IntlReducer = __webpack_require__(63);

	var _IntlReducer2 = _interopRequireDefault(_IntlReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Combine all reducers into one root reducer
	/**
	 * Root Reducer
	 */
	exports.default = (0, _redux.combineReducers)({
	  posts: _PostReducer2.default,
	  intl: _IntlReducer2.default,
	  modules: _ModuleReducer2.default
	});

	// Import Reducers

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateModule = exports.deleteModule = exports.addModule = undefined;

	var addModule = exports.addModule = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
	    var token, newModule;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return (0, _user.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context.sent;

	            if (!(!token || !token.isAdmin || !req.body.module.title || !req.body.module.info || req.body.module.orderNumber == undefined)) {
	              _context.next = 5;
	              break;
	            }

	            return _context.abrupt('return', res.status(403).end());

	          case 5:
	            newModule = new _module2.default(req.body.module);

	            newModule.cuid = (0, _cuid2.default)();

	            return _context.abrupt('return', newModule.save().then(function () {
	              return res.json({ module: newModule });
	            }).catch(function (err) {
	              return res.status(500).send(err);
	            }));

	          case 8:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function addModule(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var deleteModule = exports.deleteModule = function () {
	  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return (0, _user.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context2.sent;

	            if (!(!token || !token.isAdmin)) {
	              _context2.next = 5;
	              break;
	            }

	            return _context2.abrupt('return', res.status(403).end());

	          case 5:

	            _module2.default.findOne({ cuid: req.params.cuid }).exec(function (err, module) {
	              if (err) {
	                return res.status(500).send(err);
	              } else if (!module) {
	                return res.status(404).end();
	              }
	              return module.remove(function () {
	                return res.status(200).end();
	              });
	            });

	          case 6:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function deleteModule(_x3, _x4) {
	    return _ref2.apply(this, arguments);
	  };
	}();

	var updateModule = exports.updateModule = function () {
	  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
	    var token, module;
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.next = 2;
	            return (0, _user.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context3.sent;

	            if (!(!token || !token.isAdmin)) {
	              _context3.next = 5;
	              break;
	            }

	            return _context3.abrupt('return', res.status(403).end());

	          case 5:
	            module = req.body.module;


	            _module2.default.findOneAndUpdate({ cuid: module.cuid }, { title: module.title, info: module.info }, { upsert: true, new: true }, function (err, doc) {
	              if (err) return res.status(500).send(err);
	              return res.json({ module: module });
	            });

	          case 7:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function updateModule(_x5, _x6) {
	    return _ref3.apply(this, arguments);
	  };
	}();

	exports.getModules = getModules;
	exports.getModule = getModule;

	var _module = __webpack_require__(80);

	var _module2 = _interopRequireDefault(_module);

	var _cuid = __webpack_require__(7);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _user = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function getModules(req, res) {
	  _module2.default.find().sort('orderNumber').exec(function (err, modules) {
	    if (err) {
	      return res.status(500).send(err);
	    }
	    return res.json({ modules: modules });
	  });
	}

	function getModule(req, res) {
	  var decoded = decodeURI(req.params.title).split("-");
	  console.log(decoded[1]);
	  _module2.default.findOne({ title: decoded[0], cuid: new RegExp(decoded[1] + '$', 'i') }).exec(function (err, module) {
	    console.log(module);
	    if (err) {
	      return res.status(500).send(err);
	    }
	    return res.json({ module: module });
	  });
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.deletePost = exports.addPost = exports.updatePost = exports.getPosts = undefined;

	//get all shared posts and own posts

	var getPosts = exports.getPosts = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
	    var _this = this;

	    var token, userCuid;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            userToCuids = {};
	            _context2.next = 3;
	            return (0, _user3.decodeTokenFromRequest)(req);

	          case 3:
	            token = _context2.sent;
	            userCuid = token ? token.cuid : "not user";


	            _post2.default.find().or([{ shared: true }, { userCuid: userCuid }]).sort('-dateAdded').lean().exec(function () {
	              var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, posts) {
	                var i;
	                return regeneratorRuntime.wrap(function _callee$(_context) {
	                  while (1) {
	                    switch (_context.prev = _context.next) {
	                      case 0:
	                        if (!err) {
	                          _context.next = 2;
	                          break;
	                        }

	                        return _context.abrupt('return', res.status(500).send(err));

	                      case 2:
	                        i = 0;

	                      case 3:
	                        if (!(i < posts.length)) {
	                          _context.next = 9;
	                          break;
	                        }

	                        _context.next = 6;
	                        return completePostInformation(posts[i], userCuid);

	                      case 6:
	                        i++;
	                        _context.next = 3;
	                        break;

	                      case 9:
	                        return _context.abrupt('return', res.json({ posts: posts }));

	                      case 10:
	                      case 'end':
	                        return _context.stop();
	                    }
	                  }
	                }, _callee, _this);
	              }));

	              return function (_x3, _x4) {
	                return _ref2.apply(this, arguments);
	              };
	            }());

	          case 6:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function getPosts(_x, _x2) {
	    return _ref.apply(this, arguments);
	  };
	}();

	//marks user name to post and own=true, if post is users own post
	//call this before sending post to client


	var completePostInformation = function () {
	  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(post, loggedInUserId) {
	    var user;
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            if (post.userCuid in userToCuids) {
	              _context3.next = 5;
	              break;
	            }

	            _context3.next = 3;
	            return _user2.default.findOne({ cuid: post.userCuid }).exec();

	          case 3:
	            user = _context3.sent;

	            userToCuids[post.userCuid] = user.name;

	          case 5:

	            post.name = userToCuids[post.userCuid];
	            post.own = post.userCuid == loggedInUserId;

	          case 7:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function completePostInformation(_x5, _x6) {
	    return _ref3.apply(this, arguments);
	  };
	}();

	/**
	 * Save a post
	 * @param req
	 * @param res
	 * @returns void
	 */


	var updatePost = exports.updatePost = function () {
	  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
	    var post, token;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            post = req.body.post;
	            _context4.next = 3;
	            return (0, _user3.decodeTokenFromRequest)(req);

	          case 3:
	            token = _context4.sent;

	            if (!(!post.content || !token || !token.cuid)) {
	              _context4.next = 6;
	              break;
	            }

	            return _context4.abrupt('return', res.status(403).end());

	          case 6:

	            _post2.default.findOneAndUpdate({ cuid: post.cuid, userCuid: token.cuid }, { content: post.content }, { upsert: true, new: true }, function (err, doc) {
	              var savedPost = doc.toObject();
	              if (err) return res.status(500).send(err);
	              return completePostInformation(savedPost, token.cuid).then(function () {
	                return res.json({ post: savedPost });
	              });
	            });

	          case 7:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));

	  return function updatePost(_x7, _x8) {
	    return _ref4.apply(this, arguments);
	  };
	}();

	var addPost = exports.addPost = function () {
	  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
	    var newPost, token;
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            if (req.body.post.content) {
	              _context5.next = 2;
	              break;
	            }

	            return _context5.abrupt('return', res.status(403).end());

	          case 2:
	            newPost = new _post2.default(req.body.post);

	            newPost.cuid = (0, _cuid2.default)();

	            _context5.next = 6;
	            return (0, _user3.decodeTokenFromRequest)(req);

	          case 6:
	            token = _context5.sent;

	            if (!token) {
	              _context5.next = 12;
	              break;
	            }

	            newPost.userCuid = token.cuid;
	            return _context5.abrupt('return', newPost.save().then(function () {
	              return completePostInformation(newPost, token.cuid);
	            }).then(function () {
	              return res.json({ post: newPost });
	            }).catch(function () {
	              return res.status(500).send(err);
	            }));

	          case 12:
	            return _context5.abrupt('return', res.status(403).end());

	          case 13:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this);
	  }));

	  return function addPost(_x9, _x10) {
	    return _ref5.apply(this, arguments);
	  };
	}();

	/**
	 * Get a single post
	 * @param req
	 * @param res
	 * @returns void
	 */


	/**
	 * Delete a post
	 * @param req
	 * @param res
	 * @returns void
	 */
	var deletePost = exports.deletePost = function () {
	  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            _context6.next = 2;
	            return (0, _user3.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context6.sent;

	            if (!(!token || !token.cuid)) {
	              _context6.next = 5;
	              break;
	            }

	            return _context6.abrupt('return', res.status(403).end());

	          case 5:

	            _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
	              if (err) {
	                return res.status(500).send(err);
	              } else if (!post) {
	                return res.status(404).end();
	              } else if (post.userCuid != token.cuid) {
	                return res.status(403).end();
	              } else {
	                return post.remove(function () {
	                  return res.status(200).end();
	                });
	              }
	            });

	          case 6:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, this);
	  }));

	  return function deletePost(_x11, _x12) {
	    return _ref6.apply(this, arguments);
	  };
	}();

	exports.getPost = getPost;

	var _post = __webpack_require__(81);

	var _post2 = _interopRequireDefault(_post);

	var _user = __webpack_require__(22);

	var _user2 = _interopRequireDefault(_user);

	var _cuid = __webpack_require__(7);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _sanitizeHtml = __webpack_require__(23);

	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

	var _jwtSimple = __webpack_require__(17);

	var jwt = _interopRequireWildcard(_jwtSimple);

	var _user3 = __webpack_require__(6);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	var userToCuids = {};function getPost(req, res) {
	  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ post: post });
	  });
	}

	function checkIfContent() {
	  if (!req.body.post.name || !req.body.post.content) {
	    res.status(403).end();
	  }
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.deleteSectionsByModule = exports.deleteSection = exports.updateSection = exports.addSection = exports.getSections = undefined;

	var getQuizzes = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(section) {
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return (0, _quiz.getQuizzesForSection)(section);

	          case 2:
	            section.quizzes = _context.sent;

	          case 3:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function getQuizzes(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var getSections = exports.getSections = function () {
	  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
	    var _this = this;

	    var token;
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            token = (0, _user.decodeTokenFromRequest)(req);

	            if (token) {
	              _context3.next = 3;
	              break;
	            }

	            return _context3.abrupt('return', res.status(403).end());

	          case 3:

	            _section2.default.find({ moduleCuid: req.params.moduleCuid }).sort('orderNumber').lean().exec(function () {
	              var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(err, sections) {
	                var i;
	                return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                  while (1) {
	                    switch (_context2.prev = _context2.next) {
	                      case 0:
	                        if (!err) {
	                          _context2.next = 2;
	                          break;
	                        }

	                        return _context2.abrupt('return', res.status(500).send(err));

	                      case 2:
	                        i = 0;

	                      case 3:
	                        if (!(i < sections.length)) {
	                          _context2.next = 9;
	                          break;
	                        }

	                        _context2.next = 6;
	                        return getQuizzes(sections[i]);

	                      case 6:
	                        i++;
	                        _context2.next = 3;
	                        break;

	                      case 9:
	                        return _context2.abrupt('return', res.json({ sections: sections }));

	                      case 10:
	                      case 'end':
	                        return _context2.stop();
	                    }
	                  }
	                }, _callee2, _this);
	              }));

	              return function (_x4, _x5) {
	                return _ref3.apply(this, arguments);
	              };
	            }());

	          case 4:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function getSections(_x2, _x3) {
	    return _ref2.apply(this, arguments);
	  };
	}();

	var addSection = exports.addSection = function () {
	  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
	    var token, sect, newSection;
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            _context4.next = 2;
	            return (0, _user.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context4.sent;
	            sect = req.body.section;

	            if (!(!token || !token.isAdmin || !sect || !sect.moduleCuid || !sect.content && !sect.link || sect.orderNumber == undefined)) {
	              _context4.next = 6;
	              break;
	            }

	            return _context4.abrupt('return', res.status(403).end());

	          case 6:
	            newSection = new _section2.default(sect);

	            newSection.cuid = (0, _cuid2.default)();

	            return _context4.abrupt('return', newSection.save().then(function () {
	              return res.json({ section: newSection });
	            }).catch(function (err) {
	              return res.status(500).send(err);
	            }));

	          case 9:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));

	  return function addSection(_x6, _x7) {
	    return _ref4.apply(this, arguments);
	  };
	}();

	var updateSection = exports.updateSection = function () {
	  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
	    var token, section, oldSection;
	    return regeneratorRuntime.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            _context5.next = 2;
	            return (0, _user.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context5.sent;
	            section = req.body.section;

	            if (!(!token || !token.isAdmin || !section)) {
	              _context5.next = 6;
	              break;
	            }

	            return _context5.abrupt('return', res.status(403).end());

	          case 6:
	            _context5.next = 8;
	            return _section2.default.findOne({ cuid: section.cuid });

	          case 8:
	            oldSection = _context5.sent;

	            if (oldSection) {
	              _context5.next = 11;
	              break;
	            }

	            return _context5.abrupt('return', res.status(404).end());

	          case 11:
	            if (!(oldSection.orderNumber !== section.orderNumber)) {
	              _context5.next = 14;
	              break;
	            }

	            _context5.next = 14;
	            return _section2.default.findOneAndUpdate({ moduleCuid: oldSection.moduleCuid, orderNumber: section.orderNumber }, { orderNumber: oldSection.orderNumber }).exec();

	          case 14:
	            oldSection.title = section.title;
	            oldSection.content = section.content;
	            oldSection.link = section.link;
	            oldSection.orderNumber = section.orderNumber;

	            return _context5.abrupt('return', oldSection.save().then(function () {
	              return res.status(200).end();
	            }).catch(function (err) {
	              return res.status(500).send(err);
	            }));

	          case 19:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, this);
	  }));

	  return function updateSection(_x8, _x9) {
	    return _ref5.apply(this, arguments);
	  };
	}();

	var deleteSection = exports.deleteSection = function () {
	  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            _context6.next = 2;
	            return (0, _user.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context6.sent;

	            if (!(!token || !token.isAdmin)) {
	              _context6.next = 5;
	              break;
	            }

	            return _context6.abrupt('return', res.status(403).end());

	          case 5:

	            _section2.default.findOne({ cuid: req.params.cuid }).exec(function (err, section) {
	              if (err) {
	                return res.status(500).send(err);
	              } else if (!section) {
	                return res.status(404).end();
	              }
	              return section.remove(function () {
	                return res.status(200).end();
	              });
	            });

	          case 6:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, this);
	  }));

	  return function deleteSection(_x10, _x11) {
	    return _ref6.apply(this, arguments);
	  };
	}();

	var deleteSectionsByModule = exports.deleteSectionsByModule = function () {
	  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(req, res) {
	    var token;
	    return regeneratorRuntime.wrap(function _callee7$(_context7) {
	      while (1) {
	        switch (_context7.prev = _context7.next) {
	          case 0:
	            _context7.next = 2;
	            return (0, _user.decodeTokenFromRequest)(req);

	          case 2:
	            token = _context7.sent;

	            if (!(!token || !token.isAdmin)) {
	              _context7.next = 5;
	              break;
	            }

	            return _context7.abrupt('return', res.status(403).end());

	          case 5:

	            _section2.default.deleteMany({ moduleCuid: req.params.moduleCuid }).exec(function (err) {
	              if (err) {
	                return res.status(500).send(err);
	              }
	            });

	            return _context7.abrupt('return', res.status(200).end());

	          case 7:
	          case 'end':
	            return _context7.stop();
	        }
	      }
	    }, _callee7, this);
	  }));

	  return function deleteSectionsByModule(_x12, _x13) {
	    return _ref7.apply(this, arguments);
	  };
	}();

	var _section = __webpack_require__(84);

	var _section2 = _interopRequireDefault(_section);

	var _cuid = __webpack_require__(7);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _user = __webpack_require__(6);

	var _quiz = __webpack_require__(34);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	var Schema = _mongoose2.default.Schema;

	var moduleSchema = new Schema({
	    cuid: { type: 'String', required: true },
	    title: { type: 'String', required: true },
	    info: { type: 'String', required: true },
	    orderNumber: { type: 'Number', required: true }
	});

	moduleSchema.pre('remove', function () {
	    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(next) {
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	            while (1) {
	                switch (_context2.prev = _context2.next) {
	                    case 0:
	                        _context2.next = 2;
	                        return this.model('Section').find({ moduleCuid: this.cuid }, function () {
	                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, sections) {
	                                return regeneratorRuntime.wrap(function _callee$(_context) {
	                                    while (1) {
	                                        switch (_context.prev = _context.next) {
	                                            case 0:
	                                                _context.next = 2;
	                                                return Promise.all(sections.map(function (section) {
	                                                    return section.remove();
	                                                }));

	                                            case 2:
	                                            case 'end':
	                                                return _context.stop();
	                                        }
	                                    }
	                                }, _callee, this);
	                            }));

	                            return function (_x2, _x3) {
	                                return _ref2.apply(this, arguments);
	                            };
	                        }());

	                    case 2:
	                        next();

	                    case 3:
	                    case 'end':
	                        return _context2.stop();
	                }
	            }
	        }, _callee2, this);
	    }));

	    return function (_x) {
	        return _ref.apply(this, arguments);
	    };
	}());

	exports.default = _mongoose2.default.model('Module', moduleSchema);

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema;

	/**
	 * 
	 */
	var postSchema = new Schema({
	  content: { type: 'String', required: true },
	  shared: { type: 'Boolean', default: true, required: true },
	  cuid: { type: 'String', required: true },
	  dateAdded: { type: 'Date', default: Date.now, required: true },
	  userCuid: { type: 'String', default: "eiomistajaa", required: true }
	});

	exports.default = _mongoose2.default.model('Post', postSchema);

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	var Schema = _mongoose2.default.Schema;

	var quizSchema = new Schema({
	  cuid: { type: 'String', required: true },
	  sectionCuid: { type: 'String', required: true },
	  question: { type: 'String', required: true },
	  options: { type: [{ text: 'String', answer: 'Boolean' }], required: true }
	});

	quizSchema.pre('remove', function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(next) {
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return this.model('Score').update({}, { $pull: { scores: { quizCuid: this.cuid } } }, { multi: true }, next);

	          case 2:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function (_x) {
	    return _ref.apply(this, arguments);
	  };
	}());

	exports.default = _mongoose2.default.model('Quiz', quizSchema);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema;

	var scoreSchema = new Schema({
	  userCuid: { type: 'String', required: true },
	  scores: [{ quizCuid: 'String', quizPoints: 'Number' }]
	});

	exports.default = _mongoose2.default.model('Score', scoreSchema);

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	var Schema = _mongoose2.default.Schema;

	var sectionSchema = new Schema({
	    cuid: { type: 'String', required: true },
	    moduleCuid: { type: 'String', required: true },
	    title: { type: 'String', required: false },
	    link: { type: 'String', required: false },
	    content: { type: 'String', required: false },
	    orderNumber: { type: 'Number', required: true }
	});

	sectionSchema.pre('remove', function () {
	    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(next) {
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	            while (1) {
	                switch (_context2.prev = _context2.next) {
	                    case 0:
	                        _context2.next = 2;
	                        return this.model('Quiz').find({ sectionCuid: this.cuid }, function () {
	                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, quizzes) {
	                                return regeneratorRuntime.wrap(function _callee$(_context) {
	                                    while (1) {
	                                        switch (_context.prev = _context.next) {
	                                            case 0:
	                                                _context.next = 2;
	                                                return Promise.all(quizzes.map(function (quiz) {
	                                                    return quiz.remove();
	                                                }));

	                                            case 2:
	                                            case 'end':
	                                                return _context.stop();
	                                        }
	                                    }
	                                }, _callee, this);
	                            }));

	                            return function (_x2, _x3) {
	                                return _ref2.apply(this, arguments);
	                            };
	                        }());

	                    case 2:
	                        next();

	                    case 3:
	                    case 'end':
	                        return _context2.stop();
	                }
	            }
	        }, _callee2, this);
	    }));

	    return function (_x) {
	        return _ref.apply(this, arguments);
	    };
	}());

	exports.default = _mongoose2.default.model('Section', sectionSchema);

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Schema = _mongoose2.default.Schema;

	var utilSchema = new Schema({
	  key: { type: 'String', required: false },
	  emailAddress: { type: 'String', required: false },
	  emailPassword: { type: 'String', required: false },
	  emailHost: { type: 'String', required: false },
	  admins: [{ adminCuid: 'String' }]
	});

	exports.default = _mongoose2.default.model('Util', utilSchema);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

	// Webpack Requirements


	var _express = __webpack_require__(5);

	var _express2 = _interopRequireDefault(_express);

	var _compression = __webpack_require__(51);

	var _compression2 = _interopRequireDefault(_compression);

	var _mongoose = __webpack_require__(4);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _bodyParser = __webpack_require__(50);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _path = __webpack_require__(52);

	var _path2 = _interopRequireDefault(_path);

	var _IntlWrapper = __webpack_require__(39);

	var _IntlWrapper2 = _interopRequireDefault(_IntlWrapper);

	var _webpack = __webpack_require__(27);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpackConfig = __webpack_require__(49);

	var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

	var _webpackDevMiddleware = __webpack_require__(54);

	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

	var _webpackHotMiddleware = __webpack_require__(55);

	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

	var _store = __webpack_require__(41);

	var _reactRedux = __webpack_require__(8);

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(53);

	var _reactRouter = __webpack_require__(18);

	var _reactHelmet = __webpack_require__(26);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _routes = __webpack_require__(40);

	var _routes2 = _interopRequireDefault(_routes);

	var _fetchData = __webpack_require__(48);

	var _post = __webpack_require__(43);

	var _post2 = _interopRequireDefault(_post);

	var _user = __webpack_require__(47);

	var _user2 = _interopRequireDefault(_user);

	var _module = __webpack_require__(42);

	var _module2 = _interopRequireDefault(_module);

	var _section = __webpack_require__(46);

	var _section2 = _interopRequireDefault(_section);

	var _quiz = __webpack_require__(44);

	var _quiz2 = _interopRequireDefault(_quiz);

	var _score = __webpack_require__(45);

	var _score2 = _interopRequireDefault(_score);

	var _config = __webpack_require__(24);

	var _config2 = _interopRequireDefault(_config);

	var _util = __webpack_require__(25);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Initialize the Express App
	var app = new _express2.default();

	// Run Webpack dev server in development mode
	if (process.env.NODE_ENV === 'development') {
	  var compiler = (0, _webpack2.default)(_webpackConfig2.default);
	  app.use((0, _webpackDevMiddleware2.default)(compiler, { noInfo: true, publicPath: _webpackConfig2.default.output.publicPath }));
	  app.use((0, _webpackHotMiddleware2.default)(compiler));
	}

	// React And Redux Setup


	// Import required modules


	// Set native promises as mongoose promise
	_mongoose2.default.Promise = global.Promise;

	// MongoDB Connection
	_mongoose2.default.connect(_config2.default.mongoURL, function (error) {
	  if (error) {
	    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
	    throw error;
	  } else {
	    (0, _util.fetchUtil)();
	  }
	});

	// Apply body Parser and server public assets and routes
	app.use((0, _compression2.default)());
	app.use(_bodyParser2.default.json({ limit: '20mb' }));
	app.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist')));
	app.use('/api', _post2.default, _user2.default, _module2.default, _section2.default, _quiz2.default, _score2.default);

	// Render Initial HTML
	var renderFullPage = function renderFullPage(html, initialState) {
	  var head = _reactHelmet2.default.rewind();

	  // Import Manifests
	  var assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
	  var chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

	  return '\n    <!doctype html>\n    <html>\n      <head>\n        ' + head.base.toString() + '\n        ' + head.title.toString() + '\n        ' + head.meta.toString() + '\n        ' + head.link.toString() + '\n        ' + head.script.toString() + '\n\n        ' + (process.env.NODE_ENV === 'production' ? '<link rel=\'stylesheet\' href=\'' + assetsManifest['/app.css'] + '\' />' : '') + '\n        <link href=\'https://fonts.googleapis.com/css?family=Lato:400,300,700\' rel=\'stylesheet\' type=\'text/css\'/>\n        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + ';\n          ' + (process.env.NODE_ENV === 'production' ? '//<![CDATA[\n          window.webpackManifest = ' + JSON.stringify(chunkManifest) + ';\n          //]]>' : '') + '\n        </script>\n        <script src=\'' + (process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js') + '\'></script>\n        <script src=\'' + (process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js') + '\'></script>\n      </body>\n    </html>\n  ';
	};

	var renderError = function renderError(err) {
	  var softTab = '&#32;&#32;&#32;&#32;';
	  var errTrace = process.env.NODE_ENV !== 'production' ? ':<br><br><pre style="color:red">' + softTab + err.stack.replace(/\n/g, '<br>' + softTab) + '</pre>' : '';
	  return renderFullPage('Server Error' + errTrace, {});
	};

	// Server Side Rendering based on routes matched by React-router.
	app.use(function (req, res, next) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirectLocation, renderProps) {
	    if (err) {
	      return res.status(500).end(renderError(err));
	    }

	    if (redirectLocation) {
	      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    }

	    if (!renderProps) {
	      return next();
	    }

	    var store = (0, _store.configureStore)();

	    return (0, _fetchData.fetchComponentData)(store, renderProps.components, renderProps.params).then(function () {
	      var initialView = (0, _server.renderToString)(_jsx(_reactRedux.Provider, {
	        store: store
	      }, void 0, _jsx(_IntlWrapper2.default, {}, void 0, _react2.default.createElement(_reactRouter.RouterContext, renderProps))));
	      var finalState = store.getState();

	      res.set('Content-Type', 'text/html').status(200).end(renderFullPage(initialView, finalState));
	    }).catch(function (error) {
	      return next(error);
	    });
	  });
	});

	// start app
	app.listen(_config2.default.port, function (error) {
	  var now = new Date();
	  var time = 24 + (11 - now.getMonth()) * 30 - now.getDate();
	  if (!error) {
	    console.log('MERN is running on port: ' + _config2.default.port + '! ' + time + ' päivää jouluun!'); // eslint-disable-line
	  }
	});

	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sequence = sequence;
	/**
	 * Throw an array to it and a function which can generate promises
	 * and it will call them sequentially, one after another
	 */
	function sequence(items, consumer) {
	  var results = [];
	  var runner = function runner() {
	    var item = items.shift();
	    if (item) {
	      return consumer(item).then(function (result) {
	        results.push(result);
	      }).then(runner);
	    }

	    return Promise.resolve(results);
	  };

	  return runner();
	}

/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = require("intl");

/***/ },
/* 89 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/en");

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/fi");

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = require("nodemailer");

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = require("postcss-focus");

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = require("postcss-reporter");

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/en");

/***/ },
/* 97 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/fi");

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = require("react-time");

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools");

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-dock-monitor");

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-log-monitor");

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ }
/******/ ]);