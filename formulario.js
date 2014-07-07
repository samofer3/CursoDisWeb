var $form = $('#formulario'), //obtiene valor del id formulario
	$titulo = $('#titulo'), //obtiene el valor del id tituo
	$url = $('#url'), //obtiene el valor del id url
	$button = $('#mostrar-form'), //obtiene el valor del boton mostrar-frm
	$list = $('#contenido'), //obtiene la lista de todos los post para poder ocuparlos unirlos al final
	$post = $('.item').first(); //obtiene el primer elemento de la clase item

if (localStorage.getItem("autosave")) { //verifica si esta creada la variable autosave
	$titulo.val(sessionStorage.getItem("titulo")); //Obtiene el valor que esta en sessionStorage conn key "titulo"
	$url.val(sessionStorage.getItem("url")); //Obtiene el valor que esta en sessionStorage conn key "url"
}

setInterval(function(){ // funcion que se ejecuta cada cierto intervalo de tiempo especificado
	sessionStorage.setItem("titulo", $titulo.val()); //guarda en el sessionStorage el valor del campo "titulo"
	sessionStorage.setItem("url", $url.val()); //guarda en el sessionStorage el valor del campo "url"
}, 1000)

function mostrarFormulario(){
	$form.slideToggle(); //Funcion que cambia a valor hidden/visible algun objeto
	$list.slideToggle(); //Esconde la lista para poder introducir el post sin problemas
	return false; //evita que el <a> tenga funcion href
}

function agregarPost(){
	var url = $url.val(), //asigna a la var url el valor obtenido del input
		titulo = $titulo.val(), //asigna a la var titulo el valor obtenido del input
		$clone = $post.clone(); //Crea un clon del primer post para modificarle los valores

	$clone.find('.titulo_item a') //busca de class titulo_item el a
		.text(titulo) //asigna al atritubo texto el nuevo titulo
		.attr('href', url); //cambia el atributo href por la nueva url

	$clone.hide(); //lo esconde para hacer una animacion con fadeIn()

	$list.prepend($clone); //Agrega al inicio de toda la lista del post el $clone ya modificado podria usar append y lo agrega al final

	mostrarFormulario(); //Llama a invertir el slideToggle
	$titulo.val("");
	$url.val("");
	$clone.slideDowm(); //Agrega la animacion fadeIn()
	return false; //Evita tener funcion al agregar el submit
}

// Eventos
$button.click( mostrarFormulario );
$form.on('submit', agregarPost );