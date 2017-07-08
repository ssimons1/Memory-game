//array of cards
var cards = ['24','GOT','OTH','PB','Suits','WW','24','GOT','OTH','PB','Suits','WW'];
randomise();
var allowUser = true;
var body = document.getElementsByTagName('body')[0];
body.style.backgroundImage = 'http://adventurecaravans.com/wp-content/uploads/2013/08/Skarstad-Norway-Cold-Mountain-Lake-at-Dusk-credit-NONE.jpg';
var cardDivs = document.getElementsByClassName('card-div');
var clicks = 0; //number of clicks, resets after two
var clickedCards = []; //clicked cards, empties after every two
var wrong = 0; //counter for wrong tries
var correctClicks = []; //when pairs are correct they are added


//function for randomisation
function randomise () {
	for (var i = cards.length - 1; i>0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
	}
	return cards;
}

//links randomisation to cardDivs

for (i=0; i<cardDivs.length; i++) {
	cardDivs[i].setAttribute('data-set', cards[i]);
	cardDivs[i].addEventListener('click', showPhotos);	

}


//function for showing photos on click


function showPhotos (event) {
	if (allowUser) {

		var photo = event.target.getAttribute('data-set');
		var theDiv = event.target;
		theDiv.style.backgroundImage = 'url(' + photo + '.jpg)'
		theDiv.style.backgroundSize = '120%';
		theDiv.style.backgroundRepeat = 'no-repeat';
		clicks++
		clickedCards.push(theDiv);
		console.log(clickedCards);

		if (clicks == 2 && clickedCards[0].style.backgroundImage != clickedCards[1].style.backgroundImage) { //not match
				clicks = 0;
				allowUser = false;
				setTimeout(changeBack, 1000);
				console.log("click is " + clicks)
				wrong++
			}

		if(clicks == 2 && clickedCards[0].style.backgroundImage == clickedCards[1].style.backgroundImage) { //match
			correctClicks.push(clickedCards[0]);
			correctClicks.push(clickedCards[1]);
			if (correctClicks.length == cards.length) {
				body.style.backgroundImage = 'url(https://media.giphy.com/media/l1uga8ObPBnIBoXUQ/giphy.gif)'
				setTimeout(won, 1000);
			}
			else {
				reset();
				}
			}
		}
	}

//function to reset clicks and clickedCards
function reset () {
	clickedCards = [];
	clicks = 0;
}



//function to change two clicked pictures back to question marks
function changeBack () {
	console.log(clickedCards);
	clickedCards[0].style.backgroundImage = 'url(./question-mark.png)';
	clickedCards[0].style.backgroundRepeat = 'no-repeat';
	clickedCards[0].style.backgroundSize = '70%';
	clickedCards[0].style.backgroundPosition = 'center';	
	clickedCards[1].style.backgroundImage = 'url(./question-mark.png)';
	clickedCards[1].style.backgroundRepeat = 'no-repeat';
	clickedCards[1].style.backgroundSize = '70%';
	clickedCards[1].style.backgroundPosition = 'center';
	clickedCards = [];
	clicks = 0;
	allowUser = true;
}


// function for if player wins
function won () {
	var playAgain = confirm("Incredible job! You have completed the game with only " + wrong + " incorrect guesses! CLick OK to play a new game.");
	if (playAgain) {
		for(i=0; i<correctClicks.length; i++) {
			correctClicks[i].style.backgroundImage = 'url(./question-mark.png)';
			correctClicks[i].style.backgroundRepeat = 'no-repeat';
			correctClicks[i].style.backgroundSize = '70%';
			correctClicks[i].style.backgroundPosition = 'center';
			body.style.backgroundImage = 'url(http://adventurecaravans.com/wp-content/uploads/2013/08/Skarstad-Norway-Cold-Mountain-Lake-at-Dusk-credit-NONE.jpg)';

		}
		reset();
		wrong = 0;
		correctClicks = [];
		randomise();
	}
	else {
		alert("Thank you for playing! See you soon!");
	}

}

