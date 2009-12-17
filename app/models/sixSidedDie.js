//Closure for individual dice:
FIVEDICE.sixSidedDie = function () {
	//Private variables and accessors:
	var _held = false;
	function _isHeld() { return _held; };
	
	var _value = 0;
	function _getValue() { return _value; };
	
	var _previousHeld = _held;
	var _previousValue = _value;
	
	//Private functions:
	function _roll() {
		_value = Math.floor((Math.random() * 6) + 1);
		_previousValue = _value;
		_previousHeld = false;
	};//_roll
	
	function _toggleHeld() {
		//Only allow the die to be held if it has a non-zero value.
		_held = (_value == 0 ? false : !_held);
		_previousHeld = _held;
	};//_toggleHeld
	
	function _clear() {
		_held = false;
		_value = 0;
	};//_clear
	
	function _revert() {
		_held = _previousHeld;
		_value = _previousValue;
	};//_revert
	
	//Public API:
	return {
		isHeld: _isHeld,
		getValue: _getValue,
		roll: _roll,
		toggleHeld: _toggleHeld,
		clear: _clear,
		revert: _revert
	};
};
