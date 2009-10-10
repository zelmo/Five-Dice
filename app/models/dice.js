var Dice = Class.create ({
	held: false,
	value: 0,
	roll: function() {
		this.value = (Math.round(Math.random() * 5)) + 1;
	}
});
