function MainAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	  
	//Create a Yahtzee dice object and a collection of models for the buttons.
	this.dice = new YahtzeeDice();
	this.buttonModels = new ButtonModels();
};

MainAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	//Application menu
	var menuModel = {
		visible: true,
		items: [
			{label: "New Game", command: "do-newGame"},
			{label: "Preferences", command: "do-preferences"},
			{label: "Help", command: "do-help"},
			{label: "About #{appName}".interpolate({appName: FiveDice.title}), command: "do-about"}
		]
	};
	this.controller.setupWidget(Mojo.Menu.appMenu, FiveDice.MenuAttributes, menuModel);
	
	//Upper half score buttons
	this.controller.setupWidget("buttonOnes", {}, this.buttonModels.ones);
	this.controller.setupWidget("buttonTwos", {}, this.buttonModels.twos);
	this.controller.setupWidget("buttonThrees", {}, this.buttonModels.threes);
	this.controller.setupWidget("buttonFours", {}, this.buttonModels.fours);
	this.controller.setupWidget("buttonFives", {}, this.buttonModels.fives);
	this.controller.setupWidget("buttonSixes", {}, this.buttonModels.sixes);
	
	//Lower half score buttons
	this.controller.setupWidget("buttonThreeOfAKind", {}, this.buttonModels.threeOfAKind);
	this.controller.setupWidget("buttonFourOfAKind", {}, this.buttonModels.fourOfAKind);
	this.controller.setupWidget("buttonFullHouse", {}, this.buttonModels.fullHouse);
	this.controller.setupWidget("buttonSmallStraight", {}, this.buttonModels.smallStraight);
	this.controller.setupWidget("buttonLargeStraight", {}, this.buttonModels.largeStraight);
	this.controller.setupWidget("buttonFiveOfAKind", {}, this.buttonModels.fiveOfAKind);
	this.controller.setupWidget("buttonChance", {}, this.buttonModels.chance);
	
	//Blank out all scoreValues.
	this.resetAllScores();
	
	//Dice and Roll button
	for (var i = 0; i < this.dice.dice.length; i++) {
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die" + this.dice.dice[i].value + "Plain.png\"></img>";
	}
	this.controller.setupWidget("buttonRoll", {}, this.buttonModels.roll);

	/* add event handlers to listen to events from widgets */
	
	//Dice tap listeners
	this.die0Handler = this.toggleDie0.bindAsEventListener(this);
	this.controller.listen("die0", Mojo.Event.tap, this.die0Handler);
	this.die1Handler = this.toggleDie1.bindAsEventListener(this);
	this.controller.listen("die1", Mojo.Event.tap, this.die1Handler);
	this.die2Handler = this.toggleDie2.bindAsEventListener(this);
	this.controller.listen("die2", Mojo.Event.tap, this.die2Handler);
	this.die3Handler = this.toggleDie3.bindAsEventListener(this);
	this.controller.listen("die3", Mojo.Event.tap, this.die3Handler);
	this.die4Handler = this.toggleDie4.bindAsEventListener(this);
	this.controller.listen("die4", Mojo.Event.tap, this.die4Handler);
	this.newGameHandler = this.newGame.bindAsEventListener(this);
	this.controller.listen("playAgain", Mojo.Event.tap, this.newGameHandler);
	
	//Roll button listener
	this.rollHandler = this.roll.bindAsEventListener(this);
	this.controller.listen("buttonRoll", Mojo.Event.tap, this.rollHandler);
	
	//Upper half score button listeners
	this.onesHandler = this.setOnes.bindAsEventListener(this);
	this.controller.listen("buttonOnes", Mojo.Event.tap, this.onesHandler);
	this.twosHandler = this.setTwos.bindAsEventListener(this);
	this.controller.listen("buttonTwos", Mojo.Event.tap, this.twosHandler);
	this.threesHandler = this.setThrees.bindAsEventListener(this);
	this.controller.listen("buttonThrees", Mojo.Event.tap, this.threesHandler);
	this.foursHandler = this.setFours.bindAsEventListener(this);
	this.controller.listen("buttonFours", Mojo.Event.tap, this.foursHandler);
	this.fivesHandler = this.setFives.bindAsEventListener(this);
	this.controller.listen("buttonFives", Mojo.Event.tap, this.fivesHandler);
	this.sixesHandler = this.setSixes.bindAsEventListener(this);
	this.controller.listen("buttonSixes", Mojo.Event.tap, this.sixesHandler);
	
	//Lower half score button listeners
	this.threeOfAKindHandler = this.setThreeOfAKind.bindAsEventListener(this);
	this.controller.listen("buttonThreeOfAKind", Mojo.Event.tap, this.threeOfAKindHandler);
	this.fourOfAKindHandler = this.setFourOfAKind.bindAsEventListener(this);
	this.controller.listen("buttonFourOfAKind", Mojo.Event.tap, this.fourOfAKindHandler);
	this.fullHouseHandler = this.setFullHouse.bindAsEventListener(this);
	this.controller.listen("buttonFullHouse", Mojo.Event.tap, this.fullHouseHandler);
	this.smallStraightHandler = this.setSmallStraight.bindAsEventListener(this);
	this.controller.listen("buttonSmallStraight", Mojo.Event.tap, this.smallStraightHandler);
	this.largeStraightHandler = this.setLargeStraight.bindAsEventListener(this);
	this.controller.listen("buttonLargeStraight", Mojo.Event.tap, this.largeStraightHandler);
	this.fiveOfAKindHandler = this.setFiveOfAKind.bindAsEventListener(this);
	this.controller.listen("buttonFiveOfAKind", Mojo.Event.tap, this.fiveOfAKindHandler);
	this.chanceHandler = this.setChance.bindAsEventListener(this);
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
	//Blank out any scores that aren't set (i.e., where the button is not disabled).
	if (!this.buttonModels.ones.disabled)	{ this.controller.get("scoreValueOnes").innerHTML = ""; }
	if (!this.buttonModels.twos.disabled)	{ this.controller.get("scoreValueTwos").innerHTML = ""; }
	if (!this.buttonModels.threes.disabled)	{ this.controller.get("scoreValueThrees").innerHTML = ""; }
	if (!this.buttonModels.fours.disabled)	{ this.controller.get("scoreValueFours").innerHTML = ""; }
	if (!this.buttonModels.fives.disabled)	{ this.controller.get("scoreValueFives").innerHTML = ""; }
	if (!this.buttonModels.sixes.disabled)	{ this.controller.get("scoreValueSixes").innerHTML = ""; }
	if (!this.buttonModels.threeOfAKind.disabled)	{ this.controller.get("scoreValueThreeOfAKind").innerHTML = ""; }
	if (!this.buttonModels.fourOfAKind.disabled)	{ this.controller.get("scoreValueFourOfAKind").innerHTML = ""; }
	if (!this.buttonModels.fullHouse.disabled)		{ this.controller.get("scoreValueFullHouse").innerHTML = ""; }
	if (!this.buttonModels.smallStraight.disabled)	{ this.controller.get("scoreValueSmallStraight").innerHTML = ""; }
	if (!this.buttonModels.largeStraight.disabled)	{ this.controller.get("scoreValueLargeStraight").innerHTML = ""; }
	if (!this.buttonModels.fiveOfAKind.disabled)	{ this.controller.get("scoreValueFiveOfAKind").innerHTML = ""; }
	if (!this.buttonModels.chance.disabled)			{ this.controller.get("scoreValueChance").innerHTML = ""; }
};

