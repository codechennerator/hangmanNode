const Word = require('./Word.js');

const Letters = function (){
    this.wordStatus = "";
    this.guessedLetters = [];
    this.guessesLeft = 10;
    this.wordObject = new Word();
}

Letters.prototype.resetBoard = function (){
    //Reset the word status
    this.wordStatus = "";
    for (let i = 0; i< this.wordObject.word.length; i++){
        if(this.wordObject.word.charAt(i) === " "){
            this.wordStatus += " ";
        }else{
            this.wordStatus += "_";
        }
    }
    //Reset letters guessed, and guesses left.
    this.guessedLetters = [];
    this.guessesLeft = 10;
}
Letters.prototype.displayStatus = function(){
    let statusReadability = "";
    for (let i = 0; i< this.wordStatus.length; i++){
        statusReadability += this.wordStatus.charAt(i) + " "; 
    }
    console.log(statusReadability);
}
Letters.prototype.checkLetter = function (anyLetter){
    let letter = anyLetter.toLowerCase();
    let wordLower = this.wordObject.word.toLowerCase();
    if (this.guessedLetters.indexOf(letter) == -1){ // checks that the letter is not included yet.
        this.guessedLetters.push(letter);
    }else{ //if the letter is included, we break out of the function. 
        console.log("You've already guessed that letter! Try again.");
        return;
    }
    if (wordLower.indexOf(letter)!= -1){//If we detect a letter matches somewhere, update the wordStatus
        for (let i = 0; i<this.wordObject.word.length; i++){
            if (letter == wordLower.charAt(i)){
                if(i > 0){ 
                    this.wordStatus = this.wordStatus.substring(0,i) + letter + this.wordStatus.substring(i+1);
                }
                if(i==0){
                    this.wordStatus = letter.toUpperCase() + this.wordStatus.substring(1);
                }
            }  
        }
    }else{ //If letters don't match, we subtract a guess.
        this.guessesLeft--;
    }
}
Letters.prototype.isComplete = function(){
    if (this.wordStatus == this.wordObject.word || this.guessesLeft == 0){
        return true;
     
    }else{
        return false;
    }
}



module.exports = Letters;