function PreferencesAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	  
	//Define models for the scene elements.
	this.widgetModels = {
		shakeCheckBox: {
			value: FIVEDICE.shakeToRoll,
			disabled: false
		},
		freezeDiceCheckBox: {
			value: FIVEDICE.freezeDiceAfterRoll,
			disabled: false
		},
		disableRollCheckBox: {
			value: FIVEDICE.disableRollButtonBetweenRolls,
			disabled: false
		},
		rollSpeedSlider: {
			value: FIVEDICE.rollSpeed
		},
		subtotalDeviationCheckBox: {
			value: FIVEDICE.showSubtotalDeviation,
			disabled: false
		}
	};
	
	//Define dialog models.
	this.dialogModels = {
		shakeInfo: {
			onChoose: function (value) {},
			title: "Shake to roll",
			message: "If checked, the game will listen for the phone's accelerometer" +
				" and roll the dice when the phone is shaken.",
			choices: [{label: "OK", value: "ok"}]
		},
		freezeDiceInfo: {
			onChoose: function (value) {},
			title: "Freeze dice after rolling",
			message: "If checked, all dice will be frozen (held) after each roll." +
				" Tap on the dice you want to re-roll, and they will be unfrozen.",
			choices: [{label: "OK", value: "ok"}]
		},
		rollSpeedInfo: {
			onChoose: function (value) {},
			title: "Roll speed",
			message: "Choose how fast the dice will roll." +
				" The lowest speed takes 1/2 second per die," +
				" while the highest speed rolls all of them instantly.",
			choices: [{label: "OK", value: "ok"}]
		},
		showDeviationInfo: {
			onChoose: function (value) {},
			title: "Show deviation in subtotal",
			message: "If checked, the Subtotal score will be immediately followed by a number" +
				" showing how far ahead of or behind the curve your subtotal is, given the items" +
				" you've scored up to that point.",
			choices: [{label: "OK", value: "ok"}]
		}
	} ;
}

PreferencesAssistant.prototype.setup = function () {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	//Application menu
	var menuModel = {
		visible: true,
		items: [
			{label: "About #{appName}".interpolate({appName: Mojo.Controller.appInfo.title}), command: "do-about"},
			{label: "Help", command: "do-help"}
		]
	};
	this.controller.setupWidget(Mojo.Menu.appMenu, FIVEDICE.MenuAttributes, menuModel);
	
	//Preferences widgets
	var rollSpeedSliderAttributes = {
		minValue: 0,
		maxValue: 10,
		round: true,
		updateInterval: 0
	};
	this.controller.setupWidget("shakeCheckBox", {}, this.widgetModels.shakeCheckBox);
	this.controller.setupWidget("freezeDiceCheckBox", {}, this.widgetModels.freezeDiceCheckBox);
	this.controller.setupWidget("disableRollCheckBox", {}, this.widgetModels.disableRollCheckBox);
	this.controller.setupWidget("rollSpeedSlider", rollSpeedSliderAttributes, this.widgetModels.rollSpeedSlider);
	this.controller.setupWidget("subtotalDeviationCheckBox", {}, this.widgetModels.subtotalDeviationCheckBox);
	
	/* add event handlers to listen to events from widgets */
	this.rollSpeedSliderHandler = function () {FIVEDICE.rollSpeed = this.widgetModels.rollSpeedSlider.value;}.bindAsEventListener(this);
	this.controller.listen("rollSpeedSlider", Mojo.Event.propertyChange, this.rollSpeedSliderHandler);
	this.shakeCheckBoxHandler = function () {FIVEDICE.shakeToRoll = this.widgetModels.shakeCheckBox.value;}.bindAsEventListener(this);
	this.controller.listen("shakeCheckBox", Mojo.Event.propertyChange, this.shakeCheckBoxHandler);
	this.freezeDiceCheckBoxHandler = function () {FIVEDICE.freezeDiceAfterRoll = this.widgetModels.freezeDiceCheckBox.value;}.bindAsEventListener(this);
	this.controller.listen("freezeDiceCheckBox", Mojo.Event.propertyChange, this.freezeDiceCheckBoxHandler);
	this.subtotalDeviationCheckBoxHandler = function () {FIVEDICE.showSubtotalDeviation = this.widgetModels.subtotalDeviationCheckBox.value;}.bindAsEventListener(this);
	this.controller.listen("subtotalDeviationCheckBox", Mojo.Event.propertyChange, this.subtotalDeviationCheckBoxHandler);
	this.rollSpeedInfoHandler = function () {this.controller.showAlertDialog(this.dialogModels.rollSpeedInfo);}.bindAsEventListener(this);
	this.controller.listen("rollSpeedInfo", Mojo.Event.tap, this.rollSpeedInfoHandler);
	this.shakeInfoHandler = function () {this.controller.showAlertDialog(this.dialogModels.shakeInfo);}.bindAsEventListener(this);
	this.controller.listen("shakeInfo", Mojo.Event.tap, this.shakeInfoHandler);
	this.freezeDiceInfoHandler = function () {this.controller.showAlertDialog(this.dialogModels.freezeDiceInfo);}.bindAsEventListener(this);
	this.controller.listen("freezeDiceInfo", Mojo.Event.tap, this.freezeDiceInfoHandler);
	this.deviationInfoHandler = function () {this.controller.showAlertDialog(this.dialogModels.showDeviationInfo);}.bindAsEventListener(this);
	this.controller.listen("subtotalDeviationInfo", Mojo.Event.tap, this.deviationInfoHandler);
	this.backgroundColorHandler = function () {Mojo.Controller.stageController.pushScene("colorChooser", "defaultBackgroundColor");}
	this.controller.listen("backgroundColorChooser", Mojo.Event.tap, this.backgroundColorHandler);
	this.suggestedScoreColorHandler = function () {Mojo.Controller.stageController.pushScene("colorChooser", "suggestedScoreColor");}
	this.controller.listen("suggestedScoresColorChooser", Mojo.Event.tap, this.suggestedScoreColorHandler);
	this.actualScoreColorHandler = function () {Mojo.Controller.stageController.pushScene("colorChooser", "setScoreColor");}
	this.controller.listen("actualScoresColorChooser", Mojo.Event.tap, this.actualScoreColorHandler);
	this.totalsColorHandler = function () {Mojo.Controller.stageController.pushScene("colorChooser", "totalsColor");}
	this.controller.listen("totalsColorChooser", Mojo.Event.tap, this.totalsColorHandler);
};//setup()

