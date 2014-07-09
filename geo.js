$(function(){ //$(document).on("ready", function(){
	var geo = navigator.geolocation; //se le asigna a la variable geo la opcion de poder geolocalizar
	//console.log(geo); para ver que recibe la var geo
	var opciones = {}; //funcion que se ejecuta en opciones del getCurrentPosition

	function geo_error(){ //funcion que se ejecuta en geo_error del getCurrentPosition
		console.log("No puedo saber donde estas"); //Manda un error a la consola
	}

	function geo_exito(posicion){ //recibe el evento que trae valores como longitud y latitud
		var lat = posicion.coords.latitude; //Recibe la latitud
		var lon = posicion.coords.longitude; //recibe la longitud
		var mapa = new Image(); //Crea un nuevo objeto de imagen

		//Tambien puede recibir por get el maptype=satellite o hybrid
		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=300x200&sensor=false&center="+lat+","+lon;

		$("#geo").append(mapa); //Se le agrega al elemento con id geo el nuevo objeto de imagen mapa
		
		obtenerGeoInformacion(lat, lon);
	}



	geo.getCurrentPosition(geo_exito, geo_error, opciones); //recibe 3 funciones, 1ra - si se pudo recibir la geo, 2da -si no se pudo recibir la geo, 3ra - opciones y configuraciones 
})