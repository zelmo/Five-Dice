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
	//Initial values for high score list restriction (these will be set by a dialog accessible from the High Scores scene).
	scoreRestrictions: {restrictScores: false, numberToKeep: 100, whichToKeep: "Newest"},
	//Cookie and empty array for stored players.
	storedPlayersCookie: new Mojo.Model.Cookie("FiveDicePlayers"),
	storedPlayers: {listTitle: "Stored Players", items: []},
	readPreferencesCookie: function () {
		var storedPreferences = this.preferencesCookie.get();
		if (storedPreferences) {
			if (storedPreferences.hasOwnProperty("shakeToRoll")) { this.shakeToRoll = storedPreferences.shakeToRoll; }
			if (storedPreferences.hasOwnProperty("rollSpeed")) { this.rollSpeed = storedPreferences.rollSpeed; }
			if (storedPreferences.hasOwnProperty("showSubtotalDeviation")) { this.showSubtotalDeviation = storedPreferences.showSubtotalDeviation; }
			if (storedPreferences.hasOwnProperty("freezeDiceAfterRoll")) { this.freezeDiceAfterRoll = storedPreferences.freezeDiceAfterRoll; }
			if (storedPreferences.hasOwnProperty("defaultBackgroundColor")) { this.defaultBackgroundColor = storedPreferences.defaultBackgroundColor; }
			if (storedPreferences.hasOwnProperty("suggestedScoreColor")) { this.suggestedScoreColor = storedPreferences.suggestedScoreColor; }
			if (storedPreferences.hasOwnProperty("setScoreColor")) { this.setScoreColor = storedPreferences.setScoreColor; }
			if (storedPreferences.hasOwnProperty("totalsColor")) { this.totalsColor = storedPreferences.totalsColor; }
			if (storedPreferences.hasOwnProperty("scoreRestrictions")) {
				this.scoreRestrictions.restrictScores = storedPreferences.scoreRestrictions.restrictScores;
				this.scoreRestrictions.numberToKeep = storedPreferences.scoreRestrictions.numberToKeep;
				this.scoreRestrictions.whichToKeep = storedPreferences.scoreRestrictions.whichToKeep;
			}
		}
	},
	writePreferencesCookie: function () {
		this.preferencesCookie.put({
			rollSpeed: this.rollSpeed,
			shakeToRoll: this.shakeToRoll,
			freezeDiceAfterRoll: this.freezeDiceAfterRoll,
			showSubtotalDeviation: this.showSubtotalDeviation,
			defaultBackgroundColor: this.defaultBackgroundColor,
			suggestedScoreColor: this.suggestedScoreColor,
			setScoreColor: this.setScoreColor,
			totalsColor: this.totalsColor,
			scoreRestrictions: {
				restrictScores: this.scoreRestrictions.restrictScores,
				numberToKeep: this.scoreRestrictions.numberToKeep,
				whichToKeep: this.scoreRestrictions.whichToKeep
			}
		});
	}
};
