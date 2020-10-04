"use strict";

const body = document.querySelector("body");
const image = document.createElement("img");
const randomImg = Math.floor(Math.random() * 3) + 1;
image.setAttribute("src", "../image/" + randomImg + ".jpg");
image.classList.add("backimg");

body.prepend(image);