//Die toggles
MainAssistant.prototype.toggleDie0 = function() {
	this.toggleDie(0);
};
MainAssistant.prototype.toggleDie1 = function() {
	this.toggleDie(1);
};
MainAssistant.prototype.toggleDie2 = function() {
	this.toggleDie(2);
};
MainAssistant.prototype.toggleDie3 = function() {
	this.toggleDie(3);
};
MainAssistant.prototype.toggleDie4 = function() {
	this.toggleDie(4);
};
MainAssistant.prototype.toggleDie = function(index) {
	//Make sure the dice have been rolled at least once this turn.
	if (this.dice.chanceScore == 0) {
		return;
	}
	//Toggle the held state of the die.
	this.dice.dice[index].held = !this.dice.dice[index].held;
	//Find the die's div in the scene and change its image to reflect the new state.
	var dieElement = this.controller.get("die" + index);
	if (this.dice.dice[index].held) {
		dieElement.innerHTML = "<img src=\"images/Die" + this.dice.dice[index].value + "Held.png\"></img>";
	}
	else {
		dieElement.innerHTML = "<img src=\"images/Die" + this.dice.dice[index].value + "Plain.png\"></img>";
	}
};

//Die roller
MainAssistant.prototype.roll = function() {
	//In case the shake API was used to roll, check that the Roll button isn't disabled.
	if (this.buttonModels.roll.disabled) {
		return;
	}
	//Roll the dice and disable the Roll button.
	this.dice.roll();
	this.buttonModels.roll.disabled = true;
	this.controller.modelChanged(this.buttonModels.roll);
	//If we still have rolls left, re-enable the button (either by timer or immediately).
	if (this.dice.rollCount <= 3) {
		if (FiveDice.disableRollButtonBetweenRolls) {
			this.controller.window.setTimeout(this.enableRollButton.bind(this), FiveDice.rollButtonDisabledTimeout);
		}
		else {
			this.enableRollButton();
		}
	}
	//Set the dice images.
	for (var i = 0; i < this.dice.dice.length; i++) {
		var imageStyle = (this.dice.dice[i].held ? "Held" : "Plain");
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die" + this.dice.dice[i].value + imageStyle + ".png\"></img>";
	}
	
	this.showPossibleScores();
};

