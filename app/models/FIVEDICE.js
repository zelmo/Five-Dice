//Declare a global object to act as a namespace for general values and models.
var FIVEDICE = {
	defaultBackgroundColor: "MediumSeaGreen",
	suggestedScoreColor: "Yellow", //Color of the possible scores displayed after each roll.
	setScoreColor: "Black", //Color of the scores after they've been set.
	totalsColor: "Purple", //Color of the subtotal, bonus, and total scores.
	MenuAttributes: {omitDefaultItems: true},
	//Initial values for Preferences globals (these will be set by the Preferences scene):
	preferencesCookie: new Mojo.Model.Cookie("FiveDicePreferences"),
	shakeToRoll: false,
	rollSpeed: 8, //Speed at which rolled dice display their values, on a scale from 0 (1/2 sec) to 10 (instant).
	showSubtotalDeviation: true,
	freezeDiceAfterRoll: false,
	//Cookie and empty array for stored players.
	storedPlayersCookie: new Mojo.Model.Cookie("FiveDicePlayers"),
	storedPlayers: {listTitle: "Stored Players", items: []}
};
