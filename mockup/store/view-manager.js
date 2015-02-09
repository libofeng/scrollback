/* jshint browser: true */
/* global $ */

module.exports = function(core) {
	var keys = [ "view", "mode", "color" ],
	    $title = $(".js-appbar-title"),
	    $discussion = $(".js-discussion-title");

	// Listen to navigate and add class names
	core.on("statechange", function(changes, next) {
	    var classList = $("body").attr("class") || "";

	    for (var i = 0, l = keys.length; i < l; i++) {
	        if ([keys[i]] in changes.nav) {
	            classList = classList.replace(new RegExp("\\b" + keys[i] + "-" + "\\S+", "g"), "");

	            classList += " " + keys[i] + "-" + (changes.nav[keys[i]] || "");
	        }
	    }

	    classList = classList.replace(/\bcolor-\S+/g, "").replace(/^\s+|\s+$/g, "");

	    if ("nav" in changes && "mode" in changes.nav) {
	        switch (changes.nav.mode) {
	        case "room":
	            $title.text(changes.nav.room);
	            break;
	        case "chat":
	            classList += " color-" + changes.color;
	            $title.text(changes.nav.room);
	            $discussion.text(changes.nav.discussionId);
	            break;
	        case "home":
	            $title.text("My feed");
	            break;
	        }
	    }

	    $("body").attr("class", classList);

	    next();
	}, 1000);
};
