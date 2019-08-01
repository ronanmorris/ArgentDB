"use strict";
var rimraf = require("rimraf");

const fs = require("fs");
let url = "./src/CardDB.json";

//Initial DB data to sort
let rawdata = fs.readFileSync(url);
let cards = JSON.parse(rawdata).cards;

//Function to copy the existing DB as a backup
function backupDB() {
  //Get date and time to use as the backup name
  var currentdate = new Date();
  var datetime =
    "Backup_" +
    currentdate.getDate() +
    "." +
    (currentdate.getMonth() + 1) +
    "." +
    currentdate.getFullYear() +
    "." +
    currentdate.getHours() +
    "." +
    currentdate.getMinutes() +
    "." +
    currentdate.getSeconds();
  let backupUrl = "./src/backup/" + datetime + ".json";
  // Backup the file
  fs.copyFileSync(url, backupUrl);
}

function sortFunc(a, b) {
  let order1 = ["Intro Deck", "Betrayal", "Not-In-Set Promos"];
  let order2 = ["Light", "Fire", "Air", "Water", "Dark", "Argent"];
  let order3 = [
    "Champion",
    "Spirit",
    "Unit",
    "Spell",
    "Augment",
    "Tower",
    "Shard"
  ];
  // Sort by order
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }

  // Sort by set
  if (order1.indexOf(a.set) < order1.indexOf(b.set)) {
    return -1;
  }
  if (order1.indexOf(a.set) > order1.indexOf(b.set)) {
    return 1;
  }

  // Sort out Box Toppers to the end
  if (a.rarity === "Box Topper") {
    return 1;
  }
  if (b.rarity === "Box Topper") {
    return -1;
  }

  // Sort by Element
  if (order2.indexOf(a.element) < order2.indexOf(b.element)) {
    return -1;
  }
  if (order2.indexOf(a.element) > order2.indexOf(b.element)) {
    return 1;
  }

  // Sort by Card Type
  if (order3.indexOf(a.type) < order3.indexOf(b.type)) {
    return -1;
  }
  if (order3.indexOf(a.type) > order3.indexOf(b.type)) {
    return 1;
  }

  // Sort Alphabetically
  let nameA = a.name.toLowerCase();
  let nameB = b.name.toLowerCase();
  if (nameA < nameB) {
    return -1;
  } else if (nameA > nameB) {
    return 1;
  } else {
    return 0;
  }
}

function runSort() {
  try {
    backupDB();
  } catch {
    console.log("ERROR: Could not make backup of existing DB File. Exiting...");
    return;
  }

  // create array of card names and their corresponding image locations
  let originalList = cards.map(card => {
    return {
      name: card.name,
      originalIndex: card.index
    };
  });

  // Sort DB
  cards.sort((a, b) => sortFunc(a, b));

  // Replace indexes and image url with correct new ones
  cards.forEach((card, newIndex) => {
    card.index = newIndex;
    card.url = "/img/" + newIndex + ".jpg";
  });

  // Make new folder for the new order of images
  let newDir = "./src/backup/newImg";
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir);
  }

  cards.forEach((card, index) => {
    let oldIndex = originalList.findIndex(
      oldCard => oldCard.name === card.name
    );
    let oldUrl = "./public/img/" + oldIndex + ".jpg";
    let newUrl = "./src/backup/newImg/" + card.index + ".jpg";
    fs.copyFileSync(oldUrl, newUrl);
  });

  rimraf.sync("./public/img");
  rimraf.sync("./src/CardDB.json");

  fs.renameSync("./src/backup/newImg", "./public/img");
  let cardsFile = { cards: cards };
  const JSONString = JSON.stringify(cardsFile, null, 2);
  fs.writeFileSync("./src/CardDB.json", JSONString);
}

runSort();
