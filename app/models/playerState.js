//Closure for a player's state object.
FIVEDICE.playerState = function (playerName) {
	//Private variables and accessors:
	var _playerName = playerName;
	function _getName() { return _playerName; }
	
	var _scoreItems = {
		ones:			{buttonModel: {label: "Ones", disabled: false, buttonClass: "small-button"},		score: 0},
		twos:			{buttonModel: {label: "Twos", disabled: false, buttonClass: "small-button"},		score: 0},
		threes:			{buttonModel: {label: "Threes", disabled: false, buttonClass: "small-button"},		score: 0},
		fours:			{buttonModel: {label: "Fours", disabled: false, buttonClass: "small-button"},		score: 0},
		fives:			{buttonModel: {label: "Fives", disabled: false, buttonClass: "small-button"},		score: 0},
		sixes:			{buttonModel: {label: "Sixes", disabled: false, buttonClass: "small-button"},		score: 0},
		threeOfAKind:	{buttonModel: {label: "3 of a kind", disabled: false, buttonClass: "small-button"},	score: 0},
		fourOfAKind:	{buttonModel: {label: "4 of a kind", disabled: false, buttonClass: "small-button"},	score: 0},
		fullHouse:		{buttonModel: {label: "Full house", disabled: false, buttonClass: "small-button"},	score: 0},
		smallStraight:	{buttonModel: {label: "Sm. straight", disabled: false, buttonClass: "small-button"},score: 0},
		largeStraight:	{buttonModel: {label: "Lg. straight", disabled: false, buttonClass: "small-button"},score: 0},
		fiveOfAKind:	{buttonModel: {label: "5 of a kind", disabled: false, buttonClass: "small-button"},	score: 0},
		chance:			{buttonModel: {label: "Chance", disabled: false, buttonClass: "small-button"},		score: 0}
	};
	function _getButtonModel(item) { return _scoreItems[item].buttonModel; }
	function _getScore(item) { return _scoreItems[item].score; }
	
	var _lastScoreItemSet = "";
	var _lastScoreItemWasExtraFiveOfAKind = false;
	
	//Private functions:
	function _setScoreSuggestions(dice) {
		//See if there's already a score on 5 of a kind, which can affect how we score the straights.
		var fiveOfAKindIsAlreadyScored = (_scoreItems.fiveOfAKind.buttonModel.disabled && _scoreItems.fiveOfAKind.score > 0);
		//Also check to see if the dice show five of a kind and there's already a score
		//on the upper-half item that matches the dice's face value.
		var upperHalfItem = null;
		switch (dice.getDie(0).getValue()) {
		case 1:
			upperHalfItem = _scoreItems.ones;
			break;
		case 2:
			upperHalfItem = _scoreItems.twos;
			break;
		case 3:
			upperHalfItem = _scoreItems.threes;
			break;
		case 4:
			upperHalfItem = _scoreItems.fours;
			break;
		case 5:
			upperHalfItem = _scoreItems.fives;
			break;
		case 6:
			upperHalfItem = _scoreItems.sixes;
			break;
		}
		var upperHalfIsAlreadyScored = (upperHalfItem.buttonModel.disabled);
		var fiveOfAKindCanCountAsStraight = (fiveOfAKindIsAlreadyScored && upperHalfIsAlreadyScored);
		
		//Set scores for items that aren't already set.
		if (!_scoreItems.ones.buttonModel.disabled) { _scoreItems.ones.score = dice.upperHalfScore(1); }
		if (!_scoreItems.twos.buttonModel.disabled) { _scoreItems.twos.score = dice.upperHalfScore(2); }
		if (!_scoreItems.threes.buttonModel.disabled) { _scoreItems.threes.score = dice.upperHalfScore(3); }
		if (!_scoreItems.fours.buttonModel.disabled) { _scoreItems.fours.score = dice.upperHalfScore(4); }
		if (!_scoreItems.fives.buttonModel.disabled) { _scoreItems.fives.score = dice.upperHalfScore(5); }
		if (!_scoreItems.sixes.buttonModel.disabled) { _scoreItems.sixes.score = dice.upperHalfScore(6); }
		if (!_scoreItems.threeOfAKind.buttonModel.disabled) { _scoreItems.threeOfAKind.score = dice.threeOfAKindScore(); }
		if (!_scoreItems.fourOfAKind.buttonModel.disabled) { _scoreItems.fourOfAKind.score = dice.fourOfAKindScore(); }
		if (!_scoreItems.fullHouse.buttonModel.disabled) { _scoreItems.fullHouse.score = dice.fullHouseScore(); }
		if (!_scoreItems.smallStraight.buttonModel.disabled) {
			if (dice.fiveOfAKindScore() > 0 && fiveOfAKindCanCountAsStraight) {
				_scoreItems.smallStraight.score = 30;
			}
			else {
				_scoreItems.smallStraight.score = dice.smallStraightScore();
			}
		}//if
		if (!_scoreItems.largeStraight.buttonModel.disabled) {
			if (dice.fiveOfAKindScore() > 0 && fiveOfAKindCanCountAsStraight) {
				_scoreItems.largeStraight.score = 40;
			}
			else {
				_scoreItems.largeStraight.score = dice.largeStraightScore();
			}
		}//if
		if (!_scoreItems.fiveOfAKind.buttonModel.disabled) { _scoreItems.fiveOfAKind.score = dice.fiveOfAKindScore(); }
		if (!_scoreItems.chance.buttonModel.disabled) { _scoreItems.chance.score = dice.chanceScore(); }
	}//_setScoreSuggestions()
	
	function _setScore(item, dice) {
		//See if an extra 5 of a kind is merited.
		if (dice.fiveOfAKindScore() > 0 && _scoreItems.fiveOfAKind.buttonModel.disabled && _scoreItems.fiveOfAKind.score > 0) {
			//For upper-half items, that's all we need; this is an extra 5 of a kind.
			var upperHalfItems = ["ones", "twos", "threes", "fours", "fives", "sixes"];
			var isUpperHalf = false;
			for (var i = 0; i < upperHalfItems.length; i++) {
				if (item == upperHalfItems[i]) {
					isUpperHalf = true;
					break;
				}
			}//for
			if (isUpperHalf) {
				_scoreItems.fiveOfAKind.score += 100;
				_lastScoreItemWasExtraFiveOfAKind = true;
			}
			else {
				//For lower-half items, there's an additional requirement that the upper-half item already be set.
				var upperHalfItem = null;
				switch (dice.getDie(0).getValue()) {
				case 1:
					upperHalfItem = _scoreItems.ones;
					break;
				case 2:
					upperHalfItem = _scoreItems.twos;
					break;
				case 3:
					upperHalfItem = _scoreItems.threes;
					break;
				case 4:
					upperHalfItem = _scoreItems.fours;
					break;
				case 5:
					upperHalfItem = _scoreItems.fives;
					break;
				case 6:
					upperHalfItem = _scoreItems.sixes;
					break;
				}
				if (upperHalfItem.buttonModel.disabled) {
					_scoreItems.fiveOfAKind.score += 100;
					_lastScoreItemWasExtraFiveOfAKind = true;
				}
				else {
					_lastScoreItemWasExtraFiveOfAKind = false;
				}
			}//if
		}//if
		//Lock in this item's score by disabling the button.
		_scoreItems[item].buttonModel.disabled = true;
		_lastScoreItemSet = item;
	}//_setScore()
	
	function _undoLastScore() {
		_scoreItems[_lastScoreItemSet].buttonModel.disabled = false;
		if (_lastScoreItemWasExtraFiveOfAKind) { _scoreItems.fiveOfAKind.score -= 100; }
		return _lastScoreItemSet;
	}//_undoLastScore()
	
	function _allScoresAreSet() {
		for (var itemName in _scoreItems) {
			if (_scoreItems.hasOwnProperty(itemName) && !_scoreItems[itemName].buttonModel.disabled) { return false; }
		}
		return true;
	}//_allScoresAreSet()
	
	function _clearAllScores() {
		for (var itemName in _scoreItems) {
			if (_scoreItems.hasOwnProperty(itemName)) {
				_scoreItems[itemName].buttonModel.disabled = false;
				_scoreItems[itemName].score = 0;
			}
		}//for
	}//_clearAllScores()
	
	function _getSubtotal() {
		var subtotal = 0;
		var upperHalfItems = ["ones", "twos", "threes", "fours", "fives", "sixes"];
		for (var i = 0; i < upperHalfItems.length; i++) {
			itemName = upperHalfItems[i];
			if (_scoreItems[itemName].buttonModel.disabled) { subtotal += _scoreItems[itemName].score; }
		}
		return subtotal;
	}//_getSubtotal()
	
	function _getBenchmark() {
		var benchmark = 0;
		if (_scoreItems.ones.buttonModel.disabled) { benchmark += 3; }
		if (_scoreItems.twos.buttonModel.disabled) { benchmark += 6; }
		if (_scoreItems.threes.buttonModel.disabled) { benchmark += 9; }
		if (_scoreItems.fours.buttonModel.disabled) { benchmark += 12; }
		if (_scoreItems.fives.buttonModel.disabled) { benchmark += 15; }
		if (_scoreItems.sixes.buttonModel.disabled) { benchmark += 18; }
		return benchmark;
	}//_getBenchmark()
	
	function _getTotal() {
		var total = 0;
		for (var itemName in _scoreItems) {
			if (_scoreItems.hasOwnProperty(itemName) && _scoreItems[itemName].buttonModel.disabled) { total += _scoreItems[itemName].score; }
		}
		if (_getSubtotal() >= 63) { total += 35; } //Bonus
		return total;
	}//_getTotal()
	
	//Public API:
	return {
		getName: _getName,
		getButtonModel: _getButtonModel,
		getScore: _getScore,
		setScoreSuggestions: _setScoreSuggestions,
		setScore: _setScore,
		undoLastScore: _undoLastScore,
		allScoresAreSet: _allScoresAreSet,
		clearAllScores: _clearAllScores,
		getSubtotal: _getSubtotal,
		getBenchmark: _getBenchmark,
		getTotal: _getTotal
	};
};
