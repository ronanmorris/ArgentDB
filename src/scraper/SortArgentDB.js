"use strict";

const fs = require("fs");

let rawdata = fs.readFileSync("./src/CardDB.json");
let cards = JSON.parse(rawdata);
console.log(cards);
