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
	}
	
	//Populate the scores.
	this.sceneAssistant.controller.get("names").innerHTML = scores[0].name;
	this.sceneAssistant.controller.get("scores").innerHTML = scores[0].score;
	for (var i = 1; i < scores.length; i++) {
		this.sceneAssistant.controller.get("names").innerHTML += "<br />" + scores[i].name;
		this.sceneAssistant.controller.get("scores").innerHTML += "<br />" + scores[i].score;
	}
};

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
	}
};

ScoreDialogAssistant.prototype.playAgain = function () {
	FIVEDICE.players.resetAllPlayers();
	var sceneParameters = {name: "main", transition: Mojo.Transition.none};
	Mojo.Controller.stageController.swapScene(sceneParameters, FIVEDICE.players.firstPlayer());
	this.widget.mojo.close;
};
