let contents = " ";
let lyricstag = document.getElementById("letra");
const audio = document.getElementById("audio");
audio.addEventListener("play" , sincronizarCancion);

function readMultipleFiles(evt) {
    let files = evt.target.files;

    if (files) {
        for (let i = 0, f; f = files[i]; i++) {
            var r = new FileReader();
            r.onload = (function (f){
                return function (e) {
                    contents = e.target.result;
                    processData(contents);
                };
            })(f);
            r.readAsText(f);
        }
    } else {
        alert("fallo en cargar el archivo");
    }
}

let inputAudio = document.getElementById("audio-upload").addEventListener("change", cargarAudio);
let inputLrc = document.getElementById("lrc-file").addEventListener("change", readMultipleFiles, false);

let allTextLines = " " ;
let lyrics = [];
let llave = [];
let tim = [];
let line = " ";

function processData(allText) {
    allTextLines = allText.split(/\r\n|\n/);
    next();
}

function next() {
    for (i = 0; i<allTextLines.length; i++){
        if (allTextLines[i].search(/^(\[)(\d*)(:)(.*)(\])(.*)/i) >=0 ) {
            line = allTextLines[i].match(/^(\[)(\d*)(:)(.*)(\])(.*)/i);
            tim[i] = parseInt(line[2]) * 60 + parseFloat(line[4]);
            llave[i] = line[5];
            lyrics[i] = line[6];
        }
    }
}

function cargarAudio({target}){
    const urlObj = URL.createObjectURL(target.files[0]);

    audio.addEventListener("load", () =>{
        URL.revokeObjectURL(urlObj);
    });
    audio.src = urlObj;
}

function sincronizarCancion(){

    
    for (let i = 0; i < tim.length; i++) {
        if(roundToTwo(audio.currentTime) == 0 & roundToTwo(tim[3]) != 0 & tim[0]== undefined) lyricstag.innerText = "";
        else if (roundToTwo(audio.currentTime) == roundToTwo(tim[i])){
            lyricstag.innerText = lyrics[i];
        }
    }
    setTimeout("sincronizarCancion()", 0);
    if(audio.onpause)return ;
    
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}
