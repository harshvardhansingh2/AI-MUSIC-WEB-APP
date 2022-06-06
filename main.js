song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_1_playing = "";
song_2_playing = "";

function preload()
{
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modeloaded);
    poseNet.on('pose', gotPoses);
}

function modeloaded()
{
    console.log('PoseNet Is Initialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song_1_playing = song_1.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);

    song_2.stop();

    if(song_1_playing == false)
    {
        song_1.Play();
        document.getElementById("song").innerText = "Song : Harry Potter Theme Song";
    }
    }

    song_1_playing = song_1.isPlaying();

    if(scoreRightWrist > 0.2)
    {
    circle(rightWristX, rightWristY, 20);

    song_2.stop();

    if(song_2_playing == false)
    {
        song_2.Play();
        document.getElementById("song").innerText = "Song : Peter Pan";
    }
    }
}

function gotPoses()
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}
