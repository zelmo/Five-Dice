function StageAssistant() {
	//Define the About dialog model.
	this.aboutDialogModel = {
		title: "#{appName} #{version}".interpolate({appName: Mojo.Controller.appInfo.title, version: Mojo.Controller.appInfo.version}),
		message: "Copyleft 2009-2010, #{vendor}".interpolate({vendor: Mojo.Controller.appInfo.vendor}),
		choices: [
			{label: "OK", value: "ok", type: "primary"},
			{label: "View License", value: "license", type: "secondary"},
			{label: "Go to Wiki", value: "wiki", type: "secondary"},
			{label: "Go to Support Page", value: "support", type: "secondary"}
		],
		onChoose: function (value) {
			var serviceParameters = {id: "com.palm.app.browser"};
			var serviceObject = {method: "open"};
			switch (value) {
				case "license":
					serviceParameters.params = {target: "http://www.gnu.org/licenses/gpl-3.0-standalone.html"};
					serviceObject.parameters = serviceParameters;
					this.controller.serviceRequest("palm://com.palm.applicationManager", serviceObject);
					break;
				case "wiki":
					serviceParameters.params = {target: "http://github.com/zelmo/Five-Dice/wiki/Five-Dice"};
					serviceObject.parameters = serviceParameters;
					this.controller.serviceRequest("palm://com.palm.applicationManager", serviceObject);
					break;
				case "support":
					serviceParameters.params = {target: "http://github.com/zelmo/Five-Dice/issues"};
					serviceObject.parameters = serviceParameters;
					this.controller.serviceRequest("palm://com.palm.applicationManager", serviceObject);
					break;
			}
		}
	};
	
	//Define a namespace-wide high scores database object.
	FIVEDICE.highScores = FIVEDICE.highScoreDatabaseWrapper();
}

StageAssistant.prototype.setup = function () {
	FIVEDICE.readPreferencesCookie();
	this.loadPlayers();
	this.controller.pushScene("playerList");
};//setup()

StageAssistant.prototype.handleCommand = function (event) {
	if (event.type != Mojo.Event.command) { return; }
	switch (event.command) {
	case "do-highScores":
		this.controller.pushScene("highScores");
		break;
	case "do-about":
		this.controller.activeScene().showAlertDialog(this.aboutDialogModel);
		break;
	}
};//handleCommand()

StageAssistant.prototype.loadPlayers = function () {
	//Read in stored players from a cookie.
	var storedPlayerObject = FIVEDICE.storedPlayersCookie.get();
	if (storedPlayerObject && storedPlayerObject.hasOwnProperty("items")) {
		for (var i = 0; i < storedPlayerObject.items.length; i++) {
			FIVEDICE.storedPlayers.items.push({name: storedPlayerObject.items[i].name, selected: storedPlayerObject.items[i].selected});
		}
	}//if
};//loadPlayers()
