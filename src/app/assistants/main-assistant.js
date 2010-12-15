function MainAssistant(playerState) {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	  
	//Create a Yahtzee dice object.
	this.dice = FIVEDICE.yahtzeeDice();
	//Set the player for this scene.
	this.player = playerState;
	//Set a button model for the Roll button.
	this.rollModel = {label: "Roll 1", disabled: false};
	
	//Define the application menu model here so that it can be manipulated at run-time.
	this.menuModel = {
		visible: true,
		items: [
			{label: "New Game", command: "do-newGame"},
			{label: "Undo", command: "do-undo", disabled: true},
			{label: "High Scores", command: "do-highScores"},
			{label: "Preferences", command: "do-preferences"},
			{label: "About #{appName}".interpolate({appName: Mojo.Controller.appInfo.title}), command: "do-about"},
			{label: "Help", command: "do-help"}
		]
	};
	//Add a Current Scores item to the menu if there's more than one player.
	if (FIVEDICE.players.count() > 1) { this.menuModel.items.splice(2, 0, {label: "Current Scores", command: "do-currentScores"}); }
	
	//For convenience, define an array of score items that we can loop over.
	this.scoreItems = ["ones", "twos", "threes", "fours", "fives", "sixes", "threeOfAKind", "fourOfAKind", "fullHouse", "smallStraight", "largeStraight", "fiveOfAKind", "chance"];
}

