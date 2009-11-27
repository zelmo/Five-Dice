function HelpAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	  
	  //Assign a local helpContents object.
	  this.helpContents = FIVEDICE.helpContents();
	  //An object-level page index allows the "previous/next" command menu to work.
	  this.pageIndex = 0;
};

HelpAssistant.prototype.setup = function () {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	var menuModel = {
		visible: true,
		items: [
			{label: "Preferences", command: "do-preferences"},
			{label: "About #{appName}".interpolate({appName: Mojo.Controller.appInfo.title}), command: "do-about"}
		]
	};
	
	//Application menu
	this.controller.setupWidget(Mojo.Menu.appMenu, FIVEDICE.MenuAttributes, menuModel);
	
	//Command menu
	this.commandMenuModel = {
		items: [
			{items: [{icon: "back", command: "do-previousPage"}]},
			{},
			{items: [{icon: "forward", command: "do-nextPage"}]}
		]
	};
	this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.commandMenuModel);
	
	//Show initial contents
	this.updateContents();
	
	/* add event handlers to listen to events from widgets */
};

HelpAssistant.prototype.activate = function (event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};


HelpAssistant.prototype.deactivate = function (event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

HelpAssistant.prototype.cleanup = function (event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	  this.removeListeners();
};

HelpAssistant.prototype.handleCommand = function (event) {
	if (event.type != Mojo.Event.command) { return; }
	switch (event.command) {
		case "do-preferences":
			Mojo.Controller.stageController.swapScene("preferences");
			break;
		case "do-nextPage":
			this.showNextPage();
			break;
		case "do-previousPage":
			this.showPreviousPage();
			break;
	}
};

HelpAssistant.prototype.showNextPage = function () {
	if (this.pageIndex < (this.helpContents.pages.length - 1)) {
		this.removeListeners();
		this.pageIndex++;
		this.updateContents();
	}
};

HelpAssistant.prototype.showPreviousPage = function () {
	if (this.pageIndex > 0) {
		this.removeListeners();
		this.pageIndex--;
		this.updateContents();
	}
};

HelpAssistant.prototype.updateContents = function () {
	//Scroll to the top of the page.
	this.controller.getSceneScroller().mojo.revealTop(0);
	//Set the icon, title, and body text, and set up any listeners needed.
	this.controller.get("headerIcon").style.background = "url(images/" + this.helpContents.pages[this.pageIndex].headerIcon + ") no-repeat";
	this.controller.get("headerTitle").innerHTML = this.helpContents.pages[this.pageIndex].headerTitle;
	this.controller.get("bodyHtml").innerHTML = this.helpContents.pages[this.pageIndex].bodyHtml;
	this.setupListeners();
	//Show the appropriate command menu buttons.
	switch (this.pageIndex) {
		case 0:
			//First page--don't show the back arrow.
			this.commandMenuModel.items[0] = {};
			break;
		case (this.helpContents.pages.length - 1):
			//Last page--don't show the forward arrow.
			this.commandMenuModel.items[2] = {};
			break;
		default:
			//Show back and forward arrows if they're not already shown.
			if (!this.commandMenuModel.items[0].hasOwnProperty("items")) {
				this.commandMenuModel.items[0] = {items: [{icon: "back", command: "do-previousPage"}]};
			}
			if (!this.commandMenuModel.items[2].hasOwnProperty("items")) {
				this.commandMenuModel.items[2] = {items: [{icon: "forward", command: "do-nextPage"}]};
			}
			break;
	}
	this.controller.modelChanged(this.commandMenuModel);
};

HelpAssistant.prototype.setupListeners = function () {
	//Set up any listeners needed by the new body text.
	switch (this.pageIndex) {
		case 0:
			this.wikipediaHandler = this.showWikipedia.bindAsEventListener(this);
			this.controller.listen("wikipediaLink", Mojo.Event.tap, this.wikipediaHandler);
			break;
	} 
};

HelpAssistant.prototype.removeListeners = function () {
	//Remove any listeners from the body text that's about to go away.
	switch (this.pageIndex) {
		case 0:
			this.controller.stopListening("wikipediaLink", Mojo.Event.tap, this.wikipediaHandler);
			break;
	}
};

HelpAssistant.prototype.showWikipedia = function () {
	//Define the parameters for the service request object.
	var serviceParameters = {
		id: "com.palm.app.browser",
		params: {target: "http://en.m.wikipedia.org/wiki/Special:Search?search=yahtzee"}
	};
	//Define the service request object, using the above parameters.
	var serviceObject = {
		method: "open",
		parameters: serviceParameters
	};
	//Call the service request.
	this.controller.serviceRequest("palm://com.palm.applicationManager", serviceObject);
};
