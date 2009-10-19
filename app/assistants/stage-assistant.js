//Declare a namespace and some constants.
FiveDice = {};
FiveDice.suggestedScoreColor = "teal"; //Color of the possible scores displayed after each roll.
FiveDice.setScoreColor = "black"; //Color of the scores after they've been set.
FiveDice.rollButtonDisabledTimeout = 1000; //Length of time (ms) the Roll button stays disabled between rolls.

function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	this.controller.pushScene('main');
}
