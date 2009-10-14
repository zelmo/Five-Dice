var ButtonModels = Class.create ({
	ones:			{label: "Ones",				disabled: false},
	twos:			{label: "Twos",				disabled: false},
	threes:			{label: "Threes",			disabled: false},
	fours:			{label: "Fours",			disabled: false},
	fives:			{label: "Fives",			disabled: false},
	sixes:			{label: "Sixes",			disabled: false},
	threeOfAKind:	{label: "Three of a kind",	disabled: false},
	fourOfAKind:	{label: "Four of a kind",	disabled: false},
	fullHouse:		{label: "Full house",		disabled: false},
	smallStraight:	{label: "Small straight",	disabled: false},
	largeStraight:	{label: "Large straight",	disabled: false},
	fiveOfAKind:	{label: "Five of a kind",	disabled: false},
	chance:			{label: "Chance",			disabled: false},
	roll:			{label: "Roll 1",			disabled: false},
	
	allButtonsAreDisabled: function() {
		return (this.ones.disabled && this.twos.disabled && this.threes.disabled &&
			this.fours.disabled && this.fives.disabled && this.sixes.disabled &&
			this.threeOfAKind.disabled && this.fourOfAKind.disabled && this.fullHouse.disabled &&
			this.smallStraight.disabled && this.largeStraight.disabled && this.fiveOfAKind.disabled &&
			this.chance.disabled);
	},
	
	enableAllButtons: function() {
		this.ones.disabled = false;
		this.twos.disabled = false;
		this.threes.disabled = false;
		this.fours.disabled = false;
		this.fives.disabled = false;
		this.sixes.disabled = false;
		this.threeOfAKind.disabled = false;
		this.fourOfAKind.disabled = false;
		this.fullHouse.disabled = false;
		this.smallStraight.disabled = false;
		this.largeStraight.disabled = false;
		this.fiveOfAKind.disabled = false;
		this.chance.disabled = false;
		this.roll.disabled = false;
	}
});
