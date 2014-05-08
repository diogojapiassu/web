//var ie=document.all;
var nn6 = document.getElementById && !document.all;
var isMovimentarImagem = false;
var x, y;
var imagemSelecionada;

window.onload = function() {
	imagemSaida = document.getElementById('imagem');
};

function movemouse(e) {
	if (isMovimentarImagem) {
		imagemSelecionada.style.left = nn6 ? tx + e.clientX - x : tx + event.clientX - x;
		imagemSelecionada.style.top = nn6 ? ty + e.clientY - y : ty + event.clientY - y;
		
		return false;
	}
}

function selectmouse(e) {
	var elementoSelecionado = nn6 ? e.target : event.srcElement;
	var topelement = nn6 ? "HTML" : "BODY";
	
	while (elementoSelecionado.tagName != topelement && elementoSelecionado.className != "movimento") {
		elementoSelecionado = nn6 ? elementoSelecionado.parentNode : elementoSelecionado.parentElement;
	}

	if (elementoSelecionado.className == "movimento") {
		isMovimentarImagem = true;
		imagemSelecionada = elementoSelecionado;
		
		tx = parseInt(imagemSelecionada.style.left + 0);
		ty = parseInt(imagemSelecionada.style.top + 0);
		
		x = nn6 ? e.clientX : event.clientX;
		y = nn6 ? e.clientY : event.clientY;
		
		document.onmousemove = movemouse;
		return false;
	}
}

function carregarImagemDoComputador() {
	var fileInput = document.getElementById('inputImagem');
	var files = fileInput.files;

	reader = new FileReader();
	reader.onloadend = onChangeImagem;

	if (files[0]) {
		var extensaoArquivo = files[0].name.split("\.")[1];

		if (extensaoArquivo != 'jpg' && extensaoArquivo != 'jpeg') {
			fileInput.value = null;
			imagemSaida.src = "";
			alert("Formato inválido!");
			return;
		}

		reader.readAsDataURL(files[0]);
	} else {
		imagemSaida.src = "";
	}

}

function onChangeImagem() {
	imagemSaida.src = reader.result;
}

function aumentarImagem() {
	imagemSaida.height = imagemSaida.height * 1.4;
	imagemSaida.width = imagemSaida.width * 1.4;
}

function diminuirImagem() {
	imagemSaida.height = imagemSaida.height / 1.4;
	imagemSaida.width = imagemSaida.width / 1.4;
}

function carregarImagemPorUrl() {
	var fileInput = document.getElementById('inputImagem');
	fileInput.value = null;
	var caminhoUrl = document.getElementById('caminhoPorUrl');

	if (caminhoUrl.value != "") {
		imagemSaida.src = caminhoUrl.value;
	} else {
		imagemSaida.src = "";
	}
}

document.onmousedown = selectmouse;
document.onmouseup = new Function("isMovimentarImagem=false");