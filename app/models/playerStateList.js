//Closure for the list of players
FIVEDICE.playerStateList = function () {
	//Private variables and accessors.
	var _playerStateList = [];
	
	//Private functions.
	function _count() {
		return _playerStateList.length;
	}//_count()
	
	function _addPlayer(playerName) {
		_playerStateList.push(FIVEDICE.playerState(playerName));
	}//_addPlayer()
	
	function _firstPlayer() {
		return _playerStateList[0];
	}//_firstPlayer()
	
	function _nextPlayer(afterWhom) {
		//Find the "afterWhom" player in the list.
		var whomIndex;
		for (whomIndex = 0; whomIndex < _playerStateList.length; whomIndex++) {
			if (_playerStateList[whomIndex].getName() == afterWhom) { break; }
		}
		var nextPlayerIndex = whomIndex + 1;
		if (nextPlayerIndex == _playerStateList.length) { nextPlayerIndex = 0; }
		return _playerStateList[nextPlayerIndex];
	}//_nextPlayer()
	
	function _getScores() {
		var scores = [];
		for (var i = 0; i < _playerStateList.length; i++) {
			scores.push({name: _playerStateList[i].getName(), score: _playerStateList[i].getTotal()});
		}
		return scores;
	}//_getScores()
	
	function _allPlayersAreDone() {
		var allScoresAreSet = true;
		for (var i = 0; i < _playerStateList.length; i++) {
			if (!_playerStateList[i].allScoresAreSet()) {
				allScoresAreSet = false;
				break;
			}
		}//for
		return allScoresAreSet;
	}//_allPlayersAreDone()
	
	function _resetAllPlayers() {
		for (var i = 0; i < _playerStateList.length; i++) {
			_playerStateList[i].clearAllScores();
		}
	}//_resetAllPlayers()
	
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
