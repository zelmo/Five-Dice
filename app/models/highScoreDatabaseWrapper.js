//Wrapper for storage and retrieval of scores in the database.
FIVEDICE.highScoreDatabaseWrapper = function () {
	//Private variables:
	var _depot = new Mojo.Depot(
		{name: "ext:highScores", version: 1, replace: false},
		_initializeScores,
		function (result) {Mojo.Log.error("Can't open the high scores database:", result);}
	);
	var _scores = {items: []};
	var _failedAttemptsAtSaving = 0;
	
	//Private functions:
	function _initializeScores() {
		_depot.get(
			"scores",
			function (storedScores) {if (storedScores != null ) { _scores = storedScores; }},
			//function () {_depot.removeAll();}, //for clearing out the database
			function () {Mojo.Log.warn("No scores were found in the depot.");}
		);
	};
	
	function _addScore(name, unixTime, score) {
		//Add the score to the private array and update the depot.
		_scores.items.push({"playerName": name, "timeStamp": unixTime, "score": score});
		_depot.add("scores", _scores, function () {_failedAttemptsAtSaving = 0;}, _clearOutOldestRecordAndTryInsertAgain);
	};
	
	function _clearOutOldestRecordAndTryInsertAgain() {
		if (_scores.items.length == 0) {
			Mojo.Log.warn("Failed to add any scores to the depot.");
			return;
		}
		Mojo.Log.warn("Depot may be full. Splicing the _scores array and trying again.");
		_failedAttemptsAtSaving++;
		if (_failedAttemptsAtSaving > 2) {
			//If reducing the array size twice doesn't make the new score fit, the array size is probably not the problem.
			Mojo.Log.warn("Failed twice to get the _scores array down to a size that will fit in the depot. No further attempts will be made.");
			return;
		}
		_scores.items.splice(0, 1);
		_depot.add("scores", _scores, function () {_failedAttemptsAtSaving = 0;}, _clearOutOldestRecordAndTryInsertAgain);
	};
	
	function _getScores() {
		return _scores.items;
	};
	
	//Public API:
	return {
		addScore: _addScore,
		getScores: _getScores
	};
};
