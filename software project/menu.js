
//setup
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var width = canvas.getAttribute('width');
var height = canvas.getAttribute('height');

// image instances
var exitImg = new Image();
var playImg = new Image();
var raceFlag = new Image();
var title = new Image();

// image sources

exitImg.src = "images/exit-button-2.png";
playImg.src = "images/play-button-2.png";
raceFlag.src = "images/racing-flag.png";
title.src = "images/title.png";

//arrays to hold positions and sizes

var buttonX = [192, 110, 149, 160];
var buttonY = [100, 140, 180, 220];
var buttonWidth = [96, 260, 182, 160];