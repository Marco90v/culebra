// Author: MArco Velasquez Figarella
const canvas = document.getElementById('juego');
const ctx = canvas.getContext('2d');
ctx.canvas.width='400';
ctx.canvas.height='400';

let estado = 1; //Iniciando 1, Iniciado 2, Perdido 0
let interval;
const tama = 9;
let tecla = {};
tecla[37] = true;
let textPuntos = 0;
let poAx;
let poAy;
let largo = 10;
let po_anc;
let po_alt;
let teclaAnterior = '37';

let punto = { x: 0, y: 0 };

let culeCab={
    x: canvas.width / 2,
    y: canvas.height / 2,
    poAx: canvas.width / 2,
    poAy: canvas.height / 2
};

let culeCue =[];

//agrega un nuevo cuadro al cuerpo
function addCc(){
    culeCue.push({
        x: culeCue[culeCue.length - 1].poAx,
        y: culeCue[culeCue.length - 1].poAy,
        poAx: 0,
        poAy: 0
    });
}

//iniciar
function iniciar (){
    if (estado == 1){
        tecla[82] = false;
        culeCab.x = canvas.width / 2;
        culeCab.y = canvas.height / 2;
        culeCab.poAx = (canvas.width / 2) + (tama + 1);
        culeCab.poAy = canvas.height / 2;

        for (i = 0; i < largo; i++){
            culeCue.push({
                x: culeCab.poAx + (i * (tama + 1)),
                y: culeCab.poAy,
                poAx: culeCab.poAx + (i * (tama + 1)),
                poAy: culeCab.poAy
            });
        }
        punto.x = pos_ale((canvas.width / (tama + 1)) - 1);
        punto.y = pos_ale((canvas.height / (tama + 1)) - 1);
        estado = 2;
    }
}

//Agrega el Jugador
function jugador(){
    ctx.fillStyle = 'green';
    ctx.fillRect(culeCab.x, culeCab.y, tama, tama); 
    
    ctx.fillStyle = 'black';
    ctx.font = 'Bold 10pt Arial';
    ctx.fillText("Puntos: " + textPuntos,3,12);

    for(let i in culeCue){
        let cue = culeCue[i];
        ctx.fillRect(cue.x, cue.y, tama, tama);   
    }
}

//Agrega Punto rojo (objetivo)
function objetivo(){
    ctx.fillStyle = 'red';
    ctx.fillRect(punto.x, punto.y, tama, tama); 
}

//Posicion aleatoria del objetivo
function pos_ale(limiMax){
   	let numPosibi = limiMax - 0; 
   	let num = Math.random() * numPosibi 
   	num = Math.round(num);
   	return num * (tama + 1);
}

//Algorigmo, mover posicion de los Cuadros que corresponden al cuerpo del jugador
function cambiarPosi(){
    for(let i in culeCue){
        let cue = culeCue[i];
        if (i<1){
            cue.poAx = cue.x;
            cue.poAy = cue.y;
            cue.x = culeCab.poAx; 
            cue.y = culeCab.poAy;  
        }
        else{
            const cueA = culeCue[i-1];
            cue.poAx = cue.x;
            cue.poAy = cue.y;
            cue.x = cueA.poAx; 
            cue.y = cueA.poAy;
        }
    }
}

//Incremento de de las posicion para realizar el movimiento
function mover(){
    if (tecla[37]){//izquierda
        if(culeCab.x <= 0) culeCab.x = 0;
        culeCab.poAx = culeCab.x;
        culeCab.poAy = culeCab.y
        culeCab.x -= (tama + 1);
        cambiarPosi();              
    }
    if (tecla[38]){//arriba
        if(culeCab.y <= 0) culeCab.y = 0;
        culeCab.poAy = culeCab.y;
        culeCab.poAx = culeCab.x;
        culeCab.y -= (tama + 1);
        cambiarPosi();
    }
    if (tecla[39]){//derecha
        if(culeCab.x >= canvas.width) culeCab.x = canvas.width;
        culeCab.poAx = culeCab.x;
        culeCab.poAy = culeCab.y;
        culeCab.x += (tama + 1);
        cambiarPosi();
    }
    if (tecla[40]){//abajo
        if(culeCab.y >= canvas.height) culeCab.y = canvas.height;
        culeCab.poAy = culeCab.y;
        culeCab.poAx = culeCab.x;
        culeCab.y += (tama + 1);
        cambiarPosi();
    }     
}

