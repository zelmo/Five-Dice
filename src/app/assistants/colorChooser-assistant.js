function ColorChooserAssistant(colorToSet) {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */

	//Store the parameter so we can set the appropriate color property when a color is tapped.
	this.colorToSet = colorToSet;
	
	//Define all common Web colors in a model that can be used for a widget.
	this.colors = {items: [
		{label: "Alice Blue", value: "AliceBlue", contrast: FIVEDICE.getContrastingColor("AliceBlue")},
		{label: "Antique White", value: "AntiqueWhite", contrast: FIVEDICE.getContrastingColor("AntiqueWhite")},
		{label: "Aqua", value: "Aqua", contrast: FIVEDICE.getContrastingColor("Aqua")},
		{label: "Aquamarine", value: "Aquamarine", contrast: FIVEDICE.getContrastingColor("Aquamarine")},
		{label: "Azure", value: "Azure", contrast: FIVEDICE.getContrastingColor("Azure")},
		{label: "Beige", value: "Beige", contrast: FIVEDICE.getContrastingColor("Beige")},
		{label: "Bisque", value: "Bisque", contrast: FIVEDICE.getContrastingColor("Bisque")},
		{label: "Black", value: "Black", contrast: FIVEDICE.getContrastingColor("Black")},
		{label: "Blanched Almond", value: "BlanchedAlmond", contrast: FIVEDICE.getContrastingColor("BlanchedAlmond")},
		{label: "Blue", value: "Blue", contrast: FIVEDICE.getContrastingColor("Blue")},
		{label: "Blue Violet", value: "BlueViolet", contrast: FIVEDICE.getContrastingColor("BlueViolet")},
		{label: "Brown", value: "Brown", contrast: FIVEDICE.getContrastingColor("Brown")},
		{label: "Burly-Wood", value: "BurlyWood", contrast: FIVEDICE.getContrastingColor("BurlyWood")},
		{label: "Cadet Blue", value: "CadetBlue", contrast: FIVEDICE.getContrastingColor("CadetBlue")},
		{label: "Chartreuse", value: "Chartreuse", contrast: FIVEDICE.getContrastingColor("Chartreuse")},
		{label: "Chocolate", value: "Chocolate", contrast: FIVEDICE.getContrastingColor("Chocolate")},
		{label: "Coral", value: "Coral", contrast: FIVEDICE.getContrastingColor("Coral")},
		{label: "Cornflower Blue", value: "CornflowerBlue", contrast: FIVEDICE.getContrastingColor("CornflowerBlue")},
		{label: "Cornsilk", value: "Cornsilk", contrast: FIVEDICE.getContrastingColor("Cornsilk")},
		{label: "Crimson", value: "Crimson", contrast: FIVEDICE.getContrastingColor("Crimson")},
		{label: "Cyan", value: "Cyan", contrast: FIVEDICE.getContrastingColor("Cyan")},
		{label: "Dark Blue", value: "DarkBlue", contrast: FIVEDICE.getContrastingColor("DarkBlue")},
		{label: "Dark Cyan", value: "DarkCyan", contrast: FIVEDICE.getContrastingColor("DarkCyan")},
		{label: "Dark Golden-Rod", value: "DarkGoldenrod", contrast: FIVEDICE.getContrastingColor("DarkGoldenrod")},
		{label: "Dark Gray", value: "DarkGray", contrast: FIVEDICE.getContrastingColor("DarkGray")},
		{label: "Dark Green", value: "DarkGreen", contrast: FIVEDICE.getContrastingColor("DarkGreen")},
		{label: "Dark Khaki", value: "DarkKhaki", contrast: FIVEDICE.getContrastingColor("DarkKhaki")},
		{label: "Dark Magenta", value: "DarkMagenta", contrast: FIVEDICE.getContrastingColor("DarkMagenta")},
		{label: "Dark Olive Green", value: "DarkOliveGreen", contrast: FIVEDICE.getContrastingColor("DarkOliveGreen")},
		{label: "Dark Orange", value: "DarkOrange", contrast: FIVEDICE.getContrastingColor("DarkOrange")},
		{label: "Dark Orchid", value: "DarkOrchid", contrast: FIVEDICE.getContrastingColor("DarkOrchid")},
		{label: "Dark Red", value: "DarkRed", contrast: FIVEDICE.getContrastingColor("DarkRed")},
		{label: "Dark Salmon", value: "DarkSalmon", contrast: FIVEDICE.getContrastingColor("DarkSalmon")},
		{label: "Dark Sea Green", value: "DarkSeaGreen", contrast: FIVEDICE.getContrastingColor("DarkSeaGreen")},
		{label: "Dark Slate Blue", value: "DarkSlateBlue", contrast: FIVEDICE.getContrastingColor("DarkSlateBlue")},
		{label: "Dark Slate Gray", value: "DarkSlateGray", contrast: FIVEDICE.getContrastingColor("DarkSlateGray")},
		{label: "Dark Turquoise", value: "DarkTurquoise", contrast: FIVEDICE.getContrastingColor("DarkTurquoise")},
		{label: "Dark Violet", value: "DarkViolet", contrast: FIVEDICE.getContrastingColor("DarkViolet")},
		{label: "Deep Pink", value: "DeepPink", contrast: FIVEDICE.getContrastingColor("DeepPink")},
		{label: "Deep Sky Blue", value: "DeepSkyBlue", contrast: FIVEDICE.getContrastingColor("DeepSkyBlue")},
		{label: "Dim Gray", value: "DimGray", contrast: FIVEDICE.getContrastingColor("DimGray")},
		{label: "Dodger Blue", value: "DodgerBlue", contrast: FIVEDICE.getContrastingColor("DodgerBlue")},
		{label: "Fire-Brick", value: "FireBrick", contrast: FIVEDICE.getContrastingColor("FireBrick")},
		{label: "Floral White", value: "FloralWhite", contrast: FIVEDICE.getContrastingColor("FloralWhite")},
		{label: "Forest Green", value: "ForestGreen", contrast: FIVEDICE.getContrastingColor("ForestGreen")},
		{label: "Fuschia", value: "Fuschia", contrast: FIVEDICE.getContrastingColor("Fuschia")},
		{label: "Gainsboro", value: "Gainsboro", contrast: FIVEDICE.getContrastingColor("Gainsboro")},
		{label: "Ghost White", value: "GhostWhite", contrast: FIVEDICE.getContrastingColor("GhostWhite")},
		{label: "Gold", value: "Gold", contrast: FIVEDICE.getContrastingColor("Gold")},
		{label: "Golden-Rod", value: "GoldenRod", contrast: FIVEDICE.getContrastingColor("GoldenRod")},
		{label: "Gray", value: "Gray", contrast: FIVEDICE.getContrastingColor("Gray")},
		{label: "Green", value: "Green", contrast: FIVEDICE.getContrastingColor("Green")},
		{label: "Green-Yellow", value: "GreenYellow", contrast: FIVEDICE.getContrastingColor("GreenYellow")},
		{label: "Honey Dew", value: "HoneyDew", contrast: FIVEDICE.getContrastingColor("HoneyDew")},
		{label: "Hot Pink", value: "HotPink", contrast: FIVEDICE.getContrastingColor("HotPink")},
		{label: "Indian Red", value: "IndianRed", contrast: FIVEDICE.getContrastingColor("IndianRed")},
		{label: "Indigo", value: "Indigo", contrast: FIVEDICE.getContrastingColor("Indigo")},
		{label: "Ivory", value: "Ivory", contrast: FIVEDICE.getContrastingColor("Ivory")},
		{label: "Khaki", value: "Khaki", contrast: FIVEDICE.getContrastingColor("Khaki")},
		{label: "Lavender", value: "Lavender", contrast: FIVEDICE.getContrastingColor("Lavender")},
		{label: "Lavender Blush", value: "LavenderBlush", contrast: FIVEDICE.getContrastingColor("LavenderBlush")},
		{label: "Lawn Green", value: "LawnGreen", contrast: FIVEDICE.getContrastingColor("LawnGreen")},
		{label: "Lemon Chiffon", value: "LemonChiffon", contrast: FIVEDICE.getContrastingColor("LemonChiffon")},
		{label: "Light Blue", value: "LightBlue", contrast: FIVEDICE.getContrastingColor("LightBlue")},
		{label: "Light Coral", value: "LightCoral", contrast: FIVEDICE.getContrastingColor("LightCoral")},
		{label: "Light Cyan", value: "LightCyan", contrast: FIVEDICE.getContrastingColor("LightCyan")},
		{label: "Light Golden-Rod Yellow", value: "LightGoldenRodYellow", contrast: FIVEDICE.getContrastingColor("LightGoldenRodYellow")},
		{label: "Light Grey", value: "LightGrey", contrast: FIVEDICE.getContrastingColor("LightGrey")},
		{label: "Light Green", value: "LightGreen", contrast: FIVEDICE.getContrastingColor("LightGreen")},
		{label: "Light Pink", value: "LightPink", contrast: FIVEDICE.getContrastingColor("LightPink")},
		{label: "Light Salmon", value: "LightSalmon", contrast: FIVEDICE.getContrastingColor("LightSalmon")},
		{label: "Light Sea Green", value: "LightSeaGreen", contrast: FIVEDICE.getContrastingColor("LightSeaGreen")},
		{label: "Light Sky Blue", value: "LightSkyBlue", contrast: FIVEDICE.getContrastingColor("LightSkyBlue")},
		{label: "Light Slate Gray", value: "LightSlateGray", contrast: FIVEDICE.getContrastingColor("LightSlateGray")},
		{label: "Light Steel Blue", value: "LightSteelBlue", contrast: FIVEDICE.getContrastingColor("LightSteelBlue")},
		{label: "Light Yellow", value: "LightYellow", contrast: FIVEDICE.getContrastingColor("LightYellow")},
		{label: "Lime", value: "Lime", contrast: FIVEDICE.getContrastingColor("Lime")},
		{label: "Lime Green", value: "LimeGreen", contrast: FIVEDICE.getContrastingColor("LimeGreen")},
		{label: "Linen", value: "Linen", contrast: FIVEDICE.getContrastingColor("Linen")},
		{label: "Magenta", value: "Magenta", contrast: FIVEDICE.getContrastingColor("Magenta")},
		{label: "Maroon", value: "Maroon", contrast: FIVEDICE.getContrastingColor("Maroon")},
		{label: "Medium Aqua-Marine", value: "MediumAquaMarine", contrast: FIVEDICE.getContrastingColor("MediumAquaMarine")},
		{label: "Medium Blue", value: "MediumBlue", contrast: FIVEDICE.getContrastingColor("MediumBlue")},
		{label: "Medium Orchid", value: "MediumOrchid", contrast: FIVEDICE.getContrastingColor("MediumOrchid")},
		{label: "Medium Purple", value: "MediumPurple", contrast: FIVEDICE.getContrastingColor("MediumPurple")},
		{label: "Medium Sea Green", value: "MediumSeaGreen", contrast: FIVEDICE.getContrastingColor("MediumSeaGreen")},
		{label: "Medium Slate Blue", value: "MediumSlateBlue", contrast: FIVEDICE.getContrastingColor("MediumSlateBlue")},
		{label: "Medium Spring Green", value: "MediumSpringGreen", contrast: FIVEDICE.getContrastingColor("MediumSpringGreen")},
		{label: "Medium Turquoise", value: "MediumTurquoise", contrast: FIVEDICE.getContrastingColor("MediumTurquoise")},
		{label: "Medium Voilet Red", value: "MediumVoiletRed", contrast: FIVEDICE.getContrastingColor("MediumVoiletRed")},
		{label: "Midnight Blue", value: "MidnightBlue", contrast: FIVEDICE.getContrastingColor("MidnightBlue")},
		{label: "Mint Cream", value: "MintCream", contrast: FIVEDICE.getContrastingColor("MintCream")},
		{label: "Misty Rose", value: "MistyRose", contrast: FIVEDICE.getContrastingColor("MistyRose")},
		{label: "Moccasin", value: "Moccasin", contrast: FIVEDICE.getContrastingColor("Moccasin")},
		{label: "Navajo White", value: "NavajoWhite", contrast: FIVEDICE.getContrastingColor("NavajoWhite")},
		{label: "Navy", value: "Navy", contrast: FIVEDICE.getContrastingColor("Navy")},
		{label: "Old Lace", value: "OldLace", contrast: FIVEDICE.getContrastingColor("OldLace")},
		{label: "Olive", value: "Olive", contrast: FIVEDICE.getContrastingColor("Olive")},
		{label: "Olive Drab", value: "OliveDrab", contrast: FIVEDICE.getContrastingColor("OliveDrab")},
		{label: "Orange", value: "Orange", contrast: FIVEDICE.getContrastingColor("Orange")},
		{label: "Orange Red", value: "OrangeRed", contrast: FIVEDICE.getContrastingColor("OrangeRed")},
		{label: "Orchid", value: "Orchid", contrast: FIVEDICE.getContrastingColor("Orchid")},
		{label: "Pale Golden-Rod", value: "PaleGoldenRod", contrast: FIVEDICE.getContrastingColor("PaleGoldenRod")},
		{label: "Pale Green", value: "PaleGreen", contrast: FIVEDICE.getContrastingColor("PaleGreen")},
		{label: "Pale Turquoise", value: "PaleTurquoise", contrast: FIVEDICE.getContrastingColor("PaleTurquoise")},
		{label: "Pale Violet Red", value: "PaleVioletRed", contrast: FIVEDICE.getContrastingColor("PaleVioletRed")},
		{label: "Papaya Whip", value: "PapayaWhip", contrast: FIVEDICE.getContrastingColor("PapayaWhip")},
		{label: "Peach Puff", value: "PeachPuff", contrast: FIVEDICE.getContrastingColor("PeachPuff")},
		{label: "Peru", value: "Peru", contrast: FIVEDICE.getContrastingColor("Peru")},
		{label: "Pink", value: "Pink", contrast: FIVEDICE.getContrastingColor("Pink")},
		{label: "Plum", value: "Plum", contrast: FIVEDICE.getContrastingColor("Plum")},
		{label: "Powder Blue", value: "PowderBlue", contrast: FIVEDICE.getContrastingColor("PowderBlue")},
		{label: "Purple", value: "Purple", contrast: FIVEDICE.getContrastingColor("Purple")},
		{label: "Red", value: "Red", contrast: FIVEDICE.getContrastingColor("Red")},
		{label: "Rosy Brown", value: "RosyBrown", contrast: FIVEDICE.getContrastingColor("RosyBrown")},
		{label: "Royal Blue", value: "RoyalBlue", contrast: FIVEDICE.getContrastingColor("RoyalBlue")},
		{label: "Saddle Brown", value: "SaddleBrown", contrast: FIVEDICE.getContrastingColor("SaddleBrown")},
		{label: "Salmon", value: "Salmon", contrast: FIVEDICE.getContrastingColor("Salmon")},
		{label: "Sandy Brown", value: "SandyBrown", contrast: FIVEDICE.getContrastingColor("SandyBrown")},
		{label: "Sea Green", value: "SeaGreen", contrast: FIVEDICE.getContrastingColor("SeaGreen")},
		{label: "Sea Shell", value: "SeaShell", contrast: FIVEDICE.getContrastingColor("SeaShell")},
		{label: "Sienna", value: "Sienna", contrast: FIVEDICE.getContrastingColor("Sienna")},
		{label: "Silver", value: "Silver", contrast: FIVEDICE.getContrastingColor("Silver")},
		{label: "Sky Blue", value: "SkyBlue", contrast: FIVEDICE.getContrastingColor("SkyBlue")},
		{label: "Slate Blue", value: "SlateBlue", contrast: FIVEDICE.getContrastingColor("SlateBlue")},
		{label: "Slate Gray", value: "SlateGray", contrast: FIVEDICE.getContrastingColor("SlateGray")},
		{label: "Snow", value: "Snow", contrast: FIVEDICE.getContrastingColor("Snow")},
		{label: "Spring Green", value: "SpringGreen", contrast: FIVEDICE.getContrastingColor("SpringGreen")},
		{label: "Steel Blue", value: "SteelBlue", contrast: FIVEDICE.getContrastingColor("SteelBlue")},
		{label: "Tan", value: "Tan", contrast: FIVEDICE.getContrastingColor("Tan")},
		{label: "Teal", value: "Teal", contrast: FIVEDICE.getContrastingColor("Teal")},
		{label: "Thistle", value: "Thistle", contrast: FIVEDICE.getContrastingColor("Thistle")},
		{label: "Tomato", value: "Tomato", contrast: FIVEDICE.getContrastingColor("Tomato")},
		{label: "Turquoise", value: "Turquoise", contrast: FIVEDICE.getContrastingColor("Turquoise")},
		{label: "Violet", value: "Violet", contrast: FIVEDICE.getContrastingColor("Violet")},
		{label: "Wheat", value: "Wheat", contrast: FIVEDICE.getContrastingColor("Wheat")},
		{label: "White", value: "White", contrast: FIVEDICE.getContrastingColor("White")},
		{label: "White Smoke", value: "WhiteSmoke", contrast: FIVEDICE.getContrastingColor("WhiteSmoke")},
		{label: "Yellow", value: "Yellow", contrast: FIVEDICE.getContrastingColor("Yellow")},
		{label: "Yellow-Green", value: "YellowGreen", contrast: FIVEDICE.getContrastingColor("YellowGreen")}
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
