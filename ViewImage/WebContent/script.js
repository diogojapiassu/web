// Code goes here


var ie=document.all;
var nn6=document.getElementById&&!document.all;
var isdrag=false;
var x,y;
var dobj;

 
window.onload = function(){
	imagemSaida = document.getElementById('imagem');
};

function movemouse(e)
{
  if (isdrag)
  {
    dobj.style.left = nn6 ? tx + e.clientX - x : tx + event.clientX - x;
    dobj.style.top  = nn6 ? ty + e.clientY - y : ty + event.clientY - y;
    return false;
  }
}
 
function selectmouse(e)
{
  var fobj       = nn6 ? e.target : event.srcElement;
  var topelement = nn6 ? "HTML" : "BODY";
  while (fobj.tagName != topelement && fobj.className != "dragme")
  {
    fobj = nn6 ? fobj.parentNode : fobj.parentElement;
  }
 
  if (fobj.className=="dragme")
  {
    isdrag = true;
    dobj = fobj;
    tx = parseInt(dobj.style.left+0);
    ty = parseInt(dobj.style.top+0);
    x = nn6 ? e.clientX : event.clientX;
    y = nn6 ? e.clientY : event.clientY;
    document.onmousemove=movemouse;
    return false;
  }
 
}

function carregarImagemDoComputador(){
  var fileInput = document.getElementById('inputImagem');
  //imagemSaida = document.getElementById('imagem');
  var files = fileInput.files;
  
  reader = new FileReader();
  
  reader.onloadend = onChangeImagem;

  if (files[0]) {
    var extensaoArquivo = files[0].name.split("\.")[1];
    
    if(extensaoArquivo != 'jpg' &&  extensaoArquivo != 'jpeg'){
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

function aumentarImagem(){ 
    imagemSaida.height=imagemSaida.height*1.4; 
    imagemSaida.width=imagemSaida.width*1.4; 
}

function diminuirImagem(){ 
    imagemSaida.height=imagemSaida.height/1.4; 
    imagemSaida.width=imagemSaida.width/1.4; 
}

function carregarImagemPorUrl(){
	var fileInput = document.getElementById('inputImagem');
	fileInput.value = null;
	var caminhoUrl = document.getElementById('caminhoPorUrl');
  //imagemSaida = document.getElementById('imagem');
  //alert(caminhoUrl);
  
  /*var reader2 = new FileReader();
  
  reader2.onloadend = function(){
    imagemSaida.src = reader2.result;
  };*/
  
 

  if (caminhoUrl.value != "") {
	  imagemSaida.src = caminhoUrl.value;
  } else {
    imagemSaida.src = "";
  }
  
}
 
document.onmousedown=selectmouse;
document.onmouseup=new Function("isdrag=false");