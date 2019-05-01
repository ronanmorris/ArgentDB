var fs = require('fs');
var obj;

fs.readFile('./CardDB.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    obj = JSON.parse(data);
    console.log(obj.cards[0].effect);
});

