$(document).ready(function() {
    initialize();
    addMarker(14.552048, 121.045539);
    addMarker(14.549180, 121.027970);

});

    var map;
    var origin_location;
    var markers = [];

    var origin_latitude = 14.553406;
    var origin_longitude = 121.049923;

    function initialize() {

        var mapContainer = $("#map-container")[0];

        origin_location = new google.maps.LatLng(origin_latitude, origin_longitude);

        var mapProperties = {
            center: origin_location,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        map = new google.maps.Map(mapContainer, mapProperties);
        console.log("new map created on: " + origin_location);

        addMarker(origin_latitude, origin_longitude);
        fetchFromDataSource();
    }

    function fetchFromDataSource() {
        url = "/subscribers"

        $.get(url, function(data) {
            var list = $.parseJSON(data).users;
            for(var i=0; i<list.length; i++) {
                console.log(list[i]));
            }
        });
    }

    function addMarker(latitude, longitude) {
        var location = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
            position : location,
            map : map
        });

        markers.push(marker);

        addEventListenerToMarker(marker);
        console.log("new marker added on: " + location);
    }

    function setMapOnMarkers(map, list) {
        for(var i=0; i<list.length; i++) {
            list[i].setMap(map);
        }
    }

    function addEventListenerToMarker(marker) {
        marker.addListener('click', function(){
            var location = marker.position.toJSON();
            getDetails(location.lat, location.lng);
        });
    }

    function getDetails(dest_latitude, dest_longitude) {
        var url = '/locate?' + "&origins=" + origin_latitude + "," + origin_longitude +
            "&destinations=" + dest_latitude + "," + dest_longitude;

        $.get(url, function(result) {
            var details = result.data.rows[0].elements[0];
            var distance = details.distance.text;
            var duration = details.duration.text;
            var origin = result.data.origin_addresses[0];
            console.log("\nhelp is coming from " + origin + ",\n\t" + distance +
                " away (estimate time of arrival: " + duration + ")");
        });
    }

    function hideMarkers() {
        addEventLis
    }