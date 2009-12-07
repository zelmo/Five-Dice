function HighScoresAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
};

HighScoresAssistant.prototype.setup = function () {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	this.names = this.controller.get("names");
	this.scores = this.controller.get("scores");
	this.timeStamps = this.controller.get("timeStamps");
	
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
};

HighScoresAssistant.prototype.activate = function (event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */

	this.showScores("score", false);
};


HighScoresAssistant.prototype.deactivate = function (event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

HighScoresAssistant.prototype.cleanup = function (event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};

HighScoresAssistant.prototype.showScores = function (sortBy, ascending) {
	Mojo.Log.info("Defining the sort function to sort by", sortBy, (ascending ? "ascending." : "descending."));
	var sortFunction = function (a, b) {
		if (ascending) {
			return a[sortBy] - b[sortBy];
		}
		else {
			return b[sortBy] - a[sortBy];
		}
	};
	Mojo.Log.info("Getting the array of scores and applying the sort function.");
	var highScores = FIVEDICE.highScores.getScores().sort(sortFunction);
	Mojo.Log.info("Got", highScores.length, "scores.");
	for (var i = 0; i < highScores.length; i++) {
		var displayedTimeStamp = highScores[i].timeStamp.toDateString() + " " + highScores[i].timeStamp.toTimeString();
		Mojo.Log.info("Displaying a score of", highScores[i].score, "for", highScores[i].name, "at", displayedTimeStamp);
		this.names.innerHTML += "\n" + highScores[i].name;
		this.scores.innerHTML += "\n" + highScores[i].score;
		this.timeStamps.innerHTML += "\n" + displayedTimeStamp;
	}
};
