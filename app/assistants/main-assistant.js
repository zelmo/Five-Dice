function MainAssistant(dice) {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	  
	  //Save the arguments for use in the scene.
	  this.dice = dice;
	  
	  //Set the roll counter.
	  this.rollCount = 0;
	  
	  //Keep track of how many score buttons have been set so that we know when the game's over.
	  this.scoreButtonsSet = 0;
}

MainAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	// topHalf scoreButtons
	this.controller.setupWidget("buttonOnes", this.attributes = {}, this.model = {label: "Ones", disabled: false});
	this.controller.setupWidget("buttonTwos", this.attributes = {}, this.model = {label: "Twos", disabled: false});
	this.controller.setupWidget("buttonThrees", this.attributes = {}, this.model = {label: "Threes", disabled: false});
	this.controller.setupWidget("buttonFours", this.attributes = {}, this.model = {label: "Fours", disabled: false});
	this.controller.setupWidget("buttonFives", this.attributes = {}, this.model = {label: "Fives", disabled: false});
	this.controller.setupWidget("buttonSixes", this.attributes = {}, this.model = {label: "Sixes", disabled: false});
	this.controller.setupWidget("labelBonus", this.attributes = {}, this.model = {value: "Bonus"});
	
	// bottomHalf scoreButtons
	this.controller.setupWidget("buttonThreeOfAKind", this.attributes = {}, this.model = {label: "Three of a kind", disabled: false});
	this.controller.setupWidget("buttonFourOfAKind", this.attributes = {}, this.model = {label: "Four of a kind", disabled: false});
	this.controller.setupWidget("buttonFullHouse", this.attributes = {}, this.model = {label: "Full house", disabled: false});
	this.controller.setupWidget("buttonSmallStraight", this.attributes = {}, this.model = {label: "Small straight", disabled: false});
	this.controller.setupWidget("buttonLargeStraight", this.attributes = {}, this.model = {label: "Large straight", disabled: false});
	this.controller.setupWidget("buttonFiveOfAKind", this.attributes = {}, this.model = {label: "Five of a kind", disabled: false});
	this.controller.setupWidget("buttonChance", this.attributes = {}, this.model = {label: "Chance", disabled: false});
	
	// set all scoreValues to 0
	this.resetAllScores();
	
	//dice and roll button
	var die0Element = this.controller.get("die0");
	die0Element.innerHTML = "<img src=\"images/Die" + this.dice[0].value + "Plain.png\"></img>";
	var die1Element = this.controller.get("die1");
	die1Element.innerHTML = "<img src=\"images/Die" + this.dice[1].value + "Plain.png\"></img>";
	var die2Element = this.controller.get("die2");
	die2Element.innerHTML = "<img src=\"images/Die" + this.dice[2].value + "Plain.png\"></img>";
	var die3Element = this.controller.get("die3");
	die3Element.innerHTML = "<img src=\"images/Die" + this.dice[3].value + "Plain.png\"></img>";
	var die4Element = this.controller.get("die4");
	die4Element.innerHTML = "<img src=\"images/Die" + this.dice[4].value + "Plain.png\"></img>";
	this.controller.setupWidget("buttonRoll", this.attributes = {}, this.model = {label: "Roll 1", disabled: false});

	/* add event handlers to listen to events from widgets */
	
	//HACK: For testing, restart the game if the "Upper subtotal" text is clicked.
	//this.hack = this.playAgain.bindAsEventListener(this);
	//this.controller.listen("labelSubtotal", Mojo.Event.tap, this.hack);
	
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
	this.playAgainHandler = this.playAgain.bindAsEventListener(this);
	this.controller.listen("playAgain", Mojo.Event.tap, this.playAgainHandler);
	
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
}

MainAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


MainAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

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
	this.controller.stopListening("playAgain", Mojo.Event.tap, this.playAgainHandler);
	//Roll button listener
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
}

