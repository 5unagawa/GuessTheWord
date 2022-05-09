var targetWord; //word that the player will guess
var blankWord;  //array to hold blank spaces
var chances;    //counter for number of chances left
var prevNum;    //holds value of previous question
var wordList = ["APPLE", "GRAPE", "LEMON", "MANGO", "MELON", "PEACH"];
let guessArray = [];

//Disable keyboard buttons on page load.
document.querySelectorAll('#btn-group button').forEach(elem=> {elem.disabled = true;});

//Button click event listener.
const keys = document.querySelector('#btn-group');
keys.addEventListener('click', (event) => {
    //Target the clicked button:
    const {target} = event;
    switch(target.matches('button')){
        case target.id == 'enter-btn' :
    	    break;
   	case target.id == 'back-btn' :
    	    break;
  	default:
    	    if(guessArray.length < 5){
      	        guessArray.push(target.value)
      	        document.getElementById('word_'+chances).innerHTML = guessArray.join(' ');
      	        console.log(guessArray);
  	    }
    }
});

//Selects a random word from wordList
function chooseWord(){
    var randomNum = Math.floor(Math.random() * wordList.length);
    while (randomNum == prevNum) {
        randomNum = Math.floor(Math.random() * wordList.length);
    }
    targetWord = wordList[randomNum];
    console.log(targetWord);
    prevNum = randomNum;
}

//Initializes the game
function startGame(){
    //Change the "start" button into "enter" button
    document.getElementById("start-btn").setAttribute( "onClick", "checkGuess(guessArray)");
    document.getElementById("start-btn").innerHTML = "ENTER";
    document.getElementById("start-btn").id = "enter-btn";

    //Reset the game board
    chances = 6;
    for (let i = 6; i > 0; i--){
        document.getElementById("word_" + i).innerHTML = "_ _ _ _ _";
    }
    document.getElementById('word_'+chances).innerHTML = "";
    document.querySelectorAll('#btn-group button').forEach(elem=> {elem.style.visibility = "visible";});
    document.querySelectorAll('#btn-group button').forEach(elem=> {elem.style.backgroundColor = "#1E212B";}); //Raisin Black
    
    chooseWord();

    //Clear blankWord to allow new guesses to be made
    blankWord = new Array(targetWord.length);
    for (let i=0; i < targetWord.length; i++) {
        blankWord[i] = "_";
    }
  
    console.log("Ready to play.");
    document.getElementById('word_'+chances).innerHTML = blankWord.join(' ');

    document.querySelectorAll('#btn-group button').forEach(elem=> {elem.disabled = false;});
}

//Compare the player's guess. Assigns a value to each letter in the guessResults array to denote the letter's position in the target word.
function checkGuess(g){
    if (g.length != 5){
        console.log("Guess is too short.");
	return 0;
    }
    else {
        let guessResults = new Array(5);
	let myGuess = g;
	for (let i = 0; i < 5; i++){
	    if (myGuess[i] == targetWord[i]){ //If the letter is in the correct spot:
	        guessResults[i] = 1; // 1 denotes direct match.
	    }
	    else for (let j = 0; j < 5; j++){
	        //if indirect match
		if (myGuess[i] == targetWord[j]){ //If the letter is in the incorrect spot:
		    if (guessResults[i] != 1 || guessResults != 2){
		        guessResults[i] = 2; //2 denotes indirect match.
			break;
		    }
		    else //An indirect match has already been found at this position:
			break;
                }
                else //The guessed letter is not in the target word:
		    guessResults[i] = 0; //0 denotes no match.
	    }	
	}    
	//update board styling
	styleOutput(guessArray, guessResults);
	    
	//Check if each letter in the player's guess is "1", indicating the word matches
  	let result = guessResults.every(function (e){
	    return e == 1;
	});
	    
	if (result == true){
	    //Disable keyboard buttons and turn "enter" button into "new game" button.
	    document.querySelectorAll('#btn-group button').forEach(elem=> {elem.disabled = true;});
	    document.getElementById("enter-btn").innerHTML = "NEW GAME";
	    document.getElementById("enter-btn").setAttribute( "onClick", "startGame()");
	    document.getElementById("enter-btn").id = "start-btn";
        }
    }

    //Clear guessArray and reduce remaining chances:
    guessArray = [];
    --chances;	
    if (chances == 0){
	alert("Game over, the word was: " + targetWord);
	//Disable keyboard buttons and turn "enter" button into "new game" button.
	document.querySelectorAll('#btn-group button').forEach(elem=> {elem.disabled = true;});
	document.getElementById("enter-btn").innerHTML = "NEW GAME";
	document.getElementById("enter-btn").setAttribute( "onClick", "startGame()");
        document.getElementById("enter-btn").id = "start-btn";
    }
}

//Erase a letter from the guess:
function backspace(){
    guessArray.pop()
    document.getElementById('word_'+chances).innerHTML = guessArray.join(' ');
}

//Restyle the player's guess
//This function checks the value of the guessResult array and uses the values to style the player's guess.
//A text node and span is created for each letter and appended to the player's guess after it has been reset.
//These function then calls "restyleBoard" to restyle the keyboard using the same values.
function styleOutput(gA, gR){
    var res = gR;
    var playerGuess = gA;
    var myWord = document.getElementById('word_' + chances);
    myWord.innerHTML = "";
    for (let i = 0; i < 5; i++){
        var elem = document.createElement("span"),
        text = document.createTextNode(playerGuess[i] + " ");
        elem.appendChild(text);
        
	if (res[i] == 1){
            elem.style.color = "#4D8B31"; //Maximum Green
        }
        if (res[i] == 2){
            elem.style.color = "#FFC800"; //Mikado Yellow
	}
	myWord.appendChild(elem);
    }
    restyleBoard(playerGuess, res)
}

//Restyles the keyboard to indicate if a letter is or isn't contained in the word:
function restyleBoard(gA, gR){
    for (let i = 0; i < 5; i++){
        var guessedLetterKey = document.getElementById(gA[i]);
	if (gR[i] == 0){
	    guessedLetterKey.style.backgroundColor = "#FF312E"; //Tart Orange
	}
	if (gR[i] == 1){
	    guessedLetterKey.style.backgroundColor = "#4D8B31"; //Maximum Green
	}
	if (gR[i] == 2){
	    guessedLetterKey.style.backgroundColor = "#FFC800"; //Mikado Yellow
	}			
    }
}
