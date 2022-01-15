mapboxgl.accessToken = 'pk.eyJ1IjoiY29yZS1naXMiLCJhIjoiaUxqQS1zQSJ9.mDT5nb8l_dWIHzbnOTebcQ';

// global variables to configure the year slider
var sourceToFilter = "accomplishments";
var layerToFilter = "accomplishments_poly";
var yearField = "Year_Prot";


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
	'road-simple'
	);

// When a click event occurs on a feature in the accomplishments  layer, open a popup at the
// location of the click, with description HTML from its properties.
	map.on('click', 'accomplishments_poly', function (e) {
		new mapboxgl.Popup()
			.setLngLat(e.lngLat)
			.setHTML(fillpopup(e.features[0].properties))
			.addTo(map);
		console.log(e.features[0].properties);
	});

	// Change the cursor to a pointer when the mouse is over the parcel layer.
	map.on('mouseenter', 'accomplishments_poly', function () {
			map.getCanvas().style.cursor = 'pointer';
	});

	// Change it back to a pointer when it leaves.
	map.on('mouseleave', 'accomplishments_poly', function () {
			map.getCanvas().style.cursor = '';
	});

	// start the year filter
	moveYearSlider('slider', 'active-year', 0);
});







