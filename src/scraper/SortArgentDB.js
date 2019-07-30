"use strict";
import {firstBy, thenBy} from "thenby";

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
    fs.copyFile(url, backupUrl, err => {
      if (err) throw err;
      console.log("----- Backup Successful \n", backupUrl);
    });
}

function sorting() {

}

let err = false;

function runSort() {
  try {
    backupDB();
  } catch {
    console.log("ERROR: Could not make backup of existing DB File. Exiting...");
    return;
  }
  cards.sort(
    firstBy((a, b) => )
  )
}

