function MainAssistant(player) {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	  
	//Create a Yahtzee dice object.
	this.dice = FiveDice.yahtzeeDice();
	//Set the player for this scene. (As of now, no player is being passed in.)
	this.player = FiveDice.playerState("Daren");
	//Set a button model for the Roll button.
	this.rollModel = {label: "Roll 1", disabled: false};
	
	//Define the application menu model here so that it can be manipulated at run-time.
	this.menuModel = {
		visible: true,
		items: [
			{label: "New Game", command: "do-newGame"},
			{label: "Undo", command: "do-undo", disabled: true},
			{label: "Preferences", command: "do-preferences"},
			{label: "Help", command: "do-help"},
			{label: "About #{appName}".interpolate({appName: Mojo.Controller.appInfo.title}), command: "do-about"}
		]
	};
	
	//For convenience, define an array of score items that we can loop over.
	this.scoreItems = ["ones", "twos", "threes", "fours", "fives", "sixes", "threeOfAKind", "fourOfAKind", "fullHouse", "smallStraight", "largeStraight", "fiveOfAKind", "chance"];
};

MainAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	//Application menu
	this.controller.setupWidget(Mojo.Menu.appMenu, FiveDice.MenuAttributes, this.menuModel);
	
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
	
	//Blank out all scoreValues.
	this.resetAllScores();
	
	//Dice and Roll button
	for (var i = 0; i < this.dice.numberOfDice(); i++) {
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die" + this.dice.getDie(i).getValue() + "Plain.png\"></img>";
	}
	this.controller.setupWidget("buttonRoll", {}, this.rollModel);

	/* add event handlers to listen to events from widgets */
	
	//Dice tap listeners
	this.die0Handler = function() {this.toggleDie(0);}.bindAsEventListener(this);
	this.controller.listen("die0", Mojo.Event.tap, this.die0Handler);
	this.die1Handler = function() {this.toggleDie(1);}.bindAsEventListener(this);
	this.controller.listen("die1", Mojo.Event.tap, this.die1Handler);
	this.die2Handler = function() {this.toggleDie(2);}.bindAsEventListener(this);
	this.controller.listen("die2", Mojo.Event.tap, this.die2Handler);
	this.die3Handler = function() {this.toggleDie(3);}.bindAsEventListener(this);
	this.controller.listen("die3", Mojo.Event.tap, this.die3Handler);
	this.die4Handler = function() {this.toggleDie(4);}.bindAsEventListener(this);
	this.controller.listen("die4", Mojo.Event.tap, this.die4Handler);
	this.newGameHandler = this.newGame.bindAsEventListener(this);
	this.controller.listen("playAgain", Mojo.Event.tap, this.newGameHandler);
	
	//Roll button listener
	this.rollHandler = this.roll.bindAsEventListener(this);
	this.controller.listen("buttonRoll", Mojo.Event.tap, this.rollHandler);
	
	//Upper half score button listeners
	this.onesHandler = function() {this.setScore("ones", true);}.bindAsEventListener(this);
	this.controller.listen("buttonOnes", Mojo.Event.tap, this.onesHandler);
	this.twosHandler = function() {this.setScore("twos", true);}.bindAsEventListener(this);
	this.controller.listen("buttonTwos", Mojo.Event.tap, this.twosHandler);
	this.threesHandler = function() {this.setScore("threes", true);}.bindAsEventListener(this);
	this.controller.listen("buttonThrees", Mojo.Event.tap, this.threesHandler);
	this.foursHandler = function() {this.setScore("fours", true);}.bindAsEventListener(this);
	this.controller.listen("buttonFours", Mojo.Event.tap, this.foursHandler);
	this.fivesHandler = function() {this.setScore("fives", true);}.bindAsEventListener(this);
	this.controller.listen("buttonFives", Mojo.Event.tap, this.fivesHandler);
	this.sixesHandler = function() {this.setScore("sixes", true);}.bindAsEventListener(this);
	this.controller.listen("buttonSixes", Mojo.Event.tap, this.sixesHandler);
	
	//Lower half score button listeners
	this.threeOfAKindHandler = function() {this.setScore("threeOfAKind", false);}.bindAsEventListener(this);
	this.controller.listen("buttonThreeOfAKind", Mojo.Event.tap, this.threeOfAKindHandler);
	this.fourOfAKindHandler = function() {this.setScore("fourOfAKind", false);}.bindAsEventListener(this);
	this.controller.listen("buttonFourOfAKind", Mojo.Event.tap, this.fourOfAKindHandler);
	this.fullHouseHandler = function() {this.setScore("fullHouse", false);}.bindAsEventListener(this);
	this.controller.listen("buttonFullHouse", Mojo.Event.tap, this.fullHouseHandler);
	this.smallStraightHandler = function() {this.setScore("smallStraight", false);}.bindAsEventListener(this);
	this.controller.listen("buttonSmallStraight", Mojo.Event.tap, this.smallStraightHandler);
	this.largeStraightHandler = function() {this.setScore("largeStraight", false);}.bindAsEventListener(this);
	this.controller.listen("buttonLargeStraight", Mojo.Event.tap, this.largeStraightHandler);
	this.fiveOfAKindHandler = function() {this.setScore("fiveOfAKind", false);}.bindAsEventListener(this);
	this.controller.listen("buttonFiveOfAKind", Mojo.Event.tap, this.fiveOfAKindHandler);
	this.chanceHandler = function() {this.setScore("chance", false);}.bindAsEventListener(this);
	this.controller.listen("buttonChance", Mojo.Event.tap, this.chanceHandler);
};

MainAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	  
	//Set up listeners that are dependent on the Preferences.
	if (FiveDice.shakeToRoll) {
		this.controller.listen(document, "shakeend", this.rollHandler);
	}
	
	//Re-calculate the totals to update the Subtotal display,
	//in case we're coming back from the Preferences scene
	//and the subtotal deviation preference was changed.
	this.setTotal();
};


MainAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	  
	//Remove listeners that are dependent on the Preferences.
	this.controller.stopListening(document, "shakeend", this.rollHandler);
};

MainAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	  
	//Remove event listeners:
	//Dice tap listeners
	this.controller.stopListening("die0", Mojo.Event.tap, this.die0Handler);
	this.controller.stopListening("die1", Mojo.Event.tap, this.die1Handler);
	this.controller.stopListening("die2", Mojo.Event.tap, this.die2Handler);
	this.controller.stopListening("die3", Mojo.Event.tap, this.die3Handler);
	this.controller.stopListening("die4", Mojo.Event.tap, this.die4Handler);
	this.controller.stopListening("playAgain", Mojo.Event.tap, this.newGameHandler);
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
};

MainAssistant.prototype.handleCommand = function(event) {
	if (event.type != Mojo.Event.command) { return; }
	switch (event.command) {
		case "do-newGame":
			this.newGame();
			break;
		case "do-undo":
			this.undo();
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
};

MainAssistant.prototype.resetAllScores = function() {
	//Blank the button-based scores and set the bonus and totals to 0.
	this.blankUnsetScores();
	var subtotalDisplay = "Subtotal &nbsp;&nbsp; 0";
	if (FiveDice.showSubtotalDeviation) {
		subtotalDisplay += " / +0";
	}
	this.controller.get("subtotal").innerHTML = subtotalDisplay;
	this.controller.get("scoreValueBonus").innerHTML = 0;
	this.controller.get("scoreValueTotal").innerHTML = 0;
};

MainAssistant.prototype.blankUnsetScores = function() {
	//Blank out any scores that aren't set (i.e., where the button has not been disabled).
	for (var i = 0; i < this.scoreItems.length; i++) {
		itemName = this.scoreItems[i];
		if (!this.player.getButtonModel(itemName).disabled) {
			var scoreValueId = "scoreValue" + itemName.charAt(0).toUpperCase() + itemName.slice(1);
			this.controller.get(scoreValueId).innerHTML = "";
		}
	}
};

MainAssistant.prototype.toggleDie = function(index) {
	//Make sure the dice have been rolled at least once this turn.
	if (this.dice.chanceScore == 0) {
		return;
	}
	//Toggle the held state of the die.
	this.dice.getDie(index).setHeld(!this.dice.getDie(index).getHeld());
	//Find the die's div in the scene and change its image to reflect the new state.
	var imageStyle = (this.dice.getDie(index).getHeld() ? "Held" : "Plain");
	this.controller.get("die" + index).innerHTML = "<img src=\"images/Die" + this.dice.getDie(index).getValue() + imageStyle + ".png\"></img>";
};

//Die roller
MainAssistant.prototype.roll = function() {
	//In case the shake API was used to roll, check that the Roll button isn't disabled.
	if (this.rollModel.disabled) {
		return;
	}
	//Roll the dice and disable the Roll button.
	this.dice.roll();
	this.rollModel.disabled = true;
	this.controller.modelChanged(this.rollModel);
	//If we still have rolls left, re-enable the button (either by timer or immediately).
	if (this.dice.getRollCount() <= 3) {
		if (FiveDice.disableRollButtonBetweenRolls) {
			this.controller.window.setTimeout(this.enableRollButton.bind(this), FiveDice.rollButtonDisabledTimeout);
		}
		else {
			this.enableRollButton();
		}
	}
	//Set the dice images.
	for (var i = 0; i < this.dice.numberOfDice(); i++) {
		imageStyle = (this.dice.getDie(i).getHeld() ? "Held" : "Plain");
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die" + this.dice.getDie(i).getValue() + imageStyle + ".png\"></img>";
	}
	
	this.showPossibleScores();
	this.disableUndo();
};

MainAssistant.prototype.enableRollButton = function() {
	this.rollModel.label = "Roll " + (this.dice.getRollCount());
	this.rollModel.disabled = false;
	this.controller.modelChanged(this.rollModel);
};

MainAssistant.prototype.showPossibleScores = function() {
	this.player.setScoreSuggestions(this.dice);
	for (var i = 0; i < this.scoreItems.length; i++) {
		itemName = this.scoreItems[i];
		if (!this.player.getButtonModel(itemName).disabled) {
			var scoreValueId = "scoreValue" + itemName.charAt(0).toUpperCase() + itemName.slice(1);
			//Don't show a suggested score of zero--leave the field blank instead.
			var suggestedScore = (this.player.getScore(itemName) == 0 ? "" : this.player.getScore(itemName));
			//Display the score in the "suggested" color.
			this.controller.get(scoreValueId).innerHTML = suggestedScore
			this.controller.get(scoreValueId).style.color = FiveDice.suggestedScoreColor;
		}
	}
};

MainAssistant.prototype.setScore = function(itemName) {
	//Make sure the dice have been rolled.
	if (this.dice.chanceScore() == 0) {
		return;
	}
	//Get the DOM element based on the item name.
	var scoreValueDomElement = this.controller.get("scoreValue" + itemName.charAt(0).toUpperCase() + itemName.slice(1));
	//Set the score and update the UI.
	this.player.setScore(itemName, this.dice);
	this.controller.modelChanged(this.player.getButtonModel(itemName));
	scoreValueDomElement.innerHTML = this.player.getScore(itemName);
	scoreValueDomElement.style.color = FiveDice.setScoreColor;
	//Update the 5 of a kind score in case it changed.
	var fiveOfAKindScore = (this.player.getButtonModel("fiveOfAKind").disabled ? this.player.getScore("fiveOfAKind") : "");
	this.controller.get("scoreValueFiveOfAKind").innerHTML = fiveOfAKindScore;
	//Re-calculate the total and get on with the game.
	this.setTotal();
	this.blankUnsetScores();
	this.releaseDice();
	this.checkForEndOfGame();
	this.enableUndo();
};

//Auxiliary functions
MainAssistant.prototype.disableUndo = function() {
	if (!this.menuModel.items[1].disabled) {
		this.menuModel.items[1].disabled = true;
		this.controller.modelChanged(this.menuModel);
	}
};

MainAssistant.prototype.enableUndo = function() {
	this.menuModel.items[1].disabled = false;
	this.controller.modelChanged(this.menuModel);
};

MainAssistant.prototype.undo = function() {
	var undoneItem = this.player.undoLastScore();
	this.controller.modelChanged(this.player.getButtonModel(undoneItem));
	//Update the 5 of a kind score in case it was affected.
	this.controller.get("scoreValueFiveOfAKind").innerHTML = this.player.getScore("fiveOfAKind");
	this.setTotal();
	this.dice.revert();
	this.rollModel.disabled = (this.dice.getRollCount() > 3);
	this.rollModel.label = "Roll " + (this.dice.getRollCount() > 3 ? 3 : this.dice.getRollCount());
	this.controller.modelChanged(this.rollModel);
	for (var i = 0; i < this.dice.numberOfDice(); i++) {
		imageStyle = (this.dice.getDie(i).getHeld() ? "Held" : "Plain");
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die" + this.dice.getDie(i).getValue() + imageStyle + ".png\"></img>";
	}
	//Make sure the dice are visible (in case the "Play Again" button came up).
	this.controller.get("playAgain").style.visibility = "hidden";
	for (var i = 0; i < this.dice.numberOfDice(); i++) {
		this.controller.get("die" + i).style.visibility = "visible";
	}
	//Re-display the possible scores and disable the Undo menu item.
	this.showPossibleScores();
	this.disableUndo();
};

MainAssistant.prototype.setTotal = function() {
	var subtotal = this.player.getSubtotal();
	var difference = subtotal - this.player.getBenchmark();
	var subtotalDisplay = "Subtotal &nbsp;&nbsp; " + subtotal;
	if (FiveDice.showSubtotalDeviation) {
		subtotalDisplay += " / " + (difference < 0 ? "" : "+") + (difference);;
	}
	this.controller.get("subtotal").innerHTML = subtotalDisplay;
	var bonus = (subtotal >= 63 ? 35 : 0);
	this.controller.get("scoreValueBonus").innerHTML = bonus;
	this.controller.get("scoreValueTotal").innerHTML = this.player.getTotal() + bonus;
};

MainAssistant.prototype.releaseDice = function() {
	//Blank out and un-hold all the dice.
	this.dice.clear();
	for (var i = 0; i < this.dice.numberOfDice(); i++) {
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die0Plain.png\"></img>";
	}
	//Enable the Roll button.
	this.rollModel.label = "Roll 1";
	this.rollModel.disabled = false;
	this.controller.modelChanged(this.rollModel);
};

MainAssistant.prototype.checkForEndOfGame = function() {
	//See if all of the score buttons have been set, which means the game is over.
	if (!this.player.allScoresAreSet()) {
		return;
	}
	
	//Disable the Roll button.
	this.rollModel.disabled = true;
	this.controller.modelChanged(this.rollModel);
	
	//Hide the dice and show the "Play Again" text.
	for (var i = 0; i < this.dice.numberOfDice(); i++) {
		this.controller.get("die" + i).style.visibility = "hidden";
	}
	this.controller.get("playAgain").style.visibility = "visible";
	//TODO: Other end-of-game stuff?
};

MainAssistant.prototype.newGame = function() {
	//Disable the Undo menu item.
	this.menuModel.items[1].disabled = true;
	this.controller.modelChanged(this.menuModel);
	
	//Enable all buttons.
	this.player.clearAllScores();
	for (var i = 0; i < this.scoreItems.length; i++) {
		itemName = this.scoreItems[i];
		this.controller.modelChanged(this.player.getButtonModel(itemName));
	}
	
	//Reset the scoreboard. This has to happen after the buttons are re-enabled.
	this.resetAllScores();
	
	//Hide the "Play Again" text and show the dice.
	this.releaseDice();
	this.controller.get("playAgain").style.visibility = "hidden";
	for (var i = 0; i < this.dice.numberOfDice(); i++) {
		this.controller.get("die" + i).style.visibility = "visible";
	}
};