MainAssistant.prototype.setup = function () {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	//Display the current player's name
	this.controller.get("playerName").innerHTML = this.player.getName();
	
	//Add the "pixi" CSS class to certain elements if DeviceInfo.touchableRows is less than what's defined for Pre.
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		this.controller.get("subtotal").addClassName("pixi");
		var scoreRowElements = $$(".scoreRow"); //Prototype's $$ operator returns an array of elements.
		for (var i = 0; i < scoreRowElements.length; i++) {
			this.controller.get(scoreRowElements[i]).addClassName("pixi");
		}
	}//if
	
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	//Application menu
	this.controller.setupWidget(Mojo.Menu.appMenu, FIVEDICE.MenuAttributes, this.menuModel);
	
	//Upper half score buttons
	this.controller.setupWidget("buttonOnes", {}, this.player.getButtonModel("ones"));
	this.controller.setupWidget("buttonTwos", {}, this.player.getButtonModel("twos"));
	this.controller.setupWidget("buttonThrees", {}, this.player.getButtonModel("threes"));
	this.controller.setupWidget("buttonFours", {}, this.player.getButtonModel("fours"));
	this.controller.setupWidget("buttonFives", {}, this.player.getButtonModel("fives"));
	this.controller.setupWidget("buttonSixes", {}, this.player.getButtonModel("sixes"));
	
	//Lower half score buttons
	this.controller.setupWidget("buttonThreeOfAKind", {}, this.player.getButtonModel("threeOfAKind"));
	this.controller.setupWidget("buttonFourOfAKind", {}, this.player.getButtonModel("fourOfAKind"));
	this.controller.setupWidget("buttonFullHouse", {}, this.player.getButtonModel("fullHouse"));
	this.controller.setupWidget("buttonSmallStraight", {}, this.player.getButtonModel("smallStraight"));
	this.controller.setupWidget("buttonLargeStraight", {}, this.player.getButtonModel("largeStraight"));
	this.controller.setupWidget("buttonFiveOfAKind", {}, this.player.getButtonModel("fiveOfAKind"));
	this.controller.setupWidget("buttonChance", {}, this.player.getButtonModel("chance"));
	
	//Dice and Roll button
	for (i = 0; i < this.dice.numberOfDice(); i++) {
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die" + this.dice.getDie(i).getValue() + ".png\"></img>";
	}
	this.controller.setupWidget("buttonRoll", {}, this.rollModel);

	/* add event handlers to listen to events from widgets */
	
	//Dice tap listeners
	this.die0Handler = function () {this.toggleDie(0);}.bindAsEventListener(this);
	this.controller.listen("die0", Mojo.Event.tap, this.die0Handler);
	this.die1Handler = function () {this.toggleDie(1);}.bindAsEventListener(this);
	this.controller.listen("die1", Mojo.Event.tap, this.die1Handler);
	this.die2Handler = function () {this.toggleDie(2);}.bindAsEventListener(this);
	this.controller.listen("die2", Mojo.Event.tap, this.die2Handler);
	this.die3Handler = function () {this.toggleDie(3);}.bindAsEventListener(this);
	this.controller.listen("die3", Mojo.Event.tap, this.die3Handler);
	this.die4Handler = function () {this.toggleDie(4);}.bindAsEventListener(this);
	this.controller.listen("die4", Mojo.Event.tap, this.die4Handler);
	this.playAgainHandler = this.playAgain.bindAsEventListener(this);
	this.controller.listen("playAgain", Mojo.Event.tap, this.playAgainHandler);
	this.nextPlayerHandler = this.nextPlayer.bindAsEventListener(this);
	this.controller.listen("nextPlayer", Mojo.Event.tap, this.nextPlayerHandler);
	
	//Roll button listener
	this.rollHandler = this.roll.bindAsEventListener(this);
	this.controller.listen("buttonRoll", Mojo.Event.tap, this.rollHandler);
	
	//Upper half score button listeners
	this.onesHandler = function () {this.setScore("ones", true);}.bindAsEventListener(this);
	this.controller.listen("buttonOnes", Mojo.Event.tap, this.onesHandler);
	this.twosHandler = function () {this.setScore("twos", true);}.bindAsEventListener(this);
	this.controller.listen("buttonTwos", Mojo.Event.tap, this.twosHandler);
	this.threesHandler = function () {this.setScore("threes", true);}.bindAsEventListener(this);
	this.controller.listen("buttonThrees", Mojo.Event.tap, this.threesHandler);
	this.foursHandler = function () {this.setScore("fours", true);}.bindAsEventListener(this);
	this.controller.listen("buttonFours", Mojo.Event.tap, this.foursHandler);
	this.fivesHandler = function () {this.setScore("fives", true);}.bindAsEventListener(this);
	this.controller.listen("buttonFives", Mojo.Event.tap, this.fivesHandler);
	this.sixesHandler = function () {this.setScore("sixes", true);}.bindAsEventListener(this);
	this.controller.listen("buttonSixes", Mojo.Event.tap, this.sixesHandler);
	
	//Lower half score button listeners
	this.threeOfAKindHandler = function () {this.setScore("threeOfAKind", false);}.bindAsEventListener(this);
	this.controller.listen("buttonThreeOfAKind", Mojo.Event.tap, this.threeOfAKindHandler);
	this.fourOfAKindHandler = function () {this.setScore("fourOfAKind", false);}.bindAsEventListener(this);
	this.controller.listen("buttonFourOfAKind", Mojo.Event.tap, this.fourOfAKindHandler);
	this.fullHouseHandler = function () {this.setScore("fullHouse", false);}.bindAsEventListener(this);
	this.controller.listen("buttonFullHouse", Mojo.Event.tap, this.fullHouseHandler);
	this.smallStraightHandler = function () {this.setScore("smallStraight", false);}.bindAsEventListener(this);
	this.controller.listen("buttonSmallStraight", Mojo.Event.tap, this.smallStraightHandler);
	this.largeStraightHandler = function () {this.setScore("largeStraight", false);}.bindAsEventListener(this);
	this.controller.listen("buttonLargeStraight", Mojo.Event.tap, this.largeStraightHandler);
	this.fiveOfAKindHandler = function () {this.setScore("fiveOfAKind", false);}.bindAsEventListener(this);
	this.controller.listen("buttonFiveOfAKind", Mojo.Event.tap, this.fiveOfAKindHandler);
	this.chanceHandler = function () {this.setScore("chance", false);}.bindAsEventListener(this);
	this.controller.listen("buttonChance", Mojo.Event.tap, this.chanceHandler);
};//setup()

MainAssistant.prototype.activate = function (event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	  
	//Set up listeners that are dependent on the Preferences.
	if (FIVEDICE.shakeToRoll) {
		this.controller.listen(document, "shakeend", this.rollHandler);
	}
	
	//Set attributes that may have changed in the Preferences.
	this.controller.get("mojo-scene-main-scene-scroller").style.backgroundColor = FIVEDICE.defaultBackgroundColor;
	this.controller.get("subtotal").style.color = FIVEDICE.totalsColor;
	this.controller.get("labelBonus").style.color = FIVEDICE.totalsColor;
	this.controller.get("scoreValueBonus").style.color = FIVEDICE.totalsColor;
	this.controller.get("labelTotal").style.color = FIVEDICE.totalsColor;
	this.controller.get("scoreValueTotal").style.color = FIVEDICE.totalsColor;
	this.showActualScores();
	this.showPossibleScores();
	for (var i = 0; i < this.dice.numberOfDice(); i++) { this.showDie(i); }
};//activate()


