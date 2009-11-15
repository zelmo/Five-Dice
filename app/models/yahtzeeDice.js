var YahtzeeDice = Class.create ({
	dice: [new SixSidedDie(), new SixSidedDie(), new SixSidedDie(), new SixSidedDie(), new SixSidedDie()],
	
	rollCount: 1,
	
	roll: function() {
		for (var i = 0; i < this.dice.length; i++){
			if (!this.dice[i].held) {
				this.dice[i].roll();
			}
		}
		this.rollCount++;
	},
	
	clear: function(){
		for (var i = 0; i < this.dice.length; i++) {
			this.dice[i].value = 0;
			this.dice[i].held = false;
		}
		this.rollCount = 1;
	},
	
	upperHalfScore: function(targetValue) {
		var score = 0;
		for (var i = 0; i < this.dice.length; i++) {
			if (this.dice[i].value == targetValue) {
				score += this.dice[i].value;
			}
		}
		return score;
	},
	
	threeOfAKindScore: function() {
		var matches = [];
		for (var startingDie = 0; startingDie < 3 && matches.length < 3; startingDie++) {
			matches = [this.dice[startingDie].value];
			for (var i = startingDie + 1; i < this.dice.length; i++) {
				if (this.dice[i].value == this.dice[startingDie].value) {
					matches.push(this.dice[i].value);
				}
			}
		}
		var score = 0;
		if (matches.length >= 3) {
			score = this.dice[0].value + this.dice[1].value + this.dice[2].value + this.dice[3].value + this.dice[4].value;
		}
		return score;
	},
	
	fourOfAKindScore: function() {
		var matches = [];
		for (var startingDie = 0; startingDie < 4 && matches.length < 4; startingDie++) {
			matches = [this.dice[startingDie].value];
			for (var i = startingDie + 1; i < this.dice.length; i++) {
				if (this.dice[i].value == this.dice[startingDie].value) {
					matches.push(this.dice[i].value);
				}
			}
		}
		var score = 0;
		if (matches.length >= 4) {
			score = this.dice[0].value + this.dice[1].value + this.dice[2].value + this.dice[3].value + this.dice[4].value;
		}
		return score;
	},
	
	fullHouseScore: function() {
		//Sort the values of the dice.
		var values = [this.dice[0].value, this.dice[1].value, this.dice[2].value, this.dice[3].value, this.dice[4].value].sort();
		//See if we got a full house by checking that the first two values match,
		//the last two values match, and the middle value matches one of the adjacent values.
		var score = 0;
		if (values[0] == values[1] && values[3] == values[4] && (values[1] == values[2] || values[2] == values[3])) {
			score = 25;
		}
		return score;
	},
	
	smallStraightScore: function() {
		var score = 0;
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
		return score;
	},
	
	largeStraightScore: function() {
		var score = 0;
		//Sort the values of the dice.
		var values = [this.dice[0].value, this.dice[1].value, this.dice[2].value, this.dice[3].value, this.dice[4].value].sort();
		//See if we got a straight across all the dice.
		if (values[0] == (values[1] - 1) && values[1] == (values[2] - 1) && values[2] == (values[3] - 1) && values[3] == (values[4] - 1)) {
			score = 40;
		}
		return score;
	},
	
	fiveOfAKindScore: function() {
		if (this.dice[0].value == this.dice[1].value && this.dice[1].value == this.dice[2].value && this.dice[2].value == this.dice[3].value && this.dice[3].value == this.dice[4].value)
		{
			return 50;
		}
		else
		{
			return 0;
		}
	},
	
	chanceScore: function() {
		var score = 0;
		for (var i = 0; i < this.dice.length; i++) {
			score += this.dice[i].value;
		}
		return score;
	}
});
