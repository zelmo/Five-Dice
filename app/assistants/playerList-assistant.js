function PlayerListAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	  
	  //Define a model for the Play button that starts disabled until a player is selected.
	  this.startButtonModel = {label: "Start Game", disabled: false};
};

PlayerListAssistant.prototype.setup = function () {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	//Add the "pixi" CSS class to certain elements if DeviceInfo.touchableRows is less than what's defined for Pre.
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		this.controller.get("playerListScrollerContent").addClassName("pixi");
	}

	/* setup widgets here */
	
	//Player list
	var listAttributes = {
		listTemplate: "playerList/playerListTemplate",
		itemTemplate: "playerList/playerListRow",
		fixedHeightItems: true,
		initialAverageRowHeight: 57,
		addItemLabel: "Add a player...",
		reorderable: true,
		swipeToDelete: true
	};
	this.controller.setupWidget("playerListWidget", listAttributes, FIVEDICE.storedPlayers)
	this.controller.setupWidget("playerListCheckBox", {modelProperty: "selected"});
	this.controller.setupWidget("playerListTextField", {modelProperty: "name", autoFocus: false});
	
	//Start button
	this.controller.setupWidget("startButton", {}, this.startButtonModel);
	
	/* add event handlers to listen to events from widgets */
	this.startButtonHandler = this.startGame.bindAsEventListener(this);
	this.controller.listen("startButton", Mojo.Event.tap, this.startButtonHandler);
};

PlayerListAssistant.prototype.activate = function (event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};


PlayerListAssistant.prototype.deactivate = function (event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	
	//TODO: Store the player names and selected states in a cookie.
};

PlayerListAssistant.prototype.cleanup = function (event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening("startButton", Mojo.Event.tap, this.startButtonHandler);
};

PlayerListAssistant.prototype.startGame = function () {
	//Re-initialize the global playerStateList and add the players who are selected.
	FIVEDICE.players = FIVEDICE.playerStateList();
	for (var i = 0; i < FIVEDICE.storedPlayers.items.length; i++) {
		if (FIVEDICE.storedPlayers.items[i].selected) { FIVEDICE.players.addPlayer(FIVEDICE.storedPlayers.items[i].name) };
	}
	
	//Swap to the main scene, passing in the first player.
	Mojo.Controller.stageController.swapScene("main", FIVEDICE.players.firstPlayer());
};
