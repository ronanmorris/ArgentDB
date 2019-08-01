"use strict";
var rimraf = require("rimraf");

const fs = require("fs");
let url = "./src/CardDB.json";

//Initial DB data to sort
let rawdata = fs.readFileSync(url);
let cards = JSON.parse(rawdata).cards;

let counter = 0;
cards.forEach(element => {
  if (element.set === "Betrayal") {
    counter++;
  }
});

console.log(counter);