MainAssistant.prototype.enableRollButton = function() {
	this.buttonModels.roll.label = "Roll " + (this.dice.rollCount);
	this.buttonModels.roll.disabled = false;
	this.controller.modelChanged(this.buttonModels.roll);
};

MainAssistant.prototype.showPossibleScores = function() {
	if (!this.buttonModels.ones.disabled)	{ this.showUpperHalfScore("scoreValueOnes", 1); }
	if (!this.buttonModels.twos.disabled)	{ this.showUpperHalfScore("scoreValueTwos", 2); }
	if (!this.buttonModels.threes.disabled)	{ this.showUpperHalfScore("scoreValueThrees", 3); }
	if (!this.buttonModels.fours.disabled)	{ this.showUpperHalfScore("scoreValueFours", 4); }
	if (!this.buttonModels.fives.disabled)	{ this.showUpperHalfScore("scoreValueFives", 5); }
	if (!this.buttonModels.sixes.disabled)	{ this.showUpperHalfScore("scoreValueSixes", 6); }
	if (!this.buttonModels.threeOfAKind.disabled)	{ this.showThreeOfAKind(); }
	if (!this.buttonModels.fourOfAKind.disabled)	{ this.showFourOfAKind(); }
	if (!this.buttonModels.fullHouse.disabled)		{ this.showFullHouse(); }
	if (!this.buttonModels.smallStraight.disabled)	{ this.showSmallStraight(); }
	if (!this.buttonModels.largeStraight.disabled)	{ this.showLargeStraight(); }
	if (!this.buttonModels.fiveOfAKind.disabled)	{ this.showFiveOfAKind(); }
	if (!this.buttonModels.chance.disabled)			{ this.showChance(); }
};
MainAssistant.prototype.showUpperHalfScore = function(scoreValueId, targetValue) {
	//Display the score in the "suggested" color.
	this.controller.get(scoreValueId).innerHTML = (this.dice.upperHalfScore(targetValue) > 0 ? this.dice.upperHalfScore(targetValue) : "");
	this.controller.get(scoreValueId).style.color = FiveDice.suggestedScoreColor;
};

MainAssistant.prototype.showThreeOfAKind = function() {
	//Display the score in the "suggested" color.
	this.controller.get("scoreValueThreeOfAKind").innerHTML = (this.dice.threeOfAKindScore() > 0 ? this.dice.threeOfAKindScore() : "");
	this.controller.get("scoreValueThreeOfAKind").style.color = FiveDice.suggestedScoreColor;
};