MainAssistant.prototype.deactivate = function (event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	  
	//Remove listeners that are dependent on the Preferences.
	this.controller.stopListening(document, "shakeend", this.rollHandler);
};//deactivate()

MainAssistant.prototype.cleanup = function (event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	  
	//Remove event listeners:
	//Dice tap listeners
	this.controller.stopListening("die0", Mojo.Event.tap, this.die0Handler);
	this.controller.stopListening("die1", Mojo.Event.tap, this.die1Handler);
	this.controller.stopListening("die2", Mojo.Event.tap, this.die2Handler);
	this.controller.stopListening("die3", Mojo.Event.tap, this.die3Handler);
	this.controller.stopListening("die4", Mojo.Event.tap, this.die4Handler);
	this.controller.stopListening("playAgain", Mojo.Event.tap, this.playAgainHandler);
	this.controller.stopListening("nextPlayer", Mojo.Event.tap, this.nextPlayerHandler);
	//Roll button listeners
	this.controller.stopListening("buttonRoll", Mojo.Event.tap, this.rollHandler);
	//Upper half score button listeners
	this.controller.stopListening("buttonOnes", Mojo.Event.tap, this.onesHandler);
	this.controller.stopListening("buttonTwos", Mojo.Event.tap, this.twosHandler);
	this.controller.stopListening("buttonThrees", Mojo.Event.tap, this.threesHandler);
	this.controller.stopListening("buttonFours", Mojo.Event.tap, this.foursHandler);
	this.controller.stopListening("buttonFives", Mojo.Event.tap, this.fivesHandler);
	this.controller.stopListening("buttonSixes", Mojo.Event.tap, this.sixesHandler);
	//Lower half score button listeners
	this.controller.stopListening("buttonThreeOfAKind", Mojo.Event.tap, this.threeOfAKindHandler);
	this.controller.stopListening("buttonFourOfAKind", Mojo.Event.tap, this.fourOfAKindHandler);
	this.controller.stopListening("buttonFullHouse", Mojo.Event.tap, this.fullHouseHandler);
	this.controller.stopListening("buttonSmallStraight", Mojo.Event.tap, this.smallStraightHandler);
	this.controller.stopListening("buttonLargeStraight", Mojo.Event.tap, this.largeStraightHandler);
	this.controller.stopListening("buttonFiveOfAKind", Mojo.Event.tap, this.fiveOfAKindHandler);
	this.controller.stopListening("buttonChance", Mojo.Event.tap, this.chanceHandler);
};//cleanup()

MainAssistant.prototype.handleCommand = function (event) {
	if (event.type != Mojo.Event.command) { return; }
	switch (event.command) {
	case "do-newGame":
		Mojo.Controller.stageController.swapScene("playerList");
		break;
	case "do-undo":
		this.undo();
		break;
	case "do-currentScores":
	this.controller.showDialog({template: "main/score-dialog", assistant: new ScoreDialogAssistant(this, "currentScores")});
		break;
	case "do-preferences":
		Mojo.Controller.stageController.pushScene("preferences");
		break;
	case "do-help":
		Mojo.Controller.stageController.pushScene("help");
		break;
	default:
		break;
	}
};//handleCommand()

MainAssistant.prototype.toggleDie = function (dieNumber) {
	var dieElement = this.controller.get("die" + dieNumber);
	var dieImage = "images/Die" + this.dice.getDie(dieNumber).getValue() + ".png";
	var overlayImage = "images/Overlay" + FIVEDICE.heldColor + ".png";

	//Toggle the held state of the die.
	this.dice.getDie(dieNumber).toggleHeld();

	//Find the die's div in the scene and re-apply its image to reflect the new state.
	this.controller.get("die" + dieNumber).innerHTML = "<img src=\"images/Die" + this.dice.getDie(dieNumber).getValue() + ".png\"></img>";
	if (this.dice.getDie(dieNumber).isHeld()){
		dieElement.innerHTML += "<img src=\"" + overlayImage + "\"></img>";
	}
};//toggleDie()

