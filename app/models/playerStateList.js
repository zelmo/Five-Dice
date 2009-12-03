//Closure for the list of players
FIVEDICE.playerStateList = function () {
	//Private variables and accessors.
	var _playerStateList = [];
	
	//Private functions.
	function _count() {
		return _playerStateList.length;
	};
	
	function _addPlayer(playerName) {
		_playerStateList.push(FIVEDICE.playerState(playerName));
	}
	
	function _firstPlayer() {
		return _playerStateList[0];
	};
	
	function _nextPlayer(afterWhom) {
		//Find the "afterWhom" player in the list.
		var whomIndex;
		for (whomIndex = 0; whomIndex < _playerStateList.length; whomIndex++) {
			if (_playerStateList[whomIndex].getName() == afterWhom) {
				break;
			}
		}
		var nextPlayerIndex = whomIndex + 1;
		if (nextPlayerIndex == _playerStateList.length) { nextPlayerIndex = 0; }
		return _playerStateList[nextPlayerIndex];
	};
	
	function _getScores() {
		var scores = [];
		for (var i = 0; i < _playerStateList.length; i++) {
			scores.push({name: _playerStateList[i].getName(), score: _playerStateList[i].getTotal()});
		}
		return scores;
	};
	
	function _allPlayersAreDone() {
		var allScoresAreSet = true;
		for (var i = 0; i < _playerStateList.length; i++) {
			if (!_playerStateList[i].allScoresAreSet()) {
				allScoresAreSet = false;
				break;
			}
		}
		return allScoresAreSet;
	};
	
	function _resetAllPlayers() {
		for (var i = 0; i < _playerStateList.length; i++) {
			_playerStateList[i].clearAllScores();
		}
	};
	
	//Public API.
	return {
		count: _count,
		addPlayer: _addPlayer,
		firstPlayer: _firstPlayer,
		nextPlayer: _nextPlayer,
		getScores: _getScores,
		allPlayersAreDone: _allPlayersAreDone,
		resetAllPlayers: _resetAllPlayers
	};
};
