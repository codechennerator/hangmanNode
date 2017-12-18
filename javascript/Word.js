const wordBank = require("./animals.json");

const Word = function(){
    this.word = "";
    
}
Word.prototype.pickWord = function(){
    var str = wordBank[Math.floor(Math.random()*wordBank.length)];
    this.word = str;
}

//TODO:: Check completion();


module.exports = Word;