MainAssistant.prototype.resetAllScores = function() {
	//Set all the scores to 0.
	this.controller.get("scoreValueOnes").innerHTML = 0;
	this.controller.get("scoreValueTwos").innerHTML = 0;
	this.controller.get("scoreValueThrees").innerHTML = 0;
	this.controller.get("scoreValueFours").innerHTML = 0;
	this.controller.get("scoreValueFives").innerHTML = 0;
	this.controller.get("scoreValueSixes").innerHTML = 0;
	this.controller.get("scoreValueBonus").innerHTML = 0;
	this.controller.get("scoreValueSubtotal").innerHTML = 0;
	this.controller.get("scoreValueThreeOfAKind").innerHTML = 0;
	this.controller.get("scoreValueFourOfAKind").innerHTML = 0;
	this.controller.get("scoreValueFullHouse").innerHTML = 0;
	this.controller.get("scoreValueSmallStraight").innerHTML = 0;
	this.controller.get("scoreValueLargeStraight").innerHTML = 0;
	this.controller.get("scoreValueFiveOfAKind").innerHTML = 0;
	this.controller.get("scoreValueChance").innerHTML = 0;
	this.controller.get("scoreValueTotal").innerHTML = 0;
}

//Die toggles
MainAssistant.prototype.toggleDie0 = function() {
	this.toggleDie(0);
}
MainAssistant.prototype.toggleDie1 = function() {
	this.toggleDie(1);
}
MainAssistant.prototype.toggleDie2 = function() {
	this.toggleDie(2);
}
MainAssistant.prototype.toggleDie3 = function() {
	this.toggleDie(3);
}
MainAssistant.prototype.toggleDie4 = function() {
	this.toggleDie(4);
}
MainAssistant.prototype.toggleDie = function(index) {
	//Make sure the die has a value (i.e., the dice have been rolled at least once this turn).
	if (this.dice[index].value == 0) {
		return;
	}
	//Toggle the held state of the die.
	this.dice[index].held = !this.dice[index].held;
	//Find the die's div in the scene and change its image to reflect the new state.
	var dieElement = this.controller.get("die" + index);
	if (this.dice[index].held) {
		dieElement.innerHTML = "<img src=\"images/Die" + this.dice[index].value + "Held.png\"></img>";
	}
	else {
		dieElement.innerHTML = "<img src=\"images/Die" + this.dice[index].value + "Plain.png\"></img>";
	}
}

//Die roller
MainAssistant.prototype.roll = function() {
	//In case the shake API was used to roll, check that the Roll button isn't disabled.
	if (this.controller.get("buttonRoll").disabled) {
		return;
	}
	//Increment the roll counter and check if all our rolls are used up.
	this.rollCount++;
	if (this.rollCount == 3) {
		this.controller.setWidgetModel("buttonRoll", {label: "Roll 3", disabled: true});
	}
	else {
		this.controller.setWidgetModel("buttonRoll", {label: "Roll " + (this.rollCount + 1)});
	}
	//Call the roll() method on all dice that are not on hold.
	for (var i = 0; i < this.dice.length; i++) {
		if (!this.dice[i].held) {
			this.dice[i].roll();
			this.controller.get("die" + i).innerHTML = "<img src=\"images/Die" + this.dice[i].value + "Plain.png\"></img>";
		}
	}
	//React to five of a kind if merited.
	if (this.checkForFiveOfAKind()) {
		this.reactToFiveOfAKind();
	}
}

