//Declare a namespace and some constants.
FiveDice = {};
FiveDice.suggestedScoreColor = "teal";
FiveDice.setScoreColor = "black";

function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	this.controller.pushScene('main');
}