MainAssistant.prototype.showFourOfAKind = function() {
	//Display the score in the "suggested" color.
	this.controller.get("scoreValueFourOfAKind").innerHTML = (this.dice.fourOfAKindScore() > 0 ? this.dice.fourOfAKindScore() : "");
	this.controller.get("scoreValueFourOfAKind").style.color = FiveDice.suggestedScoreColor;
};

MainAssistant.prototype.showFullHouse = function() {
	//Display the score in the "suggested" color.
	this.controller.get("scoreValueFullHouse").innerHTML = (this.dice.fullHouseScore() > 0 ? this.dice.fullHouseScore() : "");
	this.controller.get("scoreValueFullHouse").style.color = FiveDice.suggestedScoreColor;
};

MainAssistant.prototype.showSmallStraight = function() {
	//See if we got five of a kind, which can substitute for a straight
	//if there is already a score for Five of a Kind and for the
	//upper half item that corresponds to the number on the dice.
	var score = 0;
	if (this.checkForExtraFiveOfAKind(false)) {
		score = 30;
	}
	else {
		score = this.dice.smallStraightScore();
	}
	//Display the score in the "suggested" color.
	this.controller.get("scoreValueSmallStraight").innerHTML = (score > 0 ? score : "");
	this.controller.get("scoreValueSmallStraight").style.color = FiveDice.suggestedScoreColor;
};

MainAssistant.prototype.showLargeStraight = function() {
	//See if we got five of a kind, which can substitute for a straight
	//if there is already a score for Five of a Kind and for the
	//upper half item that corresponds to the number on the dice.
	var score = 0;
	if (this.checkForExtraFiveOfAKind(false)) {
		score = 40;
	}
	else {
		score = this.dice.largeStraightScore();
	}
	//Display the score in the "suggested" color.
	this.controller.get("scoreValueLargeStraight").innerHTML = (score > 0 ? score : "");
	this.controller.get("scoreValueLargeStraight").style.color = FiveDice.suggestedScoreColor;
};

MainAssistant.prototype.showFiveOfAKind = function() {
	//Display the score in the "suggested" color.
	this.controller.get("scoreValueFiveOfAKind").innerHTML = (this.dice.fiveOfAKindScore() > 0 ? this.dice.fiveOfAKindScore() : "");
	this.controller.get("scoreValueFiveOfAKind").style.color = FiveDice.suggestedScoreColor;
};

MainAssistant.prototype.showChance = function() {
	//Display the score in the "suggested" color.
	this.controller.get("scoreValueChance").innerHTML = this.dice.chanceScore();
	this.controller.get("scoreValueChance").style.color = FiveDice.suggestedScoreColor;
};