PreferencesAssistant.prototype.activate = function (event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	   
	   //Set the background colors of the color choosers to reflect the current colors.
	   this.controller.get("backgroundColorChooser").style.backgroundColor = FIVEDICE.defaultBackgroundColor;
	   this.controller.get("suggestedScoresColorChooser").style.backgroundColor = FIVEDICE.suggestedScoreColor;
	   this.controller.get("actualScoresColorChooser").style.backgroundColor = FIVEDICE.setScoreColor;
	   this.controller.get("totalsColorChooser").style.backgroundColor = FIVEDICE.totalsColor;
};//activate()


PreferencesAssistant.prototype.deactivate = function (event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	FIVEDICE.writePreferencesCookie();
};//deactivate()

PreferencesAssistant.prototype.cleanup = function (event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening("rollSpeedSlider", Mojo.Event.propertyChange, this.rollSpeedSliderHandler);
	this.controller.stopListening("shakeCheckBox", Mojo.Event.propertyChange, this.shakeCheckBoxHandler);
	this.controller.stopListening("freezeDiceCheckBox", Mojo.Event.propertyChange, this.freezeDiceCheckBoxHandler);
	this.controller.stopListening("subtotalDeviationCheckBox", Mojo.Event.propertyChange, this.subtotalDeviationCheckBoxHandler);
	this.controller.stopListening("shakeInfo", Mojo.Event.tap, this.shakeInfoHandler);
	this.controller.stopListening("freezeDiceInfo", Mojo.Event.tap, this.freezeDiceInfoHandler);
	this.controller.stopListening("disableRollInfo", Mojo.Event.tap, this.disableRollInfoHandler);
	this.controller.stopListening("subtotalDeviationInfo", Mojo.Event.tap, this.deviationInfoHandler);
	this.controller.stopListening("backgroundColorChooser", Mojo.Event.tap, this.backgroundColorHandler);
	this.controller.stopListening("suggestedScoresColorChooser", Mojo.Event.tap, this.suggestedScoreColorHandler);
	this.controller.stopListening("actualScoresColorChooser", Mojo.Event.tap, this.actualScoreColorHandler);
	this.controller.stopListening("totalsColorChooser", Mojo.Event.tap, this.totalsColorHandler);
};//cleanup()

PreferencesAssistant.prototype.handleCommand = function (event) {
	if (event.type != Mojo.Event.command) { return; }
	switch (event.command) {
	case "do-help":
		Mojo.Controller.stageController.swapScene("help");
		break;
	default:
		break;
	}
};//handleCommand()
