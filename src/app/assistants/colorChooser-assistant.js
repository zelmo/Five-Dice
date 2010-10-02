function ColorChooserAssistant(colorToSet) {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */

	//Store the parameter so we can set the appropriate color property when a color is tapped.
	this.colorToSet = colorToSet;
	
	//Define all common Web colors in a model that can be used for a widget.
	this.colors = {items: [
		{label: "Alice Blue", value: "AliceBlue"},
		{label: "Antique White", value: "AntiqueWhite"},
		{label: "Aqua", value: "Aqua"},
		{label: "Aquamarine", value: "Aquamarine"},
		{label: "Azure", value: "Azure"},
		{label: "Beige", value: "Beige"},
		{label: "Bisque", value: "Bisque"},
		{label: "Black", value: "Black"},
		{label: "Blanched Almond", value: "BlanchedAlmond"},
		{label: "Blue", value: "Blue"},
		{label: "Blue Violet", value: "BlueViolet"},
		{label: "Brown", value: "Brown"},
		{label: "Burly-Wood", value: "BurlyWood"},
		{label: "Cadet Blue", value: "CadetBlue"},
		{label: "Chartreuse", value: "Chartreuse"},
		{label: "Chocolate", value: "Chocolate"},
		{label: "Coral", value: "Coral"},
		{label: "Cornflower Blue", value: "CornflowerBlue"},
		{label: "Cornsilk", value: "Cornsilk"},
		{label: "Crimson", value: "Crimson"},
		{label: "Cyan", value: "Cyan"},
		{label: "Dark Blue", value: "DarkBlue"},
		{label: "Dark Cyan", value: "DarkCyan"},
		{label: "Dark Golden-Rod", value: "DarkGoldenrod"},
		{label: "Dark Gray", value: "DarkGray"},
		{label: "Dark Green", value: "DarkGreen"},
		{label: "Dark Khaki", value: "DarkKhaki"},
		{label: "Dark Magenta", value: "DarkMagenta"},
		{label: "Dark Olive Green", value: "DarkOliveGreen"},
		{label: "Dark Orange", value: "DarkOrange"},
		{label: "Dark Orchid", value: "DarkOrchid"},
		{label: "Dark Red", value: "DarkRed"},
		{label: "Dark Salmon", value: "DarkSalmon"},
		{label: "Dark Sea Green", value: "DarkSeaGreen"},
		{label: "Dark Slate Blue", value: "DarkSlateBlue"},
		{label: "Dark Slate Gray", value: "DarkSlateGray"},
		{label: "Dark Turquoise", value: "DarkTurquoise"},
		{label: "Dark Violet", value: "DarkViolet"},
		{label: "Deep Pink", value: "DeepPink"},
		{label: "Deep Sky Blue", value: "DeepSkyBlue"},
		{label: "Dim Gray", value: "DimGray"},
		{label: "Dodger Blue", value: "DodgerBlue"},
		{label: "Fire-Brick", value: "FireBrick"},
		{label: "Floral White", value: "FloralWhite"},
		{label: "Forest Green", value: "ForestGreen"},
		{label: "Fuschia", value: "Fuschia"},
		{label: "Gainsboro", value: "Gainsboro"},
		{label: "Ghost White", value: "GhostWhite"},
		{label: "Gold", value: "Gold"},
		{label: "Golden-Rod", value: "GoldenRod"},
		{label: "Gray", value: "Gray"},
		{label: "Green", value: "Green"},
		{label: "Green-Yellow", value: "GreenYellow"},
		{label: "Honey Dew", value: "HoneyDew"},
		{label: "Hot Pink", value: "HotPink"},
		{label: "Indian Red", value: "IndianRed"},
		{label: "Indigo", value: "Indigo"},
		{label: "Ivory", value: "Ivory"},
		{label: "Khaki", value: "Khaki"},
		{label: "Lavender", value: "Lavender"},
		{label: "Lavender Blush", value: "LavenderBlush"},
		{label: "Lawn Green", value: "LawnGreen"},
		{label: "Lemon Chiffon", value: "LemonChiffon"},
		{label: "Light Blue", value: "LightBlue"},
		{label: "Light Coral", value: "LightCoral"},
		{label: "Light Cyan", value: "LightCyan"},
		{label: "Light Golden-Rod Yellow", value: "LightGoldenRodYellow"},
		{label: "Light Grey", value: "LightGrey"},
		{label: "Light Green", value: "LightGreen"},
		{label: "Light Pink", value: "LightPink"},
		{label: "Light Salmon", value: "LightSalmon"},
		{label: "Light Sea Green", value: "LightSeaGreen"},
		{label: "Light Sky Blue", value: "LightSkyBlue"},
		{label: "Light Slate Gray", value: "LightSlateGray"},
		{label: "Light Steel Blue", value: "LightSteelBlue"},
		{label: "Light Yellow", value: "LightYellow"},
		{label: "Lime", value: "Lime"},
		{label: "Lime Green", value: "LimeGreen"},
		{label: "Linen", value: "Linen"},
		{label: "Magenta", value: "Magenta"},
		{label: "Maroon", value: "Maroon"},
		{label: "Medium Aqua-Marine", value: "MediumAquaMarine"},
		{label: "Medium Blue", value: "MediumBlue"},
		{label: "Medium Orchid", value: "MediumOrchid"},
		{label: "Medium Purple", value: "MediumPurple"},
		{label: "Medium Sea Green", value: "MediumSeaGreen"},
		{label: "Medium Slate Blue", value: "MediumSlateBlue"},
		{label: "Medium Spring Green", value: "MediumSpringGreen"},
		{label: "Medium Turquoise", value: "MediumTurquoise"},
		{label: "Medium Voilet Red", value: "MediumVoiletRed"},
		{label: "Midnight Blue", value: "MidnightBlue"},
		{label: "Mint Cream", value: "MintCream"},
		{label: "Misty Rose", value: "MistyRose"},
		{label: "Moccasin", value: "Moccasin"},
		{label: "Navajo White", value: "NavajoWhite"},
		{label: "Navy", value: "Navy"},
		{label: "Old Lace", value: "OldLace"},
		{label: "Olive", value: "Olive"},
		{label: "Olive Drab", value: "OliveDrab"},
		{label: "Orange", value: "Orange"},
		{label: "Orange Red", value: "OrangeRed"},
		{label: "Orchid", value: "Orchid"},
		{label: "Pale Golden-Rod", value: "PaleGoldenRod"},
		{label: "Pale Green", value: "PaleGreen"},
		{label: "Pale Turquoise", value: "PaleTurquoise"},
		{label: "Pale Violet Red", value: "PaleVioletRed"},
		{label: "Papaya Whip", value: "PapayaWhip"},
		{label: "Peach Puff", value: "PeachPuff"},
		{label: "Peru", value: "Peru"},
		{label: "Pink", value: "Pink"},
		{label: "Plum", value: "Plum"},
		{label: "Powder Blue", value: "PowderBlue"},
		{label: "Purple", value: "Purple"},
		{label: "Red", value: "Red"},
		{label: "Rosy Brown", value: "RosyBrown"},
		{label: "Royal Blue", value: "RoyalBlue"},
		{label: "Saddle Brown", value: "SaddleBrown"},
		{label: "Salmon", value: "Salmon"},
		{label: "Sandy Brown", value: "SandyBrown"},
		{label: "Sea Green", value: "SeaGreen"},
		{label: "Sea Shell", value: "SeaShell"},
		{label: "Sienna", value: "Sienna"},
		{label: "Silver", value: "Silver"},
		{label: "Sky Blue", value: "SkyBlue"},
		{label: "Slate Blue", value: "SlateBlue"},
		{label: "Slate Gray", value: "SlateGray"},
		{label: "Snow", value: "Snow"},
		{label: "Spring Green", value: "SpringGreen"},
		{label: "Steel Blue", value: "SteelBlue"},
		{label: "Tan", value: "Tan"},
		{label: "Teal", value: "Teal"},
		{label: "Thistle", value: "Thistle"},
		{label: "Tomato", value: "Tomato"},
		{label: "Turquoise", value: "Turquoise"},
		{label: "Violet", value: "Violet"},
		{label: "Wheat", value: "Wheat"},
		{label: "White", value: "White"},
		{label: "White Smoke", value: "WhiteSmoke"},
		{label: "Yellow", value: "Yellow"},
		{label: "Yellow-Green", value: "YellowGreen"}
	]};
	
	//Get the model of the currently selected color so we can have the widget automatically focus it.
	for (var i = 0; i < this.colors.items.length; i++) {
		if (this.colors.items[i].value == FIVEDICE[this.colorToSet]) {
			this.originalColorIndex = i;
			break;
		}
	}
}

