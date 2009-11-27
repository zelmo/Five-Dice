//Declare a global object to act as a namespace for general values and models.
var FiveDice = {
	suggestedScoreColor: "teal", //Color of the possible scores displayed after each roll.
	setScoreColor: "black", //Color of the scores after they've been set.
	MenuAttributes: {	omitDefaultItems: true },
	//Declare and initialize the globals that will be set by the Preferences scene.
	cookie: new Mojo.Model.Cookie("FiveDicePreferences"),
	shakeToRoll: false,
	disableRollButtonBetweenRolls: false, 
	rollButtonDisabledTimeout: 500, //Length of time (ms) the Roll button stays disabled between rolls.
	showSubtotalDeviation: true
};
