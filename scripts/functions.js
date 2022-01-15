// store the effective date of the active popup
var popupYear = 0;

// Update the year slider and corresponding map filter
function updateYearSlider(numberID, year) {
	map.setFilter(layerToFilter, ['<=', ['get', yearField], year]);
	// update text in the UI
	document.getElementById(numberID).innerText = year;
}

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

	slider.value = desiredYear;
	updateYearSlider(numberID, desiredYear);
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






function setVisibilityState(params) {
	if ((params.visibleOnLoad === undefined) || (params.visibleOnLoad === false)) {
		if ((params.legendID !== undefined) && (params.legendID !== false)) {
			document.getElementById(params.legendID).classList.add('inactive');
		}
		return 'none';
	} else {
		if ((params.legendID !== undefined) && (params.legendID !== false)) {
			document.getElementById(params.legendID).classList.remove('inactive');
		}
		return 'visible';
	}
}


function fillpopup(data){
	// clear existing popups
	clearpopups();
	popupYear = data[yearField];
	var html = "";
	html = html + "<span class='varname'>Property Name: </span> <span class='attribute'>" + data.Name + "</span>";
	html = html + "<br>"
	html = html + "<span class='varname'>Year Protected: </span> <span class='attribute'>" + data.Year_Prot + "</span>";
	html = html + "<br>"
	html = html + "<span class='varname'>Protection Mechanism: </span> <span class='attribute'>" + data.Type + "</span>";
	html = html + "<br>"
	html = html + "<span class='varname'>Acres: </span> <span class='attribute'>" + data.Acres_GIS + "</span>";
	return html;
	//this will return the string to the calling function
}

function clearpopups(){
	document.querySelectorAll('.mapboxgl-popup').forEach(
		e => e.remove()
	);
}