//Die roller
MainAssistant.prototype.roll = function () {
	//In case the shake API was used to roll, check that the Roll button isn't disabled.
	if (this.rollModel.disabled) { return; }
	//Roll the dice and disable the Roll button.
	this.dice.roll();
	this.rollModel.disabled = true;
	this.controller.modelChanged(this.rollModel);
	
	//Blank the dice that are being rolled.
	var i = 0;
	for (i = 0; i < this.dice.numberOfDice(); i++) {
		if (!this.dice.getDie(i).isHeld()) {
			this.controller.get("die" + i).innerHTML = "<img src=\"images/Die0.png\"></img>";
		}
	}
	
	//Set a timeout for displaying each rolled die and doing end-of-roll housekeeping.
	var timeout = 0;
	for (i = 0; i < this.dice.numberOfDice(); i++) {
		if (!this.dice.getDie(i).isHeld()) {
			timeout += (500 - (FIVEDICE.rollSpeed * 50));
			//We have to pass a literal die number to the callback, because a variable as a parameter
			//wouldn't get evaluated until the callback runs, at which point it's always 5.
			switch (i) {
				case 0:
					this.controller.window.setTimeout(function () {this.showDie(0)}.bind(this), timeout);
					break;
				case 1:
					this.controller.window.setTimeout(function () {this.showDie(1)}.bind(this), timeout);
					break;
				case 2:
					this.controller.window.setTimeout(function () {this.showDie(2)}.bind(this), timeout);
					break;
				case 3:
					this.controller.window.setTimeout(function () {this.showDie(3)}.bind(this), timeout);
					break;
				case 4:
					this.controller.window.setTimeout(function () {this.showDie(4)}.bind(this), timeout);
					break;
			}//switch
		}//if
	}//for
	this.controller.window.setTimeout(function () {this.endRoll()}.bind(this), timeout);
};//roll()

MainAssistant.prototype.showDie = function (dieNumber) {
	var dieElement = this.controller.get("die" + dieNumber);
	var dieImage = "images/Die" + this.dice.getDie(dieNumber).getValue() + ".png";
	var overlayImage = "images/Overlay" + FIVEDICE.heldColor + ".png";

	//Freeze the die if that's what the user prefers.
	if (FIVEDICE.freezeDiceAfterRoll && !this.dice.getDie(dieNumber).isHeld()) { this.dice.getDie(dieNumber).toggleHeld(); }
	
	//Show the die and, if held, the overlay.
	dieElement.innerHTML = "<img src=\"" + dieImage + "\"></img>";
	if (this.dice.getDie(dieNumber).isHeld()) {
		dieElement.innerHTML += "<img src=\"" + overlayImage + "\"></img>";
	}
};//showDie()

MainAssistant.prototype.endRoll = function () {
	if (this.dice.getRollCount() <= 3) { this.enableRollButton(); }
	this.showPossibleScores();
	this.disableUndo();
};//endRoll()

MainAssistant.prototype.enableRollButton = function () {
	this.rollModel.label = "Roll " + (this.dice.getRollCount());
	this.rollModel.disabled = false;
	this.controller.modelChanged(this.rollModel);
};//enableRollButton()

MainAssistant.prototype.showPossibleScores = function () {
	this.player.setScoreSuggestions(this.dice);
	for (var i = 0; i < this.scoreItems.length; i++) {
		itemName = this.scoreItems[i];
		if (!this.player.getButtonModel(itemName).disabled) {
			var scoreValueId = "scoreValue" + itemName.charAt(0).toUpperCase() + itemName.slice(1);
			//Don't show a suggested score of zero--leave the field blank instead.
			var suggestedScore = (this.player.getScore(itemName) === 0 ? "" : this.player.getScore(itemName));
			//Display the score in the "suggested" color.
			this.controller.get(scoreValueId).innerHTML = suggestedScore;
			this.controller.get(scoreValueId).style.color = FIVEDICE.suggestedScoreColor;
		}
	}//for
};//showPossibleScores()

MainAssistant.prototype.showActualScores = function () {
	//Show scores that are set, and blank out any that are unset.
	for (var i = 0; i < this.scoreItems.length; i++) {
		itemName = this.scoreItems[i];
		var scoreValueId = "scoreValue" + itemName.charAt(0).toUpperCase() + itemName.slice(1);
		if (this.player.getButtonModel(itemName).disabled) {
			this.controller.get(scoreValueId).innerHTML = this.player.getScore(itemName);
			this.controller.get(scoreValueId).style.color = FIVEDICE.setScoreColor;
		}
		else {
			this.controller.get(scoreValueId).innerHTML = "";
		}
	}//for
	//Update the subtotal and total displays.
	var subtotal = this.player.getSubtotal();
	var subtotalDisplay = "Subtotal &nbsp;&nbsp; " + subtotal;
	if (FIVEDICE.showSubtotalDeviation) {
		var difference = subtotal - this.player.getBenchmark();
		subtotalDisplay += " / " + (difference < 0 ? "" : "+") + (difference);
	}
	this.controller.get("subtotal").innerHTML = subtotalDisplay;
	var bonus = (subtotal >= 63 ? 35 : 0);
	this.controller.get("scoreValueBonus").innerHTML = bonus;
	this.controller.get("scoreValueTotal").innerHTML = this.player.getTotal();
};//showActualScores()

