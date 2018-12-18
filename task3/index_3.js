var map;
var locations = [];
var labels;
var markers;
var markerCluster;
var image = 'bus.png';

$(document).ready(function(){
				getStations();
				$('#buslineoptions').change(clearMap);				
			});

function clearMap(){
	markerCluster.clearMarkers();
};

function getStations(){
		var client = new XMLHttpRequest();
		foliapiurl = "https://data.foli.fi/gtfs/";
		client.open( "GET", foliapiurl, false );
		client.send();
		data = JSON.parse(client.responseText);
		//console.log(data.latest);
		linkforRoutes = "https://data.foli.fi/gtfs/v0/"+data.latest+"/routes";
		//console.log(linkforRoutes);
		client.open( "GET", linkforRoutes, false );
		client.send();
		dataset= JSON.parse(client.responseText);
		//console.log(dataset);
		for (var i = 0; i < dataset.length; i++) {
			$('#buslineoptions').append('<option data-id="'+dataset[i].route_id+'"  value="'+dataset[i].route_short_name+'">'+
                                dataset[i].route_short_name+" - "+dataset[i].route_long_name+'</option>');
        }	
}


$(document).ready(function(){
	$('#showbuses').click(function(){

	markerCluster.clearMarkers();
    locations = [];
	markers = [];
	var id = [];
    var buslineoptions = document.getElementById("buslineoptions");
    var userInput = buslineoptions.options[buslineoptions.selectedIndex].value;
    var client1 = new XMLHttpRequest();
    foli_url_link = "https://data.foli.fi/siri/vm";
    client1.open( "GET", foli_url_link, false ); 
    client1.send();
    data = JSON.parse(client1.responseText);
	if(data.success==false){ //check if route is found or not
		alert("No Route Found!!!");
		return
	}
    //console.log(a);
	for(var k in data.result.vehicles) id.push(k);
	for (var i = 0; i < id.length; i++) {	
		bus = data.result.vehicles[id[i]];
		if (bus.publishedlinename==userInput){
			var location = { "lat" : bus.latitude, "lng" : bus.longitude}
			locations.push(location);
		}
	}
	if (locations.length==0)
		alert('No bus found');
	
	//Create markers for buses
	markers = locations.map(function(location, i) {
		return new google.maps.Marker({
			position: location,
			icon: image,
			label: labels[i % labels.length]
		});
	});
	markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    });
});

function myMap(){
    var latitude,longitude;
    locations = [];
	labels = '0123456789';
    map= new google.maps.Map(document.getElementById('googleMap'), {
		center: {lat: 60.451607, lng: 22.267294}, 
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom:12
    });
    
	
    markers = locations.map(function(location, i) {
			return new google.maps.Marker({
			position: location,
			icon: image,
			label: labels[i % labels.length]
		});
	});
	markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
