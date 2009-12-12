function HighScoresAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	
	this.sortCriteria = {column: "score", ascending: false};
};

HighScoresAssistant.prototype.setup = function () {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	this.names = this.controller.get("names");
	this.scores = this.controller.get("scores");
	this.timeStamps = this.controller.get("timeStamps");
	
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	//Add the "pixi" CSS class to certain elements if DeviceInfo.touchableRows is less than what's defined for Pre.
	if (Mojo.Environment.DeviceInfo.touchableRows < 8) {
		this.controller.get("highScoreScrollerContent").addClassName("pixi");
	}

	/* setup widgets here */
	
	//Application menu
	var menuModel = {
		visible: true,
		items: [
			{label: "Preferences", command: "do-preferences"},
			{label: "About #{appName}".interpolate({appName: Mojo.Controller.appInfo.title}), command: "do-about"},
			{label: "Help", command: "do-help"}
		]
	};
	this.controller.setupWidget(Mojo.Menu.appMenu, FIVEDICE.MenuAttributes, menuModel);
	

	/* add event handlers to listen to events from widgets */
	this.nameHeaderHandler = function () {this.changeSortCriteria("name");}.bindAsEventListener(this);
	this.controller.listen("nameHeader", Mojo.Event.tap, this.nameHeaderHandler);
	this.scoreHeaderHandler = function () {this.changeSortCriteria("score");}.bindAsEventListener(this);
	this.controller.listen("scoreHeader", Mojo.Event.tap, this.scoreHeaderHandler);
	this.timeStampHeaderHandler = function () {this.changeSortCriteria("timeStamp");}.bindAsEventListener(this);
	this.controller.listen("timeStampHeader", Mojo.Event.tap, this.timeStampHeaderHandler);
};

HighScoresAssistant.prototype.activate = function (event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */

	this.showScores(this.sortCriteria);
};


HighScoresAssistant.prototype.deactivate = function (event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

HighScoresAssistant.prototype.cleanup = function (event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	this.controller.stopListening("nameHeader", Mojo.Event.tap, this.nameHeaderHandler);
	this.controller.stopListening("scoreHeader", Mojo.Event.tap, this.scoreHeaderHandler);
	this.controller.stopListening("timeStampHeader", Mojo.Event.tap, this.timeStampHeaderHandler);
};

HighScoresAssistant.prototype.handleCommand = function (event) {
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

HighScoresAssistant.prototype.changeSortCriteria = function (column) {
	//Either reverse the sort order or change the sort column.
	if (column == this.sortCriteria.column) {
		this.sortCriteria.ascending = !this.sortCriteria.ascending;
	}
	else {
		this.sortCriteria.column = column;
	}
	//Show the results.
	this.showScores(this.sortCriteria);
};

HighScoresAssistant.prototype.showScores = function (sortCriteria) {
	this.names.innerHTML = "";
	this.scores.innerHTML = "";
	this.timeStamps.innerHTML = "";
	
	var sortFunction = function (a, b) {
		if (sortCriteria.column == "score") {
			//If sorting by score, use descending date as the secondary sort.
			if (a.score == b.score) {
				return b.timeStamp - a.timeStamp;
			}
			else {
				if (sortCriteria.ascending) {
						return a.score - b.score;
				}
				else {
					return b.score - a.score;
				}
			}
		}
		else {
			//Otherwise, use descending score as the secondary sort.
			if (a[sortCriteria.column] == b[sortCriteria.column]) {
				return b.score - a.score;
			}
			else {
				if (sortCriteria.ascending) {
					return a[sortCriteria.column] - b[sortCriteria.column];
				}
				else {
					return b[sortCriteria.column] - a[sortCriteria.column];
				}
			}
		}
	};
	
	var highScores = FIVEDICE.highScores.getScores().sort(sortFunction);
	for (var i = 0; i < highScores.length; i++) {
		//Convert the time stamp from unix time to a Date object and format it to look nice.
		var timeStamp = new Date();
		timeStamp.setTime(highScores[i].timeStamp);
		var month = timeStamp.getMonth() + 1;
		var day = timeStamp.getDate();
		var year = timeStamp.getFullYear();
		var formattedTimeStamp = month + "/" + day + "/" + year;
		this.names.innerHTML += highScores[i].name + "<br />";
		this.scores.innerHTML += highScores[i].score + "<br />";
		this.timeStamps.innerHTML += formattedTimeStamp + "<br />";
	}
};