//Upper half score button handlers
MainAssistant.prototype.setOnes = function() {
	this.buttonModels.ones.disabled = true;
	this.setUpperHalfScore(this.buttonModels.ones);
};
MainAssistant.prototype.setTwos = function() {
	this.buttonModels.twos.disabled = true;
	this.setUpperHalfScore(this.buttonModels.twos);
};
MainAssistant.prototype.setThrees = function() {
	this.buttonModels.threes.disabled = true;
	this.setUpperHalfScore(this.buttonModels.threes);
};
MainAssistant.prototype.setFours = function() {
	this.buttonModels.fours.disabled = true;
	this.setUpperHalfScore(this.buttonModels.fours);
};
MainAssistant.prototype.setFives = function() {
	this.buttonModels.fives.disabled = true;
	this.setUpperHalfScore(this.buttonModels.fives);
};
MainAssistant.prototype.setSixes = function() {
	this.buttonModels.sixes.disabled = true;
	this.setUpperHalfScore(this.buttonModels.sixes);
};
MainAssistant.prototype.setUpperHalfScore = function(buttonModel) {
	//Make sure the dice have been rolled.
	if (this.dice.chanceScore() == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.controller.modelChanged(buttonModel);
	//Show zero if there's no score on this item.
	if (this.controller.get("scoreValue" + buttonModel.label).innerHTML == "") {
		this.controller.get("scoreValue" + buttonModel.label).innerHTML = 0;
	}
	//Show the score in the "set" color.
	this.controller.get("scoreValue" + buttonModel.label).style.color = FiveDice.setScoreColor;
	this.setExtraFiveOfAKind(true);
	//Re-calculate the total and get on with the game.
	this.setTotal();
	this.blankUnsetScores();
	this.releaseDice();
	this.checkForEndOfGame();
};

//Lower half score button handlers
MainAssistant.prototype.setThreeOfAKind = function() {
	//Make sure the dice have been rolled.
	if (this.dice.chanceScore() == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.buttonModels.threeOfAKind.disabled = true;
	this.controller.modelChanged(this.buttonModels.threeOfAKind);
	//Show zero if there's no score on this item.
	if (this.controller.get("scoreValueThreeOfAKind").innerHTML == "") {
		this.controller.get("scoreValueThreeOfAKind").innerHTML = 0;
	}
	//Show the score in the "set" color.
	this.controller.get("scoreValueThreeOfAKind").style.color = FiveDice.setScoreColor;
	this.setExtraFiveOfAKind(false);
	//Re-calculate the total and get on with the game.
	this.setTotal();
	this.blankUnsetScores();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setFourOfAKind = function() {
	//Make sure the dice have been rolled.
	if (this.dice.chanceScore() == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.buttonModels.fourOfAKind.disabled = true;
	this.controller.modelChanged(this.buttonModels.fourOfAKind);
	//Show zero if there's no score on this item.
	if (this.controller.get("scoreValueFourOfAKind").innerHTML == "") {
		this.controller.get("scoreValueFourOfAKind").innerHTML = 0;
	}
	//Show the score in the "set" color.
	this.controller.get("scoreValueFourOfAKind").style.color = FiveDice.setScoreColor;
	this.setExtraFiveOfAKind(false);
	//Re-calculate the total and get on with the game.
	this.setTotal();
	this.blankUnsetScores();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setFullHouse = function() {
	//Make sure the dice have been rolled.
	if (this.dice.chanceScore() == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.buttonModels.fullHouse.disabled = true;
	this.controller.modelChanged(this.buttonModels.fullHouse);
	//Show zero if there's no score on this item.
	if (this.controller.get("scoreValueFullHouse").innerHTML == "") {
		this.controller.get("scoreValueFullHouse").innerHTML = 0;
	}
	//Show the score in the "set" color.
	this.controller.get("scoreValueFullHouse").style.color = FiveDice.setScoreColor;
	this.setExtraFiveOfAKind(false);
	//Re-calculate the total and get on with the game.
	this.setTotal();
	this.blankUnsetScores();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setSmallStraight = function() {
	//Make sure the dice have been rolled.
	if (this.dice.chanceScore() == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.buttonModels.smallStraight.disabled = true;
	this.controller.modelChanged(this.buttonModels.smallStraight);
	//Show zero if there's no score on this item.
	if (this.controller.get("scoreValueSmallStraight").innerHTML == "") {
		this.controller.get("scoreValueSmallStraight").innerHTML = 0;
	}
	//Show the score in the "set" color.
	this.controller.get("scoreValueSmallStraight").style.color = FiveDice.setScoreColor;
	this.setExtraFiveOfAKind(false);
	//Re-calculate the total and get on with the game.
	this.setTotal();
	this.blankUnsetScores();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setLargeStraight = function() {
	//Make sure the dice have been rolled.
	if (this.dice.chanceScore() == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.buttonModels.largeStraight.disabled = true;
	this.controller.modelChanged(this.buttonModels.largeStraight);
	//Show zero if there's no score on this item.
	if (this.controller.get("scoreValueLargeStraight").innerHTML == "") {
		this.controller.get("scoreValueLargeStraight").innerHTML = 0;
	}
	//Show the score in the "set" color.
	this.controller.get("scoreValueLargeStraight").style.color = FiveDice.setScoreColor;
	this.setExtraFiveOfAKind(false);
	//Re-calculate the total and get on with the game.
	this.setTotal();
	this.blankUnsetScores();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setFiveOfAKind = function() {
	//Make sure the dice have been rolled.
	if (this.dice.chanceScore() == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.buttonModels.fiveOfAKind.disabled = true;
	this.controller.modelChanged(this.buttonModels.fiveOfAKind);
	//Show zero if there's no score on this item.
	if (this.controller.get("scoreValueFiveOfAKind").innerHTML == "") {
		this.controller.get("scoreValueFiveOfAKind").innerHTML = 0;
	}
	//Show the score in the "set" color.
	this.controller.get("scoreValueFiveOfAKind").style.color = FiveDice.setScoreColor;
	//Re-calculate the total and get on with the game.
	this.setTotal();
	this.blankUnsetScores();
	this.releaseDice();
	this.checkForEndOfGame();
};

MainAssistant.prototype.setChance = function() {
	//Make sure the dice have been rolled.
	if (this.dice.chanceScore() == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.buttonModels.chance.disabled = true;
	this.controller.modelChanged(this.buttonModels.chance);
	//Show zero if there's no score on this item.
	if (this.controller.get("scoreValueChance").innerHTML == "") {
		this.controller.get("scoreValueChance").innerHTML = 0;
	}
	//Show the score in the "set" color.
	this.controller.get("scoreValueChance").style.color = FiveDice.setScoreColor;
	this.setExtraFiveOfAKind(false);
	//Re-calculate the total and get on with the game.
	this.setTotal();
	this.blankUnsetScores();
	this.releaseDice();
	this.checkForEndOfGame();
};

//Auxiliary functions
MainAssistant.prototype.checkForExtraFiveOfAKind = function(forUpperHalf) {
	//Rolls that result in five of a kind can score extra points for the
	//Five of a Kind score if Five of a Kind has already been scored.
	var isExtra = (this.dice.fiveOfAKindScore() > 0 && +this.controller.get("scoreValueFiveOfAKind").innerHTML > 0);
	if (forUpperHalf) { return isExtra; }
	//For a five-of-a-kind roll to substitute for a normal lower-half roll,
	//there is an extra condition that the upper-half score that corresponds
	//to the number shows on the dice is already scored.
	var scoreValueElement = "";
	switch (this.dice.dice[0].value) {
		case 1:
			scoreValueElement = "scoreValueOnes";
			break;
		case 2:
			scoreValueElement = "scoreValueTwos";
			break;
		case 3:
			scoreValueElement = "scoreValueThrees";
			break;
		case 4:
			scoreValueElement = "scoreValueFours";
			break;
		case 5:
			scoreValueElement = "scoreValueFives";
			break;
		case 6:
			scoreValueElement = "scoreValueSixes";
			break;
	}
	return (isExtra && this.controller.get(scoreValueElement).innerHTML != "" && this.controller.get(scoreValueElement).style.color == FiveDice.setScoreColor);  
};

MainAssistant.prototype.setExtraFiveOfAKind = function(forUpperHalf) {
	//See if an extra five of a kind was rolled.
	if (this.checkForExtraFiveOfAKind(forUpperHalf)) {
		//Increase the Five of a Kind score by 100.
		var score = +this.controller.get("scoreValueFiveOfAKind").innerHTML;
		score += 100;
		this.controller.get("scoreValueFiveOfAKind").innerHTML = score;
	}
};

MainAssistant.prototype.setTotal = function() {
	//Count up the upper half first to see if the bonus is earned.
	//Get the benchmark subtotal along the way.
	var total = 0;
	var benchmark = 0;
	if (this.buttonModels.ones.disabled) {
		total += +this.controller.get("scoreValueOnes").innerHTML;
		benchmark += 3;
	}
	if (this.buttonModels.twos.disabled) {
		total += +this.controller.get("scoreValueTwos").innerHTML;
		benchmark += 6;
	}
	if (this.buttonModels.threes.disabled) {
		total += +this.controller.get("scoreValueThrees").innerHTML;
		benchmark += 9;
	}
	if (this.buttonModels.fours.disabled) {
		total += +this.controller.get("scoreValueFours").innerHTML;
		benchmark += 12;
	}
	if (this.buttonModels.fives.disabled) {
		total += +this.controller.get("scoreValueFives").innerHTML;
		benchmark += 15;
	}
	if (this.buttonModels.sixes.disabled) {
		total += +this.controller.get("scoreValueSixes").innerHTML;
		benchmark += 18;
	}
	var difference = total - benchmark;
	var subtotalDisplay = "Subtotal &nbsp;&nbsp; " + total;
	if (FiveDice.showSubtotalDeviation) {
		subtotalDisplay += " / " + (difference < 0 ? "" : "+") + (difference);;
	}
	this.controller.get("subtotal").innerHTML = subtotalDisplay;
	//Add in the bonus.
	this.controller.get("scoreValueBonus").innerHTML = (total >= 63 ? 35 : 0);
	total += +this.controller.get("scoreValueBonus").innerHTML;
	//Add in the lower half scores to get the total.
	if (this.buttonModels.threeOfAKind.disabled) {
		total += +this.controller.get("scoreValueThreeOfAKind").innerHTML;
	}
	if (this.buttonModels.fourOfAKind.disabled) {
		total += +this.controller.get("scoreValueFourOfAKind").innerHTML;
	}
	if (this.buttonModels.fullHouse.disabled) {
		total += +this.controller.get("scoreValueFullHouse").innerHTML;
	}
	if (this.buttonModels.smallStraight.disabled) {
		total += +this.controller.get("scoreValueSmallStraight").innerHTML;
	}
	if (this.buttonModels.largeStraight.disabled) {
		total += +this.controller.get("scoreValueLargeStraight").innerHTML;
	}
	if (this.buttonModels.fiveOfAKind.disabled) {
		total += +this.controller.get("scoreValueFiveOfAKind").innerHTML;
	}
	if (this.buttonModels.chance.disabled) {
		total += +this.controller.get("scoreValueChance").innerHTML;
	}
	this.controller.get("scoreValueTotal").innerHTML = total;
};

MainAssistant.prototype.releaseDice = function() {
	//Blank out and un-hold all the dice.
	this.dice.clear();
	for (var i = 0; i < this.dice.dice.length; i++) {
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die0Plain.png\"></img>";
	}
	//Enable the Roll button.
	this.buttonModels.roll.label = "Roll 1";
	this.buttonModels.roll.disabled = false;
	this.controller.modelChanged(this.buttonModels.roll);
};

MainAssistant.prototype.checkForEndOfGame = function() {
	//See if all of the score buttons have been set, which means the game is over.
	if (!this.buttonModels.allButtonsAreDisabled()) {
		return;
	}
	
	//Disable the Roll button.
	this.buttonModels.roll.disabled = true;
	this.controller.modelChanged(this.buttonModels.roll);
	
	//Hide the dice and show the "Play Again" text.
	for (var i = 0; i < this.dice.dice.length; i++) {
		this.controller.get("die" + i).style.visibility = "hidden";
	}
	this.controller.get("playAgain").style.visibility = "visible";
	//TODO: Other end-of-game stuff?
};

MainAssistant.prototype.newGame = function() {
	//Enable all buttons.
	this.buttonModels.enableAllButtons();
	this.controller.modelChanged(this.buttonModels.ones);
	this.controller.modelChanged(this.buttonModels.twos);
	this.controller.modelChanged(this.buttonModels.threes);
	this.controller.modelChanged(this.buttonModels.fours);
	this.controller.modelChanged(this.buttonModels.fives);
	this.controller.modelChanged(this.buttonModels.sixes);
	this.controller.modelChanged(this.buttonModels.threeOfAKind);
	this.controller.modelChanged(this.buttonModels.fourOfAKind);
	this.controller.modelChanged(this.buttonModels.fullHouse);
	this.controller.modelChanged(this.buttonModels.smallStraight);
	this.controller.modelChanged(this.buttonModels.largeStraight);
	this.controller.modelChanged(this.buttonModels.fiveOfAKind);
	this.controller.modelChanged(this.buttonModels.chance);
	this.controller.modelChanged(this.buttonModels.roll);
	
	//Reset the scoreboard. This has to happen after the buttons are re-enabled.
	this.resetAllScores();
	
	//Hide the "Play Again" text and show the dice.
	this.releaseDice();
	this.controller.get("playAgain").style.visibility = "hidden";
	for (var i = 0; i < this.dice.dice.length; i++) {
		this.controller.get("die" + i).style.visibility = "visible";
	}
};
