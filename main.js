Webcam.set({
    width: 350,
    heigt: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById('camera');
Webcam.attach( '#camera' );

function take_snap() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">'
    });
}
console.info('Ml5 vertion:', ml5.version);

classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/uIfEW8oy1/model.json', modelLoaded);

function modelLoaded() {
    console.info("Model Loaded!");
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}