//Closure for the group of dice.
FIVEDICE.yahtzeeDice = function () {
	//Private variables and accessors:
	var _dieArray = [
		FIVEDICE.sixSidedDie(),
		FIVEDICE.sixSidedDie(),
		FIVEDICE.sixSidedDie(),
		FIVEDICE.sixSidedDie(),
		FIVEDICE.sixSidedDie()];
	function _getDie(index) { return _dieArray[index]; };
	
	var _rollCount = 1;
	function _getRollCount() { return _rollCount; };
	
	var _previousRollCount = _rollCount;
	
	//Private functions:
	function _numberOfDice() {
		return _dieArray.length;
	};//_numberOfDice
	
	function _roll() {
		for (var i = 0; i < _dieArray.length; i++){
			if (!_dieArray[i].isHeld()) { _dieArray[i].roll(); }
		}
		_rollCount++;
		_previousRollCount = _rollCount;
	};//_roll
	
	function _clear() {
		for (var i = 0; i < _dieArray.length; i++) {
			_dieArray[i].clear();
		}
		_rollCount = 1;
	};//_clear
	
	function _revert() {
		for (var i = 0; i < _dieArray.length; i++) {
			_dieArray[i].revert();
		}
		_rollCount = _previousRollCount;
	};//_revert
	
	function _upperHalfScore(targetValue) {
		var score = 0;
		for (var i = 0; i < _dieArray.length; i++) {
			if (_dieArray[i].getValue() == targetValue) {
				score += _dieArray[i].getValue();
			}
		}//for
		return score;
	};//_upperHalfScore
	
	function _threeOfAKindScore() {
		var matches = [];
		for (var startingDie = 0; startingDie < 3 && matches.length < 3; startingDie++) {
			matches = [_dieArray[startingDie].getValue()];
			for (var i = startingDie + 1; i < _dieArray.length; i++) {
				if (_dieArray[i].getValue() == _dieArray[startingDie].getValue()) {
					matches.push(_dieArray[i].getValue());
				}
			}//for
		}//for
		var score = 0;
		if (matches.length >= 3) {
			score =
			_dieArray[0].getValue() +
			_dieArray[1].getValue() +
			_dieArray[2].getValue() +
			_dieArray[3].getValue() +
			_dieArray[4].getValue();
		}
		return score;
	};//_threeOfAKindScore
	
	function _fourOfAKindScore() {
		var matches = [];
		for (var startingDie = 0; startingDie < 4 && matches.length < 4; startingDie++) {
			matches = [_dieArray[startingDie].getValue()];
			for (var i = startingDie + 1; i < _dieArray.length; i++) {
				if (_dieArray[i].getValue() == _dieArray[startingDie].getValue()) {
					matches.push(_dieArray[i].getValue());
				}
			}//for
		}//for
		var score = 0;
		if (matches.length >= 4) {
			score =
			_dieArray[0].getValue() +
			_dieArray[1].getValue() +
			_dieArray[2].getValue() +
			_dieArray[3].getValue() +
			_dieArray[4].getValue();
		}
		return score;
	};//_fourOfAKindScore
	
	function _fullHouseScore() {
		//Sort the values of the dice.
		var values = [
			_dieArray[0].getValue(),
			_dieArray[1].getValue(),
			_dieArray[2].getValue(),
			_dieArray[3].getValue(),
			_dieArray[4].getValue()].sort();
		//See if we got a full house by checking that the first two values match,
		//the last two values match, and the middle value matches one of the adjacent values.
		var score = 0;
		if (
			values[0] == values[1] &&
			values[3] == values[4] &&
			(values[1] == values[2] || values[2] == values[3])
		) {
			score = 25;
		}
		return score;
	};//_fullHouseScore
	
	function _smallStraightScore() {
		var score = 0;
		//Sort the values of the dice.
		var values = [
			_dieArray[0].getValue(),
			_dieArray[1].getValue(),
			_dieArray[2].getValue(),
			_dieArray[3].getValue(),
			_dieArray[4].getValue()].sort();
		//To eliminate having to work around duplicate values, get an array of distinct values.
		var distinctValues = [values[0]];
		for (var i = 1; i < values.length; i++) {
			if (values[i] != values[i - 1]) { distinctValues.push(values[i]); }
		}
		//We can only have a small straight if we have four or more distinct values.
		if (distinctValues.length == 5) {
			//See if we got a straight across the middle three values, plus one of the outer values.
			var centerStraight = (
				distinctValues[1] == (distinctValues[2] - 1) &&
				distinctValues[2] == (distinctValues[3] - 1)
			);
			var consecutiveEnd = (
				distinctValues[0] == (distinctValues[1] - 1) ||
				distinctValues[3] == (distinctValues[4] - 1)
			);
			if (centerStraight && consecutiveEnd) {
				score = 30;
			}
		}
		else if (distinctValues.length == 4) {
			//See if we got a straight across all four distinct values.
			if (
				distinctValues[0] == (distinctValues[1] - 1) &&
				distinctValues[1] == (distinctValues[2] - 1) &&
				distinctValues[2] == (distinctValues[3] - 1)
			) {
				score = 30;
			}
		}//if
		return score;
	};//_smallStraightScore
	
	function _largeStraightScore() {
		var score = 0;
		//Sort the values of the dice.
		var values = [
			_dieArray[0].getValue(),
			_dieArray[1].getValue(),
			_dieArray[2].getValue(),
			_dieArray[3].getValue(),
			_dieArray[4].getValue()].sort();
		//See if we got a straight across all the dice.
		if (
			values[0] == (values[1] - 1) &&
			values[1] == (values[2] - 1) &&
			values[2] == (values[3] - 1) &&
			values[3] == (values[4] - 1)
		) {
			score = 40;
		}
		return score;
	};//_largeStraightScore
	
	function _fiveOfAKindScore() {
		if (
			_dieArray[0].getValue() == _dieArray[1].getValue() &&
			_dieArray[1].getValue() == _dieArray[2].getValue() &&
			_dieArray[2].getValue() == _dieArray[3].getValue() &&
			_dieArray[3].getValue() == _dieArray[4].getValue()
		) {
			return 50;
		}
		else {
			return 0;
		}
	};//_fiveOfAKindScore
	
	function _chanceScore() {
		var score = 0;
		for (var i = 0; i < _dieArray.length; i++) {
			score += _dieArray[i].getValue();
		}
		return score;
	};//_chanceScore
	
	//Public API:
	return {
		getDie: _getDie,
		getRollCount: _getRollCount,
		numberOfDice: _numberOfDice,
		roll: _roll,
		clear: _clear,
		revert: _revert,
		upperHalfScore: _upperHalfScore,
		threeOfAKindScore: _threeOfAKindScore,
		fourOfAKindScore: _fourOfAKindScore,
		fullHouseScore: _fullHouseScore,
		smallStraightScore: _smallStraightScore,
		largeStraightScore: _largeStraightScore,
		fiveOfAKindScore: _fiveOfAKindScore,
		chanceScore: _chanceScore
	};
};