//Colicion con los bordes, cuerpo y objetivo, cuerpo y cuerpo
function coli(){
    if(culeCab.x < 0 || culeCab.x >= canvas.width || culeCab.y < 0 || culeCab.y >= canvas.height){
        perdido(); // si coliciona con los bordes del canvas, pierde
    }
    if(hit(culeCab, punto)){
        textPuntos += 1;//si coliciona con el punto, incrementa puntos y cambia la posicion del objetivo
    //el siguiente Do While genera una posicion aleatoria del objetivo y verifica que esa posicion sea diferente al del jugador
        let v = false;
        do{
            punto.x = pos_ale((canvas.width / (tama + 1)) -1);
            punto.y = pos_ale((canvas.height / (tama + 1)) -1);
            for(let i in culeCue){
                const cue = culeCue[i];
                v = hit(cue,punto);
                if(v) break;
            }  
        }
        while(hit(punto, culeCab) || v);
        addCc();      
    }
    else{
        for(let i in culeCue){//el siguiente ciclo FOR verifica si la cabeza del jugador golpea con su cuerpo y pierde la partida
            const cue = culeCue[i];
            if(hit(culeCab, cue)) perdido();
        } 
    }
}

//funcion que se ejecuta si se pierde la partida
function perdido(){
    clearInterval(interval);
    estado = 0;
    canvas.width = canvas.width;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.font = 'Bold 20pt Arial';
    ctx.fillText('Has Perdido', 120, 190);
    ctx.font = 'Bold 10pt Arial';
    ctx.fillText('Preciona R para Reiniciar', 150, 210);
    ctx.restore();
    culeCue.splice(0,culeCue.length);
    textPuntos=0;
    tecla[37]=true;
    tecla[38]=false;
    tecla[39]=false;
    tecla[40]=false;
}

//hit algoritmo que verifica las posiciones de los objetos y es usado para verificar las coliciones
function hit(a,b){
    let hit = false;
    if(b.x + tama >= a.x && b.x < a.x + tama){
        if(b.y + tama >= a.y && b.y < a.y + tama) hit = true;
    }
    if(b.x <= a.x && b.x + tama >= a.x + tama){
        if(b.y <= a.y && b.y + tama >= a.y + tama) hit = true;    
    }
    if(a.x <= b.x && a.x + tama >= b.x + tama){
        if(a.y <= b.y && a.y + tama >= b.y + tama) hit = true;    
    } 
    return hit;
}

//se verifica la tecla anterior, para colocar un movimiento real y se asigna la tecla, es decir si el jugador sube 
//no puede bajar sin antes girar a la derecha o izquierda
function tecla_ante(tecl){
    if(tecla[39] && teclaAnterior=='37'){
        tecla[37] = true;
        tecla[38] = false;
        tecla[39] = false;
        tecla[40] = false;
    }
    else if((tecla[38] || tecla[40]) && teclaAnterior=='37') teclaAnterior=tecl;

    if(tecla[37] && teclaAnterior=='39'){
        tecla[37] = false;
        tecla[38] = false;
        tecla[39] = true;
        tecla[40] = false;
    }
    else if((tecla[38] || tecla[40]) && teclaAnterior=='39') teclaAnterior=tecl;

    if(tecla[38] && teclaAnterior=='40'){
        tecla[37] = false;
        tecla[38] = false;
        tecla[39] = false;
        tecla[40] = true;
    }
    else if((tecla[37] || tecla[39]) && teclaAnterior=='40') teclaAnterior=tecl;

    if(tecla[40] && teclaAnterior=='38'){
        tecla[37] = false;
        tecla[38] = true;
        tecla[39] = false;
        tecla[40] = false;
    }
    else if((tecla[37] || tecla[39]) && teclaAnterior=='38') teclaAnterior=tecl;
}

//se asignas los eventos de teclafo y las funciones a ejecutar
function evento(){
    agregarEvento(document,"keydown",function(e){
        switch(e.keyCode){
        case 37:
            tecla[37] = true;
            tecla[38] = false;
            tecla[39] = false;
            tecla[40] = false;
            tecla_ante('37');
            break;
        case 38:
            tecla[37] = false;
            tecla[38] = true;
            tecla[39] = false;
            tecla[40] = false;
            tecla_ante('38');
            break;        
        case 39:
            tecla[37] = false;
            tecla[38] = false;
            tecla[39] = true;
            tecla[40] = false;
            tecla_ante('39');
            break;
        case 40:
            tecla[37] = false;
            tecla[38] = false;
            tecla[39] = false;
            tecla[40] = true;
            tecla_ante('40');
            break;
        case 82:
            if (estado==0){
                estado=1;
                interval = window.setInterval(cargar, 1000/10);
            }
        }
    });
  
    function agregarEvento(elemento,nombreEvento,funcion){
        if(elemento.addEventListener){
            elemento.addEventListener(nombreEvento,funcion,false);
        }
        else if(elemento.attchEvent){
            elemento.attchEvent(nombreEvento,funcion);
        }
    }
}

//funcion para llamar a los procesos necesarios para funcionar el juego
function cargar(){
    canvas.width = canvas.width;
    iniciar();
    mover();
    jugador();
    objetivo();
    coli();
}

window.addEventListener('load',init);
function init(){
    evento();
    interval = window.setInterval(cargar, 1000/10);
}