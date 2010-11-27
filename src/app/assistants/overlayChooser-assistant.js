function OverlayChooserAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */

	//Define the model for the list items, based on what colors of overlay are available.
	this.colors = {items: [
		{value: "Blue"},
		{value: "Cyan"},
		{value: "Gray"},
		{value: "Green"},
		{value: "Magenta"},
		{value: "Orange"},
		{value: "Purple"},
		{value: "Red"},
		{value: "Yellow"}
	]};
}

OverlayChooserAssistant.prototype.setup = function () {
	/* this function is for setup tasks that have to happen when the scene is first created */
	
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	//Application menu
	this.controller.setupWidget(Mojo.Menu.appMenu, FIVEDICE.MenuAttributes, {visible: false});
	
	//Color list
	var listAttributes = {
		listTemplate: "overlayChooser/overlayListTemplate",
		itemTemplate: "overlayChooser/overlayListRow",
		reorderable: false,
		swipeToDelete: false
	};
	
	this.controller.setupWidget("overlayListWidget", listAttributes, this.colors);
	this.controller.setupWidget("overlayListItem", {autoFocus: false});
	
	/* add event handlers to listen to events from widgets */

	this.setColorHandler = this.setColor.bindAsEventListener(this);
	this.controller.listen("overlayListWidget", Mojo.Event.listTap, this.setColorHandler);
};//setup()

OverlayChooserAssistant.prototype.activate = function (event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};//activate()


OverlayChooserAssistant.prototype.deactivate = function (event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};//deactivate()

OverlayChooserAssistant.prototype.cleanup = function (event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */

	this.controller.stopListening("overlayListWidget", Mojo.Event.listTap, this.setColorHandler);
};//cleanup()

OverlayChooserAssistant.prototype.setColor = function (event) {
	FIVEDICE.heldColor = event.item.value;
	Mojo.Controller.stageController.popScene();
};//setColor()
