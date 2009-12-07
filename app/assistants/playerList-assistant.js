function PlayerListAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	  
	  //Define a model for the Play button that starts disabled until a player is selected.
	  this.startButtonModel = {label: "Start Game", disabled: true};
};

PlayerListAssistant.prototype.setup = function () {
	/* this function is for setup tasks that have to happen when the scene is first created */
	
	this.playerList = this.controller.get("playerListWidget");
	
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	//Add the "pixi" CSS class to certain elements if DeviceInfo.touchableRows is less than what's defined for Pre.
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		this.controller.get("playerListGroup").addClassName("pixi");
		this.controller.get("playerListScrollerContent").addClassName("pixi");
	}
	
	/* setup widgets here */
	
	//Application menu
	var menuModel = {
		visible: true,
		items: [
			Mojo.Menu.editItem,
			{label: "Preferences", command: "do-preferences"},
			{label: "About #{appName}".interpolate({appName: Mojo.Controller.appInfo.title}), command: "do-about"},
			{label: "Help", command: "do-help"}
		]
	};
	this.controller.setupWidget(Mojo.Menu.appMenu, FIVEDICE.MenuAttributes, menuModel);
	
	//Player list
	var listAttributes = {
		listTemplate: "playerList/playerListTemplate",
		itemTemplate: "playerList/playerListRow",
		addItemLabel: "Add a player...",
		reorderable: true,
		swipeToDelete: true,
		autoconfirmDelete: true
	};
	this.controller.setupWidget("playerListWidget", listAttributes, FIVEDICE.storedPlayers)
	this.controller.setupWidget("playerListCheckBox", {modelProperty: "selected"});
	this.controller.setupWidget("playerListTextField", {modelProperty: "name", autoFocus: false});
	
	//Start button
	this.controller.setupWidget("startButton", {}, this.startButtonModel);
	
	/* add event handlers to listen to events from widgets */
	this.addPlayerHandler = this.addPlayer.bindAsEventListener(this);
	this.controller.listen("playerListWidget", Mojo.Event.listAdd, this.addPlayerHandler);
	this.deletePlayerHandler = this.deletePlayer.bindAsEventListener(this);
	this.controller.listen("playerListWidget", Mojo.Event.listDelete, this.deletePlayerHandler);
	this.reorderPlayersHandler = this.reorderPlayers.bindAsEventListener(this);
	this.controller.listen("playerListWidget", Mojo.Event.listReorder, this.reorderPlayersHandler);
	this.selectPlayerHandler = this.checkForSelectedPlayers.bindAsEventListener(this);
	this.controller.listen("playerListWidget", Mojo.Event.propertyChange, this.selectPlayerHandler);
	this.startButtonHandler = this.startGame.bindAsEventListener(this);
	this.controller.listen("startButton", Mojo.Event.tap, this.startButtonHandler);
};

PlayerListAssistant.prototype.activate = function (event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */

	//Enable the start button if players are selected.
	this.checkForSelectedPlayers();
};


PlayerListAssistant.prototype.deactivate = function (event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
	
	//Store the player names and selected states in a cookie.
	FIVEDICE.storedPlayersCookie.put(FIVEDICE.storedPlayers);
};

PlayerListAssistant.prototype.cleanup = function (event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening("playerListWidget", Mojo.Event.listAdd, this.addPlayerHandler);
	this.controller.stopListening("playerListWidget", Mojo.Event.listDelete, this.deletePlayerHandler);
	this.controller.stopListening("playerListWidget", Mojo.Event.listReorder, this.reorderPlayersHandler);
	this.controller.stopListening("playerListWidget", Mojo.Event.propertyChanged, this.selectPlayerHandler);
	this.controller.stopListening("startButton", Mojo.Event.tap, this.startButtonHandler);
};

PlayerListAssistant.prototype.handleCommand = function (event) {
	if (event.type != Mojo.Event.command) { return; }
	switch (event.command) {
		case "do-preferences":
			Mojo.Controller.stageController.pushScene("preferences");
			break;
		case "do-help":
			Mojo.Controller.stageController.pushScene("help");
			break;
		default:
			break;
	}
};

PlayerListAssistant.prototype.addPlayer = function (event) {
	//Add a generic new player to the end of the list.
	var newPlayerName = "Player " + (event.model.items.length + 1);
	event.model.items.push({name: newPlayerName, selected: false});
	this.controller.modelChanged(event.model);
	//Set focus on the player name.
	this.playerList.mojo.focusItem(event.model.items[event.model.items.length - 1], "name");
};

PlayerListAssistant.prototype.deletePlayer = function (event) {
	event.model.items.splice(event.index, 1);
};

PlayerListAssistant.prototype.reorderPlayers = function (event) {
	event.model.items.splice(event.fromIndex, 1);
	event.model.items.splice(event.toIndex, 0, event.item);
};

PlayerListAssistant.prototype.checkForSelectedPlayers = function () {
	//See if any players have been selected to play.
	var selectedPlayersExist = false;
	for (var i = 0; i < FIVEDICE.storedPlayers.items.length; i++) {
		if (FIVEDICE.storedPlayers.items[i].selected) {
			selectedPlayersExist = true;
			break;
		}
	}
	//Enable or disable the start button depending on whether a player is selected.
	this.startButtonModel.disabled = !selectedPlayersExist;
	this.controller.modelChanged(this.startButtonModel); 
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
