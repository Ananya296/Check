Webcam.set({
  height : 300,
  width : 350,
  image_format : 'png',
  png_quality : 1000
})

camera = document.getElementById("camera");
 
Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("captured_image").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yQXgABysR/model.json", modelLoaded);

function modelLoaded()
{
    console.log("model Loaded");
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_person_name").innerHTML= results[0].label;
        document.getElementById("span_person_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}