mapboxgl.accessToken = 'pk.eyJ1IjoiY29yZS1naXMiLCJhIjoiaUxqQS1zQSJ9.mDT5nb8l_dWIHzbnOTebcQ';

// global variables to configure the year slider
var sourceToFilter = "accomplishments";
var layerToFilter = "accomplishments_poly"; // this should be the only place we ever need to edit the layer name - everything else references this variable
var yearField = "Year_Prot"; // this tells the year slider code which field to apply the date filter to


//set bounds to San Juan County
var bounds = [
		[-123.516541,48.328865], // southwest coords
		[-122.252426,48.772935] // northeast coords
	];

const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/core-gis/ckxw53hlynv1e15mpdxxhw8lf',
	center: [-122.920189,48.573200],
	zoom: 10
});

map.on('load', function () {
	map.addSource(sourceToFilter, {
		type:'vector',
		url:'mapbox://core-gis.767wwf38'
	});

	//Add a map layer for all the protected parcels
	map.addLayer({
		"id": layerToFilter, // taking this from the global variable ensures consistency
		"type":"fill",
		"source": sourceToFilter,
		"source-layer":"accomplishments_through_time-6fzid3",
		"paint":{
			'fill-color': '#267300',
			}
		},
	'road-simple' // existing layer to position the new one behind
	);

// When a click event occurs on a feature in the accomplishments  layer, open a popup at the
// location of the click, with description HTML from its properties.
	map.on('click', layerToFilter, function (e) {
		new mapboxgl.Popup()
			.setLngLat(e.lngLat)
			.setHTML(fillpopup(e.features[0].properties))
			.addTo(map);
		console.log(e.features[0].properties);
	});

	// Change the cursor to a pointer when the mouse is over the data layer.
	map.on('mouseenter', layerToFilter, function () {
			map.getCanvas().style.cursor = 'pointer';
	});

	// Change it back to a pointer when it leaves.
	map.on('mouseleave', layerToFilter, function () {
			map.getCanvas().style.cursor = '';
	});

	// initialise the year slider
	moveYearSlider('slider', 'active-year', 0);
}); // end of map.on('load'...




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
