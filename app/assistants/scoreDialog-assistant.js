function ScoreDialogAssistant(sceneAssistant, mode) {
	this.sceneAssistant = sceneAssistant;
	this.mode = mode;
};

ScoreDialogAssistant.prototype.setup = function (widget) {
	this.widget = widget;
	var scores = FIVEDICE.players.getScores();
	
	//Set the title and buttons according to the mode.
	switch (this.mode) {
	case "currentScores":
		this.sceneAssistant.controller.get("title").innerHTML = "Current Scores";
		this.sceneAssistant.controller.get("buttonGroup").innerHTML = '<div id="okButton" x-mojo-element="Button"></div>';
		this.sceneAssistant.controller.setupWidget("okButton", {}, {label: "OK", disabled: false});
		this.sceneAssistant.controller.listen("okButton", Mojo.Event.tap, this.widget.mojo.close);
		break;
	case "finalScores":
		//Sort the final scores highest-first.
		scores = scores.sort(function (a, b) {return b.score - a.score;});
		this.sceneAssistant.controller.get("title").innerHTML = scores[0].name + " Wins!";
		this.sceneAssistant.controller.get("buttonGroup").innerHTML = '<div id="playAgainButton" x-mojo-element="Button"></div>';
		this.sceneAssistant.controller.get("buttonGroup").innerHTML += '<div id="changePlayersButton" x-mojo-element="Button"></div>';
		this.sceneAssistant.controller.setupWidget("playAgainButton", {}, {label: "Play Again", disabled: false});
		this.sceneAssistant.controller.setupWidget("changePlayersButton", {}, {label: "Change Players", disabled: false});
		this.playAgainHandler = this.playAgain.bindAsEventListener(this);
		this.sceneAssistant.controller.listen("playAgainButton", Mojo.Event.tap, this.playAgainHandler);
		this.changePlayersHandler = function () {Mojo.Controller.stageController.swapScene("playerList");}.bindAsEventListener(this);
		this.sceneAssistant.controller.listen("changePlayersButton", Mojo.Event.tap, this.changePlayersHandler);
		break;
	}//switch
	
	//Populate the scores.
	var namesElement = this.sceneAssistant.controller.get("names");
	var scoresElement = this.sceneAssistant.controller.get("scores");
	var notesElement = this.sceneAssistant.controller.get("notes");
	var storedScores = FIVEDICE.highScores.getScores().sort(function (a, b) {return b.score - a.score;});
	for (var i = 0; i < scores.length; i++) {
		if (i > 0) {
			namesElement.innerHTML += "<br />";
			scoresElement.innerHTML += "<br />";
			notesElement.innerHTML += "<br />";
		}
		namesElement.innerHTML += scores[i].name;
		scoresElement.innerHTML += scores[i].score;
		if (this.mode == "finalScores") {
			if (storedScores.length > 0 && scores[i].score == storedScores[0].score) {
				notesElement.innerHTML += "New high!";
			}
			else if (storedScores.length <= 10 || (storedScores.length > 10 && scores[i].score > storedScores[10].score)) {
				notesElement.innerHTML += "Top ten!";
			}
			else if (storedScores.length > 1 && scores[i].score == storedScores[storedScores.length - 1].score) {
				notesElement.innerHTML += "New low!";
			}
			else if (storedScores.length > 11 && scores[i].score < storedScores[storedScores.length - 11].score) {
				notesElement.innerHTML += "Bottom ten!";
			}
		}//if
	}//for
};//setup

ScoreDialogAssistant.prototype.cleanup = function () {
	//Stop listening to whichever events were set up in the setup method.
	switch (this.mode) {
	case "currentScores":
		this.sceneAssistant.controller.stopListening("okButton", Mojo.Event.tap, this.widget.mojo.close);
		break;
	case "finalScores":
		this.sceneAssistant.controller.stopListening("playAgainButton", Mojo.Event.tap, this.playAgainHandler);
		this.sceneAssistant.controller.stopListening("changePlayersButton", Mojo.Event.tap, this.changePlayersHandler);
		break;
	}//switch
};//cleanup

ScoreDialogAssistant.prototype.playAgain = function () {
	FIVEDICE.players.resetAllPlayers();
	Mojo.Controller.stageController.swapScene("main", FIVEDICE.players.firstPlayer());
	this.widget.mojo.close;
};//playAgain
