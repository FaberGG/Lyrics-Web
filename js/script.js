

function cargarAudio({target}){
    const urlObj = URL.createObjectURL(target.files[0]);
    const audio = document.createElement("audio");

    audio.addEventListener("load", () =>{
        URL.revokeObjectURL(urlObj);
    });

    document.body.appendChild(audio);

    audio.controls = "true";

    audio.src = urlObj;

}
document.getElementById("audio-upload").addEventListener("change", cargarAudio);

