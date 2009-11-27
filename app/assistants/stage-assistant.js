function StageAssistant() {
	//TODO: Players are being added here for testing. Ultimately there should be a scene that sets the player list.
	FiveDice.players = FiveDice.playerStateList();
	FiveDice.players.addPlayer("Daren");
	FiveDice.players.addPlayer("Not Daren");

	//Define the About dialog model.
	this.aboutDialogModel = {
		title: "#{appName} #{version}".interpolate({appName: Mojo.Controller.appInfo.title, version: Mojo.Controller.appInfo.version}),
		message: "Copyleft 2009, #{vendor}".interpolate({vendor: Mojo.Controller.appInfo.vendor}),
		choices: [{label: "OK", value: "ok"}, {label: "View License", value: "license"}],
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
		}
	};
};

StageAssistant.prototype.setup = function() {
	this.loadPreferences();
	this.controller.pushScene('main', FiveDice.players.firstPlayer());
};

StageAssistant.prototype.handleCommand = function(event) {
	if (event.type != Mojo.Event.command) { return; }
	switch (event.command) {
		case "do-about":
			this.controller.activeScene().showAlertDialog(this.aboutDialogModel);
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
