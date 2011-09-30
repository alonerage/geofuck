var map, circle, circleOptions, setCenter, marker;
var img = 'img/g.png';
var shadow = 'img/shadow.png';
var shape = 'img/area.png';

function initialize() {
    var myLatlng = new google.maps.LatLng(toGeo('57.35.50'), toGeo('39.54.50')); //1st elem
    var myOptions = {
        zoom: 9,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP //ROADMAP, HYBRID
    }
    map = new google.maps.Map(document.getElementById("my_map"), myOptions);
    
    R=calc();
        
	maxR_opt = {
        fillColor:"00AAFF",
        fillOpacity:0.5,
        strokeWeight:0,
        clickable:false
    }
    
   	minR_opt = {
        fillColor:"red",
        fillOpacity:0.5,
        strokeWeight:0,
        clickable:false
    }
	marker_opt = {
		map: map,
		title:"Hello World!",
		clickable:false,
		icon: img,
		shadow: shadow,
		//shape: shape
	}
    
    for(i = 0; i < R.length; i++){    
    /*отрисовка маркера*/
		var point = new google.maps.LatLng(toGeo('57.35.50'),toGeo('39.54.50')); //ajax_me
		marker_opt.position = point;
		var marker = new google.maps.Marker(marker_opt);
	/*отрисовка радиуса*/
		maxR_opt.center = minR_opt.center = point;    
		radius = get(R[i]);

		maxR_opt.radius = radius[0] / 100;
		circle = new google.maps.Circle(maxR_opt);
		circle.setMap(map);
		
		minR_opt.radius = radius[1] / 100;
		circle = new google.maps.Circle(minR_opt);
		circle.setMap(map);
	}
}
function loadScript() {
    var script = document.createElement("script");
    script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
}
window.onload = loadScript;
