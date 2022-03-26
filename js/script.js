let contents = " " ;
let lyricstag = document.getElementById("letra");
const audio = document.getElementById("audio");

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

document.getElementById("audio-upload").addEventListener("change", cargarAudio);
document.getElementById("lrc-file").addEventListener("change", readMultipleFiles, false);

let allTextLines = " " ;
let lyrics = [];
var tim = [] ;
var line = " ";

function processData(allText) {
    allTextLines = allText.split(/\r\n|\n/);
    next();
}

function next() {
    for (i = 0; i<allTextLines.length; i++){
        if (allTextLines[i].search(/^(\[)(\d*)(:)(.*)(\])(.*)/i) >=0 ) {
            line = allTextLines[i].match(/^(\[)(\d*)(:)(.*)(\])(.*)/i);
            tim[i] = parseInt(line[2]) * 60 + parseInt(line[4]);
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