MainAssistant.prototype.setScore = function (itemName) {
	//Tapping next to a disabled button triggers a tap event, which appears to be a Mojo bug.
	//Work around it by ignoring the tap if the button is disabled.
	if (this.player.getButtonModel(itemName).disabled === true) { return; }
	//Make sure the dice have been rolled.
	if (this.dice.chanceScore() === 0) { return; }
	//For multi-player games, make sure we haven't already set a score this turn.
	if (this.controller.get("nextPlayer").style.visibility == "visible") { return; }
	
	//Disable the Roll button.
	this.rollModel.disabled = true;
	this.controller.modelChanged(this.rollModel);
	//Set the score and update the UI.
	this.player.setScore(itemName, this.dice);
	this.controller.modelChanged(this.player.getButtonModel(itemName));
	this.showActualScores();
	//Move along either to the end-of-game stuff, the next player (if there is one), or the next turn.
	if (!this.checkForEndOfGame()) {
		this.enableUndo();
		if (FIVEDICE.players.count() == 1) {
			this.releaseDice();
		}
		else {
			//Hide the dice and show the "Next Player" text.
			for (var i = 0; i < this.dice.numberOfDice(); i++) {
				this.controller.get("die" + i).style.visibility = "hidden";
			}
			this.controller.get("nextPlayer").innerHTML = "Next Player: " + FIVEDICE.players.nextPlayer(this.player.getName()).getName();
			this.controller.get("nextPlayer").style.visibility = "visible";
		}
	}//if
};//setScore()

//Auxiliary functions
MainAssistant.prototype.disableUndo = function () {
	if (!this.menuModel.items[1].disabled) {
		this.menuModel.items[1].disabled = true;
	}
};//disableUndo()

MainAssistant.prototype.enableUndo = function () {
	this.menuModel.items[1].disabled = false;
};//enableUndo()

MainAssistant.prototype.undo = function () {
	var undoneItem = this.player.undoLastScore();
	this.controller.modelChanged(this.player.getButtonModel(undoneItem));
	this.dice.revert();
	this.rollModel.disabled = (this.dice.getRollCount() > 3);
	this.rollModel.label = "Roll " + (this.dice.getRollCount() > 3 ? 3 : this.dice.getRollCount());
	this.controller.modelChanged(this.rollModel);
	for (var i = 0; i < this.dice.numberOfDice(); i++) {
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die" + this.dice.getDie(i).getValue() + ".png\"></img>";
		if (this.dice.getDie(i).isHeld()) {
			this.controller.get("die" + i).innerHTML += "<img src=\"images/Overlay" + FIVEDICE.heldColor + ".png\"></img>";
		}
	}
	//Make sure the dice are visible.
	this.controller.get("nextPlayer").style.visibility = "hidden";
	this.controller.get("playAgain").style.visibility = "hidden";
	for (i = 0; i < this.dice.numberOfDice(); i++) {
		this.controller.get("die" + i).style.visibility = "visible";
	}
	//Re-display the possible scores and disable the Undo menu item.
	this.showPossibleScores();
	this.disableUndo();
};//undo()

MainAssistant.prototype.nextPlayer = function () {
	var sceneParameters = {name: "main", transition: Mojo.Transition.none};
	var nextPlayerState = FIVEDICE.players.nextPlayer(this.player.getName());
	Mojo.Controller.stageController.swapScene(sceneParameters, nextPlayerState);
};//nextPlayer()

MainAssistant.prototype.releaseDice = function () {
	//Blank out and un-hold all the dice.
	this.dice.clear();
	for (var i = 0; i < this.dice.numberOfDice(); i++) {
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die0.png\"></img>";
	}
	//Enable the Roll button.
	this.rollModel.label = "Roll 1";
	this.rollModel.disabled = false;
	this.controller.modelChanged(this.rollModel);
};//releaseDice()

MainAssistant.prototype.checkForEndOfGame = function () {
	if (!FIVEDICE.players.allPlayersAreDone()) { return false; }
	
	//Add the scores to the database.
	var scores = FIVEDICE.players.getScores().sort(function (a, b) {return b.score - a.score;});
	var unixTime = new Date().getTime();
	for (var i = 0; i < scores.length; i++) {
		FIVEDICE.highScores.addScore(scores[i].name, unixTime, scores[i].score);
	}
	
	//Show end-of-game info and options.
	if (FIVEDICE.players.count() == 1) {
		//See if the final score is noteworthy.
		var storedScores = FIVEDICE.highScores.getScores().sort(function (a, b) {return b.score - a.score;});
		var scoreIsNewHigh = (storedScores.length > 0 && scores[0].score == storedScores[0].score);
		var scoreIsNewLow = (storedScores.length > 1 && scores[0].score == storedScores[storedScores.length - 1].score);
		var scoreIsTopTen = (storedScores.length <= 10 || (storedScores.length > 10 && scores[0].score > storedScores[10].score));
		var scoreIsBottomTen = (storedScores.length > 11 && scores[0].score < storedScores[storedScores.length - 11].score);
		//Determine whether noteworthy scores are meaningful, given the user's restrictions on which scores are saved.
		var highScoreIsMeaningful = (!FIVEDICE.scoreRestrictions.restrictScores || FIVEDICE.scoreRestrictions.whichToKeep != "Lowest");
		var lowScoreIsMeaningful = (!FIVEDICE.scoreRestrictions.restrictScores || FIVEDICE.scoreRestrictions.whichToKeep != "Highest");
		var topTenScoreIsMeaningful = (!FIVEDICE.scoreRestrictions.restrictScores || (FIVEDICE.scoreRestrictions.numberToKeep > 10 && FIVEDICE.scoreRestrictions.whichToKeep != "Lowest"));
		var bottomTenScoreIsMeaningful = (!FIVEDICE.scoreRestrictions.restrictScores || (FIVEDICE.scoreRestrictions.numberToKeep > 10 && FIVEDICE.scoreRestrictions.whichToKeep != "Highest"));
		//Show a message if appropriate.
		if (scoreIsNewHigh && highScoreIsMeaningful) {
			this.controller.showAlertDialog({title: "New high score!", message: "Congratulations! " + scores[0].score + " is a new high score.", choices: [{label: "OK", value: "ok"}], onChoose: function (value) {}});
		}
		else if (scoreIsTopTen && topTenScoreIsMeaningful) {
			this.controller.showAlertDialog({title: "New top 10 score!", message: "Well done! " + scores[0].score + " is good enough for the top 10 list.", choices: [{label: "OK", value: "ok"}], onChoose: function (value) {}});
		}
		else if (scoreIsNewLow && lowScoreIsMeaningful) {
			this.controller.showAlertDialog({title: "New low score!", message: "Ouch! " + scores[0].score + " is a new low score.", choices: [{label: "OK", value: "ok"}], onChoose: function (value) {}});
		}
		else if (scoreIsBottomTen && bottomTenScoreIsMeaningful) {
			this.controller.showAlertDialog({title: "New bottom 10 score!", message: "Ooh, tough luck. " + scores[0].score + " falls among the bottom 10 scores.", choices: [{label: "OK", value: "ok"}], onChoose: function (value) {}});
		}
		//Trim the high score list if the player has opted to do so.
		if (FIVEDICE.scoreRestrictions.restrictScores) {
			FIVEDICE.highScores.chopAllExcept(FIVEDICE.scoreRestrictions.numberToKeep, FIVEDICE.scoreRestrictions.whichToKeep);
		}
		//Don't bother with a score rundown for one person. Just offer the Play Again button.
		for (i = 0; i < this.dice.numberOfDice(); i++) {
			this.controller.get("die" + i).style.visibility = "hidden";
		}
		this.controller.get("playAgain").style.visibility = "visible";
		return true;
	}
	else {
		//Trim the high score list if the player has opted to do so.
		if (FIVEDICE.scoreRestrictions.restrictScores) {
			FIVEDICE.highScores.chopAllExcept(FIVEDICE.scoreRestrictions.numberToKeep, FIVEDICE.scoreRestrictions.whichToKeep);
		}
		//Pop up a final score dialog with buttons to play again or change players.
		this.controller.showDialog({template: "main/score-dialog", assistant: new ScoreDialogAssistant(this, "finalScores")});
	}//if
};//checkForEndOfGame()

MainAssistant.prototype.playAgain = function () {
	FIVEDICE.players.resetAllPlayers();
	Mojo.Controller.stageController.swapScene("main", FIVEDICE.players.firstPlayer());
};//playAgain()
