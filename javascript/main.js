const Letters = require('./Letters.js');
const inquirer = require('inquirer');

let letterObject = new Letters();


function isLetter(answers){
    if(answers.letterGuessed.length > 1){
        return false;
    }else{
        return ((answers.letterGuessed >= 'A' && answers.letterGuessed <= 'Z') || (answers.letterGuessed >= 'a' && answers.letterGuessed <= 'z' ));
    }
}
function playAgain(){
    inquirer.prompt([{
            type: "confirm",
            message: "Play again?",
            name: "yayOrNay"
        }
    ]).then(answers => {
        if(answers.yayOrNay){
            initializeGame();
        }else{
            console.log("Thank you for playing!");
        }
    });
}
function getGuess(){
    inquirer.prompt([{
        type: "input",
        message: "Guess a letter",
        name: "letterGuessed"
        }
    ]).then(answers => {
        if (isLetter(answers)){
            console.log( "======================================\n" +
                "Guesses left: " + letterObject.guessesLeft);
            letterObject.checkLetter(answers.letterGuessed);
            letterObject.displayStatus();
            if(letterObject.isComplete()){
                console.log("======================================");
                if (letterObject.wordStatus == letterObject.wordObject.word){
                    console.log("You win!");
                }else if (letterObject.guessesLeft == 0){
                    console.log("You lose!");
                    console.log("The word was " + letterObject.wordObject.word);
                }
                playAgain();   
            }else{
                getGuess();
            }
        }else{
            console.log("Invalid input. Try again");
            getGuess();
        }
    });
}


function initializeGame(){
    letterObject.wordObject.pickWord();
    letterObject.resetBoard();
    letterObject.displayStatus();
    getGuess();
}
initializeGame();
