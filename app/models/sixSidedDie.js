//Closure for individual dice:
FiveDice.sixSidedDie = function() {
	//Private variables/accessors:
	var _held = false;
	function _getHeld() { return _held; };
	function _setHeld(held) { _held = held; };
	
	var _value = 0;
	function _getValue() { return _value; };
	
	var _previousHeld = _held;
	var _previousValue = _value;
	
	//Private functions:
	function _roll() {
		_value = (Math.round(Math.random() * 5)) + 1;
	};
	
	function _clear() {
		_previousHeld = _held;
		_previousValue = _value;
		_held = false;
		_value = 0;
	};
	
	function _revert() {
		_held = _previousHeld;
		_value = _previousValue;
	};
	
	//Public API:
	return {
		getHeld: _getHeld,
		setHeld: _setHeld,
		getValue: _getValue,
		roll: _roll,
		clear: _clear,
		revert: _revert
	};
};
