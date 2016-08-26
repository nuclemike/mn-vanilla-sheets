$("#loader, #splashLogo").addClass("loading");
	// Wait for window load
	$(window).load(function() {
		// Animate loader off screen
		$("#loader").fadeOut("slow");
	});
