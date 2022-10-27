//https://teachablemachine.withgoogle.com/models/VHsB_4U61/json
var previsao1 = " ";
var previsao2 = " ";

var webcam = document.getElementById("webcam");
Webcam.attach("#webcam")
Webcam.set({
    width: 300,
    height: 250,
    imageFormat: 'png', 
    pngQuality: 90
})

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="imagem" src="'+data_uri+'"/>'
    })
}
console.log(ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VHsB_4U61/model.json', modelLoaded);
function modelLoaded(){
    console.log("modelLoaded")
}

function speak(){
    var synth = window.speechSynthesis;
    fala1 = "A primeira previsão é:" + previsao1;
    fala2 = "A segunda previsão é:" + previsao2;
    var utterThis = new SpeechSynthesisUtterance(fala1 + fala2);
    synth.speak(utterThis)
}

function check(){
    img = document.getElementById("imagem");
    classifier.classify(img, gotResult)
}

function gotResult(error, results){
    if (error){
        console.error(error)
    }
    else{
        document.getElementById("emotioName").innerHTML = results[0].label;
        document.getElementById("emotionName2").innerHTML = results[1].label;
        previsao1 = results[0].label;
        previsao2 = results[1].label;
        speak();
        if (results[0].label == "feliz"){
            document.getElementById("emoji").innerHTML = "&#128522"
        }
        if (results[0].label == "triste"){
            document.getElementById("emoji").innerHTML = "&#128532"
        }
        if (results[0].label == "irritado"){
            document.getElementById("emoji").innerHTML = "&#128548"
        }


        if (results[1].label == "feliz"){
            document.getElementById("emotion2").innerHTML = "&#128522"
        }
        if (results[1].label == "triste"){
            document.getElementById("emotion2").innerHTML = "&#128532"
        }
        if (results[1].label == "irritado"){
            document.getElementById("emotion2").innerHTML = "&#128548"
        }
     }
}