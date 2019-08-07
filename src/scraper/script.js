const fs = require("fs");
let url = "./src/CardDB.json";

//Initial DB data to sort
let rawdata = fs.readFileSync(url);
let cards = JSON.parse(rawdata).cards;

script = () => {
  cards.forEach(card => {
    if (card.numOrder === 1 || card.numOrder === 2) {
      card.inSetNumber = parseInt(card.number.split("/")[0]);
    }
  });
  console.log(cards);
  fs.writeFileSync("./src/CardDB2.json", JSON.stringify(cards));
};

script();
