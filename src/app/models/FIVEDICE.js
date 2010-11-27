//Declare a global object to act as a namespace for general values and models.
var FIVEDICE = {
	defaultBackgroundColor: "MediumSeaGreen",
	suggestedScoreColor: "Yellow", //Color of the possible scores displayed after each roll.
	setScoreColor: "Black", //Color of the scores after they've been set.
	totalsColor: "Purple", //Color of the subtotal, bonus, and total scores.
	heldColor: "Blue", //Color overlay for held dice.
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
			if (storedPreferences.hasOwnProperty("heldColor")) { this.heldColor = storedPreferences.heldColor; }
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
			heldColor: this.heldColor,
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
	},
	getContrastingColor: function (color) {
		switch (color) {
		case "AliceBlue":
		case "AntiqueWhite":
		case "Aqua":
		case "Aquamarine":
		case "Azure":
		case "Beige":
		case "Bisque":
			return "Black";
			break;
		case "Black":
			return "White";
			break;
		case "BlanchedAlmond":
			return "Black";
			break;
		case "Blue":
			return "White";
			break;
		case "BlueViolet":
			return "Black";
			break;
		case "Brown":
			return "White";
			break;
		case "BurlyWood":
		case "CadetBlue":
		case "Chartreuse":
		case "Chocolate":
		case "Coral":
		case "CornflowerBlue":
		case "Cornsilk":
		case "Crimson":
		case "Cyan":
			return "Black";
			break;
		case "DarkBlue":
			return "White";
			break;
		case "DarkCyan":
		case "DarkGoldenrod":
		case "DarkGray":
			return "Black";
			break;
		case "DarkGreen":
			return "White";
			break;
		case "DarkKhaki":
		case "DarkMagenta":
		case "DarkOliveGreen":
		case "DarkOrange":
		case "DarkOrchid":
			return "Black";
			break;
		case "DarkRed":
			return "White";
			break;
		case "DarkSalmon":
		case "DarkSeaGreen":
			return "Black";
			break;
		case "DarkSlateBlue":
		case "DarkSlateGray":
			return "White";
			break;
		case "DarkTurquoise":
		case "DarkViolet":
		case "DeepPink":
		case "DeepSkyBlue":
		case "DimGray":
		case "DodgerBlue":
		case "FireBrick":
		case "FloralWhite":
		case "ForestGreen":
		case "Fuschia":
		case "Gainsboro":
		case "GhostWhite":
		case "Gold":
		case "GoldenRod":
		case "Gray":
		case "Green":
		case "GreenYellow":
		case "HoneyDew":
		case "HotPink":
		case "IndianRed":
			return "Black";
			break;
		case "Indigo":
			return "White";
			break;
		case "Ivory":
		case "Khaki":
		case "Lavender":
		case "LavenderBlush":
		case "LawnGreen":
		case "LemonChiffon":
		case "LightBlue":
		case "LightCoral":
		case "LightCyan":
		case "LightGoldenRodYellow":
		case "LightGrey":
		case "LightGreen":
		case "LightPink":
		case "LightSalmon":
		case "LightSeaGreen":
		case "LightSkyBlue":
		case "LightSlateGray":
		case "LightSteelBlue":
		case "LightYellow":
		case "Lime":
		case "LimeGreen":
		case "Linen":
		case "Magenta":
			return "Black";
			break;
		case "Maroon":
			return "White";
			break;
		case "MediumAquaMarine":
			return "Black";
			break;
		case "MediumBlue":
			return "White";
			break;
		case "MediumOrchid":
		case "MediumPurple":
		case "MediumSeaGreen":
		case "MediumSlateBlue":
		case "MediumSpringGreen":
		case "MediumTurquoise":
		case "MediumVoiletRed":
			return "Black";
			break;
		case "MidnightBlue":
			return "White";
			break;
		case "MintCream":
		case "MistyRose":
		case "Moccasin":
		case "NavajoWhite":
			return "Black";
			break;
		case "Navy":
			return "White";
			break;
		case "OldLace":
		case "Olive":
		case "OliveDrab":
		case "Orange":
		case "OrangeRed":
		case "Orchid":
		case "PaleGoldenRod":
		case "PaleGreen":
		case "PaleTurquoise":
		case "PaleVioletRed":
		case "PapayaWhip":
		case "PeachPuff":
		case "Peru":
		case "Pink":
		case "Plum":
		case "PowderBlue":
			return "Black";
			break;
		case "Purple":
			return "White";
			break;
		case "Red":
		case "RosyBrown":
		case "RoyalBlue":
		case "SaddleBrown":
		case "Salmon":
		case "SandyBrown":
		case "SeaGreen":
		case "SeaShell":
		case "Sienna":
		case "Silver":
		case "SkyBlue":
		case "SlateBlue":
		case "SlateGray":
		case "Snow":
		case "SpringGreen":
		case "SteelBlue":
		case "Tan":
		case "Teal":
		case "Thistle":
		case "Tomato":
		case "Turquoise":
		case "Violet":
		case "Wheat":
		case "White":
		case "WhiteSmoke":
		case "Yellow":
		case "YellowGreen":
			return "Black";
			break;
		}
	}
};
