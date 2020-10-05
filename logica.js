//-----------------------------------------
//Variables
//-----------------------------------------

var imgMascaraIdle1, imgMascaraIdle2, imgPelota, imgFondo, imgCanchaenemiga;
var ctx, canvas;
var mascara = {centrox: 260, centroy: 500, anchoimg: 64, altoimg: 64};
var pelota = {centrox: 280, centroy: 295, anchoimg: 24, altoimg: 24, movx: 3, movy: -5};
var canchaEnemiga = {centrox: 175, centroy: 33, anchoimg: 250, altoimg: 20};
var nivel = {puntuacion: 0};
var timeAnim = 0;
var dx, dy;
var radiopelota = 12;
var posmascarax1, posmascarax2, posmascaray1, posmascaray2;
var nomascara;
var rightPressed = false;
var leftPressed = false;

//-----------------------------------------
//Funciones
//-----------------------------------------

function inicializar(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	dx = 280;
	dy = 295;
	cargarImagenes();
}

function cargarImagenes(){
	imgMascaraIdle1 = new Image();
	imgMascaraIdle1.src = 'resources/mascaraidle1.png';
	imgMascaraIdle2 = new Image();
	imgMascaraIdle2.src = 'resources/mascaraidle2.png';
	imgPelota = new Image();
	imgPelota.src = 'resources/pelota.png';
	imgFondo = new Image();
	imgFondo.src = 'resources/fondo.png';
	imgCanchaEnemiga = new Image();
	imgCanchaEnemiga.src = 'resources/canchaenemiga.png';
}

function borrarCanvas(){
	canvas.width = 600;
	canvas.height = 600;
}

function dibujarFondo(){
	ctx.drawImage(imgFondo, 0, 0, 600, 600, 0, 0, 600, 600);
}

function dibujarMascara(){
	if(timeAnim < 10){
		ctx.drawImage(imgMascaraIdle1, 0, 0, mascara.anchoimg, mascara.altoimg, mascara.centrox, 
			mascara.centroy, mascara.anchoimg, mascara.altoimg);
		timeAnim += 1;
	}
	else if(timeAnim >= 10 && timeAnim < 20){
		ctx.drawImage(imgMascaraIdle2, 0, 0, mascara.anchoimg, mascara.altoimg, mascara.centrox, 
			mascara.centroy, mascara.anchoimg, mascara.altoimg);
		timeAnim += 1;
	}
	else if(timeAnim == 20){
		ctx.drawImage(imgMascaraIdle2, 0, 0, mascara.anchoimg, mascara.altoimg, mascara.centrox, 
			mascara.centroy, mascara.anchoimg, mascara.altoimg);
		timeAnim = 0;
	}
	if(rightPressed) {
		if(mascara.centrox + 24 >= 550){
			mascara.centrox += 0;
		}
		else{
			mascara.centrox += 10;
		}
    	
	}
	else if(leftPressed) {
    	if(mascara.centrox - 24 <= -20){
			mascara.centrox -= 0;
		}
		else{
			mascara.centrox -= 10;
		}
	}
}

function dibujarPelota(){
	ctx.drawImage(imgPelota, 0, 0, pelota.anchoimg, pelota.altoimg, pelota.centrox, 
		pelota.centroy, pelota.anchoimg, pelota.altoimg);
}

function dibujarCanchaEnemiga(){
	ctx.drawImage(imgCanchaEnemiga, 0, 0, canchaEnemiga.anchoimg, canchaEnemiga.altoimg, 
		canchaEnemiga.centrox, canchaEnemiga.centroy, canchaEnemiga.anchoimg, canchaEnemiga.altoimg);
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function moverPelota(){
	nomascara = true;
	if(pelota.centrox + pelota.movx > canvas.width-radiopelota || pelota.centrox + pelota.movx < radiopelota) {
        pelota.movx = -pelota.movx;
    }
    if(pelota.centroy + pelota.movy > canvas.height-radiopelota || pelota.centroy + pelota.movy < radiopelota) {
        pelota.movy = -pelota.movy;
    }
    posmascarax1 = mascara.centrox - 5;
    posmascarax2 = mascara.centrox + 40;
    posmascaray1 = mascara.centroy - 20;
    posmascaray2 = mascara.centroy - 20;
    if(pelota.centrox >= posmascarax1 && pelota.centrox <= posmascarax2 
    	&& pelota.centroy >= posmascaray1 && pelota.centroy <= posmascaray2){
    	pelota.movy = -pelota.movy;
    	nomascara = false;
    	pelota.centrox += pelota.movx;
    	pelota.centroy += pelota.movy;
    }
    if(nomascara == true){
    	pelota.centrox += pelota.movx;
    	pelota.centroy += pelota.movy;
    }
}

function golAfavor(){
	if(pelota.centrox >= 170 && pelota.centrox <= 405 
		&& pelota.centroy >= 33 && pelota.centroy <=42){
		pelota.centrox = 280;
		pelota.centroy = 295;
		dibujarPelota();
		nivel.puntuacion += 1;
	}
}

function score(){
	ctx.font = "30px impact";
	ctx.fillStyle = '#6e31b7';
	ctx.fillText(nivel.puntuacion, 500, 30);
}

//-----------------------------------------
//Listeners de teclas
//-----------------------------------------

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//-----------------------------------------
//Bucle principal
//-----------------------------------------
var FPS = 60;
setInterval(function(){
	principal();
}, 1200/FPS);

function principal(){
	borrarCanvas();
	dibujarFondo();
	golAfavor();
	score();
	dibujarPelota();
	moverPelota();
	dibujarCanchaEnemiga();
	dibujarMascara();
}