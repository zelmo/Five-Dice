//Declare a global object to act as a namespace for general values and models.
var FIVEDICE = {
	defaultBackgroundColor: "#EEE",
	suggestedScoreColor: "yellow", //Color of the possible scores displayed after each roll.
	setScoreColor: "black", //Color of the scores after they've been set.
	MenuAttributes: {omitDefaultItems: true},
	//Initial values for Preferences globals (these will be set by the Preferences scene):
	preferencesCookie: new Mojo.Model.Cookie("FiveDicePreferences"),
	shakeToRoll: false,
	disableRollButtonBetweenRolls: false, 
	rollButtonDisabledTimeout: 500, //Length of time (ms) the Roll button stays disabled between rolls.
	showSubtotalDeviation: true,
	//Cookie and empty array for stored players.
	storedPlayersCookie: new Mojo.Model.Cookie("FiveDicePlayers"),
	storedPlayers: {listTitle: "Stored Players", items: []}
};