function PreferencesAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	  
	//Define models for the scene elements.
	this.widgetModels = {
		shakeCheckBox: {
		value: FiveDice.shakeToRoll,
		disabled: false
		},
		disableRollCheckBox: {
			value: FiveDice.disableRollButtonBetweenRolls,
			disabled: false
		},
		rollDelaySlider: {
			value: FiveDice.rollButtonDisabledTimeout / 250
		},
		subtotalDeviationCheckBox: {
			value: FiveDice.showSubtotalDeviation,
			disabled: false
		}
	};
	
	//Define dialog models.
	this.dialogModels = {
		shakeInfo: {
			onChoose: function(value) {},
			title: "Shake to roll",
			message: "If checked, the game will listen for the phone's accelerometer" +
				" and roll the dice when the phone is shaken.",
			choices: [{label: "OK", value: "ok"}]
		},
		disableRollInfo: {
			onChoose: function(value) {},
			title: "Disable roll button",
			message: "If checked, the Roll button will remain disabled for a short duration" +
				" after each roll. The duration can be adjusted in increments of 1/4 second," +
				" up to two seconds, using the slider below the check box.",
			choices: [{label: "OK", value: "ok"}]
		},
		showDeviationInfo: {
			onChoose: function(value) {},
			title: "Show deviation in subtotal",
			message: "If checked, the Subtotal score will be immediately followed by a number" +
				" showing how far ahead of or behind the curve your subtotal is, given the items" +
				" you've scored up to that point.",
			choices: [{label: "OK", value: "ok"}]
		}
	} ;
};

PreferencesAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	//Application menu
	var menuModel = {
		visible: true,
		items: [
			{label: "Help", command: "do-help"},
			{label: "About #{appName}".interpolate({appName: FiveDice.title}), command: "do-about"}
		]
	};
	this.controller.setupWidget(Mojo.Menu.appMenu, FiveDice.MenuAttributes, menuModel);
	
	//Preferences widgets
	var rollDelaySliderAttributes = {
		minValue: 1,
		maxValue: 8,
		round: true,
		updateInterval: 0
	};
	this.controller.setupWidget("shakeCheckBox", {}, this.widgetModels.shakeCheckBox);
	this.controller.setupWidget("disableRollCheckBox", {}, this.widgetModels.disableRollCheckBox);
	this.controller.setupWidget("rollDelaySlider", rollDelaySliderAttributes, this.widgetModels.rollDelaySlider);
	this.controller.setupWidget("subtotalDeviationCheckBox", {}, this.widgetModels.subtotalDeviationCheckBox);
	
	/* add event handlers to listen to events from widgets */
	this.shakeCheckBoxHandler = this.setShake.bindAsEventListener(this);
	this.controller.listen("shakeCheckBox", Mojo.Event.propertyChange, this.shakeCheckBoxHandler);
	this.disableRollCheckBoxHandler = this.setDisableRollButton.bindAsEventListener(this);
	this.controller.listen("disableRollCheckBox", Mojo.Event.propertyChange, this.disableRollCheckBoxHandler);
	this.rollDelaySliderHandler = this.setRollDelay.bindAsEventListener(this);
	this.controller.listen("rollDelaySlider", Mojo.Event.propertyChange, this.rollDelaySliderHandler);
	this.subtotalDeviationCheckBoxHandler = this.setSubtotalDeviation.bindAsEventListener(this);
	this.controller.listen("subtotalDeviationCheckBox", Mojo.Event.propertyChange, this.subtotalDeviationCheckBoxHandler);
	this.shakeInfoHandler = this.showShakeInfo.bindAsEventListener(this);
	this.controller.listen("shakeInfo", Mojo.Event.tap, this.shakeInfoHandler);
	this.disableRollInfoHandler = this.showDisableRollInfo.bindAsEventListener(this);
	this.controller.listen("disableRollInfo", Mojo.Event.tap, this.disableRollInfoHandler);
	this.deviationInfoHandler = this.showDeviationInfo.bindAsEventListener(this);
	this.controller.listen("subtotalDeviationInfo", Mojo.Event.tap, this.deviationInfoHandler);
};

PreferencesAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};


PreferencesAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	  
	//Save the preferences to the cookie.
	FiveDice.cookie.put({
		shakeToRoll: FiveDice.shakeToRoll,
		disableRollButtonBetweenRolls: FiveDice.disableRollButtonBetweenRolls,
		rollButtonDisabledTimeout: FiveDice.rollButtonDisabledTimeout,
		showSubtotalDeviation: FiveDice.showSubtotalDeviation
	});
};

PreferencesAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening("shakeCheckBox", Mojo.Event.propertyChange, this.shakeCheckBoxHandler);
	this.controller.stopListening("disableRollCheckBox", Mojo.Event.propertyChange, this.disableRollCheckBoxHandler);
	this.controller.stopListening("rollDelaySlider", Mojo.Event.propertyChange, this.rollDelaySliderHandler);
	this.controller.stopListening("subtotalDeviationCheckBox", Mojo.Event.propertyChange, this.subtotalDeviationCheckBoxHandler);
	this.controller.stopListening("shakeInfo", Mojo.Event.tap, this.shakeInfoHandler);
	this.controller.stopListening("disableRollInfo", Mojo.Event.tap, this.disableRollInfoHandler);
	this.controller.stopListening("subtotalDeviationInfo", Mojo.Event.tap, this.deviationInfoHandler);
};

PreferencesAssistant.prototype.handleCommand = function(event) {
	if (event.type != Mojo.Event.command) { return; }
	switch (event.command) {
		case "do-help":
			Mojo.Controller.stageController.swapScene("help");
			break;
		default:
			break;
	}
};

PreferencesAssistant.prototype.setShake = function() {
	FiveDice.shakeToRoll = this.widgetModels.shakeCheckBox.value;
};

PreferencesAssistant.prototype.setDisableRollButton = function() {
	FiveDice.disableRollButtonBetweenRolls = this.widgetModels.disableRollCheckBox.value;
};

PreferencesAssistant.prototype.setRollDelay = function() {
	FiveDice.rollButtonDisabledTimeout = this.widgetModels.rollDelaySlider.value * 250;
};

PreferencesAssistant.prototype.setSubtotalDeviation = function() {
	FiveDice.showSubtotalDeviation = this.widgetModels.subtotalDeviationCheckBox.value;
};

PreferencesAssistant.prototype.showShakeInfo = function() {
	this.controller.showAlertDialog(this.dialogModels.shakeInfo);
};

PreferencesAssistant.prototype.showDisableRollInfo = function() {
	this.controller.showAlertDialog(this.dialogModels.disableRollInfo);
};

PreferencesAssistant.prototype.showDeviationInfo = function() {
	this.controller.showAlertDialog(this.dialogModels.showDeviationInfo);
};
