function RestrictDialogAssistant(sceneAssistant) {
	this.sceneAssistant = sceneAssistant;
	this.numberToKeep = {value: FIVEDICE.scoreRestrictions.numberToKeep};
	this.restrictScoresCheckBoxModel = {
		value: FIVEDICE.scoreRestrictions.restrictScores,
		disabled: false
	}
	this.restrictScoresDrawerModel = {open: FIVEDICE.scoreRestrictions.restrictScores};
}

RestrictDialogAssistant.prototype.setup = function (widget) {
	this.widget = widget;
	
	//Set up the widgets.
	var numberToKeepAttributes = {min: 1, max: 100};
	this.sceneAssistant.controller.get("whichToKeep").innerHTML = FIVEDICE.scoreRestrictions.whichToKeep;
	this.sceneAssistant.controller.setupWidget("restrictScoresCheckBox", {}, this.restrictScoresCheckBoxModel);
	this.sceneAssistant.controller.setupWidget("restrictScoresDrawer", {}, this.restrictScoresDrawerModel);
	this.sceneAssistant.controller.setupWidget("numberToKeep", numberToKeepAttributes, this.numberToKeep);
	
	//Set up listeners.
	this.restrictScoresCheckBoxHandler = this.setDrawerModel.bindAsEventListener(this);
	this.sceneAssistant.controller.listen("restrictScoresCheckBox", Mojo.Event.propertyChange, this.restrictScoresCheckBoxHandler);
	this.whichToKeepHandler = this.setWhichToKeep.bindAsEventListener(this);
	this.sceneAssistant.controller.listen("whichToKeep", Mojo.Event.tap, this.whichToKeepHandler);
	this.okButtonHandler = this.restrictScores.bindAsEventListener(this);
	this.sceneAssistant.controller.listen("okButton", Mojo.Event.tap, this.okButtonHandler);
	this.sceneAssistant.controller.listen("cancelButton", Mojo.Event.tap, this.widget.mojo.close);
};//setup()

RestrictDialogAssistant.prototype.cleanup = function () {
	//Remove listeners.
	this.sceneAssistant.controller.stopListening("restrictScoresCheckBox", Mojo.Event.propertyChange, this.restrictScoresCheckBoxHandler);
	this.sceneAssistant.controller.stopListening("whichToKeep", Mojo.Event.tap, this.whichToKeepHandler);
	this.sceneAssistant.controller.stopListening("okButton", Mojo.Event.tap, this.okButtonHandler);
	this.sceneAssistant.controller.stopListening("cancelButton", Mojo.Event.tap, this.widget.mojo.close);
};//cleanup()

RestrictDialogAssistant.prototype.setDrawerModel = function () {
	this.restrictScoresDrawerModel.open = this.restrictScoresCheckBoxModel.value;
	this.sceneAssistant.controller.modelChanged(this.restrictScoresDrawerModel);
};//setDrawerModel()

RestrictDialogAssistant.prototype.setWhichToKeep = function (event) {
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

RestrictDialogAssistant.prototype.restrictScores = function () {
	var whichToKeep = this.sceneAssistant.controller.get("whichToKeep").innerHTML;
	//Store the preferences cookie, since it holds our restriction settings.
	FIVEDICE.scoreRestrictions.restrictScores = this.restrictScoresCheckBoxModel.value;
	FIVEDICE.scoreRestrictions.numberToKeep = this.numberToKeep.value;
	FIVEDICE.scoreRestrictions.whichToKeep = whichToKeep;
	FIVEDICE.writePreferencesCookie();
	//Chop the scores if needed.
	if (FIVEDICE.scoreRestrictions.restrictScores) {
		FIVEDICE.highScores.chopAllExcept(this.numberToKeep.value, whichToKeep);
	}
	this.sceneAssistant.showScores();
	this.widget.mojo.close();
};//restrictScores()
