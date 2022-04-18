class Game{
	constructor(){
  	this.dictionary = null;
    this.wordSolved = null;
    this.gameOver = false;
    this.remainingTurns = null;
    this.targetWord = null;
  }
  
  gameSetup(){
  	var randomNum = Math.floor(Math.random() * dictionary.length);
  	this.targetWord = this.dictionary[randomNum];
    this.wordSolved = False;
    this.remainingTurns = 6;
  }
  
  checkGuess(g){
  	let guessArray = new Array(5);
  	let guess = g;
    for (let i = 0; i < 5; i++){
      //if direct match
      if (guess[i] == this.targetWord[i])
        guessArray[i] = 1; // 1 denotes direct match
    	for (let j = 0; j < 5; j++){
        //if indirect match
        if (guess[j] == this.targetWord[i]){
          guessArray[i] = 2; //2 denotes indirect match
        }
      } 
    }
  }
    
}
