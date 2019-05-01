const cheerio = require('cheerio');
const request = require('request');

request({
    method: 'GET',
    url: 'http://www.fowtcg.com/card/3888'
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    //card name
    let cardName = $('main > section > h2.line-heading');
    console.log(cardName.text());

    //general card data
    let cardData = $('section > div > div > div > p.prop-value');

    //card number
    let cardNumber = cardData.first();
    console.log(cardNumber.text());

    //card rarity
    let cardData2 = $('section > div > div > div:nth-child(2) > p.prop-value');
    let cardRarity = cardData2.first();
    console.log(cardRarity.text());

    //card cost
    let totalCost = [];
    $('section > div > div > div:nth-child(3) > p.prop-value > img').each(function (i, e) {
        totalCost[i] = $(this).attr("alt");
    });
    console.log(totalCost);

    //Card Attack and Defense
    let cardData3 = $('section > div > div:nth-child(2) > div > p.prop-value');
    let cardstats = cardData3.first().text();
    let re = /\d[\d]*\d/g;
    var obj = cardstats.match(re);
    console.log(obj[0]);
    console.log(obj[1]);

    //Card Type
    let cardData4 = $('section > div > div:nth-child(2) > div:nth-child(2) > p.prop-value');
    let cardType = cardData4.first();
    console.log(cardType.text());

    //Card Races
    let cardData5 = $('section > div > div:nth-child(2) > div:nth-child(3) > p.prop-value');
    let cardRaces = cardData5.first().text();
    let re2 = /[^\/]+/g;
    var obj2 = cardRaces.match(re2);
    console.log(obj2[0]);
    console.log(obj2[1]);
    
    //Card Illustrator
    let cardData6 = $('section > div > div:nth-child(3) > div > p.prop-value');
    let cardIllust = cardData6.first();
    console.log(cardIllust.text());

    //Card Set
    let cardData7 = $('section > div > div:nth-child(3) > div:nth-child(2) > p.prop-value');
    let cardSet = cardData7.first();
    console.log(cardSet.text());

    //Card Effect Text
    let effects = [];
    $('section > section > section > h4 > p').each(function (i, e) {
        effects[i] = $(this).text();
    });
    console.log(effects);

    //Card Flavour Text
    let cardData8 = $('section > section > div > p');
    let cardFlavour = cardData8;
    console.log(cardFlavour.text());



    let title = "3888";

    var fs = require("fs");
    var outputObj = {
        title: []
    }

    outputObj.title.push({id: 1, square: 2});

    var json = JSON.stringify(outputObj, null, 2);
    fs.writeFile('fowCardData.json', json, 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("File saved successfully!");
    });

});

//line-heading line-heading-gradient line-heading-large