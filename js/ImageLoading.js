var carPic = document.createElement("img");
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");

var picsToLoad = 0;

function countLoadedImages() {
  picsToLoad--;
  if (picsToLoad == 0) {
    imageLoadingDone();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImages();
  imgVar.src = fileName;
}

function imagesLoad() {
  var imageList = [
    { varName: carPic, theFile: "images/player1car.png" },
    { varName: roadPic, theFile: "images/track_road.png" },
    { varName: wallPic, theFile: "images/track_wall.png" },
  ];

  picsToLoad = imageList.length;
  
  for (var i = 0; i<imageList.length; i++) {
    beginLoadingImage(imageList[i].varName, imageList[i].theFile);
  }
}
