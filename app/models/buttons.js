//Closure for button models and functions.
FiveDice.buttonModels = function() {
	//Private variables:
	var _ones			= {label: "Ones",			disabled: false};
	var _twos			= {label: "Twos",			disabled: false};
	var _threes			= {label: "Threes",			disabled: false};
	var _fours			= {label: "Fours",			disabled: false};
	var _fives			= {label: "Fives",			disabled: false};
	var _sixes			= {label: "Sixes",			disabled: false};
	var _threeOfAKind	= {label: "3 of a kind",	disabled: false};
	var _fourOfAKind	= {label: "4 of a kind",	disabled: false};
	var _fullHouse		= {label: "Full house",		disabled: false};
	var _smallStraight	= {label: "Sm. straight",	disabled: false};
	var _largeStraight	= {label: "Lg. straight",	disabled: false};
	var _fiveOfAKind	= {label: "5 of a kind",	disabled: false};
	var _chance			= {label: "Chance",			disabled: false};
	var _roll			= {label: "Roll 1",			disabled: false};
	
	//Private functions:
	function _allButtonsAreDisabled() {
		return (_ones.disabled && _twos.disabled && _threes.disabled &&
			_fours.disabled && _fives.disabled && _sixes.disabled &&
			_threeOfAKind.disabled && _fourOfAKind.disabled && _fullHouse.disabled &&
			_smallStraight.disabled && _largeStraight.disabled && _fiveOfAKind.disabled &&
			_chance.disabled);
	};
	
	function _enableAllButtons() {
		_ones.disabled = false;
		_twos.disabled = false;
		_threes.disabled = false;
		_fours.disabled = false;
		_fives.disabled = false;
		_sixes.disabled = false;
		_threeOfAKind.disabled = false;
		_fourOfAKind.disabled = false;
		_fullHouse.disabled = false;
		_smallStraight.disabled = false;
		_largeStraight.disabled = false;
		_fiveOfAKind.disabled = false;
		_chance.disabled = false;
		_roll.disabled = false;
	};
	
	//Public API:
	return {
		ones: _ones,
		twos: _twos,
		threes: _threes,
		fours: _fours,
		fives: _fives,
		sixes: _sixes,
		threeOfAKind: _threeOfAKind,
		fourOfAKind: _fourOfAKind,
		fullHouse: _fullHouse,
		smallStraight: _smallStraight,
		largeStraight: _largeStraight,
		fiveOfAKind: _fiveOfAKind,
		chance: _chance,
		roll: _roll,
		allButtonsAreDisabled: _allButtonsAreDisabled,
		enableAllButtons: _enableAllButtons
	};
};
