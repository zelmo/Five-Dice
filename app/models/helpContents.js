//Closure for HTML content of the Help scene.
FIVEDICE.helpContents = function() {
	//Private variables:
	var _pages = [
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
			headerTitle: "Selecting Players",
			bodyHtml: "<div class=\"palm-body-text\">" +
				"Upon launching the application, you're greeted with a player selection screen." +
				" If you haven't set up any players yet, you'll see a <strong>Players</strong> list" +
				" with only an <em>Add a player</em> item, and a <strong>Start Game</strong> button" +
				" that's disabled." +
				"</div>" +
				"<div class='palm-body-text'>" +
				"You can add as many players to the list as you like. When you tap on the <em>Add a player</em>" +
				" item, a new row will be added to the list with a generic player name and a check box." +
				" The keyboard cursor will automatically be placed next to the new player's name so that you can" +
				" back-space over it and type in a name of your choosing. As with most webOS lists, players can" +
				" be re-ordered in the list by holding down on the player name and dragging it to a new spot," +
				" or deleted by swiping the row off the screen to the left or right." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"The check box next to each player's name indicates who is selected to play the game." +
				" Players who are checked will take turns playing (in the same order that they appear on the list)" +
				" after the <strong>Start Game</strong> button is pressed. You must select at least one player" +
				" before you can start a game." +
				"</div>"
		},
		{
			headerIcon: "Die3Held.png",
			headerTitle: "Rolling the Dice",
			bodyHtml: "<div class=\"palm-body-text\">" +
				"The game starts out with the current player's name at the top of the screen, and five blank dice" +
				" at the bottom left of the screen. You can roll the dice up to three times per turn" +
				" either by tapping the <strong>Roll</strong> button on the bottom right of the screen," +
				" or (if enabled in the Preferences) by shaking the phone. The <strong>Roll</strong> button" +
				" indicates which roll number you are on." +
				"</div>" +
				"<div class='palm-body-text'>" +
				"After each roll, you can \"freeze\" any dice you want by tapping on them" +
				" (or \"unfreeze\" them if you've opted to have them automatically frozen after each roll)." +
				" Dice that are frozen will not be rolled when you roll again." +
				" You can un-freeze dice by tapping on them again." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"After three rolls, the <strong>Roll</strong> button is disabled, and you must choose a score." +
				" After a score is chosen, if there's only one player, the <strong>Roll</strong> button is then" +
				" re-enabled and the dice are blanked out, leaving the game ready for your next turn." +
				" If there are multiple players, the dice are replaced by a button that shows who the next player is." +
				" Pressing that button will move the game to the next player." +
				"</div>"
		},
		{
			headerIcon: "Die4Held.png",
			headerTitle: "Scoring",
			bodyHtml: "<div class=\"palm-body-text\">" +
				"After each roll, the game will show you the possible points you can score" +
				" for each score item, using a yellow color. You can click the button representing" +
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
			headerIcon: "Die5Held.png",
			headerTitle: "High Scores",
			bodyHtml: "<div class=\"palm-body-text\">" +
				"The player selection scene and the game scene have a menu item to view the high scores." +
				" When a game finishes, each player's name, score, and a time stamp are saved to the" +
				" high score list. Selecting the <em>High Scores</em> item from the application menu" +
				" allows you to see a list of scores for games played on your device, sorted from high to low." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"The game has no limit on how many scores it will store, but keeping too many scores can" +
				" make the high score screen very slow to load. To alleviate this problem, you have the option" +
				" of selecting the <em>Delete Scores...</em> item from the High Scores menu. This will present" +
				" you with a dialog from which you can choose how many scores to keep (up to 100) and which end" +
				" of the score spectrum to keep: highest, lowest, newest, or oldest." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"<strong>Tip 1:</strong> The number picker for the scores to keep starts with the number" +
				" of scores you currently have, so if you have a lot of scores, the <em>Delete Scores...</em>" +
				" dialog is a handy way to see exactly how many scores you have." +
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"<strong>Tip 2:</strong> Keeping your highest scores is a good way to challenge yourself to keep" +
				" getting higher scores, but keeping your newest scores gives you a more real-life set of scores" +
				" to try to beat. In statistical terms, a sample of scores based on a span of time should give you" +
				" a normal distribution, whereas keeping only the highest scores skews the curve heavily to the right." +
				"</div>"
		},
		{
			headerIcon: "Die6Held.png",
			headerTitle: "Special Features",
			bodyHtml: "<div class=\"palm-body-text\">" +
				"<em>Note that most special features can be configured in the game's Preferences.</em>" +
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
				"</div>" +
				"<div class=\"palm-body-text\">" +
				"<strong>Current Scores:</strong> When playing a multi-player game, a menu item" +
				" called <em>Current Scores</em> is available from the main game screen. This item" +
				" can be selected at any point during the game to see a list of all players and their scores." +
				"</div>"
		}
	];
	
	//Public API:
	return { pages: _pages };
};
