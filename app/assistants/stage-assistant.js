function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	//Create an array of five dice.
	this.dice = [new Dice(), new Dice(), new Dice(), new Dice(), new Dice()];
	this.controller.pushScene('main', this.dice);
}
