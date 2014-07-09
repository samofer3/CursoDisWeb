$(function(){ //Equivale a $(document).on("ready", function(){
	/*
	 $.get("logos_footer.html", function(codigito){ //obtiene por get logos_footer.html, lo envia a la funcion con codigito todo el codigo obtenido
	 	$("footer").append(codigito); //le agrega al footer el codigo guardado en codigito
	 });
	*/
	 $("footer .logos").load("logos_footer.html"); //.load reempleza todo lo contenido en footer
	 //$("footer .logos").load("logos_footer.html #maestrosdelweb"); //solo obtiene el objeto con el id maestrosdelweb

	 $.get("usuarios.json",function(info){ //obtiene por get usuario.jason y lo envia a la funcion con parametro info, Jquery convierte directamente a objeto JASON
	 	var avatar = new Image(); //Se crea una nueva imagen
	 	avatar.src = info.avatar; //Se le asigna la ruta de la imagen mediante el atributo .avatar del parametro info
	 	avatar.title = info.nombre+" "+info.apellido; //Se le asigna el titulo de la imagen accediendo a los atributos del parametro info

	 	$("#avatar").append(avatar); //Se le agrega al elemento con id avatar la imagen con todas las caracteristicas
	 });
})

//Busquedas en yahoo query lenguaje console
var base_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon) { //funcion llamada desde geo.js que envie las coordenadas
	//console.log(lat, lon);
	var query = "SELECT * FROM geo.placefinder WHERE text='"+lat+", "+lon+"' AND gflags='R'"; //Query para buscar la info de un lugar en ciertas coordenadas
	query = encodeURIComponent(query); //se codifica la query para poder ser enviada como url para el navegador

	$.ajax({ //Llamada a procesamiento ajax
		url: base_url+"q="+query, //a que URL se hace la peticion AJAX
		dataType : 'jsonp', //Que tipo de ajax recibe
		jsonpCallback: 'procesarGeoInfo', //a que funcion se ejecutara lo procesado
		data: {
			format: 'json' //que formato se quiere recibir de yahoo -XML -json
		}
	});
}

function procesarGeoInfo(datos){ //funcion llamada desde la peticion AJAX
	var res = datos.query.results.Result; //El objeto que se recibe 'datos' contiene dentro de Result toda la info
	var barrio = res.neighborhood; // Entrando
	var ciudad = res.city;			// a cada
	var pais = res.country;			// atributo
	var woeid = res.woeid; //where on en id sirve para hacer busqueda del clima
	$("#geo").prepend("<p><strong>"+barrio+"</strong></br>"+ciudad+", "+pais+"</p>"); //se añade los datos al elemento con id 'geo'

	obtenerClima(woeid); //se llama la funcion obtenerClima con el atributo woeid
}

function obtenerClima(woeid) { //funcion llamada desde funcion procesarGeoInfo para buscar info del cliam
	//console.log(lat, lon);
	var query = "SELECT * FROM weather.forecast WHERE woeid='"+woeid+"' AND u='c'"; //Query para buscar la info del clima 'woeid' y unidades 'c' de centigrados
	query = encodeURIComponent(query); //se codifica la query para poder ser enviada como url para el navegador

	$.ajax({ //Llamada AJAX
		url: base_url+"q="+query,
		dataType : 'jsonp',
		jsonpCallback: 'procesarClima', //Ahora llamara a esta funcion
		data: {
			format: 'json'
		}
	});
}

function procesarClima(datos){ //funcion llamada despues de recoger la info de la consulta de AJAX
	//console.log(datos);
	var clima = datos.query.results.channel; //El objeto que se recibe 'datos' contiene dentro de channel toda la info
	var temp = clima.item.condition.temp; //
	var unit = clima.units.temperature; //
	var code = clima.item.condition.code; //atributo para saber el codigo para la imagen
	var img = new Image();
	img.src = "http://l.yimg.com/a/i/us/we/52/"+code+".gif"; //direccion extraida de datos.query.results.channel.description

	$("#clima")
		.append(img)
		.append(temp+" "+unit+"°");
}