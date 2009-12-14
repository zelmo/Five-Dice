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
	
	//Sorting by name isn't working, so we'll just always sort by score.
//	this.nameHeaderHandler = function () {this.changeSort("playerName");}.bindAsEventListener(this);
//	this.controller.listen("nameHeader", Mojo.Event.tap, this.nameHeaderHandler);
//	this.scoreHeaderHandler = function () {this.changeSort("score");}.bindAsEventListener(this);
//	this.controller.listen("scoreHeader", Mojo.Event.tap, this.scoreHeaderHandler);
//	this.timeStampHeaderHandler = function () {this.changeSort("timeStamp");}.bindAsEventListener(this);
//	this.controller.listen("timeStampHeader", Mojo.Event.tap, this.timeStampHeaderHandler);
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
//	this.controller.stopListening("nameHeader", Mojo.Event.tap, this.nameHeaderHandler);
//	this.controller.stopListening("scoreHeader", Mojo.Event.tap, this.scoreHeaderHandler);
//	this.controller.stopListening("timeStampHeader", Mojo.Event.tap, this.timeStampHeaderHandler);
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

//HighScoresAssistant.prototype.changeSort = function (column) {
//	//Either reverse the sort order or change the sort column.
//	if (column == this.sortCriteria.column) {
//		this.sortCriteria.ascending = !this.sortCriteria.ascending;
//	}
//	else {
//		this.sortCriteria.column = column;
//	}
//	//Show the results.
//	this.showScores(this.sortCriteria);
//};

HighScoresAssistant.prototype.showScores = function (sortCriteria) {
	//Blank the scores and scroll to the top.
	this.names.innerHTML = "";
	this.scores.innerHTML = "";
	this.timeStamps.innerHTML = "";
	this.controller.get("highScoreScroller").mojo.revealTop();
	
//	var sortFunction = function (a, b) {
//		switch (sortCriteria.column) {
//		case "score":
//			//Use descending date as the secondary sort.
//			if (a.score == b.score) {
//				return b.timeStamp - a.timeStamp;
//			}
//			else {
//				if (sortCriteria.ascending) {
//						return a.score - b.score;
//				}
//				else {
//					return b.score - a.score;
//				}
//			}
//			break;
//		case "playerName":
//			//Use descending score as the secondary sort.
//			if (a.playerName == b.playerName) {
//				return b.score - a.score;
//			}
//			else {
//				if (sortCriteria.ascending) {
//					return a.playerName - b.playerName;
//				}
//				else {
//					return b.playerName - a.playerName;
//				}
//			}
//			break;
//		case "timeStamp":
//			//Use descending score as the secondary sort.
//			if (a.timeStamp == b.timeStamp) {
//				return b.score - a.score;
//			}
//			else {
//				if (sortCriteria.ascending) {
//					return a.timeStamp - b.timeStamp;
//				}
//				else {
//					return b.timeStamp - a.timeStamp;
//				}
//			}
//			break;
//		}
//	};
	
	var highScores = FIVEDICE.highScores.getScores().sort(function (a, b) {return b.score - a.score;});
	for (var i = 0; i < highScores.length; i++) {
		//Convert the time stamp from unix time to a Date object and format it to look nice.
		var timeStamp = new Date();
		timeStamp.setTime(highScores[i].timeStamp);
		var month = timeStamp.getMonth() + 1;
		var day = timeStamp.getDate();
		var year = timeStamp.getFullYear();
		var formattedTimeStamp = month + "/" + day + "/" + year;
		this.names.innerHTML += highScores[i].playerName + "<br />";
		this.scores.innerHTML += highScores[i].score + "<br />";
		this.timeStamps.innerHTML += formattedTimeStamp + "<br />";
	}
};