//Upper half score buttons
MainAssistant.prototype.setOnes = function() {
	this.setUpperHalfScore("Ones", 1);
}
MainAssistant.prototype.setTwos = function() {
	this.setUpperHalfScore("Twos", 2);
}
MainAssistant.prototype.setThrees = function() {
	this.setUpperHalfScore("Threes", 3);
}
MainAssistant.prototype.setFours = function() {
	this.setUpperHalfScore("Fours", 4);
}
MainAssistant.prototype.setFives = function() {
	this.setUpperHalfScore("Fives", 5);
}
MainAssistant.prototype.setSixes = function() {
	this.setUpperHalfScore("Sixes", 6);
}
MainAssistant.prototype.setUpperHalfScore = function(buttonLabel, targetValue) {
	//Make sure the dice have been rolled.
	if (this.dice[0].value == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.controller.setWidgetModel("button" + buttonLabel, {label: buttonLabel, disabled: true});
	//Total up the applicable dice.
	var score = 0;
	for (var i = 0; i < this.dice.length; i++) {
		if (this.dice[i].value == targetValue) {
			score += this.dice[i].value;
		}
	}
	//Display the score and re-calculate the total.
	this.controller.get("scoreValue" + buttonLabel).innerHTML = score;
	this.setTotal();
	this.releaseDice();
	this.checkForEndOfGame();
}

//Lower half score buttons
MainAssistant.prototype.setThreeOfAKind = function() {
	//Make sure the dice have been rolled.
	if (this.dice[0].value == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.controller.setWidgetModel("buttonThreeOfAKind", {label: "Three of a kind", disabled: true});
	//Look for three of a kind.
	var matches = [];
	for (var startingDie = 0; startingDie < 3 && matches.length < 3; startingDie++) {
		matches = [this.dice[startingDie].value];
		for (var i = startingDie + 1; i < this.dice.length; i++) {
			if (this.dice[i].value == this.dice[startingDie].value) {
				matches.push(this.dice[i].value);
			}
		}
	}
	var score = (matches.length >= 3 ? this.dice[0].value + this.dice[1].value + this.dice[2].value + this.dice[3].value + this.dice[4].value : 0);
	//Display the score and re-calculate the total.
	this.controller.get("scoreValueThreeOfAKind").innerHTML = score;
	this.setTotal();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setFourOfAKind = function() {
	//Make sure the dice have been rolled.
	if (this.dice[0].value == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.controller.setWidgetModel("buttonFourOfAKind", {label: "Four of a kind", disabled: true});
	//Look for four of a kind.
	var matches = [];
	for (var startingDie = 0; startingDie < 4 && matches.length < 4; startingDie++) {
		matches = [this.dice[startingDie].value];
		for (var i = startingDie + 1; i < this.dice.length; i++) {
			if (this.dice[i].value == this.dice[startingDie].value) {
				matches.push(this.dice[i].value);
			}
		}
	}
	var score = (matches.length >= 4 ? this.dice[0].value + this.dice[1].value + this.dice[2].value + this.dice[3].value + this.dice[4].value : 0);
	//Display the score and re-calculate the total.
	this.controller.get("scoreValueFourOfAKind").innerHTML = score;
	this.setTotal();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setFullHouse = function() {
	//Make sure the dice have been rolled.
	if (this.dice[0].value == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.controller.setWidgetModel("buttonFullHouse", {label: "Full house", disabled: true});
	//Sort the values of the dice.
	var values = [this.dice[0].value, this.dice[1].value, this.dice[2].value, this.dice[3].value, this.dice[4].value].sort();
	//See if we got a full house by checking that the first two values match,
	//the last two values match, and the middle value matches one of the adjacent values.
	var score = 0;
	if (values[0] == values[1] && values[3] == values[4] && (values[1] == values[2] || values[2] == values[3])) {
		score = 25;
	}
	//Display the score and re-calculate the total.
	this.controller.get("scoreValueFullHouse").innerHTML = score;
	this.setTotal();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setSmallStraight = function() {
	//Make sure the dice have been rolled.
	if (this.dice[0].value == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.controller.setWidgetModel("buttonSmallStraight", {label: "Small straight", disabled: true});
	//See if we got five of a kind, which can substitute for a straight.
	var score = 0;
	if (this.checkForFiveOfAKind()) {
		score = 30;
	}
	else {
		//Sort the values of the dice.
		var values = [this.dice[0].value, this.dice[1].value, this.dice[2].value, this.dice[3].value, this.dice[4].value].sort();
		//To eliminate having to work around duplicate values, get an array of distinct values.
		var distinctValues = [values[0]];
		for (var i = 1; i < values.length; i++) {
			if (values[i] != values[i - 1]) { distinctValues.push(values[i]); }
		}
		//We can only have a small straight if we have four or more distinct values.
		if (distinctValues.length == 5) {
			//See if we got a straight across the middle three values, plus one of the outer values.
			var centerStraight = (distinctValues[1] == (distinctValues[2] - 1) && distinctValues[2] == (distinctValues[3] - 1));
			var consecutiveEnd = (distinctValues[0] == (distinctValues[1] - 1) || distinctValues[3] == (distinctValues[4] - 1));
			if (centerStraight && consecutiveEnd) {
				score = 30;
			}
		}
		else if (distinctValues.length == 4) {
			//See if we got a straight across all four distinct values.
			if (distinctValues[0] == (distinctValues[1] - 1) && distinctValues[1] == (distinctValues[2] - 1) && distinctValues[2] == (distinctValues[3] - 1)) {
				score = 30;
			}
		}
	}
	//Display the score and re-calculate the total.
	this.controller.get("scoreValueSmallStraight").innerHTML = score;
	this.setTotal();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setLargeStraight = function() {
	//Make sure the dice have been rolled.
	if (this.dice[0].value == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.controller.setWidgetModel("buttonLargeStraight", {label: "Large straight", disabled: true});
	//See if we got five of a kind, which can substitute for a straight.
	var score = 0;
	if (this.checkForFiveOfAKind()) {
		score = 40;
	}
	else {
		//Sort the values of the dice.
		var values = [this.dice[0].value, this.dice[1].value, this.dice[2].value, this.dice[3].value, this.dice[4].value].sort();
		//See if we got a straight across all the dice.
		if (values[0] == (values[1] - 1) && values[1] == (values[2] - 1) && values[2] == (values[3] - 1) && values[3] == (values[4] - 1)) {
			score = 40;
		}
	}
	//Display the score and re-calculate the total.
	this.controller.get("scoreValueLargeStraight").innerHTML = score;
	this.setTotal();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setFiveOfAKind = function() {
	//Make sure the dice have been rolled.
	if (this.dice[0].value == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.controller.setWidgetModel("buttonFiveOfAKind", {label: "Five of a kind", disabled: true});
	//Look for five of a kind.
	var score = (this.checkForFiveOfAKind() ? 50 : 0);
	//Display the score and re-calculate the total.
	this.controller.get("scoreValueFiveOfAKind").innerHTML = score;
	this.setTotal();
	this.releaseDice();
	this.checkForEndOfGame();
}

MainAssistant.prototype.setChance = function() {
	//Make sure the dice have been rolled.
	if (this.dice[0].value == 0) {
		return;
	}
	//Disable the score button for the remainder of the game.
	this.controller.setWidgetModel("buttonChance", {label: "Chance", disabled: true});
	//Add up all the dice.
	var score = 0;
	for (var i = 0; i < this.dice.length; i++) {
		score += this.dice[i].value;
	}
	//Display the score and re-calculate the total.
	this.controller.get("scoreValueChance").innerHTML = score;
	this.setTotal();
	this.releaseDice();
	this.checkForEndOfGame();
}

//Auxiliary functions
MainAssistant.prototype.checkForFiveOfAKind = function(){
	 return (this.dice[0].value == this.dice[1].value && this.dice[1].value == this.dice[2].value && this.dice[2].value == this.dice[3].value && this.dice[3].value == this.dice[4].value);
}

MainAssistant.prototype.reactToFiveOfAKind = function() {
	//See if we've already scored five of a kind.
	var fiveOfAKindScore = +this.controller.get("scoreValueFiveOfAKind").innerHTML;
	if (fiveOfAKindScore == 0) {
		//TODO: Notify the user that they've rolled five of a kind and should probably score it as such.
	}
	else {
		fiveOfAKindScore += 100;
		this.controller.get("scoreValueFiveOfAKind").innerHTML = fiveOfAKindScore;
		//TODO: Notify the user they've earned 100 bonus points for rolling five of a kind again.
	}
	//Freeze the Roll button.
	this.controller.setWidgetModel("buttonRoll", {label: "Roll", disabled: true});
}

MainAssistant.prototype.setTotal = function() {
	//Count up the upper half first to see if the bonus is earned.
	var total = 0;
	total += +this.controller.get("scoreValueOnes").innerHTML;
	total += +this.controller.get("scoreValueTwos").innerHTML;
	total += +this.controller.get("scoreValueThrees").innerHTML;
	total += +this.controller.get("scoreValueFours").innerHTML;
	total += +this.controller.get("scoreValueFives").innerHTML;
	total += +this.controller.get("scoreValueSixes").innerHTML;
	this.controller.get("scoreValueBonus").innerHTML = (total >= 63 ? 35 : 0);
	//Add in the bonus to get the subtotal.
	total += +this.controller.get("scoreValueBonus").innerHTML;
	this.controller.get("scoreValueSubtotal").innerHTML = total;
	//Add in the lower half scores to get the total.
	total += +this.controller.get("scoreValueThreeOfAKind").innerHTML;
	total += +this.controller.get("scoreValueFourOfAKind").innerHTML;
	total += +this.controller.get("scoreValueFullHouse").innerHTML;
	total += +this.controller.get("scoreValueSmallStraight").innerHTML;
	total += +this.controller.get("scoreValueLargeStraight").innerHTML;
	total += +this.controller.get("scoreValueFiveOfAKind").innerHTML;
	total += +this.controller.get("scoreValueChance").innerHTML;
	this.controller.get("scoreValueTotal").innerHTML = total;
}

MainAssistant.prototype.releaseDice = function() {
	//Blank out and un-hold all the dice.
	for (var i = 0; i < this.dice.length; i++) {
		this.dice[i].value = 0;
		this.dice[i].held = false;
		this.controller.get("die" + i).innerHTML = "<img src=\"images/Die" + this.dice[i].value + "Plain.png\"></img>";
	}
	//Enable the Roll button and reset the roll counter.
	this.controller.setWidgetModel("buttonRoll", {label: "Roll 1", disabled: false});
	this.rollCount = 0;
}

MainAssistant.prototype.checkForEndOfGame = function() {
	//Since this function is called exactly once by each score button,
	//it's easiest to just increment the scoreButtonsSet counter here.
	this.scoreButtonsSet++;
	
	//See if all of the score buttons have been set, which means the game is over.
	if (this.scoreButtonsSet < 13) {
		return;
	}
	
	//Disable the Roll button.
	this.controller.setWidgetModel("buttonRoll", {
		label: "Roll 3",
		disabled: true
	});
	
	//Hide the dice and show the "Play Again" text.
	this.controller.get("die0").style.visibility = "hidden";
	this.controller.get("die1").style.visibility = "hidden";
	this.controller.get("die2").style.visibility = "hidden";
	this.controller.get("die3").style.visibility = "hidden";
	this.controller.get("die4").style.visibility = "hidden";
	this.controller.get("playAgain").style.visibility = "visible";
	//TODO: Other end-of-game stuff?
}

MainAssistant.prototype.playAgain = function() {
	//Set all the scores to 0.
	this.resetAllScores();
	
	//Enable all the score buttons and reset the counter.
	this.controller.setWidgetModel("buttonOnes", {label: "Ones", disabled: false});
	this.controller.setWidgetModel("buttonTwos", {label: "Twos", disabled: false});
	this.controller.setWidgetModel("buttonThrees", {label: "Threes", disabled: false});
	this.controller.setWidgetModel("buttonFours", {label: "Fours", disabled: false});
	this.controller.setWidgetModel("buttonFives", {label: "Fives", disabled: false});
	this.controller.setWidgetModel("buttonSixes", {label: "Sixes", disabled: false});
	this.controller.setWidgetModel("buttonThreeOfAKind", {label: "Three of a kind", disabled: false});
	this.controller.setWidgetModel("buttonFourOfAKind", {label: "Four of a kind", disabled: false});
	this.controller.setWidgetModel("buttonFullHouse", {label: "Full house", disabled: false});
	this.controller.setWidgetModel("buttonSmallStraight", {label: "Small straight", disabled: false});
	this.controller.setWidgetModel("buttonLargeStraight", {label: "Large straight", disabled: false});
	this.controller.setWidgetModel("buttonFiveOfAKind", {label: "Five of a kind", disabled: false});
	this.controller.setWidgetModel("buttonChance", {label: "Chance", disabled: false});
	this.scoreButtonsSet = 0;
	
	//Hide the "Play Again" text and show the dice.
	this.controller.get("playAgain").style.visibility = "hidden";
	this.controller.get("die0").style.visibility = "visible";
	this.controller.get("die1").style.visibility = "visible";
	this.controller.get("die2").style.visibility = "visible";
	this.controller.get("die3").style.visibility = "visible";
	this.controller.get("die4").style.visibility = "visible";
	this.releaseDice();
}
