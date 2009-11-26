//Declare a global object to act as a namespace for general values and models.
var FiveDice = {};
FiveDice.suggestedScoreColor = "teal"; //Color of the possible scores displayed after each roll.
FiveDice.setScoreColor = "black"; //Color of the scores after they've been set.
FiveDice.MenuAttributes = {	omitDefaultItems: true };
//Declare and initialize the globals that will be set by the Preferences scene.
FiveDice.cookie = new Mojo.Model.Cookie("FiveDicePreferences");
FiveDice.shakeToRoll = false;
FiveDice.disableRollButtonBetweenRolls = false; 
FiveDice.rollButtonDisabledTimeout = 500; //Length of time (ms) the Roll button stays disabled between rolls.
FiveDice.showSubtotalDeviation = true;

function StageAssistant() {
	//Define the About dialog model.
	this.aboutDialogModel = {
		onChoose: function(value) {
			switch (value) {
				case "license":
					//Define the parameters for the service request object.
					var serviceParameters = {
						id: "com.palm.app.browser",
						params: {target: "http://www.gnu.org/licenses/gpl-3.0-standalone.html"}
					};
					//Define the service request object, using the above parameters.
					var serviceObject = {
						method: "open",
						parameters: serviceParameters
					};
					//Call the service request.
					this.controller.serviceRequest("palm://com.palm.applicationManager", serviceObject);
					break;
			}
		},
		title: "#{appName} #{version}".interpolate({appName: Mojo.Controller.appInfo.title, version: Mojo.Controller.appInfo.version}),
		message: "Copyleft 2009, #{vendor}".interpolate({vendor: Mojo.Controller.appInfo.vendor}),
		choices: [{label: "OK", value: "ok"}, {label: "View License", value: "license"}]
	};
};

StageAssistant.prototype.setup = function() {
	this.loadPreferences();
	this.controller.pushScene('main');
};

StageAssistant.prototype.handleCommand = function(event) {
	if (event.type != Mojo.Event.command) { return; }
	switch (event.command) {
		case "do-about":
			var currentScene = this.controller.activeScene();
			currentScene.showAlertDialog(this.aboutDialogModel);
			break;
	}
};

StageAssistant.prototype.loadPreferences = function() {
	//Update globals with stored preferences.
	var storedPreferences = FiveDice.cookie.get();
	if (storedPreferences) {
		if (storedPreferences.hasOwnProperty("shakeToRoll")) { FiveDice.shakeToRoll = storedPreferences.shakeToRoll; }
		if (storedPreferences.hasOwnProperty("disableRollButtonBetweenRolls")) {FiveDice.disableRollButtonBetweenRolls = storedPreferences.disableRollButtonBetweenRolls; }
		if (storedPreferences.hasOwnProperty("rollButtonDisabledTimeout")) {FiveDice.rollButtonDisabledTimeout = storedPreferences.rollButtonDisabledTimeout; }
		if (storedPreferences.hasOwnProperty("showSubtotalDeviation")) {FiveDice.showSubtotalDeviation = storedPreferences.showSubtotalDeviation; }
	}
};
