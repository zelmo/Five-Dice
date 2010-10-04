function DeleteDialogAssistant(sceneAssistant) {
	this.sceneAssistant = sceneAssistant;
	var numberOfScores = FIVEDICE.highScores.getScores().length;
	this.numberToKeep = {value: (numberOfScores > 100 ? 100 : numberOfScores)};
}

DeleteDialogAssistant.prototype.setup = function (widget) {
	this.widget = widget;
	
	//Set up the widgets.
	var numberToKeepAttributes = {min: 0, max: 100};
	this.sceneAssistant.controller.setupWidget("numberToKeep", numberToKeepAttributes, this.numberToKeep);
	this.sceneAssistant.controller.setupWidget("okButton", {}, {label: "OK", disabled: false});
	this.sceneAssistant.controller.setupWidget("cancelButton", {}, {label: "Cancel", disabled: false});
	
	//Set up listeners.
	this.whichToKeepHandler = this.setWhichToKeep.bindAsEventListener(this);
	this.sceneAssistant.controller.listen("whichToKeep", Mojo.Event.tap, this.whichToKeepHandler);
	this.okButtonHandler = this.deleteScores.bindAsEventListener(this);
	this.sceneAssistant.controller.listen("okButton", Mojo.Event.tap, this.okButtonHandler);
	this.sceneAssistant.controller.listen("cancelButton", Mojo.Event.tap, this.widget.mojo.close);
};//setup()

DeleteDialogAssistant.prototype.cleanup = function () {
	//Remove listeners.
	this.sceneAssistant.controller.stopListening("whichToKeep", Mojo.Event.tap, this.whichToKeepHandler);
	this.sceneAssistant.controller.stopListening("okButton", Mojo.Event.tap, this.okButtonHandler);
	this.sceneAssistant.controller.stopListening("cancelButton", Mojo.Event.tap, this.widget.mojo.close);
};//cleanup()

DeleteDialogAssistant.prototype.setWhichToKeep = function (event) {
	var submenuAttributes = {
		onChoose: function (command) {this.controller.get("whichToKeep").innerHTML = command;},
		items: [
			{label: "Highest", command: "Highest"},
			{label: "Lowest", command: "Lowest"},
			{label: "Newest", command: "Newest"},
			{label: "Oldest", command: "Oldest"}
		]
	};
	this.sceneAssistant.controller.popupSubmenu(submenuAttributes);
};//setWhichToKeep()

DeleteDialogAssistant.prototype.deleteScores = function () {
	var whichToKeep = this.sceneAssistant.controller.get("whichToKeep").innerHTML;
	FIVEDICE.highScores.chopAllExcept(this.numberToKeep.value, whichToKeep);
	this.sceneAssistant.showScores();
	this.widget.mojo.close();
};//deleteScores()
