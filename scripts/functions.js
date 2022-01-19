// store the effective date of the active popup
var popupYear = 0;


// Update the year slider and corresponding map filter
function moveYearSlider(sliderID, numberID, increment, loop=false) {
	slider = document.getElementById(sliderID);
	minYear = parseInt(slider.min, 10);
	currentYear = parseInt(slider.value, 10);
	maxYear = parseInt(slider.max, 10);

	desiredYear = currentYear + increment;

	if (loop) { // if we're looping then wrap any overflow around
		if (desiredYear > maxYear) {desiredYear = minYear;}
		else if (desiredYear < minYear) {desiredYear = maxYear;}
	}
	else { // if not looping then keep changes within the min/max bounds
		if ((desiredYear > maxYear) || (desiredYear < minYear)) {
			desiredYear = currentYear;
			console.log('Hacking too much time');
		}
	}

	// apply the filter
	map.setFilter(layerToFilter, ['<=', ['get', yearField], desiredYear]);

	// update text in the UI
	slider.value = desiredYear;
	document.getElementById(numberID).innerText = desiredYear;

	if (desiredYear < popupYear) {
		clearpopups();
	}
}


function animateYearSlider(sliderID, numberID, delay) {
	if (animationRunning) {
		moveYearSlider(sliderID, numberID, 1, loop=true);
		setTimeout(
			function() {animateYearSlider(sliderID, numberID, delay)},
			delay
		);
	}
}


function startYearAnimation(sliderID, numberID, delay, playID, stopID) {
	animationRunning = true;
	document.getElementById(playID).style.display = 'none';
	document.getElementById(stopID).style.display = 'inline';
	animateYearSlider(sliderID, numberID, delay);
}


function stopYearAnimation(playID, stopID) {
	animationRunning = false;
	document.getElementById(playID).style.display = 'inline';
	document.getElementById(stopID).style.display = 'none';
}




function clearpopups(){
	document.querySelectorAll('.mapboxgl-popup').forEach(
		e => e.remove()
	);
}


function round(num, dp) {
	let multiplier = 1;
	if (dp !== undefined) {
		multiplier = Math.pow(10, dp);
	}
	return (Math.round((num + Number.EPSILON) * multiplier) / multiplier);
}