ColorChooserAssistant.prototype.setup = function () {
	/* this function is for setup tasks that have to happen when the scene is first created */
	
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	//Application menu
	this.controller.setupWidget(Mojo.Menu.appMenu, FIVEDICE.MenuAttributes, {visible: false});
	
	//Color list
	var listAttributes = {
		listTemplate: "colorChooser/colorListTemplate",
		itemTemplate: "colorChooser/colorListRow",
		reorderable: false,
		swipeToDelete: false
	};
	
	this.controller.setupWidget("colorListWidget", listAttributes, this.colors);
	this.controller.setupWidget("colorListItem", {modelProperty: "label", autoFocus: false});
	
	/* add event handlers to listen to events from widgets */

	this.setColorHandler = this.setColor.bindAsEventListener(this);
	this.controller.listen("colorListWidget", Mojo.Event.listTap, this.setColorHandler);
};//setup()

ColorChooserAssistant.prototype.activate = function (event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	
	//Bring the original color into focus.
	this.controller.get("colorListWidget").mojo.revealItem(this.originalColorIndex);
};//activate()


ColorChooserAssistant.prototype.deactivate = function (event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};//deactivate()

ColorChooserAssistant.prototype.cleanup = function (event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */

	this.controller.stopListening("colorListWidget", Mojo.Event.listTap, this.setColorHandler);
};//cleanup()

ColorChooserAssistant.prototype.setColor = function (event) {
	FIVEDICE[this.colorToSet] = event.item.value;
	Mojo.Controller.stageController.popScene();
};//setColor()
