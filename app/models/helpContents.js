var HelpContents = Class.create ({
	pages: [
		{
			headerIcon: "Die1Held.png",
			headerTitle: "Overview",
			bodyHtml: "<div class=\"palm-body-text\">" +
				"<strong>Five Dice</strong> is a simple game that follows the rules of Milton Bradley's Yahtzee&trade;." +
				" In a nutshell, you're given five dice, any number of which you can roll up to three times per turn." +
				" You get points for creating certain groupings of die values, and your objective is to get the highest score you can." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"To read more about the game's rules, history, and more stuff than you'll ever need to know," +
				" <a id=\"wikipediaLink\">follow this link to the Wikipedia page.</a>" +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"For details on how Five Dice works, go on to the next page." +
				"</div>"
		},
		{
			headerIcon: "Die2Held.png",
			headerTitle: "Rolling the Dice",
			bodyHtml: "<div class=\"palm-body-text\">" +
				"The game starts out with five blank dice on the bottom left of the screen." +
				" You can roll the dice up to three times per turn either by tapping the <strong>Roll</strong> button" +
				" on the bottom right of the screen, or (if enabled in the Preferences) by shaking the phone." +
				" The <strong>Roll</strong> button indicates which roll number you are on." +
				"</div>" +
				"<div class='palm-body-text'>" +
				"After each roll, you can \"freeze\" any dice you want by tapping on them." +
				" Dice that are frozen will not be rolled when you roll again." +
				" You can un-freeze dice by tapping on them again." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"After three rolls, the <strong>Roll</strong> button is disabled, and you must choose a score." +
				" Once a score is chosen, the <strong>Roll</strong> button is re-enabled and the dice are blanked out." +
				"</div>"
		},
		{
			headerIcon: "Die3Held.png",
			headerTitle: "Scoring",
			bodyHtml: "<div class=\"palm-body-text\">" +
				"After each roll, the game will show you the possible points you can score" +
				" for each score item, using a teal color. You can click the button representing" +
				" the score item of your choice to assign the current score to that item." +
				" Once a score is assigned to an item, it is displayed in black." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"The <em>Subtotal</em> and <em>Total</em> are automatically calculated after each turn," +
				" and the <em>Bonus</em> is automatically given to you once your <em>Subtotal</em>" +
				" reaches or exceeds 63 points." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"If you roll five of a kind after already having a non-zero score on <strong>5 of a kind</strong>," +
				" you can get an extra 100 points on your <strong>5 of a kind</strong> score." +
				" To get the extra points, simply assign the score to the upper half item that matches" +
				" your dice. If that item already has a score on it (even if that score is 0)," +
				" you can use your roll for any lower-half item and it will count as the normal value" +
				" for that item. You can keep accumulating extra points on <strong>5 of a kind</strong>" +
				" each time you roll five of a kind for the remainder of the game." +
				"</div>"
		},
		{
			headerIcon: "Die4Held.png",
			headerTitle: "Special Features",
			bodyHtml: "<div class=\"palm-body-text\">" +
				"<em>Note that most special features can be configured in the game's Preferences.</em>" +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"<strong>Delay between rolls:</strong> After each roll, the <strong>Roll</strong> button" +
				" remains disabled for a brief amount of time to help avoid accidentally re-rolling." +
				" This can be useful when you're riding a bouncy bus and your thumb keeps double-tapping" +
				" the button, or you have shake enabled during an earthquake." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"<strong>Subtotal deviation:</strong> 63 may sound like an arbitrary score to have" +
				" to reach in the upper half in order to earn your bonus, but it turns out to be the score" +
				" you get if you score three dice in each upper-half score item. As you play, Five Dice will" +
				" compare what you've scored in the upper half to what you would score if you got three dice" +
				" in each of the scored items, and the number after the slash in the <em>Subtotal</em> line" +
				" shows you how far ahead of or behind the curve you are. People who are sticklers about" +
				" earning the bonus find this feature very helpful in letting them know whether they can" +
				" afford to sacrifice one or two dice on an upper-score item, or whether it will be too hard" +
				" to make up the difference later." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"<strong>Undo:</strong> If you accidentally hit a score button before you're ready," +
				" you can select the <em>Undo</em> item from the menu to return the game state to" +
				" what it was before you hit the score button. Aside from not having any dice held," +
				" everything will be restored: the exact dice values, the score suggestions, and even" +
				" the roll counter (meaning if you had remaining rolls available before you hit the" +
				" score button, they'll still be available after you hit <em>Undo</em>)." +
				" The <em>Undo</em> menu item is available immediately after assigning any score item," +
				" and becomes disabled once you hit the <em>Roll</em> button (sorry, no re-rolls)." +
				"</div>"
		}
	]
});
