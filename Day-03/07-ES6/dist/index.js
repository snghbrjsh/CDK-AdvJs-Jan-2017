'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log('Welcome to ES6!');

var EmployeeBase = function () {
	function EmployeeBase(id, name, salary) {
		_classCallCheck(this, EmployeeBase);

		this.__id = id;
		this.name = name;
		this.salary = salary;
	}

	_createClass(EmployeeBase, [{
		key: 'display',
		value: function display() {
			console.log('id = ' + this.id + ', name = ' + this.name + ', salary=' + this.salary);
		}
	}, {
		key: 'id',
		get: function get() {
			console.log('id getter triggered');
			return this.__id;
		},
		set: function set(val) {
			console.log('id setter triggered');
			if (val < 0) throw new Error('Invalid id');
			this.__id = val;
		}
	}], [{
		key: 'isEmployee',
		value: function isEmployee(obj) {
			return obj instanceof Employee;
		}
	}]);

	return EmployeeBase;
}();

var FulltimeEmployee = function (_EmployeeBase) {
	_inherits(FulltimeEmployee, _EmployeeBase);

	function FulltimeEmployee(id, name, salary, benefits) {
		_classCallCheck(this, FulltimeEmployee);

		var _this = _possibleConstructorReturn(this, (FulltimeEmployee.__proto__ || Object.getPrototypeOf(FulltimeEmployee)).call(this, id, name, salary));

		_this.benefits = benefits;
		return _this;
	}

	return FulltimeEmployee;
}(EmployeeBase);

function add() {
	function parseArg(n) {
		if (Array.isArray(n)) return add.apply(undefined, _toConsumableArray(n));
		if (typeof n === 'function') return parseArg(n());
		return isNaN(n) ? 0 : parseInt(n, 10);
	}

	for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
		values[_key] = arguments[_key];
	}

	return values.length <= 1 ? parseArg(values[0]) : parseArg(values[0]) + add(values.slice(1));
}

var n = 'CDK';

n = 'Intel